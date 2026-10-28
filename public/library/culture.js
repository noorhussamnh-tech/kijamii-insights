/* Kijamii Intelligence Library · Culture Pulse (monthly cultural intelligence)
 *
 * Source: Kijamii's monthly "Fandom & Streaming Pulse" listening, public posts only.
 * Taken from the culture, entertainment, trending-title and YouTube sections.
 * Left out on purpose: the client's own brand deep-dive and the platform-vs-platform
 * pages (brand-level, and commissioned), and anything politically charged that the
 * client brand sits inside.
 *
 * Numbers are exactly as reported in the monthly deck. "posts" / "conversations" are
 * public social posts in the period stated. Never add a number that isn't in the deck.
 *
 * Edition shape
 *   id, month, month_ar, period, headline, headline_ar
 *   moments  [{ kind: "culture"|"entertainment", title, title_ar?, sub, stats: [[value, label]], points: [[head, body]] }]
 *   titles   [{ name, origin, release, conversations, blurb, praise: [], criticism: [] }]
 *   streaming [[head, body]]  category-level themes, no platform rankings
 *   youtube  { note, videos: [[creator, title, views, format]] }
 *   music    [[artist, track, views]]
 */
window.CULTURE = [
  {
    id: "2026-09",
    month: "September 2026", month_ar: "سبتمبر 2026",
    period: "1–30 September 2026",
    headline: "National Day pride set the tone, Saudi football fans policed their own, and local comedy led streaming talk.",
    headline_ar: "اليوم الوطني حدّد المزاج، وجمهور الكرة السعودي حاسب نفسه، والكوميديا المحلية تصدّرت حديث المنصات.",
    moments: [
      { kind: "culture", title: "Saudi National Day 96", title_ar: "اليوم الوطني 96",
        sub: "Theme «عزّنا بطبعنا» (Our Pride Is in Our Nature), kept from 2025 for a two-year run with a refreshed values focus.",
        stats: [["192.5K", "total conversations"], ["7.3K", "mentions of the theme line"]],
        points: [["A two-year theme", "Each National Day usually brings a new slogan and visual identity; 2026 kept the 2025 line, so the conversation centred on values rather than a new look."],
                 ["Football joined in", "Fans paired National Day with a club win (“two reasons to celebrate”) and a former league star joined public celebrations."],
                 ["Fireworks questions", "A sudden fireworks postponement drew calls for an explanation, inside an otherwise celebratory month."]] },
      { kind: "culture", title: "The Jota chants", title_ar: "هتافات جوتا",
        sub: "Chants referencing the late Diogo Jota, aimed at his friend Rúben Neves during a match.",
        stats: [["13,787", "results, 12–29 Sept"], ["190.3K", "total engagement"], ["98%", "Saudi-geolocated authors"]],
        points: [["A failure of character, not a football incident", "Saudi users framed the chants as a question of values and respect for the dead, not club rivalry."],
                 ["Saudi fans tracked how the world saw it", "Much of the talk was about embarrassment at how the moment would reflect on Saudi football abroad."],
                 ["How to read it", "A Saudi, X-only conversation (98% on X); 72% were reposts. Anger was directed at the chanters, not at the player."]] },
      { kind: "entertainment", title: "Avengers: Endgame encore", title_ar: "إعادة عرض Avengers: Endgame",
        sub: "A cinema re-release seven years on.",
        stats: [["10K", "posts, 1–30 Sept"], ["73.6K", "total engagement"], ["36%", "Saudi-geolocated authors"]],
        points: [["Niche but intense", "59% of Arabic posts landed in release week."],
                 ["A night out", "Cinema chains drove the launch talk, selling the encore as an event rather than a film."],
                 ["Still emotional", "Tony Stark's death remains the emotional core of the conversation."]] },
      { kind: "entertainment", title: "EA Sports FC27 launch", title_ar: "إطلاق FC27",
        sub: "The yearly football game release.",
        stats: [["4,500", "posts, 1–30 Sept"], ["2,756", "unique authors"]],
        points: [["National Day took the peak", "The biggest spike was a National Day giveaway: “my first game will be FC27”."],
                 ["The organic headline", "Players welcomed gameplay changes summed up as “the AI era is over”."],
                 ["Creators and real football", "Creator content and real-world football gave the game its most shared moments."]] },
      { kind: "entertainment", title: "Toy Story in Saudi dialect", title_ar: "حكاية لعبة باللهجة السعودية",
        sub: "A Saudi-dialect dub of a global animation.",
        stats: [["2M", "views on the lead post"]],
        points: [["Pride in representation", "Many celebrated hearing Saudi dialect in global animation and asked for more local dubs."],
                 ["Nostalgia pushes back", "Others held on to classic Modern Standard Arabic and Egyptian dubs, and criticised voice fit and audio quality."]] }
    ],
    titles: [
      { name: "Sondos 3", origin: "Saudi", release: "6 Sept", conversations: 4300,
        blurb: "Sondos returns to real estate with a tech-driven firm, taking deals from her rival.",
        praise: ["Funny, relatable Saudi family entertainment", "Strong, close-to-home cast; Hassan Al-Asiri praised as realistic", "Celebrated for reaching No. 1"],
        criticism: ["Some scenarios felt exaggerated or disconnected from reality", "References seen as heavy-handed"] },
      { name: "El Qesas", origin: "Egyptian", release: "17 Sept", conversations: 2800,
        blurb: "An ambitious young pianist in Egypt, 1967–1984. Egypt's Oscar submission, now streaming.",
        praise: ["Strong Egyptian identity and classic-cinema nostalgia", "Nelly Karim's standout performance", "Streaming release seen as a chance to widen its reach"],
        criticism: ["Loud soundtrack affected dialogue clarity", "One lead felt less convincing as Egyptian"] },
      { name: "Ma Lam Yohka An Bani Mazar", origin: "Egyptian", release: "25 Sept", conversations: 815,
        blurb: "A documentary-style drama revisiting a notorious 2005 crime in Upper Egypt.",
        praise: ["Direction and plot praised", "Well received as a follow-up to Le'bet Gohannam", "Michel Milad's performance"],
        criticism: ["Later episodes felt slow", "Questions over revisiting an unresolved case", "Makeup and one portrayal criticised"] },
      { name: "Habetein", origin: "Saudi", release: "2 Sept", conversations: 512,
        blurb: "A former drift racer pulled back into the underworld.",
        praise: ["“Wait… is this really Saudi?”: pride in international-level cinematography", "Strong opening episode", "Standout cast moments"],
        criticism: ["Frustration that it isn't available to watch in Saudi Arabia", "Weekly release schedule felt too slow"] }
    ],
    streaming: [
      ["Audiences ask for more", "On upcoming line-ups, requests now make up nearly 6 in 10 comments, led by Kuwaiti titles and delayed Turkish continuations."],
      ["Saudi content is a pull", "Local comedy and drama drove the warmest reactions of the month; Saudi audiences talk about local productions with pride."],
      ["Quality over quantity", "When platforms are compared, viewers praise distinctive, high-quality series over the size of a library."],
      ["Availability gaps frustrate", "Not being able to watch a buzzed-about title in Saudi Arabia was a recurring complaint."]
    ],
    youtube: {
      note: "Saudi creator-led channels with a September upload, ranked by public views of their strongest upload.",
      videos: [
        ["POWR eSports", "Seven days at sea for SAR 250,000 (part 1)", 5900000, "Adventure / survival"],
        ["SHoNgxBoNg", "Last person to leave the island wins SAR 500,000", 5800000, "Adventure / elimination"],
        ["VWAR", "The impossible crime: the magician hacker", 4800000, "Roleplay storytelling"],
        ["Omar Abdulrahman", "Real-life laugh challenge", 3600000, "Comedy / group challenge"],
        ["MjrmGames", "The caravan was stolen", 3300000, "Narrative vlog"],
        ["Abu Nooh", "Last person to leave the house wins it", 2600000, "Elimination challenge"]
      ],
      formats: "Challenge and prize formats led September, with storytelling and roleplay close behind. A National Day song reached 3.55M Saudi streams in its week."
    },
    music: []
  },
  {
    id: "2026-08",
    month: "August 2026", month_ar: "أغسطس 2026",
    period: "1–31 August 2026",
    headline: "Saudi audiences turned global moments into local ones: a regional pact read as pride, esports read as diplomacy, and a blockbuster led from Saudi.",
    headline_ar: "الجمهور السعودي حوّل اللحظات العالمية إلى لحظات محلية: فخر، ودبلوماسية، وبطل شباك تذاكر بقيادة سعودية.",
    moments: [
      { kind: "culture", title: "The Mecca joint defence agreement", title_ar: "اتفاقية مكة للدفاع المشترك",
        sub: "A three-country mutual defence pact signed in Mecca on 7 August.",
        stats: [["62K", "conversations"]],
        points: [["Saudi leadership and pride", "Users framed the agreement as Saudi-led: the Kingdom convening and shaping regional security."],
                 ["Mecca symbolism", "Mecca, a Friday signing and the Kaaba gave it religious weight; many described it as Muslim unity."],
                 ["Shared security", "The practical read was simple: an attack on one is an attack on all. A small cluster questioned capability and commitment."]] },
      { kind: "culture", title: "Esports World Cup 2026", title_ar: "كأس العالم للرياضات الإلكترونية 2026",
        sub: "The yearly multi-title tournament, part of Vision 2030's diversification agenda.",
        stats: [["5,900", "Saudi posts"], ["44K", "engagement"], ["2%", "of posts named a game title"]],
        points: [["A state moment, not a sporting one", "75% of Saudi posts were about the Crown Prince attending in Paris and the trophy presentation."],
                 ["One fandom anchor", "Team Falcons appeared in 18% of posts, the main route by which competitive content entered the conversation."],
                 ["Games barely featured", "Every named game title combined accounted for 147 posts."]] },
      { kind: "entertainment", title: "Aks Sir", title_ar: "عكس سير",
        sub: "A Saudi action-comedy thriller set on the Eastern Province's roads.",
        stats: [["1,085", "posts"], ["185K", "tickets sold"], ["#1", "weekly ticket sales, 16–22 Aug"]],
        points: [["Comedy meets drama", "Viewers praised the mix of action and humour."],
                 ["A well-crafted cinema experience", "Craft and production values came up repeatedly."],
                 ["Western script, local dialect", "A familiar genre told in a Saudi voice."]] },
      { kind: "entertainment", title: "The Odyssey", title_ar: "الأوديسة",
        sub: "A big-screen mythic epic with a star cast.",
        stats: [["10,530", "posts"], ["714.9M", "total reach"]],
        points: [["“Wait… that's not CGI?”", "Practical effects drove amazement."],
                 ["“We want the full experience”", "Talk centred on seeing it in premium big-screen formats."]] },
      { kind: "entertainment", title: "Spider-Man: Brand New Day", title_ar: "سبايدر مان: Brand New Day",
        sub: "A global record breaker that became a Saudi-led moment in the region.",
        stats: [["$2B", "in 17 days"], ["83.6%", "of the Arabic conversation was Saudi"]],
        points: [["Saudi as the regional hub", "Saudi Arabia led the region's Spider-Man buzz, with box-office pride."],
                 ["Two blockbusters, one couple", "The lead pair linked the conversation with another summer release."]] }
    ],
    titles: [
      { name: "Le'bet Gohannam", origin: "Egyptian", release: "28 Aug", conversations: 2600,
        blurb: "A dark three-episode true-crime thriller about AI, the dark web and an online game that turns real.",
        praise: ["Mohamed Farag's powerhouse performance", "A convincing villain and intense realism", "Omar Rozik outside his comfort zone"],
        criticism: ["Too heavy and psychologically draining", "Concerns about victim empathy and family viewing", "Some saw religious misrepresentation"] },
      { name: "Beng Kolli", origin: "Egyptian", release: "16 Aug", conversations: 1600,
        blurb: "A medical drama inside anaesthesiology, surgery and hospital politics.",
        praise: ["“Finally, something different”: a fresh storyline", "Female representation", "Grows on you over episodes"],
        criticism: ["Medical inaccuracies", "Questions over medical consultation and credibility"] },
      { name: "Ahmar Walla Abyad", origin: "Saudi", release: "14 Aug", conversations: 400,
        blurb: "A Saudi crime drama: a man leaves prison to find his family torn apart by greed.",
        praise: ["Hooked from the first frame; fast-paced", "Standout, scene-stealing performances"],
        criticism: ["Promising concept, weaker script"] }
    ],
    streaming: [
      ["Saudi content travels", "Saudi audiences increasingly follow Saudi titles wherever they stream, and criticise thin investment in local production."],
      ["Quality is the benchmark", "Viewers single out distinctive, high-quality productions as the standard to beat."],
      ["Creators are the new battleground", "Reports of platforms competing for exclusive creator deals drew attention in media coverage."],
      ["Line-up demand", "Comments on upcoming line-ups skew toward unmet demand, especially Turkish continuations."]
    ],
    youtube: {
      note: "Saudi creator-led channels with an August upload, ranked by public views of their strongest upload.",
      videos: [
        ["SHoNgxBoNg", "داهمت مهرب مخدرات حقيقي مع مكافحة المخدرات!", 6500000, "Storytelling / adventure"],
        ["VWAR", "قصة ضباط القوات الخاصة (الصاعقة الدولية)", 5900000, "Roleplay storytelling"],
        ["BarryTube", "قصة سرقنا كفرات سيارة أستاذ في المدرسة ج2", 2100000, "Story time"],
        ["MjrmGames", "هل بيع المكسرات يخليك غني؟", 1800000, "Narrative vlog"],
        ["oPiiLz", "محاكي الحطاب", 1600000, "Gaming"],
        ["BanderitaX", "The Airport Story", 1400000, "Gaming / story"]
      ],
      formats: "Storytelling and story-time videos remain the strongest YouTube format in Saudi Arabia."
    },
    music: [
      ["Meteb Alshalan", "ذاك الغريب", 1400000],
      ["Ayed", "طلعت أبه", 789000],
      ["Nader Alsharari", "متى تفهم", 594000]
    ]
  }
];
