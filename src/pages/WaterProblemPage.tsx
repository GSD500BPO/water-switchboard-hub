import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CompanyCard } from "@/components/directory/CompanyCard";
import { Helmet } from "@/components/seo/Helmet";
import { ArrowLeft, AlertTriangle, CheckCircle, Droplets, ArrowRight } from "lucide-react";
import { getCityName, getStateData, getCompaniesByCity } from "@/data/companies";
import { getProblemBySlug, getCompaniesForProblem, getCityWaterData, SERVICES, WATER_PROBLEMS } from "@/data/seoData";

function FAQSchema({ faqs }: { faqs: { q: string; a: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

const PROBLEM_FAQS: Record<string, (city: string) => { q: string; a: string }[]> = {
  "hard-water": (city) => [
    { q: `Is ${city} water hard?`, a: `Yes, many areas in ${city} have hard water. Hardness varies by neighborhood but a professional water test is the best way to measure your specific levels.` },
    { q: `What is the best solution for hard water in ${city}?`, a: `A whole-house water softener is the most effective solution for hard water. Salt-based systems use ion exchange to remove calcium and magnesium, while salt-free conditioners prevent scale without removing minerals.` },
    { q: "How much does it cost to fix hard water?", a: "Water softener installation typically costs $500-$3,000 depending on system size and water hardness level. Many companies offer free water testing and estimates." },
  ],
  "chlorine-taste": (city) => [
    { q: `Why does my ${city} water taste like chlorine?`, a: `${city}'s water utility adds chlorine or chloramine as a disinfectant. While it keeps water safe in the distribution system, residual levels can cause an unpleasant taste and smell.` },
    { q: "Is chlorine in tap water harmful?", a: "Chlorine at EPA-allowed levels is generally safe, but disinfection byproducts (THMs, HAAs) formed when chlorine reacts with organic matter are linked to increased cancer risk with long-term exposure." },
    { q: "How do I remove chlorine from my water?", a: "Activated carbon filters (whole-house or under-sink) effectively remove chlorine and its byproducts. Reverse osmosis systems remove chlorine plus additional contaminants." },
  ],
  "lead-contamination": (city) => [
    { q: `Does ${city} have lead in the water?`, a: `Lead can enter ${city}'s water through aging service lines, internal plumbing, and solder, especially in homes built before 1986. The only way to know your exposure is to test.` },
    { q: "What level of lead in water is safe?", a: "There is NO safe level of lead exposure, especially for children. The EPA action level is 15 ppb, but the American Academy of Pediatrics recommends below 1 ppb for school drinking water." },
    { q: "How do I remove lead from my water?", a: "Reverse osmosis and NSF-certified carbon filters effectively remove lead. Flushing pipes for 30 seconds before use also helps reduce exposure from stagnant water." },
  ],
  "iron-staining": (city) => [
    { q: `Why is my ${city} water orange/brown?`, a: `Orange or brown water in ${city} typically indicates iron or manganese in the water supply. This can come from the water source itself or from corroding pipes in the distribution system.` },
    { q: "Is iron in water harmful?", a: "Iron at typical residential levels isn't a health hazard, but it causes significant staining, metallic taste, and pipe buildup. The EPA secondary standard is 0.3 mg/L." },
    { q: "How do I remove iron from my water?", a: "Iron removal systems use oxidation + filtration. The right system depends on whether you have ferrous (clear water) or ferric (red water) iron and the concentration level." },
  ],
  "bad-taste-odor": (city) => [
    { q: `Why does my ${city} water taste bad?`, a: `Bad-tasting water in ${city} can be caused by chlorine treatment, mineral content, pipe corrosion, or contaminants. A water test identifies the specific cause so you can choose the right treatment.` },
    { q: "Is bad-tasting water safe to drink?", a: "Not always. While some causes (minerals, chlorine) are harmless, a sulfur smell or chemical taste can indicate hydrogen sulfide or volatile organic compounds that may pose health risks." },
    { q: "What filter removes bad taste from water?", a: "Activated carbon filters are most effective for taste and odor. For comprehensive improvement, a whole-house system treats all taps while an under-sink RO system provides premium drinking water." },
  ],
  "well-water-problems": (city) => [
    { q: `How do I treat well water in ${city}?`, a: `Well water in the ${city} area requires comprehensive testing and often multi-stage treatment: UV sterilization for bacteria, filtration for sediment, softening for hardness, and potentially iron removal.` },
    { q: "How often should I test my well water?", a: "At minimum annually for bacteria (coliform, E. coli) and nitrates. Test more frequently after flooding, nearby construction, or if you notice any changes in taste, smell, or appearance." },
    { q: "Is well water safe to drink without treatment?", a: "Not necessarily. Unlike municipal water, well water has NO treatment or monitoring by any government agency. Regular testing is essential, and treatment should be based on test results." },
  ],
  "scale-buildup": (city) => [
    { q: `Why do I have scale buildup in ${city}?`, a: `Scale buildup in ${city} homes is caused by hard water — dissolved calcium and magnesium minerals that precipitate out when water is heated or evaporates. The harder your water, the faster scale accumulates.` },
    { q: "Does scale damage appliances?", a: "Yes. Scale reduces water heater efficiency by up to 30%, shortens appliance lifespan, and clogs pipes over time. A water softener pays for itself through lower energy bills and fewer repairs." },
    { q: "How do I remove existing scale?", a: "Existing scale can be treated with vinegar or commercial descalers. A water softener prevents new buildup. For severe cases, professional pipe cleaning may be needed." },
  ],
  "contaminants": (city) => [
    { q: `What contaminants are in ${city}'s water?`, a: `${city}'s water may contain regulated contaminants at legal levels plus emerging unregulated contaminants like PFAS, microplastics, and pharmaceutical residues. A comprehensive water test reveals your specific exposure.` },
    { q: "Are PFAS in my drinking water?", a: "PFAS ('forever chemicals') have been found in water supplies across the US. The EPA set a legal limit of 4 ppt in 2024. Reverse osmosis and specialized activated carbon filters are effective at removing PFAS." },
    { q: "What's the best filter for removing contaminants?", a: "Reverse osmosis (RO) removes the broadest range of contaminants including PFAS, lead, arsenic, and pharmaceuticals. For whole-house protection, multi-stage systems with activated carbon are effective." },
  ],
};

const WaterProblemPage = () => {
  const { state, city, problem: problemSlug } = useParams();
  const stateSlug = state || "";
  const citySlug = city || "";

  const problem = getProblemBySlug(problemSlug || "");
  const stateData = getStateData(stateSlug);
  const cityName = getCityName(stateSlug, citySlug) || citySlug;
  const stateName = stateData?.name || stateSlug;
  const waterData = getCityWaterData(cityName);

  if (!problem) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Problem Not Found</h1>
            <Link to={`/water-treatment/${stateSlug}/${citySlug}`}>
              <Button className="bg-blue-600 hover:bg-blue-700">Back to {cityName}</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const companies = getCompaniesForProblem(stateSlug, citySlug, problem);
  const faqs = PROBLEM_FAQS[problem.slug]?.(cityName) || [];
  const solutionServices = SERVICES.filter((s) => problem.solutions.includes(s.key));
  const otherProblems = WATER_PROBLEMS.filter((p) => p.slug !== problem.slug);

  const pageTitle = `${problem.title} in ${cityName}, ${stateData?.abbreviation || ""} | Causes, Solutions & Local Experts`;
  const pageDesc = `${problem.description.slice(0, 150)} Find ${companies.length} companies in ${cityName} that can help.`;

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet title={pageTitle} description={pageDesc} canonical={`/water-problems/${stateSlug}/${citySlug}/${problemSlug}`} />
      {faqs.length > 0 && <FAQSchema faqs={faqs} />}
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
              <span className="font-medium text-gray-900">{problem.title}</span>
            </div>
          </div>
        </div>

        {/* Hero */}
        <div className="bg-gradient-to-r from-red-500 to-orange-600 text-white py-10">
          <div className="container mx-auto px-4">
            <Link to={`/water-quality/${citySlug}`} className="inline-flex items-center text-red-100 hover:text-white mb-4">
              <ArrowLeft className="w-4 h-4 mr-1" /> {cityName} Water Quality Report
            </Link>
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="w-8 h-8" />
              <Badge className="bg-white/20 text-white border-0">{cityName}, {stateData?.abbreviation}</Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{problem.title} in {cityName}</h1>
            <p className="text-red-100 text-lg max-w-2xl">{problem.description}</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Symptoms */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Signs You Have {problem.title}</h2>
                  <ul className="space-y-3">
                    {problem.symptoms.map((s, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <AlertTriangle className="w-4 h-4 text-orange-500 mt-1 shrink-0" />
                        <span className="text-gray-700">{s}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Solutions */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Recommended Solutions</h2>
                  <div className="space-y-3">
                    {solutionServices.map((svc) => {
                      const count = companies.filter((c) => c.services?.includes(svc.key)).length;
                      return (
                        <Link
                          key={svc.slug}
                          to={`/water-treatment/${stateSlug}/${citySlug}/services/${svc.slug}`}
                          className="flex items-center justify-between p-4 border rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <div>
                              <p className="font-semibold">{svc.label}</p>
                              <p className="text-sm text-gray-500">{count} companies in {cityName}</p>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                        </Link>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Companies that can help */}
              {companies.length > 0 && (
                <>
                  <h2 className="text-xl font-bold">Companies That Can Help in {cityName}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {companies.slice(0, 8).map((c) => (
                      <Link key={c.id} to={`/water-treatment/${stateSlug}/${citySlug}/${c.slug}`}>
                        <CompanyCard company={c} />
                      </Link>
                    ))}
                  </div>
                  {companies.length > 8 && (
                    <div className="text-center">
                      <Link to={`/water-treatment/${stateSlug}/${citySlug}`}>
                        <Button variant="outline">View All {companies.length} Companies</Button>
                      </Link>
                    </div>
                  )}
                </>
              )}

              {/* FAQ */}
              {faqs.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                      {faqs.map((f, i) => (
                        <div key={i} className="border-b last:border-0 pb-4 last:pb-0">
                          <h3 className="font-semibold text-gray-900">{f.q}</h3>
                          <p className="text-sm text-gray-600 mt-2">{f.a}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6 text-center">
                  <Droplets className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-bold text-lg mb-2">Free Water Test</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    The first step to solving {problem.title.toLowerCase()} is knowing exactly what's in your water.
                  </p>
                  <Link to="/schedule-test">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Schedule Free Test</Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Other water problems */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-3">Other Water Issues</h3>
                  <div className="space-y-2">
                    {otherProblems.slice(0, 5).map((p) => (
                      <Link
                        key={p.slug}
                        to={`/water-problems/${stateSlug}/${citySlug}/${p.slug}`}
                        className="block text-sm text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        {p.title} in {cityName}
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Water quality link */}
              {waterData && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold mb-3">{cityName} Water Data</h3>
                    <dl className="space-y-2 text-sm">
                      <div className="flex justify-between"><dt className="text-gray-500">Hardness</dt><dd className="font-medium">{waterData.hardness}</dd></div>
                      <div className="flex justify-between"><dt className="text-gray-500">TDS</dt><dd className="font-medium">{waterData.tds}</dd></div>
                    </dl>
                    <Link to={`/water-quality/${citySlug}`} className="block mt-3 text-sm text-blue-600 hover:underline">
                      Full Water Quality Report →
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WaterProblemPage;
