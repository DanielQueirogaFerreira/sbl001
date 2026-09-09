import React, { useState } from 'react';
import { ArrowRightLeft, Lock, Globe, Key, CheckCircle2, AlertCircle, Copy, X } from 'lucide-react';
import { initiateSecretTransfer, releaseToPublicSquare } from '../../services/transferEngine';

export default function PatientTransferModal({ isOpen, onClose, patient, currentProfessional, onTransferInitiated }) {
  const [transferType, setTransferType] = useState('secret'); // 'secret' | 'public'
  const [customPin, setCustomPin] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen || !patient) return null;

  const handleStartTransfer = () => {
    setError('');
    setResult(null);

    if (transferType === 'secret') {
      let pin = customPin.trim();
      if (pin && (pin.length !== 4 || isNaN(Number(pin)))) {
        setError('O PIN numérico de segurança deve possuir exatamente 4 dígitos numéricos (ex: 4892).');
        return;
      }
      const res = initiateSecretTransfer(patient.id, currentProfessional?.id || 'PLN00001', pin || null);
      if (res.success) {
        setResult(res);
        onTransferInitiated();
      } else {
        setError(res.error);
      }
    } else {
      let pin = customPin.trim();
      if (pin && (pin.length !== 4 || isNaN(Number(pin)))) {
        setError('Caso deseje proteger a vaga na praça, o PIN deve ter exatamente 4 dígitos numéricos.');
        return;
      }
      const res = releaseToPublicSquare(patient.id, currentProfessional?.id || 'PLN00001', pin || null);
      if (res.success) {
        setResult({ isPublic: true, patientName: patient.name, pin: res.pin });
        onTransferInitiated();
      } else {
        setError(res.error);
      }
    }
  };

  const copyToClipboard = () => {
    if (result && result.pin) {
      const modeText = result.isPublic ? 'Praça Pública (Protegida)' : 'Transferência Secreta Privada';
      const codeText = result.transferCode ? `Código: ${result.transferCode}\n` : '';
      const text = `Laboratório da Sobriedade — Manejo de Paciente (${modeText})\nPaciente: ${result.patientName}\n${codeText}PIN de 4 Dígitos: ${result.pin}`;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" style={{ maxWidth: '520px' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div className="card-icon-badge">
              <ArrowRightLeft size={20} color="#38bdf8" />
            </div>
            <div>
              <h3 style={{ margin: 0 }}>Manejo & Transferência de Paciente</h3>
              <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Paciente: <strong>{patient.name}</strong> • Protocolo: {patient.protocolId || 'PRT001'}
              </p>
            </div>
          </div>
          <button className="btn btn-icon-only" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {error && (
            <div style={{ padding: '0.75rem', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: 'var(--radius-md)', color: '#fca5a5', fontSize: '0.85rem', marginBottom: '1rem' }}>
              {error}
            </div>
          )}

          {!result ? (
            <div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                Selecione a modalidade de migração para liberar a responsabilidade clínica de <strong>{patient.name}</strong> para outros profissionais credenciados:
              </p>

              {/* Mode Selector */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginBottom: '1.25rem' }}>
                <button
                  type="button"
                  onClick={() => setTransferType('secret')}
                  className={`shift-box ${transferType === 'secret' ? 'active' : ''}`}
                  style={{
                    padding: '1rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    border: transferType === 'secret' ? '2px solid #38bdf8' : '1px solid var(--border-subtle)',
                    background: transferType === 'secret' ? 'rgba(56, 189, 248, 0.1)' : 'rgba(255,255,255,0.02)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                    <Lock size={16} color="#38bdf8" />
                    <strong style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>Troca Secreta</strong>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                    Privada. O paciente não aparece na praça aberta. O acolhimento exige o <strong>Código TRF + PIN de 4 dígitos</strong>.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setTransferType('public')}
                  className={`shift-box ${transferType === 'public' ? 'active' : ''}`}
                  style={{
                    padding: '1rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    border: transferType === 'public' ? '2px solid var(--color-prazer-light)' : '1px solid var(--border-subtle)',
                    background: transferType === 'public' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.02)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                    <Globe size={16} color="var(--color-prazer-light)" />
                    <strong style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>Troca Pública</strong>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                    O paciente fica visível na <strong>Praça Pública</strong> para todos os profissionais (livre ou protegido por PIN).
                  </p>
                </button>
              </div>

              {/* PIN input for both secret and public */}
              <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Key size={14} color={transferType === 'secret' ? '#38bdf8' : '#34d399'} /> 
                  {transferType === 'secret' ? 'Definir PIN de 4 Dígitos Numéricos (Opcional):' : 'Proteger Vaga Pública com PIN de 4 Dígitos (Opcional):'}
                </label>
                <input
                  type="text"
                  maxLength={4}
                  className="form-input"
                  placeholder={transferType === 'secret' ? 'Ex: 4892 (ou deixe vazio para gerar automático)' : 'Deixe vazio para Praça Livre ou digite 4 dígitos'}
                  value={customPin}
                  onChange={e => setCustomPin(e.target.value.replace(/\D/g, ''))}
                />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {transferType === 'secret' 
                    ? 'O terapeuta receptor precisará do Código TRF gerado e deste PIN para resgatar.' 
                    : 'Se informado, outros profissionais só conseguirão acolher da praça informando este PIN.'}
                </span>
              </div>

              <button
                className={`btn ${transferType === 'secret' ? 'btn-ai' : 'btn-primary'}`}
                style={{ width: '100%' }}
                onClick={handleStartTransfer}
              >
                {transferType === 'secret' ? 'Gerar PIN & Abrir Troca Secreta' : 'Liberar Paciente para a Praça Pública'}
              </button>
            </div>
          ) : (
            /* Result Screen */
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto', color: 'var(--color-prazer-light)' }}>
                <CheckCircle2 size={32} />
              </div>

              {result.isPublic ? (
                <div>
                  <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Paciente Liberado na Praça Pública!</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto 1.5rem auto' }}>
                    <strong>{result.patientName}</strong> agora está disponível na Praça Pública para ser acolhido por profissionais credenciados.
                  </p>
                  {result.pin && (
                    <div style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(16, 185, 129, 0.4)', borderRadius: 'var(--radius-lg)', padding: '1rem', marginBottom: '1.25rem' }}>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>VAGA PROTEGIDA POR PIN DE 4 DÍGITOS:</span>
                      <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-prazer-light)', letterSpacing: '0.2em', fontFamily: 'var(--font-mono)' }}>
                        {result.pin}
                      </div>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0.3rem 0 0 0' }}>
                        Repasse este PIN para o profissional que for acolher na praça.
                      </p>
                    </div>
                  )}
                  {result.pin && (
                    <button className="btn btn-secondary btn-sm" onClick={copyToClipboard} style={{ marginBottom: '1rem' }}>
                      {copied ? <><CheckCircle2 size={14} /> Copiado!</> : <><Copy size={14} /> Copiar PIN de Acolhimento</>}
                    </button>
                  )}
                </div>
              ) : (
                <div>
                  <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Transferência Secreta Aberta!</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                    Repasse os dados abaixo com segurança ao profissional que assumirá os cuidados de <strong>{result.patientName}</strong>:
                  </p>

                  <div style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid #38bdf84d', borderRadius: 'var(--radius-lg)', padding: '1.25rem', marginBottom: '1.5rem', textAlign: 'left' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>CÓDIGO DE TRANSFERÊNCIA:</span>
                      <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>
                        {result.transferCode}
                      </span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: 'rgba(56, 189, 248, 0.1)', borderRadius: 'var(--radius-md)', border: '1px dashed #38bdf880' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Lock size={16} color="#38bdf8" /> PIN DE SEGURANÇA (4 DÍGITOS):
                      </span>
                      <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-prazer-light)', letterSpacing: '0.2em', fontFamily: 'var(--font-mono)' }}>
                        {result.pin}
                      </span>
                    </div>
                  </div>

                  <button className="btn btn-secondary btn-sm" onClick={copyToClipboard} style={{ marginBottom: '1rem' }}>
                    {copied ? <><CheckCircle2 size={14} /> Copiado para Área de Transferência!</> : <><Copy size={14} /> Copiar Instruções de Resgate</>}
                  </button>
                </div>
              )}

              <button className="btn btn-primary" style={{ width: '100%' }} onClick={onClose}>
                Concluir & Fechar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
