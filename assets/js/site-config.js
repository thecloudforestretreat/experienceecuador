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
      "/": {
        q1: "Plan my Ecuador trip", q2: "Compare regions", q3: "Find recommendations", q4: "Ask about an experience", q5: "Contact the team",
        t1: "Hi! I want help planning my Ecuador trip.\n\nPage: {url}", t2: "Hi! I want help comparing Ecuador's regions.\n\nPage: {url}", t3: "Hi! I want help finding a relevant stay, tour or travel service.\n\nPage: {url}", t4: "Hi! I have a question about an Ecuador experience.\n\nPage: {url}", t5: "Hi! I want to contact the Experience Ecuador team.\n\nPage: {url}"
      },
      "/es/": {
        q1: "Planificar mi viaje", q2: "Comparar regiones", q3: "Buscar recomendados", q4: "Consultar una experiencia", q5: "Contactar al equipo",
        t1: "Hola. Quiero ayuda para planificar mi viaje por Ecuador.\n\nPágina: {url}", t2: "Hola. Quiero ayuda para comparar las regiones de Ecuador.\n\nPágina: {url}", t3: "Hola. Quiero encontrar un alojamiento, tour o servicio de viaje relevante.\n\nPágina: {url}", t4: "Hola. Tengo una consulta sobre una experiencia en Ecuador.\n\nPágina: {url}", t5: "Hola. Quiero contactar al equipo de Experience Ecuador.\n\nPágina: {url}"
      },
      "/regions/": {
        q1: "Choose an Ecuador region", q2: "Compare two regions", q3: "Plan a multi-region route", q4: "Check regional logistics", q5: "Ask a region question",
        t1: "Hi! I want help choosing an Ecuador region.\n\nPage: {url}", t2: "Hi! I want help comparing two Ecuador regions.\n\nPage: {url}", t3: "Hi! I want help planning a realistic multi-region Ecuador route.\n\nPage: {url}", t4: "Hi! I want to check transport, timing and logistics for an Ecuador region.\n\nPage: {url}", t5: "Hi! I have a question about Ecuador's regions.\n\nPage: {url}"
      },
      "/es/regiones/": {
        q1: "Elegir una región", q2: "Comparar dos regiones", q3: "Planificar varias regiones", q4: "Consultar logística regional", q5: "Consultar sobre regiones",
        t1: "Hola. Quiero ayuda para elegir una región de Ecuador.\n\nPágina: {url}", t2: "Hola. Quiero comparar dos regiones de Ecuador.\n\nPágina: {url}", t3: "Hola. Quiero ayuda para planificar una ruta realista por varias regiones.\n\nPágina: {url}", t4: "Hola. Quiero consultar transporte, tiempos y logística de una región.\n\nPágina: {url}", t5: "Hola. Tengo una consulta sobre las regiones de Ecuador.\n\nPágina: {url}"
      },
      "/mission/": {
        q1: "Start planning Ecuador", q2: "Learn how recommendations work", q3: "Suggest a correction", q4: "Business participation", q5: "Ask about our mission",
        t1: "Hi! I want help starting my Ecuador trip plan.\n\nPage: {url}", t2: "Hi! I want to understand how Experience Ecuador recommendations work.\n\nPage: {url}", t3: "Hi! I want to suggest a correction or update.\n\nPage: {url}", t4: "Hi! I represent an Ecuador business and want to ask about participation.\n\nPage: {url}", t5: "Hi! I have a question about the Experience Ecuador mission.\n\nPage: {url}"
      },
      "/es/mision/": {
        q1: "Empezar a planificar Ecuador", q2: "Conocer las recomendaciones", q3: "Sugerir una corrección", q4: "Participación de negocios", q5: "Preguntar por la misión",
        t1: "Hola. Quiero empezar a planificar mi viaje por Ecuador.\n\nPágina: {url}", t2: "Hola. Quiero entender cómo funcionan las recomendaciones de Experience Ecuador.\n\nPágina: {url}", t3: "Hola. Quiero sugerir una corrección o actualización.\n\nPágina: {url}", t4: "Hola. Represento un negocio ecuatoriano y quiero consultar sobre participación.\n\nPágina: {url}", t5: "Hola. Tengo una consulta sobre la misión de Experience Ecuador.\n\nPágina: {url}"
      },
      "/blog/": {
        q1: "Choose my first guide", q2: "Compare Ecuador regions", q3: "Find an itinerary", q4: "Check current travel details", q5: "Ask a planning question",
        t1: "Hi! I want help choosing the best Ecuador guide to start with.\n\nPage: {url}", t2: "Hi! I want help comparing Ecuador regions.\n\nPage: {url}", t3: "Hi! I want to find an itinerary that fits my trip.\n\nPage: {url}", t4: "Hi! I want to confirm current travel details for an article.\n\nPage: {url}", t5: "Hi! I have an Ecuador planning question.\n\nPage: {url}"
      },
      "/es/blog/": {
        q1: "Elegir mi primera guía", q2: "Comparar regiones", q3: "Buscar un itinerario", q4: "Confirmar datos actuales", q5: "Hacer una consulta",
        t1: "Hola. Quiero elegir la mejor guía de Ecuador para empezar.\n\nPágina: {url}", t2: "Hola. Quiero comparar regiones de Ecuador.\n\nPágina: {url}", t3: "Hola. Quiero encontrar un itinerario adecuado para mi viaje.\n\nPágina: {url}", t4: "Hola. Quiero confirmar información actual de un artículo.\n\nPágina: {url}", t5: "Hola. Tengo una consulta de planificación sobre Ecuador.\n\nPágina: {url}"
      },
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
      "/faqs/": {
        q1: "Plan my Ecuador trip", q2: "Choose the right region", q3: "Understand recommendations", q4: "Business participation", q5: "Ask another question",
        t1: "Hi! I want help planning my Ecuador trip.\n\nPage: {url}", t2: "Hi! I want help choosing the right Ecuador region.\n\nPage: {url}", t3: "Hi! I want to understand how recommendations and referrals work.\n\nPage: {url}", t4: "Hi! I represent an Ecuador business and want to ask about participation.\n\nPage: {url}", t5: "Hi! I have a question that is not answered on the FAQ page.\n\nPage: {url}"
      },
      "/es/preguntas-frecuentes/": {
        q1: "Planificar mi viaje", q2: "Elegir la región correcta", q3: "Entender los recomendados", q4: "Participación de negocios", q5: "Hacer otra consulta",
        t1: "Hola. Quiero ayuda para planificar mi viaje por Ecuador.\n\nPágina: {url}", t2: "Hola. Quiero ayuda para elegir la región correcta de Ecuador.\n\nPágina: {url}", t3: "Hola. Quiero entender cómo funcionan los recomendados y referidos.\n\nPágina: {url}", t4: "Hola. Represento un negocio ecuatoriano y quiero consultar sobre participación.\n\nPágina: {url}", t5: "Hola. Tengo una consulta que no está respondida en esta página.\n\nPágina: {url}"
      },
      "/reviews/": {
        q1: "Send traveler feedback", q2: "Report a correction", q3: "Ask about review sources", q4: "Plan my trip", q5: "Contact the team",
        t1: "Hi! I want to send feedback about my Experience Ecuador journey.\n\nPage: {url}", t2: "Hi! I want to report a correction and can identify the exact page.\n\nPage: {url}", t3: "Hi! I have a question about review sources or verification.\n\nPage: {url}", t4: "Hi! I want help planning my Ecuador trip.\n\nPage: {url}", t5: "Hi! I want to contact the Experience Ecuador team.\n\nPage: {url}"
      },
      "/es/resenas/": {
        q1: "Enviar una opinión", q2: "Reportar una corrección", q3: "Consultar las fuentes", q4: "Planificar mi viaje", q5: "Contactar al equipo",
        t1: "Hola. Quiero enviar una opinión sobre mi experiencia con Experience Ecuador.\n\nPágina: {url}", t2: "Hola. Quiero reportar una corrección y puedo identificar la página exacta.\n\nPágina: {url}", t3: "Hola. Tengo una consulta sobre las fuentes o la verificación de reseñas.\n\nPágina: {url}", t4: "Hola. Quiero ayuda para planificar mi viaje por Ecuador.\n\nPágina: {url}", t5: "Hola. Quiero contactar al equipo de Experience Ecuador.\n\nPágina: {url}"
      },
      "/partners/": {
        q1: "Apply as a partner", q2: "Compare participation options", q3: "Ask about referrals", q4: "Editorial collaboration", q5: "Partnership question",
        t1: "Hi! I represent an Ecuador business and want to apply as a partner.\n\nPage: {url}", t2: "Hi! I want to compare free, monthly, and annual participation options.\n\nPage: {url}", t3: "Hi! I want to understand referral tracking and attribution.\n\nPage: {url}", t4: "Hi! I want to propose an editorial or destination collaboration.\n\nPage: {url}", t5: "Hi! I have a partnership question.\n\nPage: {url}"
      },
      "/es/aliados/": {
        q1: "Postular como aliado", q2: "Comparar modalidades", q3: "Consultar los referidos", q4: "Colaboración editorial", q5: "Consultar una alianza",
        t1: "Hola. Represento un negocio ecuatoriano y quiero postular como aliado.\n\nPágina: {url}", t2: "Hola. Quiero comparar las modalidades gratuita, mensual y anual.\n\nPágina: {url}", t3: "Hola. Quiero entender el seguimiento y la atribución de referidos.\n\nPágina: {url}", t4: "Hola. Quiero proponer una colaboración editorial o de destino.\n\nPágina: {url}", t5: "Hola. Tengo una consulta sobre alianzas.\n\nPágina: {url}"
      },
      "/partners/join/": {q1:"Application requirements",q2:"Compare participation options",q3:"Check destination fit",q4:"Ask about images and permissions",q5:"Partner application question",t1:"Hi! I want to confirm the partner application requirements.\n\nPage: {url}",t2:"Hi! I want to compare free, monthly, and annual participation options.\n\nPage: {url}",t3:"Hi! I want to check whether my Ecuador business fits the right region and category.\n\nPage: {url}",t4:"Hi! I have a question about partner images and publication permissions.\n\nPage: {url}",t5:"Hi! I have a partner application question.\n\nPage: {url}"},
      "/es/aliados/unirse/": {q1:"Requisitos de postulación",q2:"Comparar modalidades",q3:"Revisar compatibilidad",q4:"Consultar imágenes y permisos",q5:"Consulta sobre la postulación",t1:"Hola. Quiero confirmar los requisitos para postular como aliado.\n\nPágina: {url}",t2:"Hola. Quiero comparar las modalidades gratuita, mensual y anual.\n\nPágina: {url}",t3:"Hola. Quiero revisar la región y categoría adecuadas para mi negocio en Ecuador.\n\nPágina: {url}",t4:"Hola. Tengo una consulta sobre imágenes y permisos de publicación.\n\nPágina: {url}",t5:"Hola. Tengo una consulta sobre la postulación de aliados.\n\nPágina: {url}"},
      "/privacy-policy/": {q1:"Ask a privacy question",q2:"Request a correction",q3:"Understand analytics",q4:"Ask about referral data",q5:"Contact the privacy team",t1:"Hi! I have a question about the Experience Ecuador privacy policy.\n\nPage: {url}",t2:"Hi! I want to request a correction or deletion and can identify the relevant record.\n\nPage: {url}",t3:"Hi! I want to understand analytics and attribution data.\n\nPage: {url}",t4:"Hi! I have a question about referral and external-provider data.\n\nPage: {url}",t5:"Hi! I want to contact Experience Ecuador about privacy.\n\nPage: {url}"},
      "/es/politica-de-privacidad/": {q1:"Hacer una consulta de privacidad",q2:"Solicitar una corrección",q3:"Entender la analítica",q4:"Consultar datos de referidos",q5:"Contactar por privacidad",t1:"Hola. Tengo una consulta sobre la Política de Privacidad de Experience Ecuador.\n\nPágina: {url}",t2:"Hola. Quiero solicitar una corrección o eliminación y puedo identificar el registro.\n\nPágina: {url}",t3:"Hola. Quiero entender los datos de analítica y atribución.\n\nPágina: {url}",t4:"Hola. Tengo una consulta sobre datos de referidos y proveedores externos.\n\nPágina: {url}",t5:"Hola. Quiero contactar a Experience Ecuador por privacidad.\n\nPágina: {url}"},
      "/terms/": {q1:"Ask about the terms",q2:"Clarify a provider responsibility",q3:"Report site misuse",q4:"Ask about content permissions",q5:"Contact Experience Ecuador",t1:"Hi! I have a question about the Experience Ecuador terms.\n\nPage: {url}",t2:"Hi! I want to clarify Experience Ecuador and provider responsibilities.\n\nPage: {url}",t3:"Hi! I want to report possible misuse of the site.\n\nPage: {url}",t4:"Hi! I have a question about content permissions or licensing.\n\nPage: {url}",t5:"Hi! I want to contact Experience Ecuador about these terms.\n\nPage: {url}"},
      "/es/terminos/": {q1:"Consultar los términos",q2:"Aclarar una responsabilidad",q3:"Reportar uso indebido",q4:"Consultar permisos de contenido",q5:"Contactar a Experience Ecuador",t1:"Hola. Tengo una consulta sobre los términos de Experience Ecuador.\n\nPágina: {url}",t2:"Hola. Quiero aclarar las responsabilidades de Experience Ecuador y del proveedor.\n\nPágina: {url}",t3:"Hola. Quiero reportar un posible uso indebido del sitio.\n\nPágina: {url}",t4:"Hola. Tengo una consulta sobre permisos de contenido o licencias.\n\nPágina: {url}",t5:"Hola. Quiero contactar a Experience Ecuador sobre estos términos.\n\nPágina: {url}"},
      "/explore/": {q1:"Choose the right specialist",q2:"Plan a birdwatching trip",q3:"Plan the Amazon",q4:"Explore Mindo and Chocó",q5:"Ask about the network",t1:"Hi! I want help choosing the right specialist site in the Experience Ecuador network.\n\nPage: {url}",t2:"Hi! I want to plan a specialist birdwatching trip.\n\nPage: {url}",t3:"Hi! I want help planning the Amazon portion of my Ecuador trip.\n\nPage: {url}",t4:"Hi! I want to compare Mindo and Chocó Andino experiences.\n\nPage: {url}",t5:"Hi! I have a question about the affiliated network.\n\nPage: {url}"},
      "/es/explora/": {q1:"Elegir el especialista correcto",q2:"Planificar un viaje de aves",q3:"Planificar la Amazonía",q4:"Explorar Mindo y Chocó",q5:"Consultar sobre la red",t1:"Hola. Quiero elegir el sitio especialista correcto dentro de la red de Experience Ecuador.\n\nPágina: {url}",t2:"Hola. Quiero planificar un viaje especializado de avistamiento de aves.\n\nPágina: {url}",t3:"Hola. Quiero planificar el bloque de Amazonía de mi viaje por Ecuador.\n\nPágina: {url}",t4:"Hola. Quiero comparar experiencias en Mindo y el Chocó Andino.\n\nPágina: {url}",t5:"Hola. Tengo una consulta sobre la red afiliada.\n\nPágina: {url}"},
      "/spotlights/": {q1:"Check a seasonal date",q2:"Plan around an event",q3:"Review a nature window",q4:"Build a backup plan",q5:"Ask about a spotlight",t1:"Hi! I want to verify a seasonal date or event window in Ecuador.\n\nPage: {url}",t2:"Hi! I want help planning transport and lodging around an Ecuador event.\n\nPage: {url}",t3:"Hi! I want to review a wildlife, bloom, or nature window.\n\nPage: {url}",t4:"Hi! I want to build a realistic backup plan if conditions change.\n\nPage: {url}",t5:"Hi! I have a question about an Ecuador travel spotlight.\n\nPage: {url}"},
      "/es/destacados/": {q1:"Verificar una fecha estacional",q2:"Planificar alrededor de un evento",q3:"Revisar una ventana natural",q4:"Crear un plan alternativo",q5:"Consultar un destacado",t1:"Hola. Quiero verificar una fecha estacional o ventana de evento en Ecuador.\n\nPágina: {url}",t2:"Hola. Quiero planificar transporte y alojamiento alrededor de un evento.\n\nPágina: {url}",t3:"Hola. Quiero revisar una ventana de fauna, floración o naturaleza.\n\nPágina: {url}",t4:"Hola. Quiero crear un plan alternativo realista si cambian las condiciones.\n\nPágina: {url}",t5:"Hola. Tengo una consulta sobre un destacado de viaje de Ecuador.\n\nPágina: {url}"},
      "/transportation/": {q1:"Estimate a transfer",q2:"Check a vehicle",q3:"Protect a flight connection",q4:"Request a current quote",q5:"Ask about transportation",t1:"Hi! I want to estimate an Ecuador transfer time.\n\nPage: {url}",t2:"Hi! I want help matching passengers and luggage to the right vehicle.\n\nPage: {url}",t3:"Hi! I want to protect a flight or fixed connection with a realistic buffer.\n\nPage: {url}",t4:"Hi! I want a current operator-confirmed transportation quote.\n\nPage: {url}",t5:"Hi! I have an Ecuador transportation question.\n\nPage: {url}"},
      "/es/transporte/": {q1:"Estimar un traslado",q2:"Revisar el vehículo",q3:"Proteger una conexión aérea",q4:"Solicitar cotización vigente",q5:"Consultar sobre transporte",t1:"Hola. Quiero estimar el tiempo de un traslado en Ecuador.\n\nPágina: {url}",t2:"Hola. Quiero ajustar pasajeros y equipaje al vehículo correcto.\n\nPágina: {url}",t3:"Hola. Quiero proteger un vuelo o conexión fija con un margen realista.\n\nPágina: {url}",t4:"Hola. Quiero una cotización vigente confirmada por un operador.\n\nPágina: {url}",t5:"Hola. Tengo una consulta sobre transporte en Ecuador.\n\nPágina: {url}"},
      "/recommendations/members/andes/mindo/mindo-bird-watching/": {q1:"Check specialist fit",q2:"Discuss birding priorities",q3:"Confirm route and guide",q4:"Request current terms",q5:"Ask about Mindo birding",t1:"Hi! I want to check whether Mindo Bird Watching fits my trip.\n\nPage: {url}",t2:"Hi! I want to discuss my birding level, pace, and target interests.\n\nPage: {url}",t3:"Hi! I want to confirm the current guide, route, duration, and meeting point.\n\nPage: {url}",t4:"Hi! I want the current price, inclusions, availability, payment, and cancellation terms.\n\nPage: {url}",t5:"Hi! I have a question about specialist birding in Mindo.\n\nPage: {url}"},
      "/es/recomendados/miembros/andes/mindo/mindo-bird-watching/": {q1:"Revisar afinidad con el especialista",q2:"Explicar prioridades de aves",q3:"Confirmar ruta y guía",q4:"Solicitar condiciones vigentes",q5:"Consultar sobre aves en Mindo",t1:"Hola. Quiero revisar si Mindo Bird Watching encaja en mi viaje.\n\nPágina: {url}",t2:"Hola. Quiero explicar mi nivel, ritmo e intereses de aves.\n\nPágina: {url}",t3:"Hola. Quiero confirmar guía, ruta, duración y punto de encuentro vigentes.\n\nPágina: {url}",t4:"Hola. Quiero precio, inclusiones, disponibilidad, pago y cancelación vigentes.\n\nPágina: {url}",t5:"Hola. Tengo una consulta sobre avistamiento especializado de aves en Mindo.\n\nPágina: {url}"},
      "/recommendations/members/andes/choco-andino/the-cloud-forest-retreat/": {q1:"Check stay fit",q2:"Confirm accommodation",q3:"Review access and transfers",q4:"Request current terms",q5:"Ask about the retreat",t1:"Hi! I want to check whether The Cloud Forest Retreat fits my Ecuador route.\n\nPage: {url}",t2:"Hi! I want to confirm the current accommodation, occupancy, meals, and accessibility.\n\nPage: {url}",t3:"Hi! I want to review access, arrival instructions, and transfer options.\n\nPage: {url}",t4:"Hi! I want the current price, inclusions, availability, payment, and cancellation terms.\n\nPage: {url}",t5:"Hi! I have a question about The Cloud Forest Retreat.\n\nPage: {url}"},
      "/es/recomendados/miembros/andes/choco-andino/the-cloud-forest-retreat/": {q1:"Revisar encaje de la estadía",q2:"Confirmar alojamiento",q3:"Revisar acceso y traslados",q4:"Solicitar condiciones vigentes",q5:"Consultar sobre el retiro",t1:"Hola. Quiero revisar si The Cloud Forest Retreat encaja en mi ruta.\n\nPágina: {url}",t2:"Hola. Quiero confirmar alojamiento, ocupación, comidas y accesibilidad vigentes.\n\nPágina: {url}",t3:"Hola. Quiero revisar acceso, instrucciones de llegada y traslados.\n\nPágina: {url}",t4:"Hola. Quiero precio, inclusiones, disponibilidad, pago y cancelación vigentes.\n\nPágina: {url}",t5:"Hola. Tengo una consulta sobre The Cloud Forest Retreat.\n\nPágina: {url}"},
      "/recommendations/members/andes/mindo/roca-mia/": {q1:"Check stay fit",q2:"Review birding access",q3:"Confirm arrival details",q4:"Request current terms",q5:"Ask about Roca Mía",t1:"Hi! I want to check whether Roca Mía fits my Mindo stay.\n\nPage: {url}",t2:"Hi! I want to confirm current reserve, trail, and birding access.\n\nPage: {url}",t3:"Hi! I want current road, check-in, parking, and transfer information.\n\nPage: {url}",t4:"Hi! I want the current cabin, price, inclusions, availability, payment, and cancellation terms.\n\nPage: {url}",t5:"Hi! I have a question about Roca Mía.\n\nPage: {url}"},
      "/es/recomendados/miembros/andes/mindo/roca-mia/": {q1:"Revisar encaje de la estadía",q2:"Revisar acceso para aves",q3:"Confirmar la llegada",q4:"Solicitar condiciones vigentes",q5:"Consultar sobre Roca Mía",t1:"Hola. Quiero revisar si Roca Mía encaja en mi estadía en Mindo.\n\nPágina: {url}",t2:"Hola. Quiero confirmar acceso vigente a la reserva, senderos y aves.\n\nPágina: {url}",t3:"Hola. Quiero información vigente de vía, ingreso, parqueo y traslados.\n\nPágina: {url}",t4:"Hola. Quiero cabaña, precio, inclusiones, disponibilidad, pago y cancelación vigentes.\n\nPágina: {url}",t5:"Hola. Tengo una consulta sobre Roca Mía.\n\nPágina: {url}"},
      "/recommendations/members/andes/choco-andino/hacienda-verde-niebla/": {q1:"Check stay fit",q2:"Confirm activities",q3:"Review access",q4:"Request current terms",q5:"Ask about the hacienda",t1:"Hi! I want to check whether Hacienda Verde Niebla fits my Chocó Andino route.\n\nPage: {url}",t2:"Hi! I want to confirm current coffee, nature, and cultural activities.\n\nPage: {url}",t3:"Hi! I want current arrival, road, and transfer information.\n\nPage: {url}",t4:"Hi! I want current lodging, price, inclusions, availability, payment, and cancellation terms.\n\nPage: {url}",t5:"Hi! I have a question about Hacienda Verde Niebla.\n\nPage: {url}"},
      "/es/recomendados/miembros/andes/choco-andino/hacienda-verde-niebla/": {q1:"Revisar la estadía",q2:"Confirmar actividades",q3:"Revisar el acceso",q4:"Solicitar condiciones vigentes",q5:"Consultar sobre la hacienda",t1:"Hola. Quiero revisar si Hacienda Verde Niebla encaja en mi ruta por Chocó Andino.\n\nPágina: {url}",t2:"Hola. Quiero confirmar actividades vigentes de café, naturaleza y cultura.\n\nPágina: {url}",t3:"Hola. Quiero información vigente de llegada, vía y traslados.\n\nPágina: {url}",t4:"Hola. Quiero alojamiento, precio, inclusiones, disponibilidad, pago y cancelación vigentes.\n\nPágina: {url}",t5:"Hola. Tengo una consulta sobre Hacienda Verde Niebla.\n\nPágina: {url}"},
      "/recommendations/members/andes/mindo/mindo-eco-chalet-river-and-waterfalls/": {q1:"Check group fit",q2:"Confirm utilities",q3:"Review access",q4:"Request current terms",q5:"Ask about the chalet",t1:"Hi! I want to check whether Mindo Eco Chalet fits my group.\n\nPage: {url}",t2:"Hi! I want to confirm the current sleeping layout, utilities, and amenities.\n\nPage: {url}",t3:"Hi! I want current road, river, waterfall, parking, and check-in information.\n\nPage: {url}",t4:"Hi! I want current price, taxes, inclusions, availability, deposit, and cancellation terms.\n\nPage: {url}",t5:"Hi! I have a question about Mindo Eco Chalet.\n\nPage: {url}"},
      "/es/recomendados/miembros/andes/mindo/mindo-eco-chalet-river-and-waterfalls/": {q1:"Revisar el grupo",q2:"Confirmar servicios",q3:"Revisar el acceso",q4:"Solicitar condiciones vigentes",q5:"Consultar sobre el chalet",t1:"Hola. Quiero revisar si Mindo Eco Chalet encaja con mi grupo.\n\nPágina: {url}",t2:"Hola. Quiero confirmar distribución de camas, servicios y comodidades vigentes.\n\nPágina: {url}",t3:"Hola. Quiero información vigente de vía, río, cascadas, parqueo e ingreso.\n\nPágina: {url}",t4:"Hola. Quiero precio, impuestos, inclusiones, disponibilidad, depósito y cancelación vigentes.\n\nPágina: {url}",t5:"Hola. Tengo una consulta sobre Mindo Eco Chalet.\n\nPágina: {url}"},
      "/recommendations/members/andes/mindo/mindo-glambird/": {q1:"Check stay fit",q2:"Confirm the unit",q3:"Review access and services",q4:"Request current terms",q5:"Ask about Glambird",t1:"Hi! I want to check whether Mindo Glambird fits my Mindo route.\n\nPage: {url}",t2:"Hi! I want to confirm the current unit, occupancy, bed, and bathroom.\n\nPage: {url}",t3:"Hi! I want current access, meals, utilities, connectivity, and transfer information.\n\nPage: {url}",t4:"Hi! I want current price, inclusions, availability, payment, and cancellation terms.\n\nPage: {url}",t5:"Hi! I have a question about Mindo Glambird.\n\nPage: {url}"},
      "/es/recomendados/miembros/andes/mindo/mindo-glambird/": {q1:"Revisar la estadía",q2:"Confirmar la unidad",q3:"Revisar acceso y servicios",q4:"Solicitar condiciones vigentes",q5:"Consultar sobre Glambird",t1:"Hola. Quiero revisar si Mindo Glambird encaja en mi ruta por Mindo.\n\nPágina: {url}",t2:"Hola. Quiero confirmar unidad, ocupación, cama y baño vigentes.\n\nPágina: {url}",t3:"Hola. Quiero información vigente de acceso, comidas, servicios, conectividad y traslados.\n\nPágina: {url}",t4:"Hola. Quiero precio, inclusiones, disponibilidad, pago y cancelación vigentes.\n\nPágina: {url}",t5:"Hola. Tengo una consulta sobre Mindo Glambird.\n\nPágina: {url}"},
      "/recommendations/members/andes/mindo/mindo-eco-suite-river-and-cascadita/": {q1:"Check cabin fit",q2:"Confirm amenities",q3:"Review access",q4:"Request current terms",q5:"Ask about the suite",t1:"Hi! I want to check whether Mindo Eco Suite fits my stay.\n\nPage: {url}",t2:"Hi! I want to confirm the current unit, occupancy, amenities, and utilities.\n\nPage: {url}",t3:"Hi! I want current road, river, trail, parking, and check-in information.\n\nPage: {url}",t4:"Hi! I want current price, taxes, inclusions, availability, payment, and cancellation terms.\n\nPage: {url}",t5:"Hi! I have a question about Mindo Eco Suite.\n\nPage: {url}"},
      "/es/recomendados/miembros/andes/mindo/mindo-eco-suite-river-and-cascadita/": {q1:"Revisar la cabaña",q2:"Confirmar comodidades",q3:"Revisar el acceso",q4:"Solicitar condiciones vigentes",q5:"Consultar sobre la suite",t1:"Hola. Quiero revisar si Mindo Eco Suite encaja con mi estadía.\n\nPágina: {url}",t2:"Hola. Quiero confirmar unidad, ocupación, comodidades y servicios vigentes.\n\nPágina: {url}",t3:"Hola. Quiero información vigente de vía, río, senderos, parqueo e ingreso.\n\nPágina: {url}",t4:"Hola. Quiero precio, impuestos, inclusiones, disponibilidad, pago y cancelación vigentes.\n\nPágina: {url}",t5:"Hola. Tengo una consulta sobre Mindo Eco Suite.\n\nPágina: {url}"},
      "/recommendations/members/andes/mindo/mindo-glamping-yurt-river-and-cascadita/": {q1:"Check yurt fit",q2:"Confirm comfort",q3:"Review access",q4:"Request current terms",q5:"Ask about the yurt",t1:"Hi! I want to check whether Mindo Glamping Yurt fits my stay.\n\nPage: {url}",t2:"Hi! I want to confirm the current unit, bathroom, weather comfort, and utilities.\n\nPage: {url}",t3:"Hi! I want current road, river, parking, and check-in information.\n\nPage: {url}",t4:"Hi! I want current price, taxes, inclusions, availability, payment, and cancellation terms.\n\nPage: {url}",t5:"Hi! I have a question about Mindo Glamping Yurt.\n\nPage: {url}"},
      "/es/recomendados/miembros/andes/mindo/mindo-glamping-yurt-river-and-cascadita/": {q1:"Revisar el yurt",q2:"Confirmar comodidad",q3:"Revisar el acceso",q4:"Solicitar condiciones vigentes",q5:"Consultar sobre el yurt",t1:"Hola. Quiero revisar si Mindo Glamping Yurt encaja con mi estadía.\n\nPágina: {url}",t2:"Hola. Quiero confirmar unidad, baño, comodidad climática y servicios vigentes.\n\nPágina: {url}",t3:"Hola. Quiero información vigente de vía, río, parqueo e ingreso.\n\nPágina: {url}",t4:"Hola. Quiero precio, impuestos, inclusiones, disponibilidad, pago y cancelación vigentes.\n\nPágina: {url}",t5:"Hola. Tengo una consulta sobre Mindo Glamping Yurt.\n\nPágina: {url}"},
      "/recommendations/members/amazon/tena/las-nubes/": {q1:"Verify the property",q2:"Confirm the location",q3:"Review the stay",q4:"Request current terms",q5:"Ask about Las Nubes",t1:"Hi! I want to verify the exact Las Nubes property and official contact.\n\nPage: {url}",t2:"Hi! I want the current map pin, locality, road, and travel time from Tena.\n\nPage: {url}",t3:"Hi! I want to confirm the room, meals, services, access, and guided activities.\n\nPage: {url}",t4:"Hi! I want current price, taxes, inclusions, availability, payment, and cancellation terms.\n\nPage: {url}",t5:"Hi! I have a question about the Las Nubes profile.\n\nPage: {url}"},
      "/es/recomendados/miembros/amazonia/tena/las-nubes/": {q1:"Verificar la propiedad",q2:"Confirmar la ubicación",q3:"Revisar la estadía",q4:"Solicitar condiciones vigentes",q5:"Consultar sobre Las Nubes",t1:"Hola. Quiero verificar la propiedad Las Nubes y su contacto oficial.\n\nPágina: {url}",t2:"Hola. Quiero la ubicación, localidad, vía y tiempo de viaje desde Tena.\n\nPágina: {url}",t3:"Hola. Quiero confirmar habitación, comidas, servicios, acceso y actividades guiadas.\n\nPágina: {url}",t4:"Hola. Quiero precio, impuestos, inclusiones, disponibilidad, pago y cancelación vigentes.\n\nPágina: {url}",t5:"Hola. Tengo una consulta sobre el perfil de Las Nubes.\n\nPágina: {url}"},
      "/plan-your-trip/": {q1:"Choose a region",q2:"Check trip length",q3:"Prepare group needs",q4:"Ask about planning scope",q5:"Ask a planning question",t1:"Hi! I want help choosing the lead region for my Ecuador trip.\n\nPage: {url}",t2:"Hi! I want to check what regional mix fits my available days.\n\nPage: {url}",t3:"Hi! I want to prepare our group, room, mobility, dietary, and pace requirements.\n\nPage: {url}",t4:"Hi! I want to understand the planning scope, any fee, deliverables, and next steps.\n\nPage: {url}",t5:"Hi! I have a question about planning an Ecuador trip.\n\nPage: {url}"},
      "/es/planifica-tu-viaje/": {q1:"Elegir una región",q2:"Revisar la duración",q3:"Preparar necesidades",q4:"Consultar el alcance",q5:"Hacer una consulta",t1:"Hola. Quiero ayuda para elegir la región principal de mi viaje por Ecuador.\n\nPágina: {url}",t2:"Hola. Quiero revisar qué combinación regional cabe en mis días disponibles.\n\nPágina: {url}",t3:"Hola. Quiero preparar las necesidades de grupo, habitaciones, movilidad, alimentación y ritmo.\n\nPágina: {url}",t4:"Hola. Quiero conocer el alcance de planificación, cualquier tarifa, entregables y próximos pasos.\n\nPágina: {url}",t5:"Hola. Tengo una consulta sobre la planificación de un viaje por Ecuador.\n\nPágina: {url}"},
      "/plan-your-trip/amazon/": {q1:"Check Amazon fit",q2:"Compare gateways",q3:"Prepare lodge needs",q4:"Review activities and terms",q5:"Ask about Amazon planning",t1:"Hi! I want to check whether an Amazon route fits my Ecuador trip.\n\nPage: {url}",t2:"Hi! I want to compare Amazon gateways, transfers, and realistic nights.\n\nPage: {url}",t3:"Hi! I want to prepare room, comfort, mobility, dietary, and connectivity needs.\n\nPage: {url}",t4:"Hi! I want to confirm guided activities, price, inclusions, availability, payment, and cancellation.\n\nPage: {url}",t5:"Hi! I have a question about planning an Ecuador Amazon trip.\n\nPage: {url}"},
      "/es/planifica-tu-viaje/amazonia/": {q1:"Revisar el encaje",q2:"Comparar accesos",q3:"Preparar el lodge",q4:"Revisar actividades y condiciones",q5:"Consultar sobre Amazonía",t1:"Hola. Quiero revisar si una ruta amazónica encaja en mi viaje por Ecuador.\n\nPágina: {url}",t2:"Hola. Quiero comparar accesos, traslados y noches realistas en Amazonía.\n\nPágina: {url}",t3:"Hola. Quiero preparar habitación, comodidad, movilidad, alimentación y conectividad.\n\nPágina: {url}",t4:"Hola. Quiero confirmar actividades guiadas, precio, inclusiones, disponibilidad, pago y cancelación.\n\nPágina: {url}",t5:"Hola. Tengo una consulta sobre la planificación de Amazonía.\n\nPágina: {url}"},
      "/plan-your-trip/andes/": {q1:"Check Andes fit",q2:"Plan for altitude",q3:"Choose route priorities",q4:"Review transport and terms",q5:"Ask about Andes planning",t1:"Hi! I want to check whether an Andes route fits my Ecuador trip.\n\nPage: {url}",t2:"Hi! I want to plan a realistic arrival and pace for altitude.\n\nPage: {url}",t3:"Hi! I want to choose the essential Andes bases and experiences.\n\nPage: {url}",t4:"Hi! I want to confirm transport, guide, lodging, price, inclusions, availability, and cancellation.\n\nPage: {url}",t5:"Hi! I have a question about planning an Ecuador Andes trip.\n\nPage: {url}"},
      "/es/planifica-tu-viaje/andes/": {q1:"Revisar el encaje",q2:"Planificar la altura",q3:"Elegir prioridades",q4:"Revisar transporte y condiciones",q5:"Consultar sobre los Andes",t1:"Hola. Quiero revisar si una ruta andina encaja en mi viaje por Ecuador.\n\nPágina: {url}",t2:"Hola. Quiero planificar una llegada y ritmo realistas para la altura.\n\nPágina: {url}",t3:"Hola. Quiero elegir las bases y experiencias esenciales de los Andes.\n\nPágina: {url}",t4:"Hola. Quiero confirmar transporte, guía, alojamiento, precio, inclusiones, disponibilidad y cancelación.\n\nPágina: {url}",t5:"Hola. Tengo una consulta sobre la planificación de los Andes.\n\nPágina: {url}"},
      "/plan-your-trip/coast/": {q1:"Check Coast fit",q2:"Choose a coastal base",q3:"Prepare group needs",q4:"Review activities and terms",q5:"Ask about Coast planning",t1:"Hi! I want to check whether an Ecuador Coast route fits my trip.\n\nPage: {url}",t2:"Hi! I want to compare coastal bases, road time, season, and realistic nights.\n\nPage: {url}",t3:"Hi! I want to prepare room, mobility, dietary, water-comfort, and pace needs.\n\nPage: {url}",t4:"Hi! I want to confirm transport, activities, price, inclusions, availability, and cancellation.\n\nPage: {url}",t5:"Hi! I have a question about planning an Ecuador Coast trip.\n\nPage: {url}"},
      "/es/planifica-tu-viaje/costa/": {q1:"Revisar el encaje",q2:"Elegir una base",q3:"Preparar necesidades",q4:"Revisar actividades y condiciones",q5:"Consultar sobre la Costa",t1:"Hola. Quiero revisar si una ruta por la Costa encaja en mi viaje.\n\nPágina: {url}",t2:"Hola. Quiero comparar bases, carretera, temporada y noches realistas.\n\nPágina: {url}",t3:"Hola. Quiero preparar habitación, movilidad, alimentación, comodidad en el agua y ritmo.\n\nPágina: {url}",t4:"Hola. Quiero confirmar transporte, actividades, precio, inclusiones, disponibilidad y cancelación.\n\nPágina: {url}",t5:"Hola. Tengo una consulta sobre la planificación de la Costa.\n\nPágina: {url}"},
      "/plan-your-trip/galapagos/": {q1:"Compare trip styles",q2:"Check dates and flights",q3:"Prepare access needs",q4:"Review services and terms",q5:"Ask about Galapagos",t1:"Hi! I want to compare cruise and land-based Galápagos trip styles.\n\nPage: {url}",t2:"Hi! I want to check dates, domestic flights, island nights, and buffers.\n\nPage: {url}",t3:"Hi! I want to prepare mobility, water-comfort, cabin or room, and dietary needs.\n\nPage: {url}",t4:"Hi! I want to confirm provider, inclusions, price, availability, payment, and cancellation.\n\nPage: {url}",t5:"Hi! I have a question about planning a Galápagos trip.\n\nPage: {url}"},
      "/es/planifica-tu-viaje/galapagos/": {q1:"Comparar modalidades",q2:"Revisar fechas y vuelos",q3:"Preparar necesidades",q4:"Revisar servicios y condiciones",q5:"Consultar sobre Galápagos",t1:"Hola. Quiero comparar crucero y viaje por tierra en Galápagos.\n\nPágina: {url}",t2:"Hola. Quiero revisar fechas, vuelos internos, noches y márgenes.\n\nPágina: {url}",t3:"Hola. Quiero preparar movilidad, comodidad en el agua, cabina o habitación y alimentación.\n\nPágina: {url}",t4:"Hola. Quiero confirmar proveedor, inclusiones, precio, disponibilidad, pago y cancelación.\n\nPágina: {url}",t5:"Hola. Tengo una consulta sobre la planificación de Galápagos.\n\nPágina: {url}"},
      "/ecuador-coast-itinerary/": {q1:"Check the route",q2:"Compare coastal bases",q3:"Review seasonal activities",q4:"Confirm services and terms",q5:"Ask about the Coast itinerary",t1:"Hi! I want to check whether this seven-day Coast route fits my dates.\n\nPage: {url}",t2:"Hi! I want to compare Guayaquil, Puerto López, Montañita, and quieter coastal bases.\n\nPage: {url}",t3:"Hi! I want to review seasonal wildlife, sea conditions, access, and responsible operators.\n\nPage: {url}",t4:"Hi! I want to confirm transport, accommodation, inclusions, price, availability, and cancellation.\n\nPage: {url}",t5:"Hi! I have a question about this Ecuador Coast itinerary.\n\nPage: {url}"},
      "/es/itinerario-costa-ecuador/": {q1:"Revisar la ruta",q2:"Comparar bases costeras",q3:"Revisar actividades estacionales",q4:"Confirmar servicios y condiciones",q5:"Consultar sobre el itinerario",t1:"Hola. Quiero revisar si esta ruta de siete días por la Costa encaja en mis fechas.\n\nPágina: {url}",t2:"Hola. Quiero comparar Guayaquil, Puerto López, Montañita y bases más tranquilas.\n\nPágina: {url}",t3:"Hola. Quiero revisar fauna estacional, mar, acceso y operadores responsables.\n\nPágina: {url}",t4:"Hola. Quiero confirmar transporte, alojamiento, inclusiones, precio, disponibilidad y cancelación.\n\nPágina: {url}",t5:"Hola. Tengo una consulta sobre este itinerario por la Costa.\n\nPágina: {url}"},
      "/ecuador-amazon-galapagos-itinerary/": {q1:"Check the sequence",q2:"Compare trip styles",q3:"Protect the transfers",q4:"Confirm services and terms",q5:"Ask about the itinerary",t1:"Hi! I want to check the safest Amazon and Galápagos sequence for my dates.\n\nPage: {url}",t2:"Hi! I want to compare Amazon gateways and cruise or land-based Galápagos styles.\n\nPage: {url}",t3:"Hi! I want to protect flights and buffers around road, river, and island transfers.\n\nPage: {url}",t4:"Hi! I want to confirm providers, inclusions, price, availability, payment, and cancellation.\n\nPage: {url}",t5:"Hi! I have a question about this Amazon and Galápagos itinerary.\n\nPage: {url}"},
      "/es/itinerario-amazonia-galapagos/": {q1:"Revisar la secuencia",q2:"Comparar modalidades",q3:"Proteger los traslados",q4:"Confirmar servicios y condiciones",q5:"Consultar sobre el itinerario",t1:"Hola. Quiero revisar la secuencia más segura para Amazonía y Galápagos.\n\nPágina: {url}",t2:"Hola. Quiero comparar accesos amazónicos y crucero o viaje por tierra en Galápagos.\n\nPágina: {url}",t3:"Hola. Quiero proteger vuelos y márgenes alrededor de traslados terrestres, fluviales e insulares.\n\nPágina: {url}",t4:"Hola. Quiero confirmar proveedores, inclusiones, precio, disponibilidad, pago y cancelación.\n\nPágina: {url}",t5:"Hola. Tengo una consulta sobre este itinerario de Amazonía y Galápagos.\n\nPágina: {url}"},
      "/ecuador-birdwatching-itinerary/": {q1:"Review the birding route",q2:"Choose habitat priorities",q3:"Plan for photography",q4:"Contact the specialist",q5:"Ask about birdwatching",t1:"Hi! I want to review this 10–12 day Ecuador birdwatching route.\n\nPage: {url}",t2:"Hi! I want to prioritize habitats, elevations, target birds, and realistic transfers.\n\nPage: {url}",t3:"Hi! I want to plan guide, vehicle, equipment space, light, and pace for photography.\n\nPage: {url}",t4:"Hi! I want current specialist guidance for a private Ecuador birding route.\n\nPage: {url}",t5:"Hi! I have a question about this Ecuador birdwatching itinerary.\n\nPage: {url}"},
      "/es/itinerario-aviturismo-ecuador/": {q1:"Revisar la ruta",q2:"Elegir hábitats",q3:"Planificar fotografía",q4:"Contactar al especialista",q5:"Consultar sobre aviturismo",t1:"Hola. Quiero revisar esta ruta de 10 a 12 días de aviturismo en Ecuador.\n\nPágina: {url}",t2:"Hola. Quiero priorizar hábitats, elevaciones, aves objetivo y traslados realistas.\n\nPágina: {url}",t3:"Hola. Quiero planificar guía, vehículo, equipo, luz y ritmo para fotografía.\n\nPágina: {url}",t4:"Hola. Quiero orientación especializada vigente para una ruta privada de aviturismo.\n\nPágina: {url}",t5:"Hola. Tengo una consulta sobre este itinerario de aviturismo.\n\nPágina: {url}"},
      "/tours/ecuador-birds-mammals/": {q1:"Review the concept",q2:"Define wildlife priorities",q3:"Check accessibility",q4:"Request verified terms",q5:"Ask about the route",t1:"Hi! I want to review the birds and mammals route concept.\n\nPage: {url}",t2:"Hi! I want to define target habitats, wildlife, photography, and realistic field time.\n\nPage: {url}",t3:"Hi! I want to review altitude, trails, transport, rooms, and mobility needs.\n\nPage: {url}",t4:"Hi! I want verified operator, route, inclusions, price, dates, availability, payment, and cancellation terms.\n\nPage: {url}",t5:"Hi! I have a question about this birds and mammals framework.\n\nPage: {url}"},
      "/es/tours/aves-mamiferos-ecuador/": {q1:"Revisar la propuesta",q2:"Definir prioridades",q3:"Revisar accesibilidad",q4:"Solicitar condiciones verificadas",q5:"Consultar sobre la ruta",t1:"Hola. Quiero revisar la propuesta de aves y mamíferos.\n\nPágina: {url}",t2:"Hola. Quiero definir hábitats, fauna, fotografía y tiempo de campo realista.\n\nPágina: {url}",t3:"Hola. Quiero revisar altura, senderos, transporte, habitaciones y movilidad.\n\nPágina: {url}",t4:"Hola. Quiero operador, ruta, inclusiones, precio, fechas, disponibilidad, pago y cancelación verificados.\n\nPágina: {url}",t5:"Hola. Tengo una consulta sobre este marco de aves y mamíferos.\n\nPágina: {url}"},
      "/tours/ecuador-enigmatic-reptiles-amphibians/": {q1:"Review the concept",q2:"Check specialist leadership",q3:"Review safety protocols",q4:"Request verified terms",q5:"Ask about herpetology",t1:"Hi! I want to review the reptiles and amphibians route concept.\n\nPage: {url}",t2:"Hi! I want to verify the named specialist, credentials, guide ratio, and permits.\n\nPage: {url}",t3:"Hi! I want to review night-work, venomous-fauna, communications, first-aid, and evacuation protocols.\n\nPage: {url}",t4:"Hi! I want verified operator, route, inclusions, price, dates, availability, payment, and cancellation terms.\n\nPage: {url}",t5:"Hi! I have a question about this herpetology framework.\n\nPage: {url}"},
      "/es/tours/reptiles-anfibios-ecuador/": {q1:"Revisar la propuesta",q2:"Verificar liderazgo",q3:"Revisar seguridad",q4:"Solicitar condiciones verificadas",q5:"Consultar sobre herpetología",t1:"Hola. Quiero revisar la propuesta de reptiles y anfibios.\n\nPágina: {url}",t2:"Hola. Quiero verificar especialista, credenciales, proporción de guías y permisos.\n\nPágina: {url}",t3:"Hola. Quiero revisar protocolos nocturnos, fauna venenosa, comunicación, primeros auxilios y evacuación.\n\nPágina: {url}",t4:"Hola. Quiero operador, ruta, inclusiones, precio, fechas, disponibilidad, pago y cancelación verificados.\n\nPágina: {url}",t5:"Hola. Tengo una consulta sobre este marco de herpetología.\n\nPágina: {url}"},
      "/tours/ecuador-southern-endemic-birds/": {q1:"Review the concept",q2:"Define birding priorities",q3:"Check southern logistics",q4:"Request verified terms",q5:"Ask about the route",t1:"Hi! I want to review the southern endemic birds route concept.\n\nPage: {url}",t2:"Hi! I want to define target habitats, reserves, photography, and realistic field time.\n\nPage: {url}",t3:"Hi! I want to check trails, transport, reserve access, lodging, and protected flights.\n\nPage: {url}",t4:"Hi! I want verified operator, guide, route, inclusions, price, dates, availability, payment, and cancellation terms.\n\nPage: {url}",t5:"Hi! I have a question about this southern birding framework.\n\nPage: {url}"},
      "/es/tours/aves-endemicas-sur-ecuador/": {q1:"Revisar la propuesta",q2:"Definir prioridades",q3:"Revisar logística",q4:"Solicitar condiciones verificadas",q5:"Consultar sobre la ruta",t1:"Hola. Quiero revisar la propuesta de aves endémicas del sur.\n\nPágina: {url}",t2:"Hola. Quiero definir hábitats, reservas, fotografía y tiempo de campo realista.\n\nPágina: {url}",t3:"Hola. Quiero revisar senderos, transporte, acceso, alojamiento y vuelos protegidos.\n\nPágina: {url}",t4:"Hola. Quiero operador, guía, ruta, inclusiones, precio, fechas, disponibilidad, pago y cancelación verificados.\n\nPágina: {url}",t5:"Hola. Tengo una consulta sobre este marco de aviturismo del sur.\n\nPágina: {url}"},
      "/tours/ecuador-the-andes-and-amazon-exotic/": {q1:"Review the route",q2:"Protect Amazon logistics",q3:"Check mobility and altitude",q4:"Request verified terms",q5:"Ask about the concept",t1:"Hi! I want to review the Andes and Amazon wildlife route framework.\n\nPage: {url}",t2:"Hi! I want to verify flights, river transfers, lodge access, roads and contingencies.\n\nPage: {url}",t3:"Hi! I want to review trails, altitude, heat, boats, rest and accessibility.\n\nPage: {url}",t4:"Hi! I want verified operator, route, inclusions, price, dates, availability, payment and cancellation terms.\n\nPage: {url}",t5:"Hi! I have a question about this Andes and Amazon concept.\n\nPage: {url}"},
      "/es/tours/andes-amazonia-exotica-ecuador/": {q1:"Revisar la ruta",q2:"Proteger la logística amazónica",q3:"Revisar movilidad y altura",q4:"Solicitar condiciones verificadas",q5:"Consultar sobre la propuesta",t1:"Hola. Quiero revisar el marco de la ruta por Andes y Amazonía.\n\nPágina: {url}",t2:"Hola. Quiero verificar vuelos, traslados fluviales, lodges, vías y contingencias.\n\nPágina: {url}",t3:"Hola. Quiero revisar senderos, altura, calor, botes, descanso y accesibilidad.\n\nPágina: {url}",t4:"Hola. Quiero operador, ruta, inclusiones, precio, fechas, disponibilidad, pago y cancelación verificados.\n\nPágina: {url}",t5:"Hola. Tengo una consulta sobre esta propuesta de Andes y Amazonía.\n\nPágina: {url}"},
      "/tours/ecuador-wild-andes-bears-birds-explorer/": {q1:"Review the ethical framework",q2:"Check specialist access",q3:"Review mobility and safety",q4:"Request verified terms",q5:"Ask about bears and birds",t1:"Hi! I want to review the ethical bears and birds route framework.\n\nPage: {url}",t2:"Hi! I want to verify lawful access, trackers, guides and conservation protocols.\n\nPage: {url}",t3:"Hi! I want to review slopes, trails, group size, communications and evacuation support.\n\nPage: {url}",t4:"Hi! I want verified operator, route, inclusions, price, dates, availability, payment and cancellation terms.\n\nPage: {url}",t5:"Hi! I have a question about this Andean bears and birds concept.\n\nPage: {url}"},
      "/es/tours/andes-salvajes-osos-aves-ecuador/": {q1:"Revisar el marco ético",q2:"Verificar acceso especialista",q3:"Revisar movilidad y seguridad",q4:"Solicitar condiciones verificadas",q5:"Consultar sobre osos y aves",t1:"Hola. Quiero revisar el marco ético de la ruta de osos y aves.\n\nPágina: {url}",t2:"Hola. Quiero verificar acceso legal, rastreadores, guías y protocolos de conservación.\n\nPágina: {url}",t3:"Hola. Quiero revisar pendientes, senderos, grupo, comunicación y evacuación.\n\nPágina: {url}",t4:"Hola. Quiero operador, ruta, inclusiones, precio, fechas, disponibilidad, pago y cancelación verificados.\n\nPágina: {url}",t5:"Hola. Tengo una consulta sobre esta propuesta de osos andinos y aves.\n\nPágina: {url}"},
      "/tours/galapagos-islands-wildlife-nature/": {q1:"Review the extension",q2:"Check authorized excursions",q3:"Review marine accessibility",q4:"Request verified terms",q5:"Ask about Galapagos",t1:"Hi! I want to review the five-day Galapagos wildlife extension.\n\nPage: {url}",t2:"Hi! I want to verify licensed operator, visitor sites, vessel, guide and park compliance.\n\nPage: {url}",t3:"Hi! I want to review landings, swimming, boat access, walking and alternatives.\n\nPage: {url}",t4:"Hi! I want verified flights, hotel, boats, fees, inclusions, price, availability, payment and cancellation.\n\nPage: {url}",t5:"Hi! I have a question about this Galapagos wildlife framework.\n\nPage: {url}"},
      "/es/tours/galapagos-fauna-naturaleza/": {q1:"Revisar la extensión",q2:"Verificar excursiones autorizadas",q3:"Revisar accesibilidad marina",q4:"Solicitar condiciones verificadas",q5:"Consultar sobre Galápagos",t1:"Hola. Quiero revisar la extensión de fauna de cinco días en Galápagos.\n\nPágina: {url}",t2:"Hola. Quiero verificar operador autorizado, sitios, yate, guía y cumplimiento del parque.\n\nPágina: {url}",t3:"Hola. Quiero revisar desembarcos, natación, acceso al bote, caminatas y alternativas.\n\nPágina: {url}",t4:"Hola. Quiero vuelos, hotel, botes, tasas, inclusiones, precio, disponibilidad, pago y cancelación verificados.\n\nPágina: {url}",t5:"Hola. Tengo una consulta sobre este marco de fauna en Galápagos.\n\nPágina: {url}"},
      "/tours/ecuador-choco-biodiversity/": {q1:"Review the route",q2:"Choose habitat priorities",q3:"Check access and mobility",q4:"Request verified terms",q5:"Ask about Choco biodiversity",t1:"Hi! I want to review the Choco biodiversity route framework.\n\nPage: {url}",t2:"Hi! I want to prioritize elevations, wildlife, photography and repeat field time.\n\nPage: {url}",t3:"Hi! I want to verify reserves, guides, roads, trails, mobility and alternatives.\n\nPage: {url}",t4:"Hi! I want verified operator, access, route, inclusions, price, dates, availability, payment and cancellation.\n\nPage: {url}",t5:"Hi! I have a question about this Choco biodiversity concept.\n\nPage: {url}"},
      "/es/tours/biodiversidad-choco-ecuador/": {q1:"Revisar la ruta",q2:"Elegir prioridades",q3:"Revisar acceso y movilidad",q4:"Solicitar condiciones verificadas",q5:"Consultar sobre biodiversidad",t1:"Hola. Quiero revisar el marco de biodiversidad del Chocó.\n\nPágina: {url}",t2:"Hola. Quiero priorizar elevaciones, fauna, fotografía y tiempo de campo.\n\nPágina: {url}",t3:"Hola. Quiero verificar reservas, guías, vías, senderos, movilidad y alternativas.\n\nPágina: {url}",t4:"Hola. Quiero operador, acceso, ruta, inclusiones, precio, fechas, disponibilidad, pago y cancelación verificados.\n\nPágina: {url}",t5:"Hola. Tengo una consulta sobre esta propuesta de biodiversidad del Chocó.\n\nPágina: {url}"},
      "/tours/ecuador-photo-tour/": {q1:"Review the route",q2:"Define photography priorities",q3:"Check equipment logistics",q4:"Request verified terms",q5:"Ask about photography",t1:"Hi! I want to review the Ecuador wildlife photography framework.\n\nPage: {url}",t2:"Hi! I want to define subjects, habitats, light, ethics and realistic field time.\n\nPage: {url}",t3:"Hi! I want to review vehicles, luggage, storage, charging, protection, mobility and insurance.\n\nPage: {url}",t4:"Hi! I want verified operator, guide, access, route, inclusions, price, dates, availability, payment and cancellation.\n\nPage: {url}",t5:"Hi! I have a question about this Ecuador photography concept.\n\nPage: {url}"},
      "/es/tours/tour-fotografia-ecuador/": {q1:"Revisar la ruta",q2:"Definir prioridades fotográficas",q3:"Revisar logística del equipo",q4:"Solicitar condiciones verificadas",q5:"Consultar sobre fotografía",t1:"Hola. Quiero revisar el marco de fotografía de fauna en Ecuador.\n\nPágina: {url}",t2:"Hola. Quiero definir sujetos, hábitats, luz, ética y tiempo de campo realista.\n\nPágina: {url}",t3:"Hola. Quiero revisar vehículos, equipaje, almacenamiento, carga, protección, movilidad y seguro.\n\nPágina: {url}",t4:"Hola. Quiero operador, guía, acceso, ruta, inclusiones, precio, fechas, disponibilidad, pago y cancelación verificados.\n\nPágina: {url}",t5:"Hola. Tengo una consulta sobre esta propuesta fotográfica.\n\nPágina: {url}"},
      "/tours/galapagos-wildlife-bird-photography/": {q1:"Review the circuit",q2:"Check island logistics",q3:"Review equipment and access",q4:"Request verified terms",q5:"Ask about Galapagos photography",t1:"Hi! I want to review the Galapagos wildlife photography circuit.\n\nPage: {url}",t2:"Hi! I want to verify flights, speedboats, baggage, park itineraries, vessels, guides and buffers.\n\nPage: {url}",t3:"Hi! I want to review camera logistics, landings, snorkeling, hikes, mobility, backups and insurance.\n\nPage: {url}",t4:"Hi! I want verified operators, route, hotels, inclusions, fees, price, dates, availability, payment and cancellation.\n\nPage: {url}",t5:"Hi! I have a question about this Galapagos photography concept.\n\nPage: {url}"},
      "/es/tours/galapagos-fotografia-fauna-aves/": {q1:"Revisar el circuito",q2:"Verificar logística entre islas",q3:"Revisar equipo y acceso",q4:"Solicitar condiciones verificadas",q5:"Consultar sobre fotografía",t1:"Hola. Quiero revisar el circuito fotográfico de fauna en Galápagos.\n\nPágina: {url}",t2:"Hola. Quiero verificar vuelos, lanchas, equipaje, itinerarios del parque, yates, guías y márgenes.\n\nPágina: {url}",t3:"Hola. Quiero revisar cámaras, desembarcos, esnórquel, caminatas, movilidad, respaldos y seguro.\n\nPágina: {url}",t4:"Hola. Quiero operadores, ruta, hoteles, inclusiones, tasas, precio, fechas, disponibilidad, pago y cancelación verificados.\n\nPágina: {url}",t5:"Hola. Tengo una consulta sobre esta propuesta fotográfica de Galápagos.\n\nPágina: {url}"},
      "/contact/": {
        q1: "Plan my trip",
        q2: "Business profile inquiry",
        q3: "Partnership or media",
        q4: "Ask a question",
        q5: "Follow up on a request",
        t1: "Hi! I want help planning my Ecuador trip.\n\nPage: {url}",
        t2: "Hi! I represent an Ecuador business and want to ask about a recommendation profile.\n\nPage: {url}",
        t3: "Hi! I have a partnership or media inquiry for Experience Ecuador.\n\nPage: {url}",
        t4: "Hi! I have a question.\n\nPage: {url}",
        t5: "Hi! I want to follow up on an existing request.\n\nPage: {url}"
      },
      "/es/contacto/": {
        q1: "Planificar mi viaje",
        q2: "Consultar un perfil de negocio",
        q3: "Alianza o prensa",
        q4: "Hacer una consulta",
        q5: "Dar seguimiento",
        t1: "Hola. Quiero ayuda para planificar mi viaje por Ecuador.\n\nPágina: {url}",
        t2: "Hola. Represento un negocio de Ecuador y quiero consultar sobre un perfil recomendado.\n\nPágina: {url}",
        t3: "Hola. Tengo una consulta de alianza o prensa para Experience Ecuador.\n\nPágina: {url}",
        t4: "Hola. Tengo una pregunta.\n\nPágina: {url}",
        t5: "Hola. Quiero dar seguimiento a una solicitud anterior.\n\nPágina: {url}"
      },
      "/about/": {
        q1: "Start researching Ecuador", q2: "Build my itinerary", q3: "Review recommendations", q4: "Business profile inquiry", q5: "Ask about Experience Ecuador",
        t1: "Hi! I want help choosing where to start my Ecuador research.\n\nPage: {url}", t2: "Hi! I want help organizing my Ecuador itinerary.\n\nPage: {url}", t3: "Hi! I want help finding a relevant recommendation.\n\nPage: {url}", t4: "Hi! I represent an Ecuador business and want to ask about a profile or partnership.\n\nPage: {url}", t5: "Hi! I have a question about Experience Ecuador.\n\nPage: {url}"
      },
      "/es/sobre-nosotros/": {
        q1: "Empezar a investigar Ecuador", q2: "Armar mi itinerario", q3: "Revisar recomendados", q4: "Consultar un perfil de negocio", q5: "Preguntar sobre Experience Ecuador",
        t1: "Hola. Quiero ayuda para elegir por dónde empezar mi investigación sobre Ecuador.\n\nPágina: {url}", t2: "Hola. Quiero ayuda para organizar mi itinerario por Ecuador.\n\nPágina: {url}", t3: "Hola. Quiero ayuda para encontrar un recomendado relevante.\n\nPágina: {url}", t4: "Hola. Represento un negocio de Ecuador y quiero consultar sobre un perfil o alianza.\n\nPágina: {url}", t5: "Hola. Tengo una consulta sobre Experience Ecuador.\n\nPágina: {url}"
      },
      "/regions/andes/": {
        q1: "Plan an Andes route", q2: "Choose an Andes base", q3: "Compare highland destinations", q4: "Check altitude and logistics", q5: "Ask about the Andes",
        t1: "Hi! I want help planning an Ecuador Andes route.\n\nPage: {url}", t2: "Hi! I want help choosing Quito, Cuenca or another Andes base.\n\nPage: {url}", t3: "Hi! I want to compare destinations in Ecuador's Andes.\n\nPage: {url}", t4: "Hi! I want to review altitude, transport, access and current conditions for an Andes trip.\n\nPage: {url}", t5: "Hi! I have a question about Ecuador's Andes.\n\nPage: {url}"
      },
      "/es/regiones/andes/": {
        q1: "Planificar una ruta andina", q2: "Elegir una base en la Sierra", q3: "Comparar destinos andinos", q4: "Consultar altitud y logística", q5: "Preguntar por los Andes",
        t1: "Hola. Quiero ayuda para planificar una ruta por los Andes de Ecuador.\n\nPágina: {url}", t2: "Hola. Quiero ayuda para elegir Quito, Cuenca u otra base andina.\n\nPágina: {url}", t3: "Hola. Quiero comparar destinos de los Andes de Ecuador.\n\nPágina: {url}", t4: "Hola. Quiero revisar altitud, transporte, acceso y condiciones vigentes para un viaje por la Sierra.\n\nPágina: {url}", t5: "Hola. Tengo una consulta sobre los Andes de Ecuador.\n\nPágina: {url}"
      },
      "/ecuador-unesco-world-heritage-sites/": {
        q1: "Plan a heritage route", q2: "Compare the five properties", q3: "Ask about the Tentative List", q4: "Check access and guides", q5: "Ask a UNESCO question",
        t1: "Hi! I want help planning an Ecuador World Heritage route.\n\nPage: {url}", t2: "Hi! I want help comparing Ecuador's five World Heritage properties.\n\nPage: {url}", t3: "Hi! I have a question about Ecuador's UNESCO Tentative List.\n\nPage: {url}", t4: "Hi! I want to confirm access, permits, transport and guiding for a heritage visit.\n\nPage: {url}", t5: "Hi! I have a question about UNESCO World Heritage in Ecuador.\n\nPage: {url}"
      },
      "/es/patrimonio-mundial-ecuador/": {
        q1: "Planificar una ruta patrimonial", q2: "Comparar los cinco bienes", q3: "Consultar la Lista Indicativa", q4: "Revisar acceso y guías", q5: "Hacer una consulta UNESCO",
        t1: "Hola. Quiero ayuda para planificar una ruta por el Patrimonio Mundial de Ecuador.\n\nPágina: {url}", t2: "Hola. Quiero comparar los cinco bienes de Patrimonio Mundial de Ecuador.\n\nPágina: {url}", t3: "Hola. Tengo una consulta sobre la Lista Indicativa de Ecuador ante la UNESCO.\n\nPágina: {url}", t4: "Hola. Quiero confirmar acceso, permisos, transporte y guianza para una visita patrimonial.\n\nPágina: {url}", t5: "Hola. Tengo una consulta sobre el Patrimonio Mundial UNESCO en Ecuador.\n\nPágina: {url}"
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
      },
      "/regions/andes/cotopaxi/": {
        q1: "Plan a Cotopaxi visit",
        q2: "Compare day trip or overnight",
        q3: "Check altitude and access",
        q4: "Arrange transportation",
        q5: "Ask a Cotopaxi question",
        t1: "Hi! I want help planning a Cotopaxi visit.\n\nPage: {url}",
        t2: "Hi! I want to compare a Cotopaxi day trip with an overnight stay.\n\nPage: {url}",
        t3: "Hi! I want to confirm altitude, activity level and current access for Cotopaxi.\n\nPage: {url}",
        t4: "Hi! I want help arranging transportation for a Cotopaxi route.\n\nPage: {url}",
        t5: "Hi! I have a question about visiting Cotopaxi.\n\nPage: {url}"
      },
      "/es/regiones/andes/cotopaxi/": {
        q1: "Planificar una visita a Cotopaxi",
        q2: "Comparar excursión o estadía",
        q3: "Consultar altitud y acceso",
        q4: "Organizar transporte",
        q5: "Consultar sobre Cotopaxi",
        t1: "Hola. Quiero ayuda para planificar una visita a Cotopaxi.\n\nPágina: {url}",
        t2: "Hola. Quiero comparar una excursión a Cotopaxi con una estadía de una noche.\n\nPágina: {url}",
        t3: "Hola. Quiero confirmar la altitud, el nivel de actividad y el acceso vigente a Cotopaxi.\n\nPágina: {url}",
        t4: "Hola. Quiero ayuda para organizar el transporte de una ruta por Cotopaxi.\n\nPágina: {url}",
        t5: "Hola. Tengo una consulta sobre una visita a Cotopaxi.\n\nPágina: {url}"
      },
      "/regions/andes/banos/": {
        q1: "Plan a Baños stay",
        q2: "Compare two or three nights",
        q3: "Check an adventure activity",
        q4: "Arrange transportation",
        q5: "Ask a Baños question",
        t1: "Hi! I want help planning a stay in Baños.\n\nPage: {url}",
        t2: "Hi! I want to compare a two-night and three-night Baños plan.\n\nPage: {url}",
        t3: "Hi! I want help checking an adventure activity, provider and current conditions in Baños.\n\nPage: {url}",
        t4: "Hi! I want help arranging transportation for a Baños route.\n\nPage: {url}",
        t5: "Hi! I have a question about visiting Baños.\n\nPage: {url}"
      },
      "/es/regiones/andes/banos/": {
        q1: "Planificar una estadía en Baños",
        q2: "Comparar dos o tres noches",
        q3: "Consultar una actividad de aventura",
        q4: "Organizar transporte",
        q5: "Consultar sobre Baños",
        t1: "Hola. Quiero ayuda para planificar una estadía en Baños.\n\nPágina: {url}",
        t2: "Hola. Quiero comparar un plan de dos y tres noches en Baños.\n\nPágina: {url}",
        t3: "Hola. Quiero consultar una actividad de aventura, el operador y las condiciones vigentes en Baños.\n\nPágina: {url}",
        t4: "Hola. Quiero ayuda para organizar el transporte de una ruta por Baños.\n\nPágina: {url}",
        t5: "Hola. Tengo una consulta sobre una visita a Baños.\n\nPágina: {url}"
      },
      "/regions/andes/papallacta/": {
        q1: "Plan a Papallacta visit",
        q2: "Compare day trip or overnight",
        q3: "Check thermal access",
        q4: "Arrange transportation",
        q5: "Ask a Papallacta question",
        t1: "Hi! I want help planning a Papallacta visit.\n\nPage: {url}",
        t2: "Hi! I want to compare a Papallacta day trip with an overnight stay.\n\nPage: {url}",
        t3: "Hi! I want to confirm current thermal access, inclusions and booking requirements in Papallacta.\n\nPage: {url}",
        t4: "Hi! I want help arranging transportation for a Papallacta route.\n\nPage: {url}",
        t5: "Hi! I have a question about visiting Papallacta.\n\nPage: {url}"
      },
      "/es/regiones/andes/papallacta/": {
        q1: "Planificar una visita a Papallacta",
        q2: "Comparar excursión o noche",
        q3: "Consultar acceso a las termas",
        q4: "Organizar transporte",
        q5: "Consultar sobre Papallacta",
        t1: "Hola. Quiero ayuda para planificar una visita a Papallacta.\n\nPágina: {url}",
        t2: "Hola. Quiero comparar una excursión a Papallacta con una estadía de una noche.\n\nPágina: {url}",
        t3: "Hola. Quiero confirmar el acceso vigente a las termas, las inclusiones y los requisitos de reserva en Papallacta.\n\nPágina: {url}",
        t4: "Hola. Quiero ayuda para organizar el transporte de una ruta por Papallacta.\n\nPágina: {url}",
        t5: "Hola. Tengo una consulta sobre una visita a Papallacta.\n\nPágina: {url}"
      },
      "/regions/andes/otavalo/": {q1:"Plan an Otavalo visit",q2:"Compare day trip or overnight",q3:"Check market and cultural timing",q4:"Arrange transportation",q5:"Ask an Otavalo question",t1:"Hi! I want help planning an Otavalo visit.\n\nPage: {url}",t2:"Hi! I want to compare an Otavalo day trip with an overnight stay.\n\nPage: {url}",t3:"Hi! I want to confirm current market timing, cultural stops and inclusions in Otavalo.\n\nPage: {url}",t4:"Hi! I want help arranging transportation for an Otavalo route.\n\nPage: {url}",t5:"Hi! I have a question about visiting Otavalo.\n\nPage: {url}"},
      "/es/regiones/andes/otavalo/": {q1:"Planificar una visita a Otavalo",q2:"Comparar excursión o noche",q3:"Consultar horarios y contexto cultural",q4:"Organizar transporte",q5:"Consultar sobre Otavalo",t1:"Hola. Quiero ayuda para planificar una visita a Otavalo.\n\nPágina: {url}",t2:"Hola. Quiero comparar una excursión a Otavalo con una noche.\n\nPágina: {url}",t3:"Hola. Quiero confirmar horarios, paradas culturales e inclusiones en Otavalo.\n\nPágina: {url}",t4:"Hola. Quiero organizar el transporte de una ruta por Otavalo.\n\nPágina: {url}",t5:"Hola. Tengo una consulta sobre Otavalo.\n\nPágina: {url}"},
      "/regions/andes/cuenca/": {q1:"Plan a Cuenca stay",q2:"Compare two, three or four nights",q3:"Check a southern Andes day trip",q4:"Arrange transportation",q5:"Ask a Cuenca question",t1:"Hi! I want help planning a Cuenca stay.\n\nPage: {url}",t2:"Hi! I want to compare two, three or four nights in Cuenca.\n\nPage: {url}",t3:"Hi! I want to confirm a southern Andes day trip from Cuenca.\n\nPage: {url}",t4:"Hi! I want help arranging transportation for Cuenca.\n\nPage: {url}",t5:"Hi! I have a question about visiting Cuenca.\n\nPage: {url}"},
      "/es/regiones/andes/cuenca/": {q1:"Planificar una estadía en Cuenca",q2:"Comparar dos, tres o cuatro noches",q3:"Consultar una excursión por el sur andino",q4:"Organizar transporte",q5:"Consultar sobre Cuenca",t1:"Hola. Quiero ayuda para planificar una estadía en Cuenca.\n\nPágina: {url}",t2:"Hola. Quiero comparar dos, tres o cuatro noches en Cuenca.\n\nPágina: {url}",t3:"Hola. Quiero confirmar una excursión por los Andes del sur desde Cuenca.\n\nPágina: {url}",t4:"Hola. Quiero organizar el transporte para Cuenca.\n\nPágina: {url}",t5:"Hola. Tengo una consulta sobre Cuenca.\n\nPágina: {url}"},
      "/regions/andes/choco-andino/": {q1:"Plan a Chocó Andino stay",q2:"Compare one, two or three nights",q3:"Check a specialist nature plan",q4:"Arrange transportation",q5:"Ask a Chocó Andino question",t1:"Hi! I want help planning a Chocó Andino stay.\n\nPage: {url}",t2:"Hi! I want to compare one, two or three nights in Chocó Andino.\n\nPage: {url}",t3:"Hi! I want to confirm a specialist guide, reserve access and current conditions.\n\nPage: {url}",t4:"Hi! I want help arranging transportation for Chocó Andino.\n\nPage: {url}",t5:"Hi! I have a question about Chocó Andino.\n\nPage: {url}"},
      "/es/regiones/andes/choco-andino/": {q1:"Planificar una estadía en el Chocó Andino",q2:"Comparar una, dos o tres noches",q3:"Consultar un plan de naturaleza especializado",q4:"Organizar transporte",q5:"Consultar sobre el Chocó Andino",t1:"Hola. Quiero ayuda para planificar una estadía en el Chocó Andino.\n\nPágina: {url}",t2:"Hola. Quiero comparar una, dos o tres noches en el Chocó Andino.\n\nPágina: {url}",t3:"Hola. Quiero confirmar guía especialista, acceso a reservas y condiciones vigentes.\n\nPágina: {url}",t4:"Hola. Quiero organizar el transporte para el Chocó Andino.\n\nPágina: {url}",t5:"Hola. Tengo una consulta sobre el Chocó Andino.\n\nPágina: {url}"},
      "/regions/andes/cotacachi/": {q1:"Plan a Cotacachi visit",q2:"Compare day trip or overnight",q3:"Check Cuicocha access",q4:"Arrange transportation",q5:"Ask a Cotacachi question",t1:"Hi! I want help planning Cotacachi.\n\nPage: {url}",t2:"Hi! I want to compare a day trip with an overnight stay.\n\nPage: {url}",t3:"Hi! I want to confirm Cuicocha access, weather and activity options.\n\nPage: {url}",t4:"Hi! I want help arranging transportation.\n\nPage: {url}",t5:"Hi! I have a question about Cotacachi.\n\nPage: {url}"},
      "/es/regiones/andes/cotacachi/": {q1:"Planificar Cotacachi",q2:"Comparar excursión o noche",q3:"Consultar acceso a Cuicocha",q4:"Organizar transporte",q5:"Consultar sobre Cotacachi",t1:"Hola. Quiero planificar Cotacachi.\n\nPágina: {url}",t2:"Hola. Quiero comparar una excursión con una noche.\n\nPágina: {url}",t3:"Hola. Quiero confirmar acceso, clima y actividades en Cuicocha.\n\nPágina: {url}",t4:"Hola. Quiero organizar el transporte.\n\nPágina: {url}",t5:"Hola. Tengo una consulta sobre Cotacachi.\n\nPágina: {url}"},
      "/regions/andes/zuleta/": {q1:"Plan a Zuleta visit",q2:"Compare day visit or overnight",q3:"Check hosts and permissions",q4:"Arrange transportation",q5:"Ask a Zuleta question",t1:"Hi! I want help planning Zuleta.\n\nPage: {url}",t2:"Hi! I want to compare a day visit with an overnight stay.\n\nPage: {url}",t3:"Hi! I want to confirm hosts, permissions and current access.\n\nPage: {url}",t4:"Hi! I want help arranging transportation.\n\nPage: {url}",t5:"Hi! I have a question about Zuleta.\n\nPage: {url}"},
      "/es/regiones/andes/zuleta/": {q1:"Planificar Zuleta",q2:"Comparar visita o noche",q3:"Consultar anfitriones y permisos",q4:"Organizar transporte",q5:"Consultar sobre Zuleta",t1:"Hola. Quiero planificar Zuleta.\n\nPágina: {url}",t2:"Hola. Quiero comparar una visita con una noche.\n\nPágina: {url}",t3:"Hola. Quiero confirmar anfitriones, permisos y acceso vigente.\n\nPágina: {url}",t4:"Hola. Quiero organizar el transporte.\n\nPágina: {url}",t5:"Hola. Tengo una consulta sobre Zuleta.\n\nPágina: {url}"},
      "/regions/amazon/tena/": {q1:"Plan a Tena stay",q2:"Compare two to four days",q3:"Check an activity and conditions",q4:"Arrange transportation",q5:"Ask a Tena question",t1:"Hi! I want help planning Tena.\n\nPage: {url}",t2:"Hi! I want to compare two to four days in Tena.\n\nPage: {url}",t3:"Hi! I want to confirm a provider, activity and current conditions.\n\nPage: {url}",t4:"Hi! I want help arranging transportation.\n\nPage: {url}",t5:"Hi! I have a question about Tena.\n\nPage: {url}"},
      "/es/regiones/amazonia/tena/": {q1:"Planificar Tena",q2:"Comparar de dos a cuatro días",q3:"Consultar actividad y condiciones",q4:"Organizar transporte",q5:"Consultar sobre Tena",t1:"Hola. Quiero planificar Tena.\n\nPágina: {url}",t2:"Hola. Quiero comparar de dos a cuatro días en Tena.\n\nPágina: {url}",t3:"Hola. Quiero confirmar proveedor, actividad y condiciones vigentes.\n\nPágina: {url}",t4:"Hola. Quiero organizar el transporte.\n\nPágina: {url}",t5:"Hola. Tengo una consulta sobre Tena.\n\nPágina: {url}"},
      "/regions/amazon/misahualli/": {q1:"Plan Misahuallí",q2:"Compare one to three days",q3:"Check hosts and wildlife ethics",q4:"Arrange transportation",q5:"Ask about Misahuallí",t1:"Hi! I want help planning Misahuallí.\n\nPage: {url}",t2:"Hi! I want to compare one to three days.\n\nPage: {url}",t3:"Hi! I want to confirm hosts, permissions and wildlife ethics.\n\nPage: {url}",t4:"Hi! I want transportation help.\n\nPage: {url}",t5:"Hi! I have a Misahuallí question.\n\nPage: {url}"},
      "/es/regiones/amazonia/misahualli/": {q1:"Planificar Misahuallí",q2:"Comparar de uno a tres días",q3:"Consultar anfitriones y ética",q4:"Organizar transporte",q5:"Consultar sobre Misahuallí",t1:"Hola. Quiero planificar Misahuallí.\n\nPágina: {url}",t2:"Hola. Quiero comparar de uno a tres días.\n\nPágina: {url}",t3:"Hola. Quiero confirmar anfitriones, permisos y ética de fauna.\n\nPágina: {url}",t4:"Hola. Quiero organizar transporte.\n\nPágina: {url}",t5:"Hola. Tengo una consulta.\n\nPágina: {url}"},
      "/regions/amazon/cuyabeno-wildlife-reserve/": {q1:"Plan Cuyabeno",q2:"Compare three to five days",q3:"Check lodge and transfers",q4:"Review current conditions",q5:"Ask about Cuyabeno",t1:"Hi! I want help planning Cuyabeno.\n\nPage: {url}",t2:"Hi! I want to compare three to five days.\n\nPage: {url}",t3:"Hi! I want to confirm lodge and transfers.\n\nPage: {url}",t4:"Hi! I want current condition guidance.\n\nPage: {url}",t5:"Hi! I have a Cuyabeno question.\n\nPage: {url}"},
      "/es/regiones/amazonia/cuyabeno-reserva-faunistica/": {q1:"Planificar Cuyabeno",q2:"Comparar de tres a cinco días",q3:"Consultar alojamiento y traslados",q4:"Revisar condiciones vigentes",q5:"Consultar sobre Cuyabeno",t1:"Hola. Quiero planificar Cuyabeno.\n\nPágina: {url}",t2:"Hola. Quiero comparar de tres a cinco días.\n\nPágina: {url}",t3:"Hola. Quiero confirmar alojamiento y traslados.\n\nPágina: {url}",t4:"Hola. Quiero revisar condiciones vigentes.\n\nPágina: {url}",t5:"Hola. Tengo una consulta.\n\nPágina: {url}"},
      "/regions/amazon/yasuni-national-park/": {q1:"Plan Yasuní",q2:"Compare four to seven days",q3:"Check lodge and permits",q4:"Review the transfer chain",q5:"Ask about Yasuní",t1:"Hi! I want help planning Yasuní.\n\nPage: {url}",t2:"Hi! I want to compare four to seven days.\n\nPage: {url}",t3:"Hi! I want to confirm lodge and permits.\n\nPage: {url}",t4:"Hi! I want to review transfers.\n\nPage: {url}",t5:"Hi! I have a Yasuní question.\n\nPage: {url}"},
      "/es/regiones/amazonia/parque-nacional-yasuni/": {q1:"Planificar Yasuní",q2:"Comparar de cuatro a siete días",q3:"Consultar alojamiento y permisos",q4:"Revisar los traslados",q5:"Consultar sobre Yasuní",t1:"Hola. Quiero planificar Yasuní.\n\nPágina: {url}",t2:"Hola. Quiero comparar de cuatro a siete días.\n\nPágina: {url}",t3:"Hola. Quiero confirmar alojamiento y permisos.\n\nPágina: {url}",t4:"Hola. Quiero revisar los traslados.\n\nPágina: {url}",t5:"Hola. Tengo una consulta.\n\nPágina: {url}"},
      "/experiences/": {q1:"Choose my lead experience",q2:"Compare experience priorities",q3:"Match regions to my interests",q4:"Review providers and logistics",q5:"Ask about Ecuador experiences",t1:"Hi! I want help choosing the experience that should lead my Ecuador trip.\n\nPage: {url}",t2:"Hi! I want to compare experience priorities for my trip.\n\nPage: {url}",t3:"Hi! I want to match Ecuador regions to my interests.\n\nPage: {url}",t4:"Hi! I want to review providers, access and logistics.\n\nPage: {url}",t5:"Hi! I have a question about Ecuador experiences.\n\nPage: {url}"},
      "/es/experiencias/": {q1:"Elegir mi experiencia principal",q2:"Comparar prioridades",q3:"Relacionar regiones e intereses",q4:"Revisar operadores y logística",q5:"Consultar sobre experiencias",t1:"Hola. Quiero elegir la experiencia principal de mi viaje por Ecuador.\n\nPágina: {url}",t2:"Hola. Quiero comparar prioridades para mi viaje.\n\nPágina: {url}",t3:"Hola. Quiero relacionar las regiones de Ecuador con mis intereses.\n\nPágina: {url}",t4:"Hola. Quiero revisar operadores, acceso y logística.\n\nPágina: {url}",t5:"Hola. Tengo una consulta sobre experiencias en Ecuador.\n\nPágina: {url}"},
      "/experiences/nature/": {q1:"Plan a nature trip",q2:"Compare Ecuador ecosystems",q3:"Check access and conditions",q4:"Find a specialist guide",q5:"Ask about nature travel",t1:"Hi! I want help planning a nature-focused Ecuador trip.\n\nPage: {url}",t2:"Hi! I want to compare Ecuador ecosystems.\n\nPage: {url}",t3:"Hi! I want to confirm current access, weather and trail conditions.\n\nPage: {url}",t4:"Hi! I want help finding a qualified nature guide.\n\nPage: {url}",t5:"Hi! I have a nature-travel question.\n\nPage: {url}"},
      "/es/experiencias/naturaleza/": {q1:"Planificar un viaje de naturaleza",q2:"Comparar ecosistemas",q3:"Consultar acceso y condiciones",q4:"Buscar un guía especialista",q5:"Consultar sobre naturaleza",t1:"Hola. Quiero planificar un viaje de naturaleza por Ecuador.\n\nPágina: {url}",t2:"Hola. Quiero comparar ecosistemas de Ecuador.\n\nPágina: {url}",t3:"Hola. Quiero confirmar acceso, clima y condiciones de senderos.\n\nPágina: {url}",t4:"Hola. Quiero buscar un guía de naturaleza calificado.\n\nPágina: {url}",t5:"Hola. Tengo una consulta sobre naturaleza.\n\nPágina: {url}"},
      "/experiences/wildlife-birding/": {q1:"Plan wildlife and birding",q2:"Compare habitats and routes",q3:"Find a specialist guide",q4:"Review ethical observation",q5:"Ask about target species",t1:"Hi! I want help planning wildlife and birding in Ecuador.\n\nPage: {url}",t2:"Hi! I want to compare habitats and route options.\n\nPage: {url}",t3:"Hi! I want help finding a qualified specialist guide.\n\nPage: {url}",t4:"Hi! I want to review ethical observation and current access.\n\nPage: {url}",t5:"Hi! I have a question about target species and realistic sightings.\n\nPage: {url}"},
      "/es/experiencias/vida-silvestre-y-aves/": {q1:"Planificar fauna y aves",q2:"Comparar hábitats y rutas",q3:"Buscar un guía especialista",q4:"Revisar observación ética",q5:"Consultar especies objetivo",t1:"Hola. Quiero planificar fauna y avistamiento de aves en Ecuador.\n\nPágina: {url}",t2:"Hola. Quiero comparar hábitats y opciones de ruta.\n\nPágina: {url}",t3:"Hola. Quiero buscar un guía especialista calificado.\n\nPágina: {url}",t4:"Hola. Quiero revisar observación ética y acceso vigente.\n\nPágina: {url}",t5:"Hola. Tengo una consulta sobre especies objetivo y avistamientos realistas.\n\nPágina: {url}"},
      "/experiences/adventure/": {q1:"Plan an adventure trip",q2:"Compare activity bases",q3:"Check safety and operator",q4:"Arrange active-route transport",q5:"Ask about adventure travel",t1:"Hi! I want help planning adventure travel in Ecuador.\n\nPage: {url}",t2:"Hi! I want to compare activity bases and difficulty.\n\nPage: {url}",t3:"Hi! I want to confirm a qualified operator, safety system and equipment.\n\nPage: {url}",t4:"Hi! I want help arranging transport for an active route.\n\nPage: {url}",t5:"Hi! I have an Ecuador adventure question.\n\nPage: {url}"},
      "/es/experiencias/aventura/": {q1:"Planificar un viaje de aventura",q2:"Comparar bases y actividades",q3:"Consultar seguridad y operador",q4:"Organizar transporte activo",q5:"Consultar sobre aventura",t1:"Hola. Quiero planificar un viaje de aventura por Ecuador.\n\nPágina: {url}",t2:"Hola. Quiero comparar bases, actividades y dificultad.\n\nPágina: {url}",t3:"Hola. Quiero confirmar operador calificado, sistema de seguridad y equipo.\n\nPágina: {url}",t4:"Hola. Quiero organizar transporte para una ruta activa.\n\nPágina: {url}",t5:"Hola. Tengo una consulta sobre aventura en Ecuador.\n\nPágina: {url}"},
      "/experiences/relaxation/": {q1:"Plan a relaxation trip",q2:"Compare restorative bases",q3:"Check rooms and services",q4:"Arrange easy transportation",q5:"Ask about a slower trip",t1:"Hi! I want help planning a relaxation-focused Ecuador trip.\n\nPage: {url}",t2:"Hi! I want to compare restorative bases.\n\nPage: {url}",t3:"Hi! I want to confirm rooms, services, access and inclusions.\n\nPage: {url}",t4:"Hi! I want help arranging easy transportation.\n\nPage: {url}",t5:"Hi! I have a question about a slower Ecuador trip.\n\nPage: {url}"},
      "/es/experiencias/relajacion/": {q1:"Planificar un viaje de descanso",q2:"Comparar bases reparadoras",q3:"Consultar habitaciones y servicios",q4:"Organizar transporte sencillo",q5:"Consultar sobre un viaje tranquilo",t1:"Hola. Quiero planificar un viaje de descanso por Ecuador.\n\nPágina: {url}",t2:"Hola. Quiero comparar bases reparadoras.\n\nPágina: {url}",t3:"Hola. Quiero confirmar habitaciones, servicios, acceso e inclusiones.\n\nPágina: {url}",t4:"Hola. Quiero organizar transporte sencillo.\n\nPágina: {url}",t5:"Hola. Tengo una consulta sobre un viaje tranquilo.\n\nPágina: {url}"},
      "/experiences/culture/": {q1:"Plan a cultural trip",q2:"Compare cultural bases",q3:"Find a local guide or host",q4:"Review permissions and etiquette",q5:"Ask about cultural travel",t1:"Hi! I want help planning cultural travel in Ecuador.\n\nPage: {url}",t2:"Hi! I want to compare Quito, Cuenca, Otavalo and other cultural bases.\n\nPage: {url}",t3:"Hi! I want help finding a qualified local guide or host.\n\nPage: {url}",t4:"Hi! I want to review permissions, etiquette and access.\n\nPage: {url}",t5:"Hi! I have an Ecuador culture question.\n\nPage: {url}"},
      "/es/experiencias/cultura/": {q1:"Planificar un viaje cultural",q2:"Comparar bases culturales",q3:"Buscar guía o anfitrión local",q4:"Revisar permisos y normas",q5:"Consultar sobre cultura",t1:"Hola. Quiero planificar un viaje cultural por Ecuador.\n\nPágina: {url}",t2:"Hola. Quiero comparar Quito, Cuenca, Otavalo y otras bases culturales.\n\nPágina: {url}",t3:"Hola. Quiero buscar un guía local o anfitrión calificado.\n\nPágina: {url}",t4:"Hola. Quiero revisar permisos, normas de respeto y acceso.\n\nPágina: {url}",t5:"Hola. Tengo una consulta sobre cultura en Ecuador.\n\nPágina: {url}"},
      "/experiences/culinary/": {q1:"Plan a culinary trip",q2:"Compare food regions",q3:"Review dietary needs",q4:"Find a guide or producer",q5:"Ask about Ecuadorian food",t1:"Hi! I want help planning a culinary trip in Ecuador.\n\nPage: {url}",t2:"Hi! I want to compare Ecuador's food regions.\n\nPage: {url}",t3:"Hi! I want to review dietary needs, ingredients and allergens.\n\nPage: {url}",t4:"Hi! I want help finding a qualified food guide, host or producer.\n\nPage: {url}",t5:"Hi! I have a question about culinary travel in Ecuador.\n\nPage: {url}"},
      "/es/experiencias/gastronomia/": {q1:"Planificar un viaje gastronómico",q2:"Comparar regiones y sabores",q3:"Revisar necesidades alimentarias",q4:"Buscar guía o productor",q5:"Consultar sobre gastronomía",t1:"Hola. Quiero planificar un viaje gastronómico por Ecuador.\n\nPágina: {url}",t2:"Hola. Quiero comparar regiones y sabores de Ecuador.\n\nPágina: {url}",t3:"Hola. Quiero revisar necesidades alimentarias, ingredientes y alérgenos.\n\nPágina: {url}",t4:"Hola. Quiero buscar un guía, anfitrión o productor calificado.\n\nPágina: {url}",t5:"Hola. Tengo una consulta sobre gastronomía en Ecuador.\n\nPágina: {url}"},
      "/experiences/culinary/must-eats/": {q1:"Build a regional food list",q2:"Compare must-eat dishes",q3:"Review ingredients and allergens",q4:"Plan a market or tasting",q5:"Ask about a dish",t1:"Hi! I want to build a regional Ecuador food list.\n\nPage: {url}",t2:"Hi! I want to compare must-eat dishes by region.\n\nPage: {url}",t3:"Hi! I want to review ingredients and allergens.\n\nPage: {url}",t4:"Hi! I want help planning a market visit or tasting.\n\nPage: {url}",t5:"Hi! I have a question about an Ecuadorian dish.\n\nPage: {url}"},
      "/es/experiencias/gastronomia/imperdibles/": {q1:"Crear una lista regional",q2:"Comparar platos imperdibles",q3:"Revisar ingredientes y alérgenos",q4:"Planificar mercado o degustación",q5:"Consultar sobre un plato",t1:"Hola. Quiero crear una lista regional de comidas ecuatorianas.\n\nPágina: {url}",t2:"Hola. Quiero comparar platos imperdibles por región.\n\nPágina: {url}",t3:"Hola. Quiero revisar ingredientes y alérgenos.\n\nPágina: {url}",t4:"Hola. Quiero planificar una visita a un mercado o una degustación.\n\nPágina: {url}",t5:"Hola. Tengo una consulta sobre un plato ecuatoriano.\n\nPágina: {url}"},
      "/experiences/adventure/banos/": {q1:"Plan Baños adventure days",q2:"Compare activities",q3:"Check safety and operator",q4:"Arrange pickup and transport",q5:"Ask about Baños adventure",t1:"Hi! I want help planning adventure days in Baños.\n\nPage: {url}",t2:"Hi! I want to compare adventure activities in Baños.\n\nPage: {url}",t3:"Hi! I want to confirm a qualified operator, safety system and equipment.\n\nPage: {url}",t4:"Hi! I want help arranging pickup and transportation.\n\nPage: {url}",t5:"Hi! I have a question about adventure in Baños.\n\nPage: {url}"},
      "/es/experiencias/aventura/banos/": {q1:"Planificar aventura en Baños",q2:"Comparar actividades",q3:"Consultar seguridad y operador",q4:"Organizar recogida y transporte",q5:"Consultar sobre aventura",t1:"Hola. Quiero planificar jornadas de aventura en Baños.\n\nPágina: {url}",t2:"Hola. Quiero comparar actividades de aventura en Baños.\n\nPágina: {url}",t3:"Hola. Quiero confirmar operador calificado, seguridad y equipo.\n\nPágina: {url}",t4:"Hola. Quiero organizar recogida y transporte.\n\nPágina: {url}",t5:"Hola. Tengo una consulta sobre aventura en Baños.\n\nPágina: {url}"},
      "/experiences/birdwatching/mindo/": {q1:"Plan Mindo birdwatching",q2:"Compare habitats and elevations",q3:"Find a specialist guide",q4:"Review ethical observation",q5:"Ask about target species",t1:"Hi! I want help planning birdwatching in Mindo.\n\nPage: {url}",t2:"Hi! I want to compare Mindo habitats and elevations.\n\nPage: {url}",t3:"Hi! I want help finding a qualified specialist guide.\n\nPage: {url}",t4:"Hi! I want to review ethical observation and current access.\n\nPage: {url}",t5:"Hi! I have a question about target species and realistic sightings.\n\nPage: {url}"},
      "/es/experiencias/avistamiento/mindo/": {q1:"Planificar aves en Mindo",q2:"Comparar hábitats y elevaciones",q3:"Buscar un guía especialista",q4:"Revisar observación ética",q5:"Consultar especies objetivo",t1:"Hola. Quiero planificar avistamiento de aves en Mindo.\n\nPágina: {url}",t2:"Hola. Quiero comparar hábitats y elevaciones de Mindo.\n\nPágina: {url}",t3:"Hola. Quiero buscar un guía especialista calificado.\n\nPágina: {url}",t4:"Hola. Quiero revisar observación ética y acceso vigente.\n\nPágina: {url}",t5:"Hola. Tengo una consulta sobre especies objetivo y avistamientos realistas.\n\nPágina: {url}"},
      "/experiences/birdwatching/quito/": {q1:"Plan birdwatching from Quito",q2:"Compare high-Andes habitats",q3:"Check altitude and access",q4:"Find a specialist guide",q5:"Ask about Quito birding",t1:"Hi! I want help planning birdwatching from Quito.\n\nPage: {url}",t2:"Hi! I want to compare high-Andes habitats near Quito.\n\nPage: {url}",t3:"Hi! I want to confirm altitude, access and current conditions.\n\nPage: {url}",t4:"Hi! I want help finding a qualified specialist guide.\n\nPage: {url}",t5:"Hi! I have a question about birdwatching from Quito.\n\nPage: {url}"},
      "/es/experiencias/avistamiento/quito/": {q1:"Planificar aves desde Quito",q2:"Comparar hábitats altoandinos",q3:"Consultar altitud y acceso",q4:"Buscar un guía especialista",q5:"Consultar sobre aves en Quito",t1:"Hola. Quiero planificar avistamiento de aves desde Quito.\n\nPágina: {url}",t2:"Hola. Quiero comparar hábitats altoandinos cerca de Quito.\n\nPágina: {url}",t3:"Hola. Quiero confirmar altitud, acceso y condiciones vigentes.\n\nPágina: {url}",t4:"Hola. Quiero buscar un guía especialista calificado.\n\nPágina: {url}",t5:"Hola. Tengo una consulta sobre aves desde Quito.\n\nPágina: {url}"},
      "/regions/andes/mindo/": {q1:"Plan a Mindo stay",q2:"Compare one, two or three days",q3:"Plan birding and nature",q4:"Review lodging and transport",q5:"Ask a Mindo question",t1:"Hi! I want help planning a stay in Mindo.\n\nPage: {url}",t2:"Hi! I want to compare one, two or three days in Mindo.\n\nPage: {url}",t3:"Hi! I want help planning birding and nature in Mindo.\n\nPage: {url}",t4:"Hi! I want to review lodging, pickup and transportation.\n\nPage: {url}",t5:"Hi! I have a question about visiting Mindo.\n\nPage: {url}"},
      "/es/regiones/andes/mindo/": {q1:"Planificar una estadía en Mindo",q2:"Comparar uno, dos o tres días",q3:"Planificar aves y naturaleza",q4:"Revisar alojamiento y transporte",q5:"Consultar sobre Mindo",t1:"Hola. Quiero planificar una estadía en Mindo.\n\nPágina: {url}",t2:"Hola. Quiero comparar uno, dos o tres días en Mindo.\n\nPágina: {url}",t3:"Hola. Quiero planificar aves y naturaleza en Mindo.\n\nPágina: {url}",t4:"Hola. Quiero revisar alojamiento, recogida y transporte.\n\nPágina: {url}",t5:"Hola. Tengo una consulta sobre Mindo.\n\nPágina: {url}"},
      "/regions/galapagos/": {q1:"Plan a Galápagos trip",q2:"Compare cruise or land route",q3:"Choose island bases",q4:"Check access and transport",q5:"Ask about Galápagos",t1:"Hi! I want help planning a Galápagos trip.\n\nPage: {url}",t2:"Hi! I want to compare a naturalist cruise with a land-based route.\n\nPage: {url}",t3:"Hi! I want help choosing my Galápagos island bases.\n\nPage: {url}",t4:"Hi! I want to confirm licensed access, flights and inter-island transport.\n\nPage: {url}",t5:"Hi! I have a Galápagos planning question.\n\nPage: {url}"},
      "/es/regiones/galapagos/": {q1:"Planificar Galápagos",q2:"Comparar crucero o ruta terrestre",q3:"Elegir islas base",q4:"Consultar acceso y transporte",q5:"Preguntar por Galápagos",t1:"Hola. Quiero planificar un viaje a Galápagos.\n\nPágina: {url}",t2:"Hola. Quiero comparar un crucero naturalista con una ruta terrestre.\n\nPágina: {url}",t3:"Hola. Quiero ayuda para elegir mis islas base.\n\nPágina: {url}",t4:"Hola. Quiero confirmar acceso autorizado, vuelos y transporte entre islas.\n\nPágina: {url}",t5:"Hola. Tengo una consulta sobre Galápagos.\n\nPágina: {url}"},
      "/regions/galapagos/santa-cruz-island/": {q1:"Plan a Santa Cruz stay",q2:"Compare three to five nights",q3:"Check a licensed day tour",q4:"Review Baltra transfers",q5:"Ask about Santa Cruz",t1:"Hi! I want help planning a Santa Cruz stay.\n\nPage: {url}",t2:"Hi! I want to compare three to five nights on Santa Cruz.\n\nPage: {url}",t3:"Hi! I want to confirm a licensed Santa Cruz day tour and current conditions.\n\nPage: {url}",t4:"Hi! I want to review the Baltra-to-Puerto Ayora transfer chain.\n\nPage: {url}",t5:"Hi! I have a question about Santa Cruz.\n\nPage: {url}"},
      "/es/regiones/galapagos/santa-cruz-island/": {q1:"Planificar Santa Cruz",q2:"Comparar tres a cinco noches",q3:"Consultar una excursión autorizada",q4:"Revisar traslados desde Baltra",q5:"Preguntar por Santa Cruz",t1:"Hola. Quiero planificar una estadía en Santa Cruz.\n\nPágina: {url}",t2:"Hola. Quiero comparar entre tres y cinco noches en Santa Cruz.\n\nPágina: {url}",t3:"Hola. Quiero confirmar una excursión autorizada y condiciones vigentes.\n\nPágina: {url}",t4:"Hola. Quiero revisar el traslado desde Baltra hasta Puerto Ayora.\n\nPágina: {url}",t5:"Hola. Tengo una consulta sobre Santa Cruz.\n\nPágina: {url}"},
      "/regions/galapagos/san-cristobal-island/": {q1:"Plan a San Cristóbal stay",q2:"Compare three to five nights",q3:"Check Kicker Rock conditions",q4:"Review water safety",q5:"Ask about San Cristóbal",t1:"Hi! I want help planning a San Cristóbal stay.\n\nPage: {url}",t2:"Hi! I want to compare three to five nights on San Cristóbal.\n\nPage: {url}",t3:"Hi! I want to confirm a licensed Kicker Rock excursion and current conditions.\n\nPage: {url}",t4:"Hi! I want to review swimming expectations, equipment and water safety.\n\nPage: {url}",t5:"Hi! I have a question about San Cristóbal.\n\nPage: {url}"},
      "/es/regiones/galapagos/san-cristobal-island/": {q1:"Planificar San Cristóbal",q2:"Comparar tres a cinco noches",q3:"Consultar condiciones en León Dormido",q4:"Revisar seguridad acuática",q5:"Preguntar por San Cristóbal",t1:"Hola. Quiero planificar una estadía en San Cristóbal.\n\nPágina: {url}",t2:"Hola. Quiero comparar entre tres y cinco noches en San Cristóbal.\n\nPágina: {url}",t3:"Hola. Quiero confirmar una excursión autorizada a León Dormido y condiciones vigentes.\n\nPágina: {url}",t4:"Hola. Quiero revisar exigencia para nadar, equipo y seguridad acuática.\n\nPágina: {url}",t5:"Hola. Tengo una consulta sobre San Cristóbal.\n\nPágina: {url}"},
      "/regions/galapagos/isabela-island/": {q1:"Plan an Isabela stay",q2:"Compare three to five nights",q3:"Check volcano access",q4:"Review marine conditions",q5:"Ask about Isabela",t1:"Hi! I want help planning an Isabela Island stay.\n\nPage: {url}",t2:"Hi! I want to compare three to five nights on Isabela.\n\nPage: {url}",t3:"Hi! I want to confirm licensed volcano access, difficulty and current conditions.\n\nPage: {url}",t4:"Hi! I want to review a marine outing, equipment and sea conditions.\n\nPage: {url}",t5:"Hi! I have a question about Isabela Island.\n\nPage: {url}"},
      "/es/regiones/galapagos/isabela-island/": {q1:"Planificar Isla Isabela",q2:"Comparar tres a cinco noches",q3:"Consultar acceso volcánico",q4:"Revisar condiciones marinas",q5:"Preguntar por Isabela",t1:"Hola. Quiero planificar una estadía en Isla Isabela.\n\nPágina: {url}",t2:"Hola. Quiero comparar entre tres y cinco noches en Isabela.\n\nPágina: {url}",t3:"Hola. Quiero confirmar acceso volcánico autorizado, dificultad y condiciones vigentes.\n\nPágina: {url}",t4:"Hola. Quiero revisar una salida marina, equipo y condiciones del mar.\n\nPágina: {url}",t5:"Hola. Tengo una consulta sobre Isla Isabela.\n\nPágina: {url}"},
      "/regions/galapagos/floreana-island/": {q1:"Plan a Floreana visit",q2:"Compare day trip or overnight",q3:"Check licensed access",q4:"Review island transport",q5:"Ask about Floreana",t1:"Hi! I want help planning a Floreana Island visit.\n\nPage: {url}",t2:"Hi! I want to compare a licensed day trip with an overnight stay on Floreana.\n\nPage: {url}",t3:"Hi! I want to confirm licensed access, guiding and included sites.\n\nPage: {url}",t4:"Hi! I want to review transport, baggage and current operating conditions.\n\nPage: {url}",t5:"Hi! I have a question about Floreana Island.\n\nPage: {url}"},
      "/es/regiones/galapagos/floreana-island/": {q1:"Planificar Isla Floreana",q2:"Comparar excursión o noche",q3:"Consultar acceso autorizado",q4:"Revisar transporte insular",q5:"Preguntar por Floreana",t1:"Hola. Quiero planificar una visita a Isla Floreana.\n\nPágina: {url}",t2:"Hola. Quiero comparar una excursión autorizada con una noche en Floreana.\n\nPágina: {url}",t3:"Hola. Quiero confirmar acceso autorizado, guía y sitios incluidos.\n\nPágina: {url}",t4:"Hola. Quiero revisar transporte, equipaje y condiciones operativas vigentes.\n\nPágina: {url}",t5:"Hola. Tengo una consulta sobre Isla Floreana.\n\nPágina: {url}"},
      "/regions/coast/": {q1:"Plan an Ecuador Coast route",q2:"Compare coastal bases",q3:"Check season and conditions",q4:"Review transport and operators",q5:"Ask about the Coast",t1:"Hi! I want help planning an Ecuador Coast route.\n\nPage: {url}",t2:"Hi! I want to compare Guayaquil, Puerto López and other coastal bases.\n\nPage: {url}",t3:"Hi! I want to confirm season, weather and current marine conditions.\n\nPage: {url}",t4:"Hi! I want to review transport and licensed coastal operators.\n\nPage: {url}",t5:"Hi! I have a question about Ecuador's Coast.\n\nPage: {url}"},
      "/es/regiones/costa/": {q1:"Planificar la Costa de Ecuador",q2:"Comparar bases costeras",q3:"Consultar temporada y condiciones",q4:"Revisar transporte y operadores",q5:"Preguntar por la Costa",t1:"Hola. Quiero planificar una ruta por la Costa de Ecuador.\n\nPágina: {url}",t2:"Hola. Quiero comparar Guayaquil, Puerto López y otras bases costeras.\n\nPágina: {url}",t3:"Hola. Quiero confirmar temporada, clima y condiciones marinas vigentes.\n\nPágina: {url}",t4:"Hola. Quiero revisar transporte y operadores costeros autorizados.\n\nPágina: {url}",t5:"Hola. Tengo una consulta sobre la Costa de Ecuador.\n\nPágina: {url}"},
      "/regions/coast/guayaquil/": {q1:"Plan a Guayaquil stay",q2:"Compare one or two nights",q3:"Choose a practical location",q4:"Arrange airport transport",q5:"Ask about Guayaquil",t1:"Hi! I want help planning a Guayaquil stay.\n\nPage: {url}",t2:"Hi! I want to compare one or two nights in Guayaquil.\n\nPage: {url}",t3:"Hi! I want help choosing a practical Guayaquil location for my arrival and route.\n\nPage: {url}",t4:"Hi! I want help arranging airport or onward transportation.\n\nPage: {url}",t5:"Hi! I have a question about Guayaquil.\n\nPage: {url}"},
      "/es/regiones/costa/guayaquil/": {q1:"Planificar Guayaquil",q2:"Comparar una o dos noches",q3:"Elegir una ubicación práctica",q4:"Organizar traslado al aeropuerto",q5:"Preguntar por Guayaquil",t1:"Hola. Quiero planificar una estadía en Guayaquil.\n\nPágina: {url}",t2:"Hola. Quiero comparar una o dos noches en Guayaquil.\n\nPágina: {url}",t3:"Hola. Quiero elegir una ubicación práctica para mi llegada y ruta.\n\nPágina: {url}",t4:"Hola. Quiero organizar transporte al aeropuerto o para continuar el viaje.\n\nPágina: {url}",t5:"Hola. Tengo una consulta sobre Guayaquil.\n\nPágina: {url}"},
      "/regions/coast/puerto-lopez/": {q1:"Plan Puerto López",q2:"Compare two or three nights",q3:"Check a marine outing",q4:"Review whale season",q5:"Ask about Puerto López",t1:"Hi! I want help planning Puerto López.\n\nPage: {url}",t2:"Hi! I want to compare two or three nights in Puerto López.\n\nPage: {url}",t3:"Hi! I want to confirm a licensed marine outing and current conditions.\n\nPage: {url}",t4:"Hi! I want to review the current whale season and responsible observation.\n\nPage: {url}",t5:"Hi! I have a question about Puerto López.\n\nPage: {url}"},
      "/es/regiones/costa/puerto-lopez/": {q1:"Planificar Puerto López",q2:"Comparar dos o tres noches",q3:"Consultar una salida marina",q4:"Revisar temporada de ballenas",q5:"Preguntar por Puerto López",t1:"Hola. Quiero planificar Puerto López.\n\nPágina: {url}",t2:"Hola. Quiero comparar dos o tres noches en Puerto López.\n\nPágina: {url}",t3:"Hola. Quiero confirmar una salida marina autorizada y condiciones vigentes.\n\nPágina: {url}",t4:"Hola. Quiero revisar la temporada vigente de ballenas y la observación responsable.\n\nPágina: {url}",t5:"Hola. Tengo una consulta sobre Puerto López.\n\nPágina: {url}"},
      "/regions/coast/montanita/": {q1:"Plan a Montañita stay",q2:"Compare two to four nights",q3:"Check a surf lesson",q4:"Choose the right hotel area",q5:"Ask about Montañita",t1:"Hi! I want help planning a Montañita stay.\n\nPage: {url}",t2:"Hi! I want to compare two to four nights in Montañita.\n\nPage: {url}",t3:"Hi! I want to confirm a surf lesson, instructor and current conditions.\n\nPage: {url}",t4:"Hi! I want help choosing the right hotel location for surf, nightlife or sleep.\n\nPage: {url}",t5:"Hi! I have a question about Montañita.\n\nPage: {url}"},
      "/es/regiones/costa/montanita/": {q1:"Planificar Montañita",q2:"Comparar de dos a cuatro noches",q3:"Consultar una clase de surf",q4:"Elegir la zona del hotel",q5:"Preguntar por Montañita",t1:"Hola. Quiero planificar una estadía en Montañita.\n\nPágina: {url}",t2:"Hola. Quiero comparar de dos a cuatro noches en Montañita.\n\nPágina: {url}",t3:"Hola. Quiero confirmar una clase de surf, instructor y condiciones vigentes.\n\nPágina: {url}",t4:"Hola. Quiero elegir la ubicación del hotel según surf, vida nocturna o descanso.\n\nPágina: {url}",t5:"Hola. Tengo una consulta sobre Montañita.\n\nPágina: {url}"},
      "/regions/coast/la-ruta-del-sol/": {q1:"Plan La Ruta del Sol",q2:"Compare three to seven days",q3:"Choose coastal bases",q4:"Review road and transport",q5:"Ask about the route",t1:"Hi! I want help planning La Ruta del Sol.\n\nPage: {url}",t2:"Hi! I want to compare a three-, five-, or seven-day Coast route.\n\nPage: {url}",t3:"Hi! I want help choosing one or two coastal bases.\n\nPage: {url}",t4:"Hi! I want to confirm current roads, vehicle, driver, and transfer times.\n\nPage: {url}",t5:"Hi! I have a question about La Ruta del Sol.\n\nPage: {url}"},
      "/es/regiones/costa/la-ruta-del-sol/": {q1:"Planificar La Ruta del Sol",q2:"Comparar de tres a siete días",q3:"Elegir bases costeras",q4:"Revisar vías y transporte",q5:"Preguntar por la ruta",t1:"Hola. Quiero planificar La Ruta del Sol.\n\nPágina: {url}",t2:"Hola. Quiero comparar una ruta costera de tres, cinco o siete días.\n\nPágina: {url}",t3:"Hola. Quiero elegir una o dos bases en la Costa.\n\nPágina: {url}",t4:"Hola. Quiero confirmar vías, vehículo, conductor y tiempos de traslado.\n\nPágina: {url}",t5:"Hola. Tengo una consulta sobre La Ruta del Sol.\n\nPágina: {url}"},
      "/regions/coast/salinas/": {q1:"Plan a Salinas stay",q2:"Compare two or three nights",q3:"Choose the right beach",q4:"Review transport and access",q5:"Ask about Salinas",t1:"Hi! I want help planning a Salinas stay.\n\nPage: {url}",t2:"Hi! I want to compare two or three nights in Salinas.\n\nPage: {url}",t3:"Hi! I want help choosing a beach and lodging location.\n\nPage: {url}",t4:"Hi! I want to review transfers, parking, accessibility, and current conditions.\n\nPage: {url}",t5:"Hi! I have a question about Salinas.\n\nPage: {url}"},
      "/es/regiones/costa/salinas/": {q1:"Planificar Salinas",q2:"Comparar dos o tres noches",q3:"Elegir la playa adecuada",q4:"Revisar transporte y acceso",q5:"Preguntar por Salinas",t1:"Hola. Quiero planificar una estadía en Salinas.\n\nPágina: {url}",t2:"Hola. Quiero comparar dos o tres noches en Salinas.\n\nPágina: {url}",t3:"Hola. Quiero elegir una playa y ubicación de alojamiento.\n\nPágina: {url}",t4:"Hola. Quiero revisar traslados, estacionamiento, accesibilidad y condiciones vigentes.\n\nPágina: {url}",t5:"Hola. Tengo una consulta sobre Salinas.\n\nPágina: {url}"},
      "/regions/amazon/": {q1:"Plan an Amazon trip",q2:"Compare Amazon gateways",q3:"Choose a lodge or reserve",q4:"Review transfers and safety",q5:"Ask about the Amazon",t1:"Hi! I want help planning an Ecuador Amazon trip.\n\nPage: {url}",t2:"Hi! I want to compare Tena, Misahuallí, Cuyabeno, and Yasuní.\n\nPage: {url}",t3:"Hi! I want help choosing a verified lodge or reserve experience.\n\nPage: {url}",t4:"Hi! I want to confirm transfers, licensed guiding, safety, and current conditions.\n\nPage: {url}",t5:"Hi! I have a question about Ecuador's Amazon.\n\nPage: {url}"},
      "/es/regiones/amazonia/": {q1:"Planificar la Amazonía",q2:"Comparar accesos amazónicos",q3:"Elegir lodge o reserva",q4:"Revisar traslados y seguridad",q5:"Preguntar por la Amazonía",t1:"Hola. Quiero planificar un viaje a la Amazonía de Ecuador.\n\nPágina: {url}",t2:"Hola. Quiero comparar Tena, Misahuallí, Cuyabeno y Yasuní.\n\nPágina: {url}",t3:"Hola. Quiero elegir un lodge verificado o una experiencia en reserva.\n\nPágina: {url}",t4:"Hola. Quiero confirmar traslados, guianza autorizada, seguridad y condiciones vigentes.\n\nPágina: {url}",t5:"Hola. Tengo una consulta sobre la Amazonía de Ecuador.\n\nPágina: {url}"}
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
    discovery: "20261003d63",
    hubs: "20261003b58g61",
    destinations: "20261003d59g61",
    experiences: "20261003cg61",
    editorial: "20261003j63",
    recommendations: "20261004r66",
    planning: "20261004p72",
    trust: "20261003b62"
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
    var expectedPath = "/assets/css/" + filename;
    var currentPath = "";
    if (current.getAttribute("href")) {
      try { currentPath = new URL(current.href, window.location.href).pathname; }
      catch (error) { currentPath = current.getAttribute("href").split("?")[0]; }
    }
    // Keep an already-correct render-blocking stylesheet in place. Reassigning
    // the same file after first paint triggers a duplicate fetch and layout shift.
    if (currentPath !== expectedPath) {
      current.href = expectedPath + "?v=" + (PAGE_CLUSTER_VERSIONS[cluster] || "20261002e");
    }
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
