import React, { useState } from 'react';
import { PhoneCall, Mail, MapPin, Send, CheckCircle2, Sparkles, Clock } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const ContactForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 1000);
  };

  const whatsappDirectUrl = `https://wa.me/?text=Olá%20Siarom!%20Vim%20pelo%20site%20e%20gostaria%20de%20um%20orçamento%20para%20meu%20projeto.`;

  return (
    <section id="contact" className="py-20 bg-neutral-950 relative border-t border-amber-950/40 font-mono overflow-hidden">
      {/* Background Cyber Mesh & Ambient Light */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f59e0b12_1px,transparent_1px),linear-gradient(to_bottom,#f59e0b12_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-transparent to-neutral-950 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal direction="up" distance={30} duration={0.8}>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-black border border-amber-600/60 text-xs font-semibold text-amber-400 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>CANAL DE COMUNICAÇÃO SIAROM</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
              Pronto para Criar o <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent text-glitch">Site da Sua Empresa?</span>
            </h2>
            <p className="text-neutral-300 text-xs sm:text-sm font-sans">
              Entre em contato direto via WhatsApp ou envie uma mensagem para receber nosso atendimento rápido.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
          
          {/* Left Info & WhatsApp Box */}
          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal direction="left" distance={35} delay={0.1} duration={0.8}>
              <div className="bg-black/90 rounded-xl border border-amber-900/50 p-8 space-y-6">
                <h3 className="text-lg font-bold text-white uppercase">Atendimento Imediato</h3>
                
                <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                  Respondemos rapidamente para entender seu projeto e indicar a melhor estrutura técnica com o melhor custo-benefício.
                </p>

                {/* Direct WhatsApp Callout */}
                <a
                  href={whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 rounded bg-amber-400 hover:bg-amber-300 text-black font-black text-xs uppercase tracking-wider flex items-center justify-center space-x-3 shadow-xl shadow-amber-500/20 transition-transform hover:scale-[1.02]"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Iniciar Conversa no WhatsApp</span>
                </a>

                <div className="pt-4 border-t border-amber-900/30 space-y-4 text-xs text-neutral-300">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Atendimento: Seg a Sáb • 08h às 20h</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                    <a href="mailto:ronalldrobert@gmail.com" className="hover:text-amber-400 transition-colors">ronalldrobert@gmail.com</a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Atendimento Nacional (100% Digital)</span>
                  </div>
                </div>

              </div>
            </ScrollReveal>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="right" distance={35} delay={0.2} duration={0.8}>
              <div className="bg-black/90 rounded-xl border border-amber-900/50 p-8 shadow-2xl">
                {submitted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 rounded bg-amber-950 text-amber-400 border border-amber-800 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-white uppercase">Mensagem Transmitida!</h3>
                    <p className="text-xs text-neutral-300 max-w-md mx-auto font-sans">
                      A equipe da Siarom recebeu seu contato. Em breve retornaremos pelo WhatsApp ou E-mail fornecido.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-4 px-6 py-2.5 rounded bg-neutral-900 text-xs font-bold text-amber-400 border border-amber-900 uppercase"
                    >
                      Enviar outra mensagem
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                    <h3 className="text-lg font-bold text-white mb-2 uppercase">Envie uma Mensagem</h3>

                    <div>
                      <label className="font-bold text-amber-400 block mb-1 uppercase">Seu Nome:</label>
                      <input
                        type="text"
                        required
                        placeholder="EX: GABRIEL SANTOS"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-neutral-950 border border-amber-900/60 rounded px-4 py-3 text-amber-200 focus:outline-none focus:border-amber-400 uppercase"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-bold text-amber-400 block mb-1 uppercase">Seu WhatsApp / Telefone:</label>
                        <input
                          type="text"
                          required
                          placeholder="(11) 99999-9999"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-neutral-950 border border-amber-900/60 rounded px-4 py-3 text-amber-200 focus:outline-none focus:border-amber-400 uppercase"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-amber-400 block mb-1 uppercase">Seu E-mail:</label>
                        <input
                          type="email"
                          placeholder="GABRIEL@EXEMPLO.COM.BR"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-neutral-950 border border-amber-900/60 rounded px-4 py-3 text-amber-200 focus:outline-none focus:border-amber-400 uppercase"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-bold text-amber-400 block mb-1 uppercase">Descrição do Projeto:</label>
                      <textarea
                        rows={4}
                        placeholder="Conte sobre o projeto, objetivo, prazos..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full bg-neutral-950 border border-amber-900/60 rounded p-3 text-amber-200 focus:outline-none focus:border-amber-400 font-sans"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded bg-amber-400 hover:bg-amber-300 font-black text-black text-xs uppercase tracking-wider shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center space-x-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Enviar Transmissão para Siarom</span>
                    </button>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>

        </div>

      </div>
    </section>
  );
};

