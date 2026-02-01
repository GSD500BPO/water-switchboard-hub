

# Real Water Quality Data Integration Plan

## Current Situation

The water quality information displayed on the ZIP results page (`/water-quality/:zip`) comes from **hardcoded mock data** in `src/pages/WaterQuality.tsx` (lines 16-31). This mock data shows the same results (Lead, Chlorine, PFAS, Arsenic, Nitrate for Beverly Hills, CA) regardless of which ZIP code is entered.

Additionally, clicking "Learn More" on any test card navigates to `/tests/:id` which currently shows a 404 page.

---

## What We Will Build

### Part 1: Expanded Mock Data System (Immediate)
Create a comprehensive local database of water quality data for major US cities/ZIPs that can be queried client-side. This allows the site to function with realistic-looking data while we work on real data integration.

### Part 2: Test Detail Pages
Create the missing `/tests/:id` pages so users can learn more about each water test type.

### Part 3: Real Data Integration Path (Future)
Prepare the architecture for connecting to real water quality sources.

---

## Technical Implementation

### 1. Water Quality Data File

Create `src/data/waterQualityData.ts` with:

- ZIP code to city/state mapping for 100+ major metros
- Region-based contaminant profiles (Northeast, Southeast, Midwest, Southwest, West Coast)
- Common contaminants with realistic ranges:
  - Lead (ppb) - varies by infrastructure age
  - Chlorine (ppm) - municipal treatment levels
  - PFAS (ppt) - industrial proximity
  - Arsenic (ppb) - geological factors
  - Nitrate (ppm) - agricultural areas
  - Fluoride (ppm) - added by utilities
  - Chromium-6 (ppb) - industrial areas
  - Hardness (gpg) - mineral content

```text
Structure:
zipToCity: { "90210": { city: "Beverly Hills", state: "CA", region: "west" } }
regionProfiles: { "west": { contaminants: [...], sourceType: "Municipal", hardness: "Moderate" } }
```

### 2. Update WaterQuality.tsx

- Import the data lookup functions
- Query by ZIP code on page load
- If ZIP not found, show regional average based on state
- Add "Data Disclaimer" section explaining sources
- Add loading state while data is being processed

### 3. Create Test Detail Pages

Create `src/pages/TestDetail.tsx` with:

- Dynamic route: `/tests/:testId`
- Full description of each test type
- What the test detects
- When you should get this test
- Sample collection instructions
- Pricing and ordering CTA
- FAQ section specific to that test

### 4. Real Data Sources (Future Architecture)

When ready to integrate real data, options include:

| Source | Method | Data Type |
|--------|--------|-----------|
| EPA SDWIS | Public API | Violations, utility reports |
| EWG Tap Water Database | Firecrawl scraping | Comprehensive contaminant data |
| State Health Departments | Manual data entry | Local advisories |
| Local Utility CCRs | Firecrawl scraping | Annual water reports |

---

## Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| `src/data/waterQualityData.ts` | Create | ZIP lookup database with 100+ cities |
| `src/pages/WaterQuality.tsx` | Modify | Use data lookup instead of hardcoded mock |
| `src/pages/TestDetail.tsx` | Create | Individual test type detail pages |
| `src/App.tsx` | Modify | Add `/tests/:testId` route |
| `src/lib/translations.ts` | Modify | Add test detail page translations |

---

## Data Coverage

Initial mock data will cover major metros including:

- **California**: Los Angeles, San Francisco, San Diego, Sacramento
- **Texas**: Houston, Dallas, Austin, San Antonio
- **Florida**: Miami, Tampa, Orlando, Jacksonville
- **New York**: NYC, Buffalo, Albany
- **Other**: Chicago, Phoenix, Denver, Seattle, Boston, Atlanta, Detroit, Philadelphia

Each region will have distinct contaminant profiles based on real-world patterns:
- Older cities (Northeast): Higher lead risk
- Agricultural areas (Midwest): Higher nitrates
- Industrial areas: PFAS concerns
- Western states: Hard water, arsenic

---

## User Experience Flow

1. User enters ZIP on homepage
2. System looks up ZIP in local database
3. If found: Show city-specific data with accurate contaminant levels
4. If not found: Show state/regional average with note "Based on regional data - your local water may vary"
5. All pages show disclaimer: "Data compiled from EPA reports, utility disclosures, and community testing. Request a free test for your specific home."

---

## Next Phase: Real Data Integration

Once Lovable Cloud/Supabase is enabled:

1. Create `water_quality_data` table in database
2. Build Firecrawl edge function to scrape EWG data
3. Store and index by ZIP code
4. Update frontend to query API instead of local data
5. Add admin interface to manage/update data

