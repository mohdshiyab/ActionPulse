'use client';

import React from 'react';
import { Plus } from 'lucide-react';

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
    <header className="border-b border-zinc-200/80 bg-white/90 backdrop-blur sticky top-0 z-30 transition-all">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md bg-zinc-900 flex items-center justify-center text-white text-[11px] font-bold font-mono shadow-sm">
            AP
          </div>
          <span className="font-semibold text-zinc-900 tracking-tight text-sm">
            ActionPulse
          </span>
        </div>

        {/* View Switcher (Linear-style segmented control) */}
        <div className="flex items-center bg-zinc-100 p-0.5 rounded-lg border border-zinc-200/70">
          <button
            onClick={() => setActiveTab('top5')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
              activeTab === 'top5'
                ? 'bg-white text-zinc-900 shadow-sm'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <span>Today&apos;s 5</span>
            <span className="bg-zinc-900 text-white text-[10px] font-mono font-medium px-1.5 py-0.2 rounded-full">
              {top5Count}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('all')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
              activeTab === 'all'
                ? 'bg-white text-zinc-900 shadow-sm'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <span>Monitored</span>
            <span className="text-zinc-400 font-mono text-[10px]">
              {totalCount}
            </span>
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-1 bg-zinc-900 hover:bg-zinc-800 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition shadow-sm active:scale-[0.98]"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add Account</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>
    </header>
  );
};
