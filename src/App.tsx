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
