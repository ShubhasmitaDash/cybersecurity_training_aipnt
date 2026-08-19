import React, { useState } from 'react';
import { useTraining } from '../../context/TrainingContext';
import { useTrainer } from '../../context/TrainerContext';
import { OPERATIONAL_ROLES } from '../../data/rolesData';
import { sounds } from '../../utils/soundEffects';
import { 
  Shield, 
  RotateCcw, 
  Presentation, 
  Award, 
  Volume2, 
  VolumeX, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { RiskMeter } from './RiskMeter';

export const Header: React.FC = () => {
  const { 
    activeRole, 
    currentView, 
    score, 
    riskLevel, 
    setView, 
    resetTraining,
    unlockedBadges 
  } = useTraining();

  const { isTrainerMode, toggleTrainerMode } = useTrainer();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [soundOn, setSoundOn] = useState(sounds.isEnabled());

  const currentRoleObj = OPERATIONAL_ROLES.find(r => r.id === activeRole);

  const handleSoundToggle = () => {
    const newState = sounds.toggleSound();
    setSoundOn(newState);
  };

  const handleReset = () => {
    resetTraining();
    setShowResetConfirm(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-gov-navy/95 backdrop-blur-md border-b border-gov-border/80 shadow-elevated">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left: Brand Identity & Sub-Collectorate Title */}
          <div className="flex items-center gap-4 cursor-pointer select-none" onClick={() => setView('landing')}>
            {/* AI PNT Logo Container */}
            <div className="relative flex items-center justify-center p-1.5 rounded-xl bg-white/95 border border-brand-cyan/40 shadow-glow-cyan">
              <img 
                src="/branding/aipnt-logo.png" 
                alt="AI PNT - Strategic Solutions" 
                className="h-10 w-auto object-contain max-w-[110px]"
              />
            </div>

            <div className="hidden sm:block">
              <div className="flex items-center gap-2">
                <span className="text-[11px] uppercase tracking-wider font-mono font-bold text-brand-cyan bg-brand-cyan/10 px-2 py-0.5 rounded border border-brand-cyan/30">
                  Defensive Simulation
                </span>
                <span className="text-[11px] text-slate-400 font-mono">Platform</span>
              </div>
              <h1 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-1.5">
                Cyber-Smart Sub-Collectorate
              </h1>
              <p className="text-xs font-semibold text-brand-goldLight tracking-wide">
                “Think. Verify. Protect.”
              </p>
            </div>
          </div>

          {/* Center: Active Role Badge & Navigation shortcuts (when in training) */}
          {activeRole && currentView !== 'landing' && (
            <div className="hidden lg:flex items-center gap-3">
              <button 
                onClick={() => setView('role_select')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gov-surface border border-gov-border hover:border-brand-cyan/60 transition-all text-xs font-medium text-slate-200 group"
                title="Switch Training Role"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-slate-400">Role:</span>
                <span className="font-semibold text-white group-hover:text-brand-cyan transition-colors">
                  {currentRoleObj ? currentRoleObj.shortTitle : 'All Modules'}
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <RiskMeter level={riskLevel} compact />
            </div>
          )}

          {/* Right: Actions, Score & Trainer Mode Toggle */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* Score & Badges Pill */}
            {activeRole && (
              <div className="flex items-center gap-2 bg-gov-surface/90 px-3 py-1.5 rounded-xl border border-gov-border">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-brand-goldLight animate-bounce" />
                  <span className="font-mono font-black text-sm text-brand-goldLight">{score}</span>
                  <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">PTS</span>
                </div>
                
                <div className="h-4 w-px bg-gov-border hidden sm:block" />

                <button 
                  onClick={() => setView('results')}
                  className="flex items-center gap-1 text-xs text-slate-300 hover:text-white transition-colors"
                  title="View Earned Badges & Report"
                >
                  <Award className="w-4 h-4 text-cyan-400" />
                  <span className="font-mono text-xs">{unlockedBadges.length}</span>
                </button>
              </div>
            )}

            {/* Sound Toggle */}
            <button
              onClick={handleSoundToggle}
              className="p-2 rounded-lg bg-gov-surface hover:bg-gov-card border border-gov-border text-slate-300 hover:text-white transition-colors"
              title={soundOn ? 'Mute Sound Effects' : 'Enable Sound Effects'}
            >
              {soundOn ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>

            {/* Trainer Mode Button */}
            <button
              onClick={() => {
                toggleTrainerMode();
                if (!isTrainerMode) {
                  setView('trainer');
                } else {
                  setView('dashboard');
                }
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold font-mono tracking-wide border transition-all ${
                isTrainerMode 
                  ? 'bg-brand-gold text-slate-900 border-yellow-400 shadow-glow-gold' 
                  : 'bg-gov-surface hover:bg-gov-card border-gov-border text-slate-200 hover:border-brand-gold/60'
              }`}
              title="Toggle Live Trainer & Projector Presentation Mode"
            >
              <Presentation className="w-4 h-4 text-current" />
              <span className="hidden sm:inline">{isTrainerMode ? 'TRAINER ON' : 'TRAINER MODE'}</span>
            </button>

            {/* Reset Button */}
            <button
              onClick={() => setShowResetConfirm(true)}
              className="p-2 rounded-lg bg-gov-surface hover:bg-red-950/40 border border-gov-border hover:border-red-500/50 text-slate-400 hover:text-red-400 transition-colors"
              title="Reset All Training Progress"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

          </div>
        </div>
      </div>

      {/* Confirmation Modal for Reset */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gov-surface border border-red-500/40 rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center gap-3 text-red-400 mb-3">
              <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/30">
                <Shield className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Reset Training Progress?</h3>
            </div>
            <p className="text-sm text-slate-300 mb-6 leading-relaxed">
              This will clear all accumulated scores, earned badges, scenario decisions, and return you to the beginning of the cybersecurity simulation.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 rounded-xl bg-gov-card border border-gov-border text-slate-300 hover:text-white font-medium text-sm transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-glow-red transition-all"
              >
                Yes, Reset Everything
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
