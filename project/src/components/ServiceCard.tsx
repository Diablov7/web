import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';
import DashboardCard from './DashboardCard';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: 'teal-purple' | 'pink-yellow';
}

export default function ServiceCard({ title, description, icon: Icon, gradient }: ServiceCardProps) {
  const gradientColors = {
    'teal-purple': ['#00D1C4', '#A020F0'],
    'pink-yellow': ['#FF1493', '#FFD700']
  };

  const [startColor, endColor] = gradientColors[gradient];

  return (
    <DashboardCard
      title={title}
      neonColor={startColor}
      className="p-6 overflow-hidden"
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className="p-3 rounded-lg" style={{ backgroundColor: `${startColor}20` }}>
          <Icon className="w-6 h-6" style={{ color: startColor }} />
        </div>
      </div>
      <p className="text-white/80 leading-relaxed">{description}</p>
      
      <motion.div
        className="absolute inset-0 -z-10 opacity-10"
        style={{
          background: `linear-gradient(135deg, ${startColor}, ${endColor})`,
        }}
      />
    </DashboardCard>
  );
}