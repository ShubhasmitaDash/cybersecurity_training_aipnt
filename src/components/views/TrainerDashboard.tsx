import React, { useState } from 'react';
import { useTraining } from '../../context/TrainingContext';
import { useTrainer } from '../../context/TrainerContext';
import { ALL_SCENARIOS, getScenarioById } from '../../data/scenarios';
import { DEFAULT_COHORT_STATS, TRAINER_TEACHING_NOTES } from '../../data/trainerData';
import { 
  Presentation, 
  Play, 
  Eye, 
  EyeOff, 
  MessageSquare, 
  RotateCcw, 
  Maximize2, 
  Settings, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  BarChart3, 
  BookOpen, 
  ArrowRight,
  ShieldAlert,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { ConfigModal } from './ConfigModal';

export const TrainerDashboard: React.FC = () => {
  const { loadScenario, setView } = useTraining();
  const { 
    trainerConfig, 
    activeTrainerScenarioId, 
    setTrainerScenarioId, 
    isAnswerRevealed, 
    revealAnswer, 
    hideAnswer, 
    isExplanationVisible, 
    toggleExplanation 
  } = useTrainer();

  const [activeTab, setActiveTab] = useState<'scenarios' | 'analytics'>('scenarios');
  const [showConfigModal, setShowConfigModal] = useState(false);

  const currentScenario = getScenarioById(activeTrainerScenarioId) || ALL_SCENARIOS[0];
  const trainerNote = TRAINER_TEACHING_NOTES[currentScenario.id] || 'Guide participants through the 3-step Receive-Pause-Verify loop and discuss local office SOPs.';
  const correctAnswer = currentScenario.options.find(o => o.isCorrect);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Trainer Header Bar */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-gov-surface via-gov-card to-gov-surface border-2 border-brand-gold/50 shadow-glow-gold flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-brand-gold text-slate-950 font-mono font-black text-xs uppercase tracking-wider">
              Trainer &amp; Projector Deck
            </span>
            <span className="text-xs font-mono text-slate-400">
              {trainerConfig.orgName}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Live Facilitator Command Center
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Facilitate live classroom scenarios, project simulations onto wide screens, reveal model answers, and review cohort analytics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowConfigModal(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gov-card hover:bg-slate-700 border border-gov-border text-xs font-bold text-slate-200 transition-colors"
          >
            <Settings className="w-4 h-4 text-brand-cyan" />
            <span>Admin Config</span>
          </button>

          <button
            onClick={toggleFullScreen}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-royal text-white text-xs font-bold shadow-glow-cyan transition-all"
            title="Toggle Projector Fullscreen View"
          >
            <Maximize2 className="w-4 h-4" />
            <span>Fullscreen</span>
          </button>
        </div>
      </div>

      {/* Tabs: Scenario Facilitator vs Cohort Analytics */}
      <div className="flex gap-4 border-b border-gov-border text-sm font-bold font-mono">
        <button
          onClick={() => setActiveTab('scenarios')}
          className={`pb-3 border-b-2 flex items-center gap-2 transition-all ${
            activeTab === 'scenarios'
              ? 'border-brand-gold text-brand-goldLight'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Presentation className="w-4 h-4" />
          <span>Interactive Scenario Deck (18 Scenarios)</span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`pb-3 border-b-2 flex items-center gap-2 transition-all ${
            activeTab === 'analytics'
              ? 'border-brand-gold text-brand-goldLight'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Training Cohort Analytics &amp; Risk Heatmap</span>
        </button>
      </div>

      {/* TAB 1: SCENARIO FACILITATOR */}
      {activeTab === 'scenarios' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Left Column: Quick Scenario Selector */}
          <div className="p-5 rounded-2xl bg-gov-surface border border-gov-border space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-brand-cyan">
                Jump to Scenario:
              </h3>
              <span className="text-xs text-slate-400 font-mono">18 available</span>
            </div>

            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
              {ALL_SCENARIOS.map((sc, idx) => {
                const isSelected = sc.id === currentScenario.id;
                return (
                  <button
                    key={sc.id}
                    onClick={() => setTrainerScenarioId(sc.id)}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-start gap-2.5 ${
                      isSelected
                        ? 'bg-brand-blue/30 border-brand-cyan text-white shadow-glow-cyan'
                        : 'bg-gov-card hover:bg-slate-700/50 border-gov-border text-slate-300'
                    }`}
                  >
                    <span className="font-mono font-bold text-brand-cyan flex-shrink-0">
                      M{sc.moduleId}.{sc.scenarioNumber}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="font-bold truncate">{sc.title}</div>
                      <div className="text-[10px] text-slate-400 font-mono truncate">{sc.threatCategory}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right 2 Columns: Scenario Control & Presentation Deck */}
          <div className="lg:col-span-2 space-y-5">
            
            <div className="p-6 rounded-2xl bg-gov-surface border border-gov-border space-y-4 shadow-elevated">
              
              {/* Active Scenario Title & Metadata */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gov-border">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-brand-goldLight font-bold">
                    <span>MODULE {currentScenario.moduleId}: {currentScenario.moduleTitle}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mt-0.5">
                    {currentScenario.title}
                  </h3>
                </div>

                <button
                  onClick={() => loadScenario(currentScenario.id)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-glow-green flex items-center gap-1.5 flex-shrink-0"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Launch Live Simulation</span>
                </button>
              </div>

              {/* Situation Summary */}
              <div className="p-4 rounded-xl bg-gov-card border border-gov-border text-xs sm:text-sm text-slate-200 leading-relaxed">
                <span className="font-bold text-brand-cyan">Classroom Briefing: </span>
                {currentScenario.situation.contextText}
              </div>

              {/* Trainer Presentation Action Bar */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={isAnswerRevealed ? hideAnswer : revealAnswer}
                  className={`px-4 py-2 rounded-xl font-mono text-xs font-bold border transition-all flex items-center gap-1.5 ${
                    isAnswerRevealed
                      ? 'bg-amber-500 text-black border-amber-400 shadow-glow-gold'
                      : 'bg-gov-card hover:bg-slate-700 text-amber-300 border-amber-500/40'
                  }`}
                >
                  {isAnswerRevealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  <span>{isAnswerRevealed ? 'Hide Answer' : 'Reveal Model Decision'}</span>
                </button>

                <button
                  onClick={toggleExplanation}
                  className="px-4 py-2 rounded-xl bg-gov-card hover:bg-slate-700 text-brand-cyan border border-brand-cyan/40 text-xs font-bold font-mono flex items-center gap-1.5 transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>{isExplanationVisible ? 'Hide Facilitator Guide' : 'Show Facilitator Guide'}</span>
                </button>
              </div>

              {/* Revealed Answer Box */}
              {isAnswerRevealed && correctAnswer && (
                <div className="p-4 rounded-xl bg-emerald-950/30 border-2 border-emerald-500 text-emerald-200 space-y-2 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2 font-mono font-bold text-xs text-emerald-400 uppercase">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Correct Administrative Response:</span>
                  </div>
                  <div className="text-sm font-bold text-white">
                    Option {correctAnswer.label}: {correctAnswer.text}
                  </div>
                  <div className="text-xs text-slate-300 leading-relaxed">
                    {correctAnswer.feedbackWhy}
                  </div>
                </div>
              )}

              {/* Trainer Discussion Notes */}
              {isExplanationVisible && (
                <div className="p-4 rounded-xl bg-blue-950/30 border border-brand-cyan/40 text-slate-200 space-y-2 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2 font-mono font-bold text-xs text-brand-cyan uppercase">
                    <MessageSquare className="w-4 h-4" />
                    <span>Facilitator Discussion Point:</span>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed">
                    {trainerNote}
                  </p>
                  <div className="text-xs font-semibold text-brand-goldLight pt-1">
                    Golden Rule: {currentScenario.goldenRule}
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>
      )}

      {/* TAB 2: COHORT ANALYTICS & STATS */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          
          {/* 3 Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-gov-surface border border-gov-border">
              <div className="text-xs font-mono text-slate-400 uppercase flex items-center justify-between">
                <span>Total Trained Officers</span>
                <Users className="w-4 h-4 text-brand-cyan" />
              </div>
              <div className="text-3xl font-black text-white font-mono mt-1">
                {DEFAULT_COHORT_STATS.totalParticipants} <span className="text-sm text-slate-400 font-normal">Personnel</span>
              </div>
              <div className="text-[11px] text-emerald-400 font-mono mt-1">Khordha Sub-Collectorate Cohort</div>
            </div>

            <div className="p-5 rounded-2xl bg-gov-surface border border-gov-border">
              <div className="text-xs font-mono text-slate-400 uppercase flex items-center justify-between">
                <span>Cohort Average Score</span>
                <TrendingUp className="w-4 h-4 text-brand-goldLight" />
              </div>
              <div className="text-3xl font-black text-brand-goldLight font-mono mt-1">
                {DEFAULT_COHORT_STATS.averageScore}% <span className="text-sm text-slate-400 font-normal">Avg</span>
              </div>
              <div className="text-[11px] text-slate-400 font-mono mt-1">Target Threshold: 70%</div>
            </div>

            <div className="p-5 rounded-2xl bg-gov-surface border border-gov-border">
              <div className="text-xs font-mono text-slate-400 uppercase flex items-center justify-between">
                <span>Program Completion Rate</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-3xl font-black text-emerald-400 font-mono mt-1">
                {DEFAULT_COHORT_STATS.completionRate}%
              </div>
              <div className="text-[11px] text-slate-400 font-mono mt-1">45 of 48 finished all 5 modules</div>
            </div>
          </div>

          {/* Role Performance Table */}
          <div className="p-6 rounded-2xl bg-gov-surface border border-gov-border space-y-4">
            <h3 className="text-base font-bold text-white font-mono">
              Operational Role-Wise Assessment Breakdown
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead className="border-b border-gov-border text-slate-400 font-mono uppercase text-[10px]">
                  <tr>
                    <th className="py-2.5 px-3">Operational Role</th>
                    <th className="py-2.5 px-3">Avg Score</th>
                    <th className="py-2.5 px-3">Common Failure Vector</th>
                    <th className="py-2.5 px-3">Risk Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gov-border/60">
                  {DEFAULT_COHORT_STATS.rolePerformance.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gov-card/50 transition-colors">
                      <td className="py-3 px-3 font-bold text-white">{row.role}</td>
                      <td className="py-3 px-3 font-mono text-brand-goldLight font-bold">{row.avgScore}%</td>
                      <td className="py-3 px-3 text-slate-300">{row.commonMistake}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                          row.riskStatus.includes('High') ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                          row.riskStatus.includes('Moderate') ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                          'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}>
                          {row.riskStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Highest Risk Scenarios Table */}
          <div className="p-6 rounded-2xl bg-gov-surface border border-gov-border space-y-4">
            <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              Highest-Risk Scenarios (Requiring Retraining Focus)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DEFAULT_COHORT_STATS.highestRiskScenarios.map((sc, i) => (
                <div key={i} className="p-4 rounded-xl bg-gov-card border border-red-500/30 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">{sc.title}</span>
                    <span className="font-mono text-red-400 font-black">{sc.failureRate}% Fail Rate</span>
                  </div>
                  <div className="text-[11px] text-brand-cyan font-mono">{sc.module}</div>
                  <p className="text-xs text-slate-300 leading-relaxed">{sc.corePitfall}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Admin Config Modal */}
      <ConfigModal isOpen={showConfigModal} onClose={() => setShowConfigModal(false)} />

    </div>
  );
};
