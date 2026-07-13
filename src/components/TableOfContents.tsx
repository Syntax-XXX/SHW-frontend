import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Section {
  id: string;
  label: string;
  level: number;
}

export function TableOfContents({ sections }: { sections: Section[] }) {
  const [active, setActive] = useState<string>(sections[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-80px 0px -60% 0px" }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <div className="sticky top-20 hidden h-[calc(100vh-6rem)] w-56 shrink-0 xl:block">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        On this page
      </p>
      <nav className="flex flex-col gap-1 border-l border-border pl-3">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className={cn(
              "text-sm transition-colors",
              section.level === 2 ? "pl-0" : "pl-3",
              active === section.id
                ? "font-medium text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {section.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
