import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Phone, Globe, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import type { Company } from "@/data/companies";

const AVATAR_COLORS = [
  "bg-blue-600", "bg-emerald-600", "bg-purple-600", "bg-amber-600",
  "bg-rose-600", "bg-cyan-600", "bg-indigo-600", "bg-teal-600",
];

const SERVICE_LABELS: Record<string, string> = {
  water_softener: "Water Softener",
  reverse_osmosis: "Reverse Osmosis",
  whole_house_filtration: "Whole House",
  alkaline_water: "Alkaline Water",
  uv_sterilization: "UV Sterilization",
  iron_removal: "Iron Removal",
  water_testing: "Water Testing",
  well_water: "Well Water",
  commercial: "Commercial",
};

function hashCode(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

interface CompanyCardProps {
  company: Company;
}

export function CompanyCard({ company }: CompanyCardProps) {
  const initial = company.name.charAt(0).toUpperCase();
  const color = AVATAR_COLORS[hashCode(company.name) % AVATAR_COLORS.length];
  const hasLogo = company.logoUrl != null;

  return (
    <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
      <CardContent className="p-5 flex flex-col flex-1">
        {/* Header: Logo/Avatar + Name + Rating */}
        <div className="flex items-start gap-3 mb-3">
          {hasLogo ? (
            <img
              src={company.logoUrl!}
              alt={company.name}
              className="w-11 h-11 rounded-lg object-cover shrink-0 bg-gray-100"
              loading="lazy"
              onError={(e) => {
                // Fall back to letter avatar on load error
                const el = e.currentTarget;
                el.style.display = "none";
                el.nextElementSibling?.classList.remove("hidden");
              }}
            />
          ) : null}
          <div
            className={`${color} text-white w-11 h-11 rounded-lg flex items-center justify-center text-lg font-bold shrink-0 ${hasLogo ? "hidden" : ""}`}
          >
            {initial}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-base leading-tight truncate" title={company.name}>
              {company.name}
            </h3>
            {company.googleRating != null && (
              <div className="flex items-center gap-1 mt-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-sm">{company.googleRating.toFixed(1)}</span>
                {company.googleReviewCount != null && (
                  <span className="text-xs text-gray-500">({company.googleReviewCount.toLocaleString()})</span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        {company.description && (
          <p className="text-xs text-gray-500 mb-3 line-clamp-2">{company.description}</p>
        )}

        {/* Services */}
        {company.services?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {company.services.slice(0, 3).map((svc) => (
              <Badge key={svc} variant="secondary" className="text-xs py-0">
                {SERVICE_LABELS[svc] || svc}
              </Badge>
            ))}
            {company.services.length > 3 && (
              <Badge variant="outline" className="text-xs py-0">
                +{company.services.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Contact info */}
        <div className="space-y-1.5 text-sm text-gray-600 mb-4 flex-1">
          {company.phone && (
            <a href={`tel:${company.phone.replace(/\D/g, "")}`} className="flex items-center gap-2 hover:text-blue-600">
              <Phone className="w-3.5 h-3.5 shrink-0" />
              <span>{company.phone}</span>
            </a>
          )}
          {company.website && (
            <a href={company.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-blue-600">
              <Globe className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{company.website.replace(/^https?:\/\/(www\.)?/, "").split("/")[0]}</span>
            </a>
          )}
          {company.googleMapsUrl && (
            <a href={company.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-blue-600">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span>View on Google Maps</span>
            </a>
          )}
        </div>

        {/* CTA */}
        <Link to="/schedule-test" className="mt-auto">
          <Button className="w-full bg-blue-600 hover:bg-blue-700" size="sm">
            Get Quote
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
