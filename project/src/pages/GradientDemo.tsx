import React from 'react';
import { motion } from 'framer-motion';
import { BackgroundGradientAnimationDemo } from '../components/ui/background-gradient-animation-demo';

export default function GradientDemo() {
  return (
    <div className="min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <BackgroundGradientAnimationDemo />
      </motion.div>
    </div>
  );
} 