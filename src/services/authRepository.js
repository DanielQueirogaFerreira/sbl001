import { getAllPatients } from '../data/patientRepository.js';

const STORAGE_KEY = 'sbl_auth_users_state';
const SESSION_KEY = 'sbl_auth_current_session';

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

// Initial default accounts
const DEFAULT_USERS = [
  {
    id: 'DAN00001',
    code: 'DAN00001',
    name: 'Daniel Queiroga',
    email: 'daniel.queiroga@nhnone.space',
    role: 'admin_master',
    avatar: '👑',
    password: 'Master@2026',
    mustChangePassword: false, // Senha já cadastrada — nunca exigir no root
    mustProvideEmail: false,
    hasScepter: true,
    isSynthetic: false,
    createdAt: '2026-09-01T08:00:00Z',
    bio: 'Administrador Master Fundador do Laboratório da Sobriedade'
  },
  {
    id: 'PLN00001',
    code: 'PLN00001',
    name: 'Dr. Plínio',
    email: 'dr.plinio@sobriedade.lab',
    role: 'professional',
    avatar: '👨‍⚕️',
    password: 'Plinio@2026',
    mustChangePassword: false,
    mustProvideEmail: false,
    hasScepter: false,
    isSynthetic: false,
    createdAt: '2026-09-01T08:00:00Z',
    bio: 'Terapeuta Clínico Especialista em Dependência Química — Tutor Titular do Protocolo PRT001'
  },
  {
    id: 'syn00001',
    code: 'syn00001',
    name: 'Dra. Helena (Sintética)',
    email: 'syn00001@syntetic.data',
    role: 'professional',
    avatar: '👩‍⚕️',
    password: 'SynUser@2026',
    mustChangePassword: false,
    mustProvideEmail: false,
    hasScepter: false,
    isSynthetic: true,
    createdAt: '2026-09-01T08:00:00Z',
    bio: 'Terapeuta Clínica Simulada para Validação de Manejo e Transferência'
  },
  {
    id: 'syn00002',
    code: 'syn00002',
    name: 'Admin Carlos (Sintético)',
    email: 'syn00002@syntetic.data',
    role: 'admin',
    avatar: '🛡️',
    password: 'SynUser@2026',
    mustChangePassword: false,
    mustProvideEmail: false,
    hasScepter: false,
    isSynthetic: true,
    createdAt: '2026-09-01T08:00:00Z',
    bio: 'Administrador Subordinado Simulado Elegível à Disputa de Cetro'
  }
];

let USERS_CACHE = null;

export function getAllUsers() {
  if (!USERS_CACHE) {
    const saved = safeGetStorage(STORAGE_KEY);
    if (saved) {
      try {
        USERS_CACHE = JSON.parse(saved);
        // Guarantee Daniel Queiroga's mustChangePassword is false
        const dan = USERS_CACHE.find(u => u.id === 'DAN00001');
        if (dan) {
          dan.mustChangePassword = false;
        }
      } catch (e) {
        USERS_CACHE = [...DEFAULT_USERS];
      }
    } else {
      USERS_CACHE = [...DEFAULT_USERS];
      saveUsersState();
    }
  }
  return USERS_CACHE;
}

export function saveUsersState() {
  if (USERS_CACHE) {
    safeSetStorage(STORAGE_KEY, JSON.stringify(USERS_CACHE));
  }
}

export function getUserById(id) {
  const users = getAllUsers();
  return users.find(u => u.id === id || u.code === id) || null;
}

export function getUserByEmail(email) {
  if (!email) return null;
  const users = getAllUsers();
  return users.find(u => u.email && u.email.toLowerCase() === email.toLowerCase()) || null;
}

/**
 * Authenticates by identifier (email or code) and password
 * Supports Admins, Healthcare Professionals, and Patients
 */
export function authenticateUser(identifier = '', password = '') {
  const clean = identifier.trim().toLowerCase();
  const users = getAllUsers();

  // 1. Search in authorized users (admin, professional)
  const user = users.find(u => 
    (u.email && u.email.toLowerCase() === clean) || 
    (u.code && u.code.toLowerCase() === clean) ||
    (u.id && u.id.toLowerCase() === clean)
  );

  if (user) {
    if (user.password !== password) {
      return { success: false, error: 'Senha incorreta para este usuário.' };
    }
    return { success: true, user };
  }

  // 2. Search in patients cohort (pre-registered and dynamically redeemed)
  try {
    const allPatients = getAllPatients() || [];
    const matched = allPatients.find(p => 
      p.id.toLowerCase() === clean || 
      (p.code && p.code.toLowerCase() === clean) || 
      p.name.toLowerCase() === clean
    );

    if (matched) {
      return { 
        success: true, 
        user: {
          id: matched.id,
          code: matched.code || `PAC-${matched.id.toUpperCase()}`,
          name: matched.name,
          role: 'patient',
          avatar: matched.avatar || '👤',
          diagnosis: matched.diagnosis,
          protocolId: matched.protocolId || 'PRT001',
          assignedProfessionalId: matched.assignedProfessionalId || 'PLN00001',
          assignedProfessionalName: matched.assignedProfessionalName || 'Dr. Plínio',
          keyAnchors: matched.keyAnchors || []
        }
      };
    }
  } catch (err) {
    console.warn('Patient lookup fallback:', err);
  }

  return { success: false, error: 'Usuário, código de acesso ou paciente não encontrado.' };
}

export function setCurrentSession(user) {
  if (!user) {
    safeSetStorage(SESSION_KEY, '');
  } else {
    safeSetStorage(SESSION_KEY, JSON.stringify(user));
  }
}

export function getCurrentSession() {
  const saved = safeGetStorage(SESSION_KEY);
  if (saved && saved.trim() !== '') {
    try {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.role === 'patient') {
        return parsed;
      }
      if (parsed && parsed.id) {
        // Re-hydrate with up-to-date user state from cache
        const fresh = getUserById(parsed.id);
        if (fresh) {
          if (fresh.id === 'DAN00001') {
            fresh.mustChangePassword = false;
          }
          return fresh;
        }
        return parsed;
      }
    } catch (e) {
      // Fallback
    }
  }
  return null; // When no session exists, system renders RootGatewayView!
}

export function logoutUser() {
  safeSetStorage(SESSION_KEY, '');
}

/**
 * Updates a user's password and clears mustChangePassword flag
 */
export function changeUserPassword(userId, newPassword) {
  const users = getAllUsers();
  const idx = users.findIndex(u => u.id === userId);
  if (idx !== -1) {
    users[idx].password = newPassword;
    users[idx].mustChangePassword = false;
    saveUsersState();
    
    // Update active session if matching
    const current = getCurrentSession();
    if (current && current.id === userId) {
      setCurrentSession(users[idx]);
    }
    return { success: true, user: users[idx] };
  }
  return { success: false, error: 'Usuário não localizado.' };
}

/**
 * Sets email for a user who had no email (e.g. Dr. Plínio)
 */
export function registerUserEmail(userId, email) {
  const cleanEmail = (email || '').trim().toLowerCase();
  if (!cleanEmail || !cleanEmail.includes('@')) {
    return { success: false, error: 'Forneça um endereço de e-mail válido.' };
  }

  const existing = getUserByEmail(cleanEmail);
  if (existing && existing.id !== userId) {
    return { success: false, error: 'Este e-mail já está em uso por outro usuário.' };
  }

  const users = getAllUsers();
  const idx = users.findIndex(u => u.id === userId);
  if (idx !== -1) {
    users[idx].email = cleanEmail;
    users[idx].mustProvideEmail = false;
    saveUsersState();

    const current = getCurrentSession();
    if (current && current.id === userId) {
      setCurrentSession(users[idx]);
    }
    return { success: true, user: users[idx] };
  }
  return { success: false, error: 'Usuário não localizado.' };
}

/**
 * Master Admin creates a new administrator
 */
export function createSubordinateAdmin({ name, email, tempPassword = 'Admin@2026' }) {
  const users = getAllUsers();
  const cleanEmail = email.trim().toLowerCase();

  if (getUserByEmail(cleanEmail)) {
    return { success: false, error: 'E-mail já cadastrado no sistema.' };
  }

  // Generate 3 letters + 5 numbers code
  const count = users.filter(u => u.role === 'admin').length + 1;
  const numStr = String(count).padStart(5, '0');
  const code = `ADM${numStr}`;

  const newAdmin = {
    id: code,
    code: code,
    name,
    email: cleanEmail,
    role: 'admin',
    avatar: '🛡️',
    password: tempPassword,
    mustChangePassword: true,
    mustProvideEmail: false,
    hasScepter: false,
    isSynthetic: false,
    createdAt: new Date().toISOString(),
    bio: 'Administrador Clínico Credenciado'
  };

  users.push(newAdmin);
  saveUsersState();
  return { success: true, user: newAdmin };
}

/**
 * Creates synthetic professional or administrator
 * Rule: username/id = synxxxxx, email = ...@syntetic.data
 */
export function createSyntheticUser({ name, role = 'professional', customSuffix }) {
  const users = getAllUsers();
  const synCount = users.filter(u => u.isSynthetic).length + 1;
  const suffix = customSuffix || String(synCount).padStart(5, '0');
  const code = `syn${suffix}`;
  const email = `${code}@syntetic.data`;

  const newUser = {
    id: code,
    code: code,
    name: name || (role === 'admin' ? `Admin Sintético ${suffix}` : `Terapeuta Sintético ${suffix}`),
    email: email,
    role: role,
    avatar: role === 'admin' ? '🤖' : '🧪',
    password: 'SynUser@2026',
    mustChangePassword: false,
    mustProvideEmail: false,
    hasScepter: false,
    isSynthetic: true,
    createdAt: new Date().toISOString(),
    bio: `Perfil Clínico Sintético [SD] — Código: ${code}`
  };

  users.push(newUser);
  saveUsersState();
  return { success: true, user: newUser };
}
