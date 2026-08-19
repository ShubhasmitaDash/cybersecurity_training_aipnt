import { Scenario } from '../../types';

export const MODULE_4_SCENARIOS: Scenario[] = [
  {
    id: 'm4_s1_social_engineering',
    moduleId: 4,
    moduleTitle: 'Front-Desk Data Protection & Credential Hygiene',
    roleId: 'front_desk',
    scenarioNumber: 1,
    totalScenariosInModule: 3,
    title: 'Citizen Intake Counter Social Engineering Simulator',
    subtitle: 'Withstanding High-Pressure Manipulation & Name-Dropping',
    threatCategory: 'Human Social Engineering & Intake Manipulation',
    difficulty: 'Basic',
    learningObjective: 'Recognize emotional manipulation, name-dropping, and manufactured panic at the public intake counter.',
    type: 'social_engineering',
    situation: {
      contextText: 'You are seated at the Sub-Collectorate citizen intake counter processing certificate applications. An influential-looking visitor wearing formal attire approaches your counter, skips the queue line, leans over your counter screen, and speaks loudly.',
      senderInfo: {
        name: 'Public Counter Visitor (Alleged VIP)',
        designation: 'Citizen Intake Desk'
      },
      mockData: {
        personas: [
          {
            id: 'persona_vip',
            name: 'Mr. R. K. Mohapatra (The Influential Name-Dropper)',
            quote: '"Babu, I have been sent directly by the Collector\'s private secretary. We are in a major rush for a tender submission. Bypass the queue token, open the portal, and approve this income certificate right now without physical verification. I know the Sub-Collector personally!"',
            tactics: ['Name-dropping senior officials', 'Creating artificial urgency', 'Intimidation and peer pressure', 'Attempting to bypass mandatory token queue & KYC checks'],
            riskScore: 'High Risk Social Engineering'
          },
          {
            id: 'persona_angry',
            name: 'Aggressive Visitor (The Intimidator)',
            quote: '"I have been standing here for 2 hours! If you don\'t give me the full land registry list of Ward 4 right now on a pen drive, I will file a departmental grievance against you!"',
            tactics: ['Aggressive emotional outbursts', 'Demanding restricted bulk citizen data', 'Threat of complaints'],
            riskScore: 'Data Exfiltration via Coercion'
          }
        ]
      }
    },
    options: [
      {
        id: 'opt_1',
        label: 'A',
        text: 'Bypass the token and approve the certificate immediately to avoid getting reprimanded by the senior officer\'s friend.',
        isCorrect: false,
        isDangerous: true,
        feedbackTitle: 'EXPLOITED: Social Engineering Successful!',
        feedbackWhy: 'Attackers frequently use name-dropping and confident intimidation because front-desk staff fear offending influential figures. Genuine official instructions follow written administrative workflows.',
        feedbackTakeaway: 'Social engineering targets human emotions (fear, urgency, deference) rather than computer firewalls.',
        riskImpact: 'critical'
      },
      {
        id: 'opt_2',
        label: 'B',
        text: 'Politely and firmly maintain standard procedure: require the standard queue token, inspect identity credentials, and explain that verification procedures apply equally to all applicants without exception.',
        isCorrect: true,
        isDangerous: false,
        feedbackTitle: 'RESILIENT DEFENSE: Professional Integrity Maintained!',
        feedbackWhy: 'You calmly adhered to established intake SOPs. You neutralized pressure by maintaining uniform standard verification for all citizens regardless of claims of personal influence.',
        feedbackTakeaway: 'Golden Rule: Never bypass administrative verification for verbal claims, name-dropping, or emotional pressure.',
        riskImpact: 'low'
      },
      {
        id: 'opt_3',
        label: 'C',
        text: 'Turn your computer screen around to let the visitor inspect the portal entries directly.',
        isCorrect: false,
        isDangerous: true,
        feedbackTitle: 'PRIVACY BREACH: Citizen Data Exposed to Public View!',
        feedbackWhy: 'Letting unauthorized visitors view active portal screens exposes confidential citizen records, Aadhaar numbers, and internal remarks.',
        feedbackTakeaway: 'Position monitors away from public view and protect citizen privacy.',
        riskImpact: 'critical'
      }
    ],
    hints: [
      'Why do fraudsters drop names of senior officers like the District Collector or SDM? (To exploit fear and bypass normal checks!)',
      'Does personal acquaintance with an officer grant exemption from statutory certificate verification rules?',
      'How should government staff handle high-pressure verbal requests?'
    ],
    goldenRule: 'Adhere strictly to official intake workflows. Never bypass verification for verbal pressure or name-dropping.',
    badgeRewardId: 'phishing_spotter'
  },
  {
    id: 'm4_s2_domain_inspector',
    moduleId: 4,
    moduleTitle: 'Front-Desk Data Protection & Credential Hygiene',
    roleId: 'front_desk',
    scenarioNumber: 2,
    totalScenariosInModule: 3,
    title: 'Phishing Domain Inspector & URL Breakdown',
    subtitle: 'Spotting Lookalike Government Portals (.gov.in vs .com / .org)',
    threatCategory: 'Domain Spoofing & Credential Harvesting Portals',
    difficulty: 'Intermediate',
    learningObjective: 'Inspect domain syntax, Top-Level Domains (TLDs), and character spoofing to identify phishing clones.',
    type: 'domain_inspector',
    situation: {
      contextText: 'A citizen shows you a link they received via SMS instructing them to "Pay mutation fee and download e-District certificate immediately to prevent cancellation". You inspect the URL in your browser before entering any official login or citizen application ID.',
      senderInfo: {
        name: 'SMS Gateway Link',
        designation: 'Citizen Grievance Alert'
      },
      mockData: {
        targetPairs: [
          {
            id: 'pair_1',
            realDomain: 'https://edistrict.odisha.gov.in',
            fakeDomain: 'http://odisha-edistrict-service.com/login-portal',
            realExplanation: 'Authentic: Uses .gov.in (reserved strictly for Govt of India & State Governments) with HTTPS TLS encryption.',
            fakeExplanation: 'Spoofed: Commercial .com domain with unencrypted HTTP protocol and hyphens designed to harvest officer and citizen passwords.'
          },
          {
            id: 'pair_2',
            realDomain: 'https://bhulekh.ori.nic.in',
            fakeDomain: 'http://bhulekh-odisha-update.org/khatiyan-verify',
            realExplanation: 'Authentic: Uses .nic.in (National Informatics Centre secure domain).',
            fakeExplanation: 'Spoofed: Third-party .org domain created to steal revenue portal credentials.'
          }
        ]
      }
    },
    options: [
      {
        id: 'opt_1',
        label: 'A',
        text: 'Classify "http://odisha-edistrict-service.com" as a FRAUDULENT SPOOFED DOMAIN and "https://edistrict.odisha.gov.in" as the AUTHENTIC GOVERNMENT PORTAL.',
        isCorrect: true,
        isDangerous: false,
        feedbackTitle: 'EXPERT DETECTION: Phishing Clone Unmasked!',
        feedbackWhy: 'You correctly inspected the TLD (.gov.in vs .com) and protocol (HTTPS vs HTTP). Official Indian government portals strictly end in .gov.in or .nic.in. Commercial domains (.com, .org, .net, .xyz) are never official state portals.',
        feedbackTakeaway: 'Golden Rule: Look at the domain suffix. Official Indian government portals exclusively use .gov.in or .nic.in domains.',
        riskImpact: 'low'
      },
      {
        id: 'opt_2',
        label: 'B',
        text: 'Trust "http://odisha-edistrict-service.com" because it has the words "odisha" and "edistrict" in the name.',
        isCorrect: false,
        isDangerous: true,
        feedbackTitle: 'HARVESTED: Credentials Handed to Phishing Site!',
        feedbackWhy: 'Anyone can register a .com domain with words like "odisha-service". Words in the domain name do not make a website official.',
        feedbackTakeaway: 'Look at the root Top-Level Domain (TLD), not just matching words in the URL.',
        riskImpact: 'critical'
      },
      {
        id: 'opt_3',
        label: 'C',
        text: 'Enter your official staff login on the .com site to test whether it accepts your password.',
        isCorrect: false,
        isDangerous: true,
        feedbackTitle: 'FATAL BREACH: Active Credentials Stolen!',
        feedbackWhy: 'Entering credentials on a fake portal transmits your password in plaintext to the attacker\'s database.',
        feedbackTakeaway: 'Never test login credentials on unverified websites.',
        riskImpact: 'critical'
      }
    ],
    hints: [
      'What are the only two authorized Top-Level Domains (TLDs) for official Indian government portals? (.gov.in and .nic.in!)',
      'Can a private individual buy a .com or .org domain containing the word "odisha"? (Yes, within minutes!)',
      'Is the connection secure (HTTPS with lock symbol) or unencrypted (HTTP)?'
    ],
    goldenRule: 'Always verify the domain suffix. Legitimate government portals end with .gov.in or .nic.in.',
    badgeRewardId: 'phishing_spotter'
  },
  {
    id: 'm4_s3_clean_desk',
    moduleId: 4,
    moduleTitle: 'Front-Desk Data Protection & Credential Hygiene',
    roleId: 'front_desk',
    scenarioNumber: 3,
    totalScenariosInModule: 3,
    title: 'Clean Desk & Password Hygiene Challenge',
    subtitle: 'Interactive Physical Security Sweep of the Front Counter',
    threatCategory: 'Clean Desk Breaches & Plaintext Password Exposure',
    difficulty: 'Basic',
    learningObjective: 'Identify and neutralize physical security hazards including monitor sticky notes, shared credential sheets, and uncollected citizen KYC photocopies.',
    type: 'clean_desk',
    situation: {
      contextText: 'You inspect the front-desk workstation before opening the citizen service counter for the morning shift. You observe several unsafe habits left behind from the previous day.',
      senderInfo: {
        name: 'Workstation Physical Audit',
        designation: 'Front Desk Counter #3'
      },
      mockData: {
        hazards: [
          {
            id: 'hazard_stickynote',
            name: 'Yellow Sticky Note on Monitor Bezel',
            text: 'Pass: Revenue#2024 (DO NOT REMOVE)',
            description: 'Plaintext password posted on monitor where every queuing citizen can read it.',
            actionRequired: 'Remove and shred immediately; change account password.'
          },
          {
            id: 'hazard_shared_sheet',
            name: 'Shared Account Login Registry Sheet',
            text: 'Counter Logins: User1 / User2 / User3 all share pass: Admin@123',
            description: 'Shared credentials destroy individual audit trail accountability.',
            actionRequired: 'Enforce individual user accounts for each staff member.'
          },
          {
            id: 'hazard_citizen_kyc',
            name: 'Unattended Stack of Citizen Aadhaar Photocopies',
            text: '24 Citizen Aadhaar & Land Record photocopies lying open on public counter',
            description: 'Violation of Data Privacy and Aadhaar security guidelines; risk of identity theft.',
            actionRequired: 'Lock photocopies in secure document intake cabinet.'
          },
          {
            id: 'hazard_unlocked_pc',
            name: 'Unlocked PC with Active Session',
            text: 'Workstation active with e-District portal session open',
            description: 'Allows anyone to perform actions as the logged-in user.',
            actionRequired: 'Lock workstation immediately with Win + L.'
          }
        ]
      }
    },
    options: [
      {
        id: 'opt_1',
        label: 'A',
        text: 'Neutralize all 4 hazards: Shred sticky note, lock citizen KYC documents in cabinet, mandate individual accounts, and lock workstation (Win + L).',
        isCorrect: true,
        isDangerous: false,
        feedbackTitle: 'PERFECT CLEAN DESK: Complete Physical & Credential Security!',
        feedbackWhy: 'You eliminated plaintext password exposure, protected citizen privacy documents from identity theft, abolished shared logins, and secured the workstation.',
        feedbackTakeaway: 'Golden Rule: Keep monitors clean of passwords, lock unattended terminals, and secure all citizen documents.',
        riskImpact: 'low'
      },
      {
        id: 'opt_2',
        label: 'B',
        text: 'Keep the sticky note under the keyboard so it is somewhat hidden while remaining convenient for everyone.',
        isCorrect: false,
        isDangerous: true,
        feedbackTitle: 'INSECURE: Under-Keyboard Passwords Easily Found!',
        feedbackWhy: 'Under-keyboard and under-mousepad hiding spots are the first places an intruder or curious visitor looks.',
        feedbackTakeaway: 'Passwords must never be written down in physical proximity to the workstation.',
        riskImpact: 'high'
      },
      {
        id: 'opt_3',
        label: 'C',
        text: 'Leave citizen Aadhaar photocopies on the counter so citizens can find their own documents.',
        isCorrect: false,
        isDangerous: true,
        feedbackTitle: 'SEVERE PRIVACY BREACH: Citizen PII Compromised!',
        feedbackWhy: 'Leaving citizen KYC documents in public areas violates data protection principles and facilitates identity fraud.',
        feedbackTakeaway: 'Official personnel are custodians of citizen data. Confidentiality must be maintained.',
        riskImpact: 'critical'
      }
    ],
    hints: [
      'Where is the most dangerous place to display a password? (On a sticky note affixed to your screen!)',
      'Why is sharing one common login among 4 staff members problematic? (No one can prove who made an unauthorized change in audit logs!)',
      'Where should citizen Aadhaar and land photocopies be stored?'
    ],
    goldenRule: 'No sticky notes, no shared logins, lock citizen documents, and always lock your screen (Win + L).',
    badgeRewardId: 'session_defender'
  }
];
