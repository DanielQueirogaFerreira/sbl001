import React, { useState } from 'react';
import { 
  Globe, 
  Lock, 
  Key, 
  ArrowRightLeft, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  UserPlus, 
  History,
  Sparkles
} from 'lucide-react';
import { 
  getPublicSquarePatients, 
  claimFromPublicSquare, 
  claimSecretTransfer, 
  getTransferAuditLogs,
  getSecretTransferPatients
} from '../../services/transferEngine';

export default function PublicSquareView({ currentProfessional, onRefresh }) {
  const [pinCode, setPinCode] = useState('');
  const [patientOrTrfId, setPatientOrTrfId] = useState('');
  const [claimMsg, setClaimMsg] = useState('');
  const [claimError, setClaimError] = useState('');

  const [publicPinPrompts, setPublicPinPrompts] = useState({}); // patientId -> pin input
  const [activePinPatientId, setActivePinPatientId] = useState(null);

  const publicPatients = getPublicSquarePatients();
  const secretPatients = getSecretTransferPatients();
  const auditLogs = getTransferAuditLogs();

  const handleClaimPublic = (patientId, requiresPin = false) => {
    setClaimMsg('');
    setClaimError('');

    if (requiresPin && !activePinPatientId) {
      setActivePinPatientId(patientId);
      return;
    }

    const pinToSubmit = publicPinPrompts[patientId] || null;
    const res = claimFromPublicSquare(patientId, currentProfessional?.id || 'PLN00001', pinToSubmit);
    if (res.success) {
      setClaimMsg(`Paciente ${res.patient.name} vinculado com sucesso à sua tutela clínica!`);
      setActivePinPatientId(null);
      setPublicPinPrompts(prev => ({ ...prev, [patientId]: '' }));
      onRefresh();
    } else {
      setClaimError(res.error);
    }
  };

  const handleClaimSecret = (e) => {
    e.preventDefault();
    setClaimMsg('');
    setClaimError('');

    if (!patientOrTrfId || !pinCode) {
      setClaimError('Preencha o código do paciente/transferência e o PIN numérico de 4 dígitos.');
      return;
    }

    const res = claimSecretTransfer(patientOrTrfId, pinCode, currentProfessional?.id || 'PLN00001');
    if (res.success) {
      setClaimMsg(`Transferência secreta autenticada! ${res.patient.name} agora está sob sua tutela.`);
      setPatientOrTrfId('');
      setPinCode('');
      onRefresh();
    } else {
      setClaimError(res.error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Header Banner */}
      <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.7))' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div className="card-icon-badge" style={{ width: '48px', height: '48px', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
              <Globe size={26} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.4rem', margin: 0 }}>Praça Pública & Manejo de Pacientes</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                Acolhimento de pacientes desvinculados e migrações privadas autenticadas por PIN
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="badge badge-brand">
              Profissional Ativo: {currentProfessional?.name} ({currentProfessional?.code})
            </span>
          </div>
        </div>
      </div>

      {claimMsg && (
        <div style={{ padding: '0.85rem 1.25rem', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', borderRadius: 'var(--radius-md)', color: '#6ee7b7', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle2 size={18} /> {claimMsg}
        </div>
      )}

      {claimError && (
        <div style={{ padding: '0.85rem 1.25rem', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: 'var(--radius-md)', color: '#fca5a5', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertCircle size={18} /> {claimError}
        </div>
      )}

      {/* Main Grid: Left Public Square, Right Private Claim */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {/* Left: Public Square List */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="card-header">
            <div className="card-title-group">
              <div className="card-icon-badge" style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--color-prazer-light)' }}>
                <Globe size={18} />
              </div>
              <div>
                <h3>Praça Pública de Pacientes ({publicPatients.length})</h3>
                <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Prontuários liberados para acolhimento (livres ou protegidos por PIN)
                </p>
              </div>
            </div>
          </div>

          {publicPatients.length === 0 ? (
            <div style={{ padding: '2.5rem', textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)', border: '1px dashed var(--border-subtle)' }}>
              <ShieldCheck size={32} color="var(--color-prazer-light)" style={{ margin: '0 auto 0.75rem auto' }} />
              <h4 style={{ margin: 0, color: 'var(--text-primary)' }}>Nenhum paciente na Praça no momento</h4>
              <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Todos os pacientes cadastrados estão vinculados ativamente a terapeutas responsáveis.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {publicPatients.map(p => {
                const requiresPin = Boolean(p.transferState?.pin);
                const isEnteringPin = activePinPatientId === p.id;

                return (
                  <div 
                    key={p.id} 
                    className="shift-box"
                    style={{
                      padding: '1.1rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.85rem',
                      background: 'rgba(255,255,255,0.03)',
                      border: requiresPin ? '1px solid rgba(245, 158, 11, 0.35)' : '1px solid rgba(16, 185, 129, 0.3)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.85rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                        <div style={{ fontSize: '2rem', background: 'rgba(255,255,255,0.05)', padding: '0.3rem', borderRadius: 'var(--radius-md)' }}>
                          {p.avatar}
                        </div>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                            <h4 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--text-primary)' }}>{p.name}</h4>
                            <span className={requiresPin ? 'badge badge-misto' : 'badge badge-prazer'} style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                              {requiresPin ? <><Lock size={11} /> PIN Requerido</> : 'Acesso Livre'}
                            </span>
                          </div>
                          <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                            {p.diagnosis}
                          </p>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                            Protocolo: <strong>{p.protocolId || 'PRT001'}</strong> • Prontuários: {p.logs?.length || 0}
                          </div>
                        </div>
                      </div>

                      {!isEnteringPin && (
                        <button 
                          className={`btn ${requiresPin ? 'btn-secondary' : 'btn-primary'} btn-sm`}
                          onClick={() => handleClaimPublic(p.id, requiresPin)}
                          title="Vincular paciente sob meus cuidados clínicos"
                          style={{ flexShrink: 0 }}
                        >
                          {requiresPin ? <><Lock size={13} /> Inserir PIN</> : <><UserPlus size={14} /> Acolher</>}
                        </button>
                      )}
                    </div>

                    {/* Inline PIN Entry for Protected Patients */}
                    {isEnteringPin && (
                      <div style={{ background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.25)', borderRadius: 'var(--radius-md)', padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <Key size={13} color="#f59e0b" /> Digite o PIN de 4 dígitos informado pelo profissional anterior:
                        </label>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <input
                            type="text"
                            maxLength={4}
                            className="form-input"
                            placeholder="4 dígitos"
                            value={publicPinPrompts[p.id] || ''}
                            onChange={e => setPublicPinPrompts({ ...publicPinPrompts, [p.id]: e.target.value.replace(/\D/g, '') })}
                            style={{ maxWidth: '140px', textAlign: 'center', letterSpacing: '0.2em', fontFamily: 'var(--font-mono)', fontSize: '1rem', padding: '0.35rem' }}
                            autoFocus
                          />
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => handleClaimPublic(p.id, true)}
                            disabled={!(publicPinPrompts[p.id]?.length === 4)}
                          >
                            Confirmar & Acolher
                          </button>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => setActivePinPatientId(null)}
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: Private Claim with PIN */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="card-header">
            <div className="card-title-group">
              <div className="card-icon-badge" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
                <Lock size={18} />
              </div>
              <div>
                <h3>Resgatar Paciente com PIN</h3>
                <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Acolhimento de transferências privadas secretas
                </p>
              </div>
            </div>
          </div>

          <div style={{ background: 'rgba(56, 189, 248, 0.05)', border: '1px solid rgba(56, 189, 248, 0.2)', borderRadius: 'var(--radius-md)', padding: '0.9rem' }}>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              Caso outro profissional tenha iniciado uma <strong>transferência secreta</strong> para você, insira o código de transferência ou nome do paciente e o <strong>PIN numérico de 4 dígitos</strong> fornecido:
            </p>
          </div>

          <form onSubmit={handleClaimSecret} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" style={{ fontSize: '0.82rem' }}>
                Código TRF ou ID do Paciente:
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Ex: TRF-4892 ou amanda"
                value={patientOrTrfId}
                onChange={e => setPatientOrTrfId(e.target.value)}
                required
              />
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" style={{ fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Key size={14} color="#38bdf8" /> PIN de Segurança (4 Dígitos Numéricos):
              </label>
              <input
                type="text"
                maxLength={4}
                className="form-input"
                placeholder="Ex: 4892"
                value={pinCode}
                onChange={e => setPinCode(e.target.value.replace(/\D/g, ''))}
                required
                style={{ fontSize: '1.2rem', letterSpacing: '0.25em', fontFamily: 'var(--font-mono)' }}
              />
            </div>

            <button type="submit" className="btn btn-ai" style={{ width: '100%', marginTop: '0.5rem' }}>
              <ShieldCheck size={16} /> Validar PIN & Concluir Transferência
            </button>
          </form>

          {/* Pending Secret Transfers Quick Info */}
          {secretPatients.length > 0 && (
            <div style={{ marginTop: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                Pacientes Aguardando Resgate Privado no Sistema ({secretPatients.length}):
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {secretPatients.map(sp => (
                  <span key={sp.id} className="badge" style={{ background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)', fontSize: '0.72rem' }}>
                    {sp.name} ({sp.transferState?.transferCode})
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Transfer Audit Logs Table */}
      <div className="glass-card">
        <div className="card-header" style={{ marginBottom: '1rem' }}>
          <div className="card-title-group">
            <div className="card-icon-badge">
              <History size={18} />
            </div>
            <div>
              <h3>Livro de Atas & Auditoria de Migrações de Pacientes</h3>
              <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Rastreabilidade imutável de todas as transferências públicas e secretas
              </p>
            </div>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.6rem 0.85rem' }}>Data & Hora</th>
                <th style={{ padding: '0.6rem 0.85rem' }}>Paciente</th>
                <th style={{ padding: '0.6rem 0.85rem' }}>Origem</th>
                <th style={{ padding: '0.6rem 0.85rem' }}>Destino</th>
                <th style={{ padding: '0.6rem 0.85rem' }}>Modalidade</th>
                <th style={{ padding: '0.6rem 0.85rem' }}>Observação Clínica</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.slice(0, 10).map(log => (
                <tr key={log.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <td style={{ padding: '0.65rem 0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                    {new Date(log.timestamp).toLocaleString('pt-BR')}
                  </td>
                  <td style={{ padding: '0.65rem 0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {log.patientName}
                  </td>
                  <td style={{ padding: '0.65rem 0.85rem', color: 'var(--text-secondary)' }}>
                    {log.fromProfessionalName}
                  </td>
                  <td style={{ padding: '0.65rem 0.85rem', color: '#38bdf8' }}>
                    {log.toProfessionalName}
                  </td>
                  <td style={{ padding: '0.65rem 0.85rem' }}>
                    <span className={`badge ${log.mode?.includes('secret') ? 'badge-ai' : 'badge-prazer'}`} style={{ fontSize: '0.7rem' }}>
                      {log.mode?.includes('secret') ? 'Privada (PIN)' : 'Praça Pública'}
                    </span>
                  </td>
                  <td style={{ padding: '0.65rem 0.85rem', color: 'var(--text-muted)' }}>
                    {log.note}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
