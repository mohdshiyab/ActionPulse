'use client';

import React, { useState, useEffect } from 'react';
import { CompanyRecord } from '../types';
import { 
  X, 
  Globe, 
  ArrowRight, 
  Check, 
  Loader2, 
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

  // Keyboard shortcut to close (Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !loading) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, loading, onClose]);

  if (!isOpen) return null;

  const steps = [
    'Scanning public website structure and meta tags',
    'Auditing multi-source reliability and employee ranges',
    'Comparing snapshots to isolate high-intent buying signals',
    'Calculating deterministic score (Fit, Timing, Reachability)',
    'Identifying target persona and generating contextual outreach hook',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError(null);
    setCurrentStep(0);

    try {
      // Step-by-step progress indicator
      for (let i = 0; i < steps.length; i++) {
        setCurrentStep(i);
        await new Promise((resolve) => setTimeout(resolve, 550));
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
    <div 
      className="fixed inset-0 z-50 bg-zinc-950/40 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget && !loading) onClose();
      }}
    >
      <div className="bg-white w-full max-w-lg rounded-xl border border-zinc-200/80 shadow-xl overflow-hidden animate-in fade-in-50 zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-zinc-900 tracking-tight">
              Analyze New Account
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Automated intelligence, signal extraction, and scoring
            </p>
          </div>
          {!loading && (
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-zinc-700 p-1.5 rounded-lg hover:bg-zinc-100 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {!loading ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-zinc-700 block mb-1.5">
                  Company Domain or Website
                </label>
                <div className="relative">
                  <Globe className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    autoFocus
                    placeholder="e.g. mintlify.com or dub.co"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-zinc-50/60 border border-zinc-200 rounded-lg text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:bg-white transition-all"
                  />
                </div>
                <p className="text-[11px] text-zinc-500 mt-1.5">
                  Enter any public domain. The system evaluates B2B monetization fit, recent buying triggers, and reachability.
                </p>
              </div>

              {error && (
                <div className="p-3 bg-red-50/70 border border-red-200/80 rounded-lg flex items-center gap-2 text-xs text-red-700">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 text-white px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors shadow-sm active:scale-[0.98]"
                >
                  <span>Run Analysis</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          ) : (
            /* Progress State */
            <div className="py-2 space-y-5">
              <div className="space-y-1">
                <h3 className="text-xs font-medium text-zinc-900">
                  Analyzing <span className="font-mono">{url}</span>
                </h3>
                <p className="text-[11px] text-zinc-500">
                  Extracting facts, checking reliability, and scoring priority...
                </p>
              </div>

              <div className="space-y-3">
                {steps.map((stepText, idx) => {
                  const isDone = idx < currentStep;
                  const isCurrent = idx === currentStep;

                  return (
                    <div
                      key={idx}
                      className={`flex items-center gap-2.5 text-xs transition-colors duration-200 ${
                        isDone
                          ? 'text-zinc-900'
                          : isCurrent
                          ? 'text-zinc-900 font-medium'
                          : 'text-zinc-400'
                      }`}
                    >
                      <div className="w-4 h-4 flex items-center justify-center shrink-0">
                        {isDone ? (
                          <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                            <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                          </div>
                        ) : isCurrent ? (
                          <Loader2 className="w-3.5 h-3.5 text-zinc-900 animate-spin" />
                        ) : (
                          <div className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
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
