<script setup lang="ts">
import { ref, nextTick, onMounted, watch, computed } from 'vue'
import { marked } from 'marked'
import gsap from 'gsap'

marked.setOptions({ breaks: true, gfm: true })

function renderMarkdown(text: string): string {
  return marked.parse(text) as string
}

interface Message {
  role: 'user' | 'assistant'
  content: string
}

type PersonalityId = 'emilio' | 'thalia'

const personas = {
  emilio: {
    id: 'emilio' as PersonalityId,
    name: 'Emilio',
    emoji: '\u{1F9E0}',
    tagline: 'Analítico · Técnicas CBT · Regulación',
    pitch: 'Te ayuda a identificar patrones de pensamiento y encontrar herramientas concretas para regularte.',
    bubbleGlow: '0 8px 25px hsl(220 80% 64% / 0.45)',
    userBubble: 'from-primary to-[hsl(220,80%,45%)]',
    sendBtn: 'from-primary to-[hsl(220,80%,45%)]',
  },
  thalia: {
    id: 'thalia' as PersonalityId,
    name: 'Thalía',
    emoji: '\u{1F338}',
    tagline: 'Cálida · Psicología positiva · Fortalezas',
    pitch: 'Te acompaña desde tus fortalezas con compasión y calidez, ayudándote a encontrar tu propio camino.',
    bubbleGlow: '0 8px 25px hsl(340 40% 58% / 0.40)',
    userBubble: 'from-accent to-[hsl(340,40%,45%)]',
    sendBtn: 'from-accent to-[hsl(340,40%,45%)]',
  },
} as const

const KEY_NAME        = 'emilio_name'
const KEY_CHAT        = 'emilio_chat'
const KEY_SUMMARY     = 'emilio_summary'
const KEY_PERSONALITY = 'emilio_personality'

const COMPACT_THRESHOLD = 20
const COMPACT_KEEP_LAST  = 6

const isOpen              = ref(false)
const userInput           = ref('')
const messages            = ref<Message[]>([])
const isLoading           = ref(false)
const isCompacting        = ref(false)
const userName            = ref('')
const isAskingName        = ref(false)
const hasSavedChat        = ref(false)
const selectedPersonality = ref<PersonalityId | null>(null)
const pendingContext      = ref<string | null>(null)

const currentPersona = computed(() =>
  selectedPersonality.value ? personas[selectedPersonality.value] : personas.emilio
)

const messagesContainer = ref<HTMLElement | null>(null)
const inputRef          = ref<HTMLInputElement | null>(null)
const bubbleRef         = ref<HTMLButtonElement | null>(null)
const chatPanelRef      = ref<HTMLElement | null>(null)
const emilioGradRef     = ref<HTMLElement | null>(null)
const thaliaGradRef      = ref<HTMLElement | null>(null)
const pickerRef         = ref<HTMLElement | null>(null)

const mm = gsap.matchMedia()
let reduceMotion = false
mm.add('(prefers-reduced-motion: reduce)', () => { reduceMotion = true })

function onPanelEnter(el: Element, done: () => void) {
  if (reduceMotion) { done(); return }
  gsap.fromTo(el,
    { y: 28, opacity: 0, scale: 0.92, transformOrigin: 'bottom right' },
    { y: 0, opacity: 1, scale: 1, duration: 0.42, ease: 'back.out(1.6)', onComplete: done }
  )
}
function onPanelLeave(el: Element, done: () => void) {
  if (reduceMotion) { done(); return }
  gsap.to(el, { y: 18, opacity: 0, scale: 0.94, duration: 0.22, ease: 'power2.in', onComplete: done })
}

function animateLastMessage(role: 'user' | 'assistant') {
  if (reduceMotion || !messagesContainer.value) return
  const bubbles = messagesContainer.value.querySelectorAll<HTMLElement>('.msg-bubble')
  const last = bubbles[bubbles.length - 1]
  if (!last) return
  gsap.fromTo(last,
    { x: role === 'user' ? 16 : -16, opacity: 0, scale: 0.96 },
    { x: 0, opacity: 1, scale: 1, duration: 0.28, ease: 'back.out(1.7)' }
  )
}

function animateHeaderIn() {
  if (reduceMotion || !chatPanelRef.value) return
  const items = chatPanelRef.value.querySelectorAll('.header-item')
  gsap.fromTo(items,
    { y: -8, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.3, stagger: 0.07, ease: 'power2.out', delay: 0.18 }
  )
}

function applyGradient(id: PersonalityId, animate = true) {
  if (!emilioGradRef.value || !thaliaGradRef.value) return
  const duration = animate && !reduceMotion ? 0.55 : 0
  if (id === 'emilio') {
    gsap.to(emilioGradRef.value, { opacity: 1, duration, ease: 'power2.inOut' })
    gsap.to(thaliaGradRef.value,  { opacity: 0, duration, ease: 'power2.inOut' })
  } else {
    gsap.to(thaliaGradRef.value,  { opacity: 1, duration, ease: 'power2.inOut' })
    gsap.to(emilioGradRef.value, { opacity: 0, duration, ease: 'power2.inOut' })
  }
  if (bubbleRef.value && animate && !reduceMotion) {
    gsap.fromTo(bubbleRef.value, { scale: 1.15 }, { scale: 1, duration: 0.5, ease: 'back.out(2)' })
  }
}

function fadeOutGradients(animate = true) {
  if (!emilioGradRef.value || !thaliaGradRef.value) return
  const duration = animate && !reduceMotion ? 0.35 : 0
  gsap.to(emilioGradRef.value, { opacity: 0, duration })
  gsap.to(thaliaGradRef.value,  { opacity: 0, duration })
}

function animatePickerIn() {
  if (reduceMotion || !pickerRef.value) return
  const cards = pickerRef.value.querySelectorAll('.persona-card')
  gsap.fromTo(cards,
    { y: 22, opacity: 0, scale: 0.93 },
    { y: 0, opacity: 1, scale: 1, duration: 0.38, stagger: 0.1, ease: 'back.out(1.5)', delay: 0.1 }
  )
}

async function animatePickerOut() {
  if (reduceMotion || !pickerRef.value) return
  const cards = pickerRef.value.querySelectorAll('.persona-card')
  await new Promise<void>((resolve) => {
    gsap.to(cards, { y: -10, opacity: 0, scale: 0.95, duration: 0.2, stagger: 0.05, ease: 'power2.in', onComplete: resolve })
  })
}

async function selectPersonality(id: PersonalityId) {
  await animatePickerOut()

  selectedPersonality.value = id
  localStorage.setItem(KEY_PERSONALITY, id)

  await nextTick()

  applyGradient(id, true)
  animateHeaderIn()
  startConversation()

  await nextTick()
  inputRef.value?.focus()
  scrollToBottom()

  if (pendingContext.value && !isAskingName.value && !isLoading.value) {
    const ctx = pendingContext.value
    pendingContext.value = null
    await injectContext(ctx)
  }
}

function buildSystemPrompt(summary: string): string {
  const nameSection = userName.value
    ? `El nombre del estudiante con quien hablas es **${userName.value}**. Úsalo con naturalidad.`
    : `Aún no conoces el nombre del estudiante. Mientras no lo sepas, SIEMPRE debes preguntarle amablemente cómo se llama en cada una de tus respuestas. No continúes la conversación sin conocer su nombre.`

  const summarySection = summary
    ? `\n## Contexto de conversaciones anteriores con este estudiante\n${summary}\n`
    : ''

  if (selectedPersonality.value === 'thalia') return buildThaliaPrompt(nameSection, summarySection)
  return buildEmilioPrompt(nameSection, summarySection)
}

function buildEmilioPrompt(nameSection: string, summarySection: string): string {
  return `# Identidad y propósito
Eres **Emilio**, el acompañante emocional del proyecto "Cuando las emociones hablan" del **Gimnasio Pedagógico Thomas Paine** (Colombia). Tu misión es acompañar a estudiantes de primaria y secundaria (8-18 años) a reconocer, comprender y regular sus emociones usando técnicas basadas en evidencia científica (Terapia Cognitivo-Conductual — TCC).

${nameSection}
${summarySection}

## Tono y estilo de conversación
- Habla siempre en **español colombiano**, en segunda persona (tuteo: "tú", "te", "tu").
- Sé cálido, cercano y natural — como un amigo mayor que sabe escuchar.
- **Valida PRIMERO, siempre.** Antes de cualquier sugerencia, refleja lo que el estudiante acaba de decir: *"Parece que hoy fue un día complicado…"*, *"Tiene sentido que te sientas así cuando…"*
- Haz **una sola pregunta o una sola oferta** por turno.
- Termina casi siempre con una **pregunta abierta**: *"¿Quieres contarme un poco más?"*, *"¿Cómo se siente eso en tu cuerpo?"*
- Respuestas **cortas**: 2-4 oraciones en conversación emocional. Solo usa listas al guiar ejercicios paso a paso.
- Evita vocabulario clínico. Di "mente acelerada" en vez de "hiperactivación cognitiva".

## Formato de respuesta (Markdown)
- Usa **negrita** para resaltar una idea clave por mensaje (máximo una).
- Usa listas numeradas solo para guiar ejercicios paso a paso.
- En conversaciones emocionales, usa prosa, no listas.
- No uses encabezados (##) en tus respuestas.

## Marco teórico: Regulación Emocional (modelo de Gross)
Ayuda al estudiante a entender que puede regular sus emociones en distintos momentos:
1. **Antes de que ocurra**: elegir o modificar la situación.
2. **Durante**: donde pone su atención.
3. **Después**: cómo interpreta lo que pasó (cambio cognitivo).
4. **Respuesta final**: qué hace con la emoción.

## Herramientas que puedes ofrecer (siempre como oferta)
**Respiración 4-4-4** (para ansiedad, estrés, ira):
1. Inhala lentamente durante 4 segundos.
2. Sostén el aire 4 segundos.
3. Exhala despacio durante 4 segundos. Repite 3 veces.

**Grounding 5-4-3-2-1** (para ansiedad o pánico):
1. Nombra 5 cosas que puedes ver.
2. Toca 4 objetos distintos.
3. Escucha 3 sonidos del ambiente.
4. Identifica 2 olores.
5. Nota 1 sabor en tu boca.

**Semáforo emocional** (para ira/impulsos):
- 🔴 PARO: respira antes de hablar.
- 🟡 PIENSO: ¿qué siento y qué lo causó?
- 🟢 ACTÚO: elijo una respuesta con la que me sienta bien después.

**Técnica de la pausa** (para cualquier emoción intensa):
- Frase guía: *"Primero respiro, después decido."*
- Antes de reaccionar, haz una pausa de 10 segundos con respiración consciente.

**Reestructuración cognitiva** (para pensamientos negativos):
- Paso 1: Identifica el pensamiento que te hace sentir mal.
- Paso 2: Pregúntate: *"¿Es 100% cierto? ¿Qué evidencia tengo a favor y en contra?"*
- Paso 3: Busca una forma más realista de ver la situación.
- Ejemplo: "Si no saco un 10, soy un fracaso" → "Me esfuerzo al máximo, y mi valor no depende de una nota."

**Diario emocional** (para conciencia emocional):
- Cada día anota: qué emoción sentiste, en qué situación, intensidad del 1 al 10, cómo reaccionaste y qué podrías hacer diferente.

**Resolución de problemas paso a paso**:
1. Define el problema concretamente.
2. Haz una lluvia de ideas de soluciones (sin juzgar).
3. Elige la mejor opción.
4. Ponla en práctica.
5. Revisa qué tal funcionó.

## Flujo de conversación
1. **Escucha y valida** — refleja lo que dijeron sin juzgar.
2. **Explora** — una pregunta Socrática.
3. **Ofrece (opcional)** — un ejercicio o técnica basada en evidencia.
4. **Cierra con apertura** — pregunta que invite a reflexionar.

## Límites y crisis
- Si detectas señales de crisis (hacerse daño, no querer existir): valida con empatía y da este recurso: *"Por favor llama a la **Línea 106** (Bogotá), disponible las 24 horas."*
- No diagnostiques ni uses etiquetas clínicas para describir al estudiante.`
}

function buildThaliaPrompt(nameSection: string, summarySection: string): string {
  return `# Identidad y propósito
Eres **Thalía**, la acompañante emocional del proyecto "Cuando las emociones hablan" del **Gimnasio Pedagógico Thomas Paine** (Colombia). Tu misión es acompañar a estudiantes de primaria y secundaria (8-18 años) a cultivar su bienestar emocional desde sus propias fortalezas, basándote en la psicología positiva de Seligman.

${nameSection}
${summarySection}

## Tono y estilo de conversación
- Habla siempre en **español colombiano**, en segunda persona (tuteo: "tú", "te", "tu").
- Eres cálida, compasiva y genuinamente cercana — alguien que se alegra de verte y quiere escucharte de verdad.
- **Valida PRIMERO, siempre.** Con ternura: *"Tiene mucho sentido que te sientas así…"*, *"Gracias por contarme eso, no es fácil…"*
- Haz **una sola pregunta o una sola oferta** por turno.
- Termina casi siempre con una pregunta que explore fortalezas: *"¿Qué parte de ti fue más valiente hoy?"*, *"¿Qué te ayudó a seguir?"*
- Respuestas **cortas y cálidas**: 2-4 oraciones. Puedes usar metáforas suaves ocasionalmente.
- Usa emojis con moderación (1 máximo por mensaje cuando sumen calidez: 🌸 💜 ✨).
- Evita vocabulario clínico.

## Formato de respuesta (Markdown)
- Usa **negrita** para resaltar una idea clave por mensaje (máximo una).
- Usa listas numeradas solo para guiar ejercicios paso a paso.
- En conversaciones emocionales, usa prosa cálida, no listas.
- No uses encabezados (##) en tus respuestas.

## Marco teórico: Psicología Positiva (Seligman)
Trabaja con los 5 pilares del bienestar (PERMA):
- **P** = Emociones Positivas (gratitud, alegría, saboreo).
- **E** = Compromiso (estar metido en lo que hace).
- **R** = Relaciones positivas (conexión, empatía, apoyo).
- **M** = Significado (propósito, pertenencia).
- **A** = Logros (reconocer avances, por pequeños que sean).

Las **fortalezas personales** (VIA) son recursos naturales que cada persona tiene. Ejemplos: amabilidad, curiosidad, perseverancia, esperanza, creatividad, honestidad, amor, amor al aprendizaje, perspectiva, valentía, ciudadanía, justicia, liderazgo, perdón, modestia, prudencia, autocontrol, apreciación de la belleza, gratitud, humor, espiritualidad.

## Enfoque: Fortalezas y compasión
- Parte siempre de las **fortalezas** del estudiante, no de lo que le falta.
- Identifica sus fortalezas VIA a partir de lo que cuenta y señálaselas con entusiasmo.
- Ofrece perspectiva de compasión: *"¿Qué le dirías a un amigo que siente exactamente lo mismo que tú?"*
- Celebra pequeños logros con entusiasmo genuino.
- Si el estudiante se critica, ayúdalo a cambiar el lenguaje: "cometo errores" en vez de "soy un fracaso".
- Conecta emociones con necesidades: *"Parece que necesitas un momento de descanso / reconocimiento / conexión…"*

## Herramientas que puedes ofrecer (siempre como oferta)
**Respira con intención** (para cualquier tensión):
1. Pon una mano en tu corazón.
2. Inhala suavemente 4 segundos pensando en algo que aprecias.
3. Exhala 6 segundos soltando lo que no puedes controlar. Repite 3 veces.

**Tres cosas buenas** (para tristeza o desmotivación):
1. Di o escribe 3 cosas buenas que pasaron hoy, por pequeñas que sean.
2. Para cada una: ¿por qué pasó? ¿qué dice de ti?

**Carta de gratitud** (para fortalecer relaciones y emociones positivas):
- Escribe una carta breve a alguien que haya sido bueno contigo.
- Describe específicamente qué hizo y cómo te hizo sentir.
- Opcional: léela en voz alta (aunque sea solo para ti).

**Saboreo de lo bueno** (para emociones positivas):
- Cuando pase algo bueno, detente 20 segundos a sentirlo de verdad.
- Fíjate cómo se siente en tu cuerpo. Deja que la emoción se expanda.

**Uso consciente de una fortaleza** (para motivación):
- Elige una de tus fortalezas (por ejemplo, la creatividad o la amabilidad).
- Piensa una forma nueva de usarla hoy en algo cotidiano.

**Carta de autocompasión** (para autocrítica): escribe una carta hacia ti mismo/a, como si fueras tu mejor amigo/a. Empieza: *"Sé que estás pasando por algo difícil…"*

**Pregunta de fortalezas**: cuando no encuentres nada positivo: *"¿Hubo algún momento esta semana en que te sentiste tú mismo/a?"*

## Flujo de conversación
1. **Escucha y valida** — refleja con calidez lo que dijeron.
2. **Explora desde la compasión** — *"¿Cómo te tratas a ti mismo/a cuando eso pasa?"*
3. **Ofrece (opcional)** — una herramienta o cambio de perspectiva suave.
4. **Cierra con fortaleza** — pregunta que reconozca lo que el estudiante ya tiene.

## Límites y crisis
- Si detectas señales de crisis (hacerse daño, no querer existir): valida con mucha ternura y da este recurso: *"Por favor habla hoy con alguien de confianza, o llama a la **Línea 106** (Bogotá), las 24 horas. No estás sola/o."*
- No diagnostiques ni uses etiquetas clínicas para describir al estudiante.`
}

function loadFromStorage() {
  userName.value = localStorage.getItem(KEY_NAME) ?? ''

  const savedP = localStorage.getItem(KEY_PERSONALITY) as PersonalityId | null
  if (savedP && (savedP === 'emilio' || savedP === 'thalia')) {
    selectedPersonality.value = savedP
  }

  const raw = localStorage.getItem(KEY_CHAT)
  if (raw) {
    try {
      const parsed: Message[] = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.length > 0) {
        messages.value = parsed
        hasSavedChat.value = true
        if (!userName.value) isAskingName.value = true
        return
      }
    } catch { /* ignore */ }
  }
  hasSavedChat.value = false
}

function saveMessages() {
  localStorage.setItem(KEY_CHAT, JSON.stringify(messages.value))
}

function loadSummary(): string {
  return localStorage.getItem(KEY_SUMMARY) ?? ''
}

function saveSummary(s: string) {
  localStorage.setItem(KEY_SUMMARY, s)
}

function clearAll() {
  localStorage.removeItem(KEY_CHAT)
  localStorage.removeItem(KEY_SUMMARY)
  localStorage.removeItem(KEY_NAME)
  localStorage.removeItem(KEY_PERSONALITY)
  messages.value = []
  userName.value = ''
  hasSavedChat.value = false
  selectedPersonality.value = null
  nextTick(() => {
    fadeOutGradients(true)
    animatePickerIn()
  })
}

function startConversation() {
  if (!userName.value) {
    isAskingName.value = true
  }
  messages.value = []
  saveMessages()
}

async function callDeepSeek(msgs: Message[], stream: boolean, onChunk?: (t: string) => void): Promise<string> {
  const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY
  const summary = loadSummary()

  const response = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: 'deepseek-v4-flash',
      stream,
      messages: [
        { role: 'system', content: buildSystemPrompt(summary) },
        ...msgs.map((m) => ({ role: m.role, content: m.content })),
      ],
    }),
  })

  if (!response.ok) throw new Error(`DeepSeek error ${response.status}`)

  if (!stream) {
    const json = await response.json()
    return json.choices?.[0]?.message?.content ?? ''
  }

  const reader = response.body!.getReader()
  const decoder = new TextDecoder()
  let full = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    const lines = decoder.decode(value).split('\n').filter((l) => l.startsWith('data: '))
    for (const line of lines) {
      const data = line.slice(6)
      if (data === '[DONE]') break
      try {
        const delta = JSON.parse(data).choices?.[0]?.delta?.content
        if (delta) { full += delta; onChunk?.(delta) }
      } catch { /* partial chunk */ }
    }
  }
  return full
}

async function compactIfNeeded() {
  if (messages.value.length < COMPACT_THRESHOLD) return

  isCompacting.value = true
  const toSummarize = messages.value.slice(0, messages.value.length - COMPACT_KEEP_LAST)
  const tail        = messages.value.slice(-COMPACT_KEEP_LAST)

  try {
    const prevSummary = loadSummary()
    const prevSection = prevSummary ? `Resumen anterior:\n${prevSummary}\n\n` : ''
    const transcript  = toSummarize.map((m) => `${m.role === 'user' ? userName.value || 'Estudiante' : currentPersona.value.name}: ${m.content}`).join('\n')

    const summaryText = await callDeepSeek([
      { role: 'user', content: `${prevSection}Resume brevemente (máximo 120 palabras, en español) la siguiente conversación, destacando: emociones expresadas, temas tratados, técnicas sugeridas y estado emocional general:\n\n${transcript}` },
    ], false)

    saveSummary(summaryText)
    messages.value = tail
    saveMessages()
  } catch { /* keep messages as-is */ }
  finally { isCompacting.value = false }
}

async function injectContext(ctx: string) {
  messages.value.push({ role: 'user', content: ctx })
  saveMessages()
  await scrollToBottom()
  isLoading.value = true
  const reply: Message = { role: 'assistant', content: '' }
  messages.value.push(reply)
  try {
    await callDeepSeek(
      messages.value.slice(0, -1),
      true,
      (chunk) => { reply.content += chunk; scrollToBottom() }
    )
  } catch {
    reply.content = 'Hubo un error al conectarme. Por favor intenta de nuevo \u{1F64F}'
  }
  isLoading.value = false
  saveMessages()
  await compactIfNeeded()
}

function extractName(text: string): string | null {
  const patterns = [
    /me llamo\s+([a-záéíóúñ]+)/i,
    /soy\s+([a-záéíóúñ]+)/i,
    /mi nombre es\s+([a-záéíóúñ]+)/i,
  ]
  for (const pattern of patterns) {
    const match = text.match(pattern)
    if (match && match[1]) {
      const name = match[1].trim()
      if (name.length > 1 && name.length < 20) {
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
      }
    }
  }
  const firstWord = text.trim().split(/\s+/)[0]
  const greetings = ['hola', 'buenos', 'buenas', 'hey', 'saludos', 'hi', 'hello', 'que', 'qué', 'como', 'cómo']
  if (firstWord && firstWord.length > 1 && firstWord.length < 15 && !greetings.includes(firstWord.toLowerCase())) {
    return firstWord.charAt(0).toUpperCase() + firstWord.slice(1).toLowerCase()
  }
  return null
}

async function sendMessage() {
  const text = userInput.value.trim()
  if (!text || isLoading.value) return

  if (isAskingName.value) {
    const extractedName = extractName(text)
    if (extractedName) {
      userName.value = extractedName
      localStorage.setItem(KEY_NAME, userName.value)
      isAskingName.value = false
    }
  }

  messages.value.push({ role: 'user', content: text })
  userInput.value = ''
  isLoading.value = true
  await scrollToBottom()

  const reply: Message = { role: 'assistant', content: '' }
  messages.value.push(reply)

  try {
    await callDeepSeek(
      messages.value.slice(0, -1),
      true,
      (chunk) => { reply.content += chunk; scrollToBottom() }
    )
  } catch {
    reply.content = 'Hubo un error al conectarme. Por favor intenta de nuevo \u{1F64F}'
  }

  isLoading.value = false
  saveMessages()
  await compactIfNeeded()
}

async function scrollToBottom() {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

function toggleChat() {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    nextTick(() => {
      if (selectedPersonality.value) {
        inputRef.value?.focus()
        animateHeaderIn()
        if (messages.value.length === 0) startConversation()
        nextTick(() => applyGradient(selectedPersonality.value!, false))
      } else {
        nextTick(() => animatePickerIn())
      }
    })
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
}

onMounted(() => {
  loadFromStorage()

  nextTick(() => {
    if (bubbleRef.value && !reduceMotion) {
      gsap.to(bubbleRef.value, { y: -5, duration: 1.9, ease: 'sine.inOut', repeat: -1, yoyo: true })
    }
  })

  window.addEventListener('emilio:open', async (e: Event) => {
    const contexto = (e as CustomEvent<{ contexto?: string }>).detail?.contexto

    if (!isOpen.value) {
      isOpen.value = true
      await nextTick()
      if (selectedPersonality.value) {
        inputRef.value?.focus()
        animateHeaderIn()
        if (messages.value.length === 0) startConversation()
        await nextTick()
        applyGradient(selectedPersonality.value, false)
      } else {
        await nextTick()
        animatePickerIn()
      }
    }

    await scrollToBottom()

    if (contexto) {
      if (!selectedPersonality.value) {
        pendingContext.value = contexto
        return
      }
      if (!isAskingName.value && !isLoading.value) {
        await injectContext(contexto)
      }
    }
  })
})

watch(() => messages.value.length, async (newLen, oldLen) => {
  if (newLen <= oldLen || newLen === 0) return
  await nextTick()
  const role = messages.value[newLen - 1].role
  animateLastMessage(role)
})

watch(messages, scrollToBottom, { deep: true })

watch(isLoading, async (loading) => {
  if (!loading) {
    await nextTick()
    inputRef.value?.focus()
  }
})
</script>

<template>
  <div class="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

    <Transition :css="false" @enter="onPanelEnter" @leave="onPanelLeave">
      <div
        v-if="isOpen"
        ref="chatPanelRef"
        role="dialog"
        aria-modal="true"
        aria-label="Chat emocional"
        class="w-[340px] sm:w-[380px] h-[540px] bg-surface rounded-2xl flex flex-col overflow-hidden border border-border"
        style="box-shadow: 0 20px 60px hsl(var(--primary) / 0.15);"
      >
        <!-- Header -->
        <div class="relative px-4 py-3 flex items-center gap-3 flex-shrink-0 overflow-hidden bg-foreground">
          <div ref="emilioGradRef" class="absolute inset-0 bg-gradient-to-r from-primary to-[hsl(220,80%,45%)]" style="opacity:0;" />
          <div ref="thaliaGradRef"  class="absolute inset-0 bg-gradient-to-r from-accent to-[hsl(340,40%,45%)]" style="opacity:0;" />

          <div class="relative z-10 flex items-center gap-3 w-full">
            <div class="relative header-item flex-shrink-0">
              <div class="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center text-xl select-none transition-all duration-300">
                {{ selectedPersonality ? currentPersona.emoji : '\u{1F4AC}' }}
              </div>
              <span v-if="selectedPersonality" class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-primary-foreground rounded-full"></span>
            </div>
            <div class="flex-1 min-w-0 header-item">
              <p class="text-primary-foreground font-semibold text-sm leading-tight">
                {{ selectedPersonality
                  ? `${currentPersona.name}${userName ? ` · hola, ${userName}` : ''}`
                  : 'Asistente emocional' }}
              </p>
              <p class="text-primary-foreground/70 text-xs">
                {{ selectedPersonality ? currentPersona.tagline : 'Elige tu acompañante' }}
              </p>
            </div>
            <button
              @click="clearAll"
              title="Nueva conversación"
              class="header-item w-7 h-7 rounded-full bg-primary-foreground/15 hover:bg-primary-foreground/30 flex items-center justify-center text-primary-foreground transition-colors mr-1"
              aria-label="Nueva conversación"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582M20 20v-5h-.581M4.582 9A8 8 0 0120 15M19.418 15A8 8 0 014 9" />
              </svg>
            </button>
            <button
              @click="toggleChat"
              class="header-item w-7 h-7 rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/30 flex items-center justify-center text-primary-foreground transition-colors"
              aria-label="Cerrar chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Personality Picker -->
        <div
          v-if="!selectedPersonality"
          ref="pickerRef"
          class="flex-1 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-background to-surface overflow-y-auto"
        >
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-muted-foreground to-foreground flex items-center justify-center text-2xl mb-5 shadow-md select-none">💬</div>
          <h3 class="text-base font-bold text-foreground mb-1 text-center">¿Con quién quieres hablar hoy?</h3>
          <p class="text-xs text-muted-foreground text-center mb-7 max-w-[220px] leading-relaxed">Elige tu acompañante emocional. Puedes cambiar en cualquier momento.</p>

          <div class="w-full space-y-3">
            <!-- Emilio card -->
            <button
              @click="selectPersonality('emilio')"
              class="persona-card w-full flex items-center gap-3 rounded-2xl border-2 border-border bg-surface p-4 text-left hover:border-primary/50 hover:bg-primary/[0.04] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md group"
            >
              <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-[hsl(220,80%,45%)] flex items-center justify-center text-2xl shadow-sm select-none flex-shrink-0">🧠</div>
              <div class="flex-1 min-w-0">
                <p class="font-bold text-foreground text-sm">Emilio</p>
                <p class="text-xs text-muted-foreground mt-0.5 leading-relaxed">Analítico · Técnicas CBT · Regulación emocional</p>
              </div>
              <svg class="w-4 h-4 text-muted-foreground/50 group-hover:text-primary transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <!-- Thalía card -->
            <button
              @click="selectPersonality('thalia')"
              class="persona-card w-full flex items-center gap-3 rounded-2xl border-2 border-border bg-surface p-4 text-left hover:border-accent/50 hover:bg-accent/[0.04] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md group"
            >
              <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent to-[hsl(340,40%,45%)] flex items-center justify-center text-2xl shadow-sm select-none flex-shrink-0">🌸</div>
              <div class="flex-1 min-w-0">
                <p class="font-bold text-foreground text-sm">Thalía</p>
                <p class="text-xs text-muted-foreground mt-0.5 leading-relaxed">Cálida · Psicología positiva · Fortalezas</p>
              </div>
              <svg class="w-4 h-4 text-muted-foreground/50 group-hover:text-accent transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <p class="mt-6 text-[10px] text-muted-foreground/40 text-center">Tus conversaciones se guardan solo en este dispositivo</p>
        </div>

        <!-- Chat activo -->
        <template v-else>
          <Transition enter-active-class="transition-all duration-300" enter-from-class="opacity-0 -translate-y-2" enter-to-class="opacity-100 translate-y-0">
            <div v-if="hasSavedChat && messages.length > 0" class="flex items-center gap-2 px-4 py-1.5 bg-primary/10 border-b border-primary/15 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
              <p class="text-[10px] text-primary font-medium">Retomando tu conversación anterior</p>
            </div>
          </Transition>

          <div v-if="isCompacting" class="flex items-center gap-2 px-4 py-1.5 bg-secondary/10 border-b border-secondary/15 flex-shrink-0">
            <div class="w-2 h-2 bg-secondary rounded-full motion-safe:animate-pulse"></div>
            <p class="text-[10px] text-secondary">Guardando resumen de la conversación…</p>
          </div>

          <div ref="messagesContainer" class="flex-1 overflow-y-auto bg-gradient-to-b from-background to-surface">
            <div v-if="messages.length === 0" class="h-full flex flex-col items-center justify-center px-4 text-center">
              <div
                class="w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-3 select-none shadow-sm"
                :class="selectedPersonality === 'thalia'
                  ? 'bg-gradient-to-br from-accent to-[hsl(340,40%,50%)]'
                  : 'bg-gradient-to-br from-primary to-[hsl(220,80%,50%)]'"
              >{{ currentPersona.emoji }}</div>
              <p class="text-sm font-semibold text-foreground mb-1">
                {{ isAskingName ? `¡Hola! Soy ${currentPersona.name}` : (userName ? `Hola, ${userName}` : 'Hola') }}
              </p>
              <p class="text-xs text-muted-foreground max-w-[200px] leading-relaxed">
                {{ isAskingName
                  ? '¿Cómo te llamas? Escríbelo abajo y presiona Enter.'
                  : `Escríbele algo a ${currentPersona.name} para comenzar la conversación.` }}
              </p>
            </div>

            <div v-else class="px-4 py-3 space-y-3">
              <div
                v-for="(msg, i) in messages"
                :key="i"
                :class="['msg-bubble flex gap-2', msg.role === 'user' ? 'justify-end' : 'justify-start']"
              >
              <div
                v-if="msg.role === 'assistant'"
                class="w-7 h-7 rounded-full flex items-center justify-center text-sm flex-shrink-0 mt-1 select-none"
                :class="selectedPersonality === 'thalia'
                  ? 'bg-gradient-to-br from-accent to-[hsl(340,40%,50%)]'
                  : 'bg-gradient-to-br from-primary to-[hsl(220,80%,50%)]'"
              >{{ currentPersona.emoji }}</div>

              <div
                :class="[
                  'max-w-[78%] px-3 py-2 rounded-2xl text-sm leading-relaxed',
                  msg.role === 'user'
                    ? `bg-gradient-to-br ${currentPersona.userBubble} text-primary-foreground rounded-br-sm`
                    : 'bg-surface text-foreground shadow-sm border border-border rounded-bl-sm',
                ]"
              >
                <span v-if="msg.role === 'user'">{{ msg.content }}</span>
                <template v-else-if="msg.content">
                  <div class="chat-md" v-html="renderMarkdown(msg.content)" />
                </template>
                <span v-else class="flex gap-1 items-center h-4 px-1">
                  <span class="w-1.5 h-1.5 rounded-full motion-safe:animate-bounce"
                    :class="selectedPersonality === 'thalia' ? 'bg-accent' : 'bg-primary'"
                    style="animation-delay:0ms"></span>
                  <span class="w-1.5 h-1.5 rounded-full motion-safe:animate-bounce"
                    :class="selectedPersonality === 'thalia' ? 'bg-accent' : 'bg-primary'"
                    style="animation-delay:150ms"></span>
                  <span class="w-1.5 h-1.5 rounded-full motion-safe:animate-bounce"
                    :class="selectedPersonality === 'thalia' ? 'bg-accent' : 'bg-primary'"
                    style="animation-delay:300ms"></span>
                </span>
              </div>
            </div>
          </div>
          </div>

          <!-- Input -->
          <div class="px-3 pb-3 pt-2 border-t border-border bg-surface flex-shrink-0">
            <div class="flex gap-2 items-center bg-muted rounded-xl border border-border px-3 py-2 focus-within:border-primary transition-colors"
              :class="selectedPersonality === 'thalia' ? 'focus-within:!border-accent' : 'focus-within:border-primary'"
            >
              <input
                ref="inputRef"
                v-model="userInput"
                @keydown="handleKeydown"
                type="text"
                :placeholder="isAskingName ? 'Escribe tu nombre…' : (messages.length === 0 ? 'Escribe algo para comenzar…' : 'Cuéntame cómo te sientes…')"
                :disabled="isLoading"
                class="flex-1 bg-transparent text-sm text-foreground placeholder-muted-foreground outline-none disabled:opacity-50"
              />
              <button
                @click="sendMessage"
                :disabled="!userInput.trim() || isLoading"
                :class="[
                  'w-8 h-8 rounded-lg flex items-center justify-center text-primary-foreground flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95',
                  `bg-gradient-to-br ${currentPersona.sendBtn} hover:brightness-110`,
                ]"
                aria-label="Enviar"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </div>
            <p class="text-center text-[10px] text-muted-foreground/40 mt-1.5">Powered by DeepSeek AI · Tu conversación se guarda localmente</p>
          </div>
        </template>
      </div>
    </Transition>

    <!-- Bubble button -->
    <button
      ref="bubbleRef"
      @click="toggleChat"
      :aria-label="isOpen ? 'Cerrar chat emocional' : 'Abrir chat emocional'"
      class="w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110 active:scale-95 relative overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      :style="{ boxShadow: currentPersona.bubbleGlow }"
    >
      <div class="absolute inset-0 bg-gradient-to-br from-primary to-[hsl(220,80%,45%)] transition-opacity duration-500"
        :style="{ opacity: selectedPersonality === 'thalia' ? 0 : 1 }" />
      <div class="absolute inset-0 bg-gradient-to-br from-accent to-[hsl(340,40%,45%)] transition-opacity duration-500"
        :style="{ opacity: selectedPersonality === 'thalia' ? 1 : 0 }" />

      <div class="relative z-10">
        <Transition
          enter-active-class="transition-all duration-200"
          enter-from-class="opacity-0 rotate-90 scale-50"
          enter-to-class="opacity-100 rotate-0 scale-100"
          leave-active-class="transition-all duration-200"
          leave-from-class="opacity-100 rotate-0 scale-100"
          leave-to-class="opacity-0 -rotate-90 scale-50"
          mode="out-in"
        >
          <span v-if="!isOpen" key="open" class="select-none">
            {{ selectedPersonality ? currentPersona.emoji : '\u{1F4AC}' }}
          </span>
          <svg v-else key="close" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Transition>
      </div>
    </button>

    <!-- Tooltip primera visita -->
    <Transition
      enter-active-class="transition-all duration-500 delay-1500"
      enter-from-class="opacity-0 translate-x-2"
      enter-to-class="opacity-100 translate-x-0"
    >
      <div
        v-if="!isOpen && messages.length === 0"
        class="absolute right-16 bottom-3 bg-surface text-foreground text-xs font-medium px-3 py-1.5 rounded-full shadow-md border border-border whitespace-nowrap pointer-events-none"
      >
        ¡Habla conmigo! 💬
        <div class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1.5 w-2.5 h-2.5 bg-surface border-r border-t border-border rotate-45"></div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.chat-md :deep(p) {
  margin: 0 0 0.45em 0;
  line-height: 1.55;
}
.chat-md :deep(p:last-child) { margin-bottom: 0; }
.chat-md :deep(strong) { font-weight: 700; color: hsl(var(--primary)); }
.chat-md :deep(em) { font-style: italic; color: hsl(var(--muted-foreground)); }

.chat-md :deep(ul) {
  list-style: none; margin: 0.4em 0; padding: 0;
  display: flex; flex-direction: column; gap: 0.3em;
}
.chat-md :deep(ul li) { display: flex; align-items: flex-start; gap: 0.4em; line-height: 1.5; }
.chat-md :deep(ul li)::before { content: "\203A"; color: hsl(var(--primary)); font-weight: 700; flex-shrink: 0; margin-top: 0.05em; }

.chat-md :deep(ol) {
  counter-reset: chat-ol; margin: 0.4em 0; padding: 0;
  display: flex; flex-direction: column; gap: 0.3em;
}
.chat-md :deep(ol li) { display: flex; align-items: flex-start; gap: 0.5em; line-height: 1.5; counter-increment: chat-ol; }
.chat-md :deep(ol li)::before { content: counter(chat-ol) "."; color: hsl(var(--primary)); font-weight: 700; flex-shrink: 0; min-width: 1.1em; }

.chat-md :deep(code) { background: hsl(var(--primary) / 0.1); color: hsl(var(--primary)); border-radius: 4px; padding: 0.1em 0.35em; font-size: 0.85em; font-family: monospace; }
.chat-md :deep(blockquote) { border: 1px solid hsl(var(--primary) / 0.22); margin: 0.5em 0; padding: 0.4em 0.85em; background: hsl(var(--primary) / 0.06); border-radius: 8px; color: hsl(var(--muted-foreground)); font-style: italic; }
.chat-md :deep(hr) { border: none; border-top: 1px solid hsl(var(--border)); margin: 0.6em 0; }
.chat-md :deep(h3), .chat-md :deep(h4) { font-weight: 700; color: hsl(var(--foreground)); margin: 0.5em 0 0.25em; font-size: 0.95em; }
.chat-md :deep(a) { color: hsl(var(--primary)); text-decoration: underline; text-underline-offset: 2px; }
</style>
