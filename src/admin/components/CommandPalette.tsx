import React, { useState, useEffect } from 'react';
import { Search, X, Users, FolderKanban, FileText, ShieldAlert, Settings, ArrowRight, Command } from 'lucide-react';
import { AdminSection } from '../adminTypes';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSection: (section: AdminSection) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectSection
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const items = [
    { label: 'Dashboard Main Control', category: 'Navegação', section: 'dashboard' as AdminSection, icon: Command },
    { label: 'Gestão de Clientes & Contratos', category: 'Clientes', section: 'clients' as AdminSection, icon: Users },
    { label: 'Projetos e Cronogramas', category: 'Projetos', section: 'projects' as AdminSection, icon: FolderKanban },
    { label: 'CMS & Editor de Conteúdo (SEO)', category: 'Conteúdo', section: 'content' as AdminSection, icon: FileText },
    { label: 'Biblioteca de Mídias', category: 'Arquivos', section: 'media' as AdminSection, icon: FileText },
    { label: 'Marketing, Leads & Pixel', category: 'Marketing', section: 'marketing' as AdminSection, icon: FileText },
    { label: 'Analytics & Relatórios', category: 'Relatórios', section: 'analytics' as AdminSection, icon: FileText },
    { label: 'Usuários & Permissões RBAC', category: 'Segurança', section: 'users' as AdminSection, icon: Users },
    { label: 'Central de Segurança & IPs', category: 'Segurança', section: 'security' as AdminSection, icon: ShieldAlert },
    { label: 'Backups & Snapshots Cloud', category: 'Sistema', section: 'backups' as AdminSection, icon: Settings },
    { label: 'Auditoria Total de Logs', category: 'Sistema', section: 'logs' as AdminSection, icon: ShieldAlert },
    { label: 'Configurações de Sistema & APIs', category: 'Sistema', section: 'settings' as AdminSection, icon: Settings },
  ];

  const filtered = items.filter(i => 
    i.label.toLowerCase().includes(query.toLowerCase()) || 
    i.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-20 px-4 animate-fadeIn">
      <div 
        className="w-full max-w-2xl bg-neutral-950 border border-amber-500/40 rounded-xl shadow-2xl shadow-amber-950/60 overflow-hidden font-mono"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex items-center px-4 py-3.5 border-b border-amber-900/40 bg-black/50">
          <Search className="w-5 h-5 text-amber-400 mr-3 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Digite para buscar clientes, projetos, logs ou páginas (Ctrl+K)..."
            className="w-full bg-transparent text-sm text-amber-100 placeholder-neutral-500 focus:outline-none"
          />
          <button 
            onClick={onClose}
            className="p-1 rounded text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-xs text-neutral-500">
              Nenhum módulo ou registro encontrado para "{query}"
            </div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    onSelectSection(item.section);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-lg text-left hover:bg-amber-950/50 hover:border hover:border-amber-500/40 text-xs text-neutral-300 hover:text-amber-200 transition-all group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-1.5 rounded bg-neutral-900 border border-amber-900/60 text-amber-400 group-hover:bg-amber-400 group-hover:text-black transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-white group-hover:text-amber-300">{item.label}</div>
                      <div className="text-[10px] text-neutral-500 uppercase tracking-wider">{item.category}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-[10px] text-amber-500 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>IR AGORA</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-neutral-900/80 border-t border-amber-900/30 flex items-center justify-between text-[11px] text-neutral-400">
          <div className="flex items-center space-x-3">
            <span><kbd className="px-1.5 py-0.5 rounded bg-black border border-amber-900 text-amber-400 text-[10px]">ESC</kbd> Fechar</span>
            <span><kbd className="px-1.5 py-0.5 rounded bg-black border border-amber-900 text-amber-400 text-[10px]">↵</kbd> Selecionar</span>
          </div>
          <span className="text-amber-500/80 font-bold">SIAROM COMMAND PALETTE v4.8</span>
        </div>
      </div>
    </div>
  );
};
