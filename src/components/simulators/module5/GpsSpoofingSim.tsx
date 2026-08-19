import React, { useState } from 'react';
import { Scenario } from '../../../types';
import { useTraining } from '../../../context/TrainingContext';
import { 
  Navigation, 
  MapPin, 
  AlertTriangle, 
  ShieldAlert, 
  Compass, 
  Radio, 
  CheckCircle2, 
  XCircle,
  HelpCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

export const GpsSpoofingSim: React.FC<{ scenario: Scenario }> = ({ scenario }) => {
  const { makeDecision } = useTraining();
  const [inspectingTelemetry, setInspectingTelemetry] = useState(false);

  const mock = scenario.situation.mockData || {};

  return (
    <div className="space-y-6">
      
      {/* Interactive Map & Telemetry Discrepancy Stage */}
      <div className="rounded-2xl bg-gov-dark border border-gov-border p-5 sm:p-6 shadow-2xl space-y-5">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gov-border">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-cyan-400" />
            <span className="text-sm font-bold text-white font-mono">GNSS Telemetry &amp; Location Integrity Monitor</span>
          </div>
          <button
            onClick={() => setInspectingTelemetry(!inspectingTelemetry)}
            className="text-xs font-mono text-cyan-300 hover:text-white px-2.5 py-1 rounded bg-gov-surface border border-gov-border"
          >
            {inspectingTelemetry ? 'Hide Sensor Diagnostic' : 'Inspect Raw GNSS Telemetry'}
          </button>
        </div>

        {/* Location Comparison Map View */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Ground Reality vs Sensor Mismatch */}
          <div className="p-4 rounded-xl bg-gov-surface border border-gov-border space-y-3">
            <div className="text-xs font-bold text-white uppercase font-mono flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              Physical Ground Control Station
            </div>
            <div className="p-3 rounded-lg bg-gov-card text-xs font-mono space-y-1">
              <div className="text-emerald-400 font-bold">Physical Landmark: Boundary Pillar #8 (Khordha Zone A)</div>
              <div className="text-slate-300">Expected Coordinates: 20.1824° N, 85.6219° E</div>
              <div className="text-slate-400">Ground Benchmark Status: VERIFIED PHYSICAL STONE MARKER</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-red-950/20 border-2 border-red-500/50 space-y-3 shadow-glow-red">
            <div className="flex items-center justify-between text-xs font-bold text-red-400 uppercase font-mono">
              <span className="flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-red-400 animate-pulse" />
                Tablet GPS Sensor Telemetry
              </span>
              <span className="bg-red-500/20 text-red-300 px-2 py-0.5 rounded text-[10px]">
                42 KM ANOMALY!
              </span>
            </div>
            <div className="p-3 rounded-lg bg-black/70 border border-red-500/40 text-xs font-mono space-y-1">
              <div className="text-red-300 font-bold">Reported: District Border Zone D</div>
              <div className="text-slate-300">Reported Coordinates: 20.5401° N, 86.1042° E</div>
              <div className="text-amber-300">Offset: 42.6 km away from physical surveyor location</div>
            </div>
          </div>

        </div>

        {/* Diagnostic Raw Feed Inspector */}
        {inspectingTelemetry && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="p-3.5 rounded-xl bg-black/80 border border-cyan-500/40 text-xs font-mono text-slate-300 space-y-1"
          >
            <div className="text-cyan-400 font-bold">--- ANDROID LOCATION PROVIDER DIAGNOSTIC ---</div>
            <div className="text-red-400">LocationProvider.isFromMockProvider(): TRUE (Mock Locations App Enabled in Dev Settings)</div>
            <div>NMEA Satellites in View: 0 (Simulated coordinates fed by background fake GPS APK)</div>
            <div className="text-amber-300">Warning: Recording these coordinates will corrupt the official land survey record database.</div>
          </motion.div>
        )}

      </div>

      {/* Decision Options Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-mono uppercase font-bold text-brand-cyan tracking-wider flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" />
            What is your decision?
          </h3>
          <span className="text-xs text-slate-400">How do you resolve the location discrepancy?</span>
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
