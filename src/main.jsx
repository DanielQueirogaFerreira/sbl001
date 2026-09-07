import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '2.5rem',
          maxWidth: '800px',
          margin: '3rem auto',
          background: 'rgba(15, 23, 42, 0.95)',
          border: '1px solid rgba(239, 68, 68, 0.4)',
          borderRadius: '16px',
          color: '#f8fafc',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
          fontFamily: 'Inter, system-ui, sans-serif'
        }}>
          <h2 style={{ color: '#ef4444', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            ⚠️ Falha na Inicialização Clínica
          </h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>
            Ocorreu uma exceção inesperada durante a renderização do Laboratório da Sobriedade.
          </p>
          <pre style={{
            background: 'rgba(0,0,0,0.5)',
            padding: '1rem',
            borderRadius: '8px',
            color: '#fca5a5',
            fontSize: '0.85rem',
            overflowX: 'auto',
            margin: '1.5rem 0'
          }}>
            {this.state.error?.stack || this.state.error?.message || String(this.state.error)}
          </pre>
          <button
            onClick={() => {
              try { localStorage.clear(); } catch(e) {}
              window.location.reload();
            }}
            style={{
              background: '#10b981',
              color: '#fff',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            Redefinir Dados Locais e Recarregar
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

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
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
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
