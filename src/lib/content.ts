// /src/lib/content.ts
// ============================================================
// SINGLE SOURCE OF TRUTH for all business content.
// Never hardcode business info in JSX. Always import from here.
// Service-Area Business: street address is intentionally NOT public.
// ============================================================

export const FLAGS = {
  SHOW_TESTIMONIALS: false,
} as const

export const BUSINESS = {
  name: 'Beach House Moving',
  legalName: 'Beach House Moving',
  tagline: 'Locally owned. Fully licensed. Fully committed.',
  headline: 'Your Move, Our Mission.',
  subheadline:
    'Beach House Moving serves Walton, Okaloosa, and Bay Counties with professional packing, loading, and transportation. Licensed, insured, and ready when you are.',
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
  facebook: 'https://www.facebook.com/profile.php?id=61578080548022',
  // google: '',   // Add Google Business Profile URL once verified
} as const

export const SERVICE_AREAS = [
  {
    county: 'Walton County',
    slug: 'walton-county',
    cities: ['Santa Rosa Beach', '30A', 'Miramar Beach', 'Freeport', 'DeFuniak Springs'],
    image: '/images/move-inlet-beach.jpg',
    description:
      'Our home turf. We know every neighborhood, road, and beach access along 30A and greater Walton County — from Santa Rosa Beach and Miramar Beach to Freeport and DeFuniak Springs.',
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
      'We serve Destin, Fort Walton Beach, Niceville, Crestview, and the surrounding Okaloosa County area, including military families relocating near Eglin AFB and Hurlburt Field.',
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
      'Moving to or from Panama City or Panama City Beach? Our crews handle your Bay County move with the same care and professionalism we bring to every job.',
    metaTitle: 'Bay County Movers | Beach House Moving — Panama City & PCB',
    metaDescription:
      'Licensed movers serving Bay County — Panama City, Panama City Beach, Lynn Haven, Callaway, and Springfield. Get your free estimate: (850) 842-1962.',
  },
] as const

export const SERVICES = [
  {
    slug: 'residential-moving',
    title: 'Residential Moving',
    shortDescription: 'Full-service home moves handled with care, speed, and zero drama.',
    fullDescription:
      'Whether you are moving across the street or across the county, we manage every detail of your residential move with care, speed, and zero drama. We handle furniture disassembly, loading, transportation, and reassembly at your new home.',
    icon: 'Home',
    featured: true,
    metaTitle: 'Residential Moving | Beach House Moving — Santa Rosa Beach, FL',
    metaDescription:
      'Full-service residential moving on the Florida Panhandle. Packing, loading, transport, and unloading. Licensed & insured. Free estimate: (850) 842-1962.',
  },
  {
    slug: 'local-moving',
    title: 'Local Moving',
    shortDescription: 'Expert local movers who know the Emerald Coast inside and out.',
    fullDescription:
      'Serving the greater 30A and Emerald Coast area, our local crews know these roads and neighborhoods and how to get your belongings there safely and efficiently. Local moves are billed by the hour with no hidden fees.',
    icon: 'MapPin',
    featured: true,
    metaTitle: 'Local Movers 30A & Emerald Coast | Beach House Moving',
    metaDescription:
      'Local moving crews serving 30A, Santa Rosa Beach, Destin, and the Emerald Coast. Hourly rates, no hidden fees. Call (850) 842-1962 for a free quote.',
  },
  {
    slug: 'long-distance-moving',
    title: 'Long-Distance Moving',
    shortDescription: 'Moving beyond the Panhandle? Same professionalism, longer journey.',
    fullDescription:
      'Moving beyond the Panhandle? We offer long-distance moving with the same professionalism and care you would expect for a local job. Our team coordinates every detail so your belongings arrive safely and on time, wherever you are headed.',
    icon: 'Truck',
    featured: true,
    metaTitle: 'Long-Distance Moving | Beach House Moving — Florida Panhandle',
    metaDescription:
      'Long-distance moving from the Florida Panhandle with licensed, insured crews. Same care as a local move. Request a free quote: (850) 842-1962.',
  },
  {
    slug: 'packing-unpacking',
    title: 'Packing & Unpacking',
    shortDescription: 'We handle the boxes, the bubble wrap, and the breakables.',
    fullDescription:
      'We handle the boxes, the bubble wrap, and the breakables. Our team packs your home carefully and efficiently and unpacks it just as thoughtfully on the other end. From delicate glassware to flat-screen TVs, we have the materials and expertise to protect everything.',
    icon: 'Package',
    featured: true,
    metaTitle: 'Packing & Unpacking Services | Beach House Moving',
    metaDescription:
      'Professional packing and unpacking for homes on the Emerald Coast. Materials included. Licensed & insured. Free estimate: (850) 842-1962.',
  },
  {
    slug: 'storage',
    title: 'Storage Solutions',
    shortDescription: 'Secure storage between moves or during renovations.',
    fullDescription:
      'Need a safe place for your belongings between moves or during renovations? We offer secure storage to fit your timeline and budget — short-term or long-term — and keep your items safe until you are ready.',
    icon: 'Warehouse',
    featured: false,
    metaTitle: 'Moving Storage Solutions | Beach House Moving',
    metaDescription:
      'Secure short-term and long-term storage between moves or during renovations on the Florida Panhandle. Call (850) 842-1962.',
  },
  {
    slug: 'delivery',
    title: 'Delivery Services',
    shortDescription: 'Furniture delivery, appliance placement, single-item transport.',
    fullDescription:
      'Furniture delivery, appliance placement, single-item transport — we handle it all with the same professionalism as a full move. Ideal for vacation-rental owners, new homeowners, and anyone who needs careful, professional delivery.',
    icon: 'PackageCheck',
    featured: false,
    metaTitle: 'Furniture & Appliance Delivery | Beach House Moving',
    metaDescription:
      'Professional furniture and appliance delivery across Walton, Okaloosa, and Bay Counties. Single items or full loads. (850) 842-1962.',
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
  'Other',
] as const

// AEO: concise, factual Q&A. Rendered on-page AND emitted as FAQPage JSON-LD.
export const FAQS = [
  {
    q: 'What areas does Beach House Moving serve?',
    a: 'We serve Walton, Okaloosa, and Bay Counties along Florida\u2019s Emerald Coast, including Santa Rosa Beach, 30A, Miramar Beach, Destin, Fort Walton Beach, Niceville, Freeport, DeFuniak Springs, Panama City, and Panama City Beach. We also handle long-distance moves beyond the Panhandle.',
  },
  {
    q: 'Is Beach House Moving licensed and insured?',
    a: 'Yes. Beach House Moving is fully licensed and insured in the State of Florida, so your belongings are protected throughout your move.',
  },
  {
    q: 'How much does a move cost?',
    a: 'Local moves are billed by the hour with no hidden fees. Every quote is free and based on your home size, distance, and the services you need. Call (850) 842-1962 or request a free quote online for an honest estimate.',
  },
  {
    q: 'Do you offer packing and unpacking?',
    a: 'Yes. We can pack your entire home or just the fragile items, supply the materials, and unpack on the other end so you can settle in faster.',
  },
  {
    q: 'Can you store my belongings between moves?',
    a: 'Yes. We offer secure short-term and long-term storage for moves that don\u2019t line up perfectly or during renovations.',
  },
  {
    q: 'How quickly can you schedule my move?',
    a: 'We\u2019re available seven days a week and work around your schedule. Reach out at (850) 842-1962 and we\u2019ll find a time that fits, including short-notice moves when our crews are available.',
  },
  {
    q: 'Do you move large or specialty items like appliances and TVs?',
    a: 'Yes. Our crews handle appliances, flat-screen TVs, and bulky furniture with the right equipment and protective materials, and we can disassemble and reassemble furniture as needed.',
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

// Placeholder testimonials are intentionally unused while FLAGS.SHOW_TESTIMONIALS is false.
export const TESTIMONIALS_PLACEHOLDER = [] as const

/** Static page metadata — used with buildMetadata(). */
export const PAGE_META = {
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
}

/** FAQ indices per service slug — subset of FAQS. */
export const SERVICE_FAQ_INDICES: Record<(typeof SERVICES)[number]['slug'], readonly number[]> = {
  'residential-moving': [0, 1, 2, 6],
  'local-moving': [0, 2, 5],
  'long-distance-moving': [0, 1, 2],
  'packing-unpacking': [1, 3, 6],
  storage: [1, 4, 5],
  delivery: [0, 6, 2],
}

/** Region-centered map embed — no street-address pin (SAB). */
export const MAP_EMBED = {
  src: 'https://maps.google.com/maps?q=30.396,-86.2288&hl=en&z=9&output=embed',
  title: 'Beach House Moving service area map — Walton, Okaloosa & Bay Counties, Florida',
} as const

export const ABOUT_CONTENT = {
  eyebrow: 'Our Story',
  headline: 'Rooted on the Emerald Coast',
  intro:
    'Beach House Moving is a locally owned, fully licensed moving company built for the Florida Panhandle. We live here, we work here, and we treat every move like it matters — because in a community this tight-knit, reputation is everything.',
  whyLocal:
    'When you hire a local crew, you get people who know 30A traffic patterns, beach-access rules, and the quirks of Panhandle neighborhoods. No national call center. No subcontracting. Just your neighbors showing up on time, in uniform, ready to work.',
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
