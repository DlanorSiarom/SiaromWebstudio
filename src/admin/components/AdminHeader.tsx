import React from 'react';
import { 
  Search, 
  Bell, 
  ShieldCheck, 
  Server, 
  ExternalLink, 
  Moon, 
  Sun,
  Plus
} from 'lucide-react';
import { AdminSection } from '../adminTypes';

interface AdminHeaderProps {
  currentSection: AdminSection;
  onOpenCommandPalette: () => void;
  onOpenNotifications: () => void;
  unreadNotificationsCount: number;
  onGoToPublicSite: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onQuickAction: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  currentSection,
  onOpenCommandPalette,
  onOpenNotifications,
  unreadNotificationsCount,
  onGoToPublicSite,
  darkMode,
  onToggleDarkMode,
  onQuickAction
}) => {
  const getSectionTitle = (sec: AdminSection) => {
    switch (sec) {
      case 'dashboard': return 'Dashboard Main Control';
      case 'clients': return 'Gestão de Clientes & Contratos';
      case 'projects': return 'Projetos & Cronogramas';
      case 'content': return 'CMS & Editor de Páginas';
      case 'media': return 'Biblioteca de Mídias & Arquivos';
      case 'marketing': return 'Marketing, Leads & Tracking';
      case 'analytics': return 'Analytics & Relatórios';
      case 'users': return 'Gestão de Usuários & RBAC';
      case 'security': return 'Central de Segurança & Firewall';
      case 'backups': return 'Backups & Snapshots Cloud';
      case 'logs': return 'Auditoria de Logs do Sistema';
      case 'settings': return 'Configurações de Sistema & APIs';
      default: return 'Painel Administrativo';
    }
  };

  return (
    <header className="sticky top-0 z-20 bg-black/80 backdrop-blur-md border-b border-amber-900/40 px-6 py-3.5 flex items-center justify-between font-mono">
      
      {/* Left Title & Breadcrumb */}
      <div className="flex items-center space-x-3">
        <div className="text-xs text-neutral-400 flex items-center space-x-1.5">
          <span>Siarom Admin</span>
          <span>/</span>
          <span className="text-amber-400 font-bold uppercase">{currentSection}</span>
        </div>
        <h1 className="text-base font-black text-white uppercase tracking-wider hidden sm:block">
          {getSectionTitle(currentSection)}
        </h1>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-3">

        {/* Live Server Indicator Badge */}
        <div className="hidden lg:flex items-center space-x-2 px-3 py-1 rounded bg-neutral-950 border border-emerald-900/60 text-[11px] font-bold text-emerald-400 uppercase">
          <Server className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>SERVIDORES OK • 12ms</span>
        </div>

        {/* Global Search Button */}
        <button
          onClick={onOpenCommandPalette}
          className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-amber-900/60 text-xs text-neutral-300 hover:text-amber-300 transition-all"
          title="Abrir Pesquisa (Ctrl + K)"
        >
          <Search className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden md:inline">Pesquisar...</span>
          <kbd className="hidden md:inline-block px-1.5 py-0.5 rounded bg-black border border-amber-900/60 text-[10px] text-amber-400">
            Ctrl+K
          </kbd>
        </button>

        {/* Quick Action Button */}
        <button
          onClick={onQuickAction}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black text-xs font-black uppercase tracking-wider transition-all shadow-md shadow-amber-500/20 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Nova Ação</span>
        </button>

        {/* Notifications Drawer Bell */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-amber-900/60 text-amber-400 transition-colors"
          title="Notificações"
        >
          <Bell className="w-4 h-4" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-black font-extrabold text-[9px] flex items-center justify-center animate-bounce">
              {unreadNotificationsCount}
            </span>
          )}
        </button>

        {/* Theme Toggle */}
        <button
          onClick={onToggleDarkMode}
          className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-amber-900/60 text-amber-400 transition-colors hidden sm:block"
          title={darkMode ? "Ativar Modo Claro" : "Ativar Modo Escuro"}
        >
          {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Return to Public Website */}
        <button
          onClick={onGoToPublicSite}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-amber-950 border border-amber-700/60 text-amber-400 text-xs font-bold uppercase transition-all"
          title="Sair para o Site Público"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Ver Site</span>
        </button>

      </div>

    </header>
  );
};
