import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { PortfolioGrid } from './components/PortfolioGrid';
import { ProjectModal } from './components/ProjectModal';
import { QuoteCalculator } from './components/QuoteCalculator';
import { Process } from './components/Process';
import { Testimonials } from './components/Testimonials';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { CrtCursor } from './components/CrtCursor';
import { AdminLayout } from './admin/AdminLayout';

import { PortfolioItem } from './types';
import { INITIAL_PORTFOLIO } from './data/mockData';

export default function App() {
  const [isSaasAdminOpen, setIsSaasAdminOpen] = useState(false);

  const [items, setItems] = useState<PortfolioItem[]>(() => {
    try {
      const stored = localStorage.getItem('siarom_custom_portfolio');
      if (stored) {
        const customParsed: PortfolioItem[] = JSON.parse(stored);
        return [...customParsed, ...INITIAL_PORTFOLIO];
      }
    } catch (e) {
      console.error('Failed to load custom portfolio items from localStorage', e);
    }
    return INITIAL_PORTFOLIO;
  });

  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  const [quoteCategory, setQuoteCategory] = useState<string>('');

  const handleOpenQuoteWithCategory = (category: string) => {
    setQuoteCategory(category);
    const el = document.getElementById('calculator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isSaasAdminOpen) {
    return (
      <>
        <AdminLayout onGoToPublicSite={() => setIsSaasAdminOpen(false)} />
        <CrtCursor />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Top Navigation */}
      <Header
        onOpenQuote={() => handleOpenQuoteWithCategory('')}
        onOpenSaasAdmin={() => setIsSaasAdminOpen(true)}
        customProjectsCount={items.length}
      />

      {/* Main Page Sections */}
      <main>
        <Hero
          onOpenQuote={() => handleOpenQuoteWithCategory('')}
        />

        <PortfolioGrid
          items={items}
          onOpenModal={(item) => setSelectedProject(item)}
        />

        <Services
          onSelectServiceForQuote={(serviceTitle) => handleOpenQuoteWithCategory(serviceTitle)}
        />

        <QuoteCalculator
          key={quoteCategory}
          initialCategory={quoteCategory}
        />

        <Process />

        <Testimonials />

        <ContactForm />
      </main>

      {/* Footer */}
      <Footer
        onOpenSaasAdmin={() => setIsSaasAdminOpen(true)}
      />

      {/* Interactive Project Detail Modal */}
      <ProjectModal
        item={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenQuoteWithCategory={handleOpenQuoteWithCategory}
      />

      {/* Retro CRT Crosshair Cursor */}
      <CrtCursor />

    </div>
  );
}
