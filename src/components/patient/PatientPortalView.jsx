import React, { useState } from 'react';
import { 
  User, 
  CalendarClock, 
  PlusCircle, 
  Sparkles, 
  Heart, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  BrainCircuit, 
  Anchor,
  Stethoscope,
  Smile,
  AlertTriangle
} from 'lucide-react';

export default function PatientPortalView({ 
  patient, 
  logs = [], 
  weeklyRoutines = {}, 
  onSaveLog,
  onOpenNewLogModal,
  onOpenAiDumpModal 
}) {
  const [activeDay, setActiveDay] = useState(() => {
    const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    return days[new Date().getDay()] || 'Segunda';
  });

  if (!patient) return null;

  const todayPlan = weeklyRoutines[activeDay] || {};
  const recentLogs = [...logs].reverse().slice(0, 6);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Patient Welcome Hero */}
      <div 
        className="glass-card"
        style={{
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(168, 85, 247, 0.12))',
          border: '1px solid rgba(168, 85, 247, 0.3)',
          padding: '1.35rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.85rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ fontSize: '2.5rem', background: 'rgba(255,255,255,0.05)', padding: '0.4rem', borderRadius: '16px' }}>
              {patient.avatar || '👤'}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h2 style={{ fontSize: '1.35rem', margin: 0, color: '#fff' }}>
                  Olá, {patient.name}!
                </h2>
                <span className="badge badge-prazer">Sobriedade Ativa</span>
              </div>
              <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                {patient.diagnosis || 'Recuperação & Consolidação de Hábitos'}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.35rem', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                <Stethoscope size={13} color="var(--color-prazer-light)" />
                <span>Profissional Tutor: <strong>{patient.assignedProfessionalName || 'Dr. Plínio'}</strong></span>
                <span>• Protocolo: <strong>{patient.protocolId || 'PRT001'}</strong></span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <button
              className="btn btn-primary btn-sm"
              onClick={onOpenNewLogModal}
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <PlusCircle size={15} />
              <span>Registrar Turno</span>
            </button>
            <button
              className="btn btn-ai btn-sm"
              onClick={onOpenAiDumpModal}
              title="Registro conversacional rápido com IA"
            >
              <Sparkles size={15} />
              <span>Dump IA</span>
            </button>
          </div>
        </div>
      </div>

      {/* Âncoras Terapêuticas do Paciente */}
      <div className="glass-card" style={{ padding: '1.15rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.65rem' }}>
          <Anchor size={16} color="#38bdf8" />
          <h4 style={{ margin: 0, fontSize: '0.9rem', color: '#fff' }}>
            Minhas Âncoras Terapêuticas de Proteção
          </h4>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {(patient.keyAnchors || ['Ambulatório', 'Família & Amigos', 'Atividade Física', 'Sono Regular']).map((anchor, idx) => (
            <span
              key={idx}
              style={{
                fontSize: '0.78rem',
                padding: '0.35rem 0.65rem',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(56, 189, 248, 0.1)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                color: '#38bdf8',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}
            >
              <span>⚓</span> {anchor}
            </span>
          ))}
        </div>
      </div>

      {/* Minha Rotina Planejada para Hoje */}
      <div className="glass-card" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <CalendarClock size={18} color="var(--color-prazer-light)" />
            <h4 style={{ margin: 0, fontSize: '1rem', color: '#fff' }}>Minha Rotina Planejada</h4>
          </div>

          <div style={{ display: 'flex', gap: '0.25rem', overflowX: 'auto' }}>
            {['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'].map(day => (
              <button
                key={day}
                type="button"
                className={`filter-btn ${activeDay === day ? 'active' : ''}`}
                onClick={() => setActiveDay(day)}
                style={{ padding: '0.3rem 0.5rem', fontSize: '0.72rem' }}
              >
                {day.slice(0, 3)}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem' }}>
          {/* Manhã */}
          <div className="shift-box" style={{ padding: '0.85rem', background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.76rem', color: '#fbbf24', marginBottom: '0.4rem', fontWeight: 600 }}>
              <span>🌅 MANHÃ</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-primary)', lineHeight: 1.4 }}>
              {todayPlan.manha || 'Atividades de despertar e café estruturado'}
            </p>
          </div>

          {/* Tarde */}
          <div className="shift-box" style={{ padding: '0.85rem', background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.76rem', color: '#38bdf8', marginBottom: '0.4rem', fontWeight: 600 }}>
              <span>☀️ TARDE</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-primary)', lineHeight: 1.4 }}>
              {todayPlan.tarde || 'Ocupação produtiva e caminhada vespertina'}
            </p>
          </div>

          {/* Noite */}
          <div className="shift-box" style={{ padding: '0.85rem', background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.76rem', color: '#a78bfa', marginBottom: '0.4rem', fontWeight: 600 }}>
              <span>🌙 NOITE</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-primary)', lineHeight: 1.4 }}>
              {todayPlan.noite || 'Apoio terapêutico e higiene do sono'}
            </p>
          </div>
        </div>
      </div>

      {/* Histórico Recente de Turnos Registrados */}
      <div className="glass-card" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
          <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#fff' }}>
            Meus Registros Clínicos Recentes ({logs.length})
          </h4>
          <button
            className="btn btn-secondary btn-sm"
            onClick={onOpenNewLogModal}
            style={{ fontSize: '0.74rem', padding: '0.3rem 0.55rem' }}
          >
            + Novo Check-in
          </button>
        </div>

        {recentLogs.length === 0 ? (
          <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
            Nenhum registro de turno lançado ainda. Clique em "+ Registrar Turno" para fazer seu primeiro check-in diário.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {recentLogs.map((lg, i) => (
              <div 
                key={lg.id || i}
                style={{
                  padding: '0.75rem 0.9rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.5rem'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <strong style={{ fontSize: '0.85rem', color: '#fff' }}>{lg.data || lg.timestamp?.split('T')[0] || 'Hoje'}</strong>
                    <span className="badge badge-prazer" style={{ fontSize: '0.65rem' }}>{lg.turno || 'Turno'}</span>
                  </div>
                  <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    {lg.oQueFez || lg.descricao || 'Atividade realizada'}
                  </p>
                </div>

                <div style={{ textAlign: 'right', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                  <div>Humor: {lg.humor || 'Bom'}</div>
                  <div style={{ color: 'var(--color-prazer-light)' }}>DP: {lg.dOuP || 'Equilíbrio'}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
