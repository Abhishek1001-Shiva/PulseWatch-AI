'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Activity, Heart, Zap, ShieldCheck } from 'lucide-react';
import { VitalSigns } from '@/types';

interface LiveECGMonitorProps {
  vitals?: VitalSigns;
  height?: number;
  interactive?: boolean;
}

export default function LiveECGMonitor({
  vitals = {
    heartRate: 74,
    spO2: 98,
    systolicBP: 120,
    diastolicBP: 78,
    respiratoryRate: 16,
    temperature: 98.6,
    stressLevel: 22,
    bloodGlucose: 95,
    ecgStatus: 'NORMAL',
    timestamp: new Date().toISOString()
  },
  height = 140,
  interactive = true
}: LiveECGMonitorProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [currentBpm, setCurrentBpm] = useState(vitals.heartRate);
  const [isAnomalous, setIsAnomalous] = useState(vitals.ecgStatus !== 'NORMAL');

  // Pulse animation simulation on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let step = 0;
    const points: number[] = new Array(300).fill(height / 2);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw subtle background grid
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
      ctx.lineWidth = 1;
      const gridSize = 20;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Generate ECG waveform pattern (P-Q-R-S-T wave)
      step = (step + 1) % 60;
      let newY = height / 2;

      if (step === 20) newY = height / 2 - 8; // P wave
      else if (step === 24) newY = height / 2;
      else if (step === 28) newY = height / 2 + 6; // Q wave
      else if (step === 30) newY = isAnomalous ? height / 2 - 55 : height / 2 - 45; // R peak
      else if (step === 32) newY = height / 2 + 18; // S drop
      else if (step === 34) newY = height / 2;
      else if (step === 42) newY = height / 2 - 14; // T wave
      else if (step === 48) newY = height / 2;
      else newY = height / 2 + (Math.random() * 2 - 1); // baseline micro-noise

      points.push(newY);
      if (points.length > canvas.width) {
        points.shift();
      }

      // Draw waveform
      ctx.beginPath();
      ctx.lineWidth = 2.2;
      ctx.strokeStyle = isAnomalous ? '#ef4444' : '#0ea5e9';
      ctx.shadowColor = isAnomalous ? 'rgba(239, 68, 68, 0.8)' : 'rgba(14, 165, 233, 0.8)';
      ctx.shadowBlur = 8;

      for (let i = 0; i < points.length; i++) {
        const x = i;
        const y = points[i];
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw active scanner lead dot
      const lastX = points.length - 1;
      const lastY = points[lastX];
      ctx.beginPath();
      ctx.arc(lastX, lastY, 4, 0, Math.PI * 2);
      ctx.fillStyle = isAnomalous ? '#f87171' : '#38bdf8';
      ctx.shadowColor = isAnomalous ? '#ef4444' : '#0ea5e9';
      ctx.shadowBlur = 12;
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [height, isAnomalous]);

  return (
    <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4 relative overflow-hidden shadow-xl">
      {/* Header Info */}
      <div className="flex items-center justify-between mb-3 z-10 relative">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg ${isAnomalous ? 'bg-red-500/20 text-red-400' : 'bg-sky-500/20 text-sky-400'}`}>
            <Activity className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              Continuous Lead-II ECG Telemetry
              {isAnomalous ? (
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-red-500/20 text-red-400 border border-red-500/40 font-bold animate-pulse">
                  ARRHYTHMIA DETECTED
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                  NORMAL SINUS
                </span>
              )}
            </h4>
          </div>
        </div>

        {/* BPM readout */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-right">
            <Heart className={`w-5 h-5 ${isAnomalous ? 'text-red-500' : 'text-rose-500'} animate-heart-pulse`} />
            <div>
              <span className="text-2xl font-black font-mono text-white tracking-tight">{currentBpm}</span>
              <span className="text-[10px] text-slate-400 font-semibold ml-1">BPM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Canvas Oscilloscope */}
      <div className="w-full relative rounded-xl overflow-hidden bg-slate-900/90 border border-slate-800/80">
        <canvas
          ref={canvasRef}
          width={600}
          height={height}
          className="w-full h-full block"
        />
        {/* Subtle scanline overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-sky-500/[0.02] to-transparent" />
      </div>

      {/* Quick Vitals Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 pt-3 border-t border-slate-850 text-xs">
        <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800/80">
          <p className="text-[10px] text-slate-400 uppercase font-bold">SpO2 Oxygen</p>
          <p className="text-sm font-extrabold font-mono text-emerald-400">{vitals.spO2}%</p>
        </div>
        <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800/80">
          <p className="text-[10px] text-slate-400 uppercase font-bold">Blood Pressure</p>
          <p className="text-sm font-extrabold font-mono text-sky-400">{vitals.systolicBP}/{vitals.diastolicBP} <span className="text-[10px] text-slate-500 font-normal">mmHg</span></p>
        </div>
        <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800/80">
          <p className="text-[10px] text-slate-400 uppercase font-bold">Respiration</p>
          <p className="text-sm font-extrabold font-mono text-indigo-400">{vitals.respiratoryRate} <span className="text-[10px] text-slate-500 font-normal">rpm</span></p>
        </div>
        <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800/80">
          <p className="text-[10px] text-slate-400 uppercase font-bold">Stress Index</p>
          <p className="text-sm font-extrabold font-mono text-amber-400">{vitals.stressLevel}/100</p>
        </div>
      </div>
    </div>
  );
}
