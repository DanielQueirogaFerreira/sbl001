import React from 'react';
import { 
  HeartHandshake, 
  Scale, 
  CheckCircle2, 
  AlertTriangle, 
  Smile, 
  Flame,
  Sun,
  Sunset,
  Moon,
  TrendingUp,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { calculateClinicalMetrics, getScoreCategory, getScoreBadgeClass } from '../../services/clinicalMetrics';
import { calculateRoutineDrift, analyzeWeeklyRoutinePatterns } from '../../services/routineEngine';

export default function OverviewDashboard({
  patient,
  logs = [],
  weeklyRoutines = {},
  onNavigateTab
}) {
  const metrics = calculateClinicalMetrics(logs);
  const drift = calculateRoutineDrift(logs);
  const patterns = analyzeWeeklyRoutinePatterns(weeklyRoutines);

  const totalScores = metrics.prazerCount + metrics.mistoCount + metrics.deverCount;
  const prazerPct = totalScores > 0 ? Math.round((metrics.prazerCount / totalScores) * 100) : 0;
  const mistoPct = totalScores > 0 ? Math.round((metrics.mistoCount / totalScores) * 100) : 0;
  const deverPct = totalScores > 0 ? Math.round((metrics.deverCount / totalScores) * 100) : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Patient Header Banner */}
      <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.6))' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ fontSize: '2.5rem', background: 'rgba(255,255,255,0.05)', padding: '0.4rem', borderRadius: 'var(--radius-md)' }}>
              {patient.avatar}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <h2 style={{ fontSize: '1.4rem' }}>{patient.name}</h2>
                <span className={`badge ${metrics.riskBadge}`}>{metrics.clinicalRiskLevel}</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                {patient.diagnosis}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            <div className="shift-box" style={{ padding: '0.5rem 0.9rem', minWidth: '130px' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Padrões Semanais</span>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: patterns.badgeColor === 'badge-prazer' ? 'var(--color-prazer-light)' : 'var(--color-misto-light)' }}>
                {patterns.patternCount} / 4 Padrões
              </span>
            </div>
            <div className="shift-box" style={{ padding: '0.5rem 0.9rem', minWidth: '130px' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Taxa de Aderência</span>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-prazer-light)' }}>
                {metrics.adherenceRate}%
              </span>
            </div>
            <div className="shift-box" style={{ padding: '0.5rem 0.9rem', minWidth: '130px' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Satisfação Média</span>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#38bdf8' }}>
                {metrics.avgSatisfaction} / 10
              </span>
            </div>
          </div>
        </div>

        {/* Anchors Pill List */}
        <div style={{ marginTop: '1rem', paddingTop: '0.85rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <ShieldCheck size={14} /> Âncoras Terapêuticas:
          </span>
          {patient.keyAnchors?.map((anc, i) => (
            <span key={i} className="badge badge-gray" style={{ fontSize: '0.72rem', textTransform: 'none' }}>
              {anc}
            </span>
          ))}
        </div>
      </div>

      {/* Top Clinical Stats Cards Grid */}
      <div className="stats-grid">
        {/* Card 1: Duty Skew Index */}
        <div className="glass-card stat-card">
          <div className="stat-title">
            <span>Índice Dever x Prazer</span>
            <Scale size={16} color="var(--color-misto)" />
          </div>
          <div className="stat-value-group">
            <span className="stat-value" style={{ color: metrics.dutySkewIndex > 60 ? 'var(--color-dever-light)' : 'var(--color-prazer-light)' }}>
              {metrics.dutySkewIndex}%
            </span>
            <span className="stat-subtext">em modo Dever (5-7)</span>
          </div>
          <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden', display: 'flex', marginTop: '0.4rem' }}>
            <div style={{ width: `${prazerPct}%`, background: 'var(--color-prazer)' }} title={`Prazer: ${prazerPct}%`} />
            <div style={{ width: `${mistoPct}%`, background: 'var(--color-misto)' }} title={`Misto: ${mistoPct}%`} />
            <div style={{ width: `${deverPct}%`, background: 'var(--color-dever)' }} title={`Dever: ${deverPct}%`} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            <span style={{ color: 'var(--color-prazer-light)' }}>Prazer: {prazerPct}%</span>
            <span style={{ color: 'var(--color-misto-light)' }}>Misto: {mistoPct}%</span>
            <span style={{ color: 'var(--color-dever-light)' }}>Dever: {deverPct}%</span>
          </div>
        </div>

        {/* Card 2: Shift Pleasure vs Duty Averages */}
        <div className="glass-card stat-card">
          <div className="stat-title">
            <span>Médias por Turno</span>
            <TrendingUp size={16} color="#38bdf8" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginTop: '0.25rem' }}>
            <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.03)', padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.2rem', color: 'var(--color-misto-light)', fontSize: '0.75rem' }}>
                <Sun size={12} /> Manhã
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                {metrics.avgManhaScore}
              </div>
            </div>

            <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.03)', padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.2rem', color: 'var(--color-brand)', fontSize: '0.75rem' }}>
                <Sunset size={12} /> Tarde
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                {metrics.avgTardeScore}
              </div>
            </div>

            <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.03)', padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.2rem', color: 'var(--color-purple)', fontSize: '0.75rem' }}>
                <Moon size={12} /> Noite
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                {metrics.avgNoiteScore}
              </div>
            </div>
          </div>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            Escala 1–7 (1–3 Prazer, 4 Misto, 5–7 Dever)
          </span>
        </div>

        {/* Card 3: Routine Drift Index */}
        <div className="glass-card stat-card">
          <div className="stat-title">
            <span>Desvio de Rotina (Drift)</span>
            <AlertTriangle size={16} color="var(--color-dever)" />
          </div>
          <div className="stat-value-group">
            <span className="stat-value" style={{ color: drift.driftIndex > 40 ? 'var(--color-dever-light)' : 'var(--color-prazer-light)' }}>
              {drift.driftIndex}%
            </span>
            <span className="stat-subtext">{drift.ruptureLevel}</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
            {drift.anchorStats.ambulatorioMissed > 0 || drift.anchorStats.naMissed > 0
              ? `Atenção: ${drift.anchorStats.ambulatorioMissed} ausência(s) em ambulatório / ${drift.anchorStats.naMissed} em NA.`
              : 'Nenhuma ausência crítica em reuniões clínicas nos logs registrados.'}
          </p>
        </div>
      </div>

      {/* Main Grid: Escala Prazer x Dever Explained & Recent Logs Timeline */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '1.5rem' }}>
        {/* Left Column: Escala Prazer x Dever Card */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="card-header">
            <div className="card-title-group">
              <div className="card-icon-badge">
                <Scale size={18} />
              </div>
              <div>
                <h3>Escala Prazer x Dever</h3>
                <p style={{ fontSize: '0.8rem' }}>Metodologia Clínica de Pontuação Diária</p>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ padding: '0.85rem', background: 'var(--color-prazer-bg)', border: '1px solid var(--color-prazer-border)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                <span style={{ fontWeight: 700, color: 'var(--color-prazer-light)', fontSize: '0.9rem' }}>Notas 1, 2 e 3: Prazer</span>
                <span className="badge badge-prazer">Máx: 3</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-primary)' }}>
                Atividades realizadas porque o paciente <strong>gosta</strong>. Essenciais para recarga dopaminérgica e equilíbrio emocional.
              </p>
            </div>

            <div style={{ padding: '0.85rem', background: 'var(--color-misto-bg)', border: '1px solid var(--color-misto-border)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                <span style={{ fontWeight: 700, color: 'var(--color-misto-light)', fontSize: '0.9rem' }}>Nota 4: Misto</span>
                <span className="badge badge-misto">Neutro</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-primary)' }}>
                Atividades equilibradas que combinam obrigação e satisfação pessoal.
              </p>
            </div>

            <div style={{ padding: '0.85rem', background: 'var(--color-dever-bg)', border: '1px solid var(--color-dever-border)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                <span style={{ fontWeight: 700, color: 'var(--color-dever-light)', fontSize: '0.9rem' }}>Notas 5, 6 e 7: Dever</span>
                <span className="badge badge-dever">Máx: 7</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-primary)' }}>
                Atividades executadas por <strong>obrigação / necessidade</strong>. Picos contínuos geram sobrecarga e risco de recaída.
              </p>
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Sparkles size={14} /> Regra Empírica dos Padrões:
            </span>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.3rem', lineHeight: '1.4' }}>
              Pacientes saudáveis mantêm entre <strong>3 a 4 padrões de rotina por semana</strong>. Menos de 2 indica rigidez excessiva; mais de 5 indica rotina caótica propensa a recaídas.
            </p>
          </div>
        </div>

        {/* Right Column: Historical Logs Feed */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="card-header">
            <div className="card-title-group">
              <div className="card-icon-badge">
                <Calendar size={18} />
              </div>
              <div>
                <h3>Registros Recentes de Prontuário</h3>
                <p style={{ fontSize: '0.8rem' }}>Logs dos Formulários em Agosto de 2026</p>
              </div>
            </div>
            <span className="badge badge-brand">{logs.length} Registros</span>
          </div>

          {/* Logs Scrollable Container */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', maxHeight: '420px', overflowY: 'auto', paddingRight: '0.4rem' }}>
            {logs.length === 0 ? (
              <p style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                Nenhum log encontrado para a janela selecionada.
              </p>
            ) : (
              logs.map((log, idx) => (
                <div
                  key={log.id || idx}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.9rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                        {log.day_of_week}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        {log.timestamp}
                      </span>
                      {log.isSynthetic && (
                        <span className="badge badge-purple" style={{ fontSize: '0.65rem' }}>Sintético</span>
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Satisfação:</span>
                      <span style={{ fontWeight: 700, color: '#38bdf8' }}>{log.satisfacao || '-'}/10</span>
                    </div>
                  </div>

                  {/* 3 Shifts Pills Row */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                    <div style={{ fontSize: '0.75rem', background: 'rgba(0,0,0,0.2)', padding: '0.35rem 0.5rem', borderRadius: 'var(--radius-sm)' }}>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>🌅 Manhã</div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.15rem' }}>
                        <span style={{ fontWeight: 600 }}>{log.manha?.score || 4}</span>
                        <span className={`badge ${getScoreBadgeClass(log.manha?.score)}`} style={{ padding: '0.1rem 0.35rem', fontSize: '0.65rem' }}>
                          {getScoreCategory(log.manha?.score)}
                        </span>
                      </div>
                    </div>

                    <div style={{ fontSize: '0.75rem', background: 'rgba(0,0,0,0.2)', padding: '0.35rem 0.5rem', borderRadius: 'var(--radius-sm)' }}>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>🌇 Tarde</div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.15rem' }}>
                        <span style={{ fontWeight: 600 }}>{log.tarde?.score || 4}</span>
                        <span className={`badge ${getScoreBadgeClass(log.tarde?.score)}`} style={{ padding: '0.1rem 0.35rem', fontSize: '0.65rem' }}>
                          {getScoreCategory(log.tarde?.score)}
                        </span>
                      </div>
                    </div>

                    <div style={{ fontSize: '0.75rem', background: 'rgba(0,0,0,0.2)', padding: '0.35rem 0.5rem', borderRadius: 'var(--radius-sm)' }}>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>🌃 Noite</div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.15rem' }}>
                        <span style={{ fontWeight: 600 }}>{log.noite?.score || 4}</span>
                        <span className={`badge ${getScoreBadgeClass(log.noite?.score)}`} style={{ padding: '0.1rem 0.35rem', fontSize: '0.65rem' }}>
                          {getScoreCategory(log.noite?.score)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Imprevistos / Notes */}
                  {log.imprevistos && log.imprevistos.trim() !== '' && (
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.02)', padding: '0.4rem 0.6rem', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid #38bdf8' }}>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Obs / Imprevisto: </span>
                      {log.imprevistos}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
