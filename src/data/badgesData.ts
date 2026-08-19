import { Badge } from '../types';

export const BADGES_DATA: Badge[] = [
  {
    id: 'phishing_spotter',
    title: 'Phishing Spotter',
    description: 'Expertly identified deceptive government domain spoofs, forged sender display names, and disguised malicious attachments.',
    iconName: 'ShieldCheck',
    category: 'Email & Domain Defense',
    color: 'text-cyan-400 border-cyan-500/50 bg-cyan-500/10'
  },
  {
    id: 'verification_champion',
    title: 'Verification Champion',
    description: 'Refused to act on manufactured urgency and successfully executed independent Out-of-Band (OOB) administrative verification.',
    iconName: 'PhoneCall',
    category: 'Executive Verification',
    color: 'text-amber-400 border-amber-500/50 bg-amber-500/10'
  },
  {
    id: 'file_guardian',
    title: 'File Guardian',
    description: 'Unmasked double extension traps (.pdf.exe), blocked dangerous scripts (.vbs), and quarantined macro-enabled office files.',
    iconName: 'FileLock2',
    category: 'Attachment Security',
    color: 'text-emerald-400 border-emerald-500/50 bg-emerald-500/10'
  },
  {
    id: 'session_defender',
    title: 'Session Defender',
    description: 'Strictly enforced physical workstation locking (Win+L), unseated unattended DSC tokens, and maintained credential hygiene.',
    iconName: 'LockKeyhole',
    category: 'Workstation & Portal Security',
    color: 'text-indigo-400 border-indigo-500/50 bg-indigo-500/10'
  },
  {
    id: 'field_guardian',
    title: 'Field Guardian',
    description: 'Prevented public Wi-Fi eavesdropping on survey tablets, identified GPS anomalies, and triggered prompt emergency lost-device SOPs.',
    iconName: 'Radio',
    category: 'Mobile & Survey Security',
    color: 'text-blue-400 border-blue-500/50 bg-blue-500/10'
  },
  {
    id: 'cyber_smart_officer',
    title: 'Cyber-Smart Officer',
    description: 'Mastered all 5 Sub-Collectorate operational modules and triaged multi-threat incidents during the 5-Minute Master Office Challenge.',
    iconName: 'Award',
    category: 'Sub-Collectorate Master',
    color: 'text-yellow-400 border-yellow-500/50 bg-yellow-500/20'
  }
];
