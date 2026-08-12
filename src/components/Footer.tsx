import React from 'react';
import { ArrowUp, Lock } from 'lucide-react';

interface FooterProps {
  onOpenSaasAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSaasAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 border-t border-amber-950/40 text-neutral-400 py-12 text-xs font-mono relative overflow-hidden">
      {/* Background Grid Pattern & Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/60 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-amber-900/30">
          
          {/* Logo Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded bg-amber-400 flex items-center justify-center font-black text-black text-lg border border-yellow-300">
              S
            </div>
            <div>
              <span className="font-black text-lg text-white tracking-widest uppercase">SIAROM</span>
              <span className="text-[10px] text-amber-400 block font-bold">ESTÚDIO DE ENGENHARIA & DESIGN WEB</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-neutral-300 font-bold uppercase text-[11px]">
            <a href="#hero" className="hover:text-amber-400 transition-colors">Início</a>
            <a href="#portfolio" className="hover:text-amber-400 transition-colors">Portfólio</a>
            <a href="#services" className="hover:text-amber-400 transition-colors">Serviços</a>
            <a href="#calculator" className="hover:text-amber-400 transition-colors">Simulador IA</a>
            <a href="#contact" className="hover:text-amber-400 transition-colors">Contato</a>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded bg-black border border-amber-900/60 text-amber-400 hover:text-amber-300 hover:border-amber-500 transition-all"
            title="Voltar ao Topo"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500 text-[11px]">
          <p>© {new Date().getFullYear()} SIAROM WEB STUDIO. TODOS OS DIREITOS RESERVADOS.</p>

          <div className="flex items-center space-x-4">
            {onOpenSaasAdmin && (
              <button
                onClick={onOpenSaasAdmin}
                className="hover:text-amber-300 text-neutral-500 hover:text-amber-400 flex items-center space-x-1 transition-colors text-[10px] uppercase opacity-75 hover:opacity-100"
                title="Acesso Restrito ao Administrador"
              >
                <Lock className="w-3 h-3" />
                <span>Área Restrita</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
