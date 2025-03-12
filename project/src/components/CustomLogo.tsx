import React from 'react';

interface CustomLogoProps {
  className?: string;
  size?: number;
}

export default function CustomLogo({ className = '', size = 40 }: CustomLogoProps) {
  // Usando um elemento div estilizado em vez de uma imagem
  return (
    <div 
      className={`flex items-center justify-center rounded-full bg-gradient-to-r from-[#00FFE1] to-[#7000FF] ${className}`}
      style={{ width: size, height: size }}
    >
      <span className="font-bold text-black text-center" style={{ fontSize: size * 0.25 }}>
        W3
      </span>
    </div>
  );
} 