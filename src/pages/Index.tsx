import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { WaterAlerts } from "@/components/home/WaterAlerts";
import { CategoryIcons } from "@/components/home/CategoryIcons";
import { WaterTestingServices } from "@/components/home/WaterTestingServices";
import { LeadCapturePopup } from "@/components/LeadCapturePopup";

const Index = () => {
  const [searchParams] = useSearchParams();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Check if user came from QR code or other tracked source
    const source = searchParams.get("source");
    const qrId = searchParams.get("qr_id");
    const campaignId = searchParams.get("campaign_id");
    
    // If NOT from QR code (which means they don't already have their info captured),
    // show the popup after a delay
    if (!qrId) {
      const hasSeenPopup = sessionStorage.getItem("cwt-popup-seen");
      if (!hasSeenPopup) {
        const timer = setTimeout(() => {
          setShowPopup(true);
        }, 3000); // Show after 3 seconds
        return () => clearTimeout(timer);
      }
    }
  }, [searchParams]);

  const handleClosePopup = () => {
    setShowPopup(false);
    sessionStorage.setItem("cwt-popup-seen", "true");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <WaterTestingServices />
        <WaterAlerts />
        <CategoryIcons />
      </main>
      <Footer />
      <LeadCapturePopup isOpen={showPopup} onClose={handleClosePopup} />
    </div>
  );
};

export default Index;
