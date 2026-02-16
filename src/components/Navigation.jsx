import { useState, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { smoothEase } from '../constants';
import { navItems, socialLinks } from '../data/portfolio';

export default function Navigation({ activeSection, scrollToSection, hideNav }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 50);
  });

  const handleNav = useCallback(
    (id) => {
      setIsMenuOpen(false);
      scrollToSection(id);
    },
    [scrollToSection],
  );

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 transition-colors duration-500 ease-out ${
        scrolled
          ? 'bg-slate-950/85 backdrop-blur-lg border-b border-slate-800/60 shadow-lg shadow-slate-950/30'
          : 'bg-transparent border-b border-transparent'
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hideNav ? -100 : 0, opacity: hideNav ? 0 : 1 }}
      transition={{ duration: 0.4, ease: smoothEase }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <button
          onClick={() => handleNav('home')}
          className="text-lg font-bold tracking-tight bg-gradient-to-r from-blue-400 to-teal-300 bg-clip-text text-transparent"
        >
          NS
        </button>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const id = item.toLowerCase();
            return (
              <button
                key={item}
                onClick={() => handleNav(id)}
                className={`relative text-sm font-medium transition-colors duration-300 ${
                  activeSection === id ? 'text-blue-400' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {item}
                {activeSection === id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-400 rounded-full"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            );
          })}

          <div className="flex items-center gap-3 ml-4 pl-4 border-l border-slate-800">
            {socialLinks.map(({ name, url, icon: Icon }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-blue-400 transition-colors duration-300"
                aria-label={name}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-slate-300"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-slate-900/95 backdrop-blur-lg border-t border-slate-800/60 overflow-hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: smoothEase }}
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => handleNav(item.toLowerCase())}
                  className="text-left text-sm font-medium text-slate-300 hover:text-blue-400 transition-colors duration-200"
                >
                  {item}
                </button>
              ))}
              <div className="flex gap-4 pt-4 border-t border-slate-800">
                {socialLinks.map(({ name, url, icon: Icon }) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-500 hover:text-blue-400 transition-colors duration-200"
                    aria-label={name}
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
