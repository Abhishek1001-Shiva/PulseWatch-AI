'use client';

import React, { useState } from 'react';
import { 
  Shield, 
  BarChart3, 
  Radio, 
  Hospital as HospitalIcon, 
  Users, 
  Truck, 
  AlertTriangle, 
  Sparkles, 
  CheckCircle2, 
  Send, 
  BedDouble, 
  Activity, 
  Eye, 
  ShieldAlert,
  Flame,
  Building2
} from 'lucide-react';
import Sidebar from '@/components/common/Sidebar';
import { useAuth } from '@/context/AuthContext';
import { MOCK_HOSPITALS, MOCK_SOCIAL_SIGNALS } from '@/lib/mockData';
import SocialListeningWidget from '@/components/common/SocialListeningWidget';
import LiveMapSimulator from '@/components/common/LiveMapSimulator';
import { playAudioBeep, speakText } from '@/lib/utils';

export default function SuperAdminDashboard() {
  const { user } = useAuth();
  const [broadcastText, setBroadcastText] = useState('');
  const [broadcastSuccess, setBroadcastSuccess] = useState(false);

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastText.trim()) return;
    playAudioBeep('alert');
    setBroadcastSuccess(true);
    speakText('System-wide emergency health advisory broadcasted.');
    setTimeout(() => {
      setBroadcastText('');
      setBroadcastSuccess(false);
    }, 4000);
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <Sidebar />

      <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 overflow-y-auto max-w-7xl mx-auto">
        {/* Admin Header Banner */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 text-white shadow-2xl border border-rose-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-bold uppercase tracking-wider border border-rose-500/30">
                HQ Ecosystem Command Hub
              </span>
              <span className="text-slate-400 text-xs font-mono">Metro Grid Sector 01-12</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              {user?.name || 'Commander Robert Sterling'}
            </h1>
            <p className="text-xs text-slate-300">
              National Health Emergency Council • City-Wide Triage, Social Listening NLP, & Resource Logistics
            </p>
          </div>

          <div className="flex items-center gap-2 bg-rose-500/10 px-4 py-2 rounded-2xl border border-rose-500/30">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-bold text-slate-200">Network Operational: Normal</span>
          </div>
        </div>

        {/* Global Key Metric Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-lg space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase">
              <span>Connected Hospitals</span>
              <HospitalIcon className="w-4 h-4 text-sky-400" />
            </div>
            <p className="text-2xl font-black font-mono text-slate-900 dark:text-white">12 Centers</p>
            <p className="text-[11px] text-slate-500">7 Private • 5 Government</p>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-lg space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase">
              <span>Total ICU Occupancy</span>
              <BedDouble className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-2xl font-black font-mono text-slate-900 dark:text-white">316 / 377</p>
            <p className="text-[11px] text-emerald-500 font-bold">61 ICU Beds Available (16%)</p>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-lg space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase">
              <span>Active Ambulance Fleet</span>
              <Truck className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-2xl font-black font-mono text-slate-900 dark:text-white">58 / 62 Active</p>
            <p className="text-[11px] text-slate-500">Avg Response Time: 4.8 Mins</p>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-lg space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase">
              <span>Social Signals Analyzed</span>
              <Radio className="w-4 h-4 text-purple-400" />
            </div>
            <p className="text-2xl font-black font-mono text-purple-400">1,840 Posts / hr</p>
            <p className="text-[11px] text-slate-500">96.8% Patient Satisfaction</p>
          </div>
        </div>

        {/* City-Wide Map & Dispatch Fleet Overview */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Truck className="w-5 h-5 text-amber-400" />
              City Fleet & Incident Tactical Radar
            </h3>
            <span className="text-xs text-slate-400 font-mono">Live Grid Sync</span>
          </div>
          <LiveMapSimulator />
        </div>

        {/* Social Listening Section */}
        <div id="social" className="space-y-4">
          <SocialListeningWidget />
        </div>

        {/* System-Wide Broadcast Advisory Tool */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-rose-500/20 text-rose-400">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white">Public & Clinical Emergency Broadcast</h3>
                <p className="text-xs text-slate-500">Transmit urgent push notifications to all patient wearables and doctor suites</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleBroadcast} className="space-y-3">
            <textarea
              rows={2}
              value={broadcastText}
              onChange={(e) => setBroadcastText(e.target.value)}
              placeholder="E.g., High humidity cardiac advisory issued for Metro Zone North. Hospitals prepare additional heat-stress hydration units..."
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-rose-500"
            />

            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Target: All Metro Connected Citizens & ER Hubs</span>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 transition flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Transmit Broadcast Alert</span>
              </button>
            </div>

            {broadcastSuccess && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Advisory successfully transmitted across 14,200 active wearable endpoints!</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
