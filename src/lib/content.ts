// /src/lib/content.ts
// ============================================================
// SINGLE SOURCE OF TRUTH for all business content.
// Never hardcode business info in JSX. Always import from here.
// Service-Area Business: street address is intentionally NOT public.
// ============================================================

// Feature flags.
// SHOW_TESTIMONIALS: true = show static Google reviews from TESTIMONIALS[].
// When NEXT_PUBLIC_GOOGLE_PLACE_ID is set and Google Places API is live,
// the homepage switches to GoogleReviewsCarousel automatically.
// Do NOT set to false — real verified reviews are present.
export const FLAGS = {
  SHOW_TESTIMONIALS: true,
} as const

export const BUSINESS = {
  name: 'Beach House Moving',
  legalName: 'Beach House Moving LLC',
  tagline: 'Simply A Better Choice.',
  headline: 'Your Move, Our Mission.',
  subheadline:
    'Beach House Moving is a 4-person, owner-operated team serving Walton, Okaloosa, and Bay Counties. We handle luxury beach homes, appliance delivery, military PCS moves, and everything in between — licensed, insured, and available 24 hours a day.',
  phone: {
    display: '(850) 842-1962',
    href: 'tel:+18508421962',
    raw: '8508421962',
    e164: '+18508421962',
  },
  email: 'beachhousemoving@gmail.com',
  website: 'https://beachhousemoving.xyz',
  // Internal only — never render when displayAddress is false.
  address: {
    street: '110 Via Largo',
    city: 'Santa Rosa Beach',
    state: 'FL',
    zip: '32459',
    county: 'Walton County',
    displayAddress: false,
  },
  // Approximate geo (Santa Rosa Beach) — schema centroid only, not a public street address.
  geo: { lat: 30.39614, lng: -86.22884 },
  serviceAreaLabel: 'Serving 30A & the Emerald Coast — Walton, Okaloosa & Bay Counties',
  hours: 'Available 24/7, seven days a week',
  established: '2025',
  licenseStatement: 'Fully licensed and insured in the State of Florida.',
  registration: {
    authority: 'Florida Dept. of Agriculture & Consumer Services (FDACS)',
    number: 'IM4125',
    display: true,
  },
  fleetCount: 3,
  fleetStatement: 'A 3-vehicle fleet — two box trucks with lift gates and a Sprinter van — built for every size move on the Emerald Coast.',
  teamSize: 4,
  ownerOperator: true,
  ownerStatement: 'The owners are the movers. Our 4-person team treats every job — and every client — like family.',
  promise: 'A real person answers the phone, day or night. The owners show up on every job.',
  niches: ['luxury beach-home & new-construction', 'appliance & specialty-item delivery', 'military PCS near Eglin AFB & Hurlburt Field'],
} as const

/** Single source of truth for published rates. Referenced by /pricing UI and the Offer schema. */
export const PRICING = {
  /** Local moves — hourly rate in USD. Crew + truck, fuel included; no surcharges. */
  hourlyRate: 165,
  currency: 'USD',
} as const

/** Public license copy — SAB-safe, no street address. */
export const LICENSE_DISPLAY = {
  heroTrustBadge: `Licensed & Insured · FL Mover Reg. #${BUSINESS.registration.number}`,
  footerRegistration: `Florida Mover Reg. #${BUSINESS.registration.number}`,
  mobileCallBar: `Call ${BUSINESS.phone.display}`,
} as const

export const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/beachhousemovingfl/',
  facebookHandle: '@beachhousemovingfl',
  google: 'https://g.page/r/CXl8yvSwTlBcEAI',
  yelp: 'https://www.yelp.com/biz/beach-house-moving-santa-rosa-beach',
  bbb: 'https://www.bbb.org/us/fl/santa-rosa-beach/profile/moving-companies/beach-house-moving-llc-0683-90102540',
  leaveGoogleReviewLabel: '⭐ Leave us a Google review',
} as const

/** Resend fallbacks when env vars are unset (local dev). */
export const EMAIL = {
  quotesFrom: `quotes@${new URL(BUSINESS.website).hostname}`,
} as const

export const HERO_CONTENT = {
  eyebrow: 'Walton · Okaloosa · Bay Counties',
  locationTicker: [
    'Inlet Beach, FL',
    'Miramar Beach, FL',
    'Santa Rosa Beach, FL',
    'PCB, FL',
    'Niceville, FL',
    'Destin, FL',
    'Fort Walton Beach, FL',
  ] as const,
  socialProofTagline: 'Owner-Operated — The Owners Are the Movers',
} as const

export const SERVICE_AREAS = [
  {
    county: 'Walton County',
    slug: 'walton-county',
    featuredNeighborhoodSlugs: ['santa-rosa-beach'] as readonly string[],
    cities: ['Santa Rosa Beach', '30A', 'Miramar Beach', 'Freeport', 'DeFuniak Springs'],
    image: '/images/move-inlet-beach.jpg',
    description:
      'Walton County is home base. We run 30A end to end — Inlet Beach, Rosemary Beach, Alys Beach, Seacrest, Seagrove, WaterColor, WaterSound, Seaside, Grayton Beach, Blue Mountain Beach and Dune Allen — plus Santa Rosa Beach, Miramar Beach, Freeport and DeFuniak Springs. We know which gulf-front rentals only have boardwalk access, which gated communities hold you at the gate until your name\u2019s on the list, and which stilted driveways a box truck can\u2019t fit so we bring the Sprinter van instead. It\u2019s the kind of thing you only learn by doing it every week. From 30A home moves to full-property junk removal, we handle it all.',
    whatWeMoveIntro:
      'Beach rentals, gated communities, and full-home moves from 30A to DeFuniak Springs — we match the truck to the driveway.',
    metaTitle: 'Walton County Movers — 30A & Santa Rosa Beach | BHM',
    metaDescription:
      'Licensed local movers serving Walton County, 30A, Santa Rosa Beach, Miramar Beach, Freeport, and DeFuniak Springs. Free estimates — call (850) 842-1962.',
    faqs: [
      {
        q: 'Do gated 30A communities allow moving trucks?',
        a: 'Yes — with coordination. Communities like Rosemary Beach, WaterSound, and Alys Beach hold trucks at the gate until your name is on the list, and some restrict truck size on interior streets. We handle the gate coordination before move day and bring the Sprinter when the streets demand it.',
      },
      {
        q: 'Can you move homes with boardwalk-only access?',
        a: "Yes. Boardwalk-only and stilted properties are normal Walton County work — we plan the carry, stage where needed, and use the right vehicle for the access instead of forcing a 26-foot truck where it doesn't fit.",
      },
      {
        q: "When's the best time to schedule a 30A move?",
        a: 'Outside summer Saturdays if you can. Vacation-rental turnover owns Saturday mornings on 30A — roads, elevators, and parking all tighten up. Mid-week moves run noticeably smoother, and being available 24/7 means we can work odd hours when that helps.',
      },
      {
        q: 'Do you cover inland Walton County — Freeport and DeFuniak Springs?',
        a: 'All of it. Freeport, DeFuniak Springs, and Point Washington get the same crew and the same pricing model as the beach.',
      },
    ],
  },
  {
    county: 'Okaloosa County',
    slug: 'okaloosa-county',
    featuredNeighborhoodSlugs: ['fort-walton-beach', 'destin'] as readonly string[],
    cities: ['Destin', 'Fort Walton Beach', 'Niceville', 'Crestview', 'Shalimar', 'Eglin AFB', 'Hurlburt Field'],
    image: '/images/move-niceville.jpg',
    description:
      'In Okaloosa we cover Destin, Fort Walton Beach, Niceville, Crestview, Shalimar and the bases. We move a lot of military families in and out near Eglin AFB and Hurlburt Field, so we work around PCS timelines and short-notice report dates. From a Destin Pointe condo to a Niceville ranch house with a long stair carry, we bring the dollies, ramps and blankets to do it right.',
    whatWeMoveIntro:
      'Condos, ranch houses, and PCS moves near Eglin and Hurlburt — we bring the right equipment for stair carries and tight timelines.',
    metaTitle: 'Okaloosa County Movers — Destin & Fort Walton Beach | BHM',
    metaDescription:
      'Professional movers in Okaloosa County — Destin, Fort Walton Beach, Niceville, Crestview, and Eglin AFB. Licensed & insured. Free quote: (850) 842-1962.',
    faqs: [
      {
        q: 'Can you handle a short-notice PCS move near Eglin or Hurlburt?',
        a: "That's a regular week for us. Report dates don't negotiate, so we build the move around yours — including odd hours and weekends. Available 24/7 at (850) 842-1962.",
      },
      {
        q: 'How do Destin condo moves work?',
        a: "Most Destin and Okaloosa Island buildings run one service elevator with a reservation window, and some require a building escort. We reserve the elevator, coordinate with management, and plan the load around the window so your hours aren't burned waiting in a hallway.",
      },
      {
        q: 'Do you move families on and off base housing?',
        a: "Yes — both directions. We work with the inspection and turnover timelines base housing runs on, and we can hold your household in storage if the next address isn't ready.",
      },
      {
        q: 'Do you serve Crestview and Niceville?',
        a: 'Fully — Crestview, Niceville, Shalimar, Valparaiso, and Fort Walton Beach are all standard service area, not edge cases.',
      },
    ],
  },
  {
    county: 'Bay County',
    slug: 'bay-county',
    featuredNeighborhoodSlugs: [] as readonly string[],
    cities: ['Panama City', 'Panama City Beach', 'Lynn Haven', 'Callaway', 'Springfield'],
    image: '/images/move-pcb.jpg',
    description:
      "Bay County moving splits into two different jobs, and we do both. On the beach side, Panama City Beach is towers and elevated homes — service-elevator reservations, loading-dock windows, building escorts, and parking decks that won't clear a box truck, which is exactly when the Sprinter and a staged carry earn their keep. Front Beach Road traffic sets the clock in summer, so we schedule around it instead of sitting in it. Inland, Panama City, Lynn Haven, Callaway, and Springfield are family neighborhoods rebuilt hard since Hurricane Michael — a county full of new floors, new paint, and new stair rails that deserve runner-and-guard protection from the first box in. Liftgate trucks handle the appliances and gym equipment; the owners handle everything else, same as every county we serve.",
    whatWeMoveIntro:
      'Elevated beach homes, PCB condos, and inland houses — liftgates and stair carries are routine here.',
    metaTitle: 'Bay County Movers | Beach House Moving — Panama City & PCB',
    metaDescription:
      'Licensed movers serving Bay County — Panama City, Panama City Beach, Lynn Haven, Callaway, and Springfield. Get your free estimate: (850) 842-1962.',
    faqs: [
      {
        q: 'How do Panama City Beach high-rise moves work?',
        a: "Tower moves run on the building's rules: reserved service elevators, set loading-dock windows, and sometimes a management escort. We handle the building coordination in advance so move day is carrying, not negotiating.",
      },
      {
        q: 'When should I schedule a PCB move?',
        a: "Early in the day, and off summer Saturdays when rental turnover jams Front Beach Road and every freight elevator on the strip. We'll steer you to the window that saves you hours.",
      },
      {
        q: 'Can you move into new construction without wrecking the finishes?',
        a: 'Yes — much of Bay County is new builds since Hurricane Michael, and new floors, fresh paint, and untouched stair rails need protection from day one. Floor runners, door-frame guards, and padded rails are standard on our new-construction moves.',
      },
      {
        q: 'Do you cover Lynn Haven and Callaway?',
        a: 'Yes — Panama City, Lynn Haven, Callaway, Springfield, and Parker are all regular service area.',
      },
    ],
  },
] as const

export const SERVICES = [
  {
    slug: 'residential-moving',
    title: 'Residential Moving',
    linkLabel: 'Residential Moving Services',
    shortDescription: 'Full home moves, done with care and no drama.',
    icon: 'Home',
    featured: true,
    metaTitle: 'Residential Moving | Beach House Moving — Santa Rosa, FL',
    metaDescription:
      'Full-service residential moving on the Florida Panhandle. Packing, loading, transport, and unloading. Licensed & insured. Free estimate: (850) 842-1962.',
  },
  {
    slug: 'local-moving',
    title: 'Local Moving',
    linkLabel: 'Local Moving on 30A',
    shortDescription: 'Local crews who actually know these roads.',
    icon: 'MapPin',
    featured: true,
    metaTitle: 'Local Movers 30A & Emerald Coast | Beach House Moving',
    metaDescription:
      'Local moving crews serving 30A, Santa Rosa Beach, Destin, and the Emerald Coast. Hourly rates, no hidden fees. Call (850) 842-1962 for a free quote.',
  },
  {
    slug: 'long-distance-moving',
    title: 'Long-Distance Moving',
    linkLabel: 'Long-Distance Moving',
    shortDescription: 'Leaving the Panhandle? We\'ll get you there.',
    icon: 'Truck',
    featured: true,
    metaTitle: 'Long-Distance Moving | Beach House Moving — FL Panhandle',
    metaDescription:
      'Long-distance moving from the Florida Panhandle with licensed, insured crews. Same care as a local move. Request a free quote: (850) 842-1962.',
  },
  {
    slug: 'packing-unpacking',
    title: 'Packing & Unpacking',
    linkLabel: 'Packing & Unpacking',
    shortDescription:
      'Boxes, bubble wrap, breakables — packed right and unpacked just as carefully.',
    icon: 'Package',
    featured: true,
    metaTitle: 'Packing & Unpacking Services | Beach House Moving',
    metaDescription:
      'Professional packing and unpacking for homes on the Emerald Coast. Materials included. Licensed & insured. Free estimate: (850) 842-1962.',
  },
  {
    slug: 'storage',
    title: 'Storage Solutions',
    linkLabel: 'Storage Solutions',
    shortDescription: 'A safe place to park your stuff between moves.',
    icon: 'Warehouse',
    image: '/images/mover-storage-corridor.jpg',
    featured: false,
    metaTitle: 'Moving Storage Solutions | Beach House Moving',
    metaDescription:
      'Secure short-term and long-term storage between moves or during renovations on the Florida Panhandle. Call (850) 842-1962.',
  },
  {
    slug: 'delivery',
    title: 'Delivery Services',
    linkLabel: 'Delivery Services',
    shortDescription: 'Furniture and appliance delivery, single items included.',
    icon: 'PackageCheck',
    image: '/images/crew-gym-equipment-liftgate.jpg',
    featured: false,
    metaTitle: 'Furniture & Appliance Delivery | Beach House Moving',
    metaDescription:
      'Professional furniture and appliance delivery across Walton, Okaloosa, and Bay Counties. Single items or full loads. (850) 842-1962.',
  },
  {
    slug: 'junk-removal',
    title: 'Junk Removal',
    linkLabel: 'Junk Removal Services',
    shortDescription: 'Fast, responsible junk removal across the Emerald Coast — no haul too big or too small.',
    icon: 'Trash2',
    image: '/images/truck-loaded.jpg',
    featured: false,
    metaTitle: 'Junk Removal Services | Beach House Moving — FL Panhandle',
    metaDescription:
      'Professional junk removal across Walton, Okaloosa & Bay Counties. Furniture, appliances, debris and more. Free quote — (850) 842-1962.',
  },
  {
    slug: 'military-pcs-moving',
    title: 'Military PCS Moving',
    linkLabel: 'Military PCS Moving',
    shortDescription:
      'PCS moves built around report dates — Eglin AFB, Hurlburt Field, and every base family on the Emerald Coast.',
    icon: 'Truck',
    image: '/images/crew-team-furniture-move.jpg',
    featured: false,
    metaTitle: 'Military PCS Moving — Eglin AFB & Hurlburt | BHM',
    metaDescription:
      'PCS moves for Eglin AFB and Hurlburt Field families. Report-date scheduling, PPM documentation, storage for housing gaps. Licensed #IM4125. (850) 842-1962.',
  },
] as const

export const TRUST_BADGES = [
  {
    icon: 'ShieldCheck',
    label: 'Licensed & Insured',
    description: 'Fully licensed and insured for your complete peace of mind.',
  },
  {
    icon: 'Heart',
    label: 'Locally Owned',
    description: 'Born and raised on the Emerald Coast. This is our community too.',
  },
  {
    icon: 'DollarSign',
    label: 'Free Estimates',
    description: 'Get a clear, honest quote with no hidden fees.',
  },
  {
    icon: 'Clock',
    label: 'Available 24/7',
    description: 'We work around your schedule, seven days a week.',
  },
] as const

export const NAV_LINKS = [
  { label: 'Services', href: '/services' },
  { label: 'Service Areas', href: '/service-areas' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const

export const QUOTE_FORM_MOVE_TYPES = [
  'Residential Move',
  'Commercial / Office Move',
  'Long-Distance Move',
  'Packing & Unpacking Only',
  'Storage',
  'Delivery',
  'Junk Removal',
  'Other',
] as const

export const FAQS = [
  {
    q: 'What areas does Beach House Moving serve?',
    a: 'Beach House Moving serves Walton, Okaloosa, and Bay Counties across the Florida Panhandle. In Walton County we cover Santa Rosa Beach, all of 30A including Rosemary Beach, Alys Beach, Seaside, and Watercolor, plus Miramar Beach, Freeport, and DeFuniak Springs. In Okaloosa County we serve Destin, Fort Walton Beach, Niceville, Crestview, Shalimar, and the communities surrounding Eglin Air Force Base and Hurlburt Field. In Bay County we cover Panama City, Panama City Beach, Lynn Haven, Callaway, and Springfield. We also handle long-distance moves beyond the Panhandle — if you are relocating to another part of Florida or out of state, we can coordinate that too. Call (850) 842-1962 to confirm your area and get a free quote.',
  },
  {
    q: 'Is Beach House Moving licensed and insured?',
    a: 'Yes. Beach House Moving is fully licensed and insured in the State of Florida under Florida Mover Registration #IM4125, issued by the Florida Department of Agriculture and Consumer Services (FDACS). Florida law requires all for-hire movers to carry this registration, which verifies that we meet the state\'s standards for operating a moving company. You can verify our registration directly at the FDACS website. We also carry liability insurance and cargo coverage, so your belongings are protected from the moment we arrive until the last item is placed at your new home. When you hire Beach House Moving, you are hiring a legitimate, accountable business — not an unlicensed crew with no recourse if something goes wrong. Call (850) 842-1962 with any questions about our credentials.',
  },
  {
    q: 'How much does a move cost?',
    a: `Local moves are $${PRICING.hourlyRate}/hour — crew and truck, fuel included, no hidden fees. You pay only for the hours worked, and we give you a real number before we start, not a teaser range. Long-distance and large jobs are quoted up front. Estimates are always free — call ${BUSINESS.phone.display} and we\u2019ll walk through it.`,
  },
  {
    q: 'Do you offer packing and unpacking?',
    a: 'We do — full pack, partial pack (say, just the kitchen and the fragile stuff), or unpack-only on the other end. We bring the materials and haul the empty boxes away.',
  },
  {
    q: 'Can you store my belongings between moves?',
    a: 'Yes. We offer secure storage on flexible terms for closings that don\u2019t line up, renovations, or rental turnovers. We document what goes in and get it back when you\u2019re ready.',
  },
  {
    q: 'How quickly can you schedule my move?',
    a: `We\u2019re available 24/7, so it depends on the week — but we move fast on scheduling. Call ${BUSINESS.phone.display} and we\u2019ll find a window that works, including short-notice jobs.`,
  },
  {
    q: 'Do you move large or specialty items like appliances and TVs?',
    a: 'All the time — refrigerators, washer-dryer sets, oversized furniture, and items that have to go up two or three flights. We bring the dollies, ramps, blankets, and the crew to do it safely.',
  },
  {
    q: 'Do you handle beach-house and vacation-rental moves?',
    a: 'That\u2019s most of what we do. Third-story gulf-front rentals, boardwalk-only access, gated communities, stilted driveways — those are normal jobs for us on 30A and the coast.',
  },
  {
    q: 'Do you move military families near Eglin AFB or Hurlburt Field?',
    a: 'Yes. Beach House Moving works with military families near Eglin Air Force Base and Hurlburt Field in Okaloosa County regularly. Military PCS moves come with unique constraints — report dates that arrive with two weeks\' notice, strict move-out inspections, and sometimes a gap between leaving BAH housing and getting into the next place. We work around those timelines, including short-notice availability and flexible scheduling for the days leading up to a report date. We serve Niceville, Fort Walton Beach, Shalimar, and the surrounding communities near both bases. If you are PCS-ing out of the area to another duty station, we also handle long-distance moves beyond the Panhandle. Call (850) 842-1962 once your orders are confirmed — the sooner you lock in a move date, the better your scheduling options.',
  },
  {
    q: 'Does Beach House Moving offer junk removal?',
    a: `Yes. We offer junk removal services across Walton, Okaloosa, and Bay Counties. Whether you are clearing out before a move or hauling away after a renovation, we handle furniture, appliances, debris, and more. Call ${BUSINESS.phone.display} for a free quote.`,
  },
  {
    q: 'How much does junk removal cost?',
    a: `We provide free, honest quotes before any work begins. Cost depends on volume and item type. Call ${BUSINESS.phone.display}.`,
  },
  {
    q: 'Do you recycle or donate items?',
    a: 'Where possible, yes. We make every effort to keep usable items out of landfills.',
  },
  {
    q: 'What are your hours?',
    a: 'We are available 24 hours a day, 7 days a week — including evenings, weekends, and holidays. Real estate closings on the Emerald Coast rarely happen on a Monday morning. Lease transitions, rental turnovers, and last-minute moves happen on short notice and at odd hours. Our 24/7 availability means you can schedule a move that fits your actual timeline, not just the hours a typical moving company keeps. If you need to move on a Sunday evening before a Monday closing, we can make that happen. If you get short-notice orders and need to move fast, call us any time at (850) 842-1962. There is no extra charge just for calling after hours — availability is part of the service.',
  },
  {
    q: 'How do I get a quote?',
    a: 'Call (850) 842-1962 or fill out the quote form on this site. When you reach out, it helps to have a general sense of your move size (number of bedrooms or a rough item list), your moving-from and moving-to locations, and your target date or date range. We will follow up quickly — usually the same day — with a clear, honest estimate and no hidden fees. For larger or more complex moves we may ask a few follow-up questions to make sure the quote is accurate. There is never a charge for an estimate. Once you book, we confirm the details in writing so you know exactly what to expect on moving day. To get started, call or text (850) 842-1962 any time.',
  },
  {
    q: 'Do you charge for estimates?',
    a: 'No. Estimates are always free — no deposit, no commitment, no pressure. We give you a real number before any work begins. Call (850) 842-1962 and we will walk through your move with you.',
  },
] as const

// Image library — paths map to /public/images. Alt text is final copy.
export const IMAGES = {
  logo: {
    /** Primary circular brand mark (Facebook profile style). */
    src: '/images/circular-logo.png',
    footer: '/images/circular-logo.png',
    navbar: '/images/logo-dark.png',
    alt: 'Beach House Moving',
    footerAlt:
      'Beach House Moving — Licensed & Insured Movers on the Emerald Coast',
    width: 1024,
    height: 1024,
  },
  /** Horizontal wordmark for light backgrounds (legacy asset). */
  logoOnLight: { src: '/images/logo-dark.png', alt: 'Beach House Moving wordmark logo' },
  /** Horizontal wordmark for dark backgrounds (legacy asset). */
  logoHorizontalLight: { src: '/images/logo-dark.png', alt: 'Beach House Moving wordmark logo' },
  hero: {
    src: '/images/hero-van.jpg',
    alt: 'Beach House Moving van parked at a beachfront home on 30A, Santa Rosa Beach, Florida',
  },
  fleet: {
    src: '/images/fleet-all-trucks.jpg',
    alt: 'Beach House Moving box trucks and van at a luxury Emerald Coast estate',
  },
  boxTruck: {
    src: '/images/fleet-box-truck.jpg',
    alt: 'Beach House Moving box truck loaded for a residential move',
  },
  truckLoading: {
    src: '/images/truck-loaded.jpg',
    alt: 'Movers loading furniture into a Beach House Moving truck',
  },
  dolly: {
    src: '/images/truck-dolly.jpg',
    alt: 'Beach House Moving mover wheeling boxes on a dolly to the truck',
  },
  fridge: {
    src: '/images/team-fridge.jpg',
    alt: 'Beach House Moving crew carefully moving a refrigerator',
  },
  crewGymEquipmentLiftgate: {
    src: '/images/crew-gym-equipment-liftgate.jpg',
    alt: 'Beach House Moving crew loading gym equipment onto a truck liftgate on the Emerald Coast',
  },
  washerDryer: {
    src: '/images/team-washer-dryer.jpg',
    alt: 'Beach House Moving crew moving a washer and dryer',
  },
  dresserPack: {
    src: '/images/team-packing.jpg',
    alt: 'Furniture wrapped and protected for transport by Beach House Moving',
  },
  stairs: {
    src: '/images/team-stairs.jpg',
    alt: 'Beach House Moving crew carrying items down stairs to the truck',
  },
  cleanEntry: {
    src: '/images/clean-entry.jpg',
    alt: 'Beach House Moving protecting a home entry during a move',
  },
  collage: {
    src: '/images/collage-moves.jpg',
    alt: 'Beach House Moving packing, moving, and storage services collage',
  },
  loadedLiftgateCoastalHome: {
    src: '/images/loaded-liftgate-coastal-home.jpg',
    alt: 'Beach House Moving truck loaded for a local move at a 30A coastal home',
  },
  moverCarryEstate: {
    src: '/images/mover-carry-estate.jpg',
    alt: 'Beach House Moving mover carrying a wrapped item into a luxury beach home',
  },
  moverCarryWrappedEstate: {
    src: '/images/mover-carry-wrapped-estate.jpg',
    alt: 'Beach House Moving crew loading a long-distance move at an Emerald Coast estate',
  },
  liftgateBlanketsCoastalHome: {
    src: '/images/liftgate-blankets-coastal-home.jpg',
    alt: 'Beach House Moving moving blankets and packing materials staged at a Santa Rosa Beach move',
  },
  crewHomeGymAssembly: {
    src: '/images/crew-home-gym-assembly.jpg',
    alt: 'Beach House Moving crew assembling and placing home gym equipment after delivery',
  },
  moverStorageCorridor: {
    src: '/images/mover-storage-corridor.jpg',
    alt: 'Beach House Moving mover wheeling a flat cart through a climate-controlled storage facility',
  },
  crewBrandedAntiqueMove: {
    src: '/images/crew-branded-antique-move.jpg',
    alt: 'Beach House Moving owners moving antique furniture in a luxury Emerald Coast home',
  },
  crewTeamFurnitureMove: {
    src: '/images/crew-team-furniture-move.jpg',
    alt: 'The Beach House Moving owner-operator team handling a customer move together',
  },
  fleetTruckVan: {
    src: '/images/beach-house-moving-fleet-truck-van.jpg',
    alt: 'Beach House Moving fleet — box truck with lift gate and Sprinter van — parked at a luxury Emerald Coast property',
  },
  luxuryHomeMove: {
    src: '/images/beach-house-moving-luxury-beach-home-move.jpg',
    alt: 'Beach House Moving owner carrying a padded, shrink-wrapped piece into a luxury beach home in Santa Rosa Beach, FL',
  },
  liftgatePadded: {
    src: '/images/beach-house-moving-lift-gate-furniture-padded.jpg',
    alt: 'Padded and shrink-wrapped furniture staged on a box-truck lift gate during a Beach House Moving job on the Emerald Coast',
  },
  loadedBoxTruck: {
    src: '/images/beach-house-moving-loaded-box-truck.jpg',
    alt: 'Beach House Moving box truck loaded with padded, shrink-wrapped furniture ready for transport on the Emerald Coast',
  },
  artInstall: {
    src: '/images/beach-house-moving-art-installation.jpg',
    alt: 'Beach House Moving crew member on a ladder hanging framed artwork during a white-glove move in Santa Rosa Beach, FL',
  },
  fineArtHandling: {
    src: '/images/beach-house-moving-fine-art-handling.jpg',
    alt: 'Framed fine art and antiques being placed and installed by Beach House Moving during a white-glove move on 30A',
  },
  golfCart: {
    src: '/images/beach-house-moving-golf-cart-transport.jpg',
    alt: 'Beach House Moving crew loading a red golf cart onto a box-truck lift gate during a 30A move',
  },
  rugPlacement: {
    src: '/images/beach-house-moving-rug-placement-condo.jpg',
    alt: 'Beach House Moving crew member laying out a large area rug inside a luxury 30A condo with Gulf views',
  },
  condoStairCarry: {
    src: '/images/beach-house-moving-condo-stair-carry.jpg',
    alt: 'Beach House Moving mover Zach guiding a wrapped king mattress up a high-rise stairwell during a condo move on the Emerald Coast',
  },
  mattressStairwell: {
    src: '/images/beach-house-moving-mattress-stairwell-move.jpg',
    alt: 'Two Beach House Moving crew members carrying a shrink-wrapped king mattress up a condo stairwell on 30A',
  },
  greatRoomRug: {
    src: '/images/beach-house-moving-great-room-rug-placement.jpg',
    alt: 'Beach House Moving laying the rug in an empty new-construction great room with a vaulted shiplap ceiling on 30A',
  },
  greatRoomStaged: {
    src: '/images/beach-house-moving-great-room-staged-furniture.jpg',
    alt: 'Fully furnished new-construction great room staged by Beach House Moving with sofas, ottoman, and dining set on 30A',
  },
  newConstructionRugs: {
    src: '/images/beach-house-moving-new-construction-rug-delivery.jpg',
    alt: 'Wrapped rugs labeled by floor staged in an empty new-construction beach home on 30A by Beach House Moving',
  },
  denStaged: {
    src: '/images/beach-house-moving-furniture-placement-den.jpg',
    alt: 'A new-construction den staged by Beach House Moving with a blue sofa, striped rug, and live-edge bench on 30A',
  },
  rugCarryStairs: {
    src: '/images/beach-house-moving-rug-carry-staircase.jpg',
    alt: 'Beach House Moving crew member carrying a rolled wool rug up the stairs of a new-construction beach home on 30A',
  },
  balconyView: {
    src: '/images/beach-house-moving-beach-home-balcony-view.jpg',
    alt: 'Balcony view over a 30A beach community from a new-construction home served by Beach House Moving',
  },
  dresserPlacement: {
    src: '/images/beach-house-moving-dresser-placement-bedroom.jpg',
    alt: 'Beach House Moving crew member Les with a whitewashed coastal dresser placed and leveled in a Santa Rosa Beach bedroom',
  },
  brandedCrewPlacement: {
    src: '/images/beach-house-moving-branded-crew-furniture-placement-luxury-home.jpg',
    alt: 'Beach House Moving branded crew member placing furniture and a designer rug during a luxury home move-in',
  },
  luxuryPrimaryBedroom: {
    src: '/images/beach-house-moving-luxury-primary-bedroom-white-glove-move-in.jpg',
    alt: 'Luxury primary bedroom fully set up by Beach House Moving after a white-glove move-in on the Emerald Coast',
  },
  stagedGuestBedroom: {
    src: '/images/beach-house-moving-staged-guest-bedroom-designer-move-in.jpg',
    alt: 'Designer guest bedroom staged and set up by Beach House Moving on the Emerald Coast',
  },
  areaRugInstallWetBar: {
    src: '/images/beach-house-moving-area-rug-delivery-installation-wet-bar.jpg',
    alt: 'Beach House Moving delivering and installing a designer area rug in a new-construction home',
  },
  bedFrameAssembly: {
    src: '/images/beach-house-moving-bed-frame-assembly-service-primary-bedroom.jpg',
    alt: 'Beach House Moving assembling a bed frame during a primary-bedroom move-in',
  },
  rugCredenzaPlacement: {
    src: '/images/beach-house-moving-rug-and-credenza-placement-new-construction.jpg',
    alt: 'Beach House Moving furniture and area-rug placement in a new-construction home',
  },
  rugInstallEntry: {
    src: '/images/beach-house-moving-designer-rug-installation-new-construction-entry.jpg',
    alt: 'Beach House Moving installing a designer area rug in a new-construction entry',
  },
  rugPadDelivery: {
    src: '/images/beach-house-moving-area-rug-pad-and-delivery-luxury-home.jpg',
    alt: 'Beach House Moving laying a rug pad and delivering an area rug at a luxury home',
  },
  livingRoomSetup: {
    src: '/images/beach-house-moving-living-room-furniture-setup-luxury-home.jpg',
    alt: 'Beach House Moving setting up living-room furniture during a luxury home move-in',
  },
  applianceStagingWarehouse: {
    src: '/images/beach-house-moving-appliance-staging-box-truck-warehouse.jpg',
    alt: 'Beach House Moving box truck staged at a warehouse dock with packed inventory',
  },
  localMoveDresserUnload: {
    src: '/images/beach-house-moving-local-move-dresser-unload.jpg',
    alt: 'Beach House Moving crew unloading a dresser from the box truck on a local Emerald Coast move',
  },
  luxuryFoyerMattress: {
    src: '/images/beach-house-moving-luxury-foyer-mattress-move.jpg',
    alt: 'Beach House Moving crew carrying a mattress through a luxury Emerald Coast home foyer',
  },
  shrinkWrappedSofa: {
    src: '/images/beach-house-moving-shrink-wrapped-sofa-protection.jpg',
    alt: 'Sofa fully shrink-wrapped for protection by Beach House Moving before transport',
  },
  luxuryHomeFleet: {
    src: '/images/beach-house-moving-luxury-home-fleet-truck-and-van.jpg',
    alt: 'Beach House Moving box truck and Sprinter van staged at a luxury Florida Panhandle home',
  },
  brandedCrewBoxSpring: {
    src: '/images/beach-house-moving-branded-crew-box-spring-stairs.jpg',
    alt: 'Beach House Moving crew member carrying a box spring through a luxury home',
  },
  curvedStaircaseMattress: {
    src: '/images/beach-house-moving-curved-staircase-mattress-carry.jpg',
    alt: 'Beach House Moving crew carrying a mattress up a curved iron staircase',
  },
  crewBoxCarryNeighborhood: {
    src: '/images/beach-house-moving-crew-box-carry-neighborhood.jpg',
    alt: 'Beach House Moving crew carrying boxes on a neighborhood local move',
  },
  newConstructionChair: {
    src: '/images/beach-house-moving-new-construction-chair-delivery.jpg',
    alt: 'Beach House Moving crew delivering a protected chair to a new-construction home',
  },
} as const

/** Homepage gallery marquee — owner-operator shots lead; carousel may repeat photos used elsewhere. */
export const GALLERY_PHOTOS = [
  IMAGES.crewBrandedAntiqueMove,  // owner-operator lead
  IMAGES.crewTeamFurnitureMove,   // owner-operator lead
  IMAGES.greatRoomStaged,         // new-construction showcase
  IMAGES.luxuryHomeMove,          // owner carrying into luxury home
  IMAGES.dresserPlacement,        // Les — owner crew portrait
  IMAGES.denStaged,               // new-construction den staged
  IMAGES.artInstall,              // white-glove specialty
  IMAGES.fineArtHandling,         // white-glove specialty
  IMAGES.newConstructionRugs,     // delivery & staging
  IMAGES.rugCarryStairs,          // physical work on 30A stairs
  IMAGES.golfCart,                // unique service
  IMAGES.balconyView,             // 30A ambiance closer
  IMAGES.luxuryPrimaryBedroom,    // white-glove move-in result
  IMAGES.stagedGuestBedroom,      // designer guest bedroom
  IMAGES.areaRugInstallWetBar,    // rug delivery & install
  IMAGES.bedFrameAssembly,        // bed frame assembly service
  IMAGES.rugCredenzaPlacement,    // new-construction placement
  IMAGES.rugInstallEntry,         // entry rug install
  IMAGES.rugPadDelivery,          // rug pad & delivery
  IMAGES.livingRoomSetup,         // living-room setup
  IMAGES.localMoveDresserUnload,  // local move — dresser unload
  IMAGES.luxuryFoyerMattress,     // luxury foyer mattress carry
  IMAGES.shrinkWrappedSofa,       // shrink-wrapped sofa protection
  IMAGES.luxuryHomeFleet,         // luxury home fleet — truck & van
  IMAGES.brandedCrewBoxSpring,    // branded crew — box spring
  IMAGES.curvedStaircaseMattress, // curved staircase mattress carry
  IMAGES.crewBoxCarryNeighborhood,// neighborhood box carry
  IMAGES.newConstructionChair,    // new-construction chair delivery
] as const

export const TESTIMONIALS = [
  {
    name: 'Tammy Pierce',
    location: null,
    rating: 5,
    text: 'We have used Josh on at least 10 moves. He is absolutely the very best!! Always on time, lots of attention to detail. Would 100% recommend him if you are moving.',
    source: 'Google',
    date: '2026',
  },
  {
    name: 'Charlann Joyner',
    location: null,
    rating: 5,
    text: 'Josh & his crew are extremely professional & efficient. We recommend them to all of our clients',
    source: 'Google',
    date: '2026',
  },
  {
    name: 'A. Perkins',
    location: null,
    rating: 5,
    text: "The Beach House Moving crew is awesome! We've used their services several times and they always go above and beyond. They're reliable, trustworthy, and always my first call when I need help!",
    source: 'Google',
    date: '2026',
  },
  {
    name: 'Neinei',
    location: null,
    rating: 5,
    text: 'Respectful, careful movers, treated me with respect and did a perfect job moving my house.',
    source: 'Google',
    date: '2025',
  },
  {
    name: 'Kenzy Bludsworth',
    location: null,
    rating: 5,
    text: null,
    source: 'Google',
    date: '2025',
  },
  {
    name: 'Logan Spaziante',
    location: null,
    rating: 5,
    text: 'These guys were honest and up front about all their services and prices. Very helpful and I felt like they provided excellent work effort for the service I hired them for. I can recommend this business if you need extra help moving or with your junk removal needs.',
    source: 'Google',
    date: '2025',
  },
  {
    name: 'Rachel Grady',
    location: null,
    rating: 5,
    text: 'I had a fantastic experience with Beach House Moving! I hired them to help me move from storage to my new apartment, and the service was top-notch. Josh, Keith, Zach, and Les were incredible and surprisingly, they were twice as fast as the last moving company I used. They made what is usually a stressful day completely seamless. I highly recommend them to anyone looking for a fast and reliable team!',
    source: 'Google',
    date: '2026',
  },
  {
    name: 'Linda Vardaman',
    location: null,
    rating: 5,
    text: 'The guys always do a great job for us! So polite and efficient!! They handle our jobs with great care and professionalism. Highly recommend! Linda with Lily Pads',
    source: 'Google',
    date: '2026',
  },
  {
    name: 'K Ferdinandez',
    location: null,
    rating: 5,
    text: "Beach House Moving took all the stress of our move. We needed a professional company to load my grandmother's possessions, which consisted of various sentimental items and several valuables. I was not given much notice for the move, and this company went above and beyond to work within the deadline I was given.\n\nZach and Les very well represented the company. They were very friendly and hardworking and handled all the furniture with a delicate hand, as though it was their own. Everything was very well placed, nothing broken. It is quite difficult to find movers to trust in your family's possessions but they are guys you can trust and will certainly use for our future storage and moving needs.",
    source: 'Google',
    date: '2026',
  },
  {
    name: 'Debra Harto',
    location: null,
    rating: 5,
    text: "I highly recommend this company for your moves. They are professional, prompt, and very conscientious. I've used them twice and will definitely be using them for my future moves.",
    source: 'Google',
    date: '2026',
  },
  {
    name: 'Dede McClure',
    location: null,
    rating: 5,
    text: "There is none better. And if you're considering someone else, please consider Beach House first. Excellent service, prompt, timely, fair, and one of the nicest men you'll ever meet. Talk to Josh.",
    source: 'Google',
    date: '2026',
  },
] as const

export const REVIEWS_PAGE_META = {
  title: 'Customer Reviews | Beach House Moving — Florida Panhandle',
  description:
    `See what customers across Walton, Okaloosa & Bay Counties say about Beach House Moving. Honest, local, fully licensed movers. FL Mover Reg. #${BUSINESS.registration.number}.`,
  path: '/reviews',
  aggregateRating: {
    ratingValue: 5,
    reviewCount: 11,
    bestRating: 5,
    worstRating: 1,
  },
  googleReviewLink: 'https://g.page/r/CXl8yvSwTlBcEAI/review',
} as const

export const REVIEWS_PAGE = {
  hero: {
    eyebrow: 'What Our Customers Say',
    title: 'Trusted by Families Across the Emerald Coast',
    subtext:
      'Every review below is a verified Google review from a real customer. We are proud of every single one.',
    ratingSummary: `${REVIEWS_PAGE_META.aggregateRating.reviewCount} Reviews · ${REVIEWS_PAGE_META.aggregateRating.ratingValue}.0 Average`,
  },
  reviewsSection: {
    heading: 'Google Reviews',
    intro:
      'Beach House Moving is a 4-person, owner-operated crew licensed in Florida (Mover Reg. #IM4125) and serving Walton, Okaloosa, and Bay Counties around the clock. The owners show up on every job — not a dispatch center, not a franchise crew you have never met. Our 3-truck fleet — two box trucks with lift gates and a Sprinter van — is built for the Emerald Coast: gated 30A communities, beach condos with elevator rules, and military PCS timelines near Eglin AFB and Hurlburt Field. When neighbors leave a review, they are describing a real move with real people who answered the phone at 2 a.m. because that is how we operate.',
  },
  whyReviewsMatter: {
    heading: 'Why Reviews Matter on the Emerald Coast',
    paragraphs: [
      'On the Panhandle, your next mover is usually someone your neighbor already used. National brands spend millions on ads; local families ask around at church, at the base gate, or in a 30A Facebook group. A review from someone in Niceville or Seaside carries more weight than a generic testimonial from three states away — because the streets, the gates, and the stair carries are the same ones you are about to face.',
      'Our Google reviews mention specific jobs — a king bed through a Rosemary Beach carriage-home alley, a PCS move out of base lodging on two days\' notice, floor runners down before the first box crosses a new white-oak install. That level of detail tells you the reviewer actually moved with us, in a place you recognize, not that they clicked a star on a mass email request.',
      'When something goes wrong on a move — and occasionally it does — we respond directly. A small owner-operated team cannot hide behind a call center. We read every review, we reply when it makes sense, and we fix what we can. That transparency is part of why neighbors keep recommending us across Walton, Okaloosa, and Bay Counties.',
    ],
  },
  writtenReviewsSection: {
    heading: 'What Our Customers Say in Their Own Words',
    subtext:
      'Longer review excerpts from verified Google customers — full context the carousel may not show.',
  },
  noWrittenReview: '5-star rating — no written review',
  verifiedBadge: 'Verified Google Review',
  trustImage: {
    src: '/images/move-miramar-beach.jpg',
    alt: 'Beach House Moving Sprinter van at a Miramar Beach home on the Emerald Coast, Florida',
  },
  cta: {
    eyebrow: 'Had a Great Experience?',
    title: 'Tell Google. It Helps More Neighbors Find Us.',
    body: 'We are a small local business and every review makes a real difference. If Beach House Moving took care of you, we would be grateful if you shared it.',
    buttonLabel: 'Leave a Google Review',
    footerLine: `${BUSINESS.phone.display} · Open 24 Hours · FL Mover Reg. #${BUSINESS.registration.number}`,
  },
} as const

/** Static page metadata — used with buildMetadata(). */
export const PAGE_META = {
  home: {
    title: "Beach House Moving | Movers on Florida's Emerald Coast",
    description: 'Owner-operated, licensed & insured movers serving Santa Rosa Beach, 30A, Destin & the Emerald Coast — Walton, Okaloosa & Bay Counties. Free quote: (850) 842-1962.',
    path: '/',
  },
  services: {
    title: 'Moving Services | Beach House Moving — Santa Rosa Beach, FL',
    description:
      'Full-service movers on the Florida Panhandle — packing, residential, local & long-distance, storage & delivery. Free quote: (850) 842-1962.',
    path: '/services',
  },
  serviceAreas: {
    title: 'Service Areas | Beach House Moving — Walton, Okaloosa & Bay',
    description:
      'Licensed movers serving Walton, Okaloosa, and Bay Counties along Florida\u2019s Emerald Coast. We come to you — free estimates at (850) 842-1962.',
    path: '/service-areas',
  },
  about: {
    title: 'About Beach House Moving | Florida Panhandle Movers',
    description:
      'The owners are the movers — locally owned & fully licensed (FL Reg. #IM4125) across Walton, Okaloosa & Bay Counties. Free quote: (850) 842-1962.',
    path: '/about',
  },
  contact: {
    title: 'Contact Beach House Moving | (850) 842-1962',
    description:
      'Call, email, or message Beach House Moving for a free moving estimate. Serving Walton, Okaloosa & Bay Counties. Available 24/7.',
    path: '/contact',
  },
  getAQuote: {
    title: 'Free Moving Quote | Beach House Moving — (850) 842-1962',
    description:
      'Request a free moving quote from Beach House Moving — licensed, insured & locally owned across Walton, Okaloosa & Bay Counties. Call (850) 842-1962.',
    path: '/get-a-quote',
  },
  thankYou: {
    title: 'Thank You | Beach House Moving',
    description: 'Your quote request has been received. We\u2019ll be in touch shortly.',
    path: '/thank-you',
  },
} as const

/** Per-service "What's included" bullet lists. */
export const SERVICE_INCLUDES: Record<(typeof SERVICES)[number]['slug'], readonly string[]> = {
  'residential-moving': [
    'Furniture disassembly and reassembly',
    'Careful loading with padding and protection',
    'Transportation in our fully equipped trucks',
    'Unloading and placement in your new home',
    'Floor and doorway protection throughout',
  ],
  'local-moving': [
    'Hourly rates with no hidden fees',
    'Crews who know Emerald Coast roads and neighborhoods',
    'Same-day and short-notice availability when possible',
    'Loading, transport, and unloading included',
    'Flexible scheduling seven days a week',
  ],
  'long-distance-moving': [
    'Coordinated pickup and delivery scheduling',
    'Secure loading and transit protection',
    'Direct communication throughout your move',
    'Licensed and insured interstate-capable crews',
    'Door-to-door service from the Panhandle',
  ],
  'packing-unpacking': [
    'Professional packing materials supplied',
    'Fragile-item and specialty packing',
    'Room-by-room labeling for easy unpacking',
    'Unpacking and placement at destination',
    'Box breakdown and debris removal',
  ],
  storage: [
    'Short-term and long-term options',
    'Secure storage between closing dates',
    'Renovation and transition storage',
    'Flexible pickup and delivery scheduling',
    'Items kept safe until you are ready',
  ],
  delivery: [
    'Furniture and appliance delivery',
    'Single-item and multi-item transport',
    'Vacation-rental and staging deliveries',
    'Careful placement in your home or property',
    'Same professional standards as a full move',
  ],
  'junk-removal': [
    'Furniture, appliances, and debris haul-away',
    'Pre-move and post-renovation cleanouts',
    'Residential and rental property clearing',
    'Responsible disposal handled by our crew',
    'Same professional standards as every job we take',
  ],
  'military-pcs-moving': [
    'Report-date-first scheduling for PCS timelines',
    'On-base and off-base move experience',
    'PPM/DITY documentation on company paperwork',
    'Short-term storage for housing gaps',
    '24/7 availability for short-notice orders',
    'Floor and doorway protection for move-out inspections',
  ],
}

/** FAQ indices per service slug — subset of FAQS. */
export const SERVICE_FAQ_INDICES: Record<(typeof SERVICES)[number]['slug'], readonly number[]> = {
  'residential-moving': [0, 1, 2, 6],
  'local-moving': [0, 2, 5],
  'long-distance-moving': [0, 1, 2],
  'packing-unpacking': [1, 3, 6],
  storage: [1, 4, 5],
  delivery: [0, 6, 2],
  'junk-removal': [9, 0, 2, 10, 11],
  'military-pcs-moving': [8, 5, 4],
}

/** Counties for junk removal Service JSON-LD (SAB — no street address). */
export const JUNK_REMOVAL_AREA_SERVED = [
  'Walton County, FL',
  'Okaloosa County, FL',
  'Bay County, FL',
] as const

/** Dedicated /services/junk-removal page copy and structure. */
export const JUNK_REMOVAL_PAGE = {
  heroCtaLabel: 'Get a Free Quote',
  whatWeHaul: {
    eyebrow: 'What We Haul',
    headline: 'No haul too big or too small',
    intro:
      'An honest list of what our crew removes — from a single bulky item to a full-property cleanout.',
  },
  howItWorks: {
    eyebrow: 'How It Works',
    headline: 'Three simple steps',
    steps: [
      {
        title: 'Call for a free quote',
        description: `Tell us what you need hauled. Call ${BUSINESS.phone.display} or request a quote online — we\u2019ll give you a clear price before we start.`,
      },
      {
        title: 'We show up on time',
        description:
          'Our crew arrives when scheduled, ready to load. Same professionalism and care as every move we handle.',
      },
      {
        title: 'We haul it away',
        description:
          'We load, transport, and dispose responsibly — furniture, appliances, debris, and more off your property.',
      },
    ],
  },
  faqIndices: [9, 0, 2, 10, 11] as const,
  haulItems: [
    { icon: 'Sofa', label: 'Furniture & mattresses' },
    { icon: 'WashingMachine', label: 'Appliances (washers, dryers, refrigerators)' },
    { icon: 'Box', label: 'Moving debris & boxes' },
    { icon: 'HardHat', label: 'Renovation waste & construction debris' },
    { icon: 'Trash2', label: 'Garage & shed cleanouts' },
    { icon: 'Trash2', label: 'Single items or full-property cleanouts' },
  ],
} as const

/** Region-centered map embed — no street-address pin (SAB). */
export const MAP_EMBED = {
  src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1535152.0556600732!2d-87.45865950746075!3d29.580061863225904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2c49ab7600a457f%3A0x5c504eb0f4ca7c79!2sBeach%20House%20Moving!5e0!3m2!1sen!2sus!4v1780542136877!5m2!1sen!2sus',
  title: 'Beach House Moving service area map — Walton, Okaloosa & Bay Counties, Florida',
} as const

export const ABOUT_FAQS = [
  {
    q: 'Are the owners the actual movers?',
    a: 'Yes — the owners of Beach House Moving are the movers on every job. Beach House Moving is a 4-person, owner-operated team, not a staffing agency that sends a different crew each time. The same people who answer your call, load the truck, and carry your furniture are the owners who built this company. That means direct accountability: if something matters to you on moving day, it matters to the person whose name is on the company.',
  },
  {
    q: 'How long has Beach House Moving been in business?',
    a: 'Beach House Moving was established in 2025 and is locally owned and operated on the Florida Panhandle. We built the company around a simple belief: moving companies got worse when they scaled up and sent strangers to your home. We stayed hands-on instead — growing to a 3-truck fleet while keeping the owners on every job.',
  },
  {
    q: 'What counties does Beach House Moving serve?',
    a: 'Beach House Moving serves Walton, Okaloosa, and Bay Counties across the Florida Panhandle. In Walton County we cover 30A, Santa Rosa Beach, Miramar Beach, Freeport, and DeFuniak Springs. In Okaloosa County we serve Destin, Fort Walton Beach, Niceville, Crestview, and communities near Eglin AFB and Hurlburt Field. In Bay County we cover Panama City, Panama City Beach, Lynn Haven, Callaway, and Springfield. We also handle long-distance moves beyond the Panhandle.',
  },
  {
    q: 'Is Beach House Moving licensed and insured in Florida?',
    a: `Yes. Beach House Moving is fully licensed and insured in the State of Florida under Florida Mover Registration #${BUSINESS.registration.number}, issued by the Florida Department of Agriculture and Consumer Services. We carry liability insurance and cargo coverage so your belongings are protected from load-in to placement at your new home. You can verify our registration on the FDACS website.`,
  },
] as const

export const ABOUT_CONTENT = {
  pageTitle: 'About Beach House Moving',
  opening: {
    paragraphs: [
      'Beach House Moving is a locally owned moving company on the Florida Panhandle, built by 4 owners who are also the movers on every job. When you hire us, the people carrying your furniture are the same people who answer the phone, quote your move, and show up on moving day — not a rotating crew dispatched by a staffing agency.',
      'That owner-operated model is the core difference. National chains and franchise operations often send whoever is available that morning. We do not work that way. Your belongings pass through hands that have a direct stake in doing the job right, because our reputation and our name are on every box, every appliance, and every piece of furniture we touch.',
    ],
  },
  story: {
    headline: 'Our Story',
    paragraphs: [
      'Beach House Moving was established in 2025 on the Emerald Coast of Northwest Florida. We started with one truck and a clear standard: treat every home the way we would want ours treated, and treat what is inside it like it matters.',
      'We watched moving companies get worse as they scaled — more trucks, more volume, less personal accountability. Owners moved into offices while strangers handled the work on site. We built Beach House Moving differently. We stayed hands-on, kept the owners on the truck, and grew only as far as we could maintain that standard.',
      'Today we run a 3-truck fleet across Walton, Okaloosa, and Bay Counties. We know the stilted beach homes, the tight 30A driveways, the PCS timelines near Eglin and Hurlburt, and the delivery windows on new construction sites. We live here, we move here, and we built this company for how moves actually work on the Panhandle.',
      "Joshua B McGrew leads the crew day to day — the same name customers mention in our reviews, because he's on the truck for the jobs, not behind a desk. When you call, you're talking to an owner; when we show up, you're getting the same four people who built the company.",
    ],
  },
  whyLocalMatters: {
    headline: 'Why Local Matters',
    intro:
      'A mover who knows these counties handles your job differently than a crew seeing the coast for the first time. Here is what local experience looks like in practice.',
    points: [
      {
        county: 'Walton County',
        description:
          'Beach homes on stilts and narrow 30A neighborhoods are routine here, not exceptions. We know which Rosemary Beach and Seaside rentals only have boardwalk access, which gated communities require your name on a delivery list, and when a Sprinter van is the right call instead of a box truck on a tight driveway.',
      },
      {
        county: 'Okaloosa County',
        description:
          'Military PCS timelines near Eglin AFB and Hurlburt Field do not wait for a convenient schedule. We work around report dates, base housing inspections, and short-notice move-outs in Destin, Fort Walton Beach, and Niceville — with the dollies, ramps, and stair equipment those jobs require.',
      },
      {
        county: 'Bay County',
        description:
          'Panama City Beach and PCB are built on elevated homes and condos where liftgate access and careful stair carries are the norm. New-construction delivery windows and rental turnovers on tight timelines are common — we match the truck and crew to the access before we arrive, not after we are stuck at the gate.',
      },
    ],
  },
  fleet: {
    headline: 'Our Fleet',
    intro:
      'Three vehicles, each chosen for the kind of work we do on the Emerald Coast every week.',
    vehicles: [
      {
        name: 'Box Truck with Lift Gate (1 of 2)',
        description:
          'Our primary workhorse for full-home moves, appliance swaps, and jobs that need a liftgate for heavy items at elevated entries.',
      },
      {
        name: 'Box Truck with Lift Gate (2 of 2)',
        description:
          'The second box truck keeps us available on busy weekends and handles parallel jobs — packing, loading, and transport for larger residences across all three counties.',
      },
      {
        name: 'Sprinter Van',
        description:
          'Built for tight 30A driveways, stilted beach homes, and specialty deliveries where a full box truck cannot fit — same crew standards, scaled to the access.',
      },
    ],
  },
  credentials: {
    headline: 'Licensed, Insured, and Available When You Need Us',
    items: [
      `Florida Mover Registration #${BUSINESS.registration.number}`,
      'Fully licensed and insured in the State of Florida',
      'Open 24 hours a day, seven days a week',
      'Service area: Walton, Okaloosa, and Bay Counties',
    ],
  },
  faqSection: {
    eyebrow: 'About Us',
    headline: 'Common Questions About Beach House Moving',
    intro: 'Direct answers about who we are, where we work, and how we operate.',
  },
  licenseBadge: `Florida Mover Reg. #${BUSINESS.registration.number}`,
  cta: {
    quoteLabel: 'Get a Free Quote',
  },
} as const

export const GET_A_QUOTE_FAQS = [
  {
    q: 'How quickly will I get a response after submitting a quote?',
    a: 'Beach House Moving typically follows up within a few hours of your quote request — often the same day. We review your move details, confirm your service area, and call you back with clear next steps. If your timeline is urgent, call (850) 842-1962 directly for the fastest response.',
  },
  {
    q: 'Is there a charge for an estimate?',
    a: 'No. Estimates from Beach House Moving are always free — no deposit, no commitment, and no pressure. We give you an honest number before any work begins, whether you request a quote online or call (850) 842-1962.',
  },
  {
    q: 'What information do I need to get a quote?',
    a: 'To get an accurate quote, share your moving-from and moving-to locations, a general sense of move size (number of bedrooms or a rough item list), and your target date or date range. For specialty jobs — appliance delivery, junk removal, or military PCS moves — mention any access challenges like stairs, gates, or tight driveways. The more detail you provide, the more accurate your estimate will be.',
  },
] as const

export const GET_A_QUOTE_CONTENT = {
  eyebrow: 'Free Estimates · No Obligation',
  headline: 'Get Your Free Moving Quote',
  subheadline:
    'Tell us about your move and we\u2019ll follow up with clear, honest pricing. No hidden fees. No surprises.',
  formHeadline: 'Request a Quote Online',
  formSubheadline:
    'Fill out the form below and we\u2019ll review your details. Prefer to talk now? Call us directly — a real person answers.',
  trustSignals: [
    `Licensed & Insured · FL Mover Reg. #${BUSINESS.registration.number}`,
    'Free Estimates — Always',
    'Open 24 Hours · 7 Days a Week',
    'Serving Walton, Okaloosa & Bay Counties',
  ],
  whatHappensNext: {
    headline: 'What Happens Next',
    intro:
      'Submitting a quote request takes a few minutes. Here is what you can expect after you send it.',
    steps: [
      {
        title: 'Submit your quote request',
        description:
          'Complete the form with your move details — locations, timing, and what you need moved. The more specific you are, the faster we can give you an accurate estimate.',
      },
      {
        title: 'We review your details and follow up within a few hours',
        description:
          'A member of our owner-operated team reviews your request and calls you back — usually the same day — to confirm your area, ask any follow-up questions, and discuss your timeline.',
      },
      {
        title: 'We schedule your move and confirm everything in writing',
        description:
          'Once you are ready to book, we lock in your date, confirm crew and truck assignment, and put the details in writing so you know exactly what to expect on moving day.',
      },
    ],
  },
  phoneCta: {
    prefix: 'Prefer to talk? Call us at',
  },
  sidebarNotes: [
    'No robots. No hold music. A real person answers.',
    'Free estimates with zero obligation.',
    BUSINESS.licenseStatement,
  ],
  browseServices: {
    prefix: 'Already know what you need?',
    linkLabel: 'Browse our services',
  },
  faqSection: {
    eyebrow: 'Quote Questions',
    headline: 'Frequently Asked Questions About Getting a Quote',
    intro:
      'Straight answers about response times, pricing, and what we need from you to provide an accurate estimate.',
  },
} as const

export const CONTACT_CONTENT = {
  eyebrow: 'Get in Touch',
  headline: 'We\u2019re Here When You Need Us',
  intro:
    'Questions about your move? Need a quote? Reach out anytime — we\u2019re available 24/7 and respond quickly.',
  serviceAreaNote:
    'We serve Walton, Okaloosa, and Bay Counties along the Emerald Coast. We come to you — no storefront visits required.',
  formHeadline: 'Send Us a Message',
  formSubheadline: 'Prefer email? Fill out the form and we\u2019ll get back to you promptly.',
} as const

export const THANK_YOU_CONTENT = {
  headline: 'Your Request Is on Its Way',
  subheadline: 'Thank you for reaching out to Beach House Moving.',
  steps: [
    'We\u2019ll review your details and call you back shortly.',
    'Have questions in the meantime? Call us directly — a real person answers.',
    'When we connect, we\u2019ll walk through your move and provide a free, honest estimate.',
  ],
  ctaLabel: 'Call Us Now',
} as const

export const NOT_FOUND_CONTENT = {
  headline: 'This Page Moved Without Us',
  description:
    'The page you\u2019re looking for doesn\u2019t exist or may have been relocated. Let us help you find your way.',
  links: [
    { label: 'Back to Home', href: '/' },
    { label: 'Our Services', href: '/services' },
    { label: 'Get a Free Quote', href: '/get-a-quote' },
  ],
} as const

export const SERVICES_HUB = {
  eyebrow: 'What We Do',
  headline: 'Full-Service Moving, Start to Finish',
  intro:
    'From the first box packed to the last item placed — we handle every detail so you don\u2019t have to. Licensed, insured, and ready when you are.',
} as const

export const SERVICE_AREAS_HUB = {
  eyebrow: 'Where We Work',
  headline: 'We Come to You',
  intro:
    'Beach House Moving is a service-area business — we bring professional crews directly to your home or business across Walton, Okaloosa, and Bay Counties. No storefront. No hassle. Just reliable local movers who know the Panhandle.',
  mapHeadline: 'Our Service Region',
} as const

export type Neighborhood = {
  slug: string
  name: string
  county: string
  image: string
  intro: string
  introExtended?: string[]
  landmarks: readonly string[]
  metaTitle: string
  metaDescription: string
  localBody: string
  localFaqs: { question: string; answer: string }[]
  // ISO date (YYYY-MM-DD). Set this when a neighborhood's content changes so
  // sitemap.ts can emit an accurate <lastmod>. Falls back to the curated
  // neighborhood date in sitemap.ts when omitted.
  updatedAt?: string
}

export const NEIGHBORHOODS = [
  // ---- WALTON COUNTY ----
  {
    slug: 'santa-rosa-beach',
    name: 'Santa Rosa Beach',
    county: 'Walton County',
    image: '/images/move-srb.jpg',
    intro: 'Santa Rosa Beach is the largest community along 30A, stretching from the bayside neighborhoods north of Highway 98 down to the beachfront. The mix of full-time homes, vacation rentals, and new construction means every move here is different — and our crews know the difference between a quick north-of-98 relocation and a tight beachside job.',
    landmarks: ['30A', 'Highway 98', 'Choctawhatchee Bay', 'Gulf Place', 'Point Washington'],
    metaTitle: 'Movers in Santa Rosa Beach, FL | Beach House Moving',
    metaDescription: 'Licensed, insured movers in Santa Rosa Beach & 30A. Residential, local & long-distance moving, packing, storage. Free quote — (850) 842-1962.',
    localBody: `Santa Rosa Beach isn't one place — it's two. South of US-98 you've got the 30A side: beach cottages, gulf-front rentals, and gated lanes off Scenic 30A where access is the whole job. North of 98 it's a different world — woodland lots, Point Washington, Hammock Bay's edge, longer driveways and more room to stage a truck. We plan the move around which side you're on before we ever load a dolly. On the south side that often means a smaller truck or the Sprinter van for the tight, tree-lined lanes around Gulf Place, plus a parking plan for streets where there's nowhere to leave a box truck for six hours. North of 98 the trucks fit fine, but the hauls from house to curb run long. Either way, Santa Rosa Beach is our home base, so we're not guessing — we know which roads flood after a summer storm, which HOAs want a certificate of insurance on file before move day, and where the gate codes change with the season.`,
    localFaqs: [
      {
        question: `Do you serve both sides of US-98 in Santa Rosa Beach?`,
        answer: `Yes — the 30A/gulf side and the north-of-98 woodland neighborhoods like Point Washington and Hammock Bay's edge. They're very different moves, and we plan truck size and parking around which side you're on before move day.`,
      },
      {
        question: `Can a full-size moving truck get into the 30A neighborhoods off Scenic 30A?`,
        answer: `Sometimes, sometimes not. Many gulf-side lanes near Gulf Place are narrow and tree-lined with no long-term parking, so we'll often bring the Sprinter van and stage a shorter carry rather than block the road for hours.`,
      },
      {
        question: `Do Santa Rosa Beach HOAs require anything before a move?`,
        answer: `Several do — a certificate of insurance on file, a reserved move window, or a gate code that rotates seasonally. We're licensed and insured (FL Mover Reg. #IM4125) and handle the COI paperwork so the gate isn't a surprise on move morning.`,
      },
    ],
  },
  {
    slug: '30a',
    name: '30A',
    county: 'Walton County',
    image: '/images/beach-house-moving-beach-home-balcony-view.jpg',
    intro: 'Scenic Highway 30A links a string of distinct beach communities, each with its own gates, HOA rules, parking limits, and beach-access logistics. Moving along 30A rewards a crew that already knows the roads, the carriage-home alleys, and where the trucks can actually park — not one learning it on the day.',
    landmarks: ['Seaside', 'WaterColor', 'Rosemary Beach', 'Alys Beach', 'Grayton Beach', 'Inlet Beach'],
    metaTitle: '30A Movers | Beach House Moving — Santa Rosa Beach, FL',
    metaDescription: 'Local movers who know every 30A community — Seaside, WaterColor, Rosemary, Alys & more. Licensed & insured. Free quote — (850) 842-1962.',
    localBody: `"30A" isn't a town — it's the 24-mile scenic corridor stitching together sixteen beach neighborhoods from Dune Allen in the west to Inlet Beach in the east, and every one of them moves differently. Seaside won't let a box truck idle on its narrow streets; WaterSound and Alys Beach run guard gates with their own move-in rules; Grayton's roads are literally sand. A move "on 30A" is really a question of which community, and we've worked all of them. What they share is the bottleneck: Scenic 30A is the only road, it's two lanes, and in season it's bumper-to-bumper with beach traffic and cyclists. That sets the clock. We schedule loads for early morning when 30A is quiet, keep the truck off the corridor itself wherever a side lane allows, and use the Sprinter van for the communities where a 26-footer is a liability rather than an asset. If you're moving between 30A towns — and a lot of people here do — we already know the access quirks on both ends.`,
    localFaqs: [
      {
        question: `I'm moving between two 30A communities — is that easier than a long-distance move?`,
        answer: `Usually, but the access quirks double. Both ends might have gates, narrow lanes, or beach-access carries. We know the rules on each 30A community, so we plan one truck plan that works for both your old and new addresses.`,
      },
      {
        question: `Why do you start 30A moves so early in the morning?`,
        answer: `Scenic 30A is the only road through, it's two lanes, and in season it fills with beach traffic and cyclists by mid-morning. Early loads keep the truck moving instead of stuck — which keeps your hourly cost down.`,
      },
      {
        question: `Do you cover every neighborhood on 30A?`,
        answer: `Yes — all sixteen, Dune Allen to Inlet Beach, including the gated and golf-cart-only communities. Each has its own page on this site, but if you're not sure which one you're in, just call (850) 842-1962 and we'll sort it out.`,
      },
    ],
  },
  {
    slug: 'grayton-beach',
    name: 'Grayton Beach',
    county: 'Walton County',
    image: '/images/liftgate-blankets-coastal-home.jpg',
    intro: 'Grayton Beach is the oldest townsite on 30A, known for its sandy unpaved streets, cottage character, and proximity to Grayton Beach State Park. Those soft-sand roads and older lots make access and equipment choices matter — something we plan for before the truck arrives.',
    landmarks: ['Grayton Beach State Park', 'Western Lake', 'Red Bar', 'Hotz Avenue'],
    metaTitle: 'Grayton Beach Movers | Beach House Moving — 30A, FL',
    metaDescription: 'Movers serving Grayton Beach on 30A. We know the sandy roads and cottage lots. Licensed & insured. Free quote — (850) 842-1962.',
    localBody: `Grayton Beach is the oldest townsite on 30A, and it moves like it. The streets are sand — unpaved, soft, and unforgiving to a loaded box truck that sinks where a lighter vehicle rolls right through. That single fact drives every decision here: we scout the approach first, often stage with the Sprinter van, and keep weight off the softest stretches near Western Lake and the state park. The cottages themselves are older and smaller-doored than the new builds east of here, so oversized furniture frequently means a door-off or a careful angle through a porch rather than a straight shot. Add the weekend crowd around Red Bar and the limited parking on lanes like Hotz Avenue, and timing matters as much as muscle. We've learned Grayton the only way you can — by doing it — which is why we don't show up with the wrong truck and improvise. Coastal dune-lake humidity also means we wrap and pad early; nothing sits exposed on a Grayton porch longer than it has to.`,
    localFaqs: [
      {
        question: `Can you get a moving truck down Grayton Beach's sand roads?`,
        answer: `Carefully, and not always with a full-size truck. The unpaved sand near Western Lake and the state park can bog a loaded 26-footer, so we frequently stage with the Sprinter van and keep weight off the softest stretches.`,
      },
      {
        question: `My Grayton cottage is older with narrow doors — can you still move big furniture?`,
        answer: `Yes. Older Grayton cottages often need a door taken off its hinges or a measured angle through a porch rather than a straight carry. We bring the tools to do that and reset everything before we leave.`,
      },
      {
        question: `Is weekend traffic around Red Bar a problem for moving?`,
        answer: `It can be — parking on lanes like Hotz Avenue is tight when Grayton fills up. We schedule Grayton loads for quieter windows so the crew isn't fighting the crowd for curb space.`,
      },
    ],
  },
  {
    slug: 'blue-mountain-beach',
    name: 'Blue Mountain Beach',
    county: 'Walton County',
    image: '/images/mover-carry-wrapped-estate.jpg',
    intro: 'Blue Mountain Beach sits on the highest coastal dune elevation in Florida, meaning steep driveways and elevated homes that frequently require stairs, long carries, and careful equipment choices. We bring the ramps, dollies, and lift gates that make hillside beach moves go smoothly.',
    landmarks: ['Blue Mountain Beach Creamery', 'Redfish Lake', 'coastal dune ridge'],
    metaTitle: 'Blue Mountain Beach Movers | Beach House Moving — 30A, FL',
    metaDescription: 'Elevated homes, stairs, long carries — Blue Mountain Beach moves handled by the owners themselves. Licensed & insured. Free quote — (850) 842-1962.',
    localBody: `Blue Mountain Beach sits on the highest coastal dune in Florida, and that elevation is the move. Homes here climb the rise, which means stairs — lots of them — and gravity working against you on the way up and with you on the way down, where control matters more than speed. The lanes off 30A are short and steep, and the dune-top builds often have the living space up top to catch the gulf view, so the heaviest pieces travel the most stairs. We bring extra crew and stair-savvy equipment for Blue Mountain moves and pad the turns where a tired arm gets careless. Down near Redfish Lake and the Blue Mountain Beach Creamery the lots flatten out and the carries shorten, but the elevation change between the highway and the gulf-front homes is real, and we plan the load order around it — last on, first off for whatever lives at the top. It's a small community, so we also keep the truck footprint tight; there's rarely room to sprawl.`,
    localFaqs: [
      {
        question: `Why does Blue Mountain Beach take longer than a flat move?`,
        answer: `Elevation. Blue Mountain sits on Florida's highest coastal dune, so homes climb the rise and the main living spaces are often up top for the view. More stairs means more crew and careful pacing — we plan the load order around it.`,
      },
      {
        question: `Do you bring extra movers for stair-heavy Blue Mountain homes?`,
        answer: `Yes. Dune-top builds put the heaviest furniture at the top of the most stairs, so we staff Blue Mountain jobs to keep the carry controlled instead of rushed — that's how furniture and walls stay undamaged.`,
      },
      {
        question: `Is there room to park a truck on the lanes off 30A here?`,
        answer: `Barely, on the steeper short lanes. Blue Mountain is a small community with tight curb space, so we keep the truck footprint minimal and stage the carry rather than block a narrow road.`,
      },
    ],
  },
  {
    slug: 'seaside',
    name: 'Seaside',
    county: 'Walton County',
    image: '/images/clean-entry.jpg',
    intro: 'Seaside is the founding New Urbanist town on 30A — pastel cottages, pedestrian-first streets, and notoriously limited vehicle access and parking. A move here lives or dies on timing and coordination, which is exactly where a local owner-operator crew earns its keep.',
    landmarks: ['Seaside Amphitheater', 'Central Square', 'Ruskin Place', 'Airstream food court'],
    metaTitle: 'Seaside FL Movers | Beach House Moving — 30A',
    metaDescription: "Movers who know Seaside's narrow streets and parking limits. Owner-operated, licensed & insured. Free quote — (850) 842-1962.",
    localBody: `Seaside is the town that started New Urbanism, and it's built for pedestrians, not box trucks. The streets are narrow by design, parking is scarce and tightly managed, and you cannot simply leave a truck sitting outside a house for the day — Central Square and the cottage lanes around Ruskin Place stay busy with foot traffic and cyclists year-round. Moving here is a staging problem first and a lifting problem second. We coordinate the shortest legal approach, often shuttle from a staging point with the Sprinter van or hand carts, and schedule for the early, quiet hours before the square wakes up. The cottages are charming and compact, with porches, picket fences, and tucked-away entries that reward a crew that's done it before and punish one that hasn't. Because Seaside is a flagship vacation-rental community, turn timing can be strict too; we work around check-in/check-out windows so we're not competing with a rental changeover for the same ten feet of curb.`,
    localFaqs: [
      {
        question: `Can a moving truck park in Seaside?`,
        answer: `Not for long. Seaside is designed for pedestrians with narrow streets and tightly managed parking, so we stage nearby and shuttle in with the Sprinter van or hand carts rather than leaving a box truck on the street all day.`,
      },
      {
        question: `When is the best time to schedule a Seaside move?`,
        answer: `Early morning, before Central Square and the lanes around Ruskin Place fill with foot traffic and cyclists. A quiet street is a faster, safer move — which also keeps your hourly cost down.`,
      },
      {
        question: `Do you work around vacation-rental turnovers in Seaside?`,
        answer: `Yes. Seaside runs on rentals, so curb space and timing can be strict around check-in and check-out. We plan the move so we're not competing with a changeover for the same parking and access.`,
      },
    ],
  },
  {
    slug: 'watercolor',
    name: 'WaterColor',
    county: 'Walton County',
    image: '/images/beach-house-moving-great-room-staged-furniture.jpg',
    intro: 'WaterColor is an upscale planned community adjacent to Seaside, with the WaterColor Inn, parks on Western Lake, and a community road network with its own access points and HOA rules. Move days here go best with a crew that already knows the routine.',
    landmarks: ['WaterColor Inn', 'Cerulean Park', 'Western Lake', 'the Boathouse'],
    metaTitle: 'WaterColor FL Movers | Beach House Moving — 30A',
    metaDescription: 'Local movers serving WaterColor on 30A. Community access handled. Owner-operated & insured. Free quote — (850) 842-1962.',
    localBody: `WaterColor is master-planned and amenity-dense, which makes it one of the smoother 30A communities to move in — if you know the rules. The neighborhood wraps Western Lake and the WaterColor Inn, with planned streets, designated parking, and a community that pays attention to who's driving a truck through it. We follow the posted access points and quiet hours, and we check whether your street near Cerulean Park or the Boathouse has a service route that keeps us off the busiest pedestrian paths. Homes range from compact carriage units to large gulf-adjacent builds, so we size the truck and crew to the address rather than the zip code. WaterColor's HOA is organized, which usually means a heads-up on move-in windows and sometimes a COI request — both of which we handle in advance so nothing stalls at the entrance. The upside of a planned community is predictability; the trade-off is rules, and we'd rather know them going in than discover them with a truck full of your furniture parked in the wrong spot.`,
    localFaqs: [
      {
        question: `Does WaterColor have rules about moving trucks?`,
        answer: `Yes — as a master-planned community, WaterColor has designated access points, parking, and quiet hours, and the HOA may ask for a certificate of insurance. We confirm all of that before move day so the entrance isn't a holdup.`,
      },
      {
        question: `Is there a service route that avoids the busy paths near Cerulean Park?`,
        answer: `Usually. We check whether your WaterColor street has a designated service approach that keeps the truck off the busiest pedestrian and bike paths, which makes the carry safer and the move faster.`,
      },
      {
        question: `How do you decide truck size for a WaterColor home?`,
        answer: `By the actual home, not the neighborhood. WaterColor ranges from compact carriage units to large gulf-adjacent builds, so we match truck and crew to your specific address and access.`,
      },
    ],
  },
  {
    slug: 'watersound',
    name: 'WaterSound',
    county: 'Walton County',
    image: '/images/beach-house-moving-fine-art-handling.jpg',
    intro: 'WaterSound spans gated beachside enclaves and the growing WaterSound Origins community inland, with guard check-ins and resort-community rules at both. We coordinate gate access ahead of time so the move day itself is straightforward.',
    landmarks: ['WaterSound Beach Club', 'WaterSound Origins', 'Camp Creek', 'Lake Powell'],
    metaTitle: 'WaterSound Movers | Beach House Moving — 30A, FL',
    metaDescription: 'Gated-community movers for WaterSound Beach & Origins on 30A. Owner-operated & insured. Free quote — (850) 842-1962.',
    localBody: `WaterSound is gated, private, and particular — and that's the entire planning conversation for a move here. The WaterSound Beach Club, the Origins golf community, and the residential enclaves near Camp Creek and Lake Powell all sit behind controlled access, which means we don't roll up unannounced. We coordinate the gate, get the crew and vehicle on the approved list ahead of time, and confirm any move-in window the community enforces. Inside, the homes are high-end, the finishes are unforgiving, and the expectation is that nothing touches a wall or a floor that shouldn't — so we runner-and-pad the path before the first box moves. WaterSound's roads are well-kept and the access is orderly once you're cleared, but the clearance is the bottleneck, not the carry. We've moved families in and out of WaterSound's gates before, so we know to handle the credentials early; the worst outcome here is a loaded truck idling at a gate because nobody told security a move was happening today.`,
    localFaqs: [
      {
        question: `Can you get a moving crew through WaterSound's gate?`,
        answer: `Yes, with advance coordination. WaterSound is gated and private, so we get the crew and vehicle on the approved access list ahead of time and confirm any move-in window — we don't show up unannounced.`,
      },
      {
        question: `How do you protect high-end WaterSound finishes during a move?`,
        answer: `We runner-and-pad the entire path — floors, corners, door frames — before the first box moves. WaterSound homes have unforgiving finishes, so floor and wall protection goes down first, every time.`,
      },
      {
        question: `What's the biggest delay risk for a WaterSound move?`,
        answer: `The gate, not the lifting. The most common holdup is a crew arriving without being cleared by security, so we handle credentials early and confirm the day with the community before we load.`,
      },
    ],
  },
  {
    slug: 'seacrest-beach',
    name: 'Seacrest Beach',
    county: 'Walton County',
    image: '/images/beach-house-moving-golf-cart-transport.jpg',
    intro: 'Seacrest Beach sits on the eastern end of 30A near Alys and Rosemary Beach, known for its large lagoon pool and closely clustered rental cottages. Tight spacing and shared access make a coordinated crew the difference between a smooth move and a stressful one.',
    introExtended: [
      'Seacrest runs on the rental calendar. Saturday is turnover day, the lagoon-pool parking fills fast, and golf-cart paths thread between homes that were built close on purpose — so we stage at the property, time the move off-peak, and keep the truck out of the path of fifteen arriving renters.',
      'Sitting between Alys Beach and Rosemary, Seacrest inherits the neighborhood rules of both: floor protection expected, parking deliberate, gate-adjacent coordination handled in advance. We treat it that way by default.',
    ],
    landmarks: ['the Seacrest lagoon pool', 'Alys Beach', 'Rosemary Beach'],
    metaTitle: 'Seacrest Beach Movers | Beach House Moving — 30A, FL',
    metaDescription: 'Movers serving Seacrest Beach on 30A. Tight layouts, handled. Owner-operated & insured. Free quote — (850) 842-1962.',
    localBody: `Seacrest Beach is dense — a tight grid of rental cottages built close together around the community's famous 12,000-square-foot lagoon pool, with golf-cart paths threading between them. That density is the move. Homes share narrow lanes, driveways are short or shared, and the golf-cart culture means the paths aren't sized for a 26-foot truck. We stage carefully, often working from the nearest legal truck position and carrying in, and we time the job so we're not boxing in a neighbor or blocking a cart path during a busy rental week. Seacrest also sits right against Alys and Rosemary Beach, so move-in rules can borrow from those stricter neighbors depending on exactly where your home is. The cottages are typically multi-story to fit the lot, which puts stairs in the mix on top of the access squeeze. None of it is hard once you've done it — but it punishes a crew that treats Seacrest like an open suburban street, because it isn't one.`,
    localFaqs: [
      {
        question: `Why is parking a moving truck hard in Seacrest Beach?`,
        answer: `Density. Seacrest packs rental cottages close together around the lagoon pool with shared, short driveways and golf-cart paths that aren't truck-sized. We stage from the nearest legal spot and carry in rather than force the truck down a narrow lane.`,
      },
      {
        question: `Are Seacrest's move-in rules like Alys and Rosemary Beach?`,
        answer: `Sometimes — Seacrest sits right against both, so depending on exactly where your home is, the rules can be similar. We confirm your specific street's requirements before move day.`,
      },
      {
        question: `Do Seacrest cottages usually have stairs?`,
        answer: `Most do. The cottages are built multi-story to fit tight lots, so a Seacrest move typically combines stair carries with a tight-access approach — we staff and equip for both.`,
      },
    ],
  },
  {
    slug: 'alys-beach',
    name: 'Alys Beach',
    county: 'Walton County',
    image: '/images/beach-house-moving-art-installation.jpg',
    intro: 'Alys Beach is the all-white, Bermuda-inspired community on eastern 30A and one of the most architecturally precise neighborhoods on the coast. Protecting finished surfaces, courtyard entries, and white stucco is non-negotiable here — floor, wall, and corner protection is part of our standard setup before the first item moves.',
    landmarks: ['Caliza Pool', 'white courtyard homes', 'Fonville Press'],
    metaTitle: 'Alys Beach Movers | Beach House Moving — 30A, FL',
    metaDescription: 'White-glove-level care for Alys Beach moves. Owner-operated crew, full surface protection. Licensed & insured. Free quote — (850) 842-1962.',
    localBody: `Alys Beach is the white-walled, courtyard-home community on 30A's east end, and it is among the most exacting places we move. The Bermuda-inspired architecture means tall, enclosed courtyards, narrow pedestrian passages, and pristine white surfaces that show every scuff — so protection isn't optional, it's the job. Vehicle access is tightly controlled around Caliza Pool and the town center near Fonville Press, and the community enforces who drives in and when. We coordinate access in advance, keep the truck where it's permitted, and move through the courtyards on padded paths with extra hands so nothing brushes a wall. Furniture often has to be brought through a single controlled entry rather than a wide driveway, which changes the carry plan entirely. Alys homes are high-value and the owners expect a crew that treats the space accordingly; we do. The bottleneck here is never strength — it's discipline: slow, padded, planned, and cleared through the gate before we arrive.`,
    localFaqs: [
      {
        question: `How do you protect Alys Beach's white walls and courtyards?`,
        answer: `Obsessively. Alys's white surfaces show every mark, so we pad the courtyard passages and door frames and move with extra hands to keep furniture off the walls. Protection goes down before anything is carried.`,
      },
      {
        question: `Can moving trucks drive freely in Alys Beach?`,
        answer: `No. Vehicle access around Caliza Pool and the town center is tightly controlled, with rules on who drives in and when. We coordinate access ahead of time and keep the truck only where it's permitted.`,
      },
      {
        question: `My Alys home has a single courtyard entry — can you still move large furniture?`,
        answer: `Yes. Many Alys homes funnel everything through one controlled entry instead of a wide driveway, so we plan the carry and the piece angles around that single point — it's a routine part of moving here.`,
      },
    ],
  },
  {
    slug: 'rosemary-beach',
    name: 'Rosemary Beach',
    county: 'Walton County',
    image: '/images/beach-house-moving-lift-gate-furniture-padded.jpg',
    intro: 'Rosemary Beach anchors the eastern end of 30A with cobblestone streets, carriage homes, and Dutch West Indies architecture. The narrow alleys and rear carriage entries demand a crew that knows exactly where to stage and where a truck can physically fit — something we confirm before the day of.',
    landmarks: ['Rosemary Beach Town Center', 'cobblestone footpaths', 'Barrett Square', 'carriage homes'],
    metaTitle: 'Rosemary Beach Movers | Beach House Moving — 30A, FL',
    metaDescription: "Movers who know Rosemary Beach's cobblestone alleys and carriage homes. Owner-operated & insured. Free quote — (850) 842-1962.",
    localBody: `Rosemary Beach is cobblestone footpaths, carriage houses, and a tight European-style town center around Barrett Square — beautiful, and built to keep cars at the edges. Many homes here sit on pedestrian lanes with the living quarters above a carriage unit, which means the real furniture often travels a flight or two from a footpath the truck can't reach. We stage at the nearest vehicle access and carry in over the cobblestones with the right wheels and pads, because the wrong cart bounces a dresser apart on that surface. The carriage-house layout also means tight interior stairs and turns, so we measure and plan the awkward pieces before we commit to a path. Rosemary's town center stays active, so we schedule around the busy hours near Barrett Square and keep the staging tidy. It's a premium community with premium expectations; the crew that does well here is the one that slows down, protects the cobblestone-to-door path, and doesn't try to muscle a sofa up a carriage stair the wrong way.`,
    localFaqs: [
      {
        question: `Can a moving truck reach my home on Rosemary Beach's cobblestone lanes?`,
        answer: `Often not directly — Rosemary keeps cars at the edges, so many homes sit on pedestrian footpaths. We stage at the nearest vehicle access and carry in over the cobblestones with proper carts and padding.`,
      },
      {
        question: `My Rosemary place is a carriage house with stairs — is that a problem?`,
        answer: `It's normal here. Carriage-house layouts put the living quarters above with tight interior stairs and turns, so we measure the awkward pieces and plan the path before lifting. It's a routine Rosemary move for us.`,
      },
      {
        question: `When should I avoid scheduling a Rosemary Beach move?`,
        answer: `Peak hours around Barrett Square, when the town center is busy. We schedule for quieter windows so the crew has room to stage and carry without working around crowds.`,
      },
    ],
  },
  {
    slug: 'inlet-beach',
    name: 'Inlet Beach',
    county: 'Walton County',
    image: '/images/beach-house-moving-fleet-truck-van.jpg',
    intro: 'Inlet Beach is the easternmost community in Walton County, where 30A meets the Bay County line near the 30Avenue shops and Camp Helen State Park. It blends classic beach cottages with newer luxury builds — and we move both with the same care.',
    landmarks: ['30Avenue', 'Camp Helen State Park', 'Lake Powell', '30A eastern gateway'],
    metaTitle: 'Inlet Beach Movers | Beach House Moving — 30A, FL',
    metaDescription: 'Movers serving Inlet Beach at the east end of 30A. Cottages to new builds. Owner-operated & insured. Free quote — (850) 842-1962.',
    localBody: `Inlet Beach is 30A's easternmost community and one of its fastest-changing — new builds going up around 30Avenue and the Rosemary edge, older homes near Camp Helen State Park and Lake Powell, and a mix that makes every street a little different. The growth means construction traffic and partially built lanes in spots, so we check the current road state before move day rather than trusting last month's map. Closer to the highway and 30Avenue, access is straightforward and the trucks fit; down toward the inlet and Lake Powell, the lots get tighter and the dune access more sensitive. Inlet Beach also catches a lot of cross-county moves because it sits right on the Walton-Bay line near Phillips Inlet — folks moving between 30A and Panama City Beach often pass through here, and we handle both ends. The constant in Inlet Beach is change, so we treat each move as current: confirm the access, confirm the construction, confirm the parking, then load.`,
    localFaqs: [
      {
        question: `Is construction a problem for moves in Inlet Beach?`,
        answer: `It can be — Inlet Beach is growing fast, with new builds and partially finished lanes around 30Avenue. We check the current road and construction state before move day instead of trusting an old map.`,
      },
      {
        question: `Do you handle moves between Inlet Beach and Panama City Beach?`,
        answer: `Yes. Inlet Beach sits right on the Walton-Bay line near Phillips Inlet, so cross-county moves to and from PCB are common — we cover both ends without handing you off to anyone.`,
      },
      {
        question: `Are the older homes near Camp Helen and Lake Powell harder to move?`,
        answer: `A little. Lots get tighter and dune access is more sensitive down toward the inlet than up by the highway, so we plan a careful approach and protect the access path on those addresses.`,
      },
    ],
  },
  {
    slug: 'dune-allen',
    name: 'Dune Allen',
    county: 'Walton County',
    image: '/images/collage-moves.jpg',
    intro: 'Dune Allen is the westernmost 30A community, shaped by the rare coastal dune lakes that meet the Gulf here. Older beach homes and tight lakeside lots mean access planning is the first step of every move — we do that planning before we arrive.',
    introExtended: [
      'Dune Allen sits at the quiet west end of 30A, and the homes show it — stilted construction, steep short driveways, and narrow loops off Allen Loop Road where a full-size box truck has nowhere to turn around. This is Sprinter-and-stage territory: right vehicle to the door, box truck positioned where it actually fits.',
      'The coastal dune lakes shape the access here — some properties back to Oyster Lake with boardwalk approaches, which means a planned carry, not an improvised one. We\'ve done enough of these streets to quote them honestly.',
    ],
    landmarks: ['Oyster Lake', 'Stallworth Lake', 'coastal dune lakes', 'Ed Walline Beach Access'],
    metaTitle: 'Dune Allen Movers | Beach House Moving — West 30A, FL',
    metaDescription: 'Local movers for Dune Allen Beach on west 30A. Owner-operated & insured. Free quote — (850) 842-1962.',
    localBody: `Dune Allen is 30A's western anchor, defined by its coastal dune lakes — Oyster Lake and Stallworth Lake among them — and a quieter, more spread-out feel than the town-center communities to the east. Homes here string along Allen Loop Road and the lanes near the Ed Walline access, often with the dune lakes on one side and the gulf on the other, which makes for narrow approaches and sensitive ground. We keep heavy trucks off the softest lakeside shoulders and stage where the surface holds. The spread-out layout means longer carries from curb to door in places, so we plan crew and equipment for distance, not just weight. Dune Allen's mix of older beach houses and newer builds also means doors and stairwells vary a lot house to house — we measure rather than assume. Because it's the western end, a Dune Allen move often connects toward Miramar Beach and Sandestin, and we know that stretch of 30A and 98 well enough to time the drive around the seasonal crawl.`,
    localFaqs: [
      {
        question: `Are the coastal dune lakes a factor when moving in Dune Allen?`,
        answer: `Yes. Homes near Oyster Lake, Stallworth Lake, and Allen Loop Road sit on narrow approaches with sensitive ground, so we keep heavy trucks off soft lakeside shoulders and stage where the surface holds.`,
      },
      {
        question: `Why might a Dune Allen move take longer per item?`,
        answer: `The community is spread out, so carries from curb to door can run long compared to a dense town center. We plan crew and equipment for the distance, which keeps the move steady instead of slow.`,
      },
      {
        question: `Do you connect Dune Allen moves to Miramar Beach or Sandestin?`,
        answer: `Often. As 30A's western end, Dune Allen flows naturally toward Miramar and Sandestin, and we know that 30A-to-98 stretch well enough to time the drive around the seasonal traffic crawl.`,
      },
    ],
  },
  {
    slug: 'seagrove-beach',
    name: 'Seagrove Beach',
    county: 'Walton County',
    image: '/images/team-packing.jpg',
    intro: 'Seagrove Beach sits between Seaside and Seacrest with a classic old-Florida feel — mature canopy, original cottages, and newer homes mixed throughout. Shaded, narrow streets reward a crew that plans truck placement before backing in.',
    landmarks: ['Seagrove Plaza', 'Eastern Lake', '30A'],
    metaTitle: 'Seagrove Beach Movers | Beach House Moving — 30A, FL',
    metaDescription: 'Movers serving Seagrove Beach on 30A. Old-Florida character, owner-operator care. Licensed & insured. Free quote — (850) 842-1962.',
    localBody: `Seagrove Beach sits in the middle of 30A with a personality of its own — a tree-canopied, established neighborhood around Seagrove Plaza and Eastern Lake, less polished than its master-planned neighbors and a little more lived-in. That canopy is the first thing we plan around: low limbs and tight tree-lined lanes mean a tall box truck has to pick its approach, and sometimes the Sprinter van is the smarter tool. The homes range from original Seagrove cottages to renovated builds, so interior access varies and we measure the awkward pieces up front. Eastern Lake's edge brings the same soft-ground and narrow-lane considerations as the other dune-lake areas. Seagrove's central location is a genuine advantage — it's an easy reach from our base and connects in both directions on 30A — but the established tree cover and older street layout reward local knowledge over brute force. We've worked these canopy lanes, so we know which approaches clear and which ones will scrape a truck's roofline.`,
    localFaqs: [
      {
        question: `Do Seagrove Beach's trees affect how you move in?`,
        answer: `Yes. Seagrove's tree canopy means low limbs and tight lanes that a tall box truck has to approach carefully — and sometimes the Sprinter van clears where a 26-footer won't. We pick the approach before move day.`,
      },
      {
        question: `Are Seagrove homes harder to move than the newer 30A builds?`,
        answer: `They can be. Seagrove mixes original cottages with renovated homes, so interior doors, stairs, and turns vary house to house. We measure the awkward pieces up front instead of assuming a standard layout.`,
      },
      {
        question: `Is Seagrove's central 30A location an advantage for moving?`,
        answer: `It is. Seagrove sits mid-corridor near Seagrove Plaza and Eastern Lake, an easy reach from our Santa Rosa Beach base and a quick connection in both directions on 30A — which keeps drive time and cost down.`,
      },
    ],
  },
  {
    slug: 'miramar-beach',
    name: 'Miramar Beach',
    county: 'Walton County',
    image: '/images/move-miramar-beach.jpg',
    intro: 'Miramar Beach runs along the western end of Walton County between Destin and Sandestin — a dense mix of beachfront condos, gated communities, and large homes. High-rise condo moves with elevator reservations and lift-gate box trucks are routine work for our crew.',
    landmarks: ['Sandestin', 'Silver Sands Premium Outlets', 'Scenic Gulf Drive', 'Baytowne Wharf'],
    metaTitle: 'Miramar Beach Movers — Walton County | BHM',
    metaDescription: 'Movers for Miramar Beach condos, gated homes & Sandestin. Owner-operated, licensed & insured. Free quote — (850) 842-1962.',
    localBody: `Miramar Beach is where 30A's cottage world gives way to high-density gulf-front living — the Scenic Gulf Drive condo towers, the Sandestin resort edge, Silver Sands and the outlet corridor, and Baytowne nearby. Moving here is often a condo problem: service elevators that must be reserved, loading docks with time windows, building escorts, and parking decks that won't clear a box truck. We handle the building's rules first — book the elevator, confirm the dock window, get on the security list — because in a Miramar tower the building controls the clock, not the crew. For the single-family side off Scenic Gulf Drive, the access is friendlier but summer traffic on 98 and the Silver Sands stretch sets the timing. We've moved enough Miramar condos to know the difference between a building that runs a tight, helpful dock and one where you'll lose an hour if the reservation isn't locked in. Either way, we plan the vertical move — elevator, dock, escort — before a single box leaves the unit.`,
    localFaqs: [
      {
        question: `Do you handle condo moves in the Miramar Beach towers?`,
        answer: `Yes — that's a big part of what we do here. We reserve the service elevator, confirm the loading-dock window, and get the crew on the building's security list before move day, because the building controls the timeline.`,
      },
      {
        question: `Will a moving truck fit in a Miramar Beach condo parking deck?`,
        answer: `Often not — many decks won't clear a box truck. We confirm clearance ahead of time and bring the Sprinter van or work the loading dock instead, so we're not stuck at the entrance on move day.`,
      },
      {
        question: `When's the worst time to move in Miramar Beach?`,
        answer: `Peak summer, when US-98 and the Silver Sands outlet stretch are jammed. We time Miramar moves around the traffic so the drive between truck and building doesn't eat your hourly budget.`,
      },
    ],
  },
  {
    slug: 'sandestin',
    name: 'Sandestin',
    county: 'Walton County',
    image: '/images/beach-house-moving-condo-stair-carry.jpg',
    intro: 'Sandestin Golf and Beach Resort is a large gated resort community with guard gates, internal road rules, and a wide span between bayside and beachside neighborhoods. We handle the gate clearance and internal routing so the move day stays on track.',
    landmarks: ['Baytowne Wharf', 'Sandestin gate', 'Burnt Pine', 'Village of Baytowne'],
    metaTitle: 'Sandestin Movers | Beach House Moving — Miramar Beach, FL',
    metaDescription: 'Gated-resort movers for Sandestin. Guard-gate access and resort logistics handled. Free quote — (850) 842-1962.',
    localBody: `Sandestin is a gated golf-and-beach resort community, and the guard gate is the first and most important step of any move here. Burnt Pine, the Baytowne Wharf neighborhoods, the gulf-front and bay-front enclaves — all of it sits behind controlled access with its own rules about move vehicles, hours, and who's cleared to enter. We coordinate the gate well ahead, get the crew and truck on the approved list, and confirm any move-in window the community enforces. Inside, Sandestin runs on golf carts and pedestrian paths as much as roads, so the truck stays where it's permitted and we plan the carry from there. The homes and condos range from Baytowne lofts to large gulf-front residences, so we size the job to the specific address. The resort setting means a polished expectation — escorts, tidy staging, and protection on every finish — and a real cost to getting the gate wrong: a loaded truck turned away at security is the one delay we plan hardest to avoid.`,
    localFaqs: [
      {
        question: `How do you get a moving truck into gated Sandestin?`,
        answer: `With advance gate coordination. We get the crew and vehicle on Sandestin's approved access list ahead of time and confirm the move-in window, because an uncleared truck gets turned away at the guard gate.`,
      },
      {
        question: `Can the truck drive right up to my Sandestin home?`,
        answer: `Not always — Sandestin runs heavily on golf-cart and pedestrian paths, so the truck stays where it's permitted and we plan the carry from the nearest approved position. We confirm your home's access before move day.`,
      },
      {
        question: `Do you move both Baytowne condos and the larger Sandestin residences?`,
        answer: `Yes. Sandestin ranges from Baytowne Wharf lofts to large gulf-front and bay-front homes, so we size truck and crew to your specific address rather than treating the whole resort the same.`,
      },
    ],
  },
  {
    slug: 'freeport',
    name: 'Freeport',
    county: 'Walton County',
    image: '/images/truck-loaded.jpg',
    intro: 'Freeport sits at the north end of Walton County on Choctawhatchee Bay and is one of the fastest-growing residential areas on the Panhandle. New-construction move-ins with fresh hardwood and tile floors to protect are common here — and protecting them is standard with us, not optional.',
    landmarks: ['Choctawhatchee Bay', 'Hammock Bay', 'Highway 20', 'new-construction subdivisions'],
    metaTitle: 'Freeport FL Movers — North Walton County | BHM',
    metaDescription: 'Movers serving Freeport & Hammock Bay. New-construction move-ins, floor protection standard. Free quote — (850) 842-1962.',
    localBody: `Freeport is the inland counterpart to the 30A beach towns — a fast-growing community on the north side of Choctawhatchee Bay, anchored by the Hammock Bay master-planned development and the Highway 20 corridor. Moving here is, frankly, easier than the beach: lots are larger, driveways are real, and a full-size truck fits where it would never fit in Grayton or Seaside. That said, Freeport's growth means new subdivisions with fresh, easily-scuffed finishes and HOAs that increasingly ask for a certificate of insurance, so we treat new-construction moves with floor and wall protection from the first box. Hammock Bay has its own community access and move guidelines worth confirming in advance. The Highway 20 stretch into Freeport carries commuter and construction traffic, so we time longer hauls around it. Because Freeport sits between 30A and DeFuniak/Niceville, it's a common origin or destination for cross-area moves, and we cover the whole route. For a lot of Freeport families, the move is straightforward — and we'd rather it stay that way by planning the easy job well instead of taking it for granted.`,
    localFaqs: [
      {
        question: `Are moves in Freeport easier than the 30A beach towns?`,
        answer: `Generally yes — Freeport's larger lots and real driveways fit a full-size truck that would never work in Grayton or Seaside. The bigger thing to plan for is new-construction finishes and HOA insurance requirements.`,
      },
      {
        question: `Does Hammock Bay have its own move-in rules?`,
        answer: `As a master-planned community, Hammock Bay can have community access and move guidelines, so we confirm them in advance. It keeps the entrance from being a holdup on move morning.`,
      },
      {
        question: `Do you move between Freeport and the beach or other counties?`,
        answer: `Yes. Freeport sits between 30A, DeFuniak Springs, and Niceville, so it's a common start or end point for cross-area moves — we cover the full route without subcontracting any leg of it.`,
      },
    ],
  },
  {
    slug: 'defuniak-springs',
    name: 'DeFuniak Springs',
    county: 'Walton County',
    image: '/images/beach-house-moving-loaded-box-truck.jpg',
    intro: 'DeFuniak Springs is the Walton County seat — an inland historic town built around one of the few near-perfectly round natural lakes in the world. Historic homes here often have narrow staircases and tight rooms that reward experienced hands and careful planning.',
    landmarks: ['Lake DeFuniak', 'Chautauqua district', 'historic downtown', 'Interstate 10'],
    metaTitle: 'DeFuniak Springs Movers — Walton County | BHM',
    metaDescription: 'Movers serving DeFuniak Springs & inland Walton County. Historic homes, handled with care. Free quote — (850) 842-1962.',
    localBody: `DeFuniak Springs is the historic heart of Walton County, built around one of the few near-perfectly round natural lakes in the world and the old Chautauqua district, with a downtown of late-1800s and early-1900s homes. That history is the move: the historic district's older houses come with narrow doorways, steep original staircases, plaster walls, and porches that weren't designed for a modern sectional. We move slowly and measure carefully in those homes, and we protect the older surfaces that don't forgive a bump. Out from the historic core, DeFuniak spreads into newer subdivisions and rural lots off I-10 where access is open and trucks fit easily. The I-10 interchange makes DeFuniak a natural hub for longer moves — north-south and east-west traffic both pass through — and we use that to our advantage on cross-county jobs. It's the farthest-inland community we serve regularly, so we plan the drive time honestly and bring the right crew for whichever DeFuniak you're moving in: the careful historic carry, or the easy open-lot suburban one.`,
    localFaqs: [
      {
        question: `Can you move furniture in DeFuniak Springs' historic district homes?`,
        answer: `Yes, carefully. The historic district's older homes have narrow doorways, steep original stairs, and plaster walls that don't forgive a bump, so we measure, move slowly, and protect those surfaces. It's a different pace than a new build.`,
      },
      {
        question: `Is DeFuniak Springs too far inland for Beach House Moving?`,
        answer: `No — it's the farthest-inland community we serve regularly, and the I-10 interchange makes it an easy hub to reach. We plan the drive time honestly upfront so there are no surprises.`,
      },
      {
        question: `Are the newer DeFuniak subdivisions easier to move in?`,
        answer: `Much easier. Outside the historic core, DeFuniak spreads into newer subdivisions and rural lots off I-10 with open access and room for a full-size truck — a straightforward move compared to the downtown historic homes.`,
      },
    ],
  },
  // ---- OKALOOSA COUNTY ----
  {
    slug: 'destin',
    name: 'Destin',
    county: 'Okaloosa County',
    image: '/images/beach-house-moving-mattress-stairwell-move.jpg',
    intro: 'Destin packs harborfront condos, gated golf communities, and beachfront towers into one of the most active real-estate markets on the coast. Elevator reservations, harbor-area traffic windows, and high-rise logistics are part of the plan on every Destin job.',
    introExtended: [
      'Destin moves come in three flavors, and they\'re priced and planned differently. Harbor-district and Holiday Isle condos mean building rules: one service elevator on a reservation window, sometimes a management escort, and loading zones that disappear by mid-morning — we book the elevator and stage the load around it. Crystal Beach and the older cottage streets are tighter access and shorter carries, where the Sprinter often beats a box truck to the door.',
      'Then there are the gated communities — Kelly Plantation, Regatta Bay, Destiny — where the gate wants your mover\'s name in advance and the HOA has opinions about where a truck parks. We handle that coordination before move day. One more local truth: Highway 98 and the Marler Bridge set the schedule in summer. We plan Destin moves early or late on purpose, because an hour saved in traffic is an hour off your clock.',
    ],
    landmarks: ['Destin Harbor', 'HarborWalk Village', 'Crab Island', 'Kelly Plantation', 'Regatta Bay'],
    metaTitle: 'Destin FL Movers | Beach House Moving — Okaloosa County',
    metaDescription: 'Movers for Destin condos, gated communities & beachfront homes. Owner-operated, licensed & insured. Free quote — (850) 842-1962.',
    localBody: `Destin packs more move-types into one city than anywhere else we serve. There's the Harbor and Holiday Isle high-rise condos with their service elevators, dock windows, and building escorts; the gated golf communities like Kelly Plantation with guard-gate clearances; the older mainland neighborhoods with normal driveways; and the relentless seasonal traffic over the Marler Bridge that sets the clock on all of it. We plan a Destin move around which Destin you're in. A Holiday Isle condo is a vertical, building-controlled job — reserve the elevator, confirm the dock, get on the list. Kelly Plantation is a gate-and-clearance job. The mainland is a parking-and-timing job, because US-98 through Destin in season can turn a ten-minute hop into forty. We also move a steady stream of military families through Destin near the Eglin footprint, so PCS timing and short-notice report dates are familiar territory. The throughline is traffic and access: in Destin, the lifting is rarely the hard part — getting the truck to the door at the right time is.`,
    localFaqs: [
      {
        question: `Do you move Destin Harbor and Holiday Isle high-rise condos?`,
        answer: `Yes. Those are vertical, building-controlled moves — we reserve the service elevator, confirm the loading-dock window, and get the crew on the building's list before move day, because the building sets the timeline.`,
      },
      {
        question: `Can you get into gated Destin communities like Kelly Plantation?`,
        answer: `Yes, with advance coordination. Gated golf communities require crew and vehicle clearance at the guard gate, so we handle the access list ahead of time rather than getting turned away on move morning.`,
      },
      {
        question: `How does Destin traffic affect my move?`,
        answer: `A lot. US-98 and the Marler Bridge jam in season, turning short hops long, so we time Destin moves around the traffic and start early. It keeps the drive between truck and door from eating your hourly cost.`,
      },
    ],
  },
  {
    slug: 'fort-walton-beach',
    name: 'Fort Walton Beach',
    county: 'Okaloosa County',
    image: '/images/truck-dolly.jpg',
    intro: "Fort Walton Beach is the largest city in Okaloosa County and home to many military families connected to nearby Eglin AFB and Hurlburt Field. We understand PCS timelines, base housing requirements, and the pressure of a military move — and we treat every one of them with the same urgency we'd want for our own family.",
    landmarks: ['Eglin AFB', 'Hurlburt Field', 'Okaloosa Island', 'Brooks Bridge'],
    metaTitle: 'Fort Walton Beach Movers — Okaloosa County | BHM',
    metaDescription: 'Movers for Fort Walton Beach & military families near Eglin/Hurlburt. PCS moves welcome. Free quote — (850) 842-1962.',
    localBody: `Fort Walton Beach is a military town first and a beach town second, and both shape how we move here. Eglin AFB and nearby Hurlburt Field mean a steady flow of PCS moves, so we work around report dates, short-notice orders, and the reality that a service member doesn't always control the timeline. Across the Brooks Bridge on Okaloosa Island the homes turn coastal — condos and gulf-front rentals with the same access and parking considerations as the rest of the Emerald Coast. On the mainland, Fort Walton's older established neighborhoods have mature trees, tighter mid-century lots, and the occasional narrow driveway that a 26-foot truck has to think about. We size the truck to the street and time longer hauls around the Brooks Bridge and US-98 congestion that builds through town. Being a base community, we keep our credentials in order and our scheduling flexible, because a Fort Walton move often has to flex with the military calendar — and we'd rather build that flexibility in than promise a date the orders won't honor.`,
    localFaqs: [
      {
        question: `Do you handle military PCS moves in Fort Walton Beach?`,
        answer: `Yes — with Eglin AFB and Hurlburt Field right here, PCS moves are routine for us. We work around report dates and short-notice orders, because we know a service member doesn't always control the timeline.`,
      },
      {
        question: `Are Okaloosa Island moves different from mainland Fort Walton?`,
        answer: `Yes. Across the Brooks Bridge, Okaloosa Island is coastal — condos and gulf-front rentals with beach-style access and parking. Mainland Fort Walton has older neighborhoods with mature trees and tighter mid-century lots. We plan each differently.`,
      },
      {
        question: `Can a full-size truck handle Fort Walton's older neighborhoods?`,
        answer: `Usually, but not always — some established streets have mature trees and narrow driveways. We size the truck to your actual street and bring the Sprinter van where a 26-footer would be a liability.`,
      },
    ],
  },
  {
    slug: 'niceville',
    name: 'Niceville',
    county: 'Okaloosa County',
    image: '/images/move-niceville.jpg',
    intro: 'Niceville sits on Boggy Bayou near Eglin AFB, with established neighborhoods and the master-planned Bluewater Bay community. Family homes and military relocations are the backbone of the work here, and we bring the same care to a 2-bedroom condo as we do to a full estate.',
    landmarks: ['Bluewater Bay', 'Boggy Bayou', 'Eglin AFB', 'Rocky Bayou', 'Northwest Florida State College'],
    metaTitle: 'Niceville FL Movers | Beach House Moving — Okaloosa County',
    metaDescription: 'Movers serving Niceville & Bluewater Bay. Family and PCS moves. Owner-operated & insured. Free quote — (850) 842-1962.',
    localBody: `Niceville is a family town anchored by Eglin commuters, Northwest Florida State College, and the bayous — Boggy Bayou and Rocky Bayou — that wind through it, with the master-planned Bluewater Bay community on its edge. Moving here is mostly the friendly kind: established residential streets, real driveways, and homes built for families rather than vacation turnover. That makes Niceville one of the smoother Okaloosa moves, but two things shape it. First, the Eglin connection means military and defense-contractor families move through regularly, so PCS and relocation timing is common and we plan for it. Second, the bayou-front and Rocky Bayou-area homes can have sloped lots, dock-side access, and longer carries from the street down to a waterside house. We plan crew and equipment for those grades. Bluewater Bay has its own community feel and occasional move guidelines worth confirming. For most of Niceville, though, the move is straightforward family work done right — and because it's close to our base and easy to reach, the drive time stays low and the quote stays honest.`,
    localFaqs: [
      {
        question: `Is Niceville an easy place to move?`,
        answer: `Mostly — Niceville has established family neighborhoods with real driveways and room for a full-size truck. The exceptions are sloped bayou-front lots near Boggy and Rocky Bayou, where we plan for longer, graded carries.`,
      },
      {
        question: `Do you move military and Eglin-connected families in Niceville?`,
        answer: `Often. Niceville is full of Eglin commuters and defense families, so relocation and PCS timing is routine for us — we plan around report dates and short-notice orders just like we do in Fort Walton.`,
      },
      {
        question: `Does Bluewater Bay have special move rules?`,
        answer: `As a master-planned community on Niceville's edge, Bluewater Bay can have its own move guidelines, so we confirm them in advance. For most of Niceville proper, access is open and straightforward.`,
      },
    ],
  },
  {
    slug: 'crestview',
    name: 'Crestview',
    county: 'Okaloosa County',
    image: '/images/fleet-box-truck.jpg',
    intro: 'Crestview is the inland Okaloosa County seat — the "Hub City" at the crossroads of I-10 and Highway 85 — and a common destination for Eglin-connected families and Panhandle transplants. We handle the longer inland routing without padding the clock.',
    landmarks: ['Interstate 10', 'Highway 85', 'downtown Crestview'],
    metaTitle: 'Crestview FL Movers | Beach House Moving — Okaloosa County',
    metaDescription: 'Movers serving Crestview & inland Okaloosa County. Honest, efficient, owner-operated. Free quote — (850) 842-1962.',
    localBody: `Crestview earned its nickname "Hub City" honestly — it sits at the crossroads of I-10 and State Road 85, the inland gateway to the whole Okaloosa area and the north gate route to Eglin. That location defines the moves we do here: a lot of Crestview jobs are longer-distance or cross-county, with families relocating to or from the coast, and a steady military flow tied to Eglin's north end. The good news is access — Crestview's newer subdivisions and rural lots have open driveways and room for a full-size truck, so the lifting is usually the straightforward part. The planning is about the drive: Crestview is the farthest-north stretch of our regular service area, so we quote the mileage and time honestly and route around I-10 and SR-85 congestion. New-construction neighborhoods here, like everywhere, mean fresh finishes that get full protection. For a Crestview family moving down to the beach or out of state, the value we bring is owning the whole move start to finish — no handoff to a broker at the county line, the same owners loading and unloading both ends.`,
    localFaqs: [
      {
        question: `Is Crestview within Beach House Moving's service area?`,
        answer: `Yes. Crestview is the inland "Hub City" at I-10 and SR-85, and it's the farthest-north part of our regular service area. We quote the mileage and drive time honestly so there are no surprises.`,
      },
      {
        question: `Are Crestview moves usually local or long-distance?`,
        answer: `A lot are longer-distance or cross-county — families relocating to or from the coast, plus military moves tied to Eglin's north gate. We own the whole move both ends rather than handing it to a broker.`,
      },
      {
        question: `Is access easy in Crestview neighborhoods?`,
        answer: `Generally yes. Crestview's newer subdivisions and rural lots have open driveways with room for a full-size truck, so the lifting is straightforward — the planning is mostly about the drive and protecting new-construction finishes.`,
      },
    ],
  },
  {
    slug: 'shalimar',
    name: 'Shalimar',
    county: 'Okaloosa County',
    image: '/images/team-stairs.jpg',
    intro: 'Shalimar is a quiet town tucked between Fort Walton Beach and Eglin AFB, with bayside neighborhoods and a mix of military and civilian families. Short, well-coordinated local moves are the norm here.',
    introExtended: [
      'Shalimar is one of the smallest towns we serve and one of the most military — minutes from Eglin\'s gates, full of established bayou-side neighborhoods and families moving on PCS timelines. Most Shalimar jobs are report-date driven, which is why being available around the clock matters more here than almost anywhere.',
      'The homes are mature-neighborhood Florida: carports, mid-century floor plans, big trees over narrow drives. Straightforward work for a crew that shows up with the right truck and a plan.',
    ],
    landmarks: ['Eglin AFB', 'Garnier Bayou', 'Poquito Bayou'],
    metaTitle: 'Shalimar FL Movers | Beach House Moving — Okaloosa County',
    metaDescription: 'Movers serving Shalimar near Eglin AFB. Owner-operated, licensed & insured. Free quote — (850) 842-1962.',
    localBody: `Shalimar is a small, quiet town tucked along Garnier Bayou and Poquito Bayou, right against the Eglin footprint between Fort Walton Beach and Niceville. It's an older community with a lot of mid-century homes, which is the main thing we plan around: those houses tend to have narrower doorways, original hardwood or terrazzo floors, tighter hallways, and carports rather than wide garages. We protect the floors and measure the awkward pieces before committing to a path. The bayou-side lots can slope toward the water with longer carries, and some have dock or waterside access that changes the approach. Shalimar's proximity to Eglin means the same military-relocation rhythm as its neighbors — PCS timing, report dates, short-notice orders — and we keep our scheduling flexible for it. The streets are calm and trucks fit, so access is rarely the obstacle here; it's the older-home interiors that reward a careful crew. Because Shalimar is small and central between our Fort Walton and Niceville work, it's an easy reach, and we treat the quieter move with the same care as a complicated one.`,
    localFaqs: [
      {
        question: `What's the main thing to plan for in a Shalimar move?`,
        answer: `The older mid-century homes. Shalimar's houses often have narrower doorways, original floors, and tight hallways, so we protect the floors and measure awkward furniture before choosing a path — it's an interior-access job more than a parking one.`,
      },
      {
        question: `Do bayou-front Shalimar homes need special handling?`,
        answer: `Some do. Lots along Garnier and Poquito Bayou can slope toward the water with longer carries and occasional dockside access, so we plan crew and equipment for the grade and distance.`,
      },
      {
        question: `Do you move Eglin-connected families in Shalimar?`,
        answer: `Yes. Shalimar sits right against the Eglin footprint, so military relocation and PCS timing is common, and we keep scheduling flexible around report dates and short-notice orders.`,
      },
    ],
  },
  {
    slug: 'bluewater-bay',
    name: 'Bluewater Bay',
    county: 'Okaloosa County',
    image: '/images/move-niceville.jpg',
    intro: 'Bluewater Bay is a large master-planned community in Niceville with golf, a marina, and homes ranging from townhomes to bayfront estates. We know the community layout and treat the finished interiors of every home here with full protection from door to door.',
    introExtended: [
      'Bluewater Bay is Niceville\'s golf-and-marina community — winding parkway streets, garage-forward family homes, and HOA standards that appreciate a crew that parks thoughtfully and protects the driveway. It\'s some of the most straightforward moving in Okaloosa County, and we keep it that way.',
      'A lot of Bluewater Bay moves are Eglin families putting down roots after years of PCS orders — which means we\'re often the crew on both ends: out of base housing, into the bay.',
    ],
    landmarks: ['Bluewater Bay Marina', 'golf courses', 'Boggy Bayou'],
    metaTitle: 'Bluewater Bay Movers | Beach House Moving — Niceville, FL',
    metaDescription: 'Movers serving Bluewater Bay in Niceville. Townhomes to bayfront estates. Owner-operated & insured. Free quote — (850) 842-1962.',
    localBody: `Bluewater Bay is a master-planned community within Niceville — marina, golf courses, parkway-style streets, and tree-lined residential pods built around amenities, with deep Eglin and defense-industry roots in who lives here. Moving in Bluewater Bay is mostly comfortable: the parkways are wide, driveways are real, and a full-size truck moves freely. The two things we plan for are the community layout and the resident profile. The neighborhood is laid out in connected pods off the main parkways, and street names repeat in ways that confuse a GPS, so we confirm the exact address and approach rather than trusting the route blindly. The marina and golf-adjacent homes can sit on tighter cul-de-sacs or sloped lots near the water. And because Bluewater Bay draws a lot of Eglin commuters and contractors, relocation and PCS timing comes up often — we build flexibility in for it. As a master-planned community, Bluewater Bay may post its own move guidelines, so we confirm those up front. It's an easy, close reach from our base, which keeps Bluewater Bay drive time and cost low.`,
    localFaqs: [
      {
        question: `Is Bluewater Bay easy to move in?`,
        answer: `Mostly yes — wide parkways, real driveways, and room for a full-size truck. The main planning notes are the pod-style layout (which can confuse GPS) and any community move guidelines, both of which we confirm before move day.`,
      },
      {
        question: `Why do you confirm the exact Bluewater Bay address ahead of time?`,
        answer: `The community is laid out in connected pods off the main parkways, and some street names repeat in ways that throw off navigation. Confirming the exact address and approach keeps the crew from circling on move morning.`,
      },
      {
        question: `Do you move Eglin and defense-industry families in Bluewater Bay?`,
        answer: `Frequently. Bluewater Bay has deep Eglin and contractor roots, so relocation and PCS timing comes up often — we build scheduling flexibility in around report dates and orders.`,
      },
    ],
  },
  // ---- BAY COUNTY ----
  {
    slug: 'panama-city',
    name: 'Panama City',
    county: 'Bay County',
    image: '/images/mover-carry-estate.jpg',
    intro: "Panama City is the Bay County seat, with the revitalizing St. Andrews district, a rebuilt downtown, and established neighborhoods spread around the bay. We handle the range — from older bungalows with tight stairwells to new builds that need floor protection from the start.",
    landmarks: ['St. Andrews', 'downtown Panama City', 'St. Andrews Bay', 'the Marina'],
    metaTitle: 'Panama City FL Movers | Beach House Moving — Bay County',
    metaDescription: 'Movers serving Panama City & St. Andrews. Owner-operated, licensed & insured. Free quote — (850) 842-1962.',
    localBody: `Panama City — the mainland city, not the beach — is a different job from PCB across the bridge. This is St. Andrews, the Marina district, and the downtown core, much of it rebuilt hard since Hurricane Michael, which means a county full of new floors, new paint, new stair rails, and renovated interiors that deserve protection from the first box in. We runner-and-guard the path on rebuilt homes as a default here. The older St. Andrews neighborhoods bring mature trees, tighter historic lots, and bayfront homes with sloped access toward the water; the newer rebuilds have fresh, easily-marked finishes. Downtown and Marina-area access can be tight on certain streets, so we plan parking and the carry rather than assume curb space. Panama City sits at the eastern edge of our regular service area, so we quote the drive honestly, and the bay separates it from the beach work — different routes, different timing. For families putting a home back together after the storm years, a careful move that protects the new finishes is the whole point, and that's how we run Panama City jobs.`,
    localFaqs: [
      {
        question: `Is Panama City different from Panama City Beach for a move?`,
        answer: `Yes — they're separated by the bay and they move differently. Panama City is the mainland city (St. Andrews, the Marina, downtown), while PCB is the beach side with condo towers. We plan routes and timing for each separately.`,
      },
      {
        question: `Do you take extra care with rebuilt post-Hurricane-Michael homes?`,
        answer: `Yes, by default. So much of Panama City was rebuilt with new floors, paint, and stair rails that we runner-and-guard the carry path from the first box — protecting fresh finishes is the standard here, not an add-on.`,
      },
      {
        question: `Are the older St. Andrews neighborhoods harder to move in?`,
        answer: `They can be. St. Andrews has mature trees, tighter historic lots, and bayfront homes with sloped, waterside access, so we plan parking and the carry carefully rather than assuming open curb space.`,
      },
    ],
  },
  {
    slug: 'panama-city-beach',
    name: 'Panama City Beach',
    county: 'Bay County',
    image: '/images/beach-house-moving-rug-placement-condo.jpg',
    intro: "Panama City Beach is a dense resort strip of beachfront condos, towers, and rental homes along Front Beach Road. High-rise elevator moves with loading-zone time windows are routine for us here — and we coordinate the building's requirements before move day, not the morning of.",
    landmarks: ['Pier Park', 'Front Beach Road', 'beachfront condo towers', 'Camp Helen'],
    metaTitle: 'Panama City Beach Movers — Bay County | BHM',
    metaDescription: 'Movers for Panama City Beach condos & rental homes. Elevator moves handled. Owner-operated & insured. Free quote — (850) 842-1962.',
    localBody: `Panama City Beach is towers and traffic. The gulf side is dominated by high-rise condos along Front Beach Road and Thomas Drive, which makes a PCB move a building-logistics job: service-elevator reservations, loading-dock windows, building escorts, and parking decks that won't clear a box truck. We handle the building first — book the elevator, confirm the dock, get on the security list — because in a PCB tower the building owns the clock. Then there's Front Beach Road itself, which in summer is one of the most congested stretches on the whole coast; we schedule around it instead of sitting in it, because an hour lost in beach traffic is an hour on your bill. Away from the towers, PCB has single-family neighborhoods and the area near Pier Park and Camp Helen with friendlier access. The Sprinter van and a staged carry earn their keep here when a deck or a dock won't take a full truck. PCB is the eastern anchor of our service area, and we know the building-by-building difference between a tower that runs a tight, helpful dock and one that'll cost you an hour if the reservation slips.`,
    localFaqs: [
      {
        question: `Do you move high-rise condos in Panama City Beach?`,
        answer: `Yes — it's a core part of PCB work. We reserve the service elevator, confirm the loading-dock window, and get the crew on the building's list first, because in a Front Beach Road or Thomas Drive tower the building controls the timeline.`,
      },
      {
        question: `Will a moving truck fit in a PCB condo parking deck?`,
        answer: `Often not. Many PCB decks won't clear a box truck, so we confirm clearance ahead of time and use the Sprinter van or the loading dock with a staged carry instead of getting stuck at the entrance.`,
      },
      {
        question: `How do you deal with Front Beach Road summer traffic?`,
        answer: `We schedule around it. Front Beach Road is one of the most congested stretches on the coast in season, so we time PCB moves for quieter windows — an hour lost in beach traffic is an hour added to your bill.`,
      },
    ],
  },
  {
    slug: 'lynn-haven',
    name: 'Lynn Haven',
    county: 'Bay County',
    image: '/images/truck-loaded.jpg',
    intro: 'Lynn Haven sits just north of Panama City on North Bay — a steady residential community of family neighborhoods with a mix of established homes and new development. Straightforward residential moves with the same attention to floors, walls, and furniture protection we bring to every job.',
    introExtended: [
      'Lynn Haven is Bay County\'s family-neighborhood core, and like most of the county it was rebuilt hard after Hurricane Michael — new roofs, new floors, fresh interiors that haven\'t met a couch yet. New-construction protection is standard on our Lynn Haven jobs: floor runners down before the first box, guards on door frames and stair rails.',
      'North of Panama City and out of the beach traffic, Lynn Haven moves run on a friendlier clock — and the liftgate trucks make quick work of the appliance-heavy jobs these family homes tend to be.',
    ],
    landmarks: ['North Bay', 'Sheffield Park', 'Highway 77', 'Cedar Grove'],
    metaTitle: 'Lynn Haven FL Movers | Beach House Moving — Bay County',
    metaDescription: 'Movers serving Lynn Haven & North Bay. Residential moves done right. Owner-operated & insured. Free quote — (850) 842-1962.',
    localBody: `Lynn Haven is the residential, family side of Bay County — north of Panama City along North Bay, threaded by US-98 and Highway 77, with neighborhoods like Sheffield Park and Cedar Grove and a lot of homes rebuilt or repaired since Hurricane Michael. Moving here is mostly straightforward suburban work: established streets, real driveways, and room for a full-size truck. The two things we plan around are the rebuild finishes and the water. Like much of Bay County, Lynn Haven has new floors and fresh interiors in a lot of homes, so floor and wall protection is the default. And the North Bay-front lots can slope toward the water with longer carries and occasional dockside access that changes the approach. Highway 77 and US-98 carry commuter traffic, so we time longer hauls around it. Lynn Haven sits at the eastern edge of our service area and is separated from the beach by the bay, so we quote the drive honestly and route the bay crossing into the timing. For most Lynn Haven families it's a clean, efficient move — and we keep it that way by planning the easy job, not coasting on it.`,
    localFaqs: [
      {
        question: `Is Lynn Haven an easy place to move?`,
        answer: `Generally yes — Lynn Haven's established family neighborhoods like Sheffield Park and Cedar Grove have real driveways and room for a full-size truck. The main planning notes are rebuilt-home finishes and North Bay-front lots with longer, sloped carries.`,
      },
      {
        question: `Do you protect newly rebuilt Lynn Haven homes during a move?`,
        answer: `Yes, by default. Many Lynn Haven homes were rebuilt or repaired after Hurricane Michael with new floors and fresh interiors, so floor and wall protection goes down before the first box — it's standard here.`,
      },
      {
        question: `How far is Lynn Haven from your service area, and do you quote the drive?`,
        answer: `Lynn Haven is at the eastern edge of our area, separated from the beach by the bay. We quote the mileage and the bay-crossing drive time honestly upfront, so the travel is built into the estimate with no surprises.`,
      },
    ],
  },
] as const satisfies readonly Neighborhood[]
