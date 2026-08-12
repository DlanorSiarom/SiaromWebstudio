import { PortfolioItem, ServiceItem, Testimonial } from '../types';

// Real Published Websites by Siarom Studio
export const INITIAL_PORTFOLIO: PortfolioItem[] = [
  {
    id: 'real-proj-1',
    title: 'Primos Salgados & Delivery',
    clientName: 'Primos Salgados',
    category: 'E-commerce',
    description: 'Plataforma interativa de cardápio digital e pedidos de salgados gourmet com checkout direto via WhatsApp e cálculo dinâmico.',
    fullDescription: 'O projeto Primos Salgados foi desenvolvido para modernizar o processo de atendimento e recebimento de pedidos da empresa. Com uma interface ultra-rápida otimizada para smartphones, o cliente navega pelo catálogo de salgados gourmet, monta seu pedido personalizado e envia diretamente para o atendente via WhatsApp com todas as especificações pré-formatadas.',
    image: 'https://i.ibb.co/VfGwhtB/Captura-de-tela-2026-08-11-204922.png',
    liveUrl: 'https://primos-salgados.vercel.app/',
    tags: ['Cardápio Digital', 'React', 'E-Commerce', 'WhatsApp API', 'Tailwind CSS'],
    year: '2026',
    featured: true,
    accentColor: '#f59e0b',
    metrics: [
      { label: 'Formato', value: 'Cardápio Digital' },
      { label: 'Performance', value: '100% Mobile' }
    ]
  },
  {
    id: 'real-proj-2',
    title: 'G0E4 Materiais de Construção',
    clientName: 'G0E4 Construção',
    category: 'E-commerce',
    description: 'Catálogo digital e plataforma de orçamentos online para depósitos de materiais de construção, ferramentas, elétrica e hidráulica.',
    fullDescription: 'Plataforma completa de exibição de materiais de construção, permitindo que clientes e empreiteiros naveguem por categorias completas (alvenaria, hidráulica, elétrica, pintura e ferramentas), selecionem itens de interesse e solicitem cotações imediatas de frete e suprimentos.',
    image: 'https://i.ibb.co/tpkpVhV7/Captura-de-tela-2026-08-11-205014.png',
    liveUrl: 'https://materiais-de-construcao-g0e419ap6-moraend.vercel.app/',
    tags: ['E-Commerce', 'Catálogo Online', 'Orçamento Rápido', 'React', 'Tailwind CSS'],
    year: '2026',
    featured: true,
    accentColor: '#06b6d4',
    metrics: [
      { label: 'Especialidade', value: 'Materiais de Construção' },
      { label: 'Velocidade', value: 'Super Rápid' }
    ]
  },
  {
    id: 'real-proj-3',
    title: 'Butterfly Studio & Estética',
    clientName: 'Butterfly Beauty Studio',
    category: 'Landing Page',
    description: 'Landing page minimalista de alta conversão para estúdio de estética, apresentação de tratamentos e agendamentos diretos.',
    fullDescription: 'Desenvolvido com uma estética sofisticada e feminina, o site do Butterfly Studio apresenta os tratamentos estéticos oferecidos, resultados de procedimentos, depoimentos e canal direto de agendamento de horários para clientes.',
    image: 'https://i.ibb.co/ycZjS4rp/Captura-de-tela-2026-08-11-205036.png',
    liveUrl: 'https://butterfly-smoky.vercel.app/',
    tags: ['Landing Page', 'Design UI/UX', 'Beleza & Estética', 'Agendamento Online'],
    year: '2026',
    featured: true,
    accentColor: '#ec4899',
    metrics: [
      { label: 'Estilo', value: 'Design UI/UX Luxo' },
      { label: 'Foco', value: 'Alta Conversão' }
    ]
  },
  {
    id: 'real-proj-4',
    title: 'Dicasa Açaí & Delivery',
    clientName: 'Dicasa Açaí',
    category: 'E-commerce',
    description: 'Web app interativo para montagem personalizada de copos de açaí, barcas e sobremesas geladas com escolha de adicionais em tempo real.',
    fullDescription: 'Uma experiência de pedido altamente visual e intuitiva para os clientes do Dicasa Açaí. Permite escolher tamanhos de copo, coberturas, acompanhamentos e frutas em tempo real com envio instantâneo do pedido para o delivery.',
    image: 'https://i.ibb.co/B22bbWMr/Captura-de-tela-2026-08-11-205055.png',
    liveUrl: 'https://dicasaacai.vercel.app/',
    tags: ['Delivery', 'Açaí & Gelados', 'Cardápio Interativo', 'React', 'Tailwind CSS'],
    year: '2026',
    featured: true,
    accentColor: '#a855f7',
    metrics: [
      { label: 'Nicho', value: 'Açaí & Sobremesas' },
      { label: 'UX Interativa', value: 'Montagem em Tempo Real' }
    ]
  }
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 's1',
    title: 'Landing Pages de Alta Conversão',
    shortDesc: 'Páginas estratégicas projetadas para transformar visitantes em clientes compradores instantaneamente.',
    iconName: 'Zap',
    badge: 'Mais Pedido',
    priceStarting: 'Sob Consulta via WhatsApp',
    deliverables: [
      'Copywriting focado em vendas e persuasão',
      'Design moderno com efeito parallax e micro-animações',
      'Integração direta com WhatsApp e e-mail',
      'Otimização extrema para dispositivos móveis',
      'Entrega rápida em até 5 dias úteis'
    ]
  },
  {
    id: 's2',
    title: 'Sites Institucionais Sob Medida',
    shortDesc: 'Presença digital corporativa de alto impacto para autoridade máxima no seu nicho de mercado.',
    iconName: 'Globe',
    badge: 'Autoridade',
    priceStarting: 'Sob Consulta via WhatsApp',
    deliverables: [
      'Até 8 páginas estruturadas (Home, Sobre, Serviços, Portfólio, Contato, etc.)',
      'Painel intuitivo para você atualizar textos e fotos facilmente',
      'SEO avançado para aparecer no topo do Google',
      'Certificado de Segurança SSL incluso',
      'E-mails profissionais vinculados ao seu domínio'
    ]
  },
  {
    id: 's3',
    title: 'E-Commerce & Lojas Virtuais',
    shortDesc: 'Lojas virtuais completas, seguras e prontas para você vender produtos físicos ou digitais 24/7.',
    iconName: 'ShoppingCart',
    badge: 'Vendas 24/7',
    priceStarting: 'Sob Consulta via WhatsApp',
    deliverables: [
      'Checkout transparente com Pix, Cartão de Crédito e Boleto',
      'Cálculo automático de frete (Correios/Melhor Envio)',
      'Gestão simplificada de estoque e catálogo de produtos',
      'Recuperação de carrinho abandonado via WhatsApp',
      'Design ultra-responsivo e intuitivo para o cliente'
    ]
  },
  {
    id: 's4',
    title: 'Sistemas Web & Plataformas SaaS',
    shortDesc: 'Aplicações web complexas com gestão de usuários, painéis de controle e automações inteligentes.',
    iconName: 'Cpu',
    badge: 'Avançado',
    priceStarting: 'Sob Consulta via WhatsApp',
    deliverables: [
      'Arquitetura escalável de alta velocidade',
      'Autenticação de usuários, perfis e permissões',
      'Dashboards com gráficos dinâmicos e relatórios exportáveis',
      'APIs personalizadas e banco de dados rápido',
      'Suporte técnico e manutenção evolutiva contínua'
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    clientName: 'Primos Salgados',
    role: 'Gestor Comercial',
    company: 'Primos Salgados',
    avatar: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?q=80&w=200&auto=format&fit=crop',
    comment: 'A Siarom superou todas as expectativas na criação do nosso cardápio digital. Nossos clientes elogiam muito a facilidade de pedir pelo WhatsApp.',
    rating: 5,
    projectType: 'Cardápio Digital & E-Commerce'
  },
  {
    id: 't2',
    clientName: 'Butterfly Studio',
    role: 'Diretora de Estética',
    company: 'Butterfly Studio',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
    comment: 'Design espetacular e muito elegante. O site nos trouxe diversas novas clientes pelo canal direto de agendamentos.',
    rating: 5,
    projectType: 'Landing Page de Alta Conversão'
  },
  {
    id: 't3',
    clientName: 'Dicasa Açaí',
    role: 'Proprietário',
    company: 'Dicasa Açaí',
    avatar: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?q=80&w=200&auto=format&fit=crop',
    comment: 'Trabalhar com a Siarom aumentou a velocidade de atendimento do nosso delivery de açaí. Excelente engenharia e suporte!',
    rating: 5,
    projectType: 'Web App Delivery'
  }
];

export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Briefing & Alinhamento Estratégico',
    description: 'Entendemos a essência da sua marca, o público-alvo e os objetivos de negócio para planejar a estrutura perfeita do site.'
  },
  {
    step: '02',
    title: 'Arquitetura & UI/UX Design Exclusivo',
    description: 'Projetamos layouts modernos com foco em usabilidade e identidade visual marcante para destacar sua empresa da concorrência.'
  },
  {
    step: '03',
    title: 'Desenvolvimento & Engenharia de Código',
    description: 'Codificamos com as tecnologias mais rápidas e seguras do mercado, garantindo nota máxima em performance e animações fluidas.'
  },
  {
    step: '04',
    title: 'Testes, SEO & Lançamento',
    description: 'Realizamos rigorosos testes em múltiplos celulares e computadores, otimizamos o SEO para o Google e colocamos seu site no ar!'
  }
];
