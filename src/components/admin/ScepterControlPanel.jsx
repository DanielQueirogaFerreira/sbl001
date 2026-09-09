import React, { useState } from 'react';
import { 
  Crown, 
  Swords, 
  ArrowRightLeft, 
  Globe, 
  ShieldCheck, 
  UserPlus, 
  History, 
  CheckCircle2, 
  AlertCircle, 
  Key, 
  Lock,
  Sparkles,
  Bot
} from 'lucide-react';
import { 
  getScepterState, 
  leaveScepterInSquare, 
  claimScepterFromSquare, 
  announceJoust, 
  directTransferScepter, 
  getScepterAuditLogs 
} from '../../services/scepterEngine';
import { getAllUsers, createSubordinateAdmin, createSyntheticUser } from '../../services/authRepository';
import PasswordInput from '../common/PasswordInput';
import AdminArenaJusta from './AdminArenaJusta';

export default function ScepterControlPanel({ currentUser, onRefresh }) {
  const scepterState = getScepterState();
  const allUsers = getAllUsers();
  const admins = allUsers.filter(u => u.role === 'admin' || u.role === 'admin_master');
  const auditLogs = getScepterAuditLogs();

  const [activeModal, setActiveModal] = useState(null); // 'direct' | 'joust' | 'new_admin' | 'new_syn'
  const [targetAdminId, setTargetAdminId] = useState('');
  const [masterPassword, setMasterPassword] = useState('');
  const [joustC1, setJoustC1] = useState('');
  const [joustC2, setJoustC2] = useState('');
  const [joustTitle, setJoustTitle] = useState('Torneio da Governança Suprema');

  // New admin form
  const [newAdminName, setNewAdminName] = useState('');
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminPass, setNewAdminPass] = useState('Admin@2026');

  // New synthetic form
  const [synName, setSynName] = useState('');
  const [synRole, setSynRole] = useState('professional');
  const [synCustomSuffix, setSynCustomSuffix] = useState('');

  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const isMaster = currentUser?.role === 'admin_master' && currentUser?.hasScepter;
  const isSquareAvailable = scepterState.status === 'in_square';

  const handleLeaveInSquare = () => {
    setError('');
    setMsg('');
    const res = leaveScepterInSquare(currentUser.id);
    if (res.success) {
      setMsg('O Cetro foi colocado na Praça Pública dos Administradores!');
      onRefresh();
    }
  };

  const handleClaimSquare = () => {
    setError('');
    setMsg('');
    const res = claimScepterFromSquare(currentUser.id);
    if (res.success) {
      setMsg('Você reivindicou o Cetro na Praça Pública e assumiu a Governança Master!');
      onRefresh();
    } else {
      setError(res.error);
    }
  };

  const handleDirectTransfer = (e) => {
    e.preventDefault();
    setError('');
    setMsg('');

    if (!targetAdminId || !masterPassword) {
      setError('Selecione o administrador de destino e informe sua senha master.');
      return;
    }

    const res = directTransferScepter(targetAdminId, masterPassword);
    if (res.success) {
      setMsg('Cetro transferido diretamente com sucesso sem cerimônias!');
      setActiveModal(null);
      setMasterPassword('');
      onRefresh();
    } else {
      setError(res.error);
    }
  };

  const handleStartJoust = (e) => {
    e.preventDefault();
    setError('');
    setMsg('');

    if (!joustC1 || !joustC2 || joustC1 === joustC2) {
      setError('Selecione dois administradores distintos para disputar a Justa.');
      return;
    }

    const res = announceJoust(joustC1, joustC2, joustTitle);
    if (res.success) {
      setMsg('Grande Justa proclamada e transmitida ao vivo!');
      setActiveModal(null);
      onRefresh();
    } else {
      setError(res.error);
    }
  };

  const handleCreateAdmin = (e) => {
    e.preventDefault();
    setError('');
    setMsg('');

    const res = createSubordinateAdmin({
      name: newAdminName,
      email: newAdminEmail,
      tempPassword: newAdminPass
    });

    if (res.success) {
      setMsg(`Administrador subordinado ${res.user.name} (${res.user.code}) cadastrado com sucesso!`);
      setNewAdminName('');
      setNewAdminEmail('');
      setActiveModal(null);
      onRefresh();
    } else {
      setError(res.error);
    }
  };

  const handleCreateSynthetic = (e) => {
    e.preventDefault();
    setError('');
    setMsg('');

    const res = createSyntheticUser({
      name: synName,
      role: synRole,
      customSuffix: synCustomSuffix
    });

    if (res.success) {
      setMsg(`Perfil Sintético criado: ${res.user.name} (${res.user.code}) com e-mail ${res.user.email}`);
      setSynName('');
      setSynCustomSuffix('');
      setActiveModal(null);
      onRefresh();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Scepter Banner */}
      <div 
        className="glass-card" 
        style={{ 
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(15, 23, 42, 0.95))',
          border: '1px solid rgba(245, 158, 11, 0.4)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ fontSize: '3rem', background: 'rgba(245, 158, 11, 0.2)', padding: '0.6rem', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(245, 158, 11, 0.4)' }}>
              👑
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <h2 style={{ fontSize: '1.4rem', margin: 0, color: 'var(--color-misto-light)' }}>
                  Cetro da Governança Suprema
                </h2>
                <span className={`badge ${scepterState.status === 'held' ? 'badge-prazer' : 'badge-brand'}`}>
                  {scepterState.status === 'held' ? 'Em Posse' : scepterState.status === 'in_square' ? 'Na Praça Pública' : 'Em Justa'}
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                Titular Atual do Cetro: <strong style={{ color: '#fff' }}>{scepterState.holderName || 'Disponível na Praça Pública'}</strong>
                {scepterState.holderId && <span> ({scepterState.holderId})</span>}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            {/* If Scepter is in square and user is an admin */}
            {isSquareAvailable && (currentUser.role === 'admin' || currentUser.role === 'admin_master') && (
              <button 
                className="btn btn-primary"
                onClick={handleClaimSquare}
                style={{ boxShadow: '0 0 20px rgba(16, 185, 129, 0.5)' }}
              >
                👑 Reivindicar Cetro da Praça
              </button>
            )}

            {/* If current user holds scepter */}
            {isMaster && scepterState.status === 'held' && (
              <>
                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={handleLeaveInSquare}
                  title="Depositar o cetro na praça pública para qualquer administrador"
                >
                  <Globe size={14} /> Deixar na Praça
                </button>
                <button 
                  className="btn btn-ai btn-sm"
                  onClick={() => setActiveModal('joust')}
                  title="Convocar uma justa com transmissão pública entre dois administradores"
                >
                  <Swords size={14} /> Convocar Justa
                </button>
                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={() => setActiveModal('direct')}
                  title="Transferir diretamente mediante senha e identificação"
                >
                  <ArrowRightLeft size={14} /> Transferência Direta
                </button>
              </>
            )}

            {scepterState.status === 'joust_in_progress' && (
              <button 
                className="btn btn-ai btn-sm pulse-animation"
                onClick={() => setActiveModal('arena')}
              >
                <Swords size={14} /> Abrir Arena da Justa
              </button>
            )}
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

      {/* Grid: Admins List & Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem' }}>
        {/* Left: Administrative Council */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="card-header">
            <div className="card-title-group">
              <div className="card-icon-badge">
                <Crown size={18} color="var(--color-misto-light)" />
              </div>
              <div>
                <h3>Corpo de Administradores ({admins.length})</h3>
                <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Elegíveis à posse do Cetro e governança do sistema
                </p>
              </div>
            </div>

            {isMaster && (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn btn-secondary btn-sm" onClick={() => setActiveModal('new_syn')}>
                  <Bot size={14} /> Novo Sintético [SD]
                </button>
                <button className="btn btn-primary btn-sm" onClick={() => setActiveModal('new_admin')}>
                  <UserPlus size={14} /> Novo Admin
                </button>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {admins.map(adm => (
              <div 
                key={adm.id}
                className="shift-box"
                style={{
                  padding: '0.85rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  border: adm.hasScepter ? '1px solid rgba(245, 158, 11, 0.5)' : '1px solid var(--border-subtle)',
                  background: adm.hasScepter ? 'rgba(245, 158, 11, 0.05)' : 'rgba(255,255,255,0.02)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.75rem' }}>{adm.avatar}</span>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <strong style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>{adm.name}</strong>
                      {adm.hasScepter && <span title="Portador Atual do Cetro">👑</span>}
                      {adm.isSynthetic && (
                        <span className="badge" style={{ background: 'rgba(168, 85, 247, 0.2)', color: '#c084fc', border: '1px solid rgba(168, 85, 247, 0.4)', fontSize: '0.68rem' }}>
                          [SD]
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      Código: <strong style={{ color: '#38bdf8' }}>{adm.code}</strong> • {adm.email}
                    </div>
                  </div>
                </div>

                <span className="badge badge-gray" style={{ fontSize: '0.72rem' }}>
                  {adm.role === 'admin_master' ? 'Master' : 'Subordinado'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Scepter Succession Protocols Info */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="card-header">
            <div className="card-title-group">
              <div className="card-icon-badge">
                <ShieldCheck size={18} color="#38bdf8" />
              </div>
              <div>
                <h3>Modalidades de Transferência de Cetro</h3>
                <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Regras constitucionais do Laboratório da Sobriedade
                </p>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ padding: '0.85rem', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <strong style={{ fontSize: '0.85rem', color: 'var(--color-misto-light)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.3rem' }}>
                <Globe size={14} /> 1. Deixar na Praça Pública
              </strong>
              <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                O Master atual deposita o Cetro. O primeiro administrador subordinado que acessar a praça e clicar no botão assume imediatamente o posto de Master.
              </p>
            </div>

            <div style={{ padding: '0.85rem', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <strong style={{ fontSize: '0.85rem', color: '#c084fc', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.3rem' }}>
                <Swords size={14} /> 2. Justa Anunciada e Transmitida
              </strong>
              <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                Dois administradores duelam em 3 rodadas de deliberação clínica e governança na Arena oficial com transmissão ao vivo aberta a todos os clínicos. O vencedor é proclamado Master.
              </p>
            </div>

            <div style={{ padding: '0.85rem', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <strong style={{ fontSize: '0.85rem', color: 'var(--color-prazer-light)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.3rem' }}>
                <ArrowRightLeft size={14} /> 3. Transferência Direta sem Cerimônias
              </strong>
              <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                Transferência expressa e discreta: validação estrita da senha do Master atual + seleção do administrador sucessor, com lavratura imediata no livro de atas.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scepter Audit Book */}
      <div className="glass-card">
        <div className="card-header" style={{ marginBottom: '1rem' }}>
          <div className="card-title-group">
            <div className="card-icon-badge">
              <History size={18} color="var(--color-misto-light)" />
            </div>
            <div>
              <h3>Livro de Atas & Auditoria Imutável do Cetro</h3>
              <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Registro cronológico de posses, justas e sucessões de governança
              </p>
            </div>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.6rem 0.85rem' }}>Data & Hora</th>
                <th style={{ padding: '0.6rem 0.85rem' }}>Ato Solene</th>
                <th style={{ padding: '0.6rem 0.85rem' }}>Autor / Emissor</th>
                <th style={{ padding: '0.6rem 0.85rem' }}>Sucessor / Alvo</th>
                <th style={{ padding: '0.6rem 0.85rem' }}>Modalidade</th>
                <th style={{ padding: '0.6rem 0.85rem' }}>Detalhes do Registro</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map(log => (
                <tr key={log.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <td style={{ padding: '0.65rem 0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                    {new Date(log.timestamp).toLocaleString('pt-BR')}
                  </td>
                  <td style={{ padding: '0.65rem 0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {log.title}
                  </td>
                  <td style={{ padding: '0.65rem 0.85rem', color: 'var(--text-secondary)' }}>
                    {log.actorName}
                  </td>
                  <td style={{ padding: '0.65rem 0.85rem', color: 'var(--color-misto-light)' }}>
                    {log.targetName || 'Praça Pública'}
                  </td>
                  <td style={{ padding: '0.65rem 0.85rem' }}>
                    <span className="badge badge-brand" style={{ fontSize: '0.7rem' }}>
                      {log.mode}
                    </span>
                  </td>
                  <td style={{ padding: '0.65rem 0.85rem', color: 'var(--text-muted)', maxWidth: '300px' }}>
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Direct Transfer */}
      {activeModal === 'direct' && (
        <div className="modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="modal-card" style={{ maxWidth: '480px' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ margin: 0 }}>Transferência Direta de Cetro</h3>
            </div>
            <form onSubmit={handleDirectTransfer} className="modal-body">
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Selecione o administrador subordinado que assumirá o Cetro Master e digite sua senha de autenticação:
              </p>

              <div className="form-group">
                <label className="form-label">Administrador Destinatário:</label>
                <select 
                  className="form-select"
                  value={targetAdminId}
                  onChange={e => setTargetAdminId(e.target.value)}
                  required
                >
                  <option value="">Selecione um administrador...</option>
                  {admins.filter(a => a.id !== currentUser.id).map(a => (
                    <option key={a.id} value={a.id}>
                      {a.name} ({a.code})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Senha do Master Atual para Confirmação:</label>
                <PasswordInput
                  placeholder="••••••••"
                  value={masterPassword}
                  onChange={e => setMasterPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
                <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setActiveModal(null)}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                  Confirmar Transferência
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Announce Joust */}
      {activeModal === 'joust' && (
        <div className="modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="modal-card" style={{ maxWidth: '520px' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ margin: 0, color: 'var(--color-misto-light)' }}>Convocar Grande Justa</h3>
            </div>
            <form onSubmit={handleStartJoust} className="modal-body">
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Selecione dois administradores para duelarem pelo Cetro da Governança com transmissão ao vivo:
              </p>

              <div className="form-group">
                <label className="form-label">Título da Justa:</label>
                <input 
                  type="text"
                  className="form-input"
                  value={joustTitle}
                  onChange={e => setJoustTitle(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Desafiante 1:</label>
                  <select 
                    className="form-select"
                    value={joustC1}
                    onChange={e => setJoustC1(e.target.value)}
                    required
                  >
                    <option value="">Selecione...</option>
                    {admins.map(a => (
                      <option key={a.id} value={a.id}>{a.name} ({a.code})</option>
                    ))}
                  </select>
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Desafiante 2:</label>
                  <select 
                    className="form-select"
                    value={joustC2}
                    onChange={e => setJoustC2(e.target.value)}
                    required
                  >
                    <option value="">Selecione...</option>
                    {admins.filter(a => a.id !== joustC1).map(a => (
                      <option key={a.id} value={a.id}>{a.name} ({a.code})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
                <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setActiveModal(null)}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-ai" style={{ flex: 1 }}>
                  Proclamar Justa na Arena
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: New Admin */}
      {activeModal === 'new_admin' && (
        <div className="modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="modal-card" style={{ maxWidth: '480px' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ margin: 0 }}>Cadastrar Novo Administrador Subordinado</h3>
            </div>
            <form onSubmit={handleCreateAdmin} className="modal-body">
              <div className="form-group">
                <label className="form-label">Nome Completo:</label>
                <input 
                  type="text"
                  className="form-input"
                  placeholder="Ex: Dra. Marcela Guimarães"
                  value={newAdminName}
                  onChange={e => setNewAdminName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">E-mail Oficial:</label>
                <input 
                  type="email"
                  className="form-input"
                  placeholder="ex: marcela@nhnone.space"
                  value={newAdminEmail}
                  onChange={e => setNewAdminEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Senha Temporária Inicial:</label>
                <input 
                  type="text"
                  className="form-input"
                  value={newAdminPass}
                  onChange={e => setNewAdminPass(e.target.value)}
                  required
                />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  O usuário receberá o código gerado ADMxxxxx e terá que trocar a senha no 1º login.
                </span>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
                <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setActiveModal(null)}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                  Cadastrar Administrador
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: New Synthetic User */}
      {activeModal === 'new_syn' && (
        <div className="modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="modal-card" style={{ maxWidth: '480px' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ margin: 0 }}>Criar Usuário Sintético [SD]</h3>
            </div>
            <form onSubmit={handleCreateSynthetic} className="modal-body">
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Conforme a regra do sistema, o ID será formatado como <strong>synxxxxx</strong> e o e-mail será terminado obrigatoriamente em <strong>@syntetic.data</strong>.
              </p>

              <div className="form-group">
                <label className="form-label">Nome do Usuário Sintético:</label>
                <input 
                  type="text"
                  className="form-input"
                  placeholder="Ex: Terapeuta Pedro (Sintético)"
                  value={synName}
                  onChange={e => setSynName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Papel do Usuário:</label>
                <select 
                  className="form-select"
                  value={synRole}
                  onChange={e => setSynRole(e.target.value)}
                >
                  <option value="professional">Profissional de Saúde</option>
                  <option value="admin">Administrador Clínico</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Sufixo de 5 Dígitos (Opcional):</label>
                <input 
                  type="text"
                  maxLength={5}
                  className="form-input"
                  placeholder="Ex: 00099 (deixe vazio para automático)"
                  value={synCustomSuffix}
                  onChange={e => setSynCustomSuffix(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
                <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setActiveModal(null)}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-ai" style={{ flex: 1 }}>
                  Gerar Usuário Sintético [SD]
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Arena View Modal */}
      {scepterState.status === 'joust_in_progress' && (activeModal === 'arena' || scepterState.activeJoust) && (
        <AdminArenaJusta 
          joust={scepterState.activeJoust}
          onClose={() => setActiveModal(null)}
          onJoustUpdated={(updatedJoust) => {
            onRefresh();
          }}
        />
      )}
    </div>
  );
}
