'use client';

import React, { useState } from 'react';
import { 
  Clock, 
  Pill, 
  Search, 
  Lock, 
  Truck, 
  CheckCircle2, 
  ShieldCheck, 
  QrCode,
  Star
} from 'lucide-react';
import Sidebar from '@/components/common/Sidebar';
import { MOCK_PHARMACY_HISTORY } from '@/lib/mockData';
import { formatDate } from '@/lib/utils';

export default function PharmacyHistoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [records, setRecords] = useState(MOCK_PHARMACY_HISTORY);

  const filteredRecords = records.filter(r => 
    r.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.prescriptionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.blockchainTxHash.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <Sidebar />

      <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto max-w-7xl mx-auto">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold mb-2">
            <Clock className="w-3.5 h-3.5" /> Dispensation Ledger
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Pharmacy Dispensation History & Ledger Proofs
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Immutable blockchain transactions, drone delivery verifications, and controlled substance audit trails.
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by patient, Rx ID, or transaction hash..."
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* Records */}
        <div className="space-y-4">
          {filteredRecords.map((rec) => (
            <div
              key={rec.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
                    <Pill className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 font-bold">{rec.id} • {rec.prescriptionId}</span>
                    <h3 className="text-sm font-black text-slate-900 dark:text-white">Patient: {rec.patientName}</h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    rec.status === 'DELIVERED_BY_DRONE'
                      ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                      : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  }`}>
                    {rec.status.replace('_', ' ')}
                  </span>
                  <span className="text-xs font-mono text-slate-400">{formatDate(rec.date)}</span>
                </div>
              </div>

              {/* Medicines Dispensed */}
              <div className="space-y-2 text-xs">
                <p className="text-[10px] uppercase font-bold text-slate-400">Dispensed Pharmaceutical Items</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {rec.medicines.map((med, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-slate-800 dark:text-slate-200">{med.name}</p>
                        <p className="text-[10px] text-slate-400">{med.dosage}</p>
                      </div>
                      <span className="text-xs font-mono text-purple-400 font-bold">Qty: {med.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Blockchain Hash Proof */}
              <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 text-slate-400 font-mono text-[10px] truncate max-w-lg">
                  <Lock className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Ledger TX: <strong>{rec.blockchainTxHash}</strong></span>
                </div>
                <div className="flex items-center gap-1 text-amber-400 text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span className="font-bold text-slate-700 dark:text-slate-200">Patient Rating: {rec.patientFeedbackScore}/5</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
