import React, { useState, useEffect } from 'react';
import { useTraining } from '../../context/TrainingContext';
import { MASTER_OFFICE_EMERGENCIES, OfficeEmergency } from '../../data/scenarios/masterChallenge';
import { sounds } from '../../utils/soundEffects';
import { 
  Flame, 
  Clock, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  AlertOctagon, 
  ArrowRight, 
  Sparkles, 
  Building2, 
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const MasterChallenge: React.FC = () => {
  const { completeMasterChallenge, setView } = useTraining();
  
  const [secondsRemaining, setSecondsRemaining] = useState(300); // 5 minutes
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [activeEmergencyIndex, setActiveEmergencyIndex] = useState(0);
  const [resolvedEmergencies, setResolvedEmergencies] = useState<Record<string, { optionId: string; isCorrect: boolean; points: number }>>({});
  const [showResultSummary, setShowResultSummary] = useState(false);

  useEffect(() => {
    if (!isTimerRunning || secondsRemaining <= 0) return;
    const interval = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          setIsTimerRunning(false);
          setShowResultSummary(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning, secondsRemaining]);

  const currentEmergency = MASTER_OFFICE_EMERGENCIES[activeEmergencyIndex];

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleResolve = (opt: { id: string; text: string; isCorrect: boolean; points: number }) => {
    if (opt.isCorrect) {
      sounds.playSuccess();
    } else {
      sounds.playError();
    }

    setResolvedEmergencies(prev => ({
      ...prev,
      [currentEmergency.id]: {
        optionId: opt.id,
        isCorrect: opt.isCorrect,
        points: opt.points
      }
    }));

    if (activeEmergencyIndex < MASTER_OFFICE_EMERGENCIES.length - 1) {
      setActiveEmergencyIndex(prev => prev + 1);
    } else {
      setIsTimerRunning(false);
      setShowResultSummary(true);
    }
  };

  const totalPointsGained = Object.values(resolvedEmergencies).reduce((acc, curr) => acc + curr.points, 0);
  const correctCount = Object.values(resolvedEmergencies).filter(r => r.isCorrect).length;

  const handleFinish = () => {
    completeMasterChallenge(Math.max(0, totalPointsGained));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Challenge Header & Live 5-Minute Timer Bar */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-red-950/40 via-gov-surface to-red-950/40 border-2 border-red-500/50 shadow-glow-red flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <Flame className="w-5 h-5 text-red-400 animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase text-red-400">
              High-Stress Incident Response Simulation
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            The Cyber-Smart Office Challenge
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            5 concurrent cyber emergencies are unfolding across the Sub-Collectorate. Prioritize &amp; resolve each threat!
          </p>
        </div>

        {/* Live Countdown Clock */}
        <div className="flex items-center gap-3 bg-black/80 px-5 py-3 rounded-2xl border-2 border-red-500 font-mono text-red-400 shadow-glow-red">
          <Clock className="w-6 h-6 animate-spin" />
          <div>
            <div className="text-[10px] text-slate-400 uppercase">TIME REMAINING</div>
            <div className="text-2xl sm:text-3xl font-black tracking-widest">{formatTimer(secondsRemaining)}</div>
          </div>
        </div>
      </div>

      {/* Office Rooms Navigation Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {MASTER_OFFICE_EMERGENCIES.map((emg, idx) => {
          const result = resolvedEmergencies[emg.id];
          const isCurrent = idx === activeEmergencyIndex;

          return (
            <button
              key={emg.id}
              onClick={() => setActiveEmergencyIndex(idx)}
              className={`p-3 rounded-xl border text-left transition-all ${
                isCurrent 
                  ? 'bg-gov-surface border-brand-cyan shadow-glow-cyan' 
                  : result 
                  ? result.isCorrect 
                    ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-400' 
                    : 'bg-red-950/20 border-red-500/40 text-red-400'
                  : 'bg-gov-dark border-gov-border text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono font-bold uppercase">Incident #{idx + 1}</span>
                {result ? (
                  result.isCorrect ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <XCircle className="w-3.5 h-3.5 text-red-400" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                )}
              </div>
              <div className="text-xs font-bold text-white truncate">{emg.room}</div>
            </button>
          );
        })}
      </div>

      {/* Active Incident Interactive Screen */}
      {!showResultSummary && currentEmergency && (
        <div className="rounded-3xl bg-gov-surface border border-gov-border p-6 sm:p-8 shadow-2xl space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-gov-border">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-red-500/20 border border-red-500/40 text-red-400">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider">
                  Location: {currentEmergency.room} • Target: {currentEmergency.officerRole}
                </span>
                <h3 className="text-xl font-bold text-white">
                  {currentEmergency.title}
                </h3>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-xs font-mono font-bold border border-red-500/40">
              {currentEmergency.urgencyLevel} Urgency
            </span>
          </div>

          <div className="p-4 rounded-xl bg-gov-card border border-gov-border text-slate-200 text-sm leading-relaxed">
            {currentEmergency.description}
          </div>

          {/* Incident Resolution Choices */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase font-bold text-brand-cyan tracking-wider">
              Choose immediate containment action:
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentEmergency.options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleResolve(opt)}
                  className="text-left p-4 rounded-xl bg-gov-dark hover:bg-gov-surface border border-gov-border hover:border-brand-cyan text-slate-200 hover:text-white transition-all glass-card-hover group space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-brand-cyan">OPTION ACTION</span>
                    <span className="text-xs font-mono text-brand-goldLight">{opt.points > 0 ? '+100 PTS' : '-50 PTS'}</span>
                  </div>
                  <div className="text-xs sm:text-sm font-medium leading-relaxed">
                    {opt.text}
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Challenge Summary Modal / Results View */}
      {showResultSummary && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-3xl bg-gov-surface border-2 border-brand-cyan/50 p-8 shadow-glow-cyan text-center space-y-6 max-w-2xl mx-auto"
        >
          <div className="w-16 h-16 rounded-2xl bg-brand-blue/30 border border-brand-cyan text-brand-cyan flex items-center justify-center mx-auto shadow-glow-cyan">
            <Award className="w-9 h-9" />
          </div>

          <div className="space-y-1">
            <div className="text-xs font-mono font-bold text-brand-cyan uppercase">
              Office Challenge Complete
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Sub-Collectorate Incident Triage Report
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4 py-2">
            <div className="p-4 rounded-2xl bg-gov-card border border-gov-border">
              <div className="text-xs text-slate-400 font-mono">EMERGENCIES NEUTRALIZED</div>
              <div className="text-3xl font-black text-emerald-400 font-mono mt-1">
                {correctCount} <span className="text-sm text-slate-500">/ 5</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-gov-card border border-gov-border">
              <div className="text-xs text-slate-400 font-mono">CHALLENGE SCORE EARNED</div>
              <div className="text-3xl font-black text-brand-goldLight font-mono mt-1">
                +{totalPointsGained} <span className="text-sm text-slate-500">PTS</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => {
                setSecondsRemaining(300);
                setIsTimerRunning(true);
                setActiveEmergencyIndex(0);
                setResolvedEmergencies({});
                setShowResultSummary(false);
              }}
              className="px-6 py-3 rounded-xl bg-gov-card hover:bg-slate-700 border border-gov-border text-slate-200 font-bold text-sm"
            >
              Retry Challenge
            </button>

            <button
              onClick={handleFinish}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-glow-green"
            >
              Continue to Final Assessment →
            </button>
          </div>
        </motion.div>
      )}

    </div>
  );
};
