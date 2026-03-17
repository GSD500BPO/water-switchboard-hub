import { useEffect } from "react";

const DEFAULT_IMAGE = "https://communitywatertest.org/og-default.png";
const SITE_BASE = "https://communitywatertest.org";

interface HelmetProps {
  title: string;
  description: string;
  image?: string | null;
  canonical?: string;
  type?: string;
  schema?: object | null;
}

export function Helmet({ title, description, image, canonical, type = "website", schema }: HelmetProps) {
  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, content: string, property?: boolean) => {
      const attr = property ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", description);
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:type", type, true);
    setMeta("og:image", image || DEFAULT_IMAGE, true);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", image || DEFAULT_IMAGE);

    // Canonical URL
    const canonicalUrl = canonical ? `${SITE_BASE}${canonical}` : window.location.href.split("?")[0];
    setMeta("og:url", canonicalUrl, true);
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonicalUrl);

    // JSON-LD schema
    if (schema) {
      let script = document.getElementById("helmet-schema") as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement("script");
        script.id = "helmet-schema";
        script.type = "application/ld+json";
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(schema);
    }
  }, [title, description, image, canonical, type, schema]);

  return null;
}
