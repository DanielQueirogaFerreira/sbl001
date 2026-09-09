const assert = require('assert');

// Simple localStorage mock for Node environment
const store = {};
global.window = {
  localStorage: {
    getItem: (key) => store[key] || null,
    setItem: (key, val) => { store[key] = String(val); },
    removeItem: (key) => { delete store[key]; }
  }
};

async function testAll() {
  console.log('Testing Invite and Transfer Engines...');

  // Import compiled modules or test direct logic
  const authRepo = await import('../src/services/authRepository.js');
  const patientRepo = await import('../src/data/patientRepository.js');
  const transferEngine = await import('../src/services/transferEngine.js');
  const inviteEngine = await import('../src/services/inviteEngine.js');

  const admin = authRepo.getUserById('DAN00001');
  const plinio = authRepo.getUserById('PLN00001');

  assert(admin, 'Admin Daniel Queiroga must exist');
  assert(plinio, 'Dr. Plínio must exist');

  // Test 1: Admin invites Professional
  const invProf = inviteEngine.createInvite({
    type: 'professional',
    issuer: admin,
    targetName: 'Dra. Carolina Mendes',
    customPin: '1234'
  });
  assert(invProf.success, 'Invite creation should succeed');
  assert(invProf.invite.code.startsWith('PRF-'), 'Code should have PRF- prefix');
  assert.strictEqual(invProf.invite.pin, '1234', 'PIN should match');
  console.log('✓ Admin -> Professional invite created:', invProf.invite.code);

  // Test 2: Admin invites Admin
  const invAdm = inviteEngine.createInvite({
    type: 'admin',
    issuer: admin,
    targetName: 'Roberto Gestor'
  });
  assert(invAdm.success);
  assert(invAdm.invite.code.startsWith('ADM-'));
  console.log('✓ Admin -> Admin invite created:', invAdm.invite.code);

  // Test 3: Professional invites Patient
  const invPatient = inviteEngine.createInvite({
    type: 'patient',
    issuer: plinio,
    targetName: 'Carlos Eduardo',
    customPin: '5678'
  });
  assert(invPatient.success);
  assert(invPatient.invite.code.startsWith('PAC-'));
  console.log('✓ Professional -> Patient invite created:', invPatient.invite.code);

  // Test 4: Redeem Patient invite
  const redeemRes = inviteEngine.redeemInvite(invPatient.invite.code, '5678', {
    name: 'Carlos Eduardo',
    diagnosis: 'Transtorno por Uso de Álcool (Em Remissão)',
    keyAnchor: 'Reuniões NA e família'
  });
  assert(redeemRes.success, 'Patient redeem should succeed: ' + redeemRes.error);
  assert(redeemRes.patient, 'New patient object should be created');
  assert.strictEqual(redeemRes.patient.assignedProfessionalId, plinio.id);
  console.log('✓ Patient redeemed and assigned to Dr. Plínio:', redeemRes.patient.id);

  // Test 5: Patient Manejo - Secret Transfer with 4-digit PIN
  const secTrf = transferEngine.initiateSecretTransfer(redeemRes.patient.id, plinio.id, '4321');
  assert(secTrf.success);
  assert.strictEqual(secTrf.pin, '4321');
  console.log('✓ Secret transfer initiated with PIN:', secTrf.transferCode);

  // Test 6: Patient Manejo - Public Transfer with 4-digit PIN
  const pubTrf = transferEngine.releaseToPublicSquare(redeemRes.patient.id, plinio.id, '9999');
  assert(pubTrf.success);
  assert.strictEqual(pubTrf.pin, '9999');
  console.log('✓ Public square transfer released with PIN:', pubTrf.pin);

  // Test 7: Public Square claim requires PIN
  const wrongClaim = transferEngine.claimFromPublicSquare(redeemRes.patient.id, 'PRF99999', '1111');
  assert(!wrongClaim.success, 'Wrong PIN claim should fail');
  assert(wrongClaim.requiresPin, 'Should indicate requiresPin');
  console.log('✓ Wrong PIN properly rejected');

  // Test 8: Public Square claim with correct PIN
  const rightClaim = transferEngine.claimFromPublicSquare(redeemRes.patient.id, 'PRF99999', '9999');
  assert(rightClaim.success, 'Correct PIN claim should succeed: ' + rightClaim.error);
  assert.strictEqual(rightClaim.patient.assignedProfessionalId, 'PRF99999');
  console.log('✓ Patient claimed from public square with verified 4-digit PIN!');

  console.log('\nALL 8 TESTS PASSED SUCCESSFULLY! 🚀');
}

testAll().catch(e => {
  console.error('Test failed:', e);
  process.exit(1);
});
