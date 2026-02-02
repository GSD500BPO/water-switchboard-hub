import { useLanguage } from "@/contexts/LanguageContext";

interface ZohoFormEmbedProps {
  className?: string;
  height?: string;
}

export function ZohoFormEmbed({ className = "", height = "500px" }: ZohoFormEmbedProps) {
  const { language } = useLanguage();
  
  const formUrls = {
    es: "https://analysis.communitywatertest.org/gsd500bpo1/form/CommunityWaterQualityUpdateESP/formperma/Il2WPzgWR4pL6yXB9kIUBuPklWINVx3GzxvURUvEeJ4",
    en: "https://analysis.communitywatertest.org/gsd500bpo1/form/COmmunityWaterQualityUpdate/formperma/kiOWPOVcfvlveguD26ik6cFZC4fJTKc7Q5EJxMdkLhU"
  };

  const ariaLabels = {
    es: "Actualización sobre la Calidad del Agua en la Comunidad",
    en: "Community Water Quality Update"
  };

  return (
    <iframe
      aria-label={ariaLabels[language]}
      frameBorder="0"
      style={{ height, width: "99%", border: "none" }}
      src={formUrls[language]}
      className={className}
    />
  );
}
