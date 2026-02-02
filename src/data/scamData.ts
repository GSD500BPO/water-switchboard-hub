export type ScamCategory = 
  | "door-to-door" 
  | "phone" 
  | "fake-tests" 
  | "education" 
  | "utility";

export type ScamLocation = "Utah" | "New Jersey" | "General";

export interface ScamArticle {
  id: string;
  title: {
    en: string;
    es: string;
  };
  location: ScamLocation;
  city?: string;
  categories: ScamCategory[];
  date: string;
  source?: string;
  sourceUrl?: string;
  votes: number;
  isPinned?: boolean;
  summary: {
    en: string;
    es: string;
  };
  content: {
    en: string;
    es: string;
  };
  warningSigns?: {
    en: string[];
    es: string[];
  };
  safetyTips?: {
    en: string[];
    es: string[];
  };
}

export const scamArticles: ScamArticle[] = [
  {
    id: "door-to-door-scams",
    title: {
      en: "How to Avoid Door-to-Door Water Test Scams",
      es: "Cómo Evitar Estafas de Pruebas de Agua Puerta a Puerta"
    },
    location: "General",
    categories: ["door-to-door", "education", "fake-tests"],
    date: "2025-03-12",
    votes: 2847,
    isPinned: true,
    summary: {
      en: "Detectives in Belleville, NJ caught scammers trying to sell $12,000 filter systems using aggressive tactics and fake government claims. Learn how to protect yourself.",
      es: "Detectives en Belleville, NJ atraparon estafadores tratando de vender sistemas de filtros de $12,000 usando tácticas agresivas y afirmaciones falsas del gobierno. Aprende cómo protegerte."
    },
    content: {
      en: `Police and the mayor of Belleville, New Jersey recently warned residents about door-to-door water testing scammers. Detectives posing as homeowners discovered that salespeople were claiming residents would need a filter system for every faucet in the house, costing around $12,000. The salespeople were aggressive and falsely claimed to work for the township or the state.

**How to Spot a Scam:**

**Door-to-door tactics:** Be suspicious if salesmen are pushy about testing your water, claim to work for the government, or do not have a permit.

**Tablets or Droplet Tests:** Some representatives add tablets or drops to your water and tell you that if it changes color, it's contaminated. They could be adding anything to get you to buy their water treatment system.

**By mail or phone:** A company might send you a test tube to mail in, then call offering you a water purifier as part of a promotion.

**Beware of "Free" Home Water Tests:** The Federal Trade Commission (FTC) warns people to avoid "free" in-home water tests from companies trying to sell expensive systems.

**Government Claims are Fake:** The government does not endorse water tests or treatment products. An EPA registration number does not mean a product has been tested or approved.

The Water Quality Association (WQA) has stated: "The Water Quality Association does not solicit door-to-door, period."`,
      es: `La policía y el alcalde de Belleville, Nueva Jersey, advirtieron recientemente a los residentes sobre estafadores de pruebas de agua puerta a puerta. Detectives haciéndose pasar por propietarios descubrieron que los vendedores afirmaban que los residentes necesitarían un sistema de filtro para cada grifo de la casa, costando alrededor de $12,000. Los vendedores eran agresivos y afirmaban falsamente trabajar para el municipio o el estado.

**Cómo Identificar una Estafa:**

**Tácticas puerta a puerta:** Sospecha si los vendedores son insistentes sobre probar tu agua, afirman trabajar para el gobierno, o no tienen un permiso.

**Pruebas de Tabletas o Gotas:** Algunos representantes agregan tabletas o gotas a tu agua y te dicen que si cambia de color, está contaminada. Podrían estar agregando cualquier cosa para que compres su sistema de tratamiento de agua.

**Por correo o teléfono:** Una compañía podría enviarte un tubo de prueba para enviar, luego llamarte ofreciendo un purificador de agua como parte de una promoción.

**Cuidado con las Pruebas de Agua "Gratis":** La Comisión Federal de Comercio (FTC) advierte a las personas que eviten las pruebas de agua "gratis" en casa de compañías que intentan vender sistemas caros.

**Las Afirmaciones del Gobierno son Falsas:** El gobierno no respalda pruebas de agua ni productos de tratamiento. Un número de registro de la EPA no significa que un producto haya sido probado o aprobado.

La Asociación de Calidad del Agua (WQA) ha declarado: "La Asociación de Calidad del Agua no solicita puerta a puerta, punto."`
    },
    warningSigns: {
      en: [
        "Salesperson claims to work for the government or health department",
        "They use color-changing tablets or drops to 'test' your water",
        "High-pressure tactics to make immediate decisions",
        "No visible permit or ID badge",
        "Prices in the $6,000-$12,000 range for basic filtration"
      ],
      es: [
        "El vendedor afirma trabajar para el gobierno o el departamento de salud",
        "Usan tabletas o gotas que cambian de color para 'probar' tu agua",
        "Tácticas de alta presión para tomar decisiones inmediatas",
        "Sin permiso visible o credencial de identificación",
        "Precios en el rango de $6,000-$12,000 para filtración básica"
      ]
    },
    safetyTips: {
      en: [
        "Never let unknown salespeople inside your home",
        "Ask for permits and identification",
        "Contact local authorities if you feel uncomfortable",
        "Order a certified at-home water test kit instead"
      ],
      es: [
        "Nunca dejes entrar a vendedores desconocidos a tu casa",
        "Pide permisos e identificación",
        "Contacta a las autoridades locales si te sientes incómodo",
        "Ordena un kit de prueba de agua certificado en su lugar"
      ]
    }
  },
  {
    id: "sandy-health-dept-scam",
    title: {
      en: "Sandy, UT - Health Department Impersonators",
      es: "Sandy, UT - Impostores del Departamento de Salud"
    },
    location: "Utah",
    city: "Sandy",
    categories: ["door-to-door", "fake-tests"],
    date: "2019-02-28",
    source: "Salt Lake Tribune",
    sourceUrl: "https://www.sltrib.com/news/2019/02/28/sandy-warns-residents/",
    votes: 1563,
    summary: {
      en: "Sandy City warned residents about scammers claiming to be from the Health Department to test water and asking for financial information during the 2019 water crisis.",
      es: "La ciudad de Sandy advirtió a los residentes sobre estafadores que afirmaban ser del Departamento de Salud para probar el agua y pedían información financiera durante la crisis del agua de 2019."
    },
    content: {
      en: `During February 2019, Sandy City experienced a serious water crisis when a fluoride pump malfunctioned due to a power outage. This flooded the water system with fluoride and led to high levels of lead and copper—enough to make some residents sick.

Scammers quickly exploited this crisis. The city tweeted a warning that they had "reports of impersonators claiming to be from the Health Department to test water and asking for financial information. This is a scam."

**Key Facts:**
- The Salt Lake County Health Department offered FREE lead testing for affected residents
- Neither the health department nor the city charges for testing
- Neither asks for financial information
- The city's Public Utilities director was placed on paid administrative leave during an investigation

The water crisis affected homes and businesses between 1700 East and 2000 East, and 10600 South and 11400 South. A "no drink" order was issued for the affected area.

**Remember:** Legitimate government agencies will NEVER ask for your financial information when offering water testing services.`,
      es: `Durante febrero de 2019, la ciudad de Sandy experimentó una seria crisis de agua cuando una bomba de fluoruro falló debido a un corte de energía. Esto inundó el sistema de agua con fluoruro y llevó a altos niveles de plomo y cobre—suficiente para enfermar a algunos residentes.

Los estafadores rápidamente explotaron esta crisis. La ciudad tuiteó una advertencia de que tenían "reportes de impostores que afirman ser del Departamento de Salud para probar el agua y piden información financiera. Esto es una estafa."

**Datos Clave:**
- El Departamento de Salud del Condado de Salt Lake ofreció pruebas de plomo GRATIS para los residentes afectados
- Ni el departamento de salud ni la ciudad cobran por las pruebas
- Ninguno pide información financiera
- El director de Servicios Públicos de la ciudad fue puesto en licencia administrativa pagada durante una investigación

La crisis del agua afectó hogares y negocios entre 1700 East y 2000 East, y 10600 South y 11400 South. Se emitió una orden de "no beber" para el área afectada.

**Recuerda:** Las agencias gubernamentales legítimas NUNCA pedirán tu información financiera al ofrecer servicios de pruebas de agua.`
    },
    warningSigns: {
      en: [
        "Claims to be from Health Department without proper ID",
        "Asks for financial information",
        "Appears during or immediately after a water crisis",
        "Offers to test water for a fee"
      ],
      es: [
        "Afirma ser del Departamento de Salud sin identificación adecuada",
        "Pide información financiera",
        "Aparece durante o inmediatamente después de una crisis de agua",
        "Ofrece probar el agua por una tarifa"
      ]
    },
    safetyTips: {
      en: [
        "Contact the Health Department directly to verify",
        "Never give financial information to door-to-door visitors",
        "Free testing is available through official channels",
        "Report suspicious activity to local police"
      ],
      es: [
        "Contacta al Departamento de Salud directamente para verificar",
        "Nunca des información financiera a visitantes puerta a puerta",
        "Las pruebas gratuitas están disponibles a través de canales oficiales",
        "Reporta actividad sospechosa a la policía local"
      ]
    }
  },
  {
    id: "provo-utility-scam",
    title: {
      en: "Provo, UT - Utility Payment Scam Alert",
      es: "Provo, UT - Alerta de Estafa de Pago de Servicios"
    },
    location: "Utah",
    city: "Provo",
    categories: ["phone", "utility", "door-to-door"],
    date: "2024-09-06",
    source: "Fox 13",
    sourceUrl: "https://www.fox13now.com/news/local-news/northern-utah/beware-of-scammers-provo-city-warns-customers-of-utility-scams",
    votes: 892,
    summary: {
      en: "Provo Power warned residents about fraudsters posing as representatives, demanding payment and threatening immediate disconnection through calls, texts, emails, and door-to-door.",
      es: "Provo Power advirtió a los residentes sobre estafadores que se hacen pasar por representantes, exigiendo pago y amenazando con desconexión inmediata a través de llamadas, textos, correos electrónicos y puerta a puerta."
    },
    content: {
      en: `In September 2024, Provo City issued a warning about a surge in utility scams targeting residents.

**What Happened:**
Provo Power Director Scott Bunker cautioned customers about scammers posing as Provo Power representatives. "Scammers are posing as Provo Power representatives and then demanding payment while threatening disconnection," said Bunker.

**The Tactics:**
- Demanding immediate payment
- Threatening imminent disconnection
- Providing general account information to establish credibility
- Contacting victims through calls, texts, emails, fake websites, and door-to-door

"They are actively trying and unfortunately succeeding in some cases," stated Bunker. "We want to keep our customers safe."

**Official Safety Tips from Provo Power:**

1. Be suspicious of unexpected communications about your utility bill
2. Verify the person is a Provo City employee
3. Provo City will NEVER contact customers in-person or by phone to collect payments
4. Always use the official website: myusage.provo.org
5. Never provide personal information via email or click suspicious links
6. Even if caller ID shows Provo City, it could be spoofed
7. If something seems suspicious, hang up and check your account online or call Customer Service at 801-852-6000`,
      es: `En septiembre de 2024, la ciudad de Provo emitió una advertencia sobre un aumento en las estafas de servicios públicos dirigidas a los residentes.

**Lo Que Sucedió:**
El Director de Provo Power, Scott Bunker, advirtió a los clientes sobre estafadores que se hacen pasar por representantes de Provo Power. "Los estafadores se hacen pasar por representantes de Provo Power y luego exigen el pago mientras amenazan con la desconexión", dijo Bunker.

**Las Tácticas:**
- Exigir pago inmediato
- Amenazar con desconexión inminente
- Proporcionar información general de la cuenta para establecer credibilidad
- Contactar a las víctimas a través de llamadas, textos, correos electrónicos, sitios web falsos y puerta a puerta

"Están intentando activamente y desafortunadamente teniendo éxito en algunos casos", declaró Bunker. "Queremos mantener a nuestros clientes seguros."

**Consejos de Seguridad Oficiales de Provo Power:**

1. Sospecha de comunicaciones inesperadas sobre tu factura de servicios
2. Verifica que la persona sea un empleado de la ciudad de Provo
3. La ciudad de Provo NUNCA contactará a los clientes en persona o por teléfono para cobrar pagos
4. Siempre usa el sitio web oficial: myusage.provo.org
5. Nunca proporciones información personal por correo electrónico ni hagas clic en enlaces sospechosos
6. Incluso si el identificador de llamadas muestra Ciudad de Provo, podría ser falsificado
7. Si algo parece sospechoso, cuelga y verifica tu cuenta en línea o llama al Servicio al Cliente al 801-852-6000`
    },
    warningSigns: {
      en: [
        "Demands immediate payment",
        "Threatens disconnection if you don't pay now",
        "Contacts you unexpectedly about your bill",
        "Requests payment via phone or in person",
        "Uses pressure tactics to rush your decision"
      ],
      es: [
        "Exige pago inmediato",
        "Amenaza con desconexión si no pagas ahora",
        "Te contacta inesperadamente sobre tu factura",
        "Solicita pago por teléfono o en persona",
        "Usa tácticas de presión para apresurar tu decisión"
      ]
    },
    safetyTips: {
      en: [
        "Hang up and call the official customer service number",
        "Never pay via phone to incoming callers",
        "Use only the official website for payments",
        "Verify employee identity before engaging"
      ],
      es: [
        "Cuelga y llama al número oficial de servicio al cliente",
        "Nunca pagues por teléfono a llamantes entrantes",
        "Usa solo el sitio web oficial para pagos",
        "Verifica la identidad del empleado antes de interactuar"
      ]
    }
  },
  {
    id: "salesman-tactics-exposed",
    title: {
      en: "Water Softener Salesman Tactics Exposed",
      es: "Tácticas de Vendedores de Suavizadores de Agua Expuestas"
    },
    location: "General",
    categories: ["door-to-door", "fake-tests", "education"],
    date: "2024-05-11",
    votes: 1247,
    summary: {
      en: "Detailed breakdown of water softener salesman tactics including survey sheets to calculate fake savings, rigged beaker tests, and precipitation demonstrations that show harmless minerals as dangerous.",
      es: "Desglose detallado de las tácticas de vendedores de suavizadores de agua incluyendo hojas de encuesta para calcular ahorros falsos, pruebas de vasos manipuladas y demostraciones de precipitación que muestran minerales inofensivos como peligrosos."
    },
    content: {
      en: `**The Survey Sheet Scam:**

Salespeople use carefully designed "survey sheets" to convince you to buy overpriced water treatment systems ($6,000 to $10,000). Here's what they ask:

- **Soaps and cleaners:** "How much do you spend?" They'll claim you'll save 80% (~$100/month)
- **Bottled water:** Minimum $10/month you'll "save"
- **Water heating:** Around $30/month in supposed savings
- **Clothing and fabric:** $500/year in "extended life" savings
- **Plumbing replacement:** They calculate $5,000+ over 25 years you'll supposedly avoid

**The Rigged Demonstrations:**

**Soap Test:** Two beakers—one with filtered water, one with your tap water. They add soap drops. The filtered water erupts with suds while your water just gets soap scum. They claim each drop = $1 of soap. But the demonstration is rigged to make your water look bad.

**Precipitation Test:** They add two solutions to your water that chemically react with minerals, making them visible and colored. The bottom fills with "junk" that looks scary—but it's usually just harmless minerals like calcium and magnesium.

**The Close:**

After all this, they present their chart showing you'll "save" over $100/month. They say the system "only costs a dollar a day"—but payments are actually $125-$175/month. The math is designed to confuse you.

**The Reality:**
Most homes don't need $10,000 water treatment systems. A simple water test from a certified lab will tell you exactly what (if anything) you need.`,
      es: `**La Estafa de la Hoja de Encuesta:**

Los vendedores usan "hojas de encuesta" cuidadosamente diseñadas para convencerte de comprar sistemas de tratamiento de agua sobrevalorados ($6,000 a $10,000). Esto es lo que preguntan:

- **Jabones y limpiadores:** "¿Cuánto gastas?" Afirmarán que ahorrarás 80% (~$100/mes)
- **Agua embotellada:** Mínimo $10/mes que "ahorrarás"
- **Calentar agua:** Alrededor de $30/mes en supuestos ahorros
- **Ropa y telas:** $500/año en ahorros de "vida extendida"
- **Reemplazo de plomería:** Calculan $5,000+ en 25 años que supuestamente evitarás

**Las Demostraciones Manipuladas:**

**Prueba del Jabón:** Dos vasos—uno con agua filtrada, otro con tu agua del grifo. Agregan gotas de jabón. El agua filtrada erupciona con espuma mientras tu agua solo tiene residuo de jabón. Afirman que cada gota = $1 de jabón. Pero la demostración está manipulada para hacer que tu agua se vea mal.

**Prueba de Precipitación:** Agregan dos soluciones a tu agua que reaccionan químicamente con los minerales, haciéndolos visibles y coloreados. El fondo se llena de "basura" que se ve aterradora—pero generalmente son solo minerales inofensivos como calcio y magnesio.

**El Cierre:**

Después de todo esto, presentan su tabla mostrando que "ahorrarás" más de $100/mes. Dicen que el sistema "solo cuesta un dólar al día"—pero los pagos son en realidad $125-$175/mes. Las matemáticas están diseñadas para confundirte.

**La Realidad:**
La mayoría de los hogares no necesitan sistemas de tratamiento de agua de $10,000. Una simple prueba de agua de un laboratorio certificado te dirá exactamente qué (si algo) necesitas.`
    },
    warningSigns: {
      en: [
        "Survey asking about household spending",
        "Color-changing demonstrations",
        "Claims of 80-90% savings on household products",
        "Prices between $6,000-$10,000",
        "Presentations lasting 2+ hours"
      ],
      es: [
        "Encuesta preguntando sobre gastos del hogar",
        "Demostraciones que cambian de color",
        "Afirmaciones de 80-90% de ahorro en productos del hogar",
        "Precios entre $6,000-$10,000",
        "Presentaciones que duran más de 2 horas"
      ]
    },
    safetyTips: {
      en: [
        "Get a professional water test from a certified lab first",
        "Never make same-day decisions on major purchases",
        "Get multiple quotes if you do need a system",
        "Research the company's reputation online",
        "Ask for the total cost including installation and maintenance"
      ],
      es: [
        "Obtén primero una prueba de agua profesional de un laboratorio certificado",
        "Nunca tomes decisiones el mismo día en compras importantes",
        "Obtén múltiples cotizaciones si necesitas un sistema",
        "Investiga la reputación de la compañía en línea",
        "Pregunta por el costo total incluyendo instalación y mantenimiento"
      ]
    }
  }
];

export const categoryLabels: Record<ScamCategory, { en: string; es: string }> = {
  "door-to-door": { en: "Door-to-Door", es: "Puerta a Puerta" },
  "phone": { en: "Phone Scam", es: "Estafa Telefónica" },
  "fake-tests": { en: "Fake Tests", es: "Pruebas Falsas" },
  "education": { en: "Education", es: "Educación" },
  "utility": { en: "Utility Scam", es: "Estafa de Servicios" }
};

export const locationLabels: Record<ScamLocation, { en: string; es: string }> = {
  "Utah": { en: "Utah", es: "Utah" },
  "New Jersey": { en: "New Jersey", es: "Nueva Jersey" },
  "General": { en: "General", es: "General" }
};
