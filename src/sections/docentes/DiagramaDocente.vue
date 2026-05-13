<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { Clock, Target, HeartHandshake, BrainCircuit, BookOpen, Shield, GraduationCap, Heart, BotMessageSquare, Sparkles, ChevronRight } from "lucide-vue-next";
import gsap from "gsap";

const EMOJI_BASE = "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@latest/assets";

interface Nodo {
  id: string;
  label: string;
  emojiImg: string;
  color: string;
  category: "estrategia" | "funcion" | "recurso" | "apoyo";
  detail: { titulo: string; cuando?: string; pasos?: string[]; resultado?: string; icon?: any };
}

const nodos: Nodo[] = [
  { id: "bienvenida",  label: "Rutina de Bienvenida",   emojiImg: `${EMOJI_BASE}/Waving%20hand/Default/3D/waving_hand_3d_default.png`, color: "#5B8DEE", category: "estrategia", detail: { titulo: "Rutina de Bienvenida", cuando: "Al inicio de cada sesión, después de recreos o exámenes.", pasos: ["Saludo personalizado a cada estudiante al entrar.", "Pregunta del día: ¿Cómo te sientes en una palabra?", "Respiración grupal (3 respiraciones profundas)."], resultado: "Los estudiantes llegan al contenido más centrados.", icon: Clock }},
  { id: "pausas",       label: "Pausas Activas",         emojiImg: `${EMOJI_BASE}/Person%20running/Default/3D/person_running_3d_default.png`, color: "#81E6D9", category: "estrategia", detail: { titulo: "Pausas Activas", cuando: "Cuando notes dispersión o tras 45+ min de trabajo.", pasos: ["Estiramientos suaves en el lugar.", "Ejercicios de respiración coordinada.", "Juego rápido de atención plena."], resultado: "La atención se restablece. Menos errores.", icon: Target }},
  { id: "circulo",      label: "Círculo de Confianza",   emojiImg: `${EMOJI_BASE}/People%20hugging/3D/people_hugging_3d.png`, color: "#BC6C8A", category: "estrategia", detail: { titulo: "Círculo de Confianza", cuando: "Tras un conflicto entre pares o como cierre de semana.", pasos: ["Sentarse en círculo a la misma altura.", "Objeto que da la palabra.", "Tema abierto o pregunta guía."], resultado: "Mejora el vínculo grupal. Los conflictos se procesan antes de escalar.", icon: HeartHandshake }},
  { id: "rincon",       label: "Rincón de Calma",        emojiImg: `${EMOJI_BASE}/Couch%20and%20lamp/3D/couch_and_lamp_3d.png`, color: "#F4A259", category: "estrategia", detail: { titulo: "Rincón de Calma", cuando: "Cuando un estudiante llega alterado o necesita un momento.", pasos: ["Ubicación tranquila, visible pero sin protagonismo.", "Materiales: cojín, fichas de emociones, cuaderno.", "Reglas claras: tiempo máximo, una persona a la vez."], resultado: "Los estudiantes aprenden a autorregularse sin intervención.", icon: BrainCircuit }},
  { id: "educativa",    label: "Función Educativa",      emojiImg: `${EMOJI_BASE}/Open%20book/3D/open_book_3d.png`, color: "#5B8DEE", category: "funcion", detail: { titulo: "Función Educativa", resultado: "Refuerza los contenidos de los talleres sobre autoconciencia, autorregulación, empatía y habilidades sociales.", icon: BookOpen }},
  { id: "preventiva",   label: "Función Preventiva",     emojiImg: `${EMOJI_BASE}/Shield/3D/shield_3d.png`, color: "#BC6C8A", category: "funcion", detail: { titulo: "Función Preventiva", resultado: "Previene conflictos y aislamiento. Alineada con la Ley 1620 de 2013.", icon: Shield }},
  { id: "acompana",     label: "Acompañamiento",          emojiImg: `${EMOJI_BASE}/Heart%20with%20ribbon/3D/heart_with_ribbon_3d.png`, color: "#F4A259", category: "funcion", detail: { titulo: "Acompañamiento", resultado: "Amplía el acompañamiento grupal con tests, guías y actividades accesibles siempre.", icon: HeartHandshake }},
  { id: "institucional",label: "Función Institucional",   emojiImg: `${EMOJI_BASE}/Graduation%20cap/3D/graduation_cap_3d.png`, color: "#81E6D9", category: "funcion", detail: { titulo: "Función Institucional", resultado: "Apoya el PEI y se articula con la Ley 2383 de 2024.", icon: GraduationCap }},
  { id: "emilio",       label: "Emilio IA",              emojiImg: `${EMOJI_BASE}/Robot/3D/robot_3d.png`, color: "#9F7AEA", category: "apoyo", detail: { titulo: "Emilio · Asistente IA", resultado: "Acompañante emocional disponible 24/7 para los estudiantes. Sin juicios, sin horarios.", icon: BotMessageSquare }},
];

const seleccionado = ref<string | null>(null);
const nodoActivo = computed(() => nodos.find((n) => n.id === seleccionado.value));
const animado = ref(false);

function getNodePos(i: number, total: number, cx: number, cy: number, r: number) {
  const angle = (i / total) * Math.PI * 2 - Math.PI / 2;
  return { x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r };
}

const estrategias = nodos.filter(n => n.category === "estrategia");
const funciones = nodos.filter(n => n.category === "funcion");

onMounted(() => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) { animado.value = true; return; }
  setTimeout(() => { animado.value = true; }, 200);
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
      <p class="text-sm text-muted-foreground mt-1">Toca cada nodo para descubrir más detalles.</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">
      <!-- SVG Graph -->
      <div class="bg-surface rounded-3xl border border-border/60 shadow-soft p-4 sm:p-6">
        <svg viewBox="0 0 520 480" class="w-full h-auto max-h-[480px]">
          <!-- Connection lines -->
          <line v-for="(e, i) in estrategias" :key="'line-e-'+i"
            :x1="260" :y1="80" :x2="getNodePos(i, 4, 260, 120, 220).x" :y2="getNodePos(i, 4, 260, 120, 220).y"
            :stroke="e.color" stroke-opacity="0.2" stroke-width="1.5" stroke-dasharray="6 4"
          />
          <line v-for="(f, i) in funciones" :key="'line-f-'+i"
            :x1="260" :y1="380" :x2="getNodePos(i, 4, 260, 360, 100).x" :y2="getNodePos(i, 4, 260, 360, 100).y"
            :stroke="f.color" stroke-opacity="0.2" stroke-width="1.5" stroke-dasharray="6 4"
          />

          <!-- Top label: Estrategias -->
          <text x="260" y="28" text-anchor="middle" font-size="11" font-weight="700" fill="hsl(var(--muted-foreground))" letter-spacing="1.5">
            ESTRATEGIAS DE AULA
          </text>

          <!-- Estrategia nodes (top) -->
          <g v-for="(e, i) in estrategias" :key="'en-'+e.id" class="cursor-pointer"
            @click="seleccionado = e.id"
            :transform="`translate(${getNodePos(i, 4, 260, 120, 220).x}, ${getNodePos(i, 4, 260, 120, 220).y})`"
          >
            <circle cx="0" cy="0" r="32"
              :fill="seleccionado === e.id ? e.color + '22' : 'hsl(var(--muted))'"
              :stroke="seleccionado === e.id ? e.color : 'hsl(var(--border))'"
              :stroke-width="seleccionado === e.id ? 2.5 : 1.5"
              class="transition-all duration-300"
            />
            <image :x="-12" :y="-12" width="24" height="24" :href="e.emojiImg" />
            <text y="48" text-anchor="middle" font-size="10" font-weight="600" fill="hsl(var(--foreground))">
              {{ e.label.length > 14 ? e.label.slice(0, 13) + '…' : e.label }}
            </text>
          </g>

          <!-- Divider -->
          <line x1="80" y1="240" x2="440" y2="240" stroke="hsl(var(--border))" stroke-opacity="0.4" stroke-width="1" />

          <!-- Bottom label: Funciones -->
          <text x="260" y="268" text-anchor="middle" font-size="11" font-weight="700" fill="hsl(var(--muted-foreground))" letter-spacing="1.5">
            FUNCIONES DEL PROYECTO
          </text>

          <!-- Funcion nodes (bottom) -->
          <g v-for="(f, i) in funciones" :key="'fn-'+f.id" class="cursor-pointer"
            @click="seleccionado = f.id"
            :transform="`translate(${getNodePos(i, 4, 260, 360, 100).x}, ${getNodePos(i, 4, 260, 360, 100).y})`"
          >
            <circle cx="0" cy="0" r="28"
              :fill="seleccionado === f.id ? f.color + '22' : 'hsl(var(--muted))'"
              :stroke="seleccionado === f.id ? f.color : 'hsl(var(--border))'"
              :stroke-width="seleccionado === f.id ? 2.5 : 1.5"
              class="transition-all duration-300"
            />
            <image :x="-10" :y="-10" width="20" height="20" :href="f.emojiImg" />
            <text y="44" text-anchor="middle" font-size="10" font-weight="600" fill="hsl(var(--foreground))">
              {{ f.label.length > 14 ? f.label.slice(0, 13) + '…' : f.label }}
            </text>
          </g>

          <!-- Emilio node (right side) -->
          <g class="cursor-pointer" @click="seleccionado = 'emilio'; hablarConEmilio()"
            :transform="`translate(440, 240)`">
            <circle cx="0" cy="0" r="24"
              fill="#9F7AEA18" stroke="#9F7AEA55" stroke-width="2"
            />
            <image :x="-10" :y="-10" width="20" height="20" :href="nodos.find(n=>n.id==='emilio')!.emojiImg" />
            <text y="38" text-anchor="middle" font-size="9" font-weight="600" fill="hsl(var(--foreground))">Emilio</text>
          </g>
        </svg>
      </div>

      <!-- Detail panel -->
      <Transition name="panel">
        <div v-if="nodoActivo" class="lg:sticky lg:top-24 rounded-2xl bg-surface border shadow-soft p-5"
          :style="{ borderColor: nodoActivo.color + '50' }">
          <div class="flex items-start gap-3 mb-4">
            <div class="flex h-12 w-12 items-center justify-center rounded-2xl flex-shrink-0"
              :style="{ backgroundColor: nodoActivo.color + '18' }">
              <component v-if="nodoActivo.detail.icon" :is="nodoActivo.detail.icon" class="w-6 h-6" :style="{ color: nodoActivo.color }" />
              <img v-else :src="nodoActivo.emojiImg" class="w-7 h-7" />
            </div>
            <div>
              <span class="text-[10px] font-bold uppercase tracking-wider" :style="{ color: nodoActivo.color }">
                {{ nodoActivo.category === 'estrategia' ? 'Estrategia' : nodoActivo.category === 'funcion' ? 'Función' : 'Apoyo' }}
              </span>
              <h4 class="font-bold text-foreground mt-0.5">{{ nodoActivo.detail.titulo }}</h4>
            </div>
          </div>

          <template v-if="nodoActivo.detail.cuando">
            <div class="rounded-xl bg-surface/85 p-3 mb-3 border border-border/40">
              <p class="text-xs font-bold uppercase tracking-wider mb-1" :style="{ color: nodoActivo.color }">Úsala cuando</p>
              <p class="text-xs text-foreground/80">{{ nodoActivo.detail.cuando }}</p>
            </div>
            <div class="rounded-xl bg-surface/85 p-3 mb-3 border border-border/40">
              <p class="text-xs font-bold uppercase tracking-wider mb-2" :style="{ color: nodoActivo.color }">Pasos</p>
              <ol class="space-y-1">
                <li v-for="(p, pi) in nodoActivo.detail.pasos" :key="pi" class="flex items-start gap-2 text-xs text-foreground/80">
                  <span class="font-bold flex-shrink-0" :style="{ color: nodoActivo.color }">{{ pi + 1 }}.</span>
                  {{ p }}
                </li>
              </ol>
            </div>
          </template>

          <div class="rounded-xl p-3" :style="{ backgroundColor: nodoActivo.color + '10' }">
            <p class="text-xs font-bold uppercase tracking-wider mb-1" :style="{ color: nodoActivo.color }">Resultado</p>
            <p class="text-xs text-foreground/80">{{ nodoActivo.detail.resultado }}</p>
          </div>

          <button v-if="nodoActivo.id === 'emilio'"
            @click="hablarConEmilio"
            class="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold bg-foreground text-background shadow-soft hover:shadow-lift transition-all">
            <BotMessageSquare class="w-4 h-4" /> Hablar con Emilio
          </button>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.panel-enter-active, .panel-leave-active { transition: all 0.3s ease; }
.panel-enter-from, .panel-leave-to { opacity: 0; transform: translateY(-10px); }
@media (prefers-reduced-motion: reduce) {
  .panel-enter-active, .panel-leave-active { transition: opacity 0.2s ease; }
  .panel-enter-from, .panel-leave-to { transform: none; }
}
</style>
