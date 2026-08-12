export type ProjectCategory = 'Todos' | 'Landing Page' | 'E-commerce' | 'Institucional' | 'Sistema Web' | 'Portfólio & Blog';

export interface PortfolioItem {
  id: string;
  title: string;
  clientName: string;
  category: 'Landing Page' | 'E-commerce' | 'Institucional' | 'Sistema Web' | 'Portfólio & Blog';
  description: string;
  fullDescription?: string;
  image: string;
  liveUrl: string;
  tags: string[];
  year: string;
  metrics?: { label: string; value: string }[];
  featured?: boolean;
  isCustomAdded?: boolean;
  accentColor?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  iconName: string;
  deliverables: string[];
  badge: string;
  priceStarting: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  role: string;
  company: string;
  avatar: string;
  comment: string;
  rating: number;
  projectType: string;
}

export interface ProjectBrief {
  siteType: string;
  features: string[];
  style: string;
  companyName: string;
  contactName: string;
  whatsapp: string;
  email: string;
  description: string;
  budgetRange: string;
  urgency: string;
}

export interface AiProposal {
  title: string;
  executiveSummary: string;
  architecture: string[];
  suggestedModules: string[];
  estimatedTimeline: string;
  investmentTier: string;
  nextSteps: string[];
}
