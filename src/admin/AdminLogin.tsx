import React, { useState } from 'react';
import { Lock, Mail, Key, ShieldCheck, ArrowLeft, Sparkles, AlertCircle } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onGoToPublicSite: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onGoToPublicSite }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Allowed single administrator email accounts
  const ALLOWED_EMAILS = ['ronalldrobert@gmail.com', 'admin@siarom.com.br'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const normalizedEmail = email.trim().toLowerCase();
      
      // Check if email belongs to the authorized administrator
      if (!ALLOWED_EMAILS.includes(normalizedEmail)) {
        setError('Acesso negado. Apenas o e-mail do administrador autorizado possui permissão de acesso.');
        setIsLoading(false);
        return;
      }

      if (!password) {
        setError('Informe a senha do administrador.');
        setIsLoading(false);
        return;
      }

      // Successful login
      localStorage.setItem('siarom_admin_auth', JSON.stringify({
        authenticated: true,
        email: normalizedEmail,
        loginTime: new Date().toISOString()
      }));

      setIsLoading(false);
      onLoginSuccess();
    }, 600);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-slate-100 flex items-center justify-center p-4 font-mono relative overflow-hidden selection:bg-amber-500 selection:text-black">
      
      {/* Background Cyber Grid & Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1912_1px,transparent_1px),linear-gradient(to_bottom,#1f1912_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-black/90 border border-amber-500/50 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(245,158,11,0.15)] relative z-10 space-y-6">
        
        {/* Top Header */}
        <div className="space-y-3 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-950/80 border border-amber-500/80 text-amber-400 shadow-lg shadow-amber-950/80 mx-auto">
            <Lock className="w-7 h-7 animate-pulse" />
          </div>
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded bg-amber-950 border border-amber-900 text-[10px] text-amber-400 font-bold uppercase tracking-widest mb-2">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Acesso Restrito // Administrador</span>
            </div>
            <h1 className="text-2xl font-black text-white uppercase tracking-wider">
              SIAROM<span className="text-amber-400">.ADMIN</span>
            </h1>
            <p className="text-xs text-neutral-400 font-sans mt-1">
              Painel de gestão restrito para administrador único via e-mail.
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 rounded-lg bg-rose-950/80 border border-rose-800 text-rose-300 text-xs font-sans flex items-start space-x-2.5 animate-fadeIn">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-xs font-bold uppercase text-amber-400 mb-1.5 flex items-center justify-between">
              <span>E-mail do Administrador</span>
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ronalldrobert@gmail.com"
                className="w-full bg-neutral-900 border border-amber-900/60 rounded-lg pl-9 pr-3 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-amber-400 mb-1.5">
              Senha de Segurança
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-neutral-900 border border-amber-900/60 rounded-lg pl-9 pr-3 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-lg bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-black font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <span>Verificando Autenticação...</span>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>Entrar no Painel SaaS</span>
              </>
            )}
          </button>
        </form>

        {/* Back to Public Site */}
        <div className="pt-2 border-t border-amber-900/40 text-center">
          <button
            onClick={onGoToPublicSite}
            className="text-xs text-neutral-400 hover:text-amber-400 flex items-center justify-center space-x-1.5 mx-auto transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar ao Site Público</span>
          </button>
        </div>

      </div>

    </div>
  );
};
