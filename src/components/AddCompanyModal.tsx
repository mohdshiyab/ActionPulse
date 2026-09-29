'use client';

import React, { useState } from 'react';
import { CompanyRecord } from '../types';
import { 
  X, 
  Globe, 
  ArrowRight, 
  CheckCircle2, 
  Loader2, 
  Sparkles,
  AlertCircle
} from 'lucide-react';

interface AddCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCompanyAdded: (company: CompanyRecord) => void;
}

export const AddCompanyModal: React.FC<AddCompanyModalProps> = ({
  isOpen,
  onClose,
  onCompanyAdded,
}) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const steps = [
    'Scanning public website structure and meta tags...',
    'Triangulating data sources & evaluating reliability...',
    'Detecting change signals & separating noise...',
    'Computing deterministic opportunity score (Fit, Timing, Reach)...',
    'Synthesizing buying persona & contextual outreach hook...',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError(null);
    setCurrentStep(0);

    try {
      // Progressive step simulation for honest UX
      for (let i = 0; i < steps.length; i++) {
        setCurrentStep(i);
        await new Promise((resolve) => setTimeout(resolve, 600));
      }

      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to analyze company');
      }

      onCompanyAdded(data.company);
      setUrl('');
      onClose();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Analysis failed';
      setError(message);
    } finally {
      setLoading(false);
      setCurrentStep(0);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in-50 zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Analyze New Company
              </h2>
              <div className="text-[11px] text-slate-500">
                Input $\rightarrow$ Research $\rightarrow$ AI $\rightarrow$ Reliability $\rightarrow$ Score
              </div>
            </div>
          </div>
          {!loading && (
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {!loading ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                  Company Website Domain / URL
                </label>
                <div className="relative">
                  <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. mintlify.com or https://dub.co"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 transition"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1.5">
                  Enter any public domain. The autonomous pipeline will extract ICP fit, detect signals, verify reliability, and score opportunity.
                </p>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-xs text-red-700">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-4 py-1.5 rounded-lg text-xs font-medium transition shadow-sm active:scale-[0.98]"
                >
                  <span>Run Analysis Pipeline</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          ) : (
            /* Progressive Step Progress UI (Honest Latency) */
            <div className="py-4 space-y-4">
              <div className="text-center space-y-1 mb-6">
                <h3 className="text-sm font-semibold text-slate-900">
                  Executing Pipeline: {url}
                </h3>
                <p className="text-xs text-slate-500">
                  Running automated research, delta checking, and scoring...
                </p>
              </div>

              <div className="space-y-3">
                {steps.map((stepText, idx) => {
                  const isDone = idx < currentStep;
                  const isCurrent = idx === currentStep;

                  return (
                    <div
                      key={idx}
                      className={`flex items-center gap-3 text-xs transition-all duration-300 ${
                        isDone
                          ? 'text-slate-900 font-medium'
                          : isCurrent
                          ? 'text-slate-900 font-bold'
                          : 'text-slate-400 opacity-60'
                      }`}
                    >
                      <div className="w-5 h-5 flex items-center justify-center shrink-0">
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : isCurrent ? (
                          <Loader2 className="w-4 h-4 text-slate-900 animate-spin" />
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-slate-300" />
                        )}
                      </div>
                      <span>{stepText}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
