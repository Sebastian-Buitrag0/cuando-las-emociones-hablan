<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from "vue";
import { Shield, Sparkles, BotMessageSquare, X } from "lucide-vue-next";
import gsap from "gsap";

const EMOJI_BASE = "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@latest/assets";

interface Nodo {
  id: string;
  label: string;
  emojiImg: string;
  color: string;
  detail: { titulo: string; preguntas: string[]; consejo: string };
}

const nodos: Nodo[] = [
  { id: "acompanar",  label: "Acompañar",  emojiImg: `${EMOJI_BASE}/Heart%20with%20arrow/3D/heart_with_arrow_3d.png`,   color: "#BC6C8A", detail: { titulo: "¿Cómo acompaño emocionalmente?",  preguntas: ["¿Valido sus emociones sin juzgar?", "¿Creo espacios sin pantallas para conversar?", "¿Soy modelo de gestión emocional?", "¿Mantenemos rutinas que dan seguridad?"],           consejo: "La validación sin juicio es el primer regalo emocional." }},
  { id: "criar",      label: "Crianza",    emojiImg: `${EMOJI_BASE}/Open%20book/3D/open_book_3d.png`,                   color: "#5B8DEE", detail: { titulo: "¿Qué es la crianza positiva?",      preguntas: ["¿Uso refuerzos positivos concretos?", "¿Establezco límites claros con explicación?", "¿Practico conexión antes de corrección?", "¿Fomento autonomía según su edad?"],          consejo: "La conexión antes de la corrección cambia todo." }},
  { id: "alertas",    label: "Señales",    emojiImg: `${EMOJI_BASE}/Warning/3D/warning_3d.png`,                         color: "#F6AD55", detail: { titulo: "¿Qué señales debo observar?",      preguntas: ["¿Hay cambios de comportamiento sin causa?", "¿Se aísla de sus amistades?", "¿Cambió el sueño o apetito por +2 semanas?", "¿Expresa tristeza o desesperanza?"],               consejo: "Más de 2 semanas con cambios notorios: busca apoyo profesional." }},
  { id: "conversar",  label: "Conversar",  emojiImg: `${EMOJI_BASE}/Speech%20balloon/3D/speech_balloon_3d.png`,         color: "#F4A259", detail: { titulo: "¿Conversamos a diario?",           preguntas: ["¿Cuándo fue la última vez que hablaron 10 min sin pantallas?", "¿Tu hijo/a siente que puede contarte cualquier cosa?"],                                                        consejo: "10 minutos sin distracciones al día construyen confianza." }},
  { id: "modelar",    label: "Modelar",    emojiImg: `${EMOJI_BASE}/Light%20bulb/3D/light_bulb_3d.png`,                 color: "#81E6D9", detail: { titulo: "¿Qué ven mis hijos de mí?",        preguntas: ["¿Qué ven cuando atravieso una situación difícil?", "¿Expreso yo mis emociones de forma saludable?"],                                                                         consejo: "Los hijos aprenden más de lo que ven que de lo que escuchan." }},
];

const SVGW = 500;
const SVGH = 440;
const CX = 250;
const CY = 205;
const R  = 152;

const seleccionado = ref<string | null>(null);
const nodoActivo = computed(() => nodos.find((n) => n.id === seleccionado.value));

// Pentágono: 5 nodos equidistantes en círculo completo, empezando desde arriba (-90°)
function getNodePos(i: number) {
  const angle = (i / nodos.length) * 2 * Math.PI - Math.PI / 2;
  return { x: CX + Math.cos(angle) * R, y: CY + Math.sin(angle) * R };
}

function selectNode(id: string) {
  seleccionado.value = seleccionado.value === id ? null : id;
}

onMounted(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  setTimeout(() => nextTick(() => {
    gsap.context(() => {
      gsap.fromTo(".fam-center", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: "expo.out" });
      gsap.fromTo(".fam-line",   { opacity: 0 }, { opacity: 1, duration: 0.4, stagger: 0.06, ease: "power2.out" });
      gsap.fromTo(".fam-node",   { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: "expo.out", delay: 0.15 });
      gsap.fromTo(".fam-label",  { opacity: 0, y: 3 }, { opacity: 1, y: 0, duration: 0.35, stagger: 0.06, delay: 0.3 });
    });
  }), 300);
});

function hablarConEmilio() {
  window.dispatchEvent(new CustomEvent("emilio:open", {
    detail: { contexto: "Soy padre/madre y quiero orientación para acompañar emocionalmente a mi hijo/a." },
  }));
}
</script>

<template>
  <div class="mt-14 max-w-5xl mx-auto">
    <div class="text-center mb-6">
      <span class="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent">
        <Sparkles class="w-3.5 h-3.5" /> Diagrama interactivo
      </span>
      <h3 class="mt-3 text-xl font-bold text-foreground">Explora los pilares del acompañamiento familiar</h3>
      <p class="text-sm text-muted-foreground mt-1">Toca cada nodo para ver preguntas y consejos. Tócalo de nuevo para cerrar.</p>
    </div>

    <div class="flex flex-col lg:flex-row items-start gap-5">

      <!-- SVG — se comprime cuando hay panel abierto -->
      <div
        class="bg-surface rounded-3xl border border-border/60 shadow-soft p-4 sm:p-6 overflow-hidden transition-all duration-500 ease-out w-full"
        :class="seleccionado ? 'lg:flex-1' : ''"
      >
        <svg :viewBox="`0 0 ${SVGW} ${SVGH}`" class="w-full h-auto max-h-[440px]">
          <defs>
            <radialGradient id="famGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="hsl(var(--accent) / 0.12)" />
              <stop offset="100%" stop-color="transparent" />
            </radialGradient>
            <filter id="famShadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.15" />
            </filter>
            <filter id="famSelGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feDropShadow dx="0" dy="0" stdDeviation="7" flood-opacity="0.4" />
            </filter>
          </defs>

          <!-- Halo central -->
          <circle cx="250" cy="205" r="145" fill="url(#famGlow)" class="fam-center" />

          <!-- Líneas centro → nodos -->
          <line v-for="(n, i) in nodos" :key="'line-'+n.id"
            :x1="CX" :y1="CY"
            :x2="getNodePos(i).x" :y2="getNodePos(i).y"
            :stroke="seleccionado === n.id ? n.color : 'hsl(var(--border))'"
            :stroke-opacity="seleccionado === n.id ? 0.55 : 0.22"
            :stroke-width="seleccionado === n.id ? 2 : 1.5"
            :stroke-dasharray="seleccionado === n.id ? '8 4' : '5 5'"
            class="transition-all duration-400 fam-line"
          />

          <!-- Nodos -->
          <g v-for="(n, i) in nodos" :key="'n-'+n.id"
            class="fam-node cursor-pointer"
            @click="selectNode(n.id)"
            :transform="`translate(${getNodePos(i).x}, ${getNodePos(i).y})`"
          >
            <circle cx="0" cy="0" r="32"
              :fill="seleccionado === n.id ? n.color + '22' : 'hsl(var(--background))'"
              :stroke="seleccionado === n.id ? n.color : 'hsl(var(--border))'"
              :stroke-width="seleccionado === n.id ? 3 : 1.5"
              :filter="seleccionado === n.id ? 'url(#famSelGlow)' : 'url(#famShadow)'"
              class="transition-all duration-300"
            />
            <image :x="-13" :y="-13" width="26" height="26" :href="n.emojiImg" />
            <text y="48" text-anchor="middle" font-size="12" font-weight="600"
              fill="hsl(var(--foreground))" class="fam-label">{{ n.label }}</text>
          </g>

          <!-- Hub central -->
          <g class="fam-center">
            <circle cx="250" cy="205" r="42" fill="hsl(var(--surface))" stroke="hsl(var(--accent) / 0.3)" stroke-width="2.5" />
            <circle cx="250" cy="205" r="34" fill="hsl(var(--accent) / 0.08)" />
            <image x="232" y="187" width="36" height="36" :href="`${EMOJI_BASE}/House/3D/house_3d.png`" />
            <text x="250" y="241" text-anchor="middle" font-size="14" font-weight="700" fill="hsl(var(--foreground))">Familia</text>
          </g>
        </svg>

        <div class="mt-3 flex justify-end">
          <button @click="hablarConEmilio"
            class="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold bg-accent/10 text-accent hover:bg-accent/15 transition-colors">
            <BotMessageSquare class="w-3.5 h-3.5" /> Hablar con Emilio
          </button>
        </div>
      </div>

      <!-- Panel de detalle — desliza desde la derecha -->
      <Transition name="slide-panel">
        <div v-if="nodoActivo"
          class="lg:w-72 w-full shrink-0 lg:sticky lg:top-24 rounded-2xl bg-surface border shadow-soft p-5 relative"
          :style="{ borderColor: nodoActivo.color + '55' }"
        >
          <button @click="seleccionado = null"
            class="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground hover:bg-border/40 transition-colors">
            <X class="w-3.5 h-3.5" />
          </button>

          <div class="flex items-start gap-3 mb-4 pr-6">
            <div class="flex h-11 w-11 items-center justify-center rounded-xl flex-shrink-0"
              :style="{ backgroundColor: nodoActivo.color + '18' }">
              <img :src="nodoActivo.emojiImg" class="w-6 h-6 shrink-0 object-contain" />
            </div>
            <div>
              <span class="text-[10px] font-bold uppercase tracking-wider" :style="{ color: nodoActivo.color }">
                Pilar familiar
              </span>
              <h4 class="font-bold text-foreground text-sm mt-0.5">{{ nodoActivo.detail.titulo }}</h4>
            </div>
          </div>

          <div class="rounded-xl bg-surface/85 p-3 mb-3 border border-border/40">
            <p class="text-[10px] font-bold uppercase tracking-wider mb-2" :style="{ color: nodoActivo.color }">
              Preguntas para reflexionar
            </p>
            <ul class="space-y-1.5">
              <li v-for="(p, pi) in nodoActivo.detail.preguntas" :key="pi"
                class="flex items-start gap-2 text-xs text-foreground/80">
                <Shield class="w-3 h-3 mt-0.5 flex-shrink-0" :style="{ color: nodoActivo.color }" />
                {{ p }}
              </li>
            </ul>
          </div>

          <div class="rounded-xl p-3" :style="{ backgroundColor: nodoActivo.color + '10' }">
            <p class="text-[10px] font-bold uppercase tracking-wider mb-1" :style="{ color: nodoActivo.color }">Consejo</p>
            <p class="text-xs text-foreground/80 italic">{{ nodoActivo.detail.consejo }}</p>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.slide-panel-enter-active {
  transition: opacity 0.4s ease, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-panel-enter-from {
  opacity: 0;
  transform: translateX(24px);
}
.slide-panel-leave-active {
  transition: opacity 0.2s ease, transform 0.25s ease-in;
}
.slide-panel-leave-to {
  opacity: 0;
  transform: translateX(24px);
}

.fam-node { transition: opacity 0.25s ease; }
.fam-node:hover circle {
  stroke-width: 3;
  filter: url(#famSelGlow);
}

@media (prefers-reduced-motion: reduce) {
  .slide-panel-enter-active,
  .slide-panel-leave-active { transition: opacity 0.2s ease; }
  .slide-panel-enter-from,
  .slide-panel-leave-to { transform: none; }
}
</style>
