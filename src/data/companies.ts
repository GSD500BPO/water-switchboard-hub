import companiesData from "./companies.json";

// ---------- Types ----------

export interface Company {
  id: string;
  name: string;
  slug: string;
  phone: string | null;
  email: string | null;
  website: string | null;
  description: string | null;
  services: string[];
  googleRating: number | null;
  googleReviewCount: number | null;
  googleMapsUrl: string | null;
  logoUrl: string | null;
  photoUrls: string[];
  socialLinks: Record<string, string> | null;
  city: string;
  state: string;
}

export function getCompanyBySlug(stateSlug: string, citySlug: string, companySlug: string): Company | null {
  const companies = getCompaniesByCity(stateSlug, citySlug);
  return companies.find((c) => c.slug === companySlug) || null;
}

export function getAllCompanies(): Company[] {
  return Object.values(data.states).flatMap((state) =>
    Object.values(state.cities).flatMap((city) => city.companies)
  );
}

export interface CityData {
  name: string;
  companies: Company[];
}

export interface StateData {
  name: string;
  abbreviation: string;
  cities: Record<string, CityData>;
}

export interface CompaniesExport {
  meta: {
    exportedAt: string;
    totalCompanies: number;
    totalCities: number;
    totalStates: number;
    journey: string;
  };
  states: Record<string, StateData>;
}

const data = companiesData as CompaniesExport;

// ---------- Accessors ----------

export function getAllStates(): { slug: string; name: string; abbreviation: string; companyCount: number; cityCount: number }[] {
  return Object.entries(data.states)
    .map(([slug, state]) => ({
      slug,
      name: state.name,
      abbreviation: state.abbreviation,
      companyCount: Object.values(state.cities).reduce((sum, c) => sum + c.companies.length, 0),
      cityCount: Object.keys(state.cities).length,
    }))
    .sort((a, b) => b.companyCount - a.companyCount);
}

export function getStateData(stateSlug: string): StateData | null {
  return data.states[stateSlug] || null;
}

export function getCitiesInState(stateSlug: string): { slug: string; name: string; companyCount: number; avgRating: number | null }[] {
  const state = data.states[stateSlug];
  if (!state) return [];
  return Object.entries(state.cities)
    .map(([slug, city]) => {
      const rated = city.companies.filter((c) => c.googleRating != null);
      const avgRating = rated.length > 0
        ? Math.round((rated.reduce((s, c) => s + c.googleRating!, 0) / rated.length) * 10) / 10
        : null;
      return { slug, name: city.name, companyCount: city.companies.length, avgRating };
    })
    .sort((a, b) => b.companyCount - a.companyCount);
}

export function getCompaniesByCity(stateSlug: string, citySlug: string): Company[] {
  return data.states[stateSlug]?.cities[citySlug]?.companies || [];
}

export function getCompaniesByState(stateSlug: string): Company[] {
  const state = data.states[stateSlug];
  if (!state) return [];
  return Object.values(state.cities).flatMap((c) => c.companies);
}

export function getCityName(stateSlug: string, citySlug: string): string | null {
  return data.states[stateSlug]?.cities[citySlug]?.name || null;
}

export function getMeta() {
  return data.meta;
}
