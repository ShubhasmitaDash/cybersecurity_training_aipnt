import React, { useState } from 'react';
import { Scenario } from '../../../types';
import { useTraining } from '../../../context/TrainingContext';
import { 
  MapPin, 
  Wifi, 
  WifiOff, 
  Battery, 
  Signal, 
  RefreshCw, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Lock, 
  Unlock,
  Radio
} from 'lucide-react';
import { motion } from 'framer-motion';

export const FieldMapSurveySim: React.FC<{ scenario: Scenario }> = ({ scenario }) => {
  const { makeDecision } = useTraining();
  const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null);

  const mock = scenario.situation.mockData || {};
  const networks = (mock.availableNetworks as Array<{ ssid: string; security: string; signal: string; isRogue: boolean; alert: string }>) || [];

  return (
    <div className="space-y-6">
      
      {/* Field Tablet Hardware Mockup Stage */}
      <div className="rounded-3xl bg-slate-900 border-4 border-slate-700 shadow-2xl p-4 sm:p-6 overflow-hidden max-w-4xl mx-auto font-sans">
        
        {/* Tablet Status Bar */}
        <div className="bg-slate-800/90 rounded-xl px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300 mb-4 border border-slate-700">
          <div className="flex items-center gap-3">
            <span className="font-bold text-cyan-400">BhuNaksha Field Survey Client v4.2</span>
            <span className="hidden sm:inline text-slate-400">• GPS Lock: ±1.8m (18 Satellites)</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-amber-300">
              <Signal className="w-3.5 h-3.5" /> 1 Bar (Cellular 4G)
            </span>
            <span className="flex items-center gap-1 text-slate-300">
              <Battery className="w-4 h-4 text-emerald-400" /> 78%
            </span>
          </div>
        </div>

        {/* Tablet Screen Content: Cadastral Map View */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          
          {/* Simulated Cadastral Vector Map */}
          <div className="lg:col-span-2 rounded-2xl bg-[#0d1b2a] border border-cyan-500/30 p-4 h-64 sm:h-72 relative flex flex-col justify-between overflow-hidden shadow-inner">
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between text-[11px] font-mono">
              <span className="bg-slate-900/90 px-2 py-1 rounded text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 animate-bounce" />
                Plot #102/B Demarcation Survey (Khordha Mouza)
              </span>
              <span className="bg-amber-500/20 text-amber-300 px-2 py-1 rounded border border-amber-500/40">
                18 Offline Boundary Pillars Queued
              </span>
            </div>

            {/* Fictional Survey Cadastral Polygons SVG */}
            <svg className="absolute inset-0 w-full h-full p-4 pointer-events-none" viewBox="0 0 300 200">
              <polygon points="40,50 140,30 220,90 180,170 60,150" fill="rgba(6, 182, 212, 0.15)" stroke="#06b6d4" strokeWidth="2" strokeDasharray="4 2" />
              <circle cx="40" cy="50" r="4" fill="#fbbf24" />
              <circle cx="140" cy="30" r="4" fill="#fbbf24" />
              <circle cx="220" cy="90" r="4" fill="#fbbf24" />
              <circle cx="180" cy="170" r="4" fill="#fbbf24" />
              <circle cx="60" cy="150" r="4" fill="#fbbf24" />
              <text x="100" y="110" fill="#ffffff" fontSize="10" fontFamily="monospace">Area: 0.450 Ac</text>
            </svg>

            <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-slate-400 bg-slate-900/80 p-2 rounded">
              <span>Local Encrypted Database: OK</span>
              <span>Sync Protocol: HTTPS / TLS 1.3</span>
            </div>
          </div>

          {/* Wi-Fi Networks Popup Selection */}
          <div className="p-4 rounded-2xl bg-gov-surface border border-gov-border flex flex-col justify-between space-y-3">
            <div className="space-y-1">
              <div className="text-xs font-bold text-white flex items-center gap-1.5 font-mono">
                <Wifi className="w-4 h-4 text-brand-cyan" />
                <span>Wi-Fi Network Manager</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Cellular data is weak. Available Wi-Fi access points detected nearby:
              </p>
            </div>

            <div className="space-y-2">
              {networks.map((net) => (
                <button
                  key={net.ssid}
                  onClick={() => setSelectedNetwork(net.ssid)}
                  className={`w-full text-left p-3 rounded-xl border transition-all text-xs ${
                    selectedNetwork === net.ssid
                      ? net.isRogue
                        ? 'bg-red-950/40 border-red-500 shadow-glow-red'
                        : 'bg-emerald-950/40 border-emerald-500 shadow-glow-green'
                      : 'bg-gov-card hover:bg-slate-700/50 border-gov-border'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono font-bold text-white mb-1">
                    <span className="truncate">{net.ssid}</span>
                    {net.isRogue ? (
                      <Unlock className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    Security: <span className={net.isRogue ? 'text-red-400 font-bold' : 'text-emerald-400'}>{net.security}</span>
                  </div>
                  <div className="text-[10px] text-slate-300 mt-1 leading-snug">
                    {net.alert}
                  </div>
                </button>
              ))}
            </div>

            <div className="text-[10px] font-mono text-slate-400 text-center">
              Field tablet is equipped with local SQLite encrypted storage.
            </div>
          </div>

        </div>

      </div>

      {/* Decision Options Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-mono uppercase font-bold text-brand-cyan tracking-wider flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" />
            What is your decision?
          </h3>
          <span className="text-xs text-slate-400">How should field survey sync be handled?</span>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {scenario.options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => makeDecision(opt.id)}
              className="text-left p-4 rounded-xl bg-gov-surface hover:bg-gov-card border border-gov-border hover:border-brand-cyan/70 text-slate-200 hover:text-white transition-all glass-card-hover group flex items-start gap-3.5"
            >
              <span className="w-7 h-7 rounded-lg bg-gov-card group-hover:bg-brand-blue border border-gov-border group-hover:border-brand-cyan flex items-center justify-center font-mono font-bold text-xs text-brand-cyan group-hover:text-white flex-shrink-0 transition-colors">
                {opt.label}
              </span>
              <div className="flex-1 text-xs sm:text-sm font-medium leading-relaxed">
                {opt.text}
              </div>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
