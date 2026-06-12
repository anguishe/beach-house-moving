/** Related service slugs for cross-links on service detail pages. */
export const SERVICE_RELATED: Record<string, readonly string[]> = {
  'residential-moving': ['packing-unpacking', 'storage'],
  'local-moving': ['packing-unpacking', 'delivery'],
  'long-distance-moving': ['storage', 'packing-unpacking'],
  'packing-unpacking': ['residential-moving', 'local-moving'],
  storage: ['long-distance-moving', 'military-pcs-moving'],
  delivery: ['local-moving', 'junk-removal'],
  'military-pcs-moving': ['long-distance-moving', 'storage'],
  'junk-removal': ['delivery', 'local-moving'],
}

/** Long-form service copy — keyed by slug; kept separate from SERVICES for lean page bundles. */
type ServiceDetail = {
  fullDescription: string
  heroTitle?: string
  sections?: { heading: string; body: string[] }[]
  faqs?: { q: string; a: string }[]
}

export const SERVICE_DETAILS: Record<string, ServiceDetail> = {
  'residential-moving': {
    fullDescription:
      'Across the street or across the county, we handle the whole move — wrap and pad the furniture, protect your floors and door frames, load it tight, and set it back up at the new place. Licensed, insured, and used to coastal homes with stairs and tight access.',
    heroTitle: 'Residential Movers on the Emerald Coast',
    sections: [
      {
        heading: 'How a residential move with us works',
        body: [
          'Every move starts with a real conversation, not a form letter. We talk through your home — rooms, stairs, access, anything fragile or odd-shaped — and confirm the details in writing before move day. No surprises is the whole point.',
          'On move day, the owners show up with the truck. We pad and wrap the furniture, protect floors and door frames, load it tight so nothing shifts, and set everything back up room by room at the new place. The people who quoted your move are the people carrying your dresser.',
        ],
      },
      {
        heading: "What's different about moving homes here",
        body: [
          'Coastal construction means stairs. Most homes from 30A to Panama City Beach are elevated, so stair carries are the norm for us, not a surcharge surprise. We bring the equipment and the crew size the access actually requires.',
          "Gated communities along 30A hold trucks at the gate until your name is on the list — we handle that coordination ahead of time. For tight streets and boardwalk-only properties, the Sprinter van does what a box truck can't.",
        ],
      },
      {
        heading: 'What affects how long your move takes',
        body: [
          "Home size, stair count, how far the truck can park from your door, and how packed-up you are when we arrive. We're honest about all four on the quote call, because an accurate window beats a lowball that blows up on move day.",
        ],
      },
    ],
    faqs: [
      {
        q: 'Do the owners actually do the move?',
        a: 'Yes. Beach House Moving is owner-operated — the four of us who own the company are the crew on your job. No day labor, no subcontractors, no strangers.',
      },
      {
        q: 'How far in advance should I book?',
        a: "A week or two ahead is comfortable for most local moves. Summer Saturdays and end-of-month dates fill first. Short notice? Call anyway — we're available 24/7 and we'll tell you straight what we can do.",
      },
      {
        q: 'How do you protect furniture and floors?',
        a: "Furniture gets blanket-wrapped and padded before it moves an inch. Floors, stair rails, and door frames get protection at both houses. It's standard on every job, not an upgrade.",
      },
      {
        q: 'Can you handle stairs and elevated beach homes?',
        a: "That's most of our work. Elevated homes, third-floor walk-ups, and tight stairwells are everyday jobs for a crew on the Emerald Coast — we plan the carry before we lift anything.",
      },
      {
        q: "Is there anything you won't move?",
        a: "Hazardous materials — propane tanks, gasoline, paint, and chemicals — can't go on the truck. We'll flag anything else on the walkthrough so nothing gets left to the last minute.",
      },
      {
        q: 'Do I need to empty my dressers?',
        a: "Lightweight clothing can usually stay in sturdy dressers for local moves. Anything heavy, breakable, or in a fragile piece should come out — we'll tell you which is which when we see the furniture.",
      },
    ],
  },
  'local-moving': {
    fullDescription:
      'We run the 30A corridor and the greater Emerald Coast every day, so we know the beach-access routes, the gated-community rules, and which driveways need the van instead of the truck. Billed by the hour, no hidden fees, fuel included in the quote.',
    heroTitle: 'Local Movers on 30A & the Emerald Coast',
    sections: [
      {
        heading: 'How local moves are billed',
        body: [
          'Local moves are billed hourly — crew and truck, with an honest clock. No fuel surcharges, no stair fees that appear on the invoice, no hidden line items. We tell you the realistic hour range on the quote call and we work to beat it, because the fastest move is also the best review.',
          "What moves the number: home size, stairs, walk distance from truck to door, and packing readiness. If you want to keep hours down, we'll tell you exactly how on the phone.",
        ],
      },
      {
        heading: 'Why 30A moves take local knowledge',
        body: [
          "Half the homes on 30A can't take a 26-foot truck at the door. Boardwalk-only access, alley-loaded carriage homes in Rosemary Beach, and pedestrian streets in Seaside mean the right vehicle matters — that's why we run a Sprinter van alongside the box trucks.",
          "Gated communities want a gate list. Alys Beach expects floor protection on those white finishes. Grayton sometimes means staging with carts. We've done these streets enough times that none of it slows us down — and none of it costs you a surprise.",
        ],
      },
      {
        heading: 'No move too small',
        body: [
          "Single rooms, in-building shuffles, moving furniture between a rental and storage — small jobs get the same crew and the same care. If it's faster to quote it flat over the phone, we will.",
        ],
      },
    ],
    faqs: [
      {
        q: 'How is a local move priced?',
        a: 'Hourly, based on crew size and the truck the job needs. You get the rate and a realistic hour range up front, in writing. No fuel surcharges, no hidden fees.',
      },
      {
        q: 'Can you move me this week?',
        a: "Often, yes. We're available 24 hours a day, 7 days a week, including weekends. Call (850) 842-1962 and we'll give you a straight answer on dates.",
      },
      {
        q: 'Do you do moves within the same building or complex?',
        a: 'All the time — condo to condo, unit to unit, or just rearranging between floors. Small jobs are welcome.',
      },
      {
        q: 'Do you bring all the equipment?',
        a: "Dollies, blankets, straps, floor protection, and the right truck for your access. You don't need to rent or supply anything.",
      },
      {
        q: 'How can I keep my hours down?',
        a: 'Be boxed and sealed before we arrive, clear a parking spot as close to the door as possible, and tell us about stairs and gates in advance so we bring the right setup. Those three things save more time than anything else.',
      },
      {
        q: 'Do you handle last-minute and same-day moves?',
        a: 'When the schedule allows, yes — being owner-operated and on call 24/7 means we can say yes more often than a dispatcher can. Call and ask.',
      },
    ],
  },
  'long-distance-moving': {
    fullDescription:
      "Moving out of the area takes coordination — we plan the timeline, load it to travel safely, and keep you posted along the way. Same crew, same care you'd get on a local job, just a longer drive.",
    heroTitle: 'Long-Distance Movers Serving the Florida Panhandle',
    sections: [
      {
        heading: 'How long-distance pricing works',
        body: [
          'Unlike local moves, long-distance jobs get a fixed written quote — based on your inventory and the miles, settled before the truck rolls. The number you sign is the number you pay.',
          'We move people out of the Panhandle and into it: Walton, Okaloosa, and Bay County origins or destinations, with the rest of the route handled start to finish.',
        ],
      },
      {
        heading: 'Your move is never brokered out',
        body: [
          "A lot of long-distance moving is brokered — the company you hired sells your job to a carrier you've never met. We don't do that. Beach House Moving is the company on the phone, the crew that loads your home, and the name on the truck that delivers it. We carry full liability and cargo insurance under Florida Mover Registration #IM4125.",
        ],
      },
      {
        heading: 'Storage between homes',
        body: [
          "Closing dates rarely line up. If there's a gap between leaving one home and getting keys to the next, we can hold your household in secure storage and deliver when you're ready — one crew, one point of contact, the whole way.",
        ],
      },
    ],
    faqs: [
      {
        q: 'How is a long-distance move priced?',
        a: "Fixed written quote based on your inventory and the distance. We walk the home (in person or by video), put the number in writing, and that's the number.",
      },
      {
        q: 'How long until my things are delivered?',
        a: "It depends on the route, and we'll put the delivery window in your written quote rather than guessing here. What we won't do is leave your household sitting on a dock waiting for a partner carrier — because there isn't one.",
      },
      {
        q: 'Do you broker moves to other companies?',
        a: 'No. The crew that loads is our crew, and the job stays ours door to door.',
      },
      {
        q: 'Is my furniture insured in transit?',
        a: 'Yes — full liability and cargo insurance, required and verified under our FDACS Florida Mover Registration #IM4125. You can verify the registration yourself on the FDACS website.',
      },
      {
        q: 'Can you store my things between closings?',
        a: 'Yes. Short-term storage between homes is one of the most common things we do on long-distance jobs — we load once, hold it securely, and deliver on your date.',
      },
      {
        q: 'Do you move vehicles?',
        a: "No — we move household goods. For cars, you'll want a dedicated auto transport company; we're happy to coordinate timing around it.",
      },
    ],
  },
  'packing-unpacking': {
    fullDescription:
      'We bring the boxes, paper, and bubble wrap, and we pack room by room so nothing rattles in the truck. Fragile stuff gets wrapped properly, not just tossed in a box. On the other end, we unpack and place it where you want it and haul the empty boxes away.',
    heroTitle: 'Packing & Unpacking Services — Walton, Okaloosa & Bay Counties',
    sections: [
      {
        heading: 'Full packing or just the hard parts',
        body: [
          'We pack whole homes, or just the rooms nobody wants to face — the kitchen, the garage, the china cabinet. All materials supplied: boxes, paper, tape, and the dish packs and wardrobe boxes that actually protect what matters.',
          'Everything gets labeled by room and contents, so unloading at the new house is placement, not archaeology.',
        ],
      },
      {
        heading: 'Packing for the coast',
        body: [
          'Humidity is real here. Boxes stored for weeks in a damp garage soften and fail under load, so we pack close to your move date, not a month out. Wood furniture gets breathable wrap rather than sealed plastic — trapping coastal moisture against a finish is how damage happens between houses.',
        ],
      },
      {
        heading: 'Unpacking and setup',
        body: [
          "On the other end we'll unpack room by room, set furniture where you want it, and haul away the empty boxes and paper. You get a home, not a cardboard maze.",
        ],
      },
    ],
    faqs: [
      {
        q: 'Do you pack the day before or the day of the move?',
        a: "For most homes, packing the day before keeps move day fast and predictable. Smaller homes can often be packed and moved the same day — we'll recommend the right split on your quote call.",
      },
      {
        q: 'Are packing materials included?',
        a: "Yes — boxes, paper, tape, dish packs, and wardrobe boxes are supplied as part of the packing service. You don't need to buy anything.",
      },
      {
        q: 'Can you pack just my kitchen?',
        a: "Absolutely. Partial packing is common — kitchens, garages, and fragile collections are the rooms we're most often asked to handle.",
      },
      {
        q: 'What about TVs and artwork?',
        a: "Flat screens, mirrors, and art get boxed or padded individually. Tell us about anything oversized or high-value on the call and we'll bring the right protection for it.",
      },
      {
        q: "Is there anything you won't pack?",
        a: "Chemicals, propane, gasoline, and other hazardous materials can't be packed or transported. For long-distance moves, perishable food stays behind too.",
      },
      {
        q: 'How long does packing take?',
        a: "It depends on the home and how full the closets really are — typically a half-day to a full day for an average house. We'll give you an honest window once we've seen or video-walked the home.",
      },
    ],
  },
  storage: {
    fullDescription:
      "Between closings, mid-renovation, or waiting on a rental to turn over — we've got secure storage on flexible terms. We document what goes in and get it back to you when you're ready.",
    heroTitle: 'Moving & Storage on the Emerald Coast',
    sections: [
      {
        heading: 'When storage makes sense',
        body: [
          "Closing dates that don't line up. A renovation that ran long. A home being staged to sell. A PCS family waiting on housing. Storage is the bridge between the home you're leaving and the one that isn't ready yet — and we handle both ends of it.",
        ],
      },
      {
        heading: 'One crew, start to finish',
        body: [
          "We load your household, transport it, store it securely, and deliver it when you're ready. You're not coordinating a moving company plus a storage facility plus a second moving company — it's one crew and one phone number the whole way, and everything is wrapped and padded before it goes into storage.",
        ],
      },
      {
        heading: 'Short-term or long-term',
        body: [
          "A week between closings or a season between houses — the service works the same. Tell us your dates and we'll build the move around them.",
        ],
      },
    ],
    faqs: [
      {
        q: 'How is storage priced?',
        a: "Based on how much you're storing and for how long. You'll get the storage cost in writing with your moving quote — one number, no surprises mid-stay.",
      },
      {
        q: 'Is my furniture protected in storage?',
        a: 'Everything is blanket-wrapped and padded before it leaves your home, and it stays wrapped in secure storage until we deliver it.',
      },
      {
        q: 'Can I get my things back early?',
        a: "Yes — your schedule drives delivery. Call when you're ready and we'll set the date.",
      },
      {
        q: 'Is stored property insured?',
        a: 'We carry full liability and cargo insurance under FL Mover Registration #IM4125 — your household is covered with us from pickup through delivery.',
      },
      {
        q: 'Do you work with military families between housing?',
        a: 'Often. PCS timelines and base housing waitlists rarely cooperate — storage between the old address and the new one is one of the most common ways we help Eglin and Hurlburt families.',
      },
      {
        q: "What's the minimum storage term?",
        a: "There's no rigid minimum — a few days between closings is fine. Tell us the dates and we'll quote it straight.",
      },
    ],
  },
  delivery: {
    fullDescription:
      "New sofa, a fridge swap, a washer-dryer set, or one oversized piece up three flights — we deliver and place it, and we'll help with the hookup. Same care as a full move, scaled to one item.",
    heroTitle: 'Delivery & Single-Item Moving on the Emerald Coast',
    sections: [
      {
        heading: 'No job too small',
        body: [
          'One sofa up three flights. A fridge across town. A piano out of an estate. Single-item and small-load delivery is a real service for us, not a favor we squeeze in — same crew, same equipment, same care as a full move.',
        ],
      },
      {
        heading: 'Appliance delivery and hook-up',
        body: [
          "Washers, dryers, refrigerators — we deliver, place, and hook up. The box trucks carry hydraulic lift gates, which is what gets a 300-pound appliance off the truck and up an elevated beach home's stairs without drama.",
        ],
      },
      {
        heading: 'Store pickups and estate pieces',
        body: [
          "Bought furniture locally and the store doesn't deliver on your timeline? Found a marketplace piece across the county? Handling a single estate item that needs more care than a pickup truck and two friends? We coordinate the pickup, protect the piece, and place it where it goes.",
        ],
      },
    ],
    faqs: [
      {
        q: 'Will you really move just one item?',
        a: "Yes. Single items are a normal day for us — no minimums that force you to invent a bigger job.",
      },
      {
        q: 'Do you hook up appliances?',
        a: "Standard washer, dryer, and refrigerator hook-ups are part of the delivery. Anything requiring new plumbing or electrical work needs a licensed tradesman — we'll tell you which is which before we start.",
      },
      {
        q: 'Can you pick up from a furniture store?',
        a: "Yes — give us the store, the order, and your window, and we'll coordinate the pickup and delivery directly.",
      },
      {
        q: 'Can you carry it up to a condo?',
        a: "Stairs, elevators, and building escorts are everyday work here. Tell us the building and floor and we'll plan the carry — including reserving the service elevator where the building requires it.",
      },
      {
        q: 'Do you do same-day delivery?',
        a: 'When the schedule allows — and being available 24/7 means it often does. Call (850) 842-1962 with the details.',
      },
      {
        q: 'How is delivery priced?',
        a: "Simple flat or hourly pricing depending on the job, quoted up front over the phone. One item shouldn't need a site visit to price honestly.",
      },
    ],
  },
  'junk-removal': {
    fullDescription:
      'Clearing out before a move, after a renovation, or just reclaiming your space? Our junk removal crew hauls away furniture, appliances, debris, and more. Fast, affordable, and handled with the same professionalism as every job we take.',
  },
  'military-pcs-moving': {
    fullDescription:
      "PCS orders don't negotiate, so we don't make you. Beach House Moving plans military moves around the report date — short notice, odd hours, weekends — for families moving on or off base at Eglin AFB and Hurlburt Field, and anywhere across Walton, Okaloosa, and Bay Counties. Owner-operated, licensed (FL Mover Reg. #IM4125), insured, and available 24/7.",
    heroTitle: 'Military PCS Movers — Eglin AFB & Hurlburt Field',
    sections: [
      {
        heading: 'Built around your report date',
        body: [
          "A PCS move runs backward from one immovable date. We schedule that way — locking your move date first and working the load, the drive, and the delivery around it. Short-notice orders are normal here: we're available 24 hours a day, 7 days a week, because military moves don't keep business hours.",
          "We work both sides of the gate — out of base housing with its move-out inspection standards, into off-base rentals with their own landlord timelines, and every combination in between.",
        ],
      },
      {
        heading: 'PPM / DITY support that survives the paperwork',
        body: [
          "If you're running a personally procured move, your reimbursement lives and dies on documentation. We provide itemized, dated receipts on company paperwork for every service — exactly what your claim file needs — and we'll re-issue anything finance asks for twice. Confirm current PPM requirements with your TMO; their rules, their updates.",
        ],
      },
      {
        heading: 'Storage for the housing gap',
        body: [
          "Report date beats your housing date more often than not. When the waitlist or the closing slips, we load once, hold your household in secure storage, and deliver the day you get keys — one crew and one phone number across the whole gap, instead of three companies pointing at each other.",
        ],
      },
    ],
    faqs: [
      {
        q: 'Can you move us on short notice?',
        a: "Usually, yes. Short-notice PCS orders are a normal week for us — call (850) 842-1962 any hour and we'll give you a straight answer on your dates.",
      },
      {
        q: 'Do you work with base housing move-out inspections?',
        a: "Yes. We protect floors, door frames, and stair rails on the way out so the inspection finds the unit the way you want it found, and we work within the housing office's scheduling windows.",
      },
      {
        q: 'Do you provide receipts for PPM reimbursement?',
        a: 'Itemized, dated, on company paperwork — provided with every job, no chasing required. Verify current claim requirements with your TMO.',
      },
      {
        q: 'Can you store our household between addresses?',
        a: 'Yes — secure short-term storage between the old address and the new one is the most common way we help incoming Eglin and Hurlburt families. One load, one crew, delivered when you have keys.',
      },
      {
        q: 'Are you licensed for this?',
        a: 'Florida Mover Registration #IM4125, issued by FDACS — background checks, verified insurance, Florida Statute 507 compliance. Verify it yourself on the FDACS site.',
      },
      {
        q: 'Do you serve Hurlburt Field as well as Eglin?',
        a: 'Both, plus the towns base families actually live in — Fort Walton Beach, Niceville, Shalimar, Crestview, Valparaiso, Destin, and across all three counties.',
      },
    ],
  },
}
