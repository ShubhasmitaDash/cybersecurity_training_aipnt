import React from 'react';
import { TrainingProvider, useTraining } from './context/TrainingContext';
import { TrainerProvider, useTrainer } from './context/TrainerContext';

// Common Components
import { Header } from './components/common/Header';
import { SafetyBanner } from './components/common/SafetyBanner';

// Views
import { LandingPage } from './components/views/LandingPage';
import { RoleSelectPage } from './components/views/RoleSelectPage';
import { DashboardPage } from './components/views/DashboardPage';
import { SimulationView } from './components/views/SimulationView';
import { MasterChallenge } from './components/views/MasterChallenge';
import { ResultsPage } from './components/views/ResultsPage';
import { CertificatePage } from './components/views/CertificatePage';
import { TrainerDashboard } from './components/views/TrainerDashboard';

const MainContent: React.FC = () => {
  const { currentView } = useTraining();
  const { isTrainerMode } = useTrainer();

  const renderCurrentView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage />;
      case 'role_select':
        return <RoleSelectPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'simulation':
        return <SimulationView />;
      case 'master_challenge':
        return <MasterChallenge />;
      case 'results':
        return <ResultsPage />;
      case 'certificate':
        return <CertificatePage />;
      case 'trainer':
        return <TrainerDashboard />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gov-navy text-slate-100 font-sans selection:bg-brand-cyan selection:text-black">
      <div>
        <Header />
        <SafetyBanner />
        <main className="w-full">
          {renderCurrentView()}
        </main>
      </div>

      {/* Footer */}
      <footer className="no-print border-t border-gov-border/80 bg-gov-dark/95 py-6 px-4 sm:px-6 lg:px-8 mt-12 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img 
              src="/branding/aipnt-logo.png" 
              alt="AI PNT Platform" 
              className="h-7 w-auto object-contain bg-white/90 p-0.5 rounded" 
            />
            <div>
              <span className="font-bold text-white">Cyber-Smart Sub-Collectorate</span>
              <span className="text-slate-500 mx-2">•</span>
              <span>Platform by <strong className="text-brand-cyan">AI PNT</strong></span>
            </div>
          </div>

          <div className="text-center md:text-right font-mono text-[11px] space-y-0.5">
            <div>Emergency Helpline: <strong className="text-brand-goldLight">1930</strong> (National Cyber Crime Reporting)</div>
            <div className="text-slate-500">Training Simulation — No real government system is connected.</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export function App() {
  return (
    <TrainerProvider>
      <TrainingProvider>
        <MainContent />
      </TrainingProvider>
    </TrainerProvider>
  );
}

export default App;
