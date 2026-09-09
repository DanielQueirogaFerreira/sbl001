/**
 * Clinical Protocol Studio & Repository
 * Tutorship and parameters for rehabilitation routines
 * Laboratório da Sobriedade
 */

const STORAGE_KEY = 'sbl_clinical_protocols_state';

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

export const MASTER_PROTOCOL_PRT001 = {
  id: 'PRT001',
  code: 'PRT001',
  name: 'Protocolo do Plínio — Estabilização de Rotina e Manejo de Recaída',
  creatorId: 'PLN00001',
  creatorName: 'Dr. Plínio',
  version: '1.4 Clínico',
  description: 'Protocolo de matriz 1-7 (Prazer x Dever) focado em estabilização de rotina diurna, ancoragem em 3 turnos (Manhã, Tarde, Noite) e sustentação de 3 a 4 padrões semanais com monitoramento contínuo de sobrecarga.',
  parameters: {
    scaleType: '1-7 (1-3 Prazer, 4 Misto, 5-7 Dever)',
    minPatternsRecommended: 3,
    maxPatternsRecommended: 4,
    shiftsPerDay: ['Manhã', 'Tarde', 'Noite'],
    maxContinuousDutyAllowed: 3, // Máximo de turnos seguidos de nota >= 5 sem intervalo de prazer
    swotFrequency: 'Semanal e Quadrimestral',
    satisfactionThreshold: 7.0,
    anchorsRequirement: 'Mínimo de 3 âncoras terapêuticas fixadas (ambulatória, familiar, ocupacional)'
  },
  clinicalRationale: 'Pacientes em consolidação do 1º ano de abstinência apresentam desregulação dopaminérgica se expostos a picos ininterruptos de dever (notas 5, 6 e 7). A introdução mandatória de atividades pontuadas como prazer restaura a resiliência psíquica.',
  assignedPatients: ['amanda', 'emannuel', 'sabrina'],
  createdAt: '2026-08-01T10:00:00Z',
  updatedAt: '2026-09-01T12:00:00Z',
  isLockedMaster: true
};

let PROTOCOLS_CACHE = null;

export function getAllProtocols() {
  if (!PROTOCOLS_CACHE) {
    const saved = safeGetStorage(STORAGE_KEY);
    if (saved) {
      try {
        PROTOCOLS_CACHE = JSON.parse(saved);
      } catch (e) {
        PROTOCOLS_CACHE = [MASTER_PROTOCOL_PRT001];
      }
    } else {
      PROTOCOLS_CACHE = [MASTER_PROTOCOL_PRT001];
      saveProtocolsState();
    }
  }
  return PROTOCOLS_CACHE;
}

export function saveProtocolsState() {
  if (PROTOCOLS_CACHE) {
    safeSetStorage(STORAGE_KEY, JSON.stringify(PROTOCOLS_CACHE));
  }
}

export function getProtocolById(id) {
  const protocols = getAllProtocols();
  return protocols.find(p => p.id === id || p.code === id) || MASTER_PROTOCOL_PRT001;
}

export function createProtocol({ name, creatorId, creatorName, description, parameters, clinicalRationale }) {
  const protocols = getAllProtocols();
  const nextNum = protocols.length + 1;
  const code = `PRT${String(nextNum).padStart(3, '0')}`;

  const newProtocol = {
    id: code,
    code: code,
    name: name || `Protocolo Personalizado ${code}`,
    creatorId: creatorId || 'PLN00001',
    creatorName: creatorName || 'Dr. Plínio',
    version: '1.0',
    description: description || 'Protocolo terapêutico configurado no Studio Clínico.',
    parameters: parameters || { ...MASTER_PROTOCOL_PRT001.parameters },
    clinicalRationale: clinicalRationale || 'Racional clínico customizado.',
    assignedPatients: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isLockedMaster: false
  };

  protocols.push(newProtocol);
  saveProtocolsState();
  return { success: true, protocol: newProtocol };
}

export function updateProtocol(id, updates) {
  const protocols = getAllProtocols();
  const idx = protocols.findIndex(p => p.id === id || p.code === id);
  if (idx !== -1) {
    protocols[idx] = {
      ...protocols[idx],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    saveProtocolsState();
    return { success: true, protocol: protocols[idx] };
  }
  return { success: false, error: 'Protocolo não encontrado.' };
}
