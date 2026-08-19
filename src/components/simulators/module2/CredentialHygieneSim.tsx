import React, { useState } from 'react';
import { Scenario } from '../../../types';
import { useTraining } from '../../../context/TrainingContext';
import { 
  Key, 
  ShieldAlert, 
  Users, 
  AlertTriangle, 
  XCircle, 
  CheckCircle2, 
  Lock, 
  Globe
} from 'lucide-react';
import { motion } from 'framer-motion';

export const CredentialHygieneSim: React.FC<{ scenario: Scenario }> = ({ scenario }) => {
  const { makeDecision } = useTraining();
  const [browserPromptAction, setBrowserPromptAction] = useState<'saved' | 'never' | null>(null);

  const mock = scenario.situation.mockData || {};

  const handlePromptClick = (action: 'saved' | 'never', optId: string) => {
    setBrowserPromptAction(action);
    setTimeout(() => {
      makeDecision(optId);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      
      {/* Browser Password Prompt Simulation Stage */}
      <div className="rounded-2xl bg-gov-dark border border-gov-border p-6 shadow-2xl space-y-6">
        
        {/* Browser Top Navigation Bar */}
        <div className="bg-gov-surface p-3 rounded-xl border border-gov-border flex items-center gap-3">
          <Globe className="w-4 h-4 text-brand-cyan" />
          <div className="flex-1 bg-gov-dark px-3 py-1.5 rounded-lg border border-gov-border text-xs font-mono text-slate-300 flex items-center justify-between">
            <span>https://erevenue.odisha.gov.in/sub-registrar/dashboard</span>
            <span className="text-emerald-400 font-bold">🔒 TLS 1.3 SECURE</span>
          </div>
        </div>

        {/* The Browser Auto-Save Password Popup Simulation */}
        <div className="max-w-md mx-auto rounded-2xl bg-gov-surface border-2 border-brand-cyan/40 shadow-glow-cyan p-5 space-y-4 font-sans">
          
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-brand-blue/30 border border-brand-cyan text-brand-cyan">
              <Key className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Save password in browser?</h4>
              <p className="text-xs text-slate-300 mt-0.5">
                Save password for user <span className="font-mono text-cyan-300 font-bold">sub_registrar_khordha</span> on this computer?
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
            <div className="font-bold flex items-center gap-1.5 mb-0.5">
              <AlertTriangle className="w-3.5 h-3.5" /> Notice: Shared Multi-Shift Workstation
            </div>
            <div>This computer is shared with 2 other staff members during afternoon and evening shifts.</div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              onClick={() => handlePromptClick('never', 'opt_2')}
              className="px-4 py-2 rounded-xl bg-gov-card hover:bg-slate-700 border border-gov-border text-slate-200 text-xs font-bold transition-all"
            >
              Never for this site
            </button>
            <button
              onClick={() => handlePromptClick('saved', 'opt_1')}
              className="px-4 py-2 rounded-xl bg-brand-blue hover:bg-brand-royal text-white text-xs font-bold transition-all"
            >
              Save Password
            </button>
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
          <span className="text-xs text-slate-400">Select the required credential hygiene action</span>
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
