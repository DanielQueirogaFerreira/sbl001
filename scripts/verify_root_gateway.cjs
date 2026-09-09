/**
 * Root Gateway and Multi-Role Onboarding Verification Script
 * Validates:
 * 1. Root default state is null (no forced admin password setup on root)
 * 2. Master Admin Daniel Queiroga has mustChangePassword === false
 * 3. Onboarding sequence:
 *    - Admin -> Professional (PRF-XXXX + 4-digit PIN)
 *    - Admin -> Admin (ADM-XXXX + 4-digit PIN)
 *    - Professional -> Patient (PAC-XXXX + 4-digit PIN)
 * 4. Patient authentication & dedicated role isolation
 * 5. Clean logout returning session to null
 */

const fs = require('fs');
const path = require('path');

async function run() {
  console.log('--- Starting Root Gateway & Invite Sequence Tests ---');

  // Load modules dynamically
  const { 
    getAllUsers, 
    getCurrentSession, 
    setCurrentSession, 
    logoutUser, 
    authenticateUser 
  } = await import('../src/services/authRepository.js');

  const { 
    createInvite, 
    validateInvite, 
    redeemInvite 
  } = await import('../src/services/inviteEngine.js');

  // Test 1: Empty session state returns null (Root Gateway shown, no forced password setup)
  logoutUser();
  const sessionOnRoot = getCurrentSession();
  if (sessionOnRoot !== null) {
    throw new Error(`Expected null session on root, got: ${JSON.stringify(sessionOnRoot)}`);
  }
  console.log('✓ Test 1: Root default session is null (Root Gateway displays cleanly without password prompt)');

  // Test 2: Master Admin Daniel Queiroga credentials & flags
  const authAdmin = authenticateUser('DAN00001', 'Master@2026');
  if (!authAdmin.success || !authAdmin.user) {
    throw new Error(`Master Admin auth failed: ${authAdmin.error}`);
  }
  if (authAdmin.user.mustChangePassword === true) {
    throw new Error('Master Admin mustChangePassword is unexpectedly true!');
  }
  console.log('✓ Test 2: Master Admin Daniel Queiroga authenticated successfully with mustChangePassword === false');

  // Test 3: Authority Onboarding Sequences
  // 3a. Admin -> Professional (PRF-XXXX)
  const adminIssuer = authAdmin.user;
  const invProf = createInvite({
    type: 'professional',
    issuer: adminIssuer,
    targetName: 'Dra. Luiza Castro',
    targetEmail: 'luiza@hospital.med.br',
    customPin: '4321'
  });
  if (!invProf.success || !invProf.invite.code.startsWith('PRF-') || invProf.invite.pin !== '4321') {
    throw new Error(`Admin -> Professional invite failed: ${JSON.stringify(invProf)}`);
  }
  console.log(`✓ Test 3a: Admin -> Professional invite created: ${invProf.invite.code} (PIN: ${invProf.invite.pin})`);

  // 3b. Admin -> Admin (ADM-XXXX)
  const invAdmin = createInvite({
    type: 'admin',
    issuer: adminIssuer,
    targetName: 'Supervisora Renata',
    targetEmail: 'renata@sobriedade.lab',
    customPin: '8888'
  });
  if (!invAdmin.success || !invAdmin.invite.code.startsWith('ADM-') || invAdmin.invite.pin !== '8888') {
    throw new Error(`Admin -> Admin invite failed: ${JSON.stringify(invAdmin)}`);
  }
  console.log(`✓ Test 3b: Admin -> Admin invite created: ${invAdmin.invite.code} (PIN: ${invAdmin.invite.pin})`);

  // 3c. Professional -> Patient (PAC-XXXX)
  const authPlinio = authenticateUser('PLN00001', 'Plinio@2026');
  const profIssuer = authPlinio.user;
  const invPatient = createInvite({
    type: 'patient',
    issuer: profIssuer,
    targetName: 'Ricardo Oliveira',
    customPin: '1234',
    note: 'Indicação Ambulatório PRT001'
  });
  if (!invPatient.success || !invPatient.invite.code.startsWith('PAC-') || invPatient.invite.pin !== '1234') {
    throw new Error(`Professional -> Patient invite failed: ${JSON.stringify(invPatient)}`);
  }
  console.log(`✓ Test 3c: Professional -> Patient invite created: ${invPatient.invite.code} (PIN: ${invPatient.invite.pin})`);

  // Test 4: Redeem Patient Invite & Verify Role Isolation
  const redeemRes = redeemInvite(invPatient.invite.code, '1234', {
    name: 'Ricardo Oliveira',
    diagnosis: 'Recuperação - Fase Inicial',
    keyAnchor: 'Trabalho e Grupo de Apoio'
  });
  if (!redeemRes.success || !redeemRes.user || redeemRes.user.role !== 'patient') {
    throw new Error(`Patient invite redemption failed: ${JSON.stringify(redeemRes)}`);
  }
  if (redeemRes.user.assignedProfessionalId !== 'PLN00001') {
    throw new Error(`Expected assigned professional to be Dr. Plínio, got: ${redeemRes.user.assignedProfessionalId}`);
  }
  console.log(`✓ Test 4: Patient redeemed invite, bound to Dr. Plínio with role 'patient'`);

  // Test 5: Patient Login & Direct Session Access
  const authPatient = authenticateUser('amanda', 'Paciente@2026');
  if (!authPatient.success || authPatient.user.role !== 'patient') {
    throw new Error(`Patient Amanda authentication failed: ${JSON.stringify(authPatient)}`);
  }
  console.log('✓ Test 5: Patient Amanda authenticated with role: patient');

  // Test 6: Logout back to Root Gateway
  logoutUser();
  if (getCurrentSession() !== null) {
    throw new Error('Logout failed to reset current session to null');
  }
  console.log('✓ Test 6: Logout successfully resets session to null, showing Root Gateway');

  console.log('\n========================================');
  console.log('ALL ROOT GATEWAY & INVITE SEQUENCE TESTS PASSED! 🎉');
  console.log('========================================');
}

run().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
