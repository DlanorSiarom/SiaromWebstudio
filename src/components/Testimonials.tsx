import React from 'react';
import { TESTIMONIALS } from '../data/mockData';
import { Star, Quote, Sparkles, CheckCircle2 } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-neutral-950 relative overflow-hidden border-t border-amber-950/40 font-mono">
      {/* Background Dot Pattern & Ambient Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:28px_28px] opacity-15 pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-transparent to-neutral-950 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <ScrollReveal direction="up" distance={30} duration={0.8}>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-black border border-amber-600/60 text-xs font-semibold text-amber-400 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>DEPOIMENTOS & REVIEWS DE CLIENTES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
              O Que Nossos Clientes <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent text-glitch">Dizem da Siarom</span>
            </h2>
            <p className="text-neutral-300 text-sm sm:text-base font-sans">
              A satisfação dos nossos parceiros é o nosso maior selo de qualidade.
            </p>
          </div>
        </ScrollReveal>

        {/* Testimonials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <ScrollReveal key={t.id} direction="up" distance={35} delay={idx * 0.12} duration={0.7}>
              <div
                className="bg-black/90 rounded-xl border border-amber-900/40 p-8 flex flex-col justify-between relative hover:border-amber-500/80 transition-all duration-300 hover:shadow-xl hover:shadow-amber-950/50 h-full"
              >
                <Quote className="w-8 h-8 text-amber-500/20 absolute top-6 right-6" />

                <div className="space-y-4">
                  {/* Rating Stars */}
                  <div className="flex items-center space-x-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>

                  <p className="text-xs text-neutral-300 leading-relaxed italic font-sans">
                    "{t.comment}"
                  </p>
                </div>

                {/* Author Footer */}
                <div className="pt-6 mt-6 border-t border-amber-900/30 flex items-center space-x-3">
                  <img
                    src={t.avatar}
                    alt={t.clientName}
                    referrerPolicy="no-referrer"
                    className="w-11 h-11 rounded-full object-cover border border-amber-500/50"
                  />
                  <div>
                    <h4 className="font-bold text-white text-xs uppercase">{t.clientName}</h4>
                    <span className="text-[10px] text-neutral-400 block">{t.role} • {t.company}</span>
                    <span className="text-[10px] text-amber-400 font-bold uppercase">{t.projectType}</span>
                  </div>
                </div>

              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Guarantee Banner */}
        <ScrollReveal direction="up" distance={30} delay={0.2} duration={0.8}>
          <div className="mt-16 bg-black/90 border border-amber-900/60 p-6 sm:p-8 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
            <div className="flex items-center space-x-4 text-left">
              <div className="w-12 h-12 rounded bg-amber-950 border border-amber-800 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm uppercase">Garantia de Entrega & Pós-Lançamento</h4>
                <p className="text-xs text-neutral-300 mt-1 font-sans">Todos os nossos sites contam com suporte técnico dedicado para eventuais dúvidas após a entrega.</p>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};

