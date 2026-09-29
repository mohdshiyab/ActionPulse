'use client';

import React, { useState } from 'react';
import { CompanyRecord } from '../types';
import { 
  ArrowUpRight, 
  ArrowUpDown, 
  Send, 
  Info, 
  Search 
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
    <div className="space-y-4 max-w-4xl mx-auto">
      {/* Search & Filter Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-xl border border-zinc-200/80">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search accounts, domains, industries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-zinc-50/60 border border-zinc-200/70 rounded-lg text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:bg-white transition-all"
          />
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={() => setSortBy(sortBy === 'score' ? 'name' : 'score')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200/70 text-xs font-medium text-zinc-700 bg-white hover:bg-zinc-50 transition"
          >
            <ArrowUpDown className="w-3 h-3 text-zinc-400" />
            <span>Sort: {sortBy === 'score' ? 'Score' : 'Name'}</span>
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl border border-zinc-200/80 overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-50/70 border-b border-zinc-100 text-zinc-400 font-mono">
              <tr>
                <th className="py-2.5 px-4 font-medium uppercase tracking-wider text-[10px]">Account</th>
                <th className="py-2.5 px-3 font-medium uppercase tracking-wider text-[10px]">Industry</th>
                <th className="py-2.5 px-3 font-medium uppercase tracking-wider text-[10px]">Score</th>
                <th className="py-2.5 px-3 font-medium uppercase tracking-wider text-[10px]">Recent Signal</th>
                <th className="py-2.5 px-3 font-medium uppercase tracking-wider text-[10px]">Headcount</th>
                <th className="py-2.5 px-4 text-right font-medium uppercase tracking-wider text-[10px]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 text-zinc-700">
              {filtered.map((company) => {
                const topSig = company.signals.find((s) => s.isMeaningfulSignal);

                return (
                  <tr key={company.id} className="hover:bg-zinc-50/60 transition-colors">
                    {/* Name & Domain */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-zinc-900 flex items-center gap-1">
                        {company.name}
                        <a
                          href={`https://${company.domain}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-zinc-400 hover:text-zinc-700"
                        >
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      </div>
                      <div className="text-[11px] text-zinc-400 font-mono">
                        {company.domain}
                      </div>
                    </td>

                    {/* Industry */}
                    <td className="py-3 px-3">
                      <span className="text-[11px] text-zinc-600 bg-zinc-100/80 px-2 py-0.5 rounded">
                        {company.industry}
                      </span>
                    </td>

                    {/* Score */}
                    <td className="py-3 px-3">
                      <div className="font-mono font-bold text-zinc-900">
                        {company.scoreResult.totalScore}
                      </div>
                      <div className="text-[10px] text-zinc-400 font-mono">
                        F:{company.scoreResult.fitScore} T:{company.scoreResult.timingScore} R:{company.scoreResult.reachabilityScore}
                      </div>
                    </td>

                    {/* Latest Signal */}
                    <td className="py-3 px-3 max-w-[220px]">
                      {topSig ? (
                        <div className="truncate text-zinc-800" title={topSig.headline}>
                          {topSig.headline}
                        </div>
                      ) : (
                        <span className="text-zinc-400 italic">No trigger detected</span>
                      )}
                    </td>

                    {/* Headcount */}
                    <td className="py-3 px-3 font-mono text-[11px] text-zinc-600">
                      <div>{company.reliability.employeeCountRange}</div>
                      <div className="text-[10px] text-zinc-400">{company.reliability.confidenceLevel}</div>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onOpenDossier(company)}
                          className="p-1 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded transition"
                          title="View Dossier"
                        >
                          <Info className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onOpenOutreach(company)}
                          className="p-1 text-zinc-900 hover:bg-zinc-100 rounded transition"
                          title="Draft Outreach"
                        >
                          <Send className="w-3.5 h-3.5" />
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
