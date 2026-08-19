import { Scenario } from '../../types';

export const MODULE_3_SCENARIOS: Scenario[] = [
  {
    id: 'm3_s1_file_quarantine',
    moduleId: 3,
    moduleTitle: 'Administrative File Flow & Peripheral Security',
    roleId: 'admin_files',
    scenarioNumber: 1,
    totalScenariosInModule: 3,
    title: 'File Identification & Quarantine Challenge',
    subtitle: 'Sorting Safe Correspondence from Malicious Payloads',
    threatCategory: 'Malicious Attachments, Double Extensions & Macros',
    difficulty: 'Intermediate',
    learningObjective: 'Identify dangerous file extensions including .exe, .scr, .vbs, .docm and double extensions masking executables.',
    type: 'file_quarantine',
    situation: {
      contextText: 'As a Section Officer / Head Clerk, you oversee incoming digital files in the inward correspondence queue. Five attachments have arrived from various external and public sources. You must evaluate each file and determine whether it is SAFE for routine opening or SUSPICIOUS / DANGEROUS requiring isolation.',
      senderInfo: {
        name: 'Inward Docket Dispatch Dispatcher',
        designation: 'e-Despatch Gateway'
      },
      mockData: {
        files: [
          {
            id: 'file_1',
            name: 'Gazette_Update_2024.pdf',
            size: '1.4 MB',
            extension: '.pdf',
            type: 'PDF Document',
            isSafe: true,
            threatCategory: 'None',
            explanation: 'Standard PDF document with legitimate application headers.'
          },
          {
            id: 'file_2',
            name: 'Circular_Land_Rules_Amended.pdf.exe',
            size: '740 KB',
            extension: '.exe',
            type: 'Executable Binary (Disguised with Double Extension)',
            isSafe: false,
            threatCategory: 'Double Extension Trojan',
            explanation: 'CRITICAL THREAT: The file uses a double extension (.pdf.exe). Windows executes it as an executable program (.exe), launching malware while disguising itself with a PDF icon.'
          },
          {
            id: 'file_3',
            name: 'Office_RTI_Quarterly_Data.docm',
            size: '420 KB',
            extension: '.docm',
            type: 'Macro-Enabled Word Document',
            isSafe: false,
            threatCategory: 'Macro Malware Vector',
            explanation: 'HIGH RISK: The .docm format contains embedded Visual Basic macros. Attackers use macros to download ransomware when "Enable Content" is clicked.'
          },
          {
            id: 'file_4',
            name: 'Meeting_Schedule_Collectorate.vbs',
            size: '12 KB',
            extension: '.vbs',
            type: 'VBScript Scripting File',
            isSafe: false,
            threatCategory: 'Malicious Windows Script',
            explanation: 'CRITICAL THREAT: VBScript files (.vbs) execute directly in Windows Script Host to download backdoors or execute arbitrary shell commands.'
          },
          {
            id: 'file_5',
            name: 'Enquiry_Report_Khordha.docx',
            size: '880 KB',
            extension: '.docx',
            type: 'Standard Word Document',
            isSafe: true,
            threatCategory: 'None',
            explanation: 'Standard XML-based DOCX document without embedded VBA macros.'
          }
        ]
      }
    },
    options: [
      {
        id: 'opt_1',
        label: 'A',
        text: 'Quarantine Circular_Land_Rules.pdf.exe, Office_RTI_Data.docm, and Meeting_Schedule.vbs; open only the standard .pdf and .docx files.',
        isCorrect: true,
        isDangerous: false,
        feedbackTitle: 'PERFECT TRIAGE: All Malicious Payloads Blocked!',
        feedbackWhy: 'You correctly classified all 5 files! You identified the double extension (.pdf.exe), the macro-enabled document (.docm), and the malicious script (.vbs) while permitting legitimate correspondence.',
        feedbackTakeaway: 'Golden Rule: Look at the FINAL extension of any file. Never open .exe, .vbs, .scr, or enable macros (.docm/.xlsm) from external senders.',
        riskImpact: 'low'
      },
      {
        id: 'opt_2',
        label: 'B',
        text: 'Open Circular_Land_Rules.pdf.exe because it says "pdf" in the filename.',
        isCorrect: false,
        isDangerous: true,
        feedbackTitle: 'CATASTROPHIC INFECTION: Executable Trojan Launched!',
        feedbackWhy: 'The word ".pdf" in the middle of the name is a decoy. The actual file extension is ".exe", which runs malicious executable code on the government network.',
        feedbackTakeaway: 'Windows reads file extensions from right to left. The last extension defines what the computer actually executes.',
        riskImpact: 'critical'
      },
      {
        id: 'opt_3',
        label: 'C',
        text: 'Open Office_RTI_Data.docm and click "Enable Macros" when Microsoft Word prompts for permission.',
        isCorrect: false,
        isDangerous: true,
        feedbackTitle: 'MALWARE DOWNLOADED: Macro Payload Executed!',
        feedbackWhy: 'Enabling macros allows embedded VBA code to silently download malicious payloads into system memory.',
        feedbackTakeaway: 'Never enable macros or content on documents received via email or untrusted sources.',
        riskImpact: 'critical'
      }
    ],
    hints: [
      'What is the very last extension after the second dot in "Circular_Land_Rules.pdf.exe"?',
      'What does the "m" stand for in ".docm"? (Macro-enabled!)',
      'What kind of file is a .vbs extension? (Visual Basic Script file that executes code directly)'
    ],
    goldenRule: 'Check the final file extension. Never execute .exe, .scr, .vbs, or enable macros from external correspondence.',
    badgeRewardId: 'file_guardian'
  },
  {
    id: 'm3_s2_file_explorer',
    moduleId: 3,
    moduleTitle: 'Administrative File Flow & Peripheral Security',
    roleId: 'admin_files',
    scenarioNumber: 2,
    totalScenariosInModule: 3,
    title: 'Windows File Explorer Extension Visibility Drill',
    subtitle: 'Unmasking Hidden Double Extensions in Windows 11/10',
    threatCategory: 'OS Configuration & Hidden Extension Traps',
    difficulty: 'Basic',
    learningObjective: 'Learn how Windows hides extensions by default and how enabling "File name extensions" exposes disguised malware.',
    type: 'file_explorer',
    situation: {
      contextText: 'By default, Windows hides known file extensions. On your desk, a file in your Downloads folder appears simply as "Transfer_Order_2024.pdf" with an Adobe Acrobat icon. You need to verify its authentic identity before forwarding it to the Section.',
      senderInfo: {
        name: 'Windows 11 Explorer Interface',
        designation: 'Local System Storage'
      },
      mockData: {
        showExtensionsEnabled: false,
        hiddenViewFileName: 'Transfer_Order_2024.pdf',
        actualFileName: 'Transfer_Order_2024.pdf.scr',
        fileTypeDescription: 'Screen Saver Executable Payload',
        iconStyle: 'PDF Icon (Forged)',
        instructions: 'Toggle the "File name extensions" checkbox in the simulated File Explorer View tab.'
      }
    },
    options: [
      {
        id: 'opt_1',
        label: 'A',
        text: 'Double-click the file immediately because the PDF icon indicates it is a standard Adobe document.',
        isCorrect: false,
        isDangerous: true,
        feedbackTitle: 'TRAPPED: Icon Spoofing & Hidden Extension Exploited!',
        feedbackWhy: 'Attackers can embed custom PDF icons inside Windows executable screensavers (.scr) or binaries (.exe). Because extensions were hidden, you could not see the trailing .scr extension.',
        feedbackTakeaway: 'Icons can be easily forged by attackers. Only the true file extension reveals what the file really is.',
        riskImpact: 'critical'
      },
      {
        id: 'opt_2',
        label: 'B',
        text: 'Enable "File name extensions" in File Explorer settings, reveal the true extension (.scr), recognize it as executable malware, and delete/report it.',
        isCorrect: true,
        isDangerous: false,
        feedbackTitle: 'BRILLIANT: Hidden Trojan Unmasked!',
        feedbackWhy: 'Enabling file extensions unmasked "Transfer_Order_2024.pdf.scr". A .scr file is a Windows executable capable of running arbitrary malware payloads.',
        feedbackTakeaway: 'Always configure office computers to display full file extensions (View > Show > File name extensions).',
        riskImpact: 'low'
      },
      {
        id: 'opt_3',
        label: 'C',
        text: 'Rename the file to "Transfer_Order_2024.doc" and then open it.',
        isCorrect: false,
        isDangerous: true,
        feedbackTitle: 'INEFFECTIVE: Executable Behavior Unchanged',
        feedbackWhy: 'Manually typing a new extension without understanding its internal binary does not sanitize a malicious file.',
        feedbackTakeaway: 'Do not attempt to open unverified files; isolate and submit to IT security.',
        riskImpact: 'high'
      }
    ],
    hints: [
      'Can an executable program have a custom PDF icon? Yes, any Windows program can use any icon.',
      'What happens when you enable "File name extensions" in Windows Explorer?',
      'Is .scr a document or an executable program in Windows? (It is an executable screensaver binary!)'
    ],
    goldenRule: 'Always enable "File name extensions" in Windows to prevent disguised double extension attacks.',
    badgeRewardId: 'file_guardian'
  },
  {
    id: 'm3_s3_usb_perimeter',
    moduleId: 3,
    moduleTitle: 'Administrative File Flow & Peripheral Security',
    roleId: 'admin_files',
    scenarioNumber: 3,
    totalScenariosInModule: 3,
    title: 'Removable Media Security & Guest USB Controls',
    subtitle: 'The Public Visitor Pen Drive Dilemma',
    threatCategory: 'Removable Media Malware & USB Drops',
    difficulty: 'Intermediate',
    learningObjective: 'Enforce organizational removable media controls and prevent unauthorized USB insertion on office terminals.',
    type: 'usb_perimeter',
    situation: {
      contextText: 'A citizen enters the Section Officer chamber holding a plastic USB pen drive. The visitor states: "Sir, my RTI application contains 40 high-resolution survey map scans. The file size was too big for email, so I brought it on this pen drive. Please plug it into your computer and copy the folder."',
      senderInfo: {
        name: 'Public Inward Visitor',
        designation: 'Citizen / RTI Applicant'
      },
      mockData: {
        usbBrand: 'Generic Unbranded Flash Drive (Found outside complex)',
        potentialThreats: [
          'AutoRun / BadUSB keystroke injection hardware exploit',
          'Worm propagation (e.g. shortcut worms, cryptominers)',
          'Malicious hidden executables and firmware Trojans'
        ],
        approvedSOP: 'Sub-Collectorate Removable Media Policy: External USB drives must NEVER be connected to network-connected official desktops. All public files must be submitted via the official portal, e-District counter, or scanned on an isolated air-gapped intake kiosk.'
      }
    },
    options: [
      {
        id: 'opt_1',
        label: 'A',
        text: 'Plug the USB drive into your official terminal because the visitor is polite and seems genuine.',
        isCorrect: false,
        isDangerous: true,
        feedbackTitle: 'PERIMETER BREACH: Unauthorized USB Connected!',
        feedbackWhy: 'Connecting unknown removable media bypasses perimeter firewalls. Rogue USBs can deliver BadUSB hardware exploits or propagate worm malware across the intranet in seconds.',
        feedbackTakeaway: 'Never connect untrusted, personal, or public USB flash drives to official government computers.',
        riskImpact: 'critical'
      },
      {
        id: 'opt_2',
        label: 'B',
        text: 'Let the visitor insert the USB drive themselves so that you are not directly responsible.',
        isCorrect: false,
        isDangerous: true,
        feedbackTitle: 'UNACCEPTABLE: Permitting Visitor System Access',
        feedbackWhy: 'Allowing visitors physical access to USB ports violates basic physical security and government terminal custody rules.',
        feedbackTakeaway: 'You are responsible for the physical and digital integrity of your assigned government workstation.',
        riskImpact: 'critical'
      },
      {
        id: 'opt_3',
        label: 'C',
        text: 'Politely decline, explain the government cybersecurity removable media policy, and direct the citizen to upload via the secure e-District portal or use the designated isolated public intake scanner kiosk.',
        isCorrect: true,
        isDangerous: false,
        feedbackTitle: 'DEFENSE UPHELD: Organizational USB Policy Enforced!',
        feedbackWhy: 'You protected the Sub-Collectorate network from potential malware and hardware exploits while providing the citizen with the official, secure submission channel.',
        feedbackTakeaway: 'Golden Rule: Never insert unauthorized USB media into official terminals. Direct public submissions to designated secure intake channels.',
        riskImpact: 'low'
      }
    ],
    hints: [
      'What can happen the moment an unverified USB device is plugged into a computer? (Malware execution, keystroke injection, data theft!)',
      'What is the Sub-Collectorate policy regarding external guest USB flash drives?',
      'What safe alternative should you offer the citizen?'
    ],
    goldenRule: 'Never plug unauthorized USB drives into official office computers. Follow removable media SOPs.',
    badgeRewardId: 'file_guardian'
  }
];
