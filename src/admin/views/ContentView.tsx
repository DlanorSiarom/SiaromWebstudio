import React, { useState } from 'react';
import { 
  FileText, 
  Eye, 
  Globe, 
  Save, 
  Sparkles, 
  X, 
  CheckCircle2, 
  Code, 
  Search, 
  Layers, 
  Share2,
  List
} from 'lucide-react';
import { CMSPage } from '../adminTypes';

interface ContentViewProps {
  cmsPages: CMSPage[];
  onUpdateCMSPage: (page: CMSPage) => void;
  onAddToast: (title: string, type?: 'success' | 'warning' | 'error' | 'info', message?: string) => void;
}

export const ContentView: React.FC<ContentViewProps> = ({
  cmsPages,
  onUpdateCMSPage,
  onAddToast
}) => {
  const [selectedPageId, setSelectedPageId] = useState<string>(cmsPages[0]?.id || 'cms-home');
  const [activeTab, setActiveTab] = useState<'content' | 'seo' | 'robots'>('content');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const selectedPage = cmsPages.find(p => p.id === selectedPageId) || cmsPages[0];

  const [metaTitle, setMetaTitle] = useState(selectedPage.seo.metaTitle);
  const [metaDescription, setMetaDescription] = useState(selectedPage.seo.metaDescription);
  const [keywords, setKeywords] = useState(selectedPage.seo.keywords);
  const [robotsTxt, setRobotsTxt] = useState(`User-agent: *\nAllow: /\nDisallow: /admin/\nSitemap: https://siarom.com.br/sitemap.xml`);

  const handleSelectPage = (page: CMSPage) => {
    setSelectedPageId(page.id);
    setMetaTitle(page.seo.metaTitle);
    setMetaDescription(page.seo.metaDescription);
    setKeywords(page.seo.keywords);
  };

  const handleSavePage = () => {
    const updated: CMSPage = {
      ...selectedPage,
      updatedAt: 'Hoje, ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      lastEditedBy: 'Roberto Siarom',
      seo: {
        ...selectedPage.seo,
        metaTitle,
        metaDescription,
        keywords
      }
    };
    onUpdateCMSPage(updated);
    onAddToast('Página e SEO salvas com sucesso!', 'success');
  };

  return (
    <div className="space-y-6 font-mono pb-12 animate-fadeIn">
      
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-5 rounded-xl bg-black/90 border border-amber-900/50">
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <div className="p-2 rounded bg-amber-950 text-amber-400 border border-amber-800">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white uppercase">Gestão de Conteúdo (CMS) & SEO</h2>
            <p className="text-xs text-neutral-400 font-sans">Edite textos, blocos de páginas, títulos para busca no Google e Open Graph.</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsPreviewOpen(true)}
            className="px-4 py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-amber-900 text-amber-300 font-bold text-xs uppercase tracking-wider flex items-center space-x-2 transition-all"
          >
            <Eye className="w-4 h-4 text-amber-400" />
            <span>Pré-visualizar Ao Vivo</span>
          </button>

          <button
            onClick={handleSavePage}
            className="px-5 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-black text-xs uppercase tracking-wider flex items-center space-x-2 transition-all shadow-lg shadow-amber-500/20"
          >
            <Save className="w-4 h-4" />
            <span>Publicar Alterações</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Pages List */}
        <div className="lg:col-span-4 bg-black/90 rounded-xl border border-amber-900/50 p-4 space-y-3">
          <h3 className="font-bold text-white text-xs uppercase flex items-center space-x-2 pb-3 border-b border-amber-900/40">
            <Layers className="w-4 h-4 text-amber-400" />
            <span>Páginas do Site</span>
          </h3>

          <div className="space-y-1">
            {cmsPages.map(page => (
              <button
                key={page.id}
                onClick={() => handleSelectPage(page)}
                className={`w-full text-left p-3 rounded-lg text-xs font-bold transition-all flex items-center justify-between ${
                  selectedPage.id === page.id
                    ? 'bg-amber-400 text-black shadow-md'
                    : 'bg-neutral-950 text-neutral-300 hover:bg-neutral-900 hover:text-amber-300 border border-amber-900/30'
                }`}
              >
                <div>
                  <div className="uppercase">{page.title}</div>
                  <div className={`text-[10px] font-mono ${selectedPage.id === page.id ? 'text-black/70' : 'text-neutral-500'}`}>
                    /{page.slug}
                  </div>
                </div>
                <span className={`text-[9px] px-1.5 py-0.5 rounded font-extrabold uppercase ${
                  selectedPage.id === page.id ? 'bg-black text-amber-400' : 'bg-neutral-900 text-emerald-400 border border-emerald-900'
                }`}>
                  {page.status}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Editor Workspace */}
        <div className="lg:col-span-8 bg-black/90 rounded-xl border border-amber-900/50 p-6 space-y-6">
          
          {/* Sub Navigation Tabs */}
          <div className="flex border-b border-amber-900/40 space-x-4 text-xs font-bold uppercase">
            <button
              onClick={() => setActiveTab('content')}
              className={`pb-3 border-b-2 transition-colors ${
                activeTab === 'content' ? 'border-amber-400 text-amber-400' : 'border-transparent text-neutral-400 hover:text-white'
              }`}
            >
              Blocos de Conteúdo
            </button>
            <button
              onClick={() => setActiveTab('seo')}
              className={`pb-3 border-b-2 transition-colors ${
                activeTab === 'seo' ? 'border-amber-400 text-amber-400' : 'border-transparent text-neutral-400 hover:text-white'
              }`}
            >
              SEO & Redes Sociais (OG)
            </button>
            <button
              onClick={() => setActiveTab('robots')}
              className={`pb-3 border-b-2 transition-colors ${
                activeTab === 'robots' ? 'border-amber-400 text-amber-400' : 'border-transparent text-neutral-400 hover:text-white'
              }`}
            >
              Sitemap & Robots.txt
            </button>
          </div>

          {/* TAB 1: CONTENT BLOCKS */}
          {activeTab === 'content' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span>Editando: <strong className="text-white uppercase">{selectedPage.title}</strong></span>
                <span>Última edição: {selectedPage.updatedAt}</span>
              </div>

              {selectedPage.contentBlocks.length === 0 ? (
                <div className="p-8 text-center text-xs text-neutral-500 bg-neutral-950 rounded border border-dashed border-amber-900">
                  A página selecionada utiliza renderizador dinâmico de portfólio.
                </div>
              ) : (
                selectedPage.contentBlocks.map((block, idx) => (
                  <div key={block.id} className="p-4 rounded-lg bg-neutral-950 border border-amber-900/40 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-amber-400 uppercase">Bloco #{idx + 1}: {block.sectionName}</span>
                      <span className="text-[10px] text-neutral-500">ID: {block.id}</span>
                    </div>

                    {block.badgeText !== undefined && (
                      <div>
                        <label className="text-[10px] text-neutral-400 block uppercase font-bold mb-1">Texto da Badge de Topo</label>
                        <input
                          type="text"
                          defaultValue={block.badgeText}
                          className="w-full bg-black border border-amber-900/60 rounded px-3 py-2 text-xs text-amber-200"
                        />
                      </div>
                    )}

                    {block.subtitle !== undefined && (
                      <div>
                        <label className="text-[10px] text-neutral-400 block uppercase font-bold mb-1">Título / Subtítulo da Seção</label>
                        <input
                          type="text"
                          defaultValue={block.subtitle}
                          className="w-full bg-black border border-amber-900/60 rounded px-3 py-2 text-xs text-white"
                        />
                      </div>
                    )}

                    {block.bodyText !== undefined && (
                      <div>
                        <label className="text-[10px] text-neutral-400 block uppercase font-bold mb-1">Texto Descritivo / Parágrafo</label>
                        <textarea
                          rows={3}
                          defaultValue={block.bodyText}
                          className="w-full bg-black border border-amber-900/60 rounded p-3 text-xs text-neutral-200 font-sans"
                        />
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 2: SEO & GOOGLE PREVIEW */}
          {activeTab === 'seo' && (
            <div className="space-y-5">
              
              {/* Google Search Result Live Preview Card */}
              <div className="p-4 rounded-lg bg-neutral-950 border border-amber-900/40 space-y-2">
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                  PRÉVIA DO RESULTADO NO GOOGLE SEARCH
                </span>
                <div className="p-3 bg-black rounded border border-neutral-800 space-y-1 font-sans">
                  <div className="text-xs text-neutral-400 flex items-center space-x-1">
                    <Globe className="w-3 h-3 text-emerald-400" />
                    <span>https://siarom.com.br › {selectedPage.slug}</span>
                  </div>
                  <div className="text-sm font-bold text-blue-400 hover:underline cursor-pointer">
                    {metaTitle || 'Título de Busca Siarom'}
                  </div>
                  <div className="text-xs text-neutral-300">
                    {metaDescription || 'Descrição para buscadores no Google.'}
                  </div>
                </div>
              </div>

              {/* Form Inputs */}
              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-amber-400 block mb-1 uppercase">Meta Title (Título na Aba do Navegador & Google)</label>
                  <input
                    type="text"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    className="w-full bg-neutral-950 border border-amber-900/60 rounded px-3 py-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="font-bold text-amber-400 block mb-1 uppercase">Meta Description (Resumo para Google)</label>
                  <textarea
                    rows={3}
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    className="w-full bg-neutral-950 border border-amber-900/60 rounded p-3 text-neutral-200 font-sans text-xs"
                  />
                </div>

                <div>
                  <label className="font-bold text-amber-400 block mb-1 uppercase">Keywords (Separe por vírgula)</label>
                  <input
                    type="text"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    className="w-full bg-neutral-950 border border-amber-900/60 rounded px-3 py-2.5 text-amber-300"
                  />
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: ROBOTS & SITEMAP */}
          {activeTab === 'robots' && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-amber-400 block mb-1 uppercase">Arquivo Robots.txt</label>
                <textarea
                  rows={6}
                  value={robotsTxt}
                  onChange={(e) => setRobotsTxt(e.target.value)}
                  className="w-full bg-black border border-amber-900/60 rounded p-3 text-amber-300 font-mono text-xs"
                />
              </div>

              <div className="p-4 rounded bg-neutral-950 border border-amber-900/40 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block uppercase">Sitemap.xml Gerado</span>
                  <span className="text-[10px] text-neutral-400">Indexação automática de 12 URLs no Google Search Console</span>
                </div>
                <button
                  onClick={() => onAddToast('Sitemap.xml sincronizado com Google', 'success')}
                  className="px-3 py-1.5 rounded bg-amber-400 text-black font-bold uppercase text-[10px]"
                >
                  Regerar
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Live Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-4xl bg-neutral-950 border border-amber-500/50 rounded-2xl overflow-hidden shadow-2xl space-y-4 p-6">
            <div className="flex items-center justify-between pb-3 border-b border-amber-900/40">
              <span className="font-bold text-white uppercase text-xs flex items-center space-x-2">
                <Globe className="w-4 h-4 text-emerald-400" />
                <span>PRÉVA EM TEMPO REAL: https://siarom.com.br/{selectedPage.slug}</span>
              </span>
              <button onClick={() => setIsPreviewOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Simulating site render */}
            <div className="p-8 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-4 font-sans text-slate-100">
              <div className="inline-block px-3 py-1 rounded bg-black border border-amber-500 text-amber-400 font-mono text-xs uppercase">
                {selectedPage.contentBlocks[0]?.badgeText || 'SIAROM PREVIEW ENGINE'}
              </div>
              <h1 className="text-3xl font-black text-white uppercase tracking-tight">
                {selectedPage.contentBlocks[0]?.subtitle || selectedPage.title}
              </h1>
              <p className="text-sm text-slate-300 max-w-xl mx-auto">
                {selectedPage.contentBlocks[0]?.bodyText || selectedPage.seo.metaDescription}
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button onClick={() => setIsPreviewOpen(false)} className="px-5 py-2 rounded bg-amber-400 text-black font-black uppercase text-xs">
                Fechar Prévia
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
