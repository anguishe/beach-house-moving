// /src/lib/content.ts
// ============================================================
// SINGLE SOURCE OF TRUTH for all business content.
// Never hardcode business info in JSX. Always import from here.
// ============================================================

export const BUSINESS = {
  name: 'Beach House Moving',
  tagline: 'Locally owned. Fully licensed. Fully committed.',
  headline: 'Your Move, Our Mission.',
  subheadline:
    'Beach House Moving serves Walton, Okaloosa, and Bay Counties with professional packing, loading, and transportation services. Licensed, insured, and ready when you are.',
  phone: {
    display: '(850) 842-1962',
    href: 'tel:+18508421962',
    raw: '8508421962',
  },
  email: 'beachhousemoving@gmail.com',
  website: 'https://beachhousemoving.com',
  address: {
    street: '110 Via Largo',
    city: 'Santa Rosa Beach',
    state: 'FL',
    zip: '32459',
    full: '110 Via Largo, Santa Rosa Beach, FL 32459',
    county: 'Walton County',
  },
  hours: 'Always open — available 7 days a week',
  established: '2025',
  licenseStatement: 'Fully licensed and insured in the State of Florida.',
} as const;

export const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/profile.php?id=61578080548022',
  // instagram: '',  // Add when available
  // google: '',     // Add Google Business Profile link when available
} as const;

export const SERVICE_AREAS = [
  {
    county: 'Walton County',
    slug: 'walton-county',
    cities: ['Santa Rosa Beach', '30A', 'Destin', 'Miramar Beach', 'Freeport', 'DeFuniak Springs'],
    description:
      'Our home turf. We know every neighborhood, road, and neighborhood along 30A and the greater Walton County area.',
  },
  {
    county: 'Okaloosa County',
    slug: 'okaloosa-county',
    cities: ['Fort Walton Beach', 'Niceville', 'Crestview', 'Shalimar', 'Eglin AFB', 'Hurlburt Field'],
    description:
      'Serving Fort Walton Beach and the greater Okaloosa County area, including military families near Eglin AFB and Hurlburt Field.',
  },
  {
    county: 'Bay County',
    slug: 'bay-county',
    cities: ['Panama City', 'Panama City Beach', 'Lynn Haven', 'Callaway', 'Springfield'],
    description:
      'Moving to or from Panama City or Panama City Beach? Our team handles your move with the same care and professionalism.',
  },
] as const;

export const SERVICES = [
  {
    slug: 'packing-unpacking',
    title: 'Packing & Unpacking',
    shortDescription:
      'We handle the boxes, the bubble wrap, and the breakables — carefully and efficiently.',
    fullDescription:
      'We handle the boxes, the bubble wrap, and the breakables. Our team packs your home carefully and efficiently — and unpacks it just as thoughtfully on the other end. From delicate glassware to flat-screen TVs, we have the materials and expertise to protect everything.',
    icon: 'Package',
    featured: true,
  },
  {
    slug: 'residential-moving',
    title: 'Residential Moving',
    shortDescription:
      'Full-service home moves handled with care, speed, and zero drama.',
    fullDescription:
      'Whether you\'re moving across the street or across the county, we manage every detail of your residential move with care, speed, and zero drama. We handle furniture disassembly, loading, transportation, and reassembly at your new home.',
    icon: 'Home',
    featured: true,
  },
  {
    slug: 'local-moving',
    title: 'Local Moving',
    shortDescription:
      'Expert local movers who know the Emerald Coast inside and out.',
    fullDescription:
      'Serving the greater 30A and Emerald Coast area, our local moving crews know these roads, these neighborhoods, and how to get your belongings there safely and efficiently. Local moves are billed by the hour with no hidden fees.',
    icon: 'MapPin',
    featured: true,
  },
  {
    slug: 'long-distance-moving',
    title: 'Long-Distance Moving',
    shortDescription:
      'Moving beyond the Panhandle? Same professionalism, longer journey.',
    fullDescription:
      'Moving beyond the Panhandle? We offer long-distance moving services with the same professionalism and care you\'d expect for a local job. Our team coordinates every detail to ensure your belongings arrive safely, on time, wherever you\'re headed.',
    icon: 'Truck',
    featured: true,
  },
  {
    slug: 'storage',
    title: 'Storage Solutions',
    shortDescription:
      'Secure storage between moves or during renovations.',
    fullDescription:
      'Need a safe place for your belongings between moves or during renovations? We offer secure storage solutions to fit your timeline and budget. Short-term or long-term — we keep your items safe until you\'re ready.',
    icon: 'Warehouse',
    featured: false,
  },
  {
    slug: 'delivery',
    title: 'Delivery Services',
    shortDescription:
      'Furniture delivery, appliance placement, single-item transport.',
    fullDescription:
      'Furniture delivery, appliance placement, single-item transport — we handle it all with the same professionalism as a full move. Perfect for vacation rental owners, new homeowners, or anyone who needs careful, professional delivery.',
    icon: 'PackageCheck',
    featured: false,
  },
] as const;

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
    label: 'Always Available',
    description: 'We work around your schedule, 7 days a week.',
  },
] as const;

export const NAV_LINKS = [
  { label: 'Services', href: '/services' },
  { label: 'Service Areas', href: '/service-areas' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

export const QUOTE_FORM_MOVE_TYPES = [
  'Residential Move',
  'Commercial / Office Move',
  'Long-Distance Move',
  'Packing & Unpacking Only',
  'Storage',
  'Delivery',
  'Other',
] as const;

// Placeholder testimonials — replace with real reviews when available
// DO NOT publish these as real testimonials — mark as placeholders
export const TESTIMONIALS_PLACEHOLDER = [
  {
    name: 'Customer Name',
    location: 'Santa Rosa Beach, FL',
    rating: 5,
    text: 'Testimonial text — replace with verified Google or Facebook review.',
    source: 'Google',
  },
] as const;
