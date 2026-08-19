import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  RoleId, 
  AppView, 
  Scenario, 
  DecisionRecord, 
  RiskLevel, 
  ScenarioOption 
} from '../types';
import { 
  ALL_SCENARIOS, 
  getScenariosForRole, 
  getScenarioById, 
  getNextScenario, 
  getPreviousScenario 
} from '../data/scenarios';
import { BADGES_DATA } from '../data/badgesData';
import { sounds } from '../utils/soundEffects';

interface TrainingContextType {
  activeRole: RoleId | null;
  currentView: AppView;
  currentScenario: Scenario | null;
  score: number;
  maxScore: number;
  riskLevel: RiskLevel;
  decisionsHistory: DecisionRecord[];
  completedScenarios: string[];
  completedModules: number[];
  unlockedBadges: string[];
  participantName: string;
  hintsUsedForCurrent: number;
  activeFeedback: { option: ScenarioOption; scenario: Scenario } | null;
  
  // Actions
  selectRole: (roleId: RoleId) => void;
  setView: (view: AppView) => void;
  loadScenario: (scenarioId: string) => void;
  makeDecision: (optionId: string) => void;
  useHint: () => number;
  dismissFeedback: () => void;
  resetTraining: () => void;
  setParticipantName: (name: string) => void;
  nextScenario: () => void;
  previousScenario: () => void;
  completeMasterChallenge: (scoreEarned: number) => void;
}

const STORAGE_KEY = 'cyber_smart_training_state_v1';

const TrainingContext = createContext<TrainingContextType | undefined>(undefined);

export const TrainingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeRole, setActiveRole] = useState<RoleId | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved).activeRole : null;
  });

  const [currentView, setCurrentView] = useState<AppView>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved).currentView : 'landing';
  });

  const [currentScenarioId, setCurrentScenarioId] = useState<string | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved).currentScenarioId : null;
  });

  const [score, setScore] = useState<number>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved).score : 0;
  });

  const [riskLevel, setRiskLevel] = useState<RiskLevel>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved).riskLevel : 'low';
  });

  const [decisionsHistory, setDecisionsHistory] = useState<DecisionRecord[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved).decisionsHistory : [];
  });

  const [completedScenarios, setCompletedScenarios] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved).completedScenarios : [];
  });

  const [completedModules, setCompletedModules] = useState<number[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved).completedModules : [];
  });

  const [unlockedBadges, setUnlockedBadges] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved).unlockedBadges : [];
  });

  const [participantName, setParticipantName] = useState<string>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved).participantName : 'Officer / Staff Member';
  });

  const [hintsUsedForCurrent, setHintsUsedForCurrent] = useState<number>(0);
  const [activeFeedback, setActiveFeedback] = useState<{ option: ScenarioOption; scenario: Scenario } | null>(null);

  // Save to localStorage
  useEffect(() => {
    const stateToSave = {
      activeRole,
      currentView,
      currentScenarioId,
      score,
      riskLevel,
      decisionsHistory,
      completedScenarios,
      completedModules,
      unlockedBadges,
      participantName
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
  }, [
    activeRole,
    currentView,
    currentScenarioId,
    score,
    riskLevel,
    decisionsHistory,
    completedScenarios,
    completedModules,
    unlockedBadges,
    participantName
  ]);

  const currentScenario = currentScenarioId ? getScenarioById(currentScenarioId) || null : null;
  const currentRoleScenarios = activeRole ? getScenariosForRole(activeRole) : ALL_SCENARIOS;
  const maxScore = currentRoleScenarios.length * 100 + 500; // scenarios + master challenge

  const selectRole = (roleId: RoleId) => {
    sounds.playClick();
    setActiveRole(roleId);
    const roleScenarios = getScenariosForRole(roleId);
    if (roleScenarios.length > 0) {
      setCurrentScenarioId(roleScenarios[0].id);
      setHintsUsedForCurrent(0);
      setActiveFeedback(null);
      setCurrentView('dashboard');
    }
  };

  const setView = (view: AppView) => {
    sounds.playClick();
    setCurrentView(view);
  };

  const loadScenario = (scenarioId: string) => {
    sounds.playClick();
    setCurrentScenarioId(scenarioId);
    setHintsUsedForCurrent(0);
    setActiveFeedback(null);
    setCurrentView('simulation');
  };

  const useHint = (): number => {
    sounds.playClick();
    const nextCount = Math.min(hintsUsedForCurrent + 1, 3);
    setHintsUsedForCurrent(nextCount);
    return nextCount;
  };

  const makeDecision = (optionId: string) => {
    if (!currentScenario) return;

    const selectedOption = currentScenario.options.find(o => o.id === optionId);
    if (!selectedOption) return;

    let points = 0;
    if (selectedOption.isCorrect) {
      sounds.playSuccess();
      points = hintsUsedForCurrent === 0 ? 100 : Math.max(40, 100 - hintsUsedForCurrent * 20);
      setRiskLevel(selectedOption.riskImpact);

      // Check badge unlock
      if (currentScenario.badgeRewardId && !unlockedBadges.includes(currentScenario.badgeRewardId)) {
        setUnlockedBadges(prev => [...prev, currentScenario.badgeRewardId!]);
        sounds.playBadgeUnlock();
      }

      // Mark scenario completed
      if (!completedScenarios.includes(currentScenario.id)) {
        setCompletedScenarios(prev => [...prev, currentScenario.id]);
      }

      // Check if module is complete
      const moduleScenarios = ALL_SCENARIOS.filter(s => s.moduleId === currentScenario.moduleId);
      const allModDone = moduleScenarios.every(s => s.id === currentScenario.id || completedScenarios.includes(s.id));
      if (allModDone && !completedModules.includes(currentScenario.moduleId)) {
        setCompletedModules(prev => [...prev, currentScenario.moduleId]);
      }
    } else {
      sounds.playError();
      if (selectedOption.isDangerous) {
        points = -50;
        setRiskLevel('critical');
      } else {
        points = 0;
        setRiskLevel('high');
      }
    }

    setScore(prev => Math.max(0, prev + points));

    const record: DecisionRecord = {
      scenarioId: currentScenario.id,
      optionId,
      isCorrect: selectedOption.isCorrect,
      isDangerous: selectedOption.isDangerous,
      pointsEarned: points,
      hintsUsed: hintsUsedForCurrent,
      timestamp: Date.now()
    };
    setDecisionsHistory(prev => [...prev, record]);

    // Show 3-layer feedback
    setActiveFeedback({
      option: selectedOption,
      scenario: currentScenario
    });
  };

  const dismissFeedback = () => {
    sounds.playClick();
    setActiveFeedback(null);
  };

  const nextScenario = () => {
    if (!currentScenario || !activeRole) return;
    const next = getNextScenario(currentScenario.id, activeRole);
    if (next) {
      loadScenario(next.id);
    } else {
      // Completed all role scenarios!
      sounds.playSuccess();
      setCurrentView('results');
    }
  };

  const previousScenario = () => {
    if (!currentScenario || !activeRole) return;
    const prev = getPreviousScenario(currentScenario.id, activeRole);
    if (prev) {
      loadScenario(prev.id);
    }
  };

  const completeMasterChallenge = (scoreEarned: number) => {
    setScore(prev => prev + scoreEarned);
    if (!unlockedBadges.includes('cyber_smart_officer')) {
      setUnlockedBadges(prev => [...prev, 'cyber_smart_officer']);
      sounds.playBadgeUnlock();
    }
    setCurrentView('results');
  };

  const resetTraining = () => {
    localStorage.removeItem(STORAGE_KEY);
    setActiveRole(null);
    setCurrentView('landing');
    setCurrentScenarioId(null);
    setScore(0);
    setRiskLevel('low');
    setDecisionsHistory([]);
    setCompletedScenarios([]);
    setCompletedModules([]);
    setUnlockedBadges([]);
    setHintsUsedForCurrent(0);
    setActiveFeedback(null);
  };

  return (
    <TrainingContext.Provider
      value={{
        activeRole,
        currentView,
        currentScenario,
        score,
        maxScore,
        riskLevel,
        decisionsHistory,
        completedScenarios,
        completedModules,
        unlockedBadges,
        participantName,
        hintsUsedForCurrent,
        activeFeedback,
        selectRole,
        setView,
        loadScenario,
        makeDecision,
        useHint,
        dismissFeedback,
        resetTraining,
        setParticipantName,
        nextScenario,
        previousScenario,
        completeMasterChallenge
      }}
    >
      {children}
    </TrainingContext.Provider>
  );
};

export const useTraining = () => {
  const context = useContext(TrainingContext);
  if (!context) {
    throw new Error('useTraining must be used within a TrainingProvider');
  }
  return context;
};
