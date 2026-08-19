import React, { useState } from 'react';
import { Scenario } from '../../../types';
import { useTraining } from '../../../context/TrainingContext';
import { 
  FileText, 
  ShieldAlert, 
  CheckCircle2, 
  AlertOctagon, 
  FileCode, 
  HelpCircle, 
  ArrowRight,
  ShieldCheck,
  FolderLock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FileItem {
  id: string;
  name: string;
  size: string;
  extension: string;
  type: string;
  isSafe: boolean;
  threatCategory: string;
  explanation: string;
}

export const FileQuarantineGame: React.FC<{ scenario: Scenario }> = ({ scenario }) => {
  const { makeDecision } = useTraining();
  
  const mock = scenario.situation.mockData || {};
  const initialFiles = (mock.files as FileItem[]) || [];

  const [sortedSafe, setSortedSafe] = useState<FileItem[]>([]);
  const [sortedQuarantine, setSortedQuarantine] = useState<FileItem[]>([]);
  const [remainingFiles, setRemainingFiles] = useState<FileItem[]>(initialFiles);
  const [selectedFileForInspection, setSelectedFileForInspection] = useState<FileItem | null>(null);

  const handleSort = (file: FileItem, destination: 'safe' | 'quarantine') => {
    setRemainingFiles(prev => prev.filter(f => f.id !== file.id));
    if (destination === 'safe') {
      setSortedSafe(prev => [...prev, file]);
    } else {
      setSortedQuarantine(prev => [...prev, file]);
    }
  };

  const handleResetSort = () => {
    setRemainingFiles(initialFiles);
    setSortedSafe([]);
    setSortedQuarantine([]);
    setSelectedFileForInspection(null);
  };

  const allSorted = remainingFiles.length === 0;

  const isTriageAccurate = 
    sortedSafe.every(f => f.isSafe) && 
    sortedQuarantine.every(f => !f.isSafe) &&
    sortedSafe.length === 2 &&
    sortedQuarantine.length === 3;

  const submitTriage = () => {
    if (isTriageAccurate) {
      makeDecision('opt_1');
    } else {
      makeDecision('opt_2');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* File Sorting Stage Container */}
      <div className="rounded-2xl bg-gov-dark border border-gov-border p-5 sm:p-6 shadow-2xl space-y-5">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gov-border">
          <div>
            <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
              <FolderLock className="w-5 h-5 text-brand-cyan" />
              Inward Correspondence Attachment Triage Game
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Inspect file extensions and classify each inward attachment into SAFE or QUARANTINE.
            </p>
          </div>

          <button
            onClick={handleResetSort}
            className="text-xs font-mono text-slate-400 hover:text-white px-2.5 py-1 rounded bg-gov-card border border-gov-border"
          >
            Reset Bins
          </button>
        </div>

        {/* Unsorted Files Queue */}
        {remainingFiles.length > 0 ? (
          <div className="space-y-2">
            <div className="text-xs font-mono font-bold text-brand-cyan uppercase tracking-wider">
              Pending Inward Attachments ({remainingFiles.length} remaining):
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {remainingFiles.map((file) => (
                <motion.div
                  key={file.id}
                  layout
                  className="p-3.5 rounded-xl bg-gov-surface border border-gov-border hover:border-brand-cyan shadow-md space-y-2"
                >
                  <div className="flex items-start gap-2.5">
                    <div className={`p-2 rounded-lg ${
                      file.extension === '.exe' ? 'bg-red-500/20 text-red-400' :
                      file.extension === '.docm' ? 'bg-amber-500/20 text-amber-400' :
                      file.extension === '.vbs' ? 'bg-purple-500/20 text-purple-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      <FileCode className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-white truncate font-mono" title={file.name}>
                        {file.name}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        {file.size} • Ext: <span className="font-bold text-brand-goldLight">{file.extension}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => handleSort(file, 'safe')}
                      className="py-1.5 px-2 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/40 text-xs font-bold font-mono transition-all text-center"
                    >
                      ✓ SAFE
                    </button>
                    <button
                      onClick={() => handleSort(file, 'quarantine')}
                      className="py-1.5 px-2 rounded-lg bg-red-600/20 hover:bg-red-600/40 text-red-300 border border-red-500/40 text-xs font-bold font-mono transition-all text-center"
                    >
                      ⚠ QUARANTINE
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/50 text-center space-y-1">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <div className="text-sm font-bold text-white">All Inward Files Triaged!</div>
            <div className="text-xs text-slate-300">Review your bins below and submit your decision.</div>
          </div>
        )}

        {/* Triage Bins Side-by-Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          
          {/* SAFE BIN */}
          <div className="p-4 rounded-xl bg-emerald-950/20 border-2 border-emerald-500/40 space-y-3 min-h-[140px]">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-emerald-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> SAFE FOR REGULAR DISPATCH
              </span>
              <span>{sortedSafe.length} files</span>
            </div>

            <div className="space-y-2">
              {sortedSafe.length === 0 ? (
                <div className="text-xs text-slate-500 italic py-4 text-center">No files in Safe bin</div>
              ) : (
                sortedSafe.map(f => (
                  <div key={f.id} className="p-2 rounded-lg bg-gov-dark border border-emerald-500/30 text-xs text-slate-200 flex items-center justify-between font-mono">
                    <span className="truncate">{f.name}</span>
                    <span className="text-[10px] text-emerald-400 font-bold ml-2">SAFE</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* QUARANTINE BIN */}
          <div className="p-4 rounded-xl bg-red-950/20 border-2 border-red-500/40 space-y-3 min-h-[140px]">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-red-400">
              <span className="flex items-center gap-1.5">
                <AlertOctagon className="w-4 h-4" /> QUARANTINE / BLOCKED PAYLOADS
              </span>
              <span>{sortedQuarantine.length} files</span>
            </div>

            <div className="space-y-2">
              {sortedQuarantine.length === 0 ? (
                <div className="text-xs text-slate-500 italic py-4 text-center">No files in Quarantine bin</div>
              ) : (
                sortedQuarantine.map(f => (
                  <div key={f.id} className="p-2 rounded-lg bg-gov-dark border border-red-500/30 text-xs text-slate-200 flex items-center justify-between font-mono">
                    <span className="truncate">{f.name}</span>
                    <span className="text-[10px] text-red-400 font-bold ml-2">QUARANTINED</span>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

        {allSorted && (
          <div className="pt-2 flex justify-center">
            <button
              onClick={submitTriage}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-glow-green transition-all"
            >
              <span>Submit & Evaluate Triage Decision</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>

      {/* Decision Options Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-mono uppercase font-bold text-brand-cyan tracking-wider flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" />
            Direct Multiple-Choice Evaluation:
          </h3>
          <span className="text-xs text-slate-400">Select the correct triage policy</span>
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
