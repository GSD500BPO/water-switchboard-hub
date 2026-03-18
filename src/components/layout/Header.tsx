import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Globe, Calendar, ChevronDown, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";
import { getAllStates, getCitiesInState } from "@/data/companies";
import cwtLogo from "@/assets/cwt-logo.png";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "es" : "en");
  };

  const ctaLabel = language === "es" ? "Agenda Tu Prueba Certificada" : "Setup Certified Test";

  const states = getAllStates();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={cwtLogo} alt="Community Water Test" className="h-14 md:h-16 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                Find Water Treatment
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {states.map((state) => {
                const cities = getCitiesInState(state.slug);
                return (
                  <DropdownMenuSub key={state.slug}>
                    <DropdownMenuSubTrigger>
                      {state.name} ({state.companyCount})
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem asChild>
                        <Link to={`/water-treatment/${state.slug}`}>
                          All {state.name} ({state.companyCount})
                        </Link>
                      </DropdownMenuItem>
                      {cities.map((city) => (
                        <DropdownMenuItem key={city.slug} asChild>
                          <Link to={`/water-treatment/${state.slug}/${city.slug}`}>
                            {city.name} ({city.companyCount})
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            to="/schedule-test"
            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
          >
            {t("nav.waterTesting")}
          </Link>
          <Link
            to="/scam-alerts"
            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
          >
            {t("nav.scamAlerts")}
          </Link>
          <Link
            to="/blog"
            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
          >
            Blog
          </Link>
        </nav>

        {/* CTA + Language */}
        <div className="flex items-center gap-2">
          <Button
            asChild
            className="hidden md:flex bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold"
          >
            <Link to="/schedule-test">
              <Calendar className="h-4 w-4 mr-2" />
              {ctaLabel}
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="flex items-center gap-1 text-foreground/80 hover:text-primary"
          >
            <Globe className="h-4 w-4" />
            <span className="text-xs font-medium uppercase">{language}</span>
          </Button>

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
            <div className="font-medium text-foreground/80">Find Water Treatment:</div>
            {states.map((state) => {
              const cities = getCitiesInState(state.slug);
              return (
                <div key={state.slug} className="pl-4">
                  <Link
                    to={`/water-treatment/${state.slug}`}
                    className="text-sm font-medium text-foreground/60 hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {state.name} ({state.companyCount})
                  </Link>
                  {cities.map((city) => (
                    <Link
                      key={city.slug}
                      to={`/water-treatment/${state.slug}/${city.slug}`}
                      className="block text-sm text-foreground/80 hover:text-primary py-1 pl-4"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {city.name} ({city.companyCount})
                    </Link>
                  ))}
                </div>
              );
            })}
            <Link
              to="/schedule-test"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.waterTesting")}
            </Link>
            <Link
              to="/scam-alerts"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.scamAlerts")}
            </Link>
            <Button
              asChild
              className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold mt-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Link to="/schedule-test">
                <Calendar className="h-4 w-4 mr-2" />
                {ctaLabel}
              </Link>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
