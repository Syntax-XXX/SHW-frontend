import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { SidebarContent } from "@/components/SidebarContent";

export function DocLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <div className="flex flex-1">
        <aside className="glass sticky top-14 hidden h-[calc(100vh-3.5rem)] w-64 shrink-0 border-r border-border md:block">
          <SidebarContent />
        </aside>
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
