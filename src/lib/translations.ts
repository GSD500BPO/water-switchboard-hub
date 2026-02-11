export type TranslationKey = 
  | "hero.title"
  | "hero.subtitle"
  | "hero.zipPlaceholder"
  | "hero.search"
  | "hero.badge.independent"
  | "hero.badge.community"
  | "hero.badge.noSales"
  | "nav.waterTesting"
  | "nav.filters"
  | "nav.costGuides"
  | "nav.scamAlerts"
  | "nav.about"
  | "howItWorks.title"
  | "howItWorks.step1.title"
  | "howItWorks.step1.desc"
  | "howItWorks.step2.title"
  | "howItWorks.step2.desc"
  | "howItWorks.step3.title"
  | "howItWorks.step3.desc"
  | "alerts.title"
  | "footer.tagline"
  | "footer.resources"
  | "footer.legal"
  | "footer.copyright"
  | "popup.title"
  | "popup.subtitle"
  | "popup.namePlaceholder"
  | "popup.emailPlaceholder"
  | "popup.zipPlaceholder"
  | "popup.phonePlaceholder"
  | "popup.cta"
  | "popup.dismiss"
  | "popup.privacy"
  | "popup.ebookTitle"
  | "popup.ebookSubtitle"
  | "tests.title"
  | "tests.subtitle"
  | "tests.subtitleDealer"
  | "tests.orderKit"
  | "tests.freeTest"
  | "tests.learnMore"
  | "tests.addToCart"
  | "tests.requestTest"
  | "tests.standard.title"
  | "tests.standard.desc"
  | "tests.heavyMetals.title"
  | "tests.heavyMetals.desc"
  | "tests.bacteria.title"
  | "tests.bacteria.desc"
  | "tests.legionella.title"
  | "tests.legionella.desc"
  | "tests.chemical.title"
  | "tests.chemical.desc"
  | "tests.enterococci.title"
  | "tests.enterococci.desc"
  | "tests.thm.title"
  | "tests.thm.desc"
  | "tests.comprehensive.title"
  | "tests.comprehensive.desc"
  | "tests.unsure.title"
  | "tests.unsure.desc"
  | "tests.unsure.descDealer"
  | "tests.contact"
  | "dealer.yourExpert"
  | "dealer.verified"
  | "dealer.contactCta"
  | "dealer.freeTest"
  | "dealer.sponsored"
  | "scams.title"
  | "scams.subtitle"
  | "scams.search"
  | "scams.readMore"
  | "scams.warningSigns"
  | "scams.safetyTips"
  | "scams.source"
  | "scams.freeTest"
  | "scams.ctaTitle"
  | "scams.ctaDesc"
  | "scams.ctaDescDealer"
  | "scams.ctaDisclaimer"
  | "scams.meetExpert"
  | "scams.techOfMonth"
  | "scams.verifiedBadge";

type Translations = {
  [lang: string]: {
    [key in TranslationKey]: string;
  };
};

export const translations: Translations = {
  es: {
    "hero.title": "¿Qué Hay Realmente en Tu Agua?",
    "hero.subtitle": "Datos independientes de calidad del agua para tu código postal. Obtén los hechos antes de la venta.",
    "hero.zipPlaceholder": "Ingresa tu código postal",
    "hero.search": "Buscar",
    "hero.badge.independent": "Independiente",
    "hero.badge.community": "Enfocado en la Comunidad",
    "hero.badge.noSales": "Sin Presión de Ventas",
    "nav.waterTesting": "Pruebas de Agua",
    "nav.filters": "Filtros",
    "nav.costGuides": "Guías de Precios",
    "nav.scamAlerts": "Alertas de Estafas",
    "nav.about": "Acerca de",
    "howItWorks.title": "Cómo Funciona",
    "howItWorks.step1.title": "Ingresa Tu Código Postal",
    "howItWorks.step1.desc": "Empieza ingresando tu código postal para ver datos locales de calidad del agua.",
    "howItWorks.step2.title": "Ver Datos de Calidad",
    "howItWorks.step2.desc": "Revisa información detallada sobre contaminantes y niveles de seguridad.",
    "howItWorks.step3.title": "Solicita una Prueba Gratis",
    "howItWorks.step3.desc": "Conéctate con especialistas certificados por la EPA para una prueba sin costo.",
    "alerts.title": "Alertas Recientes de Calidad del Agua",
    "footer.tagline": "Community Water Test es un recurso de datos independiente dedicado a ayudar a los propietarios a entender la calidad de su agua sin presión de ventas.",
    "footer.resources": "Recursos",
    "footer.legal": "Legal",
    "footer.copyright": "© 2026 Community Water Test. Todos los derechos reservados. Un recurso independiente de datos de calidad del agua.",
    "popup.title": "Obtén Tu Guía GRATIS de Calidad del Agua",
    "popup.subtitle": "Aprende qué contaminantes hay en tu agua y cómo proteger a tu familia. Descarga nuestra guía completa.",
    "popup.namePlaceholder": "Nombre completo*",
    "popup.emailPlaceholder": "Correo electrónico*",
    "popup.zipPlaceholder": "Código postal*",
    "popup.phonePlaceholder": "Teléfono (opcional)",
    "popup.cta": "Enviarme La Guía Gratis",
    "popup.dismiss": "No gracias, continuar al sitio",
    "popup.privacy": "Al enviar, recibirás tu guía gratis por correo. Cancela en cualquier momento.",
    "popup.ebookTitle": "¿Qué Hay Realmente en Tu Agua?",
    "popup.ebookSubtitle": "La Guía Completa del Propietario",
    "tests.title": "¿Qué Pruebas de Agua Están Disponibles?",
    "tests.subtitle": "Ordena tus propios kits de prueba o solicita una prueba gratuita de nuestros especialistas certificados por la EPA. Te presentarán opciones de filtros sin costo ni compromiso.",
    "tests.subtitleDealer": "Solicita una prueba gratuita de nuestro especialista certificado por la EPA. Te presentará opciones de filtros sin costo ni compromiso.",
    "tests.orderKit": "Ordenar Kit",
    "tests.freeTest": "Prueba Gratis",
    "tests.learnMore": "Más Información",
    "tests.addToCart": "Agregar al Carrito",
    "tests.requestTest": "Solicitar Prueba",
    "tests.standard.title": "Prueba Estándar de Agua Potable",
    "tests.standard.desc": "Cubre muchas bases, especialmente para casas nuevas o cuando no está claro qué está mal. Incluye pruebas de química y bacterias.",
    "tests.heavyMetals.title": "Prueba de Metales Pesados",
    "tests.heavyMetals.desc": "Para problemas de plomería, sabor metálico, decoloración oscura o cambios en el color del cabello con tintes.",
    "tests.bacteria.title": "Prueba de Bacterias en Agua",
    "tests.bacteria.desc": "Para cambios en actividad industrial cercana, decoloración, mal olor y/o sabor, malestar estomacal o diarrea.",
    "tests.legionella.title": "Prueba de Legionella",
    "tests.legionella.desc": "Cualquier lugar donde el público use agua para higiene debe ser probado regularmente para Legionella, una bacteria que crece en agua tibia y estancada.",
    "tests.chemical.title": "Prueba Química del Agua",
    "tests.chemical.desc": "Para corrosión o cal en plomería o hervidor, manchas descoloridas en lavabos y sanitarios, mal olor.",
    "tests.enterococci.title": "Prueba de Enterococos",
    "tests.enterococci.desc": "Indica contaminación fecal en el suministro de agua que puede causar problemas de salud graves como infecciones urinarias.",
    "tests.thm.title": "Prueba de THM en Agua",
    "tests.thm.desc": "Sin olor, color ni sabor. Es un subproducto de la cloración que a niveles inseguros se ha relacionado con cáncer.",
    "tests.comprehensive.title": "Prueba Completa de Agua",
    "tests.comprehensive.desc": "Análisis exhaustivo que incluye todos los parámetros para una evaluación completa de la calidad de tu agua.",
    "tests.unsure.title": "¿No estás seguro qué prueba necesitas?",
    "tests.unsure.desc": "Contáctanos para asesoría personalizada sobre qué prueba es mejor para tu situación.",
    "tests.unsure.descDealer": "Solicita una prueba gratuita y nuestro experto te ayudará a determinar qué análisis necesitas.",
    "tests.contact": "Llama al 066-976 35 88 o envía un correo para asesoría.",
    "dealer.yourExpert": "Tu Experto Local",
    "dealer.verified": "Verificado EPA + Antecedentes",
    "dealer.contactCta": "Contactar Experto",
    "dealer.freeTest": "Solicitar Prueba Gratis",
    "dealer.sponsored": "Patrocinado",
    "scams.title": "Alertas de Estafas",
    "scams.subtitle": "Protégete de las estafas de agua",
    "scams.search": "Buscar alertas de estafas...",
    "scams.readMore": "Leer Más",
    "scams.warningSigns": "Señales de Advertencia",
    "scams.safetyTips": "Consejos de Seguridad",
    "scams.source": "Fuente",
    "scams.freeTest": "Solicitar Prueba Gratis",
    "scams.ctaTitle": "¿Preocupado por tu agua? Agenda una prueba certificada.",
    "scams.ctaDesc": "Nuestros profesionales verificados te ayudarán a entender tu calidad de agua sin presión de ventas.",
    "scams.ctaDescDealer": "Nuestros profesionales verificados te ayudarán a entender tu calidad de agua sin presión de ventas.",
    "scams.ctaDisclaimer": "Después de la prueba, tu representante te presentará opciones de filtros y puede dejar folletos informativos - esta consulta transparente es parte del servicio.",
    "scams.meetExpert": "Conocer a Nuestro Experto",
    "scams.techOfMonth": "Profesional Verificado del Mes",
    "scams.verifiedBadge": "Verificado EPA + Antecedentes",
  },
  en: {
    "hero.title": "What's Really In Your Water?",
    "hero.subtitle": "Independent water quality data for your ZIP code. Get the facts before the sales pitch.",
    "hero.zipPlaceholder": "Enter your ZIP code",
    "hero.search": "Search",
    "hero.badge.independent": "Independent",
    "hero.badge.community": "Community-Focused",
    "hero.badge.noSales": "No Sales Pressure",
    "nav.waterTesting": "Water Testing",
    "nav.filters": "Filters",
    "nav.costGuides": "Cost Guides",
    "nav.scamAlerts": "Scam Alerts",
    "nav.about": "About",
    "howItWorks.title": "How It Works",
    "howItWorks.step1.title": "Enter Your ZIP Code",
    "howItWorks.step1.desc": "Start by entering your ZIP code to see local water quality data.",
    "howItWorks.step2.title": "View Quality Data",
    "howItWorks.step2.desc": "Review detailed information about contaminants and safety levels.",
    "howItWorks.step3.title": "Request a Free Test",
    "howItWorks.step3.desc": "Connect with EPA-certified specialists for a no-cost water test.",
    "alerts.title": "Recent Water Quality Alerts",
    "footer.tagline": "Community Water Test is an independent data resource dedicated to helping homeowners understand their water quality without sales pressure.",
    "footer.resources": "Resources",
    "footer.legal": "Legal",
    "footer.copyright": "© 2026 Community Water Test. All rights reserved. An independent water quality data resource.",
    "popup.title": "Get Your FREE Water Quality Guide",
    "popup.subtitle": "Learn what contaminants are in your tap water and how to protect your family. Download our comprehensive guide.",
    "popup.namePlaceholder": "Full Name*",
    "popup.emailPlaceholder": "Email*",
    "popup.zipPlaceholder": "ZIP code*",
    "popup.phonePlaceholder": "Phone (optional)",
    "popup.cta": "Send Me The Free Guide",
    "popup.dismiss": "No thanks, continue to site",
    "popup.privacy": "By submitting, you'll receive your free guide via email. Unsubscribe any time.",
    "popup.ebookTitle": "What's Really In Your Water?",
    "popup.ebookSubtitle": "The Complete Homeowner's Guide",
    "tests.title": "What Drinking Water Tests Are Available?",
    "tests.subtitle": "Order your own test kits or get a free test from our EPA-certified specialists. They'll present you filter options at no cost or obligation.",
    "tests.subtitleDealer": "Request a free test from our EPA-certified specialist. They'll present you filter options at no cost or obligation.",
    "tests.orderKit": "Order Kit",
    "tests.freeTest": "Free Test",
    "tests.learnMore": "Learn More",
    "tests.addToCart": "Add to Cart",
    "tests.requestTest": "Request Test",
    "tests.standard.title": "Standard Drinking Water Test",
    "tests.standard.desc": "Covers many bases, especially for new homes or when it isn't clear what's wrong. Includes chemistry and bacteria tests.",
    "tests.heavyMetals.title": "Heavy Metals Water Test",
    "tests.heavyMetals.desc": "For plumbing issues, metallic taste, dark discoloration, or changes in hair color with dyes.",
    "tests.bacteria.title": "Bacteria in Drinking Water Test",
    "tests.bacteria.desc": "For changes in industrial activity nearby, discoloration, foul smell/taste, upset stomach or diarrhea.",
    "tests.legionella.title": "Legionella Testing",
    "tests.legionella.desc": "Anywhere the public uses water for hygiene should be regularly tested for Legionella, a bacteria that builds in warm, stagnant water.",
    "tests.chemical.title": "Chemical Drinking Water Test",
    "tests.chemical.desc": "For corroded/limescale on plumbing or kettle, discolored stains on wash basins and toilet bowls, foul smell.",
    "tests.enterococci.title": "Enterococci Testing",
    "tests.enterococci.desc": "Indicates fecal contamination in water supply that can lead to serious health problems like UTIs and bloodstream infections.",
    "tests.thm.title": "THM In Water Test",
    "tests.thm.desc": "Odorless, colorless, and tasteless. A byproduct of chlorination that at unsafe levels has been linked with cancer.",
    "tests.comprehensive.title": "Comprehensive Drinking Water Test",
    "tests.comprehensive.desc": "Exhaustive analysis including all parameters for a complete assessment of your water quality.",
    "tests.unsure.title": "Unsure about the test for you?",
    "tests.unsure.desc": "Contact us for personalized advice on which test is best for your situation.",
    "tests.unsure.descDealer": "Request a free test and our expert will help determine which analysis you need.",
    "tests.contact": "Call 066-976 35 88 or email for advice.",
    "dealer.yourExpert": "Your Local Expert",
    "dealer.verified": "EPA + Background Verified",
    "dealer.contactCta": "Contact Expert",
    "dealer.freeTest": "Request Free Test",
    "dealer.sponsored": "Sponsored",
    "scams.title": "Scam Alerts",
    "scams.subtitle": "Protect yourself from water scams",
    "scams.search": "Search scam alerts...",
    "scams.readMore": "Read More",
    "scams.warningSigns": "Warning Signs",
    "scams.safetyTips": "Safety Tips",
    "scams.source": "Source",
    "scams.freeTest": "Request Free Test",
    "scams.ctaTitle": "Worried about your water? Setup a certified test.",
    "scams.ctaDesc": "Our verified professionals will help you understand your water quality without sales pressure.",
    "scams.ctaDescDealer": "Our verified professionals will help you understand your water quality without sales pressure.",
    "scams.ctaDisclaimer": "After testing, your representative will present filter options and may leave informational brochures - this transparent consultation is part of the service.",
    "scams.meetExpert": "Meet Our Expert",
    "scams.techOfMonth": "Verified Professional of the Month",
    "scams.verifiedBadge": "EPA + Background Verified",
  },
};
