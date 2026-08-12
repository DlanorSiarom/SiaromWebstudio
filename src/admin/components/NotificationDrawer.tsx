import React from 'react';
import { X, Bell, ShieldAlert, CheckCircle2, UserPlus, FolderKanban, Trash2 } from 'lucide-react';
import { NotificationItem } from '../adminTypes';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  onClearAll: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead,
  onClearAll
}) => {
  if (!isOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'security': return <ShieldAlert className="w-4 h-4 text-rose-400" />;
      case 'lead': return <UserPlus className="w-4 h-4 text-amber-400" />;
      case 'backup': return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case 'project': return <FolderKanban className="w-4 h-4 text-cyan-400" />;
      default: return <Bell className="w-4 h-4 text-amber-400" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end animate-fadeIn font-mono">
      <div 
        className="w-full max-w-md bg-neutral-950 border-l border-amber-500/40 h-full flex flex-col justify-between shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div>
          <div className="p-5 border-b border-amber-900/40 flex items-center justify-between bg-black/60">
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-white uppercase text-sm">Central de Notificações</h3>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500 text-black">
                  {unreadCount} NOVAS
                </span>
              )}
            </div>
            <button 
              onClick={onClose}
              className="p-1 rounded text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Action Bar */}
          <div className="px-5 py-2.5 bg-neutral-900/60 border-b border-amber-900/30 flex items-center justify-between text-[11px]">
            <button 
              onClick={onMarkAllRead}
              className="text-amber-400 hover:underline uppercase font-bold"
            >
              Marcar lidas
            </button>
            <button 
              onClick={onClearAll}
              className="text-neutral-400 hover:text-rose-400 flex items-center space-x-1 uppercase"
            >
              <Trash2 className="w-3 h-3" />
              <span>Limpar tudo</span>
            </button>
          </div>

          {/* List */}
          <div className="max-h-[calc(100vh-140px)] overflow-y-auto p-4 space-y-3">
            {notifications.length === 0 ? (
              <div className="text-center py-12 text-xs text-neutral-500">
                Nenhuma notificação pendente no momento.
              </div>
            ) : (
              notifications.map((n) => (
                <div 
                  key={n.id}
                  className={`p-4 rounded-lg border transition-all ${
                    n.read 
                      ? 'bg-neutral-950 border-neutral-900 opacity-70' 
                      : 'bg-amber-950/20 border-amber-500/50 shadow-md'
                  }`}
                >
                  <div className="flex items-start justify-between mb-1.5">
                    <div className="flex items-center space-x-2">
                      <div className="p-1 rounded bg-black border border-amber-900">
                        {getIcon(n.type)}
                      </div>
                      <span className="font-bold text-xs text-white uppercase">{n.title}</span>
                    </div>
                    <span className="text-[10px] text-neutral-500">{n.timestamp}</span>
                  </div>
                  <p className="text-xs text-neutral-300 font-sans leading-relaxed pl-7">
                    {n.message}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-amber-900/30 bg-black/60 text-center text-[10px] text-neutral-500 uppercase">
          Notificações em Tempo Real • Alertas de Segurança SIAROM
        </div>
      </div>
    </div>
  );
};
