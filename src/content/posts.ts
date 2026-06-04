// src/content/posts.ts
// Static blog post data. No CMS — content lives in code.
// [OWNER NOTE] comments are intentional placeholders for real first-hand details.
// Do not replace them with invented content.

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
          '// [OWNER NOTE: Add 1-2 sentences from your own experience — a specific moment that captures what 30A moves are actually like.]',
        isOwnerNote: true,
      },
      {
        heading: 'Seaside & WaterColor',
        paragraph:
          'Seaside has limited truck access on most of its internal streets. On most jobs here, staging the truck on the perimeter and managing a longer carry is the practical reality, not an exception. WaterColor is easier on access but has HOA check-in requirements.',
      },
      {
        paragraph:
          '// [OWNER NOTE: Add a real detail — a specific gate code situation, a parking trick, a time of day that works best.]',
        isOwnerNote: true,
      },
      {
        heading: 'Rosemary Beach & Alys Beach',
        paragraph:
          "Rosemary Beach is cobblestone throughout. The carriage homes in the back alleys require a different staging approach than the street-facing properties. Alys Beach's all-white surfaces mean floor and wall protection isn't optional — it's the first thing we set up.",
      },
      {
        paragraph:
          "// [OWNER NOTE: Add a specific job memory if you have one — a narrow alley, a tricky carriage home entry, a floor you're glad you protected.]",
        isOwnerNote: true,
      },
      {
        heading: 'Inlet Beach & Grayton Beach',
        paragraph:
          'Inlet Beach at the eastern end of 30A has more room to work with than most. Grayton Beach has soft sand roads that are part of its character — and part of what we plan around before we bring a heavy truck.',
      },
      {
        paragraph: '// [OWNER NOTE: Add anything real about these two.]',
        isOwnerNote: true,
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
          "// [OWNER NOTE: If you've done PCS moves, add one real sentence — a family you helped, a timeline that worked out.]",
        isOwnerNote: true,
      },
      {
        heading: 'On-Base vs. Off-Base Housing',
        paragraph:
          "Families arriving at Eglin or Hurlburt often spend time in temporary lodging or short-term rentals before a permanent address is secured. We're available for phased moves — storage between temporary and permanent housing is something we handle.",
      },
      {
        paragraph:
          '// [OWNER NOTE: Any real experience with phased military moves or storage bridging.]',
        isOwnerNote: true,
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
          '// [OWNER NOTE: Add a real detail about a new-construction move you did — a specific floor, a narrow stairwell, a finish you were glad you protected.]',
        isOwnerNote: true,
      },
      {
        heading: 'Floor Protection Is Standard, Not Optional',
        paragraph:
          "We lay floor runners before the first item comes in. On hardwood, that means felt pads under every furniture leg and runners on every walking path. On tile, we use protection board over the grout lines. On carpet, plastic film. None of this is billed as an extra — it's part of how we move.",
      },
      {
        heading: 'Stairs, Door Frames, and Corners',
        paragraph:
          'Stairwells in new construction are usually the tightest part of the job. Door frames get corner guards. Banisters get padded. If something is going to get dinged, it happens here — and we plan for it before it does.',
      },
      {
        paragraph:
          '// [OWNER NOTE: Add a specific tight-stairwell detail if you have one.]',
        isOwnerNote: true,
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
