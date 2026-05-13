<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from "vue";
import { X } from "lucide-vue-next";

const EMOJI_BASE =
  "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@latest/assets";

/* ─── types ─────────────────────────────────────────────── */
interface PhysicsNode {
  id: string;
  label: string;
  emojiImg: string;
  color: string;
  baseAngle: number;   // current orbit angle (radians), advances every frame
  homeX: number;       // computed from baseAngle each frame
  homeY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  scale: number;
  hovered: boolean;
  question: string;
}

interface Particle {
  id: number;
  x: number; y: number;
  vx: number; vy: number;
  color: string;
  life: number;
  r: number;
}

/* ─── constants ──────────────────────────────────────────── */
const CX = 200;
const CY = 200;
const NODE_R   = 34;
const ORBIT_R  = 130;
const ORBIT_SPEED = 0.0035;
const BOUNDARY_PAD = 50;
const SVG_SIZE = 400;

/* ─── node definitions ───────────────────────────────────── */
// evenly spaced 60° apart, starting from top (−π/2)
const NODE_DEFS = [
  { id: "familia",    label: "Familia",      emojiImg: `${EMOJI_BASE}/House/3D/house_3d.png`, color: "#BC6C8A", baseAngle: -Math.PI / 2,      question: "¿Cómo te apoya tu familia?" },
  { id: "amigo",      label: "Amigo/a",      emojiImg: `${EMOJI_BASE}/People%20hugging/3D/people_hugging_3d.png`, color: "#5B8DEE", baseAngle: -Math.PI / 6,      question: "¿Cómo te apoya tu amigo/a?" },
  { id: "profe",      label: "Profe",        emojiImg: `${EMOJI_BASE}/Open%20book/3D/open_book_3d.png`, color: "#F4A259", baseAngle:  Math.PI / 6,      question: "¿Cómo te apoya tu profe?" },
  { id: "orientador", label: "Orientador/a", emojiImg: `${EMOJI_BASE}/Compass/3D/compass_3d.png`, color: "#48BB78", baseAngle:  Math.PI / 2,      question: "¿Cómo te apoya el/la orientador/a?" },
  { id: "companero",  label: "Compañero/a",  emojiImg: `${EMOJI_BASE}/Handshake/3D/handshake_3d.png`, color: "#9F7AEA", baseAngle:  5 * Math.PI / 6,  question: "¿Cómo te apoya un/a compañero/a?" },
  { id: "otro",       label: "Otro",         emojiImg: `${EMOJI_BASE}/Star/3D/star_3d.png`, color: "#D4A843", baseAngle: -5 * Math.PI / 6,  question: "¿Quién más te apoya y cómo?" },
] as const;

/* ─── physics state ─────────────────────────────────────── */
const nodes = reactive<PhysicsNode[]>(
  NODE_DEFS.map((n) => ({
    ...n,
    // entry: start at center, burst outward
    x:  CX,
    y:  CY,
    vx: Math.cos(n.baseAngle) * 7 + (Math.random() - 0.5) * 3,
    vy: Math.sin(n.baseAngle) * 7 + (Math.random() - 0.5) * 3,
    homeX: CX + ORBIT_R * Math.cos(n.baseAngle),
    homeY: CY + ORBIT_R * Math.sin(n.baseAngle),
    scale: 0.1,
    hovered: false,
  }))
);

/* ─── particles ──────────────────────────────────────────── */
let _pid = 0;
const particles = reactive<Particle[]>([]);

/* ─── UI state ───────────────────────────────────────────── */
const notas       = reactive<Record<string, string>>({});
const nodoActivo  = ref<string | null>(null);
const textoActual = ref("");
const mostrarResumen = ref(false);
const showHint    = ref(true);

/* ─── drag state (plain — no reactive overhead at 60fps) ─── */
const svgRef = ref<SVGSVGElement | null>(null);
let draggingIdx = -1;
let prevX = 0, prevY = 0, lastX = 0, lastY = 0;
let dragStartX = 0, dragStartY = 0, dragMoved = false;

/* ─── helpers ────────────────────────────────────────────── */
function toSvg(cx: number, cy: number) {
  const el = svgRef.value;
  if (!el) return { x: 0, y: 0 };
  const r = el.getBoundingClientRect();
  const s = SVG_SIZE / r.width;
  return { x: (cx - r.left) * s, y: (cy - r.top) * s };
}

function isLleno(id: string) { return !!(notas[id]?.trim()); }

// radial label offset: 48px from node centre, pointing away from YO
function labelOff(n: PhysicsNode) {
  const dx = n.x - CX;
  const dy = n.y - CY;
  const d  = Math.sqrt(dx * dx + dy * dy) || 1;
  return { x: (dx / d) * 48, y: (dy / d) * 48 };
}

/* ─── animation loop ─────────────────────────────────────── */
let _raf = 0;
let _lastT = 0;

function tick(t: number) {
  const dt = Math.min((t - _lastT) / 16.67, 3);
  _lastT = t;

  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i];

    // smooth scale toward hover target
    n.scale += ((n.hovered ? 1.25 : 1.0) - n.scale) * 0.14;

    // ── advance orbit (always, even when hovered — so unhover is smooth) ──
    if (draggingIdx !== i) {
      n.baseAngle += ORBIT_SPEED * dt;
    }
    n.homeX = CX + ORBIT_R * Math.cos(n.baseAngle);
    n.homeY = CY + ORBIT_R * Math.sin(n.baseAngle);

    // Skip physics + positional update when hovered — freeze visual position
    if (n.hovered || draggingIdx === i) continue;

    // Tangential spring: pull toward moving home angle
    // Compute angular difference and apply tangential force
    const curAngle  = Math.atan2(n.y - CY, n.x - CX);
    const homeAngle = Math.atan2(n.homeY - CY, n.homeX - CX);
    let   dAngle    = homeAngle - curAngle;
    // Wrap to [-π, π]
    if (dAngle >  Math.PI) dAngle -= 2 * Math.PI;
    if (dAngle < -Math.PI) dAngle += 2 * Math.PI;

    // Tangent direction at current angle
    const tx =  -Math.sin(curAngle);
    const ty =   Math.cos(curAngle);

    let fx = tx * dAngle * 6.5;
    let fy = ty * dAngle * 6.5;

    // Organic angular jitter (tangential only)
    const j = (Math.random() - 0.5) * 0.22;
    fx += tx * j;
    fy += ty * j;

    // Node-node angular repulsion on the ring
    for (let k = 0; k < nodes.length; k++) {
      if (k === i) continue;
      const oa  = Math.atan2(nodes[k].y - CY, nodes[k].x - CX);
      let   da  = curAngle - oa;
      if (da >  Math.PI) da -= 2 * Math.PI;
      if (da < -Math.PI) da += 2 * Math.PI;
      const minSep = 1.02; // ~58° — almost the full 60° natural gap
      if (Math.abs(da) < minSep) {
        const repulse = (minSep - Math.abs(da)) * 9.0 * Math.sign(da);
        fx += tx * repulse;
        fy += ty * repulse;
      }
    }

    // Integrate (damped Euler — only tangential component matters)
    n.vx = (n.vx + fx * dt) * 0.80;
    n.vy = (n.vy + fy * dt) * 0.80;
    n.x += n.vx * dt;
    n.y += n.vy * dt;

    // ── Hard orbital constraint ───────────────────────────────
    // After integration, project position back onto the ring so nodes
    // are ALWAYS exactly ORBIT_R from center, regardless of forces.
    const snapAngle = Math.atan2(n.y - CY, n.x - CX);
    n.baseAngle = snapAngle;
    n.x = CX + ORBIT_R * Math.cos(snapAngle);
    n.y = CY + ORBIT_R * Math.sin(snapAngle);

    // Project velocity to be purely tangential (remove any radial drift)
    const snapTx = -Math.sin(snapAngle);
    const snapTy =  Math.cos(snapAngle);
    const tv     = n.vx * snapTx + n.vy * snapTy;
    n.vx = snapTx * tv;
    n.vy = snapTy * tv;
  }

  // particles
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x  += p.vx * dt;
    p.y  += p.vy * dt;
    p.vy += 0.14 * dt;
    p.vx *= 0.96;
    p.vy *= 0.96;
    p.life -= 0.022 * dt;
    if (p.life <= 0) particles.splice(i, 1);
  }

  _raf = requestAnimationFrame(tick);
}

/* ─── pointer handlers ───────────────────────────────────── */
function onNodeDown(e: PointerEvent, i: number) {
  e.preventDefault();
  e.stopPropagation();
  svgRef.value?.setPointerCapture(e.pointerId);
  draggingIdx = i;
  nodes[i].vx = 0;
  nodes[i].vy = 0;
  // Start tracking from the node's current ring position (already on the ring)
  prevX = nodes[i].x; prevY = nodes[i].y;
  lastX = nodes[i].x; lastY = nodes[i].y;
  dragStartX = nodes[i].x; dragStartY = nodes[i].y;
  dragMoved = false;
  showHint.value = false;
}

function onSvgMove(e: PointerEvent) {
  if (draggingIdx < 0) return;
  const pos = toSvg(e.clientX, e.clientY);

  // Project pointer onto the orbit ring — node always stays at ORBIT_R from center
  const angle = Math.atan2(pos.y - CY, pos.x - CX);
  const rx = CX + ORBIT_R * Math.cos(angle);
  const ry = CY + ORBIT_R * Math.sin(angle);

  prevX = lastX; prevY = lastY;
  lastX = rx;    lastY = ry;

  nodes[draggingIdx].x         = rx;
  nodes[draggingIdx].y         = ry;
  nodes[draggingIdx].baseAngle = angle;

  if (Math.abs(rx - dragStartX) > 4 || Math.abs(ry - dragStartY) > 4)
    dragMoved = true;
}

function onSvgUp() {
  if (draggingIdx < 0) return;
  const n = nodes[draggingIdx];
  n.vx = (lastX - prevX) * 2.2;
  n.vy = (lastY - prevY) * 2.2;
  // sync baseAngle to where the node was dropped so orbit continues smoothly
  n.baseAngle = Math.atan2(n.y - CY, n.x - CX);
  const wasClick = !dragMoved;
  draggingIdx = -1;
  if (wasClick) abrirNodo(n.id);
}

/* ─── particle burst ─────────────────────────────────────── */
function burst(x: number, y: number, color: string) {
  for (let i = 0; i < 20; i++) {
    const a = (i / 20) * Math.PI * 2 + Math.random() * 0.3;
    const s = 1.8 + Math.random() * 4.5;
    particles.push({ id: _pid++, x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, color, life: 0.9 + Math.random() * 0.4, r: 2.5 + Math.random() * 4 });
  }
}

/* ─── form handlers ──────────────────────────────────────── */
function abrirNodo(id: string) {
  mostrarResumen.value = false;
  nodoActivo.value = id;
  textoActual.value = notas[id] ?? "";
}

function guardar() {
  if (nodoActivo.value && textoActual.value.trim()) {
    const id = nodoActivo.value;
    notas[id] = textoActual.value.trim();
    const n   = nodes.find((n) => n.id === id);
    const def = NODE_DEFS.find((d) => d.id === id);
    if (n && def) burst(n.x, n.y, def.color);
  }
  nodoActivo.value = null;
  textoActual.value = "";
}

function cerrarForm() { nodoActivo.value = null; textoActual.value = ""; }

/* ─── computed ───────────────────────────────────────────── */
const nodoActivoData = computed(() => NODE_DEFS.find((n) => n.id === nodoActivo.value));
const nodosLlenos    = computed(() => NODE_DEFS.filter((n) => isLleno(n.id)));

/* ─── lifecycle ──────────────────────────────────────────── */
onMounted(() => {
  _lastT = performance.now();
  _raf   = requestAnimationFrame(tick);
  setTimeout(() => (showHint.value = false), 4200);
});
onUnmounted(() => cancelAnimationFrame(_raf));
</script>

<template>
  <div class="mt-12 max-w-4xl mx-auto">
    <!-- Header -->
    <div
      v-motion
      :initial="{ opacity: 0, y: 20 }"
      :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 700 } }"
      class="text-center mb-8"
    >
      <span class="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-3">
        Actividad interactiva
      </span>
      <h3 class="text-2xl sm:text-3xl font-bold text-foreground mb-2">
        Tu red de apoyo virtual
      </h3>
      <p class="text-sm text-muted-foreground max-w-sm mx-auto">
        Los nodos orbitan a tu alrededor. Tócalos o arrástralos para interactuar.
      </p>
    </div>

    <!-- Network card -->
    <div class="bg-surface rounded-3xl shadow-soft border border-border p-3 sm:p-5 max-w-sm mx-auto relative overflow-hidden">
      <svg
        ref="svgRef"
        viewBox="0 0 400 400"
        class="w-full touch-none select-none"
        @pointermove.prevent="onSvgMove"
        @pointerup.prevent="onSvgUp"
        @pointercancel="onSvgUp"
      >
        <defs>
          <!-- glow for filled nodes -->
          <filter id="node-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>

          <!-- soft shadow for center -->
          <filter id="center-shadow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="2" stdDeviation="6" flood-color="hsl(var(--accent))" flood-opacity="0.16" />
          </filter>

          <!-- per-node gradient lines (live-updated) -->
          <linearGradient
            v-for="n in nodes"
            :key="'g-' + n.id"
            :id="'lg-' + n.id"
            :x1="CX" :y1="CY"
            :x2="n.x" :y2="n.y"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%"   stop-color="hsl(var(--border))" stop-opacity="0.3" />
            <stop offset="100%" :stop-color="n.color" :stop-opacity="isLleno(n.id) ? 0.9 : 0.38" />
          </linearGradient>
        </defs>


        <!-- ── connection lines ── -->
        <line
          v-for="n in nodes"
          :key="'line-' + n.id"
          :x1="CX" :y1="CY"
          :x2="n.x" :y2="n.y"
          :stroke="'url(#lg-' + n.id + ')'"
          :stroke-width="isLleno(n.id) ? 2.5 : 1.5"
          :stroke-dasharray="isLleno(n.id) ? 'none' : '6 5'"
          stroke-linecap="round"
        />

        <!-- ── center "Yo" ── -->
        <g transform="translate(200,200)" filter="url(#center-shadow)">
          <circle cx="0" cy="0" r="52" class="center-pulse" />
          <circle cx="0" cy="0" r="46" fill="hsl(var(--surface-warm))" stroke="hsl(var(--border))" stroke-width="2" />
          <circle cx="0" cy="0" r="40" fill="hsl(var(--surface))" />
          <image x="-14" y="-24" width="28" height="28" :href="`${EMOJI_BASE}/Bust%20in%20silhouette/3D/bust_in_silhouette_3d.png`" />
          <text x="0" y="14" text-anchor="middle" dominant-baseline="middle" font-size="14" fill="hsl(var(--foreground))" font-weight="700">Yo</text>
        </g>

        <!-- ── person nodes ── -->
        <g
          v-for="(n, i) in nodes"
          :key="n.id"
          :transform="`translate(${n.x}, ${n.y})`"
          :filter="isLleno(n.id) ? 'url(#node-glow)' : undefined"
          class="cursor-pointer"
          @pointerdown.prevent="onNodeDown($event, i)"
          @pointerenter="n.hovered = true"
          @pointerleave="n.hovered = false"
        >
          <!-- scaled visuals -->
          <g :transform="`scale(${n.scale})`">
            <!-- outer glow halo -->
            <circle cx="0" cy="0" :r="NODE_R + 10"
              :fill="n.hovered || isLleno(n.id) ? n.color + '1E' : 'transparent'"
              :stroke="n.hovered ? n.color + '55' : 'transparent'"
              stroke-width="1.5"
            />
            <!-- main circle -->
            <circle cx="0" cy="0" :r="NODE_R"
              :fill="isLleno(n.id) ? n.color + '22' : 'hsl(var(--muted))'"
              :stroke="isLleno(n.id) ? n.color : n.hovered ? n.color + 'AA' : 'hsl(var(--border))'"
              :stroke-width="isLleno(n.id) ? 2.5 : 1.5"
            />
            <!-- emoji -->
            <image :x="-12" :y="-11" width="24" height="24" :href="n.emojiImg" />
            <!-- check badge -->
            <g v-if="isLleno(n.id)">
              <circle cx="22" cy="-22" r="10" :fill="n.color" />
              <image x="12" y="-32" width="20" height="20" :href="`${EMOJI_BASE}/Check%20mark%20button/3D/check_mark_button_3d.png`" />
            </g>
          </g>

          <!-- label: always radially away from center so it never overlaps -->
          <text
            :x="labelOff(n).x"
            :y="labelOff(n).y + 4"
            text-anchor="middle"
            dominant-baseline="middle"
            font-size="10.5"
            :fill="isLleno(n.id) ? n.color : 'hsl(var(--muted-foreground))'"
            font-weight="600"
          >{{ n.label }}</text>
        </g>

        <!-- ── particles ── -->
        <circle
          v-for="p in particles"
          :key="p.id"
          :cx="p.x" :cy="p.y"
          :r="Math.max(0, p.r * p.life)"
          :fill="p.color"
          :opacity="Math.max(0, p.life)"
        />

        <!-- ── hint ── -->
        <Transition name="hint-fade">
          <foreignObject v-if="showHint" x="0" y="375" width="400" height="24">
            <div xmlns="http://www.w3.org/1999/xhtml" class="flex items-center justify-center gap-1 text-[10.5px] text-muted-foreground/60 h-full">
              <img class="w-4 h-4 drop-shadow-sm" :src="`${EMOJI_BASE}/Backhand%20index%20pointing%20up/Default/3D/backhand_index_pointing_up_3d_default.png`" alt="" />
              <span>Toca un nodo para agregar apoyo</span>
            </div>
          </foreignObject>
        </Transition>
      </svg>

      <!-- progress dots -->
      <div class="flex items-center justify-between px-2 pb-1">
        <p class="text-xs text-muted-foreground">
          <span class="font-bold text-foreground">{{ nodosLlenos.length }}</span>/{{ NODE_DEFS.length }} personas
        </p>
        <div class="flex gap-1.5">
          <div
            v-for="nd in NODE_DEFS" :key="'dot-' + nd.id"
            class="w-2 h-2 rounded-full transition-all duration-300"
            :style="{ backgroundColor: isLleno(nd.id) ? nd.color : 'hsl(var(--border))' }"
          />
        </div>
      </div>
    </div>

    <!-- form panel -->
    <Transition name="panel">
      <div
        v-if="nodoActivoData"
        class="mt-4 max-w-sm mx-auto rounded-2xl bg-surface border shadow-soft p-5"
        :style="{ borderColor: nodoActivoData.color + '55' }"
      >
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <img class="w-5 h-5 inline-block" :src="nodoActivoData.emojiImg" :alt="nodoActivoData.label" />
            <p class="font-semibold text-foreground text-sm">{{ nodoActivoData.question }}</p>
          </div>
          <button class="text-muted-foreground/60 hover:text-muted-foreground transition-colors ml-2 flex-shrink-0" @click="cerrarForm">
            <X class="w-4 h-4" />
          </button>
        </div>
        <textarea
          v-model="textoActual"
          class="w-full rounded-xl border border-border p-3 text-sm text-foreground/80 resize-none outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary transition-colors duration-200"
          :style="textoActual ? { borderColor: nodoActivoData.color + '70' } : {}"
          placeholder="Escribe aquí cómo te apoya..."
          rows="3"
          autofocus
        />
        <div class="flex justify-end gap-2 mt-3">
          <button
            class="px-4 py-2 rounded-full text-xs font-semibold text-muted-foreground border border-border hover:bg-muted transition-all"
            @click="cerrarForm"
          >Cancelar</button>
          <button
            class="px-4 py-2 rounded-full text-xs font-semibold text-primary-foreground transition-all"
            :class="textoActual.trim() ? 'opacity-100 hover:-translate-y-0.5' : 'opacity-40 cursor-not-allowed'"
            :style="{ backgroundColor: nodoActivoData.color }"
            :disabled="!textoActual.trim()"
            @click="guardar"
          >Guardar ✓</button>
        </div>
      </div>
    </Transition>

    <!-- "ver mi red" button -->
    <Transition name="fade">
      <div v-if="nodosLlenos.length > 0 && !nodoActivo" class="mt-5 text-center">
        <button
          class="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold bg-foreground text-background shadow-soft motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 transition-[transform,box-shadow] duration-200 hover:shadow-lift"
          @click="mostrarResumen = !mostrarResumen; nodoActivo = null"
        >
          <span v-if="mostrarResumen" class="inline-flex items-center gap-1">Ocultar mi red</span>
          <span v-else class="inline-flex items-center gap-1">
            <img class="w-5 h-5 drop-shadow-sm" :src="`${EMOJI_BASE}/Globe%20showing%20Americas/3D/globe_showing_americas_3d.png`" alt="Red" />
            Ver mi red de apoyo
          </span>
        </button>
      </div>
    </Transition>

    <!-- summary -->
    <Transition name="panel">
      <div v-if="mostrarResumen && nodosLlenos.length > 0" class="mt-6 max-w-2xl mx-auto">
        <h4 class="text-center font-bold text-foreground mb-5">
          <span class="inline-flex items-center gap-1">
            Tu red de apoyo
            <img class="w-5 h-5 drop-shadow-sm" :src="`${EMOJI_BASE}/Blue%20heart/3D/blue_heart_3d.png`" alt="Corazón" />
          </span>
        </h4>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div
            v-for="nd in nodosLlenos" :key="'s-' + nd.id"
            class="rounded-2xl p-4 border"
            :style="{ backgroundColor: nd.color + '10', borderColor: nd.color + '35' }"
          >
            <div class="flex items-center gap-2 mb-2">
              <img class="w-5 h-5 inline-block" :src="nd.emojiImg" :alt="nd.label" />
              <span class="font-bold text-sm" :style="{ color: nd.color }">{{ nd.label }}</span>
            </div>
            <p class="text-sm text-foreground/80 leading-relaxed">{{ notas[nd.id] }}</p>
          </div>
        </div>
        <p class="text-center text-xs text-muted-foreground mt-5 italic">
          Cuando las emociones sean difíciles, estas personas están ahí para ti.
          <img class="w-5 h-5 inline-block drop-shadow-sm" :src="`${EMOJI_BASE}/Blue%20heart/3D/blue_heart_3d.png`" alt="Corazón" />
        </p>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* center pulse */
.center-pulse {
  fill: hsl(var(--accent));
  opacity: 0.16;
  transform-origin: 0 0;
}
@media (prefers-reduced-motion: no-preference) {
  .center-pulse { animation: centerPulse 3s ease-in-out infinite; }
  @keyframes centerPulse {
    0%,100% { transform: scale(1);    opacity: 0.16; }
    50%      { transform: scale(1.25); opacity: 0.05; }
  }
}

/* transitions */
.panel-enter-active, .panel-leave-active  { transition: all 0.3s ease; }
.panel-enter-from,  .panel-leave-to       { opacity: 0; transform: translateY(-10px); }

@media (prefers-reduced-motion: reduce) {
  .panel-enter-active, .panel-leave-active { transition: opacity 0.3s ease; }
  .panel-enter-from,  .panel-leave-to      { transform: none; }
}

.fade-enter-active, .fade-leave-active  { transition: opacity 0.35s ease; }
.fade-enter-from,   .fade-leave-to      { opacity: 0; }

.hint-fade-enter-active, .hint-fade-leave-active { transition: opacity 1.2s ease; }
.hint-fade-enter-from,   .hint-fade-leave-to     { opacity: 0; }
</style>
