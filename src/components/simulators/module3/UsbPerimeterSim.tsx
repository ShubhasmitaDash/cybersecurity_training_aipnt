import React, { useState } from 'react';
import { Scenario } from '../../../types';
import { useTraining } from '../../../context/TrainingContext';
import { 
  Usb, 
  ShieldAlert, 
  User, 
  AlertTriangle, 
  FileCheck, 
  XCircle, 
  CheckCircle2, 
  HardDrive,
  ShieldCheck
} from 'lucide-react';
import { motion } from 'framer-motion';

export const UsbPerimeterSim: React.FC<{ scenario: Scenario }> = ({ scenario }) => {
  const { makeDecision } = useTraining();

  const mock = scenario.situation.mockData || {};

  return (
    <div className="space-y-6">
      
      {/* Office Desk & USB Dilemma Visual Stage */}
      <div className="rounded-2xl bg-gov-dark border border-gov-border p-6 shadow-2xl space-y-5">
        
        <div className="flex items-center justify-between pb-3 border-b border-gov-border">
          <div className="flex items-center gap-2">
            <Usb className="w-5 h-5 text-amber-400" />
            <span className="text-sm font-bold text-white font-mono">Removable Media Perimeter Defense</span>
          </div>
          <span className="text-xs font-mono text-slate-400">Section Officer / Head Clerk Desk</span>
        </div>

        {/* The Visitor & Pen Drive Scene */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          
          {/* Visitor Dialogue Box */}
          <div className="p-4 rounded-xl bg-gov-surface border border-gov-border space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-slate-200">
                <User className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Public Citizen / RTI Applicant</div>
                <div className="text-[11px] text-slate-400">Standing at Section Inward Counter</div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 italic leading-relaxed bg-gov-card p-3 rounded-lg border border-gov-border">
              "Sir/Madam, these 40 land demarcation maps were too large to attach in email. I have brought them on this pen drive. Please plug it into your computer and copy the files so my file can move forward."
            </p>
          </div>

          {/* Rogue USB Device Inspection Card */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/40 space-y-3 text-xs">
            <div className="flex items-center justify-between text-amber-400 font-bold font-mono">
              <span className="flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" /> UNAPPROVED GUEST USB DRIVE
              </span>
              <span className="bg-red-500/20 text-red-300 px-2 py-0.5 rounded text-[10px]">
                HIGH RISK MEDIA
              </span>
            </div>

            <div className="space-y-1.5 text-slate-300 font-mono text-[11px]">
              <div>• Device Type: Unknown Vendor USB Flash Drive</div>
              <div>• Origin: Unverified Public Environment</div>
              <div>• Vector Risk: BadUSB Keystroke Injection &amp; AutoRun Malware</div>
            </div>

            <div className="p-2.5 rounded bg-gov-card border border-brand-cyan/20 text-slate-300 text-[11px] leading-relaxed">
              <span className="text-brand-cyan font-bold">Standard Government Policy: </span>
              External unapproved USB drives must NEVER touch network-connected official desktops.
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
          <span className="text-xs text-slate-400">How do you handle the visitor's pen drive?</span>
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
