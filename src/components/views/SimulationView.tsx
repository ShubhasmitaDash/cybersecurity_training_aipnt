import React from 'react';
import { useTraining } from '../../context/TrainingContext';
import { ALL_SCENARIOS, getScenariosForRole } from '../../data/scenarios';
import { 
  ChevronLeft, 
  ChevronRight, 
  LayoutDashboard, 
  ShieldAlert, 
  Target, 
  Clock, 
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { CharacterMentor } from '../common/CharacterMentor';
import { HintDrawer } from '../common/HintDrawer';
import { FeedbackModal } from '../common/FeedbackModal';

// Import All 16 Simulators
import { EmailPhishingSim } from '../simulators/module1/EmailPhishingSim';
import { OutOfBandSim } from '../simulators/module1/OutOfBandSim';
import { DeepfakeVishingSim } from '../simulators/module1/DeepfakeVishingSim';
import { DscSecuritySim } from '../simulators/module1/DscSecuritySim';

import { RevenuePortalSim } from '../simulators/module2/RevenuePortalSim';
import { SessionLockSim } from '../simulators/module2/SessionLockSim';
import { AuditTrailSim } from '../simulators/module2/AuditTrailSim';
import { CredentialHygieneSim } from '../simulators/module2/CredentialHygieneSim';

import { FileQuarantineGame } from '../simulators/module3/FileQuarantineGame';
import { FileExplorerSim } from '../simulators/module3/FileExplorerSim';
import { UsbPerimeterSim } from '../simulators/module3/UsbPerimeterSim';

import { SocialEngineeringCounterSim } from '../simulators/module4/SocialEngineeringCounterSim';
import { DomainInspectorSim } from '../simulators/module4/DomainInspectorSim';
import { CleanDeskMiniGame } from '../simulators/module4/CleanDeskMiniGame';

import { FieldMapSurveySim } from '../simulators/module5/FieldMapSurveySim';
import { LostDeviceCountdownSim } from '../simulators/module5/LostDeviceCountdownSim';
import { GpsSpoofingSim } from '../simulators/module5/GpsSpoofingSim';
import { IncidentLifecycleSim } from '../simulators/module5/IncidentLifecycleSim';

export const SimulationView: React.FC = () => {
  const { 
    currentScenario, 
    activeRole, 
    setView, 
    nextScenario, 
    previousScenario, 
    completedScenarios 
  } = useTraining();

  if (!currentScenario) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h3 className="text-xl font-bold text-white">No Scenario Loaded</h3>
        <button
          onClick={() => setView('dashboard')}
          className="px-6 py-2.5 rounded-xl bg-brand-blue text-white font-bold text-sm"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const roleScenarios = activeRole ? getScenariosForRole(activeRole) : ALL_SCENARIOS;
  const currentIndex = roleScenarios.findIndex(s => s.id === currentScenario.id);
  const isDone = completedScenarios.includes(currentScenario.id);

  const renderSimulator = () => {
    switch (currentScenario.type) {
      case 'email_phishing':
        return <EmailPhishingSim scenario={currentScenario} />;
      case 'out_of_band':
        return <OutOfBandSim scenario={currentScenario} />;
      case 'deepfake_vishing':
        return <DeepfakeVishingSim scenario={currentScenario} />;
      case 'dsc_security':
        return <DscSecuritySim scenario={currentScenario} />;
      case 'revenue_portal':
        return <RevenuePortalSim scenario={currentScenario} />;
      case 'session_lock':
        return <SessionLockSim scenario={currentScenario} />;
      case 'audit_trail':
        return <AuditTrailSim scenario={currentScenario} />;
      case 'credential_hygiene':
        return <CredentialHygieneSim scenario={currentScenario} />;
      case 'file_quarantine':
        return <FileQuarantineGame scenario={currentScenario} />;
      case 'file_explorer':
        return <FileExplorerSim scenario={currentScenario} />;
      case 'usb_perimeter':
        return <UsbPerimeterSim scenario={currentScenario} />;
      case 'social_engineering':
        return <SocialEngineeringCounterSim scenario={currentScenario} />;
      case 'domain_inspector':
        return <DomainInspectorSim scenario={currentScenario} />;
      case 'clean_desk':
        return <CleanDeskMiniGame scenario={currentScenario} />;
      case 'field_survey':
        return <FieldMapSurveySim scenario={currentScenario} />;
      case 'lost_device':
        return <LostDeviceCountdownSim scenario={currentScenario} />;
      case 'gps_spoofing':
        return <GpsSpoofingSim scenario={currentScenario} />;
      case 'incident_lifecycle':
        return <IncidentLifecycleSim scenario={currentScenario} />;
      default:
        return <EmailPhishingSim scenario={currentScenario} />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top Breadcrumbs & Nav Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gov-border">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono">
            <button
              onClick={() => setView('dashboard')}
              className="text-slate-400 hover:text-brand-cyan flex items-center gap-1 transition-colors"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>
            <span className="text-slate-600">/</span>
            <span className="text-brand-goldLight font-bold uppercase">
              MODULE {currentScenario.moduleId} / 5: {currentScenario.moduleTitle}
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-cyan-400 font-bold">
              Scenario {currentIndex + 1} of {roleScenarios.length}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {currentScenario.title}
          </h2>
          {currentScenario.subtitle && (
            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              {currentScenario.subtitle}
            </p>
          )}
        </div>

        {/* Previous / Next Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={previousScenario}
            disabled={currentIndex === 0}
            className="p-2 rounded-xl bg-gov-surface hover:bg-gov-card border border-gov-border text-slate-300 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            title="Previous Scenario"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={nextScenario}
            disabled={currentIndex === roleScenarios.length - 1}
            className="p-2 rounded-xl bg-gov-surface hover:bg-gov-card border border-gov-border text-slate-300 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            title="Next Scenario"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Simulation Container Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        {/* Left 3 Columns: Active Interactive Simulator */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Situation Context Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gov-surface border border-gov-border space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-brand-cyan uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4" />
              <span>Situation Description:</span>
            </div>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans">
              {currentScenario.situation.contextText}
            </p>
          </div>

          {/* Mount the Specific Dynamic Simulator Component */}
          {renderSimulator()}

        </div>

        {/* Right Column: Character Mentor & Clues Drawer */}
        <div className="space-y-6">
          <CharacterMentor 
            roleId={currentScenario.roleId} 
            goldenRule={currentScenario.goldenRule}
          />

          <HintDrawer hints={currentScenario.hints} />

          {/* Learning Objective Card */}
          <div className="p-4 rounded-2xl bg-gov-surface border border-gov-border space-y-2 text-xs">
            <div className="flex items-center gap-1.5 text-brand-goldLight font-mono font-bold uppercase tracking-wider">
              <Target className="w-4 h-4" />
              <span>Training Objective</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              {currentScenario.learningObjective}
            </p>
          </div>
        </div>

      </div>

      {/* 3-Layer Feedback Modal Popup when decision is made */}
      <FeedbackModal />

    </div>
  );
};
