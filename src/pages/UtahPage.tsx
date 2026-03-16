import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Phone, ArrowLeft, Droplets, Filter, Shield } from "lucide-react";

// Mock data for Utah water treatment companies
const utahCompanies = [
  {
    id: "1",
    name: "Crystal Clear Water Systems",
    address: "1234 S State St, Salt Lake City, UT 84111",
    phone: "(801) 555-0101",
    rating: 4.8,
    reviewCount: 127,
    services: ["Reverse Osmosis", "Water Softening", "Alkaline Water"],
    city: "Salt Lake City",
    angiRating: 4.9,
    yelpRating: 4.7,
    googleRating: 4.8,
  },
  {
    id: "2",
    name: "Mountain Pure Water Solutions",
    address: "5678 E 2100 S, Salt Lake City, UT 84108",
    phone: "(801) 555-0202",
    rating: 4.6,
    reviewCount: 89,
    services: ["Whole House Filtration", "RO Systems", "UV Sterilization"],
    city: "Salt Lake City",
    angiRating: 4.7,
    yelpRating: 4.5,
    googleRating: 4.6,
  },
  {
    id: "3",
    name: "Utah Water Pros",
    address: "9012 W 3500 S, West Valley City, UT 84120",
    phone: "(801) 555-0303",
    rating: 4.9,
    reviewCount: 203,
    services: ["Alkaline Water", "Water Softening", "Iron Removal"],
    city: "West Valley City",
    angiRating: 4.9,
    yelpRating: 4.8,
    googleRating: 4.9,
  },
];

const UtahPage = () => {
  const cities = ["Salt Lake City", "West Valley City", "Provo", "Ogden", "Sandy", "Orem"];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        {/* Hero Section */}
        <div className="bg-blue-600 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Water Treatment Companies in Utah</h1>
            <p className="text-xl text-blue-100">
              Find trusted water treatment professionals in your area. 
              Compare reviews from Angi, Yelp, and Google.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Cities Grid */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Browse by City</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {cities.map((city) => (
                <Link
                  key={city}
                  to={`/water-treatment/utah/${city.toLowerCase().replace(/\s+/g, '-')}`}
                  className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-center"
                >
                  <MapPin className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                  <span className="font-medium">{city}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Featured Companies */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Featured Water Treatment Companies</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {utahCompanies.map((company) => (
                <Card key={company.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{company.name}</CardTitle>
                        <p className="text-sm text-gray-500 mt-1">{company.city}, UT</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-bold">{company.rating}</span>
                        </div>
                        <p className="text-xs text-gray-500">{company.reviewCount} reviews</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{company.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span>{company.phone}</span>
                      </div>
                      
                      {/* Review Sources */}
                      <div className="flex gap-2 mt-3">
                        <Badge variant="secondary" className="text-xs">
                          Angi: {company.angiRating}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          Yelp: {company.yelpRating}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          Google: {company.googleRating}
                        </Badge>
                      </div>

                      {/* Services */}
                      <div className="flex flex-wrap gap-2 mt-3">
                        {company.services.map((service) => (
                          <Badge key={service} variant="outline" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>

                      <Link to={`/company/${company.id}`}>
                        <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-blue-50 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Get a Free Water Test</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Not sure which water treatment solution is right for you? 
              Schedule a free water test and get matched with local experts.
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

export default UtahPage;
