import { useParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  CheckCircle, 
  Droplets, 
  MapPin, 
  Phone,
  Info
} from "lucide-react";
import { getWaterQualityByZip, hasSpecificData } from "@/data/waterQualityData";
import cwtLogo from "@/assets/cwt-logo.png";

export default function WaterQuality() {
  const { zip } = useParams<{ zip: string }>();
  const data = getWaterQualityByZip(zip || "00000");
  const hasSpecific = hasSpecificData(zip || "");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 text-primary-foreground/70 text-sm mb-2">
              <MapPin className="h-4 w-4" />
              <span>Water Quality Report</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {data.city}, {data.state} {zip || data.zip}
            </h1>
            <p className="text-primary-foreground/80">
              Independent water quality data for your area
            </p>
            {!hasSpecific && (
              <div className="mt-3 inline-flex items-center gap-2 bg-primary-foreground/10 px-3 py-2 rounded-lg text-sm">
                <Info className="h-4 w-4" />
                <span>Based on regional data — your local water may vary</span>
              </div>
            )}
          </div>
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Water Data */}
            <div className="lg:col-span-2 space-y-6">
              {/* Overview Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Droplets className="h-5 w-5 text-secondary" />
                    Water Quality Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">Source</div>
                      <div className="font-semibold text-primary">{data.sourceType}</div>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">Hardness</div>
                      <div className="font-semibold text-primary">{data.hardnessLevel}</div>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">Overall</div>
                      <Badge 
                        variant="secondary" 
                        className={
                          data.overallRating === "Excellent" ? "bg-green-100 text-green-800" :
                          data.overallRating === "Good" ? "bg-green-100 text-green-800" :
                          data.overallRating === "Fair" ? "bg-amber-100 text-amber-800" :
                          "bg-red-100 text-red-800"
                        }
                      >
                        {data.overallRating}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contaminants Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Detected Contaminants</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Contaminant</th>
                          <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Detected</th>
                          <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Safe Limit</th>
                          <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.contaminants.map((contaminant) => (
                          <tr key={contaminant.name} className="border-b border-border last:border-0">
                            <td className="py-3 px-2 font-medium text-primary">{contaminant.name}</td>
                            <td className="py-3 px-2 text-muted-foreground">
                              {contaminant.level} {contaminant.unit}
                            </td>
                            <td className="py-3 px-2 text-muted-foreground">
                              {contaminant.safeLimit} {contaminant.unit}
                            </td>
                            <td className="py-3 px-2">
                              {contaminant.status === "safe" ? (
                                <Badge variant="secondary" className="bg-green-100 text-green-800">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Safe
                                </Badge>
                              ) : contaminant.status === "elevated" ? (
                                <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                                  <AlertTriangle className="h-3 w-3 mr-1" />
                                  Elevated
                                </Badge>
                              ) : (
                                <Badge variant="secondary" className="bg-red-100 text-red-800">
                                  <AlertTriangle className="h-3 w-3 mr-1" />
                                  High
                                </Badge>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Scam Warning */}
              <Card className="border-amber-200 bg-amber-50">
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-amber-900 mb-2">
                        Watch Out for Water Test Scams
                      </h3>
                      <p className="text-sm text-amber-800">
                        Be wary of "free" water tests that come with high-pressure sales tactics. 
                        Legitimate testing services provide data without pushing expensive equipment.
                        <a href="/scam-alerts" className="underline ml-1">Learn more →</a>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - CTA */}
            <div className="space-y-6">
              <Card className="border-secondary bg-secondary/5">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-secondary/10 rounded-full flex items-center justify-center p-2">
                      <img src={cwtLogo} alt="CWT" className="h-12 w-auto" />
                    </div>
                    <h3 className="text-xl font-semibold text-primary mb-2">
                      Request a Free Community Water Test
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Get an independent test of your home's water — no sales pressure, 
                      no strings attached.
                    </p>
                    <Button size="lg" className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                      <Phone className="h-4 w-4 mr-2" />
                      Request Free Test
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Data Sources</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Water quality data is compiled from EPA reports, local utility disclosures, 
                    and community testing results. Last updated: {data.lastUpdated}.
                  </p>
                  <p className="text-xs text-muted-foreground mt-2 italic">
                    This data is for informational purposes. Request a free test for your specific home's water quality.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
