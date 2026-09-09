import React, { useState } from 'react';
import { 
  UserPlus, 
  Copy, 
  Check, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Key, 
  ShieldCheck, 
  Send,
  Sparkles,
  Stethoscope,
  Crown,
  User
} from 'lucide-react';
import { getAllInvites, getInvitesByIssuer } from '../../services/inviteEngine';

export default function InvitesManagerView({ currentUser, onOpenCreateInvite }) {
  const isAdmin = currentUser?.role === 'admin' || currentUser?.role === 'admin_master';
  const [copiedId, setCopiedId] = useState(null);

  const invites = isAdmin ? getAllInvites() : getInvitesByIssuer(currentUser?.id);

  const handleCopyInvite = (inv) => {
    const text = `🏥 Laboratório da Sobriedade — Convite de Acesso\n\nOlá ${inv.targetName}!\nVocê recebeu um convite de ${inv.issuerName} (${inv.issuerRole === 'admin_master' ? 'Admin Master' : (inv.issuerRole === 'admin' ? 'Administrador' : 'Profissional de Saúde')}) para ingressar no Laboratório da Sobriedade.\n\n🔑 Código do Convite: ${inv.code}\n🔒 PIN de Ativação: ${inv.pin}\n\nAcesse o sistema e clique em 'Resgatar Convite' para ativar seu acesso seguro.`;

    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(text);
      setCopiedId(inv.id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Header Banner */}
      <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.7))' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div className="card-icon-badge" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
              <UserPlus size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.3rem', margin: 0 }}>Central de Convites & Onboarding</h2>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                {isAdmin 
                  ? 'Administração global de convites para profissionais e novos administradores' 
                  : 'Emissão e acompanhamento de convites para novos pacientes tutelados'}
              </p>
            </div>
          </div>

          <button
            className="btn btn-primary"
            onClick={onOpenCreateInvite}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <UserPlus size={16} />
            <span>{isAdmin ? '+ Convidar Usuário' : '+ Convidar Paciente'}</span>
          </button>
        </div>
      </div>

      {/* Invites Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Convites Emitidos ({invites.length})
        </h4>

        {invites.length === 0 ? (
          <div className="glass-card" style={{ textAlign: 'center', padding: '2.5rem 1rem', color: 'var(--text-muted)' }}>
            <p>Nenhum convite emitido até o momento.</p>
            <button className="btn btn-secondary btn-sm" onClick={onOpenCreateInvite} style={{ marginTop: '0.75rem' }}>
              Criar o primeiro convite
            </button>
          </div>
        ) : (
          invites.map(inv => (
            <div
              key={inv.id}
              className="glass-card"
              style={{
                padding: '1rem 1.15rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.85rem',
                borderLeft: `4px solid ${inv.status === 'accepted' ? '#10b981' : '#38bdf8'}`
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: 'var(--radius-md)',
                    background: inv.type === 'patient' 
                      ? 'rgba(16, 185, 129, 0.15)' 
                      : (inv.type === 'professional' ? 'rgba(56, 189, 248, 0.15)' : 'rgba(245, 158, 11, 0.15)'),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: inv.type === 'patient' 
                      ? '#34d399' 
                      : (inv.type === 'professional' ? '#38bdf8' : '#f59e0b')
                  }}
                >
                  {inv.type === 'patient' ? <User size={18} /> : (inv.type === 'professional' ? <Stethoscope size={18} /> : <Crown size={18} />)}
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <strong style={{ fontSize: '0.95rem', color: '#fff' }}>{inv.targetName}</strong>
                    <span className="badge" style={{
                      fontSize: '0.65rem',
                      padding: '0.1rem 0.4rem',
                      background: inv.type === 'patient' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(56, 189, 248, 0.15)',
                      color: inv.type === 'patient' ? '#34d399' : '#38bdf8'
                    }}>
                      {inv.type === 'patient' ? 'Paciente' : (inv.type === 'professional' ? 'Profissional' : 'Admin')}
                    </span>
                    <span className={`badge ${inv.status === 'accepted' ? 'badge-prazer' : 'badge-misto'}`} style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem' }}>
                      {inv.status === 'accepted' ? '✓ Aceito' : 'Pendente'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    <span>Código: <strong style={{ color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>{inv.code}</strong></span>
                    <span>PIN: <strong style={{ color: '#34d399', fontFamily: 'var(--font-mono)' }}>{inv.pin}</strong></span>
                    {inv.targetEmail && <span>• {inv.targetEmail}</span>}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => handleCopyInvite(inv)}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem' }}
                >
                  {copiedId === inv.id ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                  <span>{copiedId === inv.id ? 'Copiado!' : 'Copiar Convite'}</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
