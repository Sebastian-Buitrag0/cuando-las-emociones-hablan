# Product

## Register

brand

The site is a brand-led hybrid. Long-form content sections (Hero, Habilidades, Emociones, Regulación, Apoyo, Convivencia, Familias, Docentes) are brand surfaces — the design IS the product. Interactive tools embedded inside (TestEmociones, RuedaEmociones, EjercicioRespiracion, TecnicaRegulacion, SimuladorConversacion, RedApoyoVirtual, ChatBubble/Emilio) follow product-grade conventions: clear states, predictable interaction, consistent affordances. Brand register sets the default for spacing, motion, and color expressiveness; product register kicks in inside the interactive components.

## Users

**Primary: Spanish-speaking adolescents.** Teens reading this site are exploring their own emotional life, often without a vocabulary for it yet. They are not patients, not children, not learners completing a course. They arrived because something — a feeling, a curiosity, a friend's link — pulled them in. They will leave if the site sounds like a brochure, a clinic, or a school assignment.

**Secondary: families and teachers.** Adults supporting teens (parents, caregivers, educators) use the Familias and Docentes sections. Their experience matters but does not drive the visual or tonal default. Content for them should feel coherent with the teen-facing surfaces, not retrofit into a different aesthetic.

The job teens are trying to do: *understand what I'm feeling and find a real handhold for what to do about it.* Not "complete a wellness journey." Not "learn emotional intelligence theory." Find something true and useful, fast.

## Product Purpose

Cuando las emociones hablan is a Spanish-language educational site that helps adolescents recognize, name, and regulate their emotions, build social skills, and know where to turn for support. It pairs interactive tools (an emotion wheel, a 4-question emotional test, guided breathing, a conversational simulator, a virtual support network map, and Emilio — an AI companion powered by DeepSeek) with content sections covering emotions, regulation techniques, coexistence, and resources for the adults around them.

Success looks like a teen who arrives anxious or curious, finds a tool that fits their moment (a quick breathing exercise, a wheel that gives them a word for what they're feeling, a chat with Emilio), and leaves with both vocabulary and a next step. The site succeeds when it earns trust in the first scroll — when a teen reads it and thinks *this gets it* rather than *this is trying to sell me wellness*.

## Brand Personality

**Cálido, cercano, real.** Warm, close, real.

- **Voice:** Speaks to teens as peers, not as patients or students. Spanish that sounds like how teens actually talk, without slang cosplay. Direct, never preachy. Acknowledges that emotions are hard before suggesting what to do about them.
- **Tone:** Confident without being clinical. Soft without being saccharine. The site never moralizes ("you should feel grateful") or pathologizes ("you may be experiencing symptoms of…"). It treats every emotion — including ira, ansiedad, tristeza — as legitimate information, not as a problem to fix.
- **Emotional goal:** When a teen lands on the site mid-overwhelm, the page should feel like a deep breath, not a wave. When they land curious, the page should feel like an invitation, not a curriculum.

## Anti-references

This site should explicitly NOT look like:

- **Wellness-app SaaS (Calm, Headspace, Finch, etc.).** Gradient-blob purples and teals, hero-metric templates, generic "find your calm" aesthetics. Too commercial, too soft, too obviously selling something. The site is not a product trying to retain users — it's a resource trying to be useful and leave.
- **Clinical / corporate health portals.** Stock photo of a smiling teen with a backpack, navy + white, accordion FAQ pages, "speak to a professional" CTAs. Reads as institutional authority talking *down* at teens. The site is not a hospital landing page.
- **Generic AI-slop landing.** Cream-and-dark color scheme, single neon accent, three-up feature cards with icon + heading + paragraph, gradient hero text. Could be any AI startup of the last two years. The site is content, not a SaaS pitch.

If a teen could mistake the page for any of the three above, the design has failed regardless of how polished it is.

## Design Principles

1. **Hablar como persona, no como folleto.** Every word and visual gesture earns its place by sounding like a real person who has actually felt this. No tagline filler, no "Empower your emotional journey" copy, no decorative iconography in place of real content.

2. **Mostrar emoción sin dramatizarla.** Show emotion without performing it. Don't sanitize ira and ansiedad into wellness pastels — but also don't escalate them into alarm-state UI. Red can be a color of warmth, not just of error. Color choices respect that every emotion is information, not a verdict.

3. **Herramientas serias dentro de un sitio cálido.** The brand surrounds; the tools focus. When a teen enters TestEmociones, RuedaEmociones, EjercicioRespiracion, SimuladorConversacion, or Emilio chat, the interface tightens into product-grade clarity: predictable states, obvious next steps, no decorative noise. The brand pages can be expressive; the tools must be trustworthy.

4. **Una salida siempre visible.** A way to ask for help is never more than one interaction away. Emilio chat, the Apoyo crisis links, and the support-network map are first-class citizens of the navigation, not buried CTAs. The site never traps a reader inside content when they need a person.

5. **Movimiento que respira, no que actúa.** Motion settles, not performs. Use motion the way a breathing exercise uses it — to slow attention, to reveal hierarchy, to acknowledge an action — never to dazzle. `prefers-reduced-motion` is honored fully (heavy GSAP transitions disabled, not just softened), because a meaningful portion of this audience needs that.

## Accessibility & Inclusion

Hold the full stack of care, because the audience includes neurodiverse teens and teens in vulnerable emotional states:

- **WCAG 2.2 AA minimum** on contrast, focus indicators, keyboard navigation, and form labeling. All interactive components (wheel, test, simulator, chat) operable by keyboard alone.
- **Reduced motion respected, not softened.** Honor `prefers-reduced-motion: reduce` by disabling GSAP scroll animations, breathing-circle scaling, marquee carousels, and any decorative motion. Static fallbacks must read as complete designs, not as broken-motion versions.
- **Dyslexia-friendly long-form type.** Line-height ≥ 1.5 for body and explanatory text, left-aligned (never justified), generous letter-spacing on dense content, body line length capped at 65–75ch. Type sizes never drop below 16px for body copy on any breakpoint.
- **Emotion-safe color use.** Red, orange, and other "high-arousal" hues used for emotional content (ira, ansiedad) must not collide with error/danger semantics elsewhere in the UI. If a destructive or error pattern is needed, use a separate token role; never let a teen reading about "ira" feel they are being warned. Crisis and help affordances use a calm, confident treatment — high contrast, clear language, no alarm-red.
- **Always-available crisis routes.** Help-seeking affordances (Emilio chat, Apoyo support-network entries, crisis links) remain visible or one click away from every section of the site. Never gate them behind scroll position or modal flows.
