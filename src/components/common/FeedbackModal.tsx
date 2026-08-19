import React from 'react';
import { useTraining } from '../../context/TrainingContext';
import { 
  CheckCircle2, 
  AlertOctagon, 
  AlertTriangle, 
  ArrowRight, 
  Lightbulb, 
  Award,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const FeedbackModal: React.FC = () => {
  const { activeFeedback, dismissFeedback, nextScenario } = useTraining();

  if (!activeFeedback) return null;

  const { option, scenario } = activeFeedback;
  const isSuccess = option.isCorrect;
  const isDangerous = option.isDangerous;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className={`relative max-w-2xl w-full rounded-2xl bg-gov-surface border p-6 sm:p-8 shadow-2xl overflow-hidden ${
            isSuccess 
              ? 'border-emerald-500/50 shadow-glow-green' 
              : isDangerous 
              ? 'border-red-500/60 shadow-glow-red' 
              : 'border-amber-500/50 shadow-glow-gold'
          }`}
        >
          {/* Top Banner with Result State */}
          <div className="flex items-start gap-4 mb-6">
            <div className={`p-3 rounded-2xl border flex-shrink-0 ${
              isSuccess 
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                : isDangerous 
                ? 'bg-red-500/10 border-red-500/30 text-red-400' 
                : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
            }`}>
              {isSuccess ? (
                <CheckCircle2 className="w-8 h-8 text-emerald-400 animate-pulse" />
              ) : isDangerous ? (
                <AlertOctagon className="w-8 h-8 text-red-400 animate-bounce" />
              ) : (
                <AlertTriangle className="w-8 h-8 text-amber-400" />
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                  isSuccess 
                    ? 'bg-emerald-500/20 text-emerald-300' 
                    : isDangerous 
                    ? 'bg-red-500/20 text-red-300' 
                    : 'bg-amber-500/20 text-amber-300'
                }`}>
                  {isSuccess ? 'Layer 1: Decision Verified' : isDangerous ? 'Layer 1: Critical Risk Triggered' : 'Layer 1: Suboptimal Action'}
                </span>
                
                {isSuccess && (
                  <span className="flex items-center gap-1 text-xs font-mono font-bold text-brand-goldLight">
                    <Sparkles className="w-3.5 h-3.5" /> +100 PTS
                  </span>
                )}
                {isDangerous && (
                  <span className="text-xs font-mono font-bold text-red-400">
                    -50 PTS
                  </span>
                )}
              </div>

              <h2 className={`text-xl sm:text-2xl font-black tracking-tight ${
                isSuccess ? 'text-emerald-300' : isDangerous ? 'text-red-300' : 'text-amber-300'
              }`}>
                {option.feedbackTitle}
              </h2>
            </div>
          </div>

          {/* Layer 2: WHY? (Detailed Simple Explanation) */}
          <div className="mb-5 p-4 rounded-xl bg-gov-card/80 border border-gov-border">
            <div className="flex items-center gap-2 mb-2 text-brand-cyan text-xs font-bold font-mono uppercase tracking-wider">
              <Lightbulb className="w-4 h-4" />
              <span>Layer 2: Why This Happened</span>
            </div>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              {option.feedbackWhy}
            </p>
          </div>

          {/* Layer 3: REAL-WORLD ADMINISTRATIVE TAKEAWAY */}
          <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-brand-blue/30 via-gov-surface to-brand-royal/20 border border-brand-cyan/40">
            <div className="flex items-center gap-2 mb-1.5 text-brand-goldLight text-xs font-bold font-mono uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>Layer 3: Golden Administrative Takeaway</span>
            </div>
            <p className="text-sm font-semibold text-slate-100 italic leading-snug">
              {option.feedbackTakeaway}
            </p>
          </div>

          {/* Footer Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-gov-border">
            <div className="text-xs text-slate-400 font-mono">
              Module {scenario.moduleId}: {scenario.moduleTitle}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {!isSuccess && (
                <button
                  onClick={dismissFeedback}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gov-card hover:bg-slate-700 border border-gov-border text-slate-200 text-sm font-semibold transition-colors"
                >
                  Try Another Option
                </button>
              )}

              <button
                onClick={() => {
                  dismissFeedback();
                  nextScenario();
                }}
                className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg transition-all ${
                  isSuccess 
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-glow-green' 
                    : 'bg-brand-blue hover:bg-brand-royal text-white'
                }`}
              >
                <span>{isSuccess ? 'Continue to Next Scenario' : 'Proceed Anyway'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
