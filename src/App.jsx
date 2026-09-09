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
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState('amanda');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [timeframe, setTimeframe] = useState('all');
  const [dataSourceFilter, setDataSourceFilter] = useState('all'); // 'all' | 'RD' | 'SD'

  // User session state
  const [currentUser, setCurrentUser] = useState(() => getCurrentSession());

  // Modals state
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
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

  const activePatient = getPatientById(selectedPatientId) || patients[0];
  const activeLogs = activePatient 
    ? getPatientLogs(selectedPatientId, timeframe, false, dataSourceFilter)
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

  return (
    <div className="app-container">
      {/* Top Application Header */}
      <Header
        patients={patients}
        selectedPatientId={selectedPatientId}
        onSelectPatient={setSelectedPatientId}
        currentUser={currentUser}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onOpenTransfer={() => setIsTransferModalOpen(true)}
        onOpenNewLogModal={() => setActiveTab('logger')}
        onOpenAiDumpModal={() => setIsAiModalOpen(true)}
      />

      {/* Main Tab Navigation */}
      <Navigation
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        currentUser={currentUser}
      />

      {/* Main Content Area */}
      <main className="main-content">
        {/* Global Filter Bar (visible for analytics, swot and dashboard tabs) */}
        {(activeTab === 'dashboard' || activeTab === 'swot' || activeTab === 'analytics') && (
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
        {activeTab === 'dashboard' && activePatient && (
          <OverviewDashboard
            patient={activePatient}
            logs={activeLogs}
            weeklyRoutines={weeklyRoutines}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'routine' && activePatient && (
          <RoutineManager
            patient={activePatient}
            weeklyRoutines={weeklyRoutines}
            logs={activeLogs}
            onUpdateRoutine={handleUpdateRoutine}
          />
        )}

        {activeTab === 'logger' && activePatient && (
          <DailyShiftLogger
            patient={activePatient}
            weeklyRoutines={weeklyRoutines}
            onSaveLog={handleSaveLog}
            onOpenAiDumpModal={() => setIsAiModalOpen(true)}
          />
        )}

        {activeTab === 'swot' && activePatient && (
          <SwotAnalysisView
            patient={activePatient}
            logs={activeLogs}
            weeklyRoutines={weeklyRoutines}
            timeframe={timeframe}
            onSelectTimeframe={setTimeframe}
          />
        )}

        {activeTab === 'analytics' && activePatient && (
          <HeatmapAndCharts
            patient={activePatient}
            logs={activeLogs}
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

        {activeTab === 'health' && (
          <ProfessionalHealthView
            currentProfessional={currentUser}
            onRefresh={() => setRefreshKey(prev => prev + 1)}
          />
        )}

        {activeTab === 'scepter' && (
          <ScepterControlPanel
            currentUser={currentUser}
            onRefresh={() => setRefreshKey(prev => prev + 1)}
          />
        )}

        {activeTab === 'synthetic' && (
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

      {/* App Footer */}
      <footer style={{ borderTop: '1px solid var(--border-subtle)', padding: '1.25rem 2rem', textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
        <p>
          Laboratório da Sobriedade © 2026 • Pesquisa e Desenvolvimento em Prevenção de Recaída • Ingestão Consolidada de 21 Formulários Google Forms • Protocolo do Plínio (PRT001)
        </p>
      </footer>
    </div>
  );
}
