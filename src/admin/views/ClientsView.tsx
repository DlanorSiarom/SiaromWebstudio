import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  Eye, 
  FileText, 
  Phone, 
  Mail, 
  MapPin, 
  X, 
  CheckCircle2, 
  Clock, 
  Star,
  Paperclip,
  Send,
  Download
} from 'lucide-react';
import { ClientItem } from '../adminTypes';

interface ClientsViewProps {
  clients: ClientItem[];
  onAddClient: (newClient: ClientItem) => void;
  onUpdateClient: (updated: ClientItem) => void;
  onDeleteClient: (id: string) => void;
  onAddToast: (title: string, type?: 'success' | 'warning' | 'error' | 'info', message?: string) => void;
}

export const ClientsView: React.FC<ClientsViewProps> = ({
  clients,
  onAddClient,
  onUpdateClient,
  onDeleteClient,
  onAddToast
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [selectedClient, setSelectedClient] = useState<ClientItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<ClientItem | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [responsiblePerson, setResponsiblePerson] = useState('');
  const [contractValue, setContractValue] = useState('');
  const [status, setStatus] = useState<'ativo' | 'inativo' | 'prospect' | 'vip'>('ativo');
  const [newNote, setNewNote] = useState('');

  const filteredClients = clients.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'todos' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenCreateModal = () => {
    setEditingClient(null);
    setName('');
    setCompany('');
    setEmail('');
    setPhone('');
    setAddress('');
    setResponsiblePerson('');
    setContractValue('');
    setStatus('ativo');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (client: ClientItem) => {
    setEditingClient(client);
    setName(client.name);
    setCompany(client.company);
    setEmail(client.email);
    setPhone(client.phone);
    setAddress(client.address);
    setResponsiblePerson(client.responsiblePerson);
    setContractValue(client.contractValue);
    setStatus(client.status);
    setIsModalOpen(true);
  };

  const handleSaveClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      onAddToast('Preencha os campos obrigatórios', 'warning');
      return;
    }

    if (editingClient) {
      const updated: ClientItem = {
        ...editingClient,
        name,
        company,
        email,
        phone,
        address,
        responsiblePerson,
        contractValue,
        status
      };
      onUpdateClient(updated);
      onAddToast('Cliente atualizado com sucesso!', 'success');
      if (selectedClient?.id === updated.id) setSelectedClient(updated);
    } else {
      const newCli: ClientItem = {
        id: `cli-${Date.now().toString().slice(-4)}`,
        name,
        company,
        email,
        phone,
        address,
        status,
        responsiblePerson,
        projectsCount: 0,
        contractValue: contractValue || 'R$ 0,00',
        contractFile: 'contrato_padrao_gerado.pdf',
        notes: ['Cliente cadastrado no painel Siarom.'],
        createdAt: new Date().toISOString().split('T')[0],
        history: [{ date: new Date().toISOString().split('T')[0], action: 'Cadastro realizado', author: 'Roberto Siarom' }]
      };
      onAddClient(newCli);
      onAddToast('Novo cliente cadastrado com sucesso!', 'success');
    }

    setIsModalOpen(false);
  };

  const handleAddNote = (client: ClientItem) => {
    if (!newNote.trim()) return;
    const updated: ClientItem = {
      ...client,
      notes: [...client.notes, newNote],
      history: [...client.history, { date: 'Hoje', action: `Nova nota: "${newNote.slice(0, 30)}..."`, author: 'Roberto Siarom' }]
    };
    onUpdateClient(updated);
    setSelectedClient(updated);
    setNewNote('');
    onAddToast('Nota interna registrada', 'info');
  };

  const getStatusBadge = (st: string) => {
    switch (st) {
      case 'vip':
        return <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-500 text-black border border-amber-300">VIP</span>;
      case 'ativo':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">ATIVO</span>;
      case 'prospect':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-400 border border-cyan-800">PROSPECT</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-neutral-900 text-neutral-400 border border-neutral-800">INATIVO</span>;
    }
  };

  return (
    <div className="space-y-6 font-mono pb-12 animate-fadeIn">
      
      {/* Top Controls Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-5 rounded-xl bg-black/90 border border-amber-900/50">
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <div className="p-2 rounded bg-amber-950 text-amber-400 border border-amber-800">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white uppercase">Gestão Completa de Clientes</h2>
            <p className="text-xs text-neutral-400 font-sans">Cadastre, acompanhe contratos, arquivos e histórico.</p>
          </div>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="w-full md:w-auto px-4 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-black text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-lg shadow-amber-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Cadastrar Novo Cliente</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        
        <div className="md:col-span-8 relative">
          <Search className="w-4 h-4 text-amber-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquisar cliente por nome, empresa ou email..."
            className="w-full bg-neutral-950 border border-amber-900/60 rounded-lg pl-10 pr-4 py-2.5 text-xs text-amber-200 focus:outline-none focus:border-amber-400 uppercase"
          />
        </div>

        <div className="md:col-span-4 flex items-center space-x-2">
          <Filter className="w-4 h-4 text-amber-400 shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-neutral-950 border border-amber-900/60 rounded-lg px-3 py-2.5 text-xs text-amber-300 focus:outline-none focus:border-amber-400 uppercase font-bold"
          >
            <option value="todos">Todos os Status</option>
            <option value="vip">Apenas Clientes VIP</option>
            <option value="ativo">Apenas Ativos</option>
            <option value="prospect">Apenas Prospects</option>
            <option value="inativo">Apenas Inativos</option>
          </select>
        </div>

      </div>

      {/* Main Clients Table */}
      <div className="bg-black/90 rounded-xl border border-amber-900/50 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-950 border-b border-amber-900/40 text-amber-400 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-4">Cliente / Empresa</th>
                <th className="p-4">Contato / Responsável</th>
                <th className="p-4">Status</th>
                <th className="p-4">Valor Contrato</th>
                <th className="p-4">Projetos</th>
                <th className="p-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-900/30">
              {filteredClients.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-neutral-500 font-sans">
                    Nenhum cliente encontrado.
                  </td>
                </tr>
              ) : (
                filteredClients.map((client) => (
                  <tr key={client.id} className="hover:bg-neutral-900/60 transition-colors">
                    
                    <td className="p-4">
                      <div className="font-bold text-white uppercase">{client.name}</div>
                      <div className="text-[11px] text-neutral-400 font-sans">{client.company}</div>
                    </td>

                    <td className="p-4">
                      <div className="text-amber-300">{client.responsiblePerson}</div>
                      <div className="text-[10px] text-neutral-400 font-sans">{client.email}</div>
                    </td>

                    <td className="p-4">
                      {getStatusBadge(client.status)}
                    </td>

                    <td className="p-4 font-bold text-amber-400">
                      {client.contractValue}
                    </td>

                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded bg-neutral-900 border border-amber-900 text-[10px] text-amber-400 font-bold">
                        {client.projectsCount} Projetos
                      </span>
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => setSelectedClient(client)}
                          className="p-1.5 rounded bg-neutral-900 hover:bg-amber-950 text-amber-400 border border-amber-900/60 transition-colors"
                          title="Ver Detalhes do Cliente"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleOpenEditModal(client)}
                          className="p-1.5 rounded bg-neutral-900 hover:bg-cyan-950 text-cyan-400 border border-cyan-900/60 transition-colors"
                          title="Editar Cliente"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Deseja remover o cliente ${client.name}?`)) {
                              onDeleteClient(client.id);
                              onAddToast('Cliente removido', 'warning');
                            }
                          }}
                          className="p-1.5 rounded bg-neutral-900 hover:bg-rose-950 text-rose-400 border border-rose-900/60 transition-colors"
                          title="Excluir Cliente"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Client Detail Drawer / Modal */}
      {selectedClient && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end animate-fadeIn">
          <div className="w-full max-w-xl bg-neutral-950 border-l border-amber-500/40 h-full overflow-y-auto p-6 space-y-6 shadow-2xl">
            
            <div className="flex items-center justify-between pb-4 border-b border-amber-900/40">
              <div>
                <span className="text-[10px] text-amber-500 font-bold uppercase tracking-widest">FICHA DE CLIENTE</span>
                <h3 className="text-xl font-bold text-white uppercase">{selectedClient.name}</h3>
                <span className="text-xs text-neutral-400">{selectedClient.company}</span>
              </div>
              <button 
                onClick={() => setSelectedClient(null)}
                className="p-1.5 rounded bg-neutral-900 hover:text-white text-neutral-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-black border border-amber-900/40 text-xs">
              <div>
                <span className="text-neutral-500 block text-[10px] uppercase">Responsável:</span>
                <span className="text-amber-300 font-bold">{selectedClient.responsiblePerson}</span>
              </div>
              <div>
                <span className="text-neutral-500 block text-[10px] uppercase">Valor do Contrato:</span>
                <span className="text-emerald-400 font-bold">{selectedClient.contractValue}</span>
              </div>
              <div>
                <span className="text-neutral-500 block text-[10px] uppercase">E-mail:</span>
                <span className="text-white">{selectedClient.email}</span>
              </div>
              <div>
                <span className="text-neutral-500 block text-[10px] uppercase">Telefone:</span>
                <span className="text-white">{selectedClient.phone}</span>
              </div>
              <div className="col-span-2">
                <span className="text-neutral-500 block text-[10px] uppercase">Endereço:</span>
                <span className="text-neutral-300">{selectedClient.address}</span>
              </div>
            </div>

            {/* Contract File Download */}
            <div className="p-4 rounded-lg bg-neutral-900/80 border border-amber-900/40 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-amber-400" />
                <div>
                  <span className="text-xs font-bold text-white block uppercase">Contrato Social / Proposta</span>
                  <span className="text-[10px] text-neutral-400">{selectedClient.contractFile || 'contrato_assinado.pdf'}</span>
                </div>
              </div>
              <button 
                onClick={() => onAddToast('Download do contrato simulado iniciado', 'success')}
                className="px-3 py-1.5 rounded bg-amber-400 hover:bg-amber-300 text-black font-bold text-[10px] uppercase flex items-center space-x-1"
              >
                <Download className="w-3 h-3" />
                <span>Baixar</span>
              </button>
            </div>

            {/* Internal Notes Section */}
            <div className="space-y-3">
              <h4 className="font-bold text-white uppercase text-xs">Notas Internas da Equipe</h4>
              <div className="space-y-2">
                {selectedClient.notes.map((note, idx) => (
                  <div key={idx} className="p-3 rounded bg-black border border-amber-900/30 text-xs text-amber-200 font-sans">
                    {note}
                  </div>
                ))}
              </div>
              <div className="flex space-x-2 pt-2">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Adicionar nova observação interna..."
                  className="w-full bg-black border border-amber-900/60 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
                <button
                  onClick={() => handleAddNote(selectedClient)}
                  className="px-3 py-2 rounded bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* History Feed */}
            <div className="space-y-3 pt-4 border-t border-amber-900/30">
              <h4 className="font-bold text-white uppercase text-xs">Histórico de Alterações</h4>
              <div className="space-y-2">
                {selectedClient.history.map((h, idx) => (
                  <div key={idx} className="flex items-center justify-between text-[11px] p-2 rounded bg-neutral-900/50">
                    <span className="text-neutral-300">{h.action}</span>
                    <span className="text-neutral-500">{h.date} • {h.author}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Create / Edit Client Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-lg bg-neutral-950 border border-amber-500/40 rounded-xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-amber-900/40">
              <h3 className="text-base font-bold text-white uppercase">
                {editingClient ? 'Editar Cliente' : 'Cadastrar Novo Cliente'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveClient} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-amber-400 block mb-1 uppercase">Nome da Empresa / Cliente *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="EX: NEXUS DIGITAL TECH"
                  className="w-full bg-neutral-900 border border-amber-900/60 rounded px-3 py-2 text-white focus:outline-none focus:border-amber-400 uppercase"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-amber-400 block mb-1 uppercase">Razão Social</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="NEXUS SOLUÇÕES LTDA"
                    className="w-full bg-neutral-900 border border-amber-900/60 rounded px-3 py-2 text-white focus:outline-none focus:border-amber-400 uppercase"
                  />
                </div>
                <div>
                  <label className="font-bold text-amber-400 block mb-1 uppercase">Responsável</label>
                  <input
                    type="text"
                    value={responsiblePerson}
                    onChange={(e) => setResponsiblePerson(e.target.value)}
                    placeholder="MARCOS VINICIUS"
                    className="w-full bg-neutral-900 border border-amber-900/60 rounded px-3 py-2 text-white focus:outline-none focus:border-amber-400 uppercase"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-amber-400 block mb-1 uppercase">E-mail *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="CONTATO@EMPRESA.COM"
                    className="w-full bg-neutral-900 border border-amber-900/60 rounded px-3 py-2 text-white focus:outline-none focus:border-amber-400 uppercase"
                  />
                </div>
                <div>
                  <label className="font-bold text-amber-400 block mb-1 uppercase">Telefone / WhatsApp</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(11) 99999-8888"
                    className="w-full bg-neutral-900 border border-amber-900/60 rounded px-3 py-2 text-white focus:outline-none focus:border-amber-400 uppercase"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-amber-400 block mb-1 uppercase">Valor Contrato (R$)</label>
                  <input
                    type="text"
                    value={contractValue}
                    onChange={(e) => setContractValue(e.target.value)}
                    placeholder="R$ 15.000,00"
                    className="w-full bg-neutral-900 border border-amber-900/60 rounded px-3 py-2 text-white focus:outline-none focus:border-amber-400 uppercase"
                  />
                </div>
                <div>
                  <label className="font-bold text-amber-400 block mb-1 uppercase">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full bg-neutral-900 border border-amber-900/60 rounded px-3 py-2 text-white focus:outline-none focus:border-amber-400 uppercase font-bold"
                  >
                    <option value="ativo">ATIVO</option>
                    <option value="vip">VIP</option>
                    <option value="prospect">PROSPECT</option>
                    <option value="inativo">INATIVO</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-amber-400 block mb-1 uppercase">Endereço Completo</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="AV. PAULISTA, 1000 - SÃO PAULO, SP"
                  className="w-full bg-neutral-900 border border-amber-900/60 rounded px-3 py-2 text-white focus:outline-none focus:border-amber-400 uppercase"
                />
              </div>

              <div className="pt-3 flex items-center justify-end space-x-3 border-t border-amber-900/30">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded bg-neutral-900 text-neutral-300 hover:text-white uppercase font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded bg-amber-400 hover:bg-amber-300 text-black font-black uppercase tracking-wider"
                >
                  Salvar Cliente
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
