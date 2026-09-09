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
  Bot,
  UserPlus
} from 'lucide-react';

export const ALL_TABS = [
  // Clinical / Professional Tabs
  { id: 'dashboard', label: 'Prontuário', icon: LayoutDashboard, professionalOnly: true },
  { id: 'routine', label: 'Planejado vs Real', icon: CalendarClock, professionalOnly: true },
  { id: 'logger', label: 'Registro Diário', icon: Edit3, professionalOnly: true },
  { id: 'swot', label: 'Matriz SWOT', icon: BrainCircuit, professionalOnly: true },
  { id: 'analytics', label: 'Heatmaps', icon: BarChart3, professionalOnly: true },
  { id: 'health', label: 'Saúde do Terapeuta', icon: HeartHandshake, professionalOnly: true },

  // Shared & Administrative Tabs
  { id: 'invites', label: 'Central de Convites', icon: UserPlus },
  { id: 'scepter', label: 'Cetro & Governança', icon: Crown, adminOnly: true },
  { id: 'public_square', label: 'Praça & Manejo', icon: Globe },
  { id: 'protocols', label: 'Studio PRT', icon: Sliders },
  { id: 'synthetic', label: 'Laboratório SD', icon: Bot, adminOnly: true },
  { id: 'database', label: 'Base Mestra (21)', icon: Layers }
];

export default function Navigation({ activeTab, onSelectTab, currentUser }) {
  const isAdmin = currentUser?.role === 'admin' || currentUser?.role === 'admin_master';

  const visibleTabs = ALL_TABS.filter(tab => {
    if (tab.adminOnly && !isAdmin) return false;
    if (tab.professionalOnly && isAdmin) return false;
    return true;
  });

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
