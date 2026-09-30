'use client';

import React, { useState } from 'react';
import { 
  Stethoscope, 
  Users, 
  Sparkles, 
  Plus, 
  FileText, 
  Scan, 
  Mic, 
  MicOff, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Video, 
  Phone, 
  Heart, 
  Activity, 
  Calendar,
  Lock,
  ChevronRight,
  Eye
} from 'lucide-react';
import Sidebar from '@/components/common/Sidebar';
import { useAuth } from '@/context/AuthContext';
import { MOCK_IMAGE_SCANS } from '@/lib/mockData';
import { speakText, playAudioBeep } from '@/lib/utils';

export default function DoctorDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'queue' | 'prescribe' | 'imaging' | 'telemedicine'>('queue');
  
  // Smart Prescription Form State
  const [patientName, setPatientName] = useState('Alex Mercer (ID: pat-001)');
  const [diagnosis, setDiagnosis] = useState('Mild Stage-1 Hypertension with Exercise-Induced Arrhythmia');
  const [medicineInput, setMedicineInput] = useState('Telmisartan 40mg + Metoprolol 25mg ER');
  const [notes, setNotes] = useState('Patient to monitor resting BP once weekly. Low sodium diet advised.');
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [interactionWarning, setInteractionWarning] = useState<string | null>(null);
  const [isMinted, setIsMinted] = useState(false);

  // Imaging Scan state
  const [selectedScan, setSelectedScan] = useState(MOCK_IMAGE_SCANS[0]);

  const patientQueue = [
    { id: 'pat-001', name: 'Alex Mercer', age: 34, gender: 'Male', reason: 'Arrhythmia review & BP maintenance', triage: 'MODERATE', vitals: 'HR 74 | BP 120/78 | SpO2 98%', status: 'READY_FOR_CONSULT' },
    { id: 'pat-002', name: 'Sophia Chen', age: 58, gender: 'Female', reason: 'Post-CABG recovery & Holter review', triage: 'HIGH', vitals: 'HR 92 | BP 142/90 | SpO2 96%', status: 'TELEMED_WAITING' },
    { id: 'pat-003', name: 'Eleanor Vance', age: 67, gender: 'Female', reason: 'Brain MRI microvascular ischemic check', triage: 'LOW', vitals: 'HR 68 | BP 125/82 | SpO2 99%', status: 'IMAGING_READY' },
    { id: 'pat-004', name: 'David Miller', age: 45, gender: 'Male', reason: 'Severe nocturnal asthma & wheeze', triage: 'HIGH', vitals: 'HR 104 | BP 138/88 | SpO2 92%', status: 'EMERGENCY_TRIAGE' }
  ];

  const handleVoicePrescription = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech recognition not supported in this browser.');
      return;
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const rec = new SpeechRecognition();
      rec.lang = 'en-US';

      if (isRecordingVoice) {
        rec.stop();
        setIsRecordingVoice(false);
      } else {
        setIsRecordingVoice(true);
        rec.start();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rec.onresult = (e: any) => {
          const text = e.results[0][0].transcript;
          setNotes(prev => prev + ' ' + text);
          setIsRecordingVoice(false);
        };
        rec.onerror = () => setIsRecordingVoice(false);
        rec.onend = () => setIsRecordingVoice(false);
      }
    } catch {
      setIsRecordingVoice(false);
    }
  };

  const handleCheckInteractions = () => {
    playAudioBeep('success');
    setInteractionWarning('AI Safety Verification: Passed. Zero adverse drug-drug contraindications detected.');
  };

  const handleMintPrescription = (e: React.FormEvent) => {
    e.preventDefault();
    playAudioBeep('success');
    setIsMinted(true);
    speakText('Prescription verified and minted on medical blockchain ledger.');
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <Sidebar />

      <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 overflow-y-auto max-w-7xl mx-auto">
        {/* Doctor Header Banner */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-700 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider">
                Clinical Suite • {user?.specialty || 'Cardiologist'}
              </span>
              <span className="text-emerald-200 text-xs font-mono">{user?.licenseNumber || 'MD-NY-2021-8934'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              {user?.name || 'Dr. Sarah Jenkins, MD'}
            </h1>
            <p className="text-xs text-emerald-100">
              Apollo Apex Multispecialty & Trauma Center • Real-Time AI Prescription & Diagnostic Suite
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('prescribe')}
              className="px-4 py-2.5 rounded-2xl bg-white text-emerald-700 hover:bg-emerald-50 text-xs font-extrabold shadow-md transition flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>AI Smart Prescribe</span>
            </button>
          </div>
        </div>

        {/* Dashboard Tabs Bar */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs w-fit">
          <button
            onClick={() => setActiveTab('queue')}
            className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 ${
              activeTab === 'queue' ? 'bg-emerald-500 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Triage Patient Queue (4)</span>
          </button>
          <button
            onClick={() => setActiveTab('prescribe')}
            className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 ${
              activeTab === 'prescribe' ? 'bg-emerald-500 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Prescription Generator</span>
          </button>
          <button
            onClick={() => setActiveTab('imaging')}
            className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 ${
              activeTab === 'imaging' ? 'bg-emerald-500 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-white'
            }`}
          >
            <Scan className="w-4 h-4" />
            <span>AI Medical Imaging</span>
          </button>
          <button
            onClick={() => setActiveTab('telemedicine')}
            className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 ${
              activeTab === 'telemedicine' ? 'bg-emerald-500 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-white'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>Telemedicine Room</span>
          </button>
        </div>

        {/* Tab 1: Patient Queue */}
        {activeTab === 'queue' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Active Patient Clinical Queue</h3>
                <p className="text-xs text-slate-500">Ranked by AI Severity & Real-Time Wearable Biomarkers</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {patientQueue.map((patient) => (
                <div
                  key={patient.id}
                  className="p-5 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-lg hover:border-emerald-500/50 transition flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-slate-400">{patient.id}</span>
                      <h4 className="text-sm font-black text-slate-900 dark:text-white">{patient.name}</h4>
                      <span className="text-xs text-slate-500">({patient.age}y / {patient.gender})</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold border ${
                        patient.triage === 'HIGH' ? 'bg-red-500/15 text-red-500 border-red-500/30 animate-pulse' : 'bg-amber-500/15 text-amber-500 border-amber-500/30'
                      }`}>
                        {patient.triage} TRIAGE
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      Chief Complaint: <strong>{patient.reason}</strong>
                    </p>
                    <p className="text-[11px] font-mono text-sky-500">
                      Real-Time Stream: {patient.vitals}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setPatientName(`${patient.name} (ID: ${patient.id})`);
                        setActiveTab('prescribe');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Prescribe</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('telemedicine')}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Start Call</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: AI Smart Prescription Generator */}
        {activeTab === 'prescribe' && (
          <div id="prescribe" className="p-6 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">AI-Assisted Smart Prescription Suite</h3>
                  <p className="text-xs text-slate-500">Integrated contraindication checker, voice dictation & blockchain minting</p>
                </div>
              </div>
              <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full font-bold border border-emerald-500/30">
                BLOCKCHAIN SEAL READY
              </span>
            </div>

            <form onSubmit={handleMintPrescription} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px]">
                    Patient Identity
                  </label>
                  <input
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white font-medium focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px]">
                    Clinical Diagnosis
                  </label>
                  <input
                    type="text"
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white font-medium focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px]">
                    Prescribed Medications & Dosages
                  </label>
                  <button
                    type="button"
                    onClick={handleCheckInteractions}
                    className="text-emerald-500 font-bold hover:underline flex items-center gap-1 text-[11px]"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" /> Run AI Drug-Drug Contraindication Check
                  </button>
                </div>
                <input
                  type="text"
                  value={medicineInput}
                  onChange={(e) => setMedicineInput(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white font-medium focus:outline-none focus:border-emerald-500"
                />
              </div>

              {interactionWarning && (
                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>{interactionWarning}</span>
                </div>
              )}

              {/* Voice-to-Text Clinical Notes */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px]">
                    Doctor Clinical Notes & Instructions
                  </label>
                  <button
                    type="button"
                    onClick={handleVoicePrescription}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${
                      isRecordingVoice 
                        ? 'bg-red-500 text-white animate-pulse' 
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {isRecordingVoice ? <Mic className="w-3 h-3" /> : <MicOff className="w-3 h-3" />}
                    <span>{isRecordingVoice ? 'Dictating Voice...' : 'Voice Dictate'}</span>
                  </button>
                </div>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-slate-900 dark:text-white font-medium focus:outline-none focus:border-emerald-500"
                />
              </div>

              {isMinted ? (
                <div className="p-4 rounded-2xl bg-emerald-950/70 border border-emerald-500/60 text-emerald-200 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-emerald-400">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Prescription Successfully Minted & Broadcast to Patient & Pharmacy</span>
                  </div>
                  <p className="font-mono text-[10px] break-all text-slate-300">
                    TX: 0x9f8b0124e5a90184bba01239c0994112e4f0918cae784112ba990141a
                  </p>
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 hover:from-emerald-500 hover:to-sky-500 text-white font-extrabold text-sm shadow-xl shadow-emerald-600/30 transition flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>Digitally Sign & Issue Blockchain Prescription</span>
                </button>
              )}
            </form>
          </div>
        )}

        {/* Tab 3: AI Medical Imaging */}
        {activeTab === 'imaging' && (
          <div id="imaging" className="space-y-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-sky-500/20 text-sky-400">
                    <Scan className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900 dark:text-white">AI Medical Imaging & Computer Vision</h3>
                    <p className="text-xs text-slate-500">Automated pathology segmentation for Chest X-Rays & Brain MRIs</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {MOCK_IMAGE_SCANS.map(scan => (
                    <button
                      key={scan.id}
                      onClick={() => setSelectedScan(scan)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                        selectedScan.id === scan.id ? 'bg-sky-500 text-white' : 'bg-slate-100 dark:bg-slate-900 text-slate-400'
                      }`}
                    >
                      {scan.scanType.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left: Scan Preview */}
                <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 aspect-video flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selectedScan.imageUrl}
                    alt={selectedScan.scanType}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-xl text-[10px] font-mono font-bold text-sky-400 border border-sky-500/30">
                    SCAN TYPE: {selectedScan.scanType}
                  </div>
                  {/* AI Heatmap Target Circle */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full border-2 border-dashed border-emerald-400 bg-emerald-500/15 animate-pulse flex items-center justify-center">
                    <span className="text-[9px] font-black text-emerald-300 font-mono">AI REGION OK</span>
                  </div>
                </div>

                {/* Right: AI Findings & Confidence */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-extrabold text-slate-900 dark:text-white">AI Diagnostic Assessment</p>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold">Confidence: 98%</span>
                    </div>

                    <div className="space-y-2">
                      {selectedScan.aiFindings.map((finding, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1 text-xs">
                          <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
                            <span>{finding.condition}</span>
                            <span className="text-emerald-400 font-mono">{(finding.confidence * 100).toFixed(0)}%</span>
                          </div>
                          <p className="text-[11px] text-slate-500 leading-relaxed">{finding.description}</p>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => {
                        playAudioBeep('success');
                        alert('Diagnostic verified and saved to patient electronic medical record.');
                      }}
                      className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition"
                    >
                      Verify & Add to Patient EMR
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Telemedicine Room */}
        {activeTab === 'telemedicine' && (
          <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl text-white space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white">Live Telemedicine Room</h3>
                  <p className="text-xs text-slate-400">Consulting with Alex Mercer (Room #APEX-TELE-981)</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs border border-emerald-500/30">
                CONNECTED • HD ENCRYPTED
              </span>
            </div>

            <div className="aspect-video w-full rounded-2xl bg-slate-900 border border-slate-800 relative flex items-center justify-center overflow-hidden">
              {/* Simulated Patient Video Stream */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80"
                alt="Patient Stream"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-slate-950/80 px-3 py-1 rounded-xl text-xs font-mono font-bold text-white border border-slate-800">
                Patient: Alex Mercer (34y) • HR: 74 bpm
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-slate-950/90 backdrop-blur-md px-6 py-2.5 rounded-full border border-slate-800">
                <button className="p-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white">
                  <Mic className="w-4 h-4" />
                </button>
                <button className="p-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white">
                  <Video className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setActiveTab('queue')}
                  className="px-4 py-2 rounded-full bg-red-600 hover:bg-red-500 text-white text-xs font-bold"
                >
                  End Call
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
