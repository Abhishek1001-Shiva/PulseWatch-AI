'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Activity, 
  Heart, 
  FileText, 
  Clock, 
  MapPin, 
  Stethoscope, 
  Pill, 
  ShieldAlert, 
  Users, 
  Radio, 
  BarChart3, 
  Settings, 
  Sparkles,
  Bot,
  Truck,
  Scan
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  highlight?: boolean;
}

export default function Sidebar() {
  const pathname = usePathname();
  const { user, role } = useAuth();

  const patientNav: NavItem[] = [
    { name: 'Health Overview', href: '/dashboard/patient', icon: Activity },
    { name: 'Digital Twin Scan', href: '/dashboard/patient#digital-twin', icon: Heart },
    { name: 'Active Prescriptions', href: '/dashboard/patient#prescriptions', icon: FileText },
    { name: 'Find Hospitals', href: '/hospitals', icon: MapPin },
    { name: 'Emergency SOS Hub', href: '/emergency', icon: ShieldAlert, highlight: true },
  ];

  const doctorNav: NavItem[] = [
    { name: 'Clinical Queue', href: '/dashboard/doctor', icon: Users },
    { name: 'AI Smart Prescription', href: '/dashboard/doctor#prescribe', icon: Sparkles },
    { name: 'Medical Imaging AI', href: '/dashboard/doctor#imaging', icon: Scan },
    { name: 'Consultation History', href: '/history/doctor', icon: Clock },
    { name: 'Emergency Triage', href: '/emergency', icon: ShieldAlert },
  ];

  const pharmacyNav: NavItem[] = [
    { name: 'Dispensation Queue', href: '/dashboard/pharmacy', icon: Pill },
    { name: 'QR/Blockchain Verify', href: '/dashboard/pharmacy#verify', icon: Scan },
    { name: 'Drone Dispatch Tracker', href: '/dashboard/pharmacy#drone', icon: Truck },
    { name: 'Dispensation History', href: '/history/pharmacy', icon: Clock },
    { name: 'Controlled Substances', href: '/dashboard/pharmacy#controlled', icon: ShieldAlert },
  ];

  const adminNav: NavItem[] = [
    { name: 'Ecosystem Ops', href: '/dashboard/super-admin', icon: BarChart3 },
    { name: 'Live Emergency Fleet', href: '/emergency', icon: ShieldAlert, highlight: true },
    { name: 'Social Listening AI', href: '/dashboard/super-admin#social', icon: Radio },
    { name: 'Hospital Directory', href: '/hospitals', icon: MapPin },
    { name: 'Safety Signals & Audit', href: '/dashboard/super-admin#audit', icon: Sparkles },
  ];

  const navItems = role === 'patient' 
    ? patientNav 
    : role === 'doctor' 
    ? doctorNav 
    : role === 'pharmacy' 
    ? pharmacyNav 
    : adminNav;

  return (
    <aside className="w-64 flex-shrink-0 border-r border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-slate-950/50 backdrop-blur-md hidden md:flex flex-col justify-between p-4 min-h-[calc(100vh-4rem)]">
      <div className="space-y-6">
        {/* User Card */}
        {user && (
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-900/90 dark:to-slate-900/40 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-10 h-10 rounded-xl object-cover ring-2 ring-sky-500/30"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">{user.name}</p>
              <p className="text-[11px] text-sky-600 dark:text-sky-400 capitalize font-medium">{user.role.replace('-', ' ')}</p>
            </div>
          </div>
        )}

        {/* Navigation List */}
        <div className="space-y-1.5">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Navigation</p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                  item.highlight
                    ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20'
                    : isActive
                    ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${item.highlight ? 'text-red-500 animate-pulse' : ''}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer System Widget in Sidebar */}
      <div className="p-3 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-xs space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-sky-600 dark:text-sky-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>AI Neural Sync</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">v1.0.4</span>
        </div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
          Social listening & safety telemetry actively monitored in real time.
        </p>
      </div>
    </aside>
  );
}
