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
} as const

export const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/profile.php?id=61578080548022',
} as const

export const SERVICE_AREAS = [
  {
    county: 'Walton County',
    slug: 'walton-county',
    cities: ['Santa Rosa Beach', '30A', 'Destin', 'Miramar Beach', 'Freeport', 'DeFuniak Springs'],
    description:
      'Our home turf. We know every neighborhood, road, and community along 30A and the greater Walton County area.',
    image: '/images/move-inlet-beach.jpg',
  },
  {
    county: 'Okaloosa County',
    slug: 'okaloosa-county',
    cities: ['Fort Walton Beach', 'Niceville', 'Crestview', 'Shalimar', 'Eglin AFB', 'Hurlburt Field'],
    description:
      'Serving Fort Walton Beach and the greater Okaloosa County area, including military families near Eglin AFB and Hurlburt Field.',
    image: '/images/move-niceville.jpg',
  },
  {
    county: 'Bay County',
    slug: 'bay-county',
    cities: ['Panama City', 'Panama City Beach', 'Lynn Haven', 'Callaway', 'Springfield'],
    description:
      'Moving to or from Panama City or Panama City Beach? Our team handles your move with the same care and professionalism.',
    image: '/images/move-pcb.jpg',
  },
] as const

export const SERVICES = [
  {
    slug: 'packing-unpacking',
    title: 'Packing & Unpacking',
    shortDescription: 'We handle the boxes, the bubble wrap, and the breakables — carefully and efficiently.',
    fullDescription:
      'We handle the boxes, the bubble wrap, and the breakables. Our team packs your home carefully and efficiently — and unpacks it just as thoughtfully on the other end.',
    icon: 'Package',
    image: '/images/team-packing.jpg',
    featured: true,
  },
  {
    slug: 'residential-moving',
    title: 'Residential Moving',
    shortDescription: 'Full-service home moves handled with care, speed, and zero drama.',
    fullDescription:
      "Whether you're moving across the street or across the county, we manage every detail of your residential move with care, speed, and zero drama.",
    icon: 'Home',
    image: '/images/truck-dolly.jpg',
    featured: true,
  },
  {
    slug: 'local-moving',
    title: 'Local Moving',
    shortDescription: 'Expert local movers who know the Emerald Coast inside and out.',
    fullDescription:
      'Serving the greater 30A and Emerald Coast area, our local moving crews know these roads, these neighborhoods, and how to get your belongings there safely and efficiently.',
    icon: 'MapPin',
    image: '/images/team-stairs.jpg',
    featured: true,
  },
  {
    slug: 'long-distance-moving',
    title: 'Long-Distance Moving',
    shortDescription: 'Moving beyond the Panhandle? Same professionalism, longer journey.',
    fullDescription:
      "Moving beyond the Panhandle? We offer long-distance moving services with the same professionalism and care you'd expect for a local job.",
    icon: 'Truck',
    image: '/images/fleet-box-truck.jpg',
    featured: true,
  },
  {
    slug: 'storage',
    title: 'Storage Solutions',
    shortDescription: 'Secure storage between moves or during renovations.',
    fullDescription:
      "Need a safe place for your belongings between moves or during renovations? We offer secure storage solutions to fit your timeline and budget.",
    icon: 'Warehouse',
    image: '/images/move-srb.jpg',
    featured: false,
  },
  {
    slug: 'delivery',
    title: 'Delivery Services',
    shortDescription: 'Furniture delivery, appliance placement, single-item transport.',
    fullDescription:
      'Furniture delivery, appliance placement, single-item transport — we handle it all with the same professionalism as a full move.',
    icon: 'PackageCheck',
    image: '/images/team-fridge.jpg',
    featured: false,
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
    label: 'Always Available',
    description: 'We work around your schedule, 7 days a week.',
  },
] as const

export const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Service Areas', href: '#areas' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
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

export const GALLERY_PHOTOS = [
  { src: '/images/fleet-all-trucks.jpg', alt: 'Beach House Moving full fleet of trucks' },
  { src: '/images/move-inlet-beach.jpg', alt: 'Beach House Moving truck at Inlet Beach, FL' },
  { src: '/images/move-srb.jpg',          alt: 'Beach House Moving job in Santa Rosa Beach, FL' },
  { src: '/images/move-pcb.jpg',          alt: 'Beach House Moving truck at Panama City Beach, FL' },
  { src: '/images/move-niceville.jpg',    alt: 'Beach House Moving job in Niceville, FL' },
  { src: '/images/fleet-box-truck.jpg',   alt: 'Beach House Moving box truck with lift gate' },
  { src: '/images/collage-moves.jpg',     alt: 'Beach House Moving jobs across the Florida Panhandle' },
  { src: '/images/truck-loaded.jpg',      alt: 'Beach House Moving fully loaded truck ready to go' },
] as const

// PLACEHOLDER — replace with verified Google/Facebook reviews before launch
export const TESTIMONIALS_PLACEHOLDER = [
  {
    name: 'Sarah M.',
    location: 'Santa Rosa Beach, FL',
    rating: 5,
    text: 'Replace with a verified Google or Facebook review before launch.',
    source: 'Google',
  },
  {
    name: 'James T.',
    location: 'Destin, FL',
    rating: 5,
    text: 'Replace with a verified Google or Facebook review before launch.',
    source: 'Google',
  },
  {
    name: 'Michelle R.',
    location: 'Fort Walton Beach, FL',
    rating: 5,
    text: 'Replace with a verified Google or Facebook review before launch.',
    source: 'Google',
  },
] as const
