// src/content/posts.ts
// Static blog post data. No CMS — content lives in code.

export type PostBlock = {
  heading?: string
  body?: string
  paragraph?: string
  subheading?: string
  isOwnerNote?: boolean
}

export type Post = {
  slug: string
  title: string
  description: string
  datePublished: string
  dateModified?: string
  author: string
  heroImage: string
  heroAlt?: string
  excerpt: string
  body: PostBlock[]
  relatedServices?: { label: string; href: string }[]
  faq: { question: string; answer: string }[]
}

export const POSTS: Post[] = [
  {
    slug: 'moving-to-30a-neighborhood-guide',
    title: "Moving to 30A: A Local Mover's Neighborhood-by-Neighborhood Guide",
    description:
      "Every 30A community has its own gates, parking limits, and move-day realities. Our owner-operated crew has worked them all. Here's what we've learned.",
    datePublished: '2026-06-02',
    author: 'Beach House Moving',
    heroImage: '/images/move-inlet-beach.jpg',
    heroAlt:
      'Beach House Moving crew staging a residential move at an Inlet Beach home along Scenic Highway 30A',
    relatedServices: [
      { label: 'Local Moving', href: '/services/local-moving' },
      { label: 'Packing & Unpacking', href: '/services/packing-unpacking' },
    ],
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
      'On-Base or Off-Base at Eglin & Hurlburt: How Your Housing Choice Changes Move Day',
    description:
      'Base housing or off-base near Eglin AFB and Hurlburt Field — how your choice changes timeline, inspections, and what kind of crew you need on move day.',
    datePublished: '2026-06-02',
    dateModified: '2026-06-12',
    author: 'Beach House Moving',
    heroImage: '/images/truck-dolly.jpg',
    heroAlt: 'Beach House Moving mover wheeling boxes on a dolly toward the truck',
    relatedServices: [
      { label: 'Long-Distance Moving', href: '/services/long-distance-moving' },
      { label: 'Storage Solutions', href: '/services/storage' },
      { label: 'Military PCS Moving', href: '/services/military-pcs-moving' },
    ],
    excerpt:
      "PCS orders don't wait. Neither do we. Here's what families moving near Eglin AFB or Hurlburt Field need to know about the Emerald Coast housing market and how we handle military relocations.",
    body: [
      {
        heading: 'The decision that shapes the whole move',
        body:
          "Every PCS family landing at Eglin AFB or Hurlburt Field makes one call that changes everything downstream: base housing or off-base. It changes your timeline, your inspection requirements, what you can move when, and what kind of crew you need. Here's the ground-level difference, from the movers who work both sides of the gate every month.",
      },
      {
        heading: 'Moving into base housing',
        body:
          "Base housing runs on its own clock. You don't pick your move-in date so much as receive it, the unit comes with a documented condition inspection, and the housing office cares — in writing — about wall scuffs and floor damage on the way in. That makes protection the whole game: floor runners, door-frame guards, padded stair rails, furniture wrapped before it crosses the threshold. The other base-housing reality is the waitlist gap. If your report date beats your housing date, your household needs somewhere to live that isn't a relative's garage — short-term storage between the truck and the keys is the single most common thing we do for incoming base families.",
      },
      {
        heading: 'Moving off-base',
        body:
          "Off-base buys flexibility and trades it for logistics you own. Your timeline is the landlord's or the closing table's, not the housing office's — which sounds better until the closing slips a week past your report date. Off-base also means the Emerald Coast's actual housing stock: elevated homes with full flights of exterior stairs in Niceville and Shalimar, condos with service-elevator reservations in Fort Walton and Destin, gated communities that want your mover's name at the gate. A local crew that knows which is which quotes it right the first time.",
      },
      {
        heading: "If you're doing a PPM",
        body:
          "A personally procured move means documentation is money. Keep every receipt; your reimbursement paperwork will ask for an itemized record of what you paid for moving services, and we provide exactly that — itemized, dated, on company paperwork — without being asked twice. Confirm current PPM requirements with your TMO before move day; the program's rules belong to them, and they change.",
      },
      {
        heading: 'The straight answer',
        body:
          "There's no universally right choice — base housing trades control for simplicity, off-base trades simplicity for control. What's universal: a report date that won't move, an inspection somebody will scrutinize, and a window that's shorter than you'd like. Build the move around the date first. We're available 24/7 at (850) 842-1962 because military moves don't keep business hours, and neither do we.",
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
    author: 'Beach House Moving',
    heroImage: '/images/clean-entry.jpg',
    heroAlt:
      'Beach House Moving protecting a home entry with floor runners during a new-construction move-in',
    relatedServices: [
      { label: 'Residential Moving', href: '/services/residential-moving' },
      { label: 'Packing & Unpacking', href: '/services/packing-unpacking' },
    ],
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
  {
    slug: 'moving-checklist-30a-destin-florida',
    title: 'The Honest Moving Checklist for 30A and Destin — What No One Tells You',
    description:
      'A real moving checklist built for 30A and Destin — parking logistics, beach access restrictions, HOA rules, and seasonal timing. From movers who work here every week.',
    datePublished: '2026-05-15',
    author: 'Beach House Moving',
    heroImage: '/images/move-inlet-beach.jpg',
    heroAlt:
      'Beach House Moving truck staged for a move at an Inlet Beach home on the eastern end of 30A',
    relatedServices: [
      { label: 'Local Moving', href: '/services/local-moving' },
      { label: 'Packing & Unpacking', href: '/services/packing-unpacking' },
    ],
    excerpt:
      'Moving along 30A or into Destin comes with logistics that a generic moving checklist completely ignores. Here is what we have learned from doing these moves.',
    body: [
      {
        paragraph:
          'A standard moving checklist assumes a suburban driveway, a front door at ground level, and a truck that parks twenty feet from the porch. Along Scenic Highway 30A and in Destin, those assumptions fall apart quickly. The physical reality is narrow roads behind the beach communities — especially around Seaside, Rosemary Beach, and Alys Beach — where a box truck cannot always reach the front door. Most beach houses sit on pilings with exterior stairs and no elevator. HOA rules in many 30A communities restrict moves to weekday business hours or require advance notice through a property manager. From March through August, parking near the job site is scarce because rental turnover and vacation traffic consume every available space. We have learned these details move by move, and they are the difference between a smooth day and a long one.',
      },
      {
        heading: 'The 8-Week Window',
        paragraph:
          'Eight weeks before your move date is when the logistics actually begin — not when you start packing boxes. Call your property manager directly to confirm move-in and move-out rules. Do not rely on an email thread from when you signed the lease. Many communities on 30A have changed their policies in the last few years, and the person answering the phone knows the current window better than a PDF attachment. Ask specifically whether your community requires a certificate of insurance naming the HOA as additional insured. Alys Beach, WaterColor, and WaterSound properties frequently require this documentation before movers are permitted on site. We carry $1M general liability and provide COI paperwork same-day — but you need to know the requirement exists before move week, not the morning the truck arrives.',
      },
      {
        paragraph:
          'While you are on that call, ask whether your building has an elevator and, if so, what its interior dimensions are. Most 30A beach houses do not have one. The ones that do — certain WaterColor townhomes and a handful of Miramar Beach condos — often have freight elevators smaller than a standard sofa. Measure your largest pieces against those dimensions now. If a king mattress platform or a sectional will not fit, you want that answer eight weeks out, not when we are standing at a spiral staircase in Seagrove Beach with nowhere else to go.',
      },
      {
        heading: 'Parking and Access',
        paragraph:
          'The 30A-specific reality on parking: most beach communities have no truck parking within walking distance of the front door. We stage at the nearest paved pull-off and carry. That is normal here, not a surcharge situation — but it adds time, and time affects your quote. Box truck access behind Old Seagrove and Grayton Beach can be blocked by low-clearance driveway overpasses and narrow alleyways between carriage homes. Rosemary Beach delivery-hour restrictions are managed by the town, not just the HOA — certain hours are off limits for commercial vehicles on the cobblestone interior streets. Destin addresses along Holiday Isle and Crystal Beach have similar constraints where the road width barely clears our mirrors.',
      },
      {
        paragraph:
          'What we ask you to do: share your property address with us before you book, not after you have paid a deposit somewhere else. We run a route check on every 30A and Destin job — Street View, HOA portal notes, and our own memory of where we have staged before. When a customer gives us an address in Inlet Beach or along Western Lake, we already know whether the Sprinter van handles the alley or whether the box truck stays on 30A and we shuttle. That pre-work protects your schedule and our crew.',
      },
      {
        heading: 'Seasonal Timing on 30A',
        paragraph:
          'Peak season on 30A runs Memorial Day through Labor Day. Traffic on 30A itself slows to a crawl on Saturday mornings. Road closures during events — the Seaside Farmers Market, art festivals in Rosemary Beach, charity runs through WaterColor — can block our staging routes with little notice. Truck parking near the beach disappears entirely in July when every driveway belongs to a weekly rental turnover. If your closing date is flexible, moving October through February is faster, less congested, and often less expensive because we are not competing with vacation-rental logistics for the same time slots.',
      },
      {
        paragraph:
          'If you must move in summer, schedule for early morning. We start as early as 6 a.m. on 30A jobs during peak season because the roads are passable, parking spots still exist, and the heat has not yet made a stair carry miserable. A 6 a.m. start on a Tuesday in June beats a 10 a.m. start on a Saturday in July every time. We will tell you honestly which day and time gives you the best shot at finishing before afternoon traffic.',
      },
      {
        heading: "What to Do With Furniture That Won't Fit",
        paragraph:
          'Beach houses along 30A and in Destin were not designed for the same furniture that fits a four-bedroom inland home. Narrow doorways, spiral staircases in loft areas, and low ceilings under exposed beam construction eliminate more pieces than most people expect. We disassemble and reassemble what we can — bed frames, dining tables, modular sectionals. For pieces that genuinely will not fit after we have measured the path, the honest answer is to sell or donate them before the move rather than paying us to transport something you will eventually need to get rid of on site.',
      },
      {
        paragraph:
          'We have carried a sectional up exterior stairs in Rosemary Beach only to discover it cannot make the turn into the living room. That is a bad day for everyone. Measure doorways and stair landings against your largest items three weeks out. We can often arrange junk removal for pieces you decide to leave behind — same day as the move, so you are not managing a separate pickup. Consignment shops in Santa Rosa Beach and Destin take quality furniture if you would rather recover some value than donate.',
      },
      {
        heading: 'The Certificate of Insurance Question',
        paragraph:
          'Many property managers and HOAs along 30A require your moving company to carry $1M general liability and name the HOA as additional insured on a certificate of insurance. This is not bureaucracy for its own sake — it is how communities protect common areas, elevators, and shared hallways from damage claims. We carry this documentation and can provide a COI same-day when you give us the property manager\'s email and the exact legal name of the HOA. If a mover tells you they do not provide COIs or that your community does not really need one, that is a red flag. We have been turned away from jobs because another company showed up without paperwork. Do not let that be your move day.',
      },
      {
        paragraph:
          'The one thing that makes a 30A or Destin move go smoothly is communication before move day — not heroics on the truck. Call us at (850) 842-1962, give us the address, and we will tell you exactly what to expect: where we stage, what time we start, what paperwork your HOA needs, and whether your dining table fits the stairwell. No surprises.',
      },
    ],
    faq: [
      {
        question: 'Do you move furniture into second-floor beach houses on 30A?',
        answer:
          'Yes, regularly. Most 30A beach houses have exterior stairs rather than interior stairwells. We carry the right equipment and have the experience for stair-heavy moves in Inlet Beach, Seagrove, Rosemary Beach, and throughout the 30A corridor.',
      },
      {
        question: 'Can you provide a certificate of insurance for my HOA?',
        answer:
          'Yes. We carry $1M general liability and can name your HOA or property manager as additional insured. We provide COI documentation same-day upon request.',
      },
      {
        question: 'What is the best time of year to move along 30A?',
        answer:
          'October through February. Traffic is lighter, parking is easier, and we have more flexibility on scheduling. If you are moving in summer, early morning start times (6–7 a.m.) make a significant difference.',
      },
    ],
  },
  {
    slug: 'pcs-move-eglin-afb-hurlburt-field-guide',
    title:
      'PCS to Eglin AFB or Hurlburt Field — A Ground-Level Guide From Your Local Movers',
    description:
      'PCS moves to Eglin Air Force Base and Hurlburt Field — local mover guide to neighborhoods, BAH rates, on-base vs off-base, and how to coordinate your military relocation.',
    datePublished: '2026-04-22',
    author: 'Beach House Moving',
    heroImage: '/images/move-niceville.jpg',
    heroAlt:
      'Beach House Moving crew handling a residential move in Niceville near Eglin AFB',
    relatedServices: [
      { label: 'Long-Distance Moving', href: '/services/long-distance-moving' },
      { label: 'Storage Solutions', href: '/services/storage' },
      { label: 'Military PCS Moving', href: '/services/military-pcs-moving' },
    ],
    excerpt:
      'PCS orders to Eglin or Hurlburt come with a short timeline and a long to-do list. Here is what local movers who do these moves every season know about making it work.',
    body: [
      {
        paragraph:
          'PCS orders arrive with roughly thirty days of notice — sometimes less. You have never driven through Fort Walton Beach. You need to coordinate a household goods shipment, find housing, enroll kids in school, and register vehicles in a state you have never lived in, all at once. We do these moves every season across Okaloosa County, and the families who have the smoothest experience are the ones who treat the timeline as fixed and the logistics as sequential. Here is what we have learned from Eglin and Hurlburt families who got it right — and from the ones who waited too long to call.',
      },
      {
        heading: 'On-Base vs. Off-Base — The Honest Housing Question',
        paragraph:
          'Eglin on-base housing is managed by Eglin Family Housing through Balfour Beatty. Waitlists commonly run six to twelve months depending on rank and bedroom count, but on-base housing eliminates the off-base housing hunt and is generally pet-friendly with established playgrounds and community support. Off-base, Niceville, Fort Walton Beach, Shalimar, and Valparaiso all sit within fifteen to twenty-five minutes of Eglin\'s main gate on State Road 85. Hurlburt Field sits closer to Fort Walton Beach and Mary Esther — for Hurlburt families, Mary Esther and the north end of Fort Walton Beach are the most common off-base choices because the commute on Eglin Parkway is manageable even at peak hours.',
      },
      {
        paragraph:
          'Current BAH rates for E-5 and above with dependents in Okaloosa County generally support renting a three-bedroom house or apartment off-base, though the exact figure changes every January. Verify your rate at defensetravel.dod.mil before you sign a lease — do not rely on a number from a Facebook group post from last year. Destin and Miramar Beach offer more space and beach access but sit above what many BAH rates cover comfortably. Crestview and Baker offer more square footage per dollar if you are willing to drive thirty minutes to Eglin. There is no wrong answer — only a mismatch between your BAH, your commute tolerance, and what is actually available when your orders take effect.',
      },
      {
        heading: 'The PPM/DITY Move Option',
        paragraph:
          'Some service members choose a Personally Procured Move — PPM, also called DITY — where the government reimburses a percentage of what it would have paid a contracted carrier. You hire local movers, we load and transport your goods, and you submit documentation to your Transportation Management Office for reimbursement. We handle PPM moves regularly and provide invoices formatted to meet military documentation requirements: itemized labor, mileage where applicable, and dates that align with your orders.',
      },
      {
        paragraph:
          'Call your TMO at Eglin or Hurlburt before you book anything. Entitlements vary by rank, distance, and weight allowance. We can tell you what our invoice will include, but only TMO can confirm what you will be reimbursed. Families who skip that call sometimes discover after the move that a line item was not eligible. Ten minutes at TMO saves a headache at finance.',
      },
      {
        heading: 'Neighborhoods Worth Knowing',
        paragraph:
          'Niceville is family-oriented with Okaloosa County schools that rank among the strongest in Florida. Bluewater Bay and the neighborhoods along Partin Drive north of John Sims Parkway are common for Eglin families who want quiet streets and a twenty-minute gate commute. Crestview is more affordable and growing quickly — new construction along Stillwell Boulevard and Redstone Avenue gives families space at lower rent, with about a thirty-minute drive to Eglin main gate. Navarre in Santa Rosa County is technically off-post for Eglin purposes but popular for families who want Gulf access through Navarre Beach; the commute is longer but the beach is twenty minutes from your driveway.',
      },
      {
        paragraph:
          'Fort Walton Beach offers the closest off-base option to Hurlburt Field — downtown along Miracle Strip Parkway has walkable restaurants and waterfront, and neighborhoods like Ocean City and Mary Esther Cutoff keep you under fifteen minutes to Hurlburt\'s gate. Destin and Miramar Beach attract senior enlisted and officers with more flexible housing budgets. The tradeoff is traffic on US-98 during tourist season and rent that often exceeds BAH without out-of-pocket supplement. Shalimar sits between Niceville and Fort Walton Beach — small, quiet, and five minutes from Hurlburt for families who prioritize proximity over square footage.',
      },
      {
        heading: 'Timing Your Arrival',
        paragraph:
          'PCS season peaks May through August across every military installation in the country. Moving companies in Okaloosa County book three to four weeks out during that window — sometimes longer for large homes or PPM moves that require two trucks. If your orders have you reporting in June or July, call us the moment you have a report date, not after housing is confirmed. We hold tentative dates while you finalize a lease or wait on base housing assignment. Families who call us after they have keys in hand often find the first available slot is two weeks after they needed to be moved in.',
      },
      {
        heading: 'What to Expect From Your HHG Shipment',
        paragraph:
          'Your government-contracted HHG movers handle the long-distance portion — packing, line-haul, and delivery to the destination area. When the truck arrives at your new address in Niceville or Fort Walton Beach, the local delivery crew may have never worked in the Panhandle before. They do not know that your Shalimar townhouse has a low garage clearance or that your Niceville rental has a soft yard where a heavy truck will rut the lawn. We offer receiving services: we are on site when the HHG truck arrives, we direct placement room by room, we inspect for damage before the driver leaves, and we handle overflow storage if your housing is not ready when the shipment shows up.',
      },
      {
        paragraph:
          'Receiving services matter most when there is a gap between delivery and occupancy — base lodging checkout, lease start date misaligned with TMO scheduling, or furniture arriving before the power is on. We have stored household goods in our warehouse for Eglin families waiting on base housing assignment and completed delivery the week keys were issued. One phone call at the start of your PCS covers the sequence instead of three separate vendors.',
      },
      {
        heading: 'Getting the Rest Set Up',
        paragraph:
          'Moving is one line item on a longer checklist. Utilities in Okaloosa County depend on your address: Gulf Power and Florida Power and Light both serve parts of the county — confirm which serves your street before you call. Water may come through the City of Fort Walton Beach, the Emerald Coast Utilities Authority, or a county district depending on whether you land in Fort Walton Beach, Niceville, or Crestview. Internet is primarily Cox in Okaloosa County; fiber availability varies by neighborhood. School transfers through Okaloosa County School District take one to two weeks once you have a lease address — request records from your outgoing district before you leave, not after you arrive.',
      },
      {
        paragraph:
          'Florida requires vehicle registration within ten days of establishing residency. The Okaloosa County Tax Collector offices in Fort Walton Beach, Niceville, and Crestview handle registration and title transfer. Insurance rates change when you move to Florida — shop before you register, not after. We are not a national chain that parachutes in for PCS season and disappears in September. We are local, we are here year-round, and we know these neighborhoods, gate traffic patterns, and the difference between a Niceville ranch and a Destin condo. Call (850) 842-1962 when you have orders in hand.',
      },
    ],
    faq: [
      {
        question: 'Do you handle PPM/DITY moves for military families?',
        answer:
          'Yes. We provide proper invoices and documentation that meet military PPM requirements. Contact your TMO at Eglin or Hurlburt before booking to confirm your entitlements.',
      },
      {
        question: 'How far in advance should I book a PCS move to Eglin or Hurlburt?',
        answer:
          'As soon as you have your report date. PCS season (May through August) is our busiest period. We hold tentative dates while you confirm housing.',
      },
      {
        question: 'Do you offer receiving services when my HHG shipment arrives?',
        answer:
          'Yes. We can be present when your government-contracted HHG truck arrives, direct furniture placement, document damage, and handle overflow storage if your housing is not ready.',
      },
      {
        question: 'What neighborhoods near Eglin AFB do military families typically prefer?',
        answer:
          'Niceville and Crestview for families prioritizing schools and space. Fort Walton Beach and Shalimar for proximity to Hurlburt Field. Destin and Miramar Beach for those with more flexible housing budgets.',
      },
    ],
  },
  {
    slug: 'how-to-move-a-beach-condo-emerald-coast',
    title: 'How to Move Into (or Out of) a Beach Condo on the Emerald Coast',
    description:
      'Moving into or out of a beach condo in Destin, Panama City Beach, or 30A? Here is how to handle elevators, HOA freight rules, parking decks, and seasonal chaos.',
    datePublished: '2026-03-18',
    author: 'Beach House Moving',
    heroImage: '/images/move-pcb.jpg',
    heroAlt:
      'Beach House Moving truck staged for a Panama City Beach condo move along the Gulf coast',
    relatedServices: [
      { label: 'Local Moving', href: '/services/local-moving' },
      { label: 'Delivery Services', href: '/services/delivery' },
    ],
    excerpt:
      'Beach condos on the Emerald Coast have a specific set of logistics that most moving checklists skip entirely. Elevators, parking decks, HOA freight rules, and seasonal timing all matter.',
    body: [
      {
        paragraph:
          'Beach condos are a different category of move from a single-family home — and most generic moving advice was not written for them. Mid-rise and high-rise buildings along Destin\'s Emerald Coast Parkway near Henderson Beach State Park, and along Panama City Beach\'s Front Beach Road and Thomas Drive — Heron Cove, Tidewater, Emerald Isle, and dozens of similar towers — have freight elevators, loading docks, and HOA management offices that control every detail of how a move happens. What time you arrive, which elevator you use, whether floor protection is required, and where the truck parks are all decided before we carry the first box. What you need to know before move day is not complicated, but skipping any one step can add hours.',
      },
      {
        heading: 'Reserve the Freight Elevator First — Everything Else Second',
        paragraph:
          'Most Destin and PCB condo buildings have one service elevator shared by every resident moving in, moving out, and every vacation-rental turnover contractor hauling furniture. It must be reserved through the HOA or property management before move day — not the morning of. Reservation windows are typically two to four hours and fill up weeks in advance, especially January through April when snowbirds rotate and summer when lease turnovers peak. If you arrive on move day without a reservation, you are using passenger elevators with other residents, which slows everything by hours and may violate HOA rules that carry fines.',
      },
      {
        paragraph:
          'Call the property manager before you call us. Ask for the freight elevator reservation form, the permitted move window, and whether padding is required inside the elevator cab. Some Destin buildings on Holiday Isle require management to escort movers to the unit. Others along Crystal Beach allow self-service access with a fob issued the morning of. We have seen both. The reservation confirmation email is something we ask for when you book — it tells us whether we need a two-hour crew or a four-hour crew and whether a second trip is likely.',
      },
      {
        heading: 'Parking Decks and Truck Clearance',
        paragraph:
          'Many Destin and PCB condo parking structures have seven- to eight-foot clearance. A standard box truck is nine to ten feet tall. That mismatch means we bring the Sprinter van for buildings with low-clearance garages, or we coordinate with building management on street-side loading zones while the box truck stays on the surface lot. Share your building address with us before booking — we check clearance and access before we commit to a quote, not after we arrive with the wrong vehicle.',
      },
      {
        paragraph:
          'Front Beach Road buildings in PCB often have loading zones that overlap with tour-bus staging on summer weekends. Destin addresses along Henderson Beach Road may require coordination with the resort\'s security gate for commercial vehicle entry. Thomas Drive on the east end of PCB generally has better truck access for buildings on that side of the peninsula than beachfront towers with shared vacation-rental turnover parking. These details change the price and the timeline — we would rather tell you upfront than surprise you on move day.',
      },
      {
        heading: 'HOA Rules Are Not Suggestions',
        paragraph:
          'Common HOA restrictions for Emerald Coast condos include move-in and move-out hours limited to Monday through Saturday, 8 a.m. to 5 p.m. — no Sundays, no evenings. Elevator padding is required in most buildings; we carry our own pads and blankets. Protective floor coverings in hallways are required in buildings with carpet or polished tile; we carry runners and corner guards as standard equipment. Some associations require a damage deposit held by the HOA before movers can start — typically a refundable check released after management inspects the common areas.',
      },
      {
        paragraph:
          'Have your property manager\'s direct contact and a copy of your HOA move-in agreement ready when you request a quote. If the document says movers must sign in at the front desk and wear shoe covers in the lobby, we need to know that before we assign the crew. We have been turned away from PCB buildings because a previous tenant\'s movers damaged an elevator and the HOA now requires a pre-move walkthrough. That walkthrough takes fifteen minutes if we know about it in advance and ninety minutes if we discover it when the truck is already loaded.',
      },
      {
        heading: 'What Happens When the Elevator Breaks',
        paragraph:
          'Freight elevators break more often than you would expect, especially in older Destin buildings from the 1980s and 1990s along the Gulf. When the service elevator goes down on move day, we have carried furniture up stairwells to the eighth floor. We are not going to pretend that is ideal — it takes longer, it costs more, and your back hurts regardless of who is doing the carrying. But we will tell you upfront if it becomes necessary, give you a revised time estimate, and get it done. What we will not do is abandon a job because the logistics got harder or leave your furniture in a truck while you figure out Plan B alone.',
      },
      {
        heading: "Furniture That Won't Fit",
        paragraph:
          'Beach condos are smaller than they look in listing photos. Wide-angle lenses make a 900-square-foot unit feel like 1,400. A California king bed frame often will not make the turn into a condo bedroom with a standard hallway width. A sectional sofa that worked in a suburban home in Ohio rarely fits in a Destin condo living room with a balcony slider occupying one entire wall. We measure doorways, hallways, and elevator interior dimensions before the move when you give us the building address and unit number.',
      },
      {
        paragraph:
          'For pieces that will not make it, we recommend consignment shops in Destin and Fort Walton Beach that take quality furniture — better than paying to move something into storage you will never use. We can also coordinate same-day removal for items you decide to leave behind. The conversation about what fits should happen at the quote stage, not when we are standing in the freight elevator with a dresser that is two inches too wide.',
      },
      {
        heading: 'Panama City Beach Specifics',
        paragraph:
          'PCB has higher-density condo development than 30A or central Destin. Front Beach Road is slow and congested year-round — not just summer — because tourism traffic and local commuters share the same two lanes. Thomas Drive on the east end has better truck access for buildings on that side of the peninsula, particularly near St. Andrews State Park. If your building sits directly on the beachfront, confirm with management whether the loading area is shared with vacation-rental turnovers. Saturday summer move-ins compete with checkout cleaning crews, luggage carts, and ride-share drop-offs in the same parking lane.',
      },
      {
        heading: 'Seasonal Strategy',
        paragraph:
          'January through March is the best window to move into or out of a beach condo on the Emerald Coast. Rental turnover is lower, parking is available, and building management offices respond faster because they are not managing peak-season chaos. If you are moving during a holiday weekend in summer — Memorial Day, Fourth of July, Labor Day — expect delays, restricted access, and higher congestion on every road between the truck and the freight elevator. We can still make it work. We just need more lead time, an confirmed elevator reservation, and a realistic start time.',
      },
      {
        paragraph:
          'The more information we have before move day, the smoother the job goes. Give us the building name, unit number, and HOA contact when you request a quote. We will verify clearance, elevator availability, and staging options before you commit. Call (850) 842-1962.',
      },
    ],
    faq: [
      {
        question:
          'Can you move furniture into a high-rise condo in Destin or Panama City Beach?',
        answer:
          'Yes. We handle freight elevator coordination, HOA paperwork, parking deck access, and floor protection. Share your building address when requesting a quote so we can verify access details before move day.',
      },
      {
        question: "What if my condo's freight elevator is not available on my move date?",
        answer:
          'We have done stairwell carries in Emerald Coast buildings when elevator access fell through. We will give you an honest time estimate and get the job done. We will not leave you in a situation where your furniture is in a truck and your condo is empty.',
      },
      {
        question: 'Do you provide the elevator pads and floor protection required by my HOA?',
        answer:
          'Yes. We carry furniture blankets, elevator pads, and hallway floor protection on every job. If your HOA has specific requirements, send us the document and we will confirm we meet them before move day.',
      },
    ],
  },
]
