import { Link } from "react-router-dom";
import { Cpu, Moon, Sun, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SearchCommand } from "@/components/SearchCommand";
import { useTheme } from "@/components/ThemeProvider";
import { SidebarContent } from "@/components/SidebarContent";

export function Navbar() {
  const { theme, toggle } = useTheme();

  return (
    <header className="glass sticky top-0 z-40 w-full border-b border-border">
      <div className="flex h-14 items-center gap-4 px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="glass-strong w-72 p-0">
            <div className="flex h-14 items-center border-b border-border px-4">
              <Link to="/" className="flex items-center gap-2 font-semibold text-foreground">
                <Cpu className="h-5 w-5 text-primary" />
                <span>Scooter Wiki</span>
              </Link>
            </div>
            <SidebarContent />
          </SheetContent>
        </Sheet>

        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight text-foreground">
          <Cpu className="h-5 w-5 text-primary" />
          <span className="hidden sm:inline">Scooter Firmware & Hardware Wiki</span>
          <span className="sm:hidden">Scooter Wiki</span>
        </Link>

        <div className="flex flex-1 items-center justify-end gap-4">
          <SearchCommand />
          <Button variant="ghost" size="icon" onClick={toggle} className="shrink-0">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
