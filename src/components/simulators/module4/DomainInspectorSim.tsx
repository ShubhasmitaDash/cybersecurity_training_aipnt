import React, { useState } from 'react';
import { Scenario } from '../../../types';
import { useTraining } from '../../../context/TrainingContext';
import { 
  Globe, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Lock, 
  Unlock, 
  Search,
  ExternalLink
} from 'lucide-react';
import { motion } from 'framer-motion';

export const DomainInspectorSim: React.FC<{ scenario: Scenario }> = ({ scenario }) => {
  const { makeDecision } = useTraining();
  const [selectedPairIndex, setSelectedPairIndex] = useState(0);
  const [inspectSegment, setInspectSegment] = useState<'tld' | 'protocol' | 'subdomain' | null>(null);

  const mock = scenario.situation.mockData || {};
  const pairs = (mock.targetPairs as Array<{ id: string; realDomain: string; fakeDomain: string; realExplanation: string; fakeExplanation: string }>) || [];
  const currentPair = pairs[selectedPairIndex] || pairs[0];

  return (
    <div className="space-y-6">
      
      {/* Interactive Browser Address Bar Comparison Stage */}
      <div className="rounded-2xl bg-gov-dark border border-gov-border p-5 sm:p-6 shadow-2xl space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gov-border">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-brand-cyan" />
            <span className="text-sm font-bold text-white font-mono">Government Domain Syntax Inspector</span>
          </div>
          <div className="flex gap-2">
            {pairs.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => setSelectedPairIndex(idx)}
                className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all ${
                  selectedPairIndex === idx
                    ? 'bg-brand-blue text-white'
                    : 'bg-gov-surface text-slate-400 hover:text-white border border-gov-border'
                }`}
              >
                Case #{idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Side-by-Side URL Visual Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Authentic Government Portal Box */}
          <div className="p-4 rounded-xl bg-emerald-950/20 border-2 border-emerald-500/50 space-y-3 shadow-glow-green">
            <div className="flex items-center justify-between text-emerald-400 font-mono text-xs font-bold">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> AUTHENTIC STATE PORTAL
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-[10px]">
                VALID GOV DOMAIN
              </span>
            </div>

            {/* Address Bar Rendering */}
            <div className="p-3 rounded-lg bg-black/80 border border-emerald-500/40 text-xs font-mono text-slate-200 flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <div className="truncate">
                <span className="text-emerald-400 font-bold">https://</span>
                <span className="text-white font-bold">{currentPair.realDomain.replace('https://', '')}</span>
              </div>
            </div>

            <div className="text-xs text-slate-300 leading-relaxed">
              {currentPair.realExplanation}
            </div>

            <div className="p-2 rounded bg-emerald-900/30 border border-emerald-500/20 text-[11px] font-mono text-emerald-300">
              Key Indicator: Top-Level Domain (TLD) is strictly <span className="font-bold text-white">.gov.in / .nic.in</span>
            </div>
          </div>

          {/* Deceptive Phishing Clone Box */}
          <div className="p-4 rounded-xl bg-red-950/20 border-2 border-red-500/50 space-y-3 shadow-glow-red">
            <div className="flex items-center justify-between text-red-400 font-mono text-xs font-bold">
              <span className="flex items-center gap-1.5">
                <XCircle className="w-4 h-4" /> FRAUDULENT SPOOFED CLONE
              </span>
              <span className="px-2 py-0.5 rounded bg-red-500/20 border border-red-500/40 text-[10px]">
                HARVESTING TRAP
              </span>
            </div>

            {/* Address Bar Rendering */}
            <div className="p-3 rounded-lg bg-black/80 border border-red-500/40 text-xs font-mono text-slate-200 flex items-center gap-2">
              <Unlock className="w-4 h-4 text-red-400 flex-shrink-0" />
              <div className="truncate">
                <span className="text-red-400 font-bold">http://</span>
                <span className="text-amber-300 font-bold">{currentPair.fakeDomain.replace('http://', '')}</span>
              </div>
            </div>

            <div className="text-xs text-slate-300 leading-relaxed">
              {currentPair.fakeExplanation}
            </div>

            <div className="p-2 rounded bg-red-900/30 border border-red-500/20 text-[11px] font-mono text-red-300">
              Trap: Commercial suffix (<span className="font-bold text-white">.com / .org</span>) used with hyphenated state keywords.
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
          <span className="text-xs text-slate-400">Classify the web links</span>
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
