const http = require('http');

async function getDebuggerUrl() {
  return new Promise((resolve, reject) => {
    const req = http.get('http://127.0.0.1:9222/json', res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const targets = JSON.parse(data);
          const page = targets.find(t => t.type === 'page' && t.webSocketDebuggerUrl);
          if (page) resolve(page.webSocketDebuggerUrl);
          else reject(new Error('No page found'));
        } catch (err) {
          reject(err);
        }
      });
    });
    req.on('error', reject);
  });
}

async function run() {
  let wsUrl;
  for (let i = 0; i < 10; i++) {
    try {
      wsUrl = await getDebuggerUrl();
      if (wsUrl) break;
    } catch {
      await new Promise(r => setTimeout(r, 500));
    }
  }

  if (!wsUrl) {
    console.error('Could not obtain Chrome debugger URL');
    process.exit(1);
  }

  console.log('Connecting to Chrome target...');
  const ws = new WebSocket(wsUrl);

  ws.onopen = () => {
    console.log('Connected to Chrome DevTools Protocol!');
    // Enable Runtime and Log domains
    ws.send(JSON.stringify({ id: 1, method: 'Runtime.enable' }));
    ws.send(JSON.stringify({ id: 2, method: 'Log.enable' }));
    ws.send(JSON.stringify({ id: 3, method: 'Page.enable' }));
    ws.send(JSON.stringify({
      id: 4,
      method: 'Runtime.evaluate',
      params: {
        expression: 'document.getElementById("root") ? document.getElementById("root").innerHTML.slice(0, 300) : "ROOT NOT FOUND"'
      }
    }));
  };

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.method === 'Runtime.consoleAPICalled') {
      console.log('[CONSOLE]', msg.params.type, ...msg.params.args.map(a => a.value || a.description));
    } else if (msg.method === 'Runtime.exceptionThrown') {
      console.error('[EXCEPTION]', msg.params.exceptionDetails.text, msg.params.exceptionDetails.exception?.description);
    } else if (msg.id === 4) {
      console.log('[ROOT DOM CONTENT]:', msg.result?.result?.value);
      setTimeout(() => process.exit(0), 1000);
    }
  };

  ws.onerror = (err) => {
    console.error('WebSocket error:', err);
  };
}

run();
