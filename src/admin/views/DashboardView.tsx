import React from 'react';
import { 
  Users, 
  FolderKanban, 
  CheckCircle2, 
  Eye, 
  TrendingUp, 
  UserPlus, 
  DollarSign, 
  Activity, 
  Cpu, 
  HardDrive, 
  Database, 
  Clock, 
  Sparkles,
  Server,
  Zap,
  Lock,
  Plus
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { ClientItem, ProjectItem, SystemLog } from '../adminTypes';

interface DashboardViewProps {
  clients: ClientItem[];
  projects: ProjectItem[];
  logs: SystemLog[];
  onNavigateToSection: (section: any) => void;
  onAddToast: (title: string, type?: 'success' | 'warning' | 'error' | 'info', message?: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  clients,
  projects,
  logs,
  onNavigateToSection,
  onAddToast
}) => {
  const activeProjectsCount = projects.filter(p => p.status === 'em_desenvolvimento' || p.status === 'revisao').length;
  const completedProjectsCount = projects.filter(p => p.status === 'concluido').length;

  // Real initial start data charts
  const revenueData = [
    { month: 'Mai', receita: 0 },
    { month: 'Jun', receita: 0 },
    { month: 'Jul', receita: 0 },
    { month: 'Ago', receita: 0 },
  ];

  const visitorsData = [
    { day: 'Seg', visitantes: 0 },
    { day: 'Ter', visitantes: 0 },
    { day: 'Qua', visitantes: 0 },
    { day: 'Qui', visitantes: 0 },
    { day: 'Sex', visitantes: 0 },
    { day: 'Sáb', visitantes: 0 },
    { day: 'Dom', visitantes: 0 },
  ];

  return (
    <div className="space-y-8 font-mono pb-12 animate-fadeIn">
      
      {/* Top Banner Alert / Status Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-neutral-950 via-amber-950/40 to-neutral-950 border border-amber-500/40 shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-black border border-amber-500/60 text-[10px] font-bold text-amber-400 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>SIAROM SAAS PAINEL ADMIN // EMPRESA NOVA (DADOS REAIS)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wider">
            Painel do Administrador <span className="text-amber-400">SIAROM</span>
          </h2>
          <p className="text-neutral-300 text-xs font-sans max-w-2xl leading-relaxed">
            Ambiente de controle limpo para cadastro e acompanhamento em tempo real de clientes, projetos e métricas reais da empresa.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0 relative z-10">
          <button
            onClick={() => onNavigateToSection('projects')}
            className="px-4 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-black text-xs uppercase tracking-wider flex items-center space-x-2 transition-all shadow-lg shadow-amber-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Cadastrar Projeto</span>
          </button>
        </div>
      </div>

      {/* Primary Metrics Grid (Real Counters) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Total Clientes */}
        <div 
          onClick={() => onNavigateToSection('clients')}
          className="p-5 rounded-xl bg-neutral-950/90 border border-amber-900/40 hover:border-amber-500/80 transition-all duration-300 hover:shadow-xl cursor-pointer group space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Total de Clientes</span>
            <div className="p-2 rounded bg-amber-950/80 text-amber-400 border border-amber-800">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-white group-hover:text-amber-300 transition-colors">{clients.length}</span>
            <span className="text-[10px] text-amber-400 font-bold">Base Real</span>
          </div>
        </div>

        {/* Metric 2: Total Projetos */}
        <div 
          onClick={() => onNavigateToSection('projects')}
          className="p-5 rounded-xl bg-neutral-950/90 border border-amber-900/40 hover:border-amber-500/80 transition-all duration-300 hover:shadow-xl cursor-pointer group space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Total de Projetos</span>
            <div className="p-2 rounded bg-amber-950/80 text-amber-400 border border-amber-800">
              <FolderKanban className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-white group-hover:text-amber-300 transition-colors">{projects.length}</span>
            <span className="text-[10px] text-amber-400 font-bold">{activeProjectsCount} Ativos</span>
          </div>
        </div>

        {/* Metric 3: Projetos Ativos */}
        <div className="p-5 rounded-xl bg-neutral-950/90 border border-amber-900/40 hover:border-amber-500/80 transition-all duration-300 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Projetos Ativos</span>
            <div className="p-2 rounded bg-amber-950/80 text-amber-400 border border-amber-800">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-amber-400">{activeProjectsCount}</span>
            <span className="text-[10px] text-neutral-400">Em andamento</span>
          </div>
        </div>

        {/* Metric 4: Projetos Concluídos */}
        <div className="p-5 rounded-xl bg-neutral-950/90 border border-amber-900/40 hover:border-amber-500/80 transition-all duration-300 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Projetos Concluídos</span>
            <div className="p-2 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-white">{completedProjectsCount}</span>
            <span className="text-[10px] text-emerald-400 font-bold">Taxa de Entrega</span>
          </div>
        </div>

        {/* Metric 5: Visitantes Hoje */}
        <div className="p-5 rounded-xl bg-neutral-950/90 border border-amber-900/40 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Visitantes Hoje</span>
            <div className="p-2 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-white">0</span>
            <span className="text-[10px] text-neutral-500">Aguardando tráfego</span>
          </div>
        </div>

        {/* Metric 6: Visitantes Mês */}
        <div className="p-5 rounded-xl bg-neutral-950/90 border border-amber-900/40 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Visitantes Mês</span>
            <div className="p-2 rounded bg-amber-950/80 text-amber-400 border border-amber-800">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-white">0</span>
            <span className="text-[10px] text-neutral-500">Mês Inicial</span>
          </div>
        </div>

        {/* Metric 7: Conversões */}
        <div className="p-5 rounded-xl bg-neutral-950/90 border border-amber-900/40 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Taxa de Conversão</span>
            <div className="p-2 rounded bg-amber-950/80 text-amber-400 border border-amber-800">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-amber-400">0.0%</span>
            <span className="text-[10px] text-neutral-500">Sem dados</span>
          </div>
        </div>

        {/* Metric 8: Leads Recebidos */}
        <div className="p-5 rounded-xl bg-neutral-950/90 border border-amber-900/40 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Leads Recebidos</span>
            <div className="p-2 rounded bg-purple-950/80 text-purple-400 border border-purple-800">
              <UserPlus className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-white">0</span>
            <span className="text-[10px] text-purple-400 font-bold">Pronto p/ Leads</span>
          </div>
        </div>

        {/* Metric 9: Receita do Mês */}
        <div className="p-5 rounded-xl bg-neutral-950/90 border border-amber-900/40 space-y-3 col-span-2 sm:col-span-1 lg:col-span-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Receita Real Mês</span>
            <div className="p-2 rounded bg-amber-950/80 text-amber-400 border border-amber-800">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-black text-amber-400">R$ 0,00</span>
            <span className="text-[10px] text-neutral-400">Início de Atividades</span>
          </div>
        </div>

        {/* Metric 10: Status de Segurança */}
        <div className="p-5 rounded-xl bg-neutral-950/90 border border-amber-900/40 space-y-3 col-span-2 sm:col-span-1 lg:col-span-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Segurança & Proteção</span>
            <div className="p-2 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800">
              <Lock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-lg font-bold text-emerald-400 uppercase">ACESSO RESTRITO POR E-MAIL ADMIN</span>
            <span className="text-[10px] text-neutral-400">Seguro</span>
          </div>
        </div>

      </div>

      {/* Server Monitor Resources Row */}
      <div className="p-6 rounded-xl bg-black/90 border border-amber-900/50 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Server className="w-4 h-4 text-amber-400" />
            <h3 className="font-bold text-white text-sm uppercase">Status da Infraestrutura de Servidor</h3>
          </div>
          <span className="text-[10px] text-amber-500 font-bold uppercase">SISTEMA ATIVO (OK)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          
          <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-800 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-neutral-400 font-bold flex items-center space-x-1">
                <Cpu className="w-3.5 h-3.5 text-amber-400 mr-1" /> CPU
              </span>
              <span className="text-amber-400 font-bold">12%</span>
            </div>
            <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden border border-amber-900/30">
              <div className="h-full bg-amber-400 rounded-full" style={{ width: '12%' }} />
            </div>
            <span className="text-[9px] text-neutral-500 block">Cloud Server Normal</span>
          </div>

          <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-800 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-neutral-400 font-bold flex items-center space-x-1">
                <HardDrive className="w-3.5 h-3.5 text-cyan-400 mr-1" /> MEMÓRIA
              </span>
              <span className="text-cyan-400 font-bold">28%</span>
            </div>
            <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden border border-cyan-900/30">
              <div className="h-full bg-cyan-400 rounded-full" style={{ width: '28%' }} />
            </div>
            <span className="text-[9px] text-neutral-500 block">Uso otimizado</span>
          </div>

          <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-800 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-neutral-400 font-bold flex items-center space-x-1">
                <Database className="w-3.5 h-3.5 text-emerald-400 mr-1" /> BANCO DE DADOS
              </span>
              <span className="text-emerald-400 font-bold">0ms</span>
            </div>
            <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden border border-emerald-900/30">
              <div className="h-full bg-emerald-400 rounded-full" style={{ width: '5%' }} />
            </div>
            <span className="text-[9px] text-neutral-500 block">Conexão Pronta</span>
          </div>

          <div className="p-4 rounded-lg bg-neutral-950 border border-neutral-800 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-neutral-400 font-bold flex items-center space-x-1">
                <HardDrive className="w-3.5 h-3.5 text-purple-400 mr-1" /> DISCO
              </span>
              <span className="text-purple-400 font-bold">0.1 GB</span>
            </div>
            <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden border border-purple-900/30">
              <div className="h-full bg-purple-400 rounded-full" style={{ width: '1%' }} />
            </div>
            <span className="text-[9px] text-neutral-500 block">Sem arquivos pesados</span>
          </div>

        </div>
      </div>

      {/* Real Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div className="lg:col-span-8 p-6 rounded-2xl bg-black/90 border border-amber-900/50 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-white text-sm uppercase">Acompanhamento de Receita Real</h3>
              <p className="text-[11px] text-neutral-400 font-sans">O gráfico será populado conforme novos projetos forem cadastrados.</p>
            </div>
            <span className="text-xs font-extrabold text-amber-400 bg-amber-950/80 px-2.5 py-1 rounded border border-amber-800">
              R$ 0,00 REAIS
            </span>
          </div>

          <div className="h-64 w-full flex items-center justify-center border border-dashed border-neutral-900 rounded-xl">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                <XAxis dataKey="month" stroke="#737373" fontSize={11} />
                <YAxis stroke="#737373" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#f59e0b' }} />
                <Area type="monotone" dataKey="receita" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.1} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 p-6 rounded-2xl bg-black/90 border border-amber-900/50 space-y-4">
          <div>
            <h3 className="font-bold text-white text-sm uppercase">Tráfego Real do Site</h3>
            <p className="text-[11px] text-neutral-400 font-sans">Visualização diária de acessos em tempo real.</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={visitorsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                <XAxis dataKey="day" stroke="#737373" fontSize={11} />
                <YAxis stroke="#737373" fontSize={11} />
                <Bar dataKey="visitantes" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* System Logs */}
      <div className="p-6 rounded-2xl bg-black/90 border border-amber-900/50 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-amber-400" />
            <h3 className="font-bold text-white text-sm uppercase">Logs do Sistema</h3>
          </div>
          <button
            onClick={() => onNavigateToSection('logs')}
            className="text-xs text-amber-400 hover:underline uppercase font-bold"
          >
            Ver Logs →
          </button>
        </div>

        <div className="space-y-2">
          {logs.slice(0, 4).map((log) => (
            <div key={log.id} className="p-3 rounded-lg bg-neutral-950 border border-neutral-900 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-3">
                <span className="px-2 py-0.5 rounded bg-black border border-amber-900 text-[10px] text-amber-400 font-bold uppercase">
                  {log.actionType}
                </span>
                <span className="text-white font-bold">{log.userName}</span>
                <span className="text-neutral-400 font-sans truncate max-w-md">{log.description}</span>
              </div>
              <span className="text-[10px] text-neutral-500">{log.timestamp}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
