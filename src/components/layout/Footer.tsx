import { Link } from "react-router-dom";
import cwtLogo from "@/assets/cwt-logo.png";

const quickLinks = [
  { href: "/water-testing", label: "Water Testing" },
  { href: "/filters", label: "Filters" },
  { href: "/cost-guides", label: "Cost Guides" },
  { href: "/scam-alerts", label: "Scam Alerts" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/contact", label: "Contact Us" },
];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Tagline */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <img 
                src={cwtLogo} 
                alt="Community Water Test" 
                className="h-12 w-auto brightness-0 invert" 
              />
            </Link>
            <p className="text-primary-foreground/80 text-sm max-w-md">
              Community Water Test is an independent data resource dedicated to helping 
              homeowners understand their water quality without sales pressure.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wide">
              Resources
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
              Legal
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
            © {new Date().getFullYear()} Community Water Test. All rights reserved. 
            An independent water quality data resource.
          </p>
        </div>
      </div>
    </footer>
  );
}
