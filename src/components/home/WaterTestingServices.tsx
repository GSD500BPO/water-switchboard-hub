import { Link } from "react-router-dom";
import { Beaker, AlertTriangle, Bug, Thermometer, FlaskConical, Activity, Droplets, ClipboardCheck, HelpCircle, Phone, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDealer } from "@/contexts/DealerContext";
import { ZohoFormEmbed } from "@/components/ZohoFormEmbed";

const testTypes = [
  {
    id: "standard",
    icon: Beaker,
    titleKey: "tests.standard.title" as const,
    descKey: "tests.standard.desc" as const,
    featured: true,
  },
  {
    id: "heavy-metals",
    icon: AlertTriangle,
    titleKey: "tests.heavyMetals.title" as const,
    descKey: "tests.heavyMetals.desc" as const,
    featured: false,
  },
  {
    id: "bacteria",
    icon: Bug,
    titleKey: "tests.bacteria.title" as const,
    descKey: "tests.bacteria.desc" as const,
    featured: false,
  },
  {
    id: "legionella",
    icon: Thermometer,
    titleKey: "tests.legionella.title" as const,
    descKey: "tests.legionella.desc" as const,
    featured: false,
  },
  {
    id: "chemical",
    icon: FlaskConical,
    titleKey: "tests.chemical.title" as const,
    descKey: "tests.chemical.desc" as const,
    featured: false,
  },
  {
    id: "enterococci",
    icon: Activity,
    titleKey: "tests.enterococci.title" as const,
    descKey: "tests.enterococci.desc" as const,
    featured: false,
  },
  {
    id: "thm",
    icon: Droplets,
    titleKey: "tests.thm.title" as const,
    descKey: "tests.thm.desc" as const,
    featured: false,
  },
  {
    id: "comprehensive",
    icon: ClipboardCheck,
    titleKey: "tests.comprehensive.title" as const,
    descKey: "tests.comprehensive.desc" as const,
    featured: true,
  },
];

export function WaterTestingServices() {
  const { t, language } = useLanguage();
  const { isDealerMode } = useDealer();

  return (
    <section id="tests" className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {language === "es" ? "Agenda Tu Prueba de Agua Certificada" : "Setup Your Certified Water Test"}
          </h2>
          <p className="text-lg text-muted-foreground">
            {language === "es" 
              ? "Nuestros profesionales verificados te ayudarán a entender tu calidad de agua sin presión de ventas."
              : "Our verified professionals will help you understand your water quality without sales pressure."
            }
          </p>
          <div className="flex justify-center items-center gap-2 text-sm text-green-600 mt-3">
            <CheckCircle className="h-5 w-5" />
            <span className="font-medium">
              {language === "es" ? "Verificado EPA + Antecedentes" : "EPA + Background Verified"}
            </span>
          </div>
        </div>

        {/* Zoho Form Embed - Primary CTA */}
        <Card className="max-w-2xl mx-auto mb-12 border-secondary/20">
          <CardContent className="p-6">
            <ZohoFormEmbed height="500px" />
            <p className="text-xs text-muted-foreground mt-4 text-center max-w-md mx-auto">
              {language === "es" 
                ? "Después de la prueba, tu representante te presentará opciones de filtros y puede dejar folletos informativos - esta consulta transparente es parte del servicio."
                : "After testing, your representative will present filter options and may leave informational brochures - this transparent consultation is part of the service."
              }
            </p>
          </CardContent>
        </Card>

        {/* Test Types Info Grid */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold text-center mb-6 text-foreground">
            {language === "es" ? "Tipos de Pruebas Disponibles" : "Available Test Types"}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {testTypes.map((test) => (
              <div
                key={test.id}
                className="flex flex-col items-center p-4 bg-card rounded-lg border hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                  <test.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-center text-foreground">
                  {t(test.titleKey)}
                </span>
                {test.featured && (
                  <span className="text-xs text-secondary font-medium mt-1">
                    {language === "es" ? "Popular" : "Popular"}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Unsure Section */}
        <Card className="max-w-2xl mx-auto mt-8 bg-primary text-primary-foreground">
          <CardContent className="p-8 text-center">
            <HelpCircle className="h-12 w-12 mx-auto mb-4 opacity-80" />
            <h3 className="text-xl font-bold mb-2">
              {t("tests.unsure.title")}
            </h3>
            <p className="opacity-80 mb-4">
              {language === "es" 
                ? "Llena el formulario arriba y nuestro experto te ayudará a determinar qué análisis necesitas."
                : "Fill out the form above and our expert will help determine which analysis you need."
              }
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
