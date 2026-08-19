import { TrainerCohortStats } from '../types';

export const DEFAULT_COHORT_STATS: TrainerCohortStats = {
  totalParticipants: 48,
  averageScore: 78,
  completionRate: 94,
  rolePerformance: [
    {
      role: 'Executive Office (SDM)',
      avgScore: 76,
      commonMistake: 'Falling for urgent voice deepfakes & calling in-email phone numbers',
      riskStatus: 'Moderate Risk'
    },
    {
      role: 'Revenue Operations (Sub-Registrar)',
      avgScore: 82,
      commonMistake: 'Leaving portal unattended during short tea breaks without locking (Win+L)',
      riskStatus: 'Low-Moderate Risk'
    },
    {
      role: 'Administrative Files (Section Officer)',
      avgScore: 71,
      commonMistake: 'Double extensions (.pdf.exe) & enabling macros on .docm inward files',
      riskStatus: 'High Risk'
    },
    {
      role: 'Citizen Services (DEO / Dealing Clerk)',
      avgScore: 84,
      commonMistake: 'Verbal name-dropping pressure & sticky notes on monitor bezels',
      riskStatus: 'Low-Moderate Risk'
    },
    {
      role: 'Field Operations (Surveyor / Amin)',
      avgScore: 77,
      commonMistake: 'Connecting to free open market Wi-Fi & delaying lost tablet reports',
      riskStatus: 'Moderate Risk'
    }
  ],
  highestRiskScenarios: [
    {
      title: 'Disguised Double Extensions (.pdf.exe)',
      module: 'Module 3: Administrative Files',
      failureRate: 42,
      corePitfall: 'Relying on PDF icon instead of unmasking true trailing .exe extension in Windows Explorer.'
    },
    {
      title: 'Out-of-Band (OOB) Channel Verification',
      module: 'Module 1: Executive Security',
      failureRate: 38,
      corePitfall: 'Replying to suspicious email or calling the attacker-supplied contact number.'
    },
    {
      title: 'Unattended DSC USB Cryptographic Token',
      module: 'Module 1: Executive Security',
      failureRate: 35,
      corePitfall: 'Leaving cryptographic signing token inserted in unattended terminal.'
    },
    {
      title: 'Lookalike Domain Spoofing (.com vs .gov.in)',
      module: 'Module 4: Front Desk Data Protection',
      failureRate: 29,
      corePitfall: 'Trusting keyword matching in URL ("odisha-service.com") rather than inspecting root TLD (.gov.in).'
    }
  ]
};

export const TRAINER_TEACHING_NOTES: Record<string, string> = {
  m1_s1_urgent_email: 'Discussion Point: Emphasize that hierarchical respect is the #1 psychological lever used by spear phishers against government offices.',
  m1_s2_oob_verifier: 'Discussion Point: Walk through the 3-step Receive-Pause-Verify mantra. Ask participants for their local landline directory process.',
  m1_s3_deepfake_vishing: 'Discussion Point: Demonstrate how voice cloning works with open-source models and why OTPs must NEVER be shared verbally.',
  m1_s4_dsc_security: 'Discussion Point: Highlight legal liability under IT Act 2000. The officer is personally responsible for any document signed by their DSC.',
  m2_s1_revenue_portal: 'Discussion Point: Emphasize cross-verifying digital mutations with physical field enquiry reports and looking at entry timestamps.',
  m2_s2_session_lock: 'Discussion Point: Teach participants to practice pressing Win + L instinctively every time they rise from their chair.',
  m2_s3_audit_trail: 'Discussion Point: Explain how audit logs track unauthorized admin creations and configuration changes.',
  m2_s4_credential_hygiene: 'Discussion Point: Explain why shared accounts destroy audit accountability when fraud occurs.',
  m3_s1_file_quarantine: 'Discussion Point: Review why Windows reads extensions right-to-left and how .pdf.exe is always a dangerous executable.',
  m3_s2_file_explorer: 'Discussion Point: Show participants how to enable "File name extensions" in Windows 10/11 Explorer.',
  m3_s3_usb_perimeter: 'Discussion Point: Remind staff that BadUSB devices can type automated malicious commands within 2 seconds of insertion.',
  m4_s1_social_engineering: 'Discussion Point: Train staff on polite assertiveness: standard procedure protects both the citizen and the operator.',
  m4_s2_domain_inspector: 'Discussion Point: Reiterate that ONLY .gov.in and .nic.in are authentic Indian government domains. .com / .org are NEVER official portals.',
  m4_s3_clean_desk: 'Discussion Point: Discuss the Clean Desk & Clean Screen standard and the risk of citizen identity theft from unattended Aadhaar copies.',
  m5_s1_field_survey: 'Discussion Point: Explain Man-in-the-Middle (MitM) attacks on open Wi-Fi and why offline sync is safer in the field.',
  m5_s2_lost_device: 'Discussion Point: Emphasize "No Blame / Immediate Reporting" culture so MDM remote wipe can protect government data quickly.',
  m5_s3_gps_spoofing: 'Discussion Point: Explain how mock locations apps can fake GPS coordinates and why physical benchmarks are essential.',
  m5_s4_incident_lifecycle: 'Discussion Point: Reinforce the 5-step response sequence: Recognize → Stop/Isolate → Report (1930 & DIO) → Preserve → Recover.'
};
