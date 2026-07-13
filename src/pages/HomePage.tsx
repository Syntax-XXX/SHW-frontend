import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  Cpu,
  Battery,
  Wrench,
  Code2,
  GitBranch,
  FileText,
  Sparkles,
  ArrowRight,
  HardDrive,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { listBrands, listModels, listTutorials, type Brand, type Model, type Tutorial } from "@/lib/api";
import { getBrands, scooterCatalog } from "@/data/scooters";

const featureCards = [
  { title: "Scooter Catalog", icon: Sparkles, href: "/models", desc: "Browse the full catalog of supported scooters and jump into each model page." },
  { title: "Controller Documentation", icon: Cpu, href: "/controllers", desc: "ESC pinouts, firmware flashing, and reverse engineering notes." },
  { title: "Battery Documentation", icon: Battery, href: "/batteries", desc: "BMS layouts, cell configs, and charging protocols." },
  { title: "Firmware Reference", icon: HardDrive, href: "/firmware", desc: "Version history, checksums, and compatibility matrices." },
  { title: "Repair Documentation", icon: Wrench, href: "/repair", desc: "Step-by-step teardowns, diagnostics, and common fixes." },
  { title: "Developer Resources", icon: Code2, href: "/tools", desc: "Open-source tools, datasheets, and GitHub projects." },
  { title: "Community Discoveries", icon: Sparkles, href: "/community", desc: "Latest findings from the reverse engineering community." },
];

export function HomePage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [search, setSearch] = useState("");
  const featuredModels = scooterCatalog.slice(0, 8);
  const catalogBrands = getBrands().slice(0, 12);

  useEffect(() => {
    listBrands().then(setBrands);
    listModels().then(setModels);
    listTutorials().then(setTutorials);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border px-4 py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(36,107,206,0.12),transparent_50%)]" />
        <div className="relative mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="secondary" className="mb-4 rounded-full px-3 py-1 text-xs">
              Community-maintained technical knowledge base
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-6xl">
              Scooter Firmware & Hardware Wiki
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
              A community-maintained knowledge base for electric scooter firmware, electronics,
              hardware documentation, repair resources, diagnostics, and open-source development.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto flex max-w-2xl flex-col gap-3 sm:flex-row"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search brands, models, firmware, controllers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && search.trim()) {
                    window.location.href = `/?search=${encodeURIComponent(search)}`;
                  }
                }}
                className="h-12 border-border bg-background/60 pl-10 text-base backdrop-blur"
              />
            </div>
            <Button asChild size="lg" className="h-12 bg-primary px-6">
              <Link to={search.trim() ? `/?search=${encodeURIComponent(search)}` : "/models"}>
                Search
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 flex flex-wrap justify-center gap-2 text-sm text-muted-foreground"
          >
            <span>Quick:</span>
            {["Xiaomi", "Ninebot", "VSETT", "Dualtron"].map((term) => (
              <Link
                key={term}
                to={`/?search=${encodeURIComponent(term)}`}
                className="rounded-full bg-accent/50 px-2.5 py-0.5 text-accent-foreground hover:bg-accent"
              >
                {term}
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-12 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-12">
          {/* Feature cards */}
          <section>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Explore Documentation</h2>
            </div>
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid gap-4 sm:grid-cols-2"
            >
              {featureCards.map((card) => (
                <motion.div key={card.title} variants={item}>
                  <Link to={card.href}>
                    <Card className="glass h-full transition-all hover:border-primary/40 hover:bg-accent/30">
                      <CardHeader className="pb-2">
                        <card.icon className="mb-2 h-6 w-6 text-primary" />
                        <CardTitle className="text-base text-white">{card.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{card.desc}</p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </section>

          <section>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Browse the Scooter Catalog</h2>
              <Link to="/models" className="text-sm text-primary hover:underline">
                View all
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {featuredModels.map((entry) => (
                <Link key={entry.slug} to={`/models/${entry.slug}`}>
                  <Card className="glass transition-all hover:border-primary/40 hover:bg-accent/30">
                    <CardContent className="flex items-start justify-between gap-3 py-4">
                      <div>
                        <div className="font-medium text-white">{entry.brand} {entry.model}</div>
                        <p className="mt-1 text-sm text-muted-foreground">{entry.description}</p>
                      </div>
                      <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* Recently updated */}
          <section>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Recently Updated</h2>
              <Link to="/models" className="text-sm text-primary hover:underline">
                View all
              </Link>
            </div>
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex flex-col gap-3"
            >
              {tutorials.slice(0, 5).map((tutorial) => (
                <motion.div key={tutorial.id} variants={item}>
                  <Link to={`/docs/${tutorial.slug}`}>
                    <Card className="glass transition-all hover:border-primary/40 hover:bg-accent/30">
                      <CardContent className="flex items-center gap-4 py-4">
                        <FileText className="h-5 w-5 shrink-0 text-primary" />
                        <div className="min-w-0 flex-1">
                          <h3 className="truncate font-medium text-white">{tutorial.title}</h3>
                          <p className="truncate text-sm text-muted-foreground">
                            {tutorial.description || "No description available."}
                          </p>
                        </div>
                        <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </section>
        </div>

        {/* Right sidebar */}
        <aside className="space-y-8">
          <section>
            <h2 className="mb-4 text-lg font-semibold text-white">Popular Brands</h2>
            <div className="flex flex-wrap gap-2">
              {catalogBrands.map((brand) => (
                <Link key={brand} to="/models">
                  <Badge variant="secondary" className="hover:bg-accent">
                    {brand}
                  </Badge>
                </Link>
              ))}
              {catalogBrands.length === 0 && (
                <span className="text-sm text-muted-foreground">No brands available yet.</span>
              )}
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="mb-4 text-lg font-semibold text-white">Latest GitHub Projects</h2>
            <div className="flex flex-col gap-3">
              {[
                { name: "scooter-fw-tools", desc: "Open-source flashing utilities" },
                { name: "ninebot-ble", desc: "BLE protocol research" },
                { name: "xiaomi-pro2-docs", desc: "Community hardware docs" },
              ].map((repo) => (
                <a
                  key={repo.name}
                  href={`https://github.com/${repo.name}`}
                  target="_blank"
                  rel="noreferrer"
                  className="glass rounded-lg p-3 transition-all hover:border-primary/40"
                >
                  <div className="flex items-center gap-2 text-sm font-medium text-white">
                    <GitBranch className="h-4 w-4 text-primary" />
                    {repo.name}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{repo.desc}</p>
                </a>
              ))}
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="mb-4 text-lg font-semibold text-white">Wiki Stats</h2>
            <div className="grid grid-cols-2 gap-3">
              <Card className="glass">
                <CardContent className="py-4 text-center">
                  <div className="text-2xl font-bold text-white">{brands.length}</div>
                  <div className="text-xs text-muted-foreground">Brands</div>
                </CardContent>
              </Card>
              <Card className="glass">
                <CardContent className="py-4 text-center">
                  <div className="text-2xl font-bold text-white">{models.length}</div>
                  <div className="text-xs text-muted-foreground">Models</div>
                </CardContent>
              </Card>
              <Card className="glass">
                <CardContent className="py-4 text-center">
                  <div className="text-2xl font-bold text-white">{tutorials.length}</div>
                  <div className="text-xs text-muted-foreground">Docs</div>
                </CardContent>
              </Card>
              <Card className="glass">
                <CardContent className="py-4 text-center">
                  <div className="text-2xl font-bold text-white">14</div>
                  <div className="text-xs text-muted-foreground">Tools</div>
                </CardContent>
              </Card>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
