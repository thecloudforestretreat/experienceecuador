(() => {
  const images = {
    ecuador:"/assets/images/EE-OG-Image-1.jpg",
    mindo:"/assets/images/new/ee_mindo_009.jpg",
    galapagos:"/assets/images/EE-Carousel-SantaCruzIsland-6.jpg",
    amazon:"/assets/images/new/ee_amazon_003.jpg",
    adventure:"/assets/images/EE-Carousel-Adventure-1.jpg",
    quito:"/assets/images/new/ee_quito_003.jpg",
    lodge:"/recommendations/members/andes/mindo/mindo-glambird/mindo_glambird_01.jpg"
  };

  const top = () => `<div class="mTop"><span class="mLogo"><em>●</em> Experience Ecuador</span><span class="mTopNav">Regions · Experiences · Plan · Recommendations</span><span>EN · ES</span></div>`;
  const cards = (items, two=false) => `<div class="mGrid${two?' two':''}">${items.map(x=>`<div class="mCard"><div class="mCardImg" style="--image:url('${x[2]||images.mindo}')"></div><div class="mCardCopy"><b>${x[0]}</b><span>${x[1]}</span></div></div>`).join('')}</div>`;
  const footerCta = (title, text) => `<div class="mFooterCta"><div><b>${title}</b><span>${text}</span></div><span class="mBtn">Start planning</span></div>`;

  const clusters = [
    {
      family:"Discovery", title:"Homepage & entry pages", short:"Homepage / entry", path:"/", label:"Homepage", css:"cluster-discovery.css", outcome:"Orient and route",
      purpose:"Give first-time visitors a fast mental model of Ecuador, then route them by region, experience, or planning readiness.",
      changes:["Replace equal-weight sections with a clear discovery hierarchy.","Surface regions, experiences, and trip planning within the first screen.","Use answer-led copy that explains what makes Ecuador easy to combine."],
      modules:["Split discovery hero","Region compass","Experience pathways","Planning CTA","Trust statement"],
      mock:()=>`${top()}<section class="mHero split" style="--hero:url('${images.ecuador}')"><div><span class="mKicker">Four worlds. One journey.</span><h3>Find your Ecuador</h3><p>Compare the Andes, Amazon, Coast, and Galápagos—then shape a route around wildlife, culture, adventure, and rest.</p><div class="mActions"><span class="mBtn">Build my route</span><span class="mBtn alt">Explore regions</span></div></div><div class="mHeroPhoto"></div></section><div class="mBody"><div class="mSectionHead"><h4>Choose your starting point</h4><span>Region · interest · trip style</span></div>${cards([["Andes","Culture, volcanoes and cloud forest",images.quito],["Amazon","Wildlife, rivers and rainforest",images.amazon],["Galápagos","Island wildlife and marine routes",images.galapagos]])}${footerCta("Not sure where to begin?","Answer five questions and get a clearer route.")}</div>`
    },
    {
      family:"Regional discovery", title:"Regions hub", short:"Regions hub", path:"/regions/", label:"Ecuador regions", css:"cluster-hubs.css", outcome:"Compare regions",
      purpose:"Help travelers understand the role, payoff, logistics, and ideal trip length of Ecuador’s four major regions.",
      changes:["Lead with a comparison rather than a generic card grid.","Give each region a distinct travel promise and planning facts.","Create direct bridges into destinations, experiences, and sample routes."],
      modules:["Region comparison hero","Four-region cards","Travel-time matrix","Combination routes","FAQ answers"],
      mock:()=>`${top()}<section class="mHero" style="--hero:url('${images.galapagos}')"><span class="mKicker">Ecuador regions</span><h3>Four regions, four different journeys</h3><p>See what each region does best, how long it deserves, and which combinations work without overloading your itinerary.</p><div class="mActions"><span class="mBtn">Compare regions</span></div></section><div class="mFacts">${[["Andes","3–6 days"],["Amazon","3–5 days"],["Coast","2–5 days"],["Galápagos","5–8 days"]].map(x=>`<div class="mFact"><b>${x[0]}</b><span>${x[1]}</span></div>`).join('')}</div><div class="mBody">${cards([["Andes","Cities, peaks and cloud forest",images.quito],["Amazon","Lodges, rivers and wildlife",images.amazon],["Galápagos","Island routes and endemic species",images.galapagos]])}</div>`
    },
    {
      family:"Regional discovery", title:"Region overview pages", short:"Region overview", path:"/regions/andes/", label:"Andes region", css:"cluster-hubs.css", outcome:"Plan within a region",
      purpose:"Turn a broad region into an understandable destination network with route logic, seasonal context, and strong next steps.",
      changes:["Introduce the region through route logic, not only description.","Group destinations by traveler intent and geography.","Add sample trip shapes and cross-cluster recommendations."],
      modules:["Region identity hero","Destination map/grid","Route builder","Seasonality","Related guides"],
      mock:()=>`${top()}<section class="mHero split" style="--hero:url('${images.quito}')"><div><span class="mKicker">The Andes</span><h3>Cities, volcanoes and cloud forest</h3><p>Build a highland route through Quito, Cotopaxi, Otavalo, Mindo, Baños, and Cuenca—with realistic travel times.</p><div class="mActions"><span class="mBtn">See route ideas</span></div></div><div class="mHeroPhoto"></div></section><div class="mBody"><div class="mSectionHead"><h4>Shape your Andes route</h4><span>Start with one anchor</span></div>${cards([["Quito + day trips","History with easy regional reach",images.quito],["Mindo + Chocó","Cloud forest and birding",images.mindo],["Cotopaxi + Baños","Volcanoes and adventure",images.adventure]])}</div>`
    },
    {
      family:"Destination", title:"Destination detail pages", short:"Destination detail", path:"/regions/andes/mindo/", label:"Mindo destination", css:"cluster-destinations.css", outcome:"Decide and plan",
      purpose:"Answer whether a destination fits, what to do, how long to stay, and how it connects to the rest of the trip.",
      changes:["Move the decision facts directly beneath the hero.","Create a scannable day-plan and logistics layer.","Connect activities, stays, transport, and nearby destinations contextually."],
      modules:["Destination hero","Decision facts","Things to do","Stay planner","Getting there","Nearby route"],
      mock:()=>`${top()}<section class="mHero" style="--hero:url('${images.mindo}')"><span class="mKicker">Andes · cloud forest</span><h3>Mindo</h3><p>A soft-nature escape for birding, waterfalls, chocolate, and slow stays—about two hours from Quito.</p><div class="mActions"><span class="mBtn">Plan 2 days</span><span class="mBtn alt">Find a stay</span></div></section><div class="mFacts">${[["Best for","Nature + birds"],["Ideal stay","2–3 nights"],["From Quito","~2 hours"],["Climate","Cool + misty"]].map(x=>`<div class="mFact"><b>${x[0]}</b><span>${x[1]}</span></div>`).join('')}</div><div class="mBody"><div class="mSectionHead"><h4>A balanced two-day stay</h4><span>Adjust to your pace</span></div><div class="mTimeline"><div><b>Day 1</b><span>Birding or canopy views, town lunch, chocolate, relaxed evening.</span></div><div><b>Day 2</b><span>Waterfall route, cloud forest lunch, optional night walk.</span></div></div>${footerCta("Add Mindo to your route","Connect it with Quito, Otavalo, or the Chocó Andino.")}</div>`
    },
    {
      family:"Experience", title:"Experience hubs", short:"Experience hub", path:"/experiences/", label:"Experiences", css:"cluster-experiences.css", outcome:"Choose by interest",
      purpose:"Let travelers enter the site through motivation—wildlife, culture, adventure, food, nature, or relaxation.",
      changes:["Organize interests by traveler motivation and intensity.","Show where each experience is strongest.","Bridge directly into relevant destinations and providers."],
      modules:["Interest finder","Experience cards","Region fit","Intensity guide","Related collections"],
      mock:()=>`${top()}<section class="mHero split" style="--hero:url('${images.adventure}')"><div><span class="mKicker">Travel by interest</span><h3>What do you want Ecuador to feel like?</h3><p>Start with the experiences that matter most, then see which regions deliver them best.</p><div class="mActions"><span class="mBtn">Find my fit</span></div></div><div class="mHeroPhoto"></div></section><div class="mBody">${cards([["Wildlife + birding","High-payoff nature across four regions",images.mindo],["Culture + heritage","Cities, markets and living traditions",images.quito],["Adventure","Volcanoes, rivers, canopy and coast",images.adventure],["Relaxation","Slow stays, hot springs and nature",images.lodge]],true)}</div>`
    },
    {
      family:"Experience", title:"Experience detail pages", short:"Experience detail", path:"/experiences/adventure/", label:"Adventure", css:"cluster-experiences.css", outcome:"Match activity to place",
      purpose:"Explain an experience, identify who it suits, and route visitors to the best destinations and trusted providers.",
      changes:["Lead with traveler fit, difficulty, timing, and region match.","Use a ranked destination layer instead of repeated generic cards.","Add safety, seasonality, and booking-context answers."],
      modules:["Experience hero","Fit check","Best places","Difficulty scale","Provider pathway","FAQ"],
      mock:()=>`${top()}<section class="mHero" style="--hero:url('${images.adventure}')"><span class="mKicker">Adventure travel</span><h3>Move through Ecuador</h3><p>Match volcano hikes, rafting, canyoning, canopy routes, and surf to your confidence, season, and itinerary.</p><div class="mActions"><span class="mBtn">Compare locations</span></div></section><div class="mBody"><div class="mAnswer"><b>Is Ecuador good for first-time adventure travel?</b><p>Yes. The same route can mix low-commitment scenic days with guided high-energy activities.</p></div>${cards([["Baños","Best all-around active base",images.adventure],["Cotopaxi","Altitude and volcano landscapes",images.quito],["Mindo","Canopy, waterfalls and soft adventure",images.mindo]])}</div>`
    },
    {
      family:"Editorial", title:"Travel guides & articles", short:"Travel guides", path:"/ecuador-travel-guide/", label:"Ecuador travel guide", css:"cluster-editorial.css", outcome:"Answer and educate",
      purpose:"Win informational search and AI-answer visibility while moving readers naturally toward regions, experiences, and planning actions.",
      changes:["Add a concise answer summary before long-form content.","Use a sticky or scannable table of contents.","Turn contextual internal links into planned next-step modules."],
      modules:["Answer summary","Table of contents","Editorial sections","Evidence/source notes","Next-step links"],
      mock:()=>`${top()}<section class="mHero split" style="--hero:url('${images.ecuador}')"><div><span class="mKicker">Essential guide</span><h3>Planning travel in Ecuador</h3><p>What to know about regions, timing, transport, safety, costs, and combining destinations.</p></div><div class="mHeroPhoto"></div></section><div class="mBody"><div class="mAnswer"><b>The short answer</b><p>Most first trips work best with two mainland regions in 8–12 days, or one mainland region plus Galápagos in 10–14 days.</p></div><div class="mToc"><span>Best time</span><span>How long</span><span>Costs</span><span>Transport</span><span>Safety</span><span>Routes</span></div>${cards([["When to go","Weather varies more by region than by season",images.galapagos],["How long to stay","Plan around transfers and altitude",images.quito]],true)}</div>`
    },
    {
      family:"Editorial", title:"Collections & list pages", short:"Collections", path:"/best-places-to-visit-in-ecuador/", label:"Best places", css:"cluster-editorial.css", outcome:"Evaluate options",
      purpose:"Make ranked or grouped choices useful, transparent, and internally connected instead of producing thin listicles.",
      changes:["State the selection method and traveler fit.","Give every item a reason, tradeoff, timing cue, and next step.","Use comparison and route context to strengthen usefulness."],
      modules:["Selection criteria","Ranked cards","Best-for labels","Tradeoffs","Comparison table","Route CTA"],
      mock:()=>`${top()}<section class="mHero" style="--hero:url('${images.ecuador}')"><span class="mKicker">Curated for first trips</span><h3>Best places to visit in Ecuador</h3><p>Ranked by travel payoff, route compatibility, accessibility, and how distinctly each place adds to a trip.</p></section><div class="mBody"><div class="mRank"><div class="mCard"><div class="mRankNum">01</div><div class="mCardImg" style="--image:url('${images.quito}')"></div><div class="mCardCopy"><b>Quito</b><span>Best entry point · history, food and easy day trips.</span></div></div><div class="mCard"><div class="mRankNum">02</div><div class="mCardImg" style="--image:url('${images.mindo}')"></div><div class="mCardCopy"><b>Mindo</b><span>Best easy nature escape · birds, forest and waterfalls.</span></div></div><div class="mCard"><div class="mRankNum">03</div><div class="mCardImg" style="--image:url('${images.galapagos}')"></div><div class="mCardCopy"><b>Galápagos</b><span>Best wildlife payoff · allow a dedicated island itinerary.</span></div></div></div></div>`
    },
    {
      family:"Decision", title:"Comparison pages", short:"Comparisons", path:"/ecuador-amazon-vs-galapagos/", label:"Amazon vs Galápagos", css:"cluster-editorial.css", outcome:"Resolve a choice",
      purpose:"Help visitors make a real decision with direct criteria, explicit tradeoffs, and recommendations by traveler type.",
      changes:["Put the decision recommendation above the fold.","Use one consistent comparison matrix.","End with scenario-based recommendations and combination advice."],
      modules:["Verdict hero","Decision matrix","Choose X if","Tradeoffs","Can you combine them?"],
      mock:()=>`${top()}<section class="mHero split" style="--hero:url('${images.amazon}')"><div><span class="mKicker">Trip decision</span><h3>Amazon or Galápagos?</h3><p>Choose the Amazon for immersive rainforest rhythm; choose Galápagos for open wildlife encounters and island movement.</p><div class="mActions"><span class="mBtn">See the verdict</span></div></div><div class="mHeroPhoto"></div></section><div class="mBody"><div class="mMatrix"><div class="head">Decision factor</div><div class="head">Amazon</div><div class="head">Galápagos</div><div class="head">Best fit</div><div>Wildlife style</div><div>Guided forest</div><div>Open encounters</div><div>Galápagos</div><div>Budget</div><div>Lower</div><div>Higher</div><div>Amazon</div><div>Minimum stay</div><div>3 nights</div><div>5 nights</div><div>Amazon</div><div>Ease</div><div>Lodge-based</div><div>Island logistics</div><div>Amazon</div></div>${footerCta("Still deciding?","Match the choice to your total trip length and priorities.")}</div>`
    },
    {
      family:"Recommendations", title:"Recommendation hubs & members", short:"Recommendations", path:"/recommendations/members/andes/mindo/mindo-glambird/", label:"Member profile", css:"cluster-recommendations.css", outcome:"Build trust and convert",
      purpose:"Present curated providers with transparent fit, verification signals, contextual links, and measurable partner actions.",
      changes:["Separate editorial recommendation from provider-supplied facts.","Lead with fit, location, verified details, and primary contact actions.","Connect every member back to its destination and experience clusters."],
      modules:["Verified profile hero","Image gallery","Best-for summary","Trust facts","Contact actions","Related destination"],
      mock:()=>`${top()}<div class="mBody"><div class="mProfile"><div class="mGallery">${[images.lodge,images.mindo,images.lodge].map(x=>`<i style="--image:url('${x}')"></i>`).join('')}</div><div class="mProfileCopy"><span class="mKicker">Verified recommendation · Mindo</span><h4>Mindo Glambird</h4><p>A quiet cloud-forest glamping stay for couples, birdwatchers, and travelers who want nature without sacrificing comfort.</p><div class="mTrust"><span>Location verified</span><span>Direct contact</span><span>EN + ES</span></div><div class="mActions" style="margin-top:12px"><span class="mBtn">Contact property</span><span class="mBtn alt">Visit website</span></div></div></div><div class="mAnswer"><b>Why Experience Ecuador recommends it</b><p>Strong fit for slow Mindo stays, early birding access, and travelers who value privacy over town-center convenience.</p></div>${footerCta("Plan around this stay","See Mindo activities, transfers, and nearby route options.")}</div>`
    },
    {
      family:"Planning", title:"Trip planning & builder", short:"Trip planning", path:"/trip-builder/", label:"Trip builder", css:"cluster-planning.css", outcome:"Capture qualified intent",
      purpose:"Convert inspiration into a structured itinerary request while preserving campaign attribution and reducing form friction.",
      changes:["Start with a useful planning promise, not a form wall.","Break questions into short, transparent steps.","Show what happens next and preserve attribution invisibly."],
      modules:["Planning promise","Progress stepper","Regional choices","Traveler profile","Review summary","Consent and next steps"],
      mock:()=>`${top()}<section class="mHero split" style="--hero:url('${images.ecuador}')"><div><span class="mKicker">Personal trip builder</span><h3>Shape a realistic Ecuador route</h3><p>Tell us your priorities, pace, and dates. We’ll organize the regions before discussing providers or bookings.</p></div><div class="mHeroPhoto"></div></section><div class="mBody"><div class="mStepper"><i></i><i></i><i></i><i></i><i></i></div><div class="mForm"><span class="mKicker">Step 2 of 5 · trip shape</span><h4>Which regions interest you?</h4><p style="font-size:9px;color:#66758b">Choose freely. We’ll flag combinations that need more time.</p><div class="mFields"><div class="mField">✓ Andes</div><div class="mField">Amazon</div><div class="mField">✓ Galápagos</div><div class="mField">Coast</div></div><div class="mActions" style="margin-top:12px"><span class="mBtn">Continue</span><span class="mBtn alt">Back</span></div></div></div>`
    },
    {
      family:"Trust & growth", title:"Utility, partners & affiliate pages", short:"Trust / partners", path:"/partners/", label:"Partners", css:"cluster-trust.css", outcome:"Support trust and growth",
      purpose:"Give contact, reviews, FAQs, policies, partner recruitment, and sister-brand exploration a coherent low-friction system.",
      changes:["Use compact trust-first layouts instead of destination-style heroes.","Give each utility page one dominant task and clear completion state.","Keep sister brands and partners transparent, attributable, and contextually relevant."],
      modules:["Trust header","Task card","FAQ accordion","Partner value proof","Application flow","Network disclosure"],
      mock:()=>`${top()}<section class="mHero split" style="--hero:url('${images.mindo}')"><div><span class="mKicker">Experience Ecuador network</span><h3>Grow with better regional context</h3><p>Join a curated travel network designed to connect the right visitors with credible local stays, tours, and services.</p><div class="mActions"><span class="mBtn">Review criteria</span></div></div><div class="mHeroPhoto"></div></section><div class="mBody"><div class="mSectionHead"><h4>What partners receive</h4><span>Clear value, no inflated promises</span></div>${cards([["Relevant visibility","Placement within destinations and experiences",images.quito],["Qualified referrals","Tracked actions with visitor context",images.mindo],["Bilingual reach","Shared English and Spanish coverage",images.galapagos]])}${footerCta("Is your business a fit?","Review standards before starting the application.")}</div>`
    }
  ];

  const nav=document.getElementById("clusterNav");
  const comparison=document.getElementById("comparison");
  let active=0;

  clusters.forEach((cluster,index)=>{
    const button=document.createElement("button");
    button.type="button";
    button.className="clusterButton"+(index===0?" isActive":"");
    button.innerHTML=`<b>${String(index+1).padStart(2,"0")}</b><span>${cluster.short}</span>`;
    button.addEventListener("click",()=>render(index));
    nav.appendChild(button);
  });

  function render(index){
    active=index;
    const c=clusters[index];
    [...nav.children].forEach((b,i)=>b.classList.toggle("isActive",i===index));
    document.getElementById("clusterCount").textContent=`${String(index+1).padStart(2,"0")} / ${String(clusters.length).padStart(2,"0")}`;
    document.getElementById("clusterFamily").textContent=c.family;
    document.getElementById("clusterTitle").textContent=c.title;
    document.getElementById("clusterPurpose").textContent=c.purpose;
    const link=document.getElementById("representativeLink");
    link.textContent=c.label; link.href=c.path;
    document.getElementById("cssLayer").textContent=c.css;
    document.getElementById("clusterOutcome").textContent=c.outcome;
    document.getElementById("currentPath").textContent=c.path;
    document.getElementById("mockPath").textContent=c.css.replace("cluster-","").replace(".css","")+" pattern";
    document.getElementById("currentFrame").src=c.path;
    document.getElementById("mockupViewport").innerHTML=`<div class="mPage">${c.mock()}</div>`;
    document.getElementById("changesList").innerHTML=c.changes.map(x=>`<li>${x}</li>`).join("");
    document.getElementById("moduleList").innerHTML=c.modules.map(x=>`<span>${x}</span>`).join("");
  }

  document.querySelectorAll(".viewButton").forEach(button=>button.addEventListener("click",()=>{
    document.querySelectorAll(".viewButton").forEach(b=>{b.classList.toggle("isActive",b===button);b.setAttribute("aria-pressed",b===button?"true":"false")});
    comparison.classList.toggle("isMobile",button.dataset.view==="mobile");
    comparison.classList.toggle("isDesktop",button.dataset.view==="desktop");
  }));

  render(active);
})();
