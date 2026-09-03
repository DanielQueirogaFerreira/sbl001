const http = require('http');

setTimeout(async () => {
  try {
    http.get('http://127.0.0.1:9222/json', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const targets = JSON.parse(data);
          console.log('Target pages in Chrome:', targets.map(t => ({ title: t.title, url: t.url })));
          const page = targets.find(t => t.type === 'page');
          if (!page || !page.webSocketDebuggerUrl) {
            console.log('No page target found');
            process.exit(0);
          }
          
          // Connect via WebSocket
          const WebSocket = require('stream'); // fallback check
          console.log('WebSocket Debugger URL:', page.webSocketDebuggerUrl);
        } catch (e) {
          console.error('Error parsing targets:', e);
        }
      });
    }).on('error', err => {
      console.error('Could not connect to Chrome port 9222:', err.message);
    });
  } catch (e) {
    console.error(e);
  }
}, 2000);
