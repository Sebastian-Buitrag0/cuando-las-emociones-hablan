<script setup lang="ts">
import { onMounted, ref } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

interface NodeDef {
  id: string;
  lines: string[];
  sub: string;
  emoji: string;
  gf: string;
  gt: string;
  x: number;
  y: number;
  my: number;
}

const nodes: NodeDef[] = [
  { id: "autoconciencia", lines: ["Autoconciencia"], sub: "Reconocerte a ti mismo", emoji: "🧠", gf: "#667eea", gt: "#764ba2", x: dp[0].x, y: dp[0].y, my: 198 },
  { id: "autorregulacion", lines: ["Autorregulación"], sub: "Gestionar emociones", emoji: "⚖️", gf: "#38b2ac", gt: "#2b6cb0", x: dp[1].x, y: dp[1].y, my: 316 },
  { id: "empatia", lines: ["Empatía"], sub: "Comprender al otro", emoji: "💜", gf: "#b794f4", gt: "#d53f8c", x: dp[2].x, y: dp[2].y, my: 434 },
  { id: "habilidades", lines: ["Habilidades", "Sociales"], sub: "Conectar con otros", emoji: "🤝", gf: "#f6ad55", gt: "#ed8936", x: dp[3].x, y: dp[3].y, my: 552 },
  { id: "motivacion", lines: ["Motivación"], sub: "Impulsar el cambio", emoji: "✨", gf: "#e8c94a", gt: "#c07030", x: dp[4].x, y: dp[4].y, my: 670 },
];

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

onMounted(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  ([{ svg: svgRef.value, isM: false }, { svg: svgMRef.value, isM: true }] as const).forEach(({ svg, isM }) => {
    if (!svg) return;
    animate(svg, isM);
    setupHover(svg, isM);
  });
});
</script>

<template>
  <div ref="containerRef" class="w-full max-w-4xl mx-auto my-10 px-4">
    <p class="text-center text-xs font-semibold text-[#A0AEC0] uppercase tracking-widest mb-8">
      Cómo se conectan
    </p>

    <!-- ─── DESKTOP ─── -->
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
          v-for="n in nodes"
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

      <!-- Connection paths -->
      <path
        v-for="node in nodes"
        :key="`p-${node.id}`"
        :d="qPath(CX, CY, node.x, node.y)"
        class="path-d"
        fill="none"
        stroke="#CBD5E0"
        stroke-width="2"
        pathLength="1"
      />

      <!-- Center node -->
      <g class="center-g-d">
        <circle :cx="CX" :cy="CY" r="60" fill="url(#gc-d)" filter="url(#shadow-center-d)" />
        <!-- decorative ring inside -->
        <circle :cx="CX" :cy="CY" r="54" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1.5" />
        <text :x="CX" :y="CY - 11" text-anchor="middle" dominant-baseline="central" font-size="20">🌟</text>
        <text :x="CX" :y="CY + 8" text-anchor="middle" fill="white" font-size="9.5" font-weight="700" letter-spacing="0.8">HABILIDADES</text>
        <text :x="CX" :y="CY + 22" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-size="7.5" letter-spacing="0.6">SOCIOEMOCIONALES</text>
      </g>

      <!-- Leaf nodes -->
      <g
        v-for="node in nodes"
        :key="node.id"
        class="node-g-d"
        style="cursor: pointer"
      >
        <circle
          :cx="node.x"
          :cy="node.y"
          r="43"
          :fill="`url(#gn-d-${node.id})`"
          filter="url(#shadow-d)"
        />
        <!-- inner shine ring -->
        <circle :cx="node.x" :cy="node.y" r="37" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="1" />
        <!-- emoji -->
        <text
          :x="node.x"
          :y="node.y + (node.lines.length > 1 ? -14 : -10)"
          text-anchor="middle"
          dominant-baseline="central"
          font-size="18"
        >{{ node.emoji }}</text>
        <!-- label -->
        <text text-anchor="middle" fill="white" font-size="9.5" font-weight="700">
          <tspan
            v-for="(line, li) in node.lines"
            :key="li"
            :x="node.x"
            :y="node.y + (node.lines.length > 1 ? (li === 0 ? 6 : 19) : 11)"
          >{{ line }}</tspan>
        </text>
      </g>

      <!-- Sub-labels below each leaf -->
      <text
        v-for="node in nodes"
        :key="`sub-${node.id}`"
        :x="node.x"
        :y="node.y + 56"
        text-anchor="middle"
        fill="#718096"
        font-size="7.5"
        class="node-sub-d"
      >{{ node.sub }}</text>
    </svg>

    <!-- ─── MOBILE ─── -->
    <svg
      ref="svgMRef"
      viewBox="0 0 300 730"
      class="w-full h-auto md:hidden"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gc-m" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#4a5568" />
          <stop offset="100%" stop-color="#1a202c" />
        </linearGradient>
        <linearGradient
          v-for="n in nodes"
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

      <!-- Chain paths (center-to-0, then 0-to-1, etc.) -->
      <path
        :d="`M ${MCX} ${MCY + 52} L ${MCX} ${nodes[0].my - 38}`"
        class="path-m" fill="none" stroke="#CBD5E0" stroke-width="2" pathLength="1"
      />
      <path
        v-for="(_, i) in nodes.slice(0, 4)"
        :key="`pm-${i}`"
        :d="`M ${MCX} ${nodes[i].my + 38} L ${MCX} ${nodes[i + 1].my - 38}`"
        class="path-m" fill="none" stroke="#CBD5E0" stroke-width="2" pathLength="1"
      />

      <!-- Center node -->
      <g class="center-g-m">
        <circle :cx="MCX" :cy="MCY" r="52" fill="url(#gc-m)" filter="url(#shadow-center-m)" />
        <circle :cx="MCX" :cy="MCY" r="46" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1.5" />
        <text :x="MCX" :y="MCY - 10" text-anchor="middle" dominant-baseline="central" font-size="18">🌟</text>
        <text :x="MCX" :y="MCY + 7" text-anchor="middle" fill="white" font-size="9" font-weight="700" letter-spacing="0.8">HABILIDADES</text>
        <text :x="MCX" :y="MCY + 20" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-size="7" letter-spacing="0.6">SOCIOEMOCIONALES</text>
      </g>

      <!-- Leaf nodes mobile -->
      <g
        v-for="node in nodes"
        :key="node.id"
        class="node-g-m"
        style="cursor: pointer"
      >
        <circle
          :cx="MCX"
          :cy="node.my"
          r="38"
          :fill="`url(#gn-m-${node.id})`"
          filter="url(#shadow-m)"
        />
        <circle :cx="MCX" :cy="node.my" r="33" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="1" />
        <text
          :x="MCX"
          :y="node.my + (node.lines.length > 1 ? -12 : -9)"
          text-anchor="middle"
          dominant-baseline="central"
          font-size="16"
        >{{ node.emoji }}</text>
        <text text-anchor="middle" fill="white" font-size="9" font-weight="700">
          <tspan
            v-for="(line, li) in node.lines"
            :key="li"
            :x="MCX"
            :y="node.my + (node.lines.length > 1 ? (li === 0 ? 4 : 16) : 9)"
          >{{ line }}</tspan>
        </text>
      </g>

      <!-- Sub-labels mobile -->
      <text
        v-for="node in nodes"
        :key="`sub-m-${node.id}`"
        :x="MCX"
        :y="node.my + 49"
        text-anchor="middle"
        fill="#718096"
        font-size="7.5"
        class="node-sub-m"
      >{{ node.sub }}</text>
    </svg>

    <div class="mt-6 flex flex-wrap justify-center gap-6">
      <div class="flex items-center gap-2 text-xs text-[#718096]">
        <span class="w-6 h-0.5 bg-[#CBD5E0] rounded-full inline-block"></span>
        <span>Conexión con el centro</span>
      </div>
      <div class="flex items-center gap-2 text-xs text-[#718096]">
        <span class="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] inline-block"></span>
        <span>Cada habilidad potencia a las demás</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.path-d,
.path-m {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
}
</style>
