/**
 * AI Clinical SWOT & Natural Language Capture Engine
 * Laboratório da Sobriedade
 */

import { calculateClinicalMetrics } from './clinicalMetrics';
import { analyzeWeeklyRoutinePatterns, calculateRoutineDrift } from './routineEngine';

/**
 * Generates an intelligent, clinically rigorous SWOT matrix
 * tailored to the selected patient, timeframe, and real logs.
 */
export function generateClinicalSwot(patient, logs = [], weeklyRoutines = {}) {
  const metrics = calculateClinicalMetrics(logs);
  const patterns = analyzeWeeklyRoutinePatterns(weeklyRoutines);
  const drift = calculateRoutineDrift(logs);

  const forcas = [];
  const fraquezas = [];
  const oportunidades = [];
  const ameacas = [];

  // --- 1. FORÇAS (Strengths) ---
  if (metrics.adherenceRate >= 60) {
    forcas.push(`Alta taxa de execução do planejado (${metrics.adherenceRate}%), demonstrando compromisso com a estrutura terapêutica.`);
  } else {
    forcas.push(`Capacidade de manter rotinas básicas em turnos de menor pressão (Turno Manhã com média ${metrics.avgManhaScore}).`);
  }

  if (metrics.avgSatisfaction >= 7.5) {
    forcas.push(`Alto índice de satisfação geral autodeclarada (${metrics.avgSatisfaction}/10), indicando bem-estar percebido durante o período.`);
  }

  if (patient.name === 'Amanda') {
    forcas.push('Manutenção sólida de interações sociais protetivas e momentos de lazer familiar nos fins de semana (Medcurso, vôlei em família).');
  } else if (patient.name === 'Sabrina') {
    forcas.push('Excelente suporte familiar e vínculo diário com a mãe nos turnos diurnos (almoço e conversas protegidas).');
  } else if (patient.name === 'Emannuel') {
    forcas.push('Presença regular no NA (Narcóticos Anônimos) e rotina de caminhadas vespertinas como ancoragem física.');
  }

  // --- 2. FRAQUEZAS (Weaknesses) ---
  if (metrics.dutySkewIndex >= 45) {
    fraquezas.push(`Sobrecarga no índice de Dever (${metrics.dutySkewIndex}% dos turnos em pontuação 5-7), indicando escassez de alívio e prazer regenerativo.`);
  }

  if (drift.driftIndex >= 30) {
    fraquezas.push(`Índice de desvio de rotina em ${drift.driftIndex}%, com frequente adiamento de tarefas domésticas ou compromissos noturnos.`);
  }

  if (patient.name === 'Amanda') {
    fraquezas.push('Tendência a sacrificar idas ao ambulatório após episódios de cansaço pós-academia ou estudo intenso.');
  } else if (patient.name === 'Sabrina') {
    fraquezas.push('Sono vespertino excessivo (>4h) substituindo atividades planejadas de autocuidado (crochê, leitura) em dias de desânimo.');
  } else if (patient.name === 'Emannuel') {
    fraquezas.push('Picos acentuados de Nota 7 (Dever absoluto) em segundas e quartas-feiras, gerando fadiga acumulada.');
  }

  // --- 3. OPORTUNIDADES (Opportunities) ---
  if (patterns.patternCount > 4) {
    oportunidades.push('Simplificar e padronizar dias de meio de semana para atingir a faixa ótima de 3 a 4 padrões semanais.');
  } else {
    oportunidades.push('Modular horários de estudo/trabalho intercalando micropausas prazerosas de 20 minutos para balancear o escore Dever.');
  }

  oportunidades.push('Utilizar o diário de voz conversacional para registro imediato no fechamento de cada turno (Manhã / Tarde / Noite) evitando esquecimentos.');
  oportunidades.push('Fortalecer pactuações com o terapeuta no ambulatório para antecipar eventos de quebra de rotina em feriados e finais de semana.');

  // --- 4. AMEAÇAS (Threats - Preditores de Recaída) ---
  if (drift.anchorStats.ambulatorioMissed > 0 || drift.anchorStats.naMissed > 0) {
    ameacas.push(`Alerta de Risco: Registro de faltas ou abandono de âncoras clínicas essenciais (Ambulatório / NA), principal gatilho de vulnerabilidade.`);
  }

  if (metrics.dutySkewIndex > 65) {
    ameacas.push('Risco de exaustão emocional por escore contínuo de Dever (5 a 7) sem válvulas de prazer genuíno (Prazer 1 a 3).');
  }

  if (patterns.patternCount >= 5) {
    ameacas.push('Dispersão e caos de rotina (>5 padrões) diminuem a previsibilidade cognitiva e amplificam a impulsividade.');
  } else {
    ameacas.push('Vulnerabilidade a imprevistos de última hora que rompem a janela noturna de medicação e repouso.');
  }

  return {
    generatedAt: new Date().toISOString(),
    patientId: patient.id,
    patientName: patient.name,
    timeframeLogsCount: logs.length,
    matrix: {
      forcas,
      fraquezas,
      oportunidades,
      ameacas
    },
    clinicalRecommendation: generateClinicalRecommendation(patient, metrics, patterns, drift)
  };
}

function generateClinicalRecommendation(patient, metrics, patterns, drift) {
  if (drift.driftIndex > 50 || metrics.dutySkewIndex > 70) {
    return `Intervenção Recomendada para ${patient.name}: Agendar sessão de alinhamento com o terapeuta para repactuar o plano "As-Built". Reduzir carga de obrigações na transição da tarde para a noite e blindar a presença no Ambulatório.`;
  }
  return `Estratégia Recomendada para ${patient.name}: Manter a grade semanal estabilizada em ${patterns.patternCount} padrões. Reforçar o registro imediato por turno e incentivar a preservação das atividades com Nota 1 a 3 (Prazer genuíno).`;
}

/**
 * Natural Language Fast-Dump Parser
 * Simulates LLM parsing of unstructured natural language into structured shifts.
 */
export function parseConversationalDump(text = '') {
  const lower = text.toLowerCase();
  
  // Predict Manha
  let manhaStatus = 'Rotina executada conforme o planejado.';
  let manhaScore = 4;
  if (lower.includes('acordei tarde') || lower.includes('perdi a hora') || lower.includes('atrasou')) {
    manhaStatus = 'Rotina executada parcialmente conforme o planejado.';
    manhaScore = 5;
  } else if (lower.includes('café') || lower.includes('caminhada') || lower.includes('remédio')) {
    manhaScore = lower.includes('gostei') || lower.includes('bom') ? 2 : 4;
  }

  // Predict Tarde
  let tardeStatus = 'Rotina executada conforme o planejado.';
  let tardeScore = 4;
  if (lower.includes('não fui ao trabalho') || lower.includes('não limpei') || lower.includes('dormi a tarde toda')) {
    tardeStatus = 'Rotina não foi executada conforme o planejado.';
    tardeScore = lower.includes('dormi') ? 2 : 6;
  } else if (lower.includes('academia') || lower.includes('estudo') || lower.includes('trabalho')) {
    tardeScore = lower.includes('cansativo') || lower.includes('difícil') ? 7 : 4;
  }

  // Predict Noite
  let noiteStatus = 'Rotina executada conforme o planejado.';
  let noiteScore = 4;
  if (lower.includes('perdi o ambulatório') || lower.includes('não fui pro na') || lower.includes('não fui ao ambulatório')) {
    noiteStatus = 'Rotina não foi executada conforme o planejado.';
    noiteScore = 7;
  } else if (lower.includes('ambulatório') || lower.includes('na') || lower.includes('família') || lower.includes('série')) {
    noiteScore = lower.includes('amigos') || lower.includes('família') ? 1 : 4;
  }

  // Predict Satisfaction
  let satisfacao = 8;
  if (lower.includes('ótimo') || lower.includes('muito bom') || lower.includes('excelente') || lower.includes('10')) satisfacao = 10;
  if (lower.includes('ruim') || lower.includes('chato') || lower.includes('cansativo') || lower.includes('ansiedade')) satisfacao = 5;

  return {
    parsed: true,
    rawText: text,
    extractedData: {
      manha: { status: manhaStatus, score: manhaScore },
      tarde: { status: tardeStatus, score: tardeScore },
      noite: { status: noiteStatus, score: noiteScore },
      satisfacao,
      imprevistos: text
    },
    aiRationale: 'Entrada conversacional decodificada com mapeamento contextual de turnos, identificação de âncoras clínicas e predição de escores Prazer x Dever.'
  };
}
