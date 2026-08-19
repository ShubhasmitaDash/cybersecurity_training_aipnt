import { Scenario } from '../../types';

export const MODULE_1_SCENARIOS: Scenario[] = [
  {
    id: 'm1_s1_urgent_email',
    moduleId: 1,
    moduleTitle: 'Executive Security & Impersonation',
    roleId: 'executive',
    scenarioNumber: 1,
    totalScenariosInModule: 4,
    title: 'High-Level Impersonation & Spear Phishing',
    subtitle: 'Urgent Directive from Alleged District Collector',
    threatCategory: 'Spear Phishing & Authority Exploitation',
    difficulty: 'Basic',
    learningObjective: 'Recognize authority manipulation and artificial urgency in administrative communications.',
    type: 'email_phishing',
    situation: {
      contextText: 'You are reviewing pending administrative files in the Sub-Collectorate. An email lands in your inbox marked "HIGHEST PRIORITY - STRICT CONFIDENTIALITY". It appears to originate from the District Magistrate / Collector office demanding an immediate clearance override for a disputed land parcel.',
      senderInfo: {
        name: 'District Magistrate Secretariat (Office of the Collector)',
        email: 'collector-office@odisha-adm-clearance.org',
        phone: '+91 98765 43210 (Temporary Executive Line)',
        designation: 'District Collector & DM'
      },
      mockData: {
        subject: 'URGENT: Immediate Land Dispute Clearance Approval Required (File #REV-2024-8841)',
        timestamp: 'Today, 09:14 AM (15 mins before daily public hearing)',
        bodyContent: 'Dear Sub-Collector / SDM,\n\nIn view of the urgent state infrastructure review today at 10:30 AM, you are instructed to immediately sign off and digitally approve the attached clearance for Khata #441 (Plot 102/A). \n\nDue to network maintenance at the main Collectorate server, do NOT route this through the standard e-Despatch workflow. Sign directly and confirm to the mobile number below.\n\nUrgent action expected.\nCollector & District Magistrate',
        attachment: 'Urgent_Clearance_Notice_REV8841.pdf.exe',
        contactInsideMail: '+91 98765 43210'
      }
    },
    options: [
      {
        id: 'opt_1',
        label: 'A',
        text: 'Approve and sign immediately to avoid delaying a senior executive order.',
        isCorrect: false,
        isDangerous: true,
        feedbackTitle: 'DANGEROUS: Executive Authority Bypassed!',
        feedbackWhy: 'Attackers frequently exploit hierarchical respect and manufactured urgency to make officers bypass mandatory checks.',
        feedbackTakeaway: 'Urgency is never an authorization to abandon official protocols. Always pause before acting on urgent directives.',
        riskImpact: 'critical'
      },
      {
        id: 'opt_2',
        label: 'B',
        text: 'Reply directly to the email requesting confirmation and clarifying the attachment.',
        isCorrect: false,
        isDangerous: false,
        feedbackTitle: 'INSUFFICIENT: Trapped in the Attacker\'s Channel',
        feedbackWhy: 'Replying to the sender keeps you communicating with the attacker. The forged email domain (.org rather than .gov.in / .nic.in) is controlled by the imposter.',
        feedbackTakeaway: 'Never verify a suspicious communication using the same channel that sent it.',
        riskImpact: 'high'
      },
      {
        id: 'opt_3',
        label: 'C',
        text: 'Call the mobile number listed at the bottom of the email message body.',
        isCorrect: false,
        isDangerous: true,
        feedbackTitle: 'TRAP: Attacker Contact Number Used!',
        feedbackWhy: 'The phone number inside the email is provided by the fraudster. Calling it connects directly to an accomplice waiting to falsely confirm the request.',
        feedbackTakeaway: 'Never use phone numbers or contact links supplied within an unverified suspicious message.',
        riskImpact: 'critical'
      },
      {
        id: 'opt_4',
        label: 'D',
        text: 'Pause, isolate the message, and verify independently using the official Collectorate landline directory.',
        isCorrect: true,
        isDangerous: false,
        feedbackTitle: 'EXCELLENT: Out-of-Band Verification Initiated!',
        feedbackWhy: 'You noticed the spoofed domain (@odisha-adm-clearance.org), the attempt to bypass e-Despatch, and the suspicious executable attachment. You correctly chose independent Out-of-Band (OOB) verification.',
        feedbackTakeaway: 'Golden Rule: Always verify unexpected high-urgency executive directives through an independent, trusted channel before acting.',
        riskImpact: 'low'
      }
    ],
    hints: [
      'Look closely at the sender\'s email domain. Is it an authentic government domain (.gov.in / .nic.in) or a third-party commercial .org domain?',
      'Why is the sender asking you to bypass the official e-Despatch system?',
      'If someone wants to impersonate an official, whose phone number would they put inside the email body?'
    ],
    goldenRule: 'Urgency is not authorization. Never rely on contact details inside a suspicious email.',
    badgeRewardId: 'phishing_spotter'
  },
  {
    id: 'm1_s2_oob_verifier',
    moduleId: 1,
    moduleTitle: 'Executive Security & Impersonation',
    roleId: 'executive',
    scenarioNumber: 2,
    totalScenariosInModule: 4,
    title: 'Out-of-Band (OOB) Verification Simulator',
    subtitle: 'Interactive 3-Step Verification Protocol',
    threatCategory: 'Communication Channel Spoofing',
    difficulty: 'Intermediate',
    learningObjective: 'Master the 3-step Receive-Pause-Verify workflow using independent trusted channels.',
    type: 'out_of_band',
    situation: {
      contextText: 'You receive an urgent WhatsApp message claiming to be from the Additional District Magistrate (ADM) stating: "Emergency requisition of Sub-Collector vehicle & field fuel quota for VIP visit. Transfer approval code immediately or call me back on this WhatsApp number."',
      senderInfo: {
        name: 'ADM (Revenue & Protocol)',
        phone: '+91 94399 00000 (Unknown personal SIM with official ADM photo)',
        designation: 'Additional District Magistrate'
      },
      mockData: {
        channelType: 'WhatsApp Chat',
        avatarBadge: 'ADM Crest Profile Picture',
        messageText: 'Urgent: Transfer administrative emergency sanction token 9921 for protocol vehicles immediately. Do not delay.',
        availableChannels: [
          { id: 'ch_msg_reply', name: 'Reply on same WhatsApp chat', isSafe: false, reason: 'This is the attacker\'s controlled channel.' },
          { id: 'ch_msg_call', name: 'Call back the WhatsApp number', isSafe: false, reason: 'Directly reaches the attacker.' },
          { id: 'ch_govt_directory', name: 'Look up ADM in Official District Telephone Directory', isSafe: true, reason: 'Independent, pre-verified official government landline.' },
          { id: 'ch_walk_in', name: 'Send PA or physically walk into ADM Chamber (same building)', isSafe: true, reason: 'Direct physical verification eliminates digital spoofing.' },
          { id: 'ch_edespatch_portal', name: 'Check official e-Despatch incoming docket register', isSafe: true, reason: 'Validates whether an official administrative docket was actually issued.' }
        ]
      }
    },
    options: [
      {
        id: 'opt_1',
        label: 'A',
        text: 'Select the Official District Landline Directory / Walk-in verification channel.',
        isCorrect: true,
        isDangerous: false,
        feedbackTitle: 'VERIFIED: Out-of-Band Channel Successfully Established!',
        feedbackWhy: 'By contacting the ADM via the official internal intercom directory or physical verification, the real officer immediately confirms no such WhatsApp message was sent. You stopped a fraudulent financial token requisition.',
        feedbackTakeaway: 'Out-of-Band means using a completely separate, trusted medium (e.g. Official directory landline, physical walk-in, or official intranet register).',
        riskImpact: 'low'
      },
      {
        id: 'opt_2',
        label: 'B',
        text: 'Call back the WhatsApp number to verify the voice of the sender.',
        isCorrect: false,
        isDangerous: true,
        feedbackTitle: 'VERIFICATION FAILED: In-Band Channel Re-used!',
        feedbackWhy: 'Calling the sender on the same unverified app connects to the fraudster or an accomplice using AI voice modulation.',
        feedbackTakeaway: 'Never verify an unauthenticated identity through the same suspicious communication medium.',
        riskImpact: 'critical'
      },
      {
        id: 'opt_3',
        label: 'C',
        text: 'Message a junior clerk to process the token sanction to avoid executive displeasure.',
        isCorrect: false,
        isDangerous: true,
        feedbackTitle: 'FAILED: Passing Unverified Threat Down the Chain',
        feedbackWhy: 'Delegating unverified urgent requests transfers the risk to junior staff who will execute it assuming the Sub-Collector has already vetted it.',
        feedbackTakeaway: 'Executive officers must filter and halt fraudulent requests before they cascade into the administrative workflow.',
        riskImpact: 'critical'
      }
    ],
    hints: [
      'What does "Out-of-Band" mean? It means stepping OUTSIDE the incoming channel.',
      'Which source of contact information can you trust: information sent by the stranger, or the printed/intranet official district directory?',
      'If the ADM\'s office is in the Collectorate complex, what is the safest physical verification method?'
    ],
    goldenRule: 'Step 1: Receive → Step 2: Pause → Step 3: Verify via an independent trusted channel.',
    badgeRewardId: 'verification_champion'
  },
  {
    id: 'm1_s3_deepfake_vishing',
    moduleId: 1,
    moduleTitle: 'Executive Security & Impersonation',
    roleId: 'executive',
    scenarioNumber: 3,
    totalScenariosInModule: 4,
    title: 'Voice Phishing (Vishing) & Deepfake Audio',
    subtitle: 'Simulated Incoming Emergency Call from Division Commissioner',
    threatCategory: 'Vishing & AI Voice Synthesis',
    difficulty: 'Advanced',
    learningObjective: 'Identify red flags in urgent voice calls and resist requests to bypass security procedures.',
    type: 'deepfake_vishing',
    situation: {
      contextText: 'You receive an incoming voice call on the office landline. The caller ID displays "Revenue Divisional Commissioner (RDC) Secretariat". The caller\'s voice closely matches the RDC\'s tone and cadence.',
      senderInfo: {
        name: 'Revenue Divisional Commissioner (RDC)',
        phone: '0674-239XXXX (Spoofed Official Landline)',
        designation: 'RDC Central Division'
      },
      mockData: {
        callerAvatar: 'Senior Officer Avatar',
        waveformIntensity: 'High Stress',
        transcript: '"Sub-Collector, this is the RDC. I am in a high-level state cabinet meeting right now. There is a PIL matter in High Court in 20 minutes regarding the highway land acquisition. My IT staff needs your e-Pramaan 2FA OTP immediately to sign the emergency counter-affidavit on your behalf. Read me the 6 digits right now, do not put this in the file flow."',
        redFlags: [
          { id: 'rf_urgency', text: 'Extreme artificial urgency ("in 20 minutes")', isFlag: true },
          { id: 'rf_otp', text: 'Demanding confidential 2FA OTP / PIN over the phone', isFlag: true },
          { id: 'rf_bypass', text: 'Instructing you to bypass normal file flow and e-Despatch', isFlag: true },
          { id: 'rf_secrecy', text: 'Requesting confidential action without official paper trail', isFlag: true },
          { id: 'rf_regular', text: 'Official caller ID number shown on screen', isFlag: false }
        ]
      }
    },
    options: [
      {
        id: 'opt_1',
        label: 'A',
        text: 'Read the OTP immediately because the voice sounds authentic and cites a High Court deadline.',
        isCorrect: false,
        isDangerous: true,
        feedbackTitle: 'CATASTROPHIC: 2FA Token Compromised!',
        feedbackWhy: 'With generative AI voice cloning, realistic voice deepfakes can be synthesized with just 3 seconds of public video audio from official press conferences. Caller ID can easily be spoofed.',
        feedbackTakeaway: 'NO legitimate senior officer or IT personnel will EVER ask for your OTP or password over the phone.',
        riskImpact: 'critical'
      },
      {
        id: 'opt_2',
        label: 'B',
        text: 'Politely refuse to share the OTP over phone, state that OTP sharing is prohibited by government policy, and offer to sign the affidavit yourself through the official portal.',
        isCorrect: true,
        isDangerous: false,
        feedbackTitle: 'SUPERB DEFENSE: Deepfake & Vishing Attack Blocked!',
        feedbackWhy: 'You correctly identified multiple red flags: OTP request, bypassing file flow, manufactured panic, and spoofed caller ID. By insisting on official digital signing yourself, you protected your administrative credentials.',
        feedbackTakeaway: 'Never share OTPs, passwords, or DSC PINs with anyone, regardless of who they claim to be.',
        riskImpact: 'low'
      },
      {
        id: 'opt_3',
        label: 'C',
        text: 'Ask the caller to send an SMS and then reply with the OTP.',
        isCorrect: false,
        isDangerous: true,
        feedbackTitle: 'FAILED: Credential Exposed via SMS',
        feedbackWhy: 'Switching to SMS does not authenticate the caller; the attacker still receives the 2FA token.',
        feedbackTakeaway: 'OTP is strictly personal authentication. It must never be transmitted to any third party.',
        riskImpact: 'critical'
      }
    ],
    hints: [
      'Can a caller ID phone number be manipulated by web calling tools? Yes, caller ID spoofing is very common.',
      'Under any circumstance, is a government officer permitted to share a 2-factor OTP?',
      'Why would a real senior officer ask you to bypass the official e-Despatch workflow?'
    ],
    goldenRule: 'Never share OTPs, DSC PINs, or credentials over voice or video calls under any circumstance.',
    badgeRewardId: 'verification_champion'
  },
  {
    id: 'm1_s4_dsc_security',
    moduleId: 1,
    moduleTitle: 'Executive Security & Impersonation',
    roleId: 'executive',
    scenarioNumber: 4,
    totalScenariosInModule: 4,
    title: 'Digital Signature Certificate (DSC) Token Security',
    subtitle: 'Workstation Physical Hygiene & Cryptographic Token Custody',
    threatCategory: 'Hardware Token Misuse & Physical Security',
    difficulty: 'Basic',
    learningObjective: 'Understand the legal and security implications of unattended DSC tokens and PIN exposure.',
    type: 'dsc_security',
    situation: {
      contextText: 'You have just digitally signed 15 land mutation certificates using your official Class-3 DSC USB cryptographic token. A staff member informs you that a delegation of local citizens is waiting outside for the public grievance hearing.',
      senderInfo: {
        name: 'Executive Office Chamber',
        designation: 'Sub-Collector Chamber'
      },
      mockData: {
        tokenStatus: 'INSERTED_ACTIVE',
        pinState: 'CACHED_IN_SESSION',
        workstationState: 'UNLOCKED',
        desktopItems: [
          { name: 'DSC Crypto USB Token', location: 'Front USB Port 1', status: 'Active Glowing LED' },
          { name: 'Land Record Mutation Window', location: 'Active Screen', status: 'Batch Sign Complete' },
          { name: 'Sticky Note with PIN', location: 'Under Keyboard', status: 'Visible' }
        ]
      }
    },
    options: [
      {
        id: 'opt_1',
        label: 'A',
        text: 'Leave the DSC token plugged in so you can quickly resume signing when you return from the hearing.',
        isCorrect: false,
        isDangerous: true,
        feedbackTitle: 'SEVERE RISK: Unattended Cryptographic Signing Enabled!',
        feedbackWhy: 'Leaving a DSC token inserted in an unattended PC allows anyone in the office to sign fraudulent revenue or court orders using your legal identity.',
        feedbackTakeaway: 'A Digital Signature Certificate holds the same legal standing as your physical handwritten signature under the Information Technology Act.',
        riskImpact: 'critical'
      },
      {
        id: 'opt_2',
        label: 'B',
        text: 'Hand the DSC token and PIN to your Section Officer / Dealing Assistant to complete remaining files.',
        isCorrect: false,
        isDangerous: true,
        feedbackTitle: 'ILLEGAL: Delegation of Personal Digital Identity!',
        feedbackWhy: 'Government guidelines strictly prohibit sharing DSC tokens or PINs with subordinates. All actions performed with your DSC are your personal legal liability.',
        feedbackTakeaway: 'Never share or delegate your DSC token or PIN to colleagues or assistants.',
        riskImpact: 'critical'
      },
      {
        id: 'opt_3',
        label: 'C',
        text: 'Eject and physically remove the DSC token, lock it in your secure drawer/safe, close the portal session, and lock the workstation (Win + L).',
        isCorrect: true,
        isDangerous: false,
        feedbackTitle: 'EXEMPLARY: Complete DSC & Session Protection!',
        feedbackWhy: 'You eliminated physical theft risk, revoked active signing privileges, and locked your workstation. No unauthorized person can execute signatures in your absence.',
        feedbackTakeaway: 'Golden Rule: Always remove the DSC token immediately after signing and lock your workstation.',
        riskImpact: 'low'
      }
    ],
    hints: [
      'What is the legal standing of a digital signature on a government document?',
      'If you step away for 10 minutes, can someone access your unlocked computer?',
      'What is the physical security rule for hardware tokens?'
    ],
    goldenRule: 'Remove the DSC token immediately after signing. Never share the token or PIN with anyone.',
    badgeRewardId: 'session_defender'
  }
];
