import React, { useState } from 'react';
import { Scenario } from '../../../types';
import { useTraining } from '../../../context/TrainingContext';
import { 
  Lock, 
  Unlock, 
  ShieldAlert, 
  Monitor, 
  Eye, 
  Users, 
  Coffee,
  CheckCircle2,
  XCircle,
  Command
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const SessionLockSim: React.FC<{ scenario: Scenario }> = ({ scenario }) => {
  const { makeDecision } = useTraining();
  const [activeScreenState, setActiveScreenState] = useState<'open_portal' | 'minimized' | 'locked'>('open_portal');
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);

  const handleSelect = (scenarioType: 'A' | 'B' | 'C', optId: string) => {
    setSelectedScenario(scenarioType);
    if (scenarioType === 'A') {
      setActiveScreenState('open_portal');
    } else if (scenarioType === 'B') {
      setActiveScreenState('minimized');
    } else {
      setActiveScreenState('locked');
    }

    setTimeout(() => {
      makeDecision(optId);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      
      {/* Interactive Office Workstation View */}
      <div className="rounded-2xl bg-gov-dark border border-gov-border p-6 shadow-2xl space-y-6">
        
        {/* Workstation Desk Context Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-gov-border text-xs">
          <div className="flex items-center gap-2">
            <Coffee className="w-4 h-4 text-amber-400" />
            <span className="font-bold text-white">Situation: You need to step away from your desk for a 3-minute discussion</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400 font-mono">
            <Users className="w-3.5 h-3.5 text-red-400" />
            <span>Public & visitors standing 4 feet away</span>
          </div>
        </div>

        {/* Workstation Virtual Monitor Screen */}
        <div className="max-w-xl mx-auto rounded-2xl bg-black border-4 border-slate-700 shadow-2xl p-4 aspect-video flex flex-col justify-between relative overflow-hidden">
          
          {activeScreenState === 'open_portal' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col justify-between">
              <div className="bg-emerald-950/80 p-2 rounded flex items-center justify-between text-[11px] font-mono text-emerald-300">
                <span>e-Revenue Sub-Registrar Portal [SESSION #88319]</span>
                <span className="bg-emerald-500/20 px-1.5 py-0.5 rounded text-emerald-400">AUTHENTICATED</span>
              </div>
              <div className="p-3 bg-slate-900/90 rounded border border-slate-800 text-xs text-slate-200 space-y-1">
                <div className="font-bold text-white">Deed Approval Rights Active</div>
                <div className="text-slate-400 text-[11px]">Clicking 'Approve' will legally register title changes.</div>
              </div>
              <div className="text-[10px] font-mono text-red-400 bg-red-950/80 p-1 rounded text-center animate-pulse">
                ⚠️ ACTIVE SESSION OPEN & EXPOSED TO UNATTENDED PASSERSBY
              </div>
            </motion.div>
          )}

          {activeScreenState === 'minimized' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col justify-between bg-slate-800 p-3 rounded">
              <div className="text-xs font-mono text-slate-400">Windows Desktop (Browser Minimized)</div>
              <div className="text-center text-xs text-amber-300 font-bold">
                Monitor is on, OS is UNLOCKED. Anyone can click the taskbar icon to restore the portal.
              </div>
              <div className="text-[10px] font-mono text-red-400 bg-red-950/80 p-1 rounded text-center">
                ❌ FALSE SENSE OF SECURITY — DESKTOP UNENCRYPTED
              </div>
            </motion.div>
          )}

          {activeScreenState === 'locked' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col items-center justify-center bg-gradient-to-tr from-slate-900 via-gov-navy to-slate-900 text-center space-y-2 p-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-glow-green">
                <Lock className="w-6 h-6" />
              </div>
              <div className="text-sm font-bold text-white">Windows Workstation Locked</div>
              <div className="text-[11px] font-mono text-emerald-300">
                Password & smartcard authentication required to unlock session.
              </div>
              <div className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                ✓ 100% PROTECTED FROM PHYSICAL TAMPERING
              </div>
            </motion.div>
          )}

          {/* Monitor Base Stand Graphic */}
          <div className="absolute bottom-1 right-2 text-[9px] font-mono text-slate-600">
            Govt Terminal Asset #KH-REV-PC-04
          </div>
        </div>

        {/* Keyboard Shortcut Callout */}
        <div className="flex items-center justify-center gap-3 p-3 rounded-xl bg-gov-surface border border-brand-cyan/30 text-xs text-slate-300 font-mono">
          <Command className="w-4 h-4 text-brand-cyan" />
          <span>Universal Government Standard Shortcut:</span>
          <span className="px-2 py-0.5 rounded bg-brand-blue font-bold text-white border border-brand-cyan">
            Win + L
          </span>
          <span className="text-slate-400">(Instant Screen Lock)</span>
        </div>

      </div>

      {/* 3 Interactive Scenario Action Choices */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-mono uppercase font-bold text-brand-cyan tracking-wider flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" />
            Which action will you take?
          </h3>
          <span className="text-xs text-slate-400">Click an action to execute and evaluate</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          
          <button
            onClick={() => handleSelect('A', 'opt_1')}
            className="p-4 rounded-xl bg-gov-surface hover:bg-gov-card border border-gov-border hover:border-red-500/60 text-left transition-all glass-card-hover group space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-red-400 uppercase">Scenario A</span>
              <XCircle className="w-4 h-4 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="text-sm font-bold text-white">Leave Portal Open</div>
            <div className="text-xs text-slate-400 leading-relaxed">
              Leave the browser active on screen since you will be back in 3 minutes.
            </div>
          </button>

          <button
            onClick={() => handleSelect('B', 'opt_2')}
            className="p-4 rounded-xl bg-gov-surface hover:bg-gov-card border border-gov-border hover:border-amber-500/60 text-left transition-all glass-card-hover group space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">Scenario B</span>
              <XCircle className="w-4 h-4 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="text-sm font-bold text-white">Minimize Window</div>
            <div className="text-xs text-slate-400 leading-relaxed">
              Minimize the browser or switch off the monitor without locking Windows.
            </div>
          </button>

          <button
            onClick={() => handleSelect('C', 'opt_3')}
            className="p-4 rounded-xl bg-gov-surface hover:bg-gov-card border border-gov-border hover:border-emerald-500 text-left transition-all glass-card-hover group space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Scenario C (Recommended)</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="text-sm font-bold text-white">Lock Workstation (Win + L)</div>
            <div className="text-xs text-slate-400 leading-relaxed">
              Press Win + L, verify lock screen is displayed, and safeguard your credentials.
            </div>
          </button>

        </div>
      </div>

    </div>
  );
};
