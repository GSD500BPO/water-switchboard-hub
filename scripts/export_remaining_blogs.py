#!/usr/bin/env python3
"""
Export all 635 blog entries from GSD Supabase (scraped_prospects where
blog_generated=true) to .md files in public/blogs/.

Skips files that already exist. Blog content is stored in website_description.
"""

import json
import os
import re
import sys
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.parse import quote

ROOT = Path(__file__).parent.parent
BLOGS_DIR = ROOT / "public" / "blogs"
ENV_FILE = "/home/ai/gsd-outreach-engine/configs/environments/gsd.env"
JOURNEY = "whole_house_water_installers"


def load_env(path: str) -> dict:
    env = {}
    with open(path) as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            if "=" in line:
                key, _, value = line.partition("=")
                env[key.strip()] = value.strip().strip("'").strip('"')
    return env


def slugify(text: str) -> str:
    """Convert company name to URL-friendly slug."""
    text = text.lower().strip()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_]+', '-', text)
    text = re.sub(r'-+', '-', text)
    return text.strip('-')


def fetch_all_blogs(supabase_url: str, service_key: str) -> list:
    """Fetch all companies with blog_generated=true, paginating if needed."""
    all_records = []
    offset = 0
    batch_size = 500

    while True:
        url = (
            f"{supabase_url}/rest/v1/scraped_prospects"
            f"?prospect_journey=eq.{quote(JOURNEY)}"
            f"&blog_generated=eq.true"
            f"&select=id,clean_company_name,company_slug,source_city,website_description"
            f"&order=source_city,clean_company_name"
            f"&offset={offset}"
            f"&limit={batch_size}"
        )
        req = Request(url)
        req.add_header("apikey", service_key)
        req.add_header("Authorization", f"Bearer {service_key}")
        with urlopen(req) as resp:
            batch = json.loads(resp.read())

        if not batch:
            break
        all_records.extend(batch)
        if len(batch) < batch_size:
            break
        offset += batch_size

    return all_records


def make_filename(company: dict) -> str:
    """Generate a .md filename from company slug or name + city."""
    slug = company.get("company_slug") or ""
    if slug:
        return slug + ".md"

    name = company.get("clean_company_name") or ""
    city = company.get("source_city") or ""
    if name and city:
        return slugify(f"{name}-{city}") + ".md"
    elif name:
        return slugify(name) + ".md"
    return None


def main():
    env = load_env(ENV_FILE)
    supabase_url = env["SUPABASE_URL"]
    service_key = env["SUPABASE_SERVICE_KEY"]

    BLOGS_DIR.mkdir(parents=True, exist_ok=True)

    existing = {f.name for f in BLOGS_DIR.glob("*.md")}
    print(f"Existing blog files: {len(existing)}")

    print("Fetching all blog entries from Supabase...")
    companies = fetch_all_blogs(supabase_url, service_key)
    print(f"  Found {len(companies)} companies with blog_generated=true")

    written = 0
    skipped_exists = 0
    skipped_empty = 0
    skipped_no_name = 0

    for co in companies:
        filename = make_filename(co)
        if not filename:
            skipped_no_name += 1
            continue

        if filename in existing:
            skipped_exists += 1
            continue

        content = co.get("website_description") or ""
        if not content or len(content) < 50:
            skipped_empty += 1
            continue

        filepath = BLOGS_DIR / filename
        filepath.write_text(content, encoding="utf-8")
        existing.add(filename)
        written += 1

    print(f"\n{'='*50}")
    print(f"  BLOG EXPORT SUMMARY")
    print(f"{'='*50}")
    print(f"  Total in Supabase:  {len(companies)}")
    print(f"  Already existed:    {skipped_exists}")
    print(f"  New files written:  {written}")
    print(f"  Skipped (empty):    {skipped_empty}")
    print(f"  Skipped (no name):  {skipped_no_name}")
    print(f"  Total .md files:    {len(list(BLOGS_DIR.glob('*.md')))}")
    print(f"{'='*50}")


if __name__ == "__main__":
    main()
