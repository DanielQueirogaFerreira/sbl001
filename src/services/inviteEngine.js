/**
 * Hierarchical Invite & Onboarding Engine
 * Admins invite Professionals & other Admins
 * Professionals invite Patients
 * Laboratório da Sobriedade
 */

import { getAllUsers, saveUsersState, createSubordinateAdmin } from './authRepository.js';
import { getDatabase, saveDatabaseState } from '../data/patientRepository.js';

const INVITES_STORAGE_KEY = 'sbl_system_invites_state';

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

// Initial demo invites
const DEFAULT_INVITES = [
  {
    id: 'INV-PRF-1001',
    code: 'PRF-1001',
    type: 'professional', // 'professional' | 'admin' | 'patient'
    issuerId: 'DAN00001',
    issuerName: 'Daniel Queiroga',
    issuerRole: 'admin_master',
    targetName: 'Dra. Camila Psicóloga',
    targetEmail: 'camila@clinica.com',
    pin: '1234',
    status: 'pending', // 'pending' | 'accepted' | 'cancelled'
    createdAt: '2026-09-08T10:00:00Z',
    note: 'Convite para coordenação de atendimento ambulatorial PRT001'
  },
  {
    id: 'INV-PAC-2001',
    code: 'PAC-2001',
    type: 'patient',
    issuerId: 'PLN00001',
    issuerName: 'Dr. Plínio',
    issuerRole: 'professional',
    targetName: 'Novo Paciente Demonstração',
    targetEmail: 'paciente.demo@email.com',
    pin: '4321',
    status: 'pending',
    createdAt: '2026-09-08T14:00:00Z',
    protocolId: 'PRT001',
    note: 'Ingresso sob o Protocolo de Prevenção de Recaída do Dr. Plínio'
  }
];

let INVITES_CACHE = null;

export function getAllInvites() {
  if (!INVITES_CACHE) {
    const saved = safeGetStorage(INVITES_STORAGE_KEY);
    if (saved) {
      try {
        INVITES_CACHE = JSON.parse(saved);
      } catch (e) {
        INVITES_CACHE = [...DEFAULT_INVITES];
      }
    } else {
      INVITES_CACHE = [...DEFAULT_INVITES];
      safeSetStorage(INVITES_STORAGE_KEY, JSON.stringify(INVITES_CACHE));
    }
  }
  return INVITES_CACHE;
}

export function saveInvitesState(invites) {
  INVITES_CACHE = invites;
  safeSetStorage(INVITES_STORAGE_KEY, JSON.stringify(invites));
}

/**
 * Creates a new invitation based on issuer permissions
 */
export function createInvite({
  type, // 'professional' | 'admin' | 'patient'
  issuer,
  targetName,
  targetEmail = '',
  note = '',
  protocolId = 'PRT001',
  customPin = null
}) {
  if (!issuer) {
    return { success: false, error: 'Usuário emissor não identificado.' };
  }

  const isAdmin = issuer.role === 'admin' || issuer.role === 'admin_master';
  const isProfessional = issuer.role === 'professional';

  // Permission validation
  if ((type === 'professional' || type === 'admin') && !isAdmin) {
    return { success: false, error: 'Apenas Administradores podem emitir convites para profissionais e outros administradores.' };
  }

  if (type === 'patient' && !isProfessional && !isAdmin) {
    return { success: false, error: 'Apenas Profissionais de Saúde ou Administradores podem convidar pacientes.' };
  }

  if (!targetName || targetName.trim().length < 2) {
    return { success: false, error: 'Por favor, informe o nome do convidado.' };
  }

  const prefix = type === 'professional' ? 'PRF' : (type === 'admin' ? 'ADM' : 'PAC');
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const code = `${prefix}-${randomNum}`;
  const pin = customPin ? String(customPin).padStart(4, '0') : String(Math.floor(1000 + Math.random() * 9000));

  const newInvite = {
    id: `INV-${code}`,
    code: code,
    type: type,
    issuerId: issuer.id,
    issuerName: issuer.name,
    issuerRole: issuer.role,
    targetName: targetName.trim(),
    targetEmail: targetEmail.trim().toLowerCase(),
    pin: pin,
    status: 'pending',
    createdAt: new Date().toISOString(),
    protocolId: protocolId,
    note: note.trim()
  };

  const invites = getAllInvites();
  invites.unshift(newInvite);
  saveInvitesState(invites);

  return {
    success: true,
    invite: newInvite,
    formattedMessage: `🏥 Laboratório da Sobriedade — Convite de Acesso\n\nOlá ${newInvite.targetName}!\nVocê foi convidado por ${issuer.name} (${issuer.role === 'admin_master' ? 'Admin Master' : (issuer.role === 'admin' ? 'Administrador' : 'Profissional de Saúde')}) para ingressar no sistema.\n\n🔑 Código do Convite: ${newInvite.code}\n🔒 PIN de Ativação: ${newInvite.pin}\n\nAcesse a plataforma e clique em 'Resgatar Convite' para criar seu acesso seguro.`
  };
}

/**
 * Validates an invite by code and optional PIN
 */
export function validateInvite(code, pin = null) {
  if (!code) return { valid: false, error: 'Código de convite não fornecido.' };

  const cleanCode = code.trim().toUpperCase();
  const invites = getAllInvites();
  const invite = invites.find(inv => inv.code.toUpperCase() === cleanCode || inv.id.toUpperCase() === cleanCode);

  if (!invite) {
    return { valid: false, error: 'Código de convite não encontrado no sistema.' };
  }

  if (invite.status === 'accepted') {
    return { valid: false, error: 'Este convite já foi resgatado anteriormente.' };
  }

  if (invite.status === 'cancelled') {
    return { valid: false, error: 'Este convite foi cancelado pelo emissor.' };
  }

  if (pin && invite.pin && String(pin).trim() !== String(invite.pin).trim()) {
    return { valid: false, error: 'PIN de segurança incorreto para este convite.' };
  }

  return { valid: true, invite };
}

/**
 * Redeems an invite and creates the actual account / patient
 */
export function redeemInvite(code, pin, payload) {
  const check = validateInvite(code, pin);
  if (!check.valid) {
    return { success: false, error: check.error };
  }

  const invite = check.invite;
  const { name, email, password, diagnosis, age, keyAnchor } = payload;

  if (invite.type === 'professional' || invite.type === 'admin') {
    if (!password || password.length < 6) {
      return { success: false, error: 'A senha deve conter no mínimo 6 caracteres.' };
    }

    const users = getAllUsers();
    const cleanEmail = email ? email.trim().toLowerCase() : invite.targetEmail;

    if (cleanEmail && users.some(u => u.email && u.email.toLowerCase() === cleanEmail)) {
      return { success: false, error: 'Este e-mail já está em uso por outro usuário.' };
    }

    const codeNum = String(Math.floor(10000 + Math.random() * 90000));
    const prefix = invite.type === 'professional' ? 'PRF' : 'ADM';
    const userCode = `${prefix}${codeNum}`;

    const newUser = {
      id: userCode,
      code: userCode,
      name: name || invite.targetName,
      email: cleanEmail || `${userCode.toLowerCase()}@sobriedade.lab`,
      role: invite.type,
      avatar: invite.type === 'professional' ? '🩺' : '🛡️',
      password: password,
      mustChangePassword: false,
      mustProvideEmail: false,
      hasScepter: false,
      isSynthetic: false,
      invitedBy: invite.issuerId,
      createdAt: new Date().toISOString(),
      bio: `Ingressou via convite emitido por ${invite.issuerName}`
    };

    users.push(newUser);
    saveUsersState(users);

    // Mark invite accepted
    invite.status = 'accepted';
    invite.acceptedAt = new Date().toISOString();
    invite.acceptedUserId = newUser.id;
    saveInvitesState(getAllInvites());

    return {
      success: true,
      user: newUser,
      type: invite.type,
      message: `Conta de ${invite.type === 'professional' ? 'Profissional' : 'Administrador'} ativada com sucesso! Código de acesso: ${userCode}`
    };
  }

  if (invite.type === 'patient') {
    // Create new patient linked to the inviting professional
    const db = getDatabase();
    const patientId = `pac-${Date.now()}`;
    const cleanName = name || invite.targetName;

    const newPatient = {
      id: patientId,
      name: cleanName,
      avatar: '👤',
      diagnosis: diagnosis || 'Transtorno por Uso de Substâncias (Em Remissão)',
      age: age || 30,
      protocolId: invite.protocolId || 'PRT001',
      protocolName: 'Protocolo do Plínio (PRT001)',
      assignedProfessionalId: invite.issuerId,
      assignedProfessionalName: invite.issuerName,
      keyAnchors: keyAnchor ? [keyAnchor] : ['Rotina estruturada', 'Prevenção de gatilhos'],
      createdAt: new Date().toISOString(),
      weeklyPlanned: {
        'Segunda': { manha: 'Despertar e café terapêutico', tarde: 'Atividade laboral orientada', noite: 'Reunião de mútua ajuda' },
        'Terça': { manha: 'Caminhada matinal e respiração', tarde: 'Sessão clínica ambulatorial', noite: 'Leitura e higiene do sono' }
      },
      logs: []
    };

    newPatient.role = 'patient';
    newPatient.code = invite.code;

    db[patientId] = newPatient;
    saveDatabaseState();

    // Mark invite accepted
    invite.status = 'accepted';
    invite.acceptedAt = new Date().toISOString();
    invite.acceptedPatientId = patientId;
    saveInvitesState(getAllInvites());

    const patientUser = {
      id: patientId,
      code: invite.code,
      name: cleanName,
      role: 'patient',
      avatar: '👤',
      diagnosis: newPatient.diagnosis,
      protocolId: newPatient.protocolId,
      assignedProfessionalId: newPatient.assignedProfessionalId,
      assignedProfessionalName: newPatient.assignedProfessionalName,
      keyAnchors: newPatient.keyAnchors
    };

    return {
      success: true,
      patient: newPatient,
      user: patientUser,
      type: 'patient',
      message: `Paciente ${cleanName} cadastrado e vinculado com sucesso à tutela de ${invite.issuerName}!`
    };
  }

  return { success: false, error: 'Tipo de convite não suportado.' };
}

/**
 * Returns invites filtered by issuer
 */
export function getInvitesByIssuer(issuerId) {
  const invites = getAllInvites();
  return invites.filter(inv => inv.issuerId === issuerId);
}
