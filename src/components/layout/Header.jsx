import React from 'react';
import { 
  Activity, 
  Sparkles, 
  PlusCircle, 
  User, 
  ArrowRightLeft,
  Key, 
  Crown, 
  LogIn,
  UserPlus,
  ShieldCheck,
  Stethoscope
} from 'lucide-react';

export default function Header({
  patients = [],
  selectedPatientId,
  onSelectPatient,
  currentUser,
  onOpenProfile,
  onOpenLogin,
  onOpenTransfer,
  onOpenNewLogModal,
  onOpenAiDumpModal,
  onOpenCreateInvite,
  onOpenRedeemInvite
}) {
  const isAdmin = currentUser?.role === 'admin' || currentUser?.role === 'admin_master';
  const currentPatient = patients.find(p => p.id === selectedPatientId) || patients[0];

  return (
    <header className="app-header">
      <div className="header-inner">
        {/* Row 1: Brand & User Session */}
        <div className="header-top-row">
          <div className="brand-section">
            <div className="brand-logo-icon">
              <Activity size={22} />
            </div>
            <div className="brand-titles">
              <h1 style={{ fontSize: '1.02rem', display: 'flex', alignItems: 'center', gap: '0.45rem', margin: 0 }}>
                <span>Laboratório da Sobriedade</span>
                <span className={`badge ${isAdmin ? 'badge-misto' : 'badge-prazer'}`} style={{ fontSize: '0.62rem', padding: '0.12rem 0.45rem' }}>
                  {isAdmin ? (currentUser?.hasScepter ? '👑 Cetro Master' : '🛡️ Admin') : '🩺 Ambulatório'}
                </span>
              </h1>
              <p className="brand-tagline" style={{ fontSize: '0.7rem', margin: 0, opacity: 0.75 }}>
                {isAdmin ? 'Gestão Administrativa & Protocolos' : 'Prevenção de Recaída • Protocolo do Plínio (PRT001)'}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            {/* Quick Redeem Invite Button */}
            <button
              className="btn btn-secondary btn-sm"
              onClick={onOpenRedeemInvite}
              title="Resgatar Código de Convite Oficial"
              style={{ padding: '0.35rem 0.55rem', fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#38bdf8', borderColor: 'rgba(56, 189, 248, 0.3)' }}
            >
              <Key size={13} />
              <span>Resgatar</span>
            </button>

            {/* Active User Session Pill */}
            {currentUser ? (
              <button
                className="btn btn-secondary btn-sm"
                onClick={onOpenProfile}
                style={{
                  background: currentUser.hasScepter ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255,255,255,0.06)',
                  borderColor: currentUser.hasScepter ? 'rgba(245, 158, 11, 0.4)' : 'var(--border-subtle)',
                  padding: '0.35rem 0.65rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
                title="Perfil do Usuário / Credenciais"
              >
                <span>{currentUser.avatar}</span>
                <span style={{ fontSize: '0.78rem', fontWeight: 600, maxWidth: '85px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {currentUser.name.split(' ')[0]}
                </span>
                {currentUser.hasScepter && <Crown size={11} color="var(--color-misto-light)" />}
              </button>
            ) : (
              <button
                className="btn btn-secondary btn-sm"
                onClick={onOpenLogin}
                title="Entrar no Sistema"
              >
                <LogIn size={14} />
                <span style={{ fontSize: '0.75rem' }}>Entrar</span>
              </button>
            )}
          </div>
        </div>

        {/* Row 2: Role-Based Controls */}
        <div className="header-bottom-row">
          {isAdmin ? (
            /* ADMIN VIEW: No patient pills! Shows Governance status & Admin Invite actions */
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                <ShieldCheck size={14} color="#f59e0b" />
                <span>Painel do Administrador • Onboarding</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => onOpenCreateInvite && onOpenCreateInvite('professional')}
                  title="Emitir Convite para Novo Profissional de Saúde"
                  style={{ padding: '0.35rem 0.6rem', fontSize: '0.74rem' }}
                >
                  <UserPlus size={13} />
                  <span>+ Profissional</span>
                </button>

                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => onOpenCreateInvite && onOpenCreateInvite('admin')}
                  title="Emitir Convite para Novo Administrador"
                  style={{ padding: '0.35rem 0.6rem', fontSize: '0.74rem' }}
                >
                  <Crown size={13} />
                  <span>+ Admin</span>
                </button>
              </div>
            </div>
          ) : (
            /* PROFESSIONAL VIEW: Patient caseload pills & clinical actions */
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: '0.5rem' }}>
              {/* Professional's Assigned Patients Pills */}
              <div 
                className="patient-pill-container" 
                title="Seus pacientes tutelados no ambulatório"
                style={{ flex: 1, overflowX: 'auto', WebkitOverflowScrolling: 'touch', minWidth: 0 }}
              >
                {patients.length > 0 ? (
                  patients.map(p => (
                    <button
                      key={p.id}
                      className={`patient-pill ${selectedPatientId === p.id ? 'active' : ''}`}
                      onClick={() => onSelectPatient(p.id)}
                      style={{ padding: '0.3rem 0.65rem', fontSize: '0.78rem' }}
                    >
                      <span>{p.avatar}</span>
                      <span>{p.name}</span>
                      {p.transferState?.mode === 'secret' && (
                        <span title="Aguardando resgate com PIN" style={{ fontSize: '0.62rem' }}>🔒</span>
                      )}
                    </button>
                  ))
                ) : (
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', padding: '0.2rem 0.5rem' }}>
                    Nenhum paciente vinculado
                  </span>
                )}
              </div>

              {/* Quick Clinical & Patient Actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexShrink: 0 }}>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => onOpenCreateInvite && onOpenCreateInvite('patient')}
                  title="Convidar Novo Paciente para seu Acompanhamento"
                  style={{ padding: '0.35rem 0.55rem', fontSize: '0.74rem' }}
                >
                  <UserPlus size={13} />
                  <span>+ Paciente</span>
                </button>

                <button
                  className="btn btn-secondary btn-sm"
                  onClick={onOpenTransfer}
                  title="Manejo e Transferência de Pacientes"
                  style={{ padding: '0.35rem 0.55rem', fontSize: '0.74rem' }}
                >
                  <ArrowRightLeft size={13} />
                  <span>Troca</span>
                </button>

                <button
                  className="btn btn-ai btn-sm"
                  onClick={onOpenAiDumpModal}
                  title="Registro Rápido Conversacional com IA"
                  style={{ padding: '0.35rem 0.55rem', fontSize: '0.74rem' }}
                >
                  <Sparkles size={13} />
                  <span>Dump</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
