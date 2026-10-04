export interface Limb {
  id: string;
  number: string;
  name: string;
  sanskrit: string;
  ancientTitle: string;
  ancientMeaning: string;
  modernTitle: string;
  modernMapping: string[];
  ancientConcept: string;
  modernEquivalent: string;
  iconName: string;
  color: string;
}

export const saptangaLimbs: Limb[] = [
  {
    id: "swami",
    number: "01",
    name: "SWAMI",
    sanskrit: "स्वामी",
    ancientTitle: "The Ruler",
    ancientMeaning: "Leadership, vision and strategic direction of the kingdom.",
    modernTitle: "Executive Governance",
    modernMapping: [
      "CISO oversight",
      "Security budget",
      "Board awareness",
      "Incident response authority",
      "Security strategy"
    ],
    ancientConcept: "The ruler establishes the direction, purpose, and strategic priorities of the entire state.",
    modernEquivalent: "Leadership and governance establish the organization's security posture and compliance direction.",
    iconName: "Crown",
    color: "#C8A96B"
  },
  {
    id: "amatya",
    number: "02",
    name: "AMATYA",
    sanskrit: "अमात्य",
    ancientTitle: "The Ministers",
    ancientMeaning: "Administrative personnel and officials responsible for running the kingdom.",
    modernTitle: "People & Security Culture",
    modernMapping: [
      "Employee security awareness",
      "IT and security teams",
      "Incident response team",
      "Staff training",
      "HR & offboarding policies"
    ],
    ancientConcept: "Wise ministers execute administrative duties and ensure organizational cohesion.",
    modernEquivalent: "Cybersecurity is not only technology — human behavior, training, and operational culture form the frontline.",
    iconName: "Users",
    color: "#E3C77F"
  },
  {
    id: "janapada",
    number: "03",
    name: "JANAPADA",
    sanskrit: "जनपद",
    ancientTitle: "The Territory",
    ancientMeaning: "The land, population and resources that form the physical expanse of the kingdom.",
    modernTitle: "Infrastructure & Digital Footprint",
    modernMapping: [
      "Cloud infrastructure",
      "Servers & Endpoints",
      "Network environment",
      "IoT & Edge devices",
      "Remote workforce",
      "Asset inventory"
    ],
    ancientConcept: "A sovereign state relies on knowing and securing all territories and resources within its borders.",
    modernEquivalent: "You cannot protect digital assets that you do not know exist; complete asset visibility is foundational.",
    iconName: "Network",
    color: "#9CAF84"
  },
  {
    id: "durga",
    number: "04",
    name: "DURGA",
    sanskrit: "दुर्ग",
    ancientTitle: "The Fort",
    ancientMeaning: "Defensive fortifications and bastions protecting the kingdom from intrusion.",
    modernTitle: "Perimeter & Access Control",
    modernMapping: [
      "Next-Gen Firewalls",
      "Multi-Factor Auth (MFA)",
      "Identity & Access Management (IAM)",
      "Zero Trust Architecture",
      "Web Application Firewall (WAF)",
      "Role-Based Access Control"
    ],
    ancientConcept: "A well-designed fort controls access points, scrutinizes entrants, and repels external sieges.",
    modernEquivalent: "Modern cybersecurity utilizes strict identity verification, network segmentation, and zero trust bastions.",
    iconName: "Shield",
    color: "#D4AF37"
  },
  {
    id: "kosha",
    number: "05",
    name: "KOSHA",
    sanskrit: "कोष",
    ancientTitle: "The Treasury",
    ancientMeaning: "The treasury protects the accumulated wealth, gold, and core economic reserves of the state.",
    modernTitle: "Data & Digital Assets",
    modernMapping: [
      "End-to-end Encryption",
      "Database security",
      "Immutable Backups",
      "Data Loss Prevention (DLP)",
      "Intellectual Property protection",
      "Customer Data Vaults"
    ],
    ancientConcept: "The kingdom's core reserves must be safeguarded in heavily guarded vaults against theft or corruption.",
    modernEquivalent: "In modern digital enterprises, data is the primary treasury — requiring strict encryption and protection.",
    iconName: "Database",
    color: "#E3C77F"
  },
  {
    id: "danda",
    number: "06",
    name: "DANDA",
    sanskrit: "दण्ड",
    ancientTitle: "The Army / Force",
    ancientMeaning: "The disciplined military force responsible for active defense, enforcement, and swift response.",
    modernTitle: "Active Defense & Monitoring",
    modernMapping: [
      "SIEM & SOAR analytics",
      "24/7 Security Monitoring",
      "Threat Detection & EDR",
      "Vulnerability Patching",
      "Incident Response Teams",
      "Proactive Threat Hunting"
    ],
    ancientConcept: "A passive wall is insufficient; a trained army actively patrols, detects breaches, and neutralizes threats.",
    modernEquivalent: "Security requires constant vigilance, rapid threat detection, automated response, and threat hunting.",
    iconName: "Swords",
    color: "#C8A96B"
  },
  {
    id: "mitra",
    number: "07",
    name: "MITRA",
    sanskrit: "मित्र",
    ancientTitle: "The Ally",
    ancientMeaning: "Trusted international alliances and diplomatic treaties that bolster security.",
    modernTitle: "Supply Chain & Third-Party Security",
    modernMapping: [
      "Vendor risk assessment",
      "Third-party integrations",
      "API Security",
      "Cloud Service Provider Audits",
      "Open-source dependency scanning",
      "Software supply chain validation"
    ],
    ancientConcept: "A kingdom's resilience is tied to the reliability and strength of its strategic alliance network.",
    modernEquivalent: "Organizations are deeply vulnerable to third-party software supply chain and API partner compromises.",
    iconName: "Handshake",
    color: "#9CAF84"
  }
];

export const projectMeta = {
  title: "SaptangaShield",
  tagline: "Ancient Wisdom. Modern Defense.",
  subtitle: "ANCIENT STRATEGY • MODERN CYBER DEFENSE",
  academicNote: "Academic Prototype • EAA Sports",
  disclaimer: "Saptanga is an ancient Arthashastra framework describing seven essential elements of a resilient kingdom. SaptangaShield uses this framework as inspiration for a modern cybersecurity defense model."
};
