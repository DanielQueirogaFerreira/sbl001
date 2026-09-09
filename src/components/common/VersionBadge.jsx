import React, { useState } from 'react';
import { BUILD_INFO } from '../../version';

export default function VersionBadge() {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleCopyMetadata = () => {
    const meta = {
      ...BUILD_INFO,
      clientLoadedAt: new Date().toISOString(),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
      url: typeof window !== 'undefined' ? window.location.href : ''
    };
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(JSON.stringify(meta, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <div
      onClick={handleCopyMetadata}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title="Selo Técnico de Versionamento — Clique para copiar metadados completos"
      style={{
        position: 'fixed',
        bottom: '6px',
        left: '8px',
        zIndex: 9999,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        padding: '2px 7px',
        background: isHovered 
          ? 'rgba(9, 13, 22, 0.92)' 
          : 'rgba(9, 13, 22, 0.65)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        border: isHovered 
          ? '1px solid rgba(56, 189, 248, 0.35)' 
          : '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '4px',
        fontFamily: 'var(--font-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
        fontSize: '0.62rem',
        color: isHovered ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0.38)',
        lineHeight: 1.2,
        letterSpacing: '0.02em',
        cursor: 'pointer',
        userSelect: 'none',
        transition: 'all 0.2s ease',
        boxShadow: isHovered ? '0 2px 8px rgba(0,0,0,0.5)' : 'none'
      }}
    >
      {/* Discreet Live Dot */}
      <span
        style={{
          width: '4px',
          height: '4px',
          borderRadius: '50%',
          backgroundColor: '#10b981',
          display: 'inline-block',
          boxShadow: '0 0 4px #10b981',
          opacity: isHovered ? 1 : 0.7
        }}
      />

      <span>
        v{BUILD_INFO.version} • UTC: <strong style={{ fontWeight: 600, color: isHovered ? '#38bdf8' : 'rgba(255,255,255,0.55)' }}>{BUILD_INFO.timestampUTC}</strong> • {BUILD_INFO.commitHash}
      </span>

      {copied && (
        <span
          style={{
            marginLeft: '4px',
            color: '#34d399',
            fontWeight: 600
          }}
        >
          ✓ Copiado
        </span>
      )}
    </div>
  );
}
