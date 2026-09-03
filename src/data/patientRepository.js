/**
 * Patient Repository & State Hydration Engine
 * Laboratório da Sobriedade
 */

import { MASTER_FORMS_DATA } from './masterDatabase';

// Initial cohort profiles
export const INITIAL_PATIENTS = [
  {
    id: 'amanda',
    name: 'Amanda',
    avatar: '👩‍⚕️',
    diagnosis: 'Recuperação - Fase de Consolidação (Primeiro Ano)',
    enrolledDate: 'Agosto 2026',
    keyAnchors: ['Ambulatório (Seg/Qua/Qui/Sex)', 'Academia & Estudo', 'Medcurso (Domingo)', 'Família & Amigos'],
    notes: 'Rotina ativa de estudos e graduação. Boa rede de apoio familiar, vigilância necessária em sobrecarga pré-provas.'
  },
  {
    id: 'emannuel',
    name: 'Emannuel',
    avatar: '👨‍💼',
    diagnosis: 'Recuperação - Estabilização de Rotina Laboral e NA',
    enrolledDate: 'Agosto 2026',
    keyAnchors: ['Trabalho (Seg a Sex)', 'Procyon (Ter/Sex)', 'Ambulatório (Seg/Qua/Qui/Sex)', 'Narcóticos Anônimos (Sábado)', 'Centro Espírita / Igreja'],
    notes: 'Maior histórico diário contínuo. Picos de dever durante dias úteis e necessidade de preservar caminhadas vespertinas.'
  },
  {
    id: 'sabrina',
    name: 'Sabrina',
    avatar: '👩‍🎨',
    diagnosis: 'Recuperação - Manejo de Humor e Ancoragem Terapêutica',
    enrolledDate: 'Agosto 2026',
    keyAnchors: ['Depakote / Almeida 35 / Desvenlafaxina / Quetiapina', 'Ambulatório', 'Almoço com a Mãe', 'Crochê & Leitura', 'Terreiro / Balneário'],
    notes: 'Atenção rigorosa aos horários de medicação psiquiátrica. Evitar hipersonia vespertina que mascara episódios disfóricos.'
  }
];

// Helper to normalize patient name to ID
export function normalizePatientId(name = '') {
  const clean = name.toLowerCase().trim();
  if (clean.includes('amanda')) return 'amanda';
  if (clean.includes('emanuel') || clean.includes('emannuel')) return 'emannuel';
  if (clean.includes('sabrina')) return 'sabrina';
  return clean;
}

/**
 * Parses raw master data into per-patient structured records
 */
function buildInitialDatabase() {
  const patientMap = {};

  INITIAL_PATIENTS.forEach(p => {
    patientMap[p.id] = {
      ...p,
      weeklyPlanned: {
        'Segunda-feira': { manha: '', tarde: '', noite: '' },
        'Terça-feira': { manha: '', tarde: '', noite: '' },
        'Quarta-feira': { manha: '', tarde: '', noite: '' },
        'Quinta-feira': { manha: '', tarde: '', noite: '' },
        'Sexta-feira': { manha: '', tarde: '', noite: '' },
        'Sábado': { manha: '', tarde: '', noite: '' },
        'Domingo': { manha: '', tarde: '', noite: '' }
      },
      forms: [],
      logs: []
    };
  });

  MASTER_FORMS_DATA.forEach(item => {
    const pid = normalizePatientId(item.patient);
    if (patientMap[pid]) {
      const day = item.day_of_week;
      // Planned routine
      if (item.planned_routine) {
        patientMap[pid].weeklyPlanned[day] = {
          manha: item.planned_routine.manha || '',
          tarde: item.planned_routine.tarde || '',
          noite: item.planned_routine.noite || ''
        };
      }

      patientMap[pid].forms.push(item);

      // Flatten responses
      if (item.responses && Array.isArray(item.responses)) {
        item.responses.forEach(resp => {
          patientMap[pid].logs.push({
            id: `log-${pid}-${resp.timestamp}`,
            fileId: item.file_id,
            patientId: pid,
            day_of_week: day,
            timestamp: resp.timestamp,
            date: resp.timestamp ? resp.timestamp.split(' ')[0] : '2026-08-01',
            time: resp.timestamp ? resp.timestamp.split(' ')[1] : '12:00:00',
            manha: resp.manha || { status: '', score: 4 },
            tarde: resp.tarde || { status: '', score: 4 },
            noite: resp.noite || { status: '', score: 4 },
            satisfacao: resp.satisfacao !== undefined ? resp.satisfacao : 8,
            imprevistos: resp.imprevistos || '',
            isSynthetic: false
          });
        });
      }
    }
  });

  // Sort logs chronologically
  Object.values(patientMap).forEach(p => {
    p.logs.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  });

  return patientMap;
}

// In-memory singleton with safe localStorage fallback
let CURRENT_DATABASE = null;

function safeGetStorage(key) {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage.getItem(key);
    }
  } catch (e) {
    console.warn('Storage read restricted or unavailable, using in-memory state:', e);
  }
  return null;
}

function safeSetStorage(key, value) {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, value);
    }
  } catch (e) {
    console.warn('Storage write restricted or unavailable:', e);
  }
}

export function getDatabase() {
  if (!CURRENT_DATABASE) {
    const saved = safeGetStorage('sbl_database_state');
    if (saved) {
      try {
        CURRENT_DATABASE = JSON.parse(saved);
      } catch (e) {
        CURRENT_DATABASE = buildInitialDatabase();
      }
    } else {
      CURRENT_DATABASE = buildInitialDatabase();
    }
  }
  return CURRENT_DATABASE;
}

export function saveDatabaseState() {
  if (CURRENT_DATABASE) {
    safeSetStorage('sbl_database_state', JSON.stringify(CURRENT_DATABASE));
  }
}

export function resetToMasterBaseline() {
  CURRENT_DATABASE = buildInitialDatabase();
  saveDatabaseState();
  return CURRENT_DATABASE;
}

export function getAllPatients() {
  const db = getDatabase();
  return Object.values(db);
}

export function getPatientById(id) {
  const db = getDatabase();
  return db[id] || Object.values(db)[0];
}

/**
 * Filters logs by timeframe window (7d, 15d, 30d, all, custom)
 */
export function getPatientLogs(patientId, timeframe = 'all', includeSynthetic = false) {
  const patient = getPatientById(patientId);
  if (!patient || !patient.logs) return [];

  let logs = [...patient.logs];

  if (includeSynthetic) {
    const syntheticLogs = generateSyntheticExtension(patientId, patient.logs);
    logs = [...logs, ...syntheticLogs];
    logs.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  }

  if (timeframe === 'all' || logs.length === 0) {
    return logs;
  }

  // Find latest date in logs
  const latestDate = new Date(logs[logs.length - 1].timestamp);
  let daysWindow = 30;
  if (timeframe === '7d') daysWindow = 7;
  else if (timeframe === '15d') daysWindow = 15;
  else if (timeframe === '30d') daysWindow = 30;

  const cutoff = new Date(latestDate.getTime() - daysWindow * 24 * 60 * 60 * 1000);
  return logs.filter(log => new Date(log.timestamp) >= cutoff);
}

export function addPatientLog(patientId, newLog) {
  const db = getDatabase();
  if (db[patientId]) {
    const entry = {
      id: `log-${patientId}-${new Date().toISOString()}`,
      patientId,
      timestamp: newLog.timestamp || new Date().toISOString().replace('T', ' ').slice(0, 19),
      date: (newLog.timestamp || new Date().toISOString()).split('T')[0],
      day_of_week: newLog.day_of_week || 'Segunda-feira',
      manha: newLog.manha || { status: 'Rotina executada conforme o planejado.', score: 4 },
      tarde: newLog.tarde || { status: 'Rotina executada conforme o planejado.', score: 4 },
      noite: newLog.noite || { status: 'Rotina executada conforme o planejado.', score: 4 },
      satisfacao: Number(newLog.satisfacao) || 8,
      imprevistos: newLog.imprevistos || '',
      isSynthetic: false
    };

    db[patientId].logs.push(entry);
    db[patientId].logs.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    saveDatabaseState();
    return entry;
  }
  return null;
}

export function updateWeeklyRoutine(patientId, dayOfWeek, shiftData) {
  const db = getDatabase();
  if (db[patientId] && db[patientId].weeklyPlanned) {
    db[patientId].weeklyPlanned[dayOfWeek] = {
      ...db[patientId].weeklyPlanned[dayOfWeek],
      ...shiftData
    };
    saveDatabaseState();
    return db[patientId].weeklyPlanned;
  }
  return null;
}

/**
 * Generates synthetic extended logs into September 2026 for predictive analytics
 */
function generateSyntheticExtension(patientId, baseLogs = []) {
  if (!baseLogs || baseLogs.length === 0) return [];
  const daysOfWeekMap = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
  const synthetic = [];

  const startDate = new Date('2026-09-01T08:00:00');
  for (let i = 0; i < 14; i++) {
    const curDate = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
    const dayName = daysOfWeekMap[curDate.getDay()];
    const dateStr = curDate.toISOString().split('T')[0];

    // Seeded values based on patient profile
    let mScore = 4, tScore = 4, nScore = 4;
    let mStatus = 'Rotina executada conforme o planejado.';
    let tStatus = 'Rotina executada conforme o planejado.';
    let nStatus = 'Rotina executada conforme o planejado.';
    let imp = '';

    if (patientId === 'amanda') {
      if (dayName === 'Segunda-feira' || dayName === 'Quarta-feira') {
        mScore = 4; tScore = 4; nScore = 4;
      } else if (dayName === 'Sábado' || dayName === 'Domingo') {
        mScore = 1; tScore = 4; nScore = 1;
        imp = 'Estudo em casa e encontro com amigos no final de semana.';
      }
    } else if (patientId === 'emannuel') {
      if (dayName === 'Segunda-feira' || dayName === 'Quarta-feira') {
        mScore = 7; tScore = 4; nScore = 4;
      } else if (dayName === 'Sábado') {
        mScore = 1; tScore = 1; nScore = 1;
        imp = 'Presença confirmada no NA com excelente integração.';
      }
    } else if (patientId === 'sabrina') {
      if (dayName === 'Sexta-feira' || dayName === 'Sábado') {
        mScore = 3; tScore = 4; nScore = 2;
        imp = 'Passeio de bicicleta e convivência familiar.';
      }
    }

    synthetic.push({
      id: `synthetic-${patientId}-${dateStr}`,
      patientId,
      timestamp: `${dateStr} 21:00:00`,
      date: dateStr,
      day_of_week: dayName,
      manha: { status: mStatus, score: mScore },
      tarde: { status: tStatus, score: tScore },
      noite: { status: nStatus, score: nScore },
      satisfacao: 9,
      imprevistos: imp,
      isSynthetic: true
    });
  }

  return synthetic;
}
