<script setup lang="ts">
import { ref, computed } from "vue";
import { Heart, BookOpen, AlertTriangle, Users, MessageSquare, Lightbulb, Shield, Sparkles, BotMessageSquare } from "lucide-vue-next";

const EMOJI_BASE = "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@latest/assets";

interface Nodo {
  id: string;
  label: string;
  emojiImg: string;
  color: string;
  detail: { titulo: string; preguntas: string[]; consejo: string };
}

const nodos: Nodo[] = [
  { id: "acompanar",   label: "Acompañar",     emojiImg: `${EMOJI_BASE}/Heart%20with%20arrow/3D/heart_with_arrow_3d.png`, color: "#BC6C8A", detail: { titulo: "¿Cómo acompaño emocionalmente?", preguntas: ["¿Valido sus emociones sin juzgar?", "¿Creo espacios sin pantallas para conversar?", "¿Soy modelo de gestión emocional?", "¿Mantenemos rutinas que dan seguridad?"], consejo: "La validación sin juicio es el primer regalo emocional." }},
  { id: "criar",        label: "Criar Positivo",    emojiImg: `${EMOJI_BASE}/Open%20book/3D/open_book_3d.png`, color: "#5B8DEE", detail: { titulo: "¿Qué es la crianza positiva?", preguntas: ["¿Uso refuerzos positivos concretos?", "¿Establezco límites claros con explicación?", "¿Practico conexión antes de corrección?", "¿Fomento autonomía según su edad?"], consejo: "La conexión antes de la corrección cambia todo." }},
  { id: "alertas",      label: "Señales",       emojiImg: `${EMOJI_BASE}/Warning/3D/warning_3d.png`, color: "#F6AD55", detail: { titulo: "¿Qué señales debo observar?", preguntas: ["¿Hay cambios de comportamiento sin causa?", "¿Se aísla de sus amistades?", "¿Cambió el sueño o apetito por +2 semanas?", "¿Expresa tristeza o desesperanza?"], consejo: "Más de 2 semanas con cambios notorios: busca apoyo profesional." }},
  { id: "conversar",    label: "Conversar",       emojiImg: `${EMOJI_BASE}/Speech%20balloon/3D/speech_balloon_3d.png`, color: "#F4A259", detail: { titulo: "¿Conversamos a diario?", preguntas: ["¿Cuándo fue la última vez que hablaron 10 min sin pantallas?", "¿Tu hijo/a siente que puede contarte cualquier cosa?"], consejo: "10 minutos sin distracciones al día construyen confianza." }},
  { id: "modelar",      label: "Modelar",        emojiImg: `${EMOJI_BASE}/Light%20bulb/3D/light_bulb_3d.png`, color: "#81E6D9", detail: { titulo: "¿Qué ven mis hijos de mí?", preguntas: ["¿Qué ven cuando atravieso una situación difícil?", "¿Expreso yo mis emociones de forma saludable?"], consejo: "Los hijos aprenden más de lo que ven que de lo que escuchan." }},
  { id: "emilio",       label: "Emilio IA",      emojiImg: `${EMOJI_BASE}/Robot/3D/robot_3d.png`, color: "#9F7AEA", detail: { titulo: "Emilio · Asistente IA", preguntas: ["¿Necesitas orientación personalizada?", "¿Quieres estrategias concretas para tu situación?"], consejo: "Emilio puede acompañarte 24/7 sin juicios." }},
];

const seleccionado = ref<string | null>(null);
const nodoActivo = computed(() => nodos.find((n) => n.id === seleccionado.value));

function getNodePos(i: number, total: number, cx: number, cy: number, r: number) {
  const startAngle = -Math.PI / 2 - 0.3;
  const angle = startAngle + (i / (total - 1)) * (Math.PI + 0.6);
  return { x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r };
}

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
      <p class="text-sm text-muted-foreground mt-1">Toca cada nodo para descubrir preguntas y consejos.</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">
      <!-- SVG Radial Graph -->
      <div class="bg-surface rounded-3xl border border-border/60 shadow-soft p-4 sm:p-6">
        <svg viewBox="0 0 480 400" class="w-full h-auto max-h-[420px]">
          <!-- Connection lines from center to nodes -->
          <line v-for="(n, i) in nodos.slice(0, 5)" :key="'line-'+n.id"
            :x1="240" :y1="180"
            :x2="getNodePos(i, 5, 240, 180, 155).x"
            :y2="getNodePos(i, 5, 240, 180, 155).y"
            :stroke="n.color" stroke-opacity="0.25" stroke-width="1.5"
            :stroke-dasharray="seleccionado === n.id ? 'none' : '5 5'"
            class="transition-all duration-300"
          />

          <!-- Center: Familia -->
          <g>
            <circle cx="240" cy="180" r="38" fill="hsl(var(--surface))" stroke="hsl(var(--accent))" stroke-opacity="0.3" stroke-width="2" />
            <circle cx="240" cy="180" r="32" fill="hsl(var(--accent) / 0.08)" />
            <image x="224" y="164" width="32" height="32" :href="`${EMOJI_BASE}/House/3D/house_3d.png`" />
            <text x="240" y="212" text-anchor="middle" font-size="11" font-weight="700" fill="hsl(var(--foreground))">Familia</text>
          </g>

          <!-- Nodes -->
          <g v-for="(n, i) in nodos.slice(0, 5)" :key="'n-'+n.id" class="cursor-pointer"
            @click="seleccionado = n.id"
            :transform="`translate(${getNodePos(i, 5, 240, 180, 155).x}, ${getNodePos(i, 5, 240, 180, 155).y})`"
          >
            <circle cx="0" cy="0" r="26"
              :fill="seleccionado === n.id ? n.color + '22' : 'hsl(var(--muted))'"
              :stroke="seleccionado === n.id ? n.color : 'hsl(var(--border))'"
              :stroke-width="seleccionado === n.id ? 2.5 : 1.5"
              class="transition-all duration-300"
            />
            <image :x="-10" :y="-10" width="20" height="20" :href="n.emojiImg" />
            <text y="40" text-anchor="middle" font-size="10" font-weight="600" fill="hsl(var(--foreground))">{{ n.label }}</text>
          </g>

          <!-- Emilio side node -->
          <g class="cursor-pointer" @click="seleccionado = 'emilio'; hablarConEmilio()"
            :transform="`translate(380, 310)`">
            <circle cx="0" cy="0" r="22"
              :fill="seleccionado === 'emilio' ? '#9F7AEA22' : 'hsl(var(--muted))'"
              :stroke="seleccionado === 'emilio' ? '#9F7AEA' : 'hsl(var(--border))'"
              :stroke-width="seleccionado === 'emilio' ? 2.5 : 1.5"
              class="transition-all duration-300"
            />
            <image :x="-9" :y="-9" width="18" height="18" :href="nodos.find(n=>n.id==='emilio')!.emojiImg" />
            <text y="35" text-anchor="middle" font-size="9" font-weight="600" fill="hsl(var(--foreground))">Emilio</text>
          </g>
          <line x1="360" y1="300" x2="404" y2="310" :stroke="nodos.find(n=>n.id==='emilio')!.color" stroke-opacity="0.2" stroke-width="1.5" stroke-dasharray="4 4" />
        </svg>
      </div>

      <!-- Detail panel -->
      <Transition name="panel">
        <div v-if="nodoActivo" class="lg:sticky lg:top-24 rounded-2xl bg-surface border shadow-soft p-5"
          :style="{ borderColor: nodoActivo.color + '50' }">
          <div class="flex items-start gap-3 mb-4">
            <div class="flex h-12 w-12 items-center justify-center rounded-2xl flex-shrink-0"
              :style="{ backgroundColor: nodoActivo.color + '18' }">
              <img :src="nodoActivo.emojiImg" class="w-7 h-7" />
            </div>
            <div>
              <span class="text-[10px] font-bold uppercase tracking-wider" :style="{ color: nodoActivo.color }">
                Pilar familiar
              </span>
              <h4 class="font-bold text-foreground mt-0.5">{{ nodoActivo.detail.titulo }}</h4>
            </div>
          </div>

          <div class="rounded-xl bg-surface/85 p-3 mb-3 border border-border/40">
            <p class="text-xs font-bold uppercase tracking-wider mb-2" :style="{ color: nodoActivo.color }">
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
            <p class="text-xs font-bold uppercase tracking-wider mb-1" :style="{ color: nodoActivo.color }">Consejo</p>
            <p class="text-xs text-foreground/80 italic">{{ nodoActivo.detail.consejo }}</p>
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
