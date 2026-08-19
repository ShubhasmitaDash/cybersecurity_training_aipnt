import React from 'react';
import { RoleId } from '../../types';
import { Bot, UserCheck, Shield, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface CharacterMentorProps {
  roleId?: RoleId;
  mood?: 'neutral' | 'happy' | 'alarmed' | 'thinking' | 'proud';
  customMessage?: string;
  goldenRule?: string;
}

export const CharacterMentor: React.FC<CharacterMentorProps> = ({
  roleId,
  mood = 'neutral',
  customMessage,
  goldenRule
}) => {
  const getCharacterDetails = () => {
    switch (roleId) {
      case 'executive':
        return {
          name: 'The Executive Advisor',
          role: 'SDM / Executive Office Mentor',
          avatarBg: 'bg-blue-600',
          badgeText: 'Executive Security',
          defaultMsg: 'Remember: Real authority respects verification. Never rush a critical approval because of an urgent email or WhatsApp message.'
        };
      case 'revenue':
        return {
          name: 'The Revenue Registrar',
          role: 'Land Records Integrity Mentor',
          avatarBg: 'bg-emerald-600',
          badgeText: 'Revenue Portal',
          defaultMsg: 'A 2-minute tea break is all it takes for an unattended session to be hijacked. Always press Win + L before leaving your chair.'
        };
      case 'admin_files':
        return {
          name: 'The Section Supervisor',
          role: 'Head Clerk & File Flow Mentor',
          avatarBg: 'bg-amber-600',
          badgeText: 'File Defense',
          defaultMsg: 'Don\'t trust file icons! Always inspect the true trailing extension. Files like .pdf.exe and .docm can deliver ransomware.'
        };
      case 'front_desk':
        return {
          name: 'The Intake Specialist',
          role: 'DEO & Citizen Counter Mentor',
          avatarBg: 'bg-purple-600',
          badgeText: 'Front Desk',
          defaultMsg: 'Social engineering exploits emotions and name-dropping. Standard verification protects everyone equally.'
        };
      case 'field_ops':
        return {
          name: 'The Field Lead',
          role: 'Surveyor & Mobile Security Mentor',
          avatarBg: 'bg-cyan-600',
          badgeText: 'Field Operations',
          defaultMsg: 'Public Wi-Fi in market zones is unencrypted. Store your survey data offline and sync only on encrypted government APNs.'
        };
      default:
        return {
          name: 'The Cyber Guide',
          role: 'Sub-Collectorate Cyber Mentor',
          avatarBg: 'bg-indigo-600',
          badgeText: 'Cyber-Smart Mentor',
          defaultMsg: 'Think. Verify. Protect. Make your decision carefully based on administrative defense principles.'
        };
    }
  };

  const char = getCharacterDetails();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 rounded-2xl bg-gov-surface/95 border border-brand-cyan/30 shadow-elevated relative overflow-hidden"
    >
      {/* Background cyber accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/5 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-start gap-3.5">
        {/* Mentor Avatar */}
        <div className="relative flex-shrink-0">
          <div className={`w-12 h-12 rounded-2xl ${char.avatarBg} flex items-center justify-center text-white shadow-md border border-white/20`}>
            {roleId ? <UserCheck className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
          </div>
          <div className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-gov-surface">
            <div className={`w-3.5 h-3.5 rounded-full ${
              mood === 'alarmed' ? 'bg-red-500 animate-ping' : mood === 'happy' ? 'bg-emerald-400' : 'bg-cyan-400'
            }`} />
          </div>
        </div>

        {/* Message Bubble */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="font-bold text-sm text-white tracking-tight">{char.name}</span>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-brand-blue/30 text-brand-cyan border border-brand-cyan/20">
              {char.badgeText}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {customMessage || char.defaultMsg}
          </p>

          {goldenRule && (
            <div className="mt-2 pt-2 border-t border-gov-border/60 flex items-center gap-1.5 text-xs text-brand-goldLight font-medium">
              <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{goldenRule}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
