import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, MapPin, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { testimonials, regionLabels, Testimonial } from "@/data/testimonialData";
import cwtLogo from "@/assets/cwt-logo.png";

export function TestimonialsSection() {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState<Testimonial["region"] | "all">("all");

  const filteredTestimonials = selectedRegion === "all" 
    ? testimonials 
    : testimonials.filter(t => t.region === selectedRegion);

  const currentTestimonial = filteredTestimonials[currentIndex] || filteredTestimonials[0];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length);
  };

  const regions: (Testimonial["region"] | "all")[] = [
    "all",
    "northern-california",
    "atlanta-woodstock", 
    "utah-salt-lake",
    "el-paso",
    "dallas"
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4">
        {/* Header with CWT Logo */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center p-2">
              <img src={cwtLogo} alt="CWT" className="h-12 w-auto" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            {language === "es" ? "Lo Que Dicen Nuestros Clientes" : "What Our Customers Say"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === "es" 
              ? "Familias reales, resultados reales. Lee cómo hemos ayudado a propietarios en todo el país."
              : "Real families, real results. Read how we've helped homeowners across the country."
            }
          </p>
        </div>

        {/* Region Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {regions.map((region) => (
            <Button
              key={region}
              variant={selectedRegion === region ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setSelectedRegion(region);
                setCurrentIndex(0);
              }}
              className="text-xs md:text-sm"
            >
              {region === "all" 
                ? (language === "es" ? "Todos" : "All") 
                : regionLabels[region][language]
              }
            </Button>
          ))}
        </div>

        {/* Testimonial Card */}
        {currentTestimonial && (
          <Card className="max-w-3xl mx-auto bg-card border-secondary/20 shadow-lg">
            <CardContent className="p-8">
              {/* Quote Icon with CWT Logo */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <Quote className="h-12 w-12 text-secondary/30" />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-card rounded-full flex items-center justify-center border border-secondary/20">
                    <img src={cwtLogo} alt="CWT" className="h-6 w-auto" />
                  </div>
                </div>
              </div>

              {/* Rating Stars */}
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-secondary text-secondary" />
                ))}
              </div>

              {/* Issue Badge */}
              <div className="flex justify-center mb-4">
                <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                  {currentTestimonial.issue}
                </Badge>
              </div>

              {/* Quote */}
              <blockquote className="text-lg text-foreground text-center mb-6 italic leading-relaxed">
                "{currentTestimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="text-center">
                <p className="font-semibold text-foreground">{currentTestimonial.name}</p>
                <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {currentTestimonial.location}
                </p>
              </div>

              {/* EPA Verified Badge */}
              <div className="flex justify-center mt-4">
                <div className="flex items-center gap-2 text-xs text-green-600 bg-green-50 px-3 py-1 rounded-full">
                  <img src={cwtLogo} alt="CWT" className="h-4 w-auto" />
                  <span className="font-medium">
                    {language === "es" ? "Verificado por Técnico EPA" : "EPA Verified Technician"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex justify-center items-center gap-4 mt-6">
          <Button
            variant="outline"
            size="icon"
            onClick={prevTestimonial}
            disabled={filteredTestimonials.length <= 1}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          <span className="text-sm text-muted-foreground">
            {currentIndex + 1} / {filteredTestimonials.length}
          </span>
          
          <Button
            variant="outline"
            size="icon"
            onClick={nextTestimonial}
            disabled={filteredTestimonials.length <= 1}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center gap-6 mt-10 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <img src={cwtLogo} alt="CWT" className="h-5 w-auto" />
            <span>{language === "es" ? "Técnicos Certificados EPA" : "EPA Certified Technicians"}</span>
          </div>
          <div className="flex items-center gap-2">
            <img src={cwtLogo} alt="CWT" className="h-5 w-auto" />
            <span>{language === "es" ? "Verificación de Antecedentes" : "Background Verified"}</span>
          </div>
          <div className="flex items-center gap-2">
            <img src={cwtLogo} alt="CWT" className="h-5 w-auto" />
            <span>{language === "es" ? "Sin Presión de Ventas" : "No Sales Pressure"}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
