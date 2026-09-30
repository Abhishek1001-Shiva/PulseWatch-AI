'use client';

import React, { useState } from 'react';
import { 
  Clock, 
  Stethoscope, 
  Calendar, 
  Search, 
  User as UserIcon, 
  FileText, 
  CheckCircle2, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import Sidebar from '@/components/common/Sidebar';
import { MOCK_CONSULTATION_HISTORY } from '@/lib/mockData';
import { formatDate } from '@/lib/utils';

export default function DoctorHistoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [records, setRecords] = useState(MOCK_CONSULTATION_HISTORY);

  const filteredRecords = records.filter(r => 
    r.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.chiefComplaint.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <Sidebar />

      <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto max-w-7xl mx-auto">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold mb-2">
            <Clock className="w-3.5 h-3.5" /> Clinical Records
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Doctor Consultation & Triage History
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Comprehensive archive of historical diagnostic logs, symptom profiles, and AI-suggested interventions.
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search consultation records by patient or diagnosis..."
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Records List */}
        <div className="space-y-4">
          {filteredRecords.map((rec) => (
            <div
              key={rec.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                    <UserIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 font-bold">{rec.id}</span>
                    <h3 className="text-sm font-black text-slate-900 dark:text-white">{rec.patientName} ({rec.patientAge}y)</h3>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono text-slate-400">{formatDate(rec.date)}</span>
                  <p className="text-[11px] text-emerald-500 font-bold">{rec.doctorName}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Chief Complaint & Symptoms</p>
                  <p className="text-slate-800 dark:text-slate-200 font-medium">{rec.chiefComplaint}</p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {rec.symptoms.map(s => (
                      <span key={s} className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-900 text-[10px] font-semibold text-slate-600 dark:text-slate-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Diagnosis & Treatment Plan</p>
                  <p className="text-slate-800 dark:text-slate-200 font-semibold">{rec.diagnosis}</p>
                  <p className="text-[11px] text-slate-500">{rec.treatmentPlan}</p>
                </div>
              </div>

              {/* AI Suggested Diagnosis */}
              <div className="p-3 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400">
                  <Sparkles className="w-4 h-4 flex-shrink-0" />
                  <span><strong>AI Neural Diagnostic Match:</strong> {rec.aiSuggestedDiagnosis}</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">Ref Rx: {rec.prescriptionId}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
