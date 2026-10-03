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
      "/es/regiones/costa/montanita/": {q1:"Planificar Montañita",q2:"Comparar de dos a cuatro noches",q3:"Consultar una clase de surf",q4:"Elegir la zona del hotel",q5:"Preguntar por Montañita",t1:"Hola. Quiero planificar una estadía en Montañita.\n\nPágina: {url}",t2:"Hola. Quiero comparar de dos a cuatro noches en Montañita.\n\nPágina: {url}",t3:"Hola. Quiero confirmar una clase de surf, instructor y condiciones vigentes.\n\nPágina: {url}",t4:"Hola. Quiero elegir la ubicación del hotel según surf, vida nocturna o descanso.\n\nPágina: {url}",t5:"Hola. Tengo una consulta sobre Montañita.\n\nPágina: {url}"}
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
    destinations: "20261003d",
    experiences: "20261003c",
    editorial: "20261003j",
    recommendations: "20261003g",
    planning: "20261003i"
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
