import React, { useState } from 'react';
import { Scenario } from '../../../types';
import { useTraining } from '../../../context/TrainingContext';
import { 
  Database, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  User, 
  ShieldAlert,
  FileText,
  Lock
} from 'lucide-react';
import { motion } from 'framer-motion';

export const RevenuePortalSim: React.FC<{ scenario: Scenario }> = ({ scenario }) => {
  const { makeDecision } = useTraining();
  const [activeTab, setActiveTab] = useState<'khatian' | 'mutation' | 'audit'>('mutation');

  const mock = scenario.situation.mockData || {};
  const pendingMutation = (mock.pendingMutation as Record<string, string>) || {};

  return (
    <div className="space-y-6">
      
      {/* Mock e-Revenue Secure Portal Container */}
      <div className="rounded-2xl bg-gov-dark border border-gov-border shadow-2xl overflow-hidden">
        
        {/* Portal Top Bar */}
        <div className="bg-gradient-to-r from-emerald-950 via-gov-surface to-gov-dark px-4 sm:px-6 py-3 border-b border-emerald-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-white tracking-wide">e-Revenue Secure</span>
                <span className="text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/40">
                  SIMULATION DATA
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                State Land Records & Mutation Management Subsystem (Khordha Division)
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Authenticated: Sub-Registrar / RO</span>
          </div>
        </div>

        {/* Portal Navigation Tabs */}
        <div className="bg-gov-surface/90 px-6 pt-2 border-b border-gov-border flex gap-4 text-xs font-bold font-mono">
          <button
            onClick={() => setActiveTab('mutation')}
            className={`pb-2.5 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'mutation'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Pending Mutations ({String(mock.recordId || 'KH-TRN-2048')})</span>
          </button>

          <button
            onClick={() => setActiveTab('khatian')}
            className={`pb-2.5 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'khatian'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Khatian Record Details</span>
          </button>
        </div>

        {/* Portal Body Content */}
        <div className="p-5 sm:p-6 space-y-4">
          
          {activeTab === 'mutation' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              
              {/* Anomaly Highlight Box */}
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/40 text-xs sm:text-sm text-slate-200 space-y-2">
                <div className="flex items-center justify-between text-amber-400 font-bold font-mono">
                  <span className="flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    SUSPICIOUS MUTATION TRANSACTION FLAGGED
                  </span>
                  <span className="text-xs bg-red-500/20 text-red-300 px-2 py-0.5 rounded border border-red-500/30">
                    NON-GOV IP ORIGIN
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono pt-1">
                  <div>Record ID: <span className="text-white font-bold">{String(mock.recordId || 'KH-TRN-2048')}</span></div>
                  <div>Plot / Area: <span className="text-white font-bold">{String(mock.plotNo || 'TRAINING-102 (0.450 Ac)')}</span></div>
                  <div>Registered Owner: <span className="text-white font-bold">{String(mock.registeredOwner || 'Training Citizen')}</span></div>
                  <div>Request Time: <span className="text-red-400 font-bold">{pendingMutation.timestamp}</span></div>
                  <div>Origin IP: <span className="text-red-400 font-bold">{pendingMutation.sessionIp}</span></div>
                  <div>Proposed Re-zoning: <span className="text-amber-300 font-bold">{pendingMutation.requestType}</span></div>
                </div>
              </div>

              {/* Physical Deed Comparison Card */}
              <div className="p-4 rounded-xl bg-gov-surface border border-gov-border space-y-2 text-xs sm:text-sm">
                <div className="font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-brand-cyan" />
                  Physical Document Verification vs Digital Portal Entry
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-gov-card border border-gov-border">
                    <div className="text-slate-400 font-mono uppercase mb-1">Physical Registered Deed</div>
                    <div className="text-slate-200">Deed #KH-DEED-2024-912: Agricultural Land (Paddy-II). No commercial re-zoning request present in original deed.</div>
                  </div>
                  <div className="p-3 rounded-lg bg-red-950/30 border border-red-500/30">
                    <div className="text-red-400 font-mono uppercase mb-1">Unauthorized Digital Entry</div>
                    <div className="text-slate-200">Re-classification to Prime Commercial Zone submitted at 11:48 PM without field surveyor inspection docket.</div>
                  </div>
                </div>
              </div>

            </motion.div>
          )}

          {activeTab === 'khatian' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-gov-surface border border-gov-border space-y-2">
                <div className="font-bold text-white">Khata No: {String(mock.khatiyanNo || '412/9')} (District Khordha)</div>
                <div className="text-slate-300">Tenant: Training Citizen • Father: Late Training Elder</div>
                <div className="text-slate-300">Revenue Assessment: Rs. 140.00 / Annum</div>
                <div className="text-slate-400 text-xs italic">Authentic State Archive Hash: SHA256-VALID-8921B</div>
              </div>
            </motion.div>
          )}

        </div>
      </div>

      {/* Decision Options Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-mono uppercase font-bold text-brand-cyan tracking-wider flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" />
            What is your decision?
          </h3>
          <span className="text-xs text-slate-400">Select the safest administrative action</span>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {scenario.options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => makeDecision(opt.id)}
              className="text-left p-4 rounded-xl bg-gov-surface hover:bg-gov-card border border-gov-border hover:border-brand-cyan/70 text-slate-200 hover:text-white transition-all glass-card-hover group flex items-start gap-3.5"
            >
              <span className="w-7 h-7 rounded-lg bg-gov-card group-hover:bg-brand-blue border border-gov-border group-hover:border-brand-cyan flex items-center justify-center font-mono font-bold text-xs text-brand-cyan group-hover:text-white flex-shrink-0 transition-colors">
                {opt.label}
              </span>
              <div className="flex-1 text-xs sm:text-sm font-medium leading-relaxed">
                {opt.text}
              </div>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
