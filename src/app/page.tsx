'use client';

import React, { useState } from 'react';
import { seedCompanies } from '../lib/seed-data';
import { CompanyRecord } from '../types';
import { getDailyTop5Queue } from '../lib/scoring';
import { Header } from '../components/Header';
import { Top5Queue } from '../components/Top5Queue';
import { CompanyTable } from '../components/CompanyTable';
import { CompanyDossierModal } from '../components/CompanyDossierModal';
import { OutreachStudioModal } from '../components/OutreachStudioModal';
import { AddCompanyModal } from '../components/AddCompanyModal';

export default function Home() {
  const [companies, setCompanies] = useState<CompanyRecord[]>(seedCompanies);
  const [activeTab, setActiveTab] = useState<'top5' | 'all'>('top5');

  // Modals state
  const [selectedDossierCompany, setSelectedDossierCompany] = useState<CompanyRecord | null>(null);
  const [selectedOutreachCompany, setSelectedOutreachCompany] = useState<CompanyRecord | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Compute Top 5 Action Queue deterministically
  const top5Queue = getDailyTop5Queue(companies);

  const handleCompanyAdded = (newCompany: CompanyRecord) => {
    setCompanies((prev) => [newCompany, ...prev]);
    // If the newly analyzed company qualifies for Top 5, user stays or switches to top5
    setActiveTab('top5');
  };

  const handleMarkActed = (companyId: string) => {
    setCompanies((prev) =>
      prev.map((c) =>
        c.id === companyId
          ? { ...c, status: c.status === 'acted_on' ? 'active' : 'acted_on' }
          : c
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        top5Count={top5Queue.length}
        totalCount={companies.length}
        onOpenAddModal={() => setIsAddModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        {activeTab === 'top5' ? (
          <Top5Queue
            companies={top5Queue}
            onOpenDossier={(c) => setSelectedDossierCompany(c)}
            onOpenOutreach={(c) => setSelectedOutreachCompany(c)}
            onMarkActed={handleMarkActed}
          />
        ) : (
          <CompanyTable
            companies={companies}
            onOpenDossier={(c) => setSelectedDossierCompany(c)}
            onOpenOutreach={(c) => setSelectedOutreachCompany(c)}
          />
        )}
      </main>

      {/* Footer System Attribution */}
      <footer className="border-t border-slate-200/80 bg-white py-6 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            <strong>ActionPulse</strong> — AI-Native B2B Account Intelligence & Action Engine
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Task 1: Company Intelligence</span>
            <span>•</span>
            <span>Task 6: Delta Detection</span>
            <span>•</span>
            <span>Task 7: Reliability</span>
            <span>•</span>
            <span>Task 9: Top 5 Focus</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <CompanyDossierModal
        company={selectedDossierCompany}
        onClose={() => setSelectedDossierCompany(null)}
        onOpenOutreach={(c) => {
          setSelectedDossierCompany(null);
          setSelectedOutreachCompany(c);
        }}
      />

      <OutreachStudioModal
        company={selectedOutreachCompany}
        onClose={() => setSelectedOutreachCompany(null)}
      />

      <AddCompanyModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onCompanyAdded={handleCompanyAdded}
      />
    </div>
  );
}
