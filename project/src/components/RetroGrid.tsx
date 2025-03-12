import React from 'react';
import { motion } from 'framer-motion';

export default function RetroGrid() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{
          backgroundImage: `
            linear-gradient(rgba(112, 0, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(112, 0, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
          opacity: 0.1,
        }}
        animate={{
          backgroundPosition: ['0px 0px', '32px 32px'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(3, 3, 5, 0) 0%, rgba(3, 3, 5, 0.95) 100%)',
        }}
      />
    </div>
  );
}