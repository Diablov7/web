import React from 'react';
import { motion } from 'framer-motion';

interface GlitchTextProps {
  text: string;
  className?: string;
  fontSize?: string;
  enableGlitch?: boolean;
}

export default function GlitchText({ 
  text, 
  className = '', 
  fontSize = '1em',
  enableGlitch = false
}: GlitchTextProps) {
  return (
    <div 
      className={`relative font-orbitron font-bold ${className}`}
      style={{ fontSize }}
    >
      <span className="relative z-10 block bg-gradient-to-r from-[#00D1C4] via-[#00D1C4] to-[#A020F0] bg-clip-text text-transparent">
        {text}
      </span>
    </div>
  );
}