import React from 'react';
import { motion } from 'framer-motion';

interface CubeProps {
  size: number;
  color: string;
  x: number;
  y: number;
}

function Cube({ size, color, x, y }: CubeProps) {
  return (
    <motion.div
      className="absolute rounded-sm backdrop-blur-sm will-change-transform"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        top: `${y}%`,
        background: `linear-gradient(135deg, ${color}20, ${color}05)`,
        border: `1px solid ${color}10`,
        boxShadow: `0 0 ${size}px ${color}10`,
      }}
      animate={{
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  );
}

export default function FloatingCubes() {
  const cubes = React.useMemo(() => {
    return Array.from({ length: 15 }).map(() => ({
      size: Math.random() * 8 + 4,
      color: ['#7000FF', '#9D4EDD'][Math.floor(Math.random() * 2)],
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Dark Gradient Overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(165deg, rgba(3, 3, 5, 0.97), rgba(8, 8, 15, 0.98))',
        }}
      />

      {/* Floating Cubes */}
      {cubes.map((cube, i) => (
        <Cube key={i} {...cube} />
      ))}
    </div>
  );
}