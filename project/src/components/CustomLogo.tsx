import React from 'react';
import logo from '../assets/logo/Wevolv3.png';

interface CustomLogoProps {
  className?: string;
  size?: number;
}

export default function CustomLogo({ className = '', size = 40 }: CustomLogoProps) {
  return (
    <img 
      src={logo}
      alt="Wevolv3 Logo"
      className={`h-auto ${className}`}
      style={{ width: size }}
    />
  );
} 