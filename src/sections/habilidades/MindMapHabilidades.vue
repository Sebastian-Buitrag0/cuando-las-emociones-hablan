<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HabilidadesSociales from "./HabilidadesSociales.vue";
import { AlertCircle, BotMessageSquare, Lightbulb, CheckCircle2, Circle } from "lucide-vue-next";

gsap.registerPlugin(ScrollTrigger);

const EMOJI_BASE = "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@latest/assets";
const containerRef = ref<HTMLElement | null>(null);
const svgRef = ref<SVGSVGElement | null>(null);
const svgMRef = ref<SVGSVGElement | null>(null);

const CX = 300, CY = 262;
const R = 168;
const MCX = 150, MCY = 78;

function toRad(d: number) { return d * Math.PI / 180; }
function polar(cx: number, cy: number, r: number, d: number) {
  return { x: Math.round(cx + r * Math.cos(toRad(d))), y: Math.round(cy + r * Math.sin(toRad(d))) };
}

const dp = [-90, -18, 54, 126, 198].map(a => polar(CX, CY, R, a));

interface Habilidad {
  id: string;
  title: string;
  shortTitle: string;
  emoji: string;
  emojiImg: string;
  gf: string;
  gt: string;
  color: string;
  conector: string;
  description: string;
  señales: string[];
  tips: string[];
  hasSubSkills: boolean;
  practica: { accion: string; pasos: string[] };
  x: number;
  y: number;
  my: number;
}

const habilidades: Habilidad[] = [
  { id: "autoconciencia", title: "Autoconciencia", shortTitle: "Autoconciencia", emoji: "🧠", emojiImg: `${EMOJI_BASE}/Face%20in%20clouds/3D/face_in_clouds_3d.png`, gf: "#667eea", gt: "#764ba2", color: "hsl(var(--primary))", conector: "Es el punto de partida: sin reconocer lo que sentimos, no podemos gestionarlo.", description: "Reconocer y comprender nuestras propias emociones, fortalezas, limitaciones y cómo afectan nuestro comportamiento.", señales: ["No sabe con certeza por qué reacciona de cierta manera ante situaciones concretas.", "Las emociones la sorprenden y la desbordan con frecuencia.", "Le cuesta responder honestamente '¿cómo estoy?' más allá de 'bien' o 'mal'."], tips: ["Pregúntate: ¿Qué estoy sintiendo en este momento?", "Identifica en qué parte del cuerpo sientes esa emoción.", "Escribe 3 pensamientos que acompañan esa emoción.", "Practica el 'check-in' diario: antes de dormir, nombra 3 emociones que sentiste hoy."], hasSubSkills: false, practica: { accion: "Check-in emocional de 3 momentos", pasos: ["En la mañana, al llegar al colegio: ¿cómo te sientes?", "En la tarde, después del almuerzo: ¿cambió algo?", "En la noche, antes de dormir: ¿qué emoción predominó?"] }, x: dp[0].x, y: dp[0].y, my: 198 },
  { id: "autorregulacion", title: "Autorregulación", shortTitle: "Autorregulación", emoji: "⚖️", emojiImg: `${EMOJI_BASE}/Shield/3D/shield_3d.png`, gf: "#38b2ac", gt: "#2b6cb0", color: "hsl(var(--calm))", conector: "Reconocer es el primer paso; autorregularse es expresar esa emoción sin que nos controle.", description: "Gestionar las emociones de manera saludable, controlar impulsos y adaptarse a los cambios con flexibilidad.", señales: ["Reacciona de formas que después lamenta, y el ciclo se repite.", "Siente que las emociones 'explotan' antes de que pueda pensar.", "Le cuesta calmarse después de enojarse, asustarse o sentirse herido/a."], tips: ["Respira profundo durante 4 segundos antes de reaccionar.", "Cuenta hasta 10 cuando sientas que pierdes el control.", "Cambia el pensamiento negativo por uno más realista: ¿qué evidencia tengo de esto?", "Practica la pausa: aléjate 5 minutos antes de responder en caliente."], hasSubSkills: false, practica: { accion: "Técnica del semáforo emocional", pasos: ["🛑 PARO: cuando sientas que explotas, detente.", "🟡 PIENSO: ¿qué emoción es y qué la causó?", "🟢 ACTÚO: elige una respuesta con la que te sientas bien después."] }, x: dp[1].x, y: dp[1].y, my: 316 },
  { id: "empatia", title: "Empatía", shortTitle: "Empatía", emoji: "💜", emojiImg: `${EMOJI_BASE}/Smiling%20face%20with%20hearts/3D/smiling_face_with_hearts_3d.png`, gf: "#b794f4", gt: "#d53f8c", color: "hsl(var(--accent))", conector: "La empatía convierte la convivencia en algo más que coexistir: es la base de las relaciones reales.", description: "Comprender los sentimientos de los demás, ponerse en su lugar y responder con compasión.", señales: ["Siente que nadie la entiende, pero tampoco logra entender a otros.", "Juzga rápidamente sin esperar escuchar el contexto completo.", "Le cuesta reconocer cuándo alguien cercano está mal si no se lo dice directamente."], tips: ["Ponte en el lugar del otro antes de juzgar.", "Pregunta: '¿Cómo te sientes?' y escucha sin interrumpir.", "Escucha sin dar consejos inmediatos — a veces solo necesitan ser escuchados.", "Antes de responder en un conflicto, repite con tus palabras lo que la otra persona dijo."], hasSubSkills: false, practica: { accion: "Escucha activa de 1 conversación", pasos: ["En tu próxima conversación, no interrumpas ni una vez.", "Cuando termine, repite: 'Entiendo que sientes...'", "Pregunta: '¿Quieres que te escuche o que te dé una idea?'"] }, x: dp[2].x, y: dp[2].y, my: 434 },
  { id: "habilidades", title: "Habilidades Sociales", shortTitle: "Hab. Sociales", emoji: "🤝", emojiImg: `${EMOJI_BASE}/People%20hugging/3D/people_hugging_3d.png`, gf: "#f6ad55", gt: "#ed8936", color: "hsl(var(--secondary))", conector: "Son las herramientas concretas para poner en práctica todo lo anterior en tus relaciones.", description: "Competencias específicas para relacionarte con otros: comunicar, escuchar, cooperar y resolver desacuerdos.", señales: [], tips: [], hasSubSkills: true, practica: { accion: "Usa la fórmula asertiva hoy", pasos: ["Identifica una situación que te moleste.", "Escribe: 'Yo siento... cuando pasa X... necesito Y'.", "Díselo a la persona, aunque sea por mensaje."] }, x: dp[3].x, y: dp[3].y, my: 552 },
  { id: "motivacion", title: "Motivación", shortTitle: "Motivación", emoji: "✨", emojiImg: `${EMOJI_BASE}/Star-struck/3D/star-struck_3d.png`, gf: "#e8c94a", gt: "#c07030", color: "hsl(50,88%,65%)", conector: "La motivación no es un estado fijo: es una habilidad que se entrena para sostener el esfuerzo cuando la emoción decae.", description: "Orientar las emociones hacia objetivos personales, mantener la perseverancia y la actitud positiva.", señales: ["Empieza muchos proyectos pero los abandona cuando se vuelven difíciles.", "Necesita que alguien más la empuje para hacer lo que ella misma quiere.", "El aburrimiento o la apatía son su estado habitual, no una excepción."], tips: ["Define una meta clara y divídela en pasos pequeños.", "Celebra tus logros, por pequeños que sean.", "Rodéate de personas que te inspiren y apoyen.", "Define un 'para qué' personal: no solo '¿qué quiero hacer?' sino '¿por qué me importa?'"], hasSubSkills: false, practica: { accion: "Divide una meta en 3 pasos", pasos: ["Escribe una meta que quieras lograr esta semana.", "Divídela en 3 pasos concretos y pequeños.", "Haz el paso 1 hoy, aunque dure solo 10 minutos."] }, x: dp[4].x, y: dp[4].y, my: 670 },
];

const selectedId = ref("autoconciencia");
const selected = computed(() => habilidades.find((h) => h.id === selectedId.value) ?? habilidades[0]);

const practicaChecks = ref<Record<string, boolean[]>>({});
function initChecks(id: string, count: number) {
  if (!practicaChecks.value[id]) {
    practicaChecks.value[id] = new Array(count).fill(false);
  }
}
function toggleCheck(id: string, idx: number) {
  initChecks(id, habilidades.find((h) => h.id === id)!.practica.pasos.length);
  practicaChecks.value[id][idx] = !practicaChecks.value[id][idx];
}
function allChecked(id: string) {
  const checks = practicaChecks.value[id];
  if (!checks) return false;
  return checks.every(Boolean);
}

function selectNode(id: string) {
  selectedId.value = id;
}

function hablarConEmilio() {
  const h = selected.value;
  window.dispatchEvent(new CustomEvent("emilio:open", {
    detail: { contexto: `Estoy explorando la habilidad de "${h.title}". ${h.conector} ${h.description} ¿Puedes ayudarme a desarrollarla?` },
  }));
}

function hablarPracticaConEmilio() {
  const h = selected.value;
  window.dispatchEvent(new CustomEvent("emilio:open", {
    detail: { contexto: `Quiero practicar ${h.title} hoy. Mi práctica es: ${h.practica.accion}. Los pasos son:\n${h.practica.pasos.join("\n")}\n¿Puedes ayudarme a completarla?` },
  }));
}

function qPath(x1: number, y1: number, x2: number, y2: number) {
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
  const dx = x2 - x1, dy = y2 - y1;
  return `M ${x1} ${y1} Q ${Math.round(mx - dy * 0.15)} ${Math.round(my + dx * 0.15)} ${x2} ${y2}`;
}

function animate(svg: SVGSVGElement, isM: boolean) {
  const s = isM ? "m" : "d";
  const ox = isM ? MCX : CX, oy = isM ? MCY : CY;

  gsap.set(svg.querySelectorAll(`.ring-${s}`), { scale: 1, opacity: 0, svgOrigin: `${ox} ${oy}` });
  gsap.set(svg.querySelectorAll(`.path-${s}`), { strokeDashoffset: 1 });
  gsap.set(svg.querySelectorAll(`.node-g-${s}`), { scale: 0, opacity: 0, transformOrigin: "center center" });
  gsap.set(svg.querySelectorAll(`.node-sub-${s}`), { opacity: 0, y: 4 });
  gsap.set(svg.querySelector(`.center-g-${s}`), { scale: 0, opacity: 0, svgOrigin: `${ox} ${oy}` });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: containerRef.value,
      start: "top 78%",
      toggleActions: "play none none reverse",
    },
    onComplete: () => idle(svg, isM),
  });

  tl.to(svg.querySelector(`.center-g-${s}`), { scale: 1, opacity: 1, duration: 0.7, ease: "back.out(1.7)" })
    .to(svg.querySelectorAll(`.path-${s}`), { strokeDashoffset: 0, duration: 1, stagger: 0.1, ease: "power2.inOut" }, "-=0.3")
    .to(svg.querySelectorAll(`.node-g-${s}`), { scale: 1, opacity: 1, duration: 0.55, stagger: 0.1, ease: "back.out(1.7)" }, "-=0.6")
    .to(svg.querySelectorAll(`.node-sub-${s}`), { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: "power2.out" }, "-=0.4");
}

function idle(svg: SVGSVGElement, isM: boolean) {
  const s = isM ? "m" : "d";
  const ox = isM ? MCX : CX, oy = isM ? MCY : CY;

  Array.from(svg.querySelectorAll(`.ring-${s}`)).forEach((ring, i) => {
    gsap.fromTo(ring,
      { scale: 1, opacity: 0.45 },
      { scale: 1.8, opacity: 0, duration: 3, delay: i * 1.5, repeat: -1, ease: "power1.out", svgOrigin: `${ox} ${oy}` }
    );
  });

  const amps = [7, 6, 8, 5, 7];
  const speeds = [2.8, 3.3, 2.6, 3.1, 2.4];
  const delays = [0, 0.55, 1.1, 0.3, 0.85];

  svg.querySelectorAll(`.node-g-${s}`).forEach((el, i) => {
    gsap.to(el, { y: amps[i], duration: speeds[i], delay: delays[i], repeat: -1, yoyo: true, ease: "sine.inOut" });
  });
}

function setupHover(svg: SVGSVGElement, isM: boolean) {
  const s = isM ? "m" : "d";
  svg.querySelectorAll(`.node-g-${s}`).forEach(group => {
    const circle = group.querySelector("circle");
    if (!circle) return;
    group.addEventListener("mouseenter", () =>
      gsap.to(circle, { scale: 1.1, duration: 0.25, ease: "back.out(1.5)", transformOrigin: "center center" })
    );
    group.addEventListener("mouseleave", () =>
      gsap.to(circle, { scale: 1, duration: 0.2, ease: "power2.out", transformOrigin: "center center" })
    );
  });
}

let testRamaHandler: ((e: Event) => void) | null = null;

onMounted(() => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!prefersReduced) {
    ([{ svg: svgRef.value, isM: false }, { svg: svgMRef.value, isM: true }] as const).forEach(({ svg, isM }) => {
      if (!svg) return;
      animate(svg, isM);
      setupHover(svg, isM);
    });
  }

  testRamaHandler = (e: Event) => {
    const rama = (e as CustomEvent<{ rama: string }>).detail?.rama;
    if (rama === "ansiedad") selectedId.value = "autorregulacion";
    else if (rama === "ira-tristeza") selectedId.value = "autoconciencia";
    else if (rama === "alegria-calma") selectedId.value = "empatia";
  };
  window.addEventListener("test-rama", testRamaHandler);
});

onUnmounted(() => {
  if (testRamaHandler) window.removeEventListener("test-rama", testRamaHandler);
});
</script>

<template>
  <div ref="containerRef" class="w-full max-w-6xl mx-auto my-10 px-4">
    <!-- Intro text -->
    <div class="text-center mb-6 max-w-2xl mx-auto">
      <p class="text-sm text-muted-foreground leading-relaxed">
        <span class="font-semibold text-foreground">Cinco habilidades</span> que transforman lo que se siente en cómo se actúa.
        Toca cada una para descubrir qué es, cómo reconocer si falta trabajarla y una práctica para hoy.
      </p>
    </div>

    <p class="text-center text-xs font-semibold text-muted-foreground/60 uppercase tracking-widest mb-8">
      Cómo se conectan
    </p>

    <!-- ─── DESKTOP: Radial pentagon ─── -->
    <svg
      ref="svgRef"
      viewBox="0 0 600 510"
      class="w-full h-auto hidden md:block"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gc-d" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#4a5568" />
          <stop offset="100%" stop-color="#1a202c" />
        </linearGradient>
        <linearGradient
          v-for="n in habilidades"
          :id="`gn-d-${n.id}`"
          :key="n.id"
          x1="0%" y1="0%" x2="100%" y2="100%"
        >
          <stop offset="0%" :stop-color="n.gf" />
          <stop offset="100%" :stop-color="n.gt" />
        </linearGradient>
        <filter id="shadow-d" x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow dx="0" dy="4" stdDeviation="7" flood-color="rgba(0,0,0,0.18)" />
        </filter>
        <filter id="shadow-center-d" x="-35%" y="-35%" width="170%" height="170%">
          <feDropShadow dx="0" dy="6" stdDeviation="12" flood-color="rgba(0,0,0,0.22)" />
        </filter>
      </defs>

      <!-- Ripple rings -->
      <circle class="ring-d" :cx="CX" :cy="CY" r="66" fill="none" stroke="#7c8cf8" stroke-width="1.5" />
      <circle class="ring-d" :cx="CX" :cy="CY" r="66" fill="none" stroke="#7c8cf8" stroke-width="1.5" />

      <!-- Connection paths from center to each leaf -->
      <path
        v-for="h in habilidades"
        :key="`p-${h.id}`"
        :d="qPath(CX, CY, h.x, h.y)"
        class="path-d"
        fill="none"
        stroke="hsl(var(--border))"
        stroke-width="2"
        pathLength="1"
      />

      <!-- Center node -->
      <g class="center-g-d">
        <circle :cx="CX" :cy="CY" r="60" fill="url(#gc-d)" filter="url(#shadow-center-d)" />
        <circle :cx="CX" :cy="CY" r="54" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1.5" />
        <image :x="CX - 14" :y="CY - 24" width="28" height="28" :href="`${EMOJI_BASE}/Brain/3D/brain_3d.png`" />
        <text :x="CX" :y="CY + 12" text-anchor="middle" fill="white" font-size="9.5" font-weight="700" letter-spacing="0.8">HABILIDADES</text>
        <text :x="CX" :y="CY + 26" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-size="7.5" letter-spacing="0.6">SOCIOEMOCIONALES</text>
      </g>

      <!-- Leaf nodes (clickable) -->
      <g
        v-for="h in habilidades"
        :key="h.id"
        class="node-g-d cursor-pointer"
        :class="selectedId === h.id ? 'active-node-d' : ''"
        @click="selectNode(h.id)"
      >
        <circle
          :cx="h.x" :cy="h.y" r="43"
          :fill="`url(#gn-d-${h.id})`"
          :stroke="selectedId === h.id ? 'white' : 'transparent'"
          :stroke-width="selectedId === h.id ? 3 : 0"
          filter="url(#shadow-d)"
        />
        <circle :cx="h.x" :cy="h.y" r="37" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="1" />
        <image :x="h.x - 12" :y="h.y - 22" width="24" height="24" :href="h.emojiImg" />
        <text text-anchor="middle" fill="white" font-size="9.5" font-weight="700">
          <tspan
            v-for="(line, li) in h.shortTitle.split(' ')"
            :key="li"
            :x="h.x"
            :y="h.y + (h.shortTitle.includes(' ') ? (li === 0 ? 6 : 19) : 11)"
          >{{ line }}</tspan>
        </text>
      </g>

      <!-- Sub-labels below each leaf -->
      <text
        v-for="h in habilidades"
        :key="`sub-${h.id}`"
        :x="h.x"
        :y="h.y + 56"
        text-anchor="middle"
        fill="hsl(var(--muted-foreground))"
        font-size="7.5"
        class="node-sub-d"
      >Paso {{ habilidades.findIndex(n => n.id === h.id) + 1 }}</text>
    </svg>

    <!-- ─── MOBILE: Vertical chain ─── -->
    <svg
      ref="svgMRef"
      viewBox="0 0 300 750"
      class="w-full h-auto md:hidden"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gc-m" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#4a5568" />
          <stop offset="100%" stop-color="#1a202c" />
        </linearGradient>
        <linearGradient
          v-for="n in habilidades"
          :id="`gn-m-${n.id}`"
          :key="n.id"
          x1="0%" y1="0%" x2="100%" y2="100%"
        >
          <stop offset="0%" :stop-color="n.gf" />
          <stop offset="100%" :stop-color="n.gt" />
        </linearGradient>
        <filter id="shadow-m" x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow dx="0" dy="3" stdDeviation="6" flood-color="rgba(0,0,0,0.16)" />
        </filter>
        <filter id="shadow-center-m" x="-35%" y="-35%" width="170%" height="170%">
          <feDropShadow dx="0" dy="5" stdDeviation="10" flood-color="rgba(0,0,0,0.2)" />
        </filter>
      </defs>

      <!-- Ripple rings -->
      <circle class="ring-m" :cx="MCX" :cy="MCY" r="58" fill="none" stroke="#7c8cf8" stroke-width="1.5" />
      <circle class="ring-m" :cx="MCX" :cy="MCY" r="58" fill="none" stroke="#7c8cf8" stroke-width="1.5" />

      <!-- Chain paths -->
      <path :d="`M ${MCX} ${MCY + 52} L ${MCX} ${habilidades[0].my - 38}`" class="path-m" fill="none" stroke="hsl(var(--border))" stroke-width="2" pathLength="1" />
      <path
        v-for="(_, i) in habilidades.slice(0, 4)"
        :key="`pm-${i}`"
        :d="`M ${MCX} ${habilidades[i].my + 38} L ${MCX} ${habilidades[i + 1].my - 38}`"
        class="path-m" fill="none" stroke="hsl(var(--border))" stroke-width="2" pathLength="1"
      />

      <!-- Center node -->
      <g class="center-g-m">
        <circle :cx="MCX" :cy="MCY" r="52" fill="url(#gc-m)" filter="url(#shadow-center-m)" />
        <circle :cx="MCX" :cy="MCY" r="46" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1.5" />
        <image :x="MCX - 12" :y="MCY - 21" width="24" height="24" :href="`${EMOJI_BASE}/Brain/3D/brain_3d.png`" />
        <text :x="MCX" :y="MCY + 10" text-anchor="middle" fill="white" font-size="9" font-weight="700" letter-spacing="0.8">HABILIDADES</text>
        <text :x="MCX" :y="MCY + 23" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-size="7" letter-spacing="0.6">SOCIOEMOCIONALES</text>
      </g>

      <!-- Leaf nodes mobile -->
      <g
        v-for="h in habilidades"
        :key="h.id"
        class="node-g-m cursor-pointer"
        :class="selectedId === h.id ? 'active-node-m' : ''"
        @click="selectNode(h.id)"
      >
        <circle
          :cx="MCX" :cy="h.my" r="38"
          :fill="`url(#gn-m-${h.id})`"
          :stroke="selectedId === h.id ? 'white' : 'transparent'"
          :stroke-width="selectedId === h.id ? 3 : 0"
          filter="url(#shadow-m)"
        />
        <circle :cx="MCX" :cy="h.my" r="33" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="1" />
        <image :x="MCX - 10" :y="h.my - 19" width="20" height="20" :href="h.emojiImg" />
        <text :x="MCX" :y="h.my + 11" text-anchor="middle" fill="white" font-size="9" font-weight="700">{{ h.shortTitle }}</text>
      </g>

      <text
        v-for="h in habilidades"
        :key="`sub-m-${h.id}`"
        :x="MCX"
        :y="h.my + 49"
        text-anchor="middle"
        fill="hsl(var(--muted-foreground))"
        font-size="7.5"
        class="node-sub-m"
      >Paso {{ habilidades.findIndex(n => n.id === h.id) + 1 }}</text>
    </svg>

    <!-- Detail Panel (same as before) -->
    <div class="max-w-3xl mx-auto mt-10">
      <Transition name="panel-slide" mode="out-in">
        <div
          :key="selectedId"
          class="overflow-hidden rounded-3xl border border-border/60 bg-surface shadow-soft"
        >
          <div class="p-6 sm:p-7" :style="{ background: `linear-gradient(135deg, ${selected.gf}18 0%, hsl(var(--surface)) 65%)` }">
            <div class="flex items-start gap-4 mb-5">
              <div
                class="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center shadow-md"
                :style="{ background: `linear-gradient(135deg, ${selected.gf}30, ${selected.gt}45)`, boxShadow: `0 12px 28px ${selected.gf}30` }"
              >
                <img :src="selected.emojiImg" :alt="selected.title" class="w-10 h-10 drop-shadow-sm" />
              </div>
              <div>
                <span class="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide mb-2" :style="{ color: selected.color, backgroundColor: `${selected.gf}18` }">
                  Habilidad socioemocional
                </span>
                <h3 class="text-2xl sm:text-3xl font-bold leading-tight" :style="{ color: selected.color }">
                  {{ selected.title }}
                </h3>
              </div>
            </div>

            <div class="rounded-xl px-4 py-3 mb-4" :style="{ backgroundColor: `${selected.gf}14` }">
              <p class="text-sm italic text-foreground/80 leading-relaxed">{{ selected.conector }}</p>
            </div>

            <p class="text-muted-foreground leading-relaxed text-sm mb-5">{{ selected.description }}</p>

            <div v-if="selected.hasSubSkills" class="mb-5">
              <HabilidadesSociales />
            </div>

            <template v-else>
              <div v-if="selected.señales.length" class="rounded-2xl bg-surface/85 border border-border/60 p-4 mb-4">
                <p class="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5 text-muted-foreground">
                  <AlertCircle class="w-3.5 h-3.5 flex-shrink-0" /> Señales de que falta trabajarla
                </p>
                <ul class="space-y-2">
                  <li v-for="s in selected.señales" :key="s" class="flex items-start gap-2 text-sm text-foreground/80">
                    <span class="mt-0.5 flex-shrink-0 text-muted-foreground font-bold">›</span> {{ s }}
                  </li>
                </ul>
              </div>

              <div class="rounded-2xl p-4 mb-5" :style="{ backgroundColor: `${selected.gf}12` }">
                <p class="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5" :style="{ color: selected.color }">
                  <Lightbulb class="w-3.5 h-3.5 flex-shrink-0" /> Cómo desarrollarla
                </p>
                <ul class="space-y-2">
                  <li v-for="tip in selected.tips" :key="tip" class="flex items-start gap-2 text-sm text-foreground/80">
                    <span class="mt-0.5 flex-shrink-0 font-bold" :style="{ color: selected.color }">›</span> {{ tip }}
                  </li>
                </ul>
              </div>
            </template>

            <!-- Práctica de hoy -->
            <div class="rounded-2xl border p-4 sm:p-5 mb-5" :style="{ borderColor: `${selected.gf}35`, backgroundColor: `${selected.gf}0A` }">
              <div class="flex items-center gap-2.5 mb-3">
                <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-surface shadow-sm">
                  <img class="w-5 h-5" src="https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@latest/assets/Flexed%20biceps/Default/3D/flexed_biceps_3d_default.png" alt="Práctica" />
                </div>
                <div>
                  <h4 class="font-bold text-foreground text-sm">Práctica de hoy</h4>
                  <p class="text-xs text-muted-foreground">{{ selected.practica.accion }}</p>
                </div>
              </div>
              <ul class="space-y-2">
                <li
                  v-for="(paso, pi) in selected.practica.pasos"
                  :key="pi"
                  class="flex items-start gap-3 rounded-xl bg-surface/80 backdrop-blur-sm p-3 cursor-pointer hover:bg-surface transition-colors"
                  @click="toggleCheck(selected.id, pi)"
                >
                  <CheckCircle2 v-if="practicaChecks[selected.id]?.[pi]" class="h-5 w-5 mt-0.5 flex-shrink-0" :style="{ color: selected.gf }" />
                  <Circle v-else class="h-5 w-5 mt-0.5 flex-shrink-0 text-muted-foreground/40" />
                  <span class="text-sm leading-relaxed" :class="practicaChecks[selected.id]?.[pi] ? 'text-muted-foreground/70 line-through' : 'text-foreground'">
                    {{ paso }}
                  </span>
                </li>
              </ul>
              <div class="mt-3 flex flex-col sm:flex-row gap-2">
                <button
                  v-if="allChecked(selected.id)"
                  @click="hablarPracticaConEmilio"
                  class="inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-xs font-semibold bg-foreground text-background shadow-soft motion-safe:hover:-translate-y-0.5 transition-[transform,box-shadow] duration-200 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <BotMessageSquare class="w-3.5 h-3.5" />
                  Contarle a Emilio que lo completé
                </button>
                <button
                  v-else
                  @click="hablarPracticaConEmilio"
                  class="inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-xs font-semibold border border-primary/30 text-primary hover:bg-primary/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <BotMessageSquare class="w-3.5 h-3.5" />
                  Pedir ayuda a Emilio con esta práctica
                </button>
              </div>
            </div>

            <button
              @click="hablarConEmilio"
              class="w-full inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold bg-foreground text-background shadow-soft motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 transition-[transform,box-shadow] duration-200 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <BotMessageSquare class="w-4 h-4" />
              Practicar {{ selected.title }} con Emilio
            </button>
          </div>

          <div class="border-t border-border/60 bg-background px-6 py-4">
            <p class="text-sm text-muted-foreground">
              <span class="font-semibold text-foreground">{{ selected.title }}</span>
              &nbsp;· Habilidad {{ habilidades.findIndex((h) => h.id === selectedId) + 1 }} de {{ habilidades.length }}
            </p>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.path-d,
.path-m {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
}

.panel-slide-enter-active,
.panel-slide-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.panel-slide-enter-from {
  opacity: 0;
  transform: translateX(16px);
}
.panel-slide-leave-to {
  opacity: 0;
  transform: translateX(-16px);
}

@media (prefers-reduced-motion: reduce) {
  .panel-slide-enter-active,
  .panel-slide-leave-active {
    transition: none;
  }
  .panel-slide-enter-from,
  .panel-slide-leave-to {
    transform: none;
    opacity: 1;
  }
}
</style>
