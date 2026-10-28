/* Kijamii Intelligence Library · app
 * Plain JS, no build step. Content lives in data.js (window.LIBRARY) and
 * culture.js (window.CULTURE, the monthly Culture Pulse).
 * Routes: #/  ·  #/t/<id>  ·  #/culture[/<yyyy-mm>]  ·  #/coverage  ·  #/add
 * Language: English by default, عربي via the nav button. Interface text and
 * fields with an `_ar` twin switch; findings without one stay in English, and
 * verbatims always stay in their original language.
 */
(function () {
  "use strict";

  var LIB = window.LIBRARY || { topics: [], industries: [] };
  var CULTURE = window.CULTURE || [];
  var app = document.getElementById("app");
  var tip = document.getElementById("tip");
  var REDUCED = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var SERIES = ["var(--c1)", "var(--c2)", "var(--c3)", "var(--c4)"];
  var ACCENTS = ["var(--lime)", "var(--lilac)", "var(--teal)", "var(--red)"];
  var SRC_LABEL = { kijamii: "Kijamii report", syndicated: "Syndicated", proactive: "Proactive research" };
  var CONF = { high: [3, "High confidence"], medium: [2, "Medium confidence"], directional: [1, "Directional"] };
  var WEIGHT = { "Strong": 3, "Emerging": 2, "Weak signal": 1 };
  var DATED_MONTHS = 18;

  var state = { aud: "client", lang: "en", q: "", industry: "", market: "", src: "" };
  var preview = null; // topic loaded on the Add page, kept in memory only
  var observers = [];

  try { var saved = localStorage.getItem("kil-aud"); if (saved === "internal" || saved === "client") state.aud = saved; } catch (e) {}
  try { if (localStorage.getItem("kil-lang") === "ar") state.lang = "ar"; } catch (e) {}
  if (/[?&]lang=ar\b/.test(location.search)) state.lang = "ar";

  /* ---------- language ---------- */
  var AR = {
    "Library": "المكتبة", "Culture Pulse": "نبض الثقافة", "Coverage": "التغطية", "Add research": "أضف بحثاً",
    "Client view": "عرض العملاء", "Team view": "عرض الفريق",
    "Kijamii Consumer Insights & Data Studio": "كيجامي · استوديو رؤى المستهلك والبيانات",
    "Industry numbers, dashboards and the human voice behind them, from our own reports, syndicated studies and proactive research. Big picture, clearly sourced.":
      "أرقام القطاعات ولوحات البيانات وصوت الناس خلفها، من تقاريرنا ودراسات السوق وأبحاثنا الاستباقية. صورة كبيرة ومصادر واضحة.",
    "Search industries, themes, quotes…": "ابحث في القطاعات والمواضيع والاقتباسات…",
    "Search the library": "ابحث في المكتبة",
    "Topics": "موضوعات", "Industries": "قطاعات", "Sources cited": "مصادر موثّقة", "Data points": "نقاط بيانات", "verbatims": "اقتباسات",
    "Industry, not brand": "القطاع لا العلامة", "Every topic reads the category, never one company.": "كل موضوع يقرأ الفئة كاملة، لا شركة واحدة.",
    "Every number has a source": "لكل رقم مصدر", "Tap any figure to see where it came from and its base.": "اضغط على أي رقم لترى مصدره وحجم العينة.",
    "Confidence on every figure": "درجة الثقة لكل رقم", "High, medium or directional, stated up front.": "عالية أو متوسطة أو مؤشر أولي، بوضوح.",
    "Where it stops": "أين تتوقف الأدلة", "Each topic says what the evidence cannot support.": "كل موضوع يوضح ما لا تدعمه الأدلة.",
    "Browse the library": "تصفّح المكتبة", "See coverage map →": "خريطة التغطية ←",
    "Industry": "القطاع", "Market": "السوق", "Source": "المصدر", "All": "الكل",
    "Kijamii report": "تقرير كيجامي", "Syndicated": "دراسة سوق", "Proactive research": "بحث استباقي",
    "of": "من", "topics": "موضوعات", "Clear filters": "مسح الفلاتر",
    "Nothing matches yet. Try a broader word, or clear the filters.": "لا نتائج بعد. جرّب كلمة أعم أو امسح الفلاتر.",
    "Sample": "عينة", "Sample data": "بيانات تجريبية", "Team only": "للفريق فقط",
    "source": "مصدر", "sources": "مصادر",
    "← All topics": "→ كل الموضوعات", "How to read this": "كيف تقرأ هذا", "Scope": "النطاق", "Industry-level read": "قراءة على مستوى القطاع",
    "The numbers": "الأرقام", "Dashboards": "لوحات البيانات", "What people say": "ماذا يقول الناس",
    "Where the evidence stops": "حدود الأدلة", "We can say": "نستطيع القول", "We can’t say": "لا نستطيع القول", "Related": "ذات صلة",
    "Table": "جدول", "Chart": "رسم", "Sources as named on each row": "المصادر كما في كل سطر",
    "High confidence": "ثقة عالية", "Medium confidence": "ثقة متوسطة", "Directional": "مؤشر أولي",
    "Strong": "قوي", "Emerging": "ناشئ", "Weak signal": "إشارة ضعيفة",
    "Verbatims in their original language, lightly anonymised.": "الاقتباسات بلغتها الأصلية ومن دون أسماء.",
    "older than": "أقدم من", "months": "شهراً",
    "scope_text": "يصف هذا الموضوع فئة «{ind}» في {mkt} خلال {per}. لا يقيّم أي علامة تجارية بعينها. الأرقام من مصادر مختلفة تعتمد عينات مختلفة؛ قارن الاتجاه لا الكسور العشرية.",
    "Read the monthly Culture Pulse →": "اقرأ نبض الثقافة الشهري ←",
    "Monthly cultural intelligence": "ذكاء ثقافي شهري",
    "Public conversation, shared with everyone. Read these as cultural signals: conversation is not viewership.": "حديث عام نشاركه مع الجميع. اقرأه كإشارات ثقافية: الحديث ليس نسب مشاهدة.",
    "Saudi culture": "الثقافة السعودية", "Entertainment pulse": "نبض الترفيه", "Trending titles": "العناوين الأكثر حديثاً",
    "Streaming landscape": "مشهد المنصات", "Saudi YouTube": "يوتيوب السعودية", "Music": "الموسيقى",
    "Most-discussed titles": "أكثر العناوين نقاشاً", "conversations": "محادثة", "What people praised": "ما أشاد به الناس", "What people criticised": "ما انتقده الناس",
    "Released": "العرض", "Top creator uploads": "أعلى فيديوهات صنّاع المحتوى", "million views": "مليون مشاهدة",
    "Editions": "الإصدارات", "This month": "هذا الشهر", "How we read it": "كيف نقرأه",
    "culture_method": "رصد شهري للمنشورات العامة على المنصات الاجتماعية. الأرقام كما وردت في تقرير الشهر. لا نذكر المنصات أو العلامات بالمقارنة.",
    "Culture Pulse · every month": "نبض الثقافة · كل شهر", "Open this month →": "افتح هذا الشهر ←",
    "Sample content.": "محتوى تجريبي.",
    "Topics marked “Sample” use made-up numbers to show the layout. Don’t share them as findings.": "الموضوعات المعلّمة «عينة» أرقامها افتراضية لعرض التصميم فقط. لا تشاركها كنتائج.",
    "Library updated": "آخر تحديث للمكتبة",
    "Where the library is strong, and where it’s thin": "أين المكتبة قوية، وأين تحتاج المزيد",
    "Topic not found": "الموضوع غير موجود", "Back to the library": "العودة إلى المكتبة",
    "This topic is for the team only": "هذا الموضوع للفريق فقط", "Switch to Team view to open it.": "انتقل إلى عرض الفريق لفتحه."
  };
  var AR_IND = { "Food & Beverage": "الأغذية والمشروبات", "Quick Commerce": "التجارة السريعة", "Fintech": "التقنية المالية", "Media & Entertainment": "الإعلام والترفيه",
    "Beauty & Personal Care": "الجمال والعناية الشخصية", "Creative Economy": "الاقتصاد الإبداعي", "Home Appliances": "الأجهزة المنزلية", "Retail": "التجزئة", "Travel & Tourism": "السفر والسياحة" };
  var AR_MKT = { "SA": "السعودية", "Egypt": "مصر", "UAE": "الإمارات", "MENA": "الشرق الأوسط وشمال أفريقيا" };
  function T(k) { return (state.lang === "ar" && AR[k]) || k; }
  function L(obj, f) { return state.lang === "ar" && obj[f + "_ar"] ? obj[f + "_ar"] : obj[f]; }
  function IND(i) { return state.lang === "ar" && AR_IND[i] ? AR_IND[i] : i; }
  function MKT(m) { return state.lang === "ar" && AR_MKT[m] ? AR_MKT[m] : m; }
  function fmtNum(v, dec) { return Number(v).toLocaleString("en-US", { minimumFractionDigits: dec || 0, maximumFractionDigits: dec || 0 }); }

  /* ---------- helpers ---------- */
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function el(tag, cls, html) { var n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; }
  function kmark(cls) { return '<div class="k ' + (cls || "") + '" aria-hidden="true"><svg><use href="#k"/></svg></div>'; }
  function accentOf(t) { var i = LIB.industries.indexOf(t.industry); return ACCENTS[(i < 0 ? 0 : i) % ACCENTS.length]; }
  // Clients never see team-only topics or sample (made-up) topics.
  function visible() { return LIB.topics.filter(function (t) { return state.aud === "internal" || (t.audience !== "internal" && !t.sample); }); }
  function fmt(v) { return typeof v === "number" ? (Math.abs(v) >= 1000 ? v.toLocaleString("en-US") : String(v)) : esc(v); }
  function monthsAgo(ym) {
    var m = /^(\d{4})-(\d{2})/.exec(ym || ""); if (!m) return null;
    var now = new Date(); return (now.getFullYear() - +m[1]) * 12 + (now.getMonth() + 1 - +m[2]);
  }
  function niceMax(v) { if (v <= 0) return 1; var p = Math.pow(10, Math.floor(Math.log10(v))), n = v / p; return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10) * p; }
  function svgEl(tag, attrs) { var n = document.createElementNS("http://www.w3.org/2000/svg", tag); for (var k in attrs) n.setAttribute(k, attrs[k]); return n; }
  function isAr(s) { return /[؀-ۿ]/.test(s); }
  function highlight(text, q) {
    var safe = esc(text); if (!q) return safe;
    var re = new RegExp("(" + q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "gi");
    return safe.replace(re, "<mark>$1</mark>");
  }
  function confHtml(c) {
    var d = CONF[c] || CONF.directional, dots = "";
    for (var i = 0; i < 3; i++) dots += '<i class="' + (i < d[0] ? "on" : "") + '"></i>';
    return '<span class="conf" title="' + T(d[1]) + '">' + dots + " " + T(d[1]) + "</span>";
  }

  /* ---------- tooltip ---------- */
  function showTip(html, x, y) {
    tip.innerHTML = html; tip.classList.add("on");
    var w = tip.offsetWidth, h = tip.offsetHeight, vw = window.innerWidth;
    var left = x + 14; if (left + w > vw - 8) left = x - w - 14; if (left < 8) left = 8;
    var top = y - h - 12; if (top < 8) top = y + 16;
    tip.style.left = left + "px"; tip.style.top = top + "px";
  }
  function hideTip() { tip.classList.remove("on"); }
  window.addEventListener("scroll", hideTip, { passive: true });

  /* ---------- count-up + reveal ---------- */
  function countUp(node) {
    var target = parseFloat(node.getAttribute("data-count")); if (isNaN(target)) return;
    var suffix = node.getAttribute("data-suffix") || "", dec = (String(target).split(".")[1] || "").length;
    if (REDUCED) { node.textContent = fmtNum(target, dec) + suffix; return; }
    var t0 = null, dur = 900;
    function step(ts) {
      if (!t0) t0 = ts; var p = Math.min(1, (ts - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      node.textContent = fmtNum(p < 1 ? target * e : target, dec) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  function arm(root) {
    var io = "IntersectionObserver" in window ? new IntersectionObserver(function (ents) {
      ents.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add("in");
        $$("[data-count]", en.target).forEach(countUp);
        $$(".fill[data-w]", en.target).forEach(function (f) { f.style.width = f.getAttribute("data-w"); });
        $$(".seg[data-g]", en.target).forEach(function (s) { s.style.flexGrow = s.getAttribute("data-g"); });
        io.unobserve(en.target);
      });
    }, { threshold: 0.12 }) : null;
    $$(".reveal", root).forEach(function (n) {
      if (io) io.observe(n); else { n.classList.add("in"); $$("[data-count]", n).forEach(countUp); }
    });
    observers.push(io);
  }
  function cleanup() {
    observers.forEach(function (o) { if (o && o.disconnect) o.disconnect(); }); observers = []; hideTip();
  }

  /* ---------- charts ---------- */
  function lineChart(box, c) {
    function draw() {
      box.innerHTML = "";
      var W = Math.max(260, box.clientWidth), H = 240;
      var multi = c.series.length > 1, labelRoom = multi && W > 520 ? 128 : 14;
      var pad = { l: 34, r: labelRoom, t: 12, b: 28 };
      var iw = W - pad.l - pad.r, ih = H - pad.t - pad.b;
      var max = niceMax(Math.max.apply(null, c.series.map(function (s) { return Math.max.apply(null, s.values); })));
      var n = c.labels.length;
      function X(i) { return pad.l + (n === 1 ? iw / 2 : (i * iw) / (n - 1)); }
      function Y(v) { return pad.t + ih - (v / max) * ih; }
      var svg = svgEl("svg", { width: W, height: H, viewBox: "0 0 " + W + " " + H, role: "img", "aria-label": c.title });
      for (var g = 0; g <= 4; g++) {
        var gv = (max / 4) * g, gy = Y(gv);
        svg.appendChild(svgEl("line", { x1: pad.l, x2: W - pad.r, y1: gy, y2: gy, stroke: "rgba(255,255,255," + (g === 0 ? ".25" : ".07") + ")", "stroke-width": 1 }));
        var tl = svgEl("text", { x: pad.l - 8, y: gy + 4, "text-anchor": "end", "font-size": 11, fill: "#9A9AA2" }); tl.textContent = +gv.toFixed(1); svg.appendChild(tl);
      }
      var every = Math.ceil(n / Math.max(2, Math.floor(iw / 56)));
      c.labels.forEach(function (lab, i) {
        if (i % every && i !== n - 1) return;
        var t = svgEl("text", { x: X(i), y: H - 8, "text-anchor": i === 0 ? "start" : i === n - 1 ? "end" : "middle", "font-size": 11, fill: "#9A9AA2" }); t.textContent = lab; svg.appendChild(t);
      });
      var ends = [];
      c.series.forEach(function (s, si) {
        var col = multi ? SERIES[si % 4] : "var(--lime)";
        var d = s.values.map(function (v, i) { return (i ? "L" : "M") + X(i).toFixed(1) + " " + Y(v).toFixed(1); }).join(" ");
        if (!multi) {
          var area = svgEl("path", { d: d + " L" + X(n - 1) + " " + Y(0) + " L" + X(0) + " " + Y(0) + " Z", fill: "rgba(212,255,102,.10)" });
          svg.appendChild(area);
        }
        var p = svgEl("path", { d: d, fill: "none", stroke: col, "stroke-width": 2, "stroke-linejoin": "round", "stroke-linecap": "round" });
        svg.appendChild(p);
        if (!REDUCED && !box.dataset.drawn) {
          p.style.strokeDasharray = "2000"; p.style.strokeDashoffset = "2000";
          p.style.transition = "stroke-dashoffset 1.4s cubic-bezier(.2,.8,.2,1) " + si * 0.12 + "s";
          requestAnimationFrame(function () { requestAnimationFrame(function () { p.style.strokeDashoffset = "0"; }); });
        }
        ends.push({ y: Y(s.values[n - 1]), name: s.name, col: col });
      });
      if (labelRoom > 20) {
        ends.sort(function (a, b) { return a.y - b.y; });
        for (var e = 1; e < ends.length; e++) if (ends[e].y - ends[e - 1].y < 15) ends[e].y = ends[e - 1].y + 15;
        ends.forEach(function (en) {
          var t = svgEl("text", { x: W - pad.r + 10, y: en.y + 4, "font-size": 12, fill: "#C9C9D1" }); t.textContent = en.name; svg.appendChild(t);
        });
      }
      var cross = svgEl("line", { y1: pad.t, y2: pad.t + ih, stroke: "rgba(255,255,255,.35)", "stroke-width": 1, opacity: 0 });
      svg.appendChild(cross);
      var dots = c.series.map(function (s, si) {
        var d = svgEl("circle", { r: 5, fill: multi ? SERIES[si % 4] : "var(--lime)", stroke: "#26262A", "stroke-width": 2, opacity: 0 }); svg.appendChild(d); return d;
      });
      var hit = svgEl("rect", { x: pad.l - 10, y: 0, width: iw + 20, height: H, fill: "transparent" });
      svg.appendChild(hit);
      function move(ev) {
        var r = svg.getBoundingClientRect(), mx = ev.clientX - r.left;
        var i = Math.max(0, Math.min(n - 1, Math.round(((mx - pad.l) / iw) * (n - 1))));
        cross.setAttribute("x1", X(i)); cross.setAttribute("x2", X(i)); cross.setAttribute("opacity", 1);
        var rows = c.series.map(function (s, si) {
          dots[si].setAttribute("cx", X(i)); dots[si].setAttribute("cy", Y(s.values[i])); dots[si].setAttribute("opacity", 1);
          return '<div class="tr"><span><i style="background:' + (multi ? SERIES[si % 4] : "var(--lime)") + '"></i>' + esc(s.name) + "</span><b style=\"display:inline;margin:0\">" + fmt(s.values[i]) + "</b></div>";
        }).join("");
        showTip("<b>" + esc(c.labels[i]) + " · " + esc(c.unit || "") + "</b>" + rows, ev.clientX, ev.clientY);
      }
      function leave() { cross.setAttribute("opacity", 0); dots.forEach(function (d) { d.setAttribute("opacity", 0); }); hideTip(); }
      hit.addEventListener("pointermove", move); hit.addEventListener("pointerdown", move); hit.addEventListener("pointerleave", leave);
      box.appendChild(svg);
      if (multi) {
        box.appendChild(el("div", "legend", c.series.map(function (s, si) { return '<span><i style="background:' + SERIES[si % 4] + '"></i>' + esc(s.name) + "</span>"; }).join("")));
      }
      box.dataset.drawn = "1";
    }
    draw();
    if ("ResizeObserver" in window) {
      var lastW = box.clientWidth, ro = new ResizeObserver(function () { if (Math.abs(box.clientWidth - lastW) > 8) { lastW = box.clientWidth; draw(); } });
      ro.observe(box); observers.push(ro);
    }
  }

  function barChart(box, c) {
    var max = niceMax(Math.max.apply(null, c.items.map(function (i) { return i[1]; })));
    var wrap = el("div", "bars reveal");
    c.items.forEach(function (it) {
      var row = el("div", "bar", '<span class="bl">' + esc(it[0]) + '</span><span class="track"><span class="fill" data-w="' + (it[1] / max * 100).toFixed(1) + '%"></span></span><span class="bv">' + fmt(it[1]) + "</span>");
      row.addEventListener("pointermove", function (ev) { showTip("<b>" + esc(it[0]) + "</b>" + fmt(it[1]) + " " + esc(c.unit || ""), ev.clientX, ev.clientY); });
      row.addEventListener("pointerleave", hideTip);
      wrap.appendChild(row);
    });
    box.appendChild(wrap);
  }

  function stackChart(box, c) {
    var wrap = el("div", "stack reveal");
    c.labels.forEach(function (lab, li) {
      var total = c.series.reduce(function (a, s) { return a + (s.values[li] || 0); }, 0) || 1;
      var segs = el("div", "segs");
      c.series.forEach(function (s, si) {
        var v = s.values[li] || 0, pct = v / total * 100;
        var seg = el("span", "seg", pct >= 10 ? Math.round(pct) + "%" : "");
        seg.style.background = SERIES[si % 4]; seg.style.color = "#1D1D1F";
        seg.style.flexGrow = REDUCED ? pct : 0.0001; seg.style.flexBasis = "0"; seg.setAttribute("data-g", pct);
        seg.addEventListener("pointermove", function (ev) { showTip("<b>" + esc(lab) + "</b>" + esc(s.name) + ": " + fmt(v) + " " + esc(c.unit || ""), ev.clientX, ev.clientY); });
        seg.addEventListener("pointerleave", hideTip);
        segs.appendChild(seg);
      });
      var row = el("div", "srow", '<span class="bl">' + esc(lab) + "</span>"); row.appendChild(segs); wrap.appendChild(row);
    });
    box.appendChild(wrap);
    box.appendChild(el("div", "legend", c.series.map(function (s, si) { return '<span><i class="sq" style="background:' + SERIES[si % 4] + '"></i>' + esc(s.name) + "</span>"; }).join("")));
  }

  function rangeChart(box, c, topic) {
    var lo = Math.min.apply(null, c.items.map(function (i) { return i.lo; })), hi = Math.max.apply(null, c.items.map(function (i) { return i.hi; }));
    var span = Math.max(10, hi - lo), dmin = Math.max(0, Math.floor((lo - span * 0.3) / 5) * 5), dmax = Math.ceil((hi + span * 0.3) / 5) * 5;
    function P(v) { return ((v - dmin) / (dmax - dmin)) * 100; }
    var wrap = el("div", "reveal");
    c.items.forEach(function (it) {
      var s = topic.sources[it.src] || {}, col = "var(--src-" + (s.type || "kijamii") + ")";
      var row = el("div", "range-row", '<span><span class="dot src-' + esc(s.type) + '"></span> ' + esc(it.name) + "</span>");
      var svg = '<svg width="100%" height="30" aria-hidden="true" style="overflow:visible">' +
        '<line x1="0" x2="100%" y1="15" y2="15" stroke="rgba(255,255,255,.08)"/>' +
        '<line x1="' + P(it.lo) + '%" x2="' + P(it.hi) + '%" y1="15" y2="15" stroke="' + col + '" stroke-opacity=".45" stroke-width="10" stroke-linecap="round"/>' +
        '<circle cx="' + P(it.mid) + '%" cy="15" r="6" fill="' + col + '" stroke="#26262A" stroke-width="2"/>' +
        '<text x="' + P(it.mid) + '%" y="-2" text-anchor="middle" font-size="11" font-weight="600" fill="#F4F4F6">' + fmt(it.mid) + "</text></svg>";
      var track = el("span", "", svg); track.style.paddingTop = "10px"; row.appendChild(track);
      row.addEventListener("pointermove", function (ev) { showTip("<b>" + esc(it.name) + "</b>Range " + it.lo + "–" + it.hi + " " + esc(c.unit || "") + "<br>Point " + it.mid + "<br>" + esc(s.method || ""), ev.clientX, ev.clientY); });
      row.addEventListener("pointerleave", hideTip);
      wrap.appendChild(row);
    });
    var axis = el("div", "range-row", "<span></span><span style=\"display:flex;justify-content:space-between;font-size:11px;color:var(--muted)\"><span>" + dmin + "</span><span>" + Math.round((dmin + dmax) / 2) + "</span><span>" + dmax + "</span></span>");
    wrap.appendChild(axis);
    box.appendChild(wrap);
    var all = c.items.map(function (i) { return i.mid; });
    var note = "Sources range from " + Math.min.apply(null, all) + " to " + Math.max.apply(null, all) + " " + (c.unit || "") + ". " + (c.note || "");
    box.appendChild(el("div", "range-note", esc(note)));
  }

  function tableFor(c) {
    var h = '<table class="dt"><thead><tr>', b = "";
    if (c.kind === "line" || c.kind === "stack") {
      h += "<th></th>" + c.series.map(function (s) { return '<th class="n" style="text-align:right">' + esc(s.name) + "</th>"; }).join("") + "</tr></thead><tbody>";
      c.labels.forEach(function (l, i) { b += "<tr><td>" + esc(l) + "</td>" + c.series.map(function (s) { return '<td class="n">' + fmt(s.values[i]) + "</td>"; }).join("") + "</tr>"; });
    } else if (c.kind === "bar") {
      h += '<th></th><th style="text-align:right">' + esc(c.unit || "Value") + "</th></tr></thead><tbody>";
      c.items.forEach(function (it) { b += "<tr><td>" + esc(it[0]) + '</td><td class="n">' + fmt(it[1]) + "</td></tr>"; });
    } else {
      h += '<th>Source</th><th style="text-align:right">Low</th><th style="text-align:right">Point</th><th style="text-align:right">High</th></tr></thead><tbody>';
      c.items.forEach(function (it) { b += "<tr><td>" + esc(it.name) + '</td><td class="n">' + it.lo + '</td><td class="n">' + it.mid + '</td><td class="n">' + it.hi + "</td></tr>"; });
    }
    return h + b + "</tbody></table>";
  }

  function chartCard(c, topic, wide) {
    var card = el("article", "chart reveal" + (wide ? " wide" : ""));
    var s = c.src != null ? topic.sources[c.src] : null;
    card.innerHTML = "<header><div><h3>" + esc(c.title) + '</h3><div class="unit">' + esc(c.unit || "") + '</div></div><button type="button" class="tog" aria-pressed="false">' + T("Table") + '</button></header><div class="body"></div>' +
      "<footer>" + (s ? '<span class="dot src-' + esc(s.type) + '"></span> Source ' + (c.src + 1) + ": " + esc(s.name) + (s.n ? " · n=" + fmt(s.n) : "") : T("Sources as named on each row")) + "</footer>";
    var body = $(".body", card), btn = $(".tog", card);
    function render(asTable) {
      body.innerHTML = ""; delete body.dataset.drawn;
      if (asTable) { body.innerHTML = tableFor(c); return; }
      if (c.kind === "line") lineChart(body, c);
      else if (c.kind === "bar") barChart(body, c);
      else if (c.kind === "stack") stackChart(body, c);
      else if (c.kind === "range") rangeChart(body, c, topic);
      arm(body);
    }
    btn.addEventListener("click", function () {
      var on = btn.getAttribute("aria-pressed") !== "true"; btn.setAttribute("aria-pressed", on); btn.textContent = on ? T("Chart") : T("Table"); render(on);
    });
    card._render = function () { render(false); };
    return card;
  }

  function sparkline(t) {
    var line = (t.charts || []).filter(function (c) { return c.kind === "line"; })[0];
    if (line) {
      var vals = line.series[0].values, max = Math.max.apply(null, vals), min = Math.min.apply(null, vals), W = 280, H = 44;
      var pts = vals.map(function (v, i) { return (i / (vals.length - 1) * W).toFixed(1) + "," + (H - 4 - ((v - min) / ((max - min) || 1)) * (H - 10)).toFixed(1); });
      return '<svg class="spark" viewBox="0 0 ' + W + " " + H + '" preserveAspectRatio="none" width="100%" aria-hidden="true"><polyline points="' + pts.join(" ") + '" fill="none" stroke="' + accentOf(t) + '" stroke-width="2" vector-effect="non-scaling-stroke" stroke-linejoin="round"/></svg>';
    }
    var bar = (t.charts || []).filter(function (c) { return c.kind === "bar"; })[0];
    if (bar) {
      var bmax = Math.max.apply(null, bar.items.map(function (i) { return i[1]; })), bw = 280 / bar.items.length;
      return '<svg class="spark" viewBox="0 0 280 44" preserveAspectRatio="none" width="100%" aria-hidden="true">' + bar.items.map(function (it, i) {
        var h = it[1] / bmax * 40; return '<rect x="' + (i * bw + 2) + '" y="' + (44 - h) + '" width="' + (bw - 4) + '" height="' + h + '" rx="3" fill="' + accentOf(t) + '" opacity="' + (1 - i * 0.12) + '"/>';
      }).join("") + "</svg>";
    }
    return '<div class="spark"></div>';
  }

  /* ---------- views ---------- */
  function matches(t) {
    if (state.industry && t.industry !== state.industry) return false;
    if (state.market && t.market !== state.market) return false;
    if (state.src && !t.sources.some(function (s) { return s.type === state.src; })) return false;
    if (state.q) {
      var q = state.q.toLowerCase();
      var hay = [t.title, t.title_ar, t.headline, t.headline_ar, t.industry, IND(t.industry), t.market, (t.tags || []).join(" ")]
        .concat(t.sources.map(function (s) { return s.name; }))
        .concat((t.themes || []).map(function (th) { return th.title + " " + th.body + " " + (th.quotes || []).map(function (q) { return q.t; }).join(" "); }))
        .concat((t.kpis || []).map(function (k) { return k.label; })).join(" ").toLowerCase();
      if (hay.indexOf(q) < 0) return false;
    }
    return true;
  }

  function numHtml(k) {
    if (typeof k.value !== "number") return null;
    return '<span data-count="' + k.value + '" data-suffix="' + esc(k.unit) + '">0' + esc(k.unit) + "</span>";
  }

  function cardHtml(t) {
    var k = (t.kpis || []).filter(function (k) { return typeof k.value === "number"; })[0] || (t.kpis || [])[0];
    var types = {}; t.sources.forEach(function (s) { types[s.type] = 1; });
    var badges = (t.sample ? '<span class="badge sample">' + T("Sample") + "</span>" : "") + (t.audience === "internal" ? '<span class="badge internal">' + T("Team only") + "</span>" : "");
    var n = t.sources.length;
    return '<a class="card reveal" href="#/t/' + encodeURIComponent(t.id) + '" style="--accent:' + accentOf(t) + '">' +
      '<div class="top"><span class="eyebrow">' + esc(IND(t.industry)) + " · " + esc(MKT(t.market)) + "</span><span>" + badges + "</span></div>" +
      "<h3>" + highlight(L(t, "title"), state.q) + "</h3><p>" + highlight(L(t, "headline"), state.q) + "</p>" + sparkline(t) +
      (k ? '<div class="hero-num"><strong>' + (numHtml(k) || esc(k.value)) + "</strong><span>" + esc(k.label) + "</span></div>" : "") +
      '<div class="foot"><span class="srcs">' + Object.keys(types).map(function (ty) { return '<span class="dot src-' + ty + '" title="' + T(SRC_LABEL[ty]) + '"></span>'; }).join("") + "&nbsp;" + n + " " + T(n > 1 ? "sources" : "source") + "</span><span>" + esc(t.period) + "</span></div></a>";
  }

  function chipRow(label, key, values, labeler) {
    var html = '<div class="frow" role="group" aria-label="' + T(label) + '"><span class="lbl">' + T(label) + '</span><button type="button" class="chip" data-f="' + key + '" data-v="" aria-pressed="' + (!state[key]) + '">' + T("All") + "</button>";
    values.forEach(function (v) {
      html += '<button type="button" class="chip" data-f="' + key + '" data-v="' + esc(v) + '" aria-pressed="' + (state[key] === v) + '">' + (labeler ? labeler(v) : esc(v)) + "</button>";
    });
    return html + "</div>";
  }

  function cultureTeaser() {
    var e = CULTURE[0]; if (!e) return "";
    return '<section class="pulse-band"><div class="wrap">' +
      '<div><p class="kicker">' + T("Culture Pulse · every month") + '</p><h2>' + esc(L(e, "month")) + '</h2><p class="pb-lede">' + esc(L(e, "headline")) + "</p></div>" +
      '<div class="pb-moments">' + e.moments.slice(0, 3).map(function (m) {
        return '<a href="#/culture/' + e.id + '"><strong>' + esc(m.stats[0][0]) + "</strong><span>" + esc(L(m, "title")) + "</span></a>";
      }).join("") + '</div><a class="btn" href="#/culture/' + e.id + '">' + T("Open this month →") + "</a></div></section>";
  }

  function viewHome() {
    var vis = visible();
    var inds = LIB.industries.filter(function (i) { return vis.some(function (t) { return t.industry === i; }); });
    var mkts = []; vis.forEach(function (t) { if (mkts.indexOf(t.market) < 0) mkts.push(t.market); });
    var nSrc = vis.reduce(function (a, t) { return a + t.sources.length; }, 0);
    var nPts = vis.reduce(function (a, t) {
      return a + (t.kpis || []).length + (t.charts || []).reduce(function (b, c) { return b + (c.items ? c.items.length : c.series.reduce(function (x, s) { return x + s.values.length; }, 0)); }, 0);
    }, 0);
    var nQuotes = vis.reduce(function (a, t) { return a + (t.themes || []).reduce(function (b, th) { return b + (th.quotes || []).length; }, 0); }, 0);

    app.innerHTML =
      '<section class="hero">' + kmark() + '<div class="wrap"><div class="copy">' +
        '<p class="kicker">' + T("Kijamii Consumer Insights & Data Studio") + "</p>" +
        (state.lang === "ar" ? "<h1>مكتبة <em>الرؤى</em></h1>" : "<h1>Intelligence <em>Library</em></h1>") +
        '<p class="lede">' + T("Industry numbers, dashboards and the human voice behind them, from our own reports, syndicated studies and proactive research. Big picture, clearly sourced.") + "</p>" +
        '<label class="search"><span class="sr">' + T("Search the library") + '</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>' +
        '<input id="q" type="search" placeholder="' + T("Search industries, themes, quotes…") + '" value="' + esc(state.q) + '" autocomplete="off"></label>' +
      "</div>" +
      '<div class="counters reveal">' +
        '<div><strong data-count="' + vis.length + '">0</strong><span>' + T("Topics") + "</span></div>" +
        '<div><strong data-count="' + inds.length + '">0</strong><span>' + T("Industries") + "</span></div>" +
        '<div><strong data-count="' + nSrc + '">0</strong><span>' + T("Sources cited") + "</span></div>" +
        '<div><strong data-count="' + nPts + '">0</strong><span>' + T("Data points") + (nQuotes ? " · " + nQuotes + " " + T("verbatims") : "") + "</span></div>" +
      "</div></div></section>" +
      '<section class="principles" aria-label="' + T("How to read this") + '"><div class="wrap"><ul>' +
        [["Industry, not brand", "Every topic reads the category, never one company."], ["Every number has a source", "Tap any figure to see where it came from and its base."],
         ["Confidence on every figure", "High, medium or directional, stated up front."], ["Where it stops", "Each topic says what the evidence cannot support."]]
          .map(function (p) { return "<li><span><b>" + T(p[0]) + "</b>" + T(p[1]) + "</span></li>"; }).join("") +
      "</ul></div></section>" +
      cultureTeaser() +
      '<section class="browse"><div class="wrap">' +
        '<div class="browse-head"><h2>' + T("Browse the library") + '</h2><a class="btn ghost sm" href="#/coverage">' + T("See coverage map →") + "</a></div>" +
        '<div class="filters">' + chipRow("Industry", "industry", inds, function (v) { return esc(IND(v)); }) + chipRow("Market", "market", mkts, function (v) { return esc(MKT(v)); }) +
          chipRow("Source", "src", ["kijamii", "syndicated", "proactive"], function (v) { return '<span class="dot src-' + v + '"></span>' + T(SRC_LABEL[v]); }) + "</div>" +
        '<div class="result-line"><span id="count"></span><button type="button" class="linkish" id="clear" hidden>' + T("Clear filters") + "</button></div>" +
        '<div class="grid" id="grid"></div>' +
      "</div></section>";

    var q = $("#q");
    q.addEventListener("input", function () { state.q = q.value.trim(); renderGrid(); });
    $$(".chip[data-f]").forEach(function (b) {
      b.addEventListener("click", function () {
        var key = b.getAttribute("data-f"); state[key] = b.getAttribute("data-v");
        $$('.chip[data-f="' + key + '"]').forEach(function (o) { o.setAttribute("aria-pressed", o === b); });
        renderGrid();
      });
    });
    $("#clear").addEventListener("click", function () { state.q = state.industry = state.market = state.src = ""; viewHome(); });
    renderGrid();
    arm(app);
  }

  function renderGrid() {
    var grid = $("#grid"); if (!grid) return;
    var list = visible().filter(matches);
    grid.innerHTML = list.map(cardHtml).join("");
    var empty = $(".empty"); if (empty) empty.remove();
    if (!list.length) grid.insertAdjacentHTML("afterend", '<div class="empty">' + T("Nothing matches yet. Try a broader word, or clear the filters.") + "</div>");
    $("#count").textContent = list.length + " " + T("of") + " " + visible().length + " " + T("topics");
    $("#clear").hidden = !(state.q || state.industry || state.market || state.src);
    arm(grid);
  }

  function renderTopic(t, root, isPreview) {
    var acc = accentOf(t);
    var badges = '<span class="badge">' + esc(IND(t.industry)) + '</span><span class="badge">' + esc(MKT(t.market)) + '</span><span class="badge">' + esc(t.period) + "</span>" +
      (t.sample ? '<span class="badge sample">' + T("Sample data") + "</span>" : "") + (t.audience === "internal" ? '<span class="badge internal">' + T("Team only") + "</span>" : "");
    var srcList = t.sources.map(function (s, i) {
      var age = monthsAgo(s.date), dated = age != null && age > DATED_MONTHS;
      return '<li id="src-' + i + '"><span class="sn src-' + esc(s.type) + '">' + (i + 1) + '</span><span><span class="sname">' + esc(s.name) + '</span><br><span class="sdesc">' + esc(s.method) + (s.n ? " · n=" + fmt(s.n) : "") + " · " + esc(s.date) + (dated ? " · <b>" + T("older than") + " " + DATED_MONTHS + " " + T("months") + "</b>" : "") + '</span></span><span class="stype">' + (T(SRC_LABEL[s.type]) || esc(s.type)) + "</span></li>";
    }).join("");
    var kpis = (t.kpis || []).map(function (k) {
      var val = typeof k.value === "number" ? "<strong>" + numHtml(k) + "</strong>" : '<strong class="word">' + esc(k.value) + "</strong>";
      return '<div class="kpi reveal">' + val + '<span class="lab">' + esc(k.label) + '</span><span class="note">' + esc(k.note || "") + '</span><div class="row">' + confHtml(k.conf) +
        (k.src != null && t.sources[k.src] ? '<button type="button" class="srcref" data-src="' + k.src + '" title="' + esc(t.sources[k.src].name) + '">' + T("Source") + " " + (k.src + 1) + "</button>" : "") + "</div></div>";
    }).join("");
    var themes = (t.themes || []).map(function (th) {
      var w = WEIGHT[th.weight] || 1, m = "";
      for (var i = 0; i < 3; i++) m += '<i class="' + (i < w ? "on" : "") + '"></i>';
      return '<article class="theme reveal"><div class="w"><span class="meter">' + m + "</span>" + T(th.weight) + "</div><h3>" + esc(th.title) + "</h3><p>" + esc(th.body) + "</p>" +
        (th.quotes || []).map(function (q) { var ar = q.lang === "ar" || isAr(q.t); return '<blockquote class="quote" dir="' + (ar ? "rtl" : "ltr") + '" lang="' + (ar ? "ar" : "en") + '">' + esc(q.t) + "</blockquote>"; }).join("") +
        ((th.quotes || []).length ? '<span class="qn">' + T("Verbatims in their original language, lightly anonymised.") + "</span>" : "") + "</article>";
    }).join("");
    var related = isPreview ? [] : visible().filter(function (o) { return o.id !== t.id && (o.industry === t.industry || o.market === t.market); }).slice(0, 3);
    var scope = state.lang === "ar" ? AR.scope_text.replace("{ind}", IND(t.industry)).replace("{mkt}", MKT(t.market)).replace("{per}", t.period)
      : "This topic describes the " + (t.industry || "").toLowerCase() + " category in " + t.market + ", " + t.period + ". It does not rate any single brand. Numbers from different sources use different bases; compare the direction, not the decimals.";

    root.innerHTML =
      '<section class="topic-hero" style="--accent:' + acc + '">' + kmark() + '<div class="wrap">' +
        (isPreview ? "" : '<a class="back" href="#/">' + T("← All topics") + "</a>") +
        '<div class="meta">' + badges + "</div><h1>" + esc(L(t, "title")) + '</h1><p class="headline">' + esc(L(t, "headline")) + "</p>" +
        ((t.culture || []).length && !isPreview ? '<p style="margin-top:22px;position:relative"><a class="btn sm" href="#/culture/' + t.culture[0] + '">' + T("Read the monthly Culture Pulse →") + "</a></p>" : "") +
      "</div></section>" +
      '<section class="section"><div class="wrap"><span class="kicker">' + T("How to read this") + '</span><div class="readbox reveal">' +
        '<div class="scope"><span class="kicker">' + T("Scope") + "</span><h3>" + T("Industry-level read") + "</h3><p>" + esc(scope) + "</p></div>" +
        "<ol>" + srcList + "</ol></div></div></section>" +
      (kpis ? '<section class="section" style="--accent:' + acc + '"><div class="wrap"><span class="kicker">' + T("The numbers") + '</span><div class="kpis">' + kpis + "</div></div></section>" : "") +
      ((t.charts || []).length ? '<section class="section"><div class="wrap"><span class="kicker">' + T("Dashboards") + '</span><div class="charts" id="charts"></div></div></section>' : "") +
      (themes ? '<section class="section"><div class="wrap"><span class="kicker">' + T("What people say") + '</span><div class="themes">' + themes + "</div></div></section>" : "") +
      '<section class="section"><div class="wrap"><span class="kicker">' + T("Where the evidence stops") + '</span><div class="saycols">' +
        '<div class="say yes reveal"><h3>' + T("We can say") + "</h3><ul>" + (t.canSay || []).map(function (s) { return "<li><span>" + esc(s) + "</span></li>"; }).join("") + "</ul></div>" +
        '<div class="say no reveal"><h3>' + T("We can’t say") + "</h3><ul>" + (t.cantSay || []).map(function (s) { return "<li><span>" + esc(s) + "</span></li>"; }).join("") + "</ul></div>" +
      "</div></div></section>" +
      (related.length ? '<section class="section"><div class="wrap"><span class="kicker">' + T("Related") + '</span><div class="related">' + related.map(function (o) {
        return '<a href="#/t/' + encodeURIComponent(o.id) + '"><span>' + esc(IND(o.industry)) + " · " + esc(MKT(o.market)) + "</span><b>" + esc(L(o, "title")) + "</b></a>";
      }).join("") + "</div></div></section>" : "");

    var chartsBox = $("#charts", root);
    if (chartsBox) {
      var n = t.charts.length;
      t.charts.forEach(function (c, i) {
        var wide = c.kind === "line" || c.kind === "range" || (n % 2 === 1 && i === n - 1);
        var card = chartCard(c, t, wide); chartsBox.appendChild(card); card._render();
      });
    }
    $$(".srcref", root).forEach(function (b) {
      b.addEventListener("click", function () {
        var li = $("#src-" + b.getAttribute("data-src"), root); if (!li) return;
        li.scrollIntoView({ behavior: REDUCED ? "auto" : "smooth", block: "center" });
        li.classList.add("flash"); setTimeout(function () { li.classList.remove("flash"); }, 1600);
      });
    });
    arm(root);
  }

  function message(title, body) {
    app.innerHTML = '<section class="section"><div class="wrap"><h2 class="page-h2">' + title + '</h2><p class="muted" style="margin-top:12px">' + body + ' <a href="#/">' + T("Back to the library") + "</a></p></div></section>";
  }

  function viewTopic(id) {
    var t = LIB.topics.filter(function (x) { return x.id === id; })[0];
    if (!t) return message(T("Topic not found"), "");
    if ((t.audience === "internal" || t.sample) && state.aud !== "internal") return message(T("This topic is for the team only"), T("Switch to Team view to open it."));
    renderTopic(t, app, false);
    document.title = L(t, "title") + " · Kijamii Intelligence Library";
  }

  function viewCoverage() {
    var vis = visible(), types = ["kijamii", "syndicated", "proactive"];
    var inds = state.aud === "internal" ? LIB.industries : LIB.industries.filter(function (i) { return vis.some(function (t) { return t.industry === i; }); });
    var rows = inds.map(function (ind) {
      var ts = vis.filter(function (t) { return t.industry === ind; });
      return { ind: ind, total: ts.length, counts: types.map(function (ty) { return ts.reduce(function (a, t) { return a + t.sources.filter(function (s) { return s.type === ty; }).length; }, 0); }) };
    });
    var max = Math.max(1, Math.max.apply(null, rows.map(function (r) { return Math.max.apply(null, r.counts); })));
    function shade(v) { var a = [0, .28, .55, .8, 1][Math.min(4, Math.ceil(v / max * 4))]; return "rgba(212,255,102," + a + ")"; }
    var body = rows.map(function (r) {
      return '<tr><th class="r" scope="row">' + esc(IND(r.ind)) + "</th>" + r.counts.map(function (v, i) {
        if (!v) return '<td class="z">' + (state.lang === "ar" ? "لا يوجد بعد" : "none yet") + "</td>";
        var dark = v / max > 0.5;
        return '<td style="background:' + shade(v) + ";color:" + (dark ? "#1D1D1F" : "#F4F4F6") + '"><a href="#/" data-ind="' + esc(r.ind) + '" data-src="' + types[i] + '" title="' + v + " · " + T(SRC_LABEL[types[i]]) + " · " + esc(IND(r.ind)) + '">' + v + "</a></td>";
      }).join("") + '<td style="background:var(--char-3);color:#fff">' + r.total + "</td></tr>";
    }).join("");
    var gaps = [];
    rows.forEach(function (r) {
      if (!r.total) gaps.push(["No topic yet", r.ind]);
      else if (r.counts.filter(Boolean).length === 1) gaps.push(["Only one kind of source", r.ind + ": add a second source type to triangulate."]);
    });
    app.innerHTML = '<section class="section"><div class="wrap"><a class="back" href="#/">' + T("← All topics") + "</a>" +
      '<p class="kicker" style="margin-top:26px">' + T("Coverage") + '</p><h2 class="page-h2" style="margin-top:12px">' + T("Where the library is strong, and where it’s thin") + "</h2>" +
      '<p class="muted" style="margin-top:12px;max-width:60ch">' + (state.lang === "ar" ? "كل خانة تعدّ المصادر خلف موضوعات القطاع. يكون الموضوع أقوى عندما يتفق نوعان أو أكثر من المصادر. اضغط على خانة لتصفّحها." : "Each cell counts the sources behind topics in that industry. A topic is strongest when two or more source types agree. Tap a cell to browse it.") + "</p>" +
      '<div class="cov-wrap reveal"><table class="cov"><thead><tr><th>' + T("Industry") + "</th>" + types.map(function (ty) { return '<th><span class="dot src-' + ty + '"></span> ' + T(SRC_LABEL[ty]) + "</th>"; }).join("") + "<th>" + T("Topics") + "</th></tr></thead><tbody>" + body + "</tbody></table></div>" +
      '<div class="cov-legend">' + (state.lang === "ar" ? "أقل" : "Fewer") + ' <i style="background:rgba(212,255,102,.28)"></i><i style="background:rgba(212,255,102,.55)"></i><i style="background:rgba(212,255,102,.8)"></i><i style="background:#D4FF66"></i> ' + (state.lang === "ar" ? "مصادر أكثر" : "More sources") + "</div>" +
      (state.aud === "internal" && gaps.length ? '<p class="kicker" style="margin-top:46px">Gaps to plan for (team view)</p><div class="gaps">' + gaps.map(function (g) { return '<div class="gap reveal"><b>' + esc(g[0]) + "</b><span>" + esc(g[1]) + "</span></div>"; }).join("") + "</div>" : "") +
      "</div></section>";
    $$("td a[data-ind]").forEach(function (a) {
      a.addEventListener("click", function () { state.industry = a.getAttribute("data-ind"); state.src = a.getAttribute("data-src"); state.market = ""; state.q = ""; });
    });
    arm(app);
  }

  /* ---------- Culture Pulse ---------- */
  function momentCard(m) {
    return '<article class="moment reveal ' + (m.kind === "culture" ? "m-culture" : "m-ent") + '">' +
      "<h3>" + esc(L(m, "title")) + "</h3>" + (state.lang === "ar" && m.title_ar ? '<p class="m-en">' + esc(m.title) + "</p>" : "") +
      '<p class="m-sub">' + esc(m.sub) + "</p>" +
      '<div class="m-stats">' + m.stats.map(function (s) { return "<div><strong>" + esc(s[0]) + "</strong><span>" + esc(s[1]) + "</span></div>"; }).join("") + "</div>" +
      '<ol class="m-points">' + m.points.map(function (p) { return "<li><b>" + esc(p[0]) + "</b><span>" + esc(p[1]) + "</span></li>"; }).join("") + "</ol></article>";
  }

  function titleCard(ti) {
    return '<article class="title-card reveal"><header><div><h3>' + esc(ti.name) + '</h3><span class="muted">' + esc(ti.origin) + " · " + T("Released") + " " + esc(ti.release) + '</span></div><div class="tc-n"><strong data-count="' + ti.conversations + '">0</strong><span>' + T("conversations") + "</span></div></header>" +
      '<p class="tc-blurb">' + esc(ti.blurb) + "</p>" +
      '<div class="tc-cols"><div><h4 class="pos">' + T("What people praised") + "</h4><ul>" + ti.praise.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div>" +
      '<div><h4 class="neg">' + T("What people criticised") + "</h4><ul>" + ti.criticism.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div></div></article>";
  }

  function viewCulture(id) {
    if (!CULTURE.length) return message("Culture Pulse", "");
    var e = CULTURE.filter(function (x) { return x.id === id; })[0] || CULTURE[0];
    var culture = e.moments.filter(function (m) { return m.kind === "culture"; }), ent = e.moments.filter(function (m) { return m.kind !== "culture"; });
    var pseudo = { sources: [{ type: "kijamii", name: "Kijamii Culture Pulse, " + e.month, n: null }] };
    app.innerHTML =
      '<section class="topic-hero culture-hero" style="--accent:var(--red)">' + kmark() + '<div class="wrap">' +
        '<p class="kicker">' + T("Culture Pulse") + " · " + T("Monthly cultural intelligence") + "</p>" +
        '<h1 class="c-month">' + esc(L(e, "month")) + '</h1><p class="headline">' + esc(L(e, "headline")) + "</p>" +
        '<div class="meta" role="group" aria-label="' + T("Editions") + '">' + CULTURE.map(function (x) {
          return '<a class="chip" href="#/culture/' + x.id + '" aria-pressed="' + (x.id === e.id) + '">' + esc(L(x, "month")) + "</a>";
        }).join("") + "</div>" +
        '<p class="c-note">' + T("Public conversation, shared with everyone. Read these as cultural signals: conversation is not viewership.") + "</p>" +
      "</div></section>" +
      (culture.length ? '<section class="section"><div class="wrap"><span class="kicker">' + T("Saudi culture") + '</span><div class="moments">' + culture.map(momentCard).join("") + "</div></div></section>" : "") +
      (ent.length ? '<section class="section"><div class="wrap"><span class="kicker">' + T("Entertainment pulse") + '</span><div class="moments">' + ent.map(momentCard).join("") + "</div></div></section>" : "") +
      '<section class="section"><div class="wrap"><span class="kicker">' + T("Trending titles") + '</span><div class="charts" id="cTitles"></div><div class="titles">' + e.titles.map(titleCard).join("") + "</div></div></section>" +
      '<section class="section"><div class="wrap"><span class="kicker">' + T("Streaming landscape") + '</span><div class="stream-grid">' + e.streaming.map(function (s, i) {
        return '<div class="stream reveal"><span class="sn">0' + (i + 1) + "</span><b>" + esc(s[0]) + "</b><span>" + esc(s[1]) + "</span></div>";
      }).join("") + "</div></div></section>" +
      '<section class="section"><div class="wrap"><span class="kicker">' + T("Saudi YouTube") + '</span><div class="charts" id="cYT"></div>' +
        '<p class="range-note" style="margin-top:14px">' + esc(e.youtube.formats) + "</p>" +
        (e.music.length ? '<div class="music reveal"><h3>' + T("Music") + "</h3>" + e.music.map(function (m) {
          return '<div class="mrow"><span><b>' + esc(m[0]) + '</b> <span dir="auto">' + esc(m[1]) + "</span></span><span>" + (m[2] / 1e6).toFixed(m[2] >= 1e6 ? 1 : 2) + "M</span></div>";
        }).join("") + "</div>" : "") +
      "</div></section>" +
      '<section class="section"><div class="wrap"><div class="c-method reveal"><span class="kicker">' + T("How we read it") + "</span><p>" +
        (state.lang === "ar" ? AR.culture_method : "Monthly listening across public social posts, " + esc(e.period) + ". Numbers are as reported in that month's Kijamii Culture Pulse. Platform-by-platform and brand comparisons are left out on purpose.") +
      "</p></div></div></section>";

    var tBox = $("#cTitles");
    var tc = chartCard({ kind: "bar", title: T("Most-discussed titles") + " · " + L(e, "month"), unit: T("conversations"), src: 0, items: e.titles.map(function (t) { return [t.name, t.conversations]; }) }, pseudo, true);
    tBox.appendChild(tc); tc._render();
    var yBox = $("#cYT");
    var yc = chartCard({ kind: "bar", title: T("Top creator uploads") + " · " + L(e, "month"), unit: T("million views") + " · " + e.youtube.note, src: 0,
      items: e.youtube.videos.map(function (v) { return [v[0] + " · " + v[1], +(v[2] / 1e6).toFixed(1)]; }) }, pseudo, true);
    yBox.appendChild(yc); yc._render();
    document.title = "Culture Pulse · " + e.month + " · Kijamii Intelligence Library";
    arm(app);
  }

  /* ---------- Add research: evidence check + local preview ---------- */
  var OVERREACH = /\b(will (?:grow|reach|double|become)|always|everyone|every saudi|all (?:saudis|consumers|egyptians)|the best|winning|market leader|leading brand|dominat\w*|guarantee\w*|proves?|proven)\b/i;

  function checkTopic(t) {
    var out = [];
    function add(lv, msg) { out.push([lv, msg]); }
    ["id", "title", "industry", "market", "period", "headline"].forEach(function (f) { if (!t[f]) add("err", "Missing “" + f + "”."); });
    if (t.id && /[^a-z0-9-]/.test(t.id)) add("err", "The id should use lowercase letters, numbers and dashes only.");
    if (LIB.topics.some(function (x) { return x.id === t.id; })) add("warn", "A topic with this id already exists; publishing would replace it.");
    if (t.industry && LIB.industries.indexOf(t.industry) < 0) add("warn", "“" + t.industry + "” is a new industry name. Check the spelling or add it to the list.");
    if (/\bKSA\b/.test(JSON.stringify(t))) add("warn", "Use “SA”, not “KSA”.");
    if (!Array.isArray(t.sources) || !t.sources.length) add("err", "No sources. Every topic needs at least one.");
    (t.sources || []).forEach(function (s, i) {
      var tag = "Source " + (i + 1);
      if (!SRC_LABEL[s.type]) add("err", tag + ": type must be kijamii, syndicated or proactive.");
      if (!s.method) add("warn", tag + ": say how the data was collected.");
      var age = monthsAgo(s.date);
      if (age == null) add("err", tag + ": add a date (YYYY-MM).");
      else if (age > 30) add("warn", tag + " is " + age + " months old. Label it as history, not the current picture.");
    });
    if ((t.sources || []).length === 1) add("warn", "Only one source. Fine for a scoping note; for client use, add a second source type.");
    (t.kpis || []).forEach(function (k) {
      var s = (t.sources || [])[k.src], tag = "Number “" + k.label + "”";
      if (!s) { add("err", tag + " doesn’t point to a source."); return; }
      if (!CONF[k.conf]) add("warn", tag + ": set confidence (high, medium or directional).");
      if (s.n != null && s.n < 50 && k.unit === "%") add("warn", tag + ": base is " + s.n + ". Show it as a count (e.g. 13 of 18), not a percentage.");
      if (k.conf === "high" && s.n != null && s.n < 300) add("warn", tag + ": “high” confidence on a base of " + s.n + ". Medium or directional is safer.");
      if (s.type === "syndicated" && /forecast|outlook|by 20\d\d/i.test(k.label) && k.conf !== "directional") add("warn", tag + ": forecasts from other publishers should be marked directional.");
    });
    (t.charts || []).forEach(function (c) {
      if (c.kind !== "range" && (c.src == null || !(t.sources || [])[c.src])) add("err", "Chart “" + c.title + "” doesn’t point to a source.");
      if (["line", "bar", "stack", "range"].indexOf(c.kind) < 0) add("err", "Chart “" + c.title + "”: kind must be line, bar, stack or range.");
      if (c.kind === "line" && c.series && c.series.length > 4) add("warn", "Chart “" + c.title + "” has more than 4 lines; fold the rest into “Other”.");
    });
    var words = [t.title, t.headline].concat(t.canSay || []).concat((t.themes || []).map(function (th) { return th.title + " " + th.body; })).join(" · ");
    var m = OVERREACH.exec(words);
    if (m) add("warn", "Overreach check: “" + m[0] + "”. Say what the data shows, not what will happen or who is winning.");
    if (/\bbrand\b/i.test((t.title || "") + " " + (t.headline || ""))) add("warn", "The title or headline mentions a brand. Library topics read the industry, not one company.");
    if (!(t.cantSay || []).length) add("err", "Add at least one “we can’t say” line, so readers know where the evidence stops.");
    if (!(t.canSay || []).length) add("warn", "Add the “we can say” lines.");
    if (!out.some(function (o) { return o[0] === "err"; }) && !out.length) add("ok", "Clean. Every number is sourced and nothing overreaches.");
    return out;
  }

  var TEMPLATE = {
    id: "industry-market", sample: false, title: "Industry or theme (never one brand)", industry: "Retail", market: "SA", period: "2026", audience: "internal",
    tags: ["tag"],
    sources: [{ type: "kijamii", name: "Report name", date: "2026-01", method: "How it was collected", n: 1000 }],
    headline: "One sentence: the big-picture read.",
    kpis: [{ label: "What the number is", value: 50, unit: "%", src: 0, conf: "medium", note: "Base and period" }],
    charts: [{ kind: "bar", title: "Chart title", unit: "% of mentions", src: 0, items: [["Item A", 40], ["Item B", 30]] }],
    themes: [{ title: "Theme", weight: "Emerging", body: "What it means.", quotes: [{ t: "Original-language verbatim", lang: "en" }] }],
    canSay: ["What the evidence supports."], cantSay: ["Where it stops."]
  };

  function download(name, text) {
    var a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([text], { type: "application/json" })); a.download = name;
    document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }

  function viewAdd() {
    app.innerHTML = '<section class="section"><div class="wrap"><a class="back" href="#/">← All topics</a>' +
      '<p class="kicker" style="margin-top:26px">Add research</p><h2 class="page-h2" style="margin-top:12px">Check a topic before it goes in</h2>' +
      '<p class="muted" style="margin-top:12px;max-width:62ch">Drop a topic file to run the evidence check and preview it exactly as clients will see it. Nothing is uploaded: the file stays in your browser.</p>' +
      '<div class="steps"><div><b>1 · Fill the template</b><span>One topic per file. Every number points to a source.</span></div><div><b>2 · Drop it here</b><span>The check flags missing sources, small bases and overreaching words.</span></div><div><b>3 · Publish</b><span>Copy the checked entry into the library file, or send it to the insights lead.</span></div></div>' +
      '<label class="drop" id="drop"><h3>Drop a topic file (.json)</h3><p>or choose one from your computer</p><input type="file" id="file" accept=".json,application/json" class="sr"><span class="acts"><span class="btn">Choose file</span><button type="button" class="btn ghost" id="tpl">Download template</button></span></label>' +
      '<div id="result"></div></div></section><div id="pv"></div>';
    var drop = $("#drop"), file = $("#file");
    $("#tpl").addEventListener("click", function (e) { e.preventDefault(); download("library-topic-template.json", JSON.stringify(TEMPLATE, null, 2)); });
    file.addEventListener("change", function () { if (file.files[0]) read(file.files[0]); });
    ["dragenter", "dragover"].forEach(function (ev) { drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.add("over"); }); });
    ["dragleave", "drop"].forEach(function (ev) { drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.remove("over"); }); });
    drop.addEventListener("drop", function (e) { if (e.dataTransfer.files[0]) read(e.dataTransfer.files[0]); });
    if (preview) showResult(preview);
  }

  function read(f) {
    var r = new FileReader();
    r.onload = function () {
      var t;
      try { t = JSON.parse(r.result); if (t && Array.isArray(t.topics)) t = t.topics[0]; }
      catch (e) { $("#result").innerHTML = '<div class="check"><h3>That file isn’t valid JSON</h3><p style="margin-top:8px">' + esc(e.message) + "</p></div>"; return; }
      if (!t || typeof t !== "object") return;
      t.sources = t.sources || []; preview = t; showResult(t);
    };
    r.readAsText(f);
  }

  function showResult(t) {
    var res = checkTopic(t), errs = res.filter(function (r) { return r[0] === "err"; }).length;
    $("#result").innerHTML = '<div class="check reveal in"><h3>' + (errs ? errs + " thing" + (errs > 1 ? "s" : "") + " to fix before publishing" : "Ready to publish") + "</h3><ul>" +
      res.map(function (r) { return '<li><span class="lv ' + r[0] + '">' + { err: "Fix", warn: "Check", ok: "OK" }[r[0]] + "</span><span>" + esc(r[1]) + "</span></li>"; }).join("") + "</ul>" +
      '<div class="acts"><button type="button" class="btn" id="copy"' + (errs ? " disabled style=\"opacity:.45;cursor:not-allowed\"" : "") + '>Copy entry</button><button type="button" class="btn ghost" id="dl">Download checked file</button></div></div>';
    var json = JSON.stringify(t, null, 2);
    var copy = $("#copy");
    copy.addEventListener("click", function () {
      if (errs) return;
      (navigator.clipboard ? navigator.clipboard.writeText(json + ",") : Promise.reject()).then(function () { copy.textContent = "Copied"; }, function () { download((t.id || "topic") + ".json", json); });
    });
    $("#dl").addEventListener("click", function () { download((t.id || "topic") + ".json", json); });
    var pv = $("#pv");
    if (errs && (!t.title || !t.sources.length)) { pv.innerHTML = ""; return; }
    pv.innerHTML = '<div class="wrap"><div class="preview-frame"><div class="bar-top">Preview · this is how the topic will look</div><div id="pvBody"></div></div></div>';
    try { renderTopic(Object.assign({ industry: "", market: "", period: "", kpis: [], charts: [], themes: [] }, t), $("#pvBody"), true); $$("#pvBody .reveal").forEach(function (n) { n.classList.add("in"); }); }
    catch (e) { $("#pvBody").innerHTML = '<p style="padding:24px">The preview couldn’t draw this file: ' + esc(e.message) + "</p>"; }
  }

  /* ---------- shell ---------- */
  function setAud(a) {
    state.aud = a;
    try { localStorage.setItem("kil-aud", a); } catch (e) {}
    $$(".aud button[data-aud]").forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-aud") === a); });
  }
  function setLang(l) {
    state.lang = l;
    try { localStorage.setItem("kil-lang", l); } catch (e) {}
    document.documentElement.lang = l;
    document.documentElement.dir = l === "ar" ? "rtl" : "ltr";
    $$("[data-t]").forEach(function (n) { n.textContent = T(n.getAttribute("data-t")); });
    var b = $("#langBtn"); b.textContent = l === "ar" ? "EN" : "عربي"; b.setAttribute("lang", l === "ar" ? "en" : "ar");
    b.setAttribute("aria-label", l === "ar" ? "Switch to English" : "التبديل إلى العربية");
  }
  $$(".aud button[data-aud]").forEach(function (b) { b.addEventListener("click", function () { setAud(b.getAttribute("data-aud")); route(); }); });
  $("#langBtn").addEventListener("click", function () { setLang(state.lang === "ar" ? "en" : "ar"); route(true); });

  function sampleBar() {
    var any = visible().some(function (t) { return t.sample; });
    $("#sampleBar").innerHTML = any ? '<div class="sample-bar"><div class="wrap"><b>' + T("Sample content.") + "</b> " + T("Topics marked “Sample” use made-up numbers to show the layout. Don’t share them as findings.") + "</div></div>" : "";
  }

  function route(keepScroll) {
    cleanup();
    var h = location.hash.replace(/^#\/?/, ""), parts = h.split("/");
    var page = parts[0] === "t" ? "topic" : parts[0] || "home";
    $$("[data-nav]").forEach(function (a) { if (a.getAttribute("data-nav") === page) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); });
    document.title = "Kijamii Intelligence Library";
    sampleBar();
    $("#updated").innerHTML = T("Library updated") + ' <bdi dir="ltr">' + esc(LIB.updated || "") + "</bdi>";
    var y = window.scrollY;
    if (page === "topic") viewTopic(decodeURIComponent(parts[1] || ""));
    else if (page === "culture") viewCulture(parts[1] || "");
    else if (page === "coverage") viewCoverage();
    else if (page === "add") viewAdd();
    else viewHome();
    window.scrollTo(0, keepScroll === true ? y : 0);
  }

  setAud(state.aud);
  setLang(state.lang);
  window.addEventListener("hashchange", route);
  route();
})();
