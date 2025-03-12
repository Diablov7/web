import React from 'react';
import { motion } from 'framer-motion';

interface FloatingCubeProps {
  size?: number;
  delay?: number;
  duration?: number;
  className?: string;
}

export default function FloatingCube({ 
  size = 16, 
  delay = 0, 
  duration = 4,
  className = ''
}: FloatingCubeProps) {
  return (
    <motion.div
      className={`absolute ${className}`}
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, rgba(123, 97, 255, 0.2), rgba(157, 128, 255, 0.1))`,
        border: '1px solid rgba(123, 97, 255, 0.3)',
        boxShadow: '0 0 10px rgba(123, 97, 255, 0.2)',
      }}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 180, 360],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
}