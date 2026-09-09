/**
 * Synthetic Data Generator & Labeling Engine (SD vs RD)
 * Generates calibrated synthetic cohorts and shifts for testing
 * Laboratório da Sobriedade
 */

import { getDatabase, saveDatabaseState, addPatientLog } from '../data/patientRepository';

export const SYNTHETIC_SCENARIOS = [
  {
    id: 'duty_skew_spike',
    name: 'Pico Crítico de Dever (DSI > 75%)',
    description: 'Simula período de sobrecarga com turnos dominados por notas 5, 6 e 7 e queda de satisfação.'
  },
  {
    id: 'balanced_recovery',
    name: 'Equilíbrio Terapêutico Sustentado',
    description: 'Simula rotina saudável com 35% de prazer (1-3), 25% misto (4) e 40% de dever produtivo.'
  },
  {
    id: 'chaotic_instability',
    name: 'Instabilidade de Rotina e Desvios',
    description: 'Simula horários irregulares, notas díspares e baixa aderência ao planejado.'
  }
];

export function generateSyntheticLogs(patientId, scenarioId = 'duty_skew_spike', count = 7) {
  const db = getDatabase();
  const patient = db[patientId];
  if (!patient) {
    return { success: false, error: 'Paciente não encontrado para geração sintética.' };
  }

  const generated = [];
  const baseDate = new Date();

  for (let i = 0; i < count; i++) {
    const logDate = new Date(baseDate.getTime() - (count - i) * 86400000);
    const dateStr = logDate.toISOString().split('T')[0];

    let manhaScore, tardeScore, noiteScore, satisfacao, imprevisto;

    if (scenarioId === 'duty_skew_spike') {
      manhaScore = 5 + Math.floor(Math.random() * 3); // 5, 6 ou 7
      tardeScore = 6 + Math.floor(Math.random() * 2); // 6 ou 7
      noiteScore = 4 + Math.floor(Math.random() * 3);
      satisfacao = 4 + Math.floor(Math.random() * 3); // 4 a 6
      imprevisto = 'Sobrecarga de demandas e cansaço acumulado simulado [SD].';
    } else if (scenarioId === 'balanced_recovery') {
      manhaScore = 2 + Math.floor(Math.random() * 3); // 2, 3 ou 4
      tardeScore = 4 + Math.floor(Math.random() * 2); // 4 ou 5
      noiteScore = 1 + Math.floor(Math.random() * 3); // 1, 2 ou 3
      satisfacao = 8 + Math.floor(Math.random() * 3); // 8 a 10
      imprevisto = 'Rotina fluida e tempo de autocuidado preservado [SD].';
    } else {
      manhaScore = 1 + Math.floor(Math.random() * 7);
      tardeScore = 1 + Math.floor(Math.random() * 7);
      noiteScore = 1 + Math.floor(Math.random() * 7);
      satisfacao = 5 + Math.floor(Math.random() * 4);
      imprevisto = 'Mudança abrupta de compromissos [SD].';
    }

    const newLog = {
      id: `sd-log-${patientId}-${Date.now()}-${i}`,
      patientId: patientId,
      timestamp: `${dateStr} 21:00:00`,
      date: dateStr,
      time: '21:00:00',
      day_of_week: 'Simulado',
      manha: { status: 'Executado [SD]', score: manhaScore },
      tarde: { status: 'Executado [SD]', score: tardeScore },
      noite: { status: 'Executado [SD]', score: noiteScore },
      satisfacao: satisfacao,
      imprevistos: imprevisto,
      isSynthetic: true,
      dataSource: 'SD'
    };

    addPatientLog(patientId, newLog);
    generated.push(newLog);
  }

  return {
    success: true,
    generatedCount: generated.length,
    patientName: patient.name,
    scenario: scenarioId
  };
}
