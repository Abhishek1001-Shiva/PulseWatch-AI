'use client';

import React, { useState } from 'react';
import { 
  Heart, 
  Brain, 
  Wind, 
  Activity, 
  ShieldCheck, 
  AlertCircle, 
  Sparkles, 
  CheckCircle2, 
  Flame,
  Info
} from 'lucide-react';
import { MOCK_DIGITAL_TWIN } from '@/lib/mockData';
import { DigitalTwinOrgan } from '@/types';
import { getSeverityBadgeColor } from '@/lib/utils';

export default function DigitalTwinVisualizer() {
  const [selectedOrganName, setSelectedOrganName] = useState<'Heart' | 'Lungs' | 'Brain' | 'Kidneys' | 'Liver'>('Heart');

  const selectedOrgan = MOCK_DIGITAL_TWIN.find(o => o.name === selectedOrganName) || MOCK_DIGITAL_TWIN[0];

  const organIcons = {
    Heart: <Heart className="w-5 h-5 text-rose-500 animate-heart-pulse" />,
    Lungs: <Wind className="w-5 h-5 text-sky-400" />,
    Brain: <Brain className="w-5 h-5 text-purple-400" />,
    Kidneys: <Activity className="w-5 h-5 text-amber-400" />,
    Liver: <Flame className="w-5 h-5 text-emerald-400" />
  };

  return (
    <div className="rounded-3xl bg-slate-950 border border-slate-800 p-5 shadow-2xl relative overflow-hidden">
      {/* Background Cyber Ambient */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-sky-500/20 text-sky-400">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                Digital Twin Health Replica
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                  AI SYNCHRONIZED
                </span>
              </h3>
              <p className="text-xs text-slate-400">Continuous in-silico simulation of vital organ systems</p>
            </div>
          </div>
        </div>

        {/* Global Replica Health Score */}
        <div className="flex items-center gap-3 bg-slate-900/90 border border-slate-800 px-4 py-2 rounded-2xl">
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400">Systemic Integrity</p>
            <p className="text-xl font-black font-mono text-emerald-400">92.4%</p>
          </div>
          <ShieldCheck className="w-8 h-8 text-emerald-500/80" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        {/* Left Side: Interactive Organ Selector Cards */}
        <div className="lg:col-span-5 space-y-2.5">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">Organ Nodes</p>
          {MOCK_DIGITAL_TWIN.map((organ) => {
            const isSelected = selectedOrganName === organ.name;
            return (
              <button
                key={organ.name}
                onClick={() => setSelectedOrganName(organ.name)}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-gradient-to-r from-sky-950/80 to-slate-900 border-sky-500/50 shadow-lg shadow-sky-500/15 ring-1 ring-sky-500/40'
                    : 'bg-slate-900/50 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${isSelected ? 'bg-sky-500/20' : 'bg-slate-800'}`}>
                    {organIcons[organ.name]}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white flex items-center gap-2">
                      {organ.name} System
                    </p>
                    <span className="text-[11px] text-slate-400 font-mono">
                      Score: <strong className="text-white">{organ.healthScore}/100</strong>
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getSeverityBadgeColor(organ.status)}`}>
                    {organ.status}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Side: Deep Organ Diagnostic View */}
        <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-xl bg-slate-800">
                  {organIcons[selectedOrgan.name]}
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white">{selectedOrgan.name} Telemetry & Predictive AI</h4>
                  <p className="text-[11px] text-slate-400">Model: PhysioNeural-V4 Active Stream</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-400 font-bold uppercase">Confidence</p>
                <p className="text-xs font-mono font-bold text-sky-400">99.4%</p>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 my-4">
              {Object.entries(selectedOrgan.metrics).map(([key, val]) => (
                <div key={key} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
                  <p className="text-[10px] uppercase font-bold text-slate-400">{key}</p>
                  <p className="text-sm font-extrabold font-mono text-white mt-0.5">{val}</p>
                </div>
              ))}
            </div>

            {/* AI Insights & Predictive Alerts */}
            <div className="p-3.5 rounded-xl bg-sky-950/40 border border-sky-500/30 space-y-2">
              <div className="flex items-center gap-2 text-sky-400 font-bold text-xs">
                <Sparkles className="w-4 h-4" />
                <span>AI Predictive Prognosis</span>
              </div>
              <ul className="space-y-1.5">
                {selectedOrgan.aiAlerts.map((alert, idx) => (
                  <li key={idx} className="text-xs text-slate-200 flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{alert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-2 text-[11px] text-slate-500 flex items-center justify-between border-t border-slate-800/80">
            <span>Last computational sync: 3s ago</span>
            <span className="text-sky-400 font-medium">Digital Twin Engine v3.2</span>
          </div>
        </div>
      </div>
    </div>
  );
}
