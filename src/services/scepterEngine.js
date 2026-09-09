/**
 * Master Scepter Governance & Succession Engine
 * Public square claiming, announced jousts, and direct transfers
 * Laboratório da Sobriedade
 */

import { getAllUsers, saveUsersState, getUserById } from './authRepository';

const SCEPTER_STATE_KEY = 'sbl_master_scepter_state';
const SCEPTER_LOGS_KEY = 'sbl_master_scepter_audit_logs';

function safeGetStorage(key) {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage.getItem(key);
    }
  } catch (e) {
    console.warn('Storage read failed:', e);
  }
  return null;
}

function safeSetStorage(key, value) {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, value);
    }
  } catch (e) {
    console.warn('Storage write failed:', e);
  }
}

export function getScepterState() {
  const saved = safeGetStorage(SCEPTER_STATE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {}
  }
  return {
    holderId: 'DAN00001',
    holderName: 'Daniel Queiroga',
    status: 'held', // 'held' | 'in_square' | 'joust_in_progress'
    activeJoust: null,
    lastTransferredAt: '2026-09-01T08:00:00Z'
  };
}

export function saveScepterState(state) {
  safeSetStorage(SCEPTER_STATE_KEY, JSON.stringify(state));
}

export function getScepterAuditLogs() {
  const saved = safeGetStorage(SCEPTER_LOGS_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {}
  }
  const initial = [
    {
      id: 'scepter-event-init',
      type: 'inauguration',
      title: 'Outorga Fundacional do Cetro Master',
      actorId: 'SYSTEM',
      actorName: 'Fundação Antigravity SBL',
      targetId: 'DAN00001',
      targetName: 'Daniel Queiroga',
      mode: 'fundacional',
      timestamp: '2026-09-01T08:00:00Z',
      details: 'O Cetro da Governança Suprema foi outorgado a Daniel Queiroga com plenos poderes.'
    }
  ];
  safeSetStorage(SCEPTER_LOGS_KEY, JSON.stringify(initial));
  return initial;
}

function recordScepterAudit(entry) {
  const logs = getScepterAuditLogs();
  logs.unshift({
    id: `scepter-log-${Date.now()}`,
    timestamp: new Date().toISOString(),
    ...entry
  });
  safeSetStorage(SCEPTER_LOGS_KEY, JSON.stringify(logs));
}

/**
 * Updates roles across users when Master changes
 */
function reassignMasterRole(newMasterId, previousMasterId) {
  const users = getAllUsers();
  users.forEach(u => {
    if (u.id === previousMasterId) {
      u.role = 'admin';
      u.hasScepter = false;
    }
    if (u.id === newMasterId) {
      u.role = 'admin_master';
      u.hasScepter = true;
    }
  });
  saveUsersState();
}

/**
 * 1. Leave Scepter in Public Square
 */
export function leaveScepterInSquare(currentMasterId) {
  const state = getScepterState();
  const currentHolder = getUserById(currentMasterId);

  state.status = 'in_square';
  state.holderId = null;
  state.holderName = 'Praça Pública dos Administradores';
  saveScepterState(state);

  recordScepterAudit({
    type: 'abandon_to_square',
    title: 'Cetro Deixado na Praça Pública',
    actorId: currentMasterId,
    actorName: currentHolder?.name || currentMasterId,
    targetId: null,
    targetName: 'Praça Pública',
    mode: 'praca',
    details: 'O Administrador Master depositou o Cetro na Praça Pública. O primeiro administrador que o reivindicar assumirá a Governança Master.'
  });

  return { success: true, state };
}

/**
 * Claim Scepter from Public Square
 */
export function claimScepterFromSquare(newMasterId) {
  const state = getScepterState();
  if (state.status !== 'in_square') {
    return { success: false, error: 'O Cetro não está disponível na Praça Pública.' };
  }

  const newHolder = getUserById(newMasterId);
  if (!newHolder || (newHolder.role !== 'admin' && newHolder.role !== 'admin_master')) {
    return { success: false, error: 'Apenas administradores credenciados podem empunhar o Cetro.' };
  }

  const previousMasterId = state.lastHolderId || 'DAN00001';
  reassignMasterRole(newMasterId, previousMasterId);

  state.status = 'held';
  state.holderId = newMasterId;
  state.holderName = newHolder.name;
  state.lastTransferredAt = new Date().toISOString();
  saveScepterState(state);

  recordScepterAudit({
    type: 'claimed_from_square',
    title: 'Cetro Reivindicado na Praça Pública',
    actorId: newMasterId,
    actorName: newHolder.name,
    targetId: newMasterId,
    targetName: newHolder.name,
    mode: 'praca',
    details: `${newHolder.name} acolheu o Cetro da Praça Pública e foi proclamado novo Administrador Master do Laboratório da Sobriedade.`
  });

  return { success: true, state };
}

/**
 * 2. Announce and Start Joust between two administrators
 */
export function announceJoust(challenger1Id, challenger2Id, joustTitle = 'Torneio da Governança Suprema') {
  const c1 = getUserById(challenger1Id);
  const c2 = getUserById(challenger2Id);

  if (!c1 || !c2) {
    return { success: false, error: 'Administradores da Justa inválidos.' };
  }

  const state = getScepterState();
  const joustData = {
    id: `joust-${Date.now()}`,
    title: joustTitle,
    challenger1: { id: c1.id, name: c1.name, avatar: c1.avatar, score: 0 },
    challenger2: { id: c2.id, name: c2.name, avatar: c2.avatar, score: 0 },
    currentRound: 1,
    totalRounds: 3,
    status: 'in_progress', // 'in_progress' | 'concluded'
    broadcastLog: [
      `🎺 PROCLAMAÇÃO REAL: Justa anunciada entre ${c1.name} e ${c2.name}!`,
      `📡 Transmissão iniciada em sinal aberto para todo o corpo clínico.`
    ]
  };

  state.status = 'joust_in_progress';
  state.activeJoust = joustData;
  saveScepterState(state);

  recordScepterAudit({
    type: 'joust_announced',
    title: `Justa Proclamada: ${c1.name} vs ${c2.name}`,
    actorId: state.holderId || 'SYSTEM',
    actorName: state.holderName || 'Conselho Master',
    targetId: `${c1.id} & ${c2.id}`,
    targetName: `${c1.name} e ${c2.name}`,
    mode: 'justa',
    details: `Grande Justa anunciada e transmitida ao vivo para definir o novo portador do Cetro Master.`
  });

  return { success: true, joust: joustData };
}

/**
 * Progress round in Joust
 */
export function scoreJoustRound(winnerChallengerNumber, customCommentary) {
  const state = getScepterState();
  if (!state.activeJoust || state.status !== 'joust_in_progress') {
    return { success: false, error: 'Nenhuma justa em andamento no momento.' };
  }

  const joust = state.activeJoust;
  if (winnerChallengerNumber === 1) {
    joust.challenger1.score += 1;
    joust.broadcastLog.unshift(`⚔️ Round ${joust.currentRound}: Ponto para ${joust.challenger1.name}! ${customCommentary || ''}`);
  } else {
    joust.challenger2.score += 1;
    joust.broadcastLog.unshift(`⚔️ Round ${joust.currentRound}: Ponto para ${joust.challenger2.name}! ${customCommentary || ''}`);
  }

  if (joust.currentRound >= joust.totalRounds) {
    // Conclude joust
    joust.status = 'concluded';
    const victor = joust.challenger1.score >= joust.challenger2.score ? joust.challenger1 : joust.challenger2;
    joust.victor = victor;
    joust.broadcastLog.unshift(`🏆 VITÓRIA PROCLAMADA! ${victor.name} venceu a Justa por ${joust.challenger1.score} x ${joust.challenger2.score} e empunha o Cetro Master!`);

    // Transfer scepter
    reassignMasterRole(victor.id, state.holderId);
    state.status = 'held';
    state.holderId = victor.id;
    state.holderName = victor.name;
    state.lastTransferredAt = new Date().toISOString();

    recordScepterAudit({
      type: 'joust_concluded',
      title: `Vitória na Justa: ${victor.name} Conquista o Cetro`,
      actorId: victor.id,
      actorName: victor.name,
      targetId: victor.id,
      targetName: victor.name,
      mode: 'justa',
      details: `A Justa foi concluída com transmissão pública. ${victor.name} foi empossado como novo Administrador Master.`
    });
  } else {
    joust.currentRound += 1;
  }

  saveScepterState(state);
  return { success: true, joust };
}

/**
 * 3. Direct Transfer (Without Ceremonies)
 */
export function directTransferScepter(targetAdminId, masterPassword) {
  const state = getScepterState();
  const currentHolder = getUserById(state.holderId);

  if (!currentHolder || currentHolder.password !== masterPassword) {
    return { success: false, error: 'Senha do Administrador Master atual incorreta para autorizar a transferência.' };
  }

  const targetUser = getUserById(targetAdminId);
  if (!targetUser) {
    return { success: false, error: 'Administrador de destino não localizado.' };
  }

  reassignMasterRole(targetAdminId, state.holderId);

  const prevName = state.holderName;
  state.status = 'held';
  state.holderId = targetAdminId;
  state.holderName = targetUser.name;
  state.lastTransferredAt = new Date().toISOString();
  saveScepterState(state);

  recordScepterAudit({
    type: 'direct_transfer',
    title: 'Transferência Direta de Cetro',
    actorId: currentHolder.id,
    actorName: currentHolder.name,
    targetId: targetUser.id,
    targetName: targetUser.name,
    mode: 'direto',
    details: `O Cetro Master foi transferido diretamente por ${prevName} a ${targetUser.name} mediante autenticação estrita por senha.`
  });

  return { success: true, state };
}
