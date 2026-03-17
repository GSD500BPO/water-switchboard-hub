#!/usr/bin/env python3
"""
Submit URLs to Google for indexing via Search Console API.
Uses Connie's GSC service account.

Usage:
    python3 scripts/submit-to-google.py                    # Submit sitemap
    python3 scripts/submit-to-google.py --inspect          # Inspect + request indexing for each URL
    python3 scripts/submit-to-google.py --inspect --limit 50  # First 50 URLs only
"""

import argparse
import json
import time
import jwt
from datetime import datetime, timezone
from pathlib import Path
from urllib.request import Request, urlopen

GSC_KEY_FILE = "/opt/openclaw/openclaw_data/workspace-connie-content/.gsc-service-account.json"
SITE_URL = "https://communitywatertest.org/"
SITEMAP_URL = "https://communitywatertest.org/sitemap.xml"
URLS_FILE = Path(__file__).parent / "urls.txt"
SCOPE = "https://www.googleapis.com/auth/webmasters"
INDEXING_SCOPE = "https://www.googleapis.com/auth/indexing"


def get_access_token(scope: str) -> str:
    """Generate OAuth2 access token from service account."""
    with open(GSC_KEY_FILE) as f:
        key_data = json.load(f)

    now = int(datetime.now(timezone.utc).timestamp())
    payload = {
        "iss": key_data["client_email"],
        "scope": scope,
        "aud": "https://oauth2.googleapis.com/token",
        "iat": now,
        "exp": now + 3600,
    }
    signed = jwt.encode(payload, key_data["private_key"], algorithm="RS256")

    req = Request("https://oauth2.googleapis.com/token", method="POST")
    body = f"grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion={signed}"
    req.add_header("Content-Type", "application/x-www-form-urlencoded")

    with urlopen(req, data=body.encode()) as resp:
        return json.loads(resp.read())["access_token"]


def submit_sitemap(token: str):
    """Submit sitemap.xml to Google Search Console."""
    url = f"https://www.googleapis.com/webmasters/v3/sites/{SITE_URL}sitemaps/{SITEMAP_URL}"
    req = Request(url, method="PUT")
    req.add_header("Authorization", f"Bearer {token}")
    req.add_header("Content-Type", "application/json")
    req.add_header("Content-Length", "0")

    try:
        with urlopen(req, data=b"") as resp:
            print(f"  Sitemap submitted: {resp.status}")
    except Exception as e:
        print(f"  Sitemap submission error: {e}")


def inspect_url(token: str, page_url: str) -> dict:
    """Request URL inspection (triggers indexing request)."""
    url = "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect"
    body = json.dumps({
        "inspectionUrl": page_url,
        "siteUrl": SITE_URL,
    }).encode()

    req = Request(url, data=body, method="POST")
    req.add_header("Authorization", f"Bearer {token}")
    req.add_header("Content-Type", "application/json")

    try:
        with urlopen(req) as resp:
            return json.loads(resp.read())
    except Exception as e:
        return {"error": str(e)}


def notify_indexing_api(token: str, page_url: str) -> int:
    """Notify Google Indexing API about a URL update."""
    url = "https://indexing.googleapis.com/v3/urlNotifications:publish"
    body = json.dumps({
        "url": page_url,
        "type": "URL_UPDATED",
    }).encode()

    req = Request(url, data=body, method="POST")
    req.add_header("Authorization", f"Bearer {token}")
    req.add_header("Content-Type", "application/json")

    try:
        with urlopen(req) as resp:
            return resp.status
    except Exception as e:
        return 0


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--inspect", action="store_true", help="Inspect each URL")
    parser.add_argument("--limit", type=int, help="Limit URLs to inspect")
    args = parser.parse_args()

    print("Getting access tokens...")
    wm_token = get_access_token(SCOPE)

    # Always submit sitemap
    print(f"\nSubmitting sitemap: {SITEMAP_URL}")
    submit_sitemap(wm_token)

    if args.inspect and URLS_FILE.exists():
        print(f"\nInspecting URLs for indexing...")
        idx_token = get_access_token(INDEXING_SCOPE)
        urls = URLS_FILE.read_text().strip().split("\n")
        if args.limit:
            urls = urls[:args.limit]

        indexed = 0
        errors = 0
        for i, page_url in enumerate(urls):
            print(f"  [{i+1}/{len(urls)}] {page_url}", end="", flush=True)

            # Try Indexing API first (faster)
            status = notify_indexing_api(idx_token, page_url)
            if status == 200:
                print(" -> notified")
                indexed += 1
            else:
                # Fall back to URL inspection
                result = inspect_url(wm_token, page_url)
                if "error" in result:
                    print(f" -> error: {result['error'][:60]}")
                    errors += 1
                else:
                    verdict = result.get("inspectionResult", {}).get("indexStatusResult", {}).get("verdict", "?")
                    print(f" -> {verdict}")
                    indexed += 1

            time.sleep(0.5)  # Rate limit

        print(f"\nDone: {indexed} indexed, {errors} errors out of {len(urls)} URLs")
    else:
        print("\nSitemap submitted. Run with --inspect to also request indexing for each URL.")


if __name__ == "__main__":
    main()
