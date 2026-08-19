import React, { useState } from 'react';
import { Scenario } from '../../../types';
import { useTraining } from '../../../context/TrainingContext';
import { 
  Users, 
  ShieldAlert, 
  AlertTriangle, 
  UserCheck, 
  MessageSquare, 
  Flame,
  Award
} from 'lucide-react';
import { motion } from 'framer-motion';

export const SocialEngineeringCounterSim: React.FC<{ scenario: Scenario }> = ({ scenario }) => {
  const { makeDecision } = useTraining();
  const [activePersonaIndex, setActivePersonaIndex] = useState<number>(0);

  const mock = scenario.situation.mockData || {};
  const personas = (mock.personas as Array<{ id: string; name: string; quote: string; tactics: string[]; riskScore: string }>) || [];
  const currentPersona = personas[activePersonaIndex] || personas[0];

  return (
    <div className="space-y-6">
      
      {/* Citizen Service Intake Counter Stage */}
      <div className="rounded-2xl bg-gov-dark border border-gov-border p-6 shadow-2xl space-y-5">
        
        {/* Counter Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gov-border">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-bold text-white font-mono">Public Intake Counter Social Engineering Drill</span>
          </div>
          <span className="text-xs font-mono text-slate-400">Sub-Collectorate Front Counter #2</span>
        </div>

        {/* Persona Selector Tabs (if multiple) */}
        {personas.length > 1 && (
          <div className="flex gap-2">
            {personas.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => setActivePersonaIndex(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all ${
                  activePersonaIndex === idx
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-gov-surface text-slate-400 hover:text-white border border-gov-border'
                }`}
              >
                {p.name.split(' (')[0]}
              </button>
            ))}
          </div>
        )}

        {/* Counter Interaction Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
          
          {/* Animated Visitor Dialogue Box */}
          <div className="md:col-span-2 p-5 rounded-xl bg-gov-surface border border-purple-500/30 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-300 uppercase tracking-wider font-mono">
                  {currentPersona.name}
                </span>
                <span className="text-[10px] font-mono text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">
                  {currentPersona.riskScore}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-gov-card border border-gov-border text-slate-100 text-sm leading-relaxed italic">
                {currentPersona.quote}
              </div>
            </div>

            <div className="text-[11px] text-slate-400 font-mono pt-2 border-t border-gov-border/60">
              Observation: The visitor is attempting to force an instant bypass using psychological pressure.
            </div>
          </div>

          {/* Social Engineering Tactics Breakdown Card */}
          <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/40 space-y-2.5 text-xs">
            <div className="font-bold text-purple-300 font-mono flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Tactics in Play:</span>
            </div>

            <ul className="space-y-1.5 text-slate-300">
              {currentPersona.tactics.map((tactic, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-purple-400 font-bold">•</span>
                  <span>{tactic}</span>
                </li>
              ))}
            </ul>

            <div className="pt-2 text-[11px] text-slate-400 italic">
              Remember: Social engineering targets human deference and politeness.
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
          <span className="text-xs text-slate-400">How do you respond to the visitor?</span>
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
