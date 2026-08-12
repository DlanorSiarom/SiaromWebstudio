export type AdminSection = 
  | 'dashboard'
  | 'clients'
  | 'projects'
  | 'content'
  | 'media'
  | 'marketing'
  | 'analytics'
  | 'users'
  | 'security'
  | 'backups'
  | 'logs'
  | 'settings';

export type UserRole = 'Administrador' | 'Editor' | 'Financeiro' | 'Suporte' | 'Cliente';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  status: 'ativo' | 'bloqueado' | 'pendente';
  twoFactorEnabled: boolean;
  lastLogin: string;
  createdAt: string;
  permissions: string[];
}

export interface UserSession {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  ip: string;
  device: string;
  os: string;
  browser: string;
  location: string;
  isCurrent: boolean;
  loginTime: string;
  lastActive: string;
}

export interface ClientItem {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  status: 'ativo' | 'inativo' | 'prospect' | 'vip';
  responsiblePerson: string;
  projectsCount: number;
  contractValue: string;
  contractFile?: string;
  notes: string[];
  createdAt: string;
  history: { date: string; action: string; author: string }[];
}

export interface ProjectChecklistItem {
  id: string;
  task: string;
  completed: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  clientId: string;
  clientName: string;
  deadline: string;
  value: string;
  status: 'planejamento' | 'em_desenvolvimento' | 'revisao' | 'concluido' | 'pausado';
  progress: number; // 0 to 100
  team: { name: string; avatar: string; role: string }[];
  checklist: ProjectChecklistItem[];
  commentsCount: number;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface CMSPage {
  id: string;
  slug: string;
  title: string;
  status: 'publicado' | 'rascunho' | 'revisao';
  lastEditedBy: string;
  updatedAt: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
    openGraphImage: string;
  };
  contentBlocks: {
    id: string;
    sectionName: string;
    subtitle?: string;
    bodyText?: string;
    badgeText?: string;
  }[];
}

export interface MediaFile {
  id: string;
  name: string;
  type: 'image' | 'document' | 'video' | 'archive';
  url: string;
  size: string;
  folder: string;
  compressed: boolean;
  compressionSavings?: string;
  uploadedAt: string;
  trashed?: boolean;
}

export interface MarketingCampaign {
  id: string;
  title: string;
  type: 'Landing Page' | 'Google Ads' | 'Meta Ads' | 'Newsletter';
  status: 'ativa' | 'pausada' | 'finalizada';
  leadsGenerated: number;
  conversionRate: string;
  budget: string;
  spent: string;
}

export interface LeadItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  status: 'novo' | 'em_contato' | 'qualificado' | 'convertido' | 'perdido';
  date: string;
}

export interface SystemLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  actionType: 'login' | 'logout' | 'create' | 'update' | 'delete' | 'upload' | 'security_alert' | 'permission_change';
  severity: 'info' | 'warning' | 'error' | 'critical';
  description: string;
  ip: string;
  browser: string;
  os: string;
  location: string;
}

export interface BackupItem {
  id: string;
  filename: string;
  size: string;
  type: 'manual' | 'automatico';
  status: 'concluido' | 'em_andamento' | 'falha';
  checksum: string;
  createdAt: string;
}

export interface SecurityThreat {
  id: string;
  timestamp: string;
  type: 'brute_force' | 'suspicious_ip' | 'multiple_logins' | 'unauthorized_access' | 'malicious_upload';
  severity: 'alta' | 'critica' | 'media';
  ip: string;
  location: string;
  status: 'bloqueado' | 'investigando' | 'resolvido';
  details: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'lead' | 'project' | 'security' | 'backup' | 'system';
  read: boolean;
}
