#!/usr/bin/env python3
"""
Generate sitemap.xml from companies.json for communitywatertest.org.
Also generates a URL list for Google indexing.

Usage:
    python3 scripts/generate-sitemap.py
"""

import json
from datetime import datetime, timezone
from pathlib import Path

BASE_URL = "https://communitywatertest.org"
COMPANIES_JSON = Path(__file__).parent.parent / "src" / "data" / "companies.json"
OUTPUT_SITEMAP = Path(__file__).parent.parent / "public" / "sitemap.xml"
OUTPUT_URLS = Path(__file__).parent.parent / "scripts" / "urls.txt"


def main():
    with open(COMPANIES_JSON) as f:
        data = json.load(f)

    now = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    urls = []

    # Homepage
    urls.append({"loc": BASE_URL, "priority": "1.0", "changefreq": "weekly"})

    # Schedule test
    urls.append({"loc": f"{BASE_URL}/schedule-test", "priority": "0.9", "changefreq": "monthly"})

    # Scam alerts
    urls.append({"loc": f"{BASE_URL}/scam-alerts", "priority": "0.6", "changefreq": "monthly"})

    # State pages
    for state_slug, state_data in data["states"].items():
        urls.append({
            "loc": f"{BASE_URL}/water-treatment/{state_slug}",
            "priority": "0.8",
            "changefreq": "weekly",
        })

        # City pages
        for city_slug, city_data in state_data["cities"].items():
            urls.append({
                "loc": f"{BASE_URL}/water-treatment/{state_slug}/{city_slug}",
                "priority": "0.7",
                "changefreq": "weekly",
            })

            # Company pages
            for company in city_data["companies"]:
                slug = company.get("slug", "")
                if slug:
                    urls.append({
                        "loc": f"{BASE_URL}/water-treatment/{state_slug}/{city_slug}/{slug}",
                        "priority": "0.6",
                        "changefreq": "monthly",
                    })

    # Generate sitemap XML
    xml_parts = ['<?xml version="1.0" encoding="UTF-8"?>']
    xml_parts.append('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
    for url in urls:
        xml_parts.append("  <url>")
        xml_parts.append(f"    <loc>{url['loc']}</loc>")
        xml_parts.append(f"    <lastmod>{now}</lastmod>")
        xml_parts.append(f"    <changefreq>{url['changefreq']}</changefreq>")
        xml_parts.append(f"    <priority>{url['priority']}</priority>")
        xml_parts.append("  </url>")
    xml_parts.append("</urlset>")

    OUTPUT_SITEMAP.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_SITEMAP.write_text("\n".join(xml_parts))

    # Generate URL list for indexing
    OUTPUT_URLS.write_text("\n".join(u["loc"] for u in urls))

    print(f"Sitemap: {OUTPUT_SITEMAP} ({len(urls)} URLs)")
    print(f"URL list: {OUTPUT_URLS}")
    print(f"  Static pages: 3")
    print(f"  State pages: {len(data['states'])}")
    city_count = sum(len(s['cities']) for s in data['states'].values())
    company_count = sum(
        len(c['companies'])
        for s in data['states'].values()
        for c in s['cities'].values()
    )
    print(f"  City pages: {city_count}")
    print(f"  Company pages: {company_count}")
    print(f"  Total: {len(urls)}")


if __name__ == "__main__":
    main()
