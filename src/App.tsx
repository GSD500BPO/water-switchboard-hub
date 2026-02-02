import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { DealerProvider } from "@/contexts/DealerContext";
import Index from "./pages/Index";
import WaterQuality from "./pages/WaterQuality";
import TestDetail from "./pages/TestDetail";
import ScamAlerts from "./pages/ScamAlerts";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <DealerProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/water-quality/:zip" element={<WaterQuality />} />
              <Route path="/tests/:testId" element={<TestDetail />} />
              <Route path="/scam-alerts" element={<ScamAlerts />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </DealerProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
