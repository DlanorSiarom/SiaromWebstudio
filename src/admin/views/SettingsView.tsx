import React, { useState } from 'react';
import { 
  Settings, 
  Save, 
  Globe, 
  Mail, 
  Phone, 
  ShieldCheck, 
  Key, 
  RefreshCw, 
  AlertTriangle,
  Lock,
  Sparkles
} from 'lucide-react';

interface SettingsViewProps {
  onAddToast: (title: string, type?: 'success' | 'warning' | 'error' | 'info', message?: string) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ onAddToast }) => {
  const [companyName, setCompanyName] = useState('Siarom Engenharia Digital');
  const [domain, setDomain] = useState('siarom.com.br');
  const [supportEmail, setSupportEmail] = useState('ronalldrobert@gmail.com');
  const [supportPhone, setSupportPhone] = useState('(11) 98765-4321');
  
  const [smtpHost, setSmtpHost] = useState('smtp.sendgrid.net');
  const [smtpPort, setSmtpPort] = useState('587');
  
  const [cloudflareStatus, setCloudflareStatus] = useState('Proxy Ativo (SSL Ativo)');
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const [apiKey, setApiKey] = useState('sk_siarom_live_9920148100293112');

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onAddToast('Configurações salvas e aplicadas em produção!', 'success');
  };

  const handleClearCache = () => {
    onAddToast('Cache do Cloudflare e Redis limpos!', 'info');
  };

  return (
    <div className="space-y-6 font-mono pb-12 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-5 rounded-xl bg-black/90 border border-amber-900/50">
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <div className="p-2 rounded bg-amber-950 text-amber-400 border border-amber-800">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white uppercase">Configurações Gerais de Sistema</h2>
            <p className="text-xs text-neutral-400 font-sans">Ajuste identidade da empresa, SMTP, Cloudflare, API Keys e Cache.</p>
          </div>
        </div>

        <button
          onClick={handleSaveSettings}
          className="px-5 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-black text-xs uppercase tracking-wider flex items-center space-x-2 transition-all shadow-lg shadow-amber-500/20"
        >
          <Save className="w-4 h-4" />
          <span>Salvar Alterações</span>
        </button>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        
        {/* Company & Domain Info */}
        <div className="p-6 rounded-xl bg-black/90 border border-amber-900/50 space-y-4 text-xs">
          <h3 className="font-bold text-white text-sm uppercase flex items-center space-x-2">
            <Globe className="w-4 h-4 text-amber-400" />
            <span>Identidade do Domínio & Marca</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-amber-400 block mb-1 uppercase">Nome Comercial</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full bg-neutral-950 border border-amber-900/60 rounded px-3 py-2 text-white"
              />
            </div>

            <div>
              <label className="font-bold text-amber-400 block mb-1 uppercase">Domínio Principal</label>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full bg-neutral-950 border border-amber-900/60 rounded px-3 py-2 text-white"
              />
            </div>

            <div>
              <label className="font-bold text-amber-400 block mb-1 uppercase">E-mail de Suporte / Transmissão</label>
              <input
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="w-full bg-neutral-950 border border-amber-900/60 rounded px-3 py-2 text-white"
              />
            </div>

            <div>
              <label className="font-bold text-amber-400 block mb-1 uppercase">WhatsApp / Telefone Corporativo</label>
              <input
                type="text"
                value={supportPhone}
                onChange={(e) => setSupportPhone(e.target.value)}
                className="w-full bg-neutral-950 border border-amber-900/60 rounded px-3 py-2 text-white"
              />
            </div>
          </div>
        </div>

        {/* SMTP E-mail Settings */}
        <div className="p-6 rounded-xl bg-black/90 border border-amber-900/50 space-y-4 text-xs">
          <h3 className="font-bold text-white text-sm uppercase flex items-center space-x-2">
            <Mail className="w-4 h-4 text-amber-400" />
            <span>Servidor SMTP de E-mails Transacionais</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-amber-400 block mb-1 uppercase">Servidor SMTP Host</label>
              <input
                type="text"
                value={smtpHost}
                onChange={(e) => setSmtpHost(e.target.value)}
                className="w-full bg-neutral-950 border border-amber-900/60 rounded px-3 py-2 text-white"
              />
            </div>

            <div>
              <label className="font-bold text-amber-400 block mb-1 uppercase">Porta SMTP</label>
              <input
                type="text"
                value={smtpPort}
                onChange={(e) => setSmtpPort(e.target.value)}
                className="w-full bg-neutral-950 border border-amber-900/60 rounded px-3 py-2 text-white"
              />
            </div>
          </div>
        </div>

        {/* API Keys & Cloudflare */}
        <div className="p-6 rounded-xl bg-black/90 border border-amber-900/50 space-y-4 text-xs">
          <h3 className="font-bold text-white text-sm uppercase flex items-center space-x-2">
            <Key className="w-4 h-4 text-amber-400" />
            <span>Chave de API do Sistema (API Key) & CDN Cloudflare</span>
          </h3>

          <div className="space-y-3">
            <div>
              <label className="font-bold text-amber-400 block mb-1 uppercase">Chave Privada de API</label>
              <div className="flex space-x-2">
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full bg-neutral-950 border border-amber-900/60 rounded px-3 py-2 text-amber-300 font-mono"
                />
                <button
                  type="button"
                  onClick={() => {
                    setApiKey(`sk_siarom_live_${Math.random().toString(36).substring(2)}`);
                    onAddToast('Nova chave de API gerada!', 'warning');
                  }}
                  className="px-3 py-2 bg-neutral-900 border border-amber-900/60 text-amber-400 font-bold uppercase text-[10px]"
                >
                  Regerar
                </button>
              </div>
            </div>

            <div className="p-4 rounded bg-neutral-950 border border-amber-900/40 flex items-center justify-between">
              <div>
                <span className="font-bold text-white block uppercase">Status do Cloudflare DNS</span>
                <span className="text-[10px] text-emerald-400">{cloudflareStatus}</span>
              </div>
              <button
                type="button"
                onClick={handleClearCache}
                className="px-4 py-2 bg-amber-400 text-black font-bold uppercase text-xs flex items-center space-x-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Limpar Cache Cloud</span>
              </button>
            </div>
          </div>
        </div>

        {/* Maintenance Mode Toggle */}
        <div className="p-6 rounded-xl bg-black/90 border border-amber-900/50 flex items-center justify-between text-xs">
          <div>
            <h4 className="font-bold text-white uppercase text-sm">Modo de Manutenção do Site Público</h4>
            <p className="text-neutral-400 font-sans">Se ativado, visitantes verão uma tela de manutenção enquanto administradores continuam com acesso total.</p>
          </div>

          <button
            type="button"
            onClick={() => {
              setMaintenanceMode(!maintenanceMode);
              onAddToast(`Modo manutenção ${!maintenanceMode ? 'ATIVADO' : 'DESATIVADO'}`, !maintenanceMode ? 'warning' : 'success');
            }}
            className={`px-4 py-2.5 rounded font-black uppercase text-xs transition-colors ${
              maintenanceMode ? 'bg-rose-600 text-white' : 'bg-neutral-900 text-neutral-400 border border-neutral-800'
            }`}
          >
            {maintenanceMode ? 'MODO MANUTENÇÃO ATIVO' : 'SITE ATIVO (NORMAL)'}
          </button>
        </div>

      </form>

    </div>
  );
};
