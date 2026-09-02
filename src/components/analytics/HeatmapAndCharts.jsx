import React, { useState } from 'react';
import { 
  BarChart3, 
  Calendar, 
  Sun, 
  Sunset, 
  Moon, 
  TrendingUp,
  Activity,
  Smile
} from 'lucide-react';
import { getScoreCategory, getScoreBadgeClass } from '../../services/clinicalMetrics';

export default function HeatmapAndCharts({
  patient,
  logs = []
}) {
  const [selectedLog, setSelectedLog] = useState(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Top Banner */}
      <div className="glass-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div className="card-icon-badge">
                <BarChart3 size={20} />
              </div>
              <h3>Heatmap Longitudinal de Turnos & Séries Temporais</h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
              Visualização de evolução diária de <strong>{patient.name}</strong> por turnos (Manhã, Tarde, Noite).
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem' }}>
              <span style={{ width: '12px', height: '12px', background: 'var(--color-prazer)', borderRadius: '3px' }} />
              <span>Prazer (1–3)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem' }}>
              <span style={{ width: '12px', height: '12px', background: 'var(--color-misto)', borderRadius: '3px' }} />
              <span>Misto (4)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem' }}>
              <span style={{ width: '12px', height: '12px', background: 'var(--color-dever)', borderRadius: '3px' }} />
              <span>Dever (5–7)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Heatmap Matrix Card */}
      <div className="glass-card">
        <h4 style={{ fontSize: '0.95rem', marginBottom: '1rem', color: '#38bdf8' }}>
          Grade Temporal de Turnos Diários (Agosto 2026)
        </h4>

        {logs.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>
            Nenhum dado para exibir no período.
          </p>
        ) : (
          <div style={{ overflowX: 'auto', paddingBottom: '0.5rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                  <th style={{ textAlign: 'left', padding: '0.6rem' }}>Data & Dia</th>
                  <th style={{ textAlign: 'center', padding: '0.6rem' }}>🌅 Manhã</th>
                  <th style={{ textAlign: 'center', padding: '0.6rem' }}>🌇 Tarde</th>
                  <th style={{ textAlign: 'center', padding: '0.6rem' }}>🌃 Noite</th>
                  <th style={{ textAlign: 'center', padding: '0.6rem' }}>Satisfação</th>
                  <th style={{ textAlign: 'left', padding: '0.6rem' }}>Observações / Imprevistos</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log, idx) => {
                  const mScore = log.manha?.score || 4;
                  const tScore = log.tarde?.score || 4;
                  const nScore = log.noite?.score || 4;

                  return (
                    <tr
                      key={idx}
                      style={{
                        borderBottom: '1px solid rgba(255,255,255,0.04)',
                        background: selectedLog === log ? 'rgba(6, 182, 212, 0.08)' : 'transparent',
                        cursor: 'pointer'
                      }}
                      onClick={() => setSelectedLog(log)}
                    >
                      <td style={{ padding: '0.6rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
                        {log.date} <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>({log.day_of_week?.slice(0, 3)})</span>
                      </td>

                      {/* Manhã Cell */}
                      <td style={{ padding: '0.6rem', textAlign: 'center' }}>
                        <span
                          className={`badge ${getScoreBadgeClass(mScore)}`}
                          style={{ width: '50px', justifyContent: 'center' }}
                          title={`Manhã: ${mScore} (${log.manha?.status})`}
                        >
                          {mScore}
                        </span>
                      </td>

                      {/* Tarde Cell */}
                      <td style={{ padding: '0.6rem', textAlign: 'center' }}>
                        <span
                          className={`badge ${getScoreBadgeClass(tScore)}`}
                          style={{ width: '50px', justifyContent: 'center' }}
                          title={`Tarde: ${tScore} (${log.tarde?.status})`}
                        >
                          {tScore}
                        </span>
                      </td>

                      {/* Noite Cell */}
                      <td style={{ padding: '0.6rem', textAlign: 'center' }}>
                        <span
                          className={`badge ${getScoreBadgeClass(nScore)}`}
                          style={{ width: '50px', justifyContent: 'center' }}
                          title={`Noite: ${nScore} (${log.noite?.status})`}
                        >
                          {nScore}
                        </span>
                      </td>

                      {/* Satisfação */}
                      <td style={{ padding: '0.6rem', textAlign: 'center', fontWeight: 700, color: '#38bdf8' }}>
                        {log.satisfacao || '-'}/10
                      </td>

                      {/* Imprevisto */}
                      <td style={{ padding: '0.6rem', color: 'var(--text-secondary)', maxWidth: '350px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {log.imprevistos || '—'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Selected Log Inspector */}
      {selectedLog && (
        <div className="glass-card" style={{ borderLeft: '4px solid #38bdf8' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h4>Detalhes do Registro Selecionado: {selectedLog.date} ({selectedLog.day_of_week})</h4>
            <span className="badge badge-brand">Satisfação: {selectedLog.satisfacao}/10</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
            <div className="shift-box">
              <div style={{ fontWeight: 600, color: 'var(--color-misto-light)' }}>🌅 Manhã (Nota {selectedLog.manha?.score})</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{selectedLog.manha?.status}</div>
            </div>
            <div className="shift-box">
              <div style={{ fontWeight: 600, color: 'var(--color-brand)' }}>🌇 Tarde (Nota {selectedLog.tarde?.score})</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{selectedLog.tarde?.status}</div>
            </div>
            <div className="shift-box">
              <div style={{ fontWeight: 600, color: 'var(--color-purple)' }}>🌃 Noite (Nota {selectedLog.noite?.score})</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{selectedLog.noite?.status}</div>
            </div>
          </div>

          {selectedLog.imprevistos && (
            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem' }}>
              <strong>Relato / Imprevistos:</strong> {selectedLog.imprevistos}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
