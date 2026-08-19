import React from 'react';
import { useTraining } from '../../context/TrainingContext';
import { useTrainer } from '../../context/TrainerContext';
import { OPERATIONAL_ROLES } from '../../data/rolesData';
import { 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Lock, 
  Database, 
  FileCheck2, 
  Users, 
  MapPin, 
  Flame, 
  Presentation,
  CheckCircle,
  HelpCircle,
  AlertTriangle,
  Award
} from 'lucide-react';
import { motion } from 'framer-motion';

export const LandingPage: React.FC = () => {
  const { setView, selectRole } = useTraining();
  const { toggleTrainerMode } = useTrainer();

  const iconMap: Record<string, React.ElementType> = {
    ShieldAlert: ShieldCheck,
    Database: Database,
    FileCheck2: FileCheck2,
    Users: Users,
    MapPin: MapPin
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col justify-between space-y-16 pb-16">
      
      {/* Hero Section */}
      <section className="relative pt-8 sm:pt-14 overflow-hidden">
        
        {/* Subtle Cyber Grid Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          
          {/* Top Platform & Security Partner Pill */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gov-surface/90 border border-brand-cyan/40 shadow-glow-cyan text-xs font-mono text-slate-200"
          >
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-brand-cyan font-bold">AI PNT</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300">Official Cybersecurity Training Platform</span>
          </motion.div>

          {/* Main Title & Tagline */}
          <div className="space-y-3">
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white font-sans"
            >
              Cyber-Smart <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">Sub-Collectorate</span>
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl sm:text-2xl font-black text-brand-goldLight tracking-wide font-sans uppercase"
            >
              “Think. Verify. Protect.”
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="text-sm sm:text-base font-medium text-cyan-300 font-mono"
            >
              Interactive Cybersecurity Simulation &amp; Awareness Training Platform
            </motion.p>
          </div>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-sans"
          >
            Practice the realistic decisions that protect government information, official correspondence, citizen land records, and administrative workflows in the Sub-Collectorate.
          </motion.p>

          {/* Primary Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <button
              onClick={() => setView('role_select')}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-brand-blue to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white font-black text-base shadow-glow-cyan transition-all transform hover:-translate-y-0.5 flex items-center gap-3"
            >
              <span>START TRAINING</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => selectRole('all')}
              className="px-6 py-4 rounded-2xl bg-gov-surface hover:bg-gov-card border border-brand-cyan/40 text-slate-100 font-bold text-sm transition-all hover:border-brand-cyan flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-brand-goldLight" />
              <span>PLAY ALL MODULES (Full Course)</span>
            </button>

            <button
              onClick={() => setView('master_challenge')}
              className="px-6 py-4 rounded-2xl bg-gov-surface hover:bg-red-950/40 border border-red-500/40 text-red-300 hover:text-red-200 font-bold text-sm transition-all hover:border-red-500 flex items-center gap-2"
            >
              <Flame className="w-4 h-4 text-red-400" />
              <span>5-MIN OFFICE CHALLENGE</span>
            </button>
          </motion.div>

        </div>
      </section>

      {/* 5 Operational Role Modules Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="text-center space-y-2">
          <div className="text-xs font-mono uppercase font-bold text-brand-cyan tracking-wider">
            Role-Based Serious Game Architecture
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Select Your Administrative Operational Role
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto">
            Each role faces tailored cyber risk simulations encountered in daily revenue, magisterial, and intake operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {OPERATIONAL_ROLES.map((role, idx) => {
            const Icon = iconMap[role.iconName] || ShieldCheck;
            return (
              <motion.div
                key={role.id}
                whileHover={{ y: -4 }}
                className="p-6 rounded-2xl bg-gov-surface/90 border border-gov-border hover:border-brand-cyan/60 shadow-elevated transition-all flex flex-col justify-between space-y-4 group cursor-pointer"
                onClick={() => selectRole(role.id)}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="p-3 rounded-xl bg-gov-card border border-gov-border text-brand-cyan group-hover:text-white group-hover:bg-brand-blue transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-gov-card text-brand-goldLight border border-gov-border">
                      Module {idx + 1}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {role.title}
                    </h3>
                    <p className="text-xs text-brand-goldLight font-medium">
                      {role.targetOfficers}
                    </p>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {role.description}
                  </p>

                  {/* Threat Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {role.threatCategories.slice(0, 3).map((threat, i) => (
                      <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-gov-card text-slate-300 border border-gov-border/60">
                        {threat}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-gov-border flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">{role.estimatedDuration}</span>
                  <span className="text-cyan-400 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Start Role →
                  </span>
                </div>
              </motion.div>
            );
          })}

          {/* Master Office Challenge Card */}
          <motion.div
            whileHover={{ y: -4 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-red-950/40 via-gov-surface to-gov-surface border-2 border-red-500/40 hover:border-red-500 shadow-glow-red transition-all flex flex-col justify-between space-y-4 group cursor-pointer"
            onClick={() => setView('master_challenge')}
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-400">
                  <Flame className="w-6 h-6 animate-pulse" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/40">
                  Final Challenge
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-red-300 transition-colors">
                  The Cyber-Smart Office Challenge
                </h3>
                <p className="text-xs text-red-400 font-medium">
                  5-Minute Multi-Incident Sub-Collectorate Triage
                </p>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Enter a live simulated Sub-Collectorate office experiencing 5 concurrent cyber emergencies. Prioritize, isolate, and neutralize all threats!
              </p>
            </div>

            <div className="pt-3 border-t border-red-500/30 flex items-center justify-between text-xs font-mono">
              <span className="text-red-400 font-bold">5 Minutes</span>
              <span className="text-red-300 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                Launch Office Challenge →
              </span>
            </div>
          </motion.div>

        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-gov-surface border border-gov-border space-y-6">
          <div className="text-center space-y-1">
            <div className="text-xs font-mono uppercase font-bold text-brand-goldLight tracking-wider">
              Simulation-First Learning Loop
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              How the Interactive Simulation Works
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 text-center">
            <div className="p-4 rounded-xl bg-gov-card border border-gov-border space-y-2">
              <div className="w-8 h-8 rounded-full bg-brand-blue/30 text-brand-cyan font-bold font-mono text-sm flex items-center justify-center mx-auto">1</div>
              <div className="text-xs font-bold text-white">SEE</div>
              <p className="text-[11px] text-slate-400">Encounter realistic urgent email, phone call, USB, or portal discrepancy.</p>
            </div>

            <div className="p-4 rounded-xl bg-gov-card border border-gov-border space-y-2">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-brand-goldLight font-bold font-mono text-sm flex items-center justify-center mx-auto">2</div>
              <div className="text-xs font-bold text-white">THINK</div>
              <p className="text-[11px] text-slate-400">Pause. Inspect domains, file extensions, and timestamps.</p>
            </div>

            <div className="p-4 rounded-xl bg-gov-card border border-gov-border space-y-2">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-300 font-bold font-mono text-sm flex items-center justify-center mx-auto">3</div>
              <div className="text-xs font-bold text-white">DECIDE</div>
              <p className="text-[11px] text-slate-400">Choose your operational decision (OOB verify, lock workstation, etc.).</p>
            </div>

            <div className="p-4 rounded-xl bg-gov-card border border-gov-border space-y-2">
              <div className="w-8 h-8 rounded-full bg-red-500/20 text-red-300 font-bold font-mono text-sm flex items-center justify-center mx-auto">4</div>
              <div className="text-xs font-bold text-white">CONSEQUENCE</div>
              <p className="text-[11px] text-slate-400">Experience immediate feedback, risk meter surge, and points update.</p>
            </div>

            <div className="p-4 rounded-xl bg-gov-card border border-gov-border space-y-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 font-bold font-mono text-sm flex items-center justify-center mx-auto">5</div>
              <div className="text-xs font-bold text-white">LEARN</div>
              <p className="text-[11px] text-slate-400">Absorb the 3-layer explanation and golden administrative rule.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
