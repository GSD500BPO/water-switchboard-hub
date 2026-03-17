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
import { Helmet } from "@/components/seo/Helmet";

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
      <Helmet
        title="Community Water Test - Free Water Quality Testing & Treatment Directory"
        description="Independent water quality data for your ZIP code. Compare 692+ water treatment companies across 22 cities. Free water testing services and homeowner guides."
        canonical="/"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Community Water Test",
          "url": "https://communitywatertest.org",
          "description": "Independent water quality data and water treatment company directory",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://communitywatertest.org/water-treatment/{search_term}",
            "query-input": "required name=search_term"
          }
        }}
      />
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
