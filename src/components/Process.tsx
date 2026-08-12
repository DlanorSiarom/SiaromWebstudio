import React from 'react';
import { PROCESS_STEPS } from '../data/mockData';
import { Code2, Compass, Rocket, ShieldCheck, Sparkles } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const Process: React.FC = () => {
  const getStepIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Compass className="w-5 h-5 text-amber-400" />;
      case 1:
        return <Code2 className="w-5 h-5 text-amber-300" />;
      case 2:
        return <ShieldCheck className="w-5 h-5 text-yellow-400" />;
      case 3:
        return <Rocket className="w-5 h-5 text-amber-500" />;
      default:
        return <Sparkles className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <section id="process" className="py-20 bg-neutral-950 relative overflow-hidden border-t border-amber-950/40 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal direction="up" distance={30} duration={0.8}>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-black border border-amber-600/60 text-xs font-semibold text-amber-400 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>WORKFLOW & METODOLOGIA</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
              Metodologia Siarom de <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent text-glitch">Alta Eficiência</span>
            </h2>
            <p className="text-neutral-300 text-sm sm:text-base font-sans">
              Um processo transparente e ágil do primeiro contato até a entrega oficial do seu site no ar.
            </p>
          </div>
        </ScrollReveal>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS_STEPS.map((stepItem, idx) => (
            <ScrollReveal key={idx} direction="up" distance={35} delay={idx * 0.12} duration={0.7}>
              <div
                className="relative bg-black/90 rounded-xl border border-amber-900/40 p-6 flex flex-col justify-between hover:border-amber-500/80 transition-all duration-300 hover:shadow-xl hover:shadow-amber-950/50 h-full"
              >
                {/* Step Number Badge */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black text-amber-500/30">
                      {stepItem.step}
                    </span>
                    <div className="w-10 h-10 rounded bg-neutral-950 border border-amber-900/60 flex items-center justify-center">
                      {getStepIcon(idx)}
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 uppercase">
                    {stepItem.title}
                  </h3>
                  
                  <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                    {stepItem.description}
                  </p>
                </div>

                {/* Progress Line visual */}
                <div className="mt-6 pt-4 border-t border-amber-900/30 text-[10px] text-amber-400 font-bold uppercase tracking-wider flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 inline-block animate-rec"></span>
                  <span>FASE {idx + 1} DE 4 // OK</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
};

