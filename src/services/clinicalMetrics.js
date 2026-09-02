/**
 * Clinical Metrics & Pleasure x Duty Calculation Engine
 * Laboratório da Sobriedade
 */

export const SCALE_CONFIG = {
  PRAZER: { min: 1, max: 3, label: 'Prazer', color: 'var(--color-prazer)', bg: 'var(--color-prazer-bg)', border: 'var(--color-prazer-border)' },
  MISTO: { min: 4, max: 4, label: 'Misto', color: 'var(--color-misto)', bg: 'var(--color-misto-bg)', border: 'var(--color-misto-border)' },
  DEVER: { min: 5, max: 7, label: 'Dever', color: 'var(--color-dever)', bg: 'var(--color-dever-bg)', border: 'var(--color-dever-border)' }
};

/**
 * Returns semantic classification for a score from 1 to 7
 */
export function getScoreCategory(score) {
  const num = Number(score);
  if (num >= 1 && num <= 3) return 'PRAZER';
  if (num === 4) return 'MISTO';
  if (num >= 5 && num <= 7) return 'DEVER';
  return 'MISTO';
}

export function getScoreLabel(score) {
  const cat = getScoreCategory(score);
  if (cat === 'PRAZER') return `${score} - Prazer`;
  if (cat === 'MISTO') return '4 - Misto';
  if (cat === 'DEVER') return `${score} - Dever`;
  return `${score}`;
}

export function getScoreBadgeClass(score) {
  const cat = getScoreCategory(score);
  if (cat === 'PRAZER') return 'badge-prazer';
  if (cat === 'MISTO') return 'badge-misto';
  if (cat === 'DEVER') return 'badge-dever';
  return 'badge-gray';
}

/**
 * Calculates comprehensive clinical statistics for a set of response logs
 */
export function calculateClinicalMetrics(logs = []) {
  if (!logs || logs.length === 0) {
    return {
      totalLogs: 0,
      avgSatisfaction: 0,
      avgManhaScore: 0,
      avgTardeScore: 0,
      avgNoiteScore: 0,
      overallAvgScore: 0,
      prazerCount: 0,
      mistoCount: 0,
      deverCount: 0,
      dutySkewIndex: 0,
      adherenceRate: 0,
      fullyExecutedCount: 0,
      partialExecutedCount: 0,
      notExecutedCount: 0,
      clinicalRiskLevel: 'Estável'
    };
  }

  let totalSatisfaction = 0;
  let satisfactionCount = 0;

  let sumManha = 0, countManha = 0;
  let sumTarde = 0, countTarde = 0;
  let sumNoite = 0, countNoite = 0;

  let prazerCount = 0;
  let mistoCount = 0;
  let deverCount = 0;

  let fullyExecuted = 0;
  let partialExecuted = 0;
  let notExecuted = 0;
  let totalShifts = 0;

  logs.forEach(log => {
    // Satisfaction
    if (log.satisfacao !== null && log.satisfacao !== undefined && !isNaN(log.satisfacao)) {
      totalSatisfaction += Number(log.satisfacao);
      satisfactionCount++;
    }

    // Shifts
    const shifts = [
      { data: log.manha, sumRef: () => { sumManha += log.manha.score; countManha++; } },
      { data: log.tarde, sumRef: () => { sumTarde += log.tarde.score; countTarde++; } },
      { data: log.noite, sumRef: () => { sumNoite += log.noite.score; countNoite++; } }
    ];

    shifts.forEach(s => {
      if (s.data && typeof s.data.score === 'number') {
        s.sumRef();
        totalShifts++;
        const cat = getScoreCategory(s.data.score);
        if (cat === 'PRAZER') prazerCount++;
        else if (cat === 'MISTO') mistoCount++;
        else if (cat === 'DEVER') deverCount++;

        const status = s.data.status || '';
        if (status.includes('conforme o planejado') && !status.includes('parcialmente') && !status.includes('não')) {
          fullyExecuted++;
        } else if (status.includes('parcialmente')) {
          partialExecuted++;
        } else if (status.includes('não foi executada')) {
          notExecuted++;
        }
      }
    });
  });

  const avgSatisfaction = satisfactionCount > 0 ? (totalSatisfaction / satisfactionCount).toFixed(1) : 0;
  const avgManha = countManha > 0 ? (sumManha / countManha).toFixed(2) : 0;
  const avgTarde = countTarde > 0 ? (sumTarde / countTarde).toFixed(2) : 0;
  const avgNoite = countNoite > 0 ? (sumNoite / countNoite).toFixed(2) : 0;
  const overallAvg = totalShifts > 0 ? ((sumManha + sumTarde + sumNoite) / totalShifts).toFixed(2) : 0;

  const dutySkewIndex = totalShifts > 0 ? Math.round((deverCount / totalShifts) * 100) : 0;
  const adherenceRate = totalShifts > 0 ? Math.round((fullyExecuted / totalShifts) * 100) : 0;

  // Clinical risk heuristic
  let clinicalRiskLevel = 'Estável (Baixo Risco)';
  let riskBadge = 'badge-prazer';
  if (dutySkewIndex > 60 || adherenceRate < 50) {
    clinicalRiskLevel = 'Alerta de Sobrecarga (Risco Moderado)';
    riskBadge = 'badge-misto';
  }
  if (dutySkewIndex > 75 || adherenceRate < 35) {
    clinicalRiskLevel = 'Crítico: Ruptura de Rotina (Alto Risco)';
    riskBadge = 'badge-dever';
  }

  return {
    totalLogs: logs.length,
    avgSatisfaction: Number(avgSatisfaction),
    avgManhaScore: Number(avgManha),
    avgTardeScore: Number(avgTarde),
    avgNoiteScore: Number(avgNoite),
    overallAvgScore: Number(overallAvg),
    prazerCount,
    mistoCount,
    deverCount,
    dutySkewIndex,
    adherenceRate,
    fullyExecutedCount: fullyExecuted,
    partialExecutedCount: partialExecuted,
    notExecutedCount: notExecuted,
    clinicalRiskLevel,
    riskBadge
  };
}
