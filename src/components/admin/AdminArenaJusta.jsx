import React, { useState } from 'react';
import { Swords, Trophy, Radio, Shield, CheckCircle2, ChevronRight, X, AlertTriangle } from 'lucide-react';
import { scoreJoustRound } from '../../services/scepterEngine';

export default function AdminArenaJusta({ joust, onClose, onJoustUpdated }) {
  const [commentary, setCommentary] = useState('');
  const [isFinishing, setIsFinishing] = useState(false);

  if (!joust) return null;

  const handleScore = (challengerNumber) => {
    const res = scoreJoustRound(challengerNumber, commentary);
    setCommentary('');
    if (res.success) {
      onJoustUpdated(res.joust);
    }
  };

  const isConcluded = joust.status === 'concluded';

  return (
    <div className="modal-backdrop" onClick={onClose} style={{ zIndex: 1200 }}>
      <div 
        className="modal-card" 
        style={{ 
          maxWidth: '750px', 
          background: 'linear-gradient(180deg, #0f172a 0%, #090d16 100%)',
          border: '1px solid rgba(245, 158, 11, 0.5)',
          boxShadow: '0 0 50px rgba(245, 158, 11, 0.2)'
        }} 
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-header" style={{ background: 'rgba(245, 158, 11, 0.1)', borderBottom: '1px solid rgba(245, 158, 11, 0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="card-icon-badge" style={{ background: 'rgba(245, 158, 11, 0.2)', color: 'var(--color-misto-light)' }}>
              <Swords size={22} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h3 style={{ margin: 0, color: 'var(--color-misto-light)' }}>Arena da Grande Justa dos Administradores</h3>
                <span className="badge" style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.4)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Radio size={12} className="pulse-animation" /> TRANSMISSÃO AO VIVO
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {joust.title} • Disputa pelo Cetro da Governança Suprema
              </p>
            </div>
          </div>
          <button className="btn btn-icon-only" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {/* Scoreboard */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '1rem', alignItems: 'center', padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', marginBottom: '1.5rem' }}>
            {/* Challenger 1 */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.25rem' }}>
                {joust.challenger1.avatar || '🛡️'}
              </div>
              <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                {joust.challenger1.name}
              </h4>
              <span className="badge badge-gray" style={{ fontSize: '0.7rem', marginTop: '0.3rem' }}>
                Desafiante I ({joust.challenger1.id})
              </span>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#38bdf8', marginTop: '0.5rem', fontFamily: 'var(--font-mono)' }}>
                {joust.challenger1.score}
              </div>
            </div>

            {/* Center VS */}
            <div style={{ textAlign: 'center', padding: '0 1rem' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--color-misto-light)', textShadow: '0 0 10px rgba(245, 158, 11, 0.5)' }}>
                VS
              </div>
              <span className="badge" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '0.5rem' }}>
                Round {joust.currentRound} / {joust.totalRounds}
              </span>
            </div>

            {/* Challenger 2 */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.25rem' }}>
                {joust.challenger2.avatar || '⚔️'}
              </div>
              <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                {joust.challenger2.name}
              </h4>
              <span className="badge badge-gray" style={{ fontSize: '0.7rem', marginTop: '0.3rem' }}>
                Desafiante II ({joust.challenger2.id})
              </span>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-prazer-light)', marginTop: '0.5rem', fontFamily: 'var(--font-mono)' }}>
                {joust.challenger2.score}
              </div>
            </div>
          </div>

          {/* Victory Announcement if Concluded */}
          {isConcluded ? (
            <div style={{ textAlign: 'center', padding: '1.75rem', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.4)', borderRadius: 'var(--radius-lg)', marginBottom: '1.5rem' }}>
              <Trophy size={48} color="var(--color-misto-light)" style={{ margin: '0 auto 0.75rem auto' }} />
              <h3 style={{ fontSize: '1.5rem', color: 'var(--color-misto-light)', margin: '0 0 0.5rem 0' }}>
                🏆 Justa Concluída: {joust.victor?.name} é o Novo Master!
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', maxWidth: '480px', margin: '0 auto' }}>
                O Cetro da Governança Suprema foi outorgado a <strong>{joust.victor?.name}</strong> após vitória proclamada na Arena e transmitida para o corpo clínico.
              </p>
            </div>
          ) : (
            /* Round Adjudication Controls */
            <div style={{ marginBottom: '1.5rem', background: 'rgba(255,255,255,0.02)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  ⚔️ Julgamento do Round {joust.currentRound}:
                </span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  {joust.currentRound === 1 ? 'Prova de Governança Clínica' : joust.currentRound === 2 ? 'Prova de Resiliência sob Pressão' : 'Prova de Liderança Ética'}
                </span>
              </div>

              <div className="form-group" style={{ marginBottom: '0.85rem' }}>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Comentário do Round para a transmissão oficial (opcional)..."
                  value={commentary}
                  onChange={e => setCommentary(e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <button 
                  className="btn btn-secondary" 
                  onClick={() => handleScore(1)}
                  style={{ borderColor: '#38bdf84d' }}
                >
                  Ponto para {joust.challenger1.name} (+1)
                </button>
                <button 
                  className="btn btn-secondary" 
                  onClick={() => handleScore(2)}
                  style={{ borderColor: 'var(--color-prazer-border)' }}
                >
                  Ponto para {joust.challenger2.name} (+1)
                </button>
              </div>
            </div>
          )}

          {/* Broadcast Live Feed */}
          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.6rem' }}>
              <Radio size={14} color="#f87171" /> Feed da Transmissão Oficial:
            </span>
            <div style={{ maxHeight: '180px', overflowY: 'auto', background: 'rgba(0,0,0,0.4)', borderRadius: 'var(--radius-md)', padding: '0.85rem', border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {joust.broadcastLog?.map((log, i) => (
                <div key={i} style={{ fontSize: '0.82rem', color: i === 0 ? 'var(--text-primary)' : 'var(--text-secondary)', lineHeight: 1.4, paddingLeft: '0.5rem', borderLeft: i === 0 ? '2px solid #38bdf8' : '2px solid transparent' }}>
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-primary btn-sm" onClick={onClose}>
            {isConcluded ? 'Fechar Arena & Ver Novo Master' : 'Fechar Visão da Transmissão'}
          </button>
        </div>
      </div>
    </div>
  );
}
