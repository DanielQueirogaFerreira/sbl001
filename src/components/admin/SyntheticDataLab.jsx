import React, { useState } from 'react';
import { Bot, Sparkles, Database, PlusCircle, CheckCircle2, AlertCircle, RefreshCw, BarChart2 } from 'lucide-react';
import { generateSyntheticLogs, SYNTHETIC_SCENARIOS } from '../../services/syntheticGenerator';
import { getAllPatients } from '../../data/patientRepository';

export default function SyntheticDataLab({ onRefresh }) {
  const patients = getAllPatients();
  const [selectedPatientId, setSelectedPatientId] = useState(patients[0]?.id || 'amanda');
  const [selectedScenario, setSelectedScenario] = useState('duty_skew_spike');
  const [logCount, setLogCount] = useState(7);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Compute total RD and SD logs across all patients
  let totalRD = 0;
  let totalSD = 0;
  patients.forEach(p => {
    (p.logs || []).forEach(l => {
      if (l.isSynthetic || l.dataSource === 'SD') totalSD++;
      else totalRD++;
    });
  });

  const handleGenerate = (e) => {
    e.preventDefault();
    setError('');
    setMsg('');
    setIsGenerating(true);

    setTimeout(() => {
      const res = generateSyntheticLogs(selectedPatientId, selectedScenario, Number(logCount));
      setIsGenerating(false);
      if (res.success) {
        setMsg(`Sucesso! Gerados ${res.generatedCount} registros sintéticos [SD] para ${res.patientName} sob o cenário "${res.scenario}".`);
        onRefresh();
      } else {
        setError(res.error);
      }
    }, 400);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Metrics Banner */}
      <div className="stats-grid">
        <div className="glass-card stat-card">
          <div className="stat-title">
            <span>Dados Reais (RD)</span>
            <Database size={16} color="var(--color-prazer-light)" />
          </div>
          <div className="stat-value-group">
            <span className="stat-value" style={{ color: 'var(--color-prazer-light)' }}>
              {totalRD}
            </span>
            <span className="stat-subtext">prontuários (Forms/XLS)</span>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-title">
            <span>Dados Sintéticos (SD)</span>
            <Bot size={16} color="#c084fc" />
          </div>
          <div className="stat-value-group">
            <span className="stat-value" style={{ color: '#c084fc' }}>
              {totalSD}
            </span>
            <span className="stat-subtext">prontuários simulados</span>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-title">
            <span>Proporção RD / Total</span>
            <BarChart2 size={16} color="#38bdf8" />
          </div>
          <div className="stat-value-group">
            <span className="stat-value" style={{ color: '#38bdf8' }}>
              {totalRD + totalSD > 0 ? Math.round((totalRD / (totalRD + totalSD)) * 100) : 100}%
            </span>
            <span className="stat-subtext">autenticidade empírica</span>
          </div>
        </div>
      </div>

      {msg && (
        <div style={{ padding: '0.85rem 1.25rem', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', borderRadius: 'var(--radius-md)', color: '#6ee7b7', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle2 size={18} /> {msg}
        </div>
      )}

      {error && (
        <div style={{ padding: '0.85rem 1.25rem', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: 'var(--radius-md)', color: '#fca5a5', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertCircle size={18} /> {error}
        </div>
      )}

      {/* Generator Form Card */}
      <div className="glass-card">
        <div className="card-header" style={{ marginBottom: '1.25rem' }}>
          <div className="card-title-group">
            <div className="card-icon-badge" style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#c084fc' }}>
              <Bot size={18} />
            </div>
            <div>
              <h3>Laboratório de Geração de Dados Sintéticos [SD]</h3>
              <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Simulação calibrada de trajetórias clínicas para testes de estresse e projeções
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleGenerate}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Paciente Alvo:</label>
              <select 
                className="form-select"
                value={selectedPatientId}
                onChange={e => setSelectedPatientId(e.target.value)}
              >
                {patients.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.logs?.length || 0} logs atuais)
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Cenário Clínico Simulado:</label>
              <select 
                className="form-select"
                value={selectedScenario}
                onChange={e => setSelectedScenario(e.target.value)}
              >
                {SYNTHETIC_SCENARIOS.map(sc => (
                  <option key={sc.id} value={sc.id}>
                    {sc.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Quantidade de Prontuários (Dias):</label>
              <input 
                type="number"
                min={1}
                max={30}
                className="form-input"
                value={logCount}
                onChange={e => setLogCount(e.target.value)}
                required
              />
            </div>
          </div>

          <div style={{ padding: '0.85rem', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', marginBottom: '1.25rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {SYNTHETIC_SCENARIOS.find(s => s.id === selectedScenario)?.description}
            </span>
          </div>

          <button 
            type="submit" 
            className="btn btn-ai"
            disabled={isGenerating}
            style={{ width: '100%' }}
          >
            {isGenerating ? <><RefreshCw size={16} className="pulse-animation" /> Gerando Dados Sintéticos...</> : <><Sparkles size={16} /> Injetar Prontuários Sintéticos [SD] no Prontuário</>}
          </button>
        </form>
      </div>
    </div>
  );
}
