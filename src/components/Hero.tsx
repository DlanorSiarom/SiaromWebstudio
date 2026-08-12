import React, { useEffect, useRef } from 'react';
import { ArrowRight, Globe } from 'lucide-react';
import ParticleText from './ParticleText';
import gsap from 'gsap';

interface HeroProps {
  onOpenQuote: () => void;
  onSelectPortfolioItem?: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuote }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.hero-animate', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative pt-10 pb-20 md:pt-16 md:pb-28 overflow-hidden bg-neutral-950 text-white bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('https://i.ibb.co/chh6qSnQ/Chat-GPT-Image-5-de-ago-de-2026-23-08-16.png')`,
      }}
    >
      <div ref={containerRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto items-center">
          
          {/* Main Hero Content */}
          <div className="space-y-8 text-center lg:text-left">

            {/* Main Title with Particle Text */}
            <div className="space-y-4">
              <div className="w-full h-32 sm:h-40 relative">
                <ParticleText
                  text="IDEIAS NUNCA MORREM"
                  particleSize={2.4}
                  density={3.5}
                  color="#ffffff"
                  highlightColor="#f59e0b"
                  scatter={180}
                  gatherDuration={1500}
                  stagger={350}
                  pointerRepel={50}
                  repelRadius={140}
                  idleDrift={0.8}
                  trigger="mount"
                  fontSize="clamp(2rem, 6vw, 4.5rem)"
                  fontWeight={900}
                  fontFamily="monospace"
                  glow={true}
                />
              </div>
              <h1 className="hero-animate text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-[1.3] drop-shadow-[0_6px_16px_rgba(0,0,0,0.95)] font-mono">
                Toda <span className="font-highlight italic text-amber-300 text-3xl sm:text-4xl lg:text-5xl font-normal drop-shadow-[0_0_14px_rgba(253,224,71,0.85)] px-1">grande mudança</span> foi, um dia, apenas uma <span className="font-highlight italic text-cyan-300 text-3xl sm:text-4xl lg:text-5xl font-normal drop-shadow-[0_0_14px_rgba(103,232,249,0.85)] px-1">ideia</span>.
              </h1>
            </div>

            {/* Subtitle */}
            <p className="hero-animate text-base sm:text-lg text-neutral-100 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0 drop-shadow-[0_3px_10px_rgba(0,0,0,0.95)]">
              Projetamos <span className="font-highlight italic text-amber-300 text-lg sm:text-xl font-normal drop-shadow-[0_0_8px_rgba(253,224,71,0.6)]">Landing Pages</span> de <span className="font-highlight italic text-yellow-300 text-lg sm:text-xl font-normal drop-shadow-[0_0_8px_rgba(253,224,71,0.6)]">extrema conversão</span>, <span className="font-highlight italic text-cyan-300 text-lg sm:text-xl font-normal drop-shadow-[0_0_8px_rgba(103,232,249,0.6)]">E-Commerces velozes</span> e <span className="font-highlight italic text-amber-300 text-lg sm:text-xl font-normal">Plataformas Corporativas</span> com engenharia de código avançada e acabamento retro-futurista marcante.
            </p>

            {/* Action Buttons */}
            <div className="hero-animate pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onOpenQuote}
                className="w-full sm:w-auto px-8 py-4 rounded-lg bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-black font-mono font-black text-sm uppercase tracking-wider amber-glow hover:amber-glow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center space-x-3 group"
              >
                <span>Solicitar Orçamento de Site</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => scrollToSection('portfolio')}
                className="w-full sm:w-auto px-7 py-4 rounded-lg bg-black/80 hover:bg-neutral-900 text-amber-300 font-mono font-bold text-xs uppercase tracking-wider border border-amber-600/60 hover:border-amber-400 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Globe className="w-4 h-4 text-amber-400" />
                <span>Explorar Sites do Portfólio</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

