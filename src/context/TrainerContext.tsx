import React, { createContext, useContext, useState, useEffect } from 'react';
import { TrainerConfig } from '../types';
import { sounds } from '../utils/soundEffects';

interface TrainerContextType {
  isTrainerMode: boolean;
  isPresentationMode: boolean;
  trainerConfig: TrainerConfig;
  activeTrainerScenarioId: string;
  isAnswerRevealed: boolean;
  isExplanationVisible: boolean;
  
  // Actions
  toggleTrainerMode: () => void;
  setTrainerMode: (active: boolean) => void;
  togglePresentationMode: () => void;
  setPresentationMode: (active: boolean) => void;
  updateConfig: (newConfig: Partial<TrainerConfig>) => void;
  setTrainerScenarioId: (id: string) => void;
  revealAnswer: () => void;
  hideAnswer: () => void;
  toggleExplanation: () => void;
  resetScenarioState: () => void;
}

const TRAINER_STORAGE_KEY = 'cyber_smart_trainer_config_v1';

const DEFAULT_CONFIG: TrainerConfig = {
  orgName: 'Sub-Collectorate Office, Khordha',
  trainingTitle: 'Cyber-Smart Administration: Securing the Sub-Collectorate',
  trainerName: 'District Cyber Trainer / DIO',
  trainerTitle: 'District Informatics Officer & Cybersecurity Lead',
  participantName: 'Shri / Smt. Administrative Officer',
  passingScore: 70,
  championScore: 90,
  soundEnabled: true
};

const TrainerContext = createContext<TrainerContextType | undefined>(undefined);

export const TrainerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isTrainerMode, setIsTrainerMode] = useState<boolean>(false);
  const [isPresentationMode, setIsPresentationMode] = useState<boolean>(false);
  
  const [trainerConfig, setTrainerConfig] = useState<TrainerConfig>(() => {
    const saved = localStorage.getItem(TRAINER_STORAGE_KEY);
    return saved ? { ...DEFAULT_CONFIG, ...JSON.parse(saved) } : DEFAULT_CONFIG;
  });

  const [activeTrainerScenarioId, setActiveTrainerScenarioId] = useState<string>('m1_s1_urgent_email');
  const [isAnswerRevealed, setIsAnswerRevealed] = useState<boolean>(false);
  const [isExplanationVisible, setIsExplanationVisible] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem(TRAINER_STORAGE_KEY, JSON.stringify(trainerConfig));
  }, [trainerConfig]);

  const toggleTrainerMode = () => {
    sounds.playClick();
    setIsTrainerMode(prev => !prev);
  };

  const setTrainerMode = (active: boolean) => {
    sounds.playClick();
    setIsTrainerMode(active);
  };

  const togglePresentationMode = () => {
    sounds.playClick();
    setIsPresentationMode(prev => !prev);
  };

  const setPresentationMode = (active: boolean) => {
    setIsPresentationMode(active);
  };

  const updateConfig = (newConfig: Partial<TrainerConfig>) => {
    sounds.playSuccess();
    setTrainerConfig(prev => ({ ...prev, ...newConfig }));
  };

  const setTrainerScenarioId = (id: string) => {
    sounds.playClick();
    setActiveTrainerScenarioId(id);
    setIsAnswerRevealed(false);
    setIsExplanationVisible(false);
  };

  const revealAnswer = () => {
    sounds.playAlert();
    setIsAnswerRevealed(true);
  };

  const hideAnswer = () => {
    sounds.playClick();
    setIsAnswerRevealed(false);
  };

  const toggleExplanation = () => {
    sounds.playClick();
    setIsExplanationVisible(prev => !prev);
  };

  const resetScenarioState = () => {
    sounds.playClick();
    setIsAnswerRevealed(false);
    setIsExplanationVisible(false);
  };

  return (
    <TrainerContext.Provider
      value={{
        isTrainerMode,
        isPresentationMode,
        trainerConfig,
        activeTrainerScenarioId,
        isAnswerRevealed,
        isExplanationVisible,
        toggleTrainerMode,
        setTrainerMode,
        togglePresentationMode,
        setPresentationMode,
        updateConfig,
        setTrainerScenarioId,
        revealAnswer,
        hideAnswer,
        toggleExplanation,
        resetScenarioState
      }}
    >
      {children}
    </TrainerContext.Provider>
  );
};

export const useTrainer = () => {
  const context = useContext(TrainerContext);
  if (!context) {
    throw new Error('useTrainer must be used within a TrainerProvider');
  }
  return context;
};
