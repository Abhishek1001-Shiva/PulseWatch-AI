'use client';

import React, { useState } from 'react';
import { 
  ShieldAlert, 
  MapPin, 
  PhoneCall, 
  Navigation, 
  Truck, 
  Heart, 
  Activity, 
  Wind, 
  Flame, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles, 
  Volume2, 
  Radio, 
  RotateCcw,
  Hospital as HospitalIcon
} from 'lucide-react';
import { useEmergency } from '@/context/EmergencyContext';
import { MOCK_HOSPITALS } from '@/lib/mockData';
import { EmergencyCategory } from '@/types';
import LiveMapSimulator from '@/components/common/LiveMapSimulator';
import LiveECGMonitor from '@/components/common/LiveECGMonitor';
import { speakText, playAudioBeep } from '@/lib/utils';

export default function EmergencyPage() {
  const { activeEmergency, triggerEmergency, cancelEmergency, updateEmergencyStatus } = useEmergency();
  const [selectedCategory, setSelectedCategory] = useState<EmergencyCategory>('CARDIAC_ARREST');
  const [addressInput, setAddressInput] = useState('Avenue 4, Central Park Residences, Flat 402');

  const categories: { id: EmergencyCategory; label: string; icon: React.ReactNode; desc: string }[] = [
    { id: 'CARDIAC_ARREST', label: 'Cardiac Arrest / Heart Attack', icon: <Heart className="w-5 h-5 text-red-500 animate-heart-pulse" />, desc: 'Severe chest tightness, left arm pain, collapse' },
    { id: 'ACCIDENT_TRAUMA', label: 'Severe Accident & Trauma', icon: <Flame className="w-5 h-5 text-amber-500" />, desc: 'Motor collision, deep lacerations, major blood loss' },
    { id: 'STROKE_NEURO', label: 'Stroke / F.A.S.T Paralysis', icon: <Activity className="w-5 h-5 text-purple-500" />, desc: 'Face drooping, Arm weakness, Speech difficulty' },
    { id: 'RESPIRATORY_DISTRESS', label: 'Severe Respiratory Distress', icon: <Wind className="w-5 h-5 text-sky-500" />, desc: 'Choking, acute asthma attack, hypoxia below 88%' },
    { id: 'ALLERGIC_ANAPHYLAXIS', label: 'Anaphylactic Shock', icon: <AlertCircle className="w-5 h-5 text-rose-500" />, desc: 'Throat swelling, hives, insect sting reaction' },
    { id: 'GENERAL_SOS', label: 'Critical General SOS', icon: <ShieldAlert className="w-5 h-5 text-red-500" />, desc: 'Unspecified urgent medical crisis' },
  ];

  const handleManualTrigger = (cat: EmergencyCategory) => {
    setSelectedCategory(cat);
    triggerEmergency(cat, addressInput);
  };

  const handleFirstAidSpeak = (text: string) => {
    playAudioBeep('alert');
    speakText(text);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner Alert */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 font-bold text-xs bg-red-800/60 px-3 py-1 rounded-full w-fit border border-red-400/30">
            <Radio className="w-4 h-4 animate-pulse text-amber-300" />
            <span>CRITICAL TRAUMA & DISPATCH OPS CENTER</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Real-Time Emergency SOS Response
          </h1>
          <p className="text-xs sm:text-sm text-red-100">
            GPS auto-locks your coordinates, performs AI triage categorization, and dispatches ALS ambulances with automated AED drone support.
          </p>
        </div>

        {/* Global Hotline Fast Dial */}
        <div className="flex flex-wrap items-center gap-3 bg-red-950/70 p-4 rounded-2xl border border-red-500/40">
          <div>
            <p className="text-[10px] uppercase font-bold text-red-300">Direct Emergency Dial</p>
            <p className="text-2xl font-black font-mono text-white">108 / 911</p>
          </div>
          <a
            href="tel:108"
            className="px-4 py-2.5 rounded-xl bg-white text-red-600 font-extrabold text-xs hover:bg-red-50 transition shadow-lg flex items-center gap-1.5"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call 108</span>
          </a>
        </div>
      </div>

      {/* Main Operations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Col: Interactive SOS Trigger & Categories */}
        <div className="lg:col-span-5 space-y-6">
          {/* Giant SOS Trigger Button Box */}
          <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 text-center space-y-5 shadow-2xl relative overflow-hidden">
            <div className="space-y-1">
              <h2 className="text-base font-black text-white">One-Click Emergency Trigger</h2>
              <p className="text-xs text-slate-400">Clicking triggers immediate hospital triage & satellite dispatch</p>
            </div>

            {/* Giant Pulsing SOS Button */}
            <div className="py-4 flex justify-center">
              <button
                onClick={() => handleManualTrigger(selectedCategory)}
                className="relative group focus:outline-none"
              >
                <div className="w-44 h-44 rounded-full bg-gradient-to-tr from-red-600 via-rose-500 to-red-600 text-white flex flex-col items-center justify-center shadow-2xl shadow-red-600/60 group-hover:scale-105 active:scale-95 transition-all border-4 border-white/40">
                  {/* Outer Pulsing Waves */}
                  <div className="absolute inset-0 rounded-full border-2 border-red-500 animate-ping pointer-events-none opacity-40" />
                  <div className="absolute -inset-4 rounded-full border border-rose-500 animate-pulse pointer-events-none opacity-30" />
                  
                  <ShieldAlert className="w-12 h-12 mb-1 group-hover:scale-110 transition" />
                  <span className="text-2xl font-black tracking-wider">SOS</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-red-200">PRESS TO ALERT</span>
                </div>
              </button>
            </div>

            {/* Address input */}
            <div className="space-y-1.5 text-left text-xs">
              <label className="font-bold text-slate-300 flex items-center gap-1.5 text-[11px]">
                <MapPin className="w-3.5 h-3.5 text-red-400" />
                <span>Verified GPS Incident Location</span>
              </label>
              <input
                type="text"
                value={addressInput}
                onChange={(e) => setAddressInput(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white font-medium focus:outline-none focus:border-red-500 text-xs"
              />
            </div>
          </div>

          {/* Emergency Category Selector */}
          <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 space-y-3 shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Select Specific Incident Type</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`p-3 rounded-2xl border text-left transition flex items-start gap-2.5 ${
                      isSelected
                        ? 'bg-red-950/60 border-red-500 text-white ring-1 ring-red-500 shadow-md'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-900 hover:border-slate-700'
                    }`}
                  >
                    <div className="p-1.5 rounded-xl bg-slate-800 flex-shrink-0 mt-0.5">
                      {cat.icon}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">{cat.label}</p>
                      <p className="text-[10px] text-slate-400 leading-tight mt-0.5">{cat.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Col: Live Radar & Dispatch Status & First Aid */}
        <div className="lg:col-span-7 space-y-6">
          {/* Active Emergency Status Card if active */}
          {activeEmergency ? (
            <div className="p-5 rounded-3xl bg-red-950/50 border-2 border-red-500/80 shadow-2xl space-y-4 animate-in fade-in">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-red-500/30">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
                  <h3 className="text-base font-extrabold text-white">
                    EMERGENCY DISPATCH IN PROGRESS: {activeEmergency.category.replace('_', ' ')}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={cancelEmergency}
                    className="px-3 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold border border-slate-700 transition flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Cancel SOS
                  </button>
                </div>
              </div>

              {/* Status Tracker Steps */}
              <div className="grid grid-cols-4 gap-2 text-center text-[11px] font-bold">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  1. Dispatched ✓
                </div>
                <div className="p-2 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/40 animate-pulse">
                  2. En Route
                </div>
                <div className="p-2 rounded-xl bg-slate-900 text-slate-500 border border-slate-800">
                  3. On Scene
                </div>
                <div className="p-2 rounded-xl bg-slate-900 text-slate-500 border border-slate-800">
                  4. Hospital Prep
                </div>
              </div>

              {/* AI Triage & Units Summary */}
              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-red-500/30 text-xs space-y-2">
                <div className="flex items-center gap-2 text-red-300 font-bold">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>AI Trauma Triage Diagnostic</span>
                </div>
                <p className="text-slate-200 leading-relaxed">
                  {activeEmergency.aiTriageSummary}
                </p>
              </div>

              {/* Assigned Units Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-amber-400 font-bold">
                    <span className="flex items-center gap-1.5">
                      <Truck className="w-4 h-4" /> ALS Ambulance 104
                    </span>
                    <span className="text-emerald-400 font-mono">ETA {activeEmergency.assignedHospital.etaMinutes}m</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">Paramedic: <strong>{activeEmergency.assignedAmbulance?.paramedicName}</strong></p>
                  <p className="text-slate-400 text-[10px]">Speed: {activeEmergency.assignedAmbulance?.speedKmH} km/h • Green Wave Priority Active</p>
                </div>

                <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-sky-400 font-bold">
                    <span className="flex items-center gap-1.5">
                      <Navigation className="w-4 h-4" /> AED Medical Drone 08
                    </span>
                    <span className="text-emerald-400 font-mono">ETA 2m</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">Payload: <strong>Automated Defibrillator + Epinephrine</strong></p>
                  <p className="text-slate-400 text-[10px]">Altitude: 120m • Battery: 92%</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Fleet Standby: 42 Ambulances and 14 Medical Drones Online in Metro Zone
              </span>
              <span className="text-emerald-400 font-bold">READY FOR DISPATCH</span>
            </div>
          )}

          {/* Interactive Tactical Radar Map */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Live Satellite Radar & Transit Corridors</h3>
            <LiveMapSimulator emergency={activeEmergency} />
          </div>

          {/* Immediate Step-by-Step First Aid Protocol */}
          <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 space-y-3 shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                </span>
                <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">
                  Immediate On-Scene First Aid Protocol
                </h3>
              </div>
              <button
                onClick={() => handleFirstAidSpeak('Position patient comfortably. Keep airway clear. Do not administer oral liquids if patient is drowsy. Await paramedic arrival.')}
                className="flex items-center gap-1.5 text-xs text-sky-400 font-bold hover:underline"
              >
                <Volume2 className="w-4 h-4" /> Listen Voice Instructions
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <p className="font-extrabold text-sky-400">Step 1: Patient Position</p>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Keep patient in recovery posture on their side if vomiting, or seated upright for cardiac distress.
                </p>
              </div>
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <p className="font-extrabold text-amber-400">Step 2: Clear Airway</p>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Loosen tight collars, ties, or belts. Ensure adequate ventilation and fresh oxygen flow.
                </p>
              </div>
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <p className="font-extrabold text-emerald-400">Step 3: Await Drone AED</p>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Medical drone will descend on safe balcony/ground coordinates with clear audio prompts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
