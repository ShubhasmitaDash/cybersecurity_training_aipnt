import React, { useState, useEffect } from 'react';
import { Scenario } from '../../../types';
import { useTraining } from '../../../context/TrainingContext';
import { 
  PhoneIncoming, 
  PhoneOff, 
  Mic, 
  Volume2, 
  AlertTriangle, 
  ShieldAlert, 
  CheckSquare, 
  Square,
  Activity,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';

export const DeepfakeVishingSim: React.FC<{ scenario: Scenario }> = ({ scenario }) => {
  const { makeDecision } = useTraining();
  const [isPlayingAudio, setIsPlayingAudio] = useState(true);
  const [selectedFlags, setSelectedFlags] = useState<string[]>([]);
  const [revealedAnalysis, setRevealedAnalysis] = useState(false);

  const mock = scenario.situation.mockData || {};
  const transcript = String(mock.transcript || '');
  const redFlagsList = (mock.redFlags as Array<{ id: string; text: string; isFlag: boolean }>) || [];

  const toggleFlag = (id: string) => {
    setSelectedFlags(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Mock Voice Call Terminal */}
      <div className="rounded-2xl bg-gov-dark border border-gov-border shadow-2xl p-5 sm:p-6 overflow-hidden relative">
        
        {/* Top Call Status Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-gov-border">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider">
              Active Inbound Voice Call (Simulated)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400">Audio Codec: AI_SYNTH_WAV</span>
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className="p-1.5 rounded-lg bg-gov-surface border border-gov-border text-brand-cyan hover:bg-gov-card text-xs font-mono flex items-center gap-1"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>{isPlayingAudio ? 'Waveform Active' : 'Waveform Paused'}</span>
            </button>
          </div>
        </div>

        {/* Center: Animated Caller Avatar & Waveform */}
        <div className="py-6 flex flex-col items-center justify-center text-center space-y-4">
          
          {/* Animated Caller ID Card */}
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-700 to-indigo-900 border-2 border-brand-cyan/60 flex items-center justify-center text-white shadow-glow-cyan">
              <PhoneIncoming className="w-9 h-9 text-brand-cyan animate-pulse" />
            </div>
            <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-red-600 text-[10px] font-mono font-bold text-white shadow-md">
              SPOOFED
            </div>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-black text-white">
              Revenue Divisional Commissioner (RDC)
            </h3>
            <p className="text-xs font-mono text-amber-300">
              Caller ID: 0674-239XXXX (Spoofed Official Landline)
            </p>
            <p className="text-[11px] text-slate-400 font-mono mt-0.5">
              Source: High-Fidelity Generative Voice Synthesis
            </p>
          </div>

          {/* Animated Audio Waveform */}
          <div className="flex items-center gap-1.5 h-10 px-4 py-1.5 rounded-xl bg-gov-surface/90 border border-gov-border">
            <Activity className="w-4 h-4 text-brand-cyan mr-1 animate-pulse" />
            {[16, 28, 12, 36, 24, 40, 18, 30, 22, 38, 14, 32, 20, 34, 12, 26].map((h, i) => (
              <div
                key={i}
                className="w-1 bg-brand-cyan rounded-full transition-all duration-150"
                style={{
                  height: isPlayingAudio ? `${h}px` : '4px',
                  opacity: isPlayingAudio ? 0.9 : 0.3
                }}
              />
            ))}
          </div>

        </div>

        {/* Live Subtitle Transcript */}
        <div className="p-4 rounded-xl bg-gov-surface border border-gov-border">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Mic className="w-3.5 h-3.5 text-red-400 animate-pulse" />
            <span>Simulated Call Audio Live Transcript</span>
          </div>
          <p className="text-sm sm:text-base text-slate-100 italic leading-relaxed">
            {transcript}
          </p>
        </div>

        {/* Interactive Red Flag Identification Panel */}
        <div className="mt-5 p-4 rounded-xl bg-gov-card border border-gov-border space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-xs font-mono font-bold text-brand-goldLight uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              <span>Identify the Red Flags in this Voice Call (Check all that apply):</span>
            </div>
            <span className="text-xs font-mono text-slate-400">
              {selectedFlags.length} flagged
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {redFlagsList.map((rf) => {
              const isChecked = selectedFlags.includes(rf.id);
              return (
                <button
                  key={rf.id}
                  onClick={() => toggleFlag(rf.id)}
                  className={`text-left p-3 rounded-lg border text-xs font-medium flex items-center gap-2.5 transition-all ${
                    isChecked
                      ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                      : 'bg-gov-surface hover:bg-slate-700/50 border-gov-border text-slate-300'
                  }`}
                >
                  {isChecked ? (
                    <CheckSquare className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  )}
                  <span>{rf.text}</span>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Decision Options Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-mono uppercase font-bold text-brand-cyan tracking-wider flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" />
            What is your decision?
          </h3>
          <span className="text-xs text-slate-400">How do you respond to the caller?</span>
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
