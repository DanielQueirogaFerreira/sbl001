/**
 * Patient Transfer & Caretaker Engine
 * Public square migration and private PIN-secured transfers
 * Laboratório da Sobriedade
 */

import { getDatabase, saveDatabaseState } from '../data/patientRepository';
import { getUserById } from './authRepository';

const TRANSFER_LOGS_KEY = 'sbl_patient_transfer_audit_logs';

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

let TRANSFER_AUDIT_LOGS = null;

export function getTransferAuditLogs() {
  if (!TRANSFER_AUDIT_LOGS) {
    const saved = safeGetStorage(TRANSFER_LOGS_KEY);
    if (saved) {
      try {
        TRANSFER_AUDIT_LOGS = JSON.parse(saved);
      } catch (e) {
        TRANSFER_AUDIT_LOGS = [];
      }
    } else {
      TRANSFER_AUDIT_LOGS = [
        {
          id: 'log-init-01',
          patientId: 'amanda',
          patientName: 'Amanda',
          fromProfessionalId: 'SYSTEM',
          fromProfessionalName: 'Fundação Ambulatorial',
          toProfessionalId: 'PLN00001',
          toProfessionalName: 'Dr. Plínio',
          mode: 'direct',
          timestamp: '2026-08-01T08:00:00Z',
          note: 'Vínculo inicial sob o Protocolo PRT001'
        },
        {
          id: 'log-init-02',
          patientId: 'emannuel',
          patientName: 'Emannuel',
          fromProfessionalId: 'SYSTEM',
          fromProfessionalName: 'Fundação Ambulatorial',
          toProfessionalId: 'PLN00001',
          toProfessionalName: 'Dr. Plínio',
          mode: 'direct',
          timestamp: '2026-08-01T08:00:00Z',
          note: 'Vínculo inicial sob o Protocolo PRT001'
        },
        {
          id: 'log-init-03',
          patientId: 'sabrina',
          patientName: 'Sabrina',
          fromProfessionalId: 'SYSTEM',
          fromProfessionalName: 'Fundação Ambulatorial',
          toProfessionalId: 'PLN00001',
          toProfessionalName: 'Dr. Plínio',
          mode: 'direct',
          timestamp: '2026-08-01T08:00:00Z',
          note: 'Vínculo inicial sob o Protocolo PRT001'
        }
      ];
      safeSetStorage(TRANSFER_LOGS_KEY, JSON.stringify(TRANSFER_AUDIT_LOGS));
    }
  }
  return TRANSFER_AUDIT_LOGS;
}

function recordTransferAudit(entry) {
  const logs = getTransferAuditLogs();
  logs.unshift({
    id: `trf-${Date.now()}`,
    timestamp: new Date().toISOString(),
    ...entry
  });
  safeSetStorage(TRANSFER_LOGS_KEY, JSON.stringify(logs));
}

/**
 * Initiates Secret (Private) Transfer with 4-digit PIN
 */
export function initiateSecretTransfer(patientId, fromProfessionalId, customPin = null) {
  const db = getDatabase();
  const patient = db[patientId];
  if (!patient) {
    return { success: false, error: 'Paciente não encontrado.' };
  }

  // Generate 4-digit PIN if not provided
  const pin = customPin ? String(customPin).padStart(4, '0') : String(Math.floor(1000 + Math.random() * 9000));
  const transferCode = `TRF-${Math.floor(1000 + Math.random() * 9000)}`;

  patient.transferState = {
    mode: 'secret',
    pin: pin,
    transferCode: transferCode,
    fromProfessionalId: fromProfessionalId,
    initiatedAt: new Date().toISOString()
  };

  saveDatabaseState();

  const sender = getUserById(fromProfessionalId);

  recordTransferAudit({
    patientId: patient.id,
    patientName: patient.name,
    fromProfessionalId: fromProfessionalId,
    fromProfessionalName: sender?.name || fromProfessionalId,
    toProfessionalId: 'PENDING',
    toProfessionalName: 'Aguardando Resgate Privado',
    mode: 'secret_initiated',
    transferCode: transferCode,
    note: `Transferência secreta aberta com PIN de 4 dígitos gerado.`
  });

  return {
    success: true,
    transferCode,
    pin,
    patientName: patient.name
  };
}

/**
 * Releases patient to Public Square (no PIN required, open for any professional)
 */
export function releaseToPublicSquare(patientId, fromProfessionalId) {
  const db = getDatabase();
  const patient = db[patientId];
  if (!patient) {
    return { success: false, error: 'Paciente não encontrado.' };
  }

  const sender = getUserById(fromProfessionalId);

  patient.assignedProfessionalId = null;
  patient.transferState = {
    mode: 'public',
    fromProfessionalId: fromProfessionalId,
    initiatedAt: new Date().toISOString()
  };

  saveDatabaseState();

  recordTransferAudit({
    patientId: patient.id,
    patientName: patient.name,
    fromProfessionalId: fromProfessionalId,
    fromProfessionalName: sender?.name || fromProfessionalId,
    toProfessionalId: null,
    toProfessionalName: 'Praça Pública (Disponível a Todos)',
    mode: 'released_to_public',
    note: 'Paciente liberado para acolhimento na Praça Pública.'
  });

  return { success: true, patient };
}

/**
 * Claims a patient from Public Square
 */
export function claimFromPublicSquare(patientId, toProfessionalId) {
  const db = getDatabase();
  const patient = db[patientId];
  if (!patient) {
    return { success: false, error: 'Paciente não encontrado.' };
  }

  const previousOwner = patient.transferState?.fromProfessionalId || 'Praça Pública';
  const newOwner = getUserById(toProfessionalId);

  patient.assignedProfessionalId = toProfessionalId;
  patient.transferState = null; // Clear transfer pending state

  saveDatabaseState();

  recordTransferAudit({
    patientId: patient.id,
    patientName: patient.name,
    fromProfessionalId: previousOwner,
    fromProfessionalName: getUserById(previousOwner)?.name || previousOwner,
    toProfessionalId: toProfessionalId,
    toProfessionalName: newOwner?.name || toProfessionalId,
    mode: 'claimed_from_public',
    note: 'Paciente acolhido e vinculado com sucesso via Praça Pública.'
  });

  return { success: true, patient };
}

/**
 * Claims a patient from Private Transfer via 4-digit PIN
 */
export function claimSecretTransfer(inputIdentifier, pinEntered, toProfessionalId) {
  const db = getDatabase();
  const cleanId = (inputIdentifier || '').trim().toLowerCase();
  const cleanPin = (pinEntered || '').trim();

  // Search by patient ID or transfer code
  const patient = Object.values(db).find(p => 
    p.id.toLowerCase() === cleanId || 
    (p.transferState?.transferCode && p.transferState.transferCode.toLowerCase() === cleanId)
  );

  if (!patient) {
    return { success: false, error: 'Nenhum paciente ou código de transferência correspondente encontrado.' };
  }

  if (!patient.transferState || patient.transferState.mode !== 'secret') {
    return { success: false, error: 'Este paciente não está aguardando migração privada.' };
  }

  if (patient.transferState.pin !== cleanPin) {
    return { success: false, error: 'PIN numérico de 4 dígitos incorreto! Verifique com o profissional emissor.' };
  }

  const fromProfessionalId = patient.transferState.fromProfessionalId;
  const sender = getUserById(fromProfessionalId);
  const receiver = getUserById(toProfessionalId);

  // Transfer ownership
  patient.assignedProfessionalId = toProfessionalId;
  patient.transferState = null;

  saveDatabaseState();

  recordTransferAudit({
    patientId: patient.id,
    patientName: patient.name,
    fromProfessionalId: fromProfessionalId,
    fromProfessionalName: sender?.name || fromProfessionalId,
    toProfessionalId: toProfessionalId,
    toProfessionalName: receiver?.name || toProfessionalId,
    mode: 'secret_completed',
    note: `Transferência privada autenticada e concluída com sucesso via PIN.`
  });

  return { success: true, patient };
}

/**
 * Lists patients available in Public Square
 */
export function getPublicSquarePatients() {
  const db = getDatabase();
  return Object.values(db).filter(p => !p.assignedProfessionalId || p.transferState?.mode === 'public');
}

/**
 * Lists patients pending secret transfer
 */
export function getSecretTransferPatients() {
  const db = getDatabase();
  return Object.values(db).filter(p => p.transferState?.mode === 'secret');
}
