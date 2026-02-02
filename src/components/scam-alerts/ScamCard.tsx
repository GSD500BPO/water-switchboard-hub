import { useState } from "react";
import { ChevronUp, ChevronDown, ExternalLink, MapPin, Calendar, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScamArticle, categoryLabels, locationLabels } from "@/data/scamData";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

interface ScamCardProps {
  scam: ScamArticle;
  onReadMore: (scam: ScamArticle) => void;
}

const categoryColors: Record<string, string> = {
  "door-to-door": "bg-destructive/10 text-destructive border-destructive/20",
  "phone": "bg-orange-100 text-orange-700 border-orange-200",
  "fake-tests": "bg-purple-100 text-purple-700 border-purple-200",
  "education": "bg-green-100 text-green-700 border-green-200",
  "utility": "bg-amber-100 text-amber-700 border-amber-200"
};

const locationColors: Record<string, string> = {
  "Utah": "bg-secondary/10 text-secondary border-secondary/20",
  "New Jersey": "bg-primary/10 text-primary border-primary/20",
  "General": "bg-muted text-muted-foreground border-border"
};

export function ScamCard({ scam, onReadMore }: ScamCardProps) {
  const { language } = useLanguage();
  const [votes, setVotes] = useState(scam.votes);
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null);

  const handleUpvote = () => {
    if (userVote === "up") {
      setVotes(scam.votes);
      setUserVote(null);
    } else {
      setVotes(scam.votes + 1);
      setUserVote("up");
    }
  };

  const handleDownvote = () => {
    if (userVote === "down") {
      setVotes(scam.votes);
      setUserVote(null);
    } else {
      setVotes(scam.votes - 1);
      setUserVote("down");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === "es" ? "es-ES" : "en-US", {
      year: "numeric",
      month: "short"
    });
  };

  const formatVotes = (count: number) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + "k";
    }
    return count.toString();
  };

  return (
    <Card className={cn(
      "transition-all duration-200 hover:shadow-md border-l-4",
      scam.isPinned ? "border-l-destructive bg-destructive/5" : "border-l-transparent hover:border-l-secondary"
    )}>
      <CardContent className="p-0">
        <div className="flex">
          {/* Voting Section */}
          <div className="flex flex-col items-center justify-start py-4 px-3 bg-muted/30 min-w-[60px]">
            <button
              onClick={handleUpvote}
              className={cn(
                "p-1 rounded transition-colors",
                userVote === "up" 
                  ? "text-secondary bg-secondary/10" 
                  : "text-muted-foreground hover:text-secondary hover:bg-secondary/10"
              )}
              aria-label="Upvote"
            >
              <ChevronUp className="h-5 w-5" />
            </button>
            <span className={cn(
              "font-bold text-sm my-1",
              userVote === "up" && "text-secondary",
              userVote === "down" && "text-destructive"
            )}>
              {formatVotes(votes)}
            </span>
            <button
              onClick={handleDownvote}
              className={cn(
                "p-1 rounded transition-colors",
                userVote === "down" 
                  ? "text-destructive bg-destructive/10" 
                  : "text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              )}
              aria-label="Downvote"
            >
              <ChevronDown className="h-5 w-5" />
            </button>
          </div>

          {/* Content Section */}
          <div className="flex-1 py-4 pr-4 pl-2">
            {/* Header with pinned badge */}
            <div className="flex items-start gap-2 flex-wrap mb-2">
              {scam.isPinned && (
                <Badge variant="destructive" className="text-xs flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  {language === "es" ? "DESTACADO" : "PINNED"}
                </Badge>
              )}
              <h3 className="font-semibold text-foreground leading-tight flex-1">
                {scam.title[language]}
              </h3>
            </div>

            {/* Summary */}
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {scam.summary[language]}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge 
                variant="outline" 
                className={cn("text-xs", locationColors[scam.location])}
              >
                <MapPin className="h-3 w-3 mr-1" />
                {scam.city ? `${scam.city}, ` : ""}
                {locationLabels[scam.location][language]}
              </Badge>
              {scam.categories.slice(0, 2).map((category) => (
                <Badge 
                  key={category}
                  variant="outline" 
                  className={cn("text-xs", categoryColors[category])}
                >
                  {categoryLabels[category][language]}
                </Badge>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(scam.date)}
                </span>
                {scam.source && (
                  <span className="flex items-center gap-1">
                    {language === "es" ? "Fuente:" : "Source:"} {scam.source}
                  </span>
                )}
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onReadMore(scam)}
                className="text-secondary hover:text-secondary hover:bg-secondary/10"
              >
                {language === "es" ? "Leer Más" : "Read More"}
                <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
