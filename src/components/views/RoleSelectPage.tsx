import React from 'react';
import { useTraining } from '../../context/TrainingContext';
import { OPERATIONAL_ROLES } from '../../data/rolesData';
import { RoleId } from '../../types';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Database, 
  FileCheck2, 
  Users, 
  MapPin, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  Flame,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';

export const RoleSelectPage: React.FC = () => {
  const { selectRole, setView, completedModules } = useTraining();

  const iconMap: Record<string, React.ElementType> = {
    ShieldAlert: ShieldAlert,
    Database: Database,
    FileCheck2: FileCheck2,
    Users: Users,
    MapPin: MapPin
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/20 text-brand-cyan border border-brand-cyan/30 text-xs font-mono font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Operational Role Selection</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white">
          Choose Your Sub-Collectorate Training Role
        </h2>
        <p className="text-sm text-slate-300">
          Select your operational profile to practice role-specific cyber threat simulations, or train across all 5 operational roles in succession.
        </p>
      </div>

      {/* Play All Modules Banner */}
      <div className="max-w-4xl mx-auto p-5 rounded-2xl bg-gradient-to-r from-brand-blue/30 via-gov-surface to-brand-royal/20 border-2 border-brand-cyan/50 shadow-glow-cyan flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="px-2 py-0.5 rounded bg-brand-gold text-slate-900 font-mono font-bold text-[10px] uppercase">
              Comprehensive Certification
            </span>
            <span className="text-white font-black text-lg">PLAY ALL 5 OPERATIONAL MODULES</span>
          </div>
          <p className="text-xs text-slate-300">
            Train through Executive, Revenue, File Flow, Front Desk, and Field Security sequentially (Full Course: 18 Scenarios + Master Challenge).
          </p>
        </div>

        <button
          onClick={() => selectRole('all')}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-glow-green transition-all flex items-center gap-2 flex-shrink-0"
        >
          <span>Start Full Program</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 5 Individual Role Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {OPERATIONAL_ROLES.map((role, idx) => {
          const Icon = iconMap[role.iconName] || ShieldCheck;
          const isDone = completedModules.includes(role.moduleId);

          return (
            <motion.div
              key={role.id}
              whileHover={{ y: -4 }}
              className={`p-6 rounded-2xl bg-gov-surface border transition-all flex flex-col justify-between space-y-4 cursor-pointer shadow-elevated ${
                isDone 
                  ? 'border-emerald-500/50 bg-emerald-950/10' 
                  : 'border-gov-border hover:border-brand-cyan/70'
              }`}
              onClick={() => selectRole(role.id)}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="p-3 rounded-xl bg-gov-card border border-gov-border text-brand-cyan">
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {isDone && (
                      <span className="flex items-center gap-1 text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/40">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" /> COMPLETED
                      </span>
                    )}
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-gov-card text-brand-goldLight border border-gov-border">
                      CARD {idx + 1}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white">
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
                <div className="space-y-1 pt-1">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Core Threat Vectors:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {role.threatCategories.map((threat, i) => (
                      <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-gov-card text-slate-300 border border-gov-border/60">
                        {threat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-gov-border flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-1 text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{role.estimatedDuration}</span>
                </div>

                <span className="text-brand-cyan font-bold flex items-center gap-1">
                  Enter Module →
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

    </div>
  );
};
