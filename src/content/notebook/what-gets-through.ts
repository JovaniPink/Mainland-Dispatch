import { parseCirculationGatesNotebookEntry } from "@/content/notebook/schema";

export const whatGetsThrough = parseCirculationGatesNotebookEntry({
  variant: "circulation-gates",
  ordinal: 6,
  slug: "what-gets-through",
  title: "What Gets Through?",
  subtitle:
    "Rules of origin, networked attention, and national-security law are three different gates on the movement of goods, culture, and public memory.",
  description:
    "A source-audited inquiry into how origin rules, networked attention, and national-security law shape what crosses a border, reaches an audience, or remains publicly sayable.",
  thesis:
    "Rules of origin, networked attention, and national-security law each decide what gets through, but by different authority and with radically different stakes: customs systems classify goods, audiences and cinemas allocate attention, and courts assign criminal meaning to political advocacy. The comparison clarifies those mechanics without treating tariff exposure, box-office visibility, and loss of liberty as morally equivalent.",
  frontPagePreview: {
    finding:
      "Across trade, cinema, and remembrance, circulation depends on institutions that assign origin, attention, and legality; each gate redirects movement without making the three cases equivalent.",
    status: "interpretation",
    caveat:
      "The Canada allegation is contested, global exposure estimates cannot be assigned to Canada, the film figures are dated snapshots, and the Hong Kong convictions remain distinct from later sentencing.",
    sourceIds: [
      "notebook-source-gates-brookings",
      "notebook-source-gates-ap-niulai",
      "notebook-source-gates-judgment",
    ],
  },
  publishedAt: "2026-08-25",
  updatedAt: "2026-08-30",
  readTime: "24 min",
  tags: [
    "US-Canada trade",
    "Rules of origin",
    "Niu Lai",
    "Hong Kong",
    "Public memory",
  ],
  editorialStatus: "published",
  reviewState: "source-reviewed",
  formats: [
    {
      id: "format-gates-china-insider",
      label: "Listen",
      title:
        "China's Role in US-Canada Trade Dispute, Niu Lai Disrupts Chinese Cinema, Hong Kong Court Convicts Tiananmen Activists",
      publisher: "China Insider - Hudson Institute",
      duration: "39:23",
      url: "https://china-insider.simplecast.com/episodes/china-insider-chinas-role-in-us-canada-trade-dispute-niu-lai-disrupts-chinese-cinema-hong-kong-court-convicts-tiananmen-activists-chow-hang-tung-and-lee-cheuk-yan-sQorcjNd",
      retrievedAt: "2026-08-25",
      note: "Episode 195 is the initiating argument. The publisher feed provides the runtime and release record but no transcript or chapter markers, so the three locators below were audited manually against the publisher audio.",
    },
  ],
  audio: {
    sourceId: "notebook-source-gates-episode",
    canonicalUrl:
      "https://china-insider.simplecast.com/episodes/china-insider-chinas-role-in-us-canada-trade-dispute-niu-lai-disrupts-chinese-cinema-hong-kong-court-convicts-tiananmen-activists-chow-hang-tung-and-lee-cheuk-yan-sQorcjNd",
    mediaUrl:
      "https://cdn.simplecast.com/media/audio/transcoded/8ba8b7ea-ada5-4d43-b4dd-cd106ac3d384/c74926bb-1945-46fc-a842-2ee2b1458a55/episodes/audio/group/e1998e38-f95f-4ad3-ae2f-39953c4a6d38/group-item/f5104778-c82b-43f5-b2b5-bcd325b54b19/128_default_tc.mp3",
    publisher: "Simplecast",
    duration: "39:23",
    reviewedAt: "2026-08-25",
    transcriptAvailable: false,
  },
  turningPoints: [
    {
      id: "turning-gates-trade",
      timecode: "01:53",
      endTimecode: "19:59",
      seconds: 113,
      title: "Trade begins with a claim about hidden origin",
      status: "contested",
      argument:
        "Miles Yu frames Canada's lower tariff access for Chinese electric vehicles and the wider bilateral rupture as part of a transshipment problem in which Chinese goods could acquire Canadian treatment before entering the United States.",
      reading:
        "The product concern is identifiable, but access to Canada's market does not itself establish Canadian origin or USMCA eligibility. The official US tariff action cited discrimination involving vehicles and other goods, while Brookings found little sign in 2025 aggregate data of Chinese exports being redirected through Canada or Mexico.",
      sourceIds: [
        "notebook-source-gates-episode",
        "notebook-source-gates-canada-ev",
        "notebook-source-gates-ustr-origin",
        "notebook-source-gates-brookings",
      ],
    },
    {
      id: "turning-gates-culture",
      timecode: "20:48",
      endTimecode: "28:53",
      seconds: 1248,
      title: "Culture turns ridicule into distribution",
      status: "observed",
      argument:
        "The episode treats Niu Lai's reversal from near-empty screenings to viral attendance as evidence that networked curiosity can undo an initial relegation by conventional promotion and cinema scheduling.",
      reading:
        "AP's dated Maoyan figures verify the reversal. They do not verify the episode's smallest first-week estimate, a production budget, or a lifetime-gross rivalry with The Odyssey. On the same August 16 snapshot, Niu Lai made about 6 million yuan and The Odyssey about 65 million yuan.",
      sourceIds: [
        "notebook-source-gates-episode",
        "notebook-source-gates-ap-niulai",
        "notebook-source-gates-sina-box-office",
      ],
    },
    {
      id: "turning-gates-memory",
      timecode: "29:38",
      endTimecode: "38:29",
      seconds: 1778,
      title: "Memory becomes a question of criminal meaning",
      status: "official-position",
      argument:
        "The episode describes the August 21 convictions as a national-security-law judgment against leaders associated with Hong Kong's Tiananmen vigils.",
      reading:
        "The judgment is narrower and more consequential than that shorthand: Lee Cheuk-yan and Chow Hang-tung were convicted of inciting subversion through the Alliance's post-law advocacy of ending one-party dictatorship. The court said the case was not a trial of political belief or June Fourth remembrance alone, yet used earlier remembrance and protest activity as background for intent. Sentencing had not occurred when this Notebook was reviewed.",
      sourceIds: [
        "notebook-source-gates-episode",
        "notebook-source-gates-judgment",
        "notebook-source-gates-hksar-verdict",
        "notebook-source-gates-hrw",
      ],
    },
  ],
  gates: [
    {
      id: "gate-trade",
      domain: "trade",
      subject:
        "Chinese-origin goods, especially the capped flow of electric vehicles admitted to Canada under its 2026 arrangement with China.",
      gatekeeper:
        "Customs authorities, trade ministries, and the governments applying USMCA and domestic tariff law.",
      admissionRule:
        "A good receives preferential treatment only if it satisfies the applicable product-specific rule of origin and origin procedure; shipment through Canada is not enough. Article 32.10 separately governs free-trade agreements with non-market countries.",
      observedMovement:
        "Canada opened a first-year quota of 49,000 China-origin EVs at the 6.1% most-favored-nation rate. The United States declined to renew USMCA in its current form, imposed separate Section 338 tariffs on covered Canadian goods, and published a wider transshipment-risk report.",
      outcome:
        "The policy conflict tightened bilateral trade even though the reviewed public record did not show that the admitted Chinese EVs crossed the US border as Canadian-origin vehicles.",
      status: "contested",
      caveat:
        "The White House report labels Canada a transshipment-risk hub, but its Canada discussion is not tied to a public shipment finding. A private monitor estimated only $724 million for Canada and Mexico combined, while independent aggregate studies found little evidence of large-scale rerouting. None can rule on a concealed shipment.",
      sourceIds: [
        "notebook-source-gates-white-house-transshipment",
        "notebook-source-gates-ustr-origin",
        "notebook-source-gates-usmca-3210",
        "notebook-source-gates-canada-ev",
        "notebook-source-gates-white-house-canada",
        "notebook-source-gates-brookings",
        "notebook-source-gates-usmca-2026",
        "notebook-source-gates-cpa-monitor",
      ],
    },
    {
      id: "gate-culture",
      domain: "culture",
      subject:
        "Niu Lai, an 86-minute Chinese animated film released on August 5, and the attention that determined whether audiences could encounter it.",
      gatekeeper:
        "Distributors and cinemas allocate screens, while social platforms and audiences can abruptly change the demand signal those institutions see.",
      admissionRule:
        "The formal gate is a cinema booking and screening; the practical gate is enough anticipated attention to retain or expand showings in a crowded release window.",
      observedMovement:
        "After about 10,000 yuan across its first 10 days, the film reached 8.2 million yuan and nearly 300,000 admissions on August 17, for a reported 17.1 million yuan cumulative gross that day.",
      outcome:
        "Mockery and curiosity became unpaid distribution: online circulation generated attendance, which generated more cinema availability and still more visibility.",
      status: "observed",
      caveat:
        "These are dated Maoyan snapshots, not a final gross. Same-day evidence on August 16 put Niu Lai near 6 million yuan and The Odyssey near 65 million yuan, so 'rivaled' describes attention or ranking proximity, not equal daily or lifetime revenue.",
      sourceIds: [
        "notebook-source-gates-ap-niulai",
        "notebook-source-gates-sina-box-office",
        "notebook-source-gates-guardian-niulai",
      ],
    },
    {
      id: "gate-memory",
      domain: "memory",
      subject:
        "Post-June 2020 advocacy by the Hong Kong Alliance and its leaders, understood against the Alliance's history of organizing Tiananmen commemorations.",
      gatekeeper:
        "The national-security prosecution and a three-judge Hong Kong Court of First Instance panel applying Articles 22 and 23.",
      admissionRule:
        "The court asked whether the defendants incited others to use force, threat of force, or other unlawful means to subvert state power; it treated advocacy aimed at ending Communist Party leadership outside constitutional amendment as other unlawful means.",
      observedMovement:
        "The court considered post-law statements and activities, used pre-law conduct as background rather than as charged acts, rejected one prosecution theory, accepted another, and convicted Lee, Chow, and the Alliance. Albert Ho had pleaded guilty earlier.",
      outcome:
        "A long-running language of democratic reform and Tiananmen remembrance became evidence in an incitement-to-subversion conviction, narrowing the space in which that public memory can circulate without national-security exposure.",
      status: "official-position",
      caveat:
        "Conviction is not sentencing. The case was adjourned to August 28 for mitigation. The court said it was not criminalizing political belief or commemoration alone, while rights groups argue that the result punishes protected expression and peaceful assembly.",
      sourceIds: [
        "notebook-source-gates-judgment",
        "notebook-source-gates-doj-nsl",
        "notebook-source-gates-hksar-verdict",
        "notebook-source-gates-hrw",
        "notebook-source-gates-un-experts",
      ],
    },
  ],
  tradeProofs: [
    {
      id: "proof-canadian-entry",
      label: "Canadian market entry",
      currentRecord:
        "Canada authorized a first-year quota of up to 49,000 China-origin EVs at the 6.1% MFN tariff rate.",
      proofNeeded:
        "Import permits and entries showing how many quota vehicles actually entered Canada.",
      verdict: "documented",
      sourceIds: ["notebook-source-gates-canada-ev"],
    },
    {
      id: "proof-canadian-production",
      label: "Canadian production or processing",
      currentRecord:
        "The quota concerns China-origin finished vehicles. The reviewed record does not identify a quota vehicle transformed or assembled in Canada for US export.",
      proofNeeded:
        "VIN, plant, bill-of-materials, processing, ownership, and value-added records for the product at issue.",
      verdict: "not-publicly-established",
      sourceIds: [
        "notebook-source-gates-canada-ev",
        "notebook-source-gates-usmca-2026",
      ],
    },
    {
      id: "proof-usmca-origin",
      label: "USMCA origin claim",
      currentRecord:
        "Routing through Canada does not satisfy the vehicle rules of origin. No reviewed record identifies a quota EV certified as originating.",
      proofNeeded:
        "The product-specific regional-value-content calculation, core-parts record, steel and aluminum record, labor-value-content record, and certification.",
      verdict: "not-publicly-established",
      sourceIds: [
        "notebook-source-gates-ustr-origin",
        "notebook-source-gates-usmca-2026",
      ],
    },
    {
      id: "proof-us-entry",
      label: "US customs entry",
      currentRecord:
        "The reviewed public sources do not name a quota vehicle or shipment that entered the United States as Canadian-origin merchandise.",
      proofNeeded:
        "A US customs entry, origin verification, EAPA determination, seizure, penalty, or court record tied to the shipment.",
      verdict: "not-publicly-established",
      sourceIds: [
        "notebook-source-gates-white-house-transshipment",
        "notebook-source-gates-brookings",
      ],
    },
  ],
  tradePressure: [
    {
      id: "pressure-canada-tariffs",
      date: "2024-10-01",
      actor: "Canada",
      action:
        "Applied a 100% surtax to China-made EVs, followed by 25% surtaxes on listed Chinese steel and aluminum products.",
      interpretationLimit:
        "This documents Canadian policy alignment, not the later durability or motive of that alignment.",
      status: "official-position",
      sourceIds: ["notebook-source-gates-canada-china-cycle"],
    },
    {
      id: "pressure-china-retaliation",
      date: "2025-03-20",
      actor: "China",
      action:
        "Applied retaliatory tariffs to Canadian canola products, peas, pork, and aquatic products after an anti-discrimination investigation.",
      interpretationLimit:
        "Target selection can create provincial pressure, but intent to split Canada requires more than the tariff list itself.",
      status: "official-position",
      sourceIds: ["notebook-source-gates-canada-china-cycle"],
    },
    {
      id: "pressure-strategic-partnership",
      date: "2026-01-16",
      actor: "Canada and China",
      action:
        "Announced a new strategic partnership and preliminary trade arrangement, including a capped lower-tariff channel for Chinese EVs.",
      interpretationLimit:
        "An announced arrangement is not implementation, a free-trade agreement, or a US origin ruling.",
      status: "official-position",
      sourceIds: ["notebook-source-gates-canada-ev"],
    },
    {
      id: "pressure-us-drop-off-warning",
      date: "2026-01-24",
      actor: "United States",
      action:
        "The president threatened a 100% tariff and publicly warned that Canada could become a route for Chinese goods into the United States.",
      interpretationLimit:
        "A presidential warning establishes political pressure and perceived risk, not a customs finding or implemented duty.",
      status: "official-position",
      sourceIds: ["notebook-source-gates-trump-warning"],
    },
    {
      id: "pressure-canada-china-reset",
      date: "2026-03-01",
      actor: "Canada and China",
      action:
        "Put reciprocal market-access changes into effect, including Canada's EV quota and Chinese tariff relief for selected Canadian exports.",
      interpretationLimit:
        "A negotiated policy exchange is not a free-trade agreement, an origin ruling, or proof of US entry.",
      status: "official-position",
      sourceIds: [
        "notebook-source-gates-canada-ev",
        "notebook-source-gates-canada-china-cycle",
      ],
    },
    {
      id: "pressure-usmca-review",
      date: "2026-07-01",
      actor: "United States, Canada, and Mexico",
      action:
        "Held the required joint review; the United States did not renew USMCA in its current form, while the agreement remained in force.",
      interpretationLimit:
        "Non-renewal begins continued review and negotiation. It is not immediate termination or proof that the EV arrangement triggered Article 32.10.",
      status: "official-position",
      sourceIds: ["notebook-source-gates-usmca-2026"],
    },
    {
      id: "pressure-us-risk-report",
      date: "2026-08-13",
      actor: "United States",
      action:
        "Published a transshipment-risk report that placed Canada in a top risk tier and called it a developed logistics platform.",
      interpretationLimit:
        "A jurisdictional risk classification is not a public Canada-specific shipment determination.",
      status: "official-position",
      sourceIds: ["notebook-source-gates-white-house-transshipment"],
    },
    {
      id: "pressure-talks-suspended",
      date: "2026-08-21",
      actor: "Canada",
      action:
        "Suspended bilateral negotiations after last-minute US terms that Canada described as unfair and uneconomic.",
      interpretationLimit:
        "Canada's prepared statements emphasize sovereignty and diversification but do not identify a specific China clause or establish the US negotiating motive.",
      status: "official-position",
      sourceIds: ["notebook-source-gates-canada-negotiations"],
    },
    {
      id: "pressure-us-duties",
      date: "2026-08-22",
      actor: "United States",
      action:
        "Put the 50% Section 338 duties into effect on the covered Canadian goods after a short delay.",
      interpretationLimit:
        "The stated legal rationale concerned Canadian discrimination; the action was not an origin adjudication about China.",
      status: "official-position",
      sourceIds: ["notebook-source-gates-white-house-canada"],
    },
    {
      id: "pressure-canada-countertariffs",
      date: "2026-08-25",
      actor: "Canada",
      action:
        "Announced tariffs on C$27.6 billion of US goods, scheduled for September 8 at rates of 15%, 25%, or 50%.",
      interpretationLimit:
        "The measures were announced but not yet active at the August 30 review cutoff.",
      status: "official-position",
      sourceIds: ["notebook-source-gates-canada-countermeasures"],
    },
  ],
  tradeFrames: [
    {
      id: "frame-hudson-analysis",
      record: "Hudson's episode framing",
      sourceClass: "Commentary and analysis",
      says: "China is pivotal to the US-Canada rupture because tariff differences and Canadian access could make Canada a route around US restrictions.",
      establishes:
        "The publisher description and Yu's 2025 transcripts establish a consistent analytical lens: he has previously described the tariffs as aimed at closing Chinese trade loopholes through Canada and Mexico.",
      leavesOpen:
        "The August 25 page has no transcript, so the earlier quotations do not establish his exact 2026 words. Commentary also cannot establish a customs violation without the underlying entry record.",
      sourceIds: [
        "notebook-source-gates-episode",
        "notebook-source-gates-yu-prior",
      ],
    },
    {
      id: "frame-section-338-action",
      record: "The Section 338 action",
      sourceClass: "Official legal rationale",
      says: "The United States imposed 50% additional duties on specified Canadian goods in response to alleged Canadian discrimination involving vehicles, alcohol, dairy, and other products.",
      establishes:
        "The proclamations, their stated rationale, their delayed August 22 effective date, and their scope are official government actions.",
      leavesOpen:
        "The action does not say that a named Chinese shipment acquired Canadian origin improperly. China may be political context without being the stated legal basis of these duties.",
      sourceIds: ["notebook-source-gates-white-house-canada"],
    },
    {
      id: "frame-white-house-risk",
      record: "The transshipment report",
      sourceClass: "Official risk model and allegation",
      says: "Canada is a high-risk logistics platform in a wider network that could enable Chinese goods to evade US tariffs.",
      establishes:
        "The report establishes the administration's risk classification and documents a range of model-, transaction-, and facility-based estimates.",
      leavesOpen:
        "Its Canada discussion is not a public shipment determination. The report says reallocation does not prove illegal transshipment, and its US$34 billion-to-US$303 billion estimates use different methods and are not additive.",
      sourceIds: ["notebook-source-gates-white-house-transshipment"],
    },
    {
      id: "frame-canadian-policy",
      record: "Canada's policy record",
      sourceClass: "Official actions across time",
      says: "Canada first imposed a 100% EV surtax, China-specific metals tariffs, and a melt-and-pour rule, then reopened a capped EV channel while securing Chinese tariff relief.",
      establishes:
        "Canada both restricted China-linked goods and later negotiated selective market access. The record changed rather than moving in one direction.",
      leavesOpen:
        "The sequence does not establish Ottawa's hidden motive, Beijing's intent, actual quota use, Canadian processing of the admitted EVs, or entry into the United States.",
      sourceIds: [
        "notebook-source-gates-canada-china-cycle",
        "notebook-source-gates-canada-origin-measures",
        "notebook-source-gates-canada-ev",
      ],
    },
    {
      id: "frame-brookings-counter",
      record: "The aggregate counter-reading",
      sourceClass: "Independent trade-flow analysis",
      says: "The clearest product-level rerouting signals were through Mexico; the Canada results were mostly little or no direct transshipment, although the authors retain some evidence of broader circumvention.",
      establishes:
        "The trade data constrain an economy-wide claim that Canada became a major direct route after the tariff shock.",
      leavesOpen:
        "Aggregate flows cannot clear a concealed shipment, determine origin, or eliminate lawful Chinese inputs and production as separate policy concerns.",
      sourceIds: ["notebook-source-gates-brookings"],
    },
  ],
  claimAudit: [
    {
      id: "audit-gates-usmca-article",
      claim:
        "USMCA Article 3.2.10 blocks Canada from giving China a route into the US market.",
      status: "corrected",
      decision: "exclude",
      assessment:
        "The episode's article number is wrong. Article 32.10 addresses a party's free-trade agreement with a non-market country; it is not the product rule that decides whether a particular vehicle or component originates in North America. Chapters 4 and 5 govern origin and origin procedures.",
      sourceIds: [
        "notebook-source-gates-episode",
        "notebook-source-gates-usmca-3210",
        "notebook-source-gates-ustr-origin",
      ],
    },
    {
      id: "audit-gates-canada-transshipment",
      claim:
        "Canada is proven to be illegally transshipping Chinese goods into the United States at scale.",
      status: "contested",
      decision: "qualify",
      assessment:
        "The White House places Canada in a high-risk tier and describes possible USMCA origin-shifting, but does not publish a Canada-specific shipment determination in the report. Brookings says 2025 aggregate data showed little sign of Chinese exports being redirected through Canada or Mexico. Aggregate data cannot exclude individual evasion cases.",
      sourceIds: [
        "notebook-source-gates-white-house-transshipment",
        "notebook-source-gates-brookings",
      ],
    },
    {
      id: "audit-gates-ev-quota",
      claim:
        "Canada opened a capped lower-tariff channel for China-origin electric vehicles in 2026.",
      status: "officiallyAnnounced",
      decision: "retain",
      assessment:
        "Canada's official record says the first-year quota was 49,000 vehicles at a 6.1% MFN rate and began March 1. That is Canadian market access, not proof of Canadian origin for later US entry.",
      sourceIds: ["notebook-source-gates-canada-ev"],
    },
    {
      id: "audit-gates-tariff-cause",
      claim:
        "The August US tariffs on Canadian goods were a legal finding that Canada had transshipped Chinese EVs.",
      status: "corrected",
      decision: "exclude",
      assessment:
        "The July White House action invoked Section 338 and described discrimination against US commerce, including motor vehicles. The separate August transshipment report framed a wider enforcement concern. Neither reviewed record is a product-level finding that Chinese EVs entered the US as Canadian goods.",
      sourceIds: [
        "notebook-source-gates-white-house-canada",
        "notebook-source-gates-white-house-transshipment",
      ],
    },
    {
      id: "audit-gates-cpa-scale",
      claim:
        "A $70 billion tariff gap establishes massive Chinese transshipment through Canada.",
      status: "corrected",
      decision: "exclude",
      assessment:
        "The $70 billion figure comes from a Coalition for a Prosperous America model, not a customs finding. Its own breakdown attributes $66 billion to exclusions, bonded-warehouse deferrals, and enforcement shortfalls, and $4 billion to estimated third-country transshipment. The same monitor estimates only $724 million for Canada and Mexico combined and says their volume is comparatively small.",
      sourceIds: ["notebook-source-gates-cpa-monitor"],
    },
    {
      id: "audit-gates-value-added",
      claim:
        "Chinese value added in transport imports from Canada and Mexico rose from 4.5% to 7.1% while US value added fell from 23.1% to 18.3%.",
      status: "corrected",
      decision: "qualify",
      assessment:
        "Those figures in USTR's 2026 report describe Mexico. For Canada, the report gives a smaller Chinese increase from 3.3% to 4.2% and a US decline from 26.3% to 23.9%. In both countries domestic value added also rose. The result supports concern about changing input shares, not a finding of fraudulent Canadian origin.",
      sourceIds: ["notebook-source-gates-usmca-2026"],
    },
    {
      id: "audit-gates-production-fraud",
      claim:
        "Chinese-owned production in a USMCA country is equivalent to illicit transshipment.",
      status: "corrected",
      decision: "exclude",
      assessment:
        "Ownership, imported inputs, lawful production relocation, limited processing, and false origin are different categories. A Federal Reserve staff study of Mexico estimated direct transshipment at less than one percentage point of export gains while Chinese-linked production accounted for about 14 percentage points. The study does not cover Canada and warns that its estimates are bounds rather than firm-level findings.",
      sourceIds: ["notebook-source-gates-fed-mexico"],
    },
    {
      id: "audit-gates-article-trigger",
      claim:
        "Any significant Canada-China economic interaction triggers USMCA Article 32.10.",
      status: "corrected",
      decision: "exclude",
      assessment:
        "Article 32.10 applies to negotiations for, and entry into, a free-trade agreement with a defined non-market country. The reviewed Canada-China records describe a strategic partnership and reciprocal tariff and quota changes, not a completed free-trade agreement or an Article 32.10 determination.",
      sourceIds: [
        "notebook-source-gates-usmca-3210",
        "notebook-source-gates-canada-ev",
      ],
    },
    {
      id: "audit-gates-review-timing",
      claim: "The 2026 USMCA Joint Review is approaching.",
      status: "superseded",
      decision: "qualify",
      assessment:
        "The required review occurred on July 1, 2026. USTR says the United States did not renew the agreement in its current form and that negotiations continue; Canada's readout says the agreement remains fully in force. Non-renewal is not immediate termination.",
      sourceIds: ["notebook-source-gates-usmca-2026"],
    },
    {
      id: "audit-gates-countertariff-timing",
      claim:
        "Canada's August 25 countertariffs were already active at the August 30 review cutoff.",
      status: "corrected",
      decision: "exclude",
      assessment:
        "Canada announced countertariffs on C$27.6 billion of US goods at rates of 15%, 25%, or 50%, with an effective date of September 8. Their implementation remained a future verification point at this cutoff.",
      sourceIds: ["notebook-source-gates-canada-countermeasures"],
    },
    {
      id: "audit-gates-current-transcript",
      claim:
        "Hudson published a full transcript of the August 25, 2026 episode.",
      status: "corrected",
      decision: "exclude",
      assessment:
        "The current Hudson page and Simplecast record provide a description and embedded audio, not a transcript. Earlier Hudson episode pages do contain automatically generated transcripts, which may explain the confusion, but they cannot be substituted for episode 195.",
      sourceIds: [
        "notebook-source-gates-episode",
        "notebook-source-gates-yu-prior",
      ],
    },
    {
      id: "audit-gates-prior-quote-dates",
      claim:
        "Miles Yu made the cited Canada-and-Mexico transshipment statements in February and March 2026 episodes.",
      status: "corrected",
      decision: "qualify",
      assessment:
        "Hudson dates the two transcript pages February 19 and March 11, 2025. They establish continuity in Yu's published argument, not the exact wording of the August 2026 episode.",
      sourceIds: ["notebook-source-gates-yu-prior"],
    },
    {
      id: "audit-gates-tariff-currency",
      claim:
        "The Section 338 tariffs covered about $20 billion of Canadian goods.",
      status: "corrected",
      decision: "qualify",
      assessment:
        "USTR described nearly US$20 billion in annual imports; Canada's response used C$27.6 billion. The two figures are broadly consistent only when the currency and source basis remain attached. They must not be presented as one currency-neutral amount.",
      sourceIds: [
        "notebook-source-gates-white-house-canada",
        "notebook-source-gates-canada-countermeasures",
      ],
    },
    {
      id: "audit-gates-report-estimates",
      claim:
        "The White House report observed US$75 billion in transshipped goods and US$19 billion to US$26 billion in lost tariff revenue.",
      status: "corrected",
      decision: "qualify",
      assessment:
        "The US$75 billion figure is a central model input drawn from Exiger, and the US$19 billion-to-US$26 billion result is an associated federal-revenue-loss estimate. The report's broader US$34 billion-to-US$303 billion range combines different methods and coverage; it is not a count of observed Canadian entries and should not be summed.",
      sourceIds: ["notebook-source-gates-white-house-transshipment"],
    },
    {
      id: "audit-gates-brookings-nuance",
      claim:
        "Brookings found no evidence of any Chinese circumvention through Canada.",
      status: "corrected",
      decision: "qualify",
      assessment:
        "Brookings' executive summary says the evidence is mainly through Mexico, with some evidence of circumvention through Canada. Its high-level and product analyses nevertheless find little or no direct transshipment through Canada in several categories. The distinction between circumvention, Chinese inputs, and direct transshipment should remain visible.",
      sourceIds: ["notebook-source-gates-brookings"],
    },
    {
      id: "audit-gates-enabler-label",
      claim:
        "Canada's trade posture can be summarized as enabling Chinese tariff evasion.",
      status: "contested",
      decision: "qualify",
      assessment:
        "The White House report applies a high-risk enabler frame. Canada's own record also includes a 100% China-EV surtax, 25% China steel and aluminum surtaxes, and a 25% measure covering selected third-country goods containing Chinese-melted steel or Chinese-smelted aluminum. The later EV quota shows selective reopening, not a consistently open or consistently closed posture.",
      sourceIds: [
        "notebook-source-gates-white-house-transshipment",
        "notebook-source-gates-canada-origin-measures",
        "notebook-source-gates-canada-ev",
      ],
    },
    {
      id: "audit-gates-china-intent",
      claim:
        "The record proves that Beijing engineered or actively exploited the US-Canada rupture.",
      status: "contested",
      decision: "qualify",
      assessment:
        "The record establishes reciprocal market access, a new Canada-China strategic partnership, and Canadian diversification during US pressure. Those observable actions create opportunity and strategic leverage. They do not by themselves prove Beijing's private intent or that China caused the Section 338 dispute.",
      sourceIds: [
        "notebook-source-gates-canada-ev",
        "notebook-source-gates-canada-negotiations",
        "notebook-source-gates-white-house-canada",
      ],
    },
    {
      id: "audit-gates-drop-off-warning",
      claim:
        "The January 'drop-off port' warning was proof that Canadian customs had accepted falsely labeled Chinese goods.",
      status: "corrected",
      decision: "qualify",
      assessment:
        "Associated Press reported the president's January 24 warning and threatened 100% tariff after the Canada-China arrangement. That is evidence of the US political signal and perceived risk, not an agency finding about a shipment, origin certificate, or importer.",
      sourceIds: ["notebook-source-gates-trump-warning"],
    },
    {
      id: "audit-gates-china-trade-growth",
      claim:
        "Canada-China trade reached about C$124 billion in 2025 and Canadian exports rose about 13.8%.",
      status: "corrected",
      decision: "qualify",
      assessment:
        "A Canada China Business Council and China Institute report gives C$124.09 billion and 13.8%; later Canadian government pages give C$124.8 billion or C$125.1 billion and 14.7%, reflecting source and revision differences. The Notebook retains official rounded totals for scale and does not use small differences in growth rates as evidence of intent or transshipment.",
      sourceIds: ["notebook-source-gates-canada-trade"],
    },
    {
      id: "audit-gates-niulai-start",
      claim:
        "Niu Lai earned about 10,000 yuan in its first 10 days after an August 5 release.",
      status: "reported",
      decision: "retain",
      assessment:
        "AP reported those dated Maoyan figures and noted that some days were as low as 200 yuan. Other coverage gave approximately 7,700 yuan, so the Notebook preserves AP's rounded denominator rather than manufacturing false precision.",
      sourceIds: [
        "notebook-source-gates-ap-niulai",
        "notebook-source-gates-guardian-niulai",
      ],
    },
    {
      id: "audit-gates-niulai-surge",
      claim:
        "On August 17, Niu Lai made 8.2 million yuan with nearly 300,000 admissions and reached 17.1 million yuan cumulatively.",
      status: "reported",
      decision: "retain",
      assessment:
        "AP attributed the daily, admissions, and cumulative figures to Maoyan. They are a dated snapshot from the film's viral turn, not a final theatrical result or a forecast.",
      sourceIds: ["notebook-source-gates-ap-niulai"],
    },
    {
      id: "audit-gates-niulai-odyssey",
      claim: "Niu Lai matched The Odyssey at the Chinese box office.",
      status: "corrected",
      decision: "exclude",
      assessment:
        "The comparison changes with the denominator. A same-day August 16 preliminary snapshot put Niu Lai at about 6 million yuan and The Odyssey at about 65 million yuan. Guardian's 14.9 million yuan cumulative Niu Lai figure and The Odyssey's 192 million yuan three-day opening are also not equal periods. The credible claim is competition for attention and ranking visibility, not matched gross.",
      sourceIds: [
        "notebook-source-gates-sina-box-office",
        "notebook-source-gates-guardian-niulai",
      ],
    },
    {
      id: "audit-gates-niulai-makers",
      claim:
        "Niu Lai was made over five years by a mother-and-son team of two.",
      status: "reported",
      decision: "qualify",
      assessment:
        "AP attributed the account to Red Star News and explicitly said it could not independently reach the director or verify the claim. It is useful context for the attention story but not an independently established production fact.",
      sourceIds: [
        "notebook-source-gates-ap-niulai",
        "notebook-source-gates-guardian-niulai",
      ],
    },
    {
      id: "audit-gates-vigils-charge",
      claim:
        "Lee Cheuk-yan and Chow Hang-tung were convicted simply for organizing Tiananmen vigils.",
      status: "corrected",
      decision: "qualify",
      assessment:
        "The Alliance's vigil history supplied essential context, but the charged period was July 1, 2020 through September 8, 2021 and the court focused on inciting subversion through the 'End one-party dictatorship' agenda and related post-law conduct. The distinction does not resolve the rights objection; it states the verdict accurately.",
      sourceIds: [
        "notebook-source-gates-judgment",
        "notebook-source-gates-hrw",
      ],
    },
    {
      id: "audit-gates-unlawful-means",
      claim: "The court required proof that the defendants advocated violence.",
      status: "corrected",
      decision: "exclude",
      assessment:
        "Article 22 includes force, threat of force, or other unlawful means. The judgment acknowledged that the defendants did not advocate violence, but held that seeking to end Communist Party leadership outside the constitutional-amendment path qualified as other unlawful means.",
      sourceIds: [
        "notebook-source-gates-judgment",
        "notebook-source-gates-doj-nsl",
      ],
    },
    {
      id: "audit-gates-verdict-scope",
      claim: "The court accepted every prosecution theory of subversion.",
      status: "corrected",
      decision: "qualify",
      assessment:
        "The court rejected the theory that Communist Party leadership could never be changed lawfully because the prosecution had not analyzed the constitutional amendment power. It convicted on the different finding that these defendants were not advocating that lawful route and proved the first prohibited act, but not the separate allegation of overthrowing central organs.",
      sourceIds: ["notebook-source-gates-judgment"],
    },
    {
      id: "audit-gates-sentencing",
      claim: "The August 21 judgment sentenced Lee and Chow.",
      status: "corrected",
      decision: "exclude",
      assessment:
        "August 21 was the verdict. The HKSAR release says the case was adjourned to August 28 for mitigation; Human Rights Watch likewise said sentencing would follow. This Notebook reports convictions only.",
      sourceIds: [
        "notebook-source-gates-hksar-verdict",
        "notebook-source-gates-hrw",
      ],
    },
    {
      id: "audit-gates-rights-position",
      claim:
        "There is one uncontested legal reading of what the verdict means for public memory.",
      status: "contested",
      decision: "qualify",
      assessment:
        "The government says the verdict followed law and evidence without political considerations. The defense argued that the agenda stated a democratic vision without specifying unlawful means. Human Rights Watch and UN experts argue that prosecution under the law violates expression, assembly, association, and legality protections. Those positions are evidence of the institutional dispute, not interchangeable factual findings.",
      sourceIds: [
        "notebook-source-gates-judgment",
        "notebook-source-gates-hksar-verdict",
        "notebook-source-gates-hrw",
        "notebook-source-gates-un-experts",
      ],
    },
  ],
  sections: {
    lens: [
      "The episode's three stories initially look unrelated: a continental trade fight, a mocked animated film, and a national-security verdict. The useful comparison is not China as a common noun. It is circulation as a common problem. Something moves, an institution decides whether that movement counts, and the label attached at the gate changes what happens next.",
      "In trade, the label is origin. A product may physically cross Canada without becoming Canadian for preferential tariff purposes. In culture, the label is relevance. A film that barely exists in the booking system can become visible when ridicule creates demand faster than conventional marketing could. In law, the label is subversion. Political language and commemorative history can be interpreted as incitement, attaching criminal consequence to future circulation.",
      "The analogy stops at mechanism. A tariff classification affects price and access; an attention cascade affects screens and audience; a criminal conviction affects liberty and civic space. Putting them in one diagram is a way to identify gatekeeper, rule, movement, and outcome. It is not a claim of equal harm, equal legitimacy, or equal moral weight.",
    ],
    trade: [
      "The trade gate has at least six layers that the initiating argument compresses: tariff exposure, physical routing, productive investment, legal origin, a customs claim, and an enforcement finding. Each answers a different question. Calling all six 'transshipment' makes the case sound complete before the proof has begun.",
      "The Hudson episode is commentary and analysis, not a neutral adjudication. Its publisher description verifies the topic, and manually reviewed audio verifies the segment boundaries. The current Hudson and Simplecast pages do not provide a transcript. Two earlier Hudson transcripts show that Yu used the same Canada-and-Mexico trade-loophole frame in February and March 2025, not 2026; those pages establish continuity in his analysis but cannot supply exact words for episode 195.",
      "Official records identify a product-specific concern. Canada's 2026 arrangement allowed up to 49,000 China-origin EVs into Canada in the first year at the 6.1% most-favored-nation rate. But a China-origin vehicle does not become USMCA-originating because it is parked, sold, or lightly handled in Canada. The 2026 USTR autos report records the same quota while separately describing regional-value-content, core-parts, steel and aluminum, labor-value-content, certification, and verification requirements.",
      "Canada's posture cannot be reduced to one label. It imposed a 100% China-EV surtax and 25% China metals surtaxes in 2024, then added a 25% measure for selected non-US goods containing steel melted and poured or aluminum smelted and cast in China in July 2025. The 2026 arrangement selectively reopened a capped EV channel while securing relief for Canadian exports. That is a change in bargaining and market access, not proof that Canada abandoned origin enforcement.",
      "The White House report contains both an explicit allegation and explicit limits. It puts Canada in a top risk tier and treats it as a developed logistics platform, but says shifted trade does not establish that all displaced Chinese trade was illegally transshipped. Its central US$75 billion case is a model input, the associated US$19 billion-to-US$26 billion loss is an estimate, and the wider US$34 billion-to-US$303 billion range joins methods with different coverage. None is a Canada shipment count.",
      "The new quantitative claims need denominator discipline. A private Coalition for a Prosperous America monitor estimates a $70 billion gap between prescribed tariffs on Chinese imports and collections, but assigns $66 billion to US exclusions, deferrals, and enforcement choices and $4 billion to estimated third-country transshipment. Its estimate for Canada and Mexico combined is $724 million, which it calls comparatively small. A global or seventeen-market exposure estimate cannot be restated as proof about Canada.",
      "The same problem appears in the value-added figures. USTR reports that Chinese value added in transport equipment imported from Mexico rose from 4.5% in 2017 to 7.1% in 2024 while US value added fell from 23.1% to 18.3%. Canada follows a smaller pattern: Chinese value added rose from 3.3% to 4.2%, US value added fell from 26.3% to 23.9%, and Canadian value added rose from 49.5% to 52.7%. That is evidence of changing input shares, not a finding that Canada falsified origin.",
      "A Federal Reserve staff study makes the distinction sharper, although its subject is Mexico rather than Canada. It estimates direct transshipment at less than one percentage point of Mexico's export gains to the United States and Chinese-linked production or processing at about 14 percentage points. The authors treat those estimates as bounds and say the data do not support large-scale direct transshipment. The finding strengthens the policy question about Chinese production inside a lower-tariff country while weakening the claim that relocation and customs fraud are the same thing.",
      "Article 32.10 also cannot carry the broader conclusion. It requires notice and review when a party negotiates a free-trade agreement with a defined non-market country and permits termination after such an agreement is entered. The public Canada-China records describe a strategic partnership, an EV quota, and reciprocal tariff relief. They do not identify a completed free-trade agreement or an Article 32.10 determination.",
      "The political pressure is still substantial. Canada erected tariffs in 2024; China retaliated against selected Canadian exports in 2025; Canada and China partially reset market access in 2026; and the United States declined to renew USMCA in its current form at the July 1 review. The July Section 338 action and Canada's announced August countermeasures then deepened the bilateral rupture. Yet the stated Section 338 rationale concerned discrimination involving cars, alcohol, and dairy, and Canada's countertariffs were not scheduled to begin until September 8.",
      "The amounts need their currency labels. USTR described nearly US$20 billion in affected annual Canadian imports; Canada described the US measures and its response as C$27.6 billion. The figures are compatible at a broad exchange-rate level, but only if their units and institutional sources remain attached. A currency-neutral '$20 billion' formulation is too ambiguous for a source-led account.",
      "The counter-reading does not establish that evasion is impossible. The White House identifies a wider global risk, while Brookings found little evidence of large-scale redirection through Canada and the private monitor assigns the largest estimated exposure to ASEAN. Aggregate data can miss a product corridor; an enforcement case in Thailand or Mexico cannot prove a Canadian corridor. Across the reviewed sources, tariff differences create incentives, Chinese production and inputs complicate North American de-risking, and the public record still lacks the Canada-specific customs evidence needed to call the EV quota a back door into the United States.",
    ],
    culture: [
      "Niu Lai passed its formal release gate on August 5 but initially failed the practical gate of attention. AP reported about 10,000 yuan across its first 10 days, with some days near 200 yuan. Online mockery then changed the information available to audiences and cinemas: being described as unusually crude became a reason to see it, post about it, and schedule it.",
      "The dated turn is striking without exaggeration. AP's August 18 report, citing Maoyan, placed the previous Monday's daily gross at 8.2 million yuan, nearly 300,000 admissions, and a 17.1 million yuan cumulative gross. The denominator matters. The 8.2 million is one day; the 17.1 million is cumulative to that date; neither is a final run or the forecast the episode mentions.",
      "The Odyssey comparison is where a metaphor became a number it could not support. A preliminary August 16 national snapshot republished by the Movie Box Office account showed Niu Lai near 6 million yuan and The Odyssey near 65 million yuan on the same day. Guardian's later story placed Niu Lai above 14.9 million yuan cumulatively and The Odyssey at 192 million yuan across its three-day opening weekend, which is not a like-for-like period either. Niu Lai entered the same conversation and rankings, but did not match the blockbuster's daily or lifetime gross in the reviewed evidence.",
      "What got through was not quality as judged by the episode, nor a conventional campaign. It was a self-reinforcing attention signal: ridicule produced curiosity, curiosity produced tickets, and tickets produced screens. That loop can reverse relegation, but it does not make every viral film durable and it does not establish unverified claims about the film's budget, creators, or final return.",
    ],
    memory: [
      "The memory gate requires the most exact language. The Alliance organized Hong Kong's Tiananmen vigils for decades, and Lee Cheuk-yan and Chow Hang-tung were identified with that work. But [2026] HKCFI 4794 was an incitement-to-subversion case under Articles 22 and 23, focused on conduct after the national-security law took effect and on the Alliance's 'End one-party dictatorship' agenda. Calling it only a vigil conviction hides the legal route the court used; removing the vigil history hides why the verdict changes the public space for remembrance.",
      "The defense argued that the slogan expressed an objective of democratization that could be achieved peacefully and lawfully through constitutional change, and that no specific unlawful means had been advocated. The court did not accept the prosecution's broadest constitutional theory: it said the National People's Congress has amendment power and the prosecution had not shown that Communist Party leadership was incapable of lawful change. It instead found that these defendants were not advocating that route and treated their stance, messages, and use of Tiananmen and 2019 protest history as encouragement to pursue the objective outside it.",
      "The judgment said no violence was advocated. It nevertheless treated action contrary to the constitutional order as 'other unlawful means,' found intent to stir hostility and undermine public confidence in Communist Party leadership, convicted Lee and Chow, and attributed liability to the Alliance. It found the first alleged prohibited act proved but said the evidence was insufficient for the separate allegation of overthrowing central organs. Albert Ho had pleaded guilty earlier.",
      "The government welcomed the verdict as a sound application of law without political considerations. Human Rights Watch argues that it criminalizes protected expression and peaceful assembly. UN experts had already raised concerns about vague unlawful-means allegations, pretrial detention, and compatibility with the ICCPR. The institutional disagreement is not a side note: it identifies the gate itself. The court and government define constitutional security as the admission rule; the defense and rights analysis argue that expression, assembly, legality, and proportionality should constrain it.",
      "The temporal boundary is equally important. The court said the law was not retrospective; pre-July 2020 conduct could be background for interpreting post-law words and intent but not the charged act itself. And August 21 was a conviction date, not a sentencing date. The case was adjourned to August 28 for mitigation. The outcome reviewed here is therefore guilty verdicts and an altered civic signal, not a prison term handed down in this judgment.",
    ],
    limits: [
      "All three gates classify movement, but their authority differs. Customs law can be challenged with product records and origin calculations. A cultural attention loop has no single sovereign and can reverse within hours. National-security law gives state institutions coercive power over speech, association, and liberty. A shared vocabulary of gatekeeping should sharpen those differences, not flatten them.",
      "The comparison also does not prove one master theory of China. The trade gate is a US-Canada legal and political dispute in which China is the alleged origin and strategic pressure. The culture gate emerged from Chinese audiences, platforms, distributors, and cinemas rather than a single state command. The memory gate is an exercise of public law and judicial authority in Hong Kong. The relevant actors, evidence, and remedies are not interchangeable.",
      "Finally, circulation is not automatically good or bad. Origin rules can prevent preference laundering or become a vehicle for broader protection. Networked attention can rescue overlooked work or reward spectacle. Law can protect public order or narrow legitimate expression. The Notebook's question is prior to endorsement: who controls the gate, what rule is applied, what movement is observed, and what claim remains unproved?",
    ],
    changed: [
      "After separating the episode's broad claims, the record shows China operating differently in each story rather than as one universal hidden hand. In trade it is an origin and policy concern filtered through North American law. In cinema it is the setting for an audience-led attention reversal. In Hong Kong it is the constitutional order the court treated as protected by national-security law.",
      "The source audit turns 'what gets through' into a chain of evidence questions rather than a slogan. Physical movement is not legal origin. Viral proximity is not equal gross. Association with vigils is not the exact charge, even when remembrance is central to the civic consequence. The gate becomes visible when those distinctions are kept intact.",
      "The added trade record separates a stream of finished Chinese goods wearing Canadian labels from the policy boundary between legitimate North American production, growing Chinese input shares, Chinese-owned capacity, minimal processing, and fraud. A tariff can target all five politically, but customs law still has to distinguish them.",
      "The records also show Ottawa balancing an integrated US market, domestic auto investment, agricultural and coastal export exposure, consumer prices, and room to negotiate with Beijing. Washington treats those trade-offs as an economic-security risk; that position is distinct from proof that Canada intended to launder origin.",
      "China's pivotal role is therefore supported at the level of structure, not adjudicated intent. The Canada-China arrangement changed the bargaining environment; US officials openly linked China to origin and transshipment risk; and Ottawa described diversification as a standing strategy. Those facts do not establish that Beijing engineered the bilateral rupture or that a covered good violated US origin law.",
    ],
  },
  sourceTrail: [
    {
      id: "notebook-source-gates-episode",
      role: "Initiating audio - publisher record",
      title:
        "China Insider episode 195: US-Canada trade, Niu Lai, and the Hong Kong verdict",
      publisher: "Hudson Institute - Simplecast",
      publishedAt: "2026-08-25",
      retrievedAt: "2026-08-30",
      links: [
        {
          label: "Read Hudson episode page",
          url: "https://www.hudson.org/foreign-policy/chinas-role-us-canada-trade-dispute-niu-lai-disrupts-chinese-cinema-hong-kong-court",
        },
        {
          label: "Open canonical episode",
          url: "https://china-insider.simplecast.com/episodes/china-insider-chinas-role-in-us-canada-trade-dispute-niu-lai-disrupts-chinese-cinema-hong-kong-court-convicts-tiananmen-activists-chow-hang-tung-and-lee-cheuk-yan-sQorcjNd",
        },
        {
          label: "Inspect publisher RSS",
          url: "https://feeds.simplecast.com/_0hNEGsX",
        },
      ],
      context:
        "The RSS record identifies episode 195, an August 25, 2026 release, and a 39:23 runtime. The full publisher audio was reviewed manually and mapped to 01:53, 20:48, and 29:38 segment starts.",
      limitation:
        "No Hudson or Simplecast transcript or chapter record was located through August 30. The publisher audio controls; the supplied synopsis and local audit notes are not evidence links.",
    },
    {
      id: "notebook-source-gates-yu-prior",
      role: "Initiating analyst - prior transcript record",
      title: "Miles Yu's earlier Canada-and-Mexico transshipment framing",
      publisher: "Hudson Institute",
      publishedAt: "2025-02-19",
      retrievedAt: "2026-08-30",
      links: [
        {
          label: "Read February 2025 transcript",
          url: "https://www.hudson.org/national-security-defense/china-insider-revisiting-us-transatlantic-relationship-new-reciprocal-miles-yu",
        },
        {
          label: "Read March 2025 transcript",
          url: "https://www.hudson.org/economics/china-insider-us-tariffs-beijings-wolf-warrior-rhetoric-chinas-two-sessions-miles-yu",
        },
      ],
      context:
        "The automatically generated transcripts show Yu arguing in February and March 2025 that China could exploit tariff differences and USMCA access through Canada and Mexico.",
      limitation:
        "The pages are dated 2025, not 2026, and both warn that their transcripts are automatically generated and lightly edited. They establish continuity in Yu's published analysis, not exact wording in episode 195.",
    },
    {
      id: "notebook-source-gates-white-house-transshipment",
      role: "Official allegation - methodology",
      title: "The Great Transshipment Scam",
      publisher: "The White House",
      publishedAt: "2026-08-13",
      retrievedAt: "2026-08-30",
      links: [
        {
          label: "Read official report",
          url: "https://www.whitehouse.gov/wp-content/uploads/2026/08/The-Great-Transshipment-Scam.pdf",
        },
      ],
      context:
        "The report places Canada in a diversified high-risk tier, describes possible improper USMCA treatment, and distinguishes model-based, product-screen, transaction, and facility-level estimates. It gives an overall estimate range of roughly US$40 billion to US$303 billion and says the methods are not additive or directly comparable.",
      limitation:
        "Its Canada passages are risk claims, not a public Canada-specific shipment determination. The report says shifted trade does not prove all displaced Chinese trade was illegally transshipped, and labels its central economic effects model-based rather than observed.",
    },
    {
      id: "notebook-source-gates-ustr-origin",
      role: "Primary legal context - origin rule",
      title: "Rules of Origin and the USMCA text",
      publisher: "Office of the United States Trade Representative",
      retrievedAt: "2026-08-25",
      links: [
        {
          label: "Read origin overview",
          url: "https://ustr.gov/issue-areas/industry-manufacturing/industrial-tariffs/rules-origin",
        },
        {
          label: "Open USMCA chapters",
          url: "https://ustr.gov/trade-agreements/free-trade-agreements/united-states-mexico-canada-agreement/agreement-between",
        },
      ],
      context:
        "USTR states that rules of origin determine whether a good qualifies for preferential FTA treatment. USMCA Chapters 4 and 5 provide origin and origin-procedure rules, with product-specific requirements in the annexes.",
      limitation:
        "This Notebook does not perform a vehicle-specific regional-value-content calculation or decide an entry without a shipment and production record.",
    },
    {
      id: "notebook-source-gates-usmca-3210",
      role: "Primary treaty text - correction",
      title: "USMCA Chapter 32: Exceptions and General Provisions",
      publisher: "Office of the United States Trade Representative",
      retrievedAt: "2026-08-25",
      links: [
        {
          label: "Read Article 32.10",
          url: "https://ustr.gov/sites/default/files/files/agreements/FTA/USMCA/Text/32_Exceptions_and_General_Provisions.pdf",
        },
      ],
      context:
        "Article 32.10 requires notice and review around a party's free-trade agreement with a non-market country and permits the other parties to terminate USMCA on six months' notice after such an agreement enters.",
      limitation:
        "It is not Article '3.2.10,' and it is not the product-specific origin rule for a particular EV or component.",
    },
    {
      id: "notebook-source-gates-canada-ev",
      role: "Primary policy record - product channel",
      title: "Canada-China electric-vehicle quota and tariff arrangement",
      publisher: "Prime Minister of Canada",
      publishedAt: "2026-01-16",
      retrievedAt: "2026-08-30",
      links: [
        {
          label: "Read strategic-partnership release",
          url: "https://www.pm.gc.ca/en/news/news-releases/2026/01/16/prime-minister-carney-forges-new-strategic-partnership-peoples",
        },
        {
          label: "Read official remarks",
          url: "https://www.pm.gc.ca/en/news/speeches/2026/01/16/prime-minister-carney-delivers-remarks-after-forging-new-strategic",
        },
        {
          label: "Read implementation record",
          url: "https://www.canada.ca/en/global-affairs/news/2026/03/canada-secures-renewed-market-access-with-china-to-boost-exports-and-strengthen-economic-collaboration.html",
        },
      ],
      context:
        "The January release calls the relationship a new strategic partnership and says Canada would allow up to 49,000 China-origin EVs in the first year at the 6.1% MFN rate. The March record says China suspended tariffs on canola meal, peas, lobster, and crab and reduced the combined canola-seed rate to 14.9% from almost 85%.",
      limitation:
        "Canadian admission does not confer Canadian origin for US customs purposes and is not evidence that any covered vehicle was later transshipped.",
    },
    {
      id: "notebook-source-gates-white-house-canada",
      role: "Official enforcement position - tariff action",
      title:
        "Fact Sheet: President Donald J. Trump Imposes Additional Tariffs on Canada",
      publisher: "The White House",
      publishedAt: "2026-07-20",
      retrievedAt: "2026-08-30",
      links: [
        {
          label: "Read tariff fact sheet",
          url: "https://www.whitehouse.gov/fact-sheets/2026/07/fact-sheet-president-donald-j-trump-imposes-additional-tariffs-on-canada/",
        },
        {
          label: "Read USTR scope statement",
          url: "https://ustr.gov/about/policy-offices/press-office/press-releases/2026/july/ambassador-greer-issues-statement-president-trump-imposing-section-338-tariffs-canada",
        },
        {
          label: "Read effective-date change",
          url: "https://www.whitehouse.gov/presidential-actions/2026/08/temporary-suspension-of-additional-duties-to-offset-canadian-discrimination-against-the-commerce-of-the-united-states-with-respect-to-alcoholic-beverages-dairy-and-motor-vehicles/",
        },
      ],
      context:
        "The administration described three Section 338 proclamations imposing 50% duties on covered Canadian imports in response to alleged discrimination involving cars, alcohol, dairy, and other products. USTR described nearly US$20 billion in annual imports, and the effective date was moved to August 22.",
      limitation:
        "The action applies regardless of USMCA origin and is not itself an origin determination or proof of Chinese transshipment.",
    },
    {
      id: "notebook-source-gates-brookings",
      role: "Counter-reading - aggregate trade",
      title: "Brookings analyses of tariff circumvention through North America",
      publisher: "Brookings Institution",
      publishedAt: "2026-03",
      retrievedAt: "2026-08-30",
      links: [
        {
          label: "Read 2025 product analysis",
          url: "https://www.brookings.edu/articles/is-china-circumventing-us-tariffs-via-mexico-and-canada/",
        },
        {
          label: "Read 2026 report",
          url: "https://www.brookings.edu/wp-content/uploads/2026/03/USMCA-Forward-2026.pdf",
        },
      ],
      context:
        "The 2025 analysis says evidence of circumvention was mainly through Mexico, with some evidence through Canada, while its high-level and product sections found little or no direct Canada transshipment in several categories. The later report says 2025 data showed little sign of redirection to Canada or Mexico and records a 3.2% rise in China's exports to Canada against 5.5% overall export growth.",
      limitation:
        "The analyses use aggregate and product-level trade patterns rather than customs adjudications. They can constrain an economy-wide narrative but cannot disprove a hidden shipment, firm, or product corridor.",
    },
    {
      id: "notebook-source-gates-canada-china-cycle",
      role: "Primary chronology - tariff and retaliation cycle",
      title: "Canada-China tariff measures and reciprocal market access",
      publisher: "Government of Canada",
      publishedAt: "2024-08-26",
      retrievedAt: "2026-08-30",
      links: [
        {
          label: "Read Canada's 2024 measures",
          url: "https://www.canada.ca/en/department-finance/news/2024/08/canada-implementing-measures-to-protect-canadian-workers-and-key-economic-sectors-from-unfair-chinese-trade-practices.html",
        },
        {
          label: "Read Canada's 2025 response",
          url: "https://www.canada.ca/en/global-affairs/news/2025/03/statement-by-ministers-ng-macaulay-and-lebouthillier-on-chinas-anti-discrimination-investigation.html",
        },
        {
          label: "Read the 2026 market-access record",
          url: "https://www.canada.ca/en/global-affairs/news/2026/03/canada-secures-renewed-market-access-with-china-to-boost-exports-and-strengthen-economic-collaboration.html",
        },
      ],
      context:
        "The records establish Canada's 2024 EV and metals surtaxes, China's March 2025 retaliatory tariffs on selected Canadian exports, and the March 2026 implementation of reciprocal market-access changes.",
      limitation:
        "The sequence documents policy pressure and concessions. It does not independently prove Beijing's political intent, Canada's motive, or any later US customs violation.",
    },
    {
      id: "notebook-source-gates-canada-origin-measures",
      role: "Primary policy record - China-linked metals",
      title: "Canada's steel and aluminum tariff measures",
      publisher: "Department of Finance Canada",
      publishedAt: "2025-07-31",
      retrievedAt: "2026-08-30",
      links: [
        {
          label: "Read current tariff summary",
          url: "https://www.canada.ca/en/department-finance/programs/international-trade-finance-policy/canadas-tariff-responses/canadas-tariffs-steel-aluminum.html",
        },
        {
          label: "Read 2025 steel-sector announcement",
          url: "https://www.canada.ca/en/department-finance/news/2025/07/support-for-the-canadian-steel-sector.html",
        },
      ],
      context:
        "Canada's current summary records 25% surtaxes on listed Chinese steel and aluminum from October 2024 and, from July 31, 2025, on selected non-US imports containing steel melted and poured or aluminum smelted and cast in China.",
      limitation:
        "The measures include product scope, ordering, and exemptions. They show that Canada adopted China-linked origin controls; they do not establish compliance in every entry or the later durability of the policy.",
    },
    {
      id: "notebook-source-gates-usmca-2026",
      role: "Primary current status - review and auto-content record",
      title: "2026 USMCA Joint Review and automotive report",
      publisher: "USTR and Global Affairs Canada",
      publishedAt: "2026-07-01",
      retrievedAt: "2026-08-30",
      links: [
        {
          label: "Read USTR review statement",
          url: "https://ustr.gov/about/policy-offices/press-office/press-releases/2026/july/ambassador-greer-issues-statement-usmca-joint-review",
        },
        {
          label: "Read USTR autos report",
          url: "https://ustr.gov/sites/default/files/files/agreements/FTA/USMCA/2026%20USMCA%20Autos%20Report%20to%20Congress_070126.pdf",
        },
        {
          label: "Read Canada's review update",
          url: "https://www.canada.ca/en/global-affairs/news/2026/07/minister-leblanc-updates-provincial-and-territorial-ministers-responsible-for-international-trade-on-cusma-joint-review.html",
        },
      ],
      context:
        "USTR says the United States did not renew USMCA in its current form on July 1 but that the agreement remains in force while talks continue. Canada's readout likewise says it remains in force. The autos report separately documents vehicle rules, value-added trends, and the Chinese EV quota.",
      limitation:
        "The autos report combines USTR analysis with cited industry estimates and stakeholder positions. Non-renewal at the first review is not immediate termination.",
    },
    {
      id: "notebook-source-gates-cpa-monitor",
      role: "Advocacy analysis - modeled exposure",
      title: "Washington's $70 Billion in Lost Protection",
      publisher: "Coalition for a Prosperous America",
      publishedAt: "2026-06-22",
      retrievedAt: "2026-08-30",
      links: [
        {
          label: "Read monitor and methodology",
          url: "https://prosperousamerica.org/washingtons-70-billion-in-lost-protection-liberation-day-one-year-later/",
        },
      ],
      context:
        "The monitor estimates a $70 billion tariff-collection gap, assigns $66 billion to structural leakage and $4 billion to third-country transshipment, and estimates $724 million for Canada and Mexico combined.",
      limitation:
        "This is an advocacy organization's statistical model, not an official customs determination. Its $14 billion exposure screen, $4 billion estimated revenue effect, and $70 billion total gap are different measures and must not be added or assigned to Canada.",
    },
    {
      id: "notebook-source-gates-fed-mexico",
      role: "Independent official research - channel distinction",
      title: "Mexico in U.S. Supply Chains: Lessons from 2018-19 Tariffs",
      publisher: "Federal Reserve Board staff",
      publishedAt: "2026-06-05",
      retrievedAt: "2026-08-30",
      links: [
        {
          label: "Read Federal Reserve staff analysis",
          url: "https://www.federalreserve.gov/econres/notes/feds-notes/mexico-in-u-s-supply-chains-lessons-from-2018-19-tariffs-20260605.html",
        },
      ],
      context:
        "The authors estimate direct Chinese transshipment at less than one percentage point of Mexico's US export gains and Chinese-linked production or processing at about 14 percentage points.",
      limitation:
        "The study concerns Mexico, not Canada; uses trade, input-output, and FDI data rather than firm ownership or customs files; and describes its estimates as informative bounds.",
    },
    {
      id: "notebook-source-gates-canada-countermeasures",
      role: "Primary policy record - announced countertariffs",
      title: "Canadian countermeasures in response to US tariffs",
      publisher: "Department of Finance Canada",
      publishedAt: "2026-08-25",
      retrievedAt: "2026-08-30",
      links: [
        {
          label: "Read countermeasures release",
          url: "https://www.canada.ca/en/department-finance/news/2026/08/canada-announces-targeted-countermeasures-and-substantive-support-for-workers-and-businesses-in-response-to-us-tariffs.html",
        },
      ],
      context:
        "Canada announced tariffs at 15%, 25%, or 50% on C$27.6 billion of US goods, scheduled to take effect September 8, 2026.",
      limitation:
        "At the August 30 review cutoff, these measures were announced but not yet effective. Later implementation requires a new source check.",
    },
    {
      id: "notebook-source-gates-canada-negotiations",
      role: "Primary chronology - suspended negotiations",
      title: "Prime Minister Carney's Canada-US trade statements",
      publisher: "Prime Minister of Canada",
      publishedAt: "2026-08-21",
      retrievedAt: "2026-08-30",
      links: [
        {
          label: "Read August 21 statement",
          url: "https://www.pm.gc.ca/en/news/statements/2026/08/21/statement-prime-minister-carney-canada-us-trade-negotiations",
        },
        {
          label: "Read August 22 remarks",
          url: "https://www.pm.gc.ca/en/news/speeches/2026/08/22/prime-minister-carney-delivers-remarks-canada-us-trade-negotiations",
        },
      ],
      context:
        "The statements document the August 21 suspension after last-minute US terms that Canada described as unfair and uneconomic. The prepared remarks emphasize flexibility, sovereignty, French language and culture, diversification, and dollar-for-dollar countertariffs.",
      limitation:
        "These are Canada's official account of negotiations, not an agreed bilateral record. The prepared text does not identify a specific China clause, and it cannot establish the other side's motive.",
    },
    {
      id: "notebook-source-gates-trump-warning",
      role: "Independent reporting - presidential warning",
      title: "Trump threatens Canada with tariffs over the China arrangement",
      publisher: "Associated Press",
      publishedAt: "2026-01-24",
      retrievedAt: "2026-08-30",
      links: [
        {
          label: "Read AP national-security trial report",
          url: "https://apnews.com/article/5079e910df071b45d2b16949efb8f11a",
        },
      ],
      context:
        "AP reported the president's threat of a 100% tariff and his warning that Canada could become a route for Chinese goods after the January Canada-China arrangement.",
      limitation:
        "This establishes a public political warning reported from a social-media post. It is not a customs finding, implemented tariff action, or verified account of Canadian origin practices.",
    },
    {
      id: "notebook-source-gates-canada-trade",
      role: "Official and institutional data - bilateral scale",
      title: "Canada-China merchandise trade in 2025",
      publisher: "Government of Canada and Canada China Business Council",
      publishedAt: "2026-03-04",
      retrievedAt: "2026-08-30",
      links: [
        {
          label: "Read Global Affairs Canada release",
          url: "https://www.canada.ca/en/global-affairs/news/2026/03/canada-secures-renewed-market-access-with-china-to-boost-exports-and-strengthen-economic-collaboration.html",
        },
        {
          label: "Read Canada government June update",
          url: "https://www.canada.ca/en/innovation-science-economic-development/news/2026/06/minister-joly-to-travel-to-china-and-japan-to-advance-canadian-interests-abroad.html",
        },
        {
          label: "Read CCBC year-in-review",
          url: "https://ccbc.com/ccbc-update/canada-china-trade-2025-year-in-review/",
        },
      ],
      context:
        "The sources put 2025 two-way merchandise trade near C$124 billion to C$125 billion. The institutional report gives 4.9% total growth and 13.8% Canadian-export growth; a later federal page gives 5.2% and 14.7%.",
      limitation:
        "The differing totals reflect dataset, basis, timing, or revision choices. These figures document scale and growth, not causation, intent, origin fraud, or the direction of any specific shipment.",
    },
    {
      id: "notebook-source-gates-ap-niulai",
      role: "Independent reporting - dated Maoyan snapshot",
      title:
        "A Chinese animated film mocked as terrible becomes a box-office hit",
      publisher: "Associated Press",
      author: "Fu Ting",
      publishedAt: "2026-08-18",
      retrievedAt: "2026-08-25",
      links: [
        {
          label: "Read AP Niu Lai report",
          url: "https://apnews.com/article/80a25ad38005f5c6200715a37b704bea",
        },
      ],
      context:
        "AP attributes to Maoyan about 10,000 yuan over Niu Lai's first 10 days, 8.2 million yuan on Monday August 17, nearly 300,000 admissions that day, and 17.1 million yuan cumulatively.",
      limitation:
        "AP could not independently verify the separate report that two people made the film. The figures are dated, rounded, and not a final gross.",
    },
    {
      id: "notebook-source-gates-sina-box-office",
      role: "Dated market snapshot - same-day comparison",
      title: "August 16 preliminary daily box-office report",
      publisher: "Movie Box Office - Sina",
      publishedAt: "2026-08-16",
      retrievedAt: "2026-08-25",
      links: [
        {
          label: "Inspect dated feed",
          url: "https://www.sina.cn/media/1864135524",
        },
      ],
      context:
        "The dated post attributes preliminary national data to the China Film Special Fund office and lists Niu Lai near 6 million yuan and The Odyssey near 65 million yuan on August 16.",
      limitation:
        "This is a republished preliminary snapshot in a rolling social feed, not a stable official database table or a final audited market total.",
    },
    {
      id: "notebook-source-gates-guardian-niulai",
      role: "Independent reporting - denominator check",
      title:
        "Derided low-tech animation Niu Lai rivals blockbusters at Chinese box office",
      publisher: "The Guardian",
      author: "Amy Hawkins",
      publishedAt: "2026-08-18",
      retrievedAt: "2026-08-25",
      links: [
        {
          label: "Read report",
          url: "https://www.theguardian.com/world/2026/aug/17/niu-lai-derided-animated-film-challenges-blockbusters-at-chinese-box-office",
        },
      ],
      context:
        "The report records the film's August 5 release, 86-minute runtime, first-10-day relegation, later 14.9 million yuan cumulative figure, and The Odyssey's 192 million yuan three-day China opening.",
      limitation:
        "Those cumulative and opening-weekend figures cover different periods. The headline's 'rivals' language should not be converted into equal gross.",
    },
    {
      id: "notebook-source-gates-judgment",
      role: "Primary law - reasons for verdict",
      title: "HKSAR v Hong Kong Alliance and others [2026] HKCFI 4794",
      publisher: "Hong Kong Judiciary - Court of First Instance",
      publishedAt: "2026-08-21",
      retrievedAt: "2026-08-25",
      links: [
        {
          label: "Read official judgment",
          url: "https://legalref.judiciary.hk/lrs/common/ju/ju_frame.jsp?DIS=184180&currpage=T",
        },
      ],
      context:
        "The 498-paragraph reasons define the charge, record the defense, reject one prosecution constitutional theory, apply Articles 22 and 23, distinguish pre-law background from post-law acts, and convict Lee, Chow, and the Alliance.",
      limitation:
        "The posted judgment is in Traditional Chinese. This Notebook paraphrases the reviewed reasons and does not substitute for legal advice or an authorized English translation.",
    },
    {
      id: "notebook-source-gates-doj-nsl",
      role: "Primary law text - institutional annotation",
      title: "Annotations of the Hong Kong National Security Law",
      publisher: "Hong Kong Department of Justice",
      retrievedAt: "2026-08-25",
      links: [
        {
          label: "Read Articles 22 and 23",
          url: "https://www.doj.gov.hk/en/publications/national_security/hknslannot.html",
        },
      ],
      context:
        "The page reproduces the English reference text: Article 22 covers force, threat of force, or other unlawful means used for listed subversion acts; Article 23 criminalizes inciting, assisting, or abetting Article 22 conduct and sets penalty bands.",
      limitation:
        "The authentic statutory text is Chinese, the English is for reference, and the Department says its annotations are not legal advice or a complete statement of current law.",
    },
    {
      id: "notebook-source-gates-hksar-verdict",
      role: "Government position - procedural status",
      title:
        "Court of First Instance delivers verdict in Hong Kong Alliance case",
      publisher: "Government of the Hong Kong SAR",
      publishedAt: "2026-08-21",
      retrievedAt: "2026-08-25",
      links: [
        {
          label: "Read official release",
          url: "https://www.info.gov.hk/gia/general/202608/21/P2026082100408p.htm",
        },
      ],
      context:
        "The release identifies the defendants' dispositions, welcomes the verdict, states the government's national-security and constitutional position, and says the case was adjourned to August 28 for mitigation.",
      limitation:
        "This is the executive government's position on the case, not an independent case summary and not a sentencing order.",
    },
    {
      id: "notebook-source-gates-hrw",
      role: "Rights counter-reading - post-verdict",
      title: "Hong Kong: Activists Convicted for Tiananmen Vigils",
      publisher: "Human Rights Watch",
      publishedAt: "2026-08-21",
      retrievedAt: "2026-08-25",
      links: [
        {
          label: "Read rights analysis",
          url: "https://www.hrw.org/news/2026/08/21/hong-kong-activists-convicted-for-tiananmen-vigils",
        },
      ],
      context:
        "Human Rights Watch argues that the convictions violate expression and peaceful-assembly rights, summarizes the defense position, and distinguishes the August 28 mitigation hearing from later sentencing.",
      limitation:
        "This is an advocacy organization's legal and human-rights assessment; its 'vigil organizers' frame is broader than the judgment's exact charged acts.",
    },
    {
      id: "notebook-source-gates-un-experts",
      role: "International-rights context - pre-verdict communication",
      title: "Joint communication on Chow Hang-tung and Lee Cheuk-yan",
      publisher:
        "UN Special Rapporteur on Human Rights Defenders and other UN experts",
      publishedAt: "2026-04-20",
      retrievedAt: "2026-08-25",
      links: [
        {
          label: "Read communication summary",
          url: "https://srdefenders.org/china-arrest-prosecution-pre-trial-detention-and-conditions-of-detention-of-chow-hang-tung-and-lee-cheuk-yan-in-hong-kong-joint-communication/",
        },
      ],
      context:
        "The experts raised pre-verdict concerns about the clarity of unlawful means, prolonged pretrial detention, defense preparation, and the law's effects on expression, assembly, association, legality, and proportionality.",
      limitation:
        "The communication predates the verdict, reports allegations, and notes a government reply. The host page says it is not managed by OHCHR, while linking the full official communication and response records.",
    },
  ],
  unresolvedQuestion:
    "When a gate's formal rule and its practical enforcement diverge, which record should the public treat as the real boundary of circulation?",
  limitations: [
    "No publisher transcript or chapter record was available for episode 195. Timecodes were mapped manually from the full publisher audio; paraphrases are not quotations.",
    "The trade record establishes an EV policy channel and a transshipment allegation, but not a public Canada-specific finding that the covered Chinese EVs entered the United States as Canadian-origin goods.",
    "The Niu Lai figures are dated snapshots from AP, Maoyan-attributed reporting, and a preliminary national daily report. Forecasts, production budget claims, and final grosses are excluded.",
    "The official judgment is available in Traditional Chinese. This Notebook records its holdings and defense positions in paraphrase and is not legal advice or an authorized translation.",
    "The review stops at conviction and the announced August 28 mitigation hearing. It makes no claim about a later sentence or appeal.",
  ],
});
