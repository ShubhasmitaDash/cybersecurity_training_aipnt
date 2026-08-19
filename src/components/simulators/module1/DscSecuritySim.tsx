import React, { useState } from 'react';
import { Scenario } from '../../../types';
import { useTraining } from '../../../context/TrainingContext';
import { 
  KeyRound, 
  Usb, 
  Lock, 
  Unlock, 
  ShieldAlert, 
  UserX, 
  FileCheck, 
  StickyNote,
  AlertOctagon,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const DscSecuritySim: React.FC<{ scenario: Scenario }> = ({ scenario }) => {
  const { makeDecision } = useTraining();
  const [tokenState, setTokenState] = useState<'inserted' | 'removed'>('inserted');
  const [simulatedConsequence, setSimulatedConsequence] = useState<'intruder_signing' | 'safe' | null>(null);

  const handleSimulateAction = (optId: string) => {
    if (optId === 'opt_1' || optId === 'opt_2') {
      setSimulatedConsequence('intruder_signing');
      setTimeout(() => {
        makeDecision(optId);
      }, 1800);
    } else {
      setTokenState('removed');
      setSimulatedConsequence('safe');
      setTimeout(() => {
        makeDecision(optId);
      }, 1000);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Virtual Desktop & Hardware Token Simulation Stage */}
      <div className="rounded-2xl bg-gov-dark border border-gov-border p-6 shadow-2xl relative overflow-hidden">
        
        {/* Top Status Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gov-border text-xs font-mono">
          <div className="flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-brand-goldLight" />
            <span className="text-white font-bold">Class-3 Digital Signature Certificate (DSC) Hardware Token</span>
          </div>
          <div className={`px-2.5 py-1 rounded-full font-bold flex items-center gap-1.5 ${
            tokenState === 'inserted' 
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse' 
              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
          }`}>
            <Usb className="w-3.5 h-3.5" />
            <span>{tokenState === 'inserted' ? 'TOKEN INSERTED & ACTIVE' : 'TOKEN SAFELY EJECTED'}</span>
          </div>
        </div>

        {/* Interactive Virtual Desk Layout */}
        <div className="py-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          
          {/* PC Monitor View */}
          <div className="md:col-span-2 rounded-xl bg-gov-surface border border-gov-border p-4 shadow-lg space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-gov-border">
              <div className="flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-white">e-Mutation Signer Window</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                15 Documents Signed
              </span>
            </div>

            <div className="p-3 rounded-lg bg-gov-card text-xs text-slate-300 space-y-1 font-mono">
              <div>Certificate Subject: SUB-COLLECTOR_KHORDHA_OFFICIAL</div>
              <div>Cryptographic Status: Active Session (PIN in memory)</div>
              <div>Legal Authority: IT Act 2000 Section 3A</div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-slate-400">Workstation Lock Status:</span>
              <span className="text-amber-400 font-bold flex items-center gap-1">
                <Unlock className="w-3.5 h-3.5" /> Unlocked (Officer stepping away)
              </span>
            </div>
          </div>

          {/* Cryptographic USB Hardware Token Visual */}
          <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-gov-card border border-brand-cyan/30 text-center space-y-2">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 transition-all ${
              tokenState === 'inserted' 
                ? 'bg-amber-500/20 border-amber-400 shadow-glow-gold' 
                : 'bg-slate-800 border-slate-700 opacity-40'
            }`}>
              <KeyRound className={`w-8 h-8 ${tokenState === 'inserted' ? 'text-amber-400' : 'text-slate-500'}`} />
            </div>
            
            <div className="text-xs font-bold text-white">e-Mudhra DSC Token</div>
            <div className="text-[11px] text-slate-400">Front USB Port 1</div>

            {tokenState === 'inserted' && (
              <div className="text-[10px] font-mono text-red-400 font-bold bg-red-500/10 px-2 py-0.5 rounded border border-red-500/30">
                VULNERABLE TO PHYSICAL MISUSE
              </div>
            )}
          </div>

        </div>

        {/* Animated Consequence Alert */}
        <AnimatePresence>
          {simulatedConsequence === 'intruder_signing' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 p-4 rounded-xl bg-red-500/20 border-2 border-red-500 text-red-200 flex items-center gap-3 shadow-glow-red"
            >
              <UserX className="w-8 h-8 text-red-400 flex-shrink-0 animate-bounce" />
              <div>
                <div className="font-bold text-sm text-red-300">UNAUTHORIZED PERSON DETECTED AT UNATTENDED WORKSTATION!</div>
                <div className="text-xs leading-relaxed">
                  An unauthorized individual approached the unattended workstation and attempted to sign an unverified land record using your active DSC session!
                </div>
              </div>
            </motion.div>
          )}

          {simulatedConsequence === 'safe' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 p-4 rounded-xl bg-emerald-500/20 border-2 border-emerald-500 text-emerald-200 flex items-center gap-3 shadow-glow-green"
            >
              <CheckCircle2 className="w-8 h-8 text-emerald-400 flex-shrink-0" />
              <div>
                <div className="font-bold text-sm text-emerald-300">TOKEN SECURED & WORKSTATION LOCKED!</div>
                <div className="text-xs leading-relaxed">
                  The cryptographic token was removed and placed in safe custody. No unauthorized document signing is possible.
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Decision Options Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-mono uppercase font-bold text-brand-cyan tracking-wider flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" />
            What should happen now?
          </h3>
          <span className="text-xs text-slate-400">Select the required action before leaving the chamber</span>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {scenario.options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => handleSimulateAction(opt.id)}
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
