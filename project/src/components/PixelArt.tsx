import React from 'react';
import { motion } from 'framer-motion';

interface PixelProps {
  size?: number;
  color?: string;
  className?: string;
}

export function PixelBlock({ size = 4, color = '#00FFE1', className = '' }: PixelProps) {
  return (
    <motion.div
      className={`absolute will-change-transform ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        boxShadow: `0 0 ${size}px ${color}`,
      }}
      animate={{
        opacity: [0.2, 0.6, 0.2],
      }}
      transition={{
        duration: Math.random() * 2 + 2,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  );
}

export default function PixelBackground() {
  const pixels = React.useMemo(() => 
    Array.from({ length: 25 }).map(() => ({
      size: Math.random() * 4 + 2,
      color: ['#00FFE1', '#7000FF'][Math.floor(Math.random() * 2)],
      position: {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
      },
    }))
  , []);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {pixels.map((pixel, i) => (
        <PixelBlock
          key={i}
          size={pixel.size}
          color={pixel.color}
          className={`top-[${pixel.position.top}] left-[${pixel.position.left}]`}
        />
      ))}
    </div>
  );
}