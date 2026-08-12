import React, { useState } from 'react';
import { PortfolioItem, ProjectCategory } from '../types';
import { ExternalLink, Eye, Search, Sparkles, Flame, Layers, FolderKanban } from 'lucide-react';
import CardSwap, { Card } from './CardSwap';
import { ScrollReveal } from './ScrollReveal';

interface PortfolioGridProps {
  items: PortfolioItem[];
  onOpenModal: (item: PortfolioItem) => void;
}

export const PortfolioGrid: React.FC<PortfolioGridProps> = ({ items, onOpenModal }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: ProjectCategory[] = [
    'Todos',
    'Landing Page',
    'E-commerce',
    'Institucional',
    'Sistema Web',
    'Portfólio & Blog'
  ];

  const filteredItems = items.filter(item => {
    const matchesCategory = selectedCategory === 'Todos' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="portfolio" className="py-20 bg-neutral-950 relative overflow-hidden border-t border-amber-950/40">
      {/* Background Grid Pattern & Ambient Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:32px_32px] opacity-15 pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-transparent to-neutral-950 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal direction="up" distance={30} duration={0.8}>
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-black border border-amber-600/60 text-xs font-mono font-semibold text-amber-400 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>PORTFÓLIO & PROJETOS SIAROM</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-mono uppercase">
              Nossos Sites & <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent text-glitch">Projetos Feitos</span>
            </h2>
            <p className="text-neutral-300 text-base sm:text-lg max-w-2xl mx-auto font-sans">
              Acompanhe aqui os projetos reais desenvolvidos pela Siarom. Todos os sites contam com engenharia de alto desempenho, velocidade e design exclusivo.
            </p>
          </div>
        </ScrollReveal>

        {/* Showcase only if items exist */}
        {items.length > 0 && (
          <ScrollReveal direction="up" distance={35} duration={0.8} delay={0.1}>
            <div className="mb-16 py-8 px-4 sm:px-8 rounded-2xl bg-black/60 border border-amber-900/50 backdrop-blur-sm flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden relative">
              <div className="max-w-xl space-y-5 font-mono z-10">
                <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/40 text-[11px] font-bold text-amber-400 uppercase">
                  <Layers className="w-3.5 h-3.5 text-amber-400" />
                  <span>Destaques em Rotação 3D</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wider">
                  Experiência Interativa
                </h3>
                <p className="text-neutral-300 text-sm font-sans leading-relaxed">
                  Arraste e interaja com os cards em camadas tridimensionais. Nossos projetos unem animações de alta performance, design marcante e interfaces imersivas.
                </p>
              </div>

              <div className="w-full lg:w-[480px] h-[380px] sm:h-[420px] relative flex items-center justify-center pr-4 sm:pr-8">
                <div style={{ height: '360px', width: '100%', position: 'relative' }}>
                  <CardSwap
                    width={360}
                    height={260}
                    cardDistance={40}
                    verticalDistance={50}
                    delay={4000}
                    pauseOnHover={true}
                    skewAmount={3}
                    easing="power"
                  >
                    {items.slice(0, 4).map((item, idx) => (
                      <Card
                        key={item.id || idx}
                        onClick={() => {
                          if (item.liveUrl) {
                            window.open(item.liveUrl, '_blank');
                          } else {
                            onOpenModal(item);
                          }
                        }}
                        className="cursor-pointer group/card border border-amber-500/40 bg-neutral-950/95 overflow-hidden rounded-xl shadow-2xl p-0 flex flex-col justify-between"
                      >
                        <div className="relative h-32 overflow-hidden bg-black">
                          <img
                            src={item.image}
                            alt={item.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
                          <div className="absolute top-2 left-2 flex items-center space-x-1.5">
                            <span className="px-2 py-0.5 rounded bg-black/90 border border-amber-500/60 text-[9px] font-mono font-bold text-amber-300 uppercase">
                              {item.category}
                            </span>
                            <span className="px-2 py-0.5 rounded bg-emerald-950/90 border border-emerald-500/80 text-[9px] font-mono font-extrabold text-emerald-400 uppercase flex items-center space-x-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                              <span>SITE AO VIVO</span>
                            </span>
                          </div>
                        </div>
                        <div className="p-4 space-y-2 font-mono flex-1 flex flex-col justify-between bg-neutral-950/90">
                          <div>
                            <span className="text-[10px] text-amber-500 uppercase font-bold">
                              {item.clientName}
                            </span>
                            <h4 className="text-sm font-bold text-white uppercase group-hover/card:text-amber-300 transition-colors line-clamp-1">
                              {item.title}
                            </h4>
                            <p className="text-[11px] text-neutral-400 font-sans line-clamp-2 mt-1">
                              {item.description}
                            </p>
                          </div>
                          <div className="pt-2 flex items-center justify-between border-t border-amber-900/40 text-[10px] text-amber-400 font-bold uppercase">
                            <span className="flex items-center space-x-1 text-emerald-400 font-extrabold">
                              <ExternalLink className="w-3 h-3" />
                              <span>Abrir Site Na Hora</span>
                            </span>
                            <span className="text-neutral-500">{item.year}</span>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </CardSwap>
                </div>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Search & Category Filter Controls if items exist */}
        {items.length > 0 && (
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-amber-900/30">
            
            {/* Category Tabs */}
            <div className="flex items-center space-x-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar text-xs font-mono">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded whitespace-nowrap transition-all duration-200 uppercase font-bold ${
                    selectedCategory === cat
                      ? 'bg-amber-400 text-black shadow-md shadow-amber-500/20 font-black'
                      : 'bg-black text-neutral-400 hover:text-amber-300 hover:bg-neutral-900 border border-neutral-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div className="flex items-center space-x-3 w-full md:w-auto font-mono">
              <div className="relative flex-1 md:w-64">
                <Search className="w-4 h-4 text-amber-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="BUSCAR SITE..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black/90 border border-amber-900/60 rounded pl-9 pr-4 py-2 text-xs text-amber-200 placeholder-neutral-600 focus:outline-none focus:border-amber-400 transition-colors uppercase"
                />
              </div>
            </div>

          </div>
        )}

        {/* Portfolio Cards Grid or Clean Empty State */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-black/60 rounded-2xl border border-amber-900/50 p-8 space-y-4 max-w-2xl mx-auto font-mono shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-amber-950/80 border border-amber-500/60 flex items-center justify-center text-amber-400 mx-auto shadow-lg shadow-amber-950/80">
              <FolderKanban className="w-8 h-8 animate-pulse" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-black text-white uppercase tracking-wider">
                Portfólio em Atualização Real
              </h3>
              <p className="text-xs text-neutral-300 font-sans leading-relaxed max-w-lg mx-auto">
                Todos os dados de teste foram removidos. Os projetos reais desenvolvidos pela Siarom serão publicados nesta seção pelo administrador.
              </p>
            </div>
            <div className="pt-2">
              <a
                href="#contact"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20"
              >
                <span>Solicitar Primeiro Projeto Real</span>
              </a>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
              <ScrollReveal key={item.id} direction="up" distance={30} delay={index * 0.08} duration={0.6}>
                <div
                  className="group relative bg-black/90 rounded-xl border border-amber-900/40 hover:border-amber-500/80 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-amber-950/60 flex flex-col justify-between h-full"
                >
                
                {/* Screenshot Header Container */}
                <div
                  className="relative aspect-[16/10] overflow-hidden bg-neutral-950 vhs-scanlines cursor-pointer group/img"
                  onClick={() => {
                    if (item.liveUrl) {
                      window.open(item.liveUrl, '_blank');
                    } else {
                      onOpenModal(item);
                    }
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500 filter contrast-105"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  {/* Top Category Badge & Live Badge */}
                  <div className="absolute top-2.5 left-2.5 flex items-center space-x-2 font-mono">
                    <span className="px-2 py-0.5 rounded bg-black/90 border border-amber-500/60 text-[10px] font-extrabold uppercase tracking-widest text-amber-300">
                      {item.category}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-950/90 border border-emerald-500/80 text-[10px] font-extrabold uppercase tracking-widest text-emerald-300 flex items-center space-x-1 shadow-md shadow-emerald-950">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>SITE REAL</span>
                    </span>
                  </div>

                  <div className="absolute top-2.5 right-2.5 font-mono">
                    <span className="px-2 py-0.5 rounded bg-black/80 border border-neutral-800 text-[10px] text-neutral-400">
                      {item.year}
                    </span>
                  </div>

                  {/* Hover Overlay Button */}
                  <div className="absolute inset-0 bg-black/80 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center space-y-2 p-4 font-mono">
                    {item.liveUrl && (
                      <a
                        href={item.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-full py-2.5 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-black font-black text-xs shadow-xl flex items-center justify-center space-x-2 uppercase transition-transform hover:scale-105"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>ABRIR SITE AGORA NA HORA</span>
                      </a>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenModal(item);
                      }}
                      className="w-full py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-amber-300 border border-amber-600/60 text-[11px] font-bold flex items-center justify-center space-x-2 uppercase transition-transform hover:scale-105"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Ver Teste de Dispositivos / Iframe</span>
                    </button>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2 font-mono">
                    <span className="text-[11px] text-amber-500 uppercase font-bold block">
                      CLIENTE: {item.clientName}
                    </span>
                    <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1 uppercase">
                      {item.title}
                    </h3>
                    <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed font-sans">
                      {item.description}
                    </p>
                  </div>

                  {/* Metrics Badges */}
                  {item.metrics && item.metrics.length > 0 && (
                    <div className="pt-2 flex flex-wrap gap-2 font-mono">
                      {item.metrics.map((m, idx) => (
                        <div key={idx} className="px-2 py-0.5 rounded bg-amber-950/80 border border-amber-800/80 text-[10px] text-amber-300 flex items-center space-x-1">
                          <Flame className="w-3 h-3 text-amber-400 shrink-0" />
                          <span><strong>{m.label}:</strong> {m.value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Technology Chips */}
                  <div className="pt-2 flex flex-wrap gap-1.5 font-mono">
                    {item.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-neutral-950 text-neutral-400 border border-neutral-800 text-[9px] uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Link Footer */}
                  <div className="pt-4 border-t border-amber-900/30 flex items-center justify-between text-xs font-mono">
                    {item.liveUrl ? (
                      <a
                        href={item.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/50 font-bold flex items-center space-x-1.5 uppercase text-[11px] transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Abrir Site Ao Vivo</span>
                      </a>
                    ) : (
                      <span className="text-neutral-500 text-[10px]">Site em Produção</span>
                    )}

                    <button
                      onClick={() => onOpenModal(item)}
                      className="text-neutral-400 hover:text-white flex items-center space-x-1 text-[11px] font-bold uppercase transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5 text-amber-500" />
                      <span>Ver Specs</span>
                    </button>
                  </div>

                </div>
              </div>
            </ScrollReveal>
          ))}
          </div>
        )}

      </div>
    </section>
  );
};
