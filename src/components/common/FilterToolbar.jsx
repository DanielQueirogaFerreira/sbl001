import React from 'react';
import { Filter, Calendar, Sparkles, Database, Bot } from 'lucide-react';

export default function FilterToolbar({
  timeframe,
  onSelectTimeframe,
  dataSourceFilter = 'all',
  onSelectDataSource,
  totalLogs = 0,
  patientName = ''
}) {
  return (
    <div className="filter-toolbar">
      {/* Timeframe Window */}
      <div className="filter-group">
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Calendar size={15} /> Janela Temporal:
        </span>
        <button
          className={`filter-btn ${timeframe === '7d' ? 'active' : ''}`}
          onClick={() => onSelectTimeframe('7d')}
        >
          7 Dias
        </button>
        <button
          className={`filter-btn ${timeframe === '15d' ? 'active' : ''}`}
          onClick={() => onSelectTimeframe('15d')}
        >
          15 Dias
        </button>
        <button
          className={`filter-btn ${timeframe === '30d' ? 'active' : ''}`}
          onClick={() => onSelectTimeframe('30d')}
        >
          30 Dias
        </button>
        <button
          className={`filter-btn ${timeframe === 'all' ? 'active' : ''}`}
          onClick={() => onSelectTimeframe('all')}
        >
          Todo o Histórico ({totalLogs})
        </button>
      </div>

      {/* Explicit RD vs SD Data Source Filter */}
      <div className="filter-group">
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Filter size={14} /> Fonte:
        </span>
        <button
          className={`filter-btn ${dataSourceFilter === 'all' ? 'active' : ''}`}
          onClick={() => onSelectDataSource('all')}
        >
          Todos os Dados
        </button>
        <button
          className={`filter-btn ${dataSourceFilter === 'RD' ? 'active' : ''}`}
          onClick={() => onSelectDataSource('RD')}
          style={{ borderColor: dataSourceFilter === 'RD' ? 'var(--color-prazer-border)' : 'var(--border-subtle)' }}
        >
          <span className="badge badge-prazer" style={{ padding: '0.1rem 0.35rem', fontSize: '0.68rem', marginRight: '0.3rem' }}>RD</span>
          Apenas Reais
        </button>
        <button
          className={`filter-btn ${dataSourceFilter === 'SD' ? 'active' : ''}`}
          onClick={() => onSelectDataSource('SD')}
          style={{ borderColor: dataSourceFilter === 'SD' ? 'rgba(168, 85, 247, 0.5)' : 'var(--border-subtle)' }}
        >
          <span className="badge" style={{ background: 'rgba(168, 85, 247, 0.2)', color: '#c084fc', border: '1px solid rgba(168, 85, 247, 0.4)', padding: '0.1rem 0.35rem', fontSize: '0.68rem', marginRight: '0.3rem' }}>SD</span>
          Apenas Sintéticos
        </button>
      </div>
    </div>
  );
}
