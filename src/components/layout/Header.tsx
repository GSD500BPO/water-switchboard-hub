import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import cwtLogo from "@/assets/cwt-logo.png";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { href: "/water-testing", label: t("nav.waterTesting") },
    { href: "/filters", label: t("nav.filters") },
    { href: "/cost-guides", label: t("nav.costGuides") },
    { href: "/scam-alerts", label: t("nav.scamAlerts") },
    { href: "/about", label: t("nav.about") },
  ];

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "es" : "en");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo - Bigger */}
        <Link to="/" className="flex items-center gap-2">
          <img src={cwtLogo} alt="Community Water Test" className="h-14 md:h-16 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Language Toggle & Mobile Menu */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="flex items-center gap-1 text-foreground/80 hover:text-primary"
          >
            <Globe className="h-4 w-4" />
            <span className="text-xs font-medium uppercase">{language}</span>
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-border bg-card">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
