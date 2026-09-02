import React, { useState } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  CheckCircle, 
  BrainCircuit, 
  Sun, 
  Sunset, 
  Moon, 
  Scale,
  Mic
} from 'lucide-react';
import { parseConversationalDump } from '../../services/swotEngine';
import { getScoreCategory, getScoreBadgeClass, getScoreLabel } from '../../services/clinicalMetrics';

const SAMPLE_PROMPTS = [
  "Acordei 8h, tomei café e estudei bastante. De tarde fui na academia mas tava cansativo nota 6. De noite não fui pro ambulatório porque dormi cedo.",
  "Hoje o dia foi ótimo nota 10! Fui pro NA pela manhã, passei a tarde com minha família no balneário e a noite descansei.",
  "Dia super puxado de trabalho, muita pressão e dever o dia todo nota 7. Quase não tive descanso a tarde e a noite fui direto pro ambulatório."
];

export default function AiConversationalModal({
  isOpen,
  onClose,
  patient,
  onSaveParsedLog
}) {
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [parsedResult, setParsedResult] = useState(null);

  if (!isOpen) return null;

  const handleProcess = () => {
    if (!inputText.trim()) return;
    setIsProcessing(true);
    setTimeout(() => {
      const res = parseConversationalDump(inputText);
      setParsedResult(res);
      setIsProcessing(false);
    }, 600);
  };

  const handleConfirmSave = () => {
    if (parsedResult && onSaveParsedLog) {
      const todayStr = new Date().toISOString().split('T')[0];
      const days = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
      const todayDayName = days[new Date().getDay()];

      onSaveParsedLog(patient.id, {
        timestamp: `${todayStr} ${new Date().toTimeString().slice(0, 8)}`,
        day_of_week: todayDayName,
        manha: parsedResult.extractedData.manha,
        tarde: parsedResult.extractedData.tarde,
        noite: parsedResult.extractedData.noite,
        satisfacao: parsedResult.extractedData.satisfacao,
        imprevistos: parsedResult.extractedData.imprevistos
      });
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div className="card-icon-badge" style={{ background: 'rgba(168, 85, 247, 0.2)', color: '#c084fc' }}>
              <Sparkles size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem' }}>Registro Rápido Conversacional (Dump IA)</h3>
              <p style={{ fontSize: '0.78rem' }}>Paciente: <strong>{patient.name}</strong> • Extração Inteligente de Turnos</p>
            </div>
          </div>
          <button className="btn btn-secondary btn-icon-only" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Instructions & Sample Prompts */}
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
              💡 Exemplos rápidos (clique para testar o parser):
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {SAMPLE_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setInputText(prompt)}
                  style={{
                    textAlign: 'left',
                    background: 'transparent',
                    border: 'none',
                    color: '#38bdf8',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    padding: '0.2rem 0'
                  }}
                >
                  "{prompt.slice(0, 75)}..."
                </button>
              ))}
            </div>
          </div>

          {/* Text Area Input */}
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Fale ou digite o relato do seu dia:</span>
              <span style={{ color: '#c084fc', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem' }}>
                <BrainCircuit size={13} /> Processamento Contextual
              </span>
            </label>
            <textarea
              className="form-textarea"
              style={{ minHeight: '110px' }}
              placeholder="Ex: Fui de manhã levar meu filho na escola, tomei café e fiz a caminhada. De tarde limpei a casa e foi cansativo nota 6. De noite não fui ao ambulatório..."
              value={inputText}
              onChange={e => setInputText(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="btn btn-ai"
            onClick={handleProcess}
            disabled={isProcessing || !inputText.trim()}
            style={{ width: '100%', padding: '0.65rem' }}
          >
            {isProcessing ? <Sparkles size={16} className="pulse-animation" /> : <Send size={16} />}
            <span>{isProcessing ? 'Decodificando Turnos com IA...' : 'Decodificar Turnos com IA'}</span>
          </button>

          {/* Parsed Result Preview */}
          {parsedResult && (
            <div style={{ background: 'rgba(6, 182, 212, 0.06)', border: '1px solid rgba(6, 182, 212, 0.3)', borderRadius: 'var(--radius-md)', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, color: '#38bdf8', fontSize: '0.9rem' }}>
                  Resultado da Decodificação IA:
                </span>
                <span className="badge badge-brand">Satisfação Prevista: {parsedResult.extractedData.satisfacao}/10</span>
              </div>

              {/* 3 Shifts Preview */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--color-misto-light)', fontWeight: 600 }}>🌅 Manhã</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>Nota {parsedResult.extractedData.manha.score}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{parsedResult.extractedData.manha.status}</div>
                </div>

                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--color-brand)', fontWeight: 600 }}>🌇 Tarde</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>Nota {parsedResult.extractedData.tarde.score}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{parsedResult.extractedData.tarde.status}</div>
                </div>

                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--color-purple)', fontWeight: 600 }}>🌃 Noite</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>Nota {parsedResult.extractedData.noite.score}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{parsedResult.extractedData.noite.status}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary btn-sm" onClick={onClose}>Cancelar</button>
          {parsedResult && (
            <button className="btn btn-primary btn-sm" onClick={handleConfirmSave} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <CheckCircle size={15} /> Gravar no Prontuário
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
