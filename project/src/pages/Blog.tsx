import React from 'react';
import { motion } from 'framer-motion';
import { Construction } from 'lucide-react';
import DashboardCard from '../components/DashboardCard';
import GlitchText from '../components/GlitchText';

export default function Blog() {
  return (
    <div className="min-h-screen pt-32 p-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <DashboardCard className="p-8 text-center">
            <motion.div 
              className="text-5xl sm:text-7xl mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <GlitchText 
                text="Coming Soon" 
                fontSize="1em"
                enableGlitch={true}
              />
            </motion.div>

            <div className="flex justify-center mb-8">
              <Construction className="w-16 h-16 text-[#00FFE1]" />
            </div>

            <p className="text-xl text-white/80 font-mono max-w-2xl mx-auto mb-4">
              Our blog is currently under construction. We're working hard to bring you valuable insights and strategies in Web3 marketing.
            </p>

            <p className="text-lg text-white/60 font-mono">
              Check back soon for expert articles, case studies, and industry analysis.
            </p>
          </DashboardCard>
        </motion.div>
      </div>
    </div>
  );
}