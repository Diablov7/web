import React from 'react';
import { motion } from 'framer-motion';
import { Home, Layers, Users, MessageSquare, Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function SideNav() {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = React.useState(false);
  
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Layers, label: 'Solutions', path: '/solutions' },
    { icon: Users, label: 'About', path: '/about' },
    { icon: MessageSquare, label: 'Contact', path: '/contact' },
  ];

  return (
    <motion.div
      className="fixed left-0 top-0 h-full z-50 flex"
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className={`cosmic-card py-6 ${isExpanded ? 'px-6' : 'px-4'} h-full flex flex-col`}
        animate={{ width: isExpanded ? 200 : 80 }}
      >
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mb-8 p-2 rounded-lg hover:bg-white/5 transition-colors self-end"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="space-y-6 flex-1 flex flex-col items-center">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center w-full space-x-3 p-3 rounded-lg transition-all duration-300 group ${
                  isActive
                    ? 'bg-teal-purple-gradient text-white shadow-neon-teal'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-5 h-5" />
                {isExpanded && (
                  <motion.span
                    className="font-mono text-sm whitespace-nowrap"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </Link>
            );
          })}
        </div>

        <motion.div
          className="mt-auto pt-6 border-t border-white/10"
          animate={{ opacity: isExpanded ? 1 : 0 }}
        >
          <p className="text-xs text-white/40 text-center font-mono">
            Wevolv3 © 2025
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}