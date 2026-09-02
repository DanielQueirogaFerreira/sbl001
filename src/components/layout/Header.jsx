import React from 'react';
import { 
  Activity, 
  Sparkles, 
  PlusCircle, 
  Database, 
  Calendar,
  AlertCircle
} from 'lucide-react';

export default function Header({
  patients = [],
  selectedPatientId,
  onSelectPatient,
  timeframe,
  onSelectTimeframe,
  isSyntheticMode,
  onToggleSynthetic,
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
              <span className="badge badge-brand">v1.0 Clínico</span>
            </h1>
            <p className="brand-tagline">
              Prevenção de Recaída • Padrões de Rotina • Escala Prazer x Dever
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
              </button>
            ))}
          </div>

          {/* Quick Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              className="btn btn-ai btn-sm"
              onClick={onOpenAiDumpModal}
              title="Registro Rápido Conversacional com IA"
            >
              <Sparkles size={16} />
              <span>Dump IA</span>
            </button>

            <button
              className="btn btn-primary btn-sm"
              onClick={onOpenNewLogModal}
              title="Registrar Novo Turno Diário"
            >
              <PlusCircle size={16} />
              <span>Novo Registro</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
