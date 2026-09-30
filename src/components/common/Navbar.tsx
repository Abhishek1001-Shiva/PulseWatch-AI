'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Activity, 
  AlertTriangle, 
  ShieldAlert, 
  Sun, 
  Moon, 
  UserCheck, 
  Hospital as HospitalIcon, 
  PhoneCall, 
  LogOut, 
  Stethoscope, 
  Pill, 
  Shield, 
  User as UserIcon,
  ChevronDown,
  Bell,
  Menu,
  X
} from 'lucide-react';
import { useAuth, DEMO_USERS } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { useEmergency } from '@/context/EmergencyContext';
import { UserRole } from '@/types';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, role, switchRole, logout, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { activeEmergency, openSosModal } = useEmergency();
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const roleLabels: Record<UserRole, { label: string; icon: React.ReactNode; color: string; path: string }> = {
    'patient': { label: 'Patient Portal', icon: <UserIcon className="w-4 h-4" />, color: 'text-sky-400', path: '/dashboard/patient' },
    'doctor': { label: 'Doctor Hub', icon: <Stethoscope className="w-4 h-4" />, color: 'text-emerald-400', path: '/dashboard/doctor' },
    'pharmacy': { label: 'Pharmacy Desk', icon: <Pill className="w-4 h-4" />, color: 'text-purple-400', path: '/dashboard/pharmacy' },
    'super-admin': { label: 'Super Admin HQ', icon: <Shield className="w-4 h-4" />, color: 'text-rose-400', path: '/dashboard/super-admin' }
  };

  const handleRoleSelect = (targetRole: UserRole) => {
    switchRole(targetRole);
    setRoleDropdownOpen(false);
    router.push(roleLabels[targetRole].path);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/85 backdrop-blur-xl transition-colors">
      {/* Active Emergency Top Banner if active */}
      {activeEmergency && activeEmergency.status !== 'RESOLVED' && activeEmergency.status !== 'CANCELLED' && (
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white px-4 py-2 flex items-center justify-between text-xs sm:text-sm font-medium shadow-md">
          <div className="flex items-center gap-2 animate-pulse">
            <ShieldAlert className="w-4 h-4 text-amber-200" />
            <span>
              <strong>ACTIVE EMERGENCY SOS:</strong> {activeEmergency.category.replace('_', ' ')} • ETA: {activeEmergency.assignedHospital.etaMinutes} mins ({activeEmergency.assignedHospital.name})
            </span>
          </div>
          <Link 
            href="/emergency" 
            className="bg-white text-red-600 px-2.5 py-0.5 rounded-full font-bold hover:bg-red-50 text-xs transition"
          >
            Live Ops Map →
          </Link>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 via-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/25 group-hover:scale-105 transition">
              <Activity className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-sky-500 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
                  PulseWatch
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wider rounded bg-sky-500/10 text-sky-500 dark:bg-sky-500/20 dark:text-sky-300 border border-sky-500/20">
                  AI
                </span>
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium -mt-1 hidden sm:inline">
                Real-Time Health & Safety Ecosystem
              </span>
            </div>
          </Link>

          {/* Nav Links Desktop */}
          <nav className="hidden md:flex items-center gap-1">
            <Link 
              href="/" 
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                pathname === '/' 
                  ? 'text-sky-600 dark:text-sky-400 bg-sky-500/10' 
                  : 'text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-white'
              }`}
            >
              Overview
            </Link>
            <Link 
              href="/hospitals" 
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                pathname.startsWith('/hospitals') 
                  ? 'text-sky-600 dark:text-sky-400 bg-sky-500/10' 
                  : 'text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-white'
              }`}
            >
              Hospitals & ICU
            </Link>
            <Link 
              href={roleLabels[role]?.path || '/dashboard/patient'} 
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                pathname.startsWith('/dashboard') 
                  ? 'text-sky-600 dark:text-sky-400 bg-sky-500/10' 
                  : 'text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-white'
              }`}
            >
              Dashboard
            </Link>
          </nav>
        </div>

        {/* Right Action Icons & Role Switcher */}
        <div className="flex items-center gap-3">
          {/* Instant SOS Button */}
          <button
            onClick={openSosModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-red-600/30 active:scale-95 transition"
            title="Instant Emergency SOS"
          >
            <ShieldAlert className="w-4 h-4 animate-bounce" />
            <span>SOS 24/7</span>
          </button>

          {/* Role Switcher Pill */}
          <div className="relative hidden lg:block">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300/80 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-sky-500/50 transition shadow-sm"
            >
              <span className={`w-2 h-2 rounded-full ${role === 'patient' ? 'bg-sky-400' : role === 'doctor' ? 'bg-emerald-400' : role === 'pharmacy' ? 'bg-purple-400' : 'bg-rose-400'} animate-ping`} />
              <span>Role: <strong className="capitalize">{role.replace('-', ' ')}</strong></span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {roleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-2 py-1.5 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Switch Active Portal
                </div>
                {(['patient', 'doctor', 'pharmacy', 'super-admin'] as UserRole[]).map(r => (
                  <button
                    key={r}
                    onClick={() => handleRoleSelect(r)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition ${
                      role === r 
                        ? 'bg-sky-500/15 text-sky-600 dark:text-sky-400 font-bold' 
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {roleLabels[r].icon}
                      <span>{roleLabels[r].label}</span>
                    </div>
                    {role === r && <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>

          {/* User Profile Avatar / Login */}
          {isAuthenticated && user ? (
            <div className="flex items-center gap-2 pl-1">
              <Link href={roleLabels[role]?.path || '/dashboard/patient'}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-8 h-8 rounded-full ring-2 ring-sky-500/40 object-cover cursor-pointer hover:scale-105 transition"
                />
              </Link>
            </div>
          ) : (
            <Link
              href="/login"
              className="px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition shadow-sm"
            >
              Sign In
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl px-4 py-4 space-y-3">
          <div className="space-y-1">
            <Link 
              href="/" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Overview
            </Link>
            <Link 
              href="/emergency" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-bold text-red-600 dark:text-red-400 hover:bg-red-500/10"
            >
              SOS Emergency Ops
            </Link>
            <Link 
              href="/hospitals" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Hospital Discovery
            </Link>
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Switch Portal Role</p>
            <div className="grid grid-cols-2 gap-2">
              {(['patient', 'doctor', 'pharmacy', 'super-admin'] as UserRole[]).map(r => (
                <button
                  key={r}
                  onClick={() => {
                    handleRoleSelect(r);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 p-2 rounded-xl text-xs font-semibold capitalize ${
                    role === r 
                      ? 'bg-sky-500/20 text-sky-500 border border-sky-500/30' 
                      : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {roleLabels[r].icon}
                  <span>{r.replace('-', ' ')}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
