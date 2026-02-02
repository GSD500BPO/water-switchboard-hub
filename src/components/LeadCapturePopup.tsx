import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDealer } from "@/contexts/DealerContext";
import heroImage from "@/assets/hero-water-testing.jpg";

interface LeadCapturePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LeadCapturePopup({ isOpen, onClose }: LeadCapturePopupProps) {
  const { t } = useLanguage();
  const { dealer, isDealerMode, detectionSource } = useDealer();
  const [email, setEmail] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Prepare lead data with dealer attribution
    const leadData = {
      email,
      zip,
      phone: phone || null,
      dealer_id: dealer?.id || null,
      lead_source: dealer ? `Dealer: ${dealer.name}` : "Organic",
      detection_source: detectionSource,
      created_at: new Date().toISOString(),
    };
    
    // Log for now - will be sent to backend when Zoho webhook is configured
    console.log("Lead captured:", leadData);
    
    // TODO: Send to Supabase edge function for Zoho CRM integration
    
    // Mark as submitted so we don't show popup again
    localStorage.setItem("cwt_lead_submitted", "true");
    localStorage.setItem("cwt_lead_email", email);
    localStorage.setItem("cwt_lead_zip", zip);
    
    setIsSubmitting(false);
    onClose();
  };

  // Check if user already submitted
  const hasSubmitted = localStorage.getItem("cwt_lead_submitted") === "true";

  // Don't show if already submitted or not open
  if (!isOpen || hasSubmitted) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl mx-4 overflow-hidden rounded-lg shadow-2xl">
        <div className="grid md:grid-cols-2">
          {/* Left side - Image */}
          <div className="hidden md:block relative">
            <img
              src={heroImage}
              alt="Water testing"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-transparent" />
          </div>

          {/* Right side - Form */}
          <div className="bg-card p-8 md:p-10">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {t("popup.title")}
                </h2>
                <p className="text-muted-foreground">
                  {t("popup.subtitle")}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="email"
                  placeholder={t("popup.emailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 bg-muted border-border"
                />
                <Input
                  type="text"
                  placeholder={t("popup.zipPlaceholder")}
                  value={zip}
                  onChange={(e) => setZip(e.target.value.replace(/\D/g, "").slice(0, 5))}
                  required
                  className="h-12 bg-muted border-border"
                />
                <Input
                  type="tel"
                  placeholder={t("popup.phonePlaceholder")}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-12 bg-muted border-border"
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold"
                >
                  {isSubmitting ? "..." : t("popup.cta")}
                </Button>
              </form>

              <p className="text-xs text-center text-muted-foreground">
                {t("popup.privacy")}
              </p>

              <button
                onClick={onClose}
                className="w-full text-center text-sm text-muted-foreground hover:text-foreground underline transition-colors"
              >
                {t("popup.dismiss")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
