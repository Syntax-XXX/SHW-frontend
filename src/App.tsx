import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { DisclaimerModal } from "@/components/DisclaimerModal";
import { DocLayout } from "@/components/DocLayout";
import { HomePage } from "@/pages/HomePage";
import { CatalogPage } from "@/pages/CatalogPage";
import { ModelPage } from "@/pages/ModelPage";
import { FirmwarePage } from "@/pages/FirmwarePage";
import { SectionPage } from "@/pages/SectionPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 5 * 60 * 1000, retry: 1 },
  },
});

export function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <BrowserRouter>
            <DisclaimerModal />
            <Routes>
              <Route element={<DocLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/models" element={<CatalogPage />} />
                <Route path="/models/:slug" element={<ModelPage />} />
                <Route path="/firmware" element={<FirmwarePage />} />
                <Route path="/brands" element={<SectionPage topic="brands" />} />
                <Route path="/controllers" element={<SectionPage topic="controllers" />} />
                <Route path="/dashboards" element={<SectionPage topic="controllers" />} />
                <Route path="/batteries" element={<SectionPage topic="batteries" />} />
                <Route path="/bms" element={<SectionPage topic="bms" />} />
                <Route path="/motors" element={<SectionPage topic="motors" />} />
                <Route path="/pinouts" element={<SectionPage topic="pinouts" />} />
                <Route path="/battery-systems" element={<SectionPage topic="battery-systems" />} />
                <Route path="/charging" element={<SectionPage topic="charging" />} />
                <Route path="/motor-drives" element={<SectionPage topic="motor-drives" />} />
                <Route path="/error-codes" element={<SectionPage topic="error-codes" />} />
                <Route path="/diagnostics" element={<SectionPage topic="diagnostics" />} />
                <Route path="/repair" element={<SectionPage topic="repair" />} />
                <Route path="/github" element={<SectionPage topic="github" />} />
                <Route path="/tools" element={<SectionPage topic="tools" />} />
                <Route path="/datasheets" element={<SectionPage topic="datasheets" />} />
                <Route path="/community" element={<SectionPage topic="community" />} />
                <Route path="/submit" element={<SectionPage topic="submit" />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
