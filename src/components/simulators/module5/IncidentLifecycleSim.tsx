import React, { useState } from 'react';
import { Scenario } from '../../../types';
import { useTraining } from '../../../context/TrainingContext';
import { 
  ShieldCheck, 
  ShieldAlert, 
  AlertOctagon, 
  Unplug, 
  PhoneCall, 
  FileSearch, 
  RefreshCw,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';

export const IncidentLifecycleSim: React.FC<{ scenario: Scenario }> = ({ scenario }) => {
  const { makeDecision } = useTraining();

  const mock = scenario.situation.mockData || {};
  const steps = (mock.steps as Array<{ stepNum: number; name: string; action: string }>) || [];

  return (
    <div className="space-y-6">
      
      {/* Incident Response Protocol Sequencer Stage */}
      <div className="rounded-2xl bg-gov-dark border border-gov-border p-5 sm:p-6 shadow-2xl space-y-5">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gov-border">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-bold text-white font-mono">
              National Standard Cyber Incident Response Lifecycle
            </span>
          </div>
          <span className="text-xs font-mono text-cyan-300">
            Helpline: 1930 (National Cyber Crime Reporting)
          </span>
        </div>

        {/* 5-Step Visual Flowchart */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
          {steps.map((step) => (
            <motion.div
              key={step.stepNum}
              whileHover={{ y: -2 }}
              className="p-3.5 rounded-xl bg-gov-surface border border-gov-border flex flex-col justify-between space-y-2 text-center"
            >
              <div>
                <div className="w-8 h-8 rounded-full bg-brand-blue/30 border border-brand-cyan text-brand-cyan flex items-center justify-center font-mono font-bold text-xs mx-auto mb-2">
                  {step.stepNum}
                </div>
                <div className="text-xs font-black text-white font-mono uppercase tracking-wider">
                  {step.name}
                </div>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {step.action}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="p-3 rounded-xl bg-gov-card border border-brand-cyan/20 text-xs text-slate-300 flex items-center justify-between">
          <span className="font-mono text-cyan-300 font-bold">Standard 5-Step Rule:</span>
          <span className="text-white font-medium">Recognize → Stop/Isolate → Report → Preserve → Recover</span>
        </div>

      </div>

      {/* Decision Options Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-mono uppercase font-bold text-brand-cyan tracking-wider flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" />
            What is your decision?
          </h3>
          <span className="text-xs text-slate-400">How should the office respond to this malware infection?</span>
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
