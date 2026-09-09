import React, { useState } from 'react';
import { 
  Key, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  UserPlus, 
  ShieldCheck, 
  Sparkles,
  User,
  Mail,
  Lock
} from 'lucide-react';
import { validateInvite, redeemInvite } from '../../services/inviteEngine';
import { setCurrentSession } from '../../services/authRepository';
import PasswordInput from '../common/PasswordInput';

export default function RedeemInviteModal({ isOpen, onClose, onRedeemed }) {
  const [step, setStep] = useState(1); // 1: Enter code & PIN, 2: Fill registration details
  const [inviteCode, setInviteCode] = useState('');
  const [pin, setPin] = useState('');
  const [validatedInvite, setValidatedInvite] = useState(null);

  // Form registration fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [diagnosis, setDiagnosis] = useState('Transtorno por Uso de Substâncias (Em Remissão)');
  const [anchor, setAnchor] = useState('Rotina estruturada e apoio clínico');

  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleValidate = (e) => {
    e.preventDefault();
    setError('');

    const res = validateInvite(inviteCode, pin);
    if (res.valid) {
      setValidatedInvite(res.invite);
      setName(res.invite.targetName || '');
      setEmail(res.invite.targetEmail || '');
      setStep(2);
    } else {
      setError(res.error);
    }
  };

  const handleFinalizeRedeem = (e) => {
    e.preventDefault();
    setError('');

    if ((validatedInvite.type === 'professional' || validatedInvite.type === 'admin')) {
      if (!password || password.length < 6) {
        setError('A senha deve ter no mínimo 6 caracteres.');
        return;
      }
      if (password !== confirmPassword) {
        setError('A confirmação de senha não confere.');
        return;
      }
    }

    const res = redeemInvite(inviteCode, pin, {
      name,
      email,
      password,
      diagnosis,
      keyAnchor: anchor
    });

    if (res.success) {
      setSuccessMsg(res.message);
      if (res.user) {
        setCurrentSession(res.user);
      }
      if (onRedeemed) {
        onRedeemed(res);
      }
      setTimeout(() => {
        onClose();
        handleReset();
      }, 2000);
    } else {
      setError(res.error);
    }
  };

  const handleReset = () => {
    setStep(1);
    setInviteCode('');
    setPin('');
    setValidatedInvite(null);
    setPassword('');
    setConfirmPassword('');
    setError('');
    setSuccessMsg('');
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 8, 15, 0.85)',
        backdropFilter: 'blur(10px)',
        zIndex: 1100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
      onClick={onClose}
    >
      <div
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '500px',
          background: '#0d1322',
          border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
        onClick={e => e.stopPropagation()}
      >
        <div className="card-header">
          <div className="card-title-group">
            <div className="card-icon-badge" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
              <Key size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem' }}>Resgatar Convite Oficial</h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Ativação de Cadastro via Código e PIN
              </p>
            </div>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={onClose} style={{ padding: '6px' }}>
            <X size={16} />
          </button>
        </div>

        <div style={{ padding: '1.25rem' }}>
          {error && (
            <div style={{ padding: '0.65rem 0.85rem', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: 'var(--radius-md)', color: '#fca5a5', fontSize: '0.85rem', marginBottom: '1rem' }}>
              {error}
            </div>
          )}

          {successMsg && (
            <div style={{ padding: '0.85rem 1rem', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', borderRadius: 'var(--radius-md)', color: '#6ee7b7', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <CheckCircle2 size={18} /> {successMsg}
            </div>
          )}

          {step === 1 ? (
            /* Step 1: Input Code & PIN */
            <form onSubmit={handleValidate} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Código do Convite (ex: PRF-1001, PAC-2001):</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="PRF-XXXX ou PAC-XXXX"
                  value={inviteCode}
                  onChange={e => setInviteCode(e.target.value.toUpperCase())}
                  required
                  autoFocus
                  style={{ textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontSize: '1.1rem', letterSpacing: '0.05em' }}
                />
              </div>

              <div className="form-group">
                <label className="form-label">PIN Numérico de 4 Dígitos:</label>
                <input
                  type="text"
                  maxLength={4}
                  className="form-input"
                  placeholder="••••"
                  value={pin}
                  onChange={e => setPin(e.target.value.replace(/\D/g, ''))}
                  required
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', letterSpacing: '0.2em', textAlign: 'center' }}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', minHeight: '46px', marginTop: '0.5rem' }}
              >
                <ShieldCheck size={16} /> Validar Convite
              </button>
            </form>
          ) : (
            /* Step 2: Complete Registration */
            <form onSubmit={handleFinalizeRedeem} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {/* Verified Invite Banner */}
              <div style={{ background: 'rgba(6, 182, 212, 0.1)', border: '1px solid rgba(6, 182, 212, 0.3)', borderRadius: 'var(--radius-md)', padding: '0.75rem 1rem', fontSize: '0.82rem' }}>
                <span style={{ color: '#38bdf8', fontWeight: 600, display: 'block', marginBottom: '0.2rem' }}>
                  ✓ Convite Válido: {validatedInvite.code}
                </span>
                <span style={{ color: 'var(--text-secondary)' }}>
                  Emitido por: <strong>{validatedInvite.issuerName}</strong> ({validatedInvite.issuerRole})
                </span>
                <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '0.2rem' }}>
                  Categoria: <strong>{validatedInvite.type === 'professional' ? 'Profissional de Saúde' : (validatedInvite.type === 'admin' ? 'Administrador' : 'Paciente')}</strong>
                </span>
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label" style={{ fontSize: '0.8rem' }}>Nome Completo:</label>
                <input
                  type="text"
                  className="form-input"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>

              {(validatedInvite.type === 'professional' || validatedInvite.type === 'admin') ? (
                <>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.8rem' }}>E-mail Oficial:</label>
                    <input
                      type="email"
                      className="form-input"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.8rem' }}>Definir Senha de Acesso:</label>
                    <PasswordInput
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Mínimo 6 caracteres"
                      autoComplete="new-password"
                      required
                    />
                  </div>

                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.8rem' }}>Confirmar Senha:</label>
                    <PasswordInput
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      placeholder="Repita sua senha"
                      autoComplete="new-password"
                      required
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.8rem' }}>Diagnóstico / Motivo de Acompanhamento:</label>
                    <input
                      type="text"
                      className="form-input"
                      value={diagnosis}
                      onChange={e => setDiagnosis(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.8rem' }}>Principal Âncora Terapêutica:</label>
                    <input
                      type="text"
                      className="form-input"
                      value={anchor}
                      onChange={e => setAnchor(e.target.value)}
                      placeholder="Ex: Família, trabalho, rotina de sono"
                      required
                    />
                  </div>
                </>
              )}

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setStep(1)}
                  style={{ flex: 1 }}
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ flex: 2 }}
                >
                  <Sparkles size={16} /> Concluir & Ativar
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
