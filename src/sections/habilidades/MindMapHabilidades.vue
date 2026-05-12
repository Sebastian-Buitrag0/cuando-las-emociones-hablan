<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HabilidadesSociales from "./HabilidadesSociales.vue";
import { AlertCircle, BotMessageSquare, Lightbulb } from "lucide-vue-next";

gsap.registerPlugin(ScrollTrigger);

const EMOJI_BASE = "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@latest/assets";
const containerRef = ref<HTMLElement | null>(null);
const svgRef = ref<SVGSVGElement | null>(null);

const CX = 300, CY = 262, R = 168;

function toRad(d: number) { return d * Math.PI / 180; }
function polar(cx: number, cy: number, r: number, d: number) {
  return { x: Math.round(cx + r * Math.cos(toRad(d))), y: Math.round(cy + r * Math.sin(toRad(d))) };
}
const dp = [-90, -18, 54, 126, 198].map(a => polar(CX, CY, R, a));

interface Habilidad {
  id: string; title: string; lines: string[]; sub: string;
  emoji: string; emojiImg: string; gf: string; gt: string; color: string;
  conector: string; description: string; señales: string[]; tips: string[];
  hasSubSkills: boolean; x: number; y: number;
}

const habilidades: Habilidad[] = [
  {
    id: "autoconciencia", title: "Autoconciencia",
    lines: ["Autoconciencia"], sub: "Reconocerte a ti mismo",
    emoji: "🧠", emojiImg: `${EMOJI_BASE}/Face%20in%20clouds/3D/face_in_clouds_3d.png`,
    gf: "#667eea", gt: "#764ba2", color: "hsl(var(--primary))",
    conector: "Es el punto de partida: sin reconocer lo que sentimos, no podemos gestionarlo.",
    description: "Reconocer y comprender nuestras propias emociones, fortalezas, limitaciones y cómo afectan nuestro comportamiento.",
    señales: [
      "No sabe con certeza por qué reacciona de cierta manera ante situaciones concretas.",
      "Las emociones la sorprenden y la desbordan con frecuencia.",
      "Le cuesta responder honestamente '¿cómo estoy?' más allá de 'bien' o 'mal'.",
    ],
    tips: [
      "Pregúntate: ¿Qué estoy sintiendo en este momento?",
      "Identifica en qué parte del cuerpo sientes esa emoción.",
      "Escribe 3 pensamientos que acompañan esa emoción.",
      "Practica el 'check-in' diario: antes de dormir, nombra 3 emociones que sentiste hoy.",
    ],
    hasSubSkills: false, x: dp[0].x, y: dp[0].y,
  },
  {
    id: "autorregulacion", title: "Autorregulación",
    lines: ["Autorregulación"], sub: "Gestionar emociones",
    emoji: "⚖️", emojiImg: `${EMOJI_BASE}/Shield/3D/shield_3d.png`,
    gf: "#38b2ac", gt: "#2b6cb0", color: "hsl(var(--calm))",
    conector: "Reconocer es el primer paso; autorregularse es expresar esa emoción sin que nos controle.",
    description: "Gestionar las emociones de manera saludable, controlar impulsos y adaptarse a los cambios con flexibilidad.",
    señales: [
      "Reacciona de formas que después lamenta, y el ciclo se repite.",
      "Siente que las emociones 'explotan' antes de que pueda pensar.",
      "Le cuesta calmarse después de enojarse, asustarse o sentirse herido/a.",
    ],
    tips: [
      "Respira profundo durante 4 segundos antes de reaccionar.",
      "Cuenta hasta 10 cuando sientas que pierdes el control.",
      "Cambia el pensamiento negativo por uno más realista: ¿qué evidencia tengo de esto?",
      "Practica la pausa: aléjate 5 minutos antes de responder en caliente.",
    ],
    hasSubSkills: false, x: dp[1].x, y: dp[1].y,
  },
  {
    id: "empatia", title: "Empatía",
    lines: ["Empatía"], sub: "Comprender al otro",
    emoji: "💜", emojiImg: `${EMOJI_BASE}/Smiling%20face%20with%20hearts/3D/smiling_face_with_hearts_3d.png`,
    gf: "#b794f4", gt: "#d53f8c", color: "hsl(var(--accent))",
    conector: "La empatía convierte la convivencia en algo más que coexistir: es la base de las relaciones reales.",
    description: "Comprender los sentimientos de los demás, ponerse en su lugar y responder con compasión.",
    señales: [
      "Siente que nadie la entiende, pero tampoco logra entender a otros.",
      "Juzga rápidamente sin esperar escuchar el contexto completo.",
      "Le cuesta reconocer cuándo alguien cercano está mal si no se lo dice directamente.",
    ],
    tips: [
      "Ponte en el lugar del otro antes de juzgar.",
      "Pregunta: '¿Cómo te sientes?' y escucha sin interrumpir.",
      "Escucha sin dar consejos inmediatos — a veces solo necesitan ser escuchados.",
      "Antes de responder en un conflicto, repite con tus palabras lo que la otra persona dijo.",
    ],
    hasSubSkills: false, x: dp[2].x, y: dp[2].y,
  },
  {
    id: "habilidades", title: "Habilidades Sociales",
    lines: ["Habilidades", "Sociales"], sub: "Conectar con otros",
    emoji: "🤝", emojiImg: `${EMOJI_BASE}/People%20hugging/3D/people_hugging_3d.png`,
    gf: "#f6ad55", gt: "#ed8936", color: "hsl(var(--secondary))",
    conector: "Son las herramientas concretas para poner en práctica todo lo anterior en tus relaciones.",
    description: "Competencias específicas para relacionarte con otros: comunicar, escuchar, cooperar y resolver desacuerdos.",
    señales: [], tips: [], hasSubSkills: true,
    x: dp[3].x, y: dp[3].y,
  },
  {
    id: "motivacion", title: "Motivación",
    lines: ["Motivación"], sub: "Impulsar el cambio",
    emoji: "✨", emojiImg: `${EMOJI_BASE}/Star-struck/3D/star-struck_3d.png`,
    gf: "#e8c94a", gt: "#c07030", color: "hsl(50,88%,65%)",
    conector: "La motivación no es un estado fijo: es una habilidad que se entrena para sostener el esfuerzo cuando la emoción decae.",
    description: "Orientar las emociones hacia objetivos personales, mantener la perseverancia y la actitud positiva.",
    señales: [
      "Empieza muchos proyectos pero los abandona cuando se vuelven difíciles.",
      "Necesita que alguien más la empuje para hacer lo que ella misma quiere.",
      "El aburrimiento o la apatía son su estado habitual, no una excepción.",
    ],
    tips: [
      "Define una meta clara y divídela en pasos pequeños.",
      "Celebra tus logros, por pequeños que sean.",
      "Rodéate de personas que te inspiren y apoyen.",
      "Define un 'para qué' personal: no solo '¿qué quiero hacer?' sino '¿por qué me importa?'",
    ],
    hasSubSkills: false, x: dp[4].x, y: dp[4].y,
  },
];

const selectedId = ref("autoconciencia");
const selected = computed(() => habilidades.find(h => h.id === selectedId.value) ?? habilidades[0]);

function selectNode(id: string) { selectedId.value = id; }

function hablarConEmilio() {
  const h = selected.value;
  window.dispatchEvent(new CustomEvent("emilio:open", {
    detail: {
      contexto: `Estoy explorando la habilidad de "${h.title}". ${h.conector} ${h.description} ¿Puedes ayudarme a desarrollarla?`,
    },
  }));
}

function qPath(x1: number, y1: number, x2: number, y2: number) {
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
  const dx = x2 - x1, dy = y2 - y1;
  return `M ${x1} ${y1} Q ${Math.round(mx - dy * 0.15)} ${Math.round(my + dx * 0.15)} ${x2} ${y2}`;
}

function animate(svg: SVGSVGElement) {
  gsap.set(svg.querySelectorAll(".ring-d"), { scale: 1, opacity: 0, svgOrigin: `${CX} ${CY}` });
  gsap.set(svg.querySelectorAll(".path-d"), { strokeDashoffset: 1 });
  gsap.set(svg.querySelectorAll(".node-g-d"), { scale: 0, opacity: 0, transformOrigin: "center center" });
  gsap.set(svg.querySelectorAll(".node-sub-d"), { opacity: 0, y: 4 });
  gsap.set(svg.querySelector(".center-g-d"), { scale: 0, opacity: 0, svgOrigin: `${CX} ${CY}` });

  const tl = gsap.timeline({
    scrollTrigger: { trigger: containerRef.value, start: "top 78%", toggleActions: "play none none reverse" },
    onComplete: () => idle(svg),
  });
  tl.to(svg.querySelector(".center-g-d"), { scale: 1, opacity: 1, duration: 0.7, ease: "back.out(1.7)" })
    .to(svg.querySelectorAll(".path-d"), { strokeDashoffset: 0, duration: 1, stagger: 0.1, ease: "power2.inOut" }, "-=0.3")
    .to(svg.querySelectorAll(".node-g-d"), { scale: 1, opacity: 1, duration: 0.55, stagger: 0.1, ease: "back.out(1.7)" }, "-=0.6")
    .to(svg.querySelectorAll(".node-sub-d"), { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: "power2.out" }, "-=0.4");
}

function idle(svg: SVGSVGElement) {
  Array.from(svg.querySelectorAll(".ring-d")).forEach((ring, i) => {
    gsap.fromTo(ring,
      { scale: 1, opacity: 0.45 },
      { scale: 1.8, opacity: 0, duration: 3, delay: i * 1.5, repeat: -1, ease: "power1.out", svgOrigin: `${CX} ${CY}` }
    );
  });
  const amps = [7, 6, 8, 5, 7], speeds = [2.8, 3.3, 2.6, 3.1, 2.4], delays = [0, 0.55, 1.1, 0.3, 0.85];
  svg.querySelectorAll(".node-g-d").forEach((el, i) => {
    gsap.to(el, { y: amps[i], duration: speeds[i], delay: delays[i], repeat: -1, yoyo: true, ease: "sine.inOut" });
  });
}

onMounted(() => {
  if (!svgRef.value || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  animate(svgRef.value);
});
</script>

<template>
  <div ref="containerRef" class="w-full max-w-6xl mx-auto my-10 px-4">
    <p class="text-center text-xs font-semibold text-muted-foreground/60 uppercase tracking-widest mb-8">
      Cómo se conectan
    </p>

    <div class="grid grid-cols-1 xl:grid-cols-[460px_1fr] gap-8 items-start">

      <!-- ── LEFT: SVG diagram (md+, below panel on mobile) ── -->
      <div class="order-2 xl:order-1 hidden md:block">
        <svg
          ref="svgRef"
          viewBox="0 0 600 510"
          class="w-full h-auto"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Diagrama de habilidades socioemocionales — haz clic en un nodo para explorar"
          role="img"
        >
          <defs>
            <linearGradient id="gc-d" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="hsl(var(--foreground))" />
              <stop offset="100%" stop-color="hsl(var(--foreground))" />
            </linearGradient>
            <linearGradient
              v-for="h in habilidades"
              :id="`gn-d-${h.id}`"
              :key="h.id"
              x1="0%" y1="0%" x2="100%" y2="100%"
            >
              <stop offset="0%" :stop-color="h.gf" />
              <stop offset="100%" :stop-color="h.gt" />
            </linearGradient>
            <filter id="shadow-d" x="-25%" y="-25%" width="150%" height="150%">
              <feDropShadow dx="0" dy="4" stdDeviation="7" flood-color="rgba(0,0,0,0.18)" />
            </filter>
            <filter id="shadow-center-d" x="-35%" y="-35%" width="170%" height="170%">
              <feDropShadow dx="0" dy="6" stdDeviation="12" flood-color="rgba(0,0,0,0.22)" />
            </filter>
          </defs>

          <!-- Ripple rings -->
          <circle class="ring-d" :cx="CX" :cy="CY" r="66" fill="none" stroke="hsl(var(--primary))" stroke-width="1.5" />
          <circle class="ring-d" :cx="CX" :cy="CY" r="66" fill="none" stroke="hsl(var(--primary))" stroke-width="1.5" />

          <!-- Connection paths — reactive color when node selected -->
          <path
            v-for="h in habilidades"
            :key="`p-${h.id}`"
            :d="qPath(CX, CY, h.x, h.y)"
            class="path-d"
            fill="none"
            :stroke="selectedId === h.id ? h.gt : 'hsl(var(--border))'"
            :stroke-width="selectedId === h.id ? 2.5 : 1.5"
            pathLength="1"
            style="transition: stroke 0.35s ease, stroke-width 0.35s ease;"
          />

          <!-- Center node -->
          <g class="center-g-d">
            <circle :cx="CX" :cy="CY" r="60" fill="url(#gc-d)" filter="url(#shadow-center-d)" />
            <circle :cx="CX" :cy="CY" r="54" fill="none" stroke="hsl(var(--surface) / 0.12)" stroke-width="1.5" />
            <text :x="CX" :y="CY - 11" text-anchor="middle" dominant-baseline="central" font-size="20">🌟</text>
            <text :x="CX" :y="CY + 8" text-anchor="middle" fill="hsl(var(--surface))" font-size="9.5" font-weight="700" letter-spacing="0.8">HABILIDADES</text>
            <text :x="CX" :y="CY + 22" text-anchor="middle" fill="hsl(var(--surface) / 0.6)" font-size="7.5" letter-spacing="0.6">SOCIOEMOCIONALES</text>
          </g>

          <!-- Leaf nodes — clickable, keyboard accessible -->
          <g
            v-for="h in habilidades"
            :key="h.id"
            class="node-g-d"
            role="button"
            :aria-pressed="selectedId === h.id"
            :aria-label="`Seleccionar ${h.title}`"
            tabindex="0"
            style="cursor: pointer;"
            @click="selectNode(h.id)"
            @keydown.enter="selectNode(h.id)"
            @keydown.space.prevent="selectNode(h.id)"
          >
            <!-- Main filled circle -->
            <circle :cx="h.x" :cy="h.y" r="43" :fill="`url(#gn-d-${h.id})`" filter="url(#shadow-d)" />
            <!-- Inner shine -->
            <circle :cx="h.x" :cy="h.y" r="37" fill="none" stroke="hsl(var(--surface) / 0.18)" stroke-width="1" />
            <!-- Selection ring (opacity-driven by Vue reactive binding) -->
            <circle
              :cx="h.x" :cy="h.y" r="53"
              fill="none" :stroke="h.gt" stroke-width="2.5" stroke-dasharray="5 3"
              :style="{ opacity: selectedId === h.id ? 0.85 : 0, transition: 'opacity 0.35s ease' }"
            />
            <!-- Emoji -->
            <text
              :x="h.x"
              :y="h.y + (h.lines.length > 1 ? -14 : -10)"
              text-anchor="middle"
              dominant-baseline="central"
              font-size="18"
            >{{ h.emoji }}</text>
            <!-- Label -->
            <text text-anchor="middle" fill="hsl(var(--surface))" font-size="9.5" font-weight="700">
              <tspan
                v-for="(line, li) in h.lines"
                :key="li"
                :x="h.x"
                :y="h.y + (h.lines.length > 1 ? (li === 0 ? 6 : 19) : 11)"
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
          >{{ h.sub }}</text>
        </svg>

        <!-- Legend -->
        <div class="mt-4 flex flex-wrap justify-center gap-6">
          <div class="flex items-center gap-2 text-xs text-muted-foreground">
            <span class="w-6 h-0.5 bg-muted rounded-full inline-block" />
            <span>Conexión con el centro</span>
          </div>
          <div class="flex items-center gap-2 text-xs text-muted-foreground">
            <span class="w-2.5 h-2.5 rounded-full bg-primary/60 inline-block" />
            <span>Haz clic en un nodo para explorar</span>
          </div>
        </div>
      </div>

      <!-- ── RIGHT: Chip selector + Detail panel ── -->
      <div class="order-1 xl:order-2 xl:sticky xl:top-24">

        <!-- Chip selector -->
        <div class="flex flex-wrap gap-2 mb-5" role="group" aria-label="Seleccionar habilidad">
          <button
            v-for="h in habilidades"
            :key="`chip-${h.id}`"
            type="button"
            class="inline-flex items-center gap-1.5 rounded-full border px-3 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            :class="selectedId === h.id
              ? 'text-white border-transparent shadow-sm'
              : 'bg-surface text-foreground/80 border-border hover:border-foreground/30'"
            :style="selectedId === h.id ? { backgroundColor: h.gf } : {}"
            :aria-pressed="selectedId === h.id"
            @click="selectNode(h.id)"
          >
            <span aria-hidden="true">{{ h.emoji }}</span>
            <span>{{ h.title }}</span>
          </button>
        </div>

        <!-- Detail panel -->
        <Transition name="panel-slide" mode="out-in">
          <div
            :key="selectedId"
            class="overflow-hidden rounded-3xl border border-border/60 bg-surface shadow-soft"
          >
            <!-- Header with tinted gradient -->
            <div
              class="p-6 sm:p-7"
              :style="{ background: `linear-gradient(135deg, ${selected.gf}18 0%, hsl(var(--surface)) 65%)` }"
            >
              <!-- Identity row -->
              <div class="flex items-start gap-4 mb-5">
                <div
                  class="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center shadow-md"
                  :style="{
                    background: `linear-gradient(135deg, ${selected.gf}30, ${selected.gt}45)`,
                    boxShadow: `0 12px 28px ${selected.gf}30`,
                  }"
                >
                  <img :src="selected.emojiImg" :alt="selected.title" class="w-10 h-10 drop-shadow-sm" />
                </div>
                <div>
                  <span
                    class="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide mb-2"
                    :style="{ color: selected.color, backgroundColor: `${selected.gf}18` }"
                  >
                    Habilidad socioemocional
                  </span>
                  <h3 class="text-2xl sm:text-3xl font-bold leading-tight" :style="{ color: selected.color }">
                    {{ selected.title }}
                  </h3>
                </div>
              </div>

              <!-- Conector quote (background tint, no side-stripe border) -->
              <div
                class="rounded-xl px-4 py-3 mb-4"
                :style="{ backgroundColor: `${selected.gf}14` }"
              >
                <p class="text-sm italic text-foreground/80 leading-relaxed">
                  {{ selected.conector }}
                </p>
              </div>

              <!-- Description -->
              <p class="text-muted-foreground leading-relaxed text-sm mb-5">
                {{ selected.description }}
              </p>

              <!-- HabilidadesSociales (when hasSubSkills) -->
              <div v-if="selected.hasSubSkills" class="mb-5">
                <HabilidadesSociales />
              </div>

              <template v-else>
                <!-- Señales -->
                <div
                  v-if="selected.señales.length"
                  class="rounded-2xl bg-surface/85 border border-border/60 p-4 mb-4"
                >
                  <p class="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5 text-muted-foreground">
                    <AlertCircle class="w-3.5 h-3.5 flex-shrink-0" />
                    Señales de que falta trabajarla
                  </p>
                  <ul class="space-y-2">
                    <li
                      v-for="s in selected.señales"
                      :key="s"
                      class="flex items-start gap-2 text-sm text-foreground/80"
                    >
                      <span class="mt-0.5 flex-shrink-0 text-muted-foreground font-bold">›</span>
                      {{ s }}
                    </li>
                  </ul>
                </div>

                <!-- Tips -->
                <div
                  class="rounded-2xl p-4 mb-5"
                  :style="{ backgroundColor: `${selected.gf}12` }"
                >
                  <p
                    class="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5"
                    :style="{ color: selected.color }"
                  >
                    <Lightbulb class="w-3.5 h-3.5 flex-shrink-0" />
                    Cómo desarrollarla
                  </p>
                  <ul class="space-y-2">
                    <li
                      v-for="tip in selected.tips"
                      :key="tip"
                      class="flex items-start gap-2 text-sm text-foreground/80"
                    >
                      <span class="mt-0.5 flex-shrink-0 font-bold" :style="{ color: selected.color }">›</span>
                      {{ tip }}
                    </li>
                  </ul>
                </div>
              </template>

              <!-- CTA — always shown -->
              <button
                @click="hablarConEmilio"
                class="w-full inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold bg-foreground text-background shadow-soft motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 transition-[transform,box-shadow] duration-200 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <BotMessageSquare class="w-4 h-4" />
                Practicar {{ selected.title }} con Emilio
              </button>
            </div>

            <!-- Footer -->
            <div class="border-t border-border/60 bg-background px-6 py-4">
              <p class="text-sm text-muted-foreground">
                <span class="font-semibold text-foreground">{{ selected.sub }}</span>
                &nbsp;· Habilidad {{ habilidades.findIndex(h => h.id === selectedId) + 1 }} de {{ habilidades.length }}
              </p>
            </div>
          </div>
        </Transition>
      </div>

    </div>
  </div>
</template>

<style scoped>
.path-d {
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
  .panel-slide-leave-active { transition: none; }
  .panel-slide-enter-from,
  .panel-slide-leave-to { transform: none; opacity: 1; }
}
</style>
