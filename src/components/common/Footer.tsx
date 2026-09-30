'use client';

import React from 'react';
import Link from 'next/link';
import { Activity, ShieldAlert, Heart, Phone, Mail, Globe, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/70 backdrop-blur-md text-slate-600 dark:text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center text-white">
                <Activity className="w-5 h-5 animate-pulse" />
              </div>
              <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
                PulseWatch<span className="text-sky-500">.AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Real-Time Social Listening & Life-Threat Predictive Intelligence ecosystem connecting hospitals, doctors, patients, and pharmacies.
            </p>
          </div>

          {/* Col 2: Emergency Hotlines */}
          <div className="space-y-2.5">
            <p className="font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider text-[11px] flex items-center gap-1.5 text-red-500">
              <ShieldAlert className="w-3.5 h-3.5" /> Emergency Hotlines
            </p>
            <ul className="space-y-1.5 text-xs">
              <li className="flex items-center justify-between py-1 border-b border-slate-200/50 dark:border-slate-800/50">
                <span>Ambulance Direct:</span>
                <span className="font-bold text-red-500 font-mono">108 / 911</span>
              </li>
              <li className="flex items-center justify-between py-1 border-b border-slate-200/50 dark:border-slate-800/50">
                <span>PulseWatch Rapid Drone SOS:</span>
                <span className="font-bold text-sky-500 font-mono">1-800-PULSE-AI</span>
              </li>
              <li className="flex items-center justify-between py-1">
                <span>Poison Control & Trauma:</span>
                <span className="font-bold text-amber-500 font-mono">1-800-222-1222</span>
              </li>
            </ul>
          </div>

          {/* Col 3: 15 Flagship AI Modules */}
          <div className="space-y-2.5">
            <p className="font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider text-[11px] flex items-center gap-1.5 text-sky-500">
              <Sparkles className="w-3.5 h-3.5" /> AI Engine Modules
            </p>
            <div className="grid grid-cols-2 gap-1 text-[11px]">
              <Link href="/emergency" className="hover:text-sky-500">SOS Prediction</Link>
              <Link href="/hospitals" className="hover:text-sky-500">ICU Bed AI</Link>
              <Link href="/dashboard/patient" className="hover:text-sky-500">Digital Twin Organ</Link>
              <Link href="/dashboard/doctor" className="hover:text-sky-500">Medical Imaging</Link>
              <Link href="/dashboard/pharmacy" className="hover:text-sky-500">Blockchain Rx</Link>
              <Link href="/dashboard/super-admin" className="hover:text-sky-500">Social Listening</Link>
            </div>
          </div>

          {/* Col 4: Platform Security & Accreditation */}
          <div className="space-y-2.5">
            <p className="font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider text-[11px] text-emerald-500">
              Security & Compliance
            </p>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              HIPAA & GDPR Compliant • 256-bit Cryptographic Medical Ledger • Verified by National Health Emergency Council.
            </p>
            <div className="flex items-center gap-2 pt-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>All Systems Operational (99.99%)</span>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} PulseWatch AI Inc. Built for life-saving healthcare innovation.</p>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:underline">Privacy Policy</Link>
            <Link href="/" className="hover:underline">Terms of Care</Link>
            <Link href="/emergency" className="hover:underline text-red-500 font-bold">Emergency Protocol</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
