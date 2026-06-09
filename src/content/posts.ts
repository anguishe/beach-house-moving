// src/content/posts.ts
// Static blog post data. No CMS — content lives in code.

export type Post = {
  slug: string
  title: string
  description: string
  datePublished: string
  heroImage: string
  excerpt: string
  body: { heading?: string; paragraph: string; isOwnerNote?: boolean }[]
  faq: { question: string; answer: string }[]
}

export const POSTS: Post[] = [
  {
    slug: 'moving-to-30a-neighborhood-guide',
    title: "Moving to 30A: A Local Mover's Neighborhood-by-Neighborhood Guide",
    description:
      "Every 30A community has its own gates, parking limits, and move-day realities. Our owner-operated crew has worked them all. Here's what we've learned.",
    datePublished: '2026-06-02',
    heroImage: '/images/move-inlet-beach.jpg',
    excerpt:
      "Seaside and Rosemary Beach have almost no truck parking. Alys Beach requires floor protection before the first item moves. Blue Mountain's driveways are steeper than they look on a map. Here's the real 30A mover's guide.",
    body: [
      {
        heading: 'Why Moving Along 30A Is Different',
        paragraph:
          "Scenic Highway 30A is one of the most desirable addresses in the Southeast — and one of the more logistically demanding places to execute a move. The communities are close together but each has its own rules, access points, and physical characteristics that determine whether a move day runs smoothly or doesn't.",
      },
      {
        paragraph:
          'One of our earlier 30A moves drove this home. We had a standard box truck staged for a Grayton Beach job and spent twenty minutes deciding the safest entry angle around parked golf carts and a tight live-oak canopy. We use our Sprinter van to shuttle in neighborhoods where the big truck simply doesn\'t fit — it adds a carry but it protects the streets and the schedule.',
        isOwnerNote: false,
      },
      {
        heading: 'Seaside & WaterColor',
        paragraph:
          'Seaside has limited truck access on most of its internal streets. On most jobs here, staging the truck on the perimeter and managing a longer carry is the practical reality, not an exception. WaterColor is easier on access but has HOA check-in requirements.',
      },
      {
        paragraph:
          "WaterColor's HOA check-in is usually smooth if you're on the guest list before 8 a.m. Seaside proper has almost no staging room on the internal streets — we always build in an extra 30 minutes and plan the truck position from Google Street View before we arrive.",
        isOwnerNote: false,
      },
      {
        heading: 'Rosemary Beach & Alys Beach',
        paragraph:
          "Rosemary Beach is cobblestone throughout. The carriage homes in the back alleys require a different staging approach than the street-facing properties. Alys Beach's all-white surfaces mean floor and wall protection isn't optional — it's the first thing we set up.",
      },
      {
        paragraph:
          "Rosemary Beach carriage-home alleys are tight. We've learned to walk those first. Alys Beach's white walls and pale stone floors are beautiful and unforgiving — floor runners and wall corner guards go down before we carry anything heavier than a lamp.",
        isOwnerNote: false,
      },
      {
        heading: 'Inlet Beach & Grayton Beach',
        paragraph:
          'Inlet Beach at the eastern end of 30A has more room to work with than most. Grayton Beach has soft sand roads that are part of its character — and part of what we plan around before we bring a heavy truck.',
      },
      {
        paragraph:
          'Grayton Beach has soft sand roads that are part of the charm — and part of what we account for when a fully loaded box truck needs a solid surface. We stage at the paved perimeter when the driveway sand is loose. Inlet Beach has new-construction sites where the road itself is still being finished; plywood under the truck ramp is standard.',
        isOwnerNote: false,
      },
      {
        heading: 'What to Tell Your Movers Before Move Day',
        paragraph:
          'The more specific you are about access — gate codes, parking restrictions, elevator reservations, whether the driveway is paved or sand — the smoother the day goes. We ask for all of this when you book, so nothing is a surprise.',
      },
    ],
    faq: [
      {
        question: 'Do you move in gated communities on 30A?',
        answer:
          'Yes. We coordinate gate access and HOA requirements ahead of time. Call (850) 842-1962 to walk through the specifics of your community before booking.',
      },
      {
        question: 'Do you offer white-glove protection for high-end 30A homes?',
        answer:
          'Floor runners, furniture pads, and wall protection are standard on every move — not an upgrade.',
      },
    ],
  },
  {
    slug: 'military-pcs-move-eglin-hurlburt',
    title:
      'PCS Moves Near Eglin AFB & Hurlburt Field: What Emerald Coast Military Families Should Know',
    description:
      "PCS moves have tight timelines and real stakes. Here's what military families relocating near Eglin AFB or Hurlburt Field should know about moving on the Emerald Coast.",
    datePublished: '2026-06-02',
    heroImage: '/images/truck-dolly.jpg',
    excerpt:
      "PCS orders don't wait. Neither do we. Here's what families moving near Eglin AFB or Hurlburt Field need to know about the Emerald Coast housing market and how we handle military relocations.",
    body: [
      {
        heading: 'The Reality of a Military Move on the Panhandle',
        paragraph:
          "A PCS move isn't like a civilian relocation. The timeline is set by orders, not by convenience. Base housing waitlists are real. The gap between reporting date and finding a rental off-base can be tight. We've helped military families navigate all of it.",
      },
      {
        paragraph:
          "We've helped families where the orders changed the reporting date mid-process — two days' notice to move out of base lodging into a Niceville rental. We had the Sprinter out same afternoon. That kind of flexibility is something a scheduling call center can't offer. We're a small crew and we pick up the phone.",
        isOwnerNote: false,
      },
      {
        heading: 'On-Base vs. Off-Base Housing',
        paragraph:
          "Families arriving at Eglin or Hurlburt often spend time in temporary lodging or short-term rentals before a permanent address is secured. We're available for phased moves — storage between temporary and permanent housing is something we handle.",
      },
      {
        paragraph:
          "Phased moves — temporary lodging to storage to permanent address — are something we handle regularly for Eglin and Hurlburt families. We've stored household goods for families waiting on base housing assignment and then completed the delivery when the address was confirmed. One call at the start covers the whole sequence.",
        isOwnerNote: false,
      },
      {
        heading: 'Niceville, Fort Walton Beach & Shalimar',
        paragraph:
          "These three communities absorb the majority of the Eglin/Hurlburt population. Niceville's Bluewater Bay is particularly common for families who want a neighborhood feel close to base. Fort Walton Beach has the most inventory range. Shalimar is the closest to Hurlburt.",
      },
      {
        heading: 'What to Have Ready Before You Call',
        paragraph:
          "Your reporting date, your current location, an approximate home size, and whether you'll need storage. That's all we need to give you a real estimate. We won't ask you for a deposit to start the conversation.",
      },
    ],
    faq: [
      {
        question: 'Does Beach House Moving handle military PCS moves?',
        answer:
          'Yes. We serve Fort Walton Beach, Niceville, Shalimar, Crestview, and all of Okaloosa County. We understand PCS timelines and work around them. Call (850) 842-1962.',
      },
      {
        question: 'Can you provide storage between a PCS and a permanent address?',
        answer:
          'Yes — we offer secure storage for exactly these situations. Tell us your timeline when you call.',
      },
    ],
  },
  {
    slug: 'new-construction-beach-home-move',
    title:
      'Moving Into a New Beach-House Build on the Emerald Coast: How to Protect Floors, Stairs, and Finishes',
    description:
      'New construction on 30A and across the Panhandle comes with fresh floors, tight stairwells, and finishes that are easy to damage on move-in day. Here\'s how we approach it.',
    datePublished: '2026-06-02',
    heroImage: '/images/clean-entry.jpg',
    excerpt:
      "Move-in day is also the highest-risk day for a new build. Here's how we protect finished floors, paint, and trim from the first carry to the last.",
    body: [
      {
        heading: 'Why New Construction Moves Require Extra Attention',
        paragraph:
          "New construction homes are delivered in perfect condition. Move-in day is the first day that changes. Fresh hardwood, tile grout that's still curing, painted walls with no scuffs yet — all of it is at risk the moment a heavy piece of furniture comes through the door. We treat protecting the home as part of the job, not as something the homeowner has to ask for.",
      },
      {
        paragraph:
          "The most common finishes we move into along 30A and across the Panhandle right now: wide-plank engineered white oak in the main living areas — often in lighter driftwood or veiled-white tones with a matte finish — followed by large-format porcelain in kitchens and wet zones, polished concrete in modern Inlet Beach and Watersound builds, and waterproof LVP in lower levels and kids' rooms. All of them look incredible on day one. All of them show a scratch if you're not careful.",
        isOwnerNote: false,
      },
      {
        heading: 'Floor Protection Is Standard, Not Optional',
        paragraph:
          "We lay floor runners before the first item comes in. On hardwood, that means felt pads under every furniture leg and runners on every walking path. On tile, we use protection board over the grout lines. On carpet, plastic film. None of this is billed as an extra — it's part of how we move.",
      },
      {
        paragraph:
          "Our standard setup: Ram Board or heavy rosin paper taped down over every high-traffic path — it's breathable, so it doesn't trap coastal humidity under hardwood the way plastic sheeting can. Felt furniture sliders under anything heavy. Carpet film on any LVP transition zones. For polished concrete, we add plywood sheets under dollies and appliances to distribute the weight. One thing we learned early: skip the plastic sheeting directly on fresh hardwood in summer — the humidity under it causes sweating that can mark the finish before you've even moved in.",
        isOwnerNote: false,
      },
      {
        heading: 'Stairs, Door Frames, and Corners',
        paragraph:
          'Stairwells in new construction are usually the tightest part of the job. Door frames get corner guards. Banisters get padded. If something is going to get dinged, it happens here — and we plan for it before it does.',
      },
      {
        paragraph:
          "The tightest job we've worked was a beachfront home in Rosemary Beach — a fresh white-oak staircase, a 90-degree turn on the landing, and a king-size platform bed that needed to be partially disassembled to navigate it. Moving blankets doubled on the railing, corner guards on every door frame, and a slow methodical carry. No marks. That's the standard.",
        isOwnerNote: false,
      },
      {
        heading: 'Coordinate With Your Builder Before Move Day',
        paragraph:
          'Some builders have specific move-in requirements — elevator reservations, entrance restrictions, permitted move-in windows. We ask about all of this when you book so we can plan accordingly. The builder\'s timeline is our timeline.',
      },
    ],
    faq: [
      {
        question: 'Do you provide floor protection for new-construction move-ins?',
        answer:
          'Yes — floor runners, corner guards, and furniture pads are standard on every move. No upcharge. Call (850) 842-1962 before your move-in date.',
      },
      {
        question: 'Can you coordinate move-in timing with a builder or property manager?',
        answer:
          "Yes. Give us the builder's contact and move-in requirements when you book. We'll handle the coordination.",
      },
    ],
  },
]
