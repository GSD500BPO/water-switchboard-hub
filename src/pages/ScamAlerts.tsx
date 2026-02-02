import { useState, useMemo } from "react";
import { AlertTriangle, Shield, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScamCard } from "@/components/scam-alerts/ScamCard";
import { ScamFilters } from "@/components/scam-alerts/ScamFilters";
import { ScamDetailModal } from "@/components/scam-alerts/ScamDetailModal";
import { ScamCommentsSection } from "@/components/scam-alerts/ScamCommentsSection";
import { scamArticles, ScamArticle, ScamCategory, ScamLocation } from "@/data/scamData";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

export default function ScamAlerts() {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocations, setSelectedLocations] = useState<ScamLocation[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<ScamCategory[]>([]);
  const [selectedScam, setSelectedScam] = useState<ScamArticle | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLocationToggle = (location: ScamLocation) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((l) => l !== location)
        : [...prev, location]
    );
  };

  const handleCategoryToggle = (category: ScamCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedLocations([]);
    setSelectedCategories([]);
  };

  const handleReadMore = (scam: ScamArticle) => {
    setSelectedScam(scam);
    setIsModalOpen(true);
  };

  const filteredScams = useMemo(() => {
    return scamArticles.filter((scam) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          scam.title[language].toLowerCase().includes(query) ||
          scam.summary[language].toLowerCase().includes(query) ||
          scam.content[language].toLowerCase().includes(query) ||
          (scam.city && scam.city.toLowerCase().includes(query));
        if (!matchesSearch) return false;
      }

      // Location filter
      if (selectedLocations.length > 0 && !selectedLocations.includes(scam.location)) {
        return false;
      }

      // Category filter
      if (selectedCategories.length > 0) {
        const hasMatchingCategory = scam.categories.some((cat) =>
          selectedCategories.includes(cat)
        );
        if (!hasMatchingCategory) return false;
      }

      return true;
    });
  }, [searchQuery, selectedLocations, selectedCategories, language]);

  // Sort: pinned first, then by votes
  const sortedScams = useMemo(() => {
    return [...filteredScams].sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return b.votes - a.votes;
    });
  }, [filteredScams]);

  const pinnedScam = sortedScams.find((s) => s.isPinned);
  const regularScams = sortedScams.filter((s) => !s.isPinned);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-destructive/10 via-background to-background py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-full mb-6">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-semibold">
                {language === "es" ? "Alertas de Estafas" : "Scam Alerts"}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {language === "es"
                ? "Protégete de las Estafas de Agua"
                : "Protect Yourself from Water Scams"}
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              {language === "es"
                ? "Aprende a identificar vendedores fraudulentos y pruebas de agua falsas. Reportes reales de Utah y más."
                : "Learn to identify fraudulent salespeople and fake water tests. Real reports from Utah and beyond."}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild>
                <a href="#alerts">
                  <Search className="h-4 w-4 mr-2" />
                  {language === "es" ? "Ver Alertas" : "View Alerts"}
                </a>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/schedule-test">
                  <Shield className="h-4 w-4 mr-2" />
                  {language === "es" ? "Obtener Prueba Segura" : "Get Safe Test"}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section id="alerts" className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Search className="h-4 w-4" />
                    {language === "es" ? "Buscar y Filtrar" : "Search & Filter"}
                  </h3>
                  <ScamFilters
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    selectedLocations={selectedLocations}
                    onLocationToggle={handleLocationToggle}
                    selectedCategories={selectedCategories}
                    onCategoryToggle={handleCategoryToggle}
                    onClearFilters={handleClearFilters}
                  />
                </CardContent>
              </Card>
            </aside>

            {/* Scam Feed */}
            <main className="lg:col-span-3 space-y-4">
              {/* Results count */}
              <div className="text-sm text-muted-foreground mb-4">
                {language === "es"
                  ? `${sortedScams.length} alerta${sortedScams.length !== 1 ? "s" : ""} encontrada${sortedScams.length !== 1 ? "s" : ""}`
                  : `${sortedScams.length} alert${sortedScams.length !== 1 ? "s" : ""} found`}
              </div>

              {/* Featured/Pinned Alert */}
              {pinnedScam && (
                <div className="mb-6">
                  <ScamCard scam={pinnedScam} onReadMore={handleReadMore} />
                </div>
              )}

              {/* Regular Scam Cards */}
              {regularScams.length > 0 ? (
                <div className="space-y-4">
                  {regularScams.map((scam) => (
                    <ScamCard key={scam.id} scam={scam} onReadMore={handleReadMore} />
                  ))}
                </div>
              ) : (
                filteredScams.length === 0 && (
                  <Card className="p-8 text-center">
                    <p className="text-muted-foreground">
                      {language === "es"
                        ? "No se encontraron alertas con estos filtros."
                        : "No alerts found with these filters."}
                    </p>
                    <Button
                      variant="ghost"
                      onClick={handleClearFilters}
                      className="mt-4"
                    >
                      {language === "es" ? "Limpiar Filtros" : "Clear Filters"}
                    </Button>
                  </Card>
                )
              )}

              {/* Community Comments Section */}
              <div className="mt-8">
                <ScamCommentsSection />
              </div>
            </main>
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      <ScamDetailModal
        scam={selectedScam}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <Footer />
    </div>
  );
}
