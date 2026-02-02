import { X, MapPin, Calendar, ExternalLink, AlertTriangle, ShieldCheck, ShieldAlert } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ScamArticle, categoryLabels, locationLabels } from "@/data/scamData";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDealer } from "@/contexts/DealerContext";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface ScamDetailModalProps {
  scam: ScamArticle | null;
  isOpen: boolean;
  onClose: () => void;
}

const categoryColors: Record<string, string> = {
  "door-to-door": "bg-destructive/10 text-destructive border-destructive/20",
  "phone": "bg-orange-100 text-orange-700 border-orange-200",
  "fake-tests": "bg-purple-100 text-purple-700 border-purple-200",
  "education": "bg-green-100 text-green-700 border-green-200",
  "utility": "bg-amber-100 text-amber-700 border-amber-200"
};

export function ScamDetailModal({ scam, isOpen, onClose }: ScamDetailModalProps) {
  const { language } = useLanguage();
  const { isDealerMode } = useDealer();

  if (!scam) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === "es" ? "es-ES" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-start gap-2 mb-2">
            {scam.isPinned && (
              <Badge variant="destructive" className="flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                {language === "es" ? "DESTACADO" : "PINNED"}
              </Badge>
            )}
          </div>
          <DialogTitle className="text-xl font-bold text-foreground pr-8">
            {scam.title[language]}
          </DialogTitle>
          
          {/* Meta info */}
          <div className="flex flex-wrap gap-3 mt-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {scam.city ? `${scam.city}, ` : ""}
              {locationLabels[scam.location][language]}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatDate(scam.date)}
            </span>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mt-3">
            {scam.categories.map((category) => (
              <Badge 
                key={category}
                variant="outline" 
                className={cn("text-xs", categoryColors[category])}
              >
                {categoryLabels[category][language]}
              </Badge>
            ))}
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[50vh] px-6">
          {/* Main Content */}
          <div className="prose prose-sm max-w-none py-4">
            {scam.content[language].split("\n\n").map((paragraph, index) => (
              <p key={index} className="text-foreground mb-3 whitespace-pre-line">
                {paragraph.split("**").map((part, i) => 
                  i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                )}
              </p>
            ))}
          </div>

          {/* Warning Signs */}
          {scam.warningSigns && (
            <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4 my-4">
              <h4 className="font-semibold text-destructive flex items-center gap-2 mb-3">
                <ShieldAlert className="h-5 w-5" />
                {language === "es" ? "Señales de Advertencia" : "Warning Signs"}
              </h4>
              <ul className="space-y-2">
                {scam.warningSigns[language].map((sign, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-destructive mt-1">•</span>
                    <span>{sign}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Safety Tips */}
          {scam.safetyTips && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 my-4">
              <h4 className="font-semibold text-green-700 flex items-center gap-2 mb-3">
                <ShieldCheck className="h-5 w-5" />
                {language === "es" ? "Consejos de Seguridad" : "Safety Tips"}
              </h4>
              <ul className="space-y-2">
                {scam.safetyTips[language].map((tip, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Source Link */}
          {scam.sourceUrl && (
            <div className="py-3 border-t">
              <a 
                href={scam.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-secondary hover:underline flex items-center gap-1"
              >
                <ExternalLink className="h-4 w-4" />
                {language === "es" ? "Ver Fuente Original" : "View Original Source"}: {scam.source}
              </a>
            </div>
          )}
        </ScrollArea>

        {/* CTA Section */}
        <div className="p-6 pt-4 border-t bg-muted/30">
          <div className="text-center">
            <h4 className="font-semibold mb-2">
              {language === "es" 
                ? "¿Preocupado por tu agua? Obtén una prueba REAL." 
                : "Worried about your water? Get a REAL test."}
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              {language === "es"
                ? "No confíes en vendedores puerta a puerta. Usa un kit de prueba certificado o solicita una prueba gratuita de un experto verificado."
                : "Don't trust door-to-door salespeople. Use a certified test kit or request a free test from a verified expert."}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {!isDealerMode && (
                <Button asChild>
                  <Link to="/#tests">
                    {language === "es" ? "Ordenar Kit Certificado" : "Order Certified Kit"}
                  </Link>
                </Button>
              )}
              <Button variant={isDealerMode ? "default" : "secondary"} asChild>
                <Link to="/#tests">
                  {language === "es" ? "Solicitar Prueba Gratis" : "Request Free Test"}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
