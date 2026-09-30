'use client';

import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Truck, 
  Radio, 
  Hospital as HospitalIcon, 
  Phone, 
  Sparkles, 
  Crosshair, 
  Layers, 
  Compass 
} from 'lucide-react';
import { MOCK_HOSPITALS } from '@/lib/mockData';
import { EmergencyRequest } from '@/types';

interface LiveMapSimulatorProps {
  emergency?: EmergencyRequest | null;
  selectedHospitalId?: string;
  onSelectHospital?: (id: string) => void;
  showRadar?: boolean;
}

export default function LiveMapSimulator({
  emergency,
  selectedHospitalId,
  onSelectHospital,
  showRadar = true
}: LiveMapSimulatorProps) {
  const [activeLayer, setActiveLayer] = useState<'all' | 'ambulances' | 'drones' | 'hospitals'>('all');
  const [selectedEntity, setSelectedEntity] = useState<string | null>(null);

  return (
    <div className="relative w-full h-[460px] rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl flex flex-col">
      {/* Top Map HUD Controls */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-slate-700/80 text-xs shadow-lg">
          <div className="flex items-center gap-1.5 font-bold text-sky-400">
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>GPS RADAR: ACTIVE</span>
          </div>
          <span className="text-slate-500">|</span>
          <span className="text-slate-300 font-mono text-[11px]">28.6139° N, 77.2090° E</span>
        </div>

        <div className="flex items-center gap-1.5 pointer-events-auto bg-slate-900/90 backdrop-blur-md p-1 rounded-2xl border border-slate-700/80 text-xs shadow-lg">
          {(['all', 'ambulances', 'drones', 'hospitals'] as const).map((layer) => (
            <button
              key={layer}
              onClick={() => setActiveLayer(layer)}
              className={`px-2.5 py-1 rounded-xl capitalize font-medium transition text-[11px] ${
                activeLayer === layer 
                  ? 'bg-sky-500 text-white shadow-sm font-bold' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {layer}
            </button>
          ))}
        </div>
      </div>

      {/* Radar Map Canvas Representation */}
      <div className="relative flex-1 w-full h-full bg-[#070e17] overflow-hidden select-none">
        {/* Futuristic Map Grid */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, #0284c7 1px, transparent 1px),
              linear-gradient(to bottom, #0284c7 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Concentric Radar Rings */}
        {showRadar && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25">
            <div className="w-[180px] h-[180px] rounded-full border border-sky-500/40" />
            <div className="absolute w-[360px] h-[360px] rounded-full border border-sky-500/30" />
            <div className="absolute w-[560px] h-[560px] rounded-full border border-dashed border-sky-500/20" />
            {/* Rotating radar sweep */}
            <div className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-sky-500/10 via-transparent to-transparent animate-radar origin-center" />
          </div>
        )}

        {/* Simulated Road Lines / Corridors */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40 stroke-sky-500/30" strokeWidth="2" strokeDasharray="4 4">
          <line x1="10%" y1="20%" x2="50%" y2="50%" />
          <line x1="50%" y1="50%" x2="85%" y2="30%" />
          <line x1="50%" y1="50%" x2="40%" y2="85%" />
          <line x1="50%" y1="50%" x2="75%" y2="80%" />
          <line x1="20%" y1="75%" x2="50%" y2="50%" />
        </svg>

        {/* Patient / SOS Origin Node (Center) */}
        <div 
          onClick={() => setSelectedEntity('patient')}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
        >
          <div className="relative flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-red-500/20 animate-ping absolute" />
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-red-600 to-rose-500 border-2 border-white shadow-xl shadow-red-500/50 flex items-center justify-center text-white">
              <MapPin className="w-4 h-4 fill-white" />
            </div>
          </div>
          <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-slate-900/95 border border-red-500/40 px-2 py-1 rounded-md text-[10px] font-bold text-white whitespace-nowrap shadow-xl">
            You / SOS Origin
          </div>
        </div>

        {/* Hospital Nodes */}
        {(activeLayer === 'all' || activeLayer === 'hospitals') && MOCK_HOSPITALS.map((hosp, idx) => {
          // Predefined layout coordinates for the mock radar
          const positions = [
            { x: '25%', y: '25%' },
            { x: '78%', y: '32%' },
            { x: '72%', y: '78%' },
            { x: '28%', y: '72%' },
            { x: '82%', y: '60%' }
          ];
          const pos = positions[idx % positions.length];
          const isSelected = selectedHospitalId === hosp.id;

          return (
            <div
              key={hosp.id}
              onClick={() => {
                setSelectedEntity(hosp.id);
                if (onSelectHospital) onSelectHospital(hosp.id);
              }}
              style={{ left: pos.x, top: pos.y }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition transform hover:scale-110 z-10 ${
                isSelected ? 'scale-110' : ''
              }`}
            >
              <div className="relative flex flex-col items-center">
                <div className={`p-2 rounded-2xl border ${
                  isSelected 
                    ? 'bg-sky-500 text-white border-white shadow-lg shadow-sky-500/50' 
                    : hosp.type === 'GOVERNMENT'
                    ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500/50'
                    : 'bg-slate-900/90 text-sky-400 border-sky-500/30'
                }`}>
                  <HospitalIcon className="w-4 h-4" />
                </div>
                <div className="mt-1 px-2 py-0.5 rounded-lg bg-slate-900/90 border border-slate-800 text-[10px] font-semibold text-slate-200 whitespace-nowrap">
                  {hosp.name.split(' ')[0]} ({hosp.distanceKm}km)
                </div>
              </div>
            </div>
          );
        })}

        {/* Ambulance Vector (Moving toward center) */}
        {(activeLayer === 'all' || activeLayer === 'ambulances') && (
          <div 
            onClick={() => setSelectedEntity('ambulance')}
            className="absolute left-[38%] top-[38%] -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
          >
            <div className="relative flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 animate-ping absolute" />
              <div className="p-2 rounded-xl bg-amber-500 text-slate-950 font-bold border border-amber-300 shadow-lg shadow-amber-500/40">
                <Truck className="w-4 h-4" />
              </div>
              <div className="mt-1 px-2 py-0.5 rounded-lg bg-amber-950/90 border border-amber-500/40 text-[10px] font-bold text-amber-300 whitespace-nowrap flex items-center gap-1">
                <span>AMB-104</span>
                <span className="text-[9px] text-amber-200">• 64 km/h</span>
              </div>
            </div>
          </div>
        )}

        {/* Emergency Drone Vector */}
        {(activeLayer === 'all' || activeLayer === 'drones') && (
          <div 
            onClick={() => setSelectedEntity('drone')}
            className="absolute left-[62%] top-[42%] -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
          >
            <div className="relative flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-sky-500/30 animate-pulse absolute" />
              <div className="p-2 rounded-xl bg-sky-500 text-white font-bold border border-sky-300 shadow-lg shadow-sky-500/50">
                <Navigation className="w-4 h-4 -rotate-45" />
              </div>
              <div className="mt-1 px-2 py-0.5 rounded-lg bg-sky-950/90 border border-sky-500/40 text-[10px] font-bold text-sky-300 whitespace-nowrap">
                DRONE-AED (ETA 2m)
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Dispatch HUD Banner */}
      <div className="p-3 bg-slate-900/90 backdrop-blur-md border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs z-20">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-sky-500/15 text-sky-400 border border-sky-500/20 font-bold">
            <Truck className="w-4 h-4 inline mr-1" />
            <span>Active Unit: APEX-AMB-04</span>
          </div>
          <div className="text-slate-300">
            <span className="text-slate-400">Paramedic:</span> <strong>Elena Rostova</strong> • <span className="text-emerald-400 font-bold">ETA: 4 Mins</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="tel:+18005552739"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call Paramedic</span>
          </a>
        </div>
      </div>
    </div>
  );
}
