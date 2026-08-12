import React, { useState } from 'react';
import { PortfolioItem } from '../types';
import { X, ExternalLink, Monitor, Tablet, Smartphone, Sparkles, RefreshCw, Globe, Play } from 'lucide-react';

interface ProjectModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
  onOpenQuoteWithCategory: (category: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ item, onClose, onOpenQuoteWithCategory }) => {
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [previewMode, setPreviewMode] = useState<'iframe' | 'image'>('iframe');
  const [iframeKey, setIframeKey] = useState(0);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8 text-slate-100 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/90 gap-3">
          <div className="flex items-center space-x-3">
            <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold uppercase tracking-wider">
              {item.category}
            </span>
            <h3 className="text-lg font-bold text-white truncate max-w-xs sm:max-w-md font-mono">
              {item.title}
            </h3>
          </div>

          {/* Device Switcher & Direct Launch */}
          <div className="flex items-center space-x-3">
            {item.liveUrl && (
              <a
                href={item.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs font-mono flex items-center space-x-1.5 shadow-lg shadow-emerald-500/20 transition-all uppercase"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Abrir Site Na Hora</span>
              </a>
            )}

            <div className="hidden sm:flex items-center bg-slate-950 rounded-lg p-1 border border-slate-800 text-xs font-mono">
              <button
                onClick={() => setDeviceMode('desktop')}
                className={`p-1.5 rounded transition-colors ${deviceMode === 'desktop' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
                title="Desktop View"
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDeviceMode('tablet')}
                className={`p-1.5 rounded transition-colors ${deviceMode === 'tablet' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
                title="Tablet View"
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDeviceMode('mobile')}
                className={`p-1.5 rounded transition-colors ${deviceMode === 'mobile' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
                title="Mobile View"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Interactive Device Frame Preview */}
          <div className="bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800/90 flex flex-col justify-center items-center overflow-hidden min-h-[420px]">
            
            {/* View Mode Controls */}
            <div className="w-full mb-3 flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800 pb-2">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 font-bold uppercase">PREVISUALIZAÇÃO AO VIVO SIAROM</span>
              </div>
              <div className="flex items-center space-x-2">
                {item.liveUrl && (
                  <button
                    onClick={() => setIframeKey(k => k + 1)}
                    className="p-1 rounded bg-slate-900 border border-slate-800 hover:text-white transition-colors flex items-center space-x-1 text-[10px]"
                    title="Recarregar Prévia"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Recarregar</span>
                  </button>
                )}
                <div className="bg-slate-900 p-0.5 rounded border border-slate-800 flex text-[10px]">
                  <button
                    onClick={() => setPreviewMode('iframe')}
                    className={`px-2 py-0.5 rounded ${previewMode === 'iframe' ? 'bg-amber-400 text-black font-bold' : 'text-slate-400'}`}
                  >
                    Navegador Ao Vivo
                  </button>
                  <button
                    onClick={() => setPreviewMode('image')}
                    className={`px-2 py-0.5 rounded ${previewMode === 'image' ? 'bg-amber-400 text-black font-bold' : 'text-slate-400'}`}
                  >
                    Capa Estática
                  </button>
                </div>
              </div>
            </div>

            {/* Device Container */}
            <div
              className={`transition-all duration-300 bg-slate-900 rounded-lg border border-slate-800 overflow-hidden shadow-2xl flex flex-col ${
                deviceMode === 'desktop'
                  ? 'w-full h-[450px]'
                  : deviceMode === 'tablet'
                  ? 'w-[640px] max-w-full h-[480px]'
                  : 'w-[360px] max-w-full h-[520px]'
              }`}
            >
              {/* Browser Toolbar Bar */}
              <div className="bg-slate-950 px-3 py-2 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
                <div className="flex items-center space-x-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>

                <a
                  href={item.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-[11px] text-emerald-300 font-mono truncate max-w-[280px] sm:max-w-md flex items-center space-x-1.5 transition-colors"
                  title="Clique para abrir no seu navegador"
                >
                  <Globe className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span className="truncate">{item.liveUrl || 'https://siarom.com/demo'}</span>
                  <ExternalLink className="w-3 h-3 text-slate-400 shrink-0 ml-1" />
                </a>

                <div className="text-[10px] text-amber-400 font-bold uppercase hidden sm:block">
                  SIAROM PREVIEW
                </div>
              </div>

              {/* Display Content Container */}
              <div className="relative flex-1 bg-slate-950 overflow-hidden">
                {previewMode === 'iframe' && item.liveUrl ? (
                  <iframe
                    key={iframeKey}
                    src={item.liveUrl}
                    title={item.title}
                    className="w-full h-full border-none bg-white"
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  />
                ) : (
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>

            {/* Banner Quick Link under frame */}
            {item.liveUrl && (
              <div className="w-full mt-3 flex items-center justify-between px-4 py-2 bg-emerald-950/60 border border-emerald-500/40 rounded-lg text-xs font-mono">
                <span className="text-emerald-300 flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Site rodando em produção de alta velocidade.</span>
                </span>
                <a
                  href={item.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-300 hover:text-white font-bold underline flex items-center space-x-1 uppercase text-[11px]"
                >
                  <span>Acessar Site Direto</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}

          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 font-mono">
            
            {/* Left 2 Cols: Overview & Full Specs */}
            <div className="md:col-span-2 space-y-4">
              <div>
                <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block mb-1">
                  Cliente / Marca: {item.clientName}
                </span>
                <h4 className="text-2xl font-bold text-white">
                  {item.title}
                </h4>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {item.fullDescription || item.description}
              </p>

              {/* Technologies */}
              <div>
                <span className="text-xs font-bold text-slate-400 block mb-2">Tecnologias Utilizadas:</span>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-xs text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col: Metrics & CTAs */}
            <div className="space-y-4 bg-slate-950/80 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">
                  Resultados Obtidos:
                </span>

                {item.metrics && item.metrics.length > 0 ? (
                  <div className="space-y-3">
                    {item.metrics.map((m, idx) => (
                      <div key={idx} className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                        <span className="text-[11px] text-slate-400 block">{m.label}</span>
                        <span className="text-lg font-extrabold text-amber-300">{m.value}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400">Desenvolvimento com foco total em conversão e SEO.</p>
                )}
              </div>

              {/* CTA Buttons */}
              <div className="space-y-2 pt-4 border-t border-slate-800">
                {item.liveUrl && (
                  <a
                    href={item.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black font-black text-xs flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20 uppercase transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Abrir Site Na Hora</span>
                  </a>
                )}

                <button
                  onClick={() => {
                    onClose();
                    onOpenQuoteWithCategory(item.category);
                  }}
                  className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-black text-xs flex items-center justify-center space-x-2 uppercase transition-all shadow-lg shadow-amber-500/20"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Quero um site neste estilo</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
