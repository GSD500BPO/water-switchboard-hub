import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ZohoFormEmbed } from "@/components/ZohoFormEmbed";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Shield, Clock, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

import cwtLogo from "@/assets/cwt-logo.png";
import yamilyPhoto from "@/assets/yamily-acosta.png";

export default function ScheduleTest() {
  const { language } = useLanguage();

  const benefits = [
    {
      icon: Shield,
      titleEn: "EPA Certified Technicians",
      titleEs: "Técnicos Certificados EPA",
      descEn: "All our water specialists are EPA-verified professionals",
      descEs: "Todos nuestros especialistas son profesionales verificados por la EPA"
    },
    {
      icon: CheckCircle,
      titleEn: "Background Verified",
      titleEs: "Antecedentes Verificados",
      descEn: "Every technician passes comprehensive background checks",
      descEs: "Cada técnico pasa verificaciones de antecedentes completas"
    },
    {
      icon: Clock,
      titleEn: "Quick Results",
      titleEs: "Resultados Rápidos",
      descEn: "Get your water quality results explained on the spot",
      descEs: "Obtén tus resultados de calidad del agua explicados al instante"
    },
    {
      icon: Users,
      titleEn: "No Sales Pressure",
      titleEs: "Sin Presión de Ventas",
      descEn: "Transparent consultation with informational brochures only",
      descEs: "Consulta transparente solo con folletos informativos"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-20 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <div className="flex justify-center mb-4">
                <img src={cwtLogo} alt="CWT" className="h-16 w-auto" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                {language === "es" 
                  ? "Agenda Tu Prueba de Agua Certificada" 
                  : "Schedule Your Certified Water Test"
                }
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {language === "es"
                  ? "Nuestros profesionales verificados te ayudarán a entender tu calidad de agua sin presión de ventas."
                  : "Our verified professionals will help you understand your water quality without sales pressure."
                }
              </p>
              <div className="flex justify-center items-center gap-2 text-sm text-green-600 mt-4">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">
                  {language === "es" ? "Verificado EPA + Antecedentes" : "EPA + Background Verified"}
                </span>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Form */}
              <Card className="border-secondary/20 shadow-lg">
                <CardContent className="p-6">
                  <ZohoFormEmbed height="550px" />
                  <p className="text-xs text-muted-foreground mt-4 text-center max-w-md mx-auto">
                    {language === "es" 
                      ? "Después de la prueba, tu representante te presentará opciones de filtros y puede dejar folletos informativos - esta consulta transparente es parte del servicio."
                      : "After testing, your representative will present filter options and may leave informational brochures - this transparent consultation is part of the service."
                    }
                  </p>
                </CardContent>
              </Card>

              {/* Water Specialist Section */}
              <div className="space-y-6">
              {/* Featured Water Specialist - Always shown */}
              <Card className="border-secondary/30 bg-gradient-to-br from-card to-secondary/5">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <span className="text-xs bg-secondary/20 text-secondary px-3 py-1 rounded-full font-medium mb-4">
                    {language === "es" ? "⭐ Especialista del Mes" : "⭐ Specialist of the Month"}
                  </span>
                  <img 
                    src={yamilyPhoto} 
                    alt="Yamily Acosta" 
                    className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full object-cover border-4 border-secondary/30 shadow-lg mb-4"
                  />
                  <h3 className="text-xl font-bold text-foreground">Yamily Acosta</h3>
                  <p className="text-sm text-muted-foreground mb-3">Salt Lake City, Utah</p>
                  <p className="text-sm text-foreground/80 max-w-sm">
                    {language === "es"
                      ? "Técnica certificada EPA con más de 5 años de experiencia ayudando a familias en Utah a entender y mejorar su calidad de agua."
                      : "EPA certified technician with 5+ years of experience helping Utah families understand and improve their water quality."
                    }
                  </p>
                  <div className="flex items-center gap-2 mt-4">
                    <img src={cwtLogo} alt="CWT" className="h-5 w-auto" />
                    <span className="text-xs text-green-600 font-medium">
                      {language === "es" ? "Verificada EPA + Antecedentes" : "EPA + Background Verified"}
                    </span>
                  </div>
                </CardContent>
              </Card>

                {/* Benefits */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {benefits.map((benefit, index) => (
                    <Card key={index} className="border-muted">
                      <CardContent className="p-4 flex items-start gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <benefit.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm text-foreground">
                            {language === "es" ? benefit.titleEs : benefit.titleEn}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {language === "es" ? benefit.descEs : benefit.descEn}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
