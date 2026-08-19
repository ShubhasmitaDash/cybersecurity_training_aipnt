export interface OfficeEmergency {
  id: string;
  room: string;
  officerRole: string;
  title: string;
  threatCategory: string;
  description: string;
  urgencyLevel: 'High' | 'Critical' | 'Moderate';
  options: Array<{
    id: string;
    text: string;
    isCorrect: boolean;
    isDangerous?: boolean;
    feedback: string;
    points: number;
  }>;
}

export const MASTER_OFFICE_EMERGENCIES: OfficeEmergency[] = [
  {
    id: 'emg_1',
    room: 'Executive SDM Chamber',
    officerRole: 'Sub-Collector / SDM',
    title: 'Urgent Voice Call Demanding 2FA OTP for Court PIL',
    threatCategory: 'Deepfake Vishing & Authority Exploitation',
    description: 'An urgent voice call claims to be the Revenue Divisional Commissioner (RDC) demanding your 2FA OTP right now to approve an affidavit.',
    urgencyLevel: 'Critical',
    options: [
      {
        id: 'opt_1a',
        text: 'Politely refuse, state OTP sharing is prohibited, and offer to log into the portal directly yourself.',
        isCorrect: true,
        points: 100,
        feedback: 'Correct! Never share OTPs or credentials over the phone, even for alleged senior authorities.'
      },
      {
        id: 'opt_1b',
        text: 'Read the OTP to avoid delaying the High Court filing.',
        isCorrect: false,
        isDangerous: true,
        points: -50,
        feedback: 'Critical Error! The call was an AI deepfake vishing attack designed to hijack your administrative account.'
      }
    ]
  },
  {
    id: 'emg_2',
    room: 'Section Officer Registry',
    officerRole: 'Section Officer',
    title: 'Suspicious Attachment "Transfer_List_2024.pdf.exe"',
    threatCategory: 'Double Extension Executable Trojan',
    description: 'An inward correspondence email arrives with an attachment named "Transfer_List_2024.pdf.exe" marked confidential.',
    urgencyLevel: 'High',
    options: [
      {
        id: 'opt_2a',
        text: 'Quarantine the file immediately; unmask double extension and report to DIO without opening.',
        isCorrect: true,
        points: 100,
        feedback: 'Correct! The trailing .exe is an executable trojan disguised with a fake PDF prefix.'
      },
      {
        id: 'opt_2b',
        text: 'Double click to open because it mentions employee transfer list.',
        isCorrect: false,
        isDangerous: true,
        points: -50,
        feedback: 'Infection! Opening a .exe file executes malicious binaries on the office network.'
      }
    ]
  },
  {
    id: 'emg_3',
    room: 'Revenue Registration Desk',
    officerRole: 'Sub-Registrar',
    title: 'Sub-Registrar leaves desk for tea with active portal open',
    threatCategory: 'Session Hijacking & Physical Security',
    description: 'The Sub-Registrar is called away for 5 minutes. The e-Revenue registration portal with deed approval rights is active on the monitor.',
    urgencyLevel: 'Critical',
    options: [
      {
        id: 'opt_3a',
        text: 'Press Win + L, remove DSC token, and ensure password lock is active before stepping away.',
        isCorrect: true,
        points: 100,
        feedback: 'Correct! Locking the workstation prevents unauthorized physical access and session hijacking.'
      },
      {
        id: 'opt_3b',
        text: 'Leave it open since the tea break will take only 3-5 minutes.',
        isCorrect: false,
        isDangerous: true,
        points: -50,
        feedback: 'Vulnerable! An unattended active portal can be accessed by any passerby within seconds.'
      }
    ]
  },
  {
    id: 'emg_4',
    room: 'Citizen Intake Counter #2',
    officerRole: 'Dealing Assistant / DEO',
    title: 'Influential visitor demanding bypass of token queue',
    threatCategory: 'Social Engineering & Intake Pressure',
    description: 'A visitor claims personal friendship with the District Collector and demands instant certificate generation without token verification.',
    urgencyLevel: 'Moderate',
    options: [
      {
        id: 'opt_4a',
        text: 'Politely and firmly adhere to standard procedure: verify credentials and require standard queue token.',
        isCorrect: true,
        points: 100,
        feedback: 'Correct! Verification procedures apply uniformly to all applicants without exception.'
      },
      {
        id: 'opt_4b',
        text: 'Bypass the token and approve immediately to avoid angering the visitor.',
        isCorrect: false,
        isDangerous: true,
        points: -50,
        feedback: 'Exploited! Name-dropping and social pressure should never bypass statutory verification.'
      }
    ]
  },
  {
    id: 'emg_5',
    room: 'Field Survey Outpost',
    officerRole: 'Field Surveyor',
    title: 'Survey tablet reports missing while on demarcation duty',
    threatCategory: 'Lost Device Containment & Rapid Incident Reporting',
    description: 'A field surveyor realizes the official government tablet with offline maps and cached tokens was left at a field site.',
    urgencyLevel: 'High',
    options: [
      {
        id: 'opt_5a',
        text: 'Immediately report to DIO & Sub-Collector for remote session revocation and MDM device lock.',
        isCorrect: true,
        points: 100,
        feedback: 'Correct! Rapid reporting enables immediate token revocation before data can be extracted.'
      },
      {
        id: 'opt_5b',
        text: 'Wait until the evening to return and search the field area privately.',
        isCorrect: false,
        isDangerous: true,
        points: -50,
        feedback: 'Exposure Window! Delays give unauthorized finders time to extract cached data.'
      }
    ]
  }
];
