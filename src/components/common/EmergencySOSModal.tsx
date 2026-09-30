'use client';

import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  X, 
  MapPin, 
  Heart, 
  Flame, 
  AlertOctagon, 
  Wind, 
  Activity, 
  PhoneCall, 
  CheckCircle2, 
  Radio
} from 'lucide-react';
import { useEmergency } from '@/context/EmergencyContext';
import { EmergencyCategory } from '@/types';
import { useRouter } from 'next/navigation';

export default function EmergencySOSModal() {
  const { isSosTriggerOpen, closeSosModal, triggerEmergency, activeEmergency } = useEmergency();
  const [countdown, setCountdown] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<EmergencyCategory>('CARDIAC_ARREST');
  const [customAddress, setCustomAddress] = useState('Avenue 4, Central Park Residences, Flat 402');
  const router = useRouter();

  const emergencyOptions: { id: EmergencyCategory; label: string; icon: React.ReactNode; desc: string }[] = [
    { id: 'CARDIAC_ARREST', label: 'Heart Attack / Cardiac', icon: <Heart className="w-5 h-5 text-red-500 animate-heart-pulse" />, desc: 'Severe chest pain, palpitations, unconsciousness' },
    { id: 'ACCIDENT_TRAUMA', label: 'Accident / Trauma', icon: <Flame className="w-5 h-5 text-amber-500" />, desc: 'Collision, severe bleeding, fracture, physical injury' },
    { id: 'STROKE_NEURO', label: 'Stroke / Paralysis', icon: <Activity className="w-5 h-5 text-purple-500" />, desc: 'Facial drooping, slurred speech, sudden numbness' },
    { id: 'RESPIRATORY_DISTRESS', label: 'Breathing / Choking', icon: <Wind className="w-5 h-5 text-sky-500" />, desc: 'Severe asthma, choking, oxygen deprivation' },
    { id: 'GENERAL_SOS', label: 'Immediate General SOS', icon: <AlertOctagon className="w-5 h-5 text-rose-500" />, desc: 'Urgent medical aid required immediately' }
  ];

  // 3-second countdown if instant trigger is requested
  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      triggerEmergency(selectedCategory, customAddress);
      setCountdown(null);
      router.push('/emergency');
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(prev => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, selectedCategory, customAddress, triggerEmergency, router]);

  if (!isSosTriggerOpen) return null;

  const startCountdown = () => {
    setCountdown(3);
  };

  const cancelCountdown = () => {
    setCountdown(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-xl rounded-3xl bg-slate-950 border-2 border-red-500/50 shadow-2xl p-6 text-white space-y-6 overflow-hidden">
        {/* Glowing Red Emergency Ambient */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-red-600 text-white shadow-lg shadow-red-600/40 animate-pulse">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight text-white flex items-center gap-2">
                CRITICAL SOS ACTIVATION
              </h2>
              <p className="text-xs text-red-300 font-semibold">PulseWatch Real-Time Trauma & ALS Dispatch</p>
            </div>
          </div>

          <button
            onClick={closeSosModal}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* GPS Auto-Locked Box */}
        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-sky-500/20 text-sky-400">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">GPS Auto-Locked Location</p>
              <input
                type="text"
                value={customAddress}
                onChange={(e) => setCustomAddress(e.target.value)}
                className="bg-transparent text-white font-bold focus:outline-none focus:border-b border-sky-500 w-full"
              />
            </div>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-lg border border-emerald-500/30">
            ACCURACY: ±3m
          </span>
        </div>

        {/* Emergency Category Selection */}
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-300">Select Emergency Condition</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {emergencyOptions.map((opt) => {
              const isSelected = selectedCategory === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setSelectedCategory(opt.id)}
                  className={`p-3 rounded-2xl border text-left transition flex items-start gap-2.5 ${
                    isSelected
                      ? 'bg-red-950/60 border-red-500 text-white shadow-lg ring-1 ring-red-500'
                      : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:bg-slate-900 hover:border-slate-700'
                  }`}
                >
                  <div className="p-1.5 rounded-xl bg-slate-800 flex-shrink-0 mt-0.5">
                    {opt.icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">{opt.label}</p>
                    <p className="text-[10px] text-slate-400 leading-tight mt-0.5">{opt.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Countdown Overlay or Trigger Button */}
        {countdown !== null ? (
          <div className="p-6 rounded-2xl bg-red-950 border-2 border-red-500 text-center space-y-3 animate-pulse">
            <p className="text-xs font-bold text-red-300 uppercase tracking-widest">DISPATCHING IN</p>
            <div className="text-6xl font-black font-mono text-white animate-bounce">{countdown}</div>
            <p className="text-xs text-slate-300">Nearest ALS ambulance and AED medical drone are locking coordinates.</p>
            <button
              onClick={cancelCountdown}
              className="px-6 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-600 transition"
            >
              Cancel Countdown
            </button>
          </div>
        ) : (
          <div className="space-y-3 pt-2">
            <button
              onClick={startCountdown}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-base shadow-xl shadow-red-600/40 hover:shadow-red-600/60 active:scale-98 transition flex items-center justify-center gap-3 group"
            >
              <ShieldAlert className="w-6 h-6 group-hover:scale-125 transition" />
              <span>DISPATCH IMMEDIATE AMBULANCE & DRONE</span>
            </button>

            <div className="flex items-center justify-between text-[11px] text-slate-400 px-2">
              <span>Direct Hotline Fallback:</span>
              <a href="tel:108" className="text-red-400 font-bold hover:underline flex items-center gap-1">
                <PhoneCall className="w-3.5 h-3.5" /> Dial 108 / 911 Direct
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
