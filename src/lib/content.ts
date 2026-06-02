// /src/lib/content.ts
// ============================================================
// SINGLE SOURCE OF TRUTH for all business content.
// Never hardcode business info in JSX. Always import from here.
// Service-Area Business: street address is intentionally NOT public.
// ============================================================

export const FLAGS = {
  SHOW_TESTIMONIALS: true,
} as const

export const BUSINESS = {
  name: 'Beach House Moving',
  legalName: 'Beach House Moving',
  tagline: 'Locally owned. Fully licensed. Fully committed.',
  headline: 'Your Move, Our Mission.',
  subheadline:
    'Beach House Moving serves Walton, Okaloosa, and Bay Counties with professional moving, packing, and junk removal services. Licensed, insured, and ready when you are.',
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
  geo: { lat: 30.396, lng: -86.2288 },
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
  google: 'https://share.google/IDGDHjZnsKihpWaCu',
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
  socialProofTagline: 'Florida Panhandle\u2019s Premier Movers',
} as const

export const SERVICE_AREAS = [
  {
    county: 'Walton County',
    slug: 'walton-county',
    cities: ['Santa Rosa Beach', '30A', 'Miramar Beach', 'Freeport', 'DeFuniak Springs'],
    image: '/images/move-inlet-beach.jpg',
    description:
      'Walton County is home base. We run 30A end to end — Inlet Beach, Rosemary Beach, Alys Beach, Seacrest, Seagrove, WaterColor, WaterSound, Seaside, Grayton Beach, Blue Mountain Beach and Dune Allen — plus Santa Rosa Beach, Miramar Beach, Freeport and DeFuniak Springs. We know which gulf-front rentals only have boardwalk access, which gated communities hold you at the gate until your name\u2019s on the list, and which stilted driveways a box truck can\u2019t fit so we bring the Sprinter van instead. It\u2019s the kind of thing you only learn by doing it every week. From 30A home moves to full-property junk removal, we handle it all.',
    whatWeMoveIntro:
      'Beach rentals, gated communities, and full-home moves from 30A to DeFuniak Springs — we match the truck to the driveway.',
    metaTitle: 'Walton County Movers | Beach House Moving — 30A & Santa Rosa Beach',
    metaDescription:
      'Licensed local movers serving Walton County, 30A, Santa Rosa Beach, Miramar Beach, Freeport, and DeFuniak Springs. Free estimates — call (850) 842-1962.',
  },
  {
    county: 'Okaloosa County',
    slug: 'okaloosa-county',
    cities: ['Destin', 'Fort Walton Beach', 'Niceville', 'Crestview', 'Shalimar', 'Eglin AFB', 'Hurlburt Field'],
    image: '/images/move-niceville.jpg',
    description:
      'In Okaloosa we cover Destin, Fort Walton Beach, Niceville, Crestview, Shalimar and the bases. We move a lot of military families in and out near Eglin AFB and Hurlburt Field, so we work around PCS timelines and short-notice report dates. From a Destin Pointe condo to a Niceville ranch house with a long stair carry, we bring the dollies, ramps and blankets to do it right.',
    whatWeMoveIntro:
      'Condos, ranch houses, and PCS moves near Eglin and Hurlburt — we bring the right equipment for stair carries and tight timelines.',
    metaTitle: 'Okaloosa County Movers | Beach House Moving — Destin & Fort Walton Beach',
    metaDescription:
      'Professional movers in Okaloosa County — Destin, Fort Walton Beach, Niceville, Crestview, and Eglin AFB. Licensed & insured. Free quote: (850) 842-1962.',
  },
  {
    county: 'Bay County',
    slug: 'bay-county',
    cities: ['Panama City', 'Panama City Beach', 'Lynn Haven', 'Callaway', 'Springfield'],
    image: '/images/move-pcb.jpg',
    description:
      'Bay County means Panama City and Panama City Beach, plus Lynn Haven, Callaway and Springfield. PCB is mostly elevated beach homes and condos — liftgate trucks, ramps and careful stair work are the norm, not the exception. Whether it\u2019s a full house or a single oversized item, we handle your Bay County move with the same crew and the same care we bring to every job on the coast.',
    whatWeMoveIntro:
      'Elevated beach homes, PCB condos, and inland houses — liftgates and stair carries are routine here.',
    metaTitle: 'Bay County Movers | Beach House Moving — Panama City & PCB',
    metaDescription:
      'Licensed movers serving Bay County — Panama City, Panama City Beach, Lynn Haven, Callaway, and Springfield. Get your free estimate: (850) 842-1962.',
  },
] as const

export const SERVICES = [
  {
    slug: 'residential-moving',
    title: 'Residential Moving',
    shortDescription: 'Full home moves, done with care and no drama.',
    fullDescription:
      'Across the street or across the county, we handle the whole move — wrap and pad the furniture, protect your floors and door frames, load it tight, and set it back up at the new place. Licensed, insured, and used to coastal homes with stairs and tight access.',
    icon: 'Home',
    featured: true,
    metaTitle: 'Residential Moving | Beach House Moving — Santa Rosa Beach, FL',
    metaDescription:
      'Full-service residential moving on the Florida Panhandle. Packing, loading, transport, and unloading. Licensed & insured. Free estimate: (850) 842-1962.',
  },
  {
    slug: 'local-moving',
    title: 'Local Moving',
    shortDescription: 'Local crews who actually know these roads.',
    fullDescription:
      'We run the 30A corridor and the greater Emerald Coast every day, so we know the beach-access routes, the gated-community rules, and which driveways need the van instead of the truck. Billed by the hour, no hidden fees, fuel included in the quote.',
    icon: 'MapPin',
    featured: true,
    metaTitle: 'Local Movers 30A & Emerald Coast | Beach House Moving',
    metaDescription:
      'Local moving crews serving 30A, Santa Rosa Beach, Destin, and the Emerald Coast. Hourly rates, no hidden fees. Call (850) 842-1962 for a free quote.',
  },
  {
    slug: 'long-distance-moving',
    title: 'Long-Distance Moving',
    shortDescription: 'Leaving the Panhandle? We\'ll get you there.',
    fullDescription:
      'Moving out of the area takes coordination — we plan the timeline, load it to travel safely, and keep you posted along the way. Same crew, same care you\'d get on a local job, just a longer drive.',
    icon: 'Truck',
    featured: true,
    metaTitle: 'Long-Distance Moving | Beach House Moving — Florida Panhandle',
    metaDescription:
      'Long-distance moving from the Florida Panhandle with licensed, insured crews. Same care as a local move. Request a free quote: (850) 842-1962.',
  },
  {
    slug: 'packing-unpacking',
    title: 'Packing & Unpacking',
    shortDescription:
      'Boxes, bubble wrap, breakables — packed right and unpacked just as carefully.',
    fullDescription:
      'We bring the boxes, paper, and bubble wrap, and we pack room by room so nothing rattles in the truck. Fragile stuff gets wrapped properly, not just tossed in a box. On the other end, we unpack and place it where you want it and haul the empty boxes away.',
    icon: 'Package',
    featured: true,
    metaTitle: 'Packing & Unpacking Services | Beach House Moving',
    metaDescription:
      'Professional packing and unpacking for homes on the Emerald Coast. Materials included. Licensed & insured. Free estimate: (850) 842-1962.',
  },
  {
    slug: 'storage',
    title: 'Storage Solutions',
    shortDescription: 'A safe place to park your stuff between moves.',
    fullDescription:
      'Between closings, mid-renovation, or waiting on a rental to turn over — we\'ve got secure storage on flexible terms. We document what goes in and get it back to you when you\'re ready.',
    icon: 'Warehouse',
    featured: false,
    metaTitle: 'Moving Storage Solutions | Beach House Moving',
    metaDescription:
      'Secure short-term and long-term storage between moves or during renovations on the Florida Panhandle. Call (850) 842-1962.',
  },
  {
    slug: 'delivery',
    title: 'Delivery Services',
    shortDescription: 'Furniture and appliance delivery, single items included.',
    fullDescription:
      'New sofa, a fridge swap, a washer-dryer set, or one oversized piece up three flights — we deliver and place it, and we\'ll help with the hookup. Same care as a full move, scaled to one item.',
    icon: 'PackageCheck',
    featured: false,
    metaTitle: 'Furniture & Appliance Delivery | Beach House Moving',
    metaDescription:
      'Professional furniture and appliance delivery across Walton, Okaloosa, and Bay Counties. Single items or full loads. (850) 842-1962.',
  },
  {
    slug: 'junk-removal',
    title: 'Junk Removal',
    shortDescription: 'Fast, responsible junk removal across the Emerald Coast — no haul too big or too small.',
    fullDescription:
      'Clearing out before a move, after a renovation, or just reclaiming your space? Our junk removal crew hauls away furniture, appliances, debris, and more. Fast, affordable, and handled with the same professionalism as every job we take.',
    icon: 'Trash2',
    image: '/images/truck-loaded.jpg',
    featured: false,
    metaTitle: 'Junk Removal Services | Beach House Moving — Florida Panhandle',
    metaDescription:
      'Professional junk removal across Walton, Okaloosa & Bay Counties. Furniture, appliances, debris and more. Free quote — (850) 842-1962.',
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

// AEO: concise, factual Q&A. Rendered on-page AND emitted as FAQPage JSON-LD.
export const FAQS = [
  {
    q: 'What areas does Beach House Moving serve?',
    a: `We cover Walton, Okaloosa, and Bay Counties — Santa Rosa Beach, 30A, Destin, Miramar Beach, Fort Walton Beach, Niceville, Crestview, Panama City, and Panama City Beach — and we do long-distance moves out of the area too. Not sure if you\u2019re in range? Call ${BUSINESS.phone.display} and ask.`,
  },
  {
    q: 'Is Beach House Moving licensed and insured?',
    a: `Yes. We\u2019re fully licensed and insured in Florida under Mover Registration #${BUSINESS.registration.number}.`,
  },
  {
    q: 'How much does a move cost?',
    a: `Local moves are billed by the hour with no hidden fees and fuel included in the quote. Long-distance and large jobs are quoted up front. Estimates are always free — call ${BUSINESS.phone.display} and we\u2019ll walk through it.`,
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
    a: 'Yes. We move a lot of military families around Okaloosa County and work around PCS timelines and short-notice report dates.',
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
] as const

// Image library — paths map to /public/images. Alt text is final copy.
export const IMAGES = {
  logo: { src: '/images/logo-light.png', alt: 'Beach House Moving logo' },
  logoOnLight: { src: '/images/logo-dark.png', alt: 'Beach House Moving logo' },
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
} as const

export const TESTIMONIALS = [
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
] as const

export const REVIEWS_PAGE_META = {
  title: 'Customer Reviews | Beach House Moving — Florida Panhandle',
  description:
    `See what customers across Walton, Okaloosa & Bay Counties say about Beach House Moving. Honest, local, fully licensed movers. FL Mover Reg. #${BUSINESS.registration.number}.`,
  path: '/reviews',
  aggregateRating: {
    ratingValue: '5',
    reviewCount: '3',
    bestRating: '5',
    worstRating: '1',
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
    title: `Beach House Moving | Movers in ${BUSINESS.address.city}, FL`,
    description: `Locally owned & fully licensed movers serving Walton, Okaloosa & Bay Counties. Packing, loading, transportation & storage. Get your free quote — ${BUSINESS.phone.display}.`,
    path: '/',
  },
  services: {
    title: 'Moving Services | Beach House Moving — Santa Rosa Beach, FL',
    description:
      'Full-service moving including packing, residential moving, local & long distance, storage, and delivery. Serving the Florida Panhandle.',
    path: '/services',
  },
  serviceAreas: {
    title: 'Service Areas | Beach House Moving — Walton, Okaloosa & Bay Counties',
    description:
      'Licensed movers serving Walton, Okaloosa, and Bay Counties along Florida\u2019s Emerald Coast. We come to you — free estimates at (850) 842-1962.',
    path: '/service-areas',
  },
  about: {
    title: 'About Us | Beach House Moving — Locally Owned Florida Panhandle Movers',
    description:
      'Meet Beach House Moving — a locally owned, fully licensed moving company serving the Emerald Coast. Three-truck fleet, FDACS #IM4125, available 24/7.',
    path: '/about',
  },
  contact: {
    title: 'Contact Beach House Moving | (850) 842-1962',
    description:
      'Call, email, or message Beach House Moving for a free moving estimate. Serving Walton, Okaloosa & Bay Counties. Available 24/7.',
    path: '/contact',
  },
  getAQuote: {
    title: 'Get a Free Moving Quote | Beach House Moving',
    description:
      'Request your free, no-obligation moving quote online. Licensed & insured crews serving the Florida Panhandle. We\u2019ll call you back promptly.',
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
  src: 'https://maps.google.com/maps?q=30.396,-86.2288&hl=en&z=9&output=embed',
  title: 'Beach House Moving service area map — Walton, Okaloosa & Bay Counties, Florida',
} as const

export const ABOUT_CONTENT = {
  eyebrow: 'Our Story',
  headline: 'Rooted on the Emerald Coast',
  intro:
    'Locally owned movers on the Florida Panhandle — licensed, insured, and built for how moves actually work out here.',
  storyParagraphs: [
    'Beach House Moving started in 2025 with one truck and one rule: treat the house like it\u2019s ours and treat what\u2019s inside it like it matters.',
    'Out here, a move is rarely just a truck and a ramp. It\u2019s a third-story rental on 30A with a boardwalk between the driveway and the front door. It\u2019s a gated community with a delivery window and a guard checking names. It\u2019s a washer and dryer that has to come out before the new set goes in, on a Sunday, because that\u2019s when the rental turns over.',
    `We grew into a three-truck fleet because that\u2019s what the coast needs \u2014 a Sprinter van for the tight stilted driveways a box truck can\u2019t reach, and box trucks with liftgates for full houses. We\u2019re licensed and insured in Florida under Mover Registration #${BUSINESS.registration.number}, and a real person answers the phone, day or night.`,
    'We live here. We move here. When we say we know these roads, we mean we\u2019ve backed a truck down most of them.',
  ],
  values: [
    {
      title: 'Local Pride',
      description: 'We live here, we work here, and we care about this community.',
    },
    {
      title: 'Professionalism',
      description: 'Fully licensed, insured, uniformed, on-time, and communicative.',
    },
    {
      title: 'Safety',
      description: 'Your belongings are handled with the same care we would expect in our own homes.',
    },
    {
      title: 'Transparency',
      description: 'Free estimates, no hidden fees, and honest timelines from the start.',
    },
    {
      title: 'Reliability',
      description: 'We show up. Every time.',
    },
  ],
  fleetHeadline: 'Three Trucks. One Standard.',
  fleetDescription:
    'Our fleet of three fully equipped trucks means we can handle moves of every size — from a studio apartment to a full home — without cutting corners on equipment or crew size.',
  licenseBadge: `FDACS Registered Mover #${BUSINESS.registration.number}`,
  hoursBadge: 'Open 24 Hours',
  // TODO: confirm photo — replace placeholder when owner/team asset is available
  teamPhotoPlaceholder: true,
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
