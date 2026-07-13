import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Copy, Download, GitBranch, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TableOfContents } from "@/components/TableOfContents";
import { cn } from "@/lib/utils";

const toc = [
  { id: "overview", label: "Overview", level: 2 },
  { id: "versions", label: "Version History", level: 2 },
  { id: "metadata", label: "Technical Metadata", level: 2 },
  { id: "changelog", label: "Changelog", level: 2 },
  { id: "downloads", label: "Downloads", level: 2 },
];

const firmwareRows = [
  {
    version: "BLE 1.5.8",
    date: "2020-06-15",
    hardware: "Xiaomi Pro / Pro 2",
    controller: "NRF51822",
    status: "Stable",
    checksum: "a3f7c9...e2d1",
  },
  {
    version: "DRV 2.5.1",
    date: "2020-05-22",
    hardware: "STM32F103 ESC",
    controller: "STM32F103C8T6",
    status: "Stable",
    checksum: "b8e2a1...f4c2",
  },
  {
    version: "DRV 2.4.0",
    date: "2019-11-10",
    hardware: "STM32F103 ESC",
    controller: "STM32F103C8T6",
    status: "Deprecated",
    checksum: "c1d5b7...a9e3",
  },
];

const metadata = [
  { label: "File", value: "XIAOMI_PRO2_DRV_2.5.1.bin" },
  { label: "Size", value: "128 KB" },
  { label: "Format", value: "Raw binary" },
  { label: "SHA-256", value: "b8e2a1f4...c2d9e7a1" },
  { label: "MD5", value: "d41d8cd98f00b204e9800998ecf8427e" },
];

const changelog = [
  "Improved motor current limiting under low battery conditions.",
  "Fixed rare throttle cutout after regenerative braking events.",
  "Added BMS temperature reporting over UART.",
  "Adjusted kick-start sensitivity for Pro 2 hardware revision.",
];

function StatusBadge({ status }: { status: string }) {
  const variant =
    status === "Stable"
      ? "bg-green-500/15 text-green-400 border-green-500/30"
      : status === "Beta"
      ? "bg-yellow-500/15 text-yellow-400 border-yellow-500/30"
      : "bg-slate-500/15 text-slate-400 border-slate-500/30";
  return (
    <Badge variant="outline" className={cn("border", variant)}>
      {status}
    </Badge>
  );
}

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

export function FirmwarePage() {
  return (
    <div className="flex">
      <article className="min-w-0 flex-1 px-4 py-8 md:px-10">
        <div className="mx-auto max-w-3xl">
          <Breadcrumbs
            items={[
              { label: "Firmware", href: "/firmware" },
              { label: "Xiaomi Pro 2" },
            ]}
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                Xiaomi Pro 2 Firmware
              </h1>
              <StatusBadge status="Stable" />
            </div>
            <p className="text-lg text-muted-foreground">
              Official and community-documented firmware versions for the Xiaomi Pro 2, including
              release notes, checksums, and compatibility information.
            </p>
          </motion.div>

          <Separator className="my-8" />

          <section id="overview" className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-white">Overview</h2>
            <p className="leading-7 text-muted-foreground">
              The Xiaomi Pro 2 uses three main firmware targets: the dashboard BLE module
              (NRF51822), the motor controller/Driver (STM32F103), and the battery management
              system. This page tracks known versions and their checksums for verification.
            </p>
          </section>

          <section id="versions" className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-white">Version History</h2>
            <Card className="glass overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-muted-foreground">Version</TableHead>
                    <TableHead className="text-muted-foreground">Release</TableHead>
                    <TableHead className="text-muted-foreground">Hardware</TableHead>
                    <TableHead className="text-muted-foreground">Controller</TableHead>
                    <TableHead className="text-muted-foreground">Status</TableHead>
                    <TableHead className="text-muted-foreground">Checksum</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {firmwareRows.map((row) => (
                    <TableRow key={row.version} className="border-border hover:bg-transparent">
                      <TableCell className="font-mono font-medium text-white">{row.version}</TableCell>
                      <TableCell className="text-muted-foreground">{row.date}</TableCell>
                      <TableCell className="text-muted-foreground">{row.hardware}</TableCell>
                      <TableCell className="font-mono text-muted-foreground">{row.controller}</TableCell>
                      <TableCell>
                        <StatusBadge status={row.status} />
                      </TableCell>
                      <TableCell>
                        <span className="font-mono text-foreground">
                          {row.checksum}
                          <CopyButton text={row.checksum} />
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </section>

          <section id="metadata" className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-white">Technical Metadata</h2>
            <Card className="glass overflow-hidden">
              <Table>
                <TableBody>
                  {metadata.map((row) => (
                    <TableRow key={row.label} className="border-border hover:bg-transparent">
                      <TableCell className="w-1/3 font-medium text-muted-foreground">{row.label}</TableCell>
                      <TableCell className="font-mono text-foreground">
                        {row.value}
                        {row.label.includes("SHA") || row.label.includes("MD5") ? (
                          <CopyButton text={row.value} />
                        ) : null}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </section>

          <section id="changelog" className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-white">Changelog</h2>
            <Card className="glass">
              <CardContent className="py-4">
                <ul className="space-y-3">
                  {changelog.map((entry, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {entry}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          <section id="downloads" className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold text-white">Downloads</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="glass">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base text-white">
                    <Download className="h-4 w-4 text-primary" />
                    Firmware Binary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Official binary dump for verification and comparison. Only flash firmware you
                    understand and trust.
                  </p>
                  <Button variant="outline" className="w-full" disabled>
                    Download (educational reference)
                  </Button>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base text-white">
                    <GitBranch className="h-4 w-4 text-primary" />
                    Related Projects
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Open-source tools and documentation repositories related to this firmware.
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <a href="https://github.com" target="_blank" rel="noreferrer">
                      View on GitHub
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-4 text-sm text-yellow-200">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <p>
                Firmware files are provided for educational and research purposes. Verify every
                checksum before use. Flashing incorrect firmware may damage hardware or create safety
                hazards.
              </p>
            </div>
          </section>
        </div>
      </article>
      <TableOfContents sections={toc} />
    </div>
  );
}
