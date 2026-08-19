import React from 'react';
import { RiskLevel } from '../../types';
import { Shield, AlertTriangle, Flame, ShieldAlert } from 'lucide-react';

interface RiskMeterProps {
  level: RiskLevel;
  className?: string;
  compact?: boolean;
}

export const RiskMeter: React.FC<RiskMeterProps> = ({ level, className = '', compact = false }) => {
  const getRiskConfig = (lvl: RiskLevel) => {
    switch (lvl) {
      case 'low':
        return {
          label: 'LOW RISK',
          percent: 25,
          color: 'bg-emerald-500',
          textColor: 'text-emerald-400',
          borderColor: 'border-emerald-500/40',
          glow: 'shadow-glow-green',
          icon: Shield,
          desc: 'Defensive postures intact. Systems secure.'
        };
      case 'moderate':
        return {
          label: 'MODERATE RISK',
          percent: 50,
          color: 'bg-amber-500',
          textColor: 'text-amber-400',
          borderColor: 'border-amber-500/40',
          glow: 'shadow-glow-gold',
          icon: AlertTriangle,
          desc: 'Unverified input detected. Caution advised.'
        };
      case 'high':
        return {
          label: 'HIGH RISK',
          percent: 75,
          color: 'bg-orange-500',
          textColor: 'text-orange-400',
          borderColor: 'border-orange-500/40',
          glow: 'shadow-glow-gold',
          icon: ShieldAlert,
          desc: 'Dangerous action taken. Active exposure!'
        };
      case 'critical':
        return {
          label: 'CRITICAL RISK',
          percent: 100,
          color: 'bg-red-600',
          textColor: 'text-red-400',
          borderColor: 'border-red-500/50',
          glow: 'shadow-glow-red',
          icon: Flame,
          desc: 'Severe breach triggered. Immediate containment required.'
        };
    }
  };

  const config = getRiskConfig(level);
  const Icon = config.icon;

  if (compact) {
    return (
      <div className={`flex items-center gap-2 px-2.5 py-1 rounded-full bg-gov-dark/80 border ${config.borderColor} ${className}`}>
        <Icon className={`w-3.5 h-3.5 ${config.textColor}`} />
        <span className={`text-xs font-mono font-bold ${config.textColor}`}>
          {config.label}
        </span>
        <div className="w-12 h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div 
            className={`h-full ${config.color} transition-all duration-500`} 
            style={{ width: `${config.percent}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`p-3 rounded-xl bg-gov-surface/90 border ${config.borderColor} ${config.glow} transition-all duration-300 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg bg-gov-card border ${config.borderColor}`}>
            <Icon className={`w-4 h-4 ${config.textColor}`} />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Office Risk Status</div>
            <div className={`text-xs font-bold font-mono ${config.textColor}`}>{config.label}</div>
          </div>
        </div>
        <span className="text-[11px] font-mono text-slate-400">{config.percent}% Threat Exposure</span>
      </div>

      <div className="w-full bg-slate-900/80 rounded-full h-2 overflow-hidden p-0.5 border border-slate-800">
        <div 
          className={`h-full rounded-full ${config.color} transition-all duration-500 ease-out`}
          style={{ width: `${config.percent}%` }}
        />
      </div>

      <div className="mt-1.5 text-[11px] text-slate-400 leading-tight">
        {config.desc}
      </div>
    </div>
  );
};
