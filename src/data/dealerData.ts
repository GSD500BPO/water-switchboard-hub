// Dealer Data for Community Water Test
// This file contains dealer profiles, territory mappings, and detection logic

export interface Dealer {
  id: string;
  name: string;
  displayName: string; // What shows publicly (anonymous/branded)
  region: string;
  state: string;
  language: "en" | "es";
  coverageZips: string[];
  qrParams: string[]; // URL params that trigger this dealer
  companyLogo?: string; // e.g., Puronics
  crmWebhookId?: string; // For Zoho integration
  facebookVideos?: string[];
  isActive: boolean;
}

// Yamily Acosta - Utah Dealer
export const yamilyAcosta: Dealer = {
  id: "yamily-acosta",
  name: "Yamily Acosta",
  displayName: "Your Local Water Experts", // Anonymous branding
  region: "Utah",
  state: "UT",
  language: "es",
  coverageZips: [], // Will be filled by isUtahZip function
  qrParams: ["Lead Source UTAH Yamily ESP", "UTAH", "Yamily", "yamily", "utah-rep"],
  facebookVideos: [
    "https://web.facebook.com/reel/1277930490828994",
    "https://web.facebook.com/share/r/1Acd43rbge/",
    "https://web.facebook.com/share/r/16y8AVXnR3/",
    "https://web.facebook.com/share/r/1DfuJYp4fh/",
  ],
  isActive: true,
};

// All registered dealers
export const dealers: Dealer[] = [yamilyAcosta];

// Utah ZIP code detection (84xxx range)
export function isUtahZip(zip: string): boolean {
  if (!zip || zip.length < 3) return false;
  const prefix = parseInt(zip.substring(0, 2), 10);
  // Utah ZIPs are in the 84xxx range
  return prefix === 84;
}

// Get dealer by QR/URL parameter
export function getDealerByParam(param: string): Dealer | null {
  if (!param) return null;

  const normalizedParam = param.toLowerCase();

  for (const dealer of dealers) {
    for (const qrParam of dealer.qrParams) {
      if (normalizedParam.includes(qrParam.toLowerCase()) || qrParam.toLowerCase().includes(normalizedParam)) {
        return dealer;
      }
    }
  }

  return null;
}

// Get dealer by state (for geo-detection)
export function getDealerByState(state: string): Dealer | null {
  if (!state) return null;

  const normalizedState = state.toLowerCase();

  for (const dealer of dealers) {
    if (
      dealer.isActive &&
      (dealer.state.toLowerCase() === normalizedState || dealer.region.toLowerCase() === normalizedState)
    ) {
      return dealer;
    }
  }

  return null;
}

// Get dealer by ZIP code
export function getDealerByZip(zip: string): Dealer | null {
  if (isUtahZip(zip)) {
    return yamilyAcosta;
  }
  // Add more ZIP-based dealer lookups here as needed
  return null;
}

// Major Utah cities for water quality data
export const utahCities = [
  { zip: "84101", city: "Salt Lake City", region: "Salt Lake Valley" },
  { zip: "84102", city: "Salt Lake City", region: "Salt Lake Valley" },
  { zip: "84103", city: "Salt Lake City", region: "Salt Lake Valley" },
  { zip: "84104", city: "Salt Lake City", region: "Salt Lake Valley" },
  { zip: "84105", city: "Salt Lake City", region: "Salt Lake Valley" },
  { zip: "84106", city: "Salt Lake City", region: "Salt Lake Valley" },
  { zip: "84111", city: "Salt Lake City", region: "Salt Lake Valley" },
  { zip: "84116", city: "Salt Lake City", region: "Salt Lake Valley" },
  { zip: "84601", city: "Provo", region: "Utah County" },
  { zip: "84602", city: "Provo", region: "Utah County" },
  { zip: "84604", city: "Provo", region: "Utah County" },
  { zip: "84606", city: "Provo", region: "Utah County" },
  { zip: "84401", city: "Ogden", region: "Weber County" },
  { zip: "84403", city: "Ogden", region: "Weber County" },
  { zip: "84405", city: "Ogden", region: "Weber County" },
  { zip: "84119", city: "West Valley City", region: "Salt Lake Valley" },
  { zip: "84120", city: "West Valley City", region: "Salt Lake Valley" },
  { zip: "84070", city: "Sandy", region: "Salt Lake Valley" },
  { zip: "84092", city: "Sandy", region: "Salt Lake Valley" },
  { zip: "84770", city: "St. George", region: "Southern Utah" },
  { zip: "84790", city: "St. George", region: "Southern Utah" },
  { zip: "84041", city: "Layton", region: "Davis County" },
  { zip: "84084", city: "West Jordan", region: "Salt Lake Valley" },
  { zip: "84088", city: "West Jordan", region: "Salt Lake Valley" },
  { zip: "84057", city: "Orem", region: "Utah County" },
  { zip: "84058", city: "Orem", region: "Utah County" },
  { zip: "84043", city: "Lehi", region: "Utah County" },
  { zip: "84003", city: "American Fork", region: "Utah County" },
  { zip: "84010", city: "Bountiful", region: "Davis County" },
  { zip: "84015", city: "Clearfield", region: "Davis County" },
  { zip: "84067", city: "Roy", region: "Weber County" },
  { zip: "84047", city: "Midvale", region: "Salt Lake Valley" },
  { zip: "84121", city: "Cottonwood Heights", region: "Salt Lake Valley" },
  { zip: "84128", city: "Kearns", region: "Salt Lake Valley" },
  { zip: "84065", city: "Riverton", region: "Salt Lake Valley" },
  { zip: "84095", city: "South Jordan", region: "Salt Lake Valley" },
  { zip: "84020", city: "Draper", region: "Salt Lake Valley" },
  { zip: "84660", city: "Spanish Fork", region: "Utah County" },
  { zip: "84663", city: "Springville", region: "Utah County" },
];
