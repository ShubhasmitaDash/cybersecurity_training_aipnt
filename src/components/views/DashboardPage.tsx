import React from 'react';
import { useTraining } from '../../context/TrainingContext';
import { OPERATIONAL_ROLES } from '../../data/rolesData';
import { BADGES_DATA } from '../../data/badgesData';
import { ALL_SCENARIOS, getScenariosForRole } from '../../data/scenarios';
import { 
  Play, 
  CheckCircle2, 
  Award, 
  ShieldAlert, 
  Target, 
  Clock, 
  Sparkles, 
  RotateCcw,
  ArrowRight,
  ShieldCheck,
  Flame,
  FileCheck
} from 'lucide-react';
import { RiskMeter } from '../common/RiskMeter';
import { CharacterMentor } from '../common/CharacterMentor';

export const DashboardPage: React.FC = () => {
  const { 
    activeRole, 
    score, 
    riskLevel, 
    decisionsHistory, 
    completedScenarios, 
    completedModules, 
    unlockedBadges, 
    setView, 
    loadScenario 
  } = useTraining();

  const roleScenarios = activeRole ? getScenariosForRole(activeRole) : ALL_SCENARIOS;
  const currentRoleObj = OPERATIONAL_ROLES.find(r => r.id === activeRole);

  const correctDecisionsCount = decisionsHistory.filter(d => d.isCorrect).length;
  const incorrectDecisionsCount = decisionsHistory.filter(d => !d.isCorrect).length;

  const nextPendingScenario = roleScenarios.find(s => !completedScenarios.includes(s.id)) || roleScenarios[0];
  const isAllRoleScenariosDone = roleScenarios.every(s => completedScenarios.includes(s.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner: Active Role Overview & Continue Button */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-gov-surface via-gov-card to-gov-surface border border-gov-border shadow-elevated flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase font-bold text-brand-cyan bg-brand-cyan/15 px-2.5 py-0.5 rounded-full border border-brand-cyan/30">
              Active Operational Track
            </span>
            <span className="text-xs font-mono text-slate-400">
              {completedScenarios.length} of {roleScenarios.length} Scenarios Completed
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white">
            {currentRoleObj ? currentRoleObj.title : 'All Operational Modules Track'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            {currentRoleObj ? currentRoleObj.description : 'Comprehensive Sub-Collectorate training covering all 5 operational roles.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {nextPendingScenario && (
            <button
              onClick={() => loadScenario(nextPendingScenario.id)}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-brand-blue to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white font-bold text-sm shadow-glow-cyan transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{completedScenarios.length === 0 ? 'Start First Scenario' : 'Continue Training'}</span>
            </button>
          )}

          {isAllRoleScenariosDone && (
            <button
              onClick={() => setView('results')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-glow-green transition-all flex items-center justify-center gap-2"
            >
              <Award className="w-4 h-4" />
              <span>View Final Assessment</span>
            </button>
          )}
        </div>
      </div>

      {/* Metrics Row: 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Score Card */}
        <div className="p-5 rounded-2xl bg-gov-surface border border-gov-border space-y-1">
          <div className="text-slate-400 font-mono text-xs uppercase flex items-center justify-between">
            <span>Security Score</span>
            <Sparkles className="w-4 h-4 text-brand-goldLight" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-brand-goldLight font-mono">
            {score} <span className="text-xs text-slate-400 font-normal">PTS</span>
          </div>
          <div className="text-[11px] text-slate-400">Awarded for accurate defensive triage</div>
        </div>

        {/* Decisions Accuracy */}
        <div className="p-5 rounded-2xl bg-gov-surface border border-gov-border space-y-1">
          <div className="text-slate-400 font-mono text-xs uppercase flex items-center justify-between">
            <span>Decisions Ratio</span>
            <Target className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono flex items-center gap-2">
            <span className="text-emerald-400">{correctDecisionsCount}</span>
            <span className="text-slate-500 text-lg">/</span>
            <span className="text-red-400 text-lg">{incorrectDecisionsCount}</span>
          </div>
          <div className="text-[11px] text-slate-400">Correct vs Suboptimal decisions</div>
        </div>

        {/* Completed Modules */}
        <div className="p-5 rounded-2xl bg-gov-surface border border-gov-border space-y-1">
          <div className="text-slate-400 font-mono text-xs uppercase flex items-center justify-between">
            <span>Modules Complete</span>
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono">
            {completedModules.length} <span className="text-xs text-slate-400 font-normal">/ 5</span>
          </div>
          <div className="text-[11px] text-slate-400">Sub-Collectorate operational areas</div>
        </div>

        {/* Risk Meter Component Card */}
        <RiskMeter level={riskLevel} />

      </div>

      {/* Main Grid: Scenario Roadmap & Character Mentor */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Scenarios Roadmap */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 font-mono">
              <FileCheck className="w-5 h-5 text-brand-cyan" />
              Scenario Roadmap &amp; Progress
            </h3>
            <span className="text-xs text-slate-400 font-mono">Click any scenario to practice</span>
          </div>

          <div className="space-y-3">
            {roleScenarios.map((sc, index) => {
              const isCompleted = completedScenarios.includes(sc.id);
              const isCurrent = sc.id === nextPendingScenario?.id;

              return (
                <div
                  key={sc.id}
                  onClick={() => loadScenario(sc.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                    isCompleted
                      ? 'bg-emerald-950/20 border-emerald-500/40 hover:border-emerald-400'
                      : isCurrent
                      ? 'bg-gov-surface border-brand-cyan shadow-glow-cyan'
                      : 'bg-gov-surface hover:bg-gov-card border-gov-border'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs ${
                      isCompleted 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                        : isCurrent 
                        ? 'bg-brand-blue text-white border border-brand-cyan' 
                        : 'bg-gov-card text-slate-400 border border-gov-border'
                    }`}>
                      {index + 1}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-slate-400">
                          Module {sc.moduleId}:
                        </span>
                        <span className="text-xs font-mono text-brand-cyan font-semibold">
                          {sc.threatCategory}
                        </span>
                      </div>
                      <div className="text-sm font-bold text-white">{sc.title}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {isCompleted ? (
                      <span className="flex items-center gap-1 text-xs font-mono text-emerald-400 font-bold">
                        <CheckCircle2 className="w-4 h-4" /> PASSED
                      </span>
                    ) : isCurrent ? (
                      <span className="text-xs font-mono font-bold text-brand-goldLight animate-pulse">
                        READY →
                      </span>
                    ) : (
                      <span className="text-xs font-mono text-slate-500">
                        {sc.difficulty}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col: Character Mentor & Earned Badges */}
        <div className="space-y-6">
          <CharacterMentor roleId={activeRole || undefined} />

          {/* Earned Badges Shelf */}
          <div className="p-5 rounded-2xl bg-gov-surface border border-gov-border space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                <Award className="w-4 h-4 text-brand-goldLight" />
                Earned Badges ({unlockedBadges.length} / {BADGES_DATA.length})
              </h4>
              <button onClick={() => setView('results')} className="text-xs text-brand-cyan hover:underline">
                View All
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {BADGES_DATA.map((badge) => {
                const isUnlocked = unlockedBadges.includes(badge.id);
                return (
                  <div
                    key={badge.id}
                    className={`p-3 rounded-xl border text-center space-y-1 transition-all ${
                      isUnlocked 
                        ? 'bg-gov-card border-brand-cyan/40 shadow-glow-cyan text-white' 
                        : 'bg-gov-dark/60 border-gov-border/60 text-slate-600 opacity-40'
                    }`}
                  >
                    <Award className={`w-5 h-5 mx-auto ${isUnlocked ? 'text-brand-goldLight' : 'text-slate-600'}`} />
                    <div className="text-xs font-bold truncate">{badge.title}</div>
                    <div className="text-[10px] text-slate-400 font-mono truncate">{isUnlocked ? 'Unlocked' : 'Locked'}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
