import {
  parseNotebookEntry,
  type MaritimeRiskNotebookEntry,
} from "@/content/notebook/schema";

const reutersTankerUrl =
  "https://www.reuters.com/business/energy/chinas-state-shippers-deploy-oil-tankers-outside-gulf-avoid-chokepoints-sources-2026-08-18/";

export const routingAroundRisk = parseNotebookEntry({
  variant: "maritime-risk",
  ordinal: 4,
  slug: "routing-around-risk",
  title: "Routing Around Risk",
  subtitle:
    "China's response to the Hormuz war is a portfolio of buffers and workarounds. The Arctic route is the smallest leg and the most easily exaggerated.",
  description:
    "An interactive, source-audited field guide to China's chokepoint portfolio: oil inventories, bypass pipelines, tanker handoffs, Red Sea exposure, and the seasonal Northern Sea Route.",
  thesis:
    "China is not escaping maritime chokepoints. It is distributing exposure across estimated oil inventories, pipeline capacity, offshore cargo handoffs, state-linked shipping, supplier diversity, and an announced seasonal Arctic container service. Those measures buy time and relocate risk; none replaces the energy function of Hormuz or the container scale of Suez.",
  publishedAt: "2026-08-18",
  updatedAt: "2026-08-18",
  readTime: "26 min",
  tags: [
    "China",
    "Strait of Hormuz",
    "Northern Sea Route",
    "Energy security",
    "Maritime trade",
  ],
  editorialStatus: "published",
  reviewState: "source-reviewed",
  formats: [
    {
      id: "format-risk-cfr",
      label: "Listen",
      title: "How China Is Quietly Winning the Iran War Energy Crisis",
      publisher: "The Spillover · Council on Foreign Relations",
      url: "https://www.cfr.org/podcasts/spillover/how-china-is-quietly-winning-the-iran-war-energy-crisis",
      note: "A strong statement of the swing-consumer argument. Its oil-price counterfactual is analysis, not an observed component of the Brent price.",
    },
    {
      id: "format-risk-arctic",
      label: "Listen",
      title: "Arctic Shipping and the Northern Sea Route",
      publisher: "The Circumpolar Podcast · The Arctic Institute",
      url: "https://www.thearcticinstitute.org/the-circumpolar-podcast-arctic-shipping-northern-sea-route/",
      note: "An April 2026 expert discussion of ice, operating economics, Russian administration, and the post-2022 China–Russia balance.",
    },
    {
      id: "format-risk-pbs",
      label: "Watch",
      title:
        "Russia, China, and Iran: The Future of Global Energy in a World at War",
      publisher: "Amanpour & Company · PBS",
      duration: "17:32",
      url: "https://www.pbs.org/video/russia-china-and-iran-the-future-of-global-energy-in-a-world-at-war-rdjpdi/",
      note: "A captioned interview with Daniel Yergin. Use it for expert interpretation and its April snapshot, not as voyage-level proof.",
    },
  ],
  turningPoints: [
    {
      id: "turning-risk-buffer",
      timecode: "CFR · inventory argument",
      title: "The real shock absorber sits on land",
      status: "interpretation",
      argument:
        "The CFR discussion argues that China's ability to cut purchases and draw inventories changes the demand side of a Gulf supply shock.",
      reading:
        "EIA's estimated inventory series supports exceptional buffering capacity. It does not prove a fully measured strategic reserve, a particular drawdown motive, or a dollar value for price suppression.",
      sourceIds: [
        "notebook-source-risk-cfr",
        "notebook-source-risk-eia-security",
      ],
    },
    {
      id: "turning-risk-transfer",
      timecode: "Reuters · tanker redeployment",
      title: "Risk can move without disappearing",
      status: "interpretation",
      argument:
        "Reuters reports that Chinese state-linked tanker operators kept more large vessels outside the Gulf and loaded through ship-to-ship transfers near Fujairah and Oman.",
      reading:
        "The receiving VLCC may avoid the most exposed passage while the oil still depends on Gulf production, a pipeline, or a feeder vessel. This is risk relocation, not route independence.",
      sourceIds: [
        "notebook-source-risk-reuters-tankers",
        "notebook-source-risk-reuters-saudi",
      ],
    },
    {
      id: "turning-risk-arctic",
      timecode: "Arctic Institute · route conditions",
      title: "Distance is not the same as reliability",
      status: "interpretation",
      argument:
        "The Arctic discussion explains why a shorter physical route can still carry higher schedule, escort, insurance, and governance risk.",
      reading:
        "NSIDC's July-to-October window and IMO's incomplete HFO transition put hard operational limits around the promotional 20-day transit claim.",
      sourceIds: [
        "notebook-source-risk-arctic-podcast",
        "notebook-source-risk-nsidc-passage",
        "notebook-source-risk-imo-hfo",
      ],
    },
    {
      id: "turning-risk-enablement",
      timecode: "Primary records · sanctions and intelligence",
      title: "Enablement is not command",
      status: "observed",
      argument:
        "Treasury documented PRC-linked procurement networks serving an Iranian missile-propellant producer, while AP reported a US assessment that Russia shared information potentially useful for Iranian strikes.",
      reading:
        "The records support concern about material and intelligence enablement. They do not establish top-level Chinese direction of every shipment or Russian command of Iranian targeting.",
      sourceIds: [
        "notebook-source-risk-treasury",
        "notebook-source-risk-ap-russia",
        "notebook-source-risk-wapo",
      ],
    },
  ],
  claimAudit: [
    {
      id: "audit-risk-portfolio",
      claim:
        "China is using a portfolio of buffers and workarounds, not a single route around the crisis.",
      status: "independentlyObserved",
      decision: "retain",
      assessment:
        "Independent energy, shipping, inventory, and route records support the structure of the argument. Each instrument has a different unit, timeframe, and failure mode, so the Notebook does not add them into one resilience score.",
      sourceIds: [
        "notebook-source-risk-eia-chokepoints",
        "notebook-source-risk-eia-security",
        "notebook-source-risk-reuters-tankers",
        "notebook-source-risk-chnl-2025",
      ],
    },
    {
      id: "audit-risk-hormuz-scale",
      claim:
        "Hormuz carried about one fifth of global petroleum-liquids consumption before the 2026 disruption.",
      status: "independentlyObserved",
      decision: "retain",
      assessment:
        "EIA reports 20.9 million b/d in the first half of 2025, about 20% of global petroleum-liquids consumption. IEA's full-year 2025 series is 19.87 million b/d. The different periods explain the small difference.",
      sourceIds: [
        "notebook-source-risk-eia-chokepoints",
        "notebook-source-risk-iea-hormuz",
      ],
    },
    {
      id: "audit-risk-pipelines",
      claim:
        "Saudi and Emirati bypass pipelines can replace a fixed percentage of Hormuz traffic.",
      status: "corrected",
      decision: "qualify",
      assessment:
        "IEA estimates 3.5–5.5 million b/d of available alternative capacity; EIA describes about 6.8 million b/d of stated export capacity after the Saudi expansion. Available, nameplate, export, crude, and total-liquids measures are not interchangeable.",
      sourceIds: [
        "notebook-source-risk-iea-hormuz",
        "notebook-source-risk-eia-bypass",
      ],
    },
    {
      id: "audit-risk-sts",
      claim:
        "Chinese-linked outside-Gulf ship-to-ship loadings exceeded 600,000 b/d in June and July 2026.",
      status: "reported",
      decision: "qualify",
      assessment:
        "Reuters reports the estimate from Vortexa data and unnamed trade sources. The public sources reviewed here do not independently reproduce the series, vessel count, company schedule, or roughly $110,000-per-day margin.",
      sourceIds: ["notebook-source-risk-reuters-tankers"],
    },
    {
      id: "audit-risk-red-sea",
      claim:
        "Reuters' late-July avoidance report conflicts with COSCO VLCC passages on July 23–24.",
      status: "corrected",
      decision: "qualify",
      assessment:
        "The chronology reduces the conflict: Lloyd's List reports the passages on July 23–24 and the withdrawal decision on July 27. Chartering and corporate-entity differences still prevent a universal claim about every COSCO-linked vessel.",
      sourceIds: [
        "notebook-source-risk-reuters-tankers",
        "notebook-source-risk-lloyds-red-sea",
      ],
    },
    {
      id: "audit-risk-arctic-schedule",
      claim:
        "Sea Legend operates a proven weekly, year-round China–Europe Arctic liner service.",
      status: "corrected",
      decision: "qualify",
      assessment:
        "The reviewed schedule announces eight weekly departures from mid-August to early October 2026 using seven ships. That is a seasonal program, not evidence that all sailings were completed or that the route is year-round.",
      sourceIds: [
        "notebook-source-risk-sea-legend",
        "notebook-source-risk-aljazeera",
        "notebook-source-risk-guardian",
      ],
    },
    {
      id: "audit-risk-transit-cargo",
      claim:
        "Total NSR cargo is a valid measure of international transit scale.",
      status: "corrected",
      decision: "exclude",
      assessment:
        "Rosatom reports 37.89 million tonnes of total NSR cargo in 2024, while CHNL reports only about 3.2 million tonnes of transit cargo in 2025. Domestic and destination traffic cannot be presented as through-transit.",
      sourceIds: [
        "notebook-source-risk-rosatom-2024",
        "notebook-source-risk-chnl-2025",
      ],
    },
    {
      id: "audit-risk-container-count",
      claim: "NSR container voyages increased from 15 to 23 in 2025.",
      status: "corrected",
      decision: "exclude",
      assessment:
        "That series was not reproduced in the reviewed Allianz material. CHNL reports 15 container-ship transit voyages in 2025, up from 11 in 2024. The Notebook uses the sourced CHNL series.",
      sourceIds: ["notebook-source-risk-chnl-2025"],
    },
    {
      id: "audit-risk-bellona-counts",
      claim:
        "Bellona's 100 non-Russian-flagged vessels and 100 shadow vessels describe the same NSR fleet.",
      status: "corrected",
      decision: "exclude",
      assessment:
        "They are separate counts and years: 100 non-Russian-flagged vessels permitted in 2024, and 100 sanctioned or shadow vessels identified operating in 2025. Their categories and denominators must remain separate.",
      sourceIds: [
        "notebook-source-risk-bellona-permits",
        "notebook-source-risk-bellona-shadow",
      ],
    },
    {
      id: "audit-risk-inventory",
      claim:
        "China held exactly 1.541 billion barrels in a transparent national strategic reserve at the end of March 2026.",
      status: "corrected",
      decision: "qualify",
      assessment:
        "EIA estimates 1.541 billion barrels in combined government and commercial crude stocks. China does not publish a complete series, so the number is neither exact nor a measure of the government reserve alone.",
      sourceIds: ["notebook-source-risk-eia-security"],
    },
    {
      id: "audit-risk-procurement",
      claim:
        "Named PRC-linked commercial networks procured missile-propellant ingredients for an Iranian military end user.",
      status: "officiallyAnnounced",
      decision: "retain",
      assessment:
        "Treasury's November 12, 2025 designation names entities, people, ingredients, procurement history, and Parchin Chemical Industries as the end user. It is a US sanctions finding, not a judicial verdict or proof of top-level CCP direction.",
      sourceIds: ["notebook-source-risk-treasury"],
    },
    {
      id: "audit-risk-russian-command",
      claim:
        "Russia directed Iran to use shared intelligence against specific targets.",
      status: "contested",
      decision: "exclude",
      assessment:
        "AP reports that US officials assessed Russia supplied information that could help Iran, while also saying the intelligence did not show Russia directing how Iran used it. Enablement and command are different claims.",
      sourceIds: [
        "notebook-source-risk-ap-russia",
        "notebook-source-risk-wapo",
      ],
    },
  ],
  scaleMetrics: [
    {
      id: "scale-risk-hormuz",
      label: "Hormuz oil and products",
      display: "20.9 million",
      unit: "barrels per day",
      asOf: "2025-06",
      reading:
        "EIA's first-half 2025 baseline is the scale the 2026 disruption is measured against.",
      caveat:
        "A daily flow cannot be directly compared with annual tonnes, box shares, stocks, or announced sailings.",
      sourceIds: ["notebook-source-risk-eia-chokepoints"],
    },
    {
      id: "scale-risk-inventory",
      label: "Estimated China crude stocks",
      display: "1.541 billion",
      unit: "barrels in storage",
      asOf: "2026-03",
      reading:
        "EIA's estimate combines government and commercial inventories and shows the depth of the land-based buffer.",
      caveat:
        "This is an estimated stock, not a flow and not China's disclosed government SPR alone.",
      sourceIds: ["notebook-source-risk-eia-security"],
    },
    {
      id: "scale-risk-suez",
      label: "Suez container exposure",
      display: "22%",
      unit: "of global seaborne container trade",
      asOf: "2023",
      reading:
        "UN Trade and Development supplies a global container-trade baseline for the Red Sea corridor.",
      caveat:
        "This is a trade share, not Asia–Europe-only traffic and not a volume of oil.",
      sourceIds: ["notebook-source-risk-unctad-suez"],
    },
    {
      id: "scale-risk-nsr-transit",
      label: "NSR transit cargo",
      display: "3.2 million",
      unit: "tonnes across 103 transit voyages",
      asOf: "2025",
      reading:
        "CHNL's transit measure isolates voyages that crossed the route from one boundary to the other.",
      caveat:
        "Most cargo was Russian bulk energy moving east. This is not a China–Europe container total.",
      sourceIds: ["notebook-source-risk-chnl-2025"],
    },
    {
      id: "scale-risk-nsr-total",
      label: "Total NSR cargo",
      display: "37.89 million",
      unit: "tonnes handled on the route",
      asOf: "2024",
      reading:
        "Rosatom's total includes destination and domestic traffic as well as transit.",
      caveat:
        "It uses a different year and scope from CHNL's transit figure. It must not be relabelled as international through-cargo.",
      sourceIds: ["notebook-source-risk-rosatom-2024"],
    },
    {
      id: "scale-risk-sea-legend",
      label: "Sea Legend 2026 program",
      display: "8 announced",
      unit: "seasonal container sailings",
      asOf: "2026-08-18",
      reading:
        "The operator-derived schedule runs from mid-August to early October and uses seven small-to-mid-sized ships.",
      caveat:
        "Announced departures are not completed voyages, and containers do not replace Gulf crude or LNG.",
      sourceIds: ["notebook-source-risk-sea-legend"],
    },
  ],
  routes: [
    {
      id: "route-risk-hormuz",
      label: "Hormuz energy artery",
      lens: "gulf",
      category: "energy",
      status: "observed",
      scale: "20.9 million b/d in 1H 2025",
      asOf: "2025-06",
      reading:
        "Gulf crude and products pass the strait into the Gulf of Oman before continuing toward Asian markets.",
      caveat:
        "The line is a schematic corridor, not an AIS track. EIA reports aggregate flows, not this geometry.",
      path: [
        [50.15, 26.64],
        [54.5, 26.25],
        [56.3, 26.55],
        [58.7, 24.5],
        [65, 19],
        [80, 8],
        [104, 1.3],
        [121.55, 29.87],
      ],
      points: [
        {
          id: "point-risk-hormuz",
          label: "Strait of Hormuz",
          coordinates: [56.3, 26.55],
          role: "Energy chokepoint",
          note: "EIA reports 20.9 million b/d of crude, condensate, and petroleum products in the first half of 2025.",
          sourceIds: ["notebook-source-risk-eia-chokepoints"],
        },
        {
          id: "point-risk-gulf-oman",
          label: "Gulf of Oman",
          coordinates: [58.7, 24.5],
          role: "Transfer zone",
          note: "Reuters reports a 2026 rise in tanker waiting and ship-to-ship activity outside the strait.",
          sourceIds: ["notebook-source-risk-reuters-tankers"],
        },
      ],
      sourceIds: [
        "notebook-source-risk-eia-chokepoints",
        "notebook-source-risk-reuters-tankers",
      ],
    },
    {
      id: "route-risk-sts",
      label: "Fujairah and offshore handoff",
      lens: "portfolio",
      category: "transfer",
      status: "interpretation",
      scale: "600,000 b/d reported for June–July 2026",
      asOf: "2026-07",
      reading:
        "A large receiving tanker can remain outside Hormuz while a pipeline or feeder tanker brings the cargo to the rendezvous.",
      caveat:
        "The volume and company counts are Reuters-reported estimates that were not independently reconstructed here.",
      path: [
        [54.1, 24.2],
        [56.35, 25.12],
        [58.4, 24.1],
      ],
      points: [
        {
          id: "point-risk-fujairah",
          label: "Fujairah",
          coordinates: [56.35, 25.12],
          role: "Bypass outlet and STS area",
          note: "The UAE's crude pipeline terminates here, outside Hormuz; Reuters also reports offshore transfer loadings in the area.",
          sourceIds: [
            "notebook-source-risk-eia-bypass",
            "notebook-source-risk-reuters-saudi",
          ],
        },
      ],
      sourceIds: [
        "notebook-source-risk-reuters-tankers",
        "notebook-source-risk-reuters-saudi",
      ],
    },
    {
      id: "route-risk-saudi-pipeline",
      label: "Saudi East–West pipeline",
      lens: "portfolio",
      category: "pipeline",
      status: "official-position",
      scale: "About 5 million b/d stated export capacity",
      asOf: "2026-07",
      reading:
        "The pipeline carries crude from eastern Saudi Arabia to Yanbu on the Red Sea.",
      caveat:
        "Nameplate and export capacity are not the same as available capacity or realized throughput.",
      path: [
        [50.15, 26.64],
        [46.7, 25.4],
        [43.8, 24.8],
        [38.05, 24.08],
      ],
      points: [
        {
          id: "point-risk-yanbu",
          label: "Yanbu",
          coordinates: [38.05, 24.08],
          role: "Red Sea export outlet",
          note: "EIA describes about 5 million b/d of export capacity after local refinery deliveries.",
          sourceIds: ["notebook-source-risk-eia-bypass"],
        },
      ],
      sourceIds: [
        "notebook-source-risk-eia-bypass",
        "notebook-source-risk-iea-hormuz",
      ],
    },
    {
      id: "route-risk-uae-pipeline",
      label: "UAE ADCOP pipeline",
      lens: "portfolio",
      category: "pipeline",
      status: "official-position",
      scale: "About 1.8 million b/d stated capacity",
      asOf: "2026-07",
      reading:
        "The Habshan–Fujairah link bypasses Hormuz for part of the UAE's crude exports.",
      caveat:
        "The corridor reduces strait dependence for qualifying barrels; it does not move other Gulf producers' full export volumes.",
      path: [
        [53.74, 23.67],
        [55.05, 24.1],
        [56.35, 25.12],
      ],
      points: [
        {
          id: "point-risk-habshan",
          label: "Habshan",
          coordinates: [53.74, 23.67],
          role: "Pipeline origin",
          note: "The UAE pipeline runs from the inland Habshan area to the Gulf of Oman coast.",
          sourceIds: ["notebook-source-risk-eia-bypass"],
        },
      ],
      sourceIds: ["notebook-source-risk-eia-bypass"],
    },
    {
      id: "route-risk-red-sea",
      label: "Bab el-Mandeb and Suez",
      lens: "red-sea",
      category: "container",
      status: "observed",
      scale: "22% of global seaborne container trade in 2023",
      asOf: "2023",
      reading:
        "The Red Sea corridor connects the Indian Ocean to Suez and European markets.",
      caveat:
        "The 22% is a pre-disruption global container-trade share, not an oil flow and not an August 2026 traffic count.",
      path: [
        [43.33, 12.58],
        [40.5, 18],
        [36.2, 25],
        [32.55, 29.97],
        [20, 35],
        [1.31, 51.96],
      ],
      points: [
        {
          id: "point-risk-bab",
          label: "Bab el-Mandeb",
          coordinates: [43.33, 12.58],
          role: "Red Sea chokepoint",
          note: "The southern gate of the Red Sea remained exposed to Houthi targeting and declared restrictions in 2026.",
          sourceIds: ["notebook-source-risk-lloyds-red-sea"],
        },
        {
          id: "point-risk-suez",
          label: "Suez Canal",
          coordinates: [32.55, 29.97],
          role: "Canal chokepoint",
          note: "UN Trade and Development estimated 22% of global seaborne container trade used the canal in 2023.",
          sourceIds: ["notebook-source-risk-unctad-suez"],
        },
      ],
      sourceIds: [
        "notebook-source-risk-unctad-suez",
        "notebook-source-risk-lloyds-red-sea",
      ],
    },
    {
      id: "route-risk-arctic",
      label: "Announced Arctic container hedge",
      lens: "arctic",
      category: "container",
      status: "official-position",
      scale: "Eight announced sailings, August–October 2026",
      asOf: "2026-08-18",
      reading:
        "Sea Legend markets a seasonal Ningbo–Felixstowe service along Russia's Northern Sea Route.",
      caveat:
        "This schematic is not a voyage track. The schedule is operator-derived and no line implies completed passage, ice condition, escort, or cargo.",
      path: [
        [121.55, 29.87],
        [145, 44],
        [169, 65.8],
        [160, 70],
        [120, 74],
        [90, 75],
        [60, 71],
        [30, 65],
        [1.31, 51.96],
      ],
      points: [
        {
          id: "point-risk-ningbo",
          label: "Ningbo–Zhoushan",
          coordinates: [121.55, 29.87],
          role: "Announced service origin",
          note: "Industry coverage identifies Ningbo–Zhoushan as the aggregation and departure port for the 2026 program.",
          sourceIds: ["notebook-source-risk-sea-legend"],
        },
        {
          id: "point-risk-bering",
          label: "Bering Strait",
          coordinates: [169, 65.8],
          role: "Arctic gateway",
          note: "The Northeast Passage enters the Arctic from the Pacific through the Bering Strait.",
          sourceIds: ["notebook-source-risk-nsidc-passage"],
        },
        {
          id: "point-risk-felixstowe",
          label: "Felixstowe",
          coordinates: [1.31, 51.96],
          role: "Announced European call",
          note: "The initial 2026 schedule names Felixstowe as a primary European destination.",
          sourceIds: ["notebook-source-risk-sea-legend"],
        },
      ],
      sourceIds: [
        "notebook-source-risk-sea-legend",
        "notebook-source-risk-nsidc-passage",
        "notebook-source-risk-chnl-2025",
      ],
    },
  ],
  timeline: [
    {
      date: "1869",
      label: "Suez opens a shorter Europe–Asia artery",
      status: "observed",
      explanation:
        "The canal made the Red Sea a central commercial corridor and later a recurring experiment in how trade responds when a chokepoint fails.",
      sourceIds: ["notebook-source-risk-unctad-suez"],
    },
    {
      date: "1980",
      label: "The Carter Doctrine elevates Gulf access",
      status: "official-position",
      explanation:
        "Washington publicly defined outside control of the Persian Gulf as a threat to vital US interests, linking energy passage to military power.",
      sourceIds: ["notebook-source-risk-eia-chokepoints"],
    },
    {
      date: "1984",
      label: "The Tanker War begins",
      status: "observed",
      explanation:
        "Attacks on commercial shipping during the Iran–Iraq war made insurance, flag, escort, and selective passage part of the modern Hormuz playbook.",
      sourceIds: ["notebook-source-risk-eia-chokepoints"],
    },
    {
      date: "2013",
      label: "China becomes an Arctic Council observer",
      status: "official-position",
      explanation:
        "Observer status gave Beijing a formal Arctic foothold years before a Chinese operator announced scheduled container sailings.",
      sourceIds: ["notebook-source-risk-aljazeera"],
    },
    {
      date: "2018",
      label: "Beijing publishes its Arctic policy",
      status: "official-position",
      explanation:
        "China's white paper connected shipping, research, resources, and a Polar Silk Road while leaving actual passage dependent on Russian administration.",
      sourceIds: ["notebook-source-risk-aljazeera"],
    },
    {
      date: "2024-07",
      label: "The IMO Arctic HFO prohibition takes effect",
      status: "observed",
      explanation:
        "MARPOL regulation 43A began, with protected-fuel-tank provisions and coastal-state waivers leaving important deferrals through July 2029.",
      sourceIds: ["notebook-source-risk-imo-hfo"],
    },
    {
      date: "2025-10",
      label: "A China–Europe container trial crosses the NSR",
      status: "observed",
      explanation:
        "CHNL records the first international China–Europe container transit in its 2025 results; the voyage became the promotional foundation for the 2026 program.",
      sourceIds: [
        "notebook-source-risk-chnl-2025",
        "notebook-source-risk-sea-legend",
      ],
    },
    {
      date: "2026-02-28",
      label: "Military action sharply constricts Hormuz",
      status: "observed",
      explanation:
        "EIA's quarterly estimate falls to 14.6 million b/d in the first quarter of 2026, while its market report describes a de facto closure after the strikes began.",
      sourceIds: [
        "notebook-source-risk-eia-security",
        "notebook-source-risk-eia-chokepoints",
      ],
    },
    {
      date: "2026-07",
      label: "Chinese VLCC behavior shifts again in the Red Sea",
      status: "observed",
      explanation:
        "Lloyd's List reports two COSCO-operated passages on July 23–24, followed by a July 27 report that Chinese state groups were pulling VLCCs from the corridor.",
      sourceIds: ["notebook-source-risk-lloyds-red-sea"],
    },
    {
      date: "2026-08",
      label: "Sea Legend announces an eight-sailing Arctic season",
      status: "official-position",
      explanation:
        "The schedule is evidence of commercial experimentation, not yet proof of a delivered weekly service or a new Suez-scale corridor.",
      sourceIds: ["notebook-source-risk-sea-legend"],
    },
  ],
  sections: {
    why: [
      "The most seductive version of the story is also the least useful: war closes a Middle Eastern chokepoint, China opens an Arctic one, and a new map replaces the old map. The evidence shows something more consequential. Beijing has spent years building options that work together precisely because none works alone.",
      "That portfolio joins a stock on land, flows through pipelines, cargo handoffs at sea, selective exposure by large state-linked carriers, and a seasonal route for a narrow class of exports. The analytical task is to preserve each instrument's scale and function. Crude barrels, stored barrels, annual tonnes, container-trade shares, and announced sailings are not interchangeable units.",
    ],
    verdict: [
      "The thesis holds: this is mitigation, not escape. China's estimated crude inventories are the deepest buffer. Saudi and Emirati pipelines move some barrels around Hormuz. Offshore transfers can keep a valuable receiving tanker outside the Gulf. The Red Sea and Hormuz remain political bargaining spaces. The Arctic service gives selected China–Europe cargo another seasonal option.",
      "Each move also creates a dependency. Stocks run down. Pipelines have capacity and outlet constraints. Ship-to-ship transfers add handoffs, price, and counterparties. Passage carve-outs can change. The Northern Sea Route is administered by Russia, exposed to sanctions and insurance limits, and bounded by ice and a short operating season. Portfolio resilience is real; independence is not.",
    ],
    chokepoints: [
      "EIA reports 20.9 million barrels per day of crude, condensate, and petroleum products through Hormuz in the first half of 2025. IEA's full-year measure is 19.87 million b/d and about a quarter of world seaborne oil trade. The small numerical difference is a period difference, not a contradiction. EIA also places first-quarter 2026 flow at 14.6 million b/d: severe constriction, but not zero.",
      "The Red Sea baseline needs its own unit. UN Trade and Development estimates 22% of global seaborne container trade passed through Suez in 2023. That figure cannot be added to Hormuz oil. It establishes why ship operators care about a route that avoids Bab el-Mandeb and Suez even when it does nothing for Gulf energy supply.",
    ],
    portfolio: [
      "The land buffer leads the hierarchy. EIA estimates China's government and commercial crude stocks at 1.541 billion barrels at the end of the first quarter of 2026, up from 1.397 billion one quarter earlier. Because China does not publish complete inventory data, those are estimates. They still show why Beijing can tolerate a temporary fall in imports better than a country operating close to just-in-time supply.",
      "The next layer is physical bypass. IEA estimates 3.5–5.5 million b/d of available pipeline capacity around Hormuz. EIA's July 2026 update describes about 5 million b/d of Saudi export capacity toward Yanbu and 1.8 million b/d on the UAE line to Fujairah. The wider 6.8-million number is stated export capacity, not guaranteed available flow. Both are small beside the prewar strait baseline.",
      "Reuters' August 18 reporting supplies the tactical layer: outside-Gulf ship-to-ship transfers, high freight margins, and routing guidance to state-linked shipping groups. Those details are consequential and still single-source. The public Notebook therefore shows the mechanism, attributes the numbers, and refuses to convert unnamed-source reporting into an observed official directive.",
    ],
    arctic: [
      "The essential correction is the denominator. Rosatom reports 37.89 million tonnes of total NSR cargo in 2024, but that total includes destination and domestic traffic. CHNL reports about 3.2 million tonnes of transit cargo in 2025 across 103 voyages, mostly Russian bulk energy moving east. It counts 15 container-ship transit voyages, up from 11, not the 23-from-15 series in the submitted draft.",
      "Sea Legend's 2026 plan is commercially interesting on its own terms: eight announced sailings between mid-August and early October, using ships far smaller than today's largest container vessels. For time-sensitive EV, battery, solar, or electronics cargo, an operator-promoted voyage near 20 days can be valuable. That does not turn the service into a crude corridor or demonstrate hundreds of reliable annual liner departures.",
      "Climate change widens the strategic horizon without erasing operational weather. NSIDC records the 2026 winter maximum as tied for the lowest in the satellite era, but cautions that winter maximum extent does not predict the summer minimum. Its practical Northeast Passage guidance remains July through October, with mid-September often most favorable and no segment guaranteed ice-free.",
    ],
    governance: [
      "The Arctic hedge exchanges one kind of geopolitical exposure for another. Transit depends on Russian permits, ice information, emergency capacity, and, in some conditions, icebreaker support. Bellona's open-source work adds two distinct warnings: 100 non-Russian-flagged vessels received 2024 permits, and a separate 2025 review identified 100 sanctioned or shadow vessels operating on the route. The repeated number should not hide the different categories.",
      "The environmental ceiling is also regulatory. The IMO's Arctic heavy-fuel-oil prohibition took effect in July 2024, but protected-fuel-tank provisions and coastal-state waivers delay full effect for important parts of the fleet until July 2029. A shorter route may reduce voyage distance; it does not by itself establish lower lifecycle risk or a credible spill response in remote ice-covered waters.",
      "The wider war-machine argument requires the same discipline. Treasury's sanctions record names PRC-linked networks and inputs serving Parchin Chemical Industries. AP reports US intelligence that Russia shared information potentially useful to Iran and simultaneously reports no evidence Russia directed Iran's use. Procurement, permissiveness, intelligence enablement, and operational command are four different propositions.",
    ],
    history: [
      "Chokepoints repeatedly produce adaptation without becoming irrelevant. The eight-year Suez closure beginning in 1967 encouraged larger tankers and Cape routing. The Tanker War made flag, escort, insurance, and selective passage part of commercial calculation. The post-2023 Red Sea disruption again showed that trade bends around danger at higher distance, fuel, inventory, and insurance cost.",
      "China's response belongs to that history. Its novelty is not the discovery of an ice-free replacement route. It is the coordination of stocks, state-linked carriers, pipelines, supplier relationships, and a narrow seasonal experiment under centralized policy. The map changes at the margin while the old geographic constraints continue to set the price.",
    ],
    changed: [
      "This inquiry began with a draft that treated several reported numbers as settled and occasionally blended incompatible measures. The audit replaces a 30% Asia–Europe Suez claim with UNCTAD's 22% global seaborne-container baseline; replaces a 23-container-voyage NSR claim with CHNL's 15; separates total NSR cargo from transit cargo; and separates Bellona's two different counts of 100 vessels.",
      "It also narrows an apparent Reuters–Lloyd's contradiction into a chronology: two reported COSCO-operated passages on July 23–24 precede a reported withdrawal decision on July 27. Exact STS volumes, vessel schedules, routing guidance, and margins remain attributed to Reuters. Announced Arctic sailings remain announcements until voyage-level evidence shows departure and arrival.",
    ],
  },
  sourceTrail: [
    {
      id: "notebook-source-risk-eia-chokepoints",
      role: "Primary energy baseline",
      title: "World Oil Transit Chokepoints",
      publisher: "US Energy Information Administration",
      publishedAt: "2026-03",
      retrievedAt: "2026-08-18",
      links: [
        {
          label: "Analysis",
          url: "https://www.eia.gov/international/content/analysis/special_topics/World_Oil_Transit_Chokepoints/",
        },
      ],
      context:
        "Supplies the 20.9-million-b/d first-half 2025 Hormuz baseline, global share, and LNG exposure.",
      limitation:
        "Aggregate route estimates do not identify vessel tracks or establish complete closure on a given day.",
    },
    {
      id: "notebook-source-risk-eia-security",
      role: "Primary quarterly estimates",
      title: "Global Energy Security Data",
      publisher: "US Energy Information Administration",
      retrievedAt: "2026-08-18",
      links: [
        {
          label: "Quarterly report",
          url: "https://www.eia.gov/outlooks/steo/report/energysecurity/article.php",
        },
      ],
      context:
        "Provides quarterly chokepoint flows and EIA estimates for China's combined government and commercial crude stocks.",
      limitation:
        "China does not publish a complete inventory series; the stock values are modelled estimates and may be revised.",
    },
    {
      id: "notebook-source-risk-iea-hormuz",
      role: "Primary international baseline",
      title:
        "The Strait of Hormuz is the world's most important oil chokepoint",
      publisher: "International Energy Agency",
      publishedAt: "2026-02",
      retrievedAt: "2026-08-18",
      links: [
        {
          label: "Factsheet",
          url: "https://www.iea.org/about/oil-security-and-emergency-response/strait-of-hormuz",
        },
      ],
      context:
        "Reports 19.87 million b/d through Hormuz in 2025, Asia's exposure, LNG share, and estimated available bypass capacity.",
      limitation:
        "Available alternative capacity is not the same measure as pipeline nameplate or stated export capacity.",
    },
    {
      id: "notebook-source-risk-eia-bypass",
      role: "Primary pipeline update",
      title:
        "Saudi Arabia expands crude oil pipeline capacity to bypass the Strait of Hormuz",
      publisher: "US Energy Information Administration",
      publishedAt: "2026-07",
      retrievedAt: "2026-08-18",
      links: [
        {
          label: "Today in Energy",
          url: "https://www.eia.gov/todayinenergy/detail.php?id=67804",
        },
      ],
      context:
        "Describes Saudi East–West and UAE Habshan–Fujairah pipeline capacity after the Saudi expansion.",
      limitation:
        "Stated capacity and export capacity do not establish available or realized throughput during the crisis.",
    },
    {
      id: "notebook-source-risk-unctad-suez",
      role: "Primary trade context",
      title: "Navigating Troubled Waters",
      publisher: "UN Trade and Development",
      publishedAt: "2024-02-22",
      retrievedAt: "2026-08-18",
      links: [
        {
          label: "Report",
          url: "https://unctad.org/publication/navigating-troubled-waters-impact-global-trade-disruption-shipping-routes-red-sea-black",
        },
      ],
      context:
        "Provides the 2023 estimate that 22% of global seaborne container trade passed through Suez.",
      limitation:
        "A 2023 global container share is a baseline, not an August 2026 route-volume measure.",
    },
    {
      id: "notebook-source-risk-reuters-tankers",
      role: "Direct current reporting",
      title:
        "Chinese state shippers deploy oil tankers outside Gulf to avoid chokepoints",
      publisher: "Reuters",
      publishedAt: "2026-08-18",
      retrievedAt: "2026-08-18",
      links: [{ label: "Report", url: reutersTankerUrl }],
      context:
        "Reports state-linked tanker redeployment, outside-Gulf STS volume, vessel schedules, and freight economics.",
      limitation:
        "Several central details rely on unnamed trade sources and proprietary shipping data not independently reconstructed for this Notebook.",
    },
    {
      id: "notebook-source-risk-reuters-saudi",
      role: "Direct current reporting",
      title:
        "Saudi Arabia resumes oil loadings and sales inside Strait of Hormuz",
      publisher: "Reuters",
      publishedAt: "2026-08-18",
      retrievedAt: "2026-08-18",
      links: [
        {
          label: "Report",
          url: "https://www.reuters.com/business/energy/saudi-arabia-resumes-oil-loadings-sales-inside-strait-hormuz-2026-08-18/",
        },
      ],
      context:
        "Supports the continued Gulf production and feeder leg behind some Fujairah-area transfers.",
      limitation:
        "A current reported transaction pattern does not establish a permanent route architecture.",
    },
    {
      id: "notebook-source-risk-chnl-2025",
      role: "Independent route accounting",
      title: "Main results of NSR transit navigation in 2025",
      publisher: "Centre for High North Logistics",
      retrievedAt: "2026-08-18",
      links: [
        {
          label: "Results",
          url: "https://chnl.no/news/main-results-of-nsr-transit-navigation-in-2025/",
        },
      ],
      context:
        "Distinguishes transit cargo, voyage count, container-ship transits, direction, and commodity mix.",
      limitation:
        "CHNL notes differences between its estimates and Rosatom's figures; both depend on public vessel and cargo records.",
    },
    {
      id: "notebook-source-risk-rosatom-2024",
      role: "Operator annual record",
      title: "Rosatom annual report 2024",
      publisher: "Rosatom",
      publishedAt: "2025",
      retrievedAt: "2026-08-18",
      links: [
        {
          label: "Annual report PDF",
          url: "https://report.rosatom.ru/go_eng/go_rosatom_eng_2024/rosatom_2024_eng.pdf",
        },
      ],
      context:
        "Reports 37.89 million tonnes of total cargo on the Northern Sea Route in 2024.",
      limitation:
        "Rosatom administers the route; its total-cargo series is broader than international transit and carries institutional incentives.",
    },
    {
      id: "notebook-source-risk-sea-legend",
      role: "Industry schedule",
      title: "Sea Legend announces eight 2026 China–Europe Arctic sailings",
      publisher: "Xinde Marine News",
      publishedAt: "2026-08",
      retrievedAt: "2026-08-18",
      links: [
        {
          label: "Schedule report",
          url: "https://www.xindemarinenews.com/news/2077650383913914370",
        },
        {
          label: "Fleet report",
          url: "https://www.xindemarinenews.com/news/2080682043257425922",
        },
      ],
      context:
        "Provides the eight-sailing schedule, named ships, approximate capacities, and promoted route times.",
      limitation:
        "The central claims originate with the operator. A published schedule is not voyage-level evidence that every sailing departed or arrived.",
    },
    {
      id: "notebook-source-risk-nsidc-passage",
      role: "Scientific route constraint",
      title: "When is the Northeast Passage open for ship traffic?",
      publisher: "National Snow and Ice Data Center",
      retrievedAt: "2026-08-18",
      links: [
        {
          label: "Scientist explainer",
          url: "https://nsidc.org/learn/ask-scientist/when-northeast-passage-open-ship-traffic",
        },
      ],
      context:
        "Explains the broad July–October passage window, mid-September optimum, and persistent local ice risk.",
      limitation:
        "Climatological guidance does not certify conditions for a particular vessel or voyage.",
    },
    {
      id: "notebook-source-risk-nsidc-2026",
      role: "Scientific seasonal record",
      title: "Arctic sea ice record-low maximum strikes again",
      publisher: "National Snow and Ice Data Center",
      publishedAt: "2026-03",
      retrievedAt: "2026-08-18",
      links: [
        {
          label: "Seasonal analysis",
          url: "https://nsidc.org/news-analyses/news-stories/arctic-sea-ice-record-low-maximum-strikes-again",
        },
      ],
      context:
        "Records a March 15 maximum of 14.29 million square kilometres, tied with 2025 for the satellite-era low.",
      limitation:
        "NSIDC explicitly cautions that the winter maximum does not predict the September minimum.",
    },
    {
      id: "notebook-source-risk-imo-hfo",
      role: "Primary maritime rule",
      title: "Shipping in polar waters",
      publisher: "International Maritime Organization",
      retrievedAt: "2026-08-18",
      links: [
        {
          label: "Polar rules",
          url: "https://www.imo.org/en/mediacentre/hottopics/pages/polar-default.aspx",
        },
      ],
      context:
        "Explains MARPOL regulation 43A, its July 2024 start, ship-design provisions, exceptions, and coastal-state waivers through 2029.",
      limitation:
        "The rule page does not quantify route-wide HFO consumption or model spill consequences.",
    },
    {
      id: "notebook-source-risk-bellona-permits",
      role: "NGO open-source audit",
      title: "Vessels on the Northern Sea Route",
      publisher: "Bellona Environmental Transparency Center",
      retrievedAt: "2026-08-18",
      links: [
        {
          label: "2024 permit analysis",
          url: "https://etc.bellona.org/publication/vessels-on-nsr/",
        },
      ],
      context:
        "Counts 1,312 permits for 975 vessels in 2024, including 100 non-Russian-flagged vessels and a substantial non-ice-class subset.",
      limitation:
        "Permit issuance does not prove a completed voyage; this 100-vessel category is not Bellona's later shadow-fleet count.",
    },
    {
      id: "notebook-source-risk-bellona-shadow",
      role: "NGO sanctions audit",
      title: "The Shadow Fleet sets sail to the Arctic",
      publisher: "Bellona Environmental Transparency Center",
      publishedAt: "2025-12-15",
      retrievedAt: "2026-08-18",
      links: [
        {
          label: "2025 analysis",
          url: "https://etc.bellona.org/2025/12/15/nsr-2025/",
        },
      ],
      context:
        "Identifies 100 sanctioned or shadow vessels operating on the NSR in 2025, compared with 13 in its 2024 analysis.",
      limitation:
        "Bellona is an advocacy organization using an open-source methodology; sanctions date, ownership, and voyage evidence require vessel-level review.",
    },
    {
      id: "notebook-source-risk-treasury",
      role: "Primary sanctions record",
      title: "Treasury targets Iran's missile and UAV procurement networks",
      publisher: "US Department of the Treasury",
      publishedAt: "2025-11-12",
      retrievedAt: "2026-08-18",
      links: [
        {
          label: "Press release SB0313",
          url: "https://home.treasury.gov/news/press-releases/sb0313",
        },
      ],
      context:
        "Names 32 people and entities and details procurement of hundreds of metric tonnes of specified propellant ingredients from China for PCI.",
      limitation:
        "A US sanctions designation is an executive-branch finding, not a judicial verdict or proof of top-level PRC direction.",
    },
    {
      id: "notebook-source-risk-ap-russia",
      role: "Independent intelligence reporting",
      title:
        "Russia provided Iran with information that could help strike US assets",
      publisher: "Associated Press",
      publishedAt: "2026-08",
      retrievedAt: "2026-08-18",
      links: [
        {
          label: "Report",
          url: "https://apnews.com/article/russia-iran-war-putin-ukraine-oil-8a6af4989692d66a1e5bed1bc1922efa",
        },
      ],
      context:
        "Reports a US intelligence assessment that Russia supplied information potentially useful to Iranian attacks.",
      limitation:
        "The intelligence is not public; officials said it did not show Russia directing Iran's use of the information.",
    },
    {
      id: "notebook-source-risk-lloyds-red-sea",
      role: "Specialist shipping chronology",
      title:
        "Chinese state giants pull VLCCs from Red Sea as safety trumps commercial gains",
      publisher: "Lloyd's List",
      publishedAt: "2026-07-27",
      retrievedAt: "2026-08-18",
      links: [
        {
          label: "Report",
          url: "https://www.lloydslist.com/LL1157990/Chinese-state-giants-pull-VLCCs-from-Red-Sea-as-safety-trumps-commercial-gains",
        },
      ],
      context:
        "Provides the chronology of two COSCO-operated VLCC passages on July 23–24 and a reported withdrawal decision on July 27.",
      limitation:
        "Specialist reporting may be paywalled and does not make a group-wide policy universal across chartered vessels.",
    },
    {
      id: "notebook-source-risk-cfr",
      role: "Podcast analysis",
      title: "How China Is Quietly Winning the Iran War Energy Crisis",
      publisher: "Council on Foreign Relations",
      retrievedAt: "2026-08-18",
      links: [
        {
          label: "Episode",
          url: "https://www.cfr.org/podcasts/spillover/how-china-is-quietly-winning-the-iran-war-energy-crisis",
        },
      ],
      context:
        "Develops the swing-consumer thesis and an oil-price counterfactual around China's import flexibility.",
      limitation:
        "The price effect is an analytical counterfactual, not a directly observed component of the benchmark price.",
    },
    {
      id: "notebook-source-risk-arctic-podcast",
      role: "Podcast analysis",
      title: "Arctic Shipping and the Northern Sea Route",
      publisher: "The Arctic Institute",
      publishedAt: "2026-04-15",
      retrievedAt: "2026-08-18",
      links: [
        {
          label: "Episode",
          url: "https://www.thearcticinstitute.org/the-circumpolar-podcast-arctic-shipping-northern-sea-route/",
        },
      ],
      context:
        "Expert discussion of operating economics, ice conditions, Russian administration, and China–Russia interdependence.",
      limitation:
        "Interpretation source; it does not verify Sea Legend's individual 2026 sailings.",
    },
    {
      id: "notebook-source-risk-pbs",
      role: "Video analysis",
      title:
        "Russia, China, and Iran: The Future of Global Energy in a World at War",
      publisher: "PBS · Amanpour & Company",
      publishedAt: "2026-04",
      retrievedAt: "2026-08-18",
      links: [
        {
          label: "Video",
          url: "https://www.pbs.org/video/russia-china-and-iran-the-future-of-global-energy-in-a-world-at-war-rdjpdi/",
        },
      ],
      context:
        "A captioned 17-minute expert interview on the energy shock and China–Russia incentives.",
      limitation:
        "An April analytical snapshot, not a source for August vessel movements or completed Arctic voyages.",
    },
    {
      id: "notebook-source-risk-aljazeera",
      role: "Requested explainer",
      title:
        "Can China's new Arctic sea route to Europe replace Middle East chokepoints?",
      publisher: "Al Jazeera",
      publishedAt: "2026-08-18",
      retrievedAt: "2026-08-18",
      links: [
        {
          label: "Explainer",
          url: "https://www.aljazeera.com/news/2026/8/18/can-chinas-new-arctic-sea-route-to-europe-replace-middle-east-chokepoints",
        },
      ],
      context:
        "Frames the Arctic service as a hedge and supplies expert views on its geopolitical significance and scale limits.",
      limitation:
        "Several schedule and transit-time details trace back to Sea Legend's promotion rather than independent voyage evidence.",
    },
    {
      id: "notebook-source-risk-guardian",
      role: "Requested explainer",
      title:
        "China turns to Arctic 'Ice Silk Road' as Middle East routes constrict",
      publisher: "The Guardian",
      publishedAt: "2026-08-17",
      retrievedAt: "2026-08-18",
      links: [
        {
          label: "Report",
          url: "https://www.theguardian.com/world/2026/aug/17/strait-hormuz-alternative-china-ships-north-sea-route-arctic-ice-silk-road",
        },
      ],
      context:
        "Connects the announced service to the contemporary chokepoint crisis and surfaces environmental and Russian-governance risks.",
      limitation:
        "Like other launch coverage, it substantially relies on the operator's schedule and branding.",
    },
    {
      id: "notebook-source-risk-wapo",
      role: "Requested opinion",
      title: "China and Russia are fueling Iran's war machine",
      publisher: "The Washington Post",
      author: "Bradley Bowman and Cameron McMillan",
      publishedAt: "2026-08-18",
      retrievedAt: "2026-08-18",
      links: [
        {
          label: "Opinion",
          url: "https://www.washingtonpost.com/opinions/2026/08/18/china-russia-are-fueling-irans-war-machine/",
        },
      ],
      context:
        "Advances the geopolitical argument connecting PRC-linked procurement and Russian intelligence support to Iran's military capacity.",
      limitation:
        "This is an opinion essay by Foundation for Defense of Democracies authors. Its underlying factual claims are checked against Treasury and AP rather than adopted on authority.",
    },
  ],
  unresolvedQuestion:
    "Can a portfolio designed to buy weeks or months of resilience become a durable system without trading Middle Eastern exposure for deeper dependence on Russian-controlled Arctic infrastructure?",
  limitations: [
    "The war and shipping picture changes daily; this inquiry stops at August 18, 2026.",
    "The interactive map uses schematic corridor geometry, not AIS tracks, navigational routes, security guidance, or proof of a named vessel's movement.",
    "Reuters' STS volumes, company counts, routing guidance, schedules, and margins were not independently reconstructed from proprietary Vortexa, Kpler, or LSEG data.",
    "Chinese inventory figures are EIA estimates because China does not publish a complete government-plus-commercial crude-stock series.",
    "Sea Legend's eight-sailing schedule is operator-derived; announced departures are not treated as completed voyages.",
    "Bellona's permit and shadow-fleet datasets are open-source NGO analyses and require vessel-level audit for sanctions date, ownership, flag, ice class, and completed voyage.",
  ],
}) as MaritimeRiskNotebookEntry;
