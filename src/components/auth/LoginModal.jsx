import React, { useState } from 'react';
import { LogIn, Key, Shield, User, Sparkles, X, Check, Stethoscope, Crown } from 'lucide-react';
import { getAllUsers, authenticateUser, setCurrentSession } from '../../services/authRepository';
import { getAllPatients } from '../../data/patientRepository';
import PasswordInput from '../common/PasswordInput';

export default function LoginModal({ isOpen, onClose, onLoginSuccess, onOpenRedeemInvite, targetRole = null }) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const users = getAllUsers();
  const patients = getAllPatients();

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

  // Determine modal header based on target role
  const getHeaderMeta = () => {
    if (targetRole === 'patient') {
      return {
        title: 'Área do Paciente • Acesso',
        subtitle: 'Entre com seu nome de paciente ou código (ex: amanda, PAC-AMANDA)',
        icon: User,
        color: '#c084fc',
        placeholder: 'Ex: amanda ou PAC-XXXX',
        showPassword: true
      };
    }
    if (targetRole === 'professional') {
      return {
        title: 'Área do Profissional • Acesso',
        subtitle: 'Acesso com e-mail cadastrado ou código oficial (ex: PLN00001)',
        icon: Stethoscope,
        color: 'var(--color-prazer-light)',
        placeholder: 'Ex: plinio@sobriedade.lab ou PLN00001',
        showPassword: true
      };
    }
    if (targetRole === 'admin') {
      return {
        title: 'Área do Administrador • Acesso',
        subtitle: 'Acesso institucional por e-mail ou código de governança (ex: DAN00001)',
        icon: Crown,
        color: '#fbbf24',
        placeholder: 'Ex: daniel.queiroga@nhnone.space ou DAN00001',
        showPassword: true
      };
    }
    return {
      title: 'Autenticação Clínica & Acesso',
      subtitle: 'Acesso por E-mail Oficial ou Código Gerado',
      icon: LogIn,
      color: 'var(--color-prazer-light)',
      placeholder: 'Ex: daniel.queiroga@nhnone.space, PLN00001 ou amanda',
      showPassword: true
    };
  };

  const meta = getHeaderMeta();
  const HeaderIcon = meta.icon;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" style={{ maxWidth: '480px' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div className="card-icon-badge" style={{ color: meta.color }}>
              <HeaderIcon size={20} />
            </div>
            <div>
              <h3 style={{ margin: 0 }}>{meta.title}</h3>
              <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {meta.subtitle}
              </p>
            </div>
          </div>
          <button className="btn btn-icon-only" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {targetRole === 'admin' && (
            <div style={{ padding: '0.65rem 0.85rem', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.35)', borderRadius: 'var(--radius-md)', marginBottom: '1rem', fontSize: '0.78rem', color: '#fbbf24', lineHeight: 1.4 }}>
              🔑 <strong>Senha Temporária do Administrador:</strong> <code style={{ color: '#fff', background: 'rgba(0,0,0,0.4)', padding: '0.15rem 0.4rem', borderRadius: '4px' }}>Admin@2026</code> (a troca por uma nova senha pessoal será exigida imediatamente).
            </div>
          )}

          {error && (
            <div style={{ padding: '0.75rem', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: 'var(--radius-md)', color: '#fca5a5', fontSize: '0.85rem', marginBottom: '1rem' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">E-mail, Código de Acesso ou Nome:</label>
              <input
                type="text"
                className="form-input"
                placeholder={meta.placeholder}
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

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                onClose();
                if (onOpenRedeemInvite) onOpenRedeemInvite();
              }}
              style={{ width: '100%', marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', borderColor: 'rgba(56, 189, 248, 0.35)', color: '#38bdf8' }}
            >
              <Key size={15} /> Possui um Convite? Resgatar & Criar Conta (PIN 4 Dígitos)
            </button>
          </form>

          {/* Quick Switch for Demonstration */}
          <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem' }}>
              <Sparkles size={14} color="#38bdf8" /> Alternância Rápida de Demonstração:
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {/* Daniel Queiroga (Admin Master) */}
              {(!targetRole || targetRole === 'admin') && (
                <button
                  type="button"
                  onClick={() => handleQuickSwitch(users.find(u => u.id === 'DAN00001') || users[0])}
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
                    <span style={{ fontSize: '1.4rem' }}>👑</span>
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                        Daniel Queiroga <span style={{ marginLeft: '0.25rem' }}>👑</span>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        Código: <strong style={{ color: '#38bdf8' }}>DAN00001</strong> • Senha: <strong style={{ color: '#fbbf24' }}>Admin@2026</strong>
                      </div>
                    </div>
                  </div>
                  <span className="badge badge-misto" style={{ fontSize: '0.72rem' }}>
                    Master Admin
                  </span>
                </button>
              )}

              {/* Dr. Plínio (Healthcare Professional) */}
              {(!targetRole || targetRole === 'professional') && (
                <button
                  type="button"
                  onClick={() => handleQuickSwitch(users.find(u => u.id === 'PLN00001') || users[1])}
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
                    <span style={{ fontSize: '1.4rem' }}>👨‍⚕️</span>
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                        Dr. Plínio
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        Código: <strong style={{ color: '#38bdf8' }}>PLN00001</strong> • Tutor Ambulatorial PRT001
                      </div>
                    </div>
                  </div>
                  <span className="badge badge-prazer" style={{ fontSize: '0.72rem' }}>
                    Profissional
                  </span>
                </button>
              )}

              {/* Patient Quick Access (Amanda) */}
              {(!targetRole || targetRole === 'patient') && (
                <button
                  type="button"
                  onClick={() => handleQuickSwitch({
                    id: 'amanda',
                    code: 'PAC-AMANDA',
                    name: 'Amanda',
                    role: 'patient',
                    avatar: '👩‍⚕️',
                    diagnosis: 'Recuperação - Fase de Consolidação',
                    assignedProfessionalId: 'PLN00001',
                    assignedProfessionalName: 'Dr. Plínio',
                    keyAnchors: ['Ambulatório', 'Academia & Estudo', 'Família & Amigos']
                  })}
                  className="shift-box"
                  style={{
                    padding: '0.65rem 0.85rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    border: '1px solid rgba(168, 85, 247, 0.3)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.4rem' }}>👩‍⚕️</span>
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                        Amanda
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        Código: <strong style={{ color: '#c084fc' }}>PAC-AMANDA</strong> • Tutela Dr. Plínio
                      </div>
                    </div>
                  </div>
                  <span className="badge badge-brand" style={{ fontSize: '0.72rem' }}>
                    Paciente
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

