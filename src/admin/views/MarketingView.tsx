import React, { useState } from 'react';
import { 
  Megaphone, 
  UserPlus, 
  Sparkles, 
  Code, 
  Send, 
  CheckCircle2, 
  TrendingUp, 
  Target,
  DollarSign,
  Plus
} from 'lucide-react';
import { MarketingCampaign, LeadItem } from '../adminTypes';

interface MarketingViewProps {
  campaigns: MarketingCampaign[];
  leads: LeadItem[];
  onUpdateLeadStatus: (id: string, status: LeadItem['status']) => void;
  onAddToast: (title: string, type?: 'success' | 'warning' | 'error' | 'info', message?: string) => void;
}

export const MarketingView: React.FC<MarketingViewProps> = ({
  campaigns,
  leads,
  onUpdateLeadStatus,
  onAddToast
}) => {
  const [metaPixelId, setMetaPixelId] = useState('PX-992014811');
  const [googleAdsId, setGoogleAdsId] = useState('AW-104928112');
  const [gtmContainerId, setGtmContainerId] = useState('GTM-SIAROM88');

  const [newsletterSubject, setNewsletterSubject] = useState('');
  const [newsletterBody, setNewsletterBody] = useState('');

  const handleSendNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterSubject || !newsletterBody) {
      onAddToast('Preencha assunto e mensagem', 'warning');
      return;
    }
    onAddToast('Disparo de Newsletter enviado para 112 assinantes!', 'success');
    setNewsletterSubject('');
    setNewsletterBody('');
  };

  const handleSavePixels = () => {
    onAddToast('Pixels de rastreamento salvos e validados com sucesso!', 'success');
  };

  return (
    <div className="space-y-6 font-mono pb-12 animate-fadeIn">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-5 rounded-xl bg-black/90 border border-amber-900/50">
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <div className="p-2 rounded bg-amber-950 text-amber-400 border border-amber-800">
            <Megaphone className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white uppercase">Marketing, Tracking & Leads</h2>
            <p className="text-xs text-neutral-400 font-sans">Gestão de campanhas, pixel Meta, Google Ads e novos leads.</p>
          </div>
        </div>

        <button
          onClick={handleSavePixels}
          className="px-4 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-black text-xs uppercase tracking-wider flex items-center space-x-2 transition-all shadow-lg shadow-amber-500/20"
        >
          <Code className="w-4 h-4" />
          <span>Salvar Pixels & GTM</span>
        </button>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {campaigns.map(c => (
          <div key={c.id} className="p-5 rounded-xl bg-black border border-amber-900/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded bg-amber-950 border border-amber-800 text-[10px] text-amber-400 font-bold uppercase">
                {c.type}
              </span>
              <span className="text-[10px] text-emerald-400 font-bold uppercase">{c.status}</span>
            </div>

            <h4 className="font-bold text-xs text-white uppercase">{c.title}</h4>

            <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-amber-900/30">
              <div>
                <span className="text-neutral-500 block uppercase text-[9px]">Leads</span>
                <span className="text-amber-400 font-bold text-sm">{c.leadsGenerated}</span>
              </div>
              <div>
                <span className="text-neutral-500 block uppercase text-[9px]">Conversão</span>
                <span className="text-emerald-400 font-bold text-sm">{c.conversionRate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pixels & Script Manager */}
      <div className="p-6 rounded-xl bg-black/90 border border-amber-900/50 space-y-4">
        <h3 className="font-bold text-white text-sm uppercase flex items-center space-x-2">
          <Code className="w-4 h-4 text-amber-400" />
          <span>Configuração de Tracking Pixels & Google Tag Manager</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="font-bold text-amber-400 block mb-1 uppercase">Meta Pixel ID (Facebook / Instagram)</label>
            <input
              type="text"
              value={metaPixelId}
              onChange={(e) => setMetaPixelId(e.target.value)}
              className="w-full bg-neutral-950 border border-amber-900/60 rounded px-3 py-2 text-white font-mono"
            />
          </div>

          <div>
            <label className="font-bold text-amber-400 block mb-1 uppercase">Google Ads Conversion ID</label>
            <input
              type="text"
              value={googleAdsId}
              onChange={(e) => setGoogleAdsId(e.target.value)}
              className="w-full bg-neutral-950 border border-amber-900/60 rounded px-3 py-2 text-white font-mono"
            />
          </div>

          <div>
            <label className="font-bold text-amber-400 block mb-1 uppercase">Google Tag Manager (GTM)</label>
            <input
              type="text"
              value={gtmContainerId}
              onChange={(e) => setGtmContainerId(e.target.value)}
              className="w-full bg-neutral-950 border border-amber-900/60 rounded px-3 py-2 text-white font-mono"
            />
          </div>
        </div>
      </div>

      {/* Leads Management Table */}
      <div className="bg-black/90 rounded-xl border border-amber-900/50 overflow-hidden shadow-2xl space-y-4 p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-white text-sm uppercase flex items-center space-x-2">
            <UserPlus className="w-4 h-4 text-amber-400" />
            <span>Rastreamento de Leads em Tempo Real</span>
          </h3>
          <span className="text-xs text-amber-400 font-bold">{leads.length} LEADS REGISTRADOS</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-950 border-b border-amber-900/40 text-amber-400 uppercase text-[10px]">
              <tr>
                <th className="p-3">Nome / Lead</th>
                <th className="p-3">Contato</th>
                <th className="p-3">Origem</th>
                <th className="p-3">Data</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-900/30">
              {leads.map(lead => (
                <tr key={lead.id} className="hover:bg-neutral-900/60">
                  <td className="p-3 font-bold text-white uppercase">{lead.name}</td>
                  <td className="p-3 text-neutral-300">
                    <div>{lead.email}</div>
                    <div className="text-[10px] text-neutral-500">{lead.phone}</div>
                  </td>
                  <td className="p-3 text-amber-300">{lead.source}</td>
                  <td className="p-3 text-neutral-400">{lead.date}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-400 font-bold uppercase text-[10px] border border-amber-800">
                      {lead.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <select
                      value={lead.status}
                      onChange={(e) => {
                        onUpdateLeadStatus(lead.id, e.target.value as any);
                        onAddToast('Status do lead alterado', 'info');
                      }}
                      className="bg-neutral-900 border border-amber-900/60 rounded px-2 py-1 text-[10px] text-amber-300 uppercase font-bold"
                    >
                      <option value="novo">NOVO</option>
                      <option value="em_contato">EM CONTATO</option>
                      <option value="qualificado">QUALIFICADO</option>
                      <option value="convertido">CONVERTIDO</option>
                      <option value="perdido">PERDIDO</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Newsletter Dispatcher */}
      <div className="p-6 rounded-xl bg-black/90 border border-amber-900/50 space-y-4">
        <h3 className="font-bold text-white text-sm uppercase flex items-center space-x-2">
          <Send className="w-4 h-4 text-amber-400" />
          <span>Disparador de Newsletter para Assinantes (112 inscritos)</span>
        </h3>

        <form onSubmit={handleSendNewsletter} className="space-y-3 text-xs">
          <div>
            <label className="font-bold text-amber-400 block mb-1 uppercase">Assunto do E-mail</label>
            <input
              type="text"
              value={newsletterSubject}
              onChange={(e) => setNewsletterSubject(e.target.value)}
              placeholder="EX: NOVIDADES SIAROM // LANÇAMENTO DE NOVOS SITES"
              className="w-full bg-neutral-950 border border-amber-900/60 rounded px-3 py-2 text-white"
            />
          </div>

          <div>
            <label className="font-bold text-amber-400 block mb-1 uppercase">Corpo da Mensagem</label>
            <textarea
              rows={4}
              value={newsletterBody}
              onChange={(e) => setNewsletterBody(e.target.value)}
              placeholder="Escreva a transmissão para os clientes..."
              className="w-full bg-neutral-950 border border-amber-900/60 rounded p-3 text-white font-sans text-xs"
            />
          </div>

          <div className="flex justify-end">
            <button type="submit" className="px-5 py-2.5 rounded bg-amber-400 text-black font-black uppercase text-xs">
              Disparar Transmissão
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};
