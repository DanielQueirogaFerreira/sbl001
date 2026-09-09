import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Navigation from './components/layout/Navigation';
import FilterToolbar from './components/common/FilterToolbar';
import OverviewDashboard from './components/dashboard/OverviewDashboard';
import RoutineManager from './components/routine/RoutineManager';
import DailyShiftLogger from './components/logging/DailyShiftLogger';
import SwotAnalysisView from './components/swot/SwotAnalysisView';
import HeatmapAndCharts from './components/analytics/HeatmapAndCharts';
import MasterFormsViewer from './components/database/MasterFormsViewer';
import AiConversationalModal from './components/modals/AiConversationalModal';

// New Architecture Components
import LoginModal from './components/auth/LoginModal';
import ForceSetupModal from './components/auth/ForceSetupModal';
import UserProfileModal from './components/auth/UserProfileModal';
import PatientTransferModal from './components/management/PatientTransferModal';
import PublicSquareView from './components/management/PublicSquareView';
import ProtocolStudioView from './components/protocols/ProtocolStudioView';
import ProfessionalHealthView from './components/health/ProfessionalHealthView';
import ScepterControlPanel from './components/admin/ScepterControlPanel';
import SyntheticDataLab from './components/admin/SyntheticDataLab';
import VersionBadge from './components/common/VersionBadge';
import MobileBottomNav from './components/layout/MobileBottomNav';

// Invite System Components
import CreateInviteModal from './components/invites/CreateInviteModal';
import RedeemInviteModal from './components/invites/RedeemInviteModal';
import InvitesManagerView from './components/invites/InvitesManagerView';

import { 
  getAllPatients, 
  getPatientById, 
  getPatientLogs, 
  addPatientLog, 
  updateWeeklyRoutine, 
  resetToMasterBaseline 
} from './data/patientRepository';
import { getCurrentSession, setCurrentSession } from './services/authRepository';

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => getCurrentSession());
  const isAdmin = currentUser?.role === 'admin' || currentUser?.role === 'admin_master';

  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState('amanda');
  const [activeTab, setActiveTab] = useState(() => {
    const session = getCurrentSession();
    const isAdm = session?.role === 'admin' || session?.role === 'admin_master';
    return isAdm ? 'scepter' : 'dashboard';
  });
  const [timeframe, setTimeframe] = useState('all');
  const [dataSourceFilter, setDataSourceFilter] = useState('all'); // 'all' | 'RD' | 'SD'

  // Modals state
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [isCreateInviteOpen, setIsCreateInviteOpen] = useState(false);
  const [createInviteType, setCreateInviteType] = useState(isAdmin ? 'professional' : 'patient');
  const [isRedeemInviteOpen, setIsRedeemInviteOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Initialize and refresh patients
  useEffect(() => {
    const loaded = getAllPatients();
    setPatients(loaded);
  }, [refreshKey]);

  // Keep session synced with current state
  useEffect(() => {
    const session = getCurrentSession();
    setCurrentUser(session);
  }, [refreshKey]);

  // Auto-switch tabs if switching between Admin and Professional
  useEffect(() => {
    const isAdm = currentUser?.role === 'admin' || currentUser?.role === 'admin_master';
    const clinicalTabs = ['dashboard', 'routine', 'logger', 'swot', 'analytics', 'health'];
    if (isAdm && clinicalTabs.includes(activeTab)) {
      setActiveTab('scepter');
    } else if (!isAdm && (activeTab === 'scepter' || activeTab === 'synthetic')) {
      setActiveTab('dashboard');
    }
  }, [currentUser]);

  // For Admins: No clinical patient pills in header or clinical dashboard
  // For Professionals: Only patients assigned to this professional (e.g. Dr. Plínio)
  const visiblePatients = isAdmin 
    ? [] 
    : patients.filter(p => p.assignedProfessionalId === currentUser?.id);

  // Keep selectedPatientId valid for the active professional
  useEffect(() => {
    if (!isAdmin && visiblePatients.length > 0) {
      if (!visiblePatients.some(p => p.id === selectedPatientId)) {
        setSelectedPatientId(visiblePatients[0].id);
      }
    }
  }, [visiblePatients, isAdmin, selectedPatientId]);

  const activePatient = !isAdmin 
    ? (visiblePatients.find(p => p.id === selectedPatientId) || visiblePatients[0] || null) 
    : null;

  const activeLogs = activePatient 
    ? getPatientLogs(activePatient.id, timeframe, false, dataSourceFilter)
    : [];
  const weeklyRoutines = activePatient?.weeklyPlanned || {};

  const handleSaveLog = (patientId, newLog) => {
    addPatientLog(patientId, newLog);
    setRefreshKey(prev => prev + 1);
  };

  const handleUpdateRoutine = (patientId, dayOfWeek, shiftData) => {
    updateWeeklyRoutine(patientId, dayOfWeek, shiftData);
    setRefreshKey(prev => prev + 1);
  };

  const handleResetBaseline = () => {
    resetToMasterBaseline();
    setRefreshKey(prev => prev + 1);
  };

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setRefreshKey(prev => prev + 1);
  };

  const handleUserSetupCompleted = (updatedUser) => {
    setCurrentUser(updatedUser);
    setCurrentSession(updatedUser);
    setRefreshKey(prev => prev + 1);
  };

  const handleOpenCreateInvite = (type) => {
    setCreateInviteType(type || (isAdmin ? 'professional' : 'patient'));
    setIsCreateInviteOpen(true);
  };

  return (
    <div className="app-container vertical-canvas">
      {/* Top Application Header */}
      <Header
        patients={visiblePatients}
        selectedPatientId={selectedPatientId}
        onSelectPatient={setSelectedPatientId}
        currentUser={currentUser}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onOpenTransfer={() => setIsTransferModalOpen(true)}
        onOpenNewLogModal={() => setActiveTab('logger')}
        onOpenAiDumpModal={() => setIsAiModalOpen(true)}
        onOpenCreateInvite={handleOpenCreateInvite}
        onOpenRedeemInvite={() => setIsRedeemInviteOpen(true)}
      />

      {/* Main Tab Navigation */}
      <Navigation
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        currentUser={currentUser}
      />

      {/* Main Content Area */}
      <main className="main-content">
        {/* Global Filter Bar (visible for analytics, swot and dashboard tabs when a patient is active) */}
        {!isAdmin && activePatient && (activeTab === 'dashboard' || activeTab === 'swot' || activeTab === 'analytics') && (
          <FilterToolbar
            timeframe={timeframe}
            onSelectTimeframe={setTimeframe}
            dataSourceFilter={dataSourceFilter}
            onSelectDataSource={setDataSourceFilter}
            totalLogs={activeLogs.length}
            patientName={activePatient?.name}
          />
        )}

        {/* Tab Views */}
        {activeTab === 'dashboard' && !isAdmin && activePatient && (
          <OverviewDashboard
            patient={activePatient}
            logs={activeLogs}
            weeklyRoutines={weeklyRoutines}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'routine' && !isAdmin && activePatient && (
          <RoutineManager
            patient={activePatient}
            weeklyRoutines={weeklyRoutines}
            logs={activeLogs}
            onUpdateRoutine={handleUpdateRoutine}
          />
        )}

        {activeTab === 'logger' && !isAdmin && activePatient && (
          <DailyShiftLogger
            patient={activePatient}
            weeklyRoutines={weeklyRoutines}
            onSaveLog={handleSaveLog}
            onOpenAiDumpModal={() => setIsAiModalOpen(true)}
          />
        )}

        {activeTab === 'swot' && !isAdmin && activePatient && (
          <SwotAnalysisView
            patient={activePatient}
            logs={activeLogs}
            weeklyRoutines={weeklyRoutines}
            timeframe={timeframe}
            onSelectTimeframe={setTimeframe}
          />
        )}

        {activeTab === 'analytics' && !isAdmin && activePatient && (
          <HeatmapAndCharts
            patient={activePatient}
            logs={activeLogs}
          />
        )}

        {activeTab === 'invites' && (
          <InvitesManagerView
            currentUser={currentUser}
            onOpenCreateInvite={() => handleOpenCreateInvite(isAdmin ? 'professional' : 'patient')}
          />
        )}

        {activeTab === 'public_square' && (
          <PublicSquareView
            currentProfessional={currentUser}
            onRefresh={() => setRefreshKey(prev => prev + 1)}
          />
        )}

        {activeTab === 'protocols' && (
          <ProtocolStudioView
            currentUser={currentUser}
            onRefresh={() => setRefreshKey(prev => prev + 1)}
          />
        )}

        {activeTab === 'health' && !isAdmin && (
          <ProfessionalHealthView
            currentProfessional={currentUser}
            onRefresh={() => setRefreshKey(prev => prev + 1)}
          />
        )}

        {activeTab === 'scepter' && isAdmin && (
          <ScepterControlPanel
            currentUser={currentUser}
            onRefresh={() => setRefreshKey(prev => prev + 1)}
          />
        )}

        {activeTab === 'synthetic' && isAdmin && (
          <SyntheticDataLab
            onRefresh={() => setRefreshKey(prev => prev + 1)}
          />
        )}

        {activeTab === 'database' && (
          <MasterFormsViewer
            onResetBaseline={handleResetBaseline}
          />
        )}
      </main>

      {/* Force Setup Modal (For Plínio without email or first login password change) */}
      {currentUser && (currentUser.mustProvideEmail || currentUser.mustChangePassword) && (
        <ForceSetupModal
          user={currentUser}
          onComplete={handleUserSetupCompleted}
        />
      )}

      {/* Login & Switch Account Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        onOpenRedeemInvite={() => {
          setIsLoginModalOpen(false);
          setIsRedeemInviteOpen(true);
        }}
      />

      {/* User Profile Modal */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        user={currentUser}
        onUserUpdated={handleUserSetupCompleted}
        onSwitchAccount={() => {
          setIsProfileModalOpen(false);
          setIsLoginModalOpen(true);
        }}
      />

      {/* Patient Transfer Modal */}
      {activePatient && (
        <PatientTransferModal
          isOpen={isTransferModalOpen}
          onClose={() => setIsTransferModalOpen(false)}
          patient={activePatient}
          currentProfessional={currentUser}
          onTransferInitiated={() => setRefreshKey(prev => prev + 1)}
        />
      )}

      {/* Conversational Fast Dump Modal */}
      {activePatient && (
        <AiConversationalModal
          isOpen={isAiModalOpen}
          onClose={() => setIsAiModalOpen(false)}
          patient={activePatient}
          onSaveParsedLog={handleSaveLog}
        />
      )}

      {/* Invite System Modals */}
      <CreateInviteModal
        isOpen={isCreateInviteOpen}
        onClose={() => setIsCreateInviteOpen(false)}
        issuer={currentUser}
        initialType={createInviteType}
        onInviteCreated={() => setRefreshKey(prev => prev + 1)}
      />

      <RedeemInviteModal
        isOpen={isRedeemInviteOpen}
        onClose={() => setIsRedeemInviteOpen(false)}
        onRedeemed={(res) => {
          setRefreshKey(prev => prev + 1);
          if (res.user) {
            setCurrentUser(res.user);
          }
        }}
      />

      {/* App Footer */}
      <footer style={{ borderTop: '1px solid var(--border-subtle)', padding: '1.25rem 1rem', textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
        <p>
          Laboratório da Sobriedade © 2026 • Prevenção de Recaída • Protocolo do Plínio (PRT001)
        </p>
      </footer>

      {/* Mobile-First Bottom Navigation Bar (Fixed 9:16 Thumb Navigation) */}
      <MobileBottomNav
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        currentUser={currentUser}
        onOpenNewLogModal={() => setActiveTab('logger')}
        onOpenAiDumpModal={() => setIsAiModalOpen(true)}
        onOpenTransferModal={() => setIsTransferModalOpen(true)}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        onOpenCreateInvite={handleOpenCreateInvite}
      />

      {/* Technical Version Badge with Text Scrim (Bottom Left) */}
      <VersionBadge />
    </div>
  );
}
