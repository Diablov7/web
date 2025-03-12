import React from 'react';
import { motion } from 'framer-motion';

export default function CircuitLines() {
  const lines = React.useMemo(() => {
    return Array.from({ length: 6 }).map(() => ({
      start: { x: Math.random() * 100, y: Math.random() * 100 },
      end: { x: Math.random() * 100, y: Math.random() * 100 },
      color: ['#9370DB', '#8A2BE2', '#9932CC'][Math.floor(Math.random() * 3)],
      delay: Math.random() * 2,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none">
      <svg className="w-full h-full">
        {lines.map((line, i) => (
          <motion.path
            key={i}
            d={`M ${line.start.x} ${line.start.y} L ${line.end.x} ${line.end.y}`}
            stroke={line.color}
            strokeWidth="1"
            strokeDasharray="4 4"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1],
              opacity: [0, 0.15, 0]
            }}
            transition={{
              duration: 4,
              delay: line.delay,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </svg>
    </div>
  );
}