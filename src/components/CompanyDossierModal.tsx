'use client';

import React, { useState } from 'react';
import { CompanyRecord } from '../types';
import { 
  X, 
  ExternalLink, 
  ShieldCheck, 
  ShieldAlert, 
  Zap, 
  Filter, 
  Calendar, 
  Layers, 
  FileText,
  UserCheck,
  CheckCircle,
  HelpCircle,
  Cpu
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

  if (!company) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="bg-white w-full max-w-3xl rounded-2xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in-50 zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900">{company.name}</h2>
                <a
                  href={`https://${company.domain}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-400 hover:text-slate-600 inline-flex items-center gap-1 text-xs"
                >
                  <span>{company.domain}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                {company.industry} • {company.businessModel}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenOutreach(company)}
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition"
            >
              Draft Outreach
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 px-6 bg-white gap-6 text-xs font-medium">
          <button
            onClick={() => setActiveTab('briefing')}
            className={`py-3 border-b-2 transition ${
              activeTab === 'briefing'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            30s Briefing (Task 1)
          </button>

          <button
            onClick={() => setActiveTab('signals')}
            className={`py-3 border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'signals'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Signals & Deltas (Task 6)</span>
          </button>

          <button
            onClick={() => setActiveTab('reliability')}
            className={`py-3 border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'reliability'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Data Reliability (Task 7)</span>
          </button>

          <button
            onClick={() => setActiveTab('scoring')}
            className={`py-3 border-b-2 transition ${
              activeTab === 'scoring'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Scoring Formula (Task 2)
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700">
          {/* TAB 1: 30-Second Intelligence Briefing */}
          {activeTab === 'briefing' && (
            <div className="space-y-5">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Core Value Proposition
                </span>
                <p className="text-sm font-medium text-slate-900 leading-relaxed">
                  {company.summary}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-slate-200 p-4 rounded-xl">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Target ICP & Customer Profile
                  </span>
                  <p className="text-slate-700 leading-relaxed">
                    {company.targetMarket}
                  </p>
                </div>

                <div className="border border-slate-200 p-4 rounded-xl">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Monetization & Business Model
                  </span>
                  <p className="text-slate-700 leading-relaxed">
                    {company.businessModel}
                  </p>
                </div>
              </div>

              {/* Detected Tech Stack with Confidence */}
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Observed Tech Stack (Evidence-based)
                </span>
                <div className="flex flex-wrap gap-2">
                  {company.techStack.map((tech) => (
                    <div
                      key={tech.name}
                      className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200 text-xs"
                    >
                      <Cpu className="w-3 h-3 text-slate-500" />
                      <span className="font-medium text-slate-800">{tech.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        ({tech.confidence})
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Persona Callout */}
              <div className="bg-emerald-50/60 border border-emerald-200/80 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-emerald-950 font-semibold mb-1">
                  <UserCheck className="w-4 h-4 text-emerald-600" />
                  <span>Buying Committee Recommendation</span>
                </div>
                <div className="text-slate-800">
                  <span className="font-semibold text-slate-900">Target Role: </span>
                  {company.persona.recommendedRole}
                </div>
                <p className="text-slate-600 mt-1 leading-relaxed">
                  {company.persona.personaRationale}
                </p>
                {company.persona.identifiedPerson && (
                  <div className="mt-2 pt-2 border-t border-emerald-200/60 text-[11px] text-emerald-900">
                    <span className="font-semibold">Public Verification: </span>
                    {company.persona.identifiedPerson.name} ({company.persona.identifiedPerson.title}) — Source: {company.persona.identifiedPerson.source}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: Signals & Time-Series Deltas */}
          {activeTab === 'signals' && (
            <div className="space-y-5">
              <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-slate-600 leading-relaxed">
                Task 6 Requirement: Compares information from two points in time (T1 vs T2), surfacing actionable buying signals and separating noise.
              </div>

              {/* Snapshots Comparison */}
              {company.snapshots.length >= 2 && (
                <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-3">
                    Time-Series Snapshot Comparison
                  </span>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-3 rounded-lg border border-slate-200">
                      <div className="text-xs font-semibold text-slate-500 mb-1 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>Baseline Snapshot (T1)</span>
                      </div>
                      <div className="text-slate-800 font-mono text-[11px] space-y-1">
                        <div>Date: {company.snapshots[0].snapshotDate.slice(0, 10)}</div>
                        <div>Headcount: {company.snapshots[0].employeeCount}</div>
                        <div>Open Roles: {company.snapshots[0].openRolesCount}</div>
                        <div>Tiers: {company.snapshots[0].pricingTiersDetected?.join(', ')}</div>
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded-lg border border-slate-200 border-l-2 border-l-emerald-500">
                      <div className="text-xs font-semibold text-emerald-700 mb-1 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>Latest Snapshot (T2)</span>
                      </div>
                      <div className="text-slate-800 font-mono text-[11px] space-y-1">
                        <div>Date: {company.snapshots[1].snapshotDate.slice(0, 10)}</div>
                        <div>Headcount: {company.snapshots[1].employeeCount}</div>
                        <div>Open Roles: {company.snapshots[1].openRolesCount}</div>
                        <div>Tiers: {company.snapshots[1].pricingTiersDetected?.join(', ')}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Meaningful Signals */}
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Meaningful Commercial Signals (High Priority)
                </span>
                {company.signals
                  .filter((s) => s.isMeaningfulSignal)
                  .map((signal) => (
                    <div
                      key={signal.id}
                      className="border border-amber-200 bg-amber-50/60 p-3.5 rounded-xl space-y-1.5"
                    >
                      <div className="flex items-center gap-2">
                        <span className="bg-amber-100 text-amber-900 font-semibold px-2 py-0.5 rounded text-[10px] font-mono">
                          {signal.type}
                        </span>
                        <h4 className="font-semibold text-slate-900 text-xs">
                          {signal.headline}
                        </h4>
                      </div>
                      <p className="text-slate-700 leading-relaxed">
                        {signal.actionableInsight}
                      </p>
                    </div>
                  ))}
              </div>

              {/* Filtered Noise */}
              <div className="space-y-2 pt-2 border-t border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Filtered Out as Low-Signal Noise
                </span>
                {company.signals
                  .filter((s) => !s.isMeaningfulSignal)
                  .map((signal) => (
                    <div
                      key={signal.id}
                      className="border border-slate-200 bg-slate-50/80 p-3 rounded-lg flex items-center justify-between text-slate-500"
                    >
                      <div>
                        <span className="font-medium text-slate-700">{signal.headline}</span>
                        <div className="text-[11px] text-slate-400">{signal.actionableInsight}</div>
                      </div>
                      <span className="text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full font-mono">
                        Noise Ignored
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* TAB 3: Data Reliability & Conflict Resolution */}
          {activeTab === 'reliability' && (
            <div className="space-y-5">
              <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-slate-600 leading-relaxed">
                Task 7 Requirement: When public sources provide conflicting information, decide which data to use, communicate uncertainty, and never hallucinate false precision.
              </div>

              {/* Confidence Metric Box */}
              <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-900">Headcount Estimate:</span>
                  <span className="font-mono text-sm font-bold text-slate-900">
                    {company.reliability.employeeCountRange}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Calculated Confidence:</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    company.reliability.confidenceLevel === 'High'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {company.reliability.confidenceLevel} Confidence
                  </span>
                </div>

                {company.reliability.conflictExplanation && (
                  <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg text-amber-900 text-xs">
                    <span className="font-semibold">Conflict Resolution Note: </span>
                    {company.reliability.conflictExplanation}
                  </div>
                )}
              </div>

              {/* Evidence Provenance Table */}
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Audited Evidence & Source Attribution
                </span>
                <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
                  {company.reliability.evidence.map((ev, i) => (
                    <div key={i} className="p-3 bg-white space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-slate-900">{ev.sourceTitle}</span>
                        <a
                          href={ev.sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-400 hover:text-slate-600 flex items-center gap-1 text-[11px]"
                        >
                          <span>Source URL</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      <p className="text-slate-600">{ev.claim}</p>
                      <div className="text-[10px] text-slate-400 font-mono">
                        Audited: {ev.retrievedAt}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Deterministic Scoring Breakdown */}
          {activeTab === 'scoring' && (
            <div className="space-y-5">
              <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-slate-600 leading-relaxed">
                Task 2 Requirement: Application-layer deterministic opportunity scoring based on explainable business dimensions (Fit, Timing, Reachability).
              </div>

              {/* Total Score Banner */}
              <div className="bg-slate-900 text-white p-4 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                    Calculated Opportunity Score
                  </span>
                  <span className="text-2xl font-bold font-mono">
                    {company.scoreResult.totalScore} / 100
                  </span>
                </div>
                <div className="text-right text-xs text-slate-300">
                  <div>Daily Top 5 Eligible: {company.scoreResult.isTop5Eligible ? 'Yes' : 'No'}</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">{company.scoreResult.whyNowReasoning}</div>
                </div>
              </div>

              {/* Score Breakdown Cards */}
              <div className="space-y-3">
                <div className="border border-slate-200 rounded-xl p-3.5 bg-white">
                  <div className="flex justify-between font-semibold text-slate-900 mb-1">
                    <span>1. Fit Score (ICP Alignment)</span>
                    <span className="font-mono">{company.scoreResult.fitScore} / 40</span>
                  </div>
                  <ul className="text-slate-600 text-[11px] space-y-1 list-disc pl-4 mt-2">
                    <li>B2B Monetization Model: {company.scoreResult.breakdown.b2bMonetization} / 15 pts</li>
                    <li>Developer/Enterprise Traction: {company.scoreResult.breakdown.developerTraction} / 15 pts</li>
                    <li>Tech Stack Compatibility: {company.scoreResult.breakdown.enterpriseTechFit} / 10 pts</li>
                  </ul>
                </div>

                <div className="border border-slate-200 rounded-xl p-3.5 bg-white">
                  <div className="flex justify-between font-semibold text-slate-900 mb-1">
                    <span>2. Timing Score (Intent Triggers)</span>
                    <span className="font-mono">{company.scoreResult.timingScore} / 35</span>
                  </div>
                  <ul className="text-slate-600 text-[11px] space-y-1 list-disc pl-4 mt-2">
                    <li>Recent High-Intent Trigger Event: {company.scoreResult.breakdown.recentTrigger} / 20 pts</li>
                    <li>Relevant Active Hiring Surge: {company.scoreResult.breakdown.relevantHiring} / 15 pts</li>
                  </ul>
                </div>

                <div className="border border-slate-200 rounded-xl p-3.5 bg-white">
                  <div className="flex justify-between font-semibold text-slate-900 mb-1">
                    <span>3. Reachability Score (Access & Presence)</span>
                    <span className="font-mono">{company.scoreResult.reachabilityScore} / 25</span>
                  </div>
                  <ul className="text-slate-600 text-[11px] space-y-1 list-disc pl-4 mt-2">
                    <li>Leadership Visibly Identified: {company.scoreResult.breakdown.leadershipVisible} / 15 pts</li>
                    <li>Public Company Attribution: {company.scoreResult.breakdown.publicAttribution} / 10 pts</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
