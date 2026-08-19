import React, { useState } from 'react';
import { useTraining } from '../../context/TrainingContext';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HintDrawerProps {
  hints: string[];
}

export const HintDrawer: React.FC<HintDrawerProps> = ({ hints }) => {
  const { hintsUsedForCurrent, useHint } = useTraining();
  const [isOpen, setIsOpen] = useState(false);

  const handleRevealNext = () => {
    useHint();
    if (!isOpen) setIsOpen(true);
  };

  return (
    <div className="w-full rounded-2xl bg-gov-surface/90 border border-gov-border overflow-hidden transition-all">
      <div className="flex items-center justify-between p-3.5 sm:p-4">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-brand-goldLight">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-200">Need a Clue?</div>
            <div className="text-[11px] text-slate-400">
              {hintsUsedForCurrent === 0 
                ? '3 progressive clues available' 
                : `${hintsUsedForCurrent} of ${hints.length} clues unlocked`}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {hintsUsedForCurrent < hints.length && (
            <button
              onClick={handleRevealNext}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-gold/15 hover:bg-brand-gold/25 border border-brand-gold/40 text-brand-goldLight text-xs font-bold transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{hintsUsedForCurrent === 0 ? 'Reveal Clue 1' : `Reveal Clue ${hintsUsedForCurrent + 1}`}</span>
            </button>
          )}

          {hintsUsedForCurrent > 0 && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 rounded-lg bg-gov-card text-slate-300 hover:text-white border border-gov-border"
              title={isOpen ? 'Collapse Hints' : 'Expand Hints'}
            >
              {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && hintsUsedForCurrent > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="px-4 pb-4 pt-1 space-y-2 border-t border-gov-border/60"
          >
            {hints.slice(0, hintsUsedForCurrent).map((hint, idx) => (
              <div 
                key={idx} 
                className="p-3 rounded-xl bg-gov-card border border-brand-gold/30 text-xs sm:text-sm text-slate-200 flex items-start gap-2.5"
              >
                <div className="px-1.5 py-0.5 rounded bg-brand-gold/20 text-brand-goldLight font-mono text-[10px] font-bold">
                  CLUE {idx + 1}
                </div>
                <div className="flex-1 leading-relaxed">{hint}</div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
