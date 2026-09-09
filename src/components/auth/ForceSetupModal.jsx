import React, { useState } from 'react';
import { ShieldAlert, Mail, Lock, CheckCircle2, AlertCircle } from 'lucide-react';
import { changeUserPassword, registerUserEmail, getCurrentSession, setCurrentSession } from '../../services/authRepository';
import PasswordInput from '../common/PasswordInput';

export default function ForceSetupModal({ user, onComplete }) {
  const needsEmail = user?.mustProvideEmail || (!user?.email && user?.id === 'PLN00001');
  const needsPassword = user?.mustChangePassword;

  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!user || (!needsEmail && !needsPassword)) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (needsEmail) {
      const cleanEmail = newEmail.trim().toLowerCase();
      if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
        setError('Por favor, informe um endereço de e-mail válido para vincular à sua conta.');
        return;
      }
    }

    if (needsPassword) {
      if (!newPassword || newPassword.length < 6) {
        setError('A nova senha deve possuir pelo menos 6 caracteres.');
        return;
      }
      if (newPassword !== confirmPassword) {
        setError('A confirmação da senha não coincide com a nova senha digitada.');
        return;
      }
    }

    let updatedUser = { ...user };

    // Register email if needed
    if (needsEmail) {
      const resEmail = registerUserEmail(user.id, newEmail);
      if (!resEmail.success) {
        setError(resEmail.error);
        return;
      }
      updatedUser = resEmail.user;
    }

    // Change password if needed
    if (needsPassword) {
      const resPass = changeUserPassword(user.id, newPassword);
      if (!resPass.success) {
        setError(resPass.error);
        return;
      }
      updatedUser = resPass.user;
    }

    setSuccessMsg('Configuração inicial concluída com sucesso!');
    setTimeout(() => {
      onComplete(updatedUser);
    }, 800);
  };

  return (
    <div className="modal-backdrop" style={{ zIndex: 1100 }}>
      <div className="modal-card" style={{ maxWidth: '520px', border: '1px solid rgba(245, 158, 11, 0.4)' }}>
        <div className="modal-header" style={{ background: 'rgba(245, 158, 11, 0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div className="card-icon-badge" style={{ background: 'rgba(245, 158, 11, 0.2)', color: 'var(--color-misto-light)' }}>
              <ShieldAlert size={22} />
            </div>
            <div>
              <h3 style={{ margin: 0, color: 'var(--color-misto-light)' }}>
                Configuração Obrigatória de Primeiro Acesso
              </h3>
              <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Identificação Clínica: {user.name} ({user.code})
              </p>
            </div>
          </div>
        </div>

        <div className="modal-body">
          <div style={{ padding: '0.85rem', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem' }}>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
              Para garantir a conformidade clínica e a segurança dos prontuários do <strong>Laboratório da Sobriedade</strong>, é necessário concluir seu cadastro antes de navegar no sistema:
            </p>
            <ul style={{ margin: '0.5rem 0 0 1.25rem', padding: 0, fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              {needsEmail && <li>Vincular um endereço de e-mail institucional ou profissional.</li>}
              {needsPassword && <li>Substituir a senha temporária inicial por uma senha pessoal segura.</li>}
            </ul>
          </div>

          {error && (
            <div style={{ padding: '0.75rem', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: 'var(--radius-md)', color: '#fca5a5', fontSize: '0.85rem', marginBottom: '1rem' }}>
              {error}
            </div>
          )}

          {successMsg && (
            <div style={{ padding: '0.75rem', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', borderRadius: 'var(--radius-md)', color: '#6ee7b7', fontSize: '0.85rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={16} /> {successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {needsEmail && (
              <div className="form-group">
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Mail size={14} color="#38bdf8" /> Cadastrar E-mail Oficial do Profissional:
                </label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="ex: plinio@nhnone.space ou seu.email@clinica.com"
                  value={newEmail}
                  onChange={e => setNewEmail(e.target.value)}
                  required
                  autoFocus
                />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Seu código ({user.code}) continuará ativo para login simultâneo.
                </span>
              </div>
            )}

            {needsPassword && (
              <>
                <div className="form-group">
                  <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Lock size={14} color="var(--color-prazer-light)" /> Nova Senha Pessoal:
                  </label>
                  <PasswordInput
                    placeholder="Mínimo 6 caracteres"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    autoComplete="new-password"
                    minLength={6}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Confirmação da Nova Senha:</label>
                  <PasswordInput
                    placeholder="Repita a nova senha"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                    minLength={6}
                    required
                  />
                </div>
              </>
            )}

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
              <CheckCircle2 size={16} /> Salvar Credenciais & Liberar Acesso
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
