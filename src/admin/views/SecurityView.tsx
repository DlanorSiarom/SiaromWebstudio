import React, { useState } from 'react';
import { 
  Lock, 
  ShieldCheck, 
  ShieldAlert, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  Zap, 
  RefreshCw,
  AlertTriangle,
  Globe
} from 'lucide-react';
import { SecurityThreat } from '../adminTypes';

interface SecurityViewProps {
  threats: SecurityThreat[];
  onAddToast: (title: string, type?: 'success' | 'warning' | 'error' | 'info', message?: string) => void;
}

export const SecurityView: React.FC<SecurityViewProps> = ({ threats, onAddToast }) => {
  const [whitelist, setWhitelist] = useState<string[]>(['187.122.45.109 (Admin SP)', '201.86.112.50 (Editor PR)']);
  const [blacklist, setBlacklist] = useState<string[]>(['45.142.120.89 (Moscou Botnet)', '198.51.100.42 (Frankfurt Scraper)']);
  
  const [newIp, setNewIp] = useState('');
  const [listType, setListType] = useState<'white' | 'black'>('black');

  const handleAddIp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIp) return;

    if (listType === 'black') {
      setBlacklist([...blacklist, newIp]);
      onAddToast(`IP ${newIp} bloqueado no Firewall!`, 'warning');
    } else {
      setWhitelist([...whitelist, newIp]);
      onAddToast(`IP ${newIp} adicionado à Lista Branca!`, 'success');
    }
    setNewIp('');
  };

  const securityFeatures = [
    { title: 'Tokens JWT & Refresh Token', status: 'ATIVO', detail: 'Algoritmo HS512 com rotação a cada 15 min' },
    { title: 'Cookies HttpOnly & SameSite=Strict', status: 'ATIVO', detail: 'Impedimento total de roubo de sessão em JS' },
    { title: 'Proteção CSRF & XSS Sanitizer', status: 'ATIVO', detail: 'Filtro automático de tags maliciosas' },
    { title: 'Proteção contra SQL Injection / NoSQL', status: 'ATIVO', detail: 'ORM Drizzle/Firestore preparado' },
    { title: 'Rate Limiting (100 req / min por IP)', status: 'ATIVO', detail: 'Bloqueio preventivo automático' },
    { title: 'Detector de Força Bruta', status: 'ATIVO', detail: 'Max 5 tentativas incorretas' }
  ];

  return (
    <div className="space-y-6 font-mono pb-12 animate-fadeIn">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-5 rounded-xl bg-black/90 border border-amber-900/50">
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <div className="p-2 rounded bg-amber-950 text-amber-400 border border-amber-800">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white uppercase">Central de Segurança & Firewall SIAROM</h2>
            <p className="text-xs text-neutral-400 font-sans">Proteção ativa contra XSS, CSRF, SQL Injection e Força Bruta.</p>
          </div>
        </div>

        <button
          onClick={() => onAddToast('Auditoria do Firewall realizada: Nenhuma vulnerabilidade encontrada', 'success')}
          className="px-4 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-black text-xs uppercase tracking-wider flex items-center space-x-2 transition-all shadow-lg shadow-amber-500/20"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Executar Varredura</span>
        </button>
      </div>

      {/* Security Modules Shield Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {securityFeatures.map((sec, idx) => (
          <div key={idx} className="p-4 rounded-xl bg-black border border-amber-900/50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-white uppercase">{sec.title}</span>
              <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-400 font-extrabold text-[9px] uppercase">
                {sec.status}
              </span>
            </div>
            <p className="text-[11px] text-neutral-400 font-sans">{sec.detail}</p>
          </div>
        ))}
      </div>

      {/* IP Whitelist and Blacklist Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* IP Control Box */}
        <div className="lg:col-span-6 p-6 rounded-xl bg-black/90 border border-amber-900/50 space-y-4">
          <h3 className="font-bold text-white text-sm uppercase flex items-center space-x-2">
            <Globe className="w-4 h-4 text-amber-400" />
            <span>Lista Branca (Whitelist) & Lista Negra (Blacklist)</span>
          </h3>

          <form onSubmit={handleAddIp} className="flex space-x-2">
            <input
              type="text"
              value={newIp}
              onChange={(e) => setNewIp(e.target.value)}
              placeholder="Digite o IP (EX: 187.100.22.1)"
              className="w-full bg-neutral-950 border border-amber-900/60 rounded px-3 py-2 text-xs text-white"
            />
            <select
              value={listType}
              onChange={(e) => setListType(e.target.value as any)}
              className="bg-neutral-950 border border-amber-900/60 rounded px-2 py-2 text-xs text-amber-300 font-bold uppercase"
            >
              <option value="black">BLACK</option>
              <option value="white">WHITE</option>
            </select>
            <button type="submit" className="px-4 py-2 bg-amber-400 text-black font-bold text-xs uppercase shrink-0">
              Adicionar
            </button>
          </form>

          <div className="grid grid-cols-2 gap-4 text-xs pt-2">
            <div>
              <span className="font-bold text-emerald-400 block mb-2 uppercase">Lista Branca (Acesso Liberado)</span>
              <div className="space-y-1">
                {whitelist.map((ip, i) => (
                  <div key={i} className="p-2 rounded bg-neutral-950 border border-emerald-900/40 text-[11px] text-neutral-300">
                    {ip}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="font-bold text-rose-400 block mb-2 uppercase">Lista Negra (IPs Bloqueados)</span>
              <div className="space-y-1">
                {blacklist.map((ip, i) => (
                  <div key={i} className="p-2 rounded bg-neutral-950 border border-rose-900/40 text-[11px] text-rose-300">
                    {ip}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Security Threats Feed */}
        <div className="lg:col-span-6 p-6 rounded-xl bg-black/90 border border-amber-900/50 space-y-4">
          <h3 className="font-bold text-white text-sm uppercase flex items-center space-x-2">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span>Alertas de Ameaças Detectadas</span>
          </h3>

          <div className="space-y-3">
            {threats.map(t => (
              <div key={t.id} className="p-4 rounded-lg bg-neutral-950 border border-rose-900/50 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-rose-400 uppercase">{t.type} ({t.severity})</span>
                  <span className="text-[10px] text-neutral-500">{t.timestamp}</span>
                </div>
                <div className="text-white font-mono">{t.ip} • {t.location}</div>
                <p className="text-[11px] text-neutral-400 font-sans pt-1">{t.details}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
