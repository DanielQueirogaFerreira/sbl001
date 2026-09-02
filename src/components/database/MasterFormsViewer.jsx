import React, { useState } from 'react';
import { 
  Layers, 
  Download, 
  RefreshCw, 
  Search, 
  FileText, 
  CheckCircle,
  ExternalLink,
  Table
} from 'lucide-react';
import { MASTER_FORMS_DATA } from '../../data/masterDatabase';

export default function MasterFormsViewer({
  onResetBaseline
}) {
  const [selectedFileId, setSelectedFileId] = useState('01');
  const [patientFilter, setPatientFilter] = useState('ALL');
  const [resetDone, setResetDone] = useState(false);

  const filteredForms = MASTER_FORMS_DATA.filter(form => {
    if (patientFilter === 'ALL') return true;
    return form.patient.toLowerCase() === patientFilter.toLowerCase();
  });

  const currentForm = MASTER_FORMS_DATA.find(f => f.file_id === selectedFileId) || MASTER_FORMS_DATA[0];

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(MASTER_FORMS_DATA, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "laboratorio_sobriedade_base_mestra.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleReset = () => {
    if (window.confirm('Deseja restaurar todo o banco para os dados originais dos 21 formulários?')) {
      if (onResetBaseline) onResetBaseline();
      setResetDone(true);
      setTimeout(() => setResetDone(false), 4000);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Top Banner */}
      <div className="glass-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div className="card-icon-badge">
                <Layers size={20} />
              </div>
              <h3>Base Mestra Consolidada (21 Arquivos / Matriz 7x3)</h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
              Ingestão direta dos 21 formulários Google Forms com as rotinas planejadas e 69 logs de Agosto de 2026.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            <button className="btn btn-secondary btn-sm" onClick={handleExportJson} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Download size={14} /> Exportar JSON
            </button>
            <button className="btn btn-secondary btn-sm" onClick={handleReset} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <RefreshCw size={14} /> Restaurar Baseline
            </button>
          </div>
        </div>

        {resetDone && (
          <div style={{ marginTop: '0.85rem', background: 'var(--color-prazer-bg)', border: '1px solid var(--color-prazer-border)', padding: '0.5rem 0.8rem', borderRadius: 'var(--radius-sm)', color: 'var(--color-prazer-light)', fontSize: '0.85rem' }}>
            ✓ Banco de dados restaurado com sucesso para a baseline dos 21 arquivos originais!
          </div>
        )}
      </div>

      {/* Main Grid: Form List on Left, Form Inspection on Right */}
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '1.5rem' }}>
        {/* Left Column: Form Files Selector */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {/* Patient Filter Pills */}
          <div style={{ display: 'flex', gap: '0.3rem', marginBottom: '0.5rem' }}>
            {['ALL', 'Amanda', 'Emannuel', 'Sabrina'].map(p => (
              <button
                key={p}
                className={`filter-btn ${patientFilter === p ? 'active' : ''}`}
                style={{ flex: 1, padding: '0.3rem', fontSize: '0.75rem' }}
                onClick={() => setPatientFilter(p)}
              >
                {p === 'ALL' ? 'Todos' : p}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', maxHeight: '550px', overflowY: 'auto' }}>
            {filteredForms.map(form => {
              const isSelected = form.file_id === selectedFileId;
              return (
                <button
                  key={form.file_id}
                  onClick={() => setSelectedFileId(form.file_id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    background: isSelected ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${isSelected ? 'rgba(6, 182, 212, 0.4)' : 'var(--border-subtle)'}`,
                    color: isSelected ? '#38bdf8' : 'var(--text-primary)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="badge badge-gray" style={{ fontSize: '0.7rem' }}>Arq {form.file_id}</span>
                    <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{form.patient}</span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{form.day_of_week?.slice(0, 3)}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Form Inspection */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="card-header">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h3>Arquivo {currentForm.file_id} — {currentForm.patient} ({currentForm.day_of_week})</h3>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                {currentForm.responses?.length || 0} respostas clínicas registradas
              </p>
            </div>
            <span className="badge badge-brand">Matriz 7x3 Ingerida</span>
          </div>

          {/* Planned Routine Section */}
          <div>
            <h4 style={{ fontSize: '0.88rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
              Grade Planejada no Formulário:
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
              <div className="shift-box">
                <div style={{ fontWeight: 600, color: 'var(--color-misto-light)', fontSize: '0.85rem' }}>🌅 Manhã</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', whiteSpace: 'pre-line' }}>
                  {currentForm.planned_routine?.manha || '—'}
                </div>
              </div>

              <div className="shift-box">
                <div style={{ fontWeight: 600, color: 'var(--color-brand)', fontSize: '0.85rem' }}>🌇 Tarde</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', whiteSpace: 'pre-line' }}>
                  {currentForm.planned_routine?.tarde || '—'}
                </div>
              </div>

              <div className="shift-box">
                <div style={{ fontWeight: 600, color: 'var(--color-purple)', fontSize: '0.85rem' }}>🌃 Noite</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', whiteSpace: 'pre-line' }}>
                  {currentForm.planned_routine?.noite || '—'}
                </div>
              </div>
            </div>
          </div>

          {/* Form Responses Table */}
          <div>
            <h4 style={{ fontSize: '0.88rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
              Respostas Registradas em Agosto de 2026:
            </h4>

            {(!currentForm.responses || currentForm.responses.length === 0) ? (
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Nenhuma resposta no arquivo.</p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                      <th style={{ textAlign: 'left', padding: '0.5rem' }}>Data/Hora</th>
                      <th style={{ textAlign: 'center', padding: '0.5rem' }}>Manhã</th>
                      <th style={{ textAlign: 'center', padding: '0.5rem' }}>Tarde</th>
                      <th style={{ textAlign: 'center', padding: '0.5rem' }}>Noite</th>
                      <th style={{ textAlign: 'center', padding: '0.5rem' }}>Sat</th>
                      <th style={{ textAlign: 'left', padding: '0.5rem' }}>Imprevistos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentForm.responses.map((resp, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <td style={{ padding: '0.5rem', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>
                          {resp.timestamp}
                        </td>
                        <td style={{ padding: '0.5rem', textAlign: 'center' }}>
                          <span className="badge badge-gray" style={{ fontSize: '0.7rem' }}>Nota {resp.manha?.score}</span>
                        </td>
                        <td style={{ padding: '0.5rem', textAlign: 'center' }}>
                          <span className="badge badge-gray" style={{ fontSize: '0.7rem' }}>Nota {resp.tarde?.score}</span>
                        </td>
                        <td style={{ padding: '0.5rem', textAlign: 'center' }}>
                          <span className="badge badge-gray" style={{ fontSize: '0.7rem' }}>Nota {resp.noite?.score}</span>
                        </td>
                        <td style={{ padding: '0.5rem', textAlign: 'center', fontWeight: 700, color: '#38bdf8' }}>
                          {resp.satisfacao || '-'}/10
                        </td>
                        <td style={{ padding: '0.5rem', color: 'var(--text-secondary)' }}>
                          {resp.imprevistos || '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
