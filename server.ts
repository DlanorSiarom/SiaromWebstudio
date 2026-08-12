import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client server-side
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Health Check Endpoint
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', studio: 'Siarom Web Studio' });
});

// Proposal & Briefing Generation Endpoint
app.post('/api/gemini/generate-proposal', async (req, res) => {
  try {
    const { siteType, features, style, companyName, description, budgetRange } = req.body;

    if (!ai) {
      // Fallback proposal structure if API key is not configured
      return res.json({
        success: true,
        proposal: {
          title: `Proposta de Desenvolvimento Web - ${companyName || 'Projeto Especial'}`,
          executiveSummary: `Desenvolvimento de ${siteType || 'Site Personalizado'} sob medida com foco em alta conversão, design ultra-moderno e performance máxima de carregamento.`,
          architecture: [
            'Frontend em React 19 + TypeScript para dinamismo e fluidez sem recarregamentos',
            'Styling responsivo avançado com Tailwind CSS',
            'Otimização para SEO com Metatags dinâmicas, OpenGraph e suporte a Schema.org',
            'Infraestrutura em Nuvem com Certificado SSL Ativo e CDN Global',
          ],
          suggestedModules: (features || []).length > 0 ? features : ['Página Inicial de Alta Conversão', 'Formulário Inteligente com integração WhatsApp', 'Painel Administrativo para Gestão de Conteúdo'],
          estimatedTimeline: siteType?.includes('E-commerce') ? '10 a 15 dias úteis' : '5 a 8 dias úteis',
          investmentTier: 'Sob Consulta via WhatsApp',
          nextSteps: [
            'Alinhamento inicial via WhatsApp ou Chamada de Vídeo',
            'Aprovação da Proposta e envio do Briefing Detalhado',
            'Desenvolvimento do Protótipo Interativo',
            'Testes de Responsividade e Lançamento Oficial',
          ],
        },
      });
    }

    const prompt = `Você é o Diretor Técnico da Siarom, um estúdio de desenvolvimento web premium de elite especializado em criar sites modernos, e-commerces, landing pages de alta conversão e sistemas sob medida.

Gere uma Proposta Técnica e Estratégica Completa e Profissional para um potencial cliente com os seguintes dados:
- Nome da Empresa/Cliente: ${companyName || 'Cliente Siarom'}
- Tipo de Projeto: ${siteType || 'Site Institucional Premium'}
- Descrição do Negócio/Objetivo: ${description || 'Apresentação profissional e captação de clientes.'}
- Funcionalidades Solicitadas: ${Array.isArray(features) ? features.join(', ') : 'Geral'}
- Estilo Visual: ${style || 'Moderno, Elegante e Alta Performance'}
- Faixa de Investimento: ${budgetRange || 'A definir'}

Responda ESTRITAMENTE em formato JSON com as seguintes chaves:
{
  "title": "string (Título chamativo da proposta)",
  "executiveSummary": "string (Visão geral de como a Siarom vai transformar o projeto)",
  "architecture": ["array de strings explicando as tecnologias e arquitetura moderna de engenharia"],
  "suggestedModules": ["array de módulos/páginas sugeridos para o projeto"],
  "estimatedTimeline": "string (ex: 5 a 10 dias úteis)",
  "investmentTier": "string (resumo do escopo x valor)",
  "nextSteps": ["array de 4 passos para iniciar o projeto"]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const jsonText = response.text?.trim() || '{}';
    const parsedProposal = JSON.parse(jsonText);

    return res.json({
      success: true,
      proposal: parsedProposal,
    });
  } catch (error: any) {
    console.error('Error generating proposal with Gemini:', error);
    return res.status(500).json({
      success: false,
      error: 'Não foi possível gerar a proposta automática no momento.',
    });
  }
});

// Vite or Static Production Integration
async function setupServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Siarom Web Studio Server running at http://localhost:${PORT}`);
  });
}

setupServer();
