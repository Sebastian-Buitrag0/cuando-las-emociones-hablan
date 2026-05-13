<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from "vue";
import { Clock, Target, HeartHandshake, BrainCircuit, BookOpen, Shield, GraduationCap, BotMessageSquare, Sparkles, X } from "lucide-vue-next";
import gsap from "gsap";

const EMOJI_BASE = "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@latest/assets";

interface Nodo {
  id: string;
  label: string;
  emojiImg: string;
  color: string;
  category: "estrategia" | "funcion";
  detail: { titulo: string; cuando?: string; pasos?: string[]; resultado?: string; icon?: any };
}

const nodos: Nodo[] = [
  { id: "bienvenida", label: "Bienvenida",   emojiImg: `${EMOJI_BASE}/Waving%20hand/Default/3D/waving_hand_3d_default.png`, color: "#5B8DEE", category: "estrategia", detail: { titulo: "Rutina de Bienvenida", cuando: "Al inicio de cada sesión, después de recreos o exámenes.", pasos: ["Saludo personalizado a cada estudiante al entrar.", "Pregunta del día: ¿Cómo te sientes en una palabra?", "Respiración grupal (3 respiraciones profundas)."], resultado: "Los estudiantes llegan al contenido más centrados.", icon: Clock }},
  { id: "pausas",     label: "Pausas",       emojiImg: `${EMOJI_BASE}/Person%20running/Default/3D/person_running_3d_default.png`, color: "#81E6D9", category: "estrategia", detail: { titulo: "Pausas Activas", cuando: "Cuando notes dispersión o tras 45+ min de trabajo.", pasos: ["Estiramientos suaves en el lugar.", "Ejercicios de respiración coordinada.", "Juego rápido de atención plena."], resultado: "La atención se restablece. Menos errores.", icon: Target }},
  { id: "circulo",    label: "Confianza",    emojiImg: `${EMOJI_BASE}/People%20hugging/3D/people_hugging_3d.png`, color: "#BC6C8A", category: "estrategia", detail: { titulo: "Círculo de Confianza", cuando: "Tras un conflicto entre pares o como cierre de semana.", pasos: ["Sentarse en círculo a la misma altura.", "Objeto que da la palabra.", "Tema abierto o pregunta guía."], resultado: "Mejora el vínculo grupal. Los conflictos se procesan antes de escalar.", icon: HeartHandshake }},
  { id: "rincon",     label: "Calma",        emojiImg: `${EMOJI_BASE}/Couch%20and%20lamp/3D/couch_and_lamp_3d.png`, color: "#F4A259", category: "estrategia", detail: { titulo: "Rincón de Calma", cuando: "Cuando un estudiante llega alterado o necesita un momento.", pasos: ["Ubicación tranquila, visible pero sin protagonismo.", "Materiales: cojín, fichas de emociones, cuaderno.", "Reglas claras: tiempo máximo, una persona a la vez."], resultado: "Los estudiantes aprenden a autorregularse sin intervención.", icon: BrainCircuit }},
  { id: "educativa",     label: "Educativa",    emojiImg: `${EMOJI_BASE}/Open%20book/3D/open_book_3d.png`,          color: "#5B8DEE", category: "funcion", detail: { titulo: "Función Educativa",     resultado: "Refuerza los contenidos de los talleres sobre autoconciencia, autorregulación, empatía y habilidades sociales.", icon: BookOpen }},
  { id: "preventiva",    label: "Preventiva",   emojiImg: `${EMOJI_BASE}/Shield/3D/shield_3d.png`,                  color: "#BC6C8A", category: "funcion", detail: { titulo: "Función Preventiva",    resultado: "Previene conflictos y aislamiento. Alineada con la Ley 1620 de 2013.", icon: Shield }},
  { id: "acompana",      label: "Apoyo",         emojiImg: `${EMOJI_BASE}/Heart%20with%20ribbon/3D/heart_with_ribbon_3d.png`, color: "#F4A259", category: "funcion", detail: { titulo: "Acompañamiento",    resultado: "Amplía el acompañamiento grupal con tests, guías y actividades accesibles siempre.", icon: HeartHandshake }},
  { id: "institucional", label: "Institucional", emojiImg: `${EMOJI_BASE}/Graduation%20cap/3D/graduation_cap_3d.png`, color: "#81E6D9", category: "funcion", detail: { titulo: "Función Institucional", resultado: "Apoya el PEI y se articula con la Ley 2383 de 2024.", icon: GraduationCap }},
];

const SVGW = 520;
const SVGH = 460;
const CX = 260;
const CY = 225;
const E_R = 175;
const F_R = 155;

const seleccionado = ref<string | null>(null);
const nodoActivo = computed(() => nodos.find((n) => n.id === seleccionado.value));

const estrategias = nodos.filter(n => n.category === "estrategia");
const funciones   = nodos.filter(n => n.category === "funcion");

// Estrategias: semicírculo superior, -150° → -30°, 4 nodos paso 40°
function getEstrategiaPos(i: number) {
  const angle = Math.PI * (-5/6) + i * (Math.PI * (2/3) / 3);
  return { x: CX + Math.cos(angle) * E_R, y: CY + Math.sin(angle) * E_R };
}

// Funciones: semicírculo inferior, +30° → +150°, 4 nodos paso 40°
function getFuncionPos(i: number) {
  const angle = Math.PI * (1/6) + i * (Math.PI * (2/3) / 3);
  return { x: CX + Math.cos(angle) * F_R, y: CY + Math.sin(angle) * F_R };
}

function selectNode(id: string) {
  seleccionado.value = seleccionado.value === id ? null : id;
}

onMounted(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  setTimeout(() => nextTick(() => {
    gsap.context(() => {
      gsap.fromTo(".diag-center", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: "expo.out" });
      gsap.fromTo(".diag-line",   { opacity: 0 }, { opacity: 1, duration: 0.4, stagger: 0.05, ease: "power2.out" });
      gsap.fromTo(".diag-node",   { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, stagger: 0.08, ease: "expo.out", delay: 0.15 });
      gsap.fromTo(".diag-label",  { opacity: 0, y: 3 }, { opacity: 1, y: 0, duration: 0.35, stagger: 0.05, delay: 0.3 });
    });
  }), 300);
});

function hablarConEmilio() {
  window.dispatchEvent(new CustomEvent("emilio:open", {
    detail: { contexto: "Soy docente y quiero orientación para aplicar estrategias socioemocionales en el aula." },
  }));
}
</script>

<template>
  <div class="mt-14 max-w-5xl mx-auto">
    <div class="text-center mb-6">
      <span class="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-1.5 text-xs font-semibold text-secondary">
        <Sparkles class="w-3.5 h-3.5" /> Diagrama interactivo
      </span>
      <h3 class="mt-3 text-xl font-bold text-foreground">Explora las estrategias y funciones</h3>
      <p class="text-sm text-muted-foreground mt-1">Toca cada nodo para descubrir más detalles. Tócalo de nuevo para cerrar.</p>
    </div>

    <div class="flex flex-col lg:flex-row items-start gap-5">

      <!-- SVG — se comprime cuando hay panel abierto -->
      <div
        class="bg-surface rounded-3xl border border-border/60 shadow-soft p-4 sm:p-6 overflow-hidden transition-all duration-500 ease-out w-full"
        :class="seleccionado ? 'lg:flex-1' : ''"
      >
        <svg :viewBox="`0 0 ${SVGW} ${SVGH}`" class="w-full h-auto max-h-[460px]">
          <defs>
            <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="hsl(var(--primary) / 0.12)" />
              <stop offset="100%" stop-color="transparent" />
            </radialGradient>
            <filter id="nodeShadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.15" />
            </filter>
            <filter id="selGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feDropShadow dx="0" dy="0" stdDeviation="7" flood-opacity="0.4" />
            </filter>
          </defs>

          <!-- Halo central -->
          <circle cx="260" cy="225" r="120" fill="url(#hubGlow)" class="diag-center" />

          <!-- Líneas estrategias → centro -->
          <line v-for="(e, i) in estrategias" :key="'le-'+i" class="diag-line transition-all duration-400"
            :x1="getEstrategiaPos(i).x" :y1="getEstrategiaPos(i).y" :x2="CX" :y2="CY"
            :stroke="seleccionado === e.id ? e.color : 'hsl(var(--border))'"
            :stroke-opacity="seleccionado === e.id ? 0.55 : 0.22"
            :stroke-width="seleccionado === e.id ? 2 : 1.5"
            stroke-dasharray="6 5"
          />

          <!-- Líneas centro → funciones -->
          <line v-for="(f, i) in funciones" :key="'lf-'+i" class="diag-line transition-all duration-400"
            :x1="CX" :y1="CY" :x2="getFuncionPos(i).x" :y2="getFuncionPos(i).y"
            :stroke="seleccionado === f.id ? f.color : 'hsl(var(--border))'"
            :stroke-opacity="seleccionado === f.id ? 0.55 : 0.22"
            :stroke-width="seleccionado === f.id ? 2 : 1.5"
            stroke-dasharray="4 4"
          />

          <!-- Label superior -->
          <text x="260" y="20" text-anchor="middle" font-size="10" font-weight="700"
            fill="hsl(var(--muted-foreground))" letter-spacing="2.5" class="diag-label">
            ESTRATEGIAS DE AULA
          </text>

          <!-- Nodos estrategias -->
          <g v-for="(e, i) in estrategias" :key="'en-'+e.id"
            class="diag-node cursor-pointer"
            @click="selectNode(e.id)"
            :transform="`translate(${getEstrategiaPos(i).x}, ${getEstrategiaPos(i).y})`"
          >
            <circle cx="0" cy="0" r="34"
              :fill="seleccionado === e.id ? e.color + '22' : 'hsl(var(--background))'"
              :stroke="seleccionado === e.id ? e.color : 'hsl(var(--border))'"
              :stroke-width="seleccionado === e.id ? 3 : 1.5"
              :filter="seleccionado === e.id ? 'url(#selGlow)' : 'url(#nodeShadow)'"
              class="transition-all duration-300"
            />
            <image :x="-14" :y="-14" width="28" height="28" :href="e.emojiImg" />
            <text y="50" text-anchor="middle" font-size="11" font-weight="600"
              fill="hsl(var(--foreground))" class="diag-label">
              {{ e.label }}
            </text>
          </g>

          <!-- Hub central -->
          <g class="diag-center">
            <circle cx="260" cy="225" r="44" fill="hsl(var(--surface))" stroke="hsl(var(--primary) / 0.25)" stroke-width="2.5" />
            <circle cx="260" cy="225" r="36" fill="hsl(var(--primary) / 0.08)" />
            <image x="242" y="207" width="36" height="36" :href="`${EMOJI_BASE}/Open%20book/3D/open_book_3d.png`" />
            <text x="260" y="259" text-anchor="middle" font-size="14" font-weight="700" fill="hsl(var(--foreground))">Aula</text>
          </g>

          <!-- Label inferior -->
          <text x="260" y="450" text-anchor="middle" font-size="10" font-weight="700"
            fill="hsl(var(--muted-foreground))" letter-spacing="2.5" class="diag-label">
            FUNCIONES DEL PROYECTO
          </text>

          <!-- Nodos funciones -->
          <g v-for="(f, i) in funciones" :key="'fn-'+f.id"
            class="diag-node cursor-pointer"
            @click="selectNode(f.id)"
            :transform="`translate(${getFuncionPos(i).x}, ${getFuncionPos(i).y})`"
          >
            <circle cx="0" cy="0" r="30"
              :fill="seleccionado === f.id ? f.color + '22' : 'hsl(var(--background))'"
              :stroke="seleccionado === f.id ? f.color : 'hsl(var(--border))'"
              :stroke-width="seleccionado === f.id ? 3 : 1.5"
              :filter="seleccionado === f.id ? 'url(#selGlow)' : 'url(#nodeShadow)'"
              class="transition-all duration-300"
            />
            <image :x="-11" :y="-11" width="22" height="22" :href="f.emojiImg" />
            <text y="46" text-anchor="middle" font-size="11" font-weight="600"
              fill="hsl(var(--foreground))" class="diag-label">
              {{ f.label }}
            </text>
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
              <component :is="nodoActivo.detail.icon" class="w-5 h-5" :style="{ color: nodoActivo.color }" />
            </div>
            <div>
              <span class="text-[10px] font-bold uppercase tracking-wider" :style="{ color: nodoActivo.color }">
                {{ nodoActivo.category === 'estrategia' ? 'Estrategia' : 'Función' }}
              </span>
              <h4 class="font-bold text-foreground text-sm mt-0.5">{{ nodoActivo.detail.titulo }}</h4>
            </div>
          </div>

          <template v-if="nodoActivo.detail.cuando">
            <div class="rounded-xl bg-surface/85 p-3 mb-3 border border-border/40">
              <p class="text-[10px] font-bold uppercase tracking-wider mb-1" :style="{ color: nodoActivo.color }">Úsala cuando</p>
              <p class="text-xs text-foreground/80">{{ nodoActivo.detail.cuando }}</p>
            </div>
            <div class="rounded-xl bg-surface/85 p-3 mb-3 border border-border/40">
              <p class="text-[10px] font-bold uppercase tracking-wider mb-2" :style="{ color: nodoActivo.color }">Pasos</p>
              <ol class="space-y-1.5">
                <li v-for="(p, pi) in nodoActivo.detail.pasos" :key="pi"
                  class="flex items-start gap-2 text-xs text-foreground/80">
                  <span class="font-bold flex-shrink-0 mt-px" :style="{ color: nodoActivo.color }">{{ pi + 1 }}.</span>
                  {{ p }}
                </li>
              </ol>
            </div>
          </template>

          <div class="rounded-xl p-3" :style="{ backgroundColor: nodoActivo.color + '10' }">
            <p class="text-[10px] font-bold uppercase tracking-wider mb-1" :style="{ color: nodoActivo.color }">Resultado</p>
            <p class="text-xs text-foreground/80">{{ nodoActivo.detail.resultado }}</p>
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

.diag-node { transition: opacity 0.25s ease; }
.diag-node:hover circle {
  stroke-width: 3;
  filter: url(#selGlow);
}

@media (prefers-reduced-motion: reduce) {
  .slide-panel-enter-active,
  .slide-panel-leave-active { transition: opacity 0.2s ease; }
  .slide-panel-enter-from,
  .slide-panel-leave-to { transform: none; }
}
</style>
