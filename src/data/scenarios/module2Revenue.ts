import { Scenario } from '../../types';

export const MODULE_2_SCENARIOS: Scenario[] = [
  {
    id: 'm2_s1_revenue_portal',
    moduleId: 2,
    moduleTitle: 'Revenue Portals & Land Record Integrity',
    roleId: 'revenue',
    scenarioNumber: 1,
    totalScenariosInModule: 4,
    title: 'Land Record Integrity & Unauthorized Mutation Check',
    subtitle: 'e-Revenue Secure Portal Record Verification',
    threatCategory: 'Unauthorized Record Modification & Credential Theft',
    difficulty: 'Intermediate',
    learningObjective: 'Inspect digital record discrepancies against physical title deeds and identify unauthorized mutation attempts.',
    type: 'revenue_portal',
    situation: {
      contextText: 'As a Revenue Officer / Sub-Registrar, you are processing a deed transfer on the mock e-Revenue Secure portal. A citizen presents physical sale deed #KH-DEED-2024-912, but the portal entry shows an unexpected pending mutation flagged with an unverified external session ID.',
      senderInfo: {
        name: 'e-Revenue Secure System Alert',
        designation: 'Land Records Management System'
      },
      mockData: {
        recordId: 'KH-TRN-2048',
        khatiyanNo: '412/9',
        plotNo: 'TRAINING-102 (Area: 0.450 Ac)',
        registeredOwner: 'Training Citizen (Citizen ID: TC-88219)',
        pendingMutation: {
          requestType: 'Ownership Transfer & Classification Re-zoning (Agricultural to Commercial)',
          applicant: 'Unverified Third-Party Entity',
          timestamp: 'Yesterday at 23:48:12 (After office hours)',
          sessionIp: '198.51.100.44 (External Non-Gov Network)',
          approvalStatus: 'PENDING OFFICER DSC SIGN'
        }
      }
    },
    options: [
      {
        id: 'opt_1',
        label: 'A',
        text: 'Proceed to approve and sign the mutation quickly to meet weekly disposal targets.',
        isCorrect: false,
        isDangerous: true,
        feedbackTitle: 'GRAVE ERROR: Fraudulent Land Record Mutation Approved!',
        feedbackWhy: 'The mutation was logged at 23:48 from a non-government external IP address, altering land classification without survey verification.',
        feedbackTakeaway: 'Always cross-examine timestamp anomalies, IP origin, and physical title papers before approving land record mutations.',
        riskImpact: 'critical'
      },
      {
        id: 'opt_2',
        label: 'B',
        text: 'Halt the approval, freeze the digital record mutation lock, inspect system audit logs, and escalate to the Tahsildar / Sub-Collector.',
        isCorrect: true,
        isDangerous: false,
        feedbackTitle: 'INTEGRITY PROTECTED: Land Record Tampering Thwarted!',
        feedbackWhy: 'You detected the after-hours timestamp, unauthorized IP address, and unverified re-zoning request. Freezing the record prevented fraudulent title alienation.',
        feedbackTakeaway: 'Digital land records require vigilant scrutiny. Report suspicious modifications immediately through established administrative channels.',
        riskImpact: 'low'
      },
      {
        id: 'opt_3',
        label: 'C',
        text: 'Delete the record from the database directly using local browser developer tools.',
        isCorrect: false,
        isDangerous: true,
        feedbackTitle: 'INVALID: Database Tampering Attempt',
        feedbackWhy: 'Local modifications do not resolve backend audit records and corrupt investigation evidence.',
        feedbackTakeaway: 'Follow established record freeze and escalation SOPs rather than attempting ad-hoc manual interventions.',
        riskImpact: 'high'
      }
    ],
    hints: [
      'Check the timestamp of the pending mutation. Does 23:48 (11:48 PM) match standard administrative operating hours?',
      'Check the IP address. Is it from the state government network (SWAN / SDC)?',
      'What is the safest action when an anomaly in land ownership records is discovered?'
    ],
    goldenRule: 'Cross-verify digital records with physical dockets. Never approve out-of-hours or unverified land modifications.',
    badgeRewardId: 'session_defender'
  },
  {
    id: 'm2_s2_session_lock',
    moduleId: 2,
    moduleTitle: 'Revenue Portals & Land Record Integrity',
    roleId: 'revenue',
    scenarioNumber: 2,
    totalScenariosInModule: 4,
    title: 'Workstation Session Locking Challenge',
    subtitle: 'The 5-Minute Tea Break Dilemma',
    threatCategory: 'Session Hijacking & Insider Risk',
    difficulty: 'Basic',
    learningObjective: 'Master the instant workstation locking habit (Win + L) whenever leaving the seat.',
    type: 'session_lock',
    situation: {
      contextText: 'You are logged into the Revenue Registration Portal with full Sub-Registrar approval rights. The Head Clerk calls you to step into the corridor for a quick 3-minute discussion regarding court summons.',
      senderInfo: {
        name: 'Workstation Desk (Chamber 2)',
        designation: 'Revenue Officer Desk'
      },
      mockData: {
        activeApp: 'e-Revenue Portal (Authenticated Session #88319)',
        nearbyPeople: '3 Deed writers and 2 unknown visitors standing 4 feet away from the open counter',
        shortcutKey: 'Win + L'
      }
    },
    options: [
      {
        id: 'opt_1',
        label: 'A',
        text: 'Leave the portal open on screen since you will return in only 3 minutes.',
        isCorrect: false,
        isDangerous: true,
        feedbackTitle: 'VULNERABLE: Unattended Authenticated Session!',
        feedbackWhy: 'A 3-minute unattended session in a public-accessible office allows a malicious party to approve a pending deed, export citizen data, or insert malicious scripts.',
        feedbackTakeaway: 'It takes less than 15 seconds to compromise an unlocked computer in a government office.',
        riskImpact: 'critical'
      },
      {
        id: 'opt_2',
        label: 'B',
        text: 'Minimize the browser window or turn off the monitor without locking the operating system.',
        isCorrect: false,
        isDangerous: true,
        feedbackTitle: 'FALSE SECURITY: Computer Remains Fully Unlocked!',
        feedbackWhy: 'Turning off the monitor or minimizing the window leaves the operating system completely unlocked. Moving the mouse restores full access immediately.',
        feedbackTakeaway: 'Hiding a screen is not securing a session. Physical locking is mandatory.',
        riskImpact: 'high'
      },
      {
        id: 'opt_3',
        label: 'C',
        text: 'Press Win + L (or Lock Workstation), ensure password lock screen is displayed, and log out of sensitive portals if leaving for extended periods.',
        isCorrect: true,
        isDangerous: false,
        feedbackTitle: 'SECURE: Perfect Workstation Session Defense!',
        feedbackWhy: 'Pressing Win + L instantly encrypts the active desktop session behind the Windows credential barrier, preventing unauthorized physical access.',
        feedbackTakeaway: 'Golden Rule: Habitual session locking (Win + L) is the first line of defense against physical and insider compromise.',
        riskImpact: 'low'
      }
    ],
    hints: [
      'How long does an intruder need to plug in a malicious device or click "Approve"? (Only seconds!)',
      'Does turning off a monitor lock the Windows operating system?',
      'What is the universal keyboard shortcut for locking Windows?'
    ],
    goldenRule: 'Leaving your desk? Lock your workstation every single time. Shortcut: Win + L.',
    badgeRewardId: 'session_defender'
  },
  {
    id: 'm2_s3_audit_trail',
    moduleId: 2,
    moduleTitle: 'Revenue Portals & Land Record Integrity',
    roleId: 'revenue',
    scenarioNumber: 3,
    totalScenariosInModule: 4,
    title: 'Audit Trail Timeline Inspector',
    subtitle: 'Detecting Covert Administrative Privilege Drift',
    threatCategory: 'Audit Log Tampering & Privilege Escalation',
    difficulty: 'Advanced',
    learningObjective: 'Inspect system audit logs to detect abnormal configuration changes and unauthorized administrator accounts.',
    type: 'audit_trail',
    situation: {
      contextText: 'During monthly digital revenue register reconciliation, you review the automated system audit logs for Khordha Revenue Sub-Division database. Several consecutive entries over a 4-minute window appear anomalous.',
      senderInfo: {
        name: 'System Security Audit Subsystem',
        designation: 'e-Revenue Audit Log'
      },
      mockData: {
        auditLogs: [
          { id: 'log_1', time: '09:42:10', actor: 'DEO_Counter_1', event: 'Record KH-TRN-2048 opened for routine inquiry', flag: 'NORMAL' },
          { id: 'log_2', time: '09:44:18', actor: 'DEO_Counter_1', event: 'Ownership name string altered: "Govt Reserved" -> "Private Lease"', flag: 'SUSPICIOUS_UNAUTHORIZED_CHANGE' },
          { id: 'log_3', time: '09:45:02', actor: 'DEO_Counter_1', event: 'System security audit logging frequency reduced to 0', flag: 'SUSPICIOUS_CONFIG_TAMPER' },
          { id: 'log_4', time: '09:46:11', actor: 'DEO_Counter_1', event: 'New administrator role created: "sys_admin_temp" with unrestricted bypass rights', flag: 'CRITICAL_PRIVILEGE_ESCALATION' }
        ]
      }
    },
    options: [
      {
        id: 'opt_1',
        label: 'A',
        text: 'Ignore the log entries as routine IT maintenance activities performed in the background.',
        isCorrect: false,
        isDangerous: true,
        feedbackTitle: 'BREACH UNNOTICED: Privilege Escalation Overlooked!',
        feedbackWhy: 'The audit logs clearly indicate that a front-desk account was compromised or abused to alter government land classification, disable audit logging, and create a backdoor admin account.',
        feedbackTakeaway: 'Audit trails exist to catch covert tampering. Never assume suspicious administrative events are routine.',
        riskImpact: 'critical'
      },
      {
        id: 'opt_2',
        label: 'B',
        text: 'Immediately flag the events, isolate the affected terminal, revoke the "sys_admin_temp" account, restore logging, and submit an incident report to the District Informatics Officer (DIO).',
        isCorrect: true,
        isDangerous: false,
        feedbackTitle: 'MASTERFUL DETECTION: Insider Intrusion Halted!',
        feedbackWhy: 'You correctly identified the signature pattern of an account compromise: unauthorized data modification followed by disabling audit logs and creating backdoor admin credentials.',
        feedbackTakeaway: 'Audit log monitoring must verify: 1. Who performed the action, 2. Was it authorized, 3. Did it alter security configurations?',
        riskImpact: 'low'
      },
      {
        id: 'opt_3',
        label: 'C',
        text: 'Change your personal password and keep working without notifying anyone.',
        isCorrect: false,
        isDangerous: true,
        feedbackTitle: 'INADEQUATE: Systemic Threat Still Active',
        feedbackWhy: 'Changing your own password does nothing to disable the rogue "sys_admin_temp" account or restore corrupted land records.',
        feedbackTakeaway: 'Privilege escalation requires immediate containment and institutional reporting.',
        riskImpact: 'high'
      }
    ],
    hints: [
      'Should a standard DEO counter account have permissions to create new system administrators?',
      'Why would someone disable or reduce the audit logging frequency right after modifying a land record?',
      'What is the standard procedure when a backdoor account is discovered?'
    ],
    goldenRule: 'Inspect audit logs for abnormal privilege changes, unauthorized accounts, and disabled security controls.',
    badgeRewardId: 'session_defender'
  },
  {
    id: 'm2_s4_credential_hygiene',
    moduleId: 2,
    moduleTitle: 'Revenue Portals & Land Record Integrity',
    roleId: 'revenue',
    scenarioNumber: 4,
    totalScenariosInModule: 4,
    title: 'Credential Hygiene & Browser Auto-Save Traps',
    subtitle: 'Protecting High-Privilege Portal Credentials',
    threatCategory: 'Credential Harvesting & Password Hygiene',
    difficulty: 'Basic',
    learningObjective: 'Understand why browser password auto-save and shared accounts are dangerous on government workstations.',
    type: 'credential_hygiene',
    situation: {
      contextText: 'After logging into the State Land Records portal on an office computer shared during shift rotations, your web browser displays a popup: "Save password for e-Revenue Portal (Sub-Registrar)? Click Save to never type your password again."',
      senderInfo: {
        name: 'Web Browser Credential Manager',
        designation: 'Browser Password Prompt'
      },
      mockData: {
        browserPrompt: 'Save password for user "sub_registrar_khordha"?',
        workstationType: 'Shared Office Desktop (Used by 3 staff members across shifts)',
        riskFactor: 'Passwords saved in browsers can be extracted in plaintext by anyone with access or basic infostealer malware.'
      }
    },
    options: [
      {
        id: 'opt_1',
        label: 'A',
        text: 'Click "Save Password" to save time and speed up citizen queue processing.',
        isCorrect: false,
        isDangerous: true,
        feedbackTitle: 'COMPROMISED: High-Privilege Password Saved in Browser!',
        feedbackWhy: 'Browser-saved passwords on shared machines can be viewed in plaintext by anyone sitting at the desk or harvested by infostealer malware.',
        feedbackTakeaway: 'Never save official government portal credentials in browser password vaults on office PCs.',
        riskImpact: 'critical'
      },
      {
        id: 'opt_2',
        label: 'B',
        text: 'Click "Never for this site", disable browser credential saving, and memorize or use an approved organizational credential vault.',
        isCorrect: true,
        isDangerous: false,
        feedbackTitle: 'PERFECT HYGIENE: Credential Leakage Prevented!',
        feedbackWhy: 'By declining browser auto-save, you ensure that only you can authenticate into your Sub-Registrar account. Other shift operators cannot access your session.',
        feedbackTakeaway: 'Golden Rule: Government portal credentials must never be cached or shared. Individual accountability is essential.',
        riskImpact: 'low'
      },
      {
        id: 'opt_3',
        label: 'C',
        text: 'Save the password and write a note on the keyboard reminding others not to use it.',
        isCorrect: false,
        isDangerous: true,
        feedbackTitle: 'UNACCEPTABLE: Physical & Digital Exposure',
        feedbackWhy: 'Reminders do not prevent misuse or unauthorized automated extraction.',
        feedbackTakeaway: 'Rely on system controls and strict personal hygiene rather than informal trust.',
        riskImpact: 'critical'
      }
    ],
    hints: [
      'If another employee uses this desktop tomorrow, can they log into your portal if your password is saved in Chrome/Edge?',
      'What happens if infostealer malware infects the computer? (It dumps all browser-stored passwords!)',
      'What should you click on the "Save password" prompt?'
    ],
    goldenRule: 'Never save official portal credentials in browser caches on government workstations.',
    badgeRewardId: 'session_defender'
  }
];
