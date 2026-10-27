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
  image: string;
  intro: string;
  applications: string[];
  includes: string[];
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
    short:
      "CCTV surveillance installation by an Ajman Police approved installer.",
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
  },
  {
    slug: "access-control-system",
    name: "Access Control System",
    short: "Control who enters your premises, and when.",
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
  },
  {
    slug: "time-management-system",
    name: "Time Management System",
    short: "Attendance terminals for accurate staff time records.",
    image: time,
    intro:
      "Time management systems record staff attendance with terminals such as fingerprint or card readers, giving businesses dependable time records.",
    applications: ["Offices", "Retail teams", "Workshops and sites"],
    includes: [
      "Attendance terminal installation",
      "Staff enrolment setup",
      "Attendance record access",
    ],
  },
  {
    slug: "computer-services",
    name: "Computer Services",
    short: "Setup, maintenance and support for your computers.",
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
  },
  {
    slug: "networking",
    name: "Networking",
    short: "Structured cabling and network infrastructure.",
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
  },
  {
    slug: "gate-barrier-system",
    name: "Gate Barrier System",
    short: "Automated barriers for vehicle entry points.",
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
  },
];

export const getService = (slug: string) =>
  SERVICES.find((s) => s.slug === slug);
