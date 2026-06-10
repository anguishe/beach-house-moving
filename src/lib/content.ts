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
  legalName: 'Beach House Moving',
  tagline: 'The owners are the movers. Fully licensed. Fully committed.',
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
  fleetStatement: 'A 3-vehicle fleet — two box trucks with lift gates and a Sprinter van — built for every size move on the Emerald Coast.',
  teamSize: 4,
  ownerOperator: true,
  ownerStatement: 'The owners are the movers. Our 4-person team treats every job — and every client — like family.',
  promise: 'A real person answers the phone, day or night. The owners show up on every job.',
  niches: ['luxury beach-home & new-construction', 'appliance & specialty-item delivery', 'military PCS near Eglin AFB & Hurlburt Field'],
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
  yelp: '', // Add Yelp URL when verification is complete
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
    image: '/images/mover-storage-corridor.jpg',
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
    image: '/images/crew-gym-equipment-liftgate.jpg',
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
    a: 'Beach House Moving serves Walton, Okaloosa, and Bay Counties across the Florida Panhandle. In Walton County we cover Santa Rosa Beach, all of 30A including Rosemary Beach, Alys Beach, Seaside, and Watercolor, plus Miramar Beach, Freeport, and DeFuniak Springs. In Okaloosa County we serve Destin, Fort Walton Beach, Niceville, Crestview, Shalimar, and the communities surrounding Eglin Air Force Base and Hurlburt Field. In Bay County we cover Panama City, Panama City Beach, Lynn Haven, Callaway, and Springfield. We also handle long-distance moves beyond the Panhandle — if you are relocating to another part of Florida or out of state, we can coordinate that too. Call (850) 842-1962 to confirm your area and get a free quote.',
  },
  {
    q: 'Is Beach House Moving licensed and insured?',
    a: 'Yes. Beach House Moving is fully licensed and insured in the State of Florida under Florida Mover Registration #IM4125, issued by the Florida Department of Agriculture and Consumer Services (FDACS). Florida law requires all for-hire movers to carry this registration, which verifies that we meet the state\'s standards for operating a moving company. You can verify our registration directly at the FDACS website. We also carry liability insurance and cargo coverage, so your belongings are protected from the moment we arrive until the last item is placed at your new home. When you hire Beach House Moving, you are hiring a legitimate, accountable business — not an unlicensed crew with no recourse if something goes wrong. Call (850) 842-1962 with any questions about our credentials.',
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
} as const

/** Homepage gallery marquee — every slot must use a unique `src`. */
export const GALLERY_PHOTOS = [
  IMAGES.truckLoading,
  IMAGES.dolly,
  IMAGES.fridge,
  IMAGES.washerDryer,
  IMAGES.dresserPack,
  IMAGES.stairs,
  IMAGES.cleanEntry,
  IMAGES.boxTruck,
  IMAGES.fleet,
  IMAGES.loadedLiftgateCoastalHome,
  IMAGES.moverCarryWrappedEstate,
  IMAGES.liftgateBlanketsCoastalHome,
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
] as const

export const REVIEWS_PAGE_META = {
  title: 'Customer Reviews | Beach House Moving — Florida Panhandle',
  description:
    `See what customers across Walton, Okaloosa & Bay Counties say about Beach House Moving. Honest, local, fully licensed movers. FL Mover Reg. #${BUSINESS.registration.number}.`,
  path: '/reviews',
  aggregateRating: {
    ratingValue: 5,
    reviewCount: 8,
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
      'Beach House Moving is a four-person, owner-operated crew licensed in Florida (Mover Reg. #IM4125) and serving Walton, Okaloosa, and Bay Counties around the clock. The owners show up on every job — not a dispatch center, not a franchise crew you have never met. Our three-vehicle fleet — two box trucks with lift gates and a Sprinter van — is built for the Emerald Coast: gated 30A communities, beach condos with elevator rules, and military PCS timelines near Eglin AFB and Hurlburt Field. When neighbors leave a review, they are describing a real move with real people who answered the phone at 2 a.m. because that is how we operate.',
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
    title: `Beach House Moving | Movers in ${BUSINESS.address.city}, FL`,
    description: `Locally owned & fully licensed movers serving Walton, Okaloosa & Bay Counties. 3-truck fleet. FL Mover Reg. #IM4125. Free quote — ${BUSINESS.phone.display}.`,
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
    title: 'About Beach House Moving | Locally Owned Florida Panhandle Movers',
    description:
      'The owners are the movers. Beach House Moving is a locally owned, fully licensed moving company serving Walton, Okaloosa & Bay Counties. FL Mover Reg. #IM4125.',
    path: '/about',
  },
  contact: {
    title: 'Contact Beach House Moving | (850) 842-1962',
    description:
      'Call, email, or message Beach House Moving for a free moving estimate. Serving Walton, Okaloosa & Bay Counties. Available 24/7.',
    path: '/contact',
  },
  getAQuote: {
    title: 'Get a Free Moving Quote | Beach House Moving — (850) 842-1962',
    description:
      'Request a free moving quote from Beach House Moving. Serving Walton, Okaloosa & Bay Counties. Licensed, insured, locally owned. Call (850) 842-1962 or submit online.',
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
  src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1535152.0556600732!2d-87.45865950746075!3d29.580061863225904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2c49ab7600a457f%3A0x5c504eb0f4ca7c79!2sBeach%20House%20Moving!5e0!3m2!1sen!2sus!4v1780542136877!5m2!1sen!2sus',
  title: 'Beach House Moving service area map — Walton, Okaloosa & Bay Counties, Florida',
} as const

export const ABOUT_FAQS = [
  {
    q: 'Are the owners the actual movers?',
    a: 'Yes — the owners of Beach House Moving are the movers on every job. Beach House Moving is a four-person, owner-operated team, not a staffing agency that sends a different crew each time. The same people who answer your call, load the truck, and carry your furniture are the owners who built this company. That means direct accountability: if something matters to you on moving day, it matters to the person whose name is on the company.',
  },
  {
    q: 'How long has Beach House Moving been in business?',
    a: 'Beach House Moving was established in 2025 and is locally owned and operated on the Florida Panhandle. We built the company around a simple belief: moving companies got worse when they scaled up and sent strangers to your home. We stayed hands-on instead — growing to a three-truck fleet while keeping the owners on every job.',
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
      'Beach House Moving is a locally owned moving company on the Florida Panhandle, built by four owners who are also the movers on every job. When you hire us, the people carrying your furniture are the same people who answer the phone, quote your move, and show up on moving day — not a rotating crew dispatched by a staffing agency.',
      'That owner-operated model is the core difference. National chains and franchise operations often send whoever is available that morning. We do not work that way. Your belongings pass through hands that have a direct stake in doing the job right, because our reputation and our name are on every box, every appliance, and every piece of furniture we touch.',
    ],
  },
  story: {
    headline: 'Our Story',
    paragraphs: [
      'Beach House Moving was established in 2025 on the Emerald Coast of Northwest Florida. We started with one truck and a clear standard: treat every home the way we would want ours treated, and treat what is inside it like it matters.',
      'We watched moving companies get worse as they scaled — more trucks, more volume, less personal accountability. Owners moved into offices while strangers handled the work on site. We built Beach House Moving differently. We stayed hands-on, kept the owners on the truck, and grew only as far as we could maintain that standard.',
      'Today we run a three-truck fleet across Walton, Okaloosa, and Bay Counties. We know the stilted beach homes, the tight 30A driveways, the PCS timelines near Eglin and Hurlburt, and the delivery windows on new construction sites. We live here, we move here, and we built this company for how moves actually work on the Panhandle.',
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
  },
  {
    slug: '30a',
    name: '30A',
    county: 'Walton County',
    image: '/images/move-inlet-beach.jpg',
    intro: 'Scenic Highway 30A links a string of distinct beach communities, each with its own gates, HOA rules, parking limits, and beach-access logistics. Moving along 30A rewards a crew that already knows the roads, the carriage-home alleys, and where the trucks can actually park — not one learning it on the day.',
    landmarks: ['Seaside', 'WaterColor', 'Rosemary Beach', 'Alys Beach', 'Grayton Beach', 'Inlet Beach'],
    metaTitle: '30A Movers | Beach House Moving — Santa Rosa Beach, FL',
    metaDescription: 'Local movers who know every 30A community — Seaside, WaterColor, Rosemary, Alys & more. Licensed & insured. Free quote — (850) 842-1962.',
  },
  {
    slug: 'grayton-beach',
    name: 'Grayton Beach',
    county: 'Walton County',
    image: '/images/move-srb.jpg',
    intro: 'Grayton Beach is the oldest townsite on 30A, known for its sandy unpaved streets, cottage character, and proximity to Grayton Beach State Park. Those soft-sand roads and older lots make access and equipment choices matter — something we plan for before the truck arrives.',
    landmarks: ['Grayton Beach State Park', 'Western Lake', 'Red Bar', 'Hotz Avenue'],
    metaTitle: 'Grayton Beach Movers | Beach House Moving — 30A, FL',
    metaDescription: 'Movers serving Grayton Beach on 30A. We know the sandy roads and cottage lots. Licensed & insured. Free quote — (850) 842-1962.',
  },
  {
    slug: 'blue-mountain-beach',
    name: 'Blue Mountain Beach',
    county: 'Walton County',
    image: '/images/move-srb.jpg',
    intro: 'Blue Mountain Beach sits on the highest coastal dune elevation in Florida, meaning steep driveways and elevated homes that frequently require stairs, long carries, and careful equipment choices. We bring the ramps, dollies, and lift gates that make hillside beach moves go smoothly.',
    landmarks: ['Blue Mountain Beach Creamery', 'Redfish Lake', 'coastal dune ridge'],
    metaTitle: 'Blue Mountain Beach Movers | Beach House Moving — 30A, FL',
    metaDescription: 'Elevated homes, stairs, long carries — Blue Mountain Beach moves handled by the owners themselves. Licensed & insured. Free quote — (850) 842-1962.',
  },
  {
    slug: 'seaside',
    name: 'Seaside',
    county: 'Walton County',
    image: '/images/move-inlet-beach.jpg',
    intro: 'Seaside is the founding New Urbanist town on 30A — pastel cottages, pedestrian-first streets, and notoriously limited vehicle access and parking. A move here lives or dies on timing and coordination, which is exactly where a local owner-operator crew earns its keep.',
    landmarks: ['Seaside Amphitheater', 'Central Square', 'Ruskin Place', 'Airstream food court'],
    metaTitle: 'Seaside FL Movers | Beach House Moving — 30A',
    metaDescription: "Movers who know Seaside's narrow streets and parking limits. Owner-operated, licensed & insured. Free quote — (850) 842-1962.",
  },
  {
    slug: 'watercolor',
    name: 'WaterColor',
    county: 'Walton County',
    image: '/images/move-inlet-beach.jpg',
    intro: 'WaterColor is an upscale planned community adjacent to Seaside, with the WaterColor Inn, parks on Western Lake, and a community road network with its own access points and HOA rules. Move days here go best with a crew that already knows the routine.',
    landmarks: ['WaterColor Inn', 'Cerulean Park', 'Western Lake', 'the Boathouse'],
    metaTitle: 'WaterColor FL Movers | Beach House Moving — 30A',
    metaDescription: 'Local movers serving WaterColor on 30A. Community access handled. Owner-operated & insured. Free quote — (850) 842-1962.',
  },
  {
    slug: 'watersound',
    name: 'WaterSound',
    county: 'Walton County',
    image: '/images/move-inlet-beach.jpg',
    intro: 'WaterSound spans gated beachside enclaves and the growing WaterSound Origins community inland, with guard check-ins and resort-community rules at both. We coordinate gate access ahead of time so the move day itself is straightforward.',
    landmarks: ['WaterSound Beach Club', 'WaterSound Origins', 'Camp Creek', 'Lake Powell'],
    metaTitle: 'WaterSound Movers | Beach House Moving — 30A, FL',
    metaDescription: 'Gated-community movers for WaterSound Beach & Origins on 30A. Owner-operated & insured. Free quote — (850) 842-1962.',
  },
  {
    slug: 'seacrest-beach',
    name: 'Seacrest Beach',
    county: 'Walton County',
    image: '/images/move-inlet-beach.jpg',
    intro: 'Seacrest Beach sits on the eastern end of 30A near Alys and Rosemary Beach, known for its large lagoon pool and closely clustered rental cottages. Tight spacing and shared access make a coordinated crew the difference between a smooth move and a stressful one.',
    landmarks: ['the Seacrest lagoon pool', 'Alys Beach', 'Rosemary Beach'],
    metaTitle: 'Seacrest Beach Movers | Beach House Moving — 30A, FL',
    metaDescription: 'Movers serving Seacrest Beach on 30A. Tight layouts, handled. Owner-operated & insured. Free quote — (850) 842-1962.',
  },
  {
    slug: 'alys-beach',
    name: 'Alys Beach',
    county: 'Walton County',
    image: '/images/move-inlet-beach.jpg',
    intro: 'Alys Beach is the all-white, Bermuda-inspired community on eastern 30A and one of the most architecturally precise neighborhoods on the coast. Protecting finished surfaces, courtyard entries, and white stucco is non-negotiable here — floor, wall, and corner protection is part of our standard setup before the first item moves.',
    landmarks: ['Caliza Pool', 'white courtyard homes', 'Fonville Press'],
    metaTitle: 'Alys Beach Movers | Beach House Moving — 30A, FL',
    metaDescription: 'White-glove-level care for Alys Beach moves. Owner-operated crew, full surface protection. Licensed & insured. Free quote — (850) 842-1962.',
  },
  {
    slug: 'rosemary-beach',
    name: 'Rosemary Beach',
    county: 'Walton County',
    image: '/images/move-inlet-beach.jpg',
    intro: 'Rosemary Beach anchors the eastern end of 30A with cobblestone streets, carriage homes, and Dutch West Indies architecture. The narrow alleys and rear carriage entries demand a crew that knows exactly where to stage and where a truck can physically fit — something we confirm before the day of.',
    landmarks: ['Rosemary Beach Town Center', 'cobblestone footpaths', 'Barrett Square', 'carriage homes'],
    metaTitle: 'Rosemary Beach Movers | Beach House Moving — 30A, FL',
    metaDescription: "Movers who know Rosemary Beach's cobblestone alleys and carriage homes. Owner-operated & insured. Free quote — (850) 842-1962.",
  },
  {
    slug: 'inlet-beach',
    name: 'Inlet Beach',
    county: 'Walton County',
    image: '/images/move-inlet-beach.jpg',
    intro: 'Inlet Beach is the easternmost community in Walton County, where 30A meets the Bay County line near the 30Avenue shops and Camp Helen State Park. It blends classic beach cottages with newer luxury builds — and we move both with the same care.',
    landmarks: ['30Avenue', 'Camp Helen State Park', 'Lake Powell', '30A eastern gateway'],
    metaTitle: 'Inlet Beach Movers | Beach House Moving — 30A, FL',
    metaDescription: 'Movers serving Inlet Beach at the east end of 30A. Cottages to new builds. Owner-operated & insured. Free quote — (850) 842-1962.',
  },
  {
    slug: 'dune-allen',
    name: 'Dune Allen',
    county: 'Walton County',
    image: '/images/move-srb.jpg',
    intro: 'Dune Allen is the westernmost 30A community, shaped by the rare coastal dune lakes that meet the Gulf here. Older beach homes and tight lakeside lots mean access planning is the first step of every move — we do that planning before we arrive.',
    landmarks: ['Oyster Lake', 'Stallworth Lake', 'coastal dune lakes', 'Ed Walline Beach Access'],
    metaTitle: 'Dune Allen Movers | Beach House Moving — West 30A, FL',
    metaDescription: 'Local movers for Dune Allen Beach on west 30A. Owner-operated & insured. Free quote — (850) 842-1962.',
  },
  {
    slug: 'seagrove-beach',
    name: 'Seagrove Beach',
    county: 'Walton County',
    image: '/images/move-srb.jpg',
    intro: 'Seagrove Beach sits between Seaside and Seacrest with a classic old-Florida feel — mature canopy, original cottages, and newer homes mixed throughout. Shaded, narrow streets reward a crew that plans truck placement before backing in.',
    landmarks: ['Seagrove Plaza', 'Eastern Lake', '30A'],
    metaTitle: 'Seagrove Beach Movers | Beach House Moving — 30A, FL',
    metaDescription: 'Movers serving Seagrove Beach on 30A. Old-Florida character, owner-operator care. Licensed & insured. Free quote — (850) 842-1962.',
  },
  {
    slug: 'miramar-beach',
    name: 'Miramar Beach',
    county: 'Walton County',
    image: '/images/move-miramar-beach.jpg',
    intro: 'Miramar Beach runs along the western end of Walton County between Destin and Sandestin — a dense mix of beachfront condos, gated communities, and large homes. High-rise condo moves with elevator reservations and lift-gate box trucks are routine work for our crew.',
    landmarks: ['Sandestin', 'Silver Sands Premium Outlets', 'Scenic Gulf Drive', 'Baytowne Wharf'],
    metaTitle: 'Miramar Beach Movers | Beach House Moving — Walton County, FL',
    metaDescription: 'Movers for Miramar Beach condos, gated homes & Sandestin. Owner-operated, licensed & insured. Free quote — (850) 842-1962.',
  },
  {
    slug: 'sandestin',
    name: 'Sandestin',
    county: 'Walton County',
    image: '/images/fleet-box-truck.jpg',
    intro: 'Sandestin Golf and Beach Resort is a large gated resort community with guard gates, internal road rules, and a wide span between bayside and beachside neighborhoods. We handle the gate clearance and internal routing so the move day stays on track.',
    landmarks: ['Baytowne Wharf', 'Sandestin gate', 'Burnt Pine', 'Village of Baytowne'],
    metaTitle: 'Sandestin Movers | Beach House Moving — Miramar Beach, FL',
    metaDescription: 'Gated-resort movers for Sandestin. Guard-gate access and resort logistics handled. Free quote — (850) 842-1962.',
  },
  {
    slug: 'freeport',
    name: 'Freeport',
    county: 'Walton County',
    image: '/images/truck-loaded.jpg',
    intro: 'Freeport sits at the north end of Walton County on Choctawhatchee Bay and is one of the fastest-growing residential areas on the Panhandle. New-construction move-ins with fresh hardwood and tile floors to protect are common here — and protecting them is standard with us, not optional.',
    landmarks: ['Choctawhatchee Bay', 'Hammock Bay', 'Highway 20', 'new-construction subdivisions'],
    metaTitle: 'Freeport FL Movers | Beach House Moving — North Walton County',
    metaDescription: 'Movers serving Freeport & Hammock Bay. New-construction move-ins, floor protection standard. Free quote — (850) 842-1962.',
  },
  {
    slug: 'defuniak-springs',
    name: 'DeFuniak Springs',
    county: 'Walton County',
    image: '/images/truck-loaded.jpg',
    intro: 'DeFuniak Springs is the Walton County seat — an inland historic town built around one of the few near-perfectly round natural lakes in the world. Historic homes here often have narrow staircases and tight rooms that reward experienced hands and careful planning.',
    landmarks: ['Lake DeFuniak', 'Chautauqua district', 'historic downtown', 'Interstate 10'],
    metaTitle: 'DeFuniak Springs Movers | Beach House Moving — Walton County, FL',
    metaDescription: 'Movers serving DeFuniak Springs & inland Walton County. Historic homes, handled with care. Free quote — (850) 842-1962.',
  },
  // ---- OKALOOSA COUNTY ----
  {
    slug: 'destin',
    name: 'Destin',
    county: 'Okaloosa County',
    image: '/images/fleet-box-truck.jpg',
    intro: 'Destin packs harborfront condos, gated golf communities, and beachfront towers into one of the most active real-estate markets on the coast. Elevator reservations, harbor-area traffic windows, and high-rise logistics are part of the plan on every Destin job.',
    landmarks: ['Destin Harbor', 'HarborWalk Village', 'Crab Island', 'Kelly Plantation', 'Regatta Bay'],
    metaTitle: 'Destin FL Movers | Beach House Moving — Okaloosa County',
    metaDescription: 'Movers for Destin condos, gated communities & beachfront homes. Owner-operated, licensed & insured. Free quote — (850) 842-1962.',
  },
  {
    slug: 'fort-walton-beach',
    name: 'Fort Walton Beach',
    county: 'Okaloosa County',
    image: '/images/truck-dolly.jpg',
    intro: "Fort Walton Beach is the largest city in Okaloosa County and home to many military families connected to nearby Eglin AFB and Hurlburt Field. We understand PCS timelines, base housing requirements, and the pressure of a military move — and we treat every one of them with the same urgency we'd want for our own family.",
    landmarks: ['Eglin AFB', 'Hurlburt Field', 'Okaloosa Island', 'Brooks Bridge'],
    metaTitle: 'Fort Walton Beach Movers | Beach House Moving — Okaloosa County, FL',
    metaDescription: 'Movers for Fort Walton Beach & military families near Eglin/Hurlburt. PCS moves welcome. Free quote — (850) 842-1962.',
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
  },
  {
    slug: 'crestview',
    name: 'Crestview',
    county: 'Okaloosa County',
    image: '/images/truck-loaded.jpg',
    intro: 'Crestview is the inland Okaloosa County seat — the "Hub City" at the crossroads of I-10 and Highway 85 — and a common destination for Eglin-connected families and Panhandle transplants. We handle the longer inland routing without padding the clock.',
    landmarks: ['Interstate 10', 'Highway 85', 'downtown Crestview'],
    metaTitle: 'Crestview FL Movers | Beach House Moving — Okaloosa County',
    metaDescription: 'Movers serving Crestview & inland Okaloosa County. Honest, efficient, owner-operated. Free quote — (850) 842-1962.',
  },
  {
    slug: 'shalimar',
    name: 'Shalimar',
    county: 'Okaloosa County',
    image: '/images/truck-dolly.jpg',
    intro: 'Shalimar is a quiet town tucked between Fort Walton Beach and Eglin AFB, with bayside neighborhoods and a mix of military and civilian families. Short, well-coordinated local moves are the norm here.',
    landmarks: ['Eglin AFB', 'Garnier Bayou', 'Poquito Bayou'],
    metaTitle: 'Shalimar FL Movers | Beach House Moving — Okaloosa County',
    metaDescription: 'Movers serving Shalimar near Eglin AFB. Owner-operated, licensed & insured. Free quote — (850) 842-1962.',
  },
  {
    slug: 'bluewater-bay',
    name: 'Bluewater Bay',
    county: 'Okaloosa County',
    image: '/images/move-niceville.jpg',
    intro: 'Bluewater Bay is a large master-planned community in Niceville with golf, a marina, and homes ranging from townhomes to bayfront estates. We know the community layout and treat the finished interiors of every home here with full protection from door to door.',
    landmarks: ['Bluewater Bay Marina', 'golf courses', 'Boggy Bayou'],
    metaTitle: 'Bluewater Bay Movers | Beach House Moving — Niceville, FL',
    metaDescription: 'Movers serving Bluewater Bay in Niceville. Townhomes to bayfront estates. Owner-operated & insured. Free quote — (850) 842-1962.',
  },
  // ---- BAY COUNTY ----
  {
    slug: 'panama-city',
    name: 'Panama City',
    county: 'Bay County',
    image: '/images/move-pcb.jpg',
    intro: "Panama City is the Bay County seat, with the revitalizing St. Andrews district, a rebuilt downtown, and established neighborhoods spread around the bay. We handle the range — from older bungalows with tight stairwells to new builds that need floor protection from the start.",
    landmarks: ['St. Andrews', 'downtown Panama City', 'St. Andrews Bay', 'the Marina'],
    metaTitle: 'Panama City FL Movers | Beach House Moving — Bay County',
    metaDescription: 'Movers serving Panama City & St. Andrews. Owner-operated, licensed & insured. Free quote — (850) 842-1962.',
  },
  {
    slug: 'panama-city-beach',
    name: 'Panama City Beach',
    county: 'Bay County',
    image: '/images/move-pcb.jpg',
    intro: "Panama City Beach is a dense resort strip of beachfront condos, towers, and rental homes along Front Beach Road. High-rise elevator moves with loading-zone time windows are routine for us here — and we coordinate the building's requirements before move day, not the morning of.",
    landmarks: ['Pier Park', 'Front Beach Road', 'beachfront condo towers', 'Camp Helen'],
    metaTitle: 'Panama City Beach Movers | Beach House Moving — Bay County, FL',
    metaDescription: 'Movers for Panama City Beach condos & rental homes. Elevator moves handled. Owner-operated & insured. Free quote — (850) 842-1962.',
  },
  {
    slug: 'lynn-haven',
    name: 'Lynn Haven',
    county: 'Bay County',
    image: '/images/move-pcb.jpg',
    intro: 'Lynn Haven sits just north of Panama City on North Bay — a steady residential community of family neighborhoods with a mix of established homes and new development. Straightforward residential moves with the same attention to floors, walls, and furniture protection we bring to every job.',
    landmarks: ['North Bay', 'Sheffield Park', 'Highway 77', 'Cedar Grove'],
    metaTitle: 'Lynn Haven FL Movers | Beach House Moving — Bay County',
    metaDescription: 'Movers serving Lynn Haven & North Bay. Residential moves done right. Owner-operated & insured. Free quote — (850) 842-1962.',
  },
] as const
