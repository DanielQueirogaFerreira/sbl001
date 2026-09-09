import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

/**
 * Ergonomic Password Input with Visibility Toggle
 * Mobile-first, accessible, and touch-friendly (>=44px touch target)
 */
export default function PasswordInput({
  id,
  name,
  value,
  onChange,
  placeholder = 'Digite sua senha...',
  required = false,
  autoComplete = 'current-password',
  minLength,
  disabled = false,
  className = 'form-input',
  style = {},
  autoFocus = false
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        width: '100%'
      }}
    >
      <input
        id={id}
        name={name}
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        minLength={minLength}
        disabled={disabled}
        autoFocus={autoFocus}
        className={className}
        style={{
          width: '100%',
          paddingRight: '2.75rem', // Space for the eye toggle button
          minHeight: '44px',
          ...style
        }}
      />
      <button
        type="button"
        tabIndex={0}
        onClick={() => setShowPassword(prev => !prev)}
        disabled={disabled}
        aria-label={showPassword ? 'Ocultar senha' : 'Revelar senha'}
        title={showPassword ? 'Ocultar senha' : 'Revelar senha'}
        style={{
          position: 'absolute',
          right: '4px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'transparent',
          border: 'none',
          color: showPassword ? '#38bdf8' : 'var(--text-muted)',
          cursor: 'pointer',
          padding: '8px 10px',
          minWidth: '44px',
          minHeight: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 'var(--radius-sm)',
          transition: 'color 0.15s ease, background-color 0.15s ease'
        }}
        onMouseEnter={e => {
          e.currentTarget.style.color = 'var(--text-primary)';
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.color = showPassword ? '#38bdf8' : 'var(--text-muted)';
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}
