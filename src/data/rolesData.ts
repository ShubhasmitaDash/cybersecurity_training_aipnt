import { OperationalRole } from '../types';

export const OPERATIONAL_ROLES: OperationalRole[] = [
  {
    id: 'executive',
    title: 'Executive Office',
    shortTitle: 'SDM / Executive',
    targetOfficers: 'Sub-Collector / SDM / Executive Officer',
    iconName: 'ShieldAlert',
    description: 'Protect executive authority, withstand targeted spear phishing, identify AI deepfake vishing, and safeguard Digital Signature Certificate (DSC) cryptographic tokens.',
    threatCategories: ['Authority Exploitation', 'Spear Phishing', 'Deepfake Vishing', 'DSC Token Theft', 'Urgency Traps'],
    estimatedDuration: '15-20 mins',
    difficulty: 'Advanced',
    moduleId: 1,
    badgeId: 'verification_champion',
    color: 'from-blue-600 to-indigo-800'
  },
  {
    id: 'revenue',
    title: 'Revenue Operations',
    shortTitle: 'Revenue / Sub-Registrar',
    targetOfficers: 'Revenue Officers / Sub-Registrars',
    iconName: 'Database',
    description: 'Defend Bhulekh land records and e-Registration portals against credential compromise, enforce mandatory session locking (Win+L), and inspect audit trail anomalies.',
    threatCategories: ['Land Record Tampering', 'Credential Theft', 'Session Hijacking', 'Audit Trail Gaps', 'Configuration Drift'],
    estimatedDuration: '15-20 mins',
    difficulty: 'Intermediate',
    moduleId: 2,
    badgeId: 'session_defender',
    color: 'from-emerald-600 to-teal-800'
  },
  {
    id: 'admin_files',
    title: 'Administrative File Flow',
    shortTitle: 'Section Officer / Head Clerk',
    targetOfficers: 'Section Officers / Head Clerks',
    iconName: 'FileCheck2',
    description: 'Filter malicious incoming correspondence, unmask disguised double extensions (.pdf.exe), neutralize macro-enabled documents, and regulate guest USB drives.',
    threatCategories: ['Double Extensions (.exe)', 'Macro Malware (.docm)', 'VBScript Payloads', 'Untrusted USB Media', 'e-Despatch Phishing'],
    estimatedDuration: '15-20 mins',
    difficulty: 'Intermediate',
    moduleId: 3,
    badgeId: 'file_guardian',
    color: 'from-amber-600 to-yellow-800'
  },
  {
    id: 'front_desk',
    title: 'Citizen Services & Data Entry',
    shortTitle: 'DEO / Dealing Assistant',
    targetOfficers: 'Data Entry Operators (DEOs) / Dealing Clerks',
    iconName: 'Users',
    description: 'Resist citizen-counter social engineering, detect lookalike spoofed government portals (.com/.org spoofs), maintain clean desks, and eliminate sticky-note passwords.',
    threatCategories: ['Social Engineering', 'Intake Counter Manipulation', 'Spoofed Portals (.gov vs .com)', 'Clean Desk Breaches', 'Scanner Exploits'],
    estimatedDuration: '15-20 mins',
    difficulty: 'Basic',
    moduleId: 4,
    badgeId: 'phishing_spotter',
    color: 'from-purple-600 to-indigo-900'
  },
  {
    id: 'field_ops',
    title: 'Field Operations & Surveys',
    shortTitle: 'Field Surveyor / Amin',
    targetOfficers: 'Revenue Field Officers / Field Surveyors / Amins',
    iconName: 'MapPin',
    description: 'Safeguard mobile tablets during land surveys, avoid rogue public Wi-Fi networks, execute emergency lost-device containment SOPs, and detect GPS spoofing.',
    threatCategories: ['Public Wi-Fi Interception', 'Lost/Stolen Tablets', 'GPS Spoofing', 'Mobile Sync Tampering', 'Incident Reporting Delay'],
    estimatedDuration: '15-20 mins',
    difficulty: 'Intermediate',
    moduleId: 5,
    badgeId: 'field_guardian',
    color: 'from-cyan-600 to-blue-900'
  }
];
