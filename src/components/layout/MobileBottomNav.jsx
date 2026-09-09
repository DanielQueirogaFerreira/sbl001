import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  CalendarClock, 
  PlusCircle, 
  BrainCircuit, 
  Menu, 
  X,
  BarChart3,
  Globe,
  Sliders,
  HeartHandshake,
  Crown,
  Bot,
  Layers,
  User,
  Sparkles,
  ArrowRightLeft,
  LogIn
} from 'lucide-react';

export default function MobileBottomNav({
  activeTab,
  onSelectTab,
  currentUser,
  onOpenNewLogModal,
  onOpenAiDumpModal,
  onOpenTransferModal,
  onOpenProfileModal,
  onOpenLoginModal
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAdmin = currentUser?.role === 'admin' || currentUser?.role === 'admin_master';

  const handleTabClick = (tabId) => {
    onSelectTab(tabId);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Fixed Mobile Bottom Tab Bar */}
      <nav
        className="mobile-bottom-nav"
        aria-label="Navegação móvel inferior"
      >
        <button
          className={`mobile-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => handleTabClick('dashboard')}
          aria-label="Prontuário"
        >
          <LayoutDashboard size={20} />
          <span>Prontuário</span>
        </button>

        <button
          className={`mobile-nav-item ${activeTab === 'routine' ? 'active' : ''}`}
          onClick={() => handleTabClick('routine')}
          aria-label="Rotina"
        >
          <CalendarClock size={20} />
          <span>Rotina</span>
        </button>

        {/* Prominent Center Action: Novo Registro */}
        <button
          className="mobile-nav-item center-action"
          onClick={() => {
            onSelectTab('logger');
            onOpenNewLogModal();
          }}
          aria-label="Novo Registro de Turno"
          title="Novo Registro Clínico"
        >
          <div className="center-action-btn">
            <PlusCircle size={24} />
          </div>
          <span style={{ color: 'var(--color-prazer-light)', fontWeight: 600 }}>+ Turno</span>
        </button>

        <button
          className={`mobile-nav-item ${activeTab === 'swot' ? 'active' : ''}`}
          onClick={() => handleTabClick('swot')}
          aria-label="SWOT"
        >
          <BrainCircuit size={20} />
          <span>SWOT</span>
        </button>

        <button
          className={`mobile-nav-item ${isMenuOpen || !['dashboard', 'routine', 'logger', 'swot'].includes(activeTab) ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(prev => !prev)}
          aria-label="Mais Opções e Módulos"
        >
          <Menu size={20} />
          <span>Menu</span>
          {currentUser?.hasScepter && (
            <span style={{ position: 'absolute', top: '4px', right: '12px', fontSize: '0.65rem' }}>👑</span>
          )}
        </button>
      </nav>

      {/* Bottom Sheet Menu Drawer */}
      {isMenuOpen && (
        <div
          className="mobile-drawer-overlay"
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className="mobile-drawer-content"
            onClick={e => e.stopPropagation()}
          >
            {/* Drawer Handle */}
            <div className="mobile-drawer-handle" />

            <div className="mobile-drawer-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div className="card-icon-badge" style={{ width: '32px', height: '32px' }}>
                  <Menu size={16} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', color: '#fff' }}>Menu de Módulos Clínicos</h4>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    Acesso rápido a todos os ambientes e governança
                  </span>
                </div>
              </div>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setIsMenuOpen(false)}
                style={{ padding: '6px' }}
                aria-label="Fechar Menu"
              >
                <X size={16} />
              </button>
            </div>

            {/* Quick Action Shortcuts */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <button
                className="btn btn-ai btn-sm"
                onClick={() => {
                  setIsMenuOpen(false);
                  onOpenAiDumpModal();
                }}
                style={{ flexDirection: 'column', gap: '4px', padding: '0.6rem 0.25rem', fontSize: '0.72rem' }}
              >
                <Sparkles size={16} />
                <span>Dump IA</span>
              </button>

              <button
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  setIsMenuOpen(false);
                  onOpenTransferModal();
                }}
                style={{ flexDirection: 'column', gap: '4px', padding: '0.6rem 0.25rem', fontSize: '0.72rem' }}
              >
                <ArrowRightLeft size={16} />
                <span>Transferir</span>
              </button>

              {currentUser ? (
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onOpenProfileModal();
                  }}
                  style={{ 
                    flexDirection: 'column', 
                    gap: '4px', 
                    padding: '0.6rem 0.25rem', 
                    fontSize: '0.72rem',
                    background: currentUser.hasScepter ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255,255,255,0.06)'
                  }}
                >
                  <User size={16} color={currentUser.hasScepter ? '#fbbf24' : 'inherit'} />
                  <span>Perfil</span>
                </button>
              ) : (
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onOpenLoginModal();
                  }}
                  style={{ flexDirection: 'column', gap: '4px', padding: '0.6rem 0.25rem', fontSize: '0.72rem' }}
                >
                  <LogIn size={16} />
                  <span>Entrar</span>
                </button>
              )}
            </div>

            {/* Clinical & Administrative Modules List */}
            <div className="drawer-menu-list">
              <button
                className={`drawer-menu-item ${activeTab === 'analytics' ? 'active' : ''}`}
                onClick={() => handleTabClick('analytics')}
              >
                <BarChart3 size={18} color="#38bdf8" />
                <div className="drawer-menu-text">
                  <strong>Heatmaps & Análise Multivariada</strong>
                  <span>Mapas de calor de intensidade, prazer e dever</span>
                </div>
              </button>

              <button
                className={`drawer-menu-item ${activeTab === 'public_square' ? 'active' : ''}`}
                onClick={() => handleTabClick('public_square')}
              >
                <Globe size={18} color="#34d399" />
                <div className="drawer-menu-text">
                  <strong>Praça Pública & Manejo de Pacientes</strong>
                  <span>Acolhimento livre e resgate com PIN de 4 dígitos</span>
                </div>
              </button>

              <button
                className={`drawer-menu-item ${activeTab === 'protocols' ? 'active' : ''}`}
                onClick={() => handleTabClick('protocols')}
              >
                <Sliders size={18} color="#c084fc" />
                <div className="drawer-menu-text">
                  <strong>Studio PRT — Protocolo do Plínio</strong>
                  <span>Parâmetros clínicos PRT001 e metas terapêuticas</span>
                </div>
              </button>

              <button
                className={`drawer-menu-item ${activeTab === 'health' ? 'active' : ''}`}
                onClick={() => handleTabClick('health')}
              >
                <HeartHandshake size={18} color="#fb7171" />
                <div className="drawer-menu-text">
                  <strong>Saúde do Terapeuta & Check-in</strong>
                  <span>Monitoramento de burnout, sono e vigor clínico</span>
                </div>
              </button>

              {isAdmin && (
                <button
                  className={`drawer-menu-item ${activeTab === 'scepter' ? 'active' : ''}`}
                  onClick={() => handleTabClick('scepter')}
                  style={{ background: 'rgba(245, 158, 11, 0.08)', borderColor: 'rgba(245, 158, 11, 0.25)' }}
                >
                  <Crown size={18} color="#f59e0b" />
                  <div className="drawer-menu-text">
                    <strong style={{ color: '#fbbf24' }}>Cetro & Governança Master</strong>
                    <span>Justa transmitida, praça do cetro e livro de atas</span>
                  </div>
                </button>
              )}

              {isAdmin && (
                <button
                  className={`drawer-menu-item ${activeTab === 'synthetic' ? 'active' : ''}`}
                  onClick={() => handleTabClick('synthetic')}
                >
                  <Bot size={18} color="#a855f7" />
                  <div className="drawer-menu-text">
                    <strong>Laboratório SD (Dados Sintéticos)</strong>
                    <span>Injeção de prontuários simulados para treino</span>
                  </div>
                </button>
              )}

              <button
                className={`drawer-menu-item ${activeTab === 'database' ? 'active' : ''}`}
                onClick={() => handleTabClick('database')}
              >
                <Layers size={18} color="#94a3b8" />
                <div className="drawer-menu-text">
                  <strong>Base Mestra (21 Formulários)</strong>
                  <span>Prontuários estruturados e reset para baseline</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
