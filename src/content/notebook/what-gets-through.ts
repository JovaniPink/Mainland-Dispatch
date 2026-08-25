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
      "The Canada allegation is contested, the film figures are dated snapshots, and the Hong Kong convictions remain distinct from later sentencing.",
    sourceIds: [
      "notebook-source-gates-brookings",
      "notebook-source-gates-ap-niulai",
      "notebook-source-gates-judgment",
    ],
  },
  publishedAt: "2026-08-25",
  updatedAt: "2026-08-25",
  readTime: "17 min",
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
        "Canada opened a first-year quota of 49,000 China-origin EVs at the 6.1% most-favored-nation rate. The United States imposed separate Section 338 tariffs on covered Canadian goods and published a wider transshipment-risk report.",
      outcome:
        "The policy conflict tightened bilateral trade even though the reviewed public record did not show that the admitted Chinese EVs crossed the US border as Canadian-origin vehicles.",
      status: "contested",
      caveat:
        "The White House report labels Canada a transshipment-risk hub, but its Canada discussion is not tied to a public shipment finding. Brookings found little aggregate evidence of 2025 redirection, which cannot rule out product-level evasion.",
      sourceIds: [
        "notebook-source-gates-white-house-transshipment",
        "notebook-source-gates-ustr-origin",
        "notebook-source-gates-usmca-3210",
        "notebook-source-gates-canada-ev",
        "notebook-source-gates-white-house-canada",
        "notebook-source-gates-brookings",
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
      "The trade gate has at least five layers that the episode compresses: an allegation of transshipment, a legal origin test, product-specific evidence, an enforcement action, and aggregate trade patterns. Each answers a different question. The White House's August report alleges a global shadow network and places Canada in its first risk tier. Its methodology ranges from country-product screens to transaction matching and proprietary facility analysis, but the public Canada passages describe risk architecture rather than a named Canadian EV shipment that failed an origin test.",
      "The product-specific concern is real enough to name. Canada's January arrangement allowed up to 49,000 China-origin EVs into Canada in the first year at the 6.1% most-favored-nation rate. But a China-origin vehicle does not become USMCA-originating because it is parked, sold, or lightly handled in Canada. USTR states that rules of origin determine whether a good qualifies for preferential treatment, and the agreement contains product-specific tests and origin procedures. Article 32.10, which the audio misnumbers, addresses a party entering a free-trade agreement with a non-market country. It is not the customs test for a particular car.",
      "Enforcement also needs its own label. The July US action imposed 50% Section 338 duties on covered Canadian goods and framed the dispute as discrimination against US commerce. The August transshipment paper proposed stronger origin and importer enforcement. Those are official actions, but neither is the missing shipment record. No public evidence reviewed here showed a Chinese EV admitted under Canada's quota then entered the United States as a Canadian-origin vehicle.",
      "The counter-reading is not that evasion is impossible. Brookings found that China's exports to Canada rose 3.2% in 2025, below China's overall 5.5% export growth, and concluded there was little sign in aggregate data of redirection to the rest of North America for transshipment or end markets. Aggregate data can miss a product corridor; a product corridor cannot prove an economy-wide scam. The responsible conclusion is a contested risk with a clear legal test and an unfilled public evidence gap.",
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
      "The episode's strongest insight survives only after its broad claims are separated. China matters in each story, but not as a universal hidden hand. In trade it is an origin and policy concern filtered through North American law. In cinema it is the setting for an audience-led attention reversal. In Hong Kong it is the constitutional order the court treated as protected by national-security law.",
      "I now read 'what gets through' as a chain of evidence questions rather than a slogan. Physical movement is not legal origin. Viral proximity is not equal gross. Association with vigils is not the exact charge, even when remembrance is central to the civic consequence. The gate becomes visible when those distinctions are kept intact.",
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
      retrievedAt: "2026-08-25",
      links: [
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
        "No Hudson or Simplecast transcript or chapter record was located on August 25. The publisher audio controls; the supplied synopsis and local audit notes are not evidence links.",
    },
    {
      id: "notebook-source-gates-white-house-transshipment",
      role: "Official allegation - methodology",
      title: "The Great Transshipment Scam",
      publisher: "The White House",
      publishedAt: "2026-08-13",
      retrievedAt: "2026-08-25",
      links: [
        {
          label: "Read official report",
          url: "https://www.whitehouse.gov/wp-content/uploads/2026/08/The-Great-Transshipment-Scam.pdf",
        },
      ],
      context:
        "The report places Canada in a diversified high-risk tier, describes possible improper USMCA treatment, and distinguishes model-based, product-screen, transaction, and facility-level estimates.",
      limitation:
        "Its Canada passages are risk claims, not a public Canada-specific shipment determination. Several estimates are exposure screens or proprietary analyses rather than observed illegal entries.",
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
      retrievedAt: "2026-08-25",
      links: [
        {
          label: "Read official remarks",
          url: "https://www.pm.gc.ca/en/news/speeches/2026/01/16/prime-minister-carney-delivers-remarks-after-forging-new-strategic",
        },
      ],
      context:
        "Canada said it would allow up to 49,000 China-origin EVs into the Canadian market in the first year at the 6.1% MFN rate, alongside expected Chinese tariff changes for Canadian agricultural goods.",
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
      retrievedAt: "2026-08-25",
      links: [
        {
          label: "Read tariff fact sheet",
          url: "https://www.whitehouse.gov/fact-sheets/2026/07/fact-sheet-president-donald-j-trump-imposes-additional-tariffs-on-canada/",
        },
      ],
      context:
        "The administration described three Section 338 proclamations imposing 50% duties on covered Canadian imports in response to alleged discrimination involving cars, alcohol, dairy, and other products.",
      limitation:
        "The action applies regardless of USMCA origin and is not itself an origin determination or proof of Chinese transshipment.",
    },
    {
      id: "notebook-source-gates-brookings",
      role: "Counter-reading - aggregate trade",
      title: "USMCA Forward 2026",
      publisher: "Brookings Institution",
      publishedAt: "2026-03",
      retrievedAt: "2026-08-25",
      links: [
        {
          label: "Read report",
          url: "https://www.brookings.edu/wp-content/uploads/2026/03/USMCA-Forward-2026.pdf",
        },
      ],
      context:
        "The report says 2025 trade data showed little sign of Chinese exports being redirected to Canada or Mexico for transshipment or as end markets; it records a 3.2% rise in China's exports to Canada against 5.5% overall export growth.",
      limitation:
        "Aggregate trade can bound an economy-wide narrative but cannot disprove a hidden shipment, firm, or product corridor.",
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
          label: "Read AP report",
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
