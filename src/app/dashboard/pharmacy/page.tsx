'use client';

import React, { useState } from 'react';
import { 
  Pill, 
  Scan, 
  Truck, 
  ShieldAlert, 
  QrCode, 
  CheckCircle2, 
  Sparkles, 
  AlertTriangle, 
  Lock, 
  Search, 
  RotateCcw,
  Navigation
} from 'lucide-react';
import Sidebar from '@/components/common/Sidebar';
import { useAuth } from '@/context/AuthContext';
import { MOCK_PRESCRIPTIONS } from '@/lib/mockData';
import { playAudioBeep, speakText } from '@/lib/utils';

export default function PharmacyDashboard() {
  const { user } = useAuth();
  const [prescriptions, setPrescriptions] = useState(MOCK_PRESCRIPTIONS);
  const [qrInput, setQrInput] = useState('');
  const [verifiedRx, setVerifiedRx] = useState<typeof MOCK_PRESCRIPTIONS[0] | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isDroneDispatched, setIsDroneDispatched] = useState(false);

  const inventoryStock = [
    { name: 'Telmisartan 40mg', stock: 450, unit: 'strips', demand: 'STABLE', status: 'IN_STOCK' },
    { name: 'Metoprolol Succinate 25mg', stock: 320, unit: 'strips', demand: 'HIGH', status: 'IN_STOCK' },
    { name: 'Morphine Sulfate 10mg', stock: 18, unit: 'vials', demand: 'RESTRICTED', status: 'CONTROLLED_LOCKED' },
    { name: 'Budesonide DPI Inhaler', stock: 85, unit: 'devices', demand: 'STABLE', status: 'IN_STOCK' },
    { name: 'Epinephrine Auto-Injector (EpiPen)', stock: 42, unit: 'pens', demand: 'EMERGENCY_RESERVE', status: 'IN_STOCK' }
  ];

  const handleVerifyQR = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setVerifiedRx(MOCK_PRESCRIPTIONS[0]);
      playAudioBeep('success');
      speakText('Blockchain signature authentic. Prescription verified for dispensation.');
    }, 700);
  };

  const handleDispense = () => {
    playAudioBeep('success');
    alert('Medicines marked as DISPENSED. Blockchain proof recorded.');
    setVerifiedRx(null);
  };

  const handleDispatchDrone = () => {
    setIsDroneDispatched(true);
    playAudioBeep('sos');
    speakText('Emergency medical drone payload dispatched to patient coordinates.');
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <Sidebar />

      <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 overflow-y-auto max-w-7xl mx-auto">
        {/* Pharmacy Banner */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-700 via-indigo-700 to-sky-800 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider">
                Certified Pharmacy Hub
              </span>
              <span className="text-purple-200 text-xs font-mono">{user?.licenseNumber || 'PHARM-LIC-88902'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              {user?.pharmacyName || 'MediLife Apex 24/7 Pharmacy Hub'}
            </h1>
            <p className="text-xs text-purple-100">
              Blockchain QR Verification, Narcotics Controlled Substance Gate, & Rapid Autonomous Drone Delivery.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleVerifyQR()}
              className="px-4 py-2.5 rounded-2xl bg-white text-purple-700 hover:bg-purple-50 text-xs font-extrabold shadow-md transition flex items-center gap-2"
            >
              <QrCode className="w-4 h-4 text-purple-600" />
              <span>Simulate QR Scan</span>
            </button>
          </div>
        </div>

        {/* Top Operational Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-lg space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase">
              <span>Pending Dispensations</span>
              <Pill className="w-4 h-4 text-purple-500" />
            </div>
            <p className="text-2xl font-black font-mono text-slate-900 dark:text-white">6 Prescriptions</p>
            <p className="text-[11px] text-slate-500">2 flagged for dosage audit</p>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-lg space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase">
              <span>Controlled Narcotics Gate</span>
              <ShieldAlert className="w-4 h-4 text-red-500" />
            </div>
            <p className="text-2xl font-black font-mono text-emerald-500">100% SECURE</p>
            <p className="text-[11px] text-slate-500">Dual-key oncologist signature required</p>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-lg space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase">
              <span>Autonomous Drone Couriers</span>
              <Navigation className="w-4 h-4 text-sky-400" />
            </div>
            <p className="text-2xl font-black font-mono text-sky-400">4 Standby</p>
            <p className="text-[11px] text-slate-500">Ready for instant airborne medicine drop</p>
          </div>
        </div>

        {/* QR Scanner & Blockchain Verification Box */}
        <div id="verify" className="p-6 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-purple-500/20 text-purple-400">
                <Scan className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white">QR Code & Blockchain Verification</h3>
                <p className="text-xs text-slate-500">Decrypt tamper-proof hashes issued by accredited hospitals</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <input
                type="text"
                value={qrInput}
                onChange={(e) => setQrInput(e.target.value)}
                placeholder="Scan QR barcode or paste cryptographic hash: 0x7f9a2b84..."
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            <button
              onClick={handleVerifyQR}
              disabled={isScanning}
              className="px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition flex items-center gap-2 whitespace-nowrap"
            >
              <QrCode className="w-4 h-4" />
              <span>{isScanning ? 'Decrypting...' : 'Verify Cryptographic Hash'}</span>
            </button>
          </div>

          {/* Verified Prescription Payload Display */}
          {verifiedRx && (
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border-2 border-emerald-500/60 shadow-xl space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <h4 className="text-sm font-black text-slate-900 dark:text-white">
                    VERIFIED PRESCRIPTION: {verifiedRx.id}
                  </h4>
                </div>
                <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 font-bold px-2.5 py-1 rounded-full border border-emerald-500/30">
                  DOCTOR SIGNATURE VALID
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="text-slate-400 text-[10px] uppercase font-bold">Patient Name</p>
                  <p className="font-bold text-slate-800 dark:text-slate-200">{verifiedRx.patientName}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-[10px] uppercase font-bold">Prescribing Physician</p>
                  <p className="font-bold text-slate-800 dark:text-slate-200">{verifiedRx.doctorName} ({verifiedRx.hospitalName})</p>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <p className="text-slate-400 text-[10px] uppercase font-bold">Medication Items to Dispense</p>
                {verifiedRx.items.map(item => (
                  <div key={item.id} className="p-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{item.medicineName}</p>
                      <p className="text-[10px] text-slate-400">{item.dosage} • {item.frequency}</p>
                    </div>
                    <span className="font-mono text-sky-400 text-[10px]">{item.duration}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  onClick={handleDispense}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition"
                >
                  Confirm Dispensation & Handover
                </button>

                <button
                  onClick={handleDispatchDrone}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-xs transition flex items-center gap-2"
                >
                  <Truck className="w-4 h-4" />
                  <span>Dispatch by Medical Drone</span>
                </button>
              </div>

              {isDroneDispatched && (
                <div className="p-3 rounded-xl bg-sky-950/80 border border-sky-500/50 text-sky-200 text-xs flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-sky-400 animate-spin-slow" />
                  <span>Medical Drone PULSE-AERO-08 airborne. Estimated delivery to Alex Mercer in 4 mins.</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Medicine Inventory & Controlled Substances Gate */}
        <div id="controlled" className="p-6 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Smart Inventory & Controlled Substance Register</h3>
              <p className="text-xs text-slate-500">AI reorder predictions and narcotics quota safety</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2.5 text-xs">
            {inventoryStock.map((item) => (
              <div
                key={item.name}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-extrabold text-slate-900 dark:text-white">{item.name}</p>
                    {item.status === 'CONTROLLED_LOCKED' && (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-red-500/20 text-red-400 border border-red-500/30">
                        NARCOTICS RESTRICTED
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500">Demand Level: {item.demand}</p>
                </div>

                <div className="text-right">
                  <p className="text-sm font-mono font-black text-slate-900 dark:text-white">{item.stock} <span className="text-[10px] text-slate-500 font-normal">{item.unit}</span></p>
                  <span className="text-[10px] text-emerald-500 font-bold">Optimal Stock</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
