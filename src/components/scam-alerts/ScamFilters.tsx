import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScamCategory, ScamLocation, categoryLabels, locationLabels } from "@/data/scamData";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

interface ScamFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedLocations: ScamLocation[];
  onLocationToggle: (location: ScamLocation) => void;
  selectedCategories: ScamCategory[];
  onCategoryToggle: (category: ScamCategory) => void;
  onClearFilters: () => void;
}

const locations: ScamLocation[] = ["Utah", "New Jersey", "General"];
const categories: ScamCategory[] = ["door-to-door", "phone", "fake-tests", "utility", "education"];

export function ScamFilters({
  searchQuery,
  onSearchChange,
  selectedLocations,
  onLocationToggle,
  selectedCategories,
  onCategoryToggle,
  onClearFilters
}: ScamFiltersProps) {
  const { language } = useLanguage();

  const hasFilters = searchQuery || selectedLocations.length > 0 || selectedCategories.length > 0;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder={language === "es" ? "Buscar alertas de estafas..." : "Search scam alerts..."}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-10"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Location Filters */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">
          {language === "es" ? "Ubicación" : "Location"}
        </label>
        <div className="flex flex-wrap gap-2">
          {locations.map((location) => (
            <Badge
              key={location}
              variant={selectedLocations.includes(location) ? "default" : "outline"}
              className={cn(
                "cursor-pointer transition-colors",
                selectedLocations.includes(location) 
                  ? "bg-secondary hover:bg-secondary/80" 
                  : "hover:bg-secondary/10"
              )}
              onClick={() => onLocationToggle(location)}
            >
              {locationLabels[location][language]}
            </Badge>
          ))}
        </div>
      </div>

      {/* Category Filters */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">
          {language === "es" ? "Tipo de Estafa" : "Scam Type"}
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategories.includes(category) ? "default" : "outline"}
              className={cn(
                "cursor-pointer transition-colors",
                selectedCategories.includes(category) 
                  ? "bg-primary hover:bg-primary/80" 
                  : "hover:bg-primary/10"
              )}
              onClick={() => onCategoryToggle(category)}
            >
              {categoryLabels[category][language]}
            </Badge>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {hasFilters && (
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClearFilters}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4 mr-1" />
          {language === "es" ? "Limpiar Filtros" : "Clear Filters"}
        </Button>
      )}
    </div>
  );
}
