import React, { useState } from 'react';
import { 
  UserPlus, 
  Mail, 
  Key, 
  Lock, 
  Copy, 
  Check, 
  X, 
  ShieldCheck, 
  Stethoscope, 
  Crown, 
  Sparkles,
  User
} from 'lucide-react';
import { createInvite } from '../../services/inviteEngine';

export default function CreateInviteModal({ isOpen, onClose, issuer, initialType, onInviteCreated }) {
  const isAdmin = issuer?.role === 'admin' || issuer?.role === 'admin_master';
  
  // Rule: Admin invites professionals & other admins. Professionals invite patients.
  const resolveInitialType = () => {
    if (isAdmin) {
      return (initialType === 'admin' || initialType === 'professional') ? initialType : 'professional';
    }
    return 'patient';
  };

  const [inviteType, setInviteType] = useState(resolveInitialType);
  const [targetName, setTargetName] = useState('');
  const [targetEmail, setTargetEmail] = useState('');
  const [customPin, setCustomPin] = useState('');
  const [note, setNote] = useState('');
  const [createdResult, setCreatedResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  // Keep in sync if initialType changes when opened
  React.useEffect(() => {
    if (isOpen) {
      setInviteType(resolveInitialType());
      handleReset();
    }
  }, [isOpen, initialType]);

  if (!isOpen || !issuer) return null;

  const handleGenerate = (e) => {
    e.preventDefault();
    setError('');

    const res = createInvite({
      type: inviteType,
      issuer: issuer,
      targetName: targetName,
      targetEmail: targetEmail,
      note: note,
      customPin: customPin || null,
      protocolId: 'PRT001'
    });

    if (res.success) {
      setCreatedResult(res);
      if (onInviteCreated) onInviteCreated(res.invite);
    } else {
      setError(res.error);
    }
  };

  const handleCopyText = () => {
    if (createdResult?.formattedMessage && typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(createdResult.formattedMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleReset = () => {
    setCreatedResult(null);
    setTargetName('');
    setTargetEmail('');
    setCustomPin('');
    setNote('');
    setError('');
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
          maxWidth: '520px',
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
            <div className="card-icon-badge" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
              <UserPlus size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem' }}>Emitir Novo Convite</h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Sequência de Onboarding Oficial por Convite
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

          {createdResult ? (
            /* Invite Success View with Copy Card */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                <div style={{ width: '54px', height: '54px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem auto', color: '#10b981' }}>
                  <Check size={28} />
                </div>
                <h4 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '0.25rem' }}>Convite Gerado com Sucesso!</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Envie o código ou mensagem formatada para <strong>{createdResult.invite.targetName}</strong>.
                </p>
              </div>

              {/* Code Display Box */}
              <div style={{ background: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: 'var(--radius-md)', padding: '1.25rem', textAlign: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Código Oficial do Convite
                </span>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#38bdf8', fontFamily: 'var(--font-mono)', margin: '0.4rem 0' }}>
                  {createdResult.invite.code}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <span>PIN de Segurança:</span>
                  <strong style={{ color: '#34d399', letterSpacing: '0.1em' }}>{createdResult.invite.pin}</strong>
                </div>
              </div>

              {/* Copy Message Button */}
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleCopyText}
                style={{ width: '100%', minHeight: '46px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                <span>{copied ? 'Mensagem Copiada!' : 'Copiar Convite Formatado (WhatsApp / Email)'}</span>
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleReset}
                style={{ width: '100%', marginTop: '0.25rem' }}
              >
                Emitir Outro Convite
              </button>
            </div>
          ) : (
            /* Invite Form */
            <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Type Selection */}
              <div className="form-group">
                <label className="form-label">Tipo de Convite a Emitir:</label>
                <div style={{ display: 'grid', gridTemplateColumns: isAdmin ? '1fr 1fr' : '1fr', gap: '0.5rem' }}>
                  {isAdmin ? (
                    <>
                      <button
                        type="button"
                        className={`filter-btn ${inviteType === 'professional' ? 'active' : ''}`}
                        onClick={() => setInviteType('professional')}
                        style={{ justifyContent: 'center', padding: '0.6rem 0.5rem' }}
                      >
                        <Stethoscope size={14} style={{ marginRight: '4px' }} /> Novo Profissional
                      </button>
                      <button
                        type="button"
                        className={`filter-btn ${inviteType === 'admin' ? 'active' : ''}`}
                        onClick={() => setInviteType('admin')}
                        style={{ justifyContent: 'center', padding: '0.6rem 0.5rem' }}
                      >
                        <Crown size={14} style={{ marginRight: '4px' }} /> Novo Administrador
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      className="filter-btn active"
                      style={{ justifyContent: 'center', padding: '0.6rem 0.5rem' }}
                    >
                      <User size={14} style={{ marginRight: '4px' }} /> Novo Paciente (Sob seus Cuidados)
                    </button>
                  )}
                </div>
              </div>

              {/* Target Name */}
              <div className="form-group">
                <label className="form-label">
                  Nome do {inviteType === 'patient' ? 'Paciente' : (inviteType === 'professional' ? 'Profissional' : 'Administrador')}:
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Ex: Dra. Mariana ou Carlos Silva"
                  value={targetName}
                  onChange={e => setTargetName(e.target.value)}
                  required
                  autoFocus
                />
              </div>

              {/* Target Email (Optional) */}
              <div className="form-group">
                <label className="form-label">E-mail ou Contato (Opcional):</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="nome@exemplo.com"
                  value={targetEmail}
                  onChange={e => setTargetEmail(e.target.value)}
                />
              </div>

              {/* Custom PIN */}
              <div className="form-group">
                <label className="form-label">PIN Numérico de 4 Dígitos (Opcional - deixe vazio para gerar automático):</label>
                <input
                  type="text"
                  maxLength={4}
                  className="form-input"
                  placeholder="Ex: 1234"
                  value={customPin}
                  onChange={e => setCustomPin(e.target.value.replace(/\D/g, ''))}
                />
              </div>

              {/* Optional Notes */}
              <div className="form-group">
                <label className="form-label">Observações / Protocolo:</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder={inviteType === 'patient' ? 'Sob tutela do Protocolo do Plínio (PRT001)' : 'Indicação ambulatorial'}
                  value={note}
                  onChange={e => setNote(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', minHeight: '46px', marginTop: '0.5rem' }}
              >
                <Sparkles size={16} /> Gerar Código & PIN de Convite
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
