import security from "@/assets/svc-securtiy.png";
import access from "@/assets/svc-access.png";
import time from "@/assets/svc-time.jpg";
import computer from "@/assets/svc-computer.png";
import network from "@/assets/svc-network.png";
import gate from "@/assets/svc-gate.png";

// Service names come from ANTECH's existing website (antechuae.com/services).
// Descriptions are general explanations of each service category; detailed
// specifications, brands and project examples are to be supplied by ANTECH.
export type Service = {
  slug: string;
  name: string;
  short: string;
  catalogSummary: string;
  highlights: string[];
  image: string;
  intro: string;
  applications: string[];
  includes: string[];
  overview: string[];
  benefits: string[];
  related: string[];
};

export const COMPANY = {
  brand: "ANTECH",
  legal: "Al Naseeb Technical Services",
  address: "Al Muwaihat 3, Ajman, United Arab Emirates",
  phones: [
    { display: "056 606 9970", tel: "+971566069970" },
    { display: "055 690 5001", tel: "+971556905001" },
  ],
  whatsapp: "971566069970",
  email: "sales@antechuae.com",
  hours: "09:00 am – 10:00 pm",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Al+Muwaihat+3+Ajman+UAE",
};

export const SERVICES: Service[] = [
  {
    slug: "security-system",
    name: "Security System",
    short: "CCTV surveillance, recording and video management for your premises.",
    catalogSummary:
      "CCTV surveillance and video management for homes, shops, offices, warehouses and multi-site premises.",
    highlights: [
      "CCTV camera installation",
      "Recording and monitoring setup",
      "Video management across multiple premises",
    ],
    image: security,
    intro:
      "ANTECH is one of the Ajman Police approved CCTV installers, installing the latest surveillance systems of various specifications and brands.",
    applications: [
      "Villas and residences",
      "Shops and retail",
      "Offices",
      "Warehouses and facilities",
    ],
    includes: [
      "CCTV camera installation",
      "Recording and monitoring setup",
      "Systems of various specifications and brands",
    ],
    overview: [
      "ANTECH describes its security work as covering the design, installation and maintenance of electronic security systems, with assessment, programming and handover forming part of the process.",
      "The original service information also describes centralized CCTV video management across multiple premises, remote monitoring and operator reporting. The right arrangement depends on the site and the requirements discussed during an assessment.",
    ],
    benefits: [
      "Review live or recorded camera views for a clearer picture of activity at a premises.",
      "Bring camera coverage for multiple locations into a centralized video management workflow where appropriate.",
      "Choose a system layout around the areas and operational needs that matter to the site.",
    ],
    related: ["access-control-system", "gate-barrier-system", "networking"],
  },
  {
    slug: "access-control-system",
    name: "Access Control System",
    short: "Control who enters your premises, and when.",
    catalogSummary:
      "Manage entry to office doors, restricted rooms and residential entrances with configured access permissions.",
    highlights: [
      "Door access readers",
      "Card, PIN or biometric credentials",
      "Electric lock and user setup",
    ],
    image: access,
    intro:
      "Access control systems manage entry to doors and restricted areas using credentials such as cards, PIN codes or biometrics.",
    applications: [
      "Office entrances",
      "Server and storage rooms",
      "Residential buildings",
    ],
    includes: [
      "Door access readers",
      "Electric lock integration",
      "User access configuration",
    ],
    overview: [
      "Access control manages entry to selected doors or areas. A reader checks a credential, and the system applies the access permissions configured for that entrance.",
      "ANTECH's existing service information lists card, PIN and biometric credentials, door readers, electric lock integration and user access configuration. The suitable credential and door arrangement varies by premises.",
    ],
    benefits: [
      "Set controlled entry for selected doors and restricted rooms.",
      "Manage who is permitted to use a configured entrance.",
      "Use an access arrangement suited to the premises and its day-to-day entry needs.",
    ],
    related: ["time-management-system", "security-system", "gate-barrier-system"],
  },
  {
    slug: "time-management-system",
    name: "Time Management System",
    short: "Attendance terminals for accurate staff time records.",
    catalogSummary:
      "Record staff clock-ins and clock-outs at offices, retail teams and work sites using attendance terminals.",
    highlights: [
      "Attendance terminal setup",
      "Staff enrolment",
      "Attendance record access",
    ],
    image: time,
    intro:
      "Time management systems record staff attendance with terminals such as fingerprint or card readers, giving businesses dependable time records.",
    applications: ["Offices", "Retail teams", "Workshops and sites"],
    includes: [
      "Attendance terminal installation",
      "Staff enrolment setup",
      "Attendance record access",
    ],
    overview: [
      "Time management systems record staff clock-in and clock-out activity through an attendance terminal. Businesses can use these records to review attendance and support routine workforce administration.",
      "The current project information describes fingerprint or card readers, staff enrolment and access to attendance records. Available reporting depends on the selected system and its configuration.",
    ],
    benefits: [
      "Keep attendance records in a consistent system instead of relying only on manual notes.",
      "Review clock-in and clock-out activity for enrolled staff.",
      "Choose a terminal credential method suited to the workplace.",
    ],
    related: ["access-control-system", "computer-services", "networking"],
  },
  {
    slug: "computer-services",
    name: "Computer Services",
    short: "Setup, maintenance and support for your computers.",
    catalogSummary:
      "Computer setup and troubleshooting for SMEs, offices and retail workstations that rely on day-to-day IT.",
    highlights: [
      "Hardware setup",
      "Troubleshooting and repair",
      "Routine maintenance",
    ],
    image: computer,
    intro:
      "Computer services cover the setup, troubleshooting and maintenance of workstations so your business keeps running.",
    applications: [
      "Small and medium businesses",
      "Home offices",
      "Retail point-of-sale stations",
    ],
    includes: [
      "Hardware setup",
      "Troubleshooting and repair",
      "Routine maintenance",
    ],
    overview: [
      "Business computers support daily work such as communication, document handling and point-of-sale operations. Setup and troubleshooting help keep those workstations usable as business needs change.",
      "ANTECH's original computer services page focuses on IT needs for small and medium enterprises and describes work across Dubai, Ajman and Sharjah. The current project lists hardware setup, troubleshooting, repair and routine maintenance.",
    ],
    benefits: [
      "Get help setting up workstations for business use.",
      "Investigate computer issues that interrupt day-to-day tasks.",
      "Discuss routine maintenance needs for the equipment in use.",
    ],
    related: ["networking", "time-management-system", "security-system"],
  },
  {
    slug: "networking",
    name: "Networking",
    short: "Structured cabling and network infrastructure.",
    catalogSummary:
      "Plan cabling and connectivity for new offices, network expansions and connected workplace or security devices.",
    highlights: [
      "Structured cabling",
      "Rack and patch panel setup",
      "Connectivity for connected devices",
    ],
    image: network,
    intro:
      "Networking services build the cabling and connectivity your cameras, computers and access systems depend on.",
    applications: [
      "New office fit-outs",
      "Network expansions",
      "Security system backbones",
    ],
    includes: [
      "Structured cabling",
      "Network rack and patch panel setup",
      "Connectivity for connected devices",
    ],
    overview: [
      "A business network connects computers and other devices so they can communicate and reach shared resources. A useful network plan considers where devices are located, how they connect and what coverage the premises needs.",
      "The current project describes structured cabling, network rack and patch panel setup, and connectivity for connected devices. These foundations can support office equipment and connected security systems; the final scope depends on the site.",
    ],
    benefits: [
      "Organize wired connections and equipment around the layout of a premises.",
      "Plan capacity and coverage as offices or device needs change.",
      "Provide network connectivity for compatible business and security devices.",
    ],
    related: ["security-system", "computer-services", "access-control-system"],
  },
  {
    slug: "gate-barrier-system",
    name: "Gate Barrier System",
    short: "Automated barriers for vehicle entry points.",
    catalogSummary:
      "Plan controlled vehicle entry for parking areas and residential, commercial or industrial premises.",
    highlights: [
      "Barrier installation",
      "Vehicle entry point setup",
      "Access control integration",
    ],
    image: gate,
    intro:
      "Gate barrier systems control vehicle access at parking areas and site entrances with automated boom barriers.",
    applications: [
      "Parking entrances",
      "Residential compounds",
      "Commercial and industrial sites",
    ],
    includes: [
      "Barrier installation",
      "Access control integration",
      "Entry point setup",
    ],
    overview: [
      "A vehicle barrier controls when cars can pass through a driveway or parking entrance. It can help organize an entry point where vehicles need to stop for an access decision.",
      "The current project lists barrier installation, entry point setup and access control integration. Site layout, traffic flow and the required control method should be considered before selecting an arrangement.",
    ],
    benefits: [
      "Create a defined vehicle entry point for a property.",
      "Coordinate an entrance with an access process where the selected system supports it.",
      "Consider the physical layout and expected vehicle movement when planning the installation.",
    ],
    related: ["access-control-system", "security-system", "networking"],
  },
];

export const getService = (slug: string) =>
  SERVICES.find((s) => s.slug === slug);
