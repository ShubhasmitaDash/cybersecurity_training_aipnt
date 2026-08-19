import React from 'react';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

export const SafetyBanner: React.FC<{ compact?: boolean }> = ({ compact }) => {
  return (
    <div className={`w-full bg-gradient-to-r from-gov-surface via-gov-card to-gov-surface border-y border-brand-cyan/20 ${compact ? 'py-1.5 px-3 text-xs' : 'py-2 px-4 text-xs sm:text-sm'} text-slate-300 flex items-center justify-center gap-2 shadow-inner select-none`}>
      <div className="flex items-center gap-1.5 text-brand-goldLight font-semibold tracking-wider uppercase">
        <AlertTriangle className="w-4 h-4 animate-pulse text-brand-goldLight" />
        <span>Training Simulation</span>
      </div>
      <span className="text-slate-500 hidden sm:inline">•</span>
      <span className="text-slate-400 font-medium">
        All systems, identities, documents & records shown are fictional training content. No real government system is connected.
      </span>
      <ShieldCheck className="w-4 h-4 text-brand-cyan hidden md:inline ml-1" />
    </div>
  );
};
