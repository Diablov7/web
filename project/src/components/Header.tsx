import React, { useEffect, useRef } from 'react';
import { Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import CustomLogo from './CustomLogo';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/solutions', label: 'Solutions' },
  { path: '/blog', label: 'Blog' },
  { path: '/contact', label: 'Contact' }
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  const headerRef = useRef<HTMLElement>(null);
  const rafId = useRef<number>();
  const lastX = useRef(0);
  const lastY = useRef(0);
  const interpolationFactor = 0.15; // Adjust for smoother/faster movement

  useEffect(() => {
    const updateMousePosition = (x: number, y: number) => {
      if (!headerRef.current) return;
      
      // Smooth interpolation
      lastX.current += (x - lastX.current) * interpolationFactor;
      lastY.current += (y - lastY.current) * interpolationFactor;
      
      headerRef.current.style.setProperty('--mouse-x', `${lastX.current}%`);
      headerRef.current.style.setProperty('--mouse-y', `${lastY.current}%`);
      
      rafId.current = requestAnimationFrame(() => updateMousePosition(x, y));
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!headerRef.current) return;
      const rect = headerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      
      rafId.current = requestAnimationFrame(() => updateMousePosition(x, y));
    };

    const handleMouseLeave = () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      // Reset position to center when mouse leaves
      lastX.current = 50;
      lastY.current = 50;
      if (headerRef.current) {
        headerRef.current.style.setProperty('--mouse-x', '50%');
        headerRef.current.style.setProperty('--mouse-y', '50%');
      }
    };

    const header = headerRef.current;
    if (header) {
      header.addEventListener('mousemove', handleMouseMove);
      header.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (header) {
        header.removeEventListener('mousemove', handleMouseMove);
        header.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return (
    <header 
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-[#00FFE1]/10"
      style={{
        '--mouse-x': '50%',
        '--mouse-y': '50%'
      } as React.CSSProperties}
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[#00FFE1]/5" />
        <div 
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle at center, rgba(0,255,225,0.2) 0%, transparent 35%)',
            left: 'var(--mouse-x)',
            top: 'var(--mouse-y)',
            transform: 'translate(-50%, -50%)',
            transition: 'opacity 0.3s ease',
            pointerEvents: 'none'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4">
        <nav className="h-16 flex items-center justify-between">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-6 group">
            <div className="flex flex-col items-center">
              <CustomLogo size={32} />
              <span className="text-xs font-orbitron text-[#00FFE1] mt-0.5 opacity-80 group-hover:opacity-100 transition-all">
                Wevolv3
              </span>
            </div>
            <span className="text-lg font-orbitron font-bold bg-gradient-to-r from-[#00FFE1] via-[#00FFE1]/80 to-[#00FFE1] bg-clip-text text-transparent">
              Web3 Marketing
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  px-4 py-2 rounded-lg text-sm transition-all
                  ${location.pathname === item.path
                    ? 'text-[#00FFE1] bg-[#00FFE1]/5 ring-1 ring-[#00FFE1]/20'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white/80 hover:text-white"
          >
            <Menu size={24} />
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`
                  block px-4 py-2 rounded-lg text-sm transition-all
                  ${location.pathname === item.path
                    ? 'text-[#00FFE1] bg-[#00FFE1]/5 ring-1 ring-[#00FFE1]/20'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
} 