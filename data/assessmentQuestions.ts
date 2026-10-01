export interface Option {
  text: string;
  score: number;
}

export interface Question {
  id: number;
  title: string;
  category: string;
  question: string;
  options: Option[];
  dimension: "Swami" | "Amatya" | "Janapada" | "Durga" | "Kosha" | "Danda" | "Mitra";
}

export interface DimensionDetails {
  key: "swami" | "amatya" | "janapada" | "durga" | "kosha" | "danda" | "mitra";
  dimension: "Swami" | "Amatya" | "Janapada" | "Durga" | "Kosha" | "Danda" | "Mitra";
  modernName: string;
  shortLabel: string;
  ancientTitle: string;
  measures: string;
  getFinding: (pct: number) => string;
  strengthsText: string;
  attentionText: string;
  recommendations: string[];
}

export const DIMENSIONS_INFO: Record<string, DimensionDetails> = {
  Swami: {
    key: "swami",
    dimension: "Swami",
    modernName: "Executive Governance",
    shortLabel: "Governance",
    ancientTitle: "Swami",
    measures: "Measures executive board oversight, dedicated security budgeting, and pre-approved crisis leadership decision authority.",
    getFinding: (pct: number) =>
      pct >= 80
        ? "Your responses indicate strong executive board oversight, a risk-indexed dynamic security budget, and a well-drilled crisis command structure."
        : pct >= 50
        ? "Your responses indicate periodic leadership reviews and a fixed annual budget, but crisis decision authority or budget scaling may require formalization."
        : "Your responses indicate limited executive security discussions, ad-hoc IT security budgeting, and lack of a pre-approved crisis command structure.",
    strengthsText: "Assessment indicates active leadership oversight, dedicated security budgeting, and defined crisis decision command structures.",
    attentionText: "Assessment indicates executive oversight and dedicated security budgeting may require formalization and regular leadership reviews.",
    recommendations: [
      "Establish regular (quarterly/monthly) executive cybersecurity posture reviews at the leadership level.",
      "Allocate a dedicated, risk-indexed security budget that scales with digital growth.",
      "Define and drill a clear Incident Response Command structure authorized for immediate crisis actions."
    ]
  },
  Amatya: {
    key: "amatya",
    dimension: "Amatya",
    modernName: "Security Team & Culture",
    shortLabel: "People & Culture",
    ancientTitle: "Amatya",
    measures: "Measures non-technical staff security training, IT team technical certifications, and employee offboarding/vetting.",
    getFinding: (pct: number) =>
      pct >= 80
        ? "Your responses indicate continuous anti-phishing simulations, certified IT security personnel, and automated immediate offboarding."
        : pct >= 50
        ? "Your responses indicate annual compliance training and basic offboarding, but lack continuous phishing simulations or required security certifications."
        : "Your responses indicate ad-hoc security awareness, lack of specialized IT security training, and manual employee offboarding.",
    strengthsText: "Assessment indicates strong employee security awareness, certified IT staff, and automated offboarding controls.",
    attentionText: "Human factors and operational security culture indicate opportunities for structured phishing simulations and automated offboarding.",
    recommendations: [
      "Conduct continuous employee security awareness training combined with unannounced simulated phishing tests.",
      "Fund continuous professional development and security certifications for IT and development staff.",
      "Implement strict automated offboarding procedures for immediate account revocation upon employee exit."
    ]
  },
  Janapada: {
    key: "janapada",
    dimension: "Janapada",
    modernName: "Infrastructure",
    shortLabel: "Infrastructure",
    ancientTitle: "Janapada",
    measures: "Measures digital asset inventory visibility, Zero Trust network segmentation, and remote worker endpoint security.",
    getFinding: (pct: number) =>
      pct >= 80
        ? "Your responses indicate real-time automated asset discovery, strict Zero Trust micro-segmentation, and EDR agents across all remote devices."
        : pct >= 50
        ? "Your responses indicate manual asset spreadsheets, basic VLAN segmentation, and basic corporate VPNs without full mobile/remote endpoint monitoring."
        : "Your responses indicate lack of centralized asset inventory, flat internal networks, and unmonitored remote access.",
    strengthsText: "Assessment indicates comprehensive digital asset visibility, zero-trust network segmentation, and secure endpoint management.",
    attentionText: "Asset visibility, network segmentation, or remote endpoint monitoring may benefit from centralized automated discovery tools.",
    recommendations: [
      "Deploy automated, real-time asset discovery tools to continuously map all digital endpoints and cloud tools.",
      "Implement micro-segmentation with a strict Zero Trust model between general devices and core data.",
      "Enforce Endpoint Detection & Response (EDR) agents and forced secure VPN paths for all remote workers."
    ]
  },
  Durga: {
    key: "durga",
    dimension: "Durga",
    modernName: "Access Control",
    shortLabel: "Access Control",
    ancientTitle: "Durga",
    measures: "Measures Multi-Factor Authentication (MFA) enforcement, Identity & Access Management (IAM) policies, and perimeter WAF/firewall protection.",
    getFinding: (pct: number) =>
      pct >= 80
        ? "Your responses indicate mandatory MFA across all entry points, centralized IAM with context-based login, and advanced WAF/NGFW filtering."
        : pct >= 50
        ? "Your responses indicate MFA enforced only for admin accounts, strong password length rules without SSO, and standard un-audited firewalls."
        : "Your responses indicate traditional password-only logins, weak credential constraints, and basic unmanaged internet routers.",
    strengthsText: "Assessment indicates mandatory multi-factor authentication, centralized identity management, and advanced perimeter protection.",
    attentionText: "Access control policies and perimeter firewalls indicate areas where mandatory MFA and centralized IAM should be expanded.",
    recommendations: [
      "Enforce mandatory Multi-Factor Authentication (MFA) across all user accounts, email, cloud apps, and VPNs.",
      "Centralize Identity & Access Management (IAM) with context-based login rules (IP, time restrictions).",
      "Deploy Next-Gen Firewalls (NGFW) and Web Application Firewalls (WAF) to shield public web services."
    ]
  },
  Kosha: {
    key: "kosha",
    dimension: "Kosha",
    modernName: "Data Protection",
    shortLabel: "Data Protection",
    ancientTitle: "Kosha",
    measures: "Measures end-to-end data encryption at rest and in transit, air-gapped backup resilience, and Data Loss Prevention (DLP) controls.",
    getFinding: (pct: number) =>
      pct >= 80
        ? "Your responses indicate active end-to-end data encryption, immutable air-gapped backups, and automated Data Loss Prevention (DLP) blocking."
        : pct >= 50
        ? "Your responses indicate data encryption at rest (but clear text in transit), connected cloud backups without restore testing, and basic permissions."
        : "Your responses indicate plain-text data storage, irregular or connected backups, and lack of database download alerts.",
    strengthsText: "Assessment indicates strong end-to-end encryption, isolated air-gapped backups, and active data loss prevention mechanisms.",
    attentionText: "Core data protection measures indicate potential gaps in transit encryption, backup isolation, or database leak controls.",
    recommendations: [
      "Ensure strong end-to-end encryption for sensitive customer and corporate data both at rest and in transit.",
      "Maintain automated, immutable (air-gapped) backups and test full system restoration procedures monthly.",
      "Implement active Data Loss Prevention (DLP) tools to block or flag massive data copies and external sharing."
    ]
  },
  Danda: {
    key: "danda",
    dimension: "Danda",
    modernName: "Monitoring & Response",
    shortLabel: "Monitoring & Response",
    ancientTitle: "Danda",
    measures: "Measures real-time SIEM security logging, automated vulnerability patching velocity, and external penetration testing frequency.",
    getFinding: (pct: number) =>
      pct >= 80
        ? "Your responses indicate a centralized SIEM with instant anomaly alerting, automated high-priority patching, and annual independent penetration tests."
        : pct >= 50
        ? "Your responses indicate application-level logs without alerts, manual patching a few times a year, and occasional automated scanning."
        : "Your responses indicate manual log inspection only after crashes, ad-hoc patching, and zero formal penetration testing.",
    strengthsText: "Assessment indicates real-time SIEM logging, automated high-priority vulnerability patching, and regular penetration testing.",
    attentionText: "Active monitoring and response capabilities suggest limited continuous logging, automated patching, or periodic ethical hacking.",
    recommendations: [
      "Centralize security event logging using a SIEM system to generate instant alerts for suspicious activity.",
      "Establish an automated high-priority patch management schedule to remediate severe bugs within days.",
      "Engage independent ethical hackers to conduct comprehensive penetration testing at least annually."
    ]
  },
  Mitra: {
    key: "mitra",
    dimension: "Mitra",
    modernName: "Third-Party Security",
    shortLabel: "Third-Party Security",
    ancientTitle: "Mitra",
    measures: "Measures third-party vendor security risk vetting, automated open-source SBOM code scanning, and continuous cloud CSPM audits.",
    getFinding: (pct: number) =>
      pct >= 80
        ? "Your responses indicate continuous vendor risk compliance reviews, automated SBOM code scanning in deployments, and continuous CSPM cloud audits."
        : pct >= 50
        ? "Your responses indicate basic vendor questionnaires, manual dependency updates, and manual cloud configuration reviews."
        : "Your responses indicate unverified vendor trust, un-vetted open-source package usage, and un-audited cloud provider defaults.",
    strengthsText: "Assessment indicates rigorous vendor risk reviews, automated SBOM software supply chain checks, and continuous cloud CSPM audits.",
    attentionText: "Supply chain and vendor risk management indicate potential exposure from third-party integrations, open-source libraries, or cloud configs.",
    recommendations: [
      "Perform strict security compliance reviews and continuous risk assessments on all external vendors.",
      "Integrate automated Software Bill of Materials (SBOM) and code scanning tools into every software deployment.",
      "Deploy continuous Cloud Security Posture Management (CSPM) tools to detect cloud misconfigurations instantly."
    ]
  }
};

export const DIMENSION_LIST: DimensionDetails[] = [
  DIMENSIONS_INFO.Swami,
  DIMENSIONS_INFO.Amatya,
  DIMENSIONS_INFO.Janapada,
  DIMENSIONS_INFO.Durga,
  DIMENSIONS_INFO.Kosha,
  DIMENSIONS_INFO.Danda,
  DIMENSIONS_INFO.Mitra,
];

export const getDimensionInfo = (key: string): DimensionDetails => {
  if (!key) return DIMENSIONS_INFO.Swami;
  const normalizedKey = key.trim();
  const capitalized = normalizedKey.charAt(0).toUpperCase() + normalizedKey.slice(1).toLowerCase();
  return (
    DIMENSIONS_INFO[capitalized] ||
    DIMENSIONS_INFO[normalizedKey] ||
    DIMENSIONS_INFO.Swami
  );
};



export const assessmentQuestions: Question[] = [
  // 1. Executive Governance (Swami)
  {
    id: 1,
    dimension: "Swami",
    title: "Executive Security Oversight",
    category: "Executive Governance",
    question: "How frequently does the executive board or top leadership review the company’s cybersecurity posture and incident response strategies?",
    options: [
      {
        text: "Never / We do not have a dedicated security discussion at the leadership level.",
        score: 0
      },
      {
        text: "Annually or only after a major security incident/breach occurs.",
        score: 2
      },
      {
        text: "Regularly (Quarterly or Monthly) with a dedicated CISO or security director.",
        score: 5
      }
    ]
  },
  {
    id: 2,
    dimension: "Swami",
    title: "Cyber Budget Allocation",
    category: "Executive Governance",
    question: "How is the cybersecurity budget allocated within the organization?",
    options: [
      {
        text: "No dedicated budget; security expenses are handled ad-hoc under general IT.",
        score: 0
      },
      {
        text: "Fixed annual budget, but it rarely scales to match new digital projects or threats.",
        score: 3
      },
      {
        text: "Dedicated, risk-indexed budget that dynamically scales with infrastructure growth.",
        score: 5
      }
    ]
  },
  {
    id: 3,
    dimension: "Swami",
    title: "Crisis Leadership Readiness",
    category: "Executive Governance",
    question: "Is there a clear, pre-approved chain of command authorized to make immediate critical decisions (like shutting down production servers) during a cyber crisis?",
    options: [
      {
        text: "No clear plan; decisions require multi-layered corporate approvals during the chaos.",
        score: 0
      },
      {
        text: "A plan exists on paper, but leadership has never tested or practiced it.",
        score: 3
      },
      {
        text: "Yes, a clear Incident Response Command structure is defined and drilled regularly.",
        score: 5
      }
    ]
  },

  // 2. IT & Security Team (Amatya)
  {
    id: 4,
    dimension: "Amatya",
    title: "Employee Phishing & Security Awareness",
    category: "IT & Security Team",
    question: "How often do non-technical employees undergo mandatory security awareness and anti-phishing training?",
    options: [
      {
        text: "Never / Only during initial onboarding years ago.",
        score: 0
      },
      {
        text: "Once a year via a standard video compliance course.",
        score: 2
      },
      {
        text: "Continuous training combined with regular, unannounced simulated phishing tests.",
        score: 5
      }
    ]
  },
  {
    id: 5,
    dimension: "Amatya",
    title: "Technical Team Capabilities",
    category: "IT & Security Team",
    question: "Do your IT and development staff possess up-to-date certifications or specialized training in secure coding and system administration?",
    options: [
      {
        text: "No, our IT team handles security purely based on general IT experience.",
        score: 0
      },
      {
        text: "Some team members are certified, but security training is not standard practice.",
        score: 3
      },
      {
        text: "Yes, continuous professional development and security certs are fully funded and required.",
        score: 5
      }
    ]
  },
  {
    id: 6,
    dimension: "Amatya",
    title: "Background Verification & Offboarding",
    category: "IT & Security Team",
    question: "What processes are followed when an employee leaves the company or changes roles?",
    options: [
      {
        text: "Accounts are disabled manually when someone remembers; no formal process.",
        score: 0
      },
      {
        text: "Basic background checks are done at hire, and accounts are closed within a few days of leaving.",
        score: 3
      },
      {
        text: "Strict automated offboarding (immediate account revocation) and strict background vetting.",
        score: 5
      }
    ]
  },

  // 3. Infrastructure & Network (Janapada)
  {
    id: 7,
    dimension: "Janapada",
    title: "Asset Visibility & Inventory",
    category: "Infrastructure & Network",
    question: "How accurately mapped is your organization’s digital footprint (servers, endpoints, IoT, software tools)?",
    options: [
      {
        text: "We do not have a centralized inventory; teams manage their own devices and cloud accounts.",
        score: 0
      },
      {
        text: "We maintain a manual spreadsheet of hardware and core software assets, updated periodically.",
        score: 3
      },
      {
        text: "We use automated, real-time asset discovery tools that continuously map our entire digital network.",
        score: 5
      }
    ]
  },
  {
    id: 8,
    dimension: "Janapada",
    title: "Network Segmentation",
    category: "Infrastructure & Network",
    question: "How are your internal networks structured to protect sensitive data from general employee devices?",
    options: [
      {
        text: "Flat network; any connected device can technically ping or communicate with core databases.",
        score: 0
      },
      {
        text: "Basic segmentation using VLANs, but rules are broad and loosely monitored.",
        score: 3
      },
      {
        text: "Micro-segmentation with a strict Zero Trust model (users only access exactly what they need).",
        score: 5
      }
    ]
  },
  {
    id: 9,
    dimension: "Janapada",
    title: "Remote & Mobile Work Security",
    category: "Infrastructure & Network",
    question: "How secure are endpoints used by remote workers or employees accessing corporate data on mobile devices?",
    options: [
      {
        text: "Unrestricted; employees log in from personal computers and public networks directly.",
        score: 0
      },
      {
        text: "Corporate laptops are issued with basic VPNs, but personal mobile access is unmonitored.",
        score: 3
      },
      {
        text: "Strict Endpoint Detection & Response (EDR) agents installed on all devices with forced secure VPN paths.",
        score: 5
      }
    ]
  },

  // 4. Perimeter & Access Control (Durga)
  {
    id: 10,
    dimension: "Durga",
    title: "Multi-Factor Authentication (MFA)",
    category: "Perimeter & Access Control",
    question: "Where is Multi-Factor Authentication (MFA/2FA) enforced across your organization?",
    options: [
      {
        text: "MFA is not enforced; employees log in using only traditional passwords.",
        score: 0
      },
      {
        text: "Enforced only for high-privilege administrator accounts or core email services.",
        score: 3
      },
      {
        text: "Strictly mandatory for all user accounts, email, cloud applications, and VPN entry points.",
        score: 5
      }
    ]
  },
  {
    id: 11,
    dimension: "Durga",
    title: "Password and Access Control Policies",
    category: "Perimeter & Access Control",
    question: "How does your organization enforce credential security and access rights?",
    options: [
      {
        text: "Weak constraints; users choose their own simple passwords and rarely change them.",
        score: 0
      },
      {
        text: "Strong password length rules are enforced, but we do not use a centralized single sign-on (SSO).",
        score: 3
      },
      {
        text: "Centralized Identity & Access Management (IAM) with context-based login rules (IP, time restriction).",
        score: 5
      }
    ]
  },
  {
    id: 12,
    dimension: "Durga",
    title: "Perimeter Firewalls & WAFs",
    category: "Perimeter & Access Control",
    question: "How are your public-facing web services and applications shielded from external network attacks?",
    options: [
      {
        text: "Basic internet routers; web applications are exposed directly to the public web.",
        score: 0
      },
      {
        text: "Standard network firewalls are configured, but rules are rarely audited or updated.",
        score: 3
      },
      {
        text: "Advanced Next-Gen Firewalls (NGFW) and Web Application Firewalls (WAF) filter incoming bad traffic.",
        score: 5
      }
    ]
  },

  // 5. Data & Assets (Kosha)
  {
    id: 13,
    dimension: "Kosha",
    title: "Data Encryption",
    category: "Data & Assets",
    question: "Is sensitive corporate and customer data (PII, financial data) encrypted?",
    options: [
      {
        text: "No, data is stored in plain text inside local folders or unsecured databases.",
        score: 0
      },
      {
        text: "Data is encrypted while sitting on the disk (at rest), but sent over the network in clear text (in transit).",
        score: 3
      },
      {
        text: "End-to-end encryption is active; data is strongly encrypted both at rest and in transit.",
        score: 5
      }
    ]
  },
  {
    id: 14,
    dimension: "Kosha",
    title: "Backup Resilience",
    category: "Data & Assets",
    question: "How are your system backups managed and secured against destructive attacks like ransomware?",
    options: [
      {
        text: "We do not take regular backups / Backups are stored manually on connected office hard drives.",
        score: 0
      },
      {
        text: "Scheduled cloud backups exist, but they are connected to the main network and have never been tested for a restore.",
        score: 3
      },
      {
        text: "Immutable, isolated (air-gapped) backups are automatically generated and tested monthly.",
        score: 5
      }
    ]
  },
  {
    id: 15,
    dimension: "Kosha",
    title: "Data Loss Prevention (DLP)",
    category: "Data & Assets",
    question: "What mechanisms stop an employee or hacker from downloading and stealing your core database?",
    options: [
      {
        text: "None; anyone with database access can download or copy unlimited records.",
        score: 0
      },
      {
        text: "Access is restricted by database permissions, but data movement is not logged or alerted.",
        score: 3
      },
      {
        text: "Active Data Loss Prevention (DLP) tools block or flag massive data copies and external sharing.",
        score: 5
      }
    ]
  },

  // 6. Active Defense & Monitoring (Danda)
  {
    id: 16,
    dimension: "Danda",
    title: "Security Logging & Monitoring",
    category: "Active Defense & Monitoring",
    question: "How does your organization monitor security events and system anomalies in real time?",
    options: [
      {
        text: "No centralized logging; we only look at logs manually after a system crashes or acts weird.",
        score: 0
      },
      {
        text: "Basic logs are collected by individual applications, but we lack an automated alert system.",
        score: 3
      },
      {
        text: "Centralized SIEM system logs all activity and generates instant alerts for suspicious patterns.",
        score: 5
      }
    ]
  },
  {
    id: 17,
    dimension: "Danda",
    title: "Vulnerability Management & Patching",
    category: "Active Defense & Monitoring",
    question: "How quickly are newly discovered software bugs and operating system security patches applied?",
    options: [
      {
        text: "Ad-hoc or never; we only update software if it completely breaks down.",
        score: 0
      },
      {
        text: "Manually updated a few times a year, leaving systems exposed to known exploits for months.",
        score: 2
      },
      {
        text: "Automated, high-priority patching schedule that closes severe bugs within days of release.",
        score: 5
      }
    ]
  },
  {
    id: 18,
    dimension: "Danda",
    title: "Penetration Testing",
    category: "Active Defense & Monitoring",
    question: "How frequently do you hire external ethical hackers to deliberately test your defenses?",
    options: [
      {
        text: "We have never conducted a formal penetration test or external vulnerability audit.",
        score: 0
      },
      {
        text: "We run automated vulnerability scanners occasionally, but don't do deep human penetration tests.",
        score: 3
      },
      {
        text: "Comprehensive independent penetration testing is conducted at least once a year.",
        score: 5
      }
    ]
  },

  // 7. Supply Chain Security (Mitra)
  {
    id: 19,
    dimension: "Mitra",
    title: "Third-Party Vendor Risk Assessment",
    category: "Supply Chain Security",
    question: "How do you evaluate the cybersecurity posture of external vendors who have access to your data or network?",
    options: [
      {
        text: "We do not check their security; we trust them based entirely on business contracts.",
        score: 0
      },
      {
        text: "We ask them to fill out a basic safety questionnaire, but do not verify their certificates.",
        score: 3
      },
      {
        text: "Strict security compliance reviews and continuous risk assessments are required before signing.",
        score: 5
      }
    ]
  },
  {
    id: 20,
    dimension: "Mitra",
    title: "Software Supply Chain Security",
    category: "Supply Chain Security",
    question: "How does your development team verify that open-source code libraries or third-party APIs used in your software are secure?",
    options: [
      {
        text: "Developers download and use any open-source code package without vetting.",
        score: 0
      },
      {
        text: "We check for updates manually, but lack automated checking tools for code vulnerabilities.",
        score: 3
      },
      {
        text: "Automated Software Bill of Materials (SBOM) and code scanning tools run on every deployment.",
        score: 5
      }
    ]
  },
  {
    id: 21,
    dimension: "Mitra",
    title: "Cloud Provider Governance",
    category: "Supply Chain Security",
    question: "How frequently are the configuration settings of your cloud providers (AWS, Azure, Google Cloud) audited for security mistakes?",
    options: [
      {
        text: "Configured once at setup; we assume the cloud provider handles all security configurations.",
        score: 0
      },
      {
        text: "Audited manually by the IT team during system modifications or reviews.",
        score: 3
      },
      {
        text: "Continuous Cloud Security Posture Management (CSPM) tools run to detect misconfigurations instantly.",
        score: 5
      }
    ]
  }
];
