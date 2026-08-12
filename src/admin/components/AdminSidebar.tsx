import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  FolderKanban, 
  FileText, 
  Image, 
  Megaphone, 
  BarChart3, 
  ShieldCheck, 
  Lock, 
  DatabaseBackup, 
  ScrollText, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  ExternalLink,
  Sparkles,
  LogOut
} from 'lucide-react';
import { AdminSection } from '../adminTypes';

interface AdminSidebarProps {
  currentSection: AdminSection;
  onSelectSection: (section: AdminSection) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  onGoToPublicSite: () => void;
  onLogout?: () => void;
  clientsCount?: number;
  projectsCount?: number;
  leadsCount?: number;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentSection,
  onSelectSection,
  collapsed,
  onToggleCollapse,
  onGoToPublicSite,
  onLogout,
  clientsCount = 0,
  projectsCount = 0,
  leadsCount = 0
}) => {
  const navItems: { id: AdminSection; label: string; icon: React.FC<{ className?: string }>; badge?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'clients', label: 'Clientes', icon: Users, badge: clientsCount > 0 ? String(clientsCount) : undefined },
    { id: 'projects', label: 'Projetos', icon: FolderKanban, badge: projectsCount > 0 ? String(projectsCount) : undefined },
    { id: 'content', label: 'Conteúdo (CMS)', icon: FileText },
    { id: 'media', label: 'Biblioteca Mídias', icon: Image },
    { id: 'marketing', label: 'Marketing & Leads', icon: Megaphone, badge: leadsCount > 0 ? String(leadsCount) : undefined },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'users', label: 'Usuários (RBAC)', icon: ShieldCheck },
    { id: 'security', label: 'Segurança & IPs', icon: Lock, badge: 'OK' },
    { id: 'backups', label: 'Backups Cloud', icon: DatabaseBackup },
    { id: 'logs', label: 'Logs Auditoria', icon: ScrollText },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  return (
    <aside 
      className={`bg-neutral-950 border-r border-amber-900/40 h-screen sticky top-0 flex flex-col justify-between transition-all duration-300 font-mono z-30 select-none ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Top Branding Header */}
      <div>
        <div className="p-4 border-b border-amber-900/40 flex items-center justify-between bg-black/60">
          <div className="flex items-center space-x-3 overflow-hidden">
            <div className="w-10 h-10 rounded-lg bg-black border border-amber-500/60 flex items-center justify-center shrink-0 shadow-lg shadow-amber-950/80">
              <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
            </div>
            {!collapsed && (
              <div className="leading-none">
                <span className="font-black text-white tracking-widest text-sm uppercase block">
                  SIAROM<span className="text-amber-400">.ADMIN</span>
                </span>
                <span className="text-[10px] text-amber-500/80 uppercase font-bold tracking-wider">
                  SYS V4.8 SAAS CORE
                </span>
              </div>
            )}
          </div>
          <button
            onClick={onToggleCollapse}
            className="p-1.5 rounded-md bg-neutral-900 hover:bg-amber-950 border border-amber-900/60 text-amber-400 transition-colors shrink-0"
            title={collapsed ? "Expandir Menu" : "Recolher Menu"}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Public Site Switcher Bar */}
        <div className="p-3 border-b border-amber-900/30">
          <button
            onClick={onGoToPublicSite}
            className={`w-full py-2 px-3 rounded-md bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider flex items-center transition-all ${
              collapsed ? 'justify-center' : 'justify-between'
            }`}
          >
            <div className="flex items-center space-x-2">
              <ExternalLink className="w-4 h-4 text-amber-400 shrink-0" />
              {!collapsed && <span>Ir ao Site Público</span>}
            </div>
            {!collapsed && <span className="text-[9px] bg-amber-400 text-black px-1.5 py-0.5 rounded font-black">LIVE</span>}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-2 space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectSection(item.id)}
                className={`w-full flex items-center justify-between p-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 group ${
                  isActive
                    ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20 font-black'
                    : 'text-neutral-400 hover:text-amber-200 hover:bg-neutral-900/90'
                } ${collapsed ? 'justify-center' : ''}`}
                title={collapsed ? item.label : undefined}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-black' : 'text-amber-400 group-hover:scale-110 transition-transform'}`} />
                  {!collapsed && <span>{item.label}</span>}
                </div>
                {!collapsed && item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                    isActive 
                      ? 'bg-black text-amber-400' 
                      : 'bg-neutral-900 text-amber-400 border border-amber-900/60'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer User Info */}
      <div className="p-3 border-t border-amber-900/40 bg-black/60">
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}>
          <div className="flex items-center space-x-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-amber-950 border border-amber-400 flex items-center justify-center shrink-0 font-bold text-amber-400 text-xs">
              AD
            </div>
            {!collapsed && (
              <div className="truncate">
                <span className="text-xs font-bold text-white uppercase block truncate">Admin Siarom</span>
                <span className="text-[9px] text-amber-400 tracking-tight block truncate">ronalldrobert@gmail.com</span>
              </div>
            )}
          </div>
          {!collapsed && (
            <button 
              onClick={onLogout || onGoToPublicSite}
              className="p-1.5 rounded hover:bg-neutral-900 text-neutral-400 hover:text-rose-400 transition-colors ml-1"
              title="Sair da Sessão Admin"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

    </aside>
  );
};
