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

import { 
  getAllPatients, 
  getPatientById, 
  getPatientLogs, 
  addPatientLog, 
  updateWeeklyRoutine, 
  resetToMasterBaseline 
} from './data/patientRepository';

export default function App() {
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState('amanda');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [timeframe, setTimeframe] = useState('all');
  const [isSyntheticMode, setIsSyntheticMode] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Initialize patients
  useEffect(() => {
    const loaded = getAllPatients();
    setPatients(loaded);
  }, [refreshKey]);

  const activePatient = getPatientById(selectedPatientId) || patients[0];
  const activeLogs = activePatient 
    ? getPatientLogs(selectedPatientId, timeframe, isSyntheticMode)
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

  return (
    <div className="app-container">
      {/* Top Application Header */}
      <Header
        patients={patients}
        selectedPatientId={selectedPatientId}
        onSelectPatient={setSelectedPatientId}
        timeframe={timeframe}
        onSelectTimeframe={setTimeframe}
        isSyntheticMode={isSyntheticMode}
        onToggleSynthetic={() => setIsSyntheticMode(!isSyntheticMode)}
        onOpenNewLogModal={() => setActiveTab('logger')}
        onOpenAiDumpModal={() => setIsAiModalOpen(true)}
      />

      {/* Main Tab Navigation */}
      <Navigation
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />

      {/* Main Content Area */}
      <main className="main-content">
        {/* Global Filter Bar (visible for analytics and dashboard tabs) */}
        {(activeTab === 'dashboard' || activeTab === 'swot' || activeTab === 'analytics') && (
          <FilterToolbar
            timeframe={timeframe}
            onSelectTimeframe={setTimeframe}
            isSyntheticMode={isSyntheticMode}
            onToggleSynthetic={() => setIsSyntheticMode(!isSyntheticMode)}
            totalLogs={activeLogs.length}
            patientName={activePatient?.name}
          />
        )}

        {/* Tab Views */}
        {activePatient && (
          <>
            {activeTab === 'dashboard' && (
              <OverviewDashboard
                patient={activePatient}
                logs={activeLogs}
                weeklyRoutines={weeklyRoutines}
                onNavigateTab={setActiveTab}
              />
            )}

            {activeTab === 'routine' && (
              <RoutineManager
                patient={activePatient}
                weeklyRoutines={weeklyRoutines}
                logs={activeLogs}
                onUpdateRoutine={handleUpdateRoutine}
              />
            )}

            {activeTab === 'logger' && (
              <DailyShiftLogger
                patient={activePatient}
                weeklyRoutines={weeklyRoutines}
                onSaveLog={handleSaveLog}
                onOpenAiDumpModal={() => setIsAiModalOpen(true)}
              />
            )}

            {activeTab === 'swot' && (
              <SwotAnalysisView
                patient={activePatient}
                logs={activeLogs}
                weeklyRoutines={weeklyRoutines}
                timeframe={timeframe}
                onSelectTimeframe={setTimeframe}
              />
            )}

            {activeTab === 'analytics' && (
              <HeatmapAndCharts
                patient={activePatient}
                logs={activeLogs}
              />
            )}

            {activeTab === 'database' && (
              <MasterFormsViewer
                onResetBaseline={handleResetBaseline}
              />
            )}
          </>
        )}
      </main>

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
          Laboratório da Sobriedade © 2026 • Pesquisa e Desenvolvimento em Prevenção de Recaída • Ingestão Consolidada de 21 Formulários Google Forms
        </p>
      </footer>
    </div>
  );
}
