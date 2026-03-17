import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { CompanyCard } from "@/components/directory/CompanyCard";
import { ArrowLeft, MapPin, Star } from "lucide-react";
import {
  getCompaniesByCity,
  getCitiesInState,
  getCityName,
  getStateData,
} from "@/data/companies";

const CityPage = () => {
  const { state, city } = useParams();
  const stateSlug = state || "";
  const citySlug = city || "";

  const companies = getCompaniesByCity(stateSlug, citySlug);
  const stateData = getStateData(stateSlug);
  const cityName = getCityName(stateSlug, citySlug);
  const stateName = stateData?.name || stateSlug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  // Nearby cities (same state, excluding current)
  const nearbyCities = getCitiesInState(stateSlug).filter((c) => c.slug !== citySlug);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Link to="/" className="hover:text-blue-600">Home</Link>
              <span>/</span>
              <Link to={`/water-treatment/${stateSlug}`} className="hover:text-blue-600">
                {stateName}
              </Link>
              <span>/</span>
              <span className="font-medium text-gray-900">{cityName}</span>
            </div>
          </div>
        </div>

        {/* Hero */}
        <div className="bg-blue-600 text-white py-8">
          <div className="container mx-auto px-4">
            <Link
              to={`/water-treatment/${stateSlug}`}
              className="inline-flex items-center text-blue-100 hover:text-white mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to {stateName}
            </Link>
            <h1 className="text-3xl font-bold">Water Treatment in {cityName}</h1>
            <p className="text-blue-100 mt-2">
              {companies.length} companies serving this area
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Company Grid */}
          {companies.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No companies found for this area yet.</p>
              <Link to="/schedule-test">
                <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
                  Get Matched with Local Experts
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {companies.map((company) => (
                <Link key={company.id} to={`/water-treatment/${stateSlug}/${citySlug}/${company.slug}`}>
                  <CompanyCard company={company} />
                </Link>
              ))}
            </div>
          )}

          {/* Nearby Cities */}
          {nearbyCities.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-bold mb-4">Nearby Cities in {stateName}</h2>
              <div className="px-12">
                <Carousel opts={{ align: "start", loop: false }}>
                  <CarouselContent>
                    {nearbyCities.map((nc) => (
                      <CarouselItem key={nc.slug} className="basis-1/2 md:basis-1/3 lg:basis-1/5">
                        <Link to={`/water-treatment/${stateSlug}/${nc.slug}`}>
                          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                            <CardContent className="p-4 text-center">
                              <MapPin className="w-5 h-5 mx-auto mb-2 text-blue-600" />
                              <p className="font-semibold text-sm">{nc.name}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                {nc.companyCount} companies
                              </p>
                              {nc.avgRating != null && (
                                <div className="flex items-center justify-center gap-1 mt-1">
                                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                  <span className="text-xs text-gray-600">{nc.avgRating}</span>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        </Link>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-8 bg-blue-50 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Not Sure Which Company to Choose?</h3>
            <p className="text-gray-600 mb-6">
              Get a free water test and we'll match you with the best local experts.
            </p>
            <Link to="/schedule-test">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Schedule Free Water Test
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CityPage;
