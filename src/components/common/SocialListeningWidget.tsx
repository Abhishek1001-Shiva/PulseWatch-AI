'use client';

import React, { useState } from 'react';
import { 
  Radio, 
  Sparkles, 
  AlertTriangle, 
  MessageSquare, 
  CheckCircle, 
  Twitter, 
  TrendingUp,
  ShieldCheck,
  Building2,
  Filter
} from 'lucide-react';
import { MOCK_SOCIAL_SIGNALS } from '@/lib/mockData';
import { SocialListeningSignal } from '@/types';
import { formatRelativeTime, getSeverityBadgeColor } from '@/lib/utils';

export default function SocialListeningWidget() {
  const [signals, setSignals] = useState<SocialListeningSignal[]>(MOCK_SOCIAL_SIGNALS);
  const [filter, setFilter] = useState<'ALL' | 'URGENT' | 'PRAISE'>('ALL');

  const filteredSignals = signals.filter(s => {
    if (filter === 'URGENT') return s.sentiment === 'URGENT_SAFETY' || s.sentiment === 'NEGATIVE';
    if (filter === 'PRAISE') return s.sentiment === 'POSITIVE';
    return true;
  });

  return (
    <div className="rounded-3xl bg-slate-950 border border-slate-800 p-5 shadow-2xl space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
              Social Listening & Safety Intelligence
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold">
                NLP STREAM ACTIVE
              </span>
            </h3>
            <p className="text-xs text-slate-400">Real-time public sentiment, hospital complaints & safety signal interceptor</p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
              filter === 'ALL' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            All Feeds
          </button>
          <button
            onClick={() => setFilter('URGENT')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
              filter === 'URGENT' ? 'bg-red-500 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Safety Alerts
          </button>
          <button
            onClick={() => setFilter('PRAISE')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
              filter === 'PRAISE' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Commendations
          </button>
        </div>
      </div>

      {/* Signal Stream */}
      <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
        {filteredSignals.map((sig) => {
          const isUrgent = sig.sentiment === 'URGENT_SAFETY';
          return (
            <div
              key={sig.id}
              className={`p-4 rounded-2xl border transition ${
                isUrgent
                  ? 'bg-red-950/30 border-red-500/40 shadow-lg shadow-red-950/20'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-bold">
                    {sig.source === 'TWITTER' ? '𝕏 / Twitter' : sig.source === 'GOOGLE_REVIEWS' ? 'Google Reviews' : 'Hospital Portal'}
                  </div>
                  <span className="text-xs font-bold text-slate-200">{sig.author}</span>
                  <span className="text-[10px] text-slate-500">• {formatRelativeTime(sig.timestamp)}</span>
                </div>

                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getSeverityBadgeColor(isUrgent ? 'CRITICAL' : 'LOW')}`}>
                  {sig.safetyCategory.replace('_', ' ')}
                </span>
              </div>

              <p className="mt-2 text-xs text-slate-300 leading-relaxed font-normal">
                &ldquo;{sig.content}&rdquo;
              </p>

              {/* AI Auto-Action Box */}
              {sig.actionTaken && (
                <div className="mt-3 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Sparkles className="w-4 h-4 text-sky-400 flex-shrink-0" />
                    <span><strong>AI Action:</strong> {sig.actionTaken}</span>
                  </div>
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 ml-2" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
