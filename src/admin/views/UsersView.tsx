import React, { useState } from 'react';
import { 
  Users, 
  ShieldCheck, 
  Plus, 
  Lock, 
  Key, 
  LogOut, 
  X, 
  CheckCircle2, 
  Smartphone, 
  Laptop, 
  AlertTriangle,
  UserX
} from 'lucide-react';
import { AdminUser, UserSession, UserRole } from '../adminTypes';

interface UsersViewProps {
  users: AdminUser[];
  sessions: UserSession[];
  onAddUser: (user: AdminUser) => void;
  onUpdateUser: (user: AdminUser) => void;
  onKillSession: (sessionId: string) => void;
  onAddToast: (title: string, type?: 'success' | 'warning' | 'error' | 'info', message?: string) => void;
}

export const UsersView: React.FC<UsersViewProps> = ({
  users,
  sessions,
  onAddUser,
  onUpdateUser,
  onKillSession,
  onAddToast
}) => {
  const [activeTab, setActiveTab] = useState<'users' | 'sessions' | 'rbac'>('users');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New User Form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('Editor');

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const newUser: AdminUser = {
      id: `usr-${Date.now()}`,
      name,
      email,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      role,
      status: 'ativo',
      twoFactorEnabled: true,
      lastLogin: 'Nunca',
      createdAt: new Date().toISOString().split('T')[0],
      permissions: ['content_edit', 'media_upload']
    };

    onAddUser(newUser);
    onAddToast('Novo usuário cadastrado com acesso RBAC!', 'success');
    setIsModalOpen(false);
  };

  const rolesList: { role: UserRole; desc: string }[] = [
    { role: 'Administrador', desc: 'Acesso total irrestrito a todas as configurações, auditoria e finanças.' },
    { role: 'Editor', desc: 'Acesso a edição de CMS, blogs, portfólio e biblioteca de mídias.' },
    { role: 'Financeiro', desc: 'Visualização de faturamento, orçamentos, contratos de clientes e relatórios.' },
    { role: 'Suporte', desc: 'Acompanhamento de tickets de clientes e checklist de projetos.' },
    { role: 'Cliente', desc: 'Acesso restrito ao Portal do Cliente para acompanhamento de seu projeto.' }
  ];

  return (
    <div className="space-y-6 font-mono pb-12 animate-fadeIn">
      
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-5 rounded-xl bg-black/90 border border-amber-900/50">
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <div className="p-2 rounded bg-amber-950 text-amber-400 border border-amber-800">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white uppercase">Gestão de Usuários & RBAC</h2>
            <p className="text-xs text-neutral-400 font-sans">Controle de permissões por cargo, 2FA e sessões ativas.</p>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-black text-xs uppercase tracking-wider flex items-center space-x-2 transition-all shadow-lg shadow-amber-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Cadastrar Usuário</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-amber-900/40 space-x-4 text-xs font-bold uppercase">
        <button
          onClick={() => setActiveTab('users')}
          className={`pb-3 border-b-2 transition-colors ${
            activeTab === 'users' ? 'border-amber-400 text-amber-400' : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          Usuários ({users.length})
        </button>
        <button
          onClick={() => setActiveTab('sessions')}
          className={`pb-3 border-b-2 transition-colors ${
            activeTab === 'sessions' ? 'border-amber-400 text-amber-400' : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          Sessões Ativas ({sessions.length})
        </button>
        <button
          onClick={() => setActiveTab('rbac')}
          className={`pb-3 border-b-2 transition-colors ${
            activeTab === 'rbac' ? 'border-amber-400 text-amber-400' : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          Matriz de Cargos (RBAC)
        </button>
      </div>

      {/* TAB 1: USERS LIST */}
      {activeTab === 'users' && (
        <div className="bg-black/90 rounded-xl border border-amber-900/50 overflow-hidden shadow-2xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-950 border-b border-amber-900/40 text-amber-400 uppercase text-[10px]">
              <tr>
                <th className="p-4">Usuário</th>
                <th className="p-4">Cargo / Função</th>
                <th className="p-4">2FA Status</th>
                <th className="p-4">Último Acesso</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-900/30">
              {users.map(u => (
                <tr key={u.id} className="hover:bg-neutral-900/60">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full border border-amber-500 object-cover" />
                      <div>
                        <div className="font-bold text-white uppercase">{u.name}</div>
                        <div className="text-[10px] text-neutral-400">{u.email}</div>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded bg-neutral-900 border border-amber-900 text-[10px] text-amber-400 font-bold uppercase">
                      {u.role}
                    </span>
                  </td>

                  <td className="p-4">
                    {u.twoFactorEnabled ? (
                      <span className="text-emerald-400 font-bold flex items-center space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>2FA ATIVO</span>
                      </span>
                    ) : (
                      <span className="text-neutral-500">Inativo</span>
                    )}
                  </td>

                  <td className="p-4 text-neutral-400">{u.lastLogin}</td>

                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-400 font-bold text-[10px] uppercase">
                      {u.status}
                    </span>
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => onAddToast(`Senha resetada para ${u.email}`, 'info')}
                        className="p-1.5 rounded bg-neutral-900 text-amber-400 hover:bg-amber-950"
                        title="Resetar Senha"
                      >
                        <Key className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          const updated: AdminUser = {
                            ...u,
                            status: u.status === 'ativo' ? 'bloqueado' : 'ativo'
                          };
                          onUpdateUser(updated);
                          onAddToast(`Status do usuário ${u.name} alterado`, 'warning');
                        }}
                        className="p-1.5 rounded bg-neutral-900 text-rose-400 hover:bg-rose-950"
                        title="Bloquear / Desbloquear"
                      >
                        <UserX className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 2: ACTIVE SESSIONS & FORCE LOGOUT */}
      {activeTab === 'sessions' && (
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-amber-950/20 border border-amber-500/40 text-amber-300 text-xs flex items-center justify-between">
            <span>Monitoramento de tokens JWT e sessões HTTP ativas. Encerre qualquer acesso suspeito instantaneamente.</span>
            <button
              onClick={() => onAddToast('Todas as sessões secundárias foram encerradas!', 'warning')}
              className="px-3 py-1.5 rounded bg-rose-600 hover:bg-rose-500 text-white font-bold text-[10px] uppercase"
            >
              Encerrar Todas as Outras Sessões
            </button>
          </div>

          <div className="space-y-3">
            {sessions.map(s => (
              <div key={s.id} className="p-4 rounded-xl bg-black border border-amber-900/50 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded bg-neutral-900 border border-amber-900 text-amber-400">
                    <Laptop className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-white uppercase">{s.userName} ({s.userRole})</span>
                      {s.isCurrent && (
                        <span className="px-2 py-0.5 rounded bg-emerald-500 text-black font-black text-[9px] uppercase">Sua Sessão Atual</span>
                      )}
                    </div>
                    <div className="text-[11px] text-neutral-400 font-sans">
                      {s.device} • {s.os} • {s.browser} • {s.location} ({s.ip})
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 shrink-0">
                  <div className="text-right text-[10px] text-neutral-400">
                    <div>Ativo: <strong className="text-amber-400">{s.lastActive}</strong></div>
                    <div>Login: {s.loginTime}</div>
                  </div>

                  {!s.isCurrent && (
                    <button
                      onClick={() => {
                        onKillSession(s.id);
                        onAddToast('Sessão encerrada remotamente!', 'success');
                      }}
                      className="px-3 py-1.5 rounded bg-rose-950 border border-rose-800 text-rose-300 hover:bg-rose-900 font-bold text-[10px] uppercase flex items-center space-x-1"
                    >
                      <LogOut className="w-3 h-3" />
                      <span>Forçar Logout</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: RBAC CARGOS */}
      {activeTab === 'rbac' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rolesList.map(r => (
            <div key={r.role} className="p-5 rounded-xl bg-black border border-amber-900/50 space-y-2">
              <span className="px-2 py-0.5 rounded bg-amber-950 border border-amber-800 text-[10px] text-amber-400 font-bold uppercase">
                {r.role}
              </span>
              <p className="text-xs text-neutral-300 font-sans leading-relaxed pt-1">{r.desc}</p>
            </div>
          ))}
        </div>
      )}

      {/* Modal User Create */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-neutral-950 border border-amber-500/40 rounded-xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white uppercase">Novo Usuário RBAC</h3>
            <form onSubmit={handleCreateUser} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-amber-400 block mb-1 uppercase">Nome Completo</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="EX: GABRIELA SILVA"
                  className="w-full bg-neutral-900 border border-amber-900/60 rounded px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="font-bold text-amber-400 block mb-1 uppercase">E-mail Corporativo</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="GABRIELA@SIAROM.COM.BR"
                  className="w-full bg-neutral-900 border border-amber-900/60 rounded px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="font-bold text-amber-400 block mb-1 uppercase">Cargo RBAC</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="w-full bg-neutral-900 border border-amber-900/60 rounded px-3 py-2 text-white font-bold uppercase"
                >
                  <option value="Administrador">ADMINISTRADOR</option>
                  <option value="Editor">EDITOR</option>
                  <option value="Financeiro">FINANCEIRO</option>
                  <option value="Suporte">SUPORTE</option>
                  <option value="Cliente">CLIENTE</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-neutral-900 text-neutral-300">
                  Cancelar
                </button>
                <button type="submit" className="px-4 py-2 bg-amber-400 text-black font-black uppercase">
                  Cadastrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
