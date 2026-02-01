import { Link } from "react-router-dom";
import { Beaker, AlertTriangle, Bug, Thermometer, FlaskConical, Activity, Droplets, ClipboardCheck, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const testTypes = [
  {
    id: "standard",
    icon: Beaker,
    titleKey: "tests.standard.title" as const,
    descKey: "tests.standard.desc" as const,
    price: "$49",
    featured: true,
  },
  {
    id: "heavy-metals",
    icon: AlertTriangle,
    titleKey: "tests.heavyMetals.title" as const,
    descKey: "tests.heavyMetals.desc" as const,
    price: "$39",
    featured: false,
  },
  {
    id: "bacteria",
    icon: Bug,
    titleKey: "tests.bacteria.title" as const,
    descKey: "tests.bacteria.desc" as const,
    price: "$35",
    featured: false,
  },
  {
    id: "legionella",
    icon: Thermometer,
    titleKey: "tests.legionella.title" as const,
    descKey: "tests.legionella.desc" as const,
    price: "$55",
    featured: false,
  },
  {
    id: "chemical",
    icon: FlaskConical,
    titleKey: "tests.chemical.title" as const,
    descKey: "tests.chemical.desc" as const,
    price: "$45",
    featured: false,
  },
  {
    id: "enterococci",
    icon: Activity,
    titleKey: "tests.enterococci.title" as const,
    descKey: "tests.enterococci.desc" as const,
    price: "$40",
    featured: false,
  },
  {
    id: "thm",
    icon: Droplets,
    titleKey: "tests.thm.title" as const,
    descKey: "tests.thm.desc" as const,
    price: "$50",
    featured: false,
  },
  {
    id: "comprehensive",
    icon: ClipboardCheck,
    titleKey: "tests.comprehensive.title" as const,
    descKey: "tests.comprehensive.desc" as const,
    price: "$129",
    featured: true,
  },
];

export function WaterTestingServices() {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("tests.title")}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("tests.subtitle")}
          </p>
          <p className="text-sm text-secondary mt-2 font-medium">
            {t("tests.contact")}
          </p>
        </div>

        {/* Test Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {testTypes.map((test) => (
            <Card
              key={test.id}
              className={`relative overflow-hidden transition-all hover:shadow-lg ${
                test.featured ? "ring-2 ring-secondary" : ""
              }`}
            >
              {test.featured && (
                <div className="absolute top-0 right-0 bg-secondary text-secondary-foreground text-xs font-semibold px-3 py-1 rounded-bl-lg">
                  Popular
                </div>
              )}
              <CardHeader className="pb-2">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                  <test.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{t(test.titleKey)}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  {t(test.descKey)}
                </CardDescription>
                <p className="text-2xl font-bold text-primary mt-3">{test.price}</p>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" asChild>
                  <Link to={`/tests/${test.id}`}>
                    {t("tests.learnMore")}
                  </Link>
                </Button>
                <Button size="sm" className="flex-1 bg-secondary hover:bg-secondary/90">
                  {t("tests.addToCart")}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Unsure Section */}
        <Card className="max-w-2xl mx-auto bg-primary text-primary-foreground">
          <CardContent className="p-8 text-center">
            <HelpCircle className="h-12 w-12 mx-auto mb-4 opacity-80" />
            <h3 className="text-xl font-bold mb-2">
              {t("tests.unsure.title")}
            </h3>
            <p className="opacity-80 mb-4">
              {t("tests.unsure.desc")}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="secondary"
                className="bg-card text-foreground hover:bg-card/90"
              >
                {t("tests.freeTest")}
              </Button>
              <Button
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                {t("tests.orderKit")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
