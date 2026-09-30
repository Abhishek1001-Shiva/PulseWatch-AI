'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Activity, 
  Lock, 
  Mail, 
  ShieldCheck, 
  User as UserIcon, 
  Stethoscope, 
  Pill, 
  Shield, 
  ArrowRight, 
  Sparkles,
  Fingerprint
} from 'lucide-react';
import { useAuth, DEMO_USERS } from '@/context/AuthContext';
import { UserRole } from '@/types';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleParam = searchParams.get('role') as UserRole | null;
  const { login, role, switchRole } = useAuth();

  const [selectedRole, setSelectedRole] = useState<UserRole>(roleParam || 'patient');
  const [email, setEmail] = useState(DEMO_USERS[roleParam || 'patient'].email);
  const [password, setPassword] = useState('demo12345');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    if (roleParam && DEMO_USERS[roleParam]) {
      setSelectedRole(roleParam);
      setEmail(DEMO_USERS[roleParam].email);
    }
  }, [roleParam]);

  const handleRoleTab = (r: UserRole) => {
    setSelectedRole(r);
    setEmail(DEMO_USERS[r].email);
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);

    setTimeout(() => {
      login(email, selectedRole);
      setIsAuthenticating(false);
      
      const destination = selectedRole === 'patient' 
        ? '/dashboard/patient' 
        : selectedRole === 'doctor' 
        ? '/dashboard/doctor' 
        : selectedRole === 'pharmacy' 
        ? '/dashboard/pharmacy' 
        : '/dashboard/super-admin';
      
      router.push(destination);
    }, 600);
  };

  const roleMeta: Record<UserRole, { title: string; desc: string; icon: React.ReactNode; color: string }> = {
    'patient': { title: 'Patient Portal', desc: 'Personal health records, continuous vitals & emergency SOS', icon: <UserIcon className="w-5 h-5" />, color: 'text-sky-400 bg-sky-500/20 border-sky-500/30' },
    'doctor': { title: 'Doctor Clinical Suite', desc: 'AI smart prescriptions, medical imaging & triage queues', icon: <Stethoscope className="w-5 h-5" />, color: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30' },
    'pharmacy': { title: 'Pharmacy Dispensation Desk', desc: 'Blockchain Rx validation, controlled substance & drone dispatch', icon: <Pill className="w-5 h-5" />, color: 'text-purple-400 bg-purple-500/20 border-purple-500/30' },
    'super-admin': { title: 'Super Admin Command HQ', desc: 'City-wide ecosystem health, ICU beds & social listening intelligence', icon: <Shield className="w-5 h-5" />, color: 'text-rose-400 bg-rose-500/20 border-rose-500/30' },
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 py-12 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-xl rounded-3xl bg-white/80 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 backdrop-blur-2xl relative z-10 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-600 via-sky-500 to-indigo-600 flex items-center justify-center text-white mx-auto shadow-lg shadow-sky-500/30">
            <Activity className="w-6 h-6 animate-pulse" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Sign In to PulseWatch AI
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Select your healthcare role below for instant authenticated access
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {(['patient', 'doctor', 'pharmacy', 'super-admin'] as UserRole[]).map((r) => {
            const isSelected = selectedRole === r;
            return (
              <button
                key={r}
                type="button"
                onClick={() => handleRoleTab(r)}
                className={`p-3 rounded-2xl border text-center transition flex flex-col items-center gap-1.5 ${
                  isSelected
                    ? 'bg-sky-500/15 border-sky-500 text-sky-600 dark:text-sky-300 font-bold shadow-md shadow-sky-500/10'
                    : 'bg-slate-100 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                <div className={`p-1.5 rounded-xl ${isSelected ? 'bg-sky-500 text-white' : 'bg-slate-200 dark:bg-slate-800'}`}>
                  {roleMeta[r].icon}
                </div>
                <span className="text-[11px] capitalize">{r.replace('-', ' ')}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Role Meta Banner */}
        <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
          <div className={`p-2 rounded-xl border ${roleMeta[selectedRole].color}`}>
            {roleMeta[selectedRole].icon}
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200">{roleMeta[selectedRole].title}</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{roleMeta[selectedRole].desc}</p>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSignIn} className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px]">
              Work / Health ID Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-slate-900 dark:text-white font-medium focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px]">
                Password (Demo Enabled)
              </label>
              <span className="text-[10px] text-slate-400">Any password accepted</span>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-slate-900 dark:text-white font-medium focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isAuthenticating}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-sky-600 via-sky-500 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-extrabold text-sm shadow-lg shadow-sky-500/25 active:scale-98 transition flex items-center justify-center gap-2"
          >
            {isAuthenticating ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Authenticating Neural ID...</span>
              </span>
            ) : (
              <>
                <Fingerprint className="w-5 h-5" />
                <span>Sign In as {selectedRole.toUpperCase().replace('-', ' ')}</span>
              </>
            )}
          </button>
        </form>

        {/* Demo Credentials Cheat Sheet */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 space-y-1">
          <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Instant Demo Accounts:</p>
          <div className="grid grid-cols-2 gap-1 text-[10px] font-mono">
            <span onClick={() => handleRoleTab('patient')} className="cursor-pointer hover:text-sky-400">👤 patient@pulsewatch.ai</span>
            <span onClick={() => handleRoleTab('doctor')} className="cursor-pointer hover:text-emerald-400">🩺 doctor@pulsewatch.ai</span>
            <span onClick={() => handleRoleTab('pharmacy')} className="cursor-pointer hover:text-purple-400">💊 pharmacy@pulsewatch.ai</span>
            <span onClick={() => handleRoleTab('super-admin')} className="cursor-pointer hover:text-rose-400">🛡️ admin@pulsewatch.ai</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading portal login...</div>}>
      <LoginContent />
    </Suspense>
  );
}
