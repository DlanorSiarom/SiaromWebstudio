import React, { useState } from 'react';
import { 
  ScrollText, 
  Search, 
  Filter, 
  ShieldAlert, 
  Info, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle,
  Download
} from 'lucide-react';
import { SystemLog } from '../adminTypes';

interface LogsViewProps {
  logs: SystemLog[];
  onAddToast: (title: string, type?: 'success' | 'warning' | 'error' | 'info', message?: string) => void;
}

export const LogsView: React.FC<LogsViewProps> = ({ logs, onAddToast }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('todos');

  const filtered = logs.filter(l => {
    const matchesSearch = l.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          l.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          l.ip.includes(searchTerm);
    const matchesSeverity = severityFilter === 'todos' || l.severity === severityFilter;
    return matchesSearch && matchesSeverity;
  });

  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case 'critical':
      case 'error':
        return <span className="px-2 py-0.5 rounded bg-rose-950 border border-rose-800 text-rose-300 font-bold text-[10px] uppercase">ERRO</span>;
      case 'warning':
        return <span className="px-2 py-0.5 rounded bg-amber-950 border border-amber-800 text-amber-300 font-bold text-[10px] uppercase">ALERTA</span>;
      default:
        return <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 font-bold text-[10px] uppercase">INFO</span>;
    }
  };

  const handleExportLogs = () => {
    onAddToast('Arquivo de logs exportado para auditoria (TXT/JSON)', 'success');
  };

  return (
    <div className="space-y-6 font-mono pb-12 animate-fadeIn">
      
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-5 rounded-xl bg-black/90 border border-amber-900/50">
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <div className="p-2 rounded bg-amber-950 text-amber-400 border border-amber-800">
            <ScrollText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white uppercase">Auditoria Total de Logs do Sistema</h2>
            <p className="text-xs text-neutral-400 font-sans">Histórico imutável de logins, edições, uploads e alterações de segurança.</p>
          </div>
        </div>

        <button
          onClick={handleExportLogs}
          className="px-4 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-black text-xs uppercase tracking-wider flex items-center space-x-2 transition-all shadow-lg shadow-amber-500/20"
        >
          <Download className="w-4 h-4" />
          <span>Exportar Logs</span>
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-8 relative">
          <Search className="w-4 h-4 text-amber-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquisar logs por usuário, IP ou descrição técnica..."
            className="w-full bg-neutral-950 border border-amber-900/60 rounded-lg pl-10 pr-4 py-2.5 text-xs text-white"
          />
        </div>

        <div className="md:col-span-4">
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="w-full bg-neutral-950 border border-amber-900/60 rounded-lg px-3 py-2.5 text-xs text-amber-300 font-bold uppercase"
          >
            <option value="todos">Todas as Severidades</option>
            <option value="info">Apenas Info</option>
            <option value="warning">Apenas Alertas</option>
            <option value="error">Apenas Erros / Crítico</option>
          </select>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-black/90 rounded-xl border border-amber-900/50 overflow-hidden shadow-2xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-neutral-950 border-b border-amber-900/40 text-amber-400 uppercase text-[10px]">
            <tr>
              <th className="p-3">Data / Hora</th>
              <th className="p-3">Ação</th>
              <th className="p-3">Usuário</th>
              <th className="p-3">Descrição Detalhada</th>
              <th className="p-3">IP / Browser / OS</th>
              <th className="p-3">Gravidade</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-amber-900/30">
            {filtered.map(log => (
              <tr key={log.id} className="hover:bg-neutral-900/60">
                <td className="p-3 text-neutral-400 font-mono text-[11px] shrink-0">{log.timestamp}</td>
                <td className="p-3 font-bold text-amber-400 uppercase">{log.actionType}</td>
                <td className="p-3 text-white font-bold">{log.userName}</td>
                <td className="p-3 text-neutral-200 font-sans max-w-md">{log.description}</td>
                <td className="p-3 text-neutral-400 text-[10px] font-mono">
                  <div>{log.ip} ({log.location})</div>
                  <div className="text-neutral-500">{log.browser} • {log.os}</div>
                </td>
                <td className="p-3">{getSeverityBadge(log.severity)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
