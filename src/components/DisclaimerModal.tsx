import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const DISCLAIMER_KEY = "scooter-wiki-disclaimer-accepted";

export function DisclaimerModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem(DISCLAIMER_KEY);
    if (accepted !== "true") {
      setOpen(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(DISCLAIMER_KEY, "true");
    setOpen(false);
  };

  const handleLeave = () => {
    window.location.href = "https://www.google.com";
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 p-4 backdrop-blur-xl"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="glass-strong w-full max-w-2xl overflow-hidden rounded-2xl glow-blue"
          >
            <div className="flex flex-col items-center p-8 text-center md:p-12">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10 ring-1 ring-destructive/30">
                <AlertTriangle className="h-10 w-10 text-destructive" />
              </div>

              <h1 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
                <span className="mr-2">⚠</span>Educational Purpose Notice
              </h1>

              <div className="space-y-4 text-left text-base leading-relaxed text-muted-foreground md:text-lg">
                <p>
                  This website exists solely to collect and organize technical documentation,
                  educational resources, repair information, hardware documentation, firmware
                  information, research articles, and publicly available community knowledge related
                  to electric scooters.
                </p>
                <p>
                  Some topics discussed on this website may relate to firmware, hardware, or
                  diagnostic procedures.
                </p>
                <p>
                  Laws and regulations differ by country and region. Certain modifications,
                  configurations, or vehicle use may be restricted or illegal where you live.
                </p>
                <p>
                  You are solely responsible for complying with all applicable laws, regulations,
                  manufacturer requirements, and safety rules.
                </p>
                <p>
                  This website does not encourage unsafe riding, unlawful behavior, or bypassing
                  safety features.
                </p>
              </div>

              <div className="mt-10 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
                <Button
                  size="lg"
                  onClick={handleAccept}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  I Understand
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleLeave}
                  className="border-border/50 hover:bg-destructive/10 hover:text-destructive"
                >
                  Leave Website
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
