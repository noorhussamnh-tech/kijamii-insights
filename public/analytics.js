/* Visitor counts (Cloudflare Web Analytics: no cookies, no personal data).
 * Paste the site token from Cloudflare → Web Analytics → the site → "Manage site"
 * (the "token" value in the JS snippet). Empty token = tracking is off.
 * Never runs on local test builds. */
(function () {
  "use strict";
  var TOKEN = "";
  if (!TOKEN || location.protocol === "file:" || /^(localhost|127\.|0\.0\.0\.0|\[::1\])/.test(location.hostname)) return;
  var s = document.createElement("script");
  s.defer = true;
  s.src = "https://static.cloudflareinsights.com/beacon.min.js";
  s.setAttribute("data-cf-beacon", JSON.stringify({ token: TOKEN, spa: false }));
  document.head.appendChild(s);
})();
