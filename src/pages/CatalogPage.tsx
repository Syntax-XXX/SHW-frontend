import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Cpu, Battery, Wrench } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { scooterCatalog, getBrands } from "@/data/scooters";

const brandGroups = getBrands().map((brand) => ({
  brand,
  models: scooterCatalog.filter((entry) => entry.brand === brand),
}));

export function CatalogPage() {
  return (
    <div className="min-h-screen px-4 py-8 md:px-10">
      <div className="mx-auto max-w-6xl">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Models" }]} />

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">Scooter Catalog</h1>
            <Badge className="bg-primary/15 text-primary">{scooterCatalog.length} models</Badge>
          </div>
          <p className="max-w-3xl text-lg text-muted-foreground">
            Every scooter model in the wiki is now represented with the same documentation-first layout,
            including community notes, hardware insights, and firmware guidance.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {brandGroups.map((group) => (
            <Card key={group.brand} className="glass">
              <CardHeader>
                <CardTitle className="text-white">{group.brand}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {group.models.map((entry) => (
                  <Link key={entry.slug} to={`/models/${entry.slug}`} className="block">
                    <div className="rounded-lg border border-border/70 bg-background/30 p-3 transition hover:border-primary/40 hover:bg-accent/20">
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <div className="font-medium text-white">{entry.model}</div>
                          <div className="text-xs text-muted-foreground">{entry.year || "Reference model"}</div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {[
            { title: "Firmware Notes", icon: Cpu, text: "Controller targets, flashing references, and compatibility caveats." },
            { title: "Hardware Notes", icon: Battery, text: "Battery layouts, connectors, and teardown guidance." },
            { title: "Community Notes", icon: Wrench, text: "Shared fixes, tuning notes, and rider experience reports." },
          ].map((item) => (
            <Card key={item.title} className="glass">
              <CardContent className="flex items-start gap-3 py-4">
                <item.icon className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium text-white">{item.title}</div>
                  <div className="text-sm text-muted-foreground">{item.text}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
