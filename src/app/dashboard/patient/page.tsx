'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Heart, 
  Activity, 
  Watch, 
  FileText, 
  Calendar, 
  Pill, 
  ShieldAlert, 
  Sparkles, 
  CheckCircle2, 
  QrCode, 
  Clock, 
  Phone, 
  Video, 
  AlertCircle,
  Truck,
  ArrowUpRight,
  TrendingUp,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useEmergency } from '@/context/EmergencyContext';
import { MOCK_PRESCRIPTIONS, MOCK_INITIAL_VITALS } from '@/lib/mockData';
import LiveECGMonitor from '@/components/common/LiveECGMonitor';
import DigitalTwinVisualizer from '@/components/common/DigitalTwinVisualizer';
import Sidebar from '@/components/common/Sidebar';

export default function PatientDashboard() {
  const { user } = useAuth();
  const { openSosModal } = useEmergency();
  const [prescriptions, setPrescriptions] = useState(MOCK_PRESCRIPTIONS);
  const [selectedRx, setSelectedRx] = useState(MOCK_PRESCRIPTIONS[0]);
  const [showQrModal, setShowQrModal] = useState(false);
  const [isSyncingWatch, setIsSyncingWatch] = useState(false);

  const handleSyncWatch = () => {
    setIsSyncingWatch(true);
    setTimeout(() => {
      setIsSyncingWatch(false);
    }, 1000);
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <Sidebar />

      <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 overflow-y-auto max-w-7xl mx-auto">
        {/* Patient Welcome Banner */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-sky-600 via-indigo-600 to-sky-700 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider">
                Patient Bio-Twin Active
              </span>
              <span className="text-sky-200 text-xs font-mono">Blood: {user?.bloodGroup || 'O+'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Welcome back, {user?.name || 'Alex Mercer'}
            </h1>
            <p className="text-xs text-sky-100">
              Continuous neural telemetry synchronized with Apollo Apex Cardiothoracic Institute.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSyncWatch}
              className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold transition flex items-center gap-2 backdrop-blur-md"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncingWatch ? 'animate-spin' : ''}`} />
              <span>{isSyncingWatch ? 'Syncing IoT...' : 'Sync Apple Watch'}</span>
            </button>

            <button
              onClick={openSosModal}
              className="px-4 py-2.5 rounded-2xl bg-red-600 hover:bg-red-500 text-white text-xs font-extrabold shadow-lg shadow-red-600/40 transition flex items-center gap-2 animate-pulse"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>SOS Alert</span>
            </button>
          </div>
        </div>

        {/* Life Threat Risk & Realtime Vitals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: AI Life Threat Score */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <span className="p-2 rounded-xl bg-emerald-500/15 text-emerald-500">
                <Heart className="w-5 h-5" />
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">
                LOW RISK (3.8%)
              </span>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">AI 24h Life-Threat Risk Score</p>
              <h3 className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-0.5">OPTIMAL</h3>
              <p className="text-xs text-slate-500 mt-1 leading-tight">
                No ischemic patterns or arrhythmia markers detected in past 72 hours.
              </p>
            </div>
          </div>

          {/* Card 2: Blood Pressure & SpO2 */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <span className="p-2 rounded-xl bg-sky-500/15 text-sky-500">
                <Activity className="w-5 h-5" />
              </span>
              <span className="text-[10px] font-mono text-slate-400">Active Sensor</span>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Vascular & Oxygenation</p>
              <div className="flex items-baseline gap-3 mt-0.5">
                <span className="text-2xl font-black font-mono text-slate-900 dark:text-white">120/78</span>
                <span className="text-sm font-extrabold text-sky-500 font-mono">98% SpO2</span>
              </div>
              <p className="text-xs text-slate-500 mt-1 leading-tight">
                Resting systolic within target range for Stage-1 maintenance.
              </p>
            </div>
          </div>

          {/* Card 3: Next Doctor Teleconsultation */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <span className="p-2 rounded-xl bg-purple-500/15 text-purple-500">
                <Video className="w-5 h-5" />
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/15 text-purple-400 border border-purple-500/30">
                CONFIRMED
              </span>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Next Telemedicine Check-in</p>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mt-0.5">Dr. Sarah Jenkins, MD</h3>
              <p className="text-xs text-slate-500 mt-1">Oct 28, 2026 • 02:30 PM (Apollo Apex)</p>
            </div>
          </div>
        </div>

        {/* Live Continuous ECG Oscilloscope */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-sky-400" />
              Live Wearable Lead-II ECG Waveform
            </h3>
            <span className="text-xs text-slate-500 font-mono">Connected: Apple Watch Ultra 2</span>
          </div>
          <LiveECGMonitor vitals={MOCK_INITIAL_VITALS} height={160} />
        </div>

        {/* Digital Twin Organ Section */}
        <div id="digital-twin" className="space-y-3">
          <DigitalTwinVisualizer />
        </div>

        {/* Active Prescriptions & Blockchain Proof Section */}
        <div id="prescriptions" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-sky-400" />
                Active Blockchain Prescriptions
              </h3>
              <p className="text-xs text-slate-500">Cryptographically verifiable and drug-interaction certified</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {prescriptions.map((rx) => (
              <div
                key={rx.id}
                className="p-5 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800/80">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-sky-500">{rx.id}</span>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">{rx.diagnosis}</h4>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${rx.status === 'ISSUED' ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30' : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'}`}>
                      {rx.status}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500">
                    Prescribed by: <strong className="text-slate-800 dark:text-slate-200">{rx.doctorName}</strong> ({rx.hospitalName})
                  </p>

                  {/* Medicines List */}
                  <div className="space-y-2">
                    {rx.items.map((item) => (
                      <div key={item.id} className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs flex items-center justify-between">
                        <div>
                          <p className="font-bold text-slate-800 dark:text-slate-200">{item.medicineName}</p>
                          <p className="text-[10px] text-slate-400">{item.dosage} • {item.frequency}</p>
                        </div>
                        <span className="text-[10px] font-mono font-semibold text-slate-500 bg-slate-200 dark:bg-slate-800 px-2 py-1 rounded-lg">
                          {item.duration}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* AI Safety Check */}
                  {rx.aiDrugInteractionWarnings.length > 0 && (
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 flex-shrink-0" />
                      <span className="text-[11px] font-medium">{rx.aiDrugInteractionWarnings[0]}</span>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400 truncate max-w-[180px]">
                    Hash: {rx.blockchainHash.slice(0, 16)}...
                  </span>

                  <button
                    onClick={() => {
                      setSelectedRx(rx);
                      setShowQrModal(true);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>Show QR Dispense Code</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* QR Dispensation Modal */}
        {showQrModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
            <div className="w-full max-w-sm rounded-3xl bg-slate-950 border border-slate-800 p-6 text-center space-y-4 shadow-2xl">
              <div className="space-y-1">
                <h4 className="text-base font-black text-white">Blockchain Prescription QR</h4>
                <p className="text-xs text-slate-400">Present this QR to any certified pharmacy or drone courier</p>
              </div>

              {/* Simulated High-Tech QR Canvas */}
              <div className="p-4 bg-white rounded-2xl inline-block shadow-xl">
                <div className="w-44 h-44 border-4 border-slate-900 flex flex-col items-center justify-center p-2 relative bg-slate-50">
                  <QrCode className="w-36 h-36 text-slate-950" />
                  <span className="text-[9px] font-mono font-black text-slate-950 uppercase tracking-tighter">PULSE-VERIFIED</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900 text-left text-[11px] font-mono text-slate-300 space-y-1">
                <p className="text-slate-400 text-[10px]">VERIFIED HASH:</p>
                <p className="break-all text-[10px] text-sky-400">{selectedRx.blockchainHash}</p>
              </div>

              <button
                onClick={() => setShowQrModal(false)}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold"
              >
                Close QR Code
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
