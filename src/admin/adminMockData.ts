import { 
  AdminUser, 
  UserSession, 
  ClientItem, 
  ProjectItem, 
  CMSPage, 
  MediaFile, 
  MarketingCampaign, 
  LeadItem, 
  SystemLog, 
  BackupItem, 
  SecurityThreat, 
  NotificationItem 
} from './adminTypes';

// Single Administrator Account
export const INITIAL_ADMIN_USERS: AdminUser[] = [
  {
    id: 'usr-admin',
    name: 'Administrador Siarom',
    email: 'ronalldrobert@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    role: 'Administrador',
    status: 'ativo',
    twoFactorEnabled: true,
    lastLogin: 'Agora',
    createdAt: new Date().toISOString().split('T')[0],
    permissions: ['all']
  }
];

// Sessions
export const INITIAL_USER_SESSIONS: UserSession[] = [
  {
    id: 'sess-01',
    userId: 'usr-admin',
    userName: 'Administrador Siarom',
    userRole: 'Administrador',
    ip: '127.0.0.1',
    device: 'Painel Central',
    os: 'Linux Web',
    browser: 'Chrome / WebApp',
    location: 'Brasil',
    isCurrent: true,
    loginTime: new Date().toLocaleString('pt-BR'),
    lastActive: 'Agora'
  }
];

// Real Clients Base
export const INITIAL_CLIENTS: ClientItem[] = [
  {
    id: 'cli-01',
    name: 'Primos Salgados',
    email: 'contato@primossalgados.com.br',
    phone: '(11) 98888-7777',
    company: 'Primos Salgados & Lanchonete',
    segment: 'Alimentação & Delivery',
    status: 'ativo',
    activeProjectsCount: 1,
    totalSpent: 'R$ 2.800,00',
    avatar: 'https://i.ibb.co/VfGwhtB/Captura-de-tela-2026-08-11-204922.png',
    notes: 'Cliente de Cardápio Digital com WhatsApp Checkout.',
    createdAt: '2026-01-15'
  },
  {
    id: 'cli-02',
    name: 'G0E4 Construção',
    email: 'vendas@g0e4construcao.com.br',
    phone: '(11) 97777-6666',
    company: 'G0E4 Materiais de Construção',
    segment: 'Construção Civil',
    status: 'ativo',
    activeProjectsCount: 1,
    totalSpent: 'R$ 4.500,00',
    avatar: 'https://i.ibb.co/tpkpVhV7/Captura-de-tela-2026-08-11-205014.png',
    notes: 'Catálogo online de materiais de construção e suprimentos.',
    createdAt: '2026-02-10'
  },
  {
    id: 'cli-03',
    name: 'Butterfly Beauty Studio',
    email: 'contato@butterflystudio.com.br',
    phone: '(11) 96666-5555',
    company: 'Butterfly Studio & Estética',
    segment: 'Estética & Beleza',
    status: 'ativo',
    activeProjectsCount: 1,
    totalSpent: 'R$ 1.990,00',
    avatar: 'https://i.ibb.co/ycZjS4rp/Captura-de-tela-2026-08-11-205036.png',
    notes: 'Landing Page de Alta Conversão.',
    createdAt: '2026-03-01'
  },
  {
    id: 'cli-04',
    name: 'Dicasa Açaí',
    email: 'pedidos@dicasaacai.com.br',
    phone: '(11) 95555-4444',
    company: 'Dicasa Açaí & Sobremesas',
    segment: 'Alimentação & Delivery',
    status: 'ativo',
    activeProjectsCount: 1,
    totalSpent: 'R$ 2.490,00',
    avatar: 'https://i.ibb.co/B22bbWMr/Captura-de-tela-2026-08-11-205055.png',
    notes: 'Web App de montagem personalizada de copos de açaí.',
    createdAt: '2026-03-20'
  }
];

// Real Projects Base
export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-01',
    title: 'Primos Salgados & Delivery',
    clientId: 'cli-01',
    clientName: 'Primos Salgados',
    deadline: '2026-02-01',
    value: 'R$ 2.800,00',
    status: 'concluido',
    progress: 100,
    category: 'E-commerce',
    team: [
      { name: 'Admin Siarom', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80', role: 'Dev Lead' }
    ],
    checklist: [
      { id: 'chk-1', task: 'Design UI/UX e Cardápio Interativo', completed: true },
      { id: 'chk-2', task: 'Integração de Pedidos via WhatsApp', completed: true },
      { id: 'chk-3', task: 'Publicação na Vercel e Testes', completed: true }
    ],
    commentsCount: 4,
    createdAt: '2026-01-15',
    updatedAt: '2026-02-01'
  },
  {
    id: 'proj-02',
    title: 'G0E4 Materiais de Construção',
    clientId: 'cli-02',
    clientName: 'G0E4 Construção',
    deadline: '2026-03-01',
    value: 'R$ 4.500,00',
    status: 'concluido',
    progress: 100,
    category: 'E-commerce',
    team: [
      { name: 'Admin Siarom', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80', role: 'Dev Lead' }
    ],
    checklist: [
      { id: 'chk-1', task: 'Estruturação do Catálogo de Produtos', completed: true },
      { id: 'chk-2', task: 'Sistema de Solicitação de Orçamentos', completed: true },
      { id: 'chk-3', task: 'Entrega do Projeto', completed: true }
    ],
    commentsCount: 2,
    createdAt: '2026-02-10',
    updatedAt: '2026-03-01'
  },
  {
    id: 'proj-03',
    title: 'Butterfly Studio & Estética',
    clientId: 'cli-03',
    clientName: 'Butterfly Beauty Studio',
    deadline: '2026-03-15',
    value: 'R$ 1.990,00',
    status: 'concluido',
    progress: 100,
    category: 'Landing Page',
    team: [
      { name: 'Admin Siarom', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80', role: 'Dev Lead' }
    ],
    checklist: [
      { id: 'chk-1', task: 'Design UI/UX e Apresentação de Procedimentos', completed: true },
      { id: 'chk-2', task: 'Canal de Agendamentos Online', completed: true },
      { id: 'chk-3', task: 'Publicação e Entrega', completed: true }
    ],
    commentsCount: 3,
    createdAt: '2026-03-01',
    updatedAt: '2026-03-15'
  },
  {
    id: 'proj-04',
    title: 'Dicasa Açaí & Delivery',
    clientId: 'cli-04',
    clientName: 'Dicasa Açaí',
    deadline: '2026-04-01',
    value: 'R$ 2.490,00',
    status: 'concluido',
    progress: 100,
    category: 'E-commerce',
    team: [
      { name: 'Admin Siarom', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80', role: 'Dev Lead' }
    ],
    checklist: [
      { id: 'chk-1', task: 'Interface de Montagem Personalizada de Copos', completed: true },
      { id: 'chk-2', task: 'Checkout Expresso via WhatsApp', completed: true },
      { id: 'chk-3', task: 'Publicação na Vercel', completed: true }
    ],
    commentsCount: 1,
    createdAt: '2026-03-20',
    updatedAt: '2026-04-01'
  }
];

export const INITIAL_CMS_PAGES: CMSPage[] = [
  {
    id: 'cms-home',
    slug: 'home',
    title: 'Página Inicial (Home)',
    status: 'publicado',
    lastEditedBy: 'Administrador Siarom',
    updatedAt: new Date().toLocaleDateString('pt-BR'),
    seo: {
      metaTitle: 'Siarom // Web Studio & Soluções Digitais',
      metaDescription: 'Desenvolvemos sites profissionais, e-commerces e plataformas web corporativas com alto desempenho.',
      keywords: 'desenvolvimento web, sites profissionais, react, tailwind, siarom',
      openGraphImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'
    },
    contentBlocks: [
      {
        id: 'blk-1',
        sectionName: 'Hero Header',
        subtitle: 'CRIAMOS EXPERIÊNCIAS DIGITAIS EXTRAORDINÁRIAS',
        bodyText: 'Desenvolvemos portais institucionais, landing pages e sistemas sob medida com performance e estética de alto nível.',
        badgeText: 'MÓDULO DE ENGENHARIA DE SOFTWARE V4.8'
      }
    ]
  }
];

export const INITIAL_MEDIA_FILES: MediaFile[] = [];

export const INITIAL_MARKETING_CAMPAIGNS: MarketingCampaign[] = [];

export const INITIAL_LEADS: LeadItem[] = [];

export const INITIAL_SYSTEM_LOGS: SystemLog[] = [
  {
    id: `log-${Date.now()}`,
    timestamp: new Date().toLocaleString('pt-BR'),
    userId: 'usr-admin',
    userName: 'Administrador Siarom',
    actionType: 'system_start',
    severity: 'info',
    description: '4 Projetos reais cadastrados com sucesso no portfólio Siarom.',
    ip: '127.0.0.1',
    browser: 'Chrome Web',
    os: 'Linux',
    location: 'Brasil'
  }
];

export const INITIAL_BACKUPS: BackupItem[] = [];

export const INITIAL_SECURITY_THREATS: SecurityThreat[] = [];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Portfólio Atualizado',
    message: 'Projetos reais (Primos Salgados, G0E4 Construção, Butterfly Studio e Dicasa Açaí) publicados no sistema.',
    timestamp: 'Agora',
    type: 'system',
    read: false
  }
];
