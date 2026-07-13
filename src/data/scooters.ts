export interface ScooterQuickFact {
  label: string;
  value: string;
}

export interface ScooterCatalogEntry {
  id: number;
  brand: string;
  model: string;
  year?: string;
  slug: string;
  description: string;
  segment: "urban" | "performance" | "commuter" | "utility";
  highlights: string[];
  quickFacts: ScooterQuickFact[];
  specs: Array<{ label: string; value: string }>;
  tuningOptions: Array<{ title: string; detail: string }>;
  maintenanceChecklist: string[];
  commonIssues: string[];
  firmwareNotes: string[];
  hardwareNotes: string[];
  communityNotes: string[];
}

const baseEntries = [
  { brand: "Xiaomi", model: "M365", year: "2016" },
  { brand: "Xiaomi", model: "1S", year: "2018" },
  { brand: "Xiaomi", model: "Essential", year: "2019" },
  { brand: "Xiaomi", model: "Pro", year: "2019" },
  { brand: "Xiaomi", model: "Pro 2", year: "2020" },
  { brand: "Xiaomi", model: "Mi 3", year: "2021" },
  { brand: "Xiaomi", model: "Mi 4", year: "2023" },
  { brand: "Ninebot / Segway", model: "ES Series", year: "2018" },
  { brand: "Ninebot / Segway", model: "E Series", year: "2019" },
  { brand: "Ninebot / Segway", model: "Max G30", year: "2019" },
  { brand: "Ninebot / Segway", model: "Max G2", year: "2020" },
  { brand: "Ninebot / Segway", model: "F Series", year: "2021" },
  { brand: "Ninebot / Segway", model: "GT Series", year: "2022" },
  { brand: "Dualtron", model: "Ultra", year: "2019" },
  { brand: "Dualtron", model: "Thunder", year: "2020" },
  { brand: "Dualtron", model: "Storm", year: "2021" },
  { brand: "Dualtron", model: "Victor", year: "2022" },
  { brand: "Vsett", model: "8", year: "2020" },
  { brand: "Vsett", model: "9+", year: "2021" },
  { brand: "Vsett", model: "10+", year: "2022" },
  { brand: "Vsett", model: "11+", year: "2023" },
  { brand: "Kaabo", model: "Mantis", year: "2020" },
  { brand: "Kaabo", model: "Wolf Warrior", year: "2021" },
  { brand: "Kaabo", model: "Skywalker", year: "2022" },
  { brand: "NIU", model: "KQi2", year: "2020" },
  { brand: "NIU", model: "KQi3", year: "2022" },
  { brand: "Pure", model: "Air", year: "2021" },
  { brand: "SoFlow", model: "SO4", year: "2022" },
  { brand: "Egret", model: "Ten", year: "2022" },
  { brand: "Apollo", model: "City", year: "2021" },
  { brand: "Apollo", model: "Explore", year: "2022" },
  { brand: "Inokim", model: "Oxo", year: "2020" },
  { brand: "Inokim", model: "Light", year: "2021" },
  { brand: "Unagi", model: "Model One", year: "2021" },
  { brand: "Other", model: "Generic", year: "N/A" },
];

const familyProfiles: Record<string, {
  platform: string;
  controller: string;
  dashboard: string;
  battery: string;
  motor: string;
  speed: string;
  maintenance: string;
  firmwareFocus: string;
  communityFocus: string;
  repairs: string[];
  tuningOptions: Array<{ title: string; detail: string }>;
  maintenanceChecklist: string[];
  commonIssues: string[];
}> = {
  Xiaomi: {
    platform: "M365-class scooter platform",
    controller: "STM32F103-based ESC or close derivative",
    dashboard: "M365-style dashboard with BLE connectivity",
    battery: "36 V pack architecture, commonly 10S lithium-ion",
    motor: "Hub motor with a compact controller footprint",
    speed: "Typically 20–25 km/h depending on region",
    maintenance: "Controller, display, and battery connector inspection",
    firmwareFocus: "BLE, DRV, and BMS-related firmware references",
    communityFocus: "Dashboard flashing and controller compatibility",
    repairs: ["Inspect battery connectors", "Check throttle hall wiring", "Verify display cable seating"],
    tuningOptions: [
      { title: "Controller tuning", detail: "Tune current limiting, acceleration ramps, and speed limiter behavior with a backup firmware image and a validated controller toolchain." },
      { title: "Display and BLE mods", detail: "Adjust BLE pairing behavior, display refresh settings, and dashboard firmware compatibility for aftermarket or custom builds." },
      { title: "Battery and BMS adjustments", detail: "Review cell balancing, charger behavior, and low-voltage cutoff thresholds when increasing range or changing pack chemistry." },
    ],
    maintenanceChecklist: [
      "Inspect throttle and brake hall sensors for drift and noise.",
      "Verify battery terminal condition, insulation, and connector seating.",
      "Test charger behavior, LED status, and charge cut-off stability.",
    ],
    commonIssues: [
      "Loose display or throttle connectors causing intermittent faults.",
      "Battery pack imbalance after heavy use or age.",
      "Firmware flashing failures from mismatched controller variants.",
    ],
  },
  "Ninebot / Segway": {
    platform: "Integrated Ninebot/Segway platform",
    controller: "Proprietary controller with CAN/UART communication",
    dashboard: "LCD or LED display with vehicle telemetry",
    battery: "36 V or 48 V battery packs depending on series",
    motor: "Hub motor architecture tuned for urban commuting",
    speed: "Usually 20–30 km/h for consumer variants",
    maintenance: "Display, brake cutoffs, and BMS health checks",
    firmwareFocus: "Vehicle firmware, BLE bridge, and service diagnostics",
    communityFocus: "Controller tuning, diagnostics, and reverse engineering",
    repairs: ["Check brake lever sensors", "Inspect display harness", "Validate BMS balance and charging"],
    tuningOptions: [
      { title: "Speed and torque tuning", detail: "Adjust acceleration curves, speed limits, and power maps through supported firmware profiles while preserving brake and thermal safety." },
      { title: "Diagnostics and telemetry", detail: "Use service diagnostics, error logs, and telemetry overlays to isolate controller or display faults before changing firmware." },
      { title: "Suspension and ride feel", detail: "Pair firmware changes with tire pressure, suspension tuning, and weight distribution improvements for a better street setup." },
    ],
    maintenanceChecklist: [
      "Inspect brake cutoffs and lever sensor alignment.",
      "Check the display harness, connectors, and waterproofing.",
      "Review BMS temperature, charge behavior, and pack balancing.",
    ],
    commonIssues: [
      "Brake sensor faults that trigger unexpected cutouts.",
      "Controller communication errors after water ingress or rough handling.",
      "Battery charging inconsistencies after repeated high-current use.",
    ],
  },
  Dualtron: {
    platform: "High-performance electric scooter platform",
    controller: "High-current ESC with aggressive power delivery",
    dashboard: "Performance display with speed, voltage, and trip data",
    battery: "High-capacity lithium packs with heavy current draw",
    motor: "High-power hub or mid-drive layout depending on revision",
    speed: "Often 40–70 km/h depending on legal and hardware setup",
    maintenance: "Power stage, brake cutoffs, and thermal management",
    firmwareFocus: "Controller tuning, current limiting, and thermal safety",
    communityFocus: "Performance tuning and controller upgrades",
    repairs: ["Inspect MOSFET heat sinking", "Check brake sensors", "Verify battery pack balance"],
    tuningOptions: [
      { title: "High-power controller tuning", detail: "Tune current limits, acceleration profiles, and thermal cutoffs for higher performance while monitoring MOSFET temperature and BMS stress." },
      { title: "Battery and power delivery", detail: "Optimize battery configuration, connector quality, and discharge behavior for sustained high-current riding." },
      { title: "Brake and safety tuning", detail: "Validate brake lever response, regen behavior, and cutout thresholds before chasing max power gains." },
    ],
    maintenanceChecklist: [
      "Inspect controller heatsinks, fan paths, and thermal paste condition.",
      "Check controller wiring, phase lead insulation, and connector torque.",
      "Test brake cutoff logic and battery voltage sag under load.",
    ],
    commonIssues: [
      "Thermal shutdown during repeated hard acceleration.",
      "Loose high-current connectors creating intermittent power loss.",
      "Battery sag and voltage drop under aggressive use.",
    ],
  },
  Vsett: {
    platform: "Performance commuter platform",
    controller: "High-current controller with strong torque delivery",
    dashboard: "Display plus Bluetooth or app connectivity",
    battery: "Large 60 V or 72 V pack options in many builds",
    motor: "Powerful hub motor design with strong acceleration",
    speed: "Commonly 35–50 km/h in tuned variants",
    maintenance: "Controller cooling, throttle calibration, and battery health",
    firmwareFocus: "Controller firmware, speed limiters, and power tuning",
    communityFocus: "Firmware flashing and power management adjustments",
    repairs: ["Inspect throttle calibration", "Check controller connectors", "Monitor thermal runaway risks"],
    tuningOptions: [
      { title: "Power curve tuning", detail: "Adjust acceleration ramping, current limits, and speed override settings for a more aggressive or more efficient street setup." },
      { title: "Throttle and braking calibration", detail: "Calibrate throttle deadbands, regen feel, and brake-cutoff timing for smoother and safer riding." },
      { title: "Battery management", detail: "Tune low-voltage cutoff thresholds, charging profiles, and pack balancing approach for daily use or long-range sessions." },
    ],
    maintenanceChecklist: [
      "Check throttle calibration after any controller change.",
      "Inspect controller cooling, wiring integrity, and fastener tightness.",
      "Review pack temperature and balance during charging and discharge.",
    ],
    commonIssues: [
      "Controller resets after thermal stress.",
      "Throttle jitter from poor calibration or aging hall sensors.",
      "Rapid battery degradation when charging or discharging outside recommended limits.",
    ],
  },
  Kaabo: {
    platform: "Utility and performance platform",
    controller: "High-current controller with thermal protection",
    dashboard: "Large display with ride telemetry",
    battery: "High-capacity packs for long-range riding",
    motor: "Powerful hub or motorized wheel package",
    speed: "Often 35–60 km/h in performance editions",
    maintenance: "Battery pack, controller cooling, and brake integration",
    firmwareFocus: "Power management, limiter settings, and diagnostic firmware",
    communityFocus: "Range tuning and hardware safety practices",
    repairs: ["Inspect cooling fan and heatsink", "Check brake cutoff wiring", "Validate pack voltage matching"],
    tuningOptions: [
      { title: "Range and efficiency tuning", detail: "Tune power delivery, controller limits, and tire pressure balance to improve efficiency on long rides." },
      { title: "Cooling and thermal management", detail: "Improve airflow around the controller and battery region before chasing higher peak power figures." },
      { title: "Structural and ride setup", detail: "Refine suspension, weight distribution, and deck stiffness for better high-speed stability and comfort." },
    ],
    maintenanceChecklist: [
      "Inspect controller heatsink and cooling path.",
      "Check brake cutoff wiring, connectors, and insulation.",
      "Verify pack balancing and temperature under load.",
    ],
    commonIssues: [
      "Heat-related controller throttling during sustained climbs.",
      "Loose or damaged wiring near the deck and stem.",
      "Cell imbalance or poor charging behavior after hard use.",
    ],
  },
  NIU: {
    platform: "Urban commuter platform",
    controller: "Integrated compact controller and BMS setup",
    dashboard: "Smart dashboard with app and connectivity features",
    battery: "Compact removable packs for urban use",
    motor: "Efficient commuter motor with balanced range",
    speed: "Typically 20–30 km/h",
    maintenance: "Battery health, display connection, and charger diagnostics",
    firmwareFocus: "Dashboard and charging-related firmware",
    communityFocus: "Urban commuting reliability and battery care",
    repairs: ["Check charger and charging port", "Inspect battery latch contacts", "Verify display cable routing"],
    tuningOptions: [
      { title: "Commuter efficiency tuning", detail: "Optimize throttle response, cruise behavior, and regenerative feel for urban stop-start riding." },
      { title: "Charging and battery care", detail: "Use consistent charge habits and monitor pack temperature to preserve capacity and avoid sudden range dropoffs." },
      { title: "Accessory and display improvements", detail: "Upgrade displays, mounts, and lighting with attention to power draw and cable routing." },
    ],
    maintenanceChecklist: [
      "Inspect the charger and port contacts for oxidation.",
      "Check battery latch engagement and pack seating.",
      "Verify display cable routing and weather sealing.",
    ],
    commonIssues: [
      "Charging interruptions or charger handshake glitches.",
      "Display instability after vibration or rough handling.",
      "Battery capacity fade from shallow cycling or poor storage practices.",
    ],
  },
  Pure: {
    platform: "Lightweight commuter platform",
    controller: "Compact controller with efficient commuter tuning",
    dashboard: "Simple display with essential ride data",
    battery: "Lightweight removable-suit pack design",
    motor: "Efficient and quiet urban power unit",
    speed: "Usually 20–25 km/h",
    maintenance: "Throttle, brakes, and charger inspection",
    firmwareFocus: "Ride settings and basic controller calibration",
    communityFocus: "Commuter reliability and easy maintenance",
    repairs: ["Inspect quick-release connectors", "Check brake cutoffs", "Verify charging port condition"],
    tuningOptions: [
      { title: "Lightweight commuter tuning", detail: "Tune acceleration feel and speed limiters for smoother daily use without sacrificing safety or range." },
      { title: "Maintenance-friendly upgrades", detail: "Prioritize easy-access connectors, better grip, and simple lighting upgrades that do not overload the system." },
      { title: "Charge management", detail: "Use proper charging routines and avoid prolonged storage at full charge to keep the pack healthy." },
    ],
    maintenanceChecklist: [
      "Inspect the quick-release connectors and harness strain points.",
      "Check brake cutoffs and throttle feel.",
      "Clean charging contacts and inspect the port door.",
    ],
    commonIssues: [
      "Connector wear from repeated folding and unpacking.",
      "Throttle or brake inconsistencies after heavy daily use.",
      "Reduced range from poor charging habits or pack aging.",
    ],
  },
  SoFlow: {
    platform: "Affordable commuter platform",
    controller: "Simple controller architecture with basic diagnostics",
    dashboard: "Basic display and power indicators",
    battery: "Practical compact pack for daily use",
    motor: "Reliable urban hub motor",
    speed: "Commonly 20–25 km/h",
    maintenance: "Battery contacts, charger, and cable wear",
    firmwareFocus: "Basic controller tuning and charge management",
    communityFocus: "Low-cost repairability and service tips",
    repairs: ["Inspect cable strain relief", "Check charger compatibility", "Verify handlebar connector stability"],
    tuningOptions: [
      { title: "Entry-level firmware tuning", detail: "Keep changes conservative and focus on throttle response, ride modes, and low-voltage protection before experimenting with aggressive settings." },
      { title: "Hardware reliability mods", detail: "Improve connectors, cable routing, and handlebar mounts to make the scooter more dependable and easier to service." },
      { title: "Cost-conscious upgrades", detail: "Prioritize better tires, lighting, and protective covers before spending on higher-power components." },
    ],
    maintenanceChecklist: [
      "Inspect cable strain relief and handlebar connector stability.",
      "Check charger compatibility and charging temperature.",
      "Verify fastener tightness and wheel integrity.",
    ],
    commonIssues: [
      "Loose handlebar wiring after repeated vibration.",
      "Charging or power issues from low-cost chargers and connectors.",
      "Basic controller faults that are often solved by cleaning and reseating connectors.",
    ],
  },
  Egret: {
    platform: "Compact scooter platform",
    controller: "Small-footprint controller with straightforward wiring",
    dashboard: "Minimal display with essential ride telemetry",
    battery: "Compact pack for urban portability",
    motor: "Efficient wheel motor for everyday use",
    speed: "Usually 20–25 km/h",
    maintenance: "Battery and display connections",
    firmwareFocus: "Basic ride settings and safety limits",
    communityFocus: "Simple repairs and practical upgrades",
    repairs: ["Inspect battery latch contacts", "Check display connector", "Verify brake sensors"],
    tuningOptions: [
      { title: "Basic ride tuning", detail: "Adjust the ride feel with conservative controller settings, tire pressure, and brake sensitivity tweaks.", },
      { title: "Display and lighting upgrades", detail: "Upgrade the display or lighting system with attention to power draw and waterproofing." },
      { title: "Service-friendly upgrades", detail: "Improve cable routing and replace aging connectors to make maintenance easier." },
    ],
    maintenanceChecklist: [
      "Inspect battery latch contacts and connector corrosion.",
      "Check the display connector and waterproof seals.",
      "Verify brake sensor response and wheel spin feel.",
    ],
    commonIssues: [
      "Display glitches or intermittent power loss.",
      "Brake sensor faults after water ingress or rough handling.",
      "Connector wear from regular handling and transport.",
    ],
  },
  Apollo: {
    platform: "Balanced commuter and utility platform",
    controller: "Mid-range controller with service-friendly layout",
    dashboard: "Medium-size display with ride information",
    battery: "Reliable pack for daily use and range",
    motor: "Efficient motor tuned for mixed use",
    speed: "Often 25–35 km/h depending on trim",
    maintenance: "Controller, battery balancing, and connectors",
    firmwareFocus: "Ride mode management and power control",
    communityFocus: "Reliability and repair records",
    repairs: ["Inspect controller connectors", "Check power switch", "Verify BMS temperature sensing"],
    tuningOptions: [
      { title: "Balanced power tuning", detail: "Tune controller behavior for street use with a focus on predictable acceleration, thermal stability, and safe braking." },
      { title: "Range optimization", detail: "Improve efficiency through tire pressure, weight placement, and moderate controller changes rather than raw power gains." },
      { title: "Accessory integration", detail: "Add lighting, GPS, or phone mounts while watching total current draw and connector quality." },
    ],
    maintenanceChecklist: [
      "Inspect controller connectors and power switch operation.",
      "Check BMS temperature sensing and charging stability.",
      "Verify wheel fasteners and deck hardware remain tight.",
    ],
    commonIssues: [
      "Power switch or connector issues after repeated use.",
      "Battery pack balance drift over time.",
      "Firmware-related ride mode bugs after aftermarket changes.",
    ],
  },
  Inokim: {
    platform: "Premium urban commuter platform",
    controller: "Serviceable controller with higher build quality",
    dashboard: "Integrated display and app interface",
    battery: "Well-integrated pack with focus on portability",
    motor: "Balanced motor with refined acceleration",
    speed: "Usually 20–30 km/h",
    maintenance: "Battery port, display, and wiring harness checks",
    firmwareFocus: "Dashboard stability and ride settings",
    communityFocus: "Longevity, reliability, and parts support",
    repairs: ["Inspect charging port", "Check display harness", "Validate controller mounting"],
    tuningOptions: [
      { title: "Refined commuter tuning", detail: "Focus on smooth acceleration, low-noise operation, and predictable brake behavior rather than aggressive top-end power." },
      { title: "Display and connectivity", detail: "Tune app interaction, display stability, and charging feedback for a polished urban riding experience." },
      { title: "Serviceable hardware upgrades", detail: "Replace worn connectors and improve cable management to extend service life and reduce faults." },
    ],
    maintenanceChecklist: [
      "Inspect charging port condition and connector wear.",
      "Check display harness integrity and weatherproofing.",
      "Verify controller mounting bolts and vibration resistance.",
    ],
    commonIssues: [
      "Display glitches triggered by vibration or moisture.",
      "Charging inconsistencies from port wear.",
      "Controller mounting or harness issues after regular commuting.",
    ],
  },
  Unagi: {
    platform: "Compact urban folding platform",
    controller: "Space-conscious controller for folding scooters",
    dashboard: "Minimal display with essential ride data",
    battery: "Compact pack designed for portability",
    motor: "Quiet and efficient urban motor",
    speed: "Usually 20–25 km/h",
    maintenance: "Folding hinge, connectors, and battery contacts",
    firmwareFocus: "Basic ride tuning and safety limits",
    communityFocus: "Portability, folding hardware, and reliability",
    repairs: ["Inspect folding latch hardware", "Check battery contacts", "Verify throttle wiring"],
    tuningOptions: [
      { title: "Folding hardware tuning", detail: "Improve folding durability, hinge stability, and cable routing to keep the scooter dependable and easy to carry." },
      { title: "Portability-focused upgrades", detail: "Prioritize lightweight accessories and compact lighting solutions that do not burden the battery or controller." },
      { title: "Urban ride tuning", detail: "Tune acceleration and braking for daily commuting rather than high-speed performance." },
    ],
    maintenanceChecklist: [
      "Inspect folding latch hardware and hinge play.",
      "Check battery contacts and connector stability.",
      "Verify throttle wiring and handlebar mount integrity.",
    ],
    commonIssues: [
      "Loose folding hardware or hinge play.",
      "Battery contact issues after repeated packing and unpacking.",
      "Throttle wiring or connector fatigue in compact builds.",
    ],
  },
  Other: {
    platform: "Generic scooter platform",
    controller: "Board-level controller depending on the build",
    dashboard: "Variable display and telemetry hardware",
    battery: "Battery architecture varies by build",
    motor: "Motor type varies by platform",
    speed: "Varies by controller and battery configuration",
    maintenance: "General inspection across controller, battery, and display",
    firmwareFocus: "Generic firmware and hardware compatibility review",
    communityFocus: "Reference material and broad troubleshooting",
    repairs: ["Inspect connectors", "Check BMS health", "Verify controller mounting"],
    tuningOptions: [
      { title: "General controller tuning", detail: "Use generic tuning practices such as throttle calibration, power limiting review, and safety cutoff verification." },
      { title: "Hardware-agnostic upgrades", detail: "Focus on connector quality, insulation, thermal management, and reliable wiring practices before experimenting with performance changes." },
      { title: "Broad troubleshooting", detail: "Treat each build as a custom platform: verify controller revision, battery chemistry, and wiring layout before changing firmware." },
    ],
    maintenanceChecklist: [
      "Inspect connectors, wiring, and controller mounting.",
      "Verify BMS health and charging behavior.",
      "Review brake cutoffs and display reliability.",
    ],
    commonIssues: [
      "Inconsistent behavior from mixed hardware revisions.",
      "Connector or wiring faults after custom builds.",
      "Firmware mismatches on generic or mixed-component platforms.",
    ],
  },
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getSegment(brand: string, model: string) {
  if (brand === "Dualtron" || model.includes("Wolf") || model.includes("Ultra")) {
    return "performance";
  }
  if (brand === "Kaabo" || brand === "Apollo" || model.includes("Max") || model.includes("GT")) {
    return "utility";
  }
  return "commuter";
}

function buildEntry(entry: { brand: string; model: string; year?: string }, index: number) {
  const profile = familyProfiles[entry.brand] || familyProfiles.Other;
  const slug = slugify(`${entry.brand}-${entry.model}`);
  const description = `${entry.brand} ${entry.model}${entry.year ? ` (${entry.year})` : ""} is covered in the wiki with community notes, firmware references, battery guidance, and repair-oriented documentation.`;
  const highlights = [
    `${entry.brand} ${entry.model} is documented as a ${profile.platform.toLowerCase()}.`,
    `The wiki highlights ${profile.firmwareFocus.toLowerCase()} and common hardware inspection points.`,
    profile.communityFocus,
  ];

  const quickFacts = [
    { label: "Platform", value: profile.platform },
    { label: "Controller family", value: profile.controller },
    { label: "Dashboard / display", value: profile.dashboard },
    { label: "Battery architecture", value: profile.battery },
    { label: "Common speed range", value: profile.speed },
    { label: "Maintenance focus", value: profile.maintenance },
  ];

  const specs = [
    { label: "Model", value: `${entry.brand} ${entry.model}` },
    { label: "Typical motor", value: profile.motor },
    { label: "Typical speed", value: profile.speed },
    { label: "Battery architecture", value: profile.battery },
    { label: "Controller family", value: profile.controller },
    { label: "Display / telemetry", value: profile.dashboard },
    { label: "Common repair emphasis", value: profile.repairs[0] },
    { label: "Community angle", value: profile.communityFocus },
  ];

  const firmwareNotes = [
    `${entry.brand} ${entry.model} pages usually summarize ${profile.firmwareFocus.toLowerCase()} and common flashing safety topics.`,
    `The wiki records board revisions, dashboard variants, and known compatibility caveats for this platform.`,
    `Firmware discussions emphasize validation, checksum review, and safe recovery paths.`,
    `For tuning work, back up the existing firmware image before changing current limits, acceleration, or safety cutoffs.`,
  ];

  const hardwareNotes = [
    `Hardware notes for ${entry.brand} ${entry.model} cover connectors, battery health, and controller mounting.`,
    `The documentation captures the most common wear points and service areas for this platform.`,
    `Community notes often point to common bolt-on upgrades, replacement parts, and component-level checks.`,
    `High-current builds deserve extra attention to insulation, connector torque, and thermal management.`,
  ];

  const communityNotes = [
    `Riders and builders regularly share fixes, tuning ideas, and hardware observations for ${entry.brand} ${entry.model}.`,
    `The catalog favors practical findings that improve safety, maintenance outcomes, and repair clarity.`,
    `Always verify any firmware, wiring, or component change against the hardware revision before applying it.`,
    `The most valuable community reports are the ones that include logs, photos, and exact hardware revisions.`,
  ];

  return {
    id: index + 1,
    brand: entry.brand,
    model: entry.model,
    year: entry.year,
    slug,
    description,
    segment: getSegment(entry.brand, entry.model),
    highlights,
    quickFacts,
    specs,
    tuningOptions: profile.tuningOptions,
    maintenanceChecklist: profile.maintenanceChecklist,
    commonIssues: profile.commonIssues,
    firmwareNotes,
    hardwareNotes,
    communityNotes,
  } satisfies ScooterCatalogEntry;
}

export const scooterCatalog: ScooterCatalogEntry[] = baseEntries.map((entry, index) => buildEntry(entry, index));

export function getScooterBySlug(slug: string) {
  return scooterCatalog.find((entry) => entry.slug === slug);
}

export function getScootersByBrand(brand: string) {
  return scooterCatalog.filter((entry) => entry.brand === brand);
}

export function getBrands() {
  return Array.from(new Set(scooterCatalog.map((entry) => entry.brand))).sort();
}
