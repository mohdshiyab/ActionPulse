'use client';

import React from 'react';
import { Plus, Sparkles, Database, Layers } from 'lucide-react';

interface HeaderProps {
  activeTab: 'top5' | 'all';
  setActiveTab: (tab: 'top5' | 'all') => void;
  top5Count: number;
  totalCount: number;
  onOpenAddModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  top5Count,
  totalCount,
  onOpenAddModal,
}) => {
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand & Tagline */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white shadow-sm">
            <Sparkles className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-900 tracking-tight text-base">
                ActionPulse
              </span>
              <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                Copilot v1.0
              </span>
            </div>
          </div>
        </div>

        {/* View Switcher (Humanized & Minimalist) */}
        <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
          <button
            onClick={() => setActiveTab('top5')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === 'top5'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-emerald-600" />
            <span>Today&apos;s 5 Actions</span>
            <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-1.5 py-0.2 rounded-full border border-emerald-200">
              {top5Count}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('all')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === 'all'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Database className="w-3.5 h-3.5 text-slate-500" />
            <span>All Monitored</span>
            <span className="text-slate-500 text-[10px] font-medium px-1.5">
              {totalCount}
            </span>
          </button>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-1.5 rounded-lg text-xs font-medium transition shadow-sm hover:shadow active:scale-[0.98]"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Analyze Company</span>
          </button>
        </div>
      </div>
    </header>
  );
};
