import React from 'react';
import { 
  LayoutDashboard, 
  CalendarClock, 
  Edit3, 
  BrainCircuit, 
  BarChart3, 
  Layers,
  Globe,
  Sliders,
  HeartHandshake,
  Crown,
  Bot
} from 'lucide-react';

export const TABS = [
  { id: 'dashboard', label: 'Prontuário', icon: LayoutDashboard },
  { id: 'routine', label: 'Planejado vs Real', icon: CalendarClock },
  { id: 'logger', label: 'Registro Diário', icon: Edit3 },
  { id: 'swot', label: 'Matriz SWOT', icon: BrainCircuit },
  { id: 'analytics', label: 'Heatmaps', icon: BarChart3 },
  { id: 'public_square', label: 'Praça & Manejo', icon: Globe },
  { id: 'protocols', label: 'Studio PRT', icon: Sliders },
  { id: 'health', label: 'Saúde do Terapeuta', icon: HeartHandshake },
  { id: 'scepter', label: 'Cetro & Governança', icon: Crown, adminOnly: true },
  { id: 'synthetic', label: 'Laboratório SD', icon: Bot, adminOnly: true },
  { id: 'database', label: 'Base Mestra (21)', icon: Layers }
];

export default function Navigation({ activeTab, onSelectTab, currentUser }) {
  const isAdmin = currentUser?.role === 'admin' || currentUser?.role === 'admin_master';

  const visibleTabs = TABS.filter(tab => !tab.adminOnly || isAdmin);

  return (
    <nav className="app-nav">
      <div className="nav-inner">
        {visibleTabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => onSelectTab(tab.id)}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
              {tab.id === 'scepter' && currentUser?.hasScepter && (
                <span style={{ fontSize: '0.7rem' }}>👑</span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
