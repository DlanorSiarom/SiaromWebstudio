import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X, ArrowRight } from 'lucide-react';

interface HeaderProps {
  onOpenQuote: () => void;
  onOpenSaasAdmin: () => void;
  customProjectsCount?: number;
}

export const Header: React.FC<HeaderProps> = ({ onOpenQuote, onOpenSaasAdmin, customProjectsCount = 0 }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateHeaderVisibility = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 80 || mobileMenuOpen) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeaderVisibility);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 backdrop-blur-md bg-neutral-950/90 border-b border-amber-900/30 transition-transform duration-300 ease-in-out will-change-transform ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => scrollToSection('hero')}>
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <div className="relative flex items-center">
                <div className="absolute -inset-1.5 rounded-md bg-amber-500/40 blur-md opacity-80 group-hover:opacity-100 group-hover:bg-amber-400/60 transition-all duration-300 pointer-events-none" />
                <span className="relative font-black text-2xl sm:text-3xl tracking-widest text-white font-mono uppercase text-glitch drop-shadow-[0_0_12px_rgba(245,158,11,0.8)]">
                  SIAROM
                </span>
                <span className="relative font-highlight italic text-amber-300 text-lg sm:text-xl font-normal tracking-normal lowercase ml-2.5 pl-2.5 border-l border-amber-500/40 drop-shadow-[0_0_10px_rgba(253,224,71,0.8)] hidden sm:inline">
                  web studio <span className="font-serif text-cyan-300 not-italic text-xs uppercase tracking-widest ml-1 font-extrabold">&amp; software</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-7 text-xs font-mono font-medium text-neutral-300 uppercase tracking-wider">
          <button onClick={() => scrollToSection('hero')} className="hover:text-amber-400 transition-colors">
            Início
          </button>
          <button onClick={() => scrollToSection('portfolio')} className="hover:text-amber-400 transition-colors flex items-center space-x-1">
            <span>Portfólio</span>
            {customProjectsCount > 0 && (
              <span className="px-1.5 py-0.2 rounded text-[9px] bg-amber-500/20 text-amber-300 border border-amber-500/40">
                {customProjectsCount}
              </span>
            )}
          </button>
          <button onClick={() => scrollToSection('services')} className="hover:text-amber-400 transition-colors">
            Serviços
          </button>
          <button onClick={() => scrollToSection('process')} className="hover:text-amber-400 transition-colors">
            Metodologia
          </button>
          <button onClick={() => scrollToSection('contact')} className="hover:text-amber-400 transition-colors">
            Contato
          </button>
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden lg:flex items-center space-x-3">
          {/* Request Quote Primary Button */}
          <button
            onClick={onOpenQuote}
            className="group relative inline-flex items-center justify-center px-5 py-2.5 rounded-lg font-mono font-bold text-xs uppercase tracking-wider text-black overflow-hidden shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 group-hover:scale-105 transition-transform duration-300" />
            <div className="relative flex items-center space-x-2">
              <span>Solicitar Orçamento</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-2 md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-neutral-950/98 border-b border-amber-900/50 px-4 py-6 space-y-4">
          <div className="flex flex-col space-y-3 text-sm font-mono text-neutral-200 uppercase tracking-wider">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-left py-2 hover:text-amber-400 transition-colors border-b border-neutral-900"
            >
              Início
            </button>
            <button
              onClick={() => scrollToSection('portfolio')}
              className="text-left py-2 hover:text-amber-400 transition-colors border-b border-neutral-900 flex items-center justify-between"
            >
              <span>Portfólio & Demonstrações</span>
              {customProjectsCount > 0 && (
                <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-400 text-xs border border-amber-800">
                  {customProjectsCount}
                </span>
              )}
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-left py-2 hover:text-amber-400 transition-colors border-b border-neutral-900"
            >
              Serviços & Soluções
            </button>
            <button
              onClick={() => scrollToSection('calculator')}
              className="text-left py-2 text-amber-400 font-semibold border-b border-neutral-900 flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Simular Orçamento com IA</span>
            </button>
            <button
              onClick={() => scrollToSection('process')}
              className="text-left py-2 hover:text-amber-400 transition-colors border-b border-neutral-900"
            >
              Metodologia Siarom
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-left py-2 hover:text-amber-400 transition-colors"
            >
              Falar Conosco
            </button>
          </div>

          <div className="pt-2 flex flex-col space-y-2 font-mono">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full py-3 rounded-lg bg-amber-400 text-black font-extrabold text-center uppercase tracking-wider shadow-lg shadow-amber-500/20"
            >
              Solicitar Orçamento
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
