import { Scenario } from '../../types';

export const MODULE_5_SCENARIOS: Scenario[] = [
  {
    id: 'm5_s1_field_survey',
    moduleId: 5,
    moduleTitle: 'Mobile Device & Remote Field Security',
    roleId: 'field_ops',
    scenarioNumber: 1,
    totalScenariosInModule: 4,
    title: 'Field Survey Tablet & Public Wi-Fi Interception Trap',
    subtitle: 'Securing Mobile Map Synchronization in Remote Survey Zones',
    threatCategory: 'Unsecured Public Wi-Fi & Man-in-the-Middle (MitM) Attacks',
    difficulty: 'Intermediate',
    learningObjective: 'Understand the risks of unencrypted public Wi-Fi and use approved encrypted channels for field data sync.',
    type: 'field_survey',
    situation: {
      contextText: 'You are conducting a cadastral land boundary survey in a rural village using your official government-issued field tablet. You have plotted 18 boundary coordinates for a disputed plot. Cellular 4G data signal drops to 1 bar, and a network popup appears.',
      senderInfo: {
        name: 'Field Tablet Wi-Fi Manager',
        designation: 'BhuNaksha Mobile Survey Client'
      },
      mockData: {
        gpsStatus: 'LOCKED (±1.8m accuracy)',
        surveyPointsRecorded: 18,
        syncStatus: 'QUEUED OFFLINE (Sync pending)',
        availableNetworks: [
          { ssid: 'FREE_KHORDHA_MARKET_WIFI_OPEN', security: 'OPEN (Unencrypted)', signal: '100% (Strong)', isRogue: true, alert: 'Untrusted public hotspot susceptible to packet sniffing and MitM session injection.' },
          { ssid: 'GOVT_OFFICIAL_SECURE_APN_4G', security: 'WPA3 / Encrypted VPN Tunnel', signal: '45% (Sufficient for batch sync)', isRogue: false, alert: 'Approved encrypted government data APN.' }
        ]
      }
    },
    options: [
      {
        id: 'opt_1',
        label: 'A',
        text: 'Connect to "FREE_KHORDHA_MARKET_WIFI_OPEN" to quickly upload survey coordinates with high speed.',
        isCorrect: false,
        isDangerous: true,
        feedbackTitle: 'INTERCEPTED: Field Data Exposed to Packet Sniffing!',
        feedbackWhy: 'Connecting to open, unencrypted public Wi-Fi allows attackers on the same network to intercept unencrypted traffic, inject rogue SSL certificates, or compromise tablet sessions.',
        feedbackTakeaway: 'Never connect official government survey tablets to unverified or open public Wi-Fi networks.',
        riskImpact: 'critical'
      },
      {
        id: 'opt_2',
        label: 'B',
        text: 'Keep survey data safely stored in encrypted offline storage on the tablet, and sync only over the approved government cellular APN / official office intranet VPN.',
        isCorrect: true,
        isDangerous: false,
        feedbackTitle: 'EXCELLENT: Survey Data Integrity Preserved!',
        feedbackWhy: 'You avoided the open Wi-Fi trap and utilized the secure offline-first storage and approved encrypted APN for data transmission.',
        feedbackTakeaway: 'Golden Rule: Store field survey data offline in encrypted local storage and sync exclusively through approved secure mobile networks.',
        riskImpact: 'low'
      },
      {
        id: 'opt_3',
        label: 'C',
        text: 'Ask a nearby shopkeeper to share their personal home Wi-Fi password for official work.',
        isCorrect: false,
        isDangerous: true,
        feedbackTitle: 'UNAPPROVED: Third-Party Network Dependency',
        feedbackWhy: 'Connecting to private third-party residential networks exposes government hardware to unmanaged domestic routers and malware.',
        feedbackTakeaway: 'Use only government-authorized cellular data SIMs or official intranet access points.',
        riskImpact: 'high'
      }
    ],
    hints: [
      'What are the dangers of an open Wi-Fi network with no password encryption? (Anyone can intercept data in transit!)',
      'Does the field survey app support offline storage until a secure connection is available?',
      'Which connection is authorized for government data synchronization?'
    ],
    goldenRule: 'Avoid open public Wi-Fi networks. Sync field survey data exclusively over authorized encrypted connections.',
    badgeRewardId: 'field_guardian'
  },
  {
    id: 'm5_s2_lost_device',
    moduleId: 5,
    moduleTitle: 'Mobile Device & Remote Field Security',
    roleId: 'field_ops',
    scenarioNumber: 2,
    totalScenariosInModule: 4,
    title: 'Emergency Lost Field Device Response SOP',
    subtitle: '3-Step Immediate Containment Protocol for Missing Tablets',
    threatCategory: 'Hardware Loss, Theft & Mobile Device Management (MDM)',
    difficulty: 'Basic',
    learningObjective: 'Execute the 3-step immediate emergency protocol when a government mobile device is lost or stolen.',
    type: 'lost_device',
    situation: {
      contextText: 'While returning from an afternoon field demarcation survey, you realize that your official government survey tablet containing offline land boundary data and active portal authentication tokens is missing from your field bag.',
      senderInfo: {
        name: 'Field Security Alert',
        designation: 'Hardware Asset Control'
      },
      mockData: {
        deviceModel: 'Govt Field Tablet Tab-S7 (Asset Tag: REV-TAB-1044)',
        lastKnownLocation: 'Village Boundary Pillar #14 (45 minutes ago)',
        sensitiveDataOnDevice: 'Offline cadastral maps, Sub-Registrar field login token, citizen survey records',
        emergencyTimer: '60 Seconds'
      }
    },
    options: [
      {
        id: 'opt_1',
        label: 'A',
        text: 'Wait until tomorrow morning to search the field site yourself before mentioning it to superiors.',
        isCorrect: false,
        isDangerous: true,
        feedbackTitle: 'DELAYED: Window of Exposure Exploited!',
        feedbackWhy: 'Delaying reporting gives an unauthorized finder or thief hours of uninterrupted physical access to bypass screen locks, dump stored files, or use active session tokens.',
        feedbackTakeaway: 'Immediate reporting is crucial so IT administrators can revoke active tokens and trigger remote security locks before data is extracted.',
        riskImpact: 'critical'
      },
      {
        id: 'opt_2',
        label: 'B',
        text: 'Post on local WhatsApp community groups offering a cash reward for the tablet with photo of the device.',
        isCorrect: false,
        isDangerous: true,
        feedbackTitle: 'COMPROMISED: Public Exposure of Government Asset',
        feedbackWhy: 'Publicly advertising a lost government device alerts potential bad actors to its presence without securing internal portal sessions.',
        feedbackTakeaway: 'Follow established institutional incident reporting protocols rather than social media appeals.',
        riskImpact: 'high'
      },
      {
        id: 'opt_3',
        label: 'C',
        text: 'Execute Step 1: Immediately notify the District Informatics Officer (DIO) & Sub-Collector → Step 2: Trigger remote session token revocation & MDM lock → Step 3: Re-provision replacement hardware via approved SOP.',
        isCorrect: true,
        isDangerous: false,
        feedbackTitle: 'CONTAINED: 3-Step Lost Device SOP Successfully Executed!',
        feedbackWhy: 'Immediate notification allowed IT administrators to invalidate active authentication tokens and lock the device remotely, neutralizing data exposure risk within minutes.',
        feedbackTakeaway: 'Golden Rule: Report lost or stolen official devices IMMEDIATELY. Rapid reporting prevents data breaches.',
        riskImpact: 'low'
      }
    ],
    hints: [
      'Why is time the most critical factor when a government device goes missing? (To revoke tokens before data can be extracted!)',
      'Who should you notify first: your administrative supervisor and IT officer, or social media?',
      'What can IT administrators do once notified? (Revoke active portal sessions and trigger remote device lock!)'
    ],
    goldenRule: 'Step 1: Immediate Report → Step 2: Revoke Session & Remote Lock → Step 3: Secure Re-provisioning.',
    badgeRewardId: 'field_guardian'
  },
  {
    id: 'm5_s3_gps_spoofing',
    moduleId: 5,
    moduleTitle: 'Mobile Device & Remote Field Security',
    roleId: 'field_ops',
    scenarioNumber: 3,
    totalScenariosInModule: 4,
    title: 'GPS Location Integrity & Spoofing Awareness',
    subtitle: 'Detecting Telemetry Discrepancies in Digital Land Demarcation',
    threatCategory: 'Location Spoofing & Sensor Telemetry Tampering',
    difficulty: 'Advanced',
    learningObjective: 'Detect simulated GPS coordinate anomalies and verify physical boundary markers against satellite telemetry.',
    type: 'gps_spoofing',
    situation: {
      contextText: 'You are physically standing at Boundary Pillar #8 in Khordha Survey Zone A. When opening the demarcation app, the GPS telemetry reading places your device coordinates 42 kilometers away in an adjacent district, yet shows "Mock Location: Active / Signal: High".',
      senderInfo: {
        name: 'GIS Telemetry Monitor',
        designation: 'Cadastral Mapping Satellite Engine'
      },
      mockData: {
        physicalLocation: 'Zone A, Khordha (20.1824° N, 85.6219° E)',
        reportedGps: 'District Border Zone D (20.5401° N, 86.1042° E — 42 km offset)',
        mockProviderFlag: 'DETECTED_MOCK_LOCATION_APP_ACTIVE',
        satelliteCount: '0 Real GNSS Satellites locked (Simulated Feed)',
        riskFactor: 'Spoofed coordinates could cause erroneous legal demarcation and falsify land records in official revenue proceedings.'
      }
    },
    options: [
      {
        id: 'opt_1',
        label: 'A',
        text: 'Proceed with the survey anyway and save the coordinates without questioning the 42km discrepancy.',
        isCorrect: false,
        isDangerous: true,
        feedbackTitle: 'FALSIFIED: Spoofed Coordinates Recorded in Registry!',
        feedbackWhy: 'Blindly recording spoofed GPS coordinates corrupts the legal land registry, shifts property boundaries, and causes major revenue litigation.',
        feedbackTakeaway: 'Never trust sensor telemetry that contradicts obvious physical landmarks. Investigate anomalies.',
        riskImpact: 'critical'
      },
      {
        id: 'opt_2',
        label: 'B',
        text: 'Halt survey entry, disable unapproved mock location apps, verify real GNSS satellite lock, and confirm coordinates against physical ground control benchmarks.',
        isCorrect: true,
        isDangerous: false,
        feedbackTitle: 'ACCURACY DEFENDED: GPS Spoofing Anomaly Neutralized!',
        feedbackWhy: 'You detected the mock location anomaly, removed unauthorized software interference, and verified authentic satellite telemetry before recording boundaries.',
        feedbackTakeaway: 'Golden Rule: Cross-check digital survey telemetry with physical ground control points (GCPs). Never record unverified location coordinates.',
        riskImpact: 'low'
      },
      {
        id: 'opt_3',
        label: 'C',
        text: 'Tap the screen repeatedly hoping the GPS marker will jump back automatically.',
        isCorrect: false,
        isDangerous: false,
        feedbackTitle: 'INEFFECTIVE: Root Cause Unresolved',
        feedbackWhy: 'Passive tapping does not diagnose mock location apps or faulty sensor configurations.',
        feedbackTakeaway: 'Inspect device settings, check developer options for mock location toggles, and verify satellite lock.',
        riskImpact: 'high'
      }
    ],
    hints: [
      'If you are physically in Khordha, why is the tablet reporting a location 42km away?',
      'What does the "Mock Location Active" flag indicate in the telemetry diagnostic window?',
      'What should you do before recording legal boundary coordinates?'
    ],
    goldenRule: 'Cross-verify GPS telemetry with physical benchmarks. Never record coordinates when location anomalies exist.',
    badgeRewardId: 'field_guardian'
  },
  {
    id: 'm5_s4_incident_lifecycle',
    moduleId: 5,
    moduleTitle: 'Mobile Device & Remote Field Security',
    roleId: 'field_ops',
    scenarioNumber: 4,
    totalScenariosInModule: 4,
    title: 'Incident Response Lifecycle Sequencer',
    subtitle: 'Mastering the 5-Step Administrative Cyber Incident Response',
    threatCategory: 'Cyber Incident Management & Institutional Reporting',
    difficulty: 'Intermediate',
    learningObjective: 'Sequence the 5 standard phases: Recognize → Stop → Report → Preserve → Recover.',
    type: 'incident_lifecycle',
    situation: {
      contextText: 'A colleague rushes to your desk stating: "I clicked an email attachment 5 minutes ago. Now my computer is displaying strange popups, my files won\'t open, and the mouse is moving on its own!" You must guide the immediate response sequence.',
      senderInfo: {
        name: 'Administrative Incident Response Flow',
        designation: 'National Cyber Security Protocol'
      },
      mockData: {
        steps: [
          { stepNum: 1, name: 'RECOGNIZE', action: 'Identify that an active security incident or malware infection has occurred.' },
          { stepNum: 2, name: 'STOP / ISOLATE', action: 'Immediately disconnect network cable (LAN/Wi-Fi) to stop malware spread without turning off power.' },
          { stepNum: 3, name: 'REPORT', action: 'Promptly inform Sub-Collector, DIO (District Informatics Officer), and National Cyber Helpline (1930).' },
          { stepNum: 4, name: 'PRESERVE', action: 'Keep error messages, emails, and screenshots intact as evidence for forensics.' },
          { stepNum: 5, name: 'RECOVER', action: 'Restore system from clean verified backups under IT supervision.' }
        ]
      }
    },
    options: [
      {
        id: 'opt_1',
        label: 'A',
        text: 'Follow the 5-Step Protocol: 1. RECOGNIZE → 2. STOP & ISOLATE (Unplug Network) → 3. REPORT (DIO & 1930) → 4. PRESERVE Evidence → 5. RECOVER.',
        isCorrect: true,
        isDangerous: false,
        feedbackTitle: 'PERFECT INCIDENT RESPONSE: Lateral Spread Prevented!',
        feedbackWhy: 'You recognized the breach, isolated the infected PC from the office network to prevent malware from spreading to other computers, reported to the DIO, preserved logs, and guided orderly recovery.',
        feedbackTakeaway: 'Golden Rule: When an incident occurs: Recognize → Stop/Isolate → Report → Preserve → Recover.',
        riskImpact: 'low'
      },
      {
        id: 'opt_2',
        label: 'B',
        text: 'Format the hard drive immediately and do not tell anyone in the office to avoid trouble.',
        isCorrect: false,
        isDangerous: true,
        feedbackTitle: 'CRITICAL FAILURE: Forensics Destroyed & Network Left Vulnerable!',
        feedbackWhy: 'Formatting erases critical forensic evidence and fails to notify administrators that other networked workstations may also be compromised.',
        feedbackTakeaway: 'Never hide an incident or erase evidence. Timely reporting protects the entire organization.',
        riskImpact: 'critical'
      },
      {
        id: 'opt_3',
        label: 'C',
        text: 'Forward the malicious email to everyone in the district office to ask if they received it too.',
        isCorrect: false,
        isDangerous: true,
        feedbackTitle: 'DANGEROUS: Spreading Malware Across the District!',
        feedbackWhy: 'Forwarding malicious attachments exposes dozens of additional colleagues to infection.',
        feedbackTakeaway: 'Never forward malware or phishing emails to colleagues. Report directly to IT security.',
        riskImpact: 'critical'
      }
    ],
    hints: [
      'What is the very first physical action to stop malware from infecting other computers on the office network? (Disconnect network/Wi-Fi!)',
      'Why is deleting or formatting the system wrong? (It destroys evidence needed to understand how the attacker entered!)',
      'What is the standard national cyber crime helpline number? (1930)'
    ],
    goldenRule: 'Recognize → Stop & Isolate → Report → Preserve → Recover. Timely reporting protects the Sub-Collectorate.',
    badgeRewardId: 'cyber_smart_officer'
  }
];
