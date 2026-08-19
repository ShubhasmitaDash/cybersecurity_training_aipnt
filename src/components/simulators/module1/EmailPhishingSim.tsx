import React, { useState } from 'react';
import { Scenario } from '../../../types';
import { useTraining } from '../../../context/TrainingContext';
import { 
  Mail, 
  Paperclip, 
  AlertTriangle, 
  Clock, 
  User, 
  ExternalLink, 
  Info,
  ShieldAlert,
  Search
} from 'lucide-react';
import { motion } from 'framer-motion';

export const EmailPhishingSim: React.FC<{ scenario: Scenario }> = ({ scenario }) => {
  const { makeDecision } = useTraining();
  const [showHeaders, setShowHeaders] = useState(false);
  const [highlightDomain, setHighlightDomain] = useState(false);

  const mock = scenario.situation.mockData || {};
  const sender = scenario.situation.senderInfo || {
    name: 'District Administration Office',
    email: 'collector-office@odisha-adm-clearance.org',
    designation: 'Collector Secretariat'
  };

  return (
    <div className="space-y-6">
      {/* Simulation Watermark & Container */}
      <div className="rounded-2xl bg-gov-dark border border-gov-border shadow-2xl overflow-hidden">
        
        {/* Email Client Header Bar */}
        <div className="bg-gov-surface px-4 py-3 border-b border-gov-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="ml-2 text-xs font-mono text-slate-400">e-Despatch Official Webmail Client (Simulated Inbox)</span>
          </div>

          <button
            onClick={() => setShowHeaders(!showHeaders)}
            className="flex items-center gap-1 text-xs font-mono text-brand-cyan hover:underline bg-gov-card px-2.5 py-1 rounded border border-gov-border"
          >
            <Info className="w-3.5 h-3.5" />
            <span>{showHeaders ? 'Hide Full Headers' : 'Inspect Raw Headers'}</span>
          </button>
        </div>

        {/* Email Content Area */}
        <div className="p-5 sm:p-6 space-y-4">
          
          {/* Urgent Priority Banner */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-red-500/15 border border-red-500/40 text-red-300 text-xs font-mono font-bold">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 animate-pulse" />
              <span>MARK: STRICTLY CONFIDENTIAL & TIME SENSITIVE (EXPIRING IN 30 MINS)</span>
            </div>
            <span className="hidden sm:inline">HIGH PRIORITY DOCKET</span>
          </div>

          {/* Sender & Subject Information */}
          <div className="p-4 rounded-xl bg-gov-surface/90 border border-gov-border space-y-2 text-xs sm:text-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-mono">FROM:</span>
                <span className="font-bold text-white">{sender.name}</span>
                <button 
                  onClick={() => setHighlightDomain(!highlightDomain)}
                  className={`font-mono text-xs px-2 py-0.5 rounded transition-all ${
                    highlightDomain 
                      ? 'bg-amber-500 text-black font-black border border-amber-300' 
                      : 'text-amber-300 bg-amber-500/10 border border-amber-500/30'
                  }`}
                  title="Click to inspect domain spoofing"
                >
                  &lt;{sender.email}&gt;
                </button>
              </div>
              <div className="text-slate-400 font-mono text-xs flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {String(mock.timestamp || 'Today, 09:14 AM')}
              </div>
            </div>

            <div>
              <span className="text-slate-400 font-mono">SUBJECT: </span>
              <span className="font-bold text-slate-100">{String(mock.subject || '')}</span>
            </div>

            {/* Inspectable Raw Headers Box */}
            {showHeaders && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-3 p-3 rounded-lg bg-black/70 border border-brand-cyan/40 text-xs font-mono space-y-1 text-slate-300"
              >
                <div className="text-brand-cyan font-bold">--- SMTP HEADER DIAGNOSTIC ---</div>
                <div>Return-Path: &lt;bounce-track@mail-relay-thirdparty.net&gt;</div>
                <div className="text-amber-400">Received-SPF: SoftFail (domain odisha-adm-clearance.org does not designate 198.51.100.12 as permitted sender)</div>
                <div className="text-red-400">Authentication-Results: dkim=fail; spf=softfail (Non-Gov IP origin)</div>
                <div>X-Mailer: External PHP Script Mailer v8.2</div>
              </motion.div>
            )}
          </div>

          {/* Email Body */}
          <div className="p-4 sm:p-5 rounded-xl bg-gov-card/60 border border-gov-border text-slate-200 text-sm leading-relaxed whitespace-pre-line font-sans">
            {String(mock.bodyContent || '')}
          </div>

          {/* Attachment Box */}
          {mock.attachment && (
            <div className="p-3.5 rounded-xl bg-gov-surface border border-red-500/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400">
                  <Paperclip className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-mono font-bold text-red-300">
                    {String(mock.attachment)}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    Warning: Trailing executable extension detected (.exe)
                  </div>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded bg-red-500/20 text-red-400 text-xs font-mono font-bold border border-red-500/30">
                SUSPECT ATTACHMENT
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Decision Options Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-mono uppercase font-bold text-brand-cyan tracking-wider flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" />
            What is your decision?
          </h3>
          <span className="text-xs text-slate-400">Select the safest administrative action</span>
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
