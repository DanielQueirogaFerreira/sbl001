import React, { useState } from 'react';
import { 
  FileText, 
  Layers, 
  PlusCircle, 
  ShieldCheck, 
  CheckCircle2, 
  Users, 
  Sliders, 
  Sparkles, 
  Lock,
  Copy,
  Info
} from 'lucide-react';
import { getAllProtocols, createProtocol, MASTER_PROTOCOL_PRT001 } from '../../services/protocolRepository';

export default function ProtocolStudioView({ currentUser, onRefresh }) {
  const protocols = getAllProtocols();
  const [selectedProtocolId, setSelectedProtocolId] = useState('PRT001');
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // New protocol form state
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newRationale, setNewRationale] = useState('');

  const activeProtocol = protocols.find(p => p.id === selectedProtocolId) || protocols[0];

  const handleCreate = (e) => {
    e.preventDefault();
    const res = createProtocol({
      name: newName,
      creatorId: currentUser?.id || 'PLN00001',
      creatorName: currentUser?.name || 'Dr. Plínio',
      description: newDesc,
      clinicalRationale: newRationale
    });
    if (res.success) {
      setIsCreatingNew(false);
      setSelectedProtocolId(res.protocol.id);
      setNewName('');
      setNewDesc('');
      setNewRationale('');
      if (onRefresh) onRefresh();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Header Banner */}
      <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.7))' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div className="card-icon-badge" style={{ width: '48px', height: '48px', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
              <Layers size={26} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.4rem', margin: 0 }}>Studio de Protocolos Clínicos</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                Governança de parâmetros terapêuticos, escalas de dever x prazer e tutoria clínica
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              className="btn btn-ai btn-sm"
              onClick={() => setIsCreatingNew(!isCreatingNew)}
            >
              <PlusCircle size={14} /> {isCreatingNew ? 'Ver Protocolos Ativos' : 'Criar Novo Protocolo'}
            </button>
          </div>
        </div>
      </div>

      {/* Protocol Tabs Selector */}
      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
        {protocols.map(p => (
          <button
            key={p.id}
            onClick={() => { setSelectedProtocolId(p.id); setIsCreatingNew(false); }}
            className={`filter-btn ${selectedProtocolId === p.id && !isCreatingNew ? 'active' : ''}`}
            style={{ padding: '0.6rem 1rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <FileText size={14} />
            <span>{p.code} — {p.name.split('—')[0]}</span>
            {p.id === 'PRT001' && (
              <span className="badge badge-brand" style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem' }}>
                Plínio Master
              </span>
            )}
          </button>
        ))}
      </div>

      {isCreatingNew ? (
        /* New Protocol Creation Form */
        <div className="glass-card">
          <div className="card-header" style={{ marginBottom: '1.25rem' }}>
            <div className="card-title-group">
              <div className="card-icon-badge">
                <PlusCircle size={18} color="var(--color-prazer-light)" />
              </div>
              <div>
                <h3>Configuração de Novo Protocolo de Atendimento</h3>
                <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Tutor Responsável: {currentUser?.name} ({currentUser?.code})
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleCreate}>
            <div className="form-group">
              <label className="form-label">Nome do Protocolo:</label>
              <input 
                type="text"
                className="form-input"
                placeholder="Ex: Protocolo de Transição com Ancoragem Familiar"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Descrição Clínica & Diretrizes:</label>
              <textarea 
                className="form-textarea"
                placeholder="Descreva o escopo e aplicação do protocolo..."
                value={newDesc}
                onChange={e => setNewDesc(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Racional Científico / Clínico:</label>
              <textarea 
                className="form-textarea"
                placeholder="Fundamentação teórica (ex: TCC, Prevenção de Recaída baseada em Mindfulness, Manejo de Contingências)..."
                value={newRationale}
                onChange={e => setNewRationale(e.target.value)}
                required
              />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
              <button type="button" className="btn btn-secondary" onClick={() => setIsCreatingNew(false)}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                Salvar & Registrar Protocolo no Studio
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Protocol Detail Card */
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '1.5rem' }}>
          {/* Left Column: Protocol Parameters */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="card-header">
              <div className="card-title-group">
                <div className="card-icon-badge" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
                  <FileText size={18} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <h3 style={{ margin: 0 }}>{activeProtocol.name}</h3>
                    {activeProtocol.isLockedMaster && (
                      <span className="badge badge-brand" title="Protocolo Mestre sob tutela do Dr. Plínio">
                        <Lock size={10} style={{ marginRight: '0.2rem' }} /> Mestre SBL
                      </span>
                    )}
                  </div>
                  <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Código: <strong style={{ color: '#38bdf8' }}>{activeProtocol.code}</strong> • Tutor Clínico: <strong>{activeProtocol.creatorName}</strong> ({activeProtocol.creatorId})
                  </p>
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {activeProtocol.description}
            </p>

            {/* Parameters Grid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', background: 'rgba(255,255,255,0.02)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Sliders size={16} color="#38bdf8" /> Parâmetros Operacionais Fixados:
              </h4>

              {Object.entries(activeProtocol.parameters || {}).map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', padding: '0.35rem 0', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <span style={{ color: 'var(--text-muted)', textTransform: 'capitalize' }}>
                    {k.replace(/([A-Z])/g, ' $1')}:
                  </span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600, textAlign: 'right', maxWidth: '60%' }}>
                    {Array.isArray(v) ? v.join(', ') : String(v)}
                  </span>
                </div>
              ))}
            </div>

            {/* Clinical Rationale */}
            <div style={{ padding: '1rem', background: 'rgba(56, 189, 248, 0.05)', border: '1px solid rgba(56, 189, 248, 0.2)', borderRadius: 'var(--radius-md)' }}>
              <strong style={{ fontSize: '0.82rem', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.3rem' }}>
                <Info size={14} /> Racional Clínico de Sustentação:
              </strong>
              <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                {activeProtocol.clinicalRationale}
              </p>
            </div>
          </div>

          {/* Right Column: Assigned Patients & Tutorship */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="card-header">
              <div className="card-title-group">
                <div className="card-icon-badge" style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--color-prazer-light)' }}>
                  <Users size={18} />
                </div>
                <div>
                  <h3>Pacientes sob Tutela deste Protocolo</h3>
                  <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Prontuários regidos pelas métricas de {activeProtocol.code}
                  </p>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {activeProtocol.assignedPatients?.map(pid => (
                <div 
                  key={pid} 
                  className="shift-box"
                  style={{
                    padding: '0.85rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>
                      {pid === 'amanda' ? '👩‍⚕️' : pid === 'emannuel' ? '👨‍💼' : '👩‍🎨'}
                    </span>
                    <div>
                      <strong style={{ fontSize: '0.9rem', color: 'var(--text-primary)', textTransform: 'capitalize' }}>
                        {pid}
                      </strong>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        Fase de Consolidação • 3 Turnos Diários
                      </div>
                    </div>
                  </div>
                  <span className="badge badge-prazer" style={{ fontSize: '0.7rem' }}>
                    Ativo sob PRT001
                  </span>
                </div>
              ))}
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', marginTop: 'auto' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                Tutoria Institucional:
              </span>
              <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-primary)', lineHeight: 1.4 }}>
                Os 3 pacientes importados dos 21 formulários Google Forms estão vinculados e validados segundo o <strong>{activeProtocol.name}</strong>, tutorado pelo <strong>{activeProtocol.creatorName}</strong>.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
