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
  'design-trade-installation': ['mounting-installation', 'delivery'],
  'mounting-installation': ['design-trade-installation', 'delivery'],
  'loading-unloading-help': ['local-moving', 'packing-unpacking'],
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
          'We pack whole homes, or just the rooms nobody wants to face — the kitchen, the garage, the china cabinet — and [a documented kitchen pack in Inlet Beach](/resources/field-notes-inlet-beach-pack-day) walks through one of those days box by box. All materials supplied: boxes, paper, tape, and the dish packs and wardrobe boxes that actually protect what matters.',
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
          "Washers, dryers, refrigerators — we deliver, place, and hook up. The box trucks carry hydraulic lift gates, which is what gets a 300-pound appliance off the truck and up an elevated beach home's stairs without drama. Fixtures get the same treatment — freestanding tubs and other oversized pieces are carried in and set in place for the plumber who follows, as [a documented tub delivery in Seacrest Beach](/resources/field-notes-freestanding-tub-delivery-seacrest-beach) shows.",
        ],
      },
      {
        heading: 'Store pickups and estate pieces',
        body: [
          "Bought furniture locally and the store doesn't deliver on your timeline? Found a marketplace piece across the county? Handling a single estate item that needs more care than a pickup truck and two friends? We coordinate the pickup, protect the piece, and place it where it goes — the same routine as [a documented install day on 30A](/resources/field-notes-30a-install-day-design-dwell), scaled up to a truckload of new furniture.",
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
  'design-trade-installation': {
    fullDescription:
      'Receiving, delivery, and installation for interior designers on the Emerald Coast. We take furnishings from the showroom, the freight terminal, or a receiving warehouse, bring them to the house, uncrate them, and set them where the design says they go — then haul the crates and packing material away so the room photographs clean.',
    heroTitle: 'Design Trade Delivery & Installation on the Emerald Coast',
    sections: [
      {
        heading: 'What a design-trade install day looks like',
        body: [
          "It is not a move, and treating it like one is how furnishings get damaged. There is no inventory list from a homeowner, no boxes labeled by room, and usually no homeowner on site. There is a designer, a plan, a house that may still have trades working in it, and a truckload of pieces that each have exactly one right place to end up.",
          "We work off the designer's plan. Pieces come off the truck in the order the rooms get set, not the order they were loaded. Everything is uncrated, checked, placed, and adjusted until the designer signs off — and the crates, blankets, and cardboard leave with us.",
          "We wrote up a week of this work — drapery in Santa Rosa Beach for Tracery Interiors, art for Lily Pads Interiors in Niceville, and a furniture install in Burnt Pine — in [a week of design trade installs](/resources/field-notes-design-trade-install-week-emerald-coast).",
        ],
      },
      {
        heading: 'Receiving is the part most people skip',
        body: [
          "An owner-supplied piece has usually had a life before install day. It came off a freight truck, sat in a garage or a spare room while other trades worked around it, and got moved at least once by someone who was not thinking about it. A chip found after delivery is nearly impossible to assign to anyone once the crate is gone.",
          "So we uncrate and look at the piece before it moves, with the designer's rep there when someone is on site, and note anything we find in writing. It costs ten minutes and it has settled more than one conversation that would otherwise have come down to two people remembering a crate differently.",
        ],
      },
      {
        heading: 'Final touches — art, mirrors, and soft goods',
        body: [
          "The last hour of an install is what the client actually sees. Framed art and mirrors get hung to the designer's marks, and we supply the hanging hardware when the piece did not come with the right kind. Drapery panels get handled and hung so nothing is creased or dragged across a finished floor. Rugs get set and furniture gets walked onto them rather than dragged.",
          "Keith is our installer, and anything that gets mounted or built goes past him first — he looks at the actual wall before we commit to it. A confident answer about a mount from someone who has not seen the space is worth nothing, and the failure mode is a television on the floor.",
          "This is the work that turns a delivered room into a finished one, and it is the reason designers book a crew rather than a delivery service.",
        ],
      },
      {
        heading: 'Installing into a house that is not finished',
        body: [
          "Most trade work on 30A and in Miramar Beach happens in homes that are not done. The subfloor is exposed and every screw head is a hazard for anything with a finished bottom. Trim is in but unpainted, so a scuff is a callback for the painter. Gate codes at the gated communities change, and a crew sitting at a gate is burning the job's hours.",
          "We ask for the code, the contact actually on site, and where we can park before the truck rolls. We bring our own floor protection rather than assuming the builder's is where we need it, and we do not leave anything in a traffic path for another trade to work around.",
        ],
      },
      {
        heading: 'Where our line is',
        body: [
          "We place, hang, mount, and set. We do not make plumbing or electrical connections — those are licensed trades in Florida and our mover registration covers moving your belongings, not wiring a sconce or connecting a waste line. Scheduling us ahead of those trades, rather than alongside them, is what keeps an install day short.",
        ],
      },
    ],
    faqs: [
      {
        q: 'Do you work directly with interior designers?',
        a: 'Regularly. We handle receiving, delivery, and install days for design firms across Walton and Okaloosa Counties — including work for Tracery Interiors in Santa Rosa Beach, Lily Pads Interiors in Niceville, Home at Ease Interiors, and Design & Dwell Homes. We invoice the firm or the client, whichever the designer prefers.',
      },
      {
        q: 'Can you pick up from a showroom, warehouse, or freight terminal?',
        a: 'Yes. Showroom to site, receiving warehouse to site, and freight terminal to site are standing services, not favors. Give us the pickup contact and the window and we will coordinate it directly.',
      },
      {
        q: 'Do you hang art and mirrors, and do you supply the hardware?',
        a: 'Yes to both. Framed art, mirrors, and similar wall pieces get hung to the designer’s marks as part of an install, and we supply the hanging hardware when the piece did not come with what it needs. Keith looks at the wall before we commit to a mount. Anything electrical or plumbed is a licensed trade and we schedule around them rather than doing their work.',
      },
      {
        q: 'What happens to the crates and packing material?',
        a: 'They leave with us. A finished room with a pile of cardboard in the corner is not a finished room, and hauling debris is something we already do every week.',
      },
      {
        q: 'How is a design-trade install priced?',
        a: 'It depends on the piece count, the access, and how much of the day is receiving versus placement. Call (850) 842-1962 with the scope and we will quote it straight.',
      },
    ],
  },
  'loading-unloading-help': {
    fullDescription:
      'You rent the truck or container; we do the rest of it. Load it, drive it, unload it, or any part of that on its own — with the same wrapping, padding, and load discipline we use on our own trucks. Most people call us for the unload. Plenty end up handing over the whole thing.',
    heroTitle: 'U-Haul & Rental Truck Help on the Emerald Coast',
    sections: [
      {
        heading: 'When your own rental is the right call',
        body: [
          "Plenty of moves do not need a moving company's truck. You rented a U-Haul because the drive is the cheap part, or a container is already sitting in your driveway, or you are moving one household across town in two trips and would rather not pay for a truck you are not using. What you actually need is people who do this every day, for the hours that matter.",
          "So we work around whatever you have already committed to. No truck charge on our side, and no minimum you did not ask for.",
          "Military families doing a PPM or DITY move are a big share of this work, because the entitlement is built around exactly this arrangement — see the [PCS guide for Eglin and Hurlburt](/resources/pcs-move-eglin-afb-hurlburt-field-guide) for how the reimbursement side works.",
        ],
      },
      {
        heading: 'A rental truck loaded badly is a rental truck that damages things',
        body: [
          "The most common reason a DIY move goes wrong is not the driving — it is a load that shifts. Furniture goes in blanket-wrapped, not bare against a corrugated wall. Weight goes low and forward. Tiers get built and tied off so nothing is free to move on the first hard stop on US-98.",
          "Unloading has its own version of the same problem: a couch walked up an exterior stair by two people who have not done it before is how railings and door casings get destroyed. We bring the straps, dollies, and pads, and the crew size the access actually needs.",
        ],
      },
      {
        heading: 'Containers, trailers, and pods',
        body: [
          "Portable containers load differently than a truck — tighter, taller, and with no ramp — and they punish a loose pack because they get lifted and set down again. We load them to be lifted. If a container is being delivered to your driveway on a schedule you do not control, tell us the window and we will work around it.",
        ],
      },
      {
        heading: 'What we need to know before we show up',
        body: [
          "Truck or container size, how many flights of stairs at each end, how far the walk is from the door to where the rental can legally sit, and whether anything is oversized — a gun safe, a piano, a treadmill, an oversized sectional. Those four answers set the crew size, and a crew one person short does not mean a slower day, it means something gets dropped.",
        ],
      },
      {
        heading: 'We can drive it too',
        body: [
          "This is the part people do not expect. If you have rented the truck but do not want to drive a 20-footer down US-98, we will take the wheel. Load, drive, unload — the whole job on a truck that is not ours. Or just the unload at the far end if that is all you need.",
          "It comes up more than you would think. Somebody rents the truck to save money and then realises they are about to back a box truck into a beach-house driveway they have never seen. Somebody's move-out and their closing land on the same morning. Somebody just does not want to drive it. Any of those is a phone call.",
          "One thing worth settling when you book rather than on move morning: whose name is on the rental agreement and who it authorises to drive. Tell us what you have rented and we will tell you what the job needs.",
        ],
      },
    ],
    faqs: [
      {
        q: 'Can you help unload a U-Haul or PODS container I already rented?',
        a: 'Yes. Loading and unloading U-Haul, Penske, Budget, PODS, and rental trailers is standard work for us across Walton, Okaloosa, and Bay Counties. You keep the rental; we bring the crew, the pads, the straps, and the dollies — and we can drive it as well if you would rather not.',
      },
      {
        q: 'Are you licensed and insured for work on my own rental truck?',
        a: 'Yes — same license and coverage as every job we take. Florida Mover Registration #IM4125, licensed and insured, and the crew is owner-operated rather than day labor pulled off an app.',
      },
      {
        q: 'How much does help with my rental truck cost?',
        a: 'It comes down to crew size, the access on your end, how long the load will take, and whether we are driving. Call (850) 842-1962 with the truck size and the stair count and we will give you a straight number.',
      },
      {
        q: 'Will you drive my rented U-Haul?',
        a: 'Yes. We can load it, drive it, and unload it, or do any one of those on its own. It is a common request — people rent the truck to save money and then would rather not drive a 20-footer down US-98 or reverse it into a beach-house driveway. Worth settling when you book: whose name is on the rental agreement and who it authorises to drive. Tell us what you rented and we will sort it before move day.',
      },
      {
        q: 'Can you do the whole move on a truck I rented?',
        a: 'Yes — load, drive, and unload on your rental. You pay the rental company for the truck and us for the work. Whether that beats booking the move on our own truck depends on the distance and the size of the load, and we will tell you honestly which way comes out better rather than steering you to whichever suits us.',
      },
      {
        q: 'Can you do it same day?',
        a: 'Sometimes. Rental-truck jobs tend to come up on short notice and we keep room for them when we can. Call and ask — the answer is either yes or a specific alternative, not a maybe.',
      },
    ],
  },
  'mounting-installation': {
    fullDescription:
      'TV mounts, art, mirrors, and shelving — hung level, anchored into something that will actually hold, with the hardware supplied when you do not have it. Keith is our installer and he looks at the space in person before we commit to mounting anything, because the wall decides what is possible, not the catalog.',
    heroTitle: 'TV Mounting, Art Hanging & Shelf Installation',
    sections: [
      {
        heading: 'What we mount',
        body: [
          'Televisions, including taking down an existing mount and replacing it. Art, mirrors, and framed pieces, with the hanging hardware supplied when the piece did not come with the right kind. Shelving and similar builds, once we have seen the wall.',
          'Most of this comes up on a move or an install day — the TV comes off the wall at the old house and goes back up at the new one, or a designer needs art up before the client walks in. It is also a standalone call. You do not need to be moving to book it.',
          'A lot of the hanging we do runs alongside [design trade delivery and installation](/services/design-trade-installation) for the firms we work with. There is a write-up of what that looks like in practice in [a week of design trade installs](/resources/field-notes-design-trade-install-week-emerald-coast).',
        ],
      },
      {
        heading: 'Keith looks first',
        body: [
          'Keith is our installer and he has the final say on what we can safely mount or build once he has seen the actual space. That is not a hedge, it is the whole job. A mount is only as good as what is behind the drywall, and coastal construction here runs the gamut — wood stud, metal stud, block, plaster over lath in the older places, and the occasional wall that is mostly window.',
          'So we look before we quote a mount. Anyone who commits to a TV mount over the phone without asking what the wall is made of is guessing with your television.',
        ],
      },
      {
        heading: 'Why the wall matters more than the bracket',
        body: [
          'A 65-inch television on a full-motion arm puts a few hundred pounds of leverage on its anchors when the arm is extended. Into studs that is nothing. Into drywall anchors alone it is a countdown. Block walls, common in condos from Destin to Panama City Beach, need the right masonry anchor and a bit that will actually cut it — not a wood screw and optimism.',
          'The same logic runs smaller. A heavy mirror over a console is a two-point hang into something solid, not a single nail. We would rather tell you a wall will not take what you want than hang it and hope.',
        ],
      },
      {
        heading: 'Where our line is',
        body: [
          'We mount and we build. We do not run wire inside a wall, move an outlet, or make any electrical or plumbing connection — those are licensed trades in Florida and our mover registration does not cover them. If your TV needs an outlet moved behind it, that is an electrician before us, and we will happily work around their schedule.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Do you mount TVs?',
        a: 'Yes, including taking down an existing mount and replacing it. Keith, our installer, looks at the wall in person before we commit — a mount is only as good as what is behind the drywall, and it is not something to guess at over the phone.',
      },
      {
        q: 'Do you supply the mounting hardware?',
        a: 'We supply hanging hardware for art and mirrors when the piece did not come with the right kind. For a television, tell us the mount you have or want and the size of the set and we will tell you what else the job needs.',
      },
      {
        q: 'Can you hang art and mirrors without a full move?',
        a: 'Yes. Mounting and installation is a standalone call, not something you have to bundle with a move. It is common work for us on design install days and for homeowners who have just moved in and have a wall of art still leaning against it.',
      },
      {
        q: 'What if the wall will not hold what I want mounted?',
        a: 'We tell you before we drill. Keith has the final say on what we can safely mount or build once he has seen the space, and a straight no is a better outcome than a television on the floor. Where there is a workable alternative — a different position, a different anchor, a different mount — we will lay it out.',
      },
      {
        q: 'Do you do electrical work for a TV mount?',
        a: 'No. Running wire inside a wall or moving an outlet is licensed electrical work in Florida and outside our mover registration. Get an electrician in first and we will schedule the mount around them.',
      },
      {
        q: 'How much does TV mounting or art hanging cost?',
        a: 'It depends on the wall, the piece, and how many of them there are. Call (850) 842-1962 and describe the job — Keith will need to see the space before we commit to a mount, and we would rather give you a real number than a phone guess.',
      },
    ],
  },
}
