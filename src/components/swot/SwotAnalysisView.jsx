import React, { useState } from 'react';
import { 
  BrainCircuit, 
  Sparkles, 
  ShieldAlert, 
  CheckCircle2, 
  TrendingUp, 
  AlertTriangle,
  Lightbulb,
  Copy,
  Check,
  Calendar,
  Share2
} from 'lucide-react';
import { generateClinicalSwot } from '../../services/swotEngine';

export default function SwotAnalysisView({
  patient,
  logs = [],
  weeklyRoutines = {},
  timeframe,
  onSelectTimeframe
}) {
  const [copied, setCopied] = useState(false);
  const swot = generateClinicalSwot(patient, logs, weeklyRoutines);

  const handleCopyReport = () => {
    const reportText = `LABORATÓRIO DA SOBRIEDADE — RELATÓRIO SWOT CLÍNICO
Paciente: ${patient.name} (${patient.diagnosis})
Data de Geração: ${new Date().toLocaleDateString('pt-BR')}
Base de Análise: ${swot.timeframeLogsCount} logs registrados

1. FORÇAS (Strengths):
${swot.matrix.forcas.map(f => `• ${f}`).join('\n')}

2. FRAQUEZAS (Weaknesses):
${swot.matrix.fraquezas.map(f => `• ${f}`).join('\n')}

3. OPORTUNIDADES (Opportunities):
${swot.matrix.oportunidades.map(o => `• ${o}`).join('\n')}

4. AMEAÇAS (Threats / Preditores de Recaída):
${swot.matrix.ameacas.map(a => `• ${a}`).join('\n')}

PARECER CLÍNICO:
${swot.clinicalRecommendation}
`;

    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Top Banner */}
      <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(6, 182, 212, 0.15))', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div className="card-icon-badge" style={{ background: 'rgba(168, 85, 247, 0.2)', color: '#c084fc' }}>
              <BrainCircuit size={22} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <h2 style={{ fontSize: '1.4rem' }}>Matriz SWOT Clínica com IA</h2>
                <span className="badge badge-purple" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Sparkles size={12} /> Multi-Model Top Tier
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                Avaliação multidimensional de estabilidade para <strong>{patient.name}</strong> baseada em {swot.timeframeLogsCount} logs registrados.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <button className="btn btn-secondary btn-sm" onClick={handleCopyReport}>
              {copied ? <Check size={14} color="#34d399" /> : <Copy size={14} />}
              <span>{copied ? 'Copiado!' : 'Copiar Relatório'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Clinical Recommendation Card */}
      <div style={{ background: 'rgba(6, 182, 212, 0.08)', border: '1px solid rgba(6, 182, 212, 0.3)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
        <div style={{ padding: '0.4rem', background: 'rgba(6, 182, 212, 0.2)', borderRadius: 'var(--radius-md)', color: '#38bdf8' }}>
          <Lightbulb size={20} />
        </div>
        <div>
          <h4 style={{ fontSize: '0.95rem', color: '#38bdf8', marginBottom: '0.3rem' }}>
            Parecer Terapêutico Integrado (Mentoria & Prevenção de Recaída)
          </h4>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-primary)', lineHeight: '1.5' }}>
            {swot.clinicalRecommendation}
          </p>
        </div>
      </div>

      {/* 4 Quadrants SWOT Grid */}
      <div className="swot-grid">
        {/* 1. Forças */}
        <div className="swot-quadrant swot-forcas">
          <div className="swot-header">
            <span className="swot-title" style={{ color: 'var(--color-prazer-light)' }}>
              <CheckCircle2 size={18} /> Forças (Strengths)
            </span>
            <span className="badge badge-prazer">{swot.matrix.forcas.length} Fatores</span>
          </div>
          <ul className="swot-list">
            {swot.matrix.forcas.map((item, idx) => (
              <li key={idx} className="swot-item">
                <span className="swot-bullet" style={{ background: 'var(--color-prazer)' }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 2. Fraquezas */}
        <div className="swot-quadrant swot-fraquezas">
          <div className="swot-header">
            <span className="swot-title" style={{ color: 'var(--color-misto-light)' }}>
              <AlertTriangle size={18} /> Fraquezas (Weaknesses)
            </span>
            <span className="badge badge-misto">{swot.matrix.fraquezas.length} Fatores</span>
          </div>
          <ul className="swot-list">
            {swot.matrix.fraquezas.map((item, idx) => (
              <li key={idx} className="swot-item">
                <span className="swot-bullet" style={{ background: 'var(--color-misto)' }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 3. Oportunidades */}
        <div className="swot-quadrant swot-oportunidades">
          <div className="swot-header">
            <span className="swot-title" style={{ color: '#38bdf8' }}>
              <TrendingUp size={18} /> Oportunidades (Opportunities)
            </span>
            <span className="badge badge-brand">{swot.matrix.oportunidades.length} Fatores</span>
          </div>
          <ul className="swot-list">
            {swot.matrix.oportunidades.map((item, idx) => (
              <li key={idx} className="swot-item">
                <span className="swot-bullet" style={{ background: '#38bdf8' }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 4. Ameaças */}
        <div className="swot-quadrant swot-ameacas">
          <div className="swot-header">
            <span className="swot-title" style={{ color: 'var(--color-dever-light)' }}>
              <ShieldAlert size={18} /> Ameaças (Threats / Risco de Recaída)
            </span>
            <span className="badge badge-dever">{swot.matrix.ameacas.length} Fatores</span>
          </div>
          <ul className="swot-list">
            {swot.matrix.ameacas.map((item, idx) => (
              <li key={idx} className="swot-item">
                <span className="swot-bullet" style={{ background: 'var(--color-dever)' }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
