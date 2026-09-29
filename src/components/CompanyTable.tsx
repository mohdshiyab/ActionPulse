'use client';

import React, { useState } from 'react';
import { CompanyRecord } from '../types';
import { 
  ExternalLink, 
  ArrowUpDown, 
  Send, 
  Info, 
  ShieldCheck, 
  ShieldAlert,
  Search,
  Filter
} from 'lucide-react';

interface CompanyTableProps {
  companies: CompanyRecord[];
  onOpenDossier: (company: CompanyRecord) => void;
  onOpenOutreach: (company: CompanyRecord) => void;
}

export const CompanyTable: React.FC<CompanyTableProps> = ({
  companies,
  onOpenDossier,
  onOpenOutreach,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'score' | 'name'>('score');

  const filtered = companies
    .filter(
      (c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.domain.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'score') {
        return b.scoreResult.totalScore - a.scoreResult.totalScore;
      }
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="space-y-4 max-w-5xl mx-auto">
      {/* Search & Filter Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by company, domain, industry..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-400"
          />
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={() => setSortBy(sortBy === 'score' ? 'name' : 'score')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 transition"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span>Sort by: {sortBy === 'score' ? 'Opportunity Score' : 'Name'}</span>
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-medium">
              <tr>
                <th className="py-3 px-4">Company</th>
                <th className="py-3 px-3">Industry</th>
                <th className="py-3 px-3">Priority Score</th>
                <th className="py-3 px-3">Latest Signal</th>
                <th className="py-3 px-3">Reliability</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map((company) => {
                const topSig = company.signals.find((s) => s.isMeaningfulSignal);

                return (
                  <tr key={company.id} className="hover:bg-slate-50/60 transition">
                    {/* Name & Domain */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                        {company.name}
                        <a
                          href={`https://${company.domain}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-400 hover:text-slate-600"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                        {company.domain}
                      </div>
                    </td>

                    {/* Industry */}
                    <td className="py-3.5 px-3">
                      <span className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                        {company.industry}
                      </span>
                    </td>

                    {/* Score */}
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-2">
                        <span className="font-bold font-mono text-sm text-slate-900">
                          {company.scoreResult.totalScore}
                        </span>
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                          <div
                            className="h-full bg-slate-800 rounded-full"
                            style={{ width: `${company.scoreResult.totalScore}%` }}
                          />
                        </div>
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                        F:{company.scoreResult.fitScore} T:{company.scoreResult.timingScore} R:{company.scoreResult.reachabilityScore}
                      </div>
                    </td>

                    {/* Latest Signal */}
                    <td className="py-3.5 px-3 max-w-xs">
                      {topSig ? (
                        <div>
                          <div className="text-slate-800 font-medium truncate">
                            {topSig.headline}
                          </div>
                          <div className="text-[10px] text-emerald-600 font-medium">
                            Meaningful Signal Verified
                          </div>
                        </div>
                      ) : (
                        <span className="text-slate-400 italic">No high-intent trigger yet</span>
                      )}
                    </td>

                    {/* Reliability */}
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-1.5">
                        {company.reliability.confidenceLevel === 'High' ? (
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
                        )}
                        <span className="text-[11px] text-slate-600">
                          {company.reliability.confidenceLevel}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {company.reliability.employeeCountRange}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onOpenDossier(company)}
                          className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
                          title="View Intelligence Dossier"
                        >
                          <Info className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onOpenOutreach(company)}
                          className="p-1.5 text-slate-900 hover:bg-slate-100 rounded-lg transition"
                          title="Generate Contextual Outreach"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
