import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ZohoFormEmbed } from "@/components/ZohoFormEmbed";
import {
  Star, Phone, Globe, MapPin, ArrowLeft, Facebook, Instagram,
  Linkedin, Youtube, ExternalLink, Droplets,
} from "lucide-react";
import {
  getCompanyBySlug,
  getCompaniesByCity,
  getCityName,
  getStateData,
} from "@/data/companies";
import type { Company } from "@/data/companies";
import { CompanyCard } from "@/components/directory/CompanyCard";
import { Helmet } from "@/components/seo/Helmet";
import { getCityWaterData, SERVICES, WATER_PROBLEMS } from "@/data/seoData";

const SERVICE_LABELS: Record<string, string> = {
  water_softener: "Water Softener Installation",
  reverse_osmosis: "Reverse Osmosis Systems",
  whole_house_filtration: "Whole House Water Filtration",
  alkaline_water: "Alkaline Water Systems",
  uv_sterilization: "UV Water Sterilization",
  iron_removal: "Iron & Manganese Removal",
  water_testing: "Water Quality Testing",
  well_water: "Well Water Treatment",
  commercial: "Commercial Water Treatment",
};

const SOCIAL_ICONS: Record<string, any> = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
};

function SchemaMarkup({ company }: { company: Company }) {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": company.name,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": company.city,
      "addressRegion": company.state,
      "addressCountry": "US",
    },
    "url": company.website || undefined,
    "image": company.logoUrl || undefined,
  };

  if (company.phone) {
    schema.telephone = company.phone;
  }
  if (company.description) {
    schema.description = company.description;
  }
  if (company.googleRating != null && company.googleReviewCount) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      "ratingValue": company.googleRating,
      "reviewCount": company.googleReviewCount,
      "bestRating": 5,
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

const CompanyPage = () => {
  const { state, city, company: companySlug } = useParams();
  const stateSlug = state || "";
  const citySlug = city || "";
  const slug = companySlug || "";

  const company = getCompanyBySlug(stateSlug, citySlug, slug);
  const stateData = getStateData(stateSlug);
  const cityName = getCityName(stateSlug, citySlug) || citySlug;
  const stateName = stateData?.name || stateSlug;

  if (!company) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Company Not Found</h1>
            <Link to={`/water-treatment/${stateSlug}/${citySlug}`}>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Back to {cityName}
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Get other companies in same city for "More in [City]"
  const otherCompanies = getCompaniesByCity(stateSlug, citySlug)
    .filter((c) => c.slug !== slug)
    .slice(0, 4);

  const pageTitle = `${company.name} - Water Treatment in ${cityName}, ${stateName}`;
  const pageDesc = company.description
    || `${company.name} provides water treatment services in ${cityName}, ${stateName}. Read reviews, compare services, and get a free water test.`;

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet
        title={pageTitle}
        description={pageDesc}
        image={company.logoUrl}
        canonical={`/water-treatment/${stateSlug}/${citySlug}/${slug}`}
      />
      <SchemaMarkup company={company} />
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
              <span className="font-medium text-gray-900 truncate">{company.name}</span>
            </div>
          </div>
        </div>

        {/* Hero */}
        <div className="bg-blue-600 text-white py-8">
          <div className="container mx-auto px-4">
            <Link
              to={`/water-treatment/${stateSlug}/${citySlug}`}
              className="inline-flex items-center text-blue-100 hover:text-white mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to {cityName} companies
            </Link>
            <div className="flex items-start gap-4">
              {company.logoUrl ? (
                <img
                  src={company.logoUrl}
                  alt={company.name}
                  className="w-16 h-16 rounded-xl object-cover bg-white/10"
                  loading="lazy"
                />
              ) : (
                <div className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center text-2xl font-bold">
                  {company.name.charAt(0)}
                </div>
              )}
              <div>
                <h1 className="text-3xl font-bold">{company.name}</h1>
                <p className="text-blue-100 mt-1">{cityName}, {stateName}</p>
                {company.googleRating != null && (
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-lg">{company.googleRating.toFixed(1)}</span>
                    </div>
                    {company.googleReviewCount != null && (
                      <span className="text-blue-200">
                        ({company.googleReviewCount.toLocaleString()} Google reviews)
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* About */}
              {company.description && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-3">About {company.name}</h2>
                    <p className="text-gray-600 leading-relaxed">{company.description}</p>
                  </CardContent>
                </Card>
              )}

              {/* Services */}
              {company.services?.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">Services Offered</h2>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {company.services.map((svc) => (
                        <div key={svc} className="flex items-center gap-2">
                          <Droplets className="w-4 h-4 text-blue-600 shrink-0" />
                          <span className="text-sm">{SERVICE_LABELS[svc] || svc}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Photos */}
              {company.photoUrls?.length > 1 && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">Photos</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {company.photoUrls.map((url, i) => (
                        <img
                          key={i}
                          src={url}
                          alt={`${company.name} photo ${i + 1}`}
                          className="rounded-lg object-cover w-full h-40 bg-gray-100"
                          loading="lazy"
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Water Quality Context + Internal Links */}
              {(() => {
                const waterData = getCityWaterData(cityName);
                return (
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-bold mb-3">
                        Why Water Treatment Matters in {cityName}
                      </h2>
                      {waterData ? (
                        <>
                          <p className="text-gray-600 leading-relaxed mb-3">
                            {cityName}'s water from {waterData.source} is classified as <strong>{waterData.hardness}</strong> ({waterData.hardnessGrains}).
                            Top contaminants include {waterData.topContaminants.slice(0, 3).join(", ")}.
                            Professional water treatment companies like {company.name} can help address these local water challenges.
                          </p>
                          <Link to={`/water-quality/${citySlug}`} className="text-sm text-blue-600 hover:underline">
                            Read the full {cityName} Water Quality Report →
                          </Link>
                        </>
                      ) : (
                        <p className="text-gray-600 leading-relaxed">
                          Many homes in {cityName}, {stateName} experience issues with hard water,
                          contaminants, and aging infrastructure. Professional water treatment companies
                          like {company.name} can help identify and solve water quality problems.
                        </p>
                      )}

                      {/* Related service links */}
                      {company.services?.length > 0 && (
                        <div className="mt-4 pt-4 border-t">
                          <p className="text-sm font-semibold text-gray-700 mb-2">Compare {company.name}'s services in {cityName}:</p>
                          <div className="flex flex-wrap gap-2">
                            {company.services.map((svc) => {
                              const svcDef = SERVICES.find((s) => s.key === svc);
                              if (!svcDef) return null;
                              return (
                                <Link
                                  key={svc}
                                  to={`/water-treatment/${stateSlug}/${citySlug}/services/${svcDef.slug}`}
                                  className="text-xs px-3 py-1 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100"
                                >
                                  {svcDef.shortLabel}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })()}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Card */}
              <Card className="border-blue-200">
                <CardContent className="p-6">
                  <h3 className="font-bold mb-4">Contact Information</h3>
                  <div className="space-y-3 text-sm">
                    {company.phone && (
                      <a
                        href={`tel:${company.phone.replace(/\D/g, "")}`}
                        className="flex items-center gap-3 text-gray-700 hover:text-blue-600"
                      >
                        <Phone className="w-5 h-5 text-blue-600 shrink-0" />
                        <span className="font-medium">{company.phone}</span>
                      </a>
                    )}
                    {company.website && (
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-gray-700 hover:text-blue-600"
                      >
                        <Globe className="w-5 h-5 text-blue-600 shrink-0" />
                        <span className="truncate">
                          {company.website.replace(/^https?:\/\/(www\.)?/, "").split("/")[0]}
                        </span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    )}
                    {company.googleMapsUrl && (
                      <a
                        href={company.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-gray-700 hover:text-blue-600"
                      >
                        <MapPin className="w-5 h-5 text-blue-600 shrink-0" />
                        <span>View on Google Maps</span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    )}
                  </div>

                  {/* Social Links */}
                  {company.socialLinks && Object.keys(company.socialLinks).length > 0 && (
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-xs text-gray-500 mb-2">Follow on social</p>
                      <div className="flex gap-2">
                        {Object.entries(company.socialLinks).map(([platform, url]) => {
                          const Icon = SOCIAL_ICONS[platform] || ExternalLink;
                          return (
                            <a
                              key={platform}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-blue-100 text-gray-600 hover:text-blue-600"
                              title={platform}
                            >
                              <Icon className="w-4 h-4" />
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* CTA */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6 text-center">
                  <h3 className="font-bold text-lg mb-2">Get a Free Water Test</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Find out what's in your water. Free, no-obligation test.
                  </p>
                  <ZohoFormEmbed height="400px" />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* More in this city */}
          {otherCompanies.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-bold mb-4">
                More Water Treatment Companies in {cityName}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {otherCompanies.map((c) => (
                  <Link
                    key={c.id}
                    to={`/water-treatment/${stateSlug}/${citySlug}/${c.slug}`}
                  >
                    <CompanyCard company={c} />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CompanyPage;
