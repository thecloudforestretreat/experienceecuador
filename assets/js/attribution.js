(function () {
  "use strict";

  if (window.EEAttribution) return;

  var STORAGE_FIRST = "ee_attribution_first_v1";
  var STORAGE_LAST = "ee_attribution_last_v1";
  var MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000;
  var CAMPAIGN_KEYS = [
    "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
    "gclid", "gbraid", "wbraid", "fbclid", "msclkid", "ttclid"
  ];
  var AFFILIATE_HOSTS = {
    "mindobirdwatching.com": "mindo_bird_watching",
    "www.mindobirdwatching.com": "mindo_bird_watching",
    "experiencetheamazon.com": "experience_the_amazon",
    "www.experiencetheamazon.com": "experience_the_amazon",
    "chocoandinotours.com": "choco_andino_tours",
    "www.chocoandinotours.com": "choco_andino_tours",
    "mindotours.com": "mindo_tours",
    "www.mindotours.com": "mindo_tours",
    "mindotrailclub.com": "mindo_trail_club",
    "www.mindotrailclub.com": "mindo_trail_club",
    "thecloudforestretreat.com": "the_cloud_forest_retreat",
    "www.thecloudforestretreat.com": "the_cloud_forest_retreat"
  };

  function safeStorageGet(key) {
    try {
      var value = JSON.parse(localStorage.getItem(key) || "null");
      if (!value || !value.captured_at) return null;
      if (Date.now() - Date.parse(value.captured_at) > MAX_AGE_MS) {
        localStorage.removeItem(key);
        return null;
      }
      return value;
    } catch (error) {
      return null;
    }
  }

  function safeStorageSet(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {}
  }

  function cleanLocation(value) {
    if (!value) return "";
    try {
      var url = new URL(value, window.location.origin);
      return url.origin + url.pathname;
    } catch (error) {
      return String(value).split("?")[0].split("#")[0];
    }
  }

  function referringHost() {
    if (!document.referrer) return "";
    try {
      var host = new URL(document.referrer).hostname.replace(/^www\./, "");
      return host === window.location.hostname.replace(/^www\./, "") ? "" : host;
    } catch (error) {
      return "";
    }
  }

  function organicSource(host) {
    if (!host) return "";
    if (/(^|\.)google\./.test(host)) return "google";
    if (/(^|\.)bing\.com$/.test(host)) return "bing";
    if (/(^|\.)search\.yahoo\.com$/.test(host)) return "yahoo";
    if (/(^|\.)duckduckgo\.com$/.test(host)) return "duckduckgo";
    if (/(^|\.)ecosia\.org$/.test(host)) return "ecosia";
    if (/(^|\.)baidu\.com$/.test(host)) return "baidu";
    return "";
  }

  function capture() {
    var params = new URLSearchParams(window.location.search);
    var host = referringHost();
    var organic = organicSource(host);
    var touch = {
      captured_at: new Date().toISOString(),
      landing_page: cleanLocation(window.location.href),
      referrer: cleanLocation(document.referrer),
      source: params.get("utm_source") || (organic || host || "direct"),
      medium: params.get("utm_medium") || (organic ? "organic" : (host ? "referral" : "(none)")),
      campaign: params.get("utm_campaign") || "",
      term: params.get("utm_term") || "",
      content: params.get("utm_content") || ""
    };
    CAMPAIGN_KEYS.slice(5).forEach(function (key) {
      touch[key] = params.get(key) || "";
    });
    return touch;
  }

  function hasCampaignSignal(touch) {
    return Boolean(touch.campaign || touch.source !== "direct" || CAMPAIGN_KEYS.slice(5).some(function (key) {
      return Boolean(touch[key]);
    }));
  }

  var current = capture();
  var first = safeStorageGet(STORAGE_FIRST);
  var last = safeStorageGet(STORAGE_LAST);
  if (!first) {
    first = current;
    safeStorageSet(STORAGE_FIRST, first);
  }
  if (!last || hasCampaignSignal(current)) {
    last = current;
    safeStorageSet(STORAGE_LAST, last);
  }

  function payload() {
    var result = {
      first_touch_source: first.source || "",
      first_touch_medium: first.medium || "",
      first_touch_campaign: first.campaign || "",
      first_touch_term: first.term || "",
      first_touch_content: first.content || "",
      first_landing_page: first.landing_page || "",
      first_referrer: first.referrer || "",
      first_touch_at: first.captured_at || "",
      last_touch_source: last.source || "",
      last_touch_medium: last.medium || "",
      last_touch_campaign: last.campaign || "",
      last_touch_term: last.term || "",
      last_touch_content: last.content || "",
      last_landing_page: last.landing_page || "",
      last_referrer: last.referrer || "",
      last_touch_at: last.captured_at || "",
      current_page: cleanLocation(window.location.href)
    };
    CAMPAIGN_KEYS.slice(5).forEach(function (key) {
      result["first_" + key] = first[key] || "";
      result["last_" + key] = last[key] || "";
    });
    return result;
  }

  function eventParameters() {
    var data = payload();
    return {
      first_touch_source: data.first_touch_source,
      first_touch_medium: data.first_touch_medium,
      first_touch_campaign: data.first_touch_campaign,
      last_touch_source: data.last_touch_source,
      last_touch_medium: data.last_touch_medium,
      last_touch_campaign: data.last_touch_campaign,
      first_landing_page: data.first_landing_page
    };
  }

  function decoratePayload(target) {
    return Object.assign(target || {}, payload());
  }

  function addFormFields(root) {
    var values = payload();
    Array.prototype.forEach.call((root || document).querySelectorAll("form"), function (form) {
      Object.keys(values).forEach(function (name) {
        var input = form.querySelector('input[type="hidden"][name="' + name + '"]');
        if (!input) {
          input = document.createElement("input");
          input.type = "hidden";
          input.name = name;
          form.appendChild(input);
        }
        input.value = values[name];
        input.setAttribute("value", values[name]);
      });
    });
  }

  function decorateAffiliateLinks(root) {
    Array.prototype.forEach.call((root || document).querySelectorAll("a[href]"), function (anchor) {
      var url;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch (error) {
        return;
      }
      var affiliate = AFFILIATE_HOSTS[url.hostname.toLowerCase()];
      if (!affiliate) return;
      if (!url.searchParams.has("utm_source")) url.searchParams.set("utm_source", "experienceecuador");
      if (!url.searchParams.has("utm_medium")) url.searchParams.set("utm_medium", "referral");
      if (!url.searchParams.has("utm_campaign")) url.searchParams.set("utm_campaign", "affiliate_network");
      if (!url.searchParams.has("utm_content")) url.searchParams.set("utm_content", affiliate);
      anchor.href = url.toString();
    });
  }

  function initializeDocument() {
    addFormFields(document);
    decorateAffiliateLinks(document);
  }

  window.EEAttribution = {
    getPayload: payload,
    getEventParameters: eventParameters,
    decoratePayload: decoratePayload,
    refreshForms: addFormFields,
    decorateAffiliateLinks: decorateAffiliateLinks
  };

  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag === "function") window.gtag("event", "traffic_attribution", eventParameters());
  else window.dataLayer.push(Object.assign({ event: "traffic_attribution" }, eventParameters()));

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initializeDocument);
  else initializeDocument();
})();
