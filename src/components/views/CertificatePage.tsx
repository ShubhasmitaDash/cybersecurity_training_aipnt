import React, { useState } from 'react';
import { useTraining } from '../../context/TrainingContext';
import { useTrainer } from '../../context/TrainerContext';
import { OPERATIONAL_ROLES } from '../../data/rolesData';
import { 
  Printer, 
  ArrowLeft, 
  ShieldCheck, 
  Award, 
  Calendar, 
  CheckCircle2, 
  Sparkles,
  Edit3
} from 'lucide-react';

export const CertificatePage: React.FC = () => {
  const { 
    score, 
    activeRole, 
    completedScenarios, 
    participantName, 
    setParticipantName, 
    setView 
  } = useTraining();

  const { trainerConfig } = useTrainer();
  const [isEditingName, setIsEditingName] = useState(false);

  const currentRoleObj = OPERATIONAL_ROLES.find(r => r.id === activeRole);
  const roleTitle = currentRoleObj ? currentRoleObj.title : 'All Sub-Collectorate Operational Tracks';

  const todayDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  const certificateId = `AIPNT-CSSC-2024-${Math.abs((score * 73) % 9000 + 1000)}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Controls Bar (Hidden during Print) */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-gov-surface border border-gov-border shadow-elevated">
        <button
          onClick={() => setView('results')}
          className="flex items-center gap-2 text-xs font-mono font-bold text-slate-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Assessment Summary</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsEditingName(!isEditingName)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gov-card hover:bg-slate-700 border border-gov-border text-xs font-medium text-slate-200 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5 text-brand-cyan" />
            <span>{isEditingName ? 'Done Editing' : 'Edit Participant Name'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white font-bold text-sm shadow-glow-cyan transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* Name Input Bar if in Edit Mode */}
      {isEditingName && (
        <div className="no-print p-4 rounded-xl bg-gov-card border border-brand-cyan/40 space-y-2">
          <label className="text-xs font-mono font-bold text-slate-200">
            Edit Participant Name for Certificate:
          </label>
          <input
            type="text"
            value={participantName}
            onChange={(e) => setParticipantName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gov-dark border border-gov-border text-white text-sm outline-none focus:border-brand-cyan"
            placeholder="e.g. Smt. Ananya Mishra, OAS (Sub-Collector & SDM)"
          />
        </div>
      )}

      {/* PRINTABLE CERTIFICATE CANVAS */}
      <div 
        id="certificate-print-area"
        className="relative bg-white text-slate-900 rounded-3xl p-8 sm:p-14 shadow-2xl border-8 border-[#002B7F] overflow-hidden select-none font-sans"
        style={{ minHeight: '620px' }}
      >
        {/* Subtle Watermark Border Motifs */}
        <div className="absolute inset-2 border-2 border-amber-600/30 rounded-2xl pointer-events-none" />
        <div className="absolute inset-4 border border-slate-300 rounded-xl pointer-events-none" />

        {/* Certificate Header: Brand Logo & Title */}
        <div className="relative z-10 flex flex-col items-center text-center space-y-4">
          
          {/* AI PNT Logo */}
          <div className="flex items-center justify-center">
            <img 
              src="/branding/aipnt-logo.png" 
              alt="AI PNT Platform" 
              className="h-16 w-auto object-contain"
            />
          </div>

          <div className="space-y-1">
            <div className="text-[11px] font-mono uppercase font-bold tracking-widest text-[#002B7F]">
              INTERACTIVE CYBERSECURITY SIMULATION &amp; DEFENSIVE TRAINING
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-[#002B7F] tracking-tight font-serif uppercase">
              Certificate of Cybersecurity Awareness
            </h1>
            <p className="text-sm font-semibold text-amber-700 tracking-wide font-mono">
              Cyber-Smart Sub-Collectorate Program • “Think. Verify. Protect.”
            </p>
          </div>

          {/* Certificate Recipient Presentation */}
          <div className="py-4 space-y-2 max-w-2xl">
            <p className="text-xs uppercase font-mono tracking-widest text-slate-500 font-bold">
              This is to certify that
            </p>
            
            <div className="text-2xl sm:text-3xl font-black text-slate-900 border-b-2 border-[#002B7F] pb-1 px-6 inline-block min-w-[320px]">
              {participantName}
            </div>

            <p className="text-xs sm:text-sm text-slate-600 pt-2 leading-relaxed">
              has successfully undergone rigorous practical cybersecurity decision-making simulations in <br />
              <strong className="text-[#002B7F] font-bold">{roleTitle}</strong> at <strong className="text-slate-800">{trainerConfig.orgName}</strong>, demonstrating competence in identifying spear phishing, executing Out-of-Band verifications, securing Digital Signature Certificates, protecting land record integrity, and countering social engineering threats.
            </p>
          </div>

          {/* Metrics Badges on Certificate */}
          <div className="grid grid-cols-3 gap-4 w-full max-w-lg py-2">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <div className="text-[10px] font-mono text-slate-500 uppercase">Assessment Score</div>
              <div className="text-lg font-black text-[#002B7F] font-mono">{score} PTS</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <div className="text-[10px] font-mono text-slate-500 uppercase">Scenarios Passed</div>
              <div className="text-lg font-black text-emerald-700 font-mono">{completedScenarios.length} / 18</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <div className="text-[10px] font-mono text-slate-500 uppercase">Security Rating</div>
              <div className="text-lg font-black text-amber-700 font-mono">CYBER-AWARE</div>
            </div>
          </div>

          {/* Signatures & Verification Meta */}
          <div className="pt-8 w-full flex items-end justify-between text-left text-xs border-t border-slate-200 mt-6">
            
            {/* Left: Date & Certificate ID */}
            <div className="space-y-1 font-mono text-[11px] text-slate-600">
              <div><strong>Issue Date:</strong> {todayDate}</div>
              <div><strong>Certificate ID:</strong> {certificateId}</div>
              <div className="text-[9px] text-slate-400">Verification Hash: AIPNT-SEC-SHA256-VERIFIED</div>
            </div>

            {/* Center: Official Seal Badge */}
            <div className="hidden sm:flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#002B7F] flex items-center justify-center text-[#002B7F] font-mono text-[9px] font-bold text-center uppercase p-1">
                CYBER-SMART VERIFIED
              </div>
            </div>

            {/* Right: Authorized Trainer Signature */}
            <div className="text-right space-y-1">
              <div className="font-serif italic text-base text-[#002B7F] font-bold">
                {trainerConfig.trainerName}
              </div>
              <div className="w-40 h-px bg-slate-400 ml-auto" />
              <div className="text-[11px] font-bold text-slate-800">
                Authorized Signatory &amp; Trainer
              </div>
              <div className="text-[10px] text-slate-500 font-mono">
                {trainerConfig.trainerTitle}
              </div>
            </div>

          </div>

          {/* Safety Footer Disclaimer */}
          <div className="pt-4 text-[9px] text-slate-400 font-mono text-center">
            Disclaimer: This certificate confirms completion of educational cybersecurity awareness simulations. All training scenarios are fictional. No real government system is connected.
          </div>

        </div>
      </div>

    </div>
  );
};
