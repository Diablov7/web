import React from 'react';
import { motion } from 'framer-motion';

interface CosmicParticlesProps {
  count?: number;
}

export default function CosmicParticles({ count = 20 }: CosmicParticlesProps) {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cosmic-glow rounded-full"
          style={{
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
          }}
          animate={{
            y: [0, -100],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
}