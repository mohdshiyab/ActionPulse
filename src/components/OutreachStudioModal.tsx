'use client';

import React, { useState, useEffect } from 'react';
import { CompanyRecord } from '../types';
import { 
  X, 
  Copy, 
  Check 
} from 'lucide-react';

interface OutreachStudioModalProps {
  company: CompanyRecord | null;
  onClose: () => void;
}

export const OutreachStudioModal: React.FC<OutreachStudioModalProps> = ({
  company,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const [tone, setTone] = useState<'direct' | 'technical'>('direct');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (company) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [company, onClose]);

  if (!company) return null;

  const subject = company.outreach.subjectLine;
  const directBody = company.outreach.emailBody;

  const technicalBody = `Hi ${company.persona.identifiedPerson?.name || company.persona.recommendedRole} —\n\nI was analyzing ${company.name}'s recent update regarding "${company.outreach.triggerHookUsed}".\n\nWhen scaling this capability, teams typically encounter architecture friction around real-time synchronization and enterprise compliance SLAs. We designed an automated reconciliation pipeline that integrates with ${company.techStack.map(t => t.name).slice(0, 2).join(' and ')} without requiring dedicated engineering maintenance.\n\nOpen to reviewing an architectural breakdown if you're evaluating this area?`;

  const currentBody = tone === 'direct' ? directBody : technicalBody;

  const handleCopy = () => {
    navigator.clipboard.writeText(`Subject: ${subject}\n\n${currentBody}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-zinc-950/40 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white w-full max-w-xl rounded-xl border border-zinc-200/80 shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in-50 zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-zinc-900 tracking-tight">
              Draft Outreach • {company.name}
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Targeting {company.persona.recommendedRole} with verified signal hooks
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-700 p-1.5 rounded-lg hover:bg-zinc-100 transition"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs">
          {/* Persona Card */}
          <div className="border border-zinc-200/70 p-3.5 rounded-xl space-y-1 bg-zinc-50/50">
            <div className="font-medium text-zinc-900">
              Target Persona: {company.persona.recommendedRole}
            </div>
            <p className="text-zinc-600 text-xs leading-relaxed">
              {company.persona.personaRationale}
            </p>
            {company.persona.identifiedPerson && (
              <div className="text-[11px] text-zinc-500 pt-1.5 border-t border-zinc-200/50 mt-1.5">
                Verified: <strong>{company.persona.identifiedPerson.name}</strong> ({company.persona.identifiedPerson.title})
              </div>
            )}
          </div>

          {/* Tone Selector */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-zinc-500 font-medium">Style:</span>
            <div className="flex bg-zinc-100 p-0.5 rounded-lg border border-zinc-200/60">
              <button
                onClick={() => setTone('direct')}
                className={`px-3 py-1 rounded-md text-xs font-medium transition ${
                  tone === 'direct'
                    ? 'bg-white text-zinc-900 shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-900'
                }`}
              >
                Direct & Conversational
              </button>
              <button
                onClick={() => setTone('technical')}
                className={`px-3 py-1 rounded-md text-xs font-medium transition ${
                  tone === 'technical'
                    ? 'bg-white text-zinc-900 shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-900'
                }`}
              >
                Technical / Problem-Centric
              </button>
            </div>
          </div>

          {/* Draft Preview */}
          <div className="space-y-3">
            <div>
              <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-1">
                Subject
              </label>
              <input
                type="text"
                readOnly
                value={subject}
                className="w-full bg-zinc-50/60 border border-zinc-200/70 rounded-lg p-2.5 font-medium text-zinc-900 text-xs focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-1">
                Email Body
              </label>
              <textarea
                readOnly
                rows={6}
                value={currentBody}
                className="w-full bg-zinc-50/60 border border-zinc-200/70 rounded-lg p-3 text-zinc-800 text-xs leading-relaxed font-sans focus:outline-none resize-none"
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3.5 border-t border-zinc-100 bg-white flex items-center justify-between">
          <span className="text-[11px] text-zinc-400 font-mono">
            Channel: {company.outreach.suggestedChannel}
          </span>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-medium px-4 py-2 rounded-lg transition shadow-sm active:scale-[0.98]"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Message</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
