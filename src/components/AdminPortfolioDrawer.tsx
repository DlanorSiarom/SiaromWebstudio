import React, { useState } from 'react';
import { PortfolioItem } from '../types';
import { X, PlusCircle, Trash2, Check, Link as LinkIcon, Image, Tag, Terminal } from 'lucide-react';

interface AdminPortfolioDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPortfolioItem: (newItem: PortfolioItem) => void;
  customItems: PortfolioItem[];
  onRemoveCustomItem: (id: string) => void;
}

export const AdminPortfolioDrawer: React.FC<AdminPortfolioDrawerProps> = ({
  isOpen,
  onClose,
  onAddPortfolioItem,
  customItems,
  onRemoveCustomItem,
}) => {
  const [title, setTitle] = useState('');
  const [clientName, setClientName] = useState('');
  const [category, setCategory] = useState<'Landing Page' | 'E-commerce' | 'Institucional' | 'Sistema Web' | 'Portfólio & Blog'>('Institucional');
  const [liveUrl, setLiveUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('React, Tailwind CSS, SEO');
  const [metricLabel, setMetricLabel] = useState('Resultado');
  const [metricValue, setMetricValue] = useState('+100% Conversão');

  const [successMsg, setSuccessMsg] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !clientName) return;

    const finalImage = imageUrl.trim() || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop';
    const parsedTags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);

    const newItem: PortfolioItem = {
      id: 'custom_' + Date.now(),
      title,
      clientName,
      category,
      description: description || 'Site de alta performance desenvolvido sob medida pela Siarom.',
      fullDescription: description || 'Desenvolvimento completo de plataforma web para a empresa ' + clientName + '. Inclui design responsivo, otimização SEO e alta velocidade.',
      image: finalImage,
      liveUrl: liveUrl.startsWith('http') ? liveUrl : liveUrl ? `https://${liveUrl}` : '',
      tags: parsedTags.length > 0 ? parsedTags : ['Siarom Web', 'SEO', 'Mobile First'],
      year: new Date().getFullYear().toString(),
      isCustomAdded: true,
      metrics: metricValue ? [{ label: metricLabel, value: metricValue }] : undefined
    };

    onAddPortfolioItem(newItem);
    setSuccessMsg(true);

    // Reset Form
    setTitle('');
    setClientName('');
    setLiveUrl('');
    setImageUrl('');
    setDescription('');

    setTimeout(() => setSuccessMsg(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md font-mono">
      <div
        className="w-full max-w-xl bg-neutral-950 border-l border-amber-900/60 h-full p-6 sm:p-8 overflow-y-auto flex flex-col justify-between text-neutral-100 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-amber-900/40">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded bg-amber-400 flex items-center justify-center text-black font-black">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-white text-base uppercase">PAINEL SIAROM // ADICIONAR SITE</h3>
                <p className="text-[10px] text-amber-400/80">CADASTRAR LINK DE PROJETO NO PORTFÓLIO</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded bg-neutral-900 hover:bg-neutral-800 text-amber-400 border border-amber-900"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {successMsg && (
            <div className="mt-4 p-3 rounded bg-amber-950 border border-amber-500/80 text-amber-300 text-xs font-bold flex items-center space-x-2 uppercase">
              <Check className="w-4 h-4 text-amber-400" />
              <span>Novo site registrado com sucesso no portfólio!</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-xs">
            
            <div>
              <label className="font-bold text-amber-400 block mb-1 uppercase">TÍTULO DO PROJETO / SITE:</label>
              <input
                type="text"
                required
                placeholder="EX: MENDONÇA ADVOCACIA | PORTAL JURÍDICO"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-black border border-amber-900/60 rounded px-3.5 py-2.5 text-amber-200 focus:outline-none focus:border-amber-400 uppercase"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-amber-400 block mb-1 uppercase">NOME DO CLIENTE:</label>
                <input
                  type="text"
                  required
                  placeholder="EX: DRA. CAMILA MENDONÇA"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-black border border-amber-900/60 rounded px-3.5 py-2.5 text-amber-200 focus:outline-none focus:border-amber-400 uppercase"
                />
              </div>

              <div>
                <label className="font-bold text-amber-400 block mb-1 uppercase">CATEGORIA:</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-black border border-amber-900/60 rounded px-3.5 py-2.5 text-amber-200 focus:outline-none focus:border-amber-400 uppercase"
                >
                  <option value="Landing Page">Landing Page</option>
                  <option value="Institucional">Institucional</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="Sistema Web">Sistema Web</option>
                  <option value="Portfólio & Blog">Portfólio & Blog</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-bold text-amber-400 block mb-1 uppercase">LINK DO SITE NO AR (URL):</label>
              <div className="relative">
                <LinkIcon className="w-4 h-4 text-amber-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="https://exemplo.com.br"
                  value={liveUrl}
                  onChange={(e) => setLiveUrl(e.target.value)}
                  className="w-full bg-black border border-amber-900/60 rounded pl-9 pr-3.5 py-2.5 text-amber-200 focus:outline-none focus:border-amber-400 uppercase font-sans text-xs"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-amber-400 block mb-1 uppercase">URL DA IMAGEM DE CAPA:</label>
              <div className="relative">
                <Image className="w-4 h-4 text-amber-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full bg-black border border-amber-900/60 rounded pl-9 pr-3.5 py-2.5 text-amber-200 focus:outline-none focus:border-amber-400 font-sans text-xs"
                />
              </div>
              <span className="text-[10px] text-neutral-500 mt-1 block uppercase">SE DEIXAR EM BRANCO, USARÁ UM PRINT DE DEMONSTRAÇÃO.</span>
            </div>

            <div>
              <label className="font-bold text-amber-400 block mb-1 uppercase">DESCRIÇÃO BREVE DO PROJETO:</label>
              <textarea
                rows={2}
                placeholder="Explique o que foi feito no site..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-black border border-amber-900/60 rounded p-3 text-amber-200 focus:outline-none focus:border-amber-400 font-sans"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-amber-400 block mb-1 uppercase">MÉTRICA (LABEL):</label>
                <input
                  type="text"
                  placeholder="EX: AUMENTO DE CONTATOS"
                  value={metricLabel}
                  onChange={(e) => setMetricLabel(e.target.value)}
                  className="w-full bg-black border border-amber-900/60 rounded px-3 py-2 text-amber-200 focus:outline-none uppercase"
                />
              </div>

              <div>
                <label className="font-bold text-amber-400 block mb-1 uppercase">VALOR DA MÉTRICA:</label>
                <input
                  type="text"
                  placeholder="EX: +85%"
                  value={metricValue}
                  onChange={(e) => setMetricValue(e.target.value)}
                  className="w-full bg-black border border-amber-900/60 rounded px-3 py-2 text-amber-200 focus:outline-none uppercase"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-amber-400 block mb-1 uppercase">TAGS (SEPARADAS POR VÍRGULA):</label>
              <input
                type="text"
                placeholder="React, Next.js, SEO, WhatsApp"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full bg-black border border-amber-900/60 rounded px-3.5 py-2.5 text-amber-200 focus:outline-none focus:border-amber-400 uppercase"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded bg-amber-400 hover:bg-amber-300 font-black text-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all"
            >
              Publicar Site no Portfólio
            </button>
          </form>

          {/* List of Custom Items Added */}
          {customItems.length > 0 && (
            <div className="mt-8 pt-6 border-t border-amber-900/40">
              <h4 className="font-bold text-xs text-amber-400 mb-3 uppercase">
                SITES ADICIONADOS MANUALMENTE ({customItems.length}):
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {customItems.map((c) => (
                  <div
                    key={c.id}
                    className="p-3 rounded bg-black border border-amber-900/40 flex items-center justify-between text-xs"
                  >
                    <div className="truncate max-w-[240px]">
                      <span className="font-bold text-white block truncate uppercase">{c.title}</span>
                      <span className="text-[10px] text-neutral-400 uppercase">{c.category} • {c.clientName}</span>
                    </div>

                    <button
                      onClick={() => onRemoveCustomItem(c.id)}
                      className="p-1.5 rounded bg-amber-950/60 hover:bg-amber-900 text-amber-400 border border-amber-800"
                      title="Excluir este site"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        <div className="pt-6 border-t border-amber-900/30 text-[10px] text-neutral-500 text-center uppercase">
          SISTEMA SIAROM // REGISTRO LOCAL DE PORTFÓLIO
        </div>
      </div>
    </div>
  );
};

