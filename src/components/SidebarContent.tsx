import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, BookOpen, Cpu, Battery, Gauge, Wrench, Code2, GitBranch } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

const navTree = [
  {
    title: "Documentation",
    icon: BookOpen,
    items: [
      { title: "Home", href: "/" },
      { title: "Scooter Catalog", href: "/models" },
      { title: "Models", href: "/models" },
      { title: "Firmware", href: "/firmware" },
      { title: "Controllers", href: "/controllers" },
      { title: "Dashboards", href: "/dashboards" },
    ],
  },
  {
    title: "Hardware",
    icon: Cpu,
    items: [
      { title: "Batteries", href: "/batteries" },
      { title: "BMS", href: "/bms" },
      { title: "Motors", href: "/motors" },
      { title: "Connectors & Pinouts", href: "/pinouts" },
    ],
  },
  {
    title: "Powertrain",
    icon: Battery,
    items: [
      { title: "Battery Systems", href: "/battery-systems" },
      { title: "Charging", href: "/charging" },
      { title: "Motor Drives", href: "/motor-drives" },
    ],
  },
  {
    title: "Diagnostics",
    icon: Gauge,
    items: [
      { title: "Error Codes", href: "/error-codes" },
      { title: "Diagnostic Flow", href: "/diagnostics" },
      { title: "Repair Guides", href: "/repair" },
    ],
  },
  {
    title: "Developer",
    icon: Code2,
    items: [
      { title: "GitHub Projects", href: "/github" },
      { title: "Open Source Tools", href: "/tools" },
      { title: "Datasheets", href: "/datasheets" },
    ],
  },
  {
    title: "Community",
    icon: Wrench,
    items: [
      { title: "Community Notes", href: "/community" },
      { title: "Submit Resource", href: "/submit" },
    ],
  },
];

export function SidebarContent() {
  const location = useLocation();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    Documentation: true,
  });

  const toggleGroup = (title: string) => {
    setOpenGroups((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <ScrollArea className="h-[calc(100vh-3.5rem)]">
      <nav className="flex flex-col gap-1 p-3">
        {navTree.map((group) => (
          <Collapsible
            key={group.title}
            open={openGroups[group.title]}
            onOpenChange={() => toggleGroup(group.title)}
          >
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent/50 hover:text-foreground">
              <span className="flex items-center gap-2">
                <group.icon className="h-4 w-4" />
                {group.title}
              </span>
              <ChevronRight
                className={cn(
                  "h-4 w-4 transition-transform",
                  openGroups[group.title] && "rotate-90"
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="ml-4 flex flex-col border-l border-border pl-2 pt-1">
                {group.items.map((item) => {
                  const active = location.pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={cn(
                        "relative rounded-md px-3 py-1.5 text-sm transition-colors",
                        active
                          ? "bg-primary/10 text-primary before:absolute before:left-0 before:top-1/2 before:h-4 before:w-0.5 before:-translate-y-1/2 before:rounded-full before:bg-primary"
                          : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                      )}
                    >
                      {item.title}
                    </Link>
                  );
                })}
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}

        <a
          href="https://github.com/syntax-xxx"
          target="_blank"
          rel="noreferrer"
          className="mt-4 flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent/50 hover:text-foreground"
        >
          <GitBranch className="h-4 w-4" />
          Contribute on GitHub
        </a>
      </nav>
    </ScrollArea>
  );
}
