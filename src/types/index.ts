export type RiskLevel = 'low' | 'moderate' | 'high' | 'critical';

export type RoleId = 
  | 'executive'
  | 'revenue'
  | 'admin_files'
  | 'front_desk'
  | 'field_ops'
  | 'all';

export interface OperationalRole {
  id: RoleId;
  title: string;
  shortTitle: string;
  targetOfficers: string;
  iconName: string;
  description: string;
  threatCategories: string[];
  estimatedDuration: string;
  difficulty: 'Basic' | 'Intermediate' | 'Advanced' | 'Comprehensive';
  moduleId: number;
  badgeId: string;
  color: string;
}

export type ScenarioType =
  | 'email_phishing'
  | 'out_of_band'
  | 'deepfake_vishing'
  | 'dsc_security'
  | 'revenue_portal'
  | 'session_lock'
  | 'audit_trail'
  | 'credential_hygiene'
  | 'file_quarantine'
  | 'file_explorer'
  | 'usb_perimeter'
  | 'social_engineering'
  | 'domain_inspector'
  | 'clean_desk'
  | 'field_survey'
  | 'lost_device'
  | 'gps_spoofing'
  | 'incident_lifecycle';

export interface ScenarioOption {
  id: string;
  label: string;
  text: string;
  isCorrect: boolean;
  isDangerous?: boolean;
  feedbackTitle: string;
  feedbackWhy: string;
  feedbackTakeaway: string;
  riskImpact: RiskLevel;
}

export interface Scenario {
  id: string;
  moduleId: number;
  moduleTitle: string;
  roleId: RoleId;
  scenarioNumber: number;
  totalScenariosInModule: number;
  title: string;
  subtitle?: string;
  threatCategory: string;
  difficulty: 'Basic' | 'Intermediate' | 'Advanced';
  learningObjective: string;
  type: ScenarioType;
  situation: {
    contextText: string;
    senderInfo?: {
      name: string;
      email?: string;
      phone?: string;
      designation?: string;
      avatar?: string;
    };
    mockData?: Record<string, any>;
  };
  options: ScenarioOption[];
  hints: string[];
  goldenRule: string;
  badgeRewardId?: string;
  mentorPrompt?: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  category: string;
  color: string;
}

export interface DecisionRecord {
  scenarioId: string;
  optionId: string;
  isCorrect: boolean;
  isDangerous?: boolean;
  pointsEarned: number;
  hintsUsed: number;
  timestamp: number;
}

export type AppView = 
  | 'landing'
  | 'role_select'
  | 'dashboard'
  | 'simulation'
  | 'master_challenge'
  | 'results'
  | 'certificate'
  | 'trainer';

export interface CharacterDialogue {
  character: 'The Officer' | 'The Clerk' | 'The DEO' | 'The Surveyor' | 'The Cyber Guide';
  roleTitle: string;
  mood: 'neutral' | 'happy' | 'alarmed' | 'thinking' | 'proud';
  message: string;
}

export interface TrainerConfig {
  orgName: string;
  trainingTitle: string;
  trainerName: string;
  trainerTitle: string;
  participantName: string;
  passingScore: number;
  championScore: number;
  soundEnabled: boolean;
}

export interface TrainerCohortStats {
  totalParticipants: number;
  averageScore: number;
  completionRate: number;
  rolePerformance: Array<{
    role: string;
    avgScore: number;
    commonMistake: string;
    riskStatus: string;
  }>;
  highestRiskScenarios: Array<{
    title: string;
    module: string;
    failureRate: number;
    corePitfall: string;
  }>;
}
