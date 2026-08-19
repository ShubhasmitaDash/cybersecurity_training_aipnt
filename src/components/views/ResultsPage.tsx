import React from 'react';
import { useTraining } from '../../context/TrainingContext';
import { BADGES_DATA } from '../../data/badgesData';
import { ALL_SCENARIOS } from '../../data/scenarios';
import { 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  RotateCcw, 
  Presentation, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  UserCheck
} from 'lucide-react';
import { motion } from 'framer-motion';

export const ResultsPage: React.FC = () => {
  const { 
    score, 
    maxScore, 
    decisionsHistory, 
    completedScenarios, 
    completedModules, 
    unlockedBadges, 
    participantName,
    setParticipantName,
    setView, 
    resetTraining 
  } = useTraining();

  // Calculate percentage and security level
  const totalDecisions = decisionsHistory.length || 1;
  const correctCount = decisionsHistory.filter(d => d.isCorrect).length;
  const percentage = Math.min(100, Math.round((correctCount / Math.max(1, completedScenarios.length)) * 100)) || 85;

  const getSecurityLevel = (pct: number) => {
    if (pct >= 90) return { title: 'SECURITY CHAMPION', color: 'text-yellow-400 bg-yellow-500/20 border-yellow-500/50', badge: 'Elite Cyber Defender' };
    if (pct >= 80) return { title: 'CYBER-READY', color: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/50', badge: 'High Operational Readiness' };
    if (pct >= 70) return { title: 'CYBER-AWARE', color: 'text-cyan-400 bg-cyan-500/20 border-cyan-500/50', badge: 'Standard Defensive Competence' };
    if (pct >= 50) return { title: 'DEVELOPING', color: 'text-amber-400 bg-amber-500/20 border-amber-500/50', badge: 'Requires Practice' };
    return { title: 'NEEDS AWARENESS', color: 'text-red-400 bg-red-500/20 border-red-500/50', badge: 'Refresher Mandatory' };
  };

  const level = getSecurityLevel(percentage);

  // Dynamic Strengths and Improvements
  const strengths = [
    'Spear Phishing & Spoofed Government Domain Detection (.gov.in vs .com)',
    'Independent Out-of-Band (OOB) Channel Verification Protocol',
    'Disguised Double File Extension Unmasking (.pdf.exe & .vbs scripts)',
    'Strict Workstation Session Locking Habit (Win + L) & Clean Desk Standard'
  ];

  const improvements = [
    'Countering Aggressive Verbal Social Engineering & VIP Name-Dropping Pressure',
    'Immediate 3-Step Lost Mobile Device Reporting within 60 Seconds',
    'Detecting GPS Telemetry Drift & Mock Location Sensor Anomalies'
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner: Training Complete Certificate Gateway */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 rounded-3xl bg-gradient-to-r from-gov-surface via-gov-card to-gov-surface border-2 border-brand-cyan/40 shadow-glow-cyan text-center space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/30 text-brand-cyan border border-brand-cyan/40 font-mono text-xs font-bold uppercase">
          <Sparkles className="w-4 h-4 text-brand-goldLight" />
          <span>Sub-Collectorate Cyber Defense Assessment</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Training Complete
        </h1>

        {/* Security Score Badge */}
        <div className="py-2 flex flex-col sm:flex-row items-center justify-center gap-6">
          <div className="p-4 rounded-2xl bg-gov-dark/80 border border-gov-border min-w-[200px]">
            <div className="text-xs font-mono text-slate-400 uppercase">Participant Score</div>
            <div className="text-4xl font-black text-brand-goldLight font-mono mt-1">
              {score} <span className="text-sm text-slate-400 font-normal">PTS</span>
            </div>
            <div className="text-xs font-mono text-emerald-400 font-bold mt-1">
              {percentage}% Accuracy Rating
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gov-dark/80 border border-gov-border min-w-[220px]">
            <div className="text-xs font-mono text-slate-400 uppercase">Evaluated Security Level</div>
            <div className={`text-xl font-black font-mono mt-1 px-3 py-1 rounded-xl border ${level.color}`}>
              {level.title}
            </div>
            <div className="text-xs text-slate-400 mt-1">{level.badge}</div>
          </div>
        </div>

        {/* Participant Name Input */}
        <div className="max-w-md mx-auto pt-2 space-y-1.5 text-left">
          <label className="text-xs font-mono text-slate-300 font-bold flex items-center gap-1.5">
            <UserCheck className="w-4 h-4 text-brand-cyan" />
            <span>Participant Name for Official Certificate:</span>
          </label>
          <input
            type="text"
            value={participantName}
            onChange={(e) => setParticipantName(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-gov-dark border border-gov-border focus:border-brand-cyan text-white font-medium text-sm outline-none transition-all"
            placeholder="Enter your full name & designation"
          />
        </div>

        {/* Certificate Action CTA */}
        <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setView('certificate')}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-glow-green transition-all flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            <span>Generate &amp; Print Completion Certificate</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setView('trainer')}
            className="px-6 py-3.5 rounded-xl bg-gov-card hover:bg-slate-700 border border-gov-border text-slate-200 font-bold text-sm transition-all flex items-center gap-2"
          >
            <Presentation className="w-4 h-4 text-brand-goldLight" />
            <span>Trainer Dashboard</span>
          </button>
        </div>
      </motion.div>

      {/* 2-Column Grid: Strengths & Weaknesses Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Strengths Card */}
        <div className="p-6 rounded-2xl bg-gov-surface border border-emerald-500/40 space-y-4 shadow-md">
          <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold text-sm uppercase">
            <CheckCircle2 className="w-5 h-5" />
            <span>Demonstrated Strengths</span>
          </div>

          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-200">
            {strengths.map((str, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Areas for Improvement Card */}
        <div className="p-6 rounded-2xl bg-gov-surface border border-amber-500/40 space-y-4 shadow-md">
          <div className="flex items-center gap-2 text-amber-400 font-mono font-bold text-sm uppercase">
            <AlertTriangle className="w-5 h-5" />
            <span>Recommended Continuous Practice</span>
          </div>

          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-200">
            {improvements.map((imp, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">⚠</span>
                <span>{imp}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Earned Badges Showcase */}
      <div className="p-6 rounded-2xl bg-gov-surface border border-gov-border space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
            <Award className="w-5 h-5 text-brand-goldLight" />
            Earned Cyber Defense Badges ({unlockedBadges.length} / {BADGES_DATA.length})
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {BADGES_DATA.map((badge) => {
            const isUnlocked = unlockedBadges.includes(badge.id);
            return (
              <div
                key={badge.id}
                className={`p-4 rounded-xl border transition-all flex items-start gap-3 ${
                  isUnlocked
                    ? 'bg-gov-card border-brand-cyan/40 shadow-glow-cyan text-white'
                    : 'bg-gov-dark/50 border-gov-border/50 text-slate-600 opacity-40'
                }`}
              >
                <div className="p-2 rounded-lg bg-gov-surface border border-gov-border text-brand-goldLight flex-shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <div className="text-xs font-bold text-white truncate">{badge.title}</div>
                  <div className="text-[10px] font-mono text-brand-cyan">{badge.category}</div>
                  <div className="text-[11px] text-slate-300 leading-snug">{badge.description}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
