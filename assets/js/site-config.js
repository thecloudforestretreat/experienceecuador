(function () {
  "use strict";

  if (window.EE_SITE_CONFIG) return;

  var CONTACT = {
    whatsappNumberDigits: "13054585402",
    whatsappDisplay: "+1 (305) 458-5402",
    email: "info@experienceecuador.com"
  };

  var WHATSAPP_WIDGET = {
    version: 3,
    default_en: {
      title: "Chat with Experience Ecuador",
      q1: "Plan my trip",
      q2: "Birdwatching and wildlife",
      q3: "Lodging and stays",
      q4: "Tours and experiences",
      q5: "Ask a question",
      t1: "Hi! I want help planning my Ecuador trip.\n\nPage: {url}",
      t2: "Hi! I am interested in birdwatching and wildlife experiences in Ecuador.\n\nPage: {url}",
      t3: "Hi! I am looking for lodging and stay options in Ecuador.\n\nPage: {url}",
      t4: "Hi! I am looking for tours and experiences in Ecuador.\n\nPage: {url}",
      t5: "Hi! I have a question about Experience Ecuador.\n\nPage: {url}"
    },
    default_es: {
      title: "Chatea con Experience Ecuador",
      q1: "Planificar mi viaje",
      q2: "Observación de aves y vida silvestre",
      q3: "Alojamiento y estadías",
      q4: "Tours y experiencias",
      q5: "Hacer una consulta",
      t1: "Hola. Quiero ayuda para planificar mi viaje por Ecuador.\n\nPágina: {url}",
      t2: "Hola. Me interesan las experiencias de observación de aves y vida silvestre en Ecuador.\n\nPágina: {url}",
      t3: "Hola. Estoy buscando opciones de alojamiento y estadías en Ecuador.\n\nPágina: {url}",
      t4: "Hola. Estoy buscando tours y experiencias en Ecuador.\n\nPágina: {url}",
      t5: "Hola. Tengo una consulta sobre Experience Ecuador.\n\nPágina: {url}"
    },
    pages: {
      "/trip-builder/": {
        q1: "Plan my itinerary",
        q2: "Choose regions",
        q3: "Check availability",
        q4: "Tours and experiences",
        q5: "Ask a question",
        t1: "Hi! I want help planning my Ecuador itinerary.\n\nPage: {url}",
        t2: "Hi! I want help choosing the best regions and experiences for Ecuador.\n\nPage: {url}",
        t3: "Hi! I want to check availability and next steps for this trip.\n\nPage: {url}",
        t4: "Hi! I am looking for tours and experiences for this itinerary.\n\nPage: {url}",
        t5: "Hi! I have a question about this itinerary page.\n\nPage: {url}"
      },
      "/es/planificador-de-viajes/": {
        q1: "Planificar mi itinerario",
        q2: "Elegir regiones",
        q3: "Consultar disponibilidad",
        q4: "Tours y experiencias",
        q5: "Hacer una consulta",
        t1: "Hola. Quiero ayuda para planificar mi itinerario por Ecuador.\n\nPágina: {url}",
        t2: "Hola. Quiero ayuda para elegir las mejores regiones y experiencias.\n\nPágina: {url}",
        t3: "Hola. Quiero consultar disponibilidad y los siguientes pasos para este viaje.\n\nPágina: {url}",
        t4: "Hola. Estoy buscando tours y experiencias para este itinerario.\n\nPágina: {url}",
        t5: "Hola. Tengo una pregunta sobre esta página de itinerario.\n\nPágina: {url}"
      },
      "/contact/": {
        q1: "Start WhatsApp chat",
        q2: "Plan my trip",
        q3: "Business hours",
        q4: "Ask a question",
        q5: "Talk to a specialist",
        t1: "Hi! I want to start a WhatsApp chat.\n\nPage: {url}",
        t2: "Hi! I want help planning my Ecuador trip.\n\nPage: {url}",
        t3: "Hi! What are your business hours?\n\nPage: {url}",
        t4: "Hi! I have a question.\n\nPage: {url}",
        t5: "Hi! I want to speak with a travel specialist.\n\nPage: {url}"
      },
      "/es/contacto/": {
        q1: "Escribir por WhatsApp",
        q2: "Planificar mi viaje",
        q3: "Horario de atención",
        q4: "Hacer una consulta",
        q5: "Hablar con un especialista",
        t1: "Hola. Quiero escribir por WhatsApp.\n\nPágina: {url}",
        t2: "Hola. Quiero ayuda para planificar mi viaje por Ecuador.\n\nPágina: {url}",
        t3: "Hola. ¿Cuál es su horario de atención?\n\nPágina: {url}",
        t4: "Hola. Tengo una pregunta.\n\nPágina: {url}",
        t5: "Hola. Quiero hablar con un especialista en viajes.\n\nPágina: {url}"
      },
      "/spectacled-bear-ecuador-guide/": {
        q1: "Plan a wildlife route",
        q2: "Ask about ethical viewing",
        q3: "Compare Andean regions",
        q4: "Find a specialist",
        q5: "Ask a bear question",
        t1: "Hi! I want help planning a responsible wildlife route in Ecuador.\n\nPage: {url}",
        t2: "Hi! I have a question about ethical spectacled bear viewing in Ecuador.\n\nPage: {url}",
        t3: "Hi! I want to compare Ecuador's Andean regions for a wildlife trip.\n\nPage: {url}",
        t4: "Hi! I want help evaluating a responsible wildlife specialist.\n\nPage: {url}",
        t5: "Hi! I have a question about spectacled bears in Ecuador.\n\nPage: {url}"
      },
      "/es/guia-oso-de-anteojos-ecuador/": {
        q1: "Planificar una ruta de fauna",
        q2: "Consultar observación ética",
        q3: "Comparar regiones andinas",
        q4: "Encontrar un especialista",
        q5: "Consultar sobre el oso",
        t1: "Hola. Quiero ayuda para planificar una ruta responsable de fauna en Ecuador.\n\nPágina: {url}",
        t2: "Hola. Tengo una consulta sobre la observación ética del oso de anteojos en Ecuador.\n\nPágina: {url}",
        t3: "Hola. Quiero comparar regiones andinas de Ecuador para un viaje de fauna.\n\nPágina: {url}",
        t4: "Hola. Quiero ayuda para evaluar a un especialista responsable en fauna.\n\nPágina: {url}",
        t5: "Hola. Tengo una consulta sobre el oso de anteojos en Ecuador.\n\nPágina: {url}"
      }
    }
  };

  var PAGE_CLUSTERS = Object.freeze({
    discovery: "cluster-discovery.css",
    hubs: "cluster-hubs.css",
    destinations: "cluster-destinations.css",
    experiences: "cluster-experiences.css",
    editorial: "cluster-editorial.css",
    recommendations: "cluster-recommendations.css",
    planning: "cluster-planning.css",
    trust: "cluster-trust.css"
  });

  var PAGE_CLUSTER_VERSIONS = Object.freeze({
    destinations: "20261002c",
    editorial: "20261002h",
    recommendations: "20261002f",
    planning: "20261002h"
  });

  function normalizePath(path) {
    var normalized = String(path || "/").split("?")[0].split("#")[0] || "/";
    if (normalized.charAt(0) !== "/") normalized = "/" + normalized;
    if (normalized.length > 1 && normalized.charAt(normalized.length - 1) !== "/") normalized += "/";
    return normalized;
  }

  function isSpanishPath(path) {
    var normalized = normalizePath(path);
    return normalized === "/es/" || normalized.indexOf("/es/") === 0;
  }

  function getPageCluster(path, pageType) {
    var normalized = normalizePath(path || window.location.pathname);
    var type = String(pageType || "").toLowerCase();
    if (normalized === "/" || normalized === "/es/") return "discovery";
    if (normalized === "/regions/" || normalized === "/es/regiones/") return "hubs";
    if (/^\/(?:regions|es\/regiones)\//.test(normalized)) return "destinations";
    if (/^\/(?:experiences|es\/experiencias)\//.test(normalized)) return "experiences";
    if (/^\/(es\/)?(recommendations|recomendados)\//.test(normalized)) return "recommendations";
    if (/trip-builder|plan-your-trip|planificador-de-viajes|planifica-tu-viaje|itinerary|itinerario/.test(normalized + " " + type)) return "planning";
    if (/editorial|blog|guide|guia|comparison|packing|best-|mejores-|where-to|donde-/.test(normalized + " " + type)) return "editorial";
    if (/region_index|regions_hub/.test(type)) return "hubs";
    if (/location_page|region_page/.test(type)) return "destinations";
    if (/experience/.test(type)) return "experiences";
    if (/member|recommendation/.test(type)) return "recommendations";
    if (/trip_planning|regional_trip|tool_page/.test(type)) return "planning";
    if (/editorial|blog/.test(type)) return "editorial";
    return "trust";
  }

  function loadPageClusterStylesheet() {
    var body = document.body;
    var requested = body && body.getAttribute("data-page-cluster");
    var cluster = PAGE_CLUSTERS[requested] ? requested : getPageCluster(window.location.pathname, body && body.dataset.pageType);
    var filename = PAGE_CLUSTERS[cluster];
    if (!filename) return;
    var current = document.getElementById("eePageClusterCss");
    if (!current) {
      current = document.createElement("link");
      current.id = "eePageClusterCss";
      current.rel = "stylesheet";
      document.head.appendChild(current);
    }
    current.href = "/assets/css/" + filename + "?v=" + (PAGE_CLUSTER_VERSIONS[cluster] || "20261002e");
    current.dataset.cluster = cluster;
    if (body) {
      body.classList.add("eeClusterPage", "eeCluster--" + cluster);
      body.dataset.pageCluster = cluster;
    }
  }

  function merge(base, override) {
    var result = {};
    Object.keys(base || {}).forEach(function (key) { result[key] = base[key]; });
    Object.keys(override || {}).forEach(function (key) { result[key] = override[key]; });
    return result;
  }

  function getWhatsAppWidgetConfig(path) {
    var normalized = normalizePath(path || window.location.pathname);
    var defaults = isSpanishPath(normalized) ? WHATSAPP_WIDGET.default_es : WHATSAPP_WIDGET.default_en;
    return merge(defaults, WHATSAPP_WIDGET.pages[normalized]);
  }

  function fillTemplate(template) {
    return String(template || "")
      .replace(/\{url\}/g, window.location.href)
      .replace(/\{title\}/g, (document.title || "").trim());
  }

  function buildWhatsAppUrl(message) {
    return "https://wa.me/" + CONTACT.whatsappNumberDigits + "?text=" + encodeURIComponent(message || "");
  }

  function cleanPayload(payload) {
    var result = {};
    Object.keys(payload || {}).forEach(function (key) {
      var value = payload[key];
      if (value === undefined || value === null || value === "") return;
      result[key] = value;
    });
    return result;
  }

  function trackWhatsAppClick(label, messageKey, href) {
    var attribution = window.EEAttribution && window.EEAttribution.getEventParameters
      ? window.EEAttribution.getEventParameters()
      : {};
    var payload = cleanPayload(Object.assign({}, attribution, {
      event_category: "engagement",
      cta_label: label || "",
      cta_location: "global_whatsapp_widget",
      link_type: "whatsapp",
      link_url: String(href || "").split("?")[0],
      message_key: messageKey || "",
      page_language: isSpanishPath(window.location.pathname) ? "es" : "en",
      page_path: window.location.pathname || "/"
    }));

    if (window.eeAnalytics && typeof window.eeAnalytics.send === "function") {
      window.eeAnalytics.send("whatsapp_click", payload);
    } else if (typeof window.gtag === "function") {
      window.gtag("event", "whatsapp_click", payload);
    } else {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(Object.assign({ event: "whatsapp_click" }, payload));
    }
  }

  function closeWidget(root) {
    root.classList.remove("is-open");
    var button = root.querySelector(".eeWaFabBtn");
    if (button) button.setAttribute("aria-expanded", "false");
  }

  function initWhatsAppWidget(root) {
    if (!root || root.__eeSiteConfigWaInit) return;
    root.__eeSiteConfigWaInit = true;
    root.setAttribute("data-wa-number", CONTACT.whatsappNumberDigits);

    var config = getWhatsAppWidgetConfig();
    var title = root.querySelector(".eeWaFabTitle");
    var button = root.querySelector(".eeWaFabBtn");
    var closeButton = root.querySelector(".eeWaFabClose");
    var backdrop = root.querySelector(".eeWaFabBackdrop");
    var actions = Array.prototype.slice.call(root.querySelectorAll(".eeWaFabAction"));

    if (title) title.textContent = config.title || "Experience Ecuador";
    actions.forEach(function (link, index) {
      var number = index + 1;
      var label = config["q" + number];
      var messageKey = "t" + number;
      var message = fillTemplate(config[messageKey]);
      if (!label) {
        link.hidden = true;
        return;
      }
      link.hidden = false;
      link.textContent = label;
      link.href = buildWhatsAppUrl(message);
      link.target = "_blank";
      link.rel = "noopener";
      link.addEventListener("click", function () {
        trackWhatsAppClick(label, messageKey, link.href);
        closeWidget(root);
      });
    });

    if (button) {
      button.addEventListener("click", function () {
        var willOpen = !root.classList.contains("is-open");
        root.classList.toggle("is-open", willOpen);
        button.setAttribute("aria-expanded", willOpen ? "true" : "false");
      });
    }
    if (closeButton) closeButton.addEventListener("click", function () { closeWidget(root); });
    if (backdrop) backdrop.addEventListener("click", function () { closeWidget(root); });
  }

  function initWhatsAppWidgets() {
    Array.prototype.slice.call(document.querySelectorAll(".eeWaFab")).forEach(initWhatsAppWidget);
  }

  window.EE_SITE_CONFIG = {
    contact: CONTACT,
    whatsappWidget: WHATSAPP_WIDGET,
    pageClusters: PAGE_CLUSTERS,
    buildWhatsAppUrl: buildWhatsAppUrl,
    getWhatsAppWidgetConfig: getWhatsAppWidgetConfig,
    getPageCluster: getPageCluster,
    loadPageClusterStylesheet: loadPageClusterStylesheet,
    initWhatsAppWidget: initWhatsAppWidget,
    initWhatsAppWidgets: initWhatsAppWidgets
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      loadPageClusterStylesheet();
      initWhatsAppWidgets();
    });
  } else {
    loadPageClusterStylesheet();
    initWhatsAppWidgets();
  }

  if (window.MutationObserver && document.documentElement) {
    new MutationObserver(initWhatsAppWidgets).observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  }
})();
