'use client';

import React, { useState, useEffect } from 'react';
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

  // Load from SQL Database on initial mount (Task 5 requirement)
  useEffect(() => {
    fetch('/api/companies')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.companies) && data.companies.length > 0) {
          setCompanies(data.companies);
        }
      })
      .catch((err) => console.error('Database fetch error:', err));
  }, []);

  // Compute Top 5 Action Queue deterministically
  const top5Queue = getDailyTop5Queue(companies);

  const handleCompanyAdded = (newCompany: CompanyRecord) => {
    setCompanies((prev) => [newCompany, ...prev.filter((c) => c.id !== newCompany.id)]);
    setActiveTab('top5');
  };

  const handleMarkActed = (companyId: string) => {
    const target = companies.find((c) => c.id === companyId);
    if (!target) return;
    const newStatus = target.status === 'acted_on' ? 'active' : 'acted_on';

    setCompanies((prev) =>
      prev.map((c) =>
        c.id === companyId ? { ...c, status: newStatus } : c
      )
    );

    // Persist status change to database
    fetch('/api/companies', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: companyId, status: newStatus }),
    }).catch(console.error);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbfbfb] text-zinc-900 font-sans selection:bg-zinc-200">
      {/* Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        top5Count={top5Queue.length}
        totalCount={companies.length}
        onOpenAddModal={() => setIsAddModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8">
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

      {/* Clean Minimalist Footer */}
      <footer className="border-t border-zinc-200/60 bg-white py-5 mt-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-zinc-800">ActionPulse</span>
            <span className="text-zinc-300">•</span>
            <span>Autonomous B2B Intelligence & Action Engine</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-zinc-400 font-mono">
            <span>Deterministic Scoring</span>
            <span>•</span>
            <span>Delta Detection</span>
            <span>•</span>
            <span>Conflict Audit</span>
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
