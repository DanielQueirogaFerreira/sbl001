import React, { useState } from 'react';
import { 
  Edit3, 
  Sun, 
  Sunset, 
  Moon, 
  CheckCircle, 
  Sparkles, 
  Save, 
  Smile, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { DAYS_OF_WEEK } from '../../services/routineEngine';
import { getScoreCategory, getScoreBadgeClass, getScoreLabel } from '../../services/clinicalMetrics';

export default function DailyShiftLogger({
  patient,
  weeklyRoutines = {},
  onSaveLog,
  onOpenAiDumpModal
}) {
  const todayStr = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(todayStr);
  const [dayOfWeek, setDayOfWeek] = useState('Segunda-feira');
  
  const [manhaStatus, setManhaStatus] = useState('Rotina executada conforme o planejado.');
  const [manhaScore, setManhaScore] = useState(4);

  const [tardeStatus, setTardeStatus] = useState('Rotina executada conforme o planejado.');
  const [tardeScore, setTardeScore] = useState(4);

  const [noiteStatus, setNoiteStatus] = useState('Rotina executada conforme o planejado.');
  const [noiteScore, setNoiteScore] = useState(4);

  const [satisfacao, setSatisfacao] = useState(8);
  const [imprevistos, setImprevistos] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState(null);

  const plannedToday = weeklyRoutines[dayOfWeek] || { manha: '', tarde: '', noite: '' };

  const handleSubmit = (e) => {
    e.preventDefault();
    const entry = {
      timestamp: `${date} ${new Date().toTimeString().slice(0, 8)}`,
      day_of_week: dayOfWeek,
      manha: { status: manhaStatus, score: Number(manhaScore) },
      tarde: { status: tardeStatus, score: Number(tardeScore) },
      noite: { status: noiteStatus, score: Number(noiteScore) },
      satisfacao: Number(satisfacao),
      imprevistos: imprevistos.trim()
    };

    if (onSaveLog) {
      onSaveLog(patient.id, entry);
    }

    setSubmittedMessage(`Registro de ${dayOfWeek} (${date}) salvo com sucesso no prontuário de ${patient.name}!`);
    setTimeout(() => setSubmittedMessage(null), 5000);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header Banner */}
      <div className="glass-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div className="card-icon-badge" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-prazer)' }}>
            <Edit3 size={20} />
          </div>
          <div>
            <h3>Registro Diário de Turnos (Manhã • Tarde • Noite)</h3>
            <p style={{ fontSize: '0.85rem' }}>
              Paciente Ativo: <strong>{patient.name}</strong> • Pontuação Prazer x Dever
            </p>
          </div>
        </div>

        <button className="btn btn-ai btn-sm" onClick={onOpenAiDumpModal}>
          <Sparkles size={16} />
          <span>Preencher via Dump IA</span>
        </button>
      </div>

      {submittedMessage && (
        <div style={{ background: 'var(--color-prazer-bg)', border: '1px solid var(--color-prazer-border)', borderRadius: 'var(--radius-md)', padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--color-prazer-light)' }}>
          <CheckCircle size={18} />
          <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{submittedMessage}</span>
        </div>
      )}

      {/* Main Logging Form */}
      <form onSubmit={handleSubmit} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        {/* Date & Day of Week Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
          <div className="form-group">
            <label className="form-label">Data de Registro</label>
            <input
              type="date"
              className="form-input"
              value={date}
              onChange={e => setDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Dia da Semana</label>
            <select
              className="form-select"
              value={dayOfWeek}
              onChange={e => setDayOfWeek(e.target.value)}
            >
              {DAYS_OF_WEEK.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 1. Turno Manhã */}
        <div className="shift-box" style={{ background: 'rgba(255,255,255,0.02)', padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span className="shift-name" style={{ color: 'var(--color-misto-light)', fontSize: '1rem' }}>
              <Sun size={18} /> 1. Turno Manhã (07:00 – 12:00)
            </span>
            <span className={`badge ${getScoreBadgeClass(manhaScore)}`}>
              {getScoreLabel(manhaScore)}
            </span>
          </div>

          {plannedToday.manha && (
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.85rem', background: 'rgba(0,0,0,0.2)', padding: '0.4rem 0.6rem', borderRadius: 'var(--radius-sm)' }}>
              <strong>Planejado:</strong> {plannedToday.manha}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem', alignItems: 'center' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" style={{ fontSize: '0.78rem' }}>Status de Execução</label>
              <select
                className="form-select"
                value={manhaStatus}
                onChange={e => setManhaStatus(e.target.value)}
              >
                <option value="Rotina executada conforme o planejado.">Rotina executada conforme o planejado.</option>
                <option value="Rotina executada parcialmente conforme o planejado.">Rotina executada parcialmente conforme o planejado.</option>
                <option value="Rotina não foi executada conforme o planejado.">Rotina não foi executada conforme o planejado.</option>
              </select>
            </div>

            <div className="range-slider-container">
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                <span>Nota Prazer x Dever: <strong>{manhaScore}</strong></span>
                <span style={{ color: 'var(--text-muted)' }}>(1 Prazer ↔ 7 Dever)</span>
              </div>
              <input
                type="range"
                min="1"
                max="7"
                step="1"
                className="custom-range"
                value={manhaScore}
                onChange={e => setManhaScore(Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        {/* 2. Turno Tarde */}
        <div className="shift-box" style={{ background: 'rgba(255,255,255,0.02)', padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span className="shift-name" style={{ color: 'var(--color-brand)', fontSize: '1rem' }}>
              <Sunset size={18} /> 2. Turno Tarde (12:00 – 18:00)
            </span>
            <span className={`badge ${getScoreBadgeClass(tardeScore)}`}>
              {getScoreLabel(tardeScore)}
            </span>
          </div>

          {plannedToday.tarde && (
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.85rem', background: 'rgba(0,0,0,0.2)', padding: '0.4rem 0.6rem', borderRadius: 'var(--radius-sm)' }}>
              <strong>Planejado:</strong> {plannedToday.tarde}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem', alignItems: 'center' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" style={{ fontSize: '0.78rem' }}>Status de Execução</label>
              <select
                className="form-select"
                value={tardeStatus}
                onChange={e => setTardeStatus(e.target.value)}
              >
                <option value="Rotina executada conforme o planejado.">Rotina executada conforme o planejado.</option>
                <option value="Rotina executada parcialmente conforme o planejado.">Rotina executada parcialmente conforme o planejado.</option>
                <option value="Rotina não foi executada conforme o planejado.">Rotina não foi executada conforme o planejado.</option>
              </select>
            </div>

            <div className="range-slider-container">
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                <span>Nota Prazer x Dever: <strong>{tardeScore}</strong></span>
                <span style={{ color: 'var(--text-muted)' }}>(1 Prazer ↔ 7 Dever)</span>
              </div>
              <input
                type="range"
                min="1"
                max="7"
                step="1"
                className="custom-range"
                value={tardeScore}
                onChange={e => setTardeScore(Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        {/* 3. Turno Noite */}
        <div className="shift-box" style={{ background: 'rgba(255,255,255,0.02)', padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span className="shift-name" style={{ color: 'var(--color-purple)', fontSize: '1rem' }}>
              <Moon size={18} /> 3. Turno Noite (18:00 – 00:00)
            </span>
            <span className={`badge ${getScoreBadgeClass(noiteScore)}`}>
              {getScoreLabel(noiteScore)}
            </span>
          </div>

          {plannedToday.noite && (
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.85rem', background: 'rgba(0,0,0,0.2)', padding: '0.4rem 0.6rem', borderRadius: 'var(--radius-sm)' }}>
              <strong>Planejado:</strong> {plannedToday.noite}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem', alignItems: 'center' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" style={{ fontSize: '0.78rem' }}>Status de Execução</label>
              <select
                className="form-select"
                value={noiteStatus}
                onChange={e => setNoiteStatus(e.target.value)}
              >
                <option value="Rotina executada conforme o planejado.">Rotina executada conforme o planejado.</option>
                <option value="Rotina executada parcialmente conforme o planejado.">Rotina executada parcialmente conforme o planejado.</option>
                <option value="Rotina não foi executada conforme o planejado.">Rotina não foi executada conforme o planejado.</option>
              </select>
            </div>

            <div className="range-slider-container">
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                <span>Nota Prazer x Dever: <strong>{noiteScore}</strong></span>
                <span style={{ color: 'var(--text-muted)' }}>(1 Prazer ↔ 7 Dever)</span>
              </div>
              <input
                type="range"
                min="1"
                max="7"
                step="1"
                className="custom-range"
                value={noiteScore}
                onChange={e => setNoiteScore(Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        {/* Satisfaction & Imprevistos */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="range-slider-container" style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className="form-label" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Smile size={16} color="#38bdf8" /> Satisfação Geral com o Dia (1 a 10)
              </label>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#38bdf8' }}>{satisfacao} / 10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              className="custom-range"
              value={satisfacao}
              onChange={e => setSatisfacao(Number(e.target.value))}
              style={{
                background: 'linear-gradient(90deg, #ef4444 0%, #f59e0b 50%, #10b981 100%)'
              }}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Imprevistos / Observações Clínicas</label>
            <textarea
              className="form-textarea"
              placeholder="Ex: Não fui à academia pois tive colação de grau; ou: dormi a tarde toda e perdi o ambulatório..."
              value={imprevistos}
              onChange={e => setImprevistos(e.target.value)}
            />
          </div>
        </div>

        {/* Action Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}>
            <Save size={18} />
            <span>Salvar Registro no Prontuário</span>
          </button>
        </div>
      </form>
    </div>
  );
}
