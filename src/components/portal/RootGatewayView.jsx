import React from 'react';
import { 
  Activity, 
  Key, 
  ShieldCheck, 
  Stethoscope, 
  User, 
  Crown, 
  ArrowRight, 
  Sparkles, 
  Lock, 
  Layers, 
  CheckCircle2,
  LogIn,
  UserPlus
} from 'lucide-react';

export default function RootGatewayView({ 
  onSelectRoleLogin, 
  onOpenRedeemInvite, 
  onQuickLogin 
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', padding: '0.5rem 0' }}>
      {/* Hero Welcome Card */}
      <div 
        className="glass-card" 
        style={{ 
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(6, 182, 212, 0.12))',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          textAlign: 'center',
          padding: '1.75rem 1.25rem'
        }}
      >
        <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(6, 182, 212, 0.15)', border: '1px solid rgba(6, 182, 212, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.85rem auto', color: 'var(--color-brand)' }}>
          <Activity size={30} />
        </div>
        <h2 style={{ fontSize: '1.45rem', margin: 0, color: '#fff', letterSpacing: '-0.02em' }}>
          Laboratório da Sobriedade
        </h2>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.35rem', lineHeight: 1.4 }}>
          Prevenção de Recaída • Protocolo do Plínio (PRT001)
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.4rem', marginTop: '0.65rem' }}>
          <span className="badge badge-brand">Root Gateway</span>
          <span className="badge badge-prazer">Onboarding Oficial</span>
        </div>
      </div>

      {/* Authority Chain & Sequence Card */}
      <div 
        className="glass-card"
        style={{
          background: 'rgba(15, 23, 42, 0.75)',
          border: '1px solid var(--border-subtle)',
          padding: '1.25rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <ShieldCheck size={18} color="#38bdf8" />
          <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#fff' }}>
            Sequência Oficial de Cadastro por Convite
          </h4>
        </div>
        <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
          Todo acesso no sistema é condicionado a um código gerado na cadeia de autoridade com PIN de 4 dígitos:
        </p>

        {/* Visual Hierarchy Diagram */}
        <div 
          style={{ 
            background: 'rgba(5, 8, 15, 0.85)', 
            border: '1px solid rgba(255,255,255,0.06)', 
            borderRadius: 'var(--radius-md)', 
            padding: '1rem', 
            marginTop: '0.85rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
            lineHeight: 1.6,
            color: '#94a3b8'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#f59e0b', fontWeight: 600 }}>
            <span>👑 Administrador Master</span>
          </div>
          <div style={{ paddingLeft: '1.25rem', borderLeft: '1px solid rgba(255,255,255,0.12)', marginLeft: '0.5rem', margin: '0.2rem 0 0.2rem 0.6rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#38bdf8' }}>
              <span>├──► 🛡️ Novo Administrador</span>
              <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>(ADM-XXXX + PIN)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#34d399', marginTop: '0.2rem' }}>
              <span>└──► 🩺 Profissional de Saúde</span>
              <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>(PRF-XXXX + PIN)</span>
            </div>
            <div style={{ paddingLeft: '1.5rem', borderLeft: '1px solid rgba(255,255,255,0.12)', marginLeft: '0.5rem', marginTop: '0.2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#a78bfa' }}>
                <span>└──► 👤 Paciente Vinculado</span>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>(PAC-XXXX + PIN)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prominent Universal Redeem Button */}
      <button
        type="button"
        className="btn btn-primary"
        onClick={onOpenRedeemInvite}
        style={{
          width: '100%',
          minHeight: '52px',
          padding: '0.85rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.65rem',
          fontSize: '0.95rem',
          fontWeight: 700,
          background: 'linear-gradient(135deg, #0284c7, #0d9488)',
          boxShadow: '0 8px 24px rgba(2, 132, 199, 0.35)'
        }}
      >
        <Key size={18} />
        <span>Resgatar Código de Convite Oficial (PIN 4 Dígitos)</span>
      </button>

      {/* Segmented Entry Portals (Pacientes, Profissionais, Administradores) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        <h4 style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0.25rem 0' }}>
          Portais de Acesso Segmentado
        </h4>

        {/* Portal 1: Paciente */}
        <div 
          className="shift-box"
          style={{
            padding: '1.15rem',
            background: 'rgba(168, 85, 247, 0.05)',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(168, 85, 247, 0.15)', color: '#c084fc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User size={22} />
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: 0, fontSize: '1.05rem', color: '#fff' }}>Área do Paciente</h4>
              <p style={{ margin: '0.15rem 0 0 0', fontSize: '0.76rem', color: 'var(--text-secondary)', lineHeight: 1.35 }}>
                Rotina diária, check-ins de turno, âncoras e tutela terapêutica.
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.2rem' }}>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => onSelectRoleLogin('patient')}
              style={{ justifyContent: 'center', padding: '0.55rem', fontSize: '0.78rem' }}
            >
              <LogIn size={13} /> Entrar
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={onOpenRedeemInvite}
              style={{ justifyContent: 'center', padding: '0.55rem', fontSize: '0.78rem', color: '#c084fc', borderColor: 'rgba(168, 85, 247, 0.4)' }}
            >
              <Key size={13} /> Resgatar Convite
            </button>
          </div>
        </div>

        {/* Portal 2: Profissional de Saúde */}
        <div 
          className="shift-box"
          style={{
            padding: '1.15rem',
            background: 'rgba(16, 185, 129, 0.05)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--color-prazer-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Stethoscope size={22} />
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: 0, fontSize: '1.05rem', color: '#fff' }}>Área do Profissional</h4>
              <p style={{ margin: '0.15rem 0 0 0', fontSize: '0.76rem', color: 'var(--text-secondary)', lineHeight: 1.35 }}>
                Prontuários clínicos, tutelas de pacientes, Studio PRT001 e manejo.
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.2rem' }}>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => onSelectRoleLogin('professional')}
              style={{ justifyContent: 'center', padding: '0.55rem', fontSize: '0.78rem' }}
            >
              <LogIn size={13} /> Entrar
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={onOpenRedeemInvite}
              style={{ justifyContent: 'center', padding: '0.55rem', fontSize: '0.78rem', color: 'var(--color-prazer-light)', borderColor: 'rgba(16, 185, 129, 0.4)' }}
            >
              <Key size={13} /> Ativar Convite
            </button>
          </div>
        </div>

        {/* Portal 3: Administrador */}
        <div 
          className="shift-box"
          style={{
            padding: '1.15rem',
            background: 'rgba(245, 158, 11, 0.05)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Crown size={22} />
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: 0, fontSize: '1.05rem', color: '#fff' }}>Área do Administrador</h4>
              <p style={{ margin: '0.15rem 0 0 0', fontSize: '0.76rem', color: 'var(--text-secondary)', lineHeight: 1.35 }}>
                Governança institucional, Cetro, auditoria e emissão de convites.
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.2rem' }}>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => onSelectRoleLogin('admin')}
              style={{ justifyContent: 'center', padding: '0.55rem', fontSize: '0.78rem' }}
            >
              <LogIn size={13} /> Entrar
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={onOpenRedeemInvite}
              style={{ justifyContent: 'center', padding: '0.55rem', fontSize: '0.78rem', color: '#fbbf24', borderColor: 'rgba(245, 158, 11, 0.4)' }}
            >
              <Key size={13} /> Ativar Convite
            </button>
          </div>
        </div>
      </div>

      {/* Quick Access Switcher for Testing/Demonstration */}
      <div 
        className="glass-card" 
        style={{ 
          marginTop: '0.5rem', 
          padding: '1rem',
          background: 'rgba(15, 23, 42, 0.65)'
        }}
      >
        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.65rem' }}>
          <Sparkles size={13} color="#38bdf8" /> Acesso Rápido de Demonstração (1 Clique):
        </span>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => onQuickLogin('DAN00001')}
            title="Entrar como Daniel Queiroga (Admin Master)"
            style={{ fontSize: '0.72rem', padding: '0.45rem', justifyContent: 'center' }}
          >
            <span>👑 Daniel</span>
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => onQuickLogin('PLN00001')}
            title="Entrar como Dr. Plínio (Profissional)"
            style={{ fontSize: '0.72rem', padding: '0.45rem', justifyContent: 'center' }}
          >
            <span>👨‍⚕️ Dr. Plínio</span>
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => onQuickLogin('amanda')}
            title="Entrar como Amanda (Paciente)"
            style={{ fontSize: '0.72rem', padding: '0.45rem', justifyContent: 'center' }}
          >
            <span>👩‍⚕️ Amanda</span>
          </button>
        </div>
      </div>
    </div>
  );
}
