import React, { useState } from 'react';
import { 
  HeartHandshake, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  Smile, 
  Flame, 
  Activity, 
  History,
  Send,
  ShieldAlert
} from 'lucide-react';
import { 
  QUESTIONNAIRES_CONFIG, 
  submitHealthResponse, 
  getProfessionalHealthHistory 
} from '../../services/professionalHealth';

export default function ProfessionalHealthView({ currentProfessional, onRefresh }) {
  const [selectedFreq, setSelectedFreq] = useState('daily');
  const [answers, setAnswers] = useState({});
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const cfg = QUESTIONNAIRES_CONFIG[selectedFreq];
  const history = getProfessionalHealthHistory(currentProfessional?.id || 'PLN00001');

  const handleAnswerChange = (qId, val) => {
    setAnswers(prev => ({
      ...prev,
      [qId]: val
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setMsg('');

    const res = submitHealthResponse(currentProfessional?.id || 'PLN00001', selectedFreq, answers);
    if (res.success) {
      setMsg(`Questionário ${cfg.frequencyLabel} registrado com sucesso! Score calculado: ${res.entry.score}/10.`);
      setAnswers({});
      if (onRefresh) onRefresh();
    } else {
      setError('Falha ao salvar respostas.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Header Banner */}
      <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(15, 23, 42, 0.95))', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div className="card-icon-badge" style={{ width: '48px', height: '48px', background: 'rgba(16, 185, 129, 0.2)', color: 'var(--color-prazer-light)' }}>
              <HeartHandshake size={26} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.4rem', margin: 0 }}>Saúde & Resiliência do Profissional</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                Monitoramento longitudinal de estresse, fadiga por compaixão e sustentabilidade clínica
              </p>
            </div>
          </div>

          <span className="badge badge-brand">
            Terapeuta: {currentProfessional?.name} ({currentProfessional?.code})
          </span>
        </div>
      </div>

      {msg && (
        <div style={{ padding: '0.85rem 1.25rem', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', borderRadius: 'var(--radius-md)', color: '#6ee7b7', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle2 size={18} /> {msg}
        </div>
      )}

      {/* Frequency Tabs (6 Periodicidades) */}
      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
        {Object.entries(QUESTIONNAIRES_CONFIG).map(([key, item]) => (
          <button
            key={key}
            onClick={() => { setSelectedFreq(key); setAnswers({}); setMsg(''); }}
            className={`filter-btn ${selectedFreq === key ? 'active' : ''}`}
            style={{ padding: '0.6rem 1rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <Calendar size={14} />
            <span>{item.frequencyLabel}</span>
          </button>
        ))}
      </div>

      {/* Main Grid: Left Questionnaire Form, Right History & Resilience */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '1.5rem' }}>
        {/* Left: Active Questionnaire Form */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="card-header">
            <div className="card-title-group">
              <div className="card-icon-badge" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
                <Activity size={18} />
              </div>
              <div>
                <h3 style={{ margin: 0 }}>{cfg.title}</h3>
                <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Público Alvo: {cfg.targetAudience}
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {cfg.questions.map((q, idx) => (
              <div key={q.id} className="shift-box" style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)' }}>
                <label className="form-label" style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '0.6rem', display: 'block' }}>
                  {idx + 1}. {q.text}
                </label>

                {q.type === 'scale' ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      <span>Mínimo ({q.min})</span>
                      <strong style={{ fontSize: '1.1rem', color: '#38bdf8' }}>{answers[q.id] || 7} / 10</strong>
                      <span>Máximo ({q.max})</span>
                    </div>
                    <input 
                      type="range"
                      min={q.min}
                      max={q.max}
                      className="custom-range"
                      value={answers[q.id] !== undefined ? answers[q.id] : 7}
                      onChange={e => handleAnswerChange(q.id, Number(e.target.value))}
                    />
                  </div>
                ) : (
                  <select 
                    className="form-select"
                    value={answers[q.id] || ''}
                    onChange={e => handleAnswerChange(q.id, e.target.value)}
                    required
                  >
                    <option value="">Selecione uma resposta...</option>
                    {q.options.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                )}
              </div>
            ))}

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
              <Send size={16} /> Salvar Avaliação de Saúde ({cfg.frequencyLabel})
            </button>
          </form>
        </div>

        {/* Right: History & Well-being Indicators */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="card-header">
            <div className="card-title-group">
              <div className="card-icon-badge" style={{ background: 'rgba(245, 158, 11, 0.15)', color: 'var(--color-misto-light)' }}>
                <History size={18} />
              </div>
              <div>
                <h3>Histórico de Autocuidado ({history.length})</h3>
                <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Acompanhamento longitudinal do terapeuta
                </p>
              </div>
            </div>
          </div>

          {history.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)', border: '1px dashed var(--border-subtle)' }}>
              <Smile size={32} color="var(--text-muted)" style={{ margin: '0 auto 0.5rem auto' }} />
              <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Nenhum questionário preenchido ainda. Responda o check-in diário ou semanal ao lado para inaugurar sua série histórica.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '420px', overflowY: 'auto' }}>
              {history.map(item => (
                <div 
                  key={item.id}
                  className="shift-box"
                  style={{
                    padding: '0.85rem 1rem',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.4rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {item.title}
                    </span>
                    <span className={`badge ${item.status === 'Ótimo' ? 'badge-prazer' : item.status === 'Atenção' ? 'badge-misto' : 'badge-dever'}`}>
                      Score: {item.score} / 10
                    </span>
                  </div>

                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {new Date(item.timestamp).toLocaleString('pt-BR')}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{ padding: '0.85rem', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', marginTop: 'auto' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>
              Diretriz Ética de Sustentabilidade:
            </span>
            <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              Profissionais com scores inferiores a 5,0 de forma consecutiva devem acionar intervisão de suporte para evitar contaminação da relação terapêutica e exaustão emocional.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
