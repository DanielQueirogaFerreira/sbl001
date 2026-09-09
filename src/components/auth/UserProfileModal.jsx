import React, { useState } from 'react';
import { User, Mail, Hash, Shield, Key, CheckCircle2, Lock, X, LogOut, Award } from 'lucide-react';
import { changeUserPassword, logoutUser } from '../../services/authRepository';
import { getAllPatients } from '../../data/patientRepository';

export default function UserProfileModal({ isOpen, onClose, user, onUserUpdated, onSwitchAccount }) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  if (!isOpen || !user) return null;

  const allPatients = getAllPatients();
  const myPatients = allPatients.filter(p => p.assignedProfessionalId === user.id);

  const handleChangePass = (e) => {
    e.preventDefault();
    setError('');
    setMsg('');

    if (user.password && oldPassword !== user.password) {
      setError('A senha atual fornecida está incorreta.');
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      setError('A nova senha deve ter no mínimo 6 caracteres.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('A confirmação não coincide com a nova senha.');
      return;
    }

    const res = changeUserPassword(user.id, newPassword);
    if (res.success) {
      setMsg('Senha atualizada com sucesso!');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      onUserUpdated(res.user);
    } else {
      setError(res.error);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" style={{ maxWidth: '560px' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div className="card-icon-badge">
              <User size={20} color="var(--color-prazer-light)" />
            </div>
            <div>
              <h3 style={{ margin: 0 }}>Perfil Clínico & Identificação</h3>
              <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Credenciais de Acesso e Governança do Usuário
              </p>
            </div>
          </div>
          <button className="btn btn-icon-only" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {/* User Badge Banner */}
          <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.6))' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ fontSize: '2.5rem', background: 'rgba(255,255,255,0.05)', padding: '0.5rem', borderRadius: 'var(--radius-md)' }}>
                {user.avatar}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{user.name}</h3>
                  {user.hasScepter && (
                    <span className="badge" style={{ background: 'rgba(245, 158, 11, 0.2)', color: 'var(--color-misto-light)', border: '1px solid rgba(245, 158, 11, 0.4)' }} title="Portador do Cetro da Governança Suprema">
                      👑 Cetro Master
                    </span>
                  )}
                  {user.isSynthetic && (
                    <span className="badge" style={{ background: 'rgba(168, 85, 247, 0.2)', color: '#c084fc', border: '1px solid rgba(168, 85, 247, 0.4)' }}>
                      [SD] Sintético
                    </span>
                  )}
                </div>
                <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  {user.bio}
                </p>
              </div>
            </div>

            <span className="badge badge-brand" style={{ textTransform: 'uppercase' }}>
              {user.role === 'admin_master' ? 'Master Admin' : user.role === 'admin' ? 'Administrador' : 'Profissional'}
            </span>
          </div>

          {/* Double ID Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div className="shift-box" style={{ padding: '0.85rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem', textTransform: 'uppercase' }}>
                <Hash size={12} /> Código de Acesso:
              </span>
              <span style={{ fontSize: '1.2rem', fontWeight: 700, color: '#38bdf8', marginTop: '0.2rem', display: 'block', fontFamily: 'var(--font-mono)' }}>
                {user.code}
              </span>
            </div>

            <div className="shift-box" style={{ padding: '0.85rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem', textTransform: 'uppercase' }}>
                <Mail size={12} /> E-mail Oficial:
              </span>
              <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.3rem', display: 'block', wordBreak: 'break-all' }}>
                {user.email || '(Pendente de Cadastro)'}
              </span>
            </div>
          </div>

          {/* Assigned Patients (if professional) */}
          {user.role === 'professional' && (
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>
                Pacientes Atualmente sob sua Tutela Clínica ({myPatients.length}):
              </span>
              {myPatients.length === 0 ? (
                <div style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  Nenhum paciente vinculado no momento. Você pode acolher pacientes disponíveis na Praça Pública ou via PIN.
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {myPatients.map(p => (
                    <span key={p.id} className="badge badge-prazer" style={{ padding: '0.4rem 0.8rem', fontSize: '0.82rem' }}>
                      {p.avatar} {p.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Change Password Box */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
            <h4 style={{ margin: '0 0 0.85rem 0', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-primary)' }}>
              <Key size={16} color="var(--color-misto-light)" /> Alterar Senha Pessoal
            </h4>

            {msg && (
              <div style={{ padding: '0.65rem', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', borderRadius: 'var(--radius-md)', color: '#6ee7b7', fontSize: '0.82rem', marginBottom: '0.85rem' }}>
                {msg}
              </div>
            )}
            {error && (
              <div style={{ padding: '0.65rem', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: 'var(--radius-md)', color: '#fca5a5', fontSize: '0.82rem', marginBottom: '0.85rem' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleChangePass}>
              <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                <label className="form-label" style={{ fontSize: '0.8rem' }}>Senha Atual:</label>
                <input
                  type="password"
                  className="form-input"
                  value={oldPassword}
                  onChange={e => setOldPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.85rem' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.8rem' }}>Nova Senha:</label>
                  <input
                    type="password"
                    className="form-input"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    placeholder="Mínimo 6 dígitos"
                    required
                  />
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.8rem' }}>Confirmação:</label>
                  <input
                    type="password"
                    className="form-input"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Repita a nova senha"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
                <CheckCircle2 size={14} /> Atualizar Senha
              </button>
            </form>
          </div>
        </div>

        <div className="modal-footer" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button className="btn btn-secondary btn-sm" onClick={onSwitchAccount}>
            <LogOut size={14} /> Trocar de Usuário
          </button>
          <button className="btn btn-primary btn-sm" onClick={onClose}>
            Fechar Perfil
          </button>
        </div>
      </div>
    </div>
  );
}
