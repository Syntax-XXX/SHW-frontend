import { motion } from "framer-motion";
import { ArrowRight, Cpu, ShieldCheck, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/Breadcrumbs";

interface TopicContent {
  title: string;
  description: string;
  overview: string[];
  cards: Array<{ title: string; body: string }>;
  checklist: string[];
  table: Array<{ label: string; value: string }>;
}

const topics: Record<string, TopicContent> = {
  brands: {
    title: "Brand Coverage",
    description:
      "A navigator for the scooter brands and model families covered by the wiki, from entry-level commuters to high-performance machines.",
    overview: [
      "This section groups the most widely documented brands and the recurring hardware patterns that appear across their platforms.",
      "Each brand entry links to model-level notes for firmware, tuning, troubleshooting, and community findings.",
    ],
    cards: [
      {
        title: "Xiaomi and M365 lineage",
        body: "The most common platform for entry-level and mid-range scooters, with broad community documentation and many achievable firmware experiments.",
      },
      {
        title: "Dualtron and VSETT",
        body: "High-current performance machines that need extra attention to controller cooling, battery balance, and brake safety.",
      },
      {
        title: "Kaabo and Ninebot",
        body: "Popular performance and commuter platforms that often combine strong hardware with deeper diagnostics and firmware work.",
      },
    ],
    checklist: [
      "Start with the model page before tuning or flashing anything.",
      "Cross-check the platform family and hardware revision before changing firmware.",
      "Use the maintenance checklist for the specific model family you are working on.",
    ],
    table: [
      { label: "Best for", value: "Brand and family discovery" },
      { label: "Typical content", value: "Firmware notes, controller behavior, battery guidance" },
      { label: "Best use", value: "Finding the right model page quickly" },
    ],
  },
  controllers: {
    title: "Controller Documentation",
    description:
      "Deep dives into ESC behavior, UART and CAN communication, current limits, brake cutoff logic, and safe flashing practices.",
    overview: [
      "The controller is the nerve center of the scooter, tying together power delivery, safety cutoffs, and firmware behavior.",
      "This section covers the practical side of controller tuning: current limits, acceleration maps, braking behavior, and diagnostics.",
    ],
    cards: [
      {
        title: "ESC architecture",
        body: "Learn how three-phase bridges, gate drivers, and current sensing work together in the controller hardware.",
      },
      {
        title: "Tuning workflow",
        body: "Back up firmware first, inspect the hardware revision, and only change one variable at a time when tuning current or acceleration.",
      },
      {
        title: "Troubleshooting",
        body: "Common faults include throttle glitches, brake-cutout issues, thermal resets, and UART or CAN communication errors.",
      },
    ],
    checklist: [
      "Check brake cutoffs and throttle calibration before changing firmware.",
      "Inspect controller connectors and heat sinking before high-current tuning.",
      "Use a known-good battery and verify temperature behavior during testing.",
    ],
    table: [
      { label: "Primary focus", value: "ESC, current limits, safety logic" },
      { label: "Key tools", value: "UART adapter, logic analyzer, firmware backup" },
      { label: "Common risk", value: "Overcurrent, thermal shutdown, unstable flashing" },
    ],
  },
  batteries: {
    title: "Battery Systems",
    description:
      "Coverage for cell chemistry, pack layout, charging behavior, pack balancing, safety tolerances, and replacement planning.",
    overview: [
      "Battery packs are the highest-risk component in an electric scooter, so maintenance, charging, and balancing need careful attention.",
      "This page consolidates common pack layouts, charging practices, and failure modes for commuter and performance scooters alike.",
    ],
    cards: [
      {
        title: "Cell chemistry",
        body: "Most scooters use lithium-ion cells in series packs, and any replacement or upgrade should match the correct chemistry and protection strategy.",
      },
      {
        title: "Charging workflow",
        body: "Check charge current, balancing behavior, temperature, and charger compatibility before pushing a pack harder than intended.",
      },
      {
        title: "Health signs",
        body: "Capacity fade, heat during charging, voltage sag, and inconsistent range are all common indicators of pack wear or imbalance.",
      },
    ],
    checklist: [
      "Inspect connector condition and insulation every service interval.",
      "Avoid charging a hot or damaged pack.",
      "Watch for cell imbalance, swelling, and unusual odors immediately.",
    ],
    table: [
      { label: "Primary focus", value: "Pack health, charging, balancing" },
      { label: "Common materials", value: "18650, 21700, custom pack modules" },
      { label: "Primary risk", value: "Overcharge, imbalance, thermal runaway" },
    ],
  },
  bms: {
    title: "Battery Management Systems",
    description:
      "A practical look at BMS functions, balancing, temperature monitoring, low-voltage cutoff logic, and how that affects performance.",
    overview: [
      "The BMS protects the battery, reports pack health, and often communicates with the controller over serial or proprietary lines.",
      "Good BMS documentation helps riders spot balancing issues, over-discharge risks, and charger incompatibilities before they become dangerous.",
    ],
    cards: [
      {
        title: "Balancing behavior",
        body: "A healthy BMS balances cells and manages charge current to keep the pack within safe voltage targets.",
      },
      {
        title: "Protection logic",
        body: "Most BMS implementations supervise over-charge, over-discharge, overheating, and current spikes.",
      },
      {
        title: "Diagnostics",
        body: "A BMS problem often shows up as range loss, charging errors, or odd shutdown behavior under load.",
      },
    ],
    checklist: [
      "Check pack voltage against the expected range during charging and discharge.",
      "Monitor temperature and charge current for sudden changes.",
      "Re-check wiring and connector tightness after any battery service.",
    ],
    table: [
      { label: "Primary focus", value: "Protection, balancing, charge logic" },
      { label: "Common interface", value: "UART, CAN, or proprietary serial" },
      { label: "Primary risk", value: "Pack damage or unsafe charge behavior" },
    ],
  },
  motors: {
    title: "Motor and Drive Systems",
    description:
      "Everything from hub motor construction and phase wiring to motor power tuning and heat management for different scooter families.",
    overview: [
      "Motor systems vary from compact hub motors to higher-power performance platforms, and the right tuning strategy depends on the hardware and controller.",
      "This section covers the mechanical and electrical side of the motor, including wiring, sensor behavior, and thermal concerns.",
    ],
    cards: [
      {
        title: "Hub and geared motors",
        body: "Many scooters use hub motors with integrated magnets, windings, and hall or sensorless control schemes.",
      },
      {
        title: "Phase and current behavior",
        body: "Current draw, phase timing, and throttle behavior all affect torque delivery, acceleration, and efficiency.",
      },
      {
        title: "Heat management",
        body: "High-power setups can overheat quickly, so cooling, current limits, and motor temperature monitoring matter a lot.",
      },
    ],
    checklist: [
      "Inspect for damaged wires, loose connectors, or signs of overheating.",
      "Keep the motor area dry and free from debris.",
      "Verify the motor and controller are matched to the expected power regime.",
    ],
    table: [
      { label: "Primary focus", value: "Motor construction, phase behavior, thermal limits" },
      { label: "Common motor types", value: "Hub, geared hub, high-power drive" },
      { label: "Primary risk", value: "Overheating, phase issues, noisy control" },
    ],
  },
  pinouts: {
    title: "Connectors and Pinouts",
    description:
      "Reference material for common battery, controller, display, and charging connectors found across scooter platforms.",
    overview: [
      "Connector pinouts are one of the most useful things to document for repair work because wiring mistakes can destroy components or create intermittent faults.",
      "This section provides practical connector knowledge for common scooter interfaces, especially where wiring is fragile or non-standard.",
    ],
    cards: [
      {
        title: "Power and ground",
        body: "Battery and controller power connectors are often the first things to inspect for heat damage, corrosion, or loose contact.",
      },
      {
        title: "Data and debug",
        body: "UART, SWD, and other debug interfaces are valuable for flashing or diagnosing controller and display faults.",
      },
      {
        title: "Cable management",
        body: "Good strain relief and clean routing prevent many of the most common electrical issues in scooters.",
      },
    ],
    checklist: [
      "Use the correct connector family and pin numbering before rewiring anything.",
      "Verify polarity and continuity before powering a new harness.",
      "Protect exposed connectors from moisture and vibration.",
    ],
    table: [
      { label: "Primary focus", value: "Power, debug, and data connectors" },
      { label: "Common connectors", value: "JST, Anderson, barrel, custom scooter headers" },
      { label: "Primary risk", value: "Miswiring, shorting, intermittent faults" },
    ],
  },
  "battery-systems": {
    title: "Battery Systems Architecture",
    description:
      "An overview of pack structure, voltage choices, current limits, and the relationship between battery design and controller performance.",
    overview: [
      "Battery system architecture affects speed, range, charging strategy, and the stress placed on the controller and BMS.",
      "This page helps riders connect battery pack design to real-world performance and safety concerns.",
    ],
    cards: [
      {
        title: "Series and parallel packs",
        body: "Series cells raise voltage while parallel cells increase capacity, and both choices affect controller compatibility and charging strategy.",
      },
      {
        title: "Voltage and current planning",
        body: "Higher voltage systems often improve efficiency, but they also demand more attention to insulation, connectors, and controller limits.",
      },
      {
        title: "Pack design tradeoffs",
        body: "Range, weight, discharge current, and thermal behavior all influence the right pack setup for a given scooter.",
      },
    ],
    checklist: [
      "Match pack voltage and connector compatibility with the controller and charger.",
      "Plan for current draw under acceleration and climbing.",
      "Inspect pack balancing and connector condition before any upgrade.",
    ],
    table: [
      { label: "Primary focus", value: "Cell count, pack design, current limits" },
      { label: "Common scales", value: "10S, 13S, 14S, and higher" },
      { label: "Primary risk", value: "Voltage mismatch and unsafe current draw" },
    ],
  },
  charging: {
    title: "Charging and Power Delivery",
    description:
      "Practical info about chargers, charging profiles, CC/CV behavior, port wear, and how charge habits affect long-term battery health.",
    overview: [
      "Charging habits often determine battery longevity more than any single tuning change.",
      "This section covers charger compatibility, voltage limits, thermal behavior during charging, and common charging faults.",
    ],
    cards: [
      {
        title: "CC/CV charging",
        body: "Most scooter packs use a variant of constant-current followed by constant-voltage charging, and the exact profile matters for pack health.",
      },
      {
        title: "Port and connector wear",
        body: "A worn charging port can cause inconsistent charging, heat, or connection loss that feels like a battery problem at first.",
      },
      {
        title: "Storage behavior",
        body: "Long-term storage should be handled carefully, especially if the battery will sit at high charge for weeks or months.",
      },
    ],
    checklist: [
      "Use a charger that matches the voltage and connector family.",
      "Watch temperature during charging and stop immediately if it rises unexpectedly.",
      "Do not leave a damaged battery charging unattended.",
    ],
    table: [
      { label: "Primary focus", value: "Charging profile, charger compatibility, storage" },
      { label: "Common tools", value: "Charger, multimeter, thermal probe" },
      { label: "Primary risk", value: "Overcharge, heat, port damage" },
    ],
  },
  "motor-drives": {
    title: "Motor Drives and Power Electronics",
    description:
      "An introduction to how motor drives, gate switching, and controller logic turn battery energy into controlled wheel torque.",
    overview: [
      "Motor drives are a key bridge between command signals and actual torque delivery.",
      "This content explains the practical side of phase control, current sensing, and the tradeoffs between smooth control and aggressive power delivery.",
    ],
    cards: [
      {
        title: "Power stage basics",
        body: "MOSFETs, gate drivers, and current sensing hardware shape the real-world feel of the scooter at the throttle.",
      },
      {
        title: "Control strategy",
        body: "FOC, six-step, and similar strategies alter how smoothly and quietly the motor responds to the rider.",
      },
      {
        title: "Practical tuning",
        body: "Tuning a drive system is often about balancing torque, efficiency, noise, and thermal stability rather than raw power alone.",
      },
    ],
    checklist: [
      "Review current limits and thermal management before aggressive power tuning.",
      "Inspect wiring and insulation around the power stage.",
      "Keep the system grounded and protected from moisture and dust.",
    ],
    table: [
      { label: "Primary focus", value: "Power stage, phase control, torque delivery" },
      { label: "Common concern", value: "Heating and current spikes" },
      { label: "Primary risk", value: "MOSFET stress and unstable power delivery" },
    ],
  },
  "error-codes": {
    title: "Error Codes and Fault Patterns",
    description:
      "A reference for common scooter fault codes, their likely meaning, and the first checks to perform when one appears.",
    overview: [
      "Error codes are useful but incomplete. The best repairs combine the code with the symptom, the hardware revision, and the recent changes made to the scooter.",
      "This page helps riders translate common faults into a practical troubleshooting path.",
    ],
    cards: [
      {
        title: "Throttle and brake faults",
        body: "These often show up as cutouts, no-start behavior, or sudden loss of power after a brake or throttle event.",
      },
      {
        title: "Communication errors",
        body: "UART and CAN communication issues often point to bad connectors, moisture ingress, or a controller mismatch.",
      },
      {
        title: "Battery and BMS faults",
        body: "Low-voltage, high-current, or balancing errors can cause range loss and odd shutdown behavior.",
      },
    ],
    checklist: [
      "Record the exact code and the conditions under which it appeared.",
      "Check connectors, battery level, and the recent tune or firmware change.",
      "Clear the fault only after the underlying cause has been verified.",
    ],
    table: [
      { label: "Primary focus", value: "Fault interpretation and triage" },
      { label: "Common causes", value: "Wiring, firmware, battery, sensor faults" },
      { label: "Primary risk", value: "Misdiagnosis and repeated failure" },
    ],
  },
  diagnostics: {
    title: "Diagnostic Flow",
    description:
      "A structured troubleshooting path for isolating controller, battery, BMS, display, and sensor problems without guessing.",
    overview: [
      "Good diagnostics start with observation and isolate one subsystem at a time.",
      "This section gives riders a practical order of operations for troubleshooting without jumping straight into firmware changes.",
    ],
    cards: [
      {
        title: "First checks",
        body: "Verify the battery state, charger behavior, and connector integrity before diving into deeper electrical diagnostics.",
      },
      {
        title: "Signal tracing",
        body: "Use a multimeter or logic analyzer to inspect power, throttle, brake, and communication lines when the symptom is intermittent.",
      },
      {
        title: "Controlled testing",
        body: "Apply only one change at a time and reference the current firmware and hardware revision before proceeding.",
      },
    ],
    checklist: [
      "Start with visual checks and battery state before opening the electronics.",
      "Use known-good test points when possible.",
      "Document each change and its result to avoid repeating failed fixes.",
    ],
    table: [
      { label: "Primary focus", value: "Structured fault isolation" },
      { label: "Typical tools", value: "Multimeter, inspection mirror, thermal probe" },
      { label: "Primary risk", value: "Overlooking intermittent issues" },
    ],
  },
  repair: {
    title: "Repair Guides",
    description:
      "A practical collection of repair patterns for common scooter failures, from display issues to battery and controller repairs.",
    overview: [
      "Repair work should be methodical, especially when the scooter uses custom connectors or a tightly packed enclosure.",
      "This section highlights safe and repeatable repair concepts that apply across many scooter families.",
    ],
    cards: [
      {
        title: "Safe teardown",
        body: "Power down, remove the battery, and isolate the system before opening the deck or controller enclosure.",
      },
      {
        title: "Connector repair",
        body: "Many scooter faults come from broken connectors, damaged pigtails, or moisture ingress around a harness joint.",
      },
      {
        title: "Component replacement",
        body: "When replacing a controller, display, or battery, verify the part number, revision, and compatibility before installation.",
      },
    ],
    checklist: [
      "Use photos and labels to track each wire and connector.",
      "Protect the board and connectors from static and moisture.",
      "Test the scooter thoroughly after each repair step.",
    ],
    table: [
      { label: "Primary focus", value: "Repairs, component replacement, testing" },
      { label: "Common tools", value: "Screwdrivers, spudger, soldering iron, multimeter" },
      { label: "Primary risk", value: "Damaged connectors or lost orientation" },
    ],
  },
  github: {
    title: "GitHub Projects",
    description:
      "A curated overview of open-source projects, firmware repositories, hardware discussions, and reverse-engineering resources relevant to scooters.",
    overview: [
      "Open-source work is one of the fastest ways to understand controller firmware, ECU-like behavior, and repair strategy.",
      "This section highlights the types of repositories that commonly help with flashing, debugging, or documenting scooter electronics.",
    ],
    cards: [
      {
        title: "Firmware repositories",
        body: "Useful for comparing stock firmware, recovery tools, and flashing utilities across platforms.",
      },
      {
        title: "Hardware research",
        body: "Reverse-engineering projects often help explain controller behavior and pinout choices.",
      },
      {
        title: "Community tooling",
        body: "Many repair communities share scripts, adapters, and automation tools that make diagnostics easier.",
      },
    ],
    checklist: [
      "Check the repository activity, documentation quality, and compatibility notes.",
      "Use caution with any tool that writes firmware or modifies controller state.",
      "Cross-reference community reports for the specific scooter family you own.",
    ],
    table: [
      { label: "Primary focus", value: "Open-source firmware and tooling" },
      { label: "Best use", value: "Research, flashing, diagnostics" },
      { label: "Primary risk", value: "Bad firmware, unsupported hardware, misapplied tools" },
    ],
  },
  tools: {
    title: "Open Source Tools",
    description:
      "A guide to the utilities and utilities-adjacent workflows that make scooter firmware and diagnostics more approachable.",
    overview: [
      "The right tools can make a huge difference when you are checking a controller, flashing firmware, or validating a battery management system.",
      "This section focuses on workflow tools that help with diagnostics, flashing, and documentation rather than just consumer features.",
    ],
    cards: [
      {
        title: "Flashing utilities",
        body: "Some tools help back up, compare, or flash firmware images with the right safety checks in place.",
      },
      {
        title: "Diagnostics helpers",
        body: "Serial logs, bus analyzers, and simple scripts can make controller faults much easier to see clearly.",
      },
      {
        title: "Documentation tools",
        body: "Good documentation workflows make it possible to preserve findings, compare revisions, and share repair notes safely.",
      },
    ],
    checklist: [
      "Prefer tools with precise safety steps and clear recovery instructions.",
      "Keep a known-good backup before using any flashing tool.",
      "Use the tool only after confirming the controller family and firmware target.",
    ],
    table: [
      { label: "Primary focus", value: "Diagnostics, flashing, and documentation tools" },
      { label: "Best use", value: "Applied technical work" },
      { label: "Primary risk", value: "Unsafe firmware changes or bad data capture" },
    ],
  },
  datasheets: {
    title: "Datasheets and Reference Material",
    description:
      "A practical reference section for core components such as controllers, batteries, displays, and common MOSFET or IC families.",
    overview: [
      "Datasheets are one of the most valuable resources when trying to understand the original design of a scooter subsystem.",
      "This section emphasizes component-level reference material that helps verify behavior and compare one hardware revision to another.",
    ],
    cards: [
      {
        title: "Controller references",
        body: "MCU, power stage, and communication interface datasheets are essential for understanding controller behavior.",
      },
      {
        title: "Battery and BMS references",
        body: "Cell protection and balancing circuits are often documented in application notes and BMS datasheets.",
      },
      {
        title: "Display and sensor references",
        body: "Display controllers, hall sensors, and BLE modules are useful if you are troubleshooting a display or telemetry issue.",
      },
    ],
    checklist: [
      "Store the reference files with the scooter model and hardware revision.",
      "Prefer official source material when available.",
      "Cross-check part numbers and board revisions before assuming compatibility.",
    ],
    table: [
      { label: "Primary focus", value: "Component-level reference material" },
      { label: "Best use", value: "Design review and repair research" },
      { label: "Primary risk", value: "Wrong reference or wrong component revision" },
    ],
  },
  community: {
    title: "Community Notes",
    description:
      "A place for the shared knowledge that makes scooter repair and tuning practical: mods, fixes, warnings, and field reports.",
    overview: [
      "Community notes turn individual experience into shared infrastructure.",
      "This section emphasizes practical and safety-focused findings that other riders can use immediately.",
    ],
    cards: [
      {
        title: "Field reports",
        body: "Real-world observations from riders and repairers often reveal issues that do not show up in official documentation.",
      },
      {
        title: "Safety findings",
        body: "These are especially valuable when they clearly show the importance of thermal checks, wear inspection, and hardware verification.",
      },
      {
        title: "Tuning notes",
        body: "Community tuning reports are most valuable when they include the exact firmware revision, controller behavior, and battery setup used.",
      },
    ],
    checklist: [
      "Look for the hardware revision, battery type, and firmware version in each report.",
      "Treat anecdotal claims as hypotheses until you verify them on your own scooter.",
      "Prefer reports that include clear photos, logs, and test conditions.",
    ],
    table: [
      { label: "Primary focus", value: "Shared field experience and practical findings" },
      { label: "Best use", value: "Problem solving and community learning" },
      { label: "Primary risk", value: "Bad assumptions from incomplete reports" },
    ],
  },
  submit: {
    title: "Submit a Resource",
    description:
      "Submit firmware notes, repair guides, community findings, or model-specific documentation so the wiki can keep growing.",
    overview: [
      "This section is the intake point for hardware notes, tuning research, and other practical scooter knowledge.",
      "The best submissions include context, links, and enough detail that other riders can verify them safely.",
    ],
    cards: [
      {
        title: "What to submit",
        body: "Firmware notes, controller findings, pinout diagrams, repair steps, battery observations, and safety warnings are all useful.",
      },
      {
        title: "How to make it useful",
        body: "Include the scooter model, hardware revision, firmware version, and what you tested or observed.",
      },
      {
        title: "Why it matters",
        body: "Every verified submission improves the quality of the wiki for everyone else who owns the same platform.",
      },
    ],
    checklist: [
      "Include the scooter model, hardware revision, and firmware version.",
      "Explain what was tested and what the outcome was.",
      "Add safety notes when the content involves battery, power electronics, or firmware flashing.",
    ],
    table: [
      { label: "Primary focus", value: "Contributions and community submissions" },
      { label: "Best use", value: "Expanding the wiki with verified notes" },
      { label: "Primary risk", value: "Submitting incomplete or unsafe instructions" },
    ],
  },
};

export function SectionPage({ topic }: { topic: string }) {
  const content = topics[topic] || topics.controllers;

  return (
    <div className="min-h-screen px-4 py-8 md:px-10">
      <div className="mx-auto max-w-5xl">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: content.title }]} />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6"
        >
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">{content.title}</h1>
            <Badge className="bg-primary/15 text-primary">Documentation</Badge>
          </div>
          <p className="max-w-3xl text-lg text-muted-foreground">{content.description}</p>
        </motion.div>

        <section className="mt-10 grid gap-4 md:grid-cols-2">
          {content.cards.map((card) => (
            <Card key={card.title} className="glass">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-white">{card.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{card.body}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <BookOpen className="h-5 w-5 text-primary" />
                Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {content.overview.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Quick Checklist
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {content.checklist.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="mt-8">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Cpu className="h-5 w-5 text-primary" />
                Reference Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-3">
                {content.table.map((row) => (
                  <div key={row.label} className="rounded-lg border border-border/70 bg-background/30 p-3">
                    <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{row.label}</div>
                    <div className="mt-1 text-sm text-white">{row.value}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}

