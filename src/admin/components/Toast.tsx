import React, { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  title: string;
  type: 'success' | 'warning' | 'error' | 'info';
  message?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-2.5 max-w-sm w-full font-mono pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastMessage; onDismiss: (id: string) => void }> = ({ toast, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const getStyle = () => {
    switch (toast.type) {
      case 'success':
        return {
          bg: 'bg-black/90 border-emerald-500/80 text-emerald-300',
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
        };
      case 'warning':
        return {
          bg: 'bg-black/90 border-amber-500/80 text-amber-300',
          icon: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
        };
      case 'error':
        return {
          bg: 'bg-black/90 border-rose-500/80 text-rose-300',
          icon: <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
        };
      default:
        return {
          bg: 'bg-black/90 border-cyan-500/80 text-cyan-300',
          icon: <Info className="w-5 h-5 text-cyan-400 shrink-0" />
        };
    }
  };

  const style = getStyle();

  return (
    <div className={`p-4 rounded-xl border ${style.bg} shadow-2xl backdrop-blur-md flex items-start justify-between space-x-3 pointer-events-auto animate-fadeIn`}>
      <div className="flex items-start space-x-3">
        {style.icon}
        <div>
          <h4 className="font-bold text-xs uppercase tracking-wider text-white">{toast.title}</h4>
          {toast.message && (
            <p className="text-[11px] text-neutral-300 font-sans mt-0.5 leading-tight">{toast.message}</p>
          )}
        </div>
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="p-1 rounded text-neutral-400 hover:text-white"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
