import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Phone, ArrowLeft, Clock, Shield, Droplets } from "lucide-react";

// Mock data for Salt Lake City companies
const slcCompanies = [
  {
    id: "1",
    name: "Crystal Clear Water Systems",
    address: "1234 S State St, Salt Lake City, UT 84111",
    phone: "(801) 555-0101",
    rating: 4.8,
    reviewCount: 127,
    services: ["Reverse Osmosis", "Water Softening", "Alkaline Water"],
    hours: "Mon-Fri: 8AM-6PM, Sat: 9AM-4PM",
    angiReviews: [
      { rating: 5, text: "Great service, installed RO system same day!", author: "John M." },
      { rating: 5, text: "Professional and knowledgeable about hard water.", author: "Sarah K." },
    ],
    yelpReviews: [
      { rating: 4, text: "Good prices but scheduling was a bit slow.", author: "Mike R." },
    ],
    googleReviews: [
      { rating: 5, text: "Best water softener installation in SLC!", author: "Lisa T." },
    ],
  },
  {
    id: "2",
    name: "Mountain Pure Water Solutions",
    address: "5678 E 2100 S, Salt Lake City, UT 84108",
    phone: "(801) 555-0202",
    rating: 4.6,
    reviewCount: 89,
    services: ["Whole House Filtration", "RO Systems", "UV Sterilization"],
    hours: "Mon-Sat: 8AM-7PM",
    angiReviews: [
      { rating: 5, text: "Excellent whole house system installation.", author: "David W." },
    ],
    yelpReviews: [
      { rating: 4, text: "Quality work, fair pricing.", author: "Jennifer L." },
    ],
    googleReviews: [
      { rating: 5, text: "Very happy with our UV sterilization system.", author: "Robert H." },
    ],
  },
  {
    id: "4",
    name: "Salt Lake Water Experts",
    address: "3456 E 3300 S, Salt Lake City, UT 84109",
    phone: "(801) 555-0404",
    rating: 4.7,
    reviewCount: 156,
    services: ["Alkaline Water", "Water Softening", "Iron Removal", "Sediment Filters"],
    hours: "Mon-Fri: 7AM-7PM, Sat-Sun: 9AM-5PM",
    angiReviews: [
      { rating: 5, text: "Fixed our iron problem when others couldn't!", author: "Amanda P." },
    ],
    yelpReviews: [
      { rating: 5, text: "Love our alkaline water system.", author: "Chris B." },
    ],
    googleReviews: [
      { rating: 4, text: "Good service, would recommend.", author: "Tom S." },
    ],
  },
];

const CityPage = () => {
  const { city } = useParams();
  const cityName = city?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || "Salt Lake City";
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Link to="/water-treatment/utah" className="hover:text-blue-600">Utah</Link>
              <span>/</span>
              <span className="font-medium text-gray-900">{cityName}</span>
            </div>
          </div>
        </div>

        {/* Hero */}
        <div className="bg-blue-600 text-white py-8">
          <div className="container mx-auto px-4">
            <Link to="/water-treatment/utah" className="inline-flex items-center text-blue-100 hover:text-white mb-4">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Utah
            </Link>
            <h1 className="text-3xl font-bold">Water Treatment in {cityName}</h1>
            <p className="text-blue-100 mt-2">
              {slcCompanies.length} companies serving this area
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Filter Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge className="bg-blue-600">All Services</Badge>
            <Badge variant="outline">Reverse Osmosis</Badge>
            <Badge variant="outline">Water Softening</Badge>
            <Badge variant="outline">Alkaline Water</Badge>
            <Badge variant="outline">Whole House</Badge>
          </div>

          {/* Company List */}
          <div className="space-y-4">
            {slcCompanies.map((company) => (
              <Card key={company.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    {/* Left: Company Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-bold">{company.name}</h3>
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            <span className="font-bold text-lg">{company.rating}</span>
                            <span className="text-gray-500">({company.reviewCount} reviews)</span>
                          </div>
                        </div>
                        <Link to={`/company/${company.id}`}>
                          <Button className="bg-blue-600 hover:bg-blue-700">
                            View Details
                          </Button>
                        </Link>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {company.services.map((service) => (
                          <Badge key={service} variant="secondary">
                            {service}
                          </Badge>
                        ))}
                      </div>

                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {company.address}
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          {company.phone}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {company.hours}
                        </div>
                      </div>
                    </div>

                    {/* Right: Reviews Preview */}
                    <div className="md:w-80 bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold mb-3">Recent Reviews</h4>
                      <div className="space-y-3">
                        {company.angiReviews.slice(0, 1).map((review, i) => (
                          <div key={i} className="text-sm">
                            <div className="flex items-center gap-1 mb-1">
                              <Badge variant="outline" className="text-xs">Angi</Badge>
                              <div className="flex">
                                {[...Array(review.rating)].map((_, j) => (
                                  <Star key={j} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-600 line-clamp-2">"{review.text}"</p>
                            <p className="text-xs text-gray-400 mt-1">— {review.author}</p>
                          </div>
                        ))}
                        {company.googleReviews.slice(0, 1).map((review, i) => (
                          <div key={i} className="text-sm">
                            <div className="flex items-center gap-1 mb-1">
                              <Badge variant="outline" className="text-xs">Google</Badge>
                              <div className="flex">
                                {[...Array(review.rating)].map((_, j) => (
                                  <Star key={j} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-600 line-clamp-2">"{review.text}"</p>
                            <p className="text-xs text-gray-400 mt-1">— {review.author}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

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
