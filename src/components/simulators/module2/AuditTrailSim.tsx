import React, { useState } from 'react';
import { Scenario } from '../../../types';
import { useTraining } from '../../../context/TrainingContext';
import { 
  FileSearch, 
  AlertTriangle, 
  ShieldAlert, 
  Clock, 
  UserCheck, 
  UserX, 
  Sliders, 
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

export const AuditTrailSim: React.FC<{ scenario: Scenario }> = ({ scenario }) => {
  const { makeDecision } = useTraining();
  const [flaggedEvents, setFlaggedEvents] = useState<string[]>([]);

  const mock = scenario.situation.mockData || {};
  const logs = (mock.auditLogs as Array<{ id: string; time: string; actor: string; event: string; flag: string }>) || [];

  const toggleFlag = (id: string) => {
    setFlaggedEvents(prev => 
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Audit Trail Timeline Inspector Box */}
      <div className="rounded-2xl bg-gov-dark border border-gov-border shadow-2xl overflow-hidden p-5 sm:p-6 space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gov-border">
          <div className="flex items-center gap-2">
            <FileSearch className="w-5 h-5 text-brand-cyan" />
            <span className="text-sm font-bold text-white font-mono">e-Revenue Security Audit Log Inspector</span>
          </div>
          <div className="text-xs font-mono text-slate-400">
            Khordha Revenue Database • Audit Filter: DEO_Counter_1
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300">
          Click on log entries that indicate suspicious administrative tampering or privilege escalation:
        </p>

        {/* Interactive Audit Timeline */}
        <div className="space-y-3">
          {logs.map((log, index) => {
            const isSuspicious = log.flag !== 'NORMAL';
            const isSelected = flaggedEvents.includes(log.id);

            return (
              <motion.div
                key={log.id}
                whileHover={{ scale: 1.01 }}
                onClick={() => toggleFlag(log.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isSelected
                    ? isSuspicious
                      ? 'bg-red-950/40 border-red-500 shadow-glow-red'
                      : 'bg-amber-950/40 border-amber-500'
                    : 'bg-gov-surface hover:bg-gov-card border-gov-border'
                }`}
              >
                <div className="flex items-start sm:items-center gap-3">
                  <div className="p-2 rounded-lg bg-gov-dark border border-gov-border text-slate-300 font-mono text-xs flex-shrink-0 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-brand-cyan" />
                    <span>{log.time}</span>
                  </div>

                  <div className="space-y-0.5">
                    <div className="text-xs font-mono text-slate-400">Actor: <span className="text-slate-200 font-bold">{log.actor}</span></div>
                    <div className="text-xs sm:text-sm font-medium text-white">{log.event}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${
                    isSelected
                      ? 'bg-red-500 text-white border-red-400'
                      : 'bg-gov-card text-slate-400 border-gov-border'
                  }`}>
                    {isSelected ? 'FLAGGED AS ANOMALY' : 'CLICK TO FLAG'}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="p-3 rounded-xl bg-gov-card border border-brand-cyan/20 text-xs text-slate-300 flex items-center justify-between">
          <span>{flaggedEvents.length} of 4 events flagged by officer</span>
          <span className="font-mono text-brand-cyan text-[11px]">Notice the pattern: Alter record → Disable logs → Create backdoor admin</span>
        </div>

      </div>

      {/* Decision Options Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-mono uppercase font-bold text-brand-cyan tracking-wider flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" />
            What is your decision?
          </h3>
          <span className="text-xs text-slate-400">How do you handle these audit findings?</span>
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
