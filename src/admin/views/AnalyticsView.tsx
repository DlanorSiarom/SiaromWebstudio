import React, { useState } from 'react';
import { 
  BarChart3, 
  Download, 
  Globe, 
  Smartphone, 
  Monitor, 
  Tablet, 
  Clock, 
  Eye, 
  ArrowUpRight,
  TrendingUp,
  PieChart as PieIcon
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface AnalyticsViewProps {
  onAddToast: (title: string, type?: 'success' | 'warning' | 'error' | 'info', message?: string) => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ onAddToast }) => {
  const [period, setPeriod] = useState<'7d' | '30d' | '90d'>('30d');

  const trafficHistory = [
    { date: '01/08', direct: 420, organic: 890, social: 310 },
    { date: '02/08', direct: 510, organic: 940, social: 410 },
    { date: '03/08', direct: 620, organic: 1120, social: 520 },
    { date: '04/08', direct: 780, organic: 1450, social: 680 },
    { date: '05/08', direct: 890, organic: 1680, social: 790 },
    { date: '06/08', direct: 940, organic: 1890, social: 850 },
  ];

  const deviceData = [
    { name: 'Desktop (Chrome/Safari)', value: 62, color: '#f59e0b' },
    { name: 'Mobile (iOS/Android)', value: 32, color: '#06b6d4' },
    { name: 'Tablet / iPad', value: 6, color: '#a855f7' }
  ];

  const topPages = [
    { path: '/', title: 'Home Page SIAROM', views: '28.420', bounceRate: '32.1%', avgTime: '2m 14s' },
    { path: '/portfolio', title: 'Portfólio & Showcase', views: '14.180', bounceRate: '28.4%', avgTime: '3m 45s' },
    { path: '/servicos', title: 'Módulos de Engenharia', views: '9.820', bounceRate: '41.2%', avgTime: '1m 50s' },
    { path: '/contato', title: 'Calculadora de Orçamento', views: '6.540', bounceRate: '19.8%', avgTime: '4m 10s' }
  ];

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8,Data,Visitantes_Diretos,Organico,Social\n01/08,420,890,310\n02/08,510,940,410\n03/08,620,1120,520\n04/08,780,1450,680\n05/08,890,1680,790\n06/08,940,1890,850";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `relatorio_analytics_siarom_${period}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    onAddToast('Relatório CSV exportado com sucesso!', 'success');
  };

  return (
    <div className="space-y-6 font-mono pb-12 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-5 rounded-xl bg-black/90 border border-amber-900/50">
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <div className="p-2 rounded bg-amber-950 text-amber-400 border border-amber-800">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white uppercase">Analytics & Inteligência de Tráfego</h2>
            <p className="text-xs text-neutral-400 font-sans">Estatísticas detalhadas de acessos, dispositivos e engajamento.</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value as any)}
            className="bg-neutral-950 border border-amber-900/60 rounded-lg px-3 py-2 text-xs text-amber-300 font-bold uppercase"
          >
            <option value="7d">Últimos 7 dias</option>
            <option value="30d">Últimos 30 dias</option>
            <option value="90d">Últimos 90 dias</option>
          </select>

          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-black text-xs uppercase tracking-wider flex items-center space-x-2 transition-all shadow-lg shadow-amber-500/20"
          >
            <Download className="w-4 h-4" />
            <span>Exportar CSV</span>
          </button>
        </div>
      </div>

      {/* Main Chart */}
      <div className="p-6 rounded-xl bg-black/90 border border-amber-900/50 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-white text-sm uppercase">Tráfego de Acessos por Origem (Busca Orgânica, Direta & Redes)</h3>
          <span className="text-xs text-emerald-400 font-bold">+24% vs Período Anterior</span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trafficHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
              <XAxis dataKey="date" stroke="#737373" fontSize={11} />
              <YAxis stroke="#737373" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#f59e0b', borderRadius: '8px', color: '#fff' }} />
              <Area type="monotone" dataKey="organic" name="Google Orgânico" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} />
              <Area type="monotone" dataKey="direct" name="Acesso Direto" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.2} />
              <Area type="monotone" dataKey="social" name="Redes Sociais" stroke="#a855f7" fill="#a855f7" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Secondary Cards & Device Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Device Distribution */}
        <div className="lg:col-span-5 p-6 rounded-xl bg-black/90 border border-amber-900/50 space-y-4">
          <h3 className="font-bold text-white text-sm uppercase">Dispositivos Utilizados</h3>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={deviceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#f59e0b', borderRadius: '8px', color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 text-xs">
            {deviceData.map(d => (
              <div key={d.name} className="flex justify-between items-center p-2 rounded bg-neutral-950">
                <span className="text-neutral-300 font-sans">{d.name}</span>
                <span className="font-bold text-amber-400">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Pages Table */}
        <div className="lg:col-span-7 p-6 rounded-xl bg-black/90 border border-amber-900/50 space-y-4">
          <h3 className="font-bold text-white text-sm uppercase">Páginas Mais Acessadas</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-950 border-b border-amber-900/40 text-amber-400 uppercase text-[10px]">
                <tr>
                  <th className="p-3">URL / Página</th>
                  <th className="p-3">Visualizações</th>
                  <th className="p-3">Rejeição</th>
                  <th className="p-3">Tempo Médio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-900/30">
                {topPages.map(page => (
                  <tr key={page.path} className="hover:bg-neutral-900/60">
                    <td className="p-3 font-bold text-white uppercase">{page.path}</td>
                    <td className="p-3 text-amber-300 font-bold">{page.views}</td>
                    <td className="p-3 text-neutral-400">{page.bounceRate}</td>
                    <td className="p-3 text-emerald-400 font-bold">{page.avgTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
};
