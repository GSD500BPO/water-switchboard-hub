import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { WaterAlerts } from "@/components/home/WaterAlerts";
import { CategoryIcons } from "@/components/home/CategoryIcons";
import { WaterTestingServices } from "@/components/home/WaterTestingServices";
import { DealerExpertCard } from "@/components/home/DealerExpertCard";
import { DealerVideos } from "@/components/home/DealerVideos";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { LeadCapturePopup } from "@/components/LeadCapturePopup";
import { useDealer } from "@/contexts/DealerContext";

const Index = () => {
  const [searchParams] = useSearchParams();
  const [showPopup, setShowPopup] = useState(false);
  const { isDealerMode, detectionSource } = useDealer();

  useEffect(() => {
    // Check if user came from QR code or other tracked source
    const source = searchParams.get("source");
    const qrId = searchParams.get("qr_id");
    
    // If from QR code, skip popup (their info is already tracked via QR attribution)
    if (qrId || detectionSource === "qr") {
      return;
    }
    
    // Show popup for other visitors after a delay
    const hasSeenPopup = sessionStorage.getItem("cwt-popup-seen");
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 3000); // Show after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [searchParams, detectionSource]);

  const handleClosePopup = () => {
    setShowPopup(false);
    sessionStorage.setItem("cwt-popup-seen", "true");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        
        {/* Show dealer expert card for dealer mode visitors */}
        {isDealerMode && (
          <section className="py-8 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-md mx-auto">
                <DealerExpertCard />
              </div>
            </div>
          </section>
        )}
        
        <HowItWorks />
        <WaterTestingServices />
        
        {/* Show dealer videos for dealer mode */}
        {isDealerMode && <DealerVideos />}
        
        <TestimonialsSection />
        <WaterAlerts />
        <CategoryIcons />
      </main>
      <Footer />
      <LeadCapturePopup isOpen={showPopup} onClose={handleClosePopup} />
    </div>
  );
};

export default Index;
