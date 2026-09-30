'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Activity, 
  ShieldAlert, 
  Sparkles, 
  Heart, 
  Radio, 
  Truck, 
  Brain, 
  Pill, 
  Smile, 
  Watch, 
  Users, 
  Lock, 
  Scan, 
  BedDouble, 
  Navigation, 
  ArrowRight, 
  ChevronRight, 
  CheckCircle2, 
  Stethoscope, 
  Shield, 
  PhoneCall,
  Zap,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useEmergency } from '@/context/EmergencyContext';
import LiveECGMonitor from '@/components/common/LiveECGMonitor';
import LiveMapSimulator from '@/components/common/LiveMapSimulator';
import DigitalTwinVisualizer from '@/components/common/DigitalTwinVisualizer';
import SocialListeningWidget from '@/components/common/SocialListeningWidget';
import Footer from '@/components/common/Footer';
import { UserRole } from '@/types';

export default function HomePage() {
  const { switchRole } = useAuth();
  const { openSosModal } = useEmergency();

  const flagshipFeatures = [
    {
      num: '01',
      title: 'AI Life Threat Prediction Engine',
      desc: 'Predicts acute cardiac events, strokes, and respiratory failure up to 3 hours before clinical escalation using deep neural vitals modeling.',
      icon: Heart,
      tag: 'Predictive AI',
      color: 'from-rose-500/20 to-red-500/20 text-red-400 border-red-500/30'
    },
    {
      num: '02',
      title: 'Real-Time Wearable Telemetry',
      desc: 'Synchronizes Apple Watch, Fitbit, continuous glucose monitors, and ECG patches for millisecond anomaly detection.',
      icon: Watch,
      tag: 'IoT Streaming',
      color: 'from-sky-500/20 to-cyan-500/20 text-sky-400 border-sky-500/30'
    },
    {
      num: '03',
      title: 'Emergency SOS & GPS Dispatch',
      desc: 'One-click SOS auto-routes nearest trauma centers, locks exact coordinates, and dispatches ALS ambulances with zero friction.',
      icon: ShieldAlert,
      tag: 'Critical Care',
      color: 'from-red-500/20 to-orange-500/20 text-orange-400 border-orange-500/30'
    },
    {
      num: '04',
      title: 'Smart Prescriptions & Drug AI',
      desc: 'AI-assisted diagnosis, multi-drug interaction contraindication alerts, and tamper-proof blockchain prescription issuing.',
      icon: Pill,
      tag: 'Pharmacovigilance',
      color: 'from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/30'
    },
    {
      num: '05',
      title: 'Social Listening for Patient Safety',
      desc: 'NLP web-listening across Google reviews, Twitter, and hospital portals to detect hygiene lapses and medication errors in real time.',
      icon: Radio,
      tag: 'NLP Intelligence',
      color: 'from-indigo-500/20 to-sky-500/20 text-indigo-400 border-indigo-500/30'
    },
    {
      num: '06',
      title: 'Live Ambulance & Traffic Radar',
      desc: 'Real-time telemetry tracking with AI traffic-clearing priority routes, live paramedic voice link, and hospital prep countdowns.',
      icon: Truck,
      tag: 'Fleet AI',
      color: 'from-amber-500/20 to-yellow-500/20 text-amber-400 border-amber-500/30'
    },
    {
      num: '07',
      title: 'Digital Twin Organ Health',
      desc: 'Real-time in-silico simulation of patient Heart, Lungs, Brain, Kidneys, and Liver for predictive prognostic intervention.',
      icon: Brain,
      tag: 'Digital Twin',
      color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30'
    },
    {
      num: '08',
      title: 'Controlled Substance Guard',
      desc: 'Automated dosage limiter and prescription authentication protecting against narcotics overuse and dispensing fraud.',
      icon: Shield,
      tag: 'Compliance',
      color: 'from-blue-500/20 to-indigo-500/20 text-blue-400 border-blue-500/30'
    },
    {
      num: '09',
      title: 'AI Mental Health & Stress Monitor',
      desc: 'Continuous HRV and galvanic stress monitoring to detect emotional distress and initiate early mental wellness check-ins.',
      icon: Smile,
      tag: 'Neuro Wellness',
      color: 'from-pink-500/20 to-rose-500/20 text-pink-400 border-pink-500/30'
    },
    {
      num: '10',
      title: 'Smart Wearable ECG Integration',
      desc: 'Continuous Lead-II ECG waveform rendering with real-time arrhythmia, tachycardia, and ST-segment elevation alerts.',
      icon: Activity,
      tag: 'Cardio Telemetry',
      color: 'from-cyan-500/20 to-sky-500/20 text-cyan-400 border-cyan-500/30'
    },
    {
      num: '11',
      title: 'Hospital OPD & ICU Crowd Prediction',
      desc: 'Machine learning forecasting for outpatient department congestion, emergency room wait times, and bed overflows.',
      icon: Users,
      tag: 'Operational AI',
      color: 'from-violet-500/20 to-purple-500/20 text-violet-400 border-violet-500/30'
    },
    {
      num: '12',
      title: 'Blockchain Medical Records (EMR)',
      desc: 'Cryptographically sealed medical histories with patient-sovereign permission grants and doctor audit trails.',
      icon: Lock,
      tag: 'Web3 & Security',
      color: 'from-slate-500/20 to-zinc-500/20 text-slate-300 border-slate-500/30'
    },
    {
      num: '13',
      title: 'AI Medical Imaging Diagnostic',
      desc: 'Instant computer-vision analysis of Chest X-Rays, Brain MRIs, and CT scans with localized pathology heatmaps.',
      icon: Scan,
      tag: 'Vision AI',
      color: 'from-emerald-500/20 to-green-500/20 text-emerald-400 border-emerald-500/30'
    },
    {
      num: '14',
      title: 'Dynamic ICU Bed Allocation',
      desc: 'Live city-wide synchronization of ventilator, oxygen, and critical-care beds with auto-reservation during inbound SOS transit.',
      icon: BedDouble,
      tag: 'Resource Engine',
      color: 'from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30'
    },
    {
      num: '15',
      title: 'Drone-Based Emergency Delivery',
      desc: 'Autonomous medical drone dispatch carrying defibrillators (AED), rare O-Negative blood units, and anti-venom in minutes.',
      icon: Navigation,
      tag: 'Autonomous Drone',
      color: 'from-sky-500/20 to-indigo-500/20 text-sky-400 border-sky-500/30'
    }
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Glow Spheres */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center space-y-6 relative z-10 max-w-3xl mx-auto">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 dark:bg-sky-500/15 border border-sky-500/30 text-sky-600 dark:text-sky-300 text-xs font-bold shadow-sm">
            <Sparkles className="w-4 h-4 text-sky-400 animate-spin-slow" />
            <span>Next-Gen Connected Healthcare & Social Safety Intelligence</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            Predicting Life Threats. <br />
            <span className="bg-gradient-to-r from-sky-500 via-indigo-400 to-rose-400 bg-clip-text text-transparent">
              Protecting Every Pulse.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
            PulseWatch AI continuously monitors real-time patient vitals, social listening safety signals, and hospital capacities—coordinating instant SOS responses with ALS ambulances, AI medical drones, and blockchain prescriptions.
          </p>

          {/* Hero Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={openSosModal}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-base shadow-xl shadow-red-600/30 hover:scale-105 active:scale-95 transition flex items-center gap-3"
            >
              <ShieldAlert className="w-6 h-6 animate-pulse" />
              <span>TEST SOS EMERGENCY</span>
            </button>

            <Link
              href="/dashboard/patient"
              className="px-8 py-4 rounded-2xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-base border border-slate-700 shadow-xl transition flex items-center gap-2"
            >
              <span>Explore Dashboard</span>
              <ArrowRight className="w-5 h-5 text-sky-400" />
            </Link>
          </div>
        </div>

        {/* Instant Role Access Bar */}
        <div className="mt-14 max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { role: 'patient' as UserRole, label: 'Patient Portal', desc: 'Vitals, Rx & SOS', icon: Heart, path: '/dashboard/patient', color: 'hover:border-sky-500/50' },
            { role: 'doctor' as UserRole, label: 'Doctor Hub', desc: 'AI Prescribe & Scans', icon: Stethoscope, path: '/dashboard/doctor', color: 'hover:border-emerald-500/50' },
            { role: 'pharmacy' as UserRole, label: 'Pharmacy Desk', desc: 'QR & Blockchain', icon: Pill, path: '/dashboard/pharmacy', color: 'hover:border-purple-500/50' },
            { role: 'super-admin' as UserRole, label: 'Super Admin HQ', desc: 'City Radar & NLP', icon: Shield, path: '/dashboard/super-admin', color: 'hover:border-rose-500/50' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.role}
                href={item.path}
                onClick={() => switchRole(item.role)}
                className={`p-4 rounded-2xl bg-white/70 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:scale-102 transition shadow-lg backdrop-blur-md flex flex-col justify-between group ${item.color}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 group-hover:bg-sky-500 group-hover:text-white transition">
                    <Icon className="w-5 h-5" />
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-sky-400 group-hover:translate-x-1 transition" />
                </div>
                <div>
                  <h3 className="text-xs font-extrabold text-slate-900 dark:text-white">{item.label}</h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{item.desc}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Live Continuous Telemetry Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: ECG Oscilloscope */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Activity className="w-4 h-4 text-sky-400" />
                Live Patient Bio-Telemetry Stream
              </h3>
              <span className="text-[11px] text-emerald-500 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                Stream Synced (60 Hz)
              </span>
            </div>
            <LiveECGMonitor height={180} />
          </div>

          {/* Right: City-Wide Emergency Radar Simulator */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-400" />
                Rapid Response Radar & Drone Fleet
              </h3>
              <Link href="/emergency" className="text-[11px] text-sky-400 font-bold hover:underline">
                Full Map View →
              </Link>
            </div>
            <LiveMapSimulator />
          </div>
        </div>
      </section>

      {/* 15 Flagship AI Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 text-sky-500 text-xs font-bold">
            <Zap className="w-3.5 h-3.5" /> 15 Flagship AI Modules
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            An Uncompromising Healthcare Intelligence Engine
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Powered by predictive bio-algorithms, real-time social sentiment analysis, and instant trauma logistics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {flagshipFeatures.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.num}
                className="p-5 rounded-3xl bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 hover:border-sky-500/50 hover:shadow-xl dark:hover:shadow-sky-500/5 transition group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-2xl border bg-gradient-to-br ${feat.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-black font-mono text-slate-200 dark:text-slate-800 group-hover:text-sky-500/40 transition">
                      {feat.num}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-sky-600 dark:text-sky-400">
                      {feat.tag}
                    </span>
                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mt-0.5">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-semibold text-[11px]">Status: Active</span>
                  <span className="text-sky-500 font-bold group-hover:translate-x-1 transition">Learn details →</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Digital Twin Interactive Feature Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              Feature #07: Digital Twin Health Replica
            </h2>
            <p className="text-xs text-slate-500">Live multi-organ physiological model simulating real-time risks</p>
          </div>
          <Link href="/dashboard/patient" className="text-xs font-bold text-sky-400 hover:underline">
            Patient Portal View →
          </Link>
        </div>
        <DigitalTwinVisualizer />
      </section>

      {/* Social Listening Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              Feature #05: Real-Time Social Listening & Patient Signals
            </h2>
            <p className="text-xs text-slate-500">NLP listening engine filtering critical healthcare feedback</p>
          </div>
          <Link href="/dashboard/super-admin" className="text-xs font-bold text-sky-400 hover:underline">
            Super Admin View →
          </Link>
        </div>
        <SocialListeningWidget />
      </section>

      {/* CTA Emergency Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-red-600 via-rose-600 to-indigo-700 p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <h2 className="text-3xl font-black tracking-tight">
              Ready to experience real-time healthcare intelligence?
            </h2>
            <p className="text-sm text-red-100 leading-relaxed">
              Launch into any of our 4 dedicated portals or test the instantaneous trauma SOS and ambulance routing right now.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={openSosModal}
              className="px-6 py-3.5 rounded-2xl bg-white text-red-600 font-extrabold text-sm shadow-xl hover:bg-red-50 hover:scale-105 active:scale-95 transition flex items-center gap-2"
            >
              <ShieldAlert className="w-5 h-5" />
              <span>Launch SOS Modal</span>
            </button>
            <Link
              href="/hospitals"
              className="px-6 py-3.5 rounded-2xl bg-black/30 hover:bg-black/40 text-white font-bold text-sm border border-white/20 transition"
            >
              Find Hospitals & ICU Beds
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
