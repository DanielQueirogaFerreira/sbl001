import React from 'react';
import { 
  Activity, 
  Sparkles, 
  PlusCircle, 
  User, 
  ArrowRightLeft,
  Key,
  Crown,
  LogIn
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
  onOpenAiDumpModal
}) {
  const currentPatient = patients.find(p => p.id === selectedPatientId) || patients[0];

  return (
    <header className="app-header">
      <div className="header-inner">
        {/* Brand & Identity */}
        <div className="brand-section">
          <div className="brand-logo-icon">
            <Activity size={24} />
          </div>
          <div className="brand-titles">
            <h1>
              Laboratório da Sobriedade
              <span className="badge badge-brand">v2.0 Governança</span>
            </h1>
            <p className="brand-tagline">
              Prevenção de Recaída • Padrões de Rotina • Protocolo do Plínio (PRT001)
            </p>
          </div>
        </div>

        {/* Patient Switcher & Action Controls */}
        <div className="header-controls">
          {/* Patient Selector */}
          <div className="patient-pill-container" title="Selecione o paciente do ambulatório">
            {patients.map(p => (
              <button
                key={p.id}
                className={`patient-pill ${selectedPatientId === p.id ? 'active' : ''}`}
                onClick={() => onSelectPatient(p.id)}
              >
                <span>{p.avatar}</span>
                <span>{p.name}</span>
                {p.transferState?.mode === 'secret' && (
                  <span title="Aguardando resgate com PIN" style={{ fontSize: '0.65rem' }}>🔒</span>
                )}
              </button>
            ))}
          </div>

          {/* Quick Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={onOpenTransfer}
              title="Transferir ou Liberar Paciente Ativo"
            >
              <ArrowRightLeft size={15} />
              <span>Transferir</span>
            </button>

            <button
              className="btn btn-ai btn-sm"
              onClick={onOpenAiDumpModal}
              title="Registro Rápido Conversacional com IA"
            >
              <Sparkles size={15} />
              <span>Dump IA</span>
            </button>

            <button
              className="btn btn-primary btn-sm"
              onClick={onOpenNewLogModal}
              title="Registrar Novo Turno Diário"
            >
              <PlusCircle size={15} />
              <span>Novo Registro</span>
            </button>

            {/* Active User Session Pill */}
            {currentUser && (
              <button
                className="btn btn-secondary btn-sm"
                onClick={onOpenProfile}
                style={{
                  background: currentUser.hasScepter ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255,255,255,0.08)',
                  borderColor: currentUser.hasScepter ? 'rgba(245, 158, 11, 0.4)' : 'var(--border-subtle)',
                  padding: '0.35rem 0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
                title="Clique para ver seu Perfil, Credenciais ou Alterar Senha"
              >
                <span>{currentUser.avatar}</span>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, maxWidth: '110px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {currentUser.name.split(' ')[0]}
                </span>
                {currentUser.hasScepter && <Crown size={12} color="var(--color-misto-light)" />}
                {currentUser.isSynthetic && (
                  <span style={{ fontSize: '0.65rem', color: '#c084fc', fontWeight: 700 }}>[SD]</span>
                )}
              </button>
            )}

            <button
              className="btn btn-secondary btn-sm btn-icon-only"
              onClick={onOpenLogin}
              title="Trocar de Conta / Autenticação"
            >
              <LogIn size={15} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
