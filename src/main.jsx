import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';

function initApp() {
  let rootElement = document.getElementById('root');
  
  if (!rootElement) {
    if (document.body) {
      rootElement = document.createElement('div');
      rootElement.id = 'root';
      document.body.appendChild(rootElement);
    } else {
      document.addEventListener('DOMContentLoaded', initApp);
      return;
    }
  }

  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (err) {
    console.error('Critical initialization error in Laboratório da Sobriedade:', err);
    if (rootElement) {
      rootElement.innerHTML = `
        <div style="padding: 2rem; color: #f87171; font-family: sans-serif; background: #090d16; min-height: 100vh;">
          <h2>Erro de Inicialização — Laboratório da Sobriedade</h2>
          <pre style="background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 8px; margin-top: 1rem;">${err?.stack || err?.message || String(err)}</pre>
        </div>
      `;
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
