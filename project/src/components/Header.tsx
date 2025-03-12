import React from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import CustomLogo from './CustomLogo';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/solutions', label: 'Solutions' },
  { path: '/blog', label: 'Blog' },
  { path: '/contact', label: 'Contact' }
];

export default function Header() {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  return (
    <header className="fixed w-full z-50 bg-black/90 backdrop-blur-md border-b border-[#00FFE1]/20">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <CustomLogo size={40} />
            <span className="text-2xl font-orbitron font-bold bg-gradient-to-r from-[#00FFE1] via-[#00FFE1] to-[#7000FF] bg-clip-text text-transparent">
              W3 Marketing
            </span>
          </Link>
          
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#00FFE1]/20 via-[#00FFE1]/15 to-[#7000FF]/10 text-white border border-[#00FFE1]/30'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <button 
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/5"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <motion.div 
            className="md:hidden mt-4 space-y-2 bg-black/90 rounded-lg p-4 border border-[#00FFE1]/20"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#00FFE1]/20 via-[#00FFE1]/15 to-[#7000FF]/10 text-white border border-[#00FFE1]/30'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </motion.div>
        )}
      </nav>
    </header>
  );
}