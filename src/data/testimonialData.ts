export interface Testimonial {
  id: string;
  name: string;
  location: string;
  region: "northern-california" | "atlanta-woodstock" | "utah-salt-lake" | "el-paso" | "dallas";
  issue: string;
  quote: string;
  rating: number;
  date: string;
}

export const testimonials: Testimonial[] = [
  // Northern California
  {
    id: "nc-1",
    name: "Maria G.",
    location: "Sacramento, CA",
    region: "northern-california",
    issue: "Hard water & mineral deposits",
    quote: "After 15 years of dealing with hard water stains on everything, I finally got my water tested. The technician was professional, no pressure at all. Now our water is crystal clear and my dishwasher actually works properly!",
    rating: 5,
    date: "2024-12"
  },
  {
    id: "nc-2",
    name: "Robert T.",
    location: "Fresno, CA",
    region: "northern-california",
    issue: "Well water iron problems",
    quote: "Our well water had such high iron content that our clothes were turning orange. The free test showed exactly what was wrong. The solution they recommended was half the cost of what a local company quoted. Our water is perfect now.",
    rating: 5,
    date: "2024-11"
  },
  {
    id: "nc-3",
    name: "Linda & James P.",
    location: "Stockton, CA",
    region: "northern-california",
    issue: "Arsenic in well water",
    quote: "We discovered arsenic levels above safety standards. Community Water Test helped us understand our options without trying to sell us the most expensive system. The water testing person was amazed at the results after treatment. Problem solved!",
    rating: 5,
    date: "2025-01"
  },

  // Atlanta / Woodstock Georgia
  {
    id: "ga-1",
    name: "Patricia M.",
    location: "Woodstock, GA",
    region: "atlanta-woodstock",
    issue: "Sulfur smell & iron bacteria",
    quote: "The water in our new home smelled terrible - like rotten eggs. After getting a proper test, we finally understood what was causing it. The technician explained everything clearly. No more sulfur smell and the water tastes great!",
    rating: 5,
    date: "2024-10"
  },
  {
    id: "ga-2",
    name: "David & Christine W.",
    location: "Marietta, GA",
    region: "atlanta-woodstock",
    issue: "Iron staining & hard water",
    quote: "We had rust stains on every fixture and our shower heads kept getting clogged. A local company wanted over $5,000 for a system. Community Water Test connected us with a certified professional who solved it for less than half. Best decision we ever made!",
    rating: 5,
    date: "2024-12"
  },
  {
    id: "ga-3",
    name: "Michael R.",
    location: "Alpharetta, GA",
    region: "atlanta-woodstock",
    issue: "Low pH corrosive water",
    quote: "Our copper pipes were corroding from acidic water. The free water test revealed a pH of 5.8. After treatment, pH is now in the safe range and we stopped the corrosion before it caused major damage. The technician was extremely knowledgeable.",
    rating: 5,
    date: "2025-01"
  },

  // Utah Salt Lake City
  {
    id: "ut-1",
    name: "Jennifer S.",
    location: "Salt Lake City, UT",
    region: "utah-salt-lake",
    issue: "Extremely hard water",
    quote: "Utah water is notoriously hard. Our water heater was failing after just 5 years from mineral buildup. The certified technician tested our water and explained everything in Spanish which my mother appreciated. Now our appliances last longer!",
    rating: 5,
    date: "2024-11"
  },
  {
    id: "ut-2",
    name: "Carlos & Ana M.",
    location: "West Valley City, UT",
    region: "utah-salt-lake",
    issue: "Hard water & scale buildup",
    quote: "Después de años lidiando con agua dura que dañaba nuestros electrodomésticos, finalmente encontramos una solución. El técnico habló español perfectamente y explicó todo sin presión de ventas. ¡Nuestra agua ahora es excelente!",
    rating: 5,
    date: "2024-12"
  },
  {
    id: "ut-3",
    name: "Brandon K.",
    location: "Provo, UT",
    region: "utah-salt-lake",
    issue: "Iron and manganese",
    quote: "Our well water was staining everything orange and black. Multiple companies gave us quotes over $6,000. The Community Water Test professional explained we didn't need all that equipment. Saved us thousands and the water is crystal clear.",
    rating: 5,
    date: "2025-01"
  },

  // El Paso Texas
  {
    id: "tx-ep-1",
    name: "Rosa & Miguel H.",
    location: "El Paso, TX",
    region: "el-paso",
    issue: "High TDS & mineral content",
    quote: "El agua de El Paso es muy dura. Después de la prueba gratuita, entendimos exactamente qué contaminantes teníamos. El técnico certificado por la EPA nos ayudó a encontrar la mejor solución para nuestra familia. ¡Altamente recomendado!",
    rating: 5,
    date: "2024-10"
  },
  {
    id: "tx-ep-2",
    name: "Teresa L.",
    location: "El Paso, TX",
    region: "el-paso",
    issue: "Hard water & dry skin",
    quote: "My children had constant dry skin and eczema issues. After getting our water tested, we learned the hardness was off the charts. The solution made such a difference - their skin cleared up within weeks. The technician spoke fluent Spanish too!",
    rating: 5,
    date: "2024-12"
  },
  {
    id: "tx-ep-3",
    name: "Juan Carlos R.",
    location: "Socorro, TX",
    region: "el-paso",
    issue: "Well water contamination",
    quote: "Teníamos bacterias en nuestro pozo. El técnico vino, hizo las pruebas, y nos explicó todo claramente. No hubo presión para comprar nada. Ahora tenemos agua limpia y segura para toda la familia. ¡Gracias!",
    rating: 5,
    date: "2025-01"
  },

  // Dallas
  {
    id: "tx-dal-1",
    name: "Steve & Karen B.",
    location: "Plano, TX",
    region: "dallas",
    issue: "Chlorine taste & hard water",
    quote: "The city water here has such a strong chlorine taste. After the free test, we understood all the chemicals in our water. The certified technician was professional and not pushy at all. Our drinking water now tastes like bottled water!",
    rating: 5,
    date: "2024-11"
  },
  {
    id: "tx-dal-2",
    name: "Amanda G.",
    location: "Frisco, TX",
    region: "dallas",
    issue: "New home water quality concerns",
    quote: "When we bought our new construction home, we wanted to know what was in our water. The Community Water Test professional tested everything and gave us honest recommendations. No scare tactics, just facts. Great experience!",
    rating: 5,
    date: "2024-12"
  },
  {
    id: "tx-dal-3",
    name: "Richard & Lisa M.",
    location: "McKinney, TX",
    region: "dallas",
    issue: "Iron bacteria in well",
    quote: "We had orange slime building up in our toilet tanks - iron bacteria. Local companies wanted $8,000+ for treatment. The EPA-certified technician showed us a much more affordable solution. 13 years later and the system still works flawlessly!",
    rating: 5,
    date: "2025-01"
  },
];

export const getTestimonialsByRegion = (region: Testimonial["region"]) => {
  return testimonials.filter(t => t.region === region);
};

export const regionLabels: Record<Testimonial["region"], { en: string; es: string }> = {
  "northern-california": { en: "Northern California", es: "Norte de California" },
  "atlanta-woodstock": { en: "Atlanta & Woodstock, GA", es: "Atlanta y Woodstock, GA" },
  "utah-salt-lake": { en: "Salt Lake City, UT", es: "Salt Lake City, UT" },
  "el-paso": { en: "El Paso, TX", es: "El Paso, TX" },
  "dallas": { en: "Dallas, TX", es: "Dallas, TX" },
};
