import React, { useState } from 'react';
import { Scenario } from '../../../types';
import { useTraining } from '../../../context/TrainingContext';
import { 
  Folder, 
  FileText, 
  CheckSquare, 
  Square, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Eye,
  Sliders,
  FileCode
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const FileExplorerSim: React.FC<{ scenario: Scenario }> = ({ scenario }) => {
  const { makeDecision } = useTraining();
  const [showExtensions, setShowExtensions] = useState(false);

  const mock = scenario.situation.mockData || {};

  return (
    <div className="space-y-6">
      
      {/* Windows 11 File Explorer Simulation Stage */}
      <div className="rounded-2xl bg-[#1e1e1e] border-2 border-slate-700 shadow-2xl overflow-hidden font-sans">
        
        {/* Windows Explorer Title Bar */}
        <div className="bg-[#2d2d2d] px-4 py-2 border-b border-slate-700 flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Folder className="w-4 h-4 text-amber-400" />
            <span className="font-semibold">Downloads — Sub-Collectorate Inward Files</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
            <span>Windows 11 File Explorer</span>
          </div>
        </div>

        {/* Explorer Ribbon Toolbar with "Show Extensions" Toggle */}
        <div className="bg-[#252525] p-3 border-b border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <span>View Options:</span>
          </div>

          <button
            onClick={() => setShowExtensions(!showExtensions)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border font-mono text-xs font-bold transition-all ${
              showExtensions 
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-glow-green' 
                : 'bg-gov-surface text-amber-300 border-amber-500/40 hover:bg-gov-card'
            }`}
          >
            {showExtensions ? <CheckSquare className="w-4 h-4 text-emerald-400" /> : <Square className="w-4 h-4 text-amber-400" />}
            <span>Show File Name Extensions (View &gt; Show &gt; File name extensions)</span>
          </button>
        </div>

        {/* Explorer Files Grid */}
        <div className="p-6 bg-[#181818] min-h-[220px] space-y-4">
          
          <div className="text-xs text-slate-400 font-mono">
            Location: This PC &gt; Local Disk (C:) &gt; Users &gt; Section_Officer &gt; Downloads
          </div>

          {/* The Disguised File Row */}
          <motion.div
            layout
            className={`p-4 rounded-xl border transition-all flex items-center justify-between gap-4 ${
              showExtensions
                ? 'bg-red-950/40 border-red-500/60 shadow-glow-red'
                : 'bg-[#222222] border-slate-700 hover:border-slate-500'
            }`}
          >
            <div className="flex items-center gap-3">
              {/* Forged PDF Icon Graphic */}
              <div className="w-10 h-10 rounded-lg bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400">
                <FileText className="w-6 h-6" />
              </div>

              <div>
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Transfer_Order_2024.pdf</span>
                  {showExtensions ? (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="px-2 py-0.5 rounded bg-red-600 text-white font-mono text-xs font-black"
                    >
                      .scr (EXECUTABLE PAYLOAD!)
                    </motion.span>
                  ) : (
                    <span className="text-[11px] text-slate-400 italic">
                      [Extensions hidden by Windows default]
                    </span>
                  )}
                </div>

                <div className="text-xs font-mono text-slate-400 mt-0.5">
                  {showExtensions 
                    ? 'Type: Screen Saver Executable Binary • Actual Size: 980 KB' 
                    : 'Type: Adobe Acrobat Document (Deceptive) • Size: 980 KB'}
                </div>
              </div>
            </div>

            <div className="text-right">
              {showExtensions ? (
                <span className="text-xs font-mono font-bold text-red-400 bg-red-500/20 px-2.5 py-1 rounded border border-red-500/40 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> DANGER: EXECUTABLE
                </span>
              ) : (
                <span className="text-xs font-mono text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/30">
                  Toggle setting above to unmask
                </span>
              )}
            </div>
          </motion.div>

        </div>

      </div>

      {/* Decision Options Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-mono uppercase font-bold text-brand-cyan tracking-wider flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" />
            What is your decision?
          </h3>
          <span className="text-xs text-slate-400">How do you handle this file?</span>
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
