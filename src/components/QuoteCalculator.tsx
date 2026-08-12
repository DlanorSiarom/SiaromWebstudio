import React, { useState } from 'react';
import { ProjectBrief, AiProposal } from '../types';
import { Sparkles, ArrowRight, CheckCircle2, Loader2, Bot, PhoneCall, Copy, Check, Terminal } from 'lucide-react';

interface QuoteCalculatorProps {
  initialCategory?: string;
}

export const QuoteCalculator: React.FC<QuoteCalculatorProps> = ({ initialCategory }) => {
  const [step, setStep] = useState(1);
  const [copied, setCopied] = useState(false);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiProposal, setAiProposal] = useState<AiProposal | null>(null);

  const [brief, setBrief] = useState<ProjectBrief>({
    siteType: initialCategory || 'Landing Page de Alta Conversão',
    features: ['Integração com WhatsApp Direct', 'Otimização SEO para o Google', 'Design Responsivo Mobile First'],
    style: 'Moderno & Tecnológico',
    companyName: '',
    contactName: '',
    whatsapp: '',
    email: '',
    description: '',
    budgetRange: 'Tratado via WhatsApp',
    urgency: 'Normal (5 a 10 dias úteis)'
  });

  const siteTypes = [
    {
      id: 'lp',
      title: 'Landing Page de Alta Conversão',
      desc: 'Página única focada em venda direta de produto ou serviço com CTA para WhatsApp.',
      priceEst: 'Orçamento via WhatsApp'
    },
    {
      id: 'inst',
      title: 'Site Institucional Completo',
      desc: 'Site com múltiplas páginas para apresentar sua empresa, história, equipe e serviços.',
      priceEst: 'Orçamento via WhatsApp'
    },
    {
      id: 'ecom',
      title: 'E-Commerce / Loja Virtual',
      desc: 'Loja online completa com catálogo de produtos, cálculo de frete e checkout Pix/Cartão.',
      priceEst: 'Orçamento via WhatsApp'
    },
    {
      id: 'sys',
      title: 'Sistema Web / Plataforma SaaS',
      desc: 'Aplicação web personalizada com gestão de usuários, painel administrativo e automações.',
      priceEst: 'Orçamento via WhatsApp'
    }
  ];

  const availableFeatures = [
    'Integração com WhatsApp Direct',
    'Painel Administrativo para Editar Conteúdo',
    'Otimização SEO (Aparecer no Google)',
    'Checkout Transparente Pix/Cartão',
    'Sistema de Agendamento Online',
    'Animações Especiais Interativas',
    'Modo Escuro / Dark Mode',
    'Blog de Notícias Incorporado'
  ];

  const styleOptions = [
    'Moderno & Tecnológico',
    'Executivo & Elegante (Corporativo)',
    'Minimalista & Clean',
    'Luxo & Sofisticado'
  ];

  const toggleFeature = (feat: string) => {
    if (brief.features.includes(feat)) {
      setBrief({ ...brief, features: brief.features.filter(f => f !== feat) });
    } else {
      setBrief({ ...brief, features: [...brief.features, feat] });
    }
  };

  const handleGenerateAiProposal = async () => {
    setIsGeneratingAi(true);
    setAiProposal(null);

    try {
      const response = await fetch('/api/gemini/generate-proposal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          siteType: brief.siteType,
          features: brief.features,
          style: brief.style,
          companyName: brief.companyName || 'Empresa Cliente',
          description: brief.description,
          budgetRange: brief.budgetRange
        })
      });

      const data = await response.json();
      if (data.success && data.proposal) {
        setAiProposal(data.proposal);
      }
    } catch (err) {
      console.error('Failed to generate AI proposal:', err);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const formattedWhatsappText = `Olá Siarom! Gostaria de um orçamento para o meu site.%0A%0A📌 *Dados do Projeto:*%0A- *Tipo:* ${encodeURIComponent(brief.siteType)}%0A- *Empresa:* ${encodeURIComponent(brief.companyName || 'Não informado')}%0A- *Contato:* ${encodeURIComponent(brief.contactName || 'Não informado')}%0A- *Estilo:* ${encodeURIComponent(brief.style)}%0A- *Recursos:* ${encodeURIComponent(brief.features.join(', '))}%0A- *Urgência:* ${encodeURIComponent(brief.urgency)}%0A%0A💬 *Detalhes:* ${encodeURIComponent(brief.description || 'Quero conversar com o desenvolvedor.')}`;

  const copyBriefingText = () => {
    const rawText = `Solicitação de Orçamento - Siarom Web Studio\nTipo: ${brief.siteType}\nEmpresa: ${brief.companyName}\nContato: ${brief.contactName} (${brief.whatsapp})\nEstilo: ${brief.style}\nRecursos: ${brief.features.join(', ')}\nUrgência: ${brief.urgency}\nDescrição: ${brief.description}`;
    navigator.clipboard.writeText(rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="calculator" className="py-20 bg-neutral-950 relative overflow-hidden border-t border-amber-950/40">
      {/* High-Tech Grid & Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1.2px,transparent_1.2px)] [background-size:28px_28px] opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-600/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-yellow-500/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-transparent to-neutral-950 pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3 font-mono">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-black border border-amber-600/60 text-xs font-semibold text-amber-400 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>SIMULADOR DE PROJETO SIAROM</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
            Monte o Projeto do <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent text-glitch">Seu Novo Site</span>
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm font-sans">
            Selecione as opções desejadas abaixo para montar o briefing do seu projeto e gerar uma proposta personalizada!
          </p>
        </div>

        {/* Step Wizard Container */}
        <div className="bg-black/90 rounded-xl border border-amber-900/50 p-6 sm:p-8 shadow-2xl backdrop-blur-md">
          
          {/* Progress Bar Header */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-amber-900/40 font-mono">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="flex items-center space-x-2">
                <button
                  onClick={() => setStep(num)}
                  className={`w-9 h-9 rounded flex items-center justify-center font-black text-xs transition-all ${
                    step === num
                      ? 'bg-amber-400 text-black shadow-md shadow-amber-500/20'
                      : step > num
                      ? 'bg-neutral-900 text-amber-400 border border-amber-800'
                      : 'bg-neutral-950 text-neutral-600 border border-neutral-900'
                  }`}
                >
                  0{num}
                </button>
                <span className="hidden md:inline text-xs font-bold text-neutral-300 uppercase">
                  {num === 1 && '1. TIPO'}
                  {num === 2 && '2. RECURSOS'}
                  {num === 3 && '3. ESTILO'}
                  {num === 4 && '4. PROPOSTA'}
                </span>
                {num < 4 && <div className="hidden md:block w-8 sm:w-12 h-0.5 bg-neutral-900" />}
              </div>
            ))}
          </div>

          {/* STEP 1: SITE TYPE */}
          {step === 1 && (
            <div className="space-y-6 font-mono">
              <h3 className="text-lg font-bold text-white uppercase">
                1. Qual é o tipo de site que você precisa?
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {siteTypes.map((type) => (
                  <div
                    key={type.id}
                    onClick={() => {
                      setBrief({ ...brief, siteType: type.title, budgetRange: type.priceEst });
                    }}
                    className={`p-5 rounded-lg border cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                      brief.siteType === type.title
                        ? 'bg-amber-950/40 border-amber-400 shadow-lg shadow-amber-500/10'
                        : 'bg-neutral-950/80 border-neutral-800 hover:border-amber-900'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-white text-sm uppercase">{type.title}</h4>
                        {brief.siteType === type.title && (
                          <CheckCircle2 className="w-5 h-5 text-amber-400" />
                        )}
                      </div>
                      <p className="text-xs text-neutral-300 mt-2 leading-relaxed font-sans">{type.desc}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-amber-900/30 text-xs text-amber-400 font-bold">
                      ORÇAMENTO: Tratado via WhatsApp
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded bg-amber-400 text-black font-extrabold text-xs uppercase tracking-wider flex items-center space-x-2 hover:bg-amber-300"
                >
                  <span>Próximo Passo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: FEATURES */}
          {step === 2 && (
            <div className="space-y-6 font-mono">
              <h3 className="text-lg font-bold text-white uppercase">
                2. Quais recursos você deseja incluir?
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {availableFeatures.map((feat, idx) => {
                  const isSelected = brief.features.includes(feat);
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleFeature(feat)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all text-xs font-bold flex items-center justify-between uppercase ${
                        isSelected
                          ? 'bg-amber-950/50 border-amber-400 text-amber-300'
                          : 'bg-neutral-950/80 border-neutral-800 text-neutral-400 hover:border-amber-900'
                      }`}
                    >
                      <span>{feat}</span>
                      <div className={`w-5 h-5 rounded flex items-center justify-center border ${isSelected ? 'bg-amber-400 border-amber-300 text-black' : 'border-neutral-800'}`}>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-5 py-2.5 rounded bg-neutral-900 text-neutral-300 text-xs font-bold uppercase"
                >
                  Voltar
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-3 rounded bg-amber-400 text-black font-extrabold text-xs uppercase tracking-wider flex items-center space-x-2 hover:bg-amber-300"
                >
                  <span>Próximo Passo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: STYLE & URGENCY */}
          {step === 3 && (
            <div className="space-y-6 font-mono">
              <h3 className="text-lg font-bold text-white uppercase">
                3. Estilo Visual & Prazo de Entrega
              </h3>

              <div className="space-y-4">
                <label className="text-xs font-bold text-amber-400 block uppercase">ESTILO DO DESIGN:</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {styleOptions.map((st) => (
                    <button
                      key={st}
                      onClick={() => setBrief({ ...brief, style: st })}
                      className={`p-3 rounded border text-xs font-bold text-center uppercase transition-all ${
                        brief.style === st
                          ? 'bg-amber-950/60 border-amber-400 text-amber-300'
                          : 'bg-neutral-950/80 border-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <label className="text-xs font-bold text-amber-400 block uppercase">URGÊNCIA DE ENTREGA:</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setBrief({ ...brief, urgency: 'Normal (5 a 10 dias úteis)' })}
                    className={`p-4 rounded border cursor-pointer transition-all text-xs ${
                      brief.urgency.includes('Normal')
                        ? 'bg-amber-950/50 border-amber-400 text-white font-bold'
                        : 'bg-neutral-950/80 border-neutral-800 text-neutral-400'
                    }`}
                  >
                    <span className="block text-sm font-bold uppercase">PRAZO PADRÃO</span>
                    <span className="font-sans text-neutral-300 text-xs">5 a 10 dias úteis de desenvolvimento</span>
                  </div>

                  <div
                    onClick={() => setBrief({ ...brief, urgency: 'Urgente (Até 72 horas)' })}
                    className={`p-4 rounded border cursor-pointer transition-all text-xs ${
                      brief.urgency.includes('Urgente')
                        ? 'bg-amber-950/50 border-amber-400 text-white font-bold'
                        : 'bg-neutral-950/80 border-neutral-800 text-neutral-400'
                    }`}
                  >
                    <span className="block text-sm font-bold text-yellow-400 uppercase">PRAZO EXPRESSO (URGENTE)</span>
                    <span className="font-sans text-neutral-300 text-xs">Entrega prioritária em até 72h</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 rounded bg-neutral-900 text-neutral-300 text-xs font-bold uppercase"
                >
                  Voltar
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="px-6 py-3 rounded bg-amber-400 text-black font-extrabold text-xs uppercase tracking-wider flex items-center space-x-2 hover:bg-amber-300"
                >
                  <span>Gerar Resumo & Proposta IA</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: CLIENT INFO & AI GENERATOR */}
          {step === 4 && (
            <div className="space-y-6 font-mono">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white uppercase">
                  4. Resumo do Projeto & Gerador de Proposta
                </h3>
                <span className="text-xs font-bold text-amber-400 bg-amber-950/80 px-3 py-1 rounded border border-amber-800 uppercase">
                  ORÇAMENTO: Tratado via WhatsApp
                </span>
              </div>

              {/* Form Input fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-amber-400 block mb-1 uppercase">Nome da Empresa / Projeto:</label>
                  <input
                    type="text"
                    placeholder="EX: SIAROM STUDIOS"
                    value={brief.companyName}
                    onChange={(e) => setBrief({ ...brief, companyName: e.target.value })}
                    className="w-full bg-neutral-950 border border-amber-900/60 rounded px-4 py-2.5 text-xs text-amber-200 focus:outline-none focus:border-amber-400 uppercase"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-amber-400 block mb-1 uppercase">Seu Nome de Contato:</label>
                  <input
                    type="text"
                    placeholder="EX: CARLOS SILVA"
                    value={brief.contactName}
                    onChange={(e) => setBrief({ ...brief, contactName: e.target.value })}
                    className="w-full bg-neutral-950 border border-amber-900/60 rounded px-4 py-2.5 text-xs text-amber-200 focus:outline-none focus:border-amber-400 uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-amber-400 block mb-1 uppercase">Descrição do Projeto:</label>
                <textarea
                  rows={3}
                  placeholder="Conte sobre seus produtos, público-alvo e metas de conversão..."
                  value={brief.description}
                  onChange={(e) => setBrief({ ...brief, description: e.target.value })}
                  className="w-full bg-neutral-950 border border-amber-900/60 rounded p-3 text-xs text-amber-200 focus:outline-none focus:border-amber-400 font-sans"
                />
              </div>

              {/* AI Generator Button */}
              <div className="bg-neutral-950 p-4 rounded border border-amber-900/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-3 text-left">
                  <div className="w-10 h-10 rounded bg-amber-400 flex items-center justify-center shrink-0 text-black font-black">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-xs uppercase">Análise & Proposta Siarom AI</h5>
                    <p className="text-[10px] text-neutral-400 font-sans">Gere um escopo técnico e cronograma estruturado instantaneamente.</p>
                  </div>
                </div>

                <button
                  onClick={handleGenerateAiProposal}
                  disabled={isGeneratingAi}
                  className="w-full sm:w-auto px-5 py-2.5 rounded bg-amber-950 hover:bg-amber-900 border border-amber-700 text-amber-300 font-bold text-xs flex items-center justify-center space-x-2 transition-all uppercase tracking-wider"
                >
                  {isGeneratingAi ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                      <span>Processando Proposta...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>Gerar Proposta com IA</span>
                    </>
                  )}
                </button>
              </div>

              {/* Display AI Proposal if generated */}
              {aiProposal && (
                <div className="bg-neutral-950 border border-amber-500/60 p-5 rounded space-y-4 font-mono">
                  <div className="flex items-center justify-between border-b border-amber-900/50 pb-3">
                    <h4 className="font-bold text-amber-400 text-xs flex items-center space-x-2 uppercase">
                      <Bot className="w-4 h-4" />
                      <span>{aiProposal.title}</span>
                    </h4>
                    <span className="text-[10px] text-yellow-400 font-mono font-bold bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                      SIAROM SPEC VERIFIED
                    </span>
                  </div>

                  <p className="text-xs text-neutral-300 leading-relaxed italic font-sans">
                    "{aiProposal.executiveSummary}"
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="font-bold text-amber-400 block mb-1 uppercase">Arquitetura Recomendada:</span>
                      <ul className="list-disc list-inside text-neutral-300 space-y-1 font-sans text-xs">
                        {aiProposal.architecture.map((arch, i) => (
                          <li key={i}>{arch}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <span className="font-bold text-amber-400 block mb-1 uppercase">Prazo & Próximos Passos:</span>
                      <p className="text-yellow-400 font-bold mb-1">Prazo: {aiProposal.estimatedTimeline}</p>
                      <ul className="list-disc list-inside text-neutral-300 space-y-1 font-sans text-xs">
                        {aiProposal.nextSteps.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Final Actions: WhatsApp Direct & Copy */}
              <div className="pt-4 border-t border-amber-900/30 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={copyBriefingText}
                  className="w-full sm:w-auto px-4 py-3 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 text-xs font-bold flex items-center justify-center space-x-2 uppercase"
                >
                  {copied ? <Check className="w-4 h-4 text-amber-400" /> : <Copy className="w-4 h-4 text-amber-500" />}
                  <span>{copied ? 'Briefing Copiado!' : 'Copiar Briefing'}</span>
                </button>

                <a
                  href={`https://wa.me/?text=${formattedWhatsappText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 rounded bg-amber-400 hover:bg-amber-300 text-black font-black text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-xl shadow-amber-500/20"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Enviar Briefing no WhatsApp Siarom</span>
                </a>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};

