import { useState } from "react";
import { X, BookOpen, Shield, Droplets, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDealer } from "@/contexts/DealerContext";
import ebookImage from "@/assets/ebook-water-test.jpg";

interface LeadCapturePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LeadCapturePopup({ isOpen, onClose }: LeadCapturePopupProps) {
  const { t } = useLanguage();
  const { dealer, isDealerMode, detectionSource } = useDealer();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const leadData = {
      name,
      email,
      zip,
      phone,
      dealer_id: dealer?.id || null,
      lead_source: dealer ? `Dealer: ${dealer.name}` : "eBook Download",
      detection_source: detectionSource,
      created_at: new Date().toISOString(),
    };

    console.log("Lead captured:", leadData);

    localStorage.setItem("cwt_lead_submitted", "true");
    localStorage.setItem("cwt_lead_email", email);
    localStorage.setItem("cwt_lead_zip", zip);

    setIsSubmitting(false);
    onClose();
  };

  const hasSubmitted = localStorage.getItem("cwt_lead_submitted") === "true";
  if (!isOpen || hasSubmitted) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl mx-4 overflow-hidden rounded-2xl shadow-2xl">
        <div className="grid md:grid-cols-2">
          {/* Left side - HD Water Test Image + eBook overlay */}
          <div className="hidden md:flex relative flex-col items-center justify-end overflow-hidden">
            <img
              src={ebookImage}
              alt="Water quality testing in beaker"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            <div className="relative z-10 p-8 text-white">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="h-5 w-5" />
                <span className="text-xs font-semibold uppercase tracking-widest opacity-80">
                  {t("popup.ebookSubtitle")}
                </span>
              </div>
              <h3 className="text-2xl font-bold leading-tight mb-3">
                {t("popup.ebookTitle")}
              </h3>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs opacity-80">
                  <Droplets className="h-3.5 w-3.5 shrink-0" />
                  <span>Lead, PFAS, Arsenic, THMs</span>
                </div>
                <div className="flex items-center gap-2 text-xs opacity-80">
                  <Shield className="h-3.5 w-3.5 shrink-0" />
                  <span>EPA Safe Limits Explained</span>
                </div>
                <div className="flex items-center gap-2 text-xs opacity-80">
                  <FlaskConical className="h-3.5 w-3.5 shrink-0" />
                  <span>Signs Your Water Needs Testing</span>
                </div>
              </div>
            </div>
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
                {/* Mobile eBook icon */}
                <div className="md:hidden flex justify-center mb-3">
                  <div className="bg-primary/10 rounded-full p-3">
                    <BookOpen className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {t("popup.title")}
                </h2>
                <p className="text-muted-foreground text-sm">
                  {t("popup.subtitle")}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <Input
                  type="text"
                  placeholder={t("popup.namePlaceholder")}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="h-12 bg-muted border-border"
                />
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
                  required
                  className="h-12 bg-muted border-border"
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold text-base"
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
