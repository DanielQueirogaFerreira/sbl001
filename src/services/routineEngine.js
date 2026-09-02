/**
 * Routine Pattern & Drift Analyzer ("Planejado vs Executado / As-Built")
 * Laboratório da Sobriedade
 */

export const DAYS_OF_WEEK = [
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
  'Domingo'
];

/**
 * Categorizes the routine structure and detects the number of distinct weekly patterns.
 * Clinical baseline rule (Plínio Benfica):
 * - 3 to 4 patterns per week: Normal / Equilibrado (Saudável)
 * - > 5-6 patterns per week: Caótico / Vulnerável (Alto Risco de Recaída)
 * - < 2 patterns per week: Rígido / Estagnação (Falta de Estímulo)
 */
export function analyzeWeeklyRoutinePatterns(weeklyRoutines = {}) {
  const patternGroups = [];
  const daySignatures = {};

  DAYS_OF_WEEK.forEach(day => {
    const routine = weeklyRoutines[day] || { manha: '', tarde: '', noite: '' };
    
    // Normalize content to identify pattern signature
    const signature = [
      (routine.manha || '').toLowerCase().replace(/\s+/g, ' ').trim(),
      (routine.tarde || '').toLowerCase().replace(/\s+/g, ' ').trim(),
      (routine.noite || '').toLowerCase().replace(/\s+/g, ' ').trim()
    ].join(' || ');

    daySignatures[day] = signature;

    // Check if matches an existing pattern cluster
    let matchedGroup = patternGroups.find(group => {
      return group.signature === signature || isHighlySimilar(group.signature, signature);
    });

    if (matchedGroup) {
      matchedGroup.days.push(day);
    } else {
      patternGroups.push({
        id: `Padrão ${String.fromCharCode(65 + patternGroups.length)}`, // Padrão A, B, C...
        signature,
        sampleRoutine: routine,
        days: [day]
      });
    }
  });

  const patternCount = patternGroups.length;
  let status = 'Equilibrado (Normal)';
  let clinicalVerdict = 'Faixa ideal de estabilidade na recuperação (3 a 4 padrões distintos).';
  let badgeColor = 'badge-prazer';

  if (patternCount >= 5) {
    status = 'Caótico / Instável';
    clinicalVerdict = 'Alerta Clínico: Mais de 5 padrões por semana indicam dispersão e rotina desorganizada, elevando o risco de recaída.';
    badgeColor = 'badge-dever';
  } else if (patternCount <= 2) {
    status = 'Rígido / Estagnado';
    clinicalVerdict = 'Alerta Clínico: Menos de 2 padrões indicam hiper-rigidez ou monotonia excessiva, propensa a esgotamento.';
    badgeColor = 'badge-misto';
  }

  return {
    patternCount,
    status,
    clinicalVerdict,
    badgeColor,
    patternGroups
  };
}

/**
 * Calculates Routine Rupture & Drift Index based on clinical logs
 * Evaluates execution status and imprevistos
 */
export function calculateRoutineDrift(logs = []) {
  if (!logs || logs.length === 0) {
    return {
      driftIndex: 0,
      ruptureLevel: 'Baixo',
      ruptureEvents: [],
      anchorAdherence: {
        ambulatorio: 100,
        na: 100,
        medicacao: 100
      }
    };
  }

  let totalEvents = 0;
  let driftedEvents = 0;
  const ruptureEvents = [];

  let ambulatorioMissed = 0, ambulatorioTotal = 0;
  let naMissed = 0, naTotal = 0;

  logs.forEach(log => {
    const imp = (log.imprevistos || '').toLowerCase();
    const isDrifted = 
      log.manha?.status?.includes('não') || log.manha?.status?.includes('parcialmente') ||
      log.tarde?.status?.includes('não') || log.tarde?.status?.includes('parcialmente') ||
      log.noite?.status?.includes('não') || log.noite?.status?.includes('parcialmente') ||
      imp.length > 5;

    if (isDrifted) {
      driftedEvents++;
      if (imp.length > 0) {
        ruptureEvents.push({
          date: log.timestamp,
          notes: log.imprevistos,
          day: log.day_of_week || 'Dia Registrado',
          severity: imp.includes('não fui') || imp.includes('perdi') ? 'Alta' : 'Moderada'
        });
      }
    }
    totalEvents++;

    // Track vital clinical anchors
    if (imp.includes('ambulatório') || imp.includes('ambulatorio')) {
      ambulatorioTotal++;
      if (imp.includes('não fui') || imp.includes('perdi')) ambulatorioMissed++;
    }
    if (imp.includes('na') || imp.includes('n.a')) {
      naTotal++;
      if (imp.includes('não fui') || imp.includes('nao fui')) naMissed++;
    }
  });

  const driftIndex = totalEvents > 0 ? Math.round((driftedEvents / totalEvents) * 100) : 0;
  let ruptureLevel = 'Baixo (Rotina Estável)';
  if (driftIndex > 40) ruptureLevel = 'Moderado (Flutuação de Rotina)';
  if (driftIndex > 65) ruptureLevel = 'Elevado (Ruptura Frequente)';

  return {
    driftIndex,
    ruptureLevel,
    ruptureEvents: ruptureEvents.slice(0, 10),
    anchorStats: {
      ambulatorioMissed,
      naMissed
    }
  };
}

function isHighlySimilar(a, b) {
  if (a === b) return true;
  const aClean = a.replace(/[^a-z0-9]/g, '');
  const bClean = b.replace(/[^a-z0-9]/g, '');
  if (aClean.length === 0 || bClean.length === 0) return false;
  return aClean.includes(bClean) || bClean.includes(aClean);
}
