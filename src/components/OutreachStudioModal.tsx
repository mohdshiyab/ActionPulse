'use client';

import React, { useState } from 'react';
import { CompanyRecord } from '../types';
import { 
  X, 
  Copy, 
  Check, 
  Send, 
  UserCheck, 
  Zap, 
  Mail, 
  SlidersHorizontal 
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

  if (!company) return null;

  const subject = company.outreach.subjectLine;
  const directBody = company.outreach.emailBody;

  // Alternate technical tone draft
  const technicalBody = `Hi ${company.persona.identifiedPerson?.name || company.persona.recommendedRole} —\n\nI was analyzing ${company.name}'s recent update regarding "${company.outreach.triggerHookUsed}".\n\nWhen scaling this capability, teams typically encounter architecture friction around real-time synchronization and enterprise compliance SLAs. We designed an automated reconciliation pipeline that integrates with ${company.techStack.map(t => t.name).slice(0, 2).join(' and ')} without requiring dedicated engineering maintenance.\n\nOpen to reviewing an architectural breakdown if you're evaluating this area?`;

  const currentBody = tone === 'direct' ? directBody : technicalBody;

  const handleCopy = () => {
    navigator.clipboard.writeText(`Subject: ${subject}\n\n${currentBody}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in-50 zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-600" />
              <span>Contextual Outreach Studio</span>
            </h2>
            <div className="text-xs text-slate-500 mt-0.5">
              Targeting {company.name} with anti-spam, trigger-driven messaging
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs">
          {/* Target Persona Context (Task 3) */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-slate-900 font-semibold">
              <UserCheck className="w-4 h-4 text-slate-700" />
              <span>Target Persona: {company.persona.recommendedRole}</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              <span className="font-semibold text-slate-700">Why this role: </span>
              {company.persona.personaRationale}
            </p>
            {company.persona.identifiedPerson && (
              <div className="text-[11px] text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200 flex justify-between items-center">
                <span>Verified Contact: <strong>{company.persona.identifiedPerson.name}</strong> ({company.persona.identifiedPerson.title})</span>
                <span className="text-slate-400 font-mono text-[10px]">Source: {company.persona.identifiedPerson.source}</span>
              </div>
            )}
          </div>

          {/* Trigger Hook Referenced (Task 4) */}
          <div className="bg-amber-50/70 border border-amber-200 p-3 rounded-xl flex items-start gap-2.5 text-amber-950">
            <Zap className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Contextual Trigger Hook: </span>
              <span>{company.outreach.triggerHookUsed}</span>
            </div>
          </div>

          {/* Tone Selector */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2 text-slate-600 font-medium">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              <span>Outreach Style:</span>
            </div>
            <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
              <button
                onClick={() => setTone('direct')}
                className={`px-3 py-1 rounded-md text-xs font-medium transition ${
                  tone === 'direct'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Direct & Conversational
              </button>
              <button
                onClick={() => setTone('technical')}
                className={`px-3 py-1 rounded-md text-xs font-medium transition ${
                  tone === 'technical'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Architecture & Problem-Centric
              </button>
            </div>
          </div>

          {/* Draft Preview */}
          <div className="space-y-3">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Subject Line
              </label>
              <input
                type="text"
                readOnly
                value={subject}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-medium text-slate-800 text-xs focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Email Body (Anti-Spam / Low Friction CTA)
              </label>
              <textarea
                readOnly
                rows={7}
                value={currentBody}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-800 text-xs leading-relaxed font-sans focus:outline-none resize-none"
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50/50 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Channel: <strong>{company.outreach.suggestedChannel}</strong>
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium px-4 py-2 rounded-lg transition shadow-sm active:scale-[0.98]"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Subject & Body</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
