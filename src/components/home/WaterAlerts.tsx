import { AlertTriangle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

// Mock data - will be replaced with real data later
const alerts = [
  {
    id: 1,
    city: "Phoenix, AZ",
    type: "PFAS Detection",
    severity: "warning",
    date: "Ene 28, 2026",
    description: "Niveles elevados de PFAS detectados en el suministro de agua municipal.",
  },
  {
    id: 2,
    city: "Austin, TX",
    type: "Lead Advisory",
    severity: "critical",
    date: "Ene 25, 2026",
    description: "Niveles de plomo por encima del límite de acción de la EPA en vecindarios antiguos.",
  },
  {
    id: 3,
    city: "Denver, CO",
    type: "Hard Water Alert",
    severity: "info",
    date: "Ene 22, 2026",
    description: "Alto contenido mineral reportado; puede afectar electrodomésticos.",
  },
];

const severityColors = {
  info: "bg-accent text-accent-foreground",
  warning: "bg-amber-100 text-amber-800",
  critical: "bg-destructive/10 text-destructive",
};

export function WaterAlerts() {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {t("alerts.title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Mantente informado sobre problemas de calidad del agua en todo el país
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {alerts.map((alert) => (
            <Card key={alert.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg font-semibold text-primary">
                    {alert.city}
                  </CardTitle>
                  <Badge 
                    variant="secondary" 
                    className={severityColors[alert.severity as keyof typeof severityColors]}
                  >
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    {alert.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  {alert.description}
                </p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {alert.date}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
