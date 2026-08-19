import React, { useState, useEffect } from 'react';
import { Scenario } from '../../../types';
import { useTraining } from '../../../context/TrainingContext';
import { 
  Radio, 
  ShieldAlert, 
  AlertOctagon, 
  Clock, 
  Tablet, 
  Lock, 
  PhoneCall, 
  RefreshCw,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';

export const LostDeviceCountdownSim: React.FC<{ scenario: Scenario }> = ({ scenario }) => {
  const { makeDecision } = useTraining();
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="space-y-6">
      
      {/* Emergency Incident Response Stage */}
      <div className="rounded-2xl bg-gov-dark border-2 border-red-500/50 p-6 shadow-glow-red space-y-5">
        
        {/* Emergency Alert Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-red-500/30">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse">
              <AlertOctagon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider">
                CRITICAL ASSET ALERT — HARDWARE LOSS
              </div>
              <div className="text-base font-black text-white">
                Government Field Tablet Missing from Field Bag
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-black/60 px-3 py-1.5 rounded-xl border border-red-500/40 font-mono text-red-400 text-sm font-bold">
            <Clock className="w-4 h-4 animate-spin" />
            <span>EXPOSURE TIME: {formatTimer(secondsElapsed)}</span>
          </div>
        </div>

        {/* 3-Step Emergency SOP Workflow Visual */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          
          <div className={`p-4 rounded-xl border transition-all ${
            activeStep === 1 
              ? 'bg-red-950/40 border-red-500 shadow-glow-red' 
              : 'bg-gov-surface border-gov-border'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-red-500/20 text-red-300">
                Step 1 (Immediate)
              </span>
              <PhoneCall className="w-4 h-4 text-red-400" />
            </div>
            <div className="text-sm font-bold text-white mb-1">Report Incident Instantly</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Notify District Informatics Officer (DIO) & Sub-Collector immediately. Every minute counts.
            </p>
          </div>

          <div className={`p-4 rounded-xl border transition-all ${
            activeStep === 2 
              ? 'bg-amber-950/40 border-amber-500 shadow-glow-gold' 
              : 'bg-gov-surface border-gov-border'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                Step 2 (Containment)
              </span>
              <Lock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-sm font-bold text-white mb-1">Revoke Sessions & MDM Lock</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              IT Admin revokes BhuNaksha portal access tokens and triggers remote hardware lock.
            </p>
          </div>

          <div className={`p-4 rounded-xl border transition-all ${
            activeStep === 3 
              ? 'bg-emerald-950/40 border-emerald-500 shadow-glow-green' 
              : 'bg-gov-surface border-gov-border'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                Step 3 (Recovery)
              </span>
              <RefreshCw className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-sm font-bold text-white mb-1">Re-provision & Resume Sync</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Secure replacement hardware is provisioned and offline survey database restored from verified cloud backup.
            </p>
          </div>

        </div>

      </div>

      {/* Decision Options Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-mono uppercase font-bold text-brand-cyan tracking-wider flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" />
            What should you do FIRST?
          </h3>
          <span className="text-xs text-slate-400">Select the primary defensive action</span>
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
