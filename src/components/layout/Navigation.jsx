import React from 'react';
import { 
  LayoutDashboard, 
  CalendarClock, 
  Edit3, 
  BrainCircuit, 
  BarChart3, 
  Layers 
} from 'lucide-react';

export const TABS = [
  { id: 'dashboard', label: 'Dashboard Clínico', icon: LayoutDashboard },
  { id: 'routine', label: 'Planejado vs Executado', icon: CalendarClock },
  { id: 'logger', label: 'Registro Diário', icon: Edit3 },
  { id: 'swot', label: 'Análise SWOT (IA)', icon: BrainCircuit },
  { id: 'analytics', label: 'Heatmaps & Tendências', icon: BarChart3 },
  { id: 'database', label: 'Base Mestra (21 Forms)', icon: Layers }
];

export default function Navigation({ activeTab, onSelectTab }) {
  return (
    <nav className="app-nav">
      <div className="nav-inner">
        {TABS.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => onSelectTab(tab.id)}
            >
              <Icon size={18} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
