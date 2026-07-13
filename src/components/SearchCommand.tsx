import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Command, FileText, Cpu, Zap, HardDrive } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { searchTutorials, listBrands, listModels, type Tutorial, type Brand, type Model } from "@/lib/api";

export function SearchCommand() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    Promise.all([listBrands(), listModels()]).then(([b, m]) => {
      setBrands(b);
      setModels(m);
    });
  }, []);

  useEffect(() => {
    if (query.trim().length < 2) {
      setTutorials([]);
      return;
    }
    const t = setTimeout(() => {
      searchTutorials(query).then(setTutorials);
    }, 150);
    return () => clearTimeout(t);
  }, [query]);

  const handleSelect = (href: string) => {
    setOpen(false);
    setQuery("");
    navigate(href);
  };

  const filteredBrands = brands.filter((b) => b.name.toLowerCase().includes(query.toLowerCase()));
  const filteredModels = models.filter((m) => m.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="glass flex h-9 w-full items-center justify-between rounded-md px-3 text-sm text-muted-foreground transition-colors hover:bg-accent/50 sm:w-64"
      >
        <span className="flex items-center gap-2">
          <Search className="h-4 w-4" />
          <span>Search docs...</span>
        </span>
        <kbd className="hidden rounded border border-border bg-background px-1.5 text-xs font-mono sm:inline-block">
          <Command className="inline h-3 w-3" />K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search by brand, model, controller, firmware..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          {filteredBrands.length > 0 && (
            <CommandGroup heading="Brands">
              {filteredBrands.map((b) => (
                <CommandItem key={`brand-${b.id}`} onSelect={() => handleSelect(`/brands/${b.slug}`)}>
                  <Zap className="mr-2 h-4 w-4 text-primary" />
                  {b.name}
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {filteredModels.length > 0 && (
            <CommandGroup heading="Models">
              {filteredModels.map((m) => (
                <CommandItem key={`model-${m.id}`} onSelect={() => handleSelect(`/models/${m.slug}`)}>
                  <HardDrive className="mr-2 h-4 w-4 text-primary" />
                  {m.name}
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {tutorials.length > 0 && (
            <CommandGroup heading="Documentation">
              {tutorials.map((t) => (
                <CommandItem key={`tutorial-${t.id}`} onSelect={() => handleSelect(`/docs/${t.slug}`)}>
                  <FileText className="mr-2 h-4 w-4 text-primary" />
                  {t.title}
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {query.length > 0 && (
            <CommandGroup heading="Quick Filters">
              <CommandItem onSelect={() => handleSelect(`/?search=${encodeURIComponent(query)}`)}>
                <Cpu className="mr-2 h-4 w-4 text-primary" />
                Search all docs for "{query}"
              </CommandItem>
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
