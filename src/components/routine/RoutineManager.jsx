import React, { useState } from 'react';
import { 
  Calendar, 
  Layers, 
  GitCompare, 
  Edit, 
  Save, 
  Sun, 
  Sunset, 
  Moon, 
  AlertCircle,
  CheckCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import { DAYS_OF_WEEK, analyzeWeeklyRoutinePatterns, calculateRoutineDrift } from '../../services/routineEngine';

export default function RoutineManager({
  patient,
  weeklyRoutines = {},
  logs = [],
  onUpdateRoutine
}) {
  const [selectedDay, setSelectedDay] = useState('Segunda-feira');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    manha: '',
    tarde: '',
    noite: ''
  });

  const patterns = analyzeWeeklyRoutinePatterns(weeklyRoutines);
  const drift = calculateRoutineDrift(logs);
  const currentDayRoutine = weeklyRoutines[selectedDay] || { manha: '', tarde: '', noite: '' };

  const startEdit = () => {
    setEditForm({
      manha: currentDayRoutine.manha || '',
      tarde: currentDayRoutine.tarde || '',
      noite: currentDayRoutine.noite || ''
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (onUpdateRoutine) {
      onUpdateRoutine(patient.id, selectedDay, editForm);
    }
    setIsEditing(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Top Banner: Weekly Pattern Health & Empirical Analysis */}
      <div className="glass-card" style={{ borderLeft: `4px solid ${patterns.badgeColor === 'badge-prazer' ? 'var(--color-prazer)' : 'var(--color-misto)'}` }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <h3>Diagnóstico de Padrões de Rotina</h3>
              <span className={`badge ${patterns.badgeColor}`}>{patterns.status}</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.3rem' }}>
              {patterns.clinicalVerdict}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Padrões Identificados</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {patterns.patternCount} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>/ 7 dias</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Taxa de Desvio (Drift)</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: drift.driftIndex > 40 ? 'var(--color-dever-light)' : 'var(--color-prazer-light)' }}>
                {drift.driftIndex}%
              </div>
            </div>
          </div>
        </div>

        {/* Pattern Clusters Badges */}
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginTop: '1rem', paddingTop: '0.85rem', borderTop: '1px solid var(--border-subtle)' }}>
          {patterns.patternGroups.map((grp, idx) => (
            <div key={idx} className="badge badge-gray" style={{ fontSize: '0.78rem', textTransform: 'none', padding: '0.35rem 0.75rem' }}>
              <strong style={{ color: '#38bdf8' }}>{grp.id}:</strong> {grp.days.join(', ')}
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid: Days Navigation & Shift Details */}
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '1.5rem' }}>
        {/* Left Column: 7 Days Navigation Pills */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', height: 'fit-content' }}>
          <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
            Dias da Semana
          </h4>
          {DAYS_OF_WEEK.map(day => {
            const isSelected = selectedDay === day;
            const hasData = weeklyRoutines[day] && (weeklyRoutines[day].manha || weeklyRoutines[day].tarde || weeklyRoutines[day].noite);
            return (
              <button
                key={day}
                onClick={() => { setSelectedDay(day); setIsEditing(false); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  background: isSelected ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${isSelected ? 'rgba(6, 182, 212, 0.4)' : 'var(--border-subtle)'}`,
                  color: isSelected ? '#38bdf8' : 'var(--text-primary)',
                  fontWeight: isSelected ? 700 : 500,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <span>{day}</span>
                {hasData ? (
                  <span style={{ fontSize: '0.7rem', color: 'var(--color-prazer-light)' }}>●</span>
                ) : (
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>○</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Column: Planned vs As-Built Details */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="card-header">
            <div className="card-title-group">
              <div className="card-icon-badge">
                <Calendar size={18} />
              </div>
              <div>
                <h3>Grade Planejada: {selectedDay}</h3>
                <p style={{ fontSize: '0.8rem' }}>Pactuada com o Terapeuta no Ambulatório</p>
              </div>
            </div>

            <div>
              {isEditing ? (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="btn btn-secondary btn-sm" onClick={() => setIsEditing(false)}>Cancelar</button>
                  <button className="btn btn-primary btn-sm" onClick={handleSave} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Save size={14} /> Salvar Grade
                  </button>
                </div>
              ) : (
                <button className="btn btn-secondary btn-sm" onClick={startEdit} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Edit size={14} /> Editar Grade
                </button>
              )}
            </div>
          </div>

          {/* 3 Shifts Container */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            {/* Manhã */}
            <div className="shift-box">
              <div className="shift-title-bar">
                <span className="shift-name" style={{ color: 'var(--color-misto-light)' }}>
                  <Sun size={16} /> Manhã Planejada
                </span>
                <span className="badge badge-gray" style={{ fontSize: '0.65rem' }}>07h - 12h</span>
              </div>
              {isEditing ? (
                <textarea
                  className="form-textarea"
                  style={{ minHeight: '130px', fontSize: '0.85rem' }}
                  value={editForm.manha}
                  onChange={e => setEditForm({ ...editForm, manha: e.target.value })}
                />
              ) : (
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', whiteSpace: 'pre-line', lineHeight: '1.4' }}>
                  {currentDayRoutine.manha || 'Nenhuma atividade registrada.'}
                </div>
              )}
            </div>

            {/* Tarde */}
            <div className="shift-box">
              <div className="shift-title-bar">
                <span className="shift-name" style={{ color: 'var(--color-brand)' }}>
                  <Sunset size={16} /> Tarde Planejada
                </span>
                <span className="badge badge-gray" style={{ fontSize: '0.65rem' }}>12h - 18h</span>
              </div>
              {isEditing ? (
                <textarea
                  className="form-textarea"
                  style={{ minHeight: '130px', fontSize: '0.85rem' }}
                  value={editForm.tarde}
                  onChange={e => setEditForm({ ...editForm, tarde: e.target.value })}
                />
              ) : (
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', whiteSpace: 'pre-line', lineHeight: '1.4' }}>
                  {currentDayRoutine.tarde || 'Nenhuma atividade registrada.'}
                </div>
              )}
            </div>

            {/* Noite */}
            <div className="shift-box">
              <div className="shift-title-bar">
                <span className="shift-name" style={{ color: 'var(--color-purple)' }}>
                  <Moon size={16} /> Noite Planejada
                </span>
                <span className="badge badge-gray" style={{ fontSize: '0.65rem' }}>18h - 00h</span>
              </div>
              {isEditing ? (
                <textarea
                  className="form-textarea"
                  style={{ minHeight: '130px', fontSize: '0.85rem' }}
                  value={editForm.noite}
                  onChange={e => setEditForm({ ...editForm, noite: e.target.value })}
                />
              ) : (
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', whiteSpace: 'pre-line', lineHeight: '1.4' }}>
                  {currentDayRoutine.noite || 'Nenhuma atividade registrada.'}
                </div>
              )}
            </div>
          </div>

          {/* As-Built Real World Deviations for this day */}
          <div style={{ marginTop: '0.5rem', padding: '1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)' }}>
            <h4 style={{ fontSize: '0.88rem', color: '#38bdf8', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <GitCompare size={16} /> Histórico "As-Built" (Desvios Reais Registrados em {selectedDay}):
            </h4>
            {logs.filter(l => l.day_of_week === selectedDay).length === 0 ? (
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Nenhum log histórico registrado especificamente para este dia da semana.
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {logs.filter(l => l.day_of_week === selectedDay).map((l, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem', padding: '0.4rem 0.6rem', background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-sm)' }}>
                    <div>
                      <span style={{ color: 'var(--text-muted)', marginRight: '0.5rem' }}>{l.date}:</span>
                      <span>{l.imprevistos ? l.imprevistos : 'Rotina executada conforme o planejado.'}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <span className="badge badge-gray" style={{ fontSize: '0.65rem' }}>M: {l.manha?.score}</span>
                      <span className="badge badge-gray" style={{ fontSize: '0.65rem' }}>T: {l.tarde?.score}</span>
                      <span className="badge badge-gray" style={{ fontSize: '0.65rem' }}>N: {l.noite?.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
