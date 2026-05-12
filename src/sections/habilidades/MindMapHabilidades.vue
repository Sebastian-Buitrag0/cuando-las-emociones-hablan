<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HabilidadesSociales from "./HabilidadesSociales.vue";
import { AlertCircle, BotMessageSquare, Lightbulb, CheckCircle2, Circle, ArrowRight } from "lucide-vue-next";

gsap.registerPlugin(ScrollTrigger);

const EMOJI_BASE = "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@latest/assets";
const containerRef = ref<HTMLElement | null>(null);
const flowRef = ref<HTMLElement | null>(null);

interface Habilidad {
  id: string;
  title: string;
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
}

const habilidades: Habilidad[] = [
  {
    id: "autoconciencia",
    title: "Autoconciencia",
    emoji: "🧠",
    emojiImg: `${EMOJI_BASE}/Face%20in%20clouds/3D/face_in_clouds_3d.png`,
    gf: "#667eea",
    gt: "#764ba2",
    color: "hsl(var(--primary))",
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
    hasSubSkills: false,
    practica: {
      accion: "Check-in emocional de 3 momentos",
      pasos: [
        "En la mañana, al llegar al colegio: ¿cómo te sientes?",
        "En la tarde, después del almuerzo: ¿cambió algo?",
        "En la noche, antes de dormir: ¿qué emoción predominó?",
      ],
    },
  },
  {
    id: "autorregulacion",
    title: "Autorregulación",
    emoji: "⚖️",
    emojiImg: `${EMOJI_BASE}/Shield/3D/shield_3d.png`,
    gf: "#38b2ac",
    gt: "#2b6cb0",
    color: "hsl(var(--calm))",
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
    hasSubSkills: false,
    practica: {
      accion: "Técnica del semáforo emocional",
      pasos: [
        "🛑 PARO: cuando sientas que explotas, detente.",
        "🟡 PIENSO: ¿qué emoción es y qué la causó?",
        "🟢 ACTÚO: elige una respuesta con la que te sientas bien después.",
      ],
    },
  },
  {
    id: "empatia",
    title: "Empatía",
    emoji: "💜",
    emojiImg: `${EMOJI_BASE}/Smiling%20face%20with%20hearts/3D/smiling_face_with_hearts_3d.png`,
    gf: "#b794f4",
    gt: "#d53f8c",
    color: "hsl(var(--accent))",
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
    hasSubSkills: false,
    practica: {
      accion: "Escucha activa de 1 conversación",
      pasos: [
        "En tu próxima conversación, no interrumpas ni una vez.",
        "Cuando termine, repite: 'Entiendo que sientes...'",
        "Pregunta: '¿Quieres que te escuche o que te dé una idea?'",
      ],
    },
  },
  {
    id: "habilidades",
    title: "Habilidades Sociales",
    emoji: "🤝",
    emojiImg: `${EMOJI_BASE}/People%20hugging/3D/people_hugging_3d.png`,
    gf: "#f6ad55",
    gt: "#ed8936",
    color: "hsl(var(--secondary))",
    conector: "Son las herramientas concretas para poner en práctica todo lo anterior en tus relaciones.",
    description: "Competencias específicas para relacionarte con otros: comunicar, escuchar, cooperar y resolver desacuerdos.",
    señales: [],
    tips: [],
    hasSubSkills: true,
    practica: {
      accion: "Usa la fórmula asertiva hoy",
      pasos: [
        "Identifica una situación que te moleste.",
        "Escribe: 'Yo siento... cuando pasa X... necesito Y'.",
        "Díselo a la persona, aunque sea por mensaje.",
      ],
    },
  },
  {
    id: "motivacion",
    title: "Motivación",
    emoji: "✨",
    emojiImg: `${EMOJI_BASE}/Star-struck/3D/star-struck_3d.png`,
    gf: "#e8c94a",
    gt: "#c07030",
    color: "hsl(50,88%,65%)",
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
    hasSubSkills: false,
    practica: {
      accion: "Divide una meta en 3 pasos",
      pasos: [
        "Escribe una meta que quieras lograr esta semana.",
        "Divídela en 3 pasos concretos y pequeños.",
        "Haz el paso 1 hoy, aunque dure solo 10 minutos.",
      ],
    },
  },
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
  window.dispatchEvent(
    new CustomEvent("emilio:open", {
      detail: {
        contexto: `Estoy explorando la habilidad de "${h.title}". ${h.conector} ${h.description} ¿Puedes ayudarme a desarrollarla?`,
      },
    })
  );
}

function hablarPracticaConEmilio() {
  const h = selected.value;
  const practicaTexto = h.practica.pasos.join("\n");
  window.dispatchEvent(
    new CustomEvent("emilio:open", {
      detail: {
        contexto: `Quiero practicar ${h.title} hoy. Mi práctica es: ${h.practica.accion}. Los pasos son:\n${practicaTexto}\n¿Puedes ayudarme a completarla?`,
      },
    })
  );
}

function animateFlow() {
  if (!flowRef.value || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const nodes = flowRef.value.querySelectorAll(".flow-node");
  const arrows = flowRef.value.querySelectorAll(".flow-arrow");
  gsap.set(nodes, { opacity: 0, y: 20, scale: 0.9 });
  gsap.set(arrows, { opacity: 0, scaleX: 0 });

  const tl = gsap.timeline({
    scrollTrigger: { trigger: containerRef.value, start: "top 80%", toggleActions: "play none none reverse" },
  });

  nodes.forEach((node, i) => {
    tl.to(node, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "back.out(1.6)" }, i * 0.18);
    if (arrows[i]) {
      tl.to(arrows[i], { opacity: 1, scaleX: 1, duration: 0.3, ease: "power2.out" }, i * 0.18 + 0.25);
    }
  });
}

onMounted(() => {
  animateFlow();
});
</script>

<template>
  <div ref="containerRef" class="w-full max-w-6xl mx-auto my-10 px-4">
    <p class="text-center text-xs font-semibold text-muted-foreground/60 uppercase tracking-widest mb-6">
      Cómo se conectan
    </p>

    <!-- Flow Diagram -->
    <div ref="flowRef" class="mb-10">
      <!-- Desktop: horizontal flow -->
      <div class="hidden md:flex items-center justify-center gap-0">
        <template v-for="(h, i) in habilidades" :key="h.id">
          <button
            type="button"
            class="flow-node group relative flex flex-col items-center gap-2 rounded-2xl border-2 px-5 py-4 text-center transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            :class="
              selectedId === h.id
                ? 'border-primary shadow-lift bg-surface'
                : 'border-border/60 bg-surface/70 hover:border-primary/40 hover:bg-surface hover:shadow-soft'
            "
            :aria-pressed="selectedId === h.id"
            @click="selectNode(h.id)"
          >
            <div
              class="flex h-12 w-12 items-center justify-center rounded-xl text-xl shadow-sm transition-transform duration-300 group-hover:scale-110"
              :style="{ background: `linear-gradient(135deg, ${h.gf}30, ${h.gt}45)` }"
            >
              <img :src="h.emojiImg" :alt="h.title" class="w-7 h-7 drop-shadow-sm" />
            </div>
            <span
              class="text-xs font-bold"
              :class="selectedId === h.id ? 'text-foreground' : 'text-foreground/80'"
            >
              {{ h.title }}
            </span>
            <span
              v-if="selectedId === h.id"
              class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-primary"
            />
          </button>

          <div
            v-if="i < habilidades.length - 1"
            class="flow-arrow flex items-center justify-center px-1"
          >
            <ArrowRight
              class="w-5 h-5 text-muted-foreground/40"
            />
          </div>
        </template>
      </div>

      <!-- Mobile: vertical flow -->
      <div class="md:hidden flex flex-col items-center gap-3">
        <template v-for="(h, i) in habilidades" :key="h.id">
          <button
            type="button"
            class="flow-node group flex items-center gap-4 w-full max-w-xs rounded-2xl border-2 px-4 py-3 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            :class="
              selectedId === h.id
                ? 'border-primary shadow-lift bg-surface'
                : 'border-border/60 bg-surface/70 hover:border-primary/40 hover:bg-surface hover:shadow-soft'
            "
            :aria-pressed="selectedId === h.id"
            @click="selectNode(h.id)"
          >
            <div
              class="flex h-10 w-10 items-center justify-center rounded-xl text-lg shadow-sm transition-transform duration-300 group-hover:scale-110 flex-shrink-0"
              :style="{ background: `linear-gradient(135deg, ${h.gf}30, ${h.gt}45)` }"
            >
              <img :src="h.emojiImg" :alt="h.title" class="w-6 h-6 drop-shadow-sm" />
            </div>
            <div>
              <span
                class="text-sm font-bold block"
                :class="selectedId === h.id ? 'text-foreground' : 'text-foreground/80'"
              >
                {{ h.title }}
              </span>
              <span class="text-[10px] text-muted-foreground">Paso {{ i + 1 }} de {{ habilidades.length }}</span>
            </div>
            <ArrowRight
              v-if="selectedId === h.id"
              class="w-4 h-4 text-primary ml-auto flex-shrink-0"
            />
          </button>

          <div
            v-if="i < habilidades.length - 1"
            class="flow-arrow flex justify-center"
          >
            <div class="h-4 w-px bg-border" />
          </div>
        </template>
      </div>
    </div>

    <!-- Detail panel -->
    <div class="max-w-3xl mx-auto">
      <Transition name="panel-slide" mode="out-in">
        <div
          :key="selectedId"
          class="overflow-hidden rounded-3xl border border-border/60 bg-surface shadow-soft"
        >
          <!-- Header with tinted gradient -->
          <div class="p-6 sm:p-7" :style="{ background: `linear-gradient(135deg, ${selected.gf}18 0%, hsl(var(--surface)) 65%)` }">
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

            <!-- Conector quote -->
            <div class="rounded-xl px-4 py-3 mb-4" :style="{ backgroundColor: `${selected.gf}14` }">
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
              <div v-if="selected.señales.length" class="rounded-2xl bg-surface/85 border border-border/60 p-4 mb-4">
                <p class="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5 text-muted-foreground">
                  <AlertCircle class="w-3.5 h-3.5 flex-shrink-0" />
                  Señales de que falta trabajarla
                </p>
                <ul class="space-y-2">
                  <li v-for="s in selected.señales" :key="s" class="flex items-start gap-2 text-sm text-foreground/80">
                    <span class="mt-0.5 flex-shrink-0 text-muted-foreground font-bold">›</span>
                    {{ s }}
                  </li>
                </ul>
              </div>

              <!-- Tips -->
              <div class="rounded-2xl p-4 mb-5" :style="{ backgroundColor: `${selected.gf}12` }">
                <p class="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5" :style="{ color: selected.color }">
                  <Lightbulb class="w-3.5 h-3.5 flex-shrink-0" />
                  Cómo desarrollarla
                </p>
                <ul class="space-y-2">
                  <li v-for="tip in selected.tips" :key="tip" class="flex items-start gap-2 text-sm text-foreground/80">
                    <span class="mt-0.5 flex-shrink-0 font-bold" :style="{ color: selected.color }">›</span>
                    {{ tip }}
                  </li>
                </ul>
              </div>
            </template>

            <!-- Práctica de hoy -->
            <div
              class="rounded-2xl border p-4 sm:p-5 mb-5"
              :style="{ borderColor: `${selected.gf}35`, backgroundColor: `${selected.gf}0A` }"
            >
              <div class="flex items-center gap-2.5 mb-3">
                <div
                  class="flex h-9 w-9 items-center justify-center rounded-xl bg-surface shadow-sm"
                >
                  <img
                    class="w-5 h-5"
                    src="https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@latest/assets/Flexed%20biceps/3D/flexed_biceps_3d.png"
                    alt="Práctica"
                  />
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
                  <CheckCircle2
                    v-if="practicaChecks[selected.id]?.[pi]"
                    class="h-5 w-5 mt-0.5 flex-shrink-0"
                    :style="{ color: selected.gf }"
                  />
                  <Circle v-else class="h-5 w-5 mt-0.5 flex-shrink-0 text-muted-foreground/40" />
                  <span
                    class="text-sm leading-relaxed"
                    :class="practicaChecks[selected.id]?.[pi] ? 'text-muted-foreground/70 line-through' : 'text-foreground'"
                  >
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
