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
  Smartphone,
  Maximize2
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
  isVerticalMode = true,
  onToggleVerticalMode
}) {
  const currentPatient = patients.find(p => p.id === selectedPatientId) || patients[0];

  return (
    <header className="app-header">
      <div className="header-inner">
        {/* Row 1: Brand & User / Canvas Controls */}
        <div className="header-top-row">
          <div className="brand-section">
            <div className="brand-logo-icon">
              <Activity size={22} />
            </div>
            <div className="brand-titles">
              <h1 style={{ fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem', margin: 0 }}>
                <span>Laboratório da Sobriedade</span>
                <span className="badge badge-brand" style={{ fontSize: '0.65rem', padding: '0.15rem 0.45rem' }}>9:16</span>
              </h1>
              <p className="brand-tagline" style={{ fontSize: '0.7rem', margin: 0, opacity: 0.75 }}>
                Ambulatório Clínico • PRT001
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            {/* Desktop Mode Switcher (9:16 Vertical Canvas vs Expanded) */}
            {onToggleVerticalMode && (
              <button
                className="btn btn-secondary btn-sm"
                onClick={onToggleVerticalMode}
                title={isVerticalMode ? "Alternar para Modo Tela Cheia Expandido" : "Alternar para Modo Smartphone Vertical (9:16)"}
                style={{ padding: '0.35rem 0.55rem', fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
              >
                {isVerticalMode ? <Maximize2 size={13} /> : <Smartphone size={13} />}
                <span style={{ fontSize: '0.68rem', fontWeight: 600 }}>{isVerticalMode ? 'Expandir' : '9:16'}</span>
              </button>
            )}

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
                title="Perfil do Profissional / Alterar Senha"
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

        {/* Row 2: Patient Switcher & Action Pills */}
        <div className="header-bottom-row">
          {/* Patient Selector Pills */}
          <div 
            className="patient-pill-container" 
            title="Selecione o paciente do ambulatório"
            style={{ flex: 1, overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}
          >
            {patients.map(p => (
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
            ))}
          </div>

          {/* Quick Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={onOpenTransfer}
              title="Transferir ou Liberar Paciente Ativo"
              style={{ padding: '0.35rem 0.55rem', fontSize: '0.75rem' }}
            >
              <ArrowRightLeft size={13} />
              <span>Troca</span>
            </button>

            <button
              className="btn btn-ai btn-sm"
              onClick={onOpenAiDumpModal}
              title="Registro Rápido Conversacional com IA"
              style={{ padding: '0.35rem 0.55rem', fontSize: '0.75rem' }}
            >
              <Sparkles size={13} />
              <span>Dump</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
