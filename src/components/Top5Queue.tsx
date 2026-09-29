'use client';

import React from 'react';
import { CompanyRecord } from '../types';
import { 
  ArrowUpRight, 
  Send, 
  Check, 
  Info,
  Clock
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
      <div className="bg-white rounded-xl border border-zinc-200/80 p-12 text-center max-w-lg mx-auto my-12">
        <div className="w-9 h-9 rounded-full bg-zinc-100 text-zinc-900 flex items-center justify-center mx-auto mb-3">
          <Check className="w-4 h-4 stroke-[2.5]" />
        </div>
        <h3 className="text-sm font-semibold text-zinc-900">
          All high-intent actions completed
        </h3>
        <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
          You have reviewed all prioritized opportunities for today. The queue will repopulate as new website changes are detected.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-3 border-b border-zinc-200/60 gap-2">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
            Today&apos;s Focus Queue
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            5 accounts prioritized from your total pool based on verified buying triggers.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 font-mono">
          <Clock className="w-3 h-3" />
          <span>Refreshes daily</span>
        </div>
      </div>

      {/* Cards List */}
      <div className="space-y-3.5">
        {companies.map((company, index) => {
          const topSignal = company.signals.find((s) => s.isMeaningfulSignal) || company.signals[0];
          const isActed = company.status === 'acted_on';

          return (
            <div
              key={company.id}
              className={`bg-white rounded-xl border transition-all duration-150 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:shadow-[0_3px_8px_rgba(0,0,0,0.04)] ${
                isActed ? 'opacity-50 border-zinc-200 bg-zinc-50/40' : 'border-zinc-200/80 hover:border-zinc-300'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                {/* Left Meta & Identification */}
                <div className="space-y-3 flex-1 min-w-0">
                  {/* Title Bar */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-semibold text-zinc-400">
                      0{index + 1}
                    </span>
                    
                    <h3 className="font-semibold text-zinc-900 text-sm flex items-center gap-1">
                      {company.name}
                      <a
                        href={`https://${company.domain}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-zinc-400 hover:text-zinc-700 transition-colors"
                        title="Visit website"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </h3>

                    <span className="text-[11px] text-zinc-500 bg-zinc-100/80 px-2 py-0.5 rounded-md">
                      {company.industry}
                    </span>

                    {company.sourceType === 'live' && (
                      <span className="text-[10px] font-mono text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200/60">
                        Live
                      </span>
                    )}
                  </div>

                  {/* Trigger Box (Minimalist line-based callout) */}
                  {topSignal && (
                    <div className="border-l-2 border-zinc-900 pl-3 py-0.5">
                      <div className="text-xs font-medium text-zinc-900 leading-snug">
                        {topSignal.headline}
                      </div>
                      <div className="text-[11px] text-zinc-500 mt-0.5 leading-relaxed">
                        {topSignal.actionableInsight}
                      </div>
                    </div>
                  )}

                  {/* Target Persona Preview */}
                  <div className="text-xs text-zinc-600 flex items-baseline gap-1.5 flex-wrap">
                    <span className="text-zinc-400 font-medium">Approach:</span>
                    <span className="font-medium text-zinc-800">{company.persona.recommendedRole}</span>
                    {company.persona.identifiedPerson && (
                      <span className="text-zinc-500 text-[11px]">
                        ({company.persona.identifiedPerson.name})
                      </span>
                    )}
                  </div>

                  {/* Footnote: Reliability Range */}
                  <div className="text-[11px] text-zinc-400 font-mono">
                    Headcount: {company.reliability.employeeCountRange} • {company.reliability.confidenceLevel} confidence
                  </div>
                </div>

                {/* Right: Opportunity Score & Actions */}
                <div className="flex flex-row sm:flex-col justify-between sm:items-end items-center gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-zinc-100">
                  {/* Score */}
                  <div className="text-left sm:text-right">
                    <div className="flex items-baseline sm:justify-end gap-1 font-mono">
                      <span className="text-xl font-bold tracking-tight text-zinc-900">
                        {company.scoreResult.totalScore}
                      </span>
                      <span className="text-xs text-zinc-400">/100</span>
                    </div>
                    <div className="text-[10px] text-zinc-400 font-mono mt-0.5">
                      F:{company.scoreResult.fitScore} • T:{company.scoreResult.timingScore} • R:{company.scoreResult.reachabilityScore}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex sm:flex-col items-center gap-1.5">
                    <button
                      onClick={() => onOpenOutreach(company)}
                      className="flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition shadow-sm active:scale-[0.98]"
                    >
                      <Send className="w-3 h-3" />
                      <span>Outreach</span>
                    </button>

                    <button
                      onClick={() => onOpenDossier(company)}
                      className="flex items-center gap-1 text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 px-2.5 py-1.5 rounded-lg text-xs font-medium transition"
                    >
                      <Info className="w-3 h-3 text-zinc-400" />
                      <span>Dossier</span>
                    </button>

                    <button
                      onClick={() => onMarkActed(company.id)}
                      className="text-[11px] text-zinc-400 hover:text-zinc-700 transition px-2 py-0.5"
                    >
                      {isActed ? 'Marked' : 'Dismiss'}
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
