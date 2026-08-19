import React, { useState } from 'react';
import { Scenario } from '../../../types';
import { useTraining } from '../../../context/TrainingContext';
import { 
  PhoneCall, 
  MessageSquare, 
  BookOpen, 
  UserCheck, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  ShieldCheck,
  PauseCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const OutOfBandSim: React.FC<{ scenario: Scenario }> = ({ scenario }) => {
  const { makeDecision } = useTraining();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [verificationResult, setVerificationResult] = useState<'success' | 'failed' | null>(null);

  const channels = [
    {
      id: 'ch_govt_directory',
      title: 'Official District Telephone Directory (Printed / Intranet)',
      type: 'Independent Out-of-Band Channel',
      description: 'Call ADM office on the officially gazetted Collectorate EPABX Intercom line.',
      isIndependent: true,
      resultText: 'VERIFIED (OOB Success): ADM answers on official landline and confirms no emergency WhatsApp message was issued. Attack stopped!'
    },
    {
      id: 'ch_walk_in',
      title: 'Physical Walk-in to ADM Chamber (Chamber #104)',
      type: 'Direct Physical Out-of-Band Channel',
      description: 'Walk 30 paces down the executive corridor to speak with the ADM directly.',
      isIndependent: true,
      resultText: 'VERIFIED (OOB Success): In-person confirmation completely eliminates digital spoofing and voice cloning vectors!'
    },
    {
      id: 'ch_whatsapp_reply',
      title: 'Reply on the Incoming WhatsApp Chat',
      type: 'In-Band Attacker Channel',
      description: 'Ask "Sir, is this really you?" on the same chat that sent the urgent request.',
      isIndependent: false,
      resultText: 'VERIFICATION FAILED (In-Band Trap): The attacker replies: "Yes, I am in a meeting, transfer the code immediately!"'
    },
    {
      id: 'ch_whatsapp_call',
      title: 'Call Back the WhatsApp Audio Number',
      type: 'In-Band Attacker Channel',
      description: 'Call the mobile number attached to the unverified WhatsApp profile.',
      isIndependent: false,
      resultText: 'VERIFICATION FAILED (In-Band Trap): The scammer or an AI voice bot answers and verbally confirms the fraudulent request.'
    }
  ];

  const handleChannelSelect = (chId: string) => {
    setSelectedChannel(chId);
    const ch = channels.find(c => c.id === chId);
    if (ch?.isIndependent) {
      setVerificationResult('success');
    } else {
      setVerificationResult('failed');
    }
  };

  const handleCompleteDecision = () => {
    if (verificationResult === 'success') {
      makeDecision('opt_1'); // Correct independent option
    } else {
      makeDecision('opt_2'); // In-band failure option
    }
  };

  return (
    <div className="space-y-6">
      
      {/* 3-Step Progress Indicator */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        <div className={`p-3 rounded-xl border text-center transition-all ${
          currentStep === 1 
            ? 'bg-gov-surface border-brand-cyan shadow-glow-cyan text-brand-cyan' 
            : currentStep > 1 
            ? 'bg-gov-card border-emerald-500/50 text-emerald-400' 
            : 'bg-gov-dark border-gov-border text-slate-500'
        }`}>
          <div className="text-[10px] font-mono uppercase tracking-wider font-bold">Step 1</div>
          <div className="text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 mt-0.5">
            <MessageSquare className="w-4 h-4" />
            <span>RECEIVE</span>
          </div>
        </div>

        <div className={`p-3 rounded-xl border text-center transition-all ${
          currentStep === 2 
            ? 'bg-gov-surface border-amber-500 shadow-glow-gold text-brand-goldLight' 
            : currentStep > 2 
            ? 'bg-gov-card border-emerald-500/50 text-emerald-400' 
            : 'bg-gov-dark border-gov-border text-slate-500'
        }`}>
          <div className="text-[10px] font-mono uppercase tracking-wider font-bold">Step 2</div>
          <div className="text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 mt-0.5">
            <PauseCircle className="w-4 h-4" />
            <span>PAUSE & ISOLATE</span>
          </div>
        </div>

        <div className={`p-3 rounded-xl border text-center transition-all ${
          currentStep === 3 
            ? 'bg-gov-surface border-brand-cyan shadow-glow-cyan text-brand-cyan' 
            : 'bg-gov-dark border-gov-border text-slate-500'
        }`}>
          <div className="text-[10px] font-mono uppercase tracking-wider font-bold">Step 3</div>
          <div className="text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 mt-0.5">
            <ShieldCheck className="w-4 h-4" />
            <span>VERIFY OUT-OF-BAND</span>
          </div>
        </div>
      </div>

      {/* Dynamic Step Content */}
      <div className="rounded-2xl bg-gov-dark border border-gov-border p-6 shadow-2xl min-h-[340px] flex flex-col justify-between">
        
        {/* STEP 1: RECEIVE */}
        {currentStep === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              <span>Incoming Unverified Request Detected</span>
            </div>

            {/* Mock WhatsApp Chat Box */}
            <div className="max-w-md mx-auto rounded-2xl bg-[#0b141b] border border-slate-700 p-4 shadow-xl space-y-3 font-sans">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                  ADM
                </div>
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-1.5">
                    ADM (Revenue & Protocol)
                    <span className="text-[10px] bg-slate-700 px-1.5 py-0.5 rounded text-slate-300">Unsaved Contact</span>
                  </div>
                  <div className="text-xs text-slate-400 font-mono">+91 94399 00000 • Online</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#005c4b]/40 border border-[#005c4b] text-slate-100 text-xs sm:text-sm leading-relaxed">
                🚨 <span className="font-bold text-amber-300">EMERGENCY PROTOCOL DIRECTIVE:</span>
                <p className="mt-1">
                  Urgent: State VIP convoy has arrived unexpectedly. Transfer emergency administrative fuel token sanction <span className="font-mono font-bold text-cyan-300">#9921</span> immediately. 
                </p>
                <p className="mt-1 text-slate-300 text-xs italic">
                  Do not put in file flow now. Confirm directly back on this WhatsApp chat.
                </p>
                <div className="mt-2 text-right text-[10px] text-slate-400 font-mono">09:22 AM</div>
              </div>
            </div>

            <div className="pt-2 flex justify-center">
              <button
                onClick={() => setCurrentStep(2)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-royal text-white font-bold text-sm transition-all shadow-glow-cyan"
              >
                <span>Proceed to Step 2: Pause & Evaluate</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 2: PAUSE */}
        {currentStep === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-brand-goldLight text-xs font-mono font-bold">
                <PauseCircle className="w-4 h-4" />
                <span>MANDATORY CYBER DEFENSE PAUSE</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                What should you do BEFORE taking any operational action?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                The sender created urgency and requested a bypass of normal procedures. What is the fundamental rule when unexpected urgency strikes?
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto">
              <div className="p-4 rounded-xl bg-gov-surface border border-red-500/30 text-xs text-slate-300 space-y-1">
                <div className="text-red-400 font-bold font-mono">❌ DO NOT:</div>
                <div>• Reply to the same message</div>
                <div>• Call the sender\'s WhatsApp number</div>
                <div>• Act on blind trust of display photos</div>
              </div>

              <div className="p-4 rounded-xl bg-gov-surface border border-emerald-500/30 text-xs text-slate-300 space-y-1">
                <div className="text-emerald-400 font-bold font-mono">✓ MUST DO:</div>
                <div>• Stop and isolate the request</div>
                <div>• Step OUTSIDE the incoming channel</div>
                <div>• Choose an independent official medium</div>
              </div>
            </div>

            <div className="pt-2 flex justify-center">
              <button
                onClick={() => setCurrentStep(3)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all shadow-glow-green"
              >
                <span>Proceed to Step 3: Choose Verification Channel</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: VERIFY OUT-OF-BAND */}
        {currentStep === 3 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-1 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-brand-cyan" />
                Select Your Verification Channel
              </h3>
              <p className="text-xs text-slate-400">
                Choose the channel you will use to verify the ADM\'s alleged emergency directive:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {channels.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => handleChannelSelect(ch.id)}
                  className={`text-left p-4 rounded-xl border transition-all ${
                    selectedChannel === ch.id
                      ? ch.isIndependent
                        ? 'bg-emerald-950/40 border-emerald-500 shadow-glow-green'
                        : 'bg-red-950/40 border-red-500 shadow-glow-red'
                      : 'bg-gov-surface hover:bg-gov-card border-gov-border hover:border-brand-cyan/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                      ch.isIndependent 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                        : 'bg-red-500/20 text-red-300 border border-red-500/30'
                    }`}>
                      {ch.type}
                    </span>
                    {selectedChannel === ch.id && (
                      ch.isIndependent 
                        ? <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        : <XCircle className="w-4 h-4 text-red-400" />
                    )}
                  </div>
                  <div className="text-sm font-bold text-white mb-1">{ch.title}</div>
                  <div className="text-xs text-slate-400 leading-relaxed">{ch.description}</div>
                </button>
              ))}
            </div>

            {/* Animated Feedback Box */}
            <AnimatePresence>
              {selectedChannel && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl border ${
                    verificationResult === 'success'
                      ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-200'
                      : 'bg-red-500/15 border-red-500/50 text-red-200'
                  }`}
                >
                  <div className="flex items-center gap-2 font-mono font-bold text-sm mb-1">
                    {verificationResult === 'success' ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        <span>OUT-OF-BAND VERIFICATION SUCCESSFUL</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-red-400" />
                        <span>VERIFICATION FAILED — ATTACK CHANNEL RE-USED</span>
                      </>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed">
                    {channels.find(c => c.id === selectedChannel)?.resultText}
                  </p>

                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={handleCompleteDecision}
                      className={`px-5 py-2 rounded-xl text-xs font-bold font-mono transition-all ${
                        verificationResult === 'success'
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-glow-green'
                          : 'bg-red-600 hover:bg-red-500 text-white shadow-glow-red'
                      }`}
                    >
                      Lock in Decision & Record Result →
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </div>
  );
};
