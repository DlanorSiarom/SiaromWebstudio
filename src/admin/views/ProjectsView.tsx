import React, { useState, useMemo } from 'react';
import { 
  FolderKanban, 
  Plus, 
  LayoutGrid, 
  List, 
  Search,
  Filter,
  CheckCircle2, 
  X, 
  Trash2, 
  Calendar,
  Sparkles,
  ArrowUpDown,
  Clock,
  Eye,
  Building2,
  Tag
} from 'lucide-react';
import { ProjectItem, ClientItem } from '../adminTypes';

interface ProjectsViewProps {
  projects: ProjectItem[];
  clients: ClientItem[];
  onAddProject: (newProj: ProjectItem) => void;
  onUpdateProject: (updated: ProjectItem) => void;
  onDeleteProject: (id: string) => void;
  onAddToast: (title: string, type?: 'success' | 'warning' | 'error' | 'info', message?: string) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  projects,
  clients,
  onAddProject,
  onUpdateProject,
  onDeleteProject,
  onAddToast
}) => {
  const [viewMode, setViewMode] = useState<'table' | 'kanban'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // New Project Form
  const [title, setTitle] = useState('');
  const [clientInput, setClientInput] = useState('');
  const [deadline, setDeadline] = useState('');
  const [value, setValue] = useState('');
  const [category, setCategory] = useState('Website Institucional');
  const [status, setStatus] = useState<ProjectItem['status']>('planejamento');

  // Filtered Projects
  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchesSearch = 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'todos' || p.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [projects, searchQuery, statusFilter]);

  const handleOpenCreate = () => {
    setTitle('');
    setClientInput(clients[0]?.name || '');
    setDeadline('2026-10-15');
    setValue('R$ 15.000,00');
    setCategory('Website Institucional');
    setStatus('planejamento');
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      onAddToast('Informe o título do projeto', 'warning');
      return;
    }

    const newProj: ProjectItem = {
      id: `proj-${Date.now().toString().slice(-4)}`,
      title,
      clientId: `cli-${Date.now().toString().slice(-4)}`,
      clientName: clientInput.trim() || 'Cliente Siarom',
      deadline: deadline || '2026-12-31',
      value: value || 'R$ 0,00',
      status,
      progress: 0,
      category,
      team: [
        { name: 'Admin Siarom', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80', role: 'Dev Lead' }
      ],
      checklist: [
        { id: `chk-1-${Date.now()}`, task: 'Alinhamento de escopo e briefing inicial', completed: true },
        { id: `chk-2-${Date.now()}`, task: 'Desenvolvimento e Homologação UI', completed: false },
        { id: `chk-3-${Date.now()}`, task: 'Publicação e Entrega do projeto', completed: false }
      ],
      commentsCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };

    onAddProject(newProj);
    onAddToast('Projeto cadastrado com sucesso!', 'success');
    setIsModalOpen(false);
  };

  const handleToggleChecklist = (project: ProjectItem, checkId: string) => {
    const updatedChecklist = project.checklist.map(c => 
      c.id === checkId ? { ...c, completed: !c.completed } : c
    );
    const completedCount = updatedChecklist.filter(c => c.completed).length;
    const progress = Math.round((completedCount / updatedChecklist.length) * 100);

    const updatedProj: ProjectItem = {
      ...project,
      checklist: updatedChecklist,
      progress
    };

    onUpdateProject(updatedProj);
    if (selectedProject?.id === project.id) setSelectedProject(updatedProj);
    onAddToast('Progresso atualizado', 'info');
  };

  const statusBadge = (s: ProjectItem['status']) => {
    switch (s) {
      case 'planejamento':
        return <span className="px-2.5 py-1 rounded bg-cyan-950 border border-cyan-800 text-cyan-300 font-bold text-[10px] uppercase">Planejamento</span>;
      case 'em_desenvolvimento':
        return <span className="px-2.5 py-1 rounded bg-amber-950 border border-amber-800 text-amber-300 font-bold text-[10px] uppercase">Em Desenvolv.</span>;
      case 'revisao':
        return <span className="px-2.5 py-1 rounded bg-purple-950 border border-purple-800 text-purple-300 font-bold text-[10px] uppercase">Revisão / QA</span>;
      case 'concluido':
        return <span className="px-2.5 py-1 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 font-bold text-[10px] uppercase">Concluído</span>;
      default:
        return <span className="px-2.5 py-1 rounded bg-neutral-900 text-neutral-400 font-bold text-[10px] uppercase">{s}</span>;
    }
  };

  const columns: { id: ProjectItem['status']; label: string; color: string }[] = [
    { id: 'planejamento', label: 'Planejamento', color: 'border-cyan-500' },
    { id: 'em_desenvolvimento', label: 'Em Desenvolv.', color: 'border-amber-500' },
    { id: 'revisao', label: 'Revisão / QA', color: 'border-purple-500' },
    { id: 'concluido', label: 'Concluídos', color: 'border-emerald-500' }
  ];

  return (
    <div className="space-y-6 font-mono pb-12 animate-fadeIn">
      
      {/* Top Banner Control Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-black/90 border border-amber-900/50 shadow-2xl">
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <div className="p-3 rounded-xl bg-amber-950/80 text-amber-400 border border-amber-800 shadow-md">
            <FolderKanban className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-bold text-white uppercase">Gestão de Projetos & Entregas</h2>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950 text-amber-400 font-bold border border-amber-800">
                {projects.length} Total
              </span>
            </div>
            <p className="text-xs text-neutral-400 font-sans mt-0.5">
              Controle de prazos, etapas de desenvolvimento, checklists e clientes da empresa.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
          {/* Switch Table/Kanban */}
          <div className="flex bg-neutral-950 p-1 rounded-lg border border-amber-900/50">
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded text-xs font-bold uppercase flex items-center space-x-1.5 transition-colors ${
                viewMode === 'table' ? 'bg-amber-400 text-black shadow-md' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Tabela</span>
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-3 py-1.5 rounded text-xs font-bold uppercase flex items-center space-x-1.5 transition-colors ${
                viewMode === 'kanban' ? 'bg-amber-400 text-black shadow-md' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Kanban</span>
            </button>
          </div>

          <button
            onClick={handleOpenCreate}
            className="px-4 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-black text-xs uppercase tracking-wider flex items-center space-x-2 transition-all shadow-lg shadow-amber-500/20 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Novo Projeto</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-neutral-950 border border-amber-900/40">
        
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por projeto, cliente ou categoria..."
            className="w-full bg-black border border-amber-900/60 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center space-x-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {[
            { id: 'todos', label: 'Todos' },
            { id: 'planejamento', label: 'Planejamento' },
            { id: 'em_desenvolvimento', label: 'Em Desenvolv.' },
            { id: 'revisao', label: 'Revisão / QA' },
            { id: 'concluido', label: 'Concluído' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded text-[11px] font-bold uppercase transition-colors shrink-0 ${
                statusFilter === tab.id
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/60'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

      </div>

      {/* VIEW MODE 1: CLEAN DATA TABLE */}
      {viewMode === 'table' ? (
        <div className="bg-black/90 rounded-2xl border border-amber-900/50 overflow-hidden shadow-2xl">
          {filteredProjects.length === 0 ? (
            <div className="p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-amber-950/60 border border-amber-900/80 flex items-center justify-center text-amber-400 mx-auto">
                <FolderKanban className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white uppercase">Nenhum Projeto Encontrado</h3>
                <p className="text-xs text-neutral-400 font-sans max-w-md mx-auto">
                  A sua empresa está iniciando uma nova jornada. Clique no botão abaixo para registrar o primeiro projeto real.
                </p>
              </div>
              <button
                onClick={handleOpenCreate}
                className="px-5 py-2.5 rounded-lg bg-amber-400 text-black font-black text-xs uppercase tracking-wider inline-flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Cadastrar Primeiro Projeto</span>
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-950 border-b border-amber-900/40 text-amber-400 uppercase text-[10px] font-bold">
                  <tr>
                    <th className="p-4">Nome do Projeto</th>
                    <th className="p-4">Cliente</th>
                    <th className="p-4">Categoria</th>
                    <th className="p-4">Valor</th>
                    <th className="p-4">Prazo</th>
                    <th className="p-4">Progresso</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-900/30 font-sans">
                  {filteredProjects.map((proj) => (
                    <tr key={proj.id} className="hover:bg-neutral-900/70 transition-colors font-mono">
                      
                      {/* Title */}
                      <td className="p-4">
                        <div className="font-bold text-white uppercase text-xs">{proj.title}</div>
                        <div className="text-[10px] text-neutral-500 font-mono">ID: {proj.id}</div>
                      </td>

                      {/* Client */}
                      <td className="p-4">
                        <div className="flex items-center space-x-1.5 text-amber-300 font-bold">
                          <Building2 className="w-3.5 h-3.5 text-amber-500" />
                          <span>{proj.clientName}</span>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300 text-[10px]">
                          {proj.category}
                        </span>
                      </td>

                      {/* Value */}
                      <td className="p-4 font-bold text-emerald-400">
                        {proj.value}
                      </td>

                      {/* Deadline */}
                      <td className="p-4 text-neutral-300">
                        <div className="flex items-center space-x-1 text-[11px]">
                          <Calendar className="w-3.5 h-3.5 text-amber-500" />
                          <span>{proj.deadline}</span>
                        </div>
                      </td>

                      {/* Progress Bar */}
                      <td className="p-4 w-36">
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] font-bold">
                            <span className="text-amber-400">{proj.progress}%</span>
                          </div>
                          <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden border border-amber-900/40">
                            <div className="h-full bg-amber-400 rounded-full" style={{ width: `${proj.progress}%` }} />
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        {statusBadge(proj.status)}
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => setSelectedProject(proj)}
                            className="px-3 py-1.5 rounded bg-amber-400 hover:bg-amber-300 text-black font-black text-[10px] uppercase flex items-center space-x-1 transition-all"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Detalhes</span>
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Deseja excluir o projeto ${proj.title}?`)) {
                                onDeleteProject(proj.id);
                                onAddToast('Projeto excluído', 'warning');
                              }
                            }}
                            className="p-1.5 rounded bg-rose-950/80 hover:bg-rose-900 border border-rose-800 text-rose-300 transition-colors"
                            title="Excluir Projeto"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        /* VIEW MODE 2: KANBAN BOARD */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {columns.map(col => {
            const colProjects = filteredProjects.filter(p => p.status === col.id);
            return (
              <div key={col.id} className="bg-neutral-950 rounded-2xl border border-amber-900/40 p-4 space-y-4">
                
                {/* Column Header */}
                <div className={`flex items-center justify-between pb-3 border-b-2 ${col.color}`}>
                  <span className="font-bold text-xs text-white uppercase">{col.label}</span>
                  <span className="px-2 py-0.5 rounded bg-black border border-amber-900 text-[10px] text-amber-400 font-bold">
                    {colProjects.length}
                  </span>
                </div>

                {/* Cards */}
                <div className="space-y-3">
                  {colProjects.length === 0 ? (
                    <div className="p-4 rounded-lg bg-black/40 border border-dashed border-neutral-900 text-center text-neutral-600 text-[10px] uppercase">
                      Sem projetos
                    </div>
                  ) : (
                    colProjects.map(project => (
                      <div
                        key={project.id}
                        onClick={() => setSelectedProject(project)}
                        className="p-4 rounded-xl bg-black border border-amber-900/50 hover:border-amber-400 transition-all cursor-pointer space-y-3 hover:shadow-xl group"
                      >
                        <div className="flex items-start justify-between">
                          <span className="text-[10px] text-amber-400 font-bold uppercase px-2 py-0.5 rounded bg-amber-950 border border-amber-900">
                            {project.category}
                          </span>
                          <span className="text-[10px] text-emerald-400 font-bold">{project.value}</span>
                        </div>

                        <h4 className="font-bold text-xs text-white uppercase group-hover:text-amber-300 transition-colors">
                          {project.title}
                        </h4>

                        <p className="text-[11px] text-neutral-400 font-sans truncate">
                          Cliente: {project.clientName}
                        </p>

                        {/* Progress Bar */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px]">
                            <span className="text-neutral-500">Progresso</span>
                            <span className="text-amber-400 font-bold">{project.progress}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-amber-900/30">
                            <div className="h-full bg-amber-400 rounded-full" style={{ width: `${project.progress}%` }} />
                          </div>
                        </div>

                        {/* Footer Info */}
                        <div className="pt-2 border-t border-amber-900/30 flex items-center justify-between text-[10px] text-neutral-400">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3 text-amber-400" />
                            <span>{project.deadline}</span>
                          </div>
                          <span className="text-cyan-400 font-bold">Ver</span>
                        </div>

                      </div>
                    ))
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Project Detail Drawer / Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-2xl bg-neutral-950 border border-amber-500/50 rounded-2xl p-6 shadow-2xl space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-amber-900/40">
              <div>
                <span className="text-[10px] text-amber-500 font-bold uppercase tracking-wider">REGISTRO DE PROJETO // SIAROM</span>
                <h3 className="text-xl font-bold text-white uppercase">{selectedProject.title}</h3>
                <span className="text-xs text-amber-300 font-bold">Cliente: {selectedProject.clientName}</span>
              </div>
              <button onClick={() => setSelectedProject(null)} className="text-neutral-400 hover:text-white p-1 rounded bg-neutral-900">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Status Selector in Modal */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-black border border-amber-900/40 space-y-1">
                <span className="text-[10px] text-neutral-500 uppercase block">Status do Projeto</span>
                <select
                  value={selectedProject.status}
                  onChange={(e) => {
                    const newStatus = e.target.value as ProjectItem['status'];
                    const updated = { ...selectedProject, status: newStatus };
                    onUpdateProject(updated);
                    setSelectedProject(updated);
                    onAddToast('Status alterado', 'info');
                  }}
                  className="bg-neutral-900 border border-amber-900 text-amber-300 rounded px-2.5 py-1 text-xs font-bold uppercase w-full"
                >
                  <option value="planejamento">Planejamento</option>
                  <option value="em_desenvolvimento">Em Desenvolvimento</option>
                  <option value="revisao">Revisão / QA</option>
                  <option value="concluido">Concluído</option>
                </select>
              </div>

              <div className="p-3 rounded-lg bg-black border border-amber-900/40 space-y-1">
                <span className="text-[10px] text-neutral-500 uppercase block">Valor do Contrato</span>
                <span className="text-sm font-bold text-emerald-400 block">{selectedProject.value}</span>
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-white uppercase text-xs flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>Checklist de Entregáveis</span>
                </h4>
                <span className="text-xs font-bold text-amber-400">{selectedProject.progress}% Concluído</span>
              </div>

              <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                {selectedProject.checklist.map(chk => (
                  <label 
                    key={chk.id}
                    className="flex items-center space-x-3 p-3 rounded-lg bg-black border border-amber-900/40 cursor-pointer hover:border-amber-400 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={chk.completed}
                      onChange={() => handleToggleChecklist(selectedProject, chk.id)}
                      className="w-4 h-4 rounded border-amber-900 text-amber-500 focus:ring-amber-400 accent-amber-400"
                    />
                    <span className={`text-xs font-sans ${chk.completed ? 'line-through text-neutral-500' : 'text-neutral-200 font-medium'}`}>
                      {chk.task}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-amber-900/30">
              <button
                onClick={() => {
                  if (confirm('Deseja realmente remover este projeto?')) {
                    onDeleteProject(selectedProject.id);
                    setSelectedProject(null);
                    onAddToast('Projeto removido', 'warning');
                  }
                }}
                className="px-3 py-2 rounded bg-rose-950 border border-rose-800 text-rose-300 font-bold text-xs uppercase flex items-center space-x-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Excluir</span>
              </button>

              <button
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2 rounded-lg bg-amber-400 text-black font-black text-xs uppercase tracking-wider"
              >
                Fechar
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Modal Create Project */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-neutral-950 border border-amber-500/50 rounded-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-amber-900/40">
              <h3 className="text-base font-bold text-white uppercase flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Cadastrar Novo Projeto Real</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-amber-400 block mb-1 uppercase">Título do Projeto *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="EX: PORTAL INSTITUCIONAL V2"
                  className="w-full bg-neutral-900 border border-amber-900/60 rounded-lg px-3 py-2.5 text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="font-bold text-amber-400 block mb-1 uppercase">Nome do Cliente *</label>
                <input
                  type="text"
                  required
                  value={clientInput}
                  onChange={(e) => setClientInput(e.target.value)}
                  placeholder="EX: Empresa / Cliente Exemplo"
                  className="w-full bg-neutral-900 border border-amber-900/60 rounded-lg px-3 py-2.5 text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-amber-400 block mb-1 uppercase">Categoria</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-neutral-900 border border-amber-900/60 rounded-lg px-3 py-2.5 text-white"
                  >
                    <option value="Website Institucional">Website Institucional</option>
                    <option value="Landing Page Alta Conversão">Landing Page</option>
                    <option value="E-Commerce Veloz">E-Commerce</option>
                    <option value="Plataforma SaaS / WebApp">Plataforma SaaS</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-amber-400 block mb-1 uppercase">Valor do Projeto (R$)</label>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="R$ 15.000,00"
                    className="w-full bg-neutral-900 border border-amber-900/60 rounded-lg px-3 py-2.5 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-amber-400 block mb-1 uppercase">Prazo Final de Entrega</label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full bg-neutral-900 border border-amber-900/60 rounded-lg px-3 py-2.5 text-white"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-amber-900/30">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  className="px-4 py-2 bg-neutral-900 text-neutral-300 rounded-lg font-bold"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-black font-black uppercase rounded-lg tracking-wider"
                >
                  Cadastrar Projeto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
