import React from 'react';

interface DashboardCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  neonColor?: string;
}

export default function DashboardCard({ 
  children, 
  className = '', 
  title, 
  neonColor = '#00FFE1' 
}: DashboardCardProps) {
  return (
    <div
      className={`relative rounded-2xl backdrop-blur-xl ${className}`}
      style={{
        background: `linear-gradient(165deg, 
          rgba(8, 8, 12, 0.98), 
          rgba(12, 12, 20, 0.99)
        )`,
        boxShadow: `
          0 4px 6px rgba(0, 0, 0, 0.3),
          0 8px 24px rgba(0, 0, 0, 0.5)
        `,
        border: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      {title && (
        <div 
          className="absolute -top-3 left-4 px-3 py-1 rounded-md backdrop-blur-xl"
          style={{
            background: `linear-gradient(165deg, 
              rgba(12, 12, 18, 0.98), 
              rgba(16, 16, 24, 0.99)
            )`,
            boxShadow: `
              0 4px 6px rgba(0, 0, 0, 0.3),
              0 8px 24px rgba(0, 0, 0, 0.5)
            `,
            border: '1px solid rgba(255, 255, 255, 0.05)',
          }}
        >
          <span className="text-sm font-mono text-white/90">{title}</span>
        </div>
      )}
      
      <div className="relative z-10">{children}</div>

      {/* Curved neon glow effect */}
      <div 
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: `radial-gradient(
            circle at 100% 0%,
            ${neonColor}10,
            transparent 50%
          )`,
          opacity: 0.4,
        }}
      />

      {/* Subtle curved neon border */}
      <div 
        className="absolute -inset-[1px] rounded-2xl pointer-events-none"
        style={{
          background: `linear-gradient(135deg, 
            transparent 70%, 
            ${neonColor}15
          )`,
          maskImage: 'radial-gradient(circle at 100% 0%, black 30%, transparent 70%)',
          opacity: 0.6,
        }}
      />
    </div>
  );
}