import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CompanyCard } from "@/components/directory/CompanyCard";
import { Helmet } from "@/components/seo/Helmet";
import { ArrowLeft, Droplets, CheckCircle, Phone, Star } from "lucide-react";
import {
  getCompaniesByCity,
  getCityName,
  getStateData,
} from "@/data/companies";
import { getServiceBySlug, SERVICES, getCityWaterData, getCompaniesByService } from "@/data/seoData";

const SERVICE_CONTENT: Record<string, { intro: string; benefits: string[]; costRange: string; faq: { q: string; a: string }[] }> = {
  "water_softener": {
    intro: "Water softeners use ion exchange to remove calcium and magnesium — the minerals that make water 'hard.' They protect your plumbing, extend appliance life, and make your skin and hair feel noticeably better.",
    benefits: ["Eliminates scale buildup in pipes and appliances", "Softer skin and hair", "Cleaner dishes without water spots", "Extended water heater lifespan (up to 30%)", "Reduced soap and detergent usage", "Better-tasting water for cooking"],
    costRange: "$500 - $3,000",
    faq: [
      { q: "How long does a water softener last?", a: "A quality water softener typically lasts 10-15 years with regular maintenance, including salt refills every 4-6 weeks." },
      { q: "Does a water softener add sodium to my water?", a: "Yes, but in very small amounts. A typical softened glass of water contains less sodium than a slice of bread. For sodium-free options, potassium chloride can replace salt." },
    ],
  },
  "reverse_osmosis": {
    intro: "Reverse osmosis (RO) pushes water through a semi-permeable membrane that blocks up to 99% of dissolved contaminants. It's the gold standard for drinking water purification, removing everything from lead and fluoride to pharmaceuticals and PFAS.",
    benefits: ["Removes up to 99% of contaminants", "Eliminates lead, fluoride, arsenic, PFAS", "Better-tasting drinking water", "Removes chlorine taste and odor", "Compact under-sink installation", "Low maintenance — filter changes every 6-12 months"],
    costRange: "$200 - $1,500",
    faq: [
      { q: "Does reverse osmosis waste water?", a: "Traditional RO systems use 3-4 gallons of water per 1 gallon produced. Modern high-efficiency systems have a 1:1 ratio. The 'waste' water can be redirected to irrigation." },
      { q: "What doesn't RO remove?", a: "RO removes most contaminants but may not fully remove some dissolved gases and certain volatile organic compounds. A carbon pre-filter handles these." },
    ],
  },
  "whole_house_filtration": {
    intro: "Whole-house filtration treats every drop of water entering your home at the point of entry. Every faucet, shower, and appliance gets filtered water — not just your kitchen sink.",
    benefits: ["Every tap delivers filtered water", "Protects all appliances and plumbing", "Reduces chlorine exposure during showers", "Multi-stage filtration for comprehensive treatment", "Improves water taste throughout the home", "One system covers everything"],
    costRange: "$1,000 - $5,000",
    faq: [
      { q: "How often do whole-house filters need replacement?", a: "Pre-filters every 3-6 months, main filters every 6-12 months. Some systems have 5-year media that requires less frequent changes." },
      { q: "Will it reduce water pressure?", a: "A properly sized system should not noticeably reduce water pressure. Professional sizing based on your home's flow rate is important." },
    ],
  },
  "water_testing": {
    intro: "Professional water testing is the critical first step before choosing any treatment solution. A comprehensive test reveals exactly what's in your water — from hardness and pH to lead, bacteria, and emerging contaminants like PFAS.",
    benefits: ["Identifies specific contaminants in your water", "Tests for lead, bacteria, nitrates, and more", "Measures hardness, pH, and TDS", "Baseline for choosing the right treatment", "Peace of mind about your family's water", "Many companies offer free basic testing"],
    costRange: "Free - $200",
    faq: [
      { q: "How often should I test my water?", a: "The EPA recommends annual testing for well water. Municipal water users should test every 2-3 years, or immediately if you notice changes in taste, smell, or appearance." },
      { q: "What does a basic water test cover?", a: "A basic test typically covers hardness, pH, TDS, chlorine, iron, and bacteria. Comprehensive tests add lead, nitrates, pesticides, VOCs, and PFAS." },
    ],
  },
  "uv_sterilization": {
    intro: "UV water sterilization destroys 99.99% of bacteria, viruses, and parasites using ultraviolet light — no chemicals added. It's essential for well water and provides an extra safety layer for municipal water.",
    benefits: ["Kills 99.99% of bacteria and viruses", "Chemical-free treatment", "No change to water taste or smell", "Low energy usage", "Effective against chlorine-resistant parasites", "Critical for well water safety"],
    costRange: "$500 - $2,000",
    faq: [
      { q: "Does UV sterilization remove chemicals?", a: "No — UV only addresses biological contaminants. For chemicals, pair it with carbon filtration or RO. Many systems combine UV with other filtration stages." },
      { q: "How often do UV bulbs need replacing?", a: "UV bulbs should be replaced annually regardless of whether they still illuminate. Their germicidal effectiveness diminishes over time." },
    ],
  },
  "iron_removal": {
    intro: "Iron removal systems use oxidation and filtration to convert dissolved iron into particles that can be trapped and flushed. They eliminate orange staining, metallic taste, and the pipe-clogging effects of iron-rich water.",
    benefits: ["Eliminates orange/brown staining", "Removes metallic taste", "Prevents pipe and appliance clogging", "Protects water-using appliances", "Cleaner laundry without rust stains", "Also removes manganese and hydrogen sulfide"],
    costRange: "$800 - $3,000",
    faq: [
      { q: "What level of iron requires treatment?", a: "Iron above 0.3 ppm (mg/L) can cause staining. Above 1 ppm, treatment is strongly recommended. Some well water has 5-10+ ppm requiring heavy-duty systems." },
      { q: "What's the difference between ferrous and ferric iron?", a: "Ferrous (clear water) iron is dissolved and invisible until it oxidizes. Ferric (red water) iron is already oxidized and visible as particles. Each requires different treatment approaches." },
    ],
  },
  "well_water": {
    intro: "Private wells serve 43 million Americans with no EPA oversight — homeowners are 100% responsible for water quality. Well water commonly contains bacteria, iron, sulfur, hardness minerals, and nitrates that require professional treatment.",
    benefits: ["Comprehensive treatment for unregulated water", "Bacteria and pathogen protection", "Iron and sulfur removal", "Hardness treatment", "Nitrate reduction", "Regular monitoring and maintenance"],
    costRange: "$1,500 - $5,000+",
    faq: [
      { q: "How often should well water be tested?", a: "At minimum annually for bacteria and nitrates. Test more frequently if near agriculture, after flooding, or if you notice any changes in water quality." },
      { q: "Can I treat well water myself?", a: "Basic treatment like sediment filters can be DIY. But for bacteria, iron, or chemical contamination, professional assessment and installation ensures your family's safety." },
    ],
  },
  "alkaline_water": {
    intro: "Alkaline water systems raise your water's pH to 8-9.5, combining filtration with mineralization. While health claims vary, many users report improved hydration and taste compared to standard filtered water.",
    benefits: ["Raises water pH to optimal 8-9.5 range", "Adds beneficial minerals", "Improved taste profile", "Combined filtration and alkalization", "Antioxidant properties claimed", "Better hydration reported by many users"],
    costRange: "$200 - $2,000",
    faq: [
      { q: "Is alkaline water scientifically proven to be healthier?", a: "The evidence is mixed. Some studies suggest benefits for acid reflux and bone density. The filtration component provides clear water quality benefits regardless of pH claims." },
      { q: "Can I make alkaline water at home?", a: "Yes, through ionizer machines, mineral drops, or filtration systems with remineralization stages. Purpose-built systems provide the most consistent results." },
    ],
  },
  "commercial": {
    intro: "Commercial water treatment serves businesses, restaurants, hospitals, and industrial facilities with high-capacity systems engineered for specific water quality standards and flow rates far beyond residential needs.",
    benefits: ["High-capacity systems for business use", "Custom-engineered solutions", "Meets industry-specific water standards", "Protects commercial equipment", "Regulatory compliance support", "Ongoing maintenance programs"],
    costRange: "$5,000 - $50,000+",
    faq: [
      { q: "What industries need commercial water treatment?", a: "Restaurants, hospitals, manufacturing, laboratories, data centers (cooling), car washes, breweries, and any business where water quality affects product quality or equipment." },
      { q: "How is commercial different from residential?", a: "Commercial systems handle much higher flow rates, often require custom engineering, must meet industry regulations, and typically include service contracts for ongoing maintenance." },
    ],
  },
};

function ServiceSchema({ service, cityName, stateName, companies }: { service: string; cityName: string; stateName: string; companies: any[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${getServiceBySlug(service)?.label} in ${cityName}, ${stateName}`,
    "areaServed": {
      "@type": "City",
      "name": cityName,
      "containedInPlace": { "@type": "State", "name": stateName },
    },
    "provider": companies.slice(0, 5).map((c: any) => ({
      "@type": "LocalBusiness",
      "name": c.name,
      ...(c.googleRating && { "aggregateRating": { "@type": "AggregateRating", "ratingValue": c.googleRating, "reviewCount": c.googleReviewCount || 1 } }),
    })),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

const ServiceCityPage = () => {
  const { state, city, service } = useParams();
  const stateSlug = state || "";
  const citySlug = city || "";
  const serviceSlug = service || "";

  const svc = getServiceBySlug(serviceSlug);
  const stateData = getStateData(stateSlug);
  const cityName = getCityName(stateSlug, citySlug) || citySlug;
  const stateName = stateData?.name || stateSlug;
  const waterData = getCityWaterData(cityName);

  if (!svc) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Service Not Found</h1>
            <Link to={`/water-treatment/${stateSlug}/${citySlug}`}>
              <Button className="bg-blue-600 hover:bg-blue-700">Back to {cityName}</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const companies = getCompaniesByService(stateSlug, citySlug, svc.key);
  const allCityCompanies = getCompaniesByCity(stateSlug, citySlug);
  const content = SERVICE_CONTENT[svc.key];
  const otherServices = SERVICES.filter((s) => s.key !== svc.key && getCompaniesByService(stateSlug, citySlug, s.key).length > 0);

  const pageTitle = `${svc.label} in ${cityName}, ${stateName} | Best Companies (2026)`;
  const pageDesc = `Compare ${companies.length} ${svc.shortLabel.toLowerCase()} companies in ${cityName}. Read reviews, check ratings, and get a free water test. Updated 2026.`;

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet title={pageTitle} description={pageDesc} canonical={`/water-treatment/${stateSlug}/${citySlug}/services/${serviceSlug}`} />
      <ServiceSchema service={serviceSlug} cityName={cityName} stateName={stateName} companies={companies} />
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
              <span className="font-medium text-gray-900">{svc.shortLabel}</span>
            </div>
          </div>
        </div>

        {/* Hero */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-10">
          <div className="container mx-auto px-4">
            <Link to={`/water-treatment/${stateSlug}/${citySlug}`} className="inline-flex items-center text-blue-200 hover:text-white mb-4">
              <ArrowLeft className="w-4 h-4 mr-1" /> Back to {cityName}
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{svc.label} in {cityName}, {stateData?.abbreviation}</h1>
            <p className="text-blue-100 text-lg">{companies.length} companies offering {svc.shortLabel.toLowerCase()} services</p>
            {waterData && (
              <div className="mt-3 flex flex-wrap gap-3">
                <Badge variant="secondary" className="bg-white/20 text-white border-0">Water Hardness: {waterData.hardness}</Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-0">TDS: {waterData.tds}</Badge>
              </div>
            )}
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              {/* About this service */}
              {content && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-3">About {svc.label}</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">{content.intro}</p>
                    <h3 className="font-semibold mb-2">Key Benefits</h3>
                    <ul className="space-y-2">
                      {content.benefits.map((b, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    {content.costRange && (
                      <p className="mt-4 text-sm text-gray-500">Typical cost range: <strong>{content.costRange}</strong></p>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Companies */}
              <h2 className="text-xl font-bold">{svc.shortLabel} Companies in {cityName}</h2>
              {companies.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {companies.map((c) => (
                    <Link key={c.id} to={`/water-treatment/${stateSlug}/${citySlug}/${c.slug}`}>
                      <CompanyCard company={c} />
                    </Link>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-gray-500 mb-4">No companies specifically tagged for {svc.shortLabel.toLowerCase()} yet.</p>
                    <Link to={`/water-treatment/${stateSlug}/${citySlug}`}>
                      <Button className="bg-blue-600 hover:bg-blue-700">View All {cityName} Companies</Button>
                    </Link>
                  </CardContent>
                </Card>
              )}

              {/* FAQ */}
              {content?.faq && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                      {content.faq.map((f, i) => (
                        <div key={i}>
                          <h3 className="font-semibold text-gray-900">{f.q}</h3>
                          <p className="text-sm text-gray-600 mt-1">{f.a}</p>
                        </div>
                      ))}
                      <div>
                        <h3 className="font-semibold text-gray-900">How much does {svc.shortLabel.toLowerCase()} cost in {cityName}?</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          In {cityName}, {svc.shortLabel.toLowerCase()} typically costs {content.costRange} depending on system size, water conditions, and installation complexity.
                          Get a free quote from local companies listed above.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* CTA */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6 text-center">
                  <Droplets className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-bold text-lg mb-2">Free Water Test</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Not sure if you need {svc.shortLabel.toLowerCase()}? Start with a free water test.
                  </p>
                  <Link to="/schedule-test">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Schedule Free Test</Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Other services */}
              {otherServices.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold mb-3">Other Services in {cityName}</h3>
                    <div className="space-y-2">
                      {otherServices.slice(0, 6).map((s) => (
                        <Link
                          key={s.slug}
                          to={`/water-treatment/${stateSlug}/${citySlug}/services/${s.slug}`}
                          className="block text-sm text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          {s.label} ({getCompaniesByService(stateSlug, citySlug, s.key).length})
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Water quality quick stats */}
              {waterData && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold mb-3">{cityName} Water Quick Facts</h3>
                    <dl className="space-y-2 text-sm">
                      <div className="flex justify-between"><dt className="text-gray-500">Source</dt><dd className="font-medium text-right">{waterData.source}</dd></div>
                      <div className="flex justify-between"><dt className="text-gray-500">Hardness</dt><dd className="font-medium">{waterData.hardnessGrains}</dd></div>
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

export default ServiceCityPage;
