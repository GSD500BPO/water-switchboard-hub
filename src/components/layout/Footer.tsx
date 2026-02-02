import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import cwtLogo from "@/assets/cwt-logo.png";

export function Footer() {
  const { t } = useLanguage();

  const quickLinks = [
    { href: "/water-testing", label: t("nav.waterTesting") },
    { href: "/filters", label: t("nav.filters") },
    { href: "/scam-alerts", label: t("nav.scamAlerts") },
  ];

  const legalLinks = [
    { href: "/privacy", label: "Política de Privacidad" },
    { href: "/terms", label: "Términos de Servicio" },
    { href: "/contact", label: "Contáctenos" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Tagline - Bigger Logo */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <img 
                src={cwtLogo} 
                alt="Community Water Test" 
                className="h-24 md:h-32 w-auto brightness-0 invert" 
              />
            </Link>
            <p className="text-primary-foreground/80 text-sm max-w-md">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wide">
              {t("footer.resources")}
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wide">
              {t("footer.legal")}
            </h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <p className="text-center text-xs text-primary-foreground/60">
            {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
