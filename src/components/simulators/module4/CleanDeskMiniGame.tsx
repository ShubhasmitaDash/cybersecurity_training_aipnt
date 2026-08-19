import React, { useState } from 'react';
import { Scenario } from '../../../types';
import { useTraining } from '../../../context/TrainingContext';
import { 
  StickyNote, 
  Users, 
  FileText, 
  Monitor, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Lock, 
  Sparkles,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HazardItem {
  id: string;
  name: string;
  text: string;
  description: string;
  actionRequired: string;
}

export const CleanDeskMiniGame: React.FC<{ scenario: Scenario }> = ({ scenario }) => {
  const { makeDecision } = useTraining();
  
  const mock = scenario.situation.mockData || {};
  const hazards = (mock.hazards as HazardItem[]) || [];

  const [neutralizedHazards, setNeutralizedHazards] = useState<string[]>([]);
  const [activeHazardDetails, setActiveHazardDetails] = useState<HazardItem | null>(null);

  const toggleNeutralize = (hazard: HazardItem) => {
    setActiveHazardDetails(hazard);
    if (!neutralizedHazards.includes(hazard.id)) {
      setNeutralizedHazards(prev => [...prev, hazard.id]);
    }
  };

  const allNeutralized = hazards.length > 0 && neutralizedHazards.length === hazards.length;

  return (
    <div className="space-y-6">
      
      {/* Clean Desk Interactive Physical Sweep Stage */}
      <div className="rounded-2xl bg-gov-dark border border-gov-border p-5 sm:p-6 shadow-2xl space-y-5">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gov-border">
          <div>
            <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              Interactive "Secure the Desk" Physical Security Sweep
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Click each physical hazard at the intake counter to inspect and neutralize it.
            </p>
          </div>

          <div className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-gov-surface border border-gov-border text-brand-cyan">
            {neutralizedHazards.length} of {hazards.length} Hazards Neutralized
          </div>
        </div>

        {/* The Desk Objects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {hazards.map((h) => {
            const isDone = neutralizedHazards.includes(h.id);
            return (
              <motion.div
                key={h.id}
                whileHover={{ scale: 1.01 }}
                onClick={() => toggleNeutralize(h)}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between space-y-3 ${
                  isDone
                    ? 'bg-emerald-950/20 border-emerald-500/50 shadow-glow-green'
                    : 'bg-gov-surface hover:bg-gov-card border-gov-border hover:border-amber-500/50'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2 rounded-lg ${
                      isDone ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {h.id.includes('stickynote') ? <StickyNote className="w-5 h-5" /> :
                       h.id.includes('shared') ? <Users className="w-5 h-5" /> :
                       h.id.includes('citizen') ? <FileText className="w-5 h-5" /> :
                       <Monitor className="w-5 h-5" />}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">{h.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono italic">{h.text}</div>
                    </div>
                  </div>

                  {isDone ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  ) : (
                    <span className="text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30 flex-shrink-0">
                      CLICK TO SECURE
                    </span>
                  )}
                </div>

                <div className="text-xs text-slate-300 leading-relaxed pt-1 border-t border-gov-border/60">
                  {isDone ? (
                    <span className="text-emerald-300 font-semibold flex items-center gap-1.5">
                      ✓ Action Taken: {h.actionRequired}
                    </span>
                  ) : (
                    <span className="text-slate-400">Hazard: {h.description}</span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Completion Milestone Box */}
        {allNeutralized && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 rounded-xl bg-emerald-500/15 border-2 border-emerald-500 text-center space-y-2"
          >
            <div className="text-emerald-400 font-bold text-sm flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5" />
              DESK PHYSICAL SWEEP COMPLETE — ALL 4 HAZARDS NEUTRALIZED
            </div>
            <div className="text-xs text-slate-200">
              Clean desk standards maintained. Proceed to confirm your training decision.
            </div>
          </motion.div>
        )}

      </div>

      {/* Decision Options Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-mono uppercase font-bold text-brand-cyan tracking-wider flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" />
            What is your decision?
          </h3>
          <span className="text-xs text-slate-400">Lock in your clean desk decision</span>
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
