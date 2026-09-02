import React from 'react';
import { Filter, Calendar, Sparkles } from 'lucide-react';

export default function FilterToolbar({
  timeframe,
  onSelectTimeframe,
  isSyntheticMode,
  onToggleSynthetic,
  totalLogs = 0,
  patientName = ''
}) {
  return (
    <div className="filter-toolbar">
      <div className="filter-group">
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Calendar size={15} /> Janela Temporal:
        </span>
        <button
          className={`filter-btn ${timeframe === '7d' ? 'active' : ''}`}
          onClick={() => onSelectTimeframe('7d')}
        >
          Últimos 7 Dias
        </button>
        <button
          className={`filter-btn ${timeframe === '15d' ? 'active' : ''}`}
          onClick={() => onSelectTimeframe('15d')}
        >
          Últimos 15 Dias
        </button>
        <button
          className={`filter-btn ${timeframe === '30d' ? 'active' : ''}`}
          onClick={() => onSelectTimeframe('30d')}
        >
          Últimos 30 Dias
        </button>
        <button
          className={`filter-btn ${timeframe === 'all' ? 'active' : ''}`}
          onClick={() => onSelectTimeframe('all')}
        >
          Todo o Histórico ({totalLogs})
        </button>
      </div>

      <div className="filter-group">
        <button
          className={`filter-btn ${isSyntheticMode ? 'active' : ''}`}
          onClick={onToggleSynthetic}
          title="Alterna entre apenas dados reais dos formulários ou projeção estendida"
          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <Sparkles size={14} color={isSyntheticMode ? '#38bdf8' : 'var(--text-muted)'} />
          <span>{isSyntheticMode ? 'Modo Estendido (Real + Sintético)' : 'Apenas Dados Reais (Agosto 2026)'}</span>
        </button>
      </div>
    </div>
  );
}
