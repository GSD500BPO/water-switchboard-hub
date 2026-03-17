import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "@/components/seo/Helmet";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { Star, Phone, Globe, MapPin, Award, CheckCircle, ExternalLink } from "lucide-react";
import {
  getCityName,
  getStateData,
} from "@/data/companies";
import { getTopCompaniesInCity, getCityWaterData, SERVICES, getCompaniesByService } from "@/data/seoData";
import type { Company } from "@/data/companies";

function ItemListSchema({ companies, cityName, stateName }: { companies: Company[]; cityName: string; stateName: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `Best Water Treatment Companies in ${cityName}, ${stateName} (2026)`,
    "numberOfItems": companies.length,
    "itemListElement": companies.map((c, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "item": {
        "@type": "LocalBusiness",
        "name": c.name,
        "address": { "@type": "PostalAddress", "addressLocality": cityName, "addressRegion": stateName },
        ...(c.googleRating && {
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": c.googleRating,
            "reviewCount": c.googleReviewCount || 1,
            "bestRating": 5,
          },
        }),
        ...(c.phone && { "telephone": c.phone }),
        ...(c.website && { "url": c.website }),
      },
    })),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

function RankedCompanyCard({ company, rank, stateSlug, citySlug }: { company: Company; rank: number; stateSlug: string; citySlug: string }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          {/* Rank badge */}
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shrink-0 ${
            rank === 1 ? "bg-yellow-500" : rank === 2 ? "bg-gray-400" : rank === 3 ? "bg-amber-700" : "bg-blue-500"
          }`}>
            {rank}
          </div>

          <div className="flex-1 min-w-0">
            <Link to={`/water-treatment/${stateSlug}/${citySlug}/${company.slug}`} className="hover:text-blue-600">
              <h3 className="font-bold text-lg">{company.name}</h3>
            </Link>

            {/* Rating */}
            {company.googleRating != null && (
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-4 h-4 ${
                        s <= Math.round(company.googleRating!)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold">{company.googleRating.toFixed(1)}</span>
                {company.googleReviewCount && (
                  <span className="text-sm text-gray-500">({company.googleReviewCount} reviews)</span>
                )}
              </div>
            )}

            {/* Services */}
            {company.services?.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {company.services.slice(0, 4).map((svc) => {
                  const label = SERVICES.find((s) => s.key === svc)?.shortLabel || svc;
                  return <Badge key={svc} variant="secondary" className="text-xs">{label}</Badge>;
                })}
              </div>
            )}

            {/* Description */}
            {company.description && (
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">{company.description}</p>
            )}

            {/* Contact */}
            <div className="flex flex-wrap gap-4 mt-3">
              {company.phone && (
                <a href={`tel:${company.phone.replace(/\D/g, "")}`} className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800">
                  <Phone className="w-3.5 h-3.5" /> {company.phone}
                </a>
              )}
              {company.website && (
                <a href={company.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800">
                  <Globe className="w-3.5 h-3.5" /> Visit Website <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const BestOfPage = () => {
  const { state, city } = useParams();
  const stateSlug = state || "";
  const citySlug = city || "";

  const stateData = getStateData(stateSlug);
  const cityName = getCityName(stateSlug, citySlug) || citySlug;
  const stateName = stateData?.name || stateSlug;
  const waterData = getCityWaterData(cityName);
  const topCompanies = getTopCompaniesInCity(stateSlug, citySlug, 10);

  const pageTitle = `Top ${topCompanies.length} Best Water Treatment Companies in ${cityName}, ${stateData?.abbreviation || ""} (2026)`;
  const pageDesc = `Ranked list of the best water treatment companies in ${cityName} based on Google ratings and reviews. Compare services, read honest reviews, and schedule a free water test.`;

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet title={pageTitle} description={pageDesc} canonical={`/best-water-treatment/${stateSlug}/${citySlug}`} />
      <ItemListSchema companies={topCompanies} cityName={cityName} stateName={stateName} />
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: stateName, url: `/water-treatment/${stateSlug}` },
        { name: cityName, url: `/water-treatment/${stateSlug}/${citySlug}` },
        { name: `Best Water Treatment`, url: `/best-water-treatment/${stateSlug}/${citySlug}` },
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
              <span className="font-medium text-gray-900">Best Companies</span>
            </div>
          </div>
        </div>

        {/* Hero */}
        <div className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white py-10">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-3">
              <Award className="w-8 h-8" />
              <Badge className="bg-white/20 text-white border-0">Updated 2026</Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Top {topCompanies.length} Best Water Treatment Companies in {cityName}
            </h1>
            <p className="text-yellow-100 text-lg">
              Ranked by Google ratings and customer reviews
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {/* Methodology */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <p className="text-sm text-gray-700">
                    <strong>How we rank:</strong> Companies are ranked by Google rating (highest first), then by total review count.
                    Only companies with verified Google ratings are included. Rankings are based on publicly available data.
                  </p>
                </CardContent>
              </Card>

              {/* Ranked list */}
              {topCompanies.length > 0 ? (
                topCompanies.map((company, i) => (
                  <RankedCompanyCard key={company.id} company={company} rank={i + 1} stateSlug={stateSlug} citySlug={citySlug} />
                ))
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-gray-500">No rated companies found for {cityName} yet.</p>
                  </CardContent>
                </Card>
              )}

              {/* Bottom CTA */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-8 text-center">
                  <h2 className="text-2xl font-bold mb-2">Not Sure Which Company to Choose?</h2>
                  <p className="text-gray-600 mb-4">Get a free water test and we'll help match you with the right local expert.</p>
                  <Link to="/schedule-test">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700">Schedule Free Water Test</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick CTA */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6 text-center">
                  <h3 className="font-bold mb-2">Free Water Test</h3>
                  <p className="text-sm text-gray-600 mb-4">Find out what's really in your {cityName} water.</p>
                  <Link to="/schedule-test">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Get Started</Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Water quality */}
              {waterData && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold mb-3">{cityName} Water Facts</h3>
                    <dl className="space-y-2 text-sm">
                      <div className="flex justify-between"><dt className="text-gray-500">Water Source</dt><dd className="font-medium text-right max-w-[60%]">{waterData.source}</dd></div>
                      <div className="flex justify-between"><dt className="text-gray-500">Hardness</dt><dd className="font-medium">{waterData.hardness} ({waterData.hardnessGrains})</dd></div>
                      <div className="flex justify-between"><dt className="text-gray-500">TDS</dt><dd className="font-medium">{waterData.tds}</dd></div>
                      <div className="flex justify-between"><dt className="text-gray-500">Population Served</dt><dd className="font-medium">{waterData.population}</dd></div>
                    </dl>
                    <Link to={`/water-quality/${citySlug}`} className="block mt-3 text-sm text-blue-600 hover:underline">
                      Full Water Quality Report →
                    </Link>
                  </CardContent>
                </Card>
              )}

              {/* Services in city */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-3">Browse by Service</h3>
                  <div className="space-y-2">
                    {SERVICES.map((svc) => {
                      const count = getCompaniesByService(stateSlug, citySlug, svc.key).length;
                      if (count === 0) return null;
                      return (
                        <Link key={svc.slug} to={`/water-treatment/${stateSlug}/${citySlug}/services/${svc.slug}`}
                          className="flex justify-between text-sm text-blue-600 hover:text-blue-800">
                          <span>{svc.shortLabel}</span>
                          <span className="text-gray-400">{count}</span>
                        </Link>
                      );
                    })}
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

export default BestOfPage;
