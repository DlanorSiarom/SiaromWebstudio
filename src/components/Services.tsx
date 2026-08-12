import React from 'react';
import { SERVICES_LIST } from '../data/mockData';
import { Zap, Globe, ShoppingCart, Cpu, Check, ArrowRight, Sparkles } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface ServicesProps {
  onSelectServiceForQuote: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectServiceForQuote }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap':
        return <Zap className="w-6 h-6 text-amber-400" />;
      case 'Globe':
        return <Globe className="w-6 h-6 text-amber-300" />;
      case 'ShoppingCart':
        return <ShoppingCart className="w-6 h-6 text-yellow-400" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-amber-500" />;
      default:
        return <Zap className="w-6 h-6 text-amber-400" />;
    }
  };

  return (
    <section id="services" className="py-20 bg-neutral-950 relative overflow-hidden border-t border-amber-950/40">
      {/* Background Cyber Mesh & Ambient Lights */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f59e0b10_1px,transparent_1px),linear-gradient(to_bottom,#f59e0b10_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-tr from-neutral-950 via-transparent to-neutral-950 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal direction="up" distance={30} duration={0.8}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-black border border-amber-600/60 text-xs font-mono font-semibold text-amber-400 mb-4 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>SIAROM MODULES // ENGENHARIA DIGITAL</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-mono uppercase">
              Serviços para <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent text-glitch">Impulsionar Seu Negócio</span>
            </h2>
            <p className="mt-4 text-neutral-400 text-base sm:text-lg">
              Combinamos arquitetura moderna de software, velocidade extrema e identidade visual retrô-futurista de altíssimo impacto.
            </p>
          </div>
        </ScrollReveal>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES_LIST.map((service, index) => (
            <ScrollReveal key={service.id} direction="up" distance={40} delay={index * 0.12} duration={0.7}>
              <div
                className="group relative rounded-xl bg-black/90 border border-amber-900/40 hover:border-amber-500/80 p-8 transition-all duration-300 hover:shadow-xl hover:shadow-amber-950/50 flex flex-col justify-between h-full"
              >
                <div className="space-y-6">
                  
                  {/* Service Header Bar */}
                  <div className="flex items-center justify-between font-mono">
                    <div className="w-14 h-14 rounded-lg bg-neutral-950 border border-amber-900/60 flex items-center justify-center group-hover:scale-105 group-hover:border-amber-400 transition-all duration-300 shadow-md">
                      {getIcon(service.iconName)}
                    </div>
                    <span className="px-3 py-1 rounded text-xs font-bold bg-amber-950/80 text-amber-400 border border-amber-700/60 uppercase tracking-widest">
                      {service.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-2xl font-bold font-mono uppercase text-white group-hover:text-amber-300 transition-colors">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-neutral-300 text-sm leading-relaxed">
                      {service.shortDesc}
                    </p>
                  </div>

                  {/* Deliverables List */}
                  <div className="pt-4 border-t border-amber-900/30 space-y-2.5">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 block mb-2">
                      RECURSOS INCLUSOS NO PACOTE:
                    </span>
                    {service.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start space-x-2.5 text-xs text-neutral-300">
                        <div className="p-0.5 rounded bg-amber-950 text-amber-400 shrink-0 mt-0.5 border border-amber-800">
                          <Check className="w-3 h-3" />
                        </div>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Service Footer Price & Action */}
                <div className="pt-6 mt-6 border-t border-amber-900/30 flex items-center justify-between font-mono">
                  <div>
                    <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Orçamento:</span>
                    <span className="text-xs font-bold text-amber-400 uppercase">Tratado no WhatsApp</span>
                  </div>
                  
                  <button
                    onClick={() => onSelectServiceForQuote(service.title)}
                    className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-black bg-amber-400 hover:bg-amber-300 px-4 py-2.5 rounded border border-amber-300 transition-all shadow-md shadow-amber-500/20"
                  >
                    <span>Orçar Projeto</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
};

