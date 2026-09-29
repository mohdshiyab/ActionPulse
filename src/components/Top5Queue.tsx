'use client';

import React from 'react';
import { CompanyRecord } from '../types';
import { 
  Zap, 
  UserCheck, 
  ExternalLink, 
  ArrowUpRight, 
  Send, 
  CheckCircle2, 
  Info,
  Clock,
  ShieldCheck,
  ShieldAlert
} from 'lucide-react';

interface Top5QueueProps {
  companies: CompanyRecord[];
  onOpenDossier: (company: CompanyRecord) => void;
  onOpenOutreach: (company: CompanyRecord) => void;
  onMarkActed: (companyId: string) => void;
}

export const Top5Queue: React.FC<Top5QueueProps> = ({
  companies,
  onOpenDossier,
  onOpenOutreach,
  onMarkActed,
}) => {
  if (companies.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-xl mx-auto my-12 shadow-sm">
        <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-100">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-base font-semibold text-slate-900">
          All daily priority actions complete
        </h3>
        <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">
          You have acted on all high-intent opportunities for today. New signals will automatically surface as web changes are detected.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Editorial Hero Statement (Humanized Context) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-slate-200/80 gap-3">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            Today&apos;s 5 High-Priority Actions
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              Ranked by intent
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Filtered from your total monitoring pool based on verified buying signals and reachability.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium bg-slate-100/80 px-2.5 py-1 rounded-md border border-slate-200 self-start sm:self-auto">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>Queue refreshes daily</span>
        </div>
      </div>

      {/* Cards List */}
      <div className="space-y-4">
        {companies.map((company, index) => {
          const topSignal = company.signals.find((s) => s.isMeaningfulSignal) || company.signals[0];
          const isActed = company.status === 'acted_on';

          return (
            <div
              key={company.id}
              className={`bg-white rounded-xl border transition-all duration-200 p-5 sm:p-6 shadow-sm hover:shadow-md relative overflow-hidden ${
                isActed ? 'opacity-60 border-slate-200 bg-slate-50/50' : 'border-slate-200/90 hover:border-slate-300'
              }`}
            >
              {/* Subtle top indicator bar */}
              <div 
                className={`absolute top-0 left-0 right-0 h-[3px] ${
                  index === 0 ? 'bg-emerald-500' : 'bg-slate-300'
                }`}
              />

              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                {/* Left Meta & Identification */}
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="w-5 h-5 rounded-md bg-slate-100 text-slate-700 font-mono text-[11px] font-bold flex items-center justify-center border border-slate-200">
                      #{index + 1}
                    </span>
                    
                    <h3 className="font-semibold text-slate-900 text-base flex items-center gap-1.5">
                      {company.name}
                      <a
                        href={`https://${company.domain}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-400 hover:text-slate-600 inline-flex items-center"
                        title="Visit company website"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </h3>

                    <span className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                      {company.industry}
                    </span>

                    {/* Data Provenance Badge */}
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${
                      company.sourceType === 'live'
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-slate-50 text-slate-500 border-slate-200'
                    }`}>
                      {company.sourceType === 'live' ? 'Live Ingested' : 'Sample Analysis'}
                    </span>
                  </div>

                  {/* The "Why Today?" Trigger Callout */}
                  {topSignal && (
                    <div className="bg-amber-50/80 border border-amber-200/80 rounded-lg p-3 text-xs text-amber-950 flex items-start gap-2.5">
                      <Zap className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-amber-900">Why act today: </span>
                        <span>{topSignal.headline}</span>
                        <div className="text-[11px] text-amber-800/90 mt-1 font-normal">
                          {topSignal.actionableInsight}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Target Persona Preview */}
                  <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50/80 p-2.5 rounded-lg border border-slate-100">
                    <UserCheck className="w-4 h-4 text-slate-500 shrink-0" />
                    <div>
                      <span className="font-medium text-slate-900">Recommended Persona: </span>
                      <span>{company.persona.recommendedRole}</span>
                      {company.persona.identifiedPerson && (
                        <span className="text-slate-500 ml-1.5 font-normal">
                          (e.g., {company.persona.identifiedPerson.name}, {company.persona.identifiedPerson.title})
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Reliability Footnote */}
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                    {company.reliability.confidenceLevel === 'High' ? (
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
                    )}
                    <span>
                      Headcount: {company.reliability.employeeCountRange} • Confidence: {company.reliability.confidenceLevel}
                    </span>
                  </div>
                </div>

                {/* Right: Opportunity Score & Actions */}
                <div className="sm:text-right flex flex-col justify-between sm:items-end gap-3 sm:min-w-[170px] border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                  {/* Score Pill */}
                  <div className="inline-flex sm:flex-col items-start sm:items-end">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold font-mono tracking-tight text-slate-900">
                        {company.scoreResult.totalScore}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">/100</span>
                    </div>
                    <div className="text-[10px] text-slate-500 flex gap-1.5 mt-0.5 font-mono">
                      <span>Fit: {company.scoreResult.fitScore}</span>
                      <span>•</span>
                      <span>Timing: {company.scoreResult.timingScore}</span>
                      <span>•</span>
                      <span>Reach: {company.scoreResult.reachabilityScore}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex sm:flex-col gap-2 w-full">
                    <button
                      onClick={() => onOpenOutreach(company)}
                      className="flex-1 sm:w-full flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition shadow-sm"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Prepare Outreach</span>
                    </button>

                    <button
                      onClick={() => onOpenDossier(company)}
                      className="flex-1 sm:w-full flex items-center justify-center gap-1 text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg text-xs font-medium transition"
                    >
                      <Info className="w-3.5 h-3.5 text-slate-500" />
                      <span>Review Dossier</span>
                    </button>

                    <button
                      onClick={() => onMarkActed(company.id)}
                      className="text-[11px] text-slate-600 hover:text-slate-800 transition py-0.5 text-center"
                    >
                      {isActed ? 'Marked as Acted' : 'Done / Snooze'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
