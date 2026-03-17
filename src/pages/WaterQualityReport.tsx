import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "@/components/seo/Helmet";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import {
  Droplets, AlertTriangle, CheckCircle, Shield, ArrowRight,
  Beaker, ThermometerSun, Activity,
} from "lucide-react";
import { getCitiesInState, getAllStates, getCompaniesByCity } from "@/data/companies";
import { getCityWaterData, SERVICES, getCompaniesByService, WATER_PROBLEMS } from "@/data/seoData";

// Reverse lookup: city slug → state slug
function findStateForCity(citySlug: string): { stateSlug: string; cityName: string; stateName: string } | null {
  for (const st of getAllStates()) {
    for (const ct of getCitiesInState(st.slug)) {
      if (ct.slug === citySlug) {
        return { stateSlug: st.slug, cityName: ct.name, stateName: st.name };
      }
    }
  }
  return null;
}

function HardnessGauge({ level }: { level: string }) {
  const levels = ["Soft", "Soft-Moderate", "Moderate", "Moderate-Hard", "Hard", "Hard-Very Hard", "Very Hard"];
  const idx = levels.indexOf(level);
  const pct = idx >= 0 ? ((idx + 1) / levels.length) * 100 : 50;
  const color = pct < 30 ? "bg-green-500" : pct < 60 ? "bg-yellow-500" : pct < 80 ? "bg-orange-500" : "bg-red-500";

  return (
    <div>
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>Soft</span><span>Very Hard</span>
      </div>
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all`} style={{ width: `${pct}%` }} />
      </div>
      <p className="text-center font-semibold mt-1 text-sm">{level}</p>
    </div>
  );
}

function WaterQualitySchema({ cityName, stateName, data }: { cityName: string; stateName: string; data: any }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `${cityName}, ${stateName} Water Quality Report 2026`,
    "description": `Comprehensive water quality analysis for ${cityName}. Source: ${data.source}. Hardness: ${data.hardness}. TDS: ${data.tds}.`,
    "author": { "@type": "Organization", "name": "Community Water Test" },
    "publisher": { "@type": "Organization", "name": "Community Water Test", "url": "https://communitywatertest.org" },
    "datePublished": "2026-01-01",
    "dateModified": "2026-03-17",
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

const WaterQualityReport = () => {
  const { city } = useParams();
  const citySlug = city || "";

  const lookup = findStateForCity(citySlug);
  if (!lookup) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">City Not Found</h1>
            <Link to="/"><Button className="bg-blue-600 hover:bg-blue-700">Go Home</Button></Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const { stateSlug, cityName, stateName } = lookup;
  const waterData = getCityWaterData(cityName);
  const companies = getCompaniesByCity(stateSlug, citySlug);

  if (!waterData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Water Quality Data Not Available</h1>
            <p className="text-gray-500 mb-4">We don't have detailed water quality data for {cityName} yet.</p>
            <Link to={`/water-treatment/${stateSlug}/${citySlug}`}>
              <Button className="bg-blue-600 hover:bg-blue-700">Browse {cityName} Companies</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const pageTitle = `${cityName}, ${stateName} Water Quality Report 2026 | Is Your Water Safe?`;
  const pageDesc = `${cityName} water quality analysis: source (${waterData.source}), hardness (${waterData.hardness}), TDS (${waterData.tds}), top contaminants, and what to do about it.`;

  // Relevant problems for this city based on water characteristics
  const relevantProblems = WATER_PROBLEMS.filter((p) => {
    if (p.slug === "hard-water" && waterData.hardness.includes("Hard")) return true;
    if (p.slug === "chlorine-taste") return true; // universal
    if (p.slug === "lead-contamination" && waterData.topContaminants.some((c) => c.toLowerCase().includes("lead"))) return true;
    if (p.slug === "contaminants" && waterData.topContaminants.some((c) => c.includes("PFAS") || c.includes("Chromium"))) return true;
    return false;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet title={pageTitle} description={pageDesc} canonical={`/water-quality/${citySlug}`} />
      <WaterQualitySchema cityName={cityName} stateName={stateName} data={waterData} />
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: `Water Quality`, url: `/water-quality/${citySlug}` },
        { name: cityName, url: `/water-quality/${citySlug}` },
      ]} />
      <Header />
      <main className="flex-1 bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
              <Link to="/" className="hover:text-blue-600">Home</Link>
              <span>/</span>
              <Link to={`/water-treatment/${stateSlug}`} className="hover:text-blue-600">{stateName}</Link>
              <span>/</span>
              <Link to={`/water-treatment/${stateSlug}/${citySlug}`} className="hover:text-blue-600">{cityName}</Link>
              <span>/</span>
              <span className="font-medium text-gray-900">Water Quality</span>
            </div>
          </div>
        </div>

        {/* Hero */}
        <div className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white py-10">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-6 h-6" />
              <Badge className="bg-white/20 text-white border-0">Updated March 2026</Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{cityName} Water Quality Report</h1>
            <p className="text-cyan-100 text-lg">What's really in your {cityName} tap water — and what to do about it</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Overview Cards */}
              <div className="grid sm:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Droplets className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <p className="text-xs text-gray-500">Water Source</p>
                    <p className="font-semibold text-sm mt-1">{waterData.source}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <ThermometerSun className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                    <p className="text-xs text-gray-500">Hardness Level</p>
                    <p className="font-semibold text-sm mt-1">{waterData.hardnessGrains}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Activity className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                    <p className="text-xs text-gray-500">Total Dissolved Solids</p>
                    <p className="font-semibold text-sm mt-1">{waterData.tds}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Hardness gauge */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Water Hardness in {cityName}</h2>
                  <HardnessGauge level={waterData.hardness} />
                  <p className="text-sm text-gray-600 mt-4">
                    {cityName}'s water hardness is classified as <strong>{waterData.hardness}</strong> at {waterData.hardnessGrains}.
                    Water above 7 gpg (grains per gallon) is considered hard and benefits from softening treatment.
                    {waterData.hardness.includes("Very Hard") && " At this level, a water softener is strongly recommended to protect plumbing and appliances."}
                    {waterData.hardness.includes("Soft") && " At this level, a water softener is typically not needed, but other filtration may still be beneficial."}
                  </p>
                </CardContent>
              </Card>

              {/* Top contaminants */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">
                    <AlertTriangle className="w-5 h-5 inline text-yellow-500 mr-2" />
                    Top Contaminants Found in {cityName} Water
                  </h2>
                  <div className="space-y-3">
                    {waterData.topContaminants.map((contaminant, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-700 font-bold text-sm">
                          {i + 1}
                        </div>
                        <span className="font-medium">{contaminant}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    Source: Based on EPA SDWIS data, EWG Tap Water Database, and local water utility reports for {waterData.waterSystem}.
                  </p>
                </CardContent>
              </Card>

              {/* EPA compliance */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-3">EPA Compliance Status</h2>
                  <div className="flex items-start gap-3">
                    {waterData.epaViolations === "None recent" ? (
                      <>
                        <CheckCircle className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-green-700">No Recent EPA Violations</p>
                          <p className="text-sm text-gray-600 mt-1">
                            {cityName}'s water system ({waterData.waterSystem}) has no recent EPA violations.
                            However, many contaminants found at legal levels may still affect health and taste.
                            Legal doesn't always mean safe — EPA limits haven't been updated for many contaminants since 2000.
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-6 h-6 text-yellow-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-yellow-700">{waterData.epaViolations}</p>
                          <p className="text-sm text-gray-600 mt-1">
                            {cityName}'s water system has noted issues. A home water test can determine
                            exactly what's coming through your tap.
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Common problems */}
              {relevantProblems.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">Common Water Problems in {cityName}</h2>
                    <div className="space-y-4">
                      {relevantProblems.map((problem) => (
                        <Link
                          key={problem.slug}
                          to={`/water-problems/${stateSlug}/${citySlug}/${problem.slug}`}
                          className="block p-4 border rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                        >
                          <h3 className="font-semibold text-blue-700">{problem.title} →</h3>
                          <p className="text-sm text-gray-600 mt-1">{problem.description.slice(0, 150)}...</p>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* What to do */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-3">What Should You Do?</h2>
                  <ol className="space-y-3 text-sm text-gray-700">
                    <li className="flex gap-3">
                      <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center shrink-0 text-xs font-bold">1</span>
                      <span><strong>Get a water test.</strong> A free, no-obligation test reveals exactly what's in YOUR water — not just the city average.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center shrink-0 text-xs font-bold">2</span>
                      <span><strong>Compare solutions.</strong> Based on your results, compare water softeners, RO systems, or whole-house filters from {companies.length} local companies.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center shrink-0 text-xs font-bold">3</span>
                      <span><strong>Get quotes.</strong> Reach out to top-rated companies for free estimates and professional recommendations.</span>
                    </li>
                  </ol>
                  <div className="mt-4 text-center">
                    <Link to="/schedule-test">
                      <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                        Get Your Free Water Test <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6 text-center">
                  <Beaker className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-bold text-lg mb-2">Free Water Test</h3>
                  <p className="text-sm text-gray-600 mb-4">Find out exactly what's in YOUR water — not the city average.</p>
                  <Link to="/schedule-test">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Schedule Test</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-3">Water System Info</h3>
                  <dl className="space-y-2 text-sm">
                    <div><dt className="text-gray-500">Utility</dt><dd className="font-medium">{waterData.waterSystem}</dd></div>
                    <div><dt className="text-gray-500">Population Served</dt><dd className="font-medium">{waterData.population}</dd></div>
                    <div><dt className="text-gray-500">Primary Source</dt><dd className="font-medium">{waterData.source}</dd></div>
                  </dl>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-3">Local Companies</h3>
                  <p className="text-sm text-gray-600 mb-3">{companies.length} water treatment companies in {cityName}</p>
                  <Link to={`/water-treatment/${stateSlug}/${citySlug}`} className="text-sm text-blue-600 hover:underline">
                    Browse All Companies →
                  </Link>
                  <div className="mt-2">
                    <Link to={`/best-water-treatment/${stateSlug}/${citySlug}`} className="text-sm text-blue-600 hover:underline">
                      Top Rated Companies →
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WaterQualityReport;
