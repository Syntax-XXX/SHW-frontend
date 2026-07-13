import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Cpu,
  Battery,
  Gauge,
  CheckCircle,
  Copy,
  AlertTriangle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TableOfContents } from "@/components/TableOfContents";
import { cn } from "@/lib/utils";
import { getScooterBySlug, type ScooterCatalogEntry } from "@/data/scooters";

const toc = [
  { id: "overview", label: "Overview", level: 2 },
  { id: "specifications", label: "Specifications", level: 2 },
  { id: "tuning", label: "Tuning Options", level: 2 },
  { id: "maintenance", label: "Maintenance", level: 2 },
  { id: "firmware", label: "Firmware", level: 2 },
  { id: "hardware", label: "Hardware Overview", level: 2 },
  { id: "pinouts", label: "Connectors & Pinouts", level: 2 },
  { id: "error-codes", label: "Error Codes", level: 2 },
  { id: "community", label: "Community Notes", level: 2 },
];

const firmwareVersions = [
  { name: "BLE", version: "1.5.8", status: "Stable" },
  { name: "DRV", version: "2.5.1", status: "Stable" },
  { name: "BMS", version: "1.4.0", status: "Stable" },
];

const pinouts = [
  { pin: 1, name: "VBAT", color: "bg-red-500", type: "Power" },
  { pin: 2, name: "GND", color: "bg-slate-500", type: "Ground" },
  { pin: 3, name: "UART_TX", color: "bg-green-500", type: "Data" },
  { pin: 4, name: "UART_RX", color: "bg-yellow-500", type: "Data" },
  { pin: 5, name: "SWDIO", color: "bg-blue-500", type: "Debug" },
  { pin: 6, name: "SWCLK", color: "bg-indigo-500", type: "Debug" },
];

const errorCodes = [
  { code: "10", meaning: "UART communication error", severity: "warning" },
  { code: "13", meaning: "BMS communication error", severity: "warning" },
  { code: "14", meaning: "Throttle hall sensor error", severity: "critical" },
  { code: "15", meaning: "Brake hall sensor error", severity: "critical" },
  { code: "21", meaning: "Motor phase current abnormal", severity: "warning" },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="ml-2 inline-flex text-muted-foreground hover:text-foreground"
    >
      {copied ? <CheckCircle className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
}

export function ModelPage() {
  const { slug } = useParams<{ slug: string }>();
  const [model, setModel] = useState<ScooterCatalogEntry | null>(null);

  useEffect(() => {
    if (!slug) return;
    setModel(getScooterBySlug(slug) || null);
  }, [slug]);

  const title = model?.brand && model?.model ? `${model.brand} ${model.model}` : "Scooter model";
  const specs = useMemo(() => model?.specs ?? [], [model]);

  return (
    <div className="flex">
      <article className="min-w-0 flex-1 px-4 py-8 md:px-10">
        <div className="mx-auto max-w-3xl">
          <Breadcrumbs
            items={[
              { label: "Models", href: "/models" },
              { label: model?.brand || "Scooter" },
              { label: model?.model || "Model" },
            ]}
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                {title}
              </h1>
              <Badge className="bg-green-500/15 text-green-400 hover:bg-green-500/20">Verified</Badge>
            </div>
            <p className="text-lg text-muted-foreground">
              {model?.description || "Comprehensive technical documentation for this electric scooter including firmware, controller, BMS, and pinout information."}
            </p>
          </motion.div>

          <Separator className="my-8" />

          {model?.highlights && model.highlights.length > 0 ? (
            <section id="overview" className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold text-white">Highlights</h2>
              <div className="grid gap-3 md:grid-cols-2">
                {model.highlights.map((item) => (
                  <Card key={item} className="glass">
                    <CardContent className="py-4 text-sm text-muted-foreground">{item}</CardContent>
                  </Card>
                ))}
              </div>
            </section>
          ) : null}

          <section id="overview" className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-white">Overview</h2>
            <p className="leading-7 text-muted-foreground">
              {model?.description || "This page documents the known hardware revisions, firmware versions, and reverse engineering findings for the selected scooter."}
            </p>
          </section>

          <section id="specifications" className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-white">Specifications</h2>
            {model?.quickFacts && model.quickFacts.length > 0 ? (
              <div className="mb-4 grid gap-3 sm:grid-cols-2">
                {model.quickFacts.map((fact) => (
                  <Card key={fact.label} className="glass">
                    <CardContent className="py-3">
                      <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{fact.label}</div>
                      <div className="mt-1 text-sm text-white">{fact.value}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : null}
            <Card className="glass overflow-hidden">
              <Table>
                <TableBody>
                  {specs.map((row) => (
                    <TableRow key={row.label} className="border-border hover:bg-transparent">
                      <TableCell className="w-1/3 font-medium text-muted-foreground">{row.label}</TableCell>
                      <TableCell className="font-mono text-foreground">{row.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </section>

          <section id="tuning" className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-white">Tuning Options</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {model?.tuningOptions?.map((option) => (
                <Card key={option.title} className="glass">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base text-white">{option.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{option.detail}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section id="maintenance" className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-white">Maintenance Checklist</h2>
            <Card className="glass">
              <CardContent className="py-4">
                <ul className="space-y-3">
                  {model?.maintenanceChecklist?.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          <section id="firmware" className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-white">Firmware</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {firmwareVersions.map((fw) => (
                <Card key={fw.name} className="glass">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{fw.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-mono font-semibold text-white">{fw.version}</div>
                    <Badge variant="outline" className="mt-2 border-green-500/30 text-green-400">
                      {fw.status}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section id="hardware" className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-white">Hardware Overview</h2>
            <Tabs defaultValue="controller" className="w-full">
              <TabsList className="glass mb-4 grid w-full grid-cols-3">
                <TabsTrigger value="controller">Controller</TabsTrigger>
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="battery">Battery / BMS</TabsTrigger>
              </TabsList>
              <TabsContent value="controller">
                <Card className="glass">
                  <CardContent className="space-y-3 py-4">
                    <div className="flex items-center gap-2 text-white">
                      <Cpu className="h-5 w-5 text-primary" />
                      <span className="font-semibold">Motor Controller (ESC)</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {model?.hardwareNotes[0] || "The controller section documents the main control board, common firmware targets, and the signals involved in flashing or debugging."}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="dashboard">
                <Card className="glass">
                  <CardContent className="space-y-3 py-4">
                    <div className="flex items-center gap-2 text-white">
                      <Gauge className="h-5 w-5 text-primary" />
                      <span className="font-semibold">Dashboard + BLE</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {model?.firmwareNotes[0] || "The dashboard section covers the display, BLE communications, and common firmware update paths."}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="battery">
                <Card className="glass">
                  <CardContent className="space-y-3 py-4">
                    <div className="flex items-center gap-2 text-white">
                      <Battery className="h-5 w-5 text-primary" />
                      <span className="font-semibold">Battery & BMS</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {model?.hardwareNotes[1] || "The battery section captures BMS behavior, pack architecture, and charging limitations observed in the field."}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </section>

          <section id="pinouts" className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-white">Connectors & Pinouts</h2>
            <Card className="glass overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-muted-foreground">Pin</TableHead>
                    <TableHead className="text-muted-foreground">Name</TableHead>
                    <TableHead className="text-muted-foreground">Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pinouts.map((p) => (
                    <TableRow key={p.pin} className="border-border hover:bg-transparent">
                      <TableCell className="font-mono text-white">{p.pin}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center gap-2 font-mono text-foreground">
                          <span className={cn("h-2.5 w-2.5 rounded-full", p.color)} />
                          {p.name}
                          <CopyButton text={p.name} />
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{p.type}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </section>

          <section id="error-codes" className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-white">Common Issues</h2>
            <div className="flex flex-col gap-3">
              {model?.commonIssues?.map((issue) => (
                <Card key={issue} className="glass border-l-4 border-l-yellow-500">
                  <CardContent className="flex items-center gap-4 py-4">
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    <div className="text-sm text-muted-foreground">{issue}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <h2 className="mb-4 mt-8 text-2xl font-semibold text-white">Error Codes</h2>
            <div className="flex flex-col gap-3">
              {errorCodes.map((err) => (
                <Card
                  key={err.code}
                  className={cn(
                    "glass border-l-4",
                    err.severity === "critical" ? "border-l-destructive" : "border-l-yellow-500"
                  )}
                >
                  <CardContent className="flex items-center gap-4 py-4">
                    {err.severity === "critical" ? (
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    )}
                    <div>
                      <div className="font-mono font-semibold text-white">{err.code}</div>
                      <div className="text-sm text-muted-foreground">{err.meaning}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section id="community" className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-white">Community Notes</h2>
            <Card className="glass">
              <CardContent className="py-4 text-sm text-muted-foreground">
                {model?.communityNotes[0] || "Community reports and reverse engineering notes are collected here to help riders make safer decisions about repairs, flashing, and upgrades."}
              </CardContent>
            </Card>
          </section>
        </div>
      </article>
      <TableOfContents sections={toc} />
    </div>
  );
}
