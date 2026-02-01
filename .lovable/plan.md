

# Community Water Test (CWT) - Implementation Plan

## Overview
A geo-aware lead exchange platform that positions itself as a neutral water quality authority. Captures demand through education/SEO, then routes leads based on dealer territory rules and payment status.

---

## Phase 1: Foundation & Core Infrastructure

### 1.1 Backend Setup (Lovable Cloud + Supabase)
- **Dealer Rules Table**: dealer_id, name, allowed_zips (array), allowed_brands, language_support, payment_status, webhook_url, monthly_fee, per_close_fee
- **Leads Table**: id, zip, city, state, source, campaign_id, rep_id, qr_id, language, intent_score, dealer_routed_to, status (new/contacted/closed), timestamps
- **Team Authentication**: Email/password login for 2-5 admin team members with role-based access

### 1.2 Geo Detection System
- IP-based auto-detection on page load
- Required ZIP input for precision
- ZIP → City → State resolution and storage

---

## Phase 2: Public-Facing Experience

### 2.1 Homepage
- Clean, authoritative design (White/Blue + Navy/Gray palette with your logo)
- Hero: "What's Really In Your Water?" with ZIP input
- Trust signals: "Independent • Community-Focused • No Sales Pressure"
- How it works section
- Recent water alerts by region (mock data initially)

### 2.2 Dynamic ZIP Results Page
**If Active Dealer Exists:**
- Header: "Community Water Test — Sponsored by [Dealer Name]"
- Local badge: "Verified Local Water Specialist"
- Only shows dealer-approved brands
- CTA: "Request a Free Local Water Test"
- Dealer testimonials + community reviews

**If No Dealer:**
- Neutral educational content only
- Water quality data for that ZIP (contaminants, EWG-style)
- Pricing ranges and brand comparisons
- Scam warnings and red flags
- CTA: "Request a Free Community Water Test" (goes to holding pool)

### 2.3 Lead Capture Form
- Name, email, phone, preferred language
- Best time to contact
- Property type (home/business)
- Current water concerns (checkboxes)
- Auto-tagged with: source, campaign, geo, timestamp, dealer (if applicable)

### 2.4 Bilingual Support
- Language toggle (EN/ES) in header
- Persists across sessions
- All content served in selected language

---

## Phase 3: Content & SEO Structure

### 3.1 City/ZIP Pages (Template System)
- `/water-quality/[state]/[city]` URL structure
- Dynamic content blocks that pull from water data
- Local dealer insertion when sponsored
- Ready for bulk content creation

### 3.2 Blog Structure
- Categories: Scam Alerts, Pricing Guides, Brand Comparisons, Water Safety
- SEO-optimized templates
- City-specific variations support
- Example topics ready:
  - "Is My Water Safe in [City]?"
  - "What Sales Reps Don't Tell You About Water Tests"
  - "How to Spot a Scam Water Test"

### 3.3 Brand Comparison Pages
- Neutral, factual comparisons
- Pros/cons format
- No affiliate bias
- Only shows specific brands when dealer sponsors that page

---

## Phase 4: Admin Dashboard

### 4.1 Team Authentication
- Secure login for your team (2-5 people)
- Role-based permissions (admin vs viewer)

### 4.2 Dealer Management
- Add/edit/deactivate dealers
- Assign ZIP territories (exclusive or shared)
- Set allowed brands per dealer
- Configure webhook URL for lead delivery
- Toggle payment status on/off
- View dealer performance metrics

### 4.3 Lead Management
- All leads in unified view
- Filter by: status, source, geo, dealer, date
- Manual lead assignment for holding pool
- Export to CSV
- Lead status tracking (new → contacted → closed)

### 4.4 Territory Map View
- Visual map showing coverage
- Color-coded: sponsored (green), open (yellow), multiple dealers (orange)
- Quick toggle dealer visibility

---

## Phase 5: Lead Routing & Delivery

### 5.1 Routing Logic Engine
- Real-time dealer lookup by ZIP
- Payment status verification
- Territory exclusivity check
- Automatic vs holding pool routing

### 5.2 Webhook Delivery
- POST lead data to dealer's CRM URL
- Retry logic for failed deliveries
- Delivery confirmation logging
- Lead payload includes: contact info, source, campaign attribution, geo

### 5.3 Holding Pool
- Leads with no active dealer stored for later sale
- Bulk export capability
- Manual routing to new dealers
- Lead aging tracking

---

## Design Direction
- **Primary**: Clean white backgrounds with blue accents (trustworthy, clinical)
- **Secondary**: Navy and gray for headers/footers (authoritative, government-adjacent)
- **Typography**: Clean, readable, professional
- **Imagery**: Data visualizations, water droplets, community imagery
- **Tone**: Investigative, protective, educational - NOT sales-y
- Your logo integrated throughout

---

## Technical Notes
- Built on React + Tailwind CSS + Supabase (Lovable Cloud)
- Mobile-first responsive design
- All dealer visibility controlled via database toggles (no code changes needed)
- URL parameters (campaign_id, rep_id, qr_id) captured and stored automatically
- HTTPS secure, GDPR-friendly data handling

