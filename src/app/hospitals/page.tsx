'use client';

import React, { useState } from 'react';
import { 
  Hospital as HospitalIcon, 
  Search, 
  Filter, 
  MapPin, 
  BedDouble, 
  ShieldAlert, 
  Clock, 
  Star, 
  Phone, 
  Truck, 
  Navigation, 
  CheckCircle2, 
  Flame, 
  PawPrint, 
  Building2,
  Sparkles
} from 'lucide-react';
import { MOCK_HOSPITALS } from '@/lib/mockData';
import { Hospital } from '@/types';
import LiveMapSimulator from '@/components/common/LiveMapSimulator';
import { useEmergency } from '@/context/EmergencyContext';

export default function HospitalsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'ALL' | 'GOVERNMENT' | 'PRIVATE'>('ALL');
  const [emergencyOnly, setEmergencyOnly] = useState(false);
  const [petCareOnly, setPetCareOnly] = useState(false);
  const [droneOnly, setDroneOnly] = useState(false);
  const [selectedHospitalId, setSelectedHospitalId] = useState<string>(MOCK_HOSPITALS[0].id);
  const { triggerEmergency } = useEmergency();

  const filteredHospitals = MOCK_HOSPITALS.filter(h => {
    const matchesSearch = h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
      h.address.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = typeFilter === 'ALL' || h.type === typeFilter;
    const matchesEmergency = !emergencyOnly || h.emergency24x7;
    const matchesPetCare = !petCareOnly || h.petCare;
    const matchesDrone = !droneOnly || h.hasDroneDelivery;

    return matchesSearch && matchesType && matchesEmergency && matchesPetCare && matchesDrone;
  });

  const selectedHospital = MOCK_HOSPITALS.find(h => h.id === selectedHospitalId) || MOCK_HOSPITALS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 text-sky-500 text-xs font-bold mb-2">
            <HospitalIcon className="w-3.5 h-3.5" /> City Hospital Network
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Hospital Discovery & Real-Time ICU Index
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Live bed counters, emergency room wait times, drone logistics, and government/private classifications.
          </p>
        </div>

        {/* Global Summary Badge */}
        <div className="flex items-center gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 rounded-2xl shadow-sm text-xs">
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400">City ICU Beds Available</p>
            <p className="text-lg font-black text-emerald-500 font-mono">61 / 377</p>
          </div>
          <div className="h-8 w-px bg-slate-200 dark:bg-slate-800" />
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400">Avg ER Triage Time</p>
            <p className="text-lg font-black text-sky-400 font-mono">14 Mins</p>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-xl space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by hospital name, specialty (e.g. Cardiology, Trauma), or area..."
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Type Switcher (Gov / Private / All) */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
            {(['ALL', 'GOVERNMENT', 'PRIVATE'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-3 py-1.5 rounded-xl font-bold transition text-xs ${
                  typeFilter === t
                    ? 'bg-sky-500 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Checkbox Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <button
            onClick={() => setEmergencyOnly(!emergencyOnly)}
            className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition font-medium ${
              emergencyOnly
                ? 'bg-red-500/15 border-red-500/40 text-red-500 font-bold'
                : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-red-500" />
            <span>24/7 Emergency Trauma Unit</span>
          </button>

          <button
            onClick={() => setDroneOnly(!droneOnly)}
            className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition font-medium ${
              droneOnly
                ? 'bg-sky-500/15 border-sky-500/40 text-sky-400 font-bold'
                : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            <Navigation className="w-3.5 h-3.5 text-sky-400" />
            <span>Drone Delivery Equipped</span>
          </button>

          <button
            onClick={() => setPetCareOnly(!petCareOnly)}
            className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition font-medium ${
              petCareOnly
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400 font-bold'
                : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            <PawPrint className="w-3.5 h-3.5 text-emerald-400" />
            <span>Veterinary / Pet Emergency</span>
          </button>
        </div>
      </div>

      {/* Grid: Map + Hospital Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Hospital List */}
        <div className="lg:col-span-7 space-y-4">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Available Medical Centers ({filteredHospitals.length})
          </p>

          {filteredHospitals.map((hosp) => {
            const isSelected = selectedHospitalId === hosp.id;
            return (
              <div
                key={hosp.id}
                onClick={() => setSelectedHospitalId(hosp.id)}
                className={`p-5 rounded-3xl border transition cursor-pointer flex flex-col justify-between space-y-4 ${
                  isSelected
                    ? 'bg-white dark:bg-slate-900 border-sky-500 ring-2 ring-sky-500/30 shadow-2xl'
                    : 'bg-white/70 dark:bg-slate-950/70 border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold ${
                        hosp.type === 'GOVERNMENT'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                      }`}>
                        {hosp.type}
                      </span>
                      {hosp.petCare && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                          🐾 VET CARE
                        </span>
                      )}
                      <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{hosp.rating}</span>
                        <span className="text-slate-400 font-normal text-[10px]">({hosp.reviewCount})</span>
                      </div>
                    </div>
                    <h3 className="text-base font-black text-slate-900 dark:text-white">
                      {hosp.name}
                    </h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {hosp.address}, {hosp.city} • <strong className="text-sky-500">{hosp.distanceKm} km away</strong>
                    </p>
                  </div>

                  {/* Distance & Hotline */}
                  <div className="flex sm:flex-col items-center sm:items-end gap-2 text-right">
                    <a
                      href={`tel:${hosp.phone}`}
                      onClick={(e) => e.stopPropagation()}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-1 transition"
                    >
                      <Phone className="w-3 h-3 text-sky-400" />
                      <span>{hosp.phone}</span>
                    </a>
                  </div>
                </div>

                {/* Specialties Badges */}
                <div className="flex flex-wrap gap-1.5">
                  {hosp.specialties.map((spec) => (
                    <span key={spec} className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10px] font-semibold text-slate-600 dark:text-slate-300">
                      {spec}
                    </span>
                  ))}
                </div>

                {/* Live Capacity Indicators */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs">
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">ICU Beds</p>
                    <p className="text-xs font-mono font-bold text-emerald-500 mt-0.5">
                      {hosp.icuAvailable} / {hosp.icuTotal} <span className="text-[10px] text-slate-400">avail</span>
                    </p>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Ward Beds</p>
                    <p className="text-xs font-mono font-bold text-sky-400 mt-0.5">
                      {hosp.availableBeds} / {hosp.totalBeds}
                    </p>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">ER Wait Time</p>
                    <p className="text-xs font-mono font-bold text-amber-400 mt-0.5">
                      ~{hosp.avgWaitTimeMinutes} mins
                    </p>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">OPD Crowd</p>
                    <p className={`text-xs font-bold mt-0.5 ${hosp.crowdLevel === 'LOW' ? 'text-emerald-400' : hosp.crowdLevel === 'MODERATE' ? 'text-amber-400' : 'text-red-400'}`}>
                      {hosp.crowdLevel}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Side: Interactive City Radar Map & Fast Alert */}
        <div className="lg:col-span-5 space-y-4">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Real-Time Radar & Hospital Hubs
          </p>
          <LiveMapSimulator
            selectedHospitalId={selectedHospitalId}
            onSelectHospital={(id) => setSelectedHospitalId(id)}
          />

          {/* Quick Direct Route & SOS Trigger for Selected Hospital */}
          <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 space-y-3 text-xs shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h4 className="font-extrabold text-white text-xs uppercase tracking-wider">
                Targeted Emergency Route
              </h4>
              <span className="text-sky-400 font-mono font-bold">{selectedHospital.distanceKm} km</span>
            </div>

            <p className="text-slate-300 leading-relaxed">
              Selected: <strong className="text-white">{selectedHospital.name}</strong>. Traffic-clearing green wave active on Expressway corridor.
            </p>

            <button
              onClick={() => triggerEmergency('GENERAL_SOS', selectedHospital.address)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-xs shadow-lg shadow-red-600/30 transition flex items-center justify-center gap-2"
            >
              <ShieldAlert className="w-4 h-4 animate-pulse" />
              <span>DIRECT SOS TO {selectedHospital.name.split(' ')[0].toUpperCase()}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
