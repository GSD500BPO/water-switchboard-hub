import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Shield, Users, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const trustBadges = [
  { icon: Shield, label: "Independent" },
  { icon: Users, label: "Community-Focused" },
  { icon: Heart, label: "No Sales Pressure" },
];

export function Hero() {
  const [zip, setZip] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (zip.trim().length === 5) {
      navigate(`/water-quality/${zip.trim()}`);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-navy-light">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="water-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1.5" fill="currentColor" className="text-accent" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#water-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
            What's Really In Your Water?
          </h1>
          
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
            Independent water quality data for your ZIP code. Get the facts before 
            the sales pitch.
          </p>

          {/* ZIP Search Form */}
          <form onSubmit={handleSearch} className="max-w-md mx-auto mb-10">
            <div className="flex gap-2 bg-card rounded-lg p-2 shadow-lg">
              <Input
                type="text"
                placeholder="Enter your ZIP code"
                value={zip}
                onChange={(e) => setZip(e.target.value.replace(/\D/g, "").slice(0, 5))}
                className="flex-1 border-0 text-lg h-12 bg-transparent focus-visible:ring-0 text-foreground placeholder:text-muted-foreground"
                maxLength={5}
              />
              <Button 
                type="submit" 
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground h-12 px-6"
                disabled={zip.length !== 5}
              >
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>
            </div>
          </form>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {trustBadges.map((badge) => (
              <div key={badge.label} className="flex items-center gap-2 text-primary-foreground/80">
                <badge.icon className="h-5 w-5" />
                <span className="text-sm font-medium">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wave Bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path 
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  );
}
