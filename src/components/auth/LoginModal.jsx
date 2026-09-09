import React, { useState } from 'react';
import { LogIn, Key, Shield, User, Sparkles, X, Check } from 'lucide-react';
import { getAllUsers, authenticateUser, setCurrentSession } from '../../services/authRepository';
import PasswordInput from '../common/PasswordInput';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const users = getAllUsers();

  if (!isOpen) return null;

  const handleLogin = (e) => {
    if (e) e.preventDefault();
    setError('');

    const res = authenticateUser(identifier, password);
    if (res.success) {
      setCurrentSession(res.user);
      onLoginSuccess(res.user);
      onClose();
    } else {
      setError(res.error);
    }
  };

  const handleQuickSwitch = (u) => {
    setCurrentSession(u);
    onLoginSuccess(u);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" style={{ maxWidth: '480px' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div className="card-icon-badge">
              <LogIn size={20} color="var(--color-prazer-light)" />
            </div>
            <div>
              <h3 style={{ margin: 0 }}>Autenticação Clínica</h3>
              <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Acesso por E-mail Oficial ou Código (ex: DAN00001, PLN00001)
              </p>
            </div>
          </div>
          <button className="btn btn-icon-only" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {error && (
            <div style={{ padding: '0.75rem', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: 'var(--radius-md)', color: '#fca5a5', fontSize: '0.85rem', marginBottom: '1rem' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">E-mail ou Código de Acesso:</label>
              <input
                type="text"
                className="form-input"
                placeholder="Ex: daniel.queiroga@nhnone.space ou PLN00001"
                value={identifier}
                onChange={e => setIdentifier(e.target.value)}
                autoFocus
              />
            </div>

            <div className="form-group">
              <label className="form-label">Senha:</label>
              <PasswordInput
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
              <LogIn size={16} /> Entrar no Sistema
            </button>
          </form>

          {/* Quick Switch for Demonstration */}
          <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem' }}>
              <Sparkles size={14} color="#38bdf8" /> Alternância Rápida de Demonstração:
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {users.map(u => (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => handleQuickSwitch(u)}
                  className="shift-box"
                  style={{
                    padding: '0.65rem 0.85rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.4rem' }}>{u.avatar}</span>
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {u.name}
                        {u.hasScepter && <span style={{ marginLeft: '0.4rem' }}>👑</span>}
                        {u.isSynthetic && (
                          <span className="badge" style={{ background: 'rgba(168, 85, 247, 0.2)', color: '#c084fc', border: '1px solid rgba(168, 85, 247, 0.4)', marginLeft: '0.4rem', fontSize: '0.68rem' }}>
                            [SD]
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        Código: <strong style={{ color: '#38bdf8' }}>{u.code}</strong> • {u.email || '(Sem e-mail - Login com Código)'}
                      </div>
                    </div>
                  </div>
                  <span className="badge badge-gray" style={{ fontSize: '0.72rem' }}>
                    {u.role === 'admin_master' ? 'Master Admin' : u.role === 'admin' ? 'Admin' : 'Profissional'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
