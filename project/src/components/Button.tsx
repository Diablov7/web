import React from 'react';
import { ShimmerButton } from './ui/shimmer-button';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export default function Button({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick,
  style,
  type = 'button',
  disabled = false
}: ButtonProps) {
  const shimmerColor = variant === 'primary' 
    ? 'rgba(0, 209, 196, 0.2)' 
    : 'rgba(255, 255, 255, 0.1)';

  const background = variant === 'primary'
    ? 'linear-gradient(145deg, rgba(0, 209, 196, 0.3), rgba(160, 32, 240, 0.1))'
    : 'linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))';

  return (
    <ShimmerButton
      className={`font-mono text-base sm:text-lg ${className}`}
      shimmerColor={shimmerColor}
      background={style?.background || background}
      onClick={onClick}
      type={type}
      disabled={disabled}
      style={{
        ...style,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2), 0 8px 24px rgba(0, 0, 0, 0.4), 0 0 12px rgba(0, 209, 196, 0.1)',
        border: '1px solid rgba(0, 209, 196, 0.2)',
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      {children}
    </ShimmerButton>
  );
}