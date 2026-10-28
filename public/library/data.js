/* Kijamii Intelligence Library · content
 *
 * Topics with `sample: true` use MADE-UP numbers to show the layout. They only show
 * in Team view and are badged "Sample". Real topics have no `sample` flag.
 * Commissioned studies: never name the client, never include brand results.
 *
 * How a topic is built
 *   id         short-url-safe id (no personal names, no brand names)
 *   title      the industry or theme, never a single brand
 *   industry   one of the names in `industries`
 *   market     "SA", "UAE", "Egypt", "MENA" ... (use SA, never KSA)
 *   period     the time the data covers, e.g. "2025–2026"
 *   audience   "client" (safe to show clients) or "internal" (team only)
 *   sources    every source used; numbers point to them by `src` index
 *              type: "kijamii" (previous Kijamii report), "syndicated" (bought or
 *              published report), "proactive" (our own research)
 *              n: sample size or post count; method: how it was collected
 *   headline   one sentence, the big-picture read
 *   kpis       { label, value, unit, src, conf, note }
 *              conf: "high" | "medium" | "directional"
 *   charts     { kind: "line" | "bar" | "stack" | "range", title, unit, src, ... }
 *              "range" = the same measure from several sources side by side
 *   themes     qualitative findings: { title, body, weight, quotes: [{ t, lang }] }
 *              weight: "Strong" | "Emerging" | "Weak signal"
 *              quotes stay in their original language, never machine-translated
 *   canSay / cantSay   what the evidence supports, and where it stops
 */
window.LIBRARY = {
  updated: "2026-10-28",
  industries: [
    "Food & Beverage", "Quick Commerce", "Fintech", "Media & Entertainment",
    "Beauty & Personal Care", "Creative Economy", "Home Appliances", "Retail", "Travel & Tourism"
  ],
  topics: [
    {
      id: "home-cleaning-sa",
      title: "Vacuum cleaners and home cleaning",
      title_ar: "المكانس الكهربائية وتنظيف المنزل",
      industry: "Home Appliances",
      market: "SA",
      period: "2026",
      audience: "client",
      tags: ["vacuum", "robot vacuum", "home appliances", "cleaning", "survey"],
      sources: [
        { type: "kijamii", name: "Kijamii usage & attitudes survey (commissioned)", date: "2026-10", method: "Online survey, adults 25+ across SA cities (50% women, 72% Saudi nationals)", n: 125 }
      ],
      headline: "Vacuuming is a daily chore and ownership is near-universal; robot vacuums are owned by few but wanted by many, as a helper rather than a replacement.",
      headline_ar: "الكنس مهمة يومية والمكنسة في كل بيت تقريباً؛ والمكنسة الروبوتية قليلة الانتشار لكنها مرغوبة كمساعد لا كبديل.",
      kpis: [
        { label: "Own a vacuum cleaner", value: 85, unit: "%", src: 0, conf: "medium", note: "Base: total sample, n=125. Alongside fridges (91%), washing machines (92%) and TVs (86%)" },
        { label: "Use their vacuum daily or 3–5 times a week", value: 59, unit: "%", src: 0, conf: "medium", note: "Base: vacuum owners, n=109 (34% daily, 25% 3–5 times a week)" },
        { label: "Own a robot vacuum today", value: 11, unit: "%", src: 0, conf: "medium", note: "Base: total sample, n=125" },
        { label: "Plan to buy a robot vacuum in the next 12 months", value: 34, unit: "%", src: 0, conf: "directional", note: "Stated intent; intent usually runs ahead of actual buying" },
        { label: "Expect to pay under SAR 1,000 for a good vacuum", value: 64, unit: "%", src: 0, conf: "medium", note: "26% under SAR 500, 38% SAR 500–1,000" },
        { label: "Would buy online without seeing the product", value: 8, unit: "%", src: 0, conf: "medium", note: "92% want to see or try it at some point in the journey" }
      ],
      charts: [
        { kind: "bar", title: "Main challenges when cleaning", unit: "% of vacuum owners (n=109)", src: 0,
          items: [["Dust build-up", 52], ["Tight spaces and corners", 51], ["Heavy dirt and stains", 49], ["Dust allergy", 46], ["Heavy, hard to move appliance", 28], ["Filter cleaning and maintenance", 28], ["Large areas", 22], ["Pet fur", 20]] },
        { kind: "bar", title: "What matters when buying a vacuum", unit: "% of total sample (n=125)", src: 0,
          items: [["Suction power", 49], ["Price", 34], ["Easy cleaning and maintenance", 33], ["Works on different floors", 30], ["Ease of use", 27], ["Durability", 23], ["Warranty and after-sales", 22], ["Low noise", 19], ["Smart features and apps", 12], ["Brand reputation", 9]] },
        { kind: "stack", title: "How often vacuum owners vacuum", unit: "% of vacuum owners (n=109)", src: 0,
          labels: ["Vacuum owners"],
          series: [
            { name: "Daily", values: [34] },
            { name: "3–5 times a week", values: [25] },
            { name: "Twice a week", values: [25] },
            { name: "Weekly or less", values: [16] }
          ] },
        { kind: "stack", title: "How people want to buy next time", unit: "% of total sample (n=125)", src: 0,
          labels: ["All respondents"],
          series: [
            { name: "See and try in store", values: [56] },
            { name: "Visit store, buy online", values: [20] },
            { name: "See online, buy in store", values: [16] },
            { name: "Buy online unseen", values: [8] }
          ] },
        { kind: "bar", title: "Where people look for information", unit: "% of total sample (n=125)", src: 0,
          items: [["Online retailers", 42], ["Family and friends", 39], ["Stores and showrooms", 39], ["Online user reviews", 37], ["Social media", 35], ["Online ads", 28], ["Brand websites", 26], ["Price comparison sites", 24], ["Influencers", 15], ["TV ads", 14]] },
        { kind: "bar", title: "Why people would buy a robot vacuum", unit: "% of likely buyers (n=103)", src: 0,
          items: [["Keeps the home clean automatically", 55], ["Saves time and effort", 54], ["Reaches under furniture", 49], ["Sweeps and mops at once", 37], ["Smart-home and app control", 31], ["Handles pet hair", 17]] }
      ],
      themes: [
        { title: "A routine chore, not an occasional task", weight: "Strong",
          body: "Most owners vacuum several times a week, and use it well beyond floors: rugs and carpets (89%), hard floors (64%), sofas (52%), mattresses (39%).",
          quotes: [] },
        { title: "Replacement is reactive", weight: "Strong",
          body: "Poor performance (44%) and an old machine (37%) trigger replacement; switching brand is rarely the reason (9%). 35% replace only when it breaks.",
          quotes: [] },
        { title: "Try before you buy", weight: "Strong",
          body: "In-store buyers want to judge size (58%), compare (43%) and try (43%). Online buyers come for deals (56%) and easy comparison (50%).",
          quotes: [] },
        { title: "Robots as helpers, not replacements", weight: "Emerging",
          body: "40% see a robot vacuum as working alongside a traditional one; 39% as a full replacement. 81% expect it to both sweep and mop well, and 67% say no-hands upkeep is worth paying more for.",
          quotes: [] },
        { title: "Price-aware, open to flexible payment", weight: "Emerging",
          body: "39% prefer to pay in full, but about the same share prefer instalments, buy-now-pay-later or card, which can soften price as a barrier.",
          quotes: [] }
      ],
      canSay: [
        "Vacuums are a near-universal, heavily used household appliance in this sample.",
        "Interest in robot vacuums is well ahead of current ownership.",
        "The purchase journey still relies on seeing the product in a store.",
        "Performance and price lead purchase decisions; brand reputation and smart features rank low."
      ],
      cantSay: [
        "Which brand leads. Brand results are left out of the library on purpose.",
        "National figures: the sample is 125 adults, with 38% aged 45+.",
        "How many people will actually buy a robot vacuum. Stated intent runs ahead of purchase.",
        "Why non-owners don't buy: those bases are too small (16 and 9 people) to report."
      ]
    },
    {
      id: "streaming-culture-mena",
      title: "Streaming, film and creator culture",
      title_ar: "المنصات والسينما وثقافة صنّاع المحتوى",
      industry: "Media & Entertainment",
      market: "SA",
      period: "Aug–Sep 2026",
      audience: "client",
      tags: ["streaming", "cinema", "YouTube", "Saudi content", "culture pulse"],
      culture: ["2026-09", "2026-08"],
      sources: [
        { type: "kijamii", name: "Kijamii Culture Pulse, September 2026", date: "2026-09", method: "Monthly listening, public social posts, 1–30 Sept", n: null },
        { type: "kijamii", name: "Kijamii Culture Pulse, August 2026", date: "2026-08", method: "Monthly listening, public social posts, 1–31 Aug", n: null }
      ],
      headline: "Saudi audiences lead the region's entertainment talk; local stories earn the warmest reactions, and YouTube storytelling and challenge formats draw the biggest audiences.",
      headline_ar: "الجمهور السعودي يقود حديث الترفيه في المنطقة؛ القصص المحلية تحصد أدفأ التفاعل، وصيغ القصص والتحديات على يوتيوب تجذب أكبر جمهور.",
      kpis: [
        { label: "Share of the Arabic Spider-Man conversation that was Saudi", value: 83.6, unit: "%", src: 1, conf: "medium", note: "August 2026, Arabic-language posts" },
        { label: "Conversations about the top streaming title (Sondos 3)", value: 4300, unit: "", src: 0, conf: "medium", note: "September 2026, public posts" },
        { label: "Views on the top Saudi creator upload", value: "6.5M", unit: "", src: 1, conf: "high", note: "August 2026, public YouTube view count" },
        { label: "Tickets sold for Aks Sir, #1 of its week", value: "185K", unit: "", src: 1, conf: "high", note: "Reported ticket sales, August 2026" }
      ],
      charts: [
        { kind: "bar", title: "Most-discussed streaming titles, September 2026", unit: "conversations", src: 0,
          items: [["Sondos 3", 4300], ["El Qesas", 2800], ["Ma Lam Yohka An Bani Mazar", 815], ["Habetein", 512]] },
        { kind: "bar", title: "Most-discussed streaming titles, August 2026", unit: "conversations", src: 1,
          items: [["Le'bet Gohannam", 2600], ["Beng Kolli", 1600], ["Ahmar Walla Abyad", 400]] },
        { kind: "bar", title: "Top Saudi creator uploads, September 2026", unit: "million views", src: 0,
          items: [["POWR eSports · survival challenge", 5.9], ["SHoNgxBoNg · island challenge", 5.8], ["VWAR · roleplay story", 4.8], ["Omar Abdulrahman · laugh challenge", 3.6], ["MjrmGames · narrative vlog", 3.3], ["Abu Nooh · house challenge", 2.6]] }
      ],
      themes: [
        { title: "Local stories, told well, win", weight: "Strong",
          body: "Saudi comedy and drama drew the warmest reactions, with pride in production quality (“Wait… is this really Saudi?”).",
          quotes: [] },
        { title: "Global moments become Saudi moments", weight: "Strong",
          body: "From blockbusters to esports, Saudi audiences lead the regional conversation and frame global events through national pride.",
          quotes: [] },
        { title: "Audiences ask for more", weight: "Emerging",
          body: "Requests dominate comments on upcoming line-ups, and not being able to watch a buzzed-about title in Saudi Arabia is a recurring frustration.",
          quotes: [] }
      ],
      canSay: [
        "Saudi authors lead the Arabic conversation around major entertainment releases.",
        "Local Saudi and Egyptian titles drive the most streaming talk each month.",
        "Challenge and storytelling formats lead Saudi YouTube."
      ],
      cantSay: [
        "Viewing figures or subscriptions. Conversation is not viewership.",
        "Which platform is winning. Platform comparisons are left out on purpose.",
        "Anything before August 2026; the monthly series is new to the library."
      ]
    },
    {
      id: "quick-commerce-sa",
      sample: true,
      title: "Quick commerce and food delivery",
      industry: "Quick Commerce",
      market: "SA",
      period: "2024–2026",
      audience: "client",
      tags: ["delivery", "convenience", "pricing"],
      sources: [
        { type: "kijamii", name: "Kijamii category listening report", date: "2026-06", method: "Social listening, category terms", n: 182000 },
        { type: "syndicated", name: "Syndicated market report (sample)", date: "2026-03", method: "Market sizing, desk research", n: null },
        { type: "proactive", name: "Kijamii consumer pulse survey", date: "2026-08", method: "Online survey, adults 18–45", n: 1050 }
      ],
      headline: "Delivery has moved from occasional treat to weekly routine for younger urban adults; the conversation is now about fees and speed, not novelty.",
      kpis: [
        { label: "Order delivery at least weekly", value: 58, unit: "%", src: 2, conf: "high", note: "Survey base: adults 18–45 in Riyadh, Jeddah, Dammam" },
        { label: "Category conversation, yearly growth", value: 31, unit: "%", src: 0, conf: "medium", note: "Online mentions, Jan–Jun 2026 vs Jan–Jun 2025" },
        { label: "Mentions about fees or pricing", value: 27, unit: "%", src: 0, conf: "medium", note: "Share of category mentions" },
        { label: "Market growth outlook to 2028", value: "High single digit", unit: "", src: 1, conf: "directional", note: "Range from published estimates; not a forecast by Kijamii" }
      ],
      charts: [
        { kind: "line", title: "Category conversation by quarter", unit: "k mentions", src: 0,
          labels: ["Q1 24", "Q2 24", "Q3 24", "Q4 24", "Q1 25", "Q2 25", "Q3 25", "Q4 25", "Q1 26", "Q2 26"],
          series: [
            { name: "Delivery apps", values: [38, 41, 40, 47, 50, 53, 52, 61, 66, 70] },
            { name: "Grocery in 30 min", values: [12, 14, 15, 19, 22, 24, 27, 31, 34, 38] }
          ] },
        { kind: "bar", title: "What people talk about", unit: "% of mentions", src: 0,
          items: [["Fees and pricing", 27], ["Speed", 22], ["Offers and codes", 18], ["Order accuracy", 13], ["Rider experience", 11], ["Packaging", 9]] },
        { kind: "stack", title: "How often people order, by age", unit: "% of respondents", src: 2,
          labels: ["18–24", "25–34", "35–45"],
          series: [
            { name: "Several times a week", values: [34, 29, 18] },
            { name: "Weekly", values: [30, 31, 27] },
            { name: "Monthly", values: [24, 26, 33] },
            { name: "Rarely", values: [12, 14, 22] }
          ] },
        { kind: "range", title: "Weekly delivery users: three sources compared", unit: "% of adults", note: "Different bases and methods. Read the spread, not one number.",
          items: [
            { name: "Kijamii pulse survey 2026", src: 2, lo: 55, hi: 61, mid: 58 },
            { name: "Syndicated report 2026", src: 1, lo: 48, hi: 56, mid: 52 },
            { name: "Kijamii report 2025", src: 0, lo: 44, hi: 52, mid: 48 }
          ] }
      ],
      themes: [
        { title: "Fees are the new battleground", weight: "Strong",
          body: "Talk has shifted from 'is it available' to 'is it worth it'. Delivery and service fees are the most common reason given for switching apps.",
          quotes: [{ t: "التوصيل صار أغلى من الطلب نفسه أحياناً", lang: "ar" }, { t: "I check three apps before ordering now, just for the fee.", lang: "en" }] },
        { title: "Speed is expected, not praised", weight: "Strong",
          body: "Fast delivery rarely earns positive comment any more; it is noticed only when it fails.",
          quotes: [{ t: "ما أحد يمدح السرعة، بس الكل يشتكي إذا تأخر", lang: "ar" }] },
        { title: "Grocery top-ups are the growth edge", weight: "Emerging",
          body: "Small, frequent grocery orders are the fastest-growing part of the conversation, led by families in the main cities.",
          quotes: [{ t: "Milk, bread, done in 20 minutes. Can't go back.", lang: "en" }] }
      ],
      canSay: [
        "Weekly delivery use is high among urban adults 18–45, across three sources.",
        "Pricing and fees lead the category conversation online.",
        "Grocery top-up talk is growing faster than restaurant delivery talk."
      ],
      cantSay: [
        "Which app or brand is winning. This is category-level only.",
        "National figures. The survey covers three cities and ages 18–45.",
        "Exact market size. Published estimates disagree; we show the range."
      ]
    },
    {
      id: "specialty-coffee-sa",
      sample: true,
      title: "Specialty coffee culture",
      industry: "Food & Beverage",
      market: "SA",
      period: "2023–2026",
      audience: "client",
      tags: ["coffee", "out-of-home", "youth culture"],
      sources: [
        { type: "kijamii", name: "Kijamii coffee category report", date: "2025-11", method: "Social listening, category terms", n: 96000 },
        { type: "syndicated", name: "Syndicated consumer panel (sample)", date: "2026-01", method: "Consumer panel", n: 4000 },
        { type: "proactive", name: "Kijamii café visits, qualitative", date: "2026-05", method: "In-depth interviews and café observation", n: 24 }
      ],
      headline: "Coffee has become a social ritual and a form of self-expression for young Saudis; home brewing is growing alongside, not instead of, café visits.",
      kpis: [
        { label: "Drink specialty coffee weekly", value: 46, unit: "%", src: 1, conf: "high", note: "Panel base: adults 18–40" },
        { label: "Home brewing talk, yearly growth", value: 42, unit: "%", src: 0, conf: "medium", note: "Online mentions, 2025 vs 2024" },
        { label: "Interviews naming café as 'third place'", value: "17 of 24", unit: "", src: 2, conf: "directional", note: "Small qualitative sample; shows direction, not size" }
      ],
      charts: [
        { kind: "line", title: "Coffee conversation by half-year", unit: "k mentions", src: 0,
          labels: ["H1 23", "H2 23", "H1 24", "H2 24", "H1 25", "H2 25"],
          series: [
            { name: "Café visits", values: [21, 24, 27, 29, 33, 35] },
            { name: "Home brewing", values: [6, 8, 10, 13, 15, 19] },
            { name: "Saudi coffee heritage", values: [9, 10, 12, 12, 14, 16] }
          ] },
        { kind: "bar", title: "Why people choose a café", unit: "% of panel", src: 1,
          items: [["Meeting friends", 38], ["Taste and quality", 31], ["Place to work or study", 17], ["Trying new places", 14]] }
      ],
      themes: [
        { title: "The café as a third place", weight: "Strong",
          body: "For many young adults the café is where social life happens: between home and work, and open late.",
          quotes: [{ t: "القهوة عذر، الجلسة هي السبب", lang: "ar" }] },
        { title: "Pride in Saudi coffee", weight: "Emerging",
          body: "Saudi coffee and local roasters are discussed with pride, often alongside international styles rather than against them.",
          quotes: [{ t: "Saudi beans in a V60, best of both worlds.", lang: "en" }] }
      ],
      canSay: ["Weekly specialty coffee drinking is common among adults 18–40.", "Home brewing talk is growing quickly from a smaller base."],
      cantSay: ["Brand preference or share.", "Size of the 'third place' effect: the qualitative sample is 24 people."]
    },
    {
      id: "digital-payments-egypt",
      sample: true,
      title: "Digital payments and everyday money",
      industry: "Fintech",
      market: "Egypt",
      period: "2024–2026",
      audience: "client",
      tags: ["payments", "trust", "instant transfer"],
      sources: [
        { type: "kijamii", name: "Kijamii fintech category report", date: "2026-02", method: "Social listening, category terms", n: 240000 },
        { type: "syndicated", name: "Syndicated financial inclusion study (sample)", date: "2025-09", method: "Household survey", n: 6500 }
      ],
      headline: "Instant transfers have become everyday behaviour; trust and security, not awareness, now shape what people say about digital money.",
      kpis: [
        { label: "Used an instant transfer in the last month", value: 39, unit: "%", src: 1, conf: "high", note: "Adults with a phone; national household survey" },
        { label: "Mentions about security or fraud", value: 24, unit: "%", src: 0, conf: "medium", note: "Share of category mentions, 2025" }
      ],
      charts: [
        { kind: "bar", title: "What people talk about", unit: "% of mentions", src: 0,
          items: [["Ease and speed", 33], ["Security and fraud", 24], ["Fees", 19], ["Splitting bills", 14], ["Customer service", 10]] },
        { kind: "stack", title: "How people paid last time, by city type", unit: "% of respondents", src: 1,
          labels: ["Greater Cairo", "Other urban", "Rural"],
          series: [
            { name: "Instant transfer", values: [41, 33, 19] },
            { name: "Card", values: [22, 18, 9] },
            { name: "Cash", values: [37, 49, 72] }
          ] }
      ],
      themes: [
        { title: "Splitting bills made it social", weight: "Strong",
          body: "Sending money to friends is the habit that brought many first-time users in.",
          quotes: [{ t: "ابعتلي على طول، مش محتاجين نروح البنك", lang: "ar" }] }
      ],
      canSay: ["Instant transfers are mainstream in Greater Cairo.", "Security is the main worry in online talk."],
      cantSay: ["Which provider leads.", "Rural behaviour in detail: online talk under-represents rural users."]
    },
    {
      id: "creative-economy-sa",
      sample: true,
      title: "The Saudi creative economy",
      industry: "Creative Economy",
      market: "SA",
      period: "2025–2026",
      audience: "client",
      tags: ["design", "film", "events", "talent"],
      sources: [
        { type: "kijamii", name: "Kijamii creative scene listening", date: "2026-10", method: "Social listening, sector terms", n: 54000 },
        { type: "proactive", name: "Kijamii creative talent interviews", date: "2026-07", method: "In-depth interviews", n: 18 }
      ],
      headline: "Creative work is increasingly talked about as a career, not a hobby; events act as moments where the wider scene becomes visible.",
      kpis: [
        { label: "Sector conversation, yearly growth", value: 22, unit: "%", src: 0, conf: "medium", note: "Online mentions, 2026 vs 2025" },
        { label: "Interviewees earning from creative work", value: "13 of 18", unit: "", src: 1, conf: "directional", note: "Small qualitative sample" }
      ],
      charts: [
        { kind: "bar", title: "Share of conversation by sector", unit: "% of mentions", src: 0,
          items: [["Film and video", 29], ["Design", 24], ["Music", 18], ["Fashion", 16], ["Gaming", 13]] }
      ],
      themes: [
        { title: "From passion to profession", weight: "Strong",
          body: "People talk about training, pay and contracts more than before, a sign the sector is professionalising.",
          quotes: [{ t: "صار عندنا مسار مهني حقيقي، مو بس هواية", lang: "ar" }] }
      ],
      canSay: ["Sector talk is growing.", "Film and design lead the conversation."],
      cantSay: ["Sector revenue or jobs data: not in these sources."]
    },
    {
      id: "beauty-uae-pipeline",
      sample: true,
      title: "Beauty routines (in progress)",
      industry: "Beauty & Personal Care",
      market: "UAE",
      period: "2026",
      audience: "internal",
      tags: ["skincare", "in progress"],
      sources: [
        { type: "proactive", name: "Kijamii beauty scoping, desk research", date: "2026-09", method: "Desk research and early listening", n: null }
      ],
      headline: "Early scoping only. Skincare talk looks larger than make-up talk; not ready for clients.",
      kpis: [
        { label: "Status", value: "Scoping", unit: "", src: 0, conf: "directional", note: "Internal only until fieldwork is done" }
      ],
      charts: [],
      themes: [
        { title: "Skincare over make-up", weight: "Weak signal",
          body: "First listening pass suggests skincare routines dominate. Needs a proper query and a second source.",
          quotes: [] }
      ],
      canSay: ["Nothing client-facing yet."],
      cantSay: ["Any number. This is a scoping note."]
    }
  ]
};
