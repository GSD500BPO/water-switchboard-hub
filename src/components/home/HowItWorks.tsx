import { MapPin, BarChart3, FileCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    {
      icon: MapPin,
      title: t("howItWorks.step1.title"),
      description: t("howItWorks.step1.desc"),
    },
    {
      icon: BarChart3,
      title: t("howItWorks.step2.title"),
      description: t("howItWorks.step2.desc"),
    },
    {
      icon: FileCheck,
      title: t("howItWorks.step3.title"),
      description: t("howItWorks.step3.desc"),
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {t("howItWorks.title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Obtén la verdad sobre tu agua en tres simples pasos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={step.title} 
              className="relative text-center p-6"
            >
              {/* Step Number */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>

              {/* Icon */}
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center">
                <step.icon className="h-8 w-8 text-secondary" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-primary mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {step.description}
              </p>

              {/* Connector Line (hidden on mobile, between cards on desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 right-0 w-full h-0.5 bg-border -z-10 translate-x-1/2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
