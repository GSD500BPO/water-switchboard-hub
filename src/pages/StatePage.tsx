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
import { Star, MapPin } from "lucide-react";
import { getStateData, getCitiesInState, getCompaniesByCity } from "@/data/companies";

const StatePage = () => {
  const { state } = useParams();
  const stateSlug = state || "";
  const stateData = getStateData(stateSlug);
  const cities = getCitiesInState(stateSlug);

  if (!stateData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">State Not Found</h1>
            <Link to="/water-treatment">
              <Button className="bg-blue-600 hover:bg-blue-700">Browse All States</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        {/* Hero */}
        <div className="bg-blue-600 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">
              Water Treatment Companies in {stateData.name}
            </h1>
            <p className="text-xl text-blue-100">
              {cities.reduce((s, c) => s + c.companyCount, 0)} companies across{" "}
              {cities.length} cities. Find trusted local water treatment professionals.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* City Carousel */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Browse by City</h2>
            <div className="px-12">
              <Carousel opts={{ align: "start", loop: false }}>
                <CarouselContent>
                  {cities.map((city) => (
                    <CarouselItem key={city.slug} className="basis-1/2 md:basis-1/3 lg:basis-1/5">
                      <Link to={`/water-treatment/${stateSlug}/${city.slug}`}>
                        <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                          <CardContent className="p-4 text-center">
                            <MapPin className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                            <p className="font-semibold text-sm">{city.name}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {city.companyCount} companies
                            </p>
                            {city.avgRating != null && (
                              <div className="flex items-center justify-center gap-1 mt-1">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-xs text-gray-600">{city.avgRating}</span>
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

          {/* Companies by City */}
          {cities.map((city) => {
            const companies = getCompaniesByCity(stateSlug, city.slug);
            return (
              <div key={city.slug} className="mb-10">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">
                    {city.name}{" "}
                    <span className="text-gray-400 font-normal text-base">
                      ({city.companyCount})
                    </span>
                  </h2>
                  <Link
                    to={`/water-treatment/${stateSlug}/${city.slug}`}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View all
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {companies.slice(0, 4).map((company) => (
                    <Link key={company.id} to={`/water-treatment/${stateSlug}/${city.slug}/${company.slug}`}>
                      <CompanyCard company={company} />
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}

          {/* CTA */}
          <div className="bg-blue-50 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Get a Free Water Test</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Not sure which water treatment solution is right for you? Schedule a free water
              test and get matched with local experts in {stateData.name}.
            </p>
            <Link to="/schedule-test">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Schedule Free Test
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StatePage;
