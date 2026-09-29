'use client';

import React, { useState, useEffect } from 'react';
import { CompanyRecord } from '../types';
import { 
  X, 
  ArrowUpRight, 
  ShieldCheck, 
  ShieldAlert, 
  Calendar 
} from 'lucide-react';

interface CompanyDossierModalProps {
  company: CompanyRecord | null;
  onClose: () => void;
  onOpenOutreach: (company: CompanyRecord) => void;
}

export const CompanyDossierModal: React.FC<CompanyDossierModalProps> = ({
  company,
  onClose,
  onOpenOutreach,
}) => {
  const [activeTab, setActiveTab] = useState<'briefing' | 'signals' | 'reliability' | 'scoring'>('briefing');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (company) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [company, onClose]);

  if (!company) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-zinc-950/40 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white w-full max-w-2xl rounded-xl border border-zinc-200/80 shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in-50 zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-zinc-900 tracking-tight">
                {company.name}
              </h2>
              <a
                href={`https://${company.domain}`}
                target="_blank"
                rel="noreferrer"
                className="text-zinc-400 hover:text-zinc-700 inline-flex items-center text-xs"
              >
                <span>{company.domain}</span>
                <ArrowUpRight className="w-3 h-3 ml-0.5" />
              </a>
            </div>
            <div className="text-xs text-zinc-500 mt-0.5">
              {company.industry} • {company.businessModel}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenOutreach(company)}
              className="bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition"
            >
              Prepare Outreach
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-zinc-700 rounded-lg hover:bg-zinc-100 transition"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-zinc-100 px-6 bg-white gap-6 text-xs font-medium">
          <button
            onClick={() => setActiveTab('briefing')}
            className={`py-2.5 border-b-2 transition ${
              activeTab === 'briefing'
                ? 'border-zinc-900 text-zinc-900'
                : 'border-transparent text-zinc-400 hover:text-zinc-700'
            }`}
          >
            Overview (Task 1)
          </button>

          <button
            onClick={() => setActiveTab('signals')}
            className={`py-2.5 border-b-2 transition ${
              activeTab === 'signals'
                ? 'border-zinc-900 text-zinc-900'
                : 'border-transparent text-zinc-400 hover:text-zinc-700'
            }`}
          >
            Signals & Deltas (Task 6)
          </button>

          <button
            onClick={() => setActiveTab('reliability')}
            className={`py-2.5 border-b-2 transition ${
              activeTab === 'reliability'
                ? 'border-zinc-900 text-zinc-900'
                : 'border-transparent text-zinc-400 hover:text-zinc-700'
            }`}
          >
            Data Reliability (Task 7)
          </button>

          <button
            onClick={() => setActiveTab('scoring')}
            className={`py-2.5 border-b-2 transition ${
              activeTab === 'scoring'
                ? 'border-zinc-900 text-zinc-900'
                : 'border-transparent text-zinc-400 hover:text-zinc-700'
            }`}
          >
            Score Rubric (Task 2)
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-zinc-700">
          {/* TAB 1: Briefing */}
          {activeTab === 'briefing' && (
            <div className="space-y-4">
              <div className="bg-zinc-50/70 p-4 rounded-xl border border-zinc-200/60">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-1">
                  Core Value Proposition
                </span>
                <p className="text-xs font-medium text-zinc-900 leading-relaxed">
                  {company.summary}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="border border-zinc-200/70 p-3.5 rounded-xl">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-1">
                    Target ICP
                  </span>
                  <p className="text-zinc-700 leading-relaxed text-xs">
                    {company.targetMarket}
                  </p>
                </div>

                <div className="border border-zinc-200/70 p-3.5 rounded-xl">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-1">
                    Business Model
                  </span>
                  <p className="text-zinc-700 leading-relaxed text-xs">
                    {company.businessModel}
                  </p>
                </div>
              </div>

              {/* Observed Tech Stack */}
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-2">
                  Observed Tech Stack (Evidence-based)
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {company.techStack.map((tech) => (
                    <div
                      key={tech.name}
                      className="bg-zinc-100/80 px-2.5 py-1 rounded text-xs text-zinc-800 flex items-center gap-1.5"
                    >
                      <span className="font-medium">{tech.name}</span>
                      <span className="text-[10px] text-zinc-400 font-mono">
                        ({tech.confidence})
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Persona Callout */}
              <div className="border border-zinc-200/70 p-4 rounded-xl space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">
                  Buying Committee Recommendation
                </span>
                <div className="font-medium text-zinc-900 text-xs">
                  {company.persona.recommendedRole}
                </div>
                <p className="text-zinc-600 leading-relaxed text-xs">
                  {company.persona.personaRationale}
                </p>
                {company.persona.identifiedPerson && (
                  <div className="text-[11px] text-zinc-500 pt-1 border-t border-zinc-100 mt-2">
                    Verified Public Contact: <strong>{company.persona.identifiedPerson.name}</strong> ({company.persona.identifiedPerson.title}) — Source: {company.persona.identifiedPerson.source}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: Signals & Deltas */}
          {activeTab === 'signals' && (
            <div className="space-y-4">
              {company.snapshots.length >= 2 && (
                <div className="border border-zinc-200/70 rounded-xl p-4 bg-zinc-50/40">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-2.5">
                    Snapshot Delta (T1 vs T2)
                  </span>
                  <div className="grid grid-cols-2 gap-3 text-[11px] font-mono">
                    <div className="bg-white p-3 rounded-lg border border-zinc-200/60">
                      <div className="text-zinc-400 mb-1 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>Baseline (T1)</span>
                      </div>
                      <div className="text-zinc-700">Date: {company.snapshots[0].snapshotDate.slice(0, 10)}</div>
                      <div className="text-zinc-700">Headcount: {company.snapshots[0].employeeCount}</div>
                      <div className="text-zinc-700">Open Roles: {company.snapshots[0].openRolesCount}</div>
                    </div>

                    <div className="bg-white p-3 rounded-lg border border-zinc-200/60 border-l-2 border-l-zinc-900">
                      <div className="text-zinc-900 font-semibold mb-1 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>Latest (T2)</span>
                      </div>
                      <div className="text-zinc-700">Date: {company.snapshots[1].snapshotDate.slice(0, 10)}</div>
                      <div className="text-zinc-700">Headcount: {company.snapshots[1].employeeCount}</div>
                      <div className="text-zinc-700">Open Roles: {company.snapshots[1].openRolesCount}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Meaningful Signals */}
              <div className="space-y-2.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">
                  Actionable Buying Signals
                </span>
                {company.signals
                  .filter((s) => s.isMeaningfulSignal)
                  .map((signal) => (
                    <div
                      key={signal.id}
                      className="border border-zinc-200/80 bg-white p-3.5 rounded-xl space-y-1"
                    >
                      <div className="flex items-center gap-2">
                        <span className="bg-zinc-100 text-zinc-800 font-mono text-[10px] px-1.5 py-0.5 rounded">
                          {signal.type}
                        </span>
                        <h4 className="font-medium text-zinc-900 text-xs">
                          {signal.headline}
                        </h4>
                      </div>
                      <p className="text-zinc-600 text-xs leading-relaxed">
                        {signal.actionableInsight}
                      </p>
                    </div>
                  ))}
              </div>

              {/* Filtered Noise */}
              <div className="space-y-1.5 pt-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">
                  Filtered Out as Low-Intent Noise
                </span>
                {company.signals
                  .filter((s) => !s.isMeaningfulSignal)
                  .map((signal) => (
                    <div
                      key={signal.id}
                      className="border border-zinc-200/60 bg-zinc-50/60 p-2.5 rounded-lg flex items-center justify-between text-zinc-500 text-xs"
                    >
                      <span>{signal.headline}</span>
                      <span className="text-[10px] text-zinc-400 font-mono">Ignored</span>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* TAB 3: Data Reliability */}
          {activeTab === 'reliability' && (
            <div className="space-y-4">
              <div className="border border-zinc-200/70 rounded-xl p-4 bg-white space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-600">Estimated Headcount:</span>
                  <span className="font-mono text-xs font-bold text-zinc-900">
                    {company.reliability.employeeCountRange}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-zinc-600">Source Confidence:</span>
                  <span className="font-mono text-xs font-medium text-zinc-900">
                    {company.reliability.confidenceLevel}
                  </span>
                </div>

                {company.reliability.conflictExplanation && (
                  <div className="bg-zinc-50 border border-zinc-200/70 p-3 rounded-lg text-zinc-600 text-xs leading-relaxed">
                    <strong className="text-zinc-900">Conflict Explanation: </strong>
                    {company.reliability.conflictExplanation}
                  </div>
                )}
              </div>

              {/* Evidence Provenance Table */}
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-2">
                  Audited Source Citations
                </span>
                <div className="border border-zinc-200/70 rounded-xl overflow-hidden divide-y divide-zinc-100">
                  {company.reliability.evidence.map((ev, i) => (
                    <div key={i} className="p-3 bg-white space-y-0.5">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-zinc-900">{ev.sourceTitle}</span>
                        <a
                          href={ev.sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-zinc-400 hover:text-zinc-700 flex items-center gap-0.5 text-[11px]"
                        >
                          <span>URL</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      </div>
                      <p className="text-zinc-600 text-xs">{ev.claim}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Scoring Formula */}
          {activeTab === 'scoring' && (
            <div className="space-y-4">
              <div className="border border-zinc-900 bg-zinc-900 text-white p-4 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">
                    Calculated Intent Score
                  </span>
                  <span className="text-2xl font-bold font-mono">
                    {company.scoreResult.totalScore} / 100
                  </span>
                </div>
                <div className="text-right text-xs text-zinc-400">
                  <div>Top 5 Eligible: {company.scoreResult.isTop5Eligible ? 'Yes' : 'No'}</div>
                  <div className="text-[11px] mt-0.5 text-zinc-300">{company.scoreResult.whyNowReasoning}</div>
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="border border-zinc-200/70 rounded-xl p-3 bg-white">
                  <div className="flex justify-between font-medium text-zinc-900 mb-1">
                    <span>1. Fit Score</span>
                    <span className="font-mono">{company.scoreResult.fitScore} / 40</span>
                  </div>
                  <div className="text-zinc-500 text-[11px] font-mono space-y-0.5">
                    <div>• B2B Monetization: {company.scoreResult.breakdown.b2bMonetization} / 15</div>
                    <div>• Developer Traction: {company.scoreResult.breakdown.developerTraction} / 15</div>
                    <div>• Tech Fit: {company.scoreResult.breakdown.enterpriseTechFit} / 10</div>
                  </div>
                </div>

                <div className="border border-zinc-200/70 rounded-xl p-3 bg-white">
                  <div className="flex justify-between font-medium text-zinc-900 mb-1">
                    <span>2. Timing Score</span>
                    <span className="font-mono">{company.scoreResult.timingScore} / 35</span>
                  </div>
                  <div className="text-zinc-500 text-[11px] font-mono space-y-0.5">
                    <div>• Recent Trigger: {company.scoreResult.breakdown.recentTrigger} / 20</div>
                    <div>• Active Hiring: {company.scoreResult.breakdown.relevantHiring} / 15</div>
                  </div>
                </div>

                <div className="border border-zinc-200/70 rounded-xl p-3 bg-white">
                  <div className="flex justify-between font-medium text-zinc-900 mb-1">
                    <span>3. Reachability Score</span>
                    <span className="font-mono">{company.scoreResult.reachabilityScore} / 25</span>
                  </div>
                  <div className="text-zinc-500 text-[11px] font-mono space-y-0.5">
                    <div>• Visible Leadership: {company.scoreResult.breakdown.leadershipVisible} / 15</div>
                    <div>• Public Attribution: {company.scoreResult.breakdown.publicAttribution} / 10</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
