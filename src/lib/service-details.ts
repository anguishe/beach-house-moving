/** Related service slugs for cross-links on service detail pages. */
export const SERVICE_RELATED: Record<string, readonly string[]> = {
  'residential-moving': ['packing-unpacking', 'storage', 'senior-downsizing-moves'],
  'local-moving': ['packing-unpacking', 'delivery'],
  'long-distance-moving': ['storage', 'packing-unpacking'],
  'packing-unpacking': ['residential-moving', 'local-moving'],
  storage: ['long-distance-moving', 'military-pcs-moving'],
  delivery: ['local-moving', 'junk-removal', 'heavy-item-moving', 'piano-moving'],
  'military-pcs-moving': ['long-distance-moving', 'storage'],
  'junk-removal': ['delivery', 'local-moving', 'estate-cleanouts'],
  'design-trade-installation': ['mounting-installation', 'delivery', 'vacation-rental-installs'],
  'mounting-installation': ['design-trade-installation', 'delivery'],
  'loading-unloading-help': ['local-moving', 'packing-unpacking'],
  "piano-moving": ["heavy-item-moving", "delivery"],
  "heavy-item-moving": ["piano-moving", "junk-removal"],
  "office-commercial-moving": ["delivery", "storage"],
  "estate-cleanouts": ["junk-removal", "senior-downsizing-moves"],
  "senior-downsizing-moves": ["estate-cleanouts", "packing-unpacking"],
  "vacation-rental-installs": ["design-trade-installation", "delivery"],
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
    heroTitle: 'Packing, Unpacking & Home Organizing on the Emerald Coast',
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
      {
        heading: 'Home organizing after the move',
        body: [
          'Yes, home organizing is one of our services. Kitchens, closets, pantries and garages get set up so the house works on day one, not three months from now.',
          'The owners quote organizing themselves, and it starts at our listed moving rate. Book it with your move or on its own.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Do you offer home organizing?',
        a: 'Yes. We set up kitchens, closets and the rest of the house after a move, or on its own. The owners quote it, and it starts at our listed moving rate.',
      },
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
    heroTitle: 'Moving Labor & U-Haul Help on the Emerald Coast',
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
        q: 'What are labor-only movers?',
        a: 'Labor-only movers bring the muscle and the know-how but not the truck. You rent the U-Haul, Penske, or PODS; we load it, drive it if you want, and unload it. You only pay for the help you need.',
      },
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
        a: 'When a crew is available, yes. We offer same-day help across all of our services, and rental-truck jobs often come up on short notice. Call (850) 842-1962: the answer is either yes or a specific alternative, not a maybe.',
      },
    ],
  },
  'mounting-installation': {
    fullDescription:
      'TV mounts, art, mirrors, and shelving — hung level, anchored into something that will actually hold, with the hardware supplied when you do not have it. Keith is our installer and he looks at the space in person before we commit to mounting anything, because the wall decides what is possible, not the catalog.',
    heroTitle: 'TV Mounting, Furniture Assembly & Art Hanging',
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
        heading: 'Furniture assembly, with or without a move',
        body: [
          'Yes, we assemble furniture on its own, not only as part of a move. Beds, home gyms, shelving and flat-pack pieces get built, leveled and placed where you want them, and the packaging leaves with us.',
          'There is no brand we are limited to. Tell us what it is and how many pieces when you call, and we will tell you straight how long it should take.',
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
        q: 'Do you assemble furniture without a move?',
        a: 'Yes. Beds, home gyms, shelving and flat-pack furniture, built and placed where you want it, with the boxes hauled off. Call (850) 842-1962 and tell us what you have.',
      },
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
  "piano-moving": {
    fullDescription:
      "We move all pianos, uprights, baby grands and full grands, across Santa Rosa Beach, 30A, Destin and the rest of the Emerald Coast. The owners do the lifting, on our own piano board, with the piano wrapped, padded and strapped. Stairs are fine.",
    heroTitle: "Piano Movers in Santa Rosa Beach, Destin & Along 30A",
    sections: [
      {
        heading: "Which pianos we move",
        body: [
          "We move all pianos: uprights, spinets, consoles, baby grands and full grands. If it has keys and it needs to go somewhere, call us.",
          "Stairs are fine. Elevated beach homes with exterior stairs are normal work for us, and we plan the carry before anyone lifts. We own a piano board, so your piano travels on the right equipment instead of a furniture dolly.",
        ],
      },
      {
        heading: "How we move a piano",
        body: [
          "A piano moves wrapped, padded and strapped to a piano board, with a crew sized to the access at both ends. An upright gets blanket-wrapped and strapped upright to the board. Grands normally travel with the legs and pedal lyre off, on their side on the board; that is the standard way, and we confirm the plan for your piano when we quote.",
          "Floors, door frames and stair rails get protection before the piano moves. In the truck it is strapped in place so nothing shifts on US-98. At the new place we set it where you want it, put a grand back on its legs, and take the padding with us.",
        ],
      },
      {
        heading: "Why moving a piano yourself is risky",
        body: [
          "A piano is heavy in a way furniture is not. Most of the weight is a cast-iron plate and a tensioned frame inside the case, and in an upright that weight sits high and toward the back, so it wants to tip once it leaves level ground.",
          "The small casters on most pianos are meant for nudging it along a wall, not rolling it across a room or down a ramp. On stairs, a piano that starts to slide cannot be caught by hand. Grand legs are not built for side loads and can snap if the piano is pushed on them. That is why the job takes a piano board, straps and people who have done it before.",
        ],
      },
      {
        heading: "Pianos on the Emerald Coast",
        body: [
          "Coastal homes add their own steps. Many houses along 30A and in Destin are elevated, condos often require a reserved service elevator and follow HOA move rules, and gated communities want our names on the list. Tell us about all of it on the call and we will handle the coordination.",
          "Humidity matters here too. Moving a piano into a new room changes its environment, so give it time to settle before you book a tuner.",
        ],
      },
    ],
    faqs: [
      {
        q: "How much does it cost to move a piano?",
        a: "Pianos are quoted after you tell us the type (upright, baby grand or grand), the stairs, and the access at both ends, because those set the crew and the time. Call (850) 842-1962 and we will give you a straight answer.",
      },
      {
        q: "Can you move a piano up or down stairs?",
        a: "Yes. Stairs are fine, including the exterior stairs on elevated beach homes. We use our own piano board, straps and padding, and we plan the carry before we lift. Tell us how many steps there are and whether there is a landing or a turn.",
      },
      {
        q: "Do you move grand and baby grand pianos?",
        a: "Yes, we move all pianos. Grands and baby grands normally travel wrapped and strapped on their side on a piano board, with the legs and pedal lyre off, and go back on their legs at the new place. We confirm the plan for your piano when we quote.",
      },
      {
        q: "Can I move a piano myself?",
        a: "We would not recommend it. Most of a piano's weight is an iron plate inside the case, so it tips easily, the casters are not built for real moving, and grand legs can snap under side pressure. On stairs, a sliding piano cannot be stopped by hand.",
      },
      {
        q: "Will my piano need tuning after the move?",
        a: "Usually, yes. A move and a new room change a piano's environment, and coastal humidity adds to that. Give it time to settle in its new spot, then book your tuner.",
      },
      {
        q: "Do you move pianos in Destin and along 30A?",
        a: "Yes. We are based in Santa Rosa Beach and move pianos across Walton, Okaloosa and Bay counties, including 30A, Destin, Miramar Beach and Panama City Beach. Navarre, Gulf Breeze, Pace and Milton are served when we have availability.",
      },
    ],
  },
  "heavy-item-moving": {
    fullDescription:
      "We move the heavy, awkward things most people should not try themselves: gun safes, hot tubs, pool tables, home gyms and more. The owners do the work, with dollies, ramps, straps, padding and liftgate trucks, across Santa Rosa Beach, 30A, Destin and the rest of the Emerald Coast.",
    heroTitle: "Gun Safe, Hot Tub & Pool Table Movers on the Emerald Coast",
    sections: [
      {
        heading: "Gun safes",
        body: [
          "We move gun safes between rooms, out of garages and closets, and to a new home. Before we quote, we need the make and model or the size, whether it is bolted to the floor, and the path out: stairs, thresholds, tight turns and the floor it rolls across.",
          "Empty it before move day. A full safe is heavier and the contents shift against the door and shelves. On our end, the safe gets padded and strapped to a dolly, floors and door frames get protection, and it rides a liftgate instead of being muscled up into the truck.",
        ],
      },
      {
        heading: "Hot tubs",
        body: [
          "We move hot tubs: across the yard, off a deck, out of the way of a renovation, or to a new home. If the tub is leaving for good, tell us on the call where it needs to go and we will talk it through.",
          "Two things need to happen before we arrive. The tub should be drained and dry, and the power should be disconnected by a licensed electrician. Then walk the route with us on the phone: gate widths, steps, the ground between the tub and the truck, and anything overhead. We bring dollies, ramps and straps sized to the job.",
        ],
      },
      {
        heading: "Pool tables",
        body: [
          "We move pool tables. The first question is whether the table is slate, because a slate table is far heavier than it looks and usually has to come apart before it can travel safely.",
          "Tell us the size, the brand if you know it, and where it is going. On the call we will go over how your specific table will be handled, and whether it makes sense to have a billiards technician re-level it once it is in its new room.",
        ],
      },
      {
        heading: "Home gyms and more",
        body: [
          "We move home gym equipment: Peloton bikes and treads, treadmills, ellipticals, racks, cable machines and weights. Pieces that will not fit through a doorway in one piece come apart and go back together at the new place.",
          "If the treadmill deck folds, fold and lock it if you can, and box loose plates and dumbbells. Beyond gyms, if something is heavy, awkward or headed up the exterior stairs of an elevated beach house, ask. That is the kind of job we take.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do you move a gun safe?",
        a: "Empty it first. We pad it, strap it to a dolly, protect floors and door frames, and load it with a liftgate. Before quoting we need the size or model, whether it is bolted down, and the route out, including stairs and thresholds.",
      },
      {
        q: "Can you remove a hot tub?",
        a: "Yes, we move hot tubs off decks, out of yards and to new homes. Have it drained and dry, with the power disconnected by a licensed electrician before we arrive. If the tub is leaving for good, tell us where it needs to go and we will talk it through.",
      },
      {
        q: "Does a pool table have to be taken apart to move it?",
        a: "Usually, if it is slate. Slate tables are much heavier than they look and travel safest in pieces. Tell us the size, whether it is slate, and where it is going, and we will explain how your table will be handled and whether it should be re-leveled after.",
      },
      {
        q: "Do you move Peloton bikes and treadmills?",
        a: "Yes. Pelotons, treadmills, ellipticals, racks and cable machines are all part of the job. Equipment that will not fit through a door in one piece gets taken apart and put back together at the new place.",
      },
      {
        q: "How much does it cost to move a heavy item?",
        a: "Heavy items are quoted after you tell us what the item is, the stairs, and the access at both ends, since those set the crew and the time. Call (850) 842-1962.",
      },
      {
        q: "Is there a weight limit on what you will move?",
        a: "We do not publish one. Give us the item, the make and model if you have it, and the access at both ends, and we will tell you on the call whether we can do it and what crew it needs.",
      },
    ],
  },
  "office-commercial-moving": {
    fullDescription:
      "We move offices, stores and other commercial spaces of any size across Destin, Fort Walton Beach, Santa Rosa Beach and the rest of the Emerald Coast. No move is too small or too big. After-hours and weekend moves are available at an added rate, so your business can keep its doors open.",
    heroTitle: "Office & Commercial Movers in Destin, Fort Walton Beach & 30A",
    sections: [
      {
        heading: "Office moves of any size",
        body: [
          "We move offices and commercial spaces of any size, from a single desk to a full floor. No move is too small or too big: a two-person real estate office, a retail store resetting its floor, a showroom changing locations, or a company moving across town.",
          "The owners are the movers, so the people who plan your move are the people carrying your filing cabinets. We are licensed and insured, Florida Mover Reg. #IM4125. Desks and furniture that need to come apart get taken apart and reassembled at the new space.",
        ],
      },
      {
        heading: "After-hours and weekend office moves",
        body: [
          "Yes, we can move your office after hours or on a weekend, at an added rate. For a lot of businesses that cost is worth it, because the office closes Friday and opens Monday with the desks already in place.",
          "We are available 24/7, so tell us when your business can afford to be closed and we will plan around it.",
        ],
      },
      {
        heading: "Commercial moves on the Emerald Coast",
        body: [
          "Most commercial moves here come down to access. Office buildings in Destin and Fort Walton Beach may require a reserved freight elevator or loading dock time. Strip centers along US-98 have busy lots. Home offices in condos and gated communities come with HOA move rules and gate lists.",
          "We bring dollies, padding, straps and liftgate trucks, and a Sprinter van for tight spots a box truck cannot reach. Tell us the building rules at both ends and we will work inside them.",
        ],
      },
      {
        heading: "A practical office move checklist",
        body: [
          "Start planning four to six weeks out for most office moves, sooner for a large one. These are the steps that keep a move on schedule.",
          "Six weeks out: confirm your move date and lease dates, then ask both buildings what they require from movers, such as elevator reservations, dock times or insurance paperwork. Book your mover and decide whether you need an after-hours or weekend move.",
          "Four weeks out: measure the new space and make a floor plan with every desk, cabinet and printer marked. Schedule your internet, phone and IT vendors for the new location. Order new signage and update your address with clients, vendors and your Google Business Profile.",
          "Two weeks out: assign one person on your team as the point of contact for the movers. Clear out old files and furniture you will not take. Start packing storage rooms and anything nobody uses day to day.",
          "The week of: label every box and piece of furniture with its room or desk number from the floor plan. Back up computers and have IT disconnect anything sensitive. Each employee packs their own desk.",
          "Move day: keep the floor plan at the new door so every piece goes straight to its spot. Do a walkthrough of the old space before you hand back the keys.",
        ],
      },
    ],
    faqs: [
      {
        q: "How much do office movers cost?",
        a: "Our published rate is $195 an hour for 2 movers, plus drive time. Office moves are quoted after we know the size of the space, the access at both ends and the timing. After-hours and weekend moves are available at an added rate. Call (850) 842-1962.",
      },
      {
        q: "Can you move our office after hours or on a weekend?",
        a: "Yes. After-hours and weekend office moves are available at an added rate, so your business does not have to close during the workday. We are available 24/7, so tell us the window you have and we will plan the move around it.",
      },
      {
        q: "Do you handle small office moves?",
        a: "Yes. No move is too small or too big. A few desks and a filing cabinet get the same owner crew and the same care as a full floor.",
      },
      {
        q: "How far ahead should we book an office move?",
        a: "Four to six weeks gives you time to sort out building rules, IT and a floor plan, and more lead time helps for a large office. Short on time? Call anyway. Same-day help is possible when a crew is available.",
      },
      {
        q: "Do you disconnect and set up computers?",
        a: "We move your equipment padded and handled with care, and we take apart and reassemble desks and office furniture. Have your IT person or vendor disconnect and reconnect computers, servers and networks, and back everything up before move day.",
      },
      {
        q: "Do you do commercial moves in Destin and Fort Walton Beach?",
        a: "Yes. We are based in Santa Rosa Beach and handle commercial moves across Walton, Okaloosa and Bay counties, including Destin, Fort Walton Beach, Miramar Beach and 30A. Navarre, Gulf Breeze, Pace and Milton are served when we have availability.",
      },
    ],
  },
  "estate-cleanouts": {
    fullDescription:
      "An estate cleanout clears a home's contents, all of it or just part, after a death, a move into care, or before a sale. We do them in Santa Rosa Beach, along 30A, in Destin and across the Emerald Coast. We move what the family keeps, take donations wherever you prefer, and haul away the rest, and the owners do the work themselves.",
    heroTitle: "Estate Cleanouts in Santa Rosa Beach, 30A & Destin",
    sections: [
      {
        heading: "What an estate cleanout is",
        body: [
          "An estate cleanout is the job of emptying a home after someone has died, moved into care, or decided to sell. It can be the whole house or one part of it. Sometimes the family has already taken what they want and needs the rest gone. Sometimes it is just a garage, an attic, or a storage room nobody has opened in years. We do both.",
          "Most cleanouts are really three jobs at once. Some pieces go to family, some go to donation, and some go away for good. We handle all three, so you are not coordinating three different crews. If a piece is headed to a relative out of state, we are licensed for interstate moves too.",
        ],
      },
      {
        heading: "How to clean out a house after a death",
        body: [
          "Start with papers and keepsakes, not furniture. Before anyone lifts a dresser, go through drawers, closets and boxes for documents, photos, jewelry, keys and anything with a family story attached. Those are the things that get lost when a house is cleared in a hurry.",
          "Then give family members time to claim what they want, and mark it clearly. Tape and a name works fine. If anything might be sold, settle that before donations go out. Make sure the person handling the estate has signed off on what leaves the house.",
          "Once those decisions are made, call us. We will move the keep pile to wherever it is going, drop donations where you choose, and clear what is left. There is no rush on our side. We would rather come back for a second day than push a family to decide before they are ready.",
        ],
      },
      {
        heading: "Where donations and everything else go",
        body: [
          "Donations go wherever you prefer. That might be a charity, a church, a shelter, a neighbor, or a friend who just set up a first apartment. Tell us where, and we will deliver it. Most charities have rules about what they accept and in what condition, so a quick call to them first saves a wasted trip.",
          "What cannot be donated or kept, we haul away. See our [junk removal](/services/junk-removal) page for how that works. Walton County's Bulk Waste Collection page has described a free monthly bulk pickup and free bulk drop-off at the county landfill for eligible residents. Eligibility and schedules vary, so check with the county before you plan around it.",
        ],
      },
      {
        heading: "Working with families, realtors and designers",
        body: [
          "We work with whoever is making the decisions. Often that is a family member who lives out of state, and we keep them in the loop by phone. We are available 24/7, so a call from another time zone is not a problem.",
          "We also work with realtors, designers and retailers. A realtor listing an estate home usually needs it empty before photos. A designer refreshing a home needs the old pieces out before the new ones arrive. Either way, the same owners who quote the job show up to do it.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is an estate cleanout?",
        a: "An estate cleanout is emptying a home's contents, usually after a death, a move into care, or before a sale. It can cover the whole house or just part of it. We move what the family keeps, take donations wherever you prefer, and haul away what is left.",
      },
      {
        q: "How much does an estate cleanout cost?",
        a: "We quote it after we hear what is involved, so call (850) 842-1962 and describe the job.",
      },
      {
        q: "Can you clear just part of the house?",
        a: "Yes. We do whole-house and partial cleanouts. If the family has already taken what they want, we clear the rest. If it is one garage, one bedroom, or a storage room, that is a job we will take.",
      },
      {
        q: "Do you pick up furniture for donation?",
        a: "Yes. Donations go wherever you prefer: a charity, a church, a shelter, or someone you know. We load it, pad it, and deliver it. Call the place you are donating to first, because most charities have rules about what they accept.",
      },
      {
        q: "Our family lives out of state. Can you still handle the cleanout?",
        a: "Yes. We coordinate with whoever is making the decisions, by phone, and we are available 24/7. If a piece needs to go to a relative in another state, we are licensed for interstate moves.",
      },
      {
        q: "Can Walton County take some of the bulk items?",
        a: "Walton County has described a free monthly bulk pickup and free landfill drop-off for eligible residents on its Bulk Waste Collection page. Eligibility and schedules vary, so check with the county first. If the timing does not work, we can haul it away for you.",
      },
    ],
  },
  "senior-downsizing-moves": {
    fullDescription:
      "We handle senior and downsizing moves in Santa Rosa Beach, along 30A, in Destin and Fort Walton Beach: from a family home into a smaller house, a condo, or a care community. We work closely with you, coordinate with family wherever they live, and no job is too small. The owners are the movers, so the faces you meet are the faces on move day.",
    heroTitle: "Senior Moves & Downsizing in Santa Rosa Beach, 30A & Destin",
    sections: [
      {
        heading: "How we handle a senior move",
        body: [
          "We go at your pace and explain each step before we do it. A senior move is not a race. It is often leaving a home of many years, and the person moving should be the one deciding what comes along. Nothing goes in a donation pile or on the truck without your say.",
          "Beach House Moving is owner-operated: the owners are the movers. You will get to know names like Les, Zack, Keith and Josh, not a rotating crew of strangers. The people who talk the move through with you are the people who carry the furniture and set up the new place.",
          "To be clear about what we are: we are not certified senior move managers. We are movers who handle senior and downsizing moves with patience, and we plan them closely with you and your family.",
        ],
      },
      {
        heading: "How to downsize a home",
        body: [
          "Start with the new floor plan, then decide what fits. Measure the rooms in the new place and pick the furniture that belongs there first. The bed, the favorite chair and the dining table usually decide everything else.",
          "Next, sort the rest into a few plain groups: keep, give to family, donate, sell, and let go. Begin with rooms you use least, like a guest room or garage, and leave the kitchen and bedroom for last. Offer heirlooms to family early, so those conversations happen over coffee, not on move day.",
          "Give yourself more time than you think you need. If packing feels like too much, we offer [packing, unpacking and home organizing](/services/packing-unpacking) as part of the move.",
        ],
      },
      {
        heading: "Coordinating with family, near or far",
        body: [
          "We work with whoever is helping, including family who live out of state. Grown children are often the ones calling from another time zone. We are available 24/7, so we can take that call when it works for them, and we keep everyone on the same page about dates and plans.",
          "If a piece is headed to a relative's home, we can deliver it locally around Destin and Fort Walton Beach, or move it out of state. We are licensed for interstate moves.",
        ],
      },
      {
        heading: "What happens to what does not make the move",
        body: [
          "The extra furniture can go to family, to donation, into storage, or away for good. We take donations wherever you prefer. If the old home needs to be cleared after the move, see [estate cleanouts](/services/estate-cleanouts), and for things nobody wants, [junk removal](/services/junk-removal).",
          "If you are not ready to decide on a few pieces yet, ask us about [storage](/services/storage). Some decisions are easier once you are settled in the new place.",
        ],
      },
    ],
    faqs: [
      {
        q: "Are you a senior move manager?",
        a: "No, and we will not claim to be. We are movers who handle senior and downsizing moves with patience. We plan the move closely with you and your family, pack, move, set up the new place, and help clear what is left behind.",
      },
      {
        q: "Can you work with family who live out of state?",
        a: "Yes. We coordinate with family wherever they live and keep everyone updated on dates and plans. We are available 24/7, so time zones are not a problem. If a piece is going to a relative in another state, we are licensed for interstate moves.",
      },
      {
        q: "Is my move too small for you?",
        a: "No job is too small. Moving a bedroom set into a care community, a few pieces into a condo, or a single heirloom to a grandchild's house are all jobs we take, with the same owners and the same care as a full house.",
      },
      {
        q: "How much does a senior move cost?",
        a: "Our published rate is $195/hr for 2 movers, plus drive time. The total depends on how much is moving, stairs and elevators at both ends, and whether we are packing too. Call (850) 842-1962 and talk it through. We will give you a straight answer.",
      },
      {
        q: "Can you move someone into an assisted living or retirement community?",
        a: "Yes. Ask the community about its move-in rules first: allowed hours, elevator reservations, and how big the room is. Tell us what they say and we will plan the move around it, then place the furniture and set the room up before we leave.",
      },
      {
        q: "How do I start downsizing a home?",
        a: "Measure the new place and choose the furniture that fits there first. Then sort the rest into keep, family, donate, sell and let go, starting with rooms you use least. Offer heirlooms to family early, and give yourself more time than you think you need.",
      },
    ],
  },
  "vacation-rental-installs": {
    fullDescription:
      "We furnish and refresh vacation rentals along 30A and in Santa Rosa Beach, Miramar Beach and Destin for owners, property managers and designers. We handle it all: receiving the deliveries, bringing them to the unit, assembly, placement and setup, and hauling the old furniture away, timed around your turnover.",
    heroTitle: "Vacation Rental Furniture Installs on 30A & in Destin",
    sections: [
      {
        heading: "What we handle on a rental install",
        body: [
          "We handle it all, from the first delivery to the last piece of cardboard. Furnishing a rental usually means orders from several stores that show up on different days. We receive those deliveries, bring them to the unit, assemble what came flat-packed, and place every piece where it belongs.",
          "The old furniture leaves with us. A refresh is only half done if last season's sofa is still on the porch, so haul-away is part of the job, not a separate trip. For anything that needs to go on a wall, see [TV, art and shelf installation](/services/mounting-installation).",
        ],
      },
      {
        heading: "Built around turnover deadlines",
        body: [
          "We schedule installs to fit between check-out and check-in. On the Emerald Coast that window is often a summer Saturday, with cleaners and the next guests right behind us. Tell us the window early and we will plan the job to fit it.",
          "There are a lot of these windows to fit. Walton County's tourist development tax data counted more than 20,000 active rental units in March 2026, and summer Saturday turnovers crowd the roads, elevators and loading zones on 30A. When a crew is available, we can sometimes take same-day work, but the safest plan is to book ahead.",
        ],
      },
      {
        heading: "For owners who live out of state",
        body: [
          "You do not need to be here. Many rental owners on 30A live somewhere else, and flying in to sign for a sofa does not make sense. We work from your plan, or your property manager's, and keep you posted by phone. We are available 24/7, so your time zone is not a problem.",
          "Condos come with their own rules. We ask about service elevator reservations, HOA move hours and gate access before the truck rolls, so a crew is not sitting in a parking lot while your turnover clock runs.",
        ],
      },
      {
        heading: "For property managers and designers",
        body: [
          "Property managers and designers can send owners straight to us. We are one owner-operated crew that receives, delivers, assembles, places and hauls away, so nobody has to line up three vendors for one unit.",
          "Designers furnishing a rental get the same care we bring to a full [design trade install](/services/design-trade-installation): pieces checked when they come out of the box, placed to the plan, and the packing material gone before the photographer arrives.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can you receive furniture deliveries for my vacation rental?",
        a: "Yes. Receiving deliveries is part of what we do on a rental install. Orders from different stores can arrive on different days, and we take them in so you do not have to be there to sign for anything.",
      },
      {
        q: "Do you assemble furniture?",
        a: "Yes. Beds, tables, chairs, outdoor sets and the rest of what arrives in boxes. We assemble it, place it where it goes in the unit, and take the cardboard with us.",
      },
      {
        q: "Can you finish between check-out and check-in?",
        a: "That is what we plan for. Tell us the turnover window as early as you can, along with any HOA or elevator rules. Summer Saturday turnovers are the busiest on the coast, so earlier is better.",
      },
      {
        q: "Will you haul away the old furniture?",
        a: "Yes. Haul-away of the old pieces is part of the install, so the unit is clear for the cleaners. For bigger clear-outs, see our junk removal service.",
      },
      {
        q: "Do I need to be there?",
        a: "No. We work from your plan or your property manager's and keep you posted by phone. We are available 24/7, so owners who live out of state can reach us when it suits them.",
      },
      {
        q: "How is a rental install priced?",
        a: "We quote it after we hear what is involved, so call (850) 842-1962 and describe the job.",
      },
    ],
  },
}
