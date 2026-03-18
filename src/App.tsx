import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { DealerProvider } from "@/contexts/DealerContext";

// Eagerly loaded (homepage)
import Index from "./pages/Index";

// Lazy-loaded pages (code-split)
const WaterQuality = lazy(() => import("./pages/WaterQuality"));
const TestDetail = lazy(() => import("./pages/TestDetail"));
const ScamAlerts = lazy(() => import("./pages/ScamAlerts"));
const ScheduleTest = lazy(() => import("./pages/ScheduleTest"));
const StatePage = lazy(() => import("./pages/StatePage"));
const CityPage = lazy(() => import("./pages/CityPage"));
const CompanyPage = lazy(() => import("./pages/CompanyPage"));
const ServiceCityPage = lazy(() => import("./pages/ServiceCityPage"));
const BestOfPage = lazy(() => import("./pages/BestOfPage"));
const WaterQualityReport = lazy(() => import("./pages/WaterQualityReport"));
const WaterProblemPage = lazy(() => import("./pages/WaterProblemPage"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4" />
        <p className="text-gray-500 text-sm">Loading...</p>
      </div>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <DealerProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/water-quality/:zip" element={<WaterQuality />} />
                <Route path="/tests/:testId" element={<TestDetail />} />
                <Route path="/scam-alerts" element={<ScamAlerts />} />
                <Route path="/water-treatment/:state" element={<StatePage />} />
                <Route path="/water-treatment/:state/:city" element={<CityPage />} />
                <Route path="/water-treatment/:state/:city/services/:service" element={<ServiceCityPage />} />
                <Route path="/water-treatment/:state/:city/:company" element={<CompanyPage />} />
                <Route path="/best-water-treatment/:state/:city" element={<BestOfPage />} />
                <Route path="/water-quality/:city" element={<WaterQualityReport />} />
                <Route path="/water-problems/:state/:city/:problem" element={<WaterProblemPage />} />
                <Route path="/schedule-test" element={<ScheduleTest />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/blog/category/:category" element={<Blog />} />
                <Route path="/water-testing" element={<Navigate to="/schedule-test" replace />} />
                <Route path="/filters" element={<Navigate to="/" replace />} />
                <Route path="/privacy" element={<Navigate to="/" replace />} />
                <Route path="/terms" element={<Navigate to="/" replace />} />
                <Route path="/contact" element={<Navigate to="/" replace />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </DealerProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
