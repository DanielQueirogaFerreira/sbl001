/**
 * Professional Health & Occupational Well-being Engine
 * 6 evaluation frequencies: Daily, Weekly, Monthly, Quarterly, Semiannual, Annual
 * Laboratório da Sobriedade
 */

const STORAGE_KEY = 'sbl_professional_health_responses';

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

export const QUESTIONNAIRES_CONFIG = {
  daily: {
    id: 'daily',
    title: 'Check-in Diário de Energia e Limites',
    frequencyLabel: 'Diário',
    targetAudience: 'Terapeuta em Atendimento Ativo',
    questions: [
      { id: 'q1', text: 'Nível de vitalidade e energia após os atendimentos do dia (1 a 10):', type: 'scale', min: 1, max: 10 },
      { id: 'q2', text: 'Sensação de sobrecarga por empatia / absorção emocional dos pacientes (1 a 10):', type: 'scale', min: 1, max: 10 },
      { id: 'q3', text: 'Conseguiu desconectar totalmente das demandas clínicas no encerramento do expediente?', type: 'select', options: ['Sim, com facilidade', 'Parcialmente (pensamentos intrusivos)', 'Não, permaneci ruminando casos'] }
    ]
  },
  weekly: {
    id: 'weekly',
    title: 'Balanço Semanal de Dever x Autocuidado',
    frequencyLabel: 'Semanal',
    targetAudience: 'Revisão da Semana Terapêutica',
    questions: [
      { id: 'w1', text: 'Qualidade do descanso e reparação do sono nos últimos 7 dias (1 a 10):', type: 'scale', min: 1, max: 10 },
      { id: 'w2', text: 'Proporção de momentos de prazer genuíno vs sobrecarga de deveres na sua própria rotina:', type: 'select', options: ['Equilibrado (≥ 40% prazer)', 'Razoável (20% a 40% prazer)', 'Crítico (< 20% prazer, predomínio de dever)'] },
      { id: 'w3', text: 'Sintomas somáticos de tensão física (dores musculares, cefaleia, gastrite) (1 a 10):', type: 'scale', min: 1, max: 10 },
      { id: 'w4', text: 'Praticou atividade física ou âncora pessoal pelo menos 3 vezes na semana?', type: 'select', options: ['Sim, cumprido', 'Apenas 1 ou 2 vezes', 'Nenhuma vez'] }
    ]
  },
  monthly: {
    id: 'monthly',
    title: 'Auditoria Mensal de Eficácia & Supervisão',
    frequencyLabel: 'Mensal',
    targetAudience: 'Revisão Mensal de Prática Clínica',
    questions: [
      { id: 'm1', text: 'Sentimento de realização profissional e alinhamento com os casos conduzidos (1 a 10):', type: 'scale', min: 1, max: 10 },
      { id: 'm2', text: 'Frequência de intervisão ou supervisão clínica com pares no mês:', type: 'select', options: ['Frequente (2+ vezes)', 'Ocasional (1 vez)', 'Nenhuma no período'] },
      { id: 'm3', text: 'Percepção de evolução clínica dos pacientes tutelados sob o protocolo (1 a 10):', type: 'scale', min: 1, max: 10 }
    ]
  },
  quarterly: {
    id: 'quarterly',
    title: 'Inventário Trimestral de Prevenção de Fadiga por Compaixão',
    frequencyLabel: 'Trimestral',
    targetAudience: 'Ciclo Quadrimestral / Trimestral',
    questions: [
      { id: 't1', text: 'Grau de cinismo ou distanciamento defensivo em relação aos relatos de recaída (1 a 10):', type: 'scale', min: 1, max: 10 },
      { id: 't2', text: 'Capacidade de sustentar esperança e motivação diante de platôs clínicos (1 a 10):', type: 'scale', min: 1, max: 10 },
      { id: 't3', text: 'Equilíbrio sustentável entre carreira terapêutica e convívio familiar/afetivo:', type: 'select', options: ['Sustentável e protetivo', 'Sob pressão moderada', 'Comprometido'] }
    ]
  },
  semiannual: {
    id: 'semiannual',
    title: 'Avaliação Semestral de Competências & Protocolos',
    frequencyLabel: 'Semestral',
    targetAudience: 'Desenvolvimento e Ética Semestral',
    questions: [
      { id: 's1', text: 'Necessidade de aperfeiçoamento nos protocolos clínicos adotados (ex: PRT001):', type: 'select', options: ['Domínio pleno e autônomo', 'Necessito de atualização técnica', 'Revisão profunda recomendada'] },
      { id: 's2', text: 'Reserva financeira e segurança no exercício da clínica no semestre (1 a 10):', type: 'scale', min: 1, max: 10 }
    ]
  },
  annual: {
    id: 'annual',
    title: 'Inventário Anual de Saúde Integral e Carreira Sustentável',
    frequencyLabel: 'Anual',
    targetAudience: 'Planejamento e Retrospectiva Anual',
    questions: [
      { id: 'a1', text: 'Índice Global de Vitalidade e Propósito de Vida no ano que passou (1 a 10):', type: 'scale', min: 1, max: 10 },
      { id: 'a2', text: 'Período efetivo de férias ou recesso total gozado no ano:', type: 'select', options: ['≥ 30 dias', '15 a 29 dias', '< 15 dias'] },
      { id: 'a3', text: 'Avaliação da sustentabilidade do ritmo de trabalho para os próximos 3 anos (1 a 10):', type: 'scale', min: 1, max: 10 }
    ]
  }
};

let RESPONSES_CACHE = null;

export function getAllHealthResponses() {
  if (!RESPONSES_CACHE) {
    const saved = safeGetStorage(STORAGE_KEY);
    if (saved) {
      try {
        RESPONSES_CACHE = JSON.parse(saved);
      } catch (e) {
        RESPONSES_CACHE = [];
      }
    } else {
      RESPONSES_CACHE = [];
      saveResponsesState();
    }
  }
  return RESPONSES_CACHE;
}

export function saveResponsesState() {
  if (RESPONSES_CACHE) {
    safeSetStorage(STORAGE_KEY, JSON.stringify(RESPONSES_CACHE));
  }
}

export function submitHealthResponse(professionalId, frequencyKey, answers) {
  const responses = getAllHealthResponses();
  const cfg = QUESTIONNAIRES_CONFIG[frequencyKey];

  // Calculate score average for scale answers
  const scaleValues = Object.values(answers).filter(v => typeof v === 'number');
  const avgScore = scaleValues.length > 0 
    ? Math.round((scaleValues.reduce((a, b) => a + b, 0) / scaleValues.length) * 10) / 10 
    : 8.0;

  const newEntry = {
    id: `resp-${Date.now()}`,
    professionalId: professionalId,
    frequencyKey: frequencyKey,
    title: cfg ? cfg.title : frequencyKey,
    timestamp: new Date().toISOString(),
    answers: answers,
    score: avgScore,
    status: avgScore >= 7 ? 'Ótimo' : avgScore >= 5 ? 'Atenção' : 'Alerta'
  };

  responses.unshift(newEntry);
  saveResponsesState();
  return { success: true, entry: newEntry };
}

export function getProfessionalHealthHistory(professionalId) {
  const responses = getAllHealthResponses();
  return responses.filter(r => r.professionalId === professionalId);
}
