export type ScamCategory = 
  | "door-to-door" 
  | "phone" 
  | "fake-tests" 
  | "education" 
  | "utility"
  | "mail-in"
  | "financing";

export type ScamLocation = "Utah" | "New Jersey" | "General" | "Oregon" | "National";

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
  images?: string[];
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
      en: "Detectives in Belleville, NJ caught scammers trying to sell overpriced filter systems using aggressive tactics and fake government claims. Learn how to protect yourself.",
      es: "Detectives en Belleville, NJ atraparon estafadores tratando de vender sistemas de filtros de $12,000 usando tácticas agresivas y afirmaciones falsas del gobierno. Aprende cómo protegerte."
    },
    content: {
      en: `Police and the mayor of Belleville, New Jersey recently warned residents about door-to-door water testing scammers. Detectives posing as homeowners discovered that salespeople were claiming residents would need a filter system for every faucet in the house at unusually high prices. The salespeople were aggressive and falsely claimed to work for the township or the state.

**How to Spot a Scam:**

**Door-to-door tactics:** Be suspicious if salesmen are pushy about testing your water, claim to work for the government, or do not have a permit.

**Tablets or Droplet Tests:** Some representatives add tablets or drops to your water and tell you that if it changes color, it's contaminated. They could be adding anything to get you to buy their water treatment system.

**By mail or phone:** A company might send you a test tube to mail in, then call offering you a water purifier as part of a promotion.

**Beware of "Free" Home Water Tests:** The Federal Trade Commission (FTC) warns people to avoid "free" in-home water tests from companies trying to sell expensive systems.

**Government Claims are Fake:** The government does not endorse water tests or treatment products. An EPA registration number does not mean a product has been tested or approved.

The Water Quality Association (WQA) has stated: "The Water Quality Association does not solicit door-to-door, period."`,
      es: `La policía y el alcalde de Belleville, Nueva Jersey, advirtieron recientemente a los residentes sobre estafadores de pruebas de agua puerta a puerta. Detectives haciéndose pasar por propietarios descubrieron que los vendedores afirmaban que los residentes necesitarían un sistema de filtro para cada grifo de la casa a precios inusualmente altos. Los vendedores eran agresivos y afirmaban falsamente trabajar para el municipio o el estado.

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
        "Unusually high prices with no written quote provided"
      ],
      es: [
        "El vendedor afirma trabajar para el gobierno o el departamento de salud",
        "Usan tabletas o gotas que cambian de color para 'probar' tu agua",
        "Tácticas de alta presión para tomar decisiones inmediatas",
        "Sin permiso visible o credencial de identificación",
        "Precios inusualmente altos sin cotización escrita"
      ]
    },
    safetyTips: {
      en: [
        "Never let unknown salespeople inside your home",
        "Ask for permits and identification",
        "Contact local authorities if you feel uncomfortable",
        "Request a free test from a verified professional instead"
      ],
      es: [
        "Nunca dejes entrar a vendedores desconocidos a tu casa",
        "Pide permisos e identificación",
        "Contacta a las autoridades locales si te sientes incómodo",
        "Solicita una prueba gratuita de un profesional verificado"
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

Salespeople use carefully designed "survey sheets" to convince you to buy overpriced water treatment systems. Here's what they ask:

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
Most homes don't need expensive water treatment systems. A simple water test from a verified professional will tell you exactly what (if anything) you need.`,
      es: `**La Estafa de la Hoja de Encuesta:**

Los vendedores usan "hojas de encuesta" cuidadosamente diseñadas para convencerte de comprar sistemas de tratamiento de agua sobrevalorados. Esto es lo que preguntan:

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
La mayoría de los hogares no necesitan sistemas de tratamiento de agua costosos. Una simple prueba de agua de un profesional verificado te dirá exactamente qué (si algo) necesitas.`
    },
    warningSigns: {
      en: [
        "Survey asking about household spending",
        "Color-changing demonstrations",
        "Claims of 80-90% savings on household products",
        "Unusually high pricing with pressure tactics",
        "Presentations lasting 2+ hours"
      ],
      es: [
        "Encuesta preguntando sobre gastos del hogar",
        "Demostraciones que cambian de color",
        "Afirmaciones de 80-90% de ahorro en productos del hogar",
        "Precios inusualmente altos con tácticas de presión",
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
  },
  {
    id: "ftc-aqua-finance",
    title: {
      en: "FTC Sends $19.8 Million in Refunds for Deceptive Water Treatment Sales",
      es: "FTC Envía $19.8 Millones en Reembolsos por Ventas Engañosas de Tratamiento de Agua"
    },
    location: "National",
    categories: ["door-to-door", "financing"],
    date: "2025-02-19",
    source: "FTC.gov",
    sourceUrl: "https://www.ftc.gov/news-events/news/press-releases/2025/02/ftc-sends-more-198-million-refunds-consumers-harmed-aqua-finances-deceptive-sales-tactics",
    votes: 3500,
    summary: {
      en: "The FTC filed a lawsuit against Aqua Finance for deceptive door-to-door sales tactics, resulting in $23.6 million in debt relief and $19.8 million in refunds to 29,653 affected consumers.",
      es: "La FTC presentó una demanda contra Aqua Finance por tácticas de ventas engañosas puerta a puerta, resultando en $23.6 millones en alivio de deuda y $19.8 millones en reembolsos a 29,653 consumidores afectados."
    },
    content: {
      en: `The Federal Trade Commission is sending more than $19.8 million in refunds to consumers who were harmed by deceptive sales tactics from household water treatment financing company Aqua Finance.

**The Case:**

In May 2024, the FTC filed a lawsuit against Aqua Finance, charging that the company's nationwide network of dealers deceived consumers during door-to-door sales about the financing terms for water filtering and softening products.

**The Harm:**

According to the complaint, the false claims left consumers with hundreds to thousands of dollars in unexpected debt and large interest payments. Even worse, the financing terms impaired some consumers' ability to sell or refinance their homes.

**The Settlement:**

The company agreed to a settlement with the FTC that requires them to:
- Closely monitor their dealers
- Make clear disclosures to consumers
- Provide $23.6 million in debt relief
- Provide money for refunds

**The Refunds:**

The FTC is sending checks to 29,653 affected consumers. Recipients should cash their checks within 90 days.

**What This Means for You:**

If you're approached by water treatment salespeople offering financing, be extremely cautious. Never sign financing agreements on the spot—take time to read all terms carefully, especially anything related to liens on your home.

**Report Fraud:**

If you suspect fraud, contact the FTC at ReportFraud.ftc.gov. The Commission never requires people to pay money or provide account information to get a refund.`,
      es: `La Comisión Federal de Comercio está enviando más de $19.8 millones en reembolsos a consumidores que fueron perjudicados por tácticas de ventas engañosas de la compañía de financiamiento de tratamiento de agua Aqua Finance.

**El Caso:**

En mayo de 2024, la FTC presentó una demanda contra Aqua Finance, acusando a la red nacional de distribuidores de la compañía de engañar a los consumidores durante las ventas puerta a puerta sobre los términos de financiamiento para productos de filtrado y suavizado de agua.

**El Daño:**

Según la demanda, las afirmaciones falsas dejaron a los consumidores con cientos a miles de dólares en deudas inesperadas y grandes pagos de intereses. Peor aún, los términos de financiamiento afectaron la capacidad de algunos consumidores para vender o refinanciar sus hogares.

**El Acuerdo:**

La compañía acordó un acuerdo con la FTC que les requiere:
- Supervisar de cerca a sus distribuidores
- Hacer divulgaciones claras a los consumidores
- Proporcionar $23.6 millones en alivio de deuda
- Proporcionar dinero para reembolsos

**Los Reembolsos:**

La FTC está enviando cheques a 29,653 consumidores afectados. Los beneficiarios deben cobrar sus cheques dentro de 90 días.

**Lo Que Esto Significa Para Ti:**

Si te acercan vendedores de tratamiento de agua ofreciendo financiamiento, ten mucho cuidado. Nunca firmes acuerdos de financiamiento en el momento—toma tiempo para leer todos los términos cuidadosamente, especialmente cualquier cosa relacionada con gravámenes sobre tu casa.

**Reporta el Fraude:**

Si sospechas fraude, contacta a la FTC en ReportFraud.ftc.gov. La Comisión nunca requiere que las personas paguen dinero o proporcionen información de cuenta para obtener un reembolso.`
    },
    warningSigns: {
      en: [
        "Door-to-door water system sales with financing offers",
        "Unclear or hidden financing terms",
        "Systems that create liens on your home",
        "High-pressure immediate financing approval",
        "Promises of low monthly payments without showing total cost"
      ],
      es: [
        "Ventas puerta a puerta de sistemas de agua con ofertas de financiamiento",
        "Términos de financiamiento poco claros u ocultos",
        "Sistemas que crean gravámenes sobre tu casa",
        "Aprobación de financiamiento inmediato bajo alta presión",
        "Promesas de pagos mensuales bajos sin mostrar el costo total"
      ]
    },
    safetyTips: {
      en: [
        "Never sign financing agreements on the spot",
        "Read all terms carefully, especially about home liens",
        "Research financing company reputation before agreeing",
        "Get the total cost in writing, including all fees and interest",
        "Contact FTC at ReportFraud.ftc.gov if you suspect fraud"
      ],
      es: [
        "Nunca firmes acuerdos de financiamiento en el momento",
        "Lee todos los términos cuidadosamente, especialmente sobre gravámenes",
        "Investiga la reputación de la compañía de financiamiento antes de aceptar",
        "Obtén el costo total por escrito, incluyendo todos los cargos e intereses",
        "Contacta a la FTC en ReportFraud.ftc.gov si sospechas fraude"
      ]
    }
  },
  {
    id: "oregon-mail-in-scam",
    title: {
      en: "Mail-In Water Test Kits: The Lead Generation Scam",
      es: "Kits de Prueba de Agua por Correo: La Estafa de Generación de Prospectos"
    },
    location: "Oregon",
    categories: ["mail-in", "fake-tests"],
    date: "2024-03-20",
    source: "Oregon Health Authority / Seal Rock Water District",
    sourceUrl: "http://srwd.org/water-testing-scam",
    votes: 1890,
    images: [
      "scam-test-tube.png",
      "scam-mail-notice.png",
      "scam-mailer.png",
      "scam-mailer-2.png"
    ],
    summary: {
      en: "Oregon Health Authority warned residents about unsolicited mail-in water test kits used to collect personal information and push expensive filtration systems.",
      es: "La Autoridad de Salud de Oregon advirtió a los residentes sobre kits de prueba de agua por correo no solicitados usados para recopilar información personal y promover sistemas de filtración costosos."
    },
    content: {
      en: `The Oregon Health Authority and Seal Rock Water District issued a warning about fake water testing kits being mailed to residents.

**How the Scam Works:**

While not a criminal scam, these businesses operate in a way that raises serious concerns. The small print at the bottom of their mailers clearly states they are NOT affiliated with EPA or city or county health departments.

Instead, this private business uses fake home testing kits to collect information to identify leads and sell expensive point-of-use (POU) filtration.

**What They Collect:**
- Your name and address
- Your water source information
- Your opinion of your water quality
- Whether you already have water treatment
- Contact information for follow-up

**The Follow-Up:**

They use this data to contact you saying your test results are bad, but the company can perform a "thorough in-home analysis for free." Then, they push to sell an expensive water softener or POU system when they're in your home.

**Critical Rules to Follow:**

1. **Never mail in unsolicited test kits** - If you receive a test kit you didn't request, throw it away
2. **If no one showed up, don't believe it** - Legitimate water testing companies don't cold-mail test kits
3. **Always have someone with you** - Never be alone during an in-home water test. Have your spouse, a loved one, or call us to verify the representative
4. **Check the fine print** - If it says "not affiliated with EPA or health departments," it's not official

**The Reality:**

Your local water district continually delivers drinking water that meets or exceeds state and federal regulatory limits. If you have concerns, contact your water district directly or order a certified test from verified representatives.`,
      es: `La Autoridad de Salud de Oregon y el Distrito de Agua de Seal Rock emitieron una advertencia sobre kits de prueba de agua falsos que se envían por correo a los residentes.

**Cómo Funciona la Estafa:**

Aunque no es una estafa criminal, estos negocios operan de una manera que genera serias preocupaciones. La letra pequeña en la parte inferior de sus correos establece claramente que NO están afiliados con la EPA ni con los departamentos de salud de la ciudad o el condado.

En cambio, este negocio privado usa kits de prueba caseros falsos para recopilar información para identificar prospectos y vender sistemas de filtración de punto de uso (POU) costosos.

**Lo Que Recopilan:**
- Tu nombre y dirección
- Información sobre tu fuente de agua
- Tu opinión sobre la calidad de tu agua
- Si ya tienes tratamiento de agua
- Información de contacto para seguimiento

**El Seguimiento:**

Usan estos datos para contactarte diciendo que los resultados de tu prueba son malos, pero la compañía puede realizar un "análisis en casa exhaustivo gratis." Luego, presionan para vender un suavizador de agua o sistema POU costoso cuando están en tu casa.

**Reglas Críticas a Seguir:**

1. **Nunca envíes kits de prueba no solicitados por correo** - Si recibes un kit de prueba que no solicitaste, tíralo
2. **Si nadie se presentó, no lo creas** - Las compañías de pruebas de agua legítimas no envían kits de prueba por correo sin solicitar
3. **Siempre ten a alguien contigo** - Nunca estés solo durante una prueba de agua en casa. Ten a tu cónyuge, un ser querido, o llámanos para verificar al representante
4. **Revisa la letra pequeña** - Si dice "no afiliado con la EPA o departamentos de salud," no es oficial

**La Realidad:**

Tu distrito de agua local entrega continuamente agua potable que cumple o excede los límites regulatorios estatales y federales. Si tienes preocupaciones, contacta a tu distrito de agua directamente u ordena una prueba certificada de representantes verificados.`
    },
    warningSigns: {
      en: [
        "Receiving unsolicited water test kits in the mail",
        "Kit asks for extensive personal information",
        "\"Return deadline\" pressure tactics",
        "Fine print disclaiming government affiliation",
        "Offers for \"free in-home analysis\" after mailing"
      ],
      es: [
        "Recibir kits de prueba de agua no solicitados por correo",
        "El kit pide información personal extensa",
        "Tácticas de presión con \"fecha límite de devolución\"",
        "Letra pequeña negando afiliación gubernamental",
        "Ofertas de \"análisis gratuito en casa\" después de enviar"
      ]
    },
    safetyTips: {
      en: [
        "Never mail in unsolicited test kits - throw them away",
        "If no one showed up to your door, don't believe the mailer",
        "Always have a spouse or loved one present during in-home tests",
        "Call us to verify any representative before letting them in",
        "Order certified tests from verified, WQA seal-of-approval representatives"
      ],
      es: [
        "Nunca envíes kits de prueba no solicitados - tíralos",
        "Si nadie se presentó en tu puerta, no creas el correo",
        "Siempre ten a tu cónyuge o ser querido presente durante las pruebas en casa",
        "Llámanos para verificar a cualquier representante antes de dejarlo entrar",
        "Ordena pruebas certificadas de representantes verificados con sello de aprobación WQA"
      ]
    }
  },
  {
    id: "mail-in-protection-guide",
    title: {
      en: "How to Protect Yourself from Mail-In Water Test Scams",
      es: "Cómo Protegerte de las Estafas de Pruebas de Agua por Correo"
    },
    location: "General",
    categories: ["mail-in", "education", "fake-tests"],
    date: "2025-03-01",
    votes: 2200,
    summary: {
      en: "Essential guide on avoiding mail-in water test scams and how to get legitimate testing from verified representatives with WQA certification.",
      es: "Guía esencial sobre cómo evitar estafas de pruebas de agua por correo y cómo obtener pruebas legítimas de representantes verificados con certificación WQA."
    },
    content: {
      en: `Growing public awareness of potential water quality problems has resulted in a significant increase in mail-in test scam activity. Here's how to protect yourself and your family.

**The Mail-In Scam Pattern:**

Businesses send unsolicited "water test kits" through the mail, hoping you'll fill them out and return them. But these aren't real tests—they're lead generation tools designed to get your information so salespeople can contact you.

**Key Rules to Remember:**

**1. Never mail in unsolicited test kits**
If you receive a test kit you didn't request, throw it away. Legitimate testing companies don't cold-mail test kits to random addresses.

**2. If no one showed up, don't believe it**
Real water testing requires proper sampling procedures. A kit that arrives unannounced with no representative visit is not a legitimate testing service.

**3. Always have someone with you during in-home tests**
If you do schedule a legitimate water test, always make sure to be home with your spouse, loved one, or call us to verify the representative. Never be alone during an in-home water test.

**4. Order certified tests from verified representatives**
Get your test from verified representatives who follow best practices with the WQA (Water Quality Association) seal of approval. These representatives have background checks and follow industry standards.

**What to Expect from Legitimate Testing:**

After a certified water test, representatives will present you with information about your water quality and may offer filter options. This transparent consultation is part of the service—you'll receive brochures and recommendations based on your actual test results. This is normal and expected from legitimate services.

**The Difference:**
- Scammers: Send unsolicited kits, use scare tactics, pressure immediate sales
- Verified Reps: Schedule appointments, follow protocols, provide transparent information

**Happy families trust water systems from certified dealers who follow proper testing procedures.**`,
      es: `La creciente conciencia pública sobre posibles problemas de calidad del agua ha resultado en un aumento significativo en la actividad de estafas de pruebas por correo. Aquí está cómo protegerte a ti y a tu familia.

**El Patrón de Estafa por Correo:**

Los negocios envían "kits de prueba de agua" no solicitados por correo, esperando que los llenes y los devuelvas. Pero estas no son pruebas reales—son herramientas de generación de prospectos diseñadas para obtener tu información para que los vendedores puedan contactarte.

**Reglas Clave para Recordar:**

**1. Nunca envíes kits de prueba no solicitados por correo**
Si recibes un kit de prueba que no solicitaste, tíralo. Las compañías de pruebas legítimas no envían kits de prueba por correo a direcciones aleatorias.

**2. Si nadie se presentó, no lo creas**
Las pruebas de agua reales requieren procedimientos de muestreo adecuados. Un kit que llega sin anuncio y sin visita de un representante no es un servicio de pruebas legítimo.

**3. Siempre ten a alguien contigo durante las pruebas en casa**
Si programas una prueba de agua legítima, siempre asegúrate de estar en casa con tu cónyuge, ser querido, o llámanos para verificar al representante. Nunca estés solo durante una prueba de agua en casa.

**4. Ordena pruebas certificadas de representantes verificados**
Obtén tu prueba de representantes verificados que siguen las mejores prácticas con el sello de aprobación de la WQA (Asociación de Calidad del Agua). Estos representantes tienen verificación de antecedentes y siguen los estándares de la industria.

**Qué Esperar de las Pruebas Legítimas:**

Después de una prueba de agua certificada, los representantes te presentarán información sobre la calidad de tu agua y pueden ofrecer opciones de filtros. Esta consulta transparente es parte del servicio—recibirás folletos y recomendaciones basadas en tus resultados reales. Esto es normal y esperado de servicios legítimos.

**La Diferencia:**
- Estafadores: Envían kits no solicitados, usan tácticas de miedo, presionan ventas inmediatas
- Representantes Verificados: Programan citas, siguen protocolos, proporcionan información transparente

**Las familias felices confían en los sistemas de agua de distribuidores certificados que siguen los procedimientos de prueba adecuados.**`
    },
    warningSigns: {
      en: [
        "Test kit arrived without you requesting it",
        "No representative ever visited your home",
        "Kit asks for extensive personal and household information",
        "Mailer has urgent \"deadline\" language",
        "Small print says \"not affiliated with government agencies\""
      ],
      es: [
        "El kit de prueba llegó sin que lo solicitaras",
        "Ningún representante visitó tu casa",
        "El kit pide información personal y del hogar extensa",
        "El correo tiene lenguaje urgente de \"fecha límite\"",
        "La letra pequeña dice \"no afiliado con agencias gubernamentales\""
      ]
    },
    safetyTips: {
      en: [
        "Order certified tests from verified WQA seal-of-approval representatives",
        "Verified reps follow best practices and have background checks",
        "Always have your spouse or loved one present during testing",
        "Call to verify any representative before allowing entry",
        "After testing, expect a transparent presentation on filter options (this is normal)"
      ],
      es: [
        "Ordena pruebas certificadas de representantes con sello de aprobación WQA verificados",
        "Los representantes verificados siguen las mejores prácticas y tienen verificación de antecedentes",
        "Siempre ten a tu cónyuge o ser querido presente durante las pruebas",
        "Llama para verificar a cualquier representante antes de permitir la entrada",
        "Después de la prueba, espera una presentación transparente sobre opciones de filtros (esto es normal)"
      ]
    }
  }
];

export const categoryLabels: Record<ScamCategory, { en: string; es: string }> = {
  "door-to-door": { en: "Door-to-Door", es: "Puerta a Puerta" },
  "phone": { en: "Phone Scam", es: "Estafa Telefónica" },
  "fake-tests": { en: "Fake Tests", es: "Pruebas Falsas" },
  "education": { en: "Education", es: "Educación" },
  "utility": { en: "Utility Scam", es: "Estafa de Servicios" },
  "mail-in": { en: "Mail-In Scam", es: "Estafa por Correo" },
  "financing": { en: "Financing Scam", es: "Estafa de Financiamiento" }
};

export const locationLabels: Record<ScamLocation, { en: string; es: string }> = {
  "Utah": { en: "Utah", es: "Utah" },
  "New Jersey": { en: "New Jersey", es: "Nueva Jersey" },
  "General": { en: "General", es: "General" },
  "Oregon": { en: "Oregon", es: "Oregon" },
  "National": { en: "National", es: "Nacional" }
};
