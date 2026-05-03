<script setup lang="ts">
import { onMounted, ref } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const containerRef = ref<HTMLElement | null>(null);
const svgDesktopRef = ref<SVGSVGElement | null>(null);
const svgMobileRef = ref<SVGSVGElement | null>(null);

interface Node {
  id: string;
  label: string;
  color: string;
  x: number;
  y: number;
  mobileY: number;
}

const nodes: Node[] = [
  { id: "autoconciencia", label: "Autoconciencia", color: "#5B8DEE", x: 300, y: 80, mobileY: 60 },
  { id: "autorregulacion", label: "Autorregulación", color: "#81E6D9", x: 520, y: 200, mobileY: 180 },
  { id: "empatia", label: "Empatía", color: "#BC6C8A", x: 430, y: 420, mobileY: 300 },
  { id: "habilidades", label: "Habilidades Sociales", color: "#F4A259", x: 170, y: 420, mobileY: 420 },
  { id: "motivacion", label: "Motivación", color: "#F6E05E", x: 80, y: 200, mobileY: 540 },
];

const centerNode = { id: "centro", label: "Habilidades Socioemocionales", color: "#2D3748", x: 300, y: 250, mobileY: 660 };

const connections = [
  { from: 0, to: "center" },
  { from: 1, to: "center" },
  { from: 2, to: "center" },
  { from: 3, to: "center" },
  { from: 4, to: "center" },
  { from: 0, to: 1, chain: true },
  { from: 1, to: 2, chain: true },
  { from: 2, to: 3, chain: true },
  { from: 3, to: 4, chain: true },
];

function getNodePos(index: number, isMobile: boolean) {
  const n = index === -1 ? centerNode : nodes[index];
  return isMobile ? { x: 150, y: n.mobileY } : { x: n.x, y: n.y };
}

function animateSVG(svg: SVGSVGElement | null, isMobile: boolean) {
  if (!svg) return;

  const lineSelector = isMobile ? ".mm-line-m" : ".mm-line-d";
  const nodeCircleSelector = isMobile ? ".mm-node-circle-m" : ".mm-node-circle-d";
  const nodeTextSelector = isMobile ? ".mm-node-text-m" : ".mm-node-text-d";
  const centerCircleSelector = isMobile ? ".mm-center-circle-m" : ".mm-center-circle-d";
  const centerTextSelector = isMobile ? ".mm-center-text-m" : ".mm-center-text-d";

  gsap.set(svg.querySelectorAll(lineSelector), { strokeDashoffset: 300, opacity: 0 });
  gsap.set(svg.querySelectorAll(nodeCircleSelector), { scale: 0, opacity: 0, transformOrigin: "center" });
  gsap.set(svg.querySelectorAll(nodeTextSelector), { opacity: 0, y: 10 });
  gsap.set(svg.querySelector(centerCircleSelector), { scale: 0, opacity: 0, transformOrigin: "center" });
  gsap.set(svg.querySelector(centerTextSelector), { opacity: 0, y: 10 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: containerRef.value,
      start: "top 75%",
      end: "center center",
      toggleActions: "play none none reverse",
    },
  });

  tl.to(svg.querySelector(centerCircleSelector), { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" })
    .to(svg.querySelector(centerTextSelector), { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "-=0.3");

  tl.to(svg.querySelectorAll(lineSelector), {
    strokeDashoffset: 0,
    opacity: 1,
    duration: 0.8,
    stagger: 0.08,
    ease: "power2.inOut",
  }, "-=0.2");

  tl.to(svg.querySelectorAll(nodeCircleSelector), {
    scale: 1,
    opacity: 1,
    duration: 0.5,
    stagger: 0.1,
    ease: "back.out(1.7)",
  }, "-=0.5");

  tl.to(svg.querySelectorAll(nodeTextSelector), {
    opacity: 1,
    y: 0,
    duration: 0.4,
    stagger: 0.1,
    ease: "power2.out",
  }, "-=0.4");

  gsap.to(svg.querySelector(centerCircleSelector), {
    scale: 1.05,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: 1.5,
  });
}

onMounted(() => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!prefersReduced) {
    animateSVG(svgDesktopRef.value, false);
    animateSVG(svgMobileRef.value, true);
  }
});
</script>

<template>
  <div ref="containerRef" class="w-full max-w-4xl mx-auto my-10 px-4">
    <p class="text-center text-xs font-semibold text-[#A0AEC0] uppercase tracking-widest mb-6">
      Cómo se conectan
    </p>

    <!-- Desktop SVG -->
    <svg
      ref="svgDesktopRef"
      viewBox="0 0 600 520"
      class="w-full h-auto hidden md:block"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g v-for="(conn, i) in connections" :key="`d-line-${i}`">
        <line
          :x1="getNodePos(conn.from, false).x"
          :y1="getNodePos(conn.from, false).y"
          :x2="conn.to === 'center' ? centerNode.x : getNodePos(conn.to as number, false).x"
          :y2="conn.to === 'center' ? centerNode.y : getNodePos(conn.to as number, false).y"
          :stroke="conn.chain ? '#CBD5E0' : '#E2E8F0'"
          :stroke-width="conn.chain ? 3 : 2"
          :stroke-dasharray="conn.chain ? '8 6' : '300'"
          :class="['mm-line-d', conn.chain ? 'mm-chain' : '']"
          stroke-linecap="round"
          opacity="0.6"
        />
      </g>

      <circle
        :cx="centerNode.x"
        :cy="centerNode.y"
        r="55"
        :fill="centerNode.color"
        class="mm-center-circle-d"
        filter="url(#glow)"
      />
      <text
        :x="centerNode.x"
        :y="centerNode.y - 6"
        text-anchor="middle"
        fill="white"
        font-size="11"
        font-weight="700"
        class="mm-center-text-d"
      >
        <tspan>Habilidades</tspan>
        <tspan :x="centerNode.x" dy="16">Socioemocionales</tspan>
      </text>

      <g v-for="(node, i) in nodes" :key="`d-node-${node.id}`">
        <circle
          :cx="node.x"
          :cy="node.y"
          r="38"
          :fill="node.color"
          class="mm-node-circle-d"
          filter="url(#glow)"
        />
        <text
          :x="node.x"
          :y="node.y + 4"
          text-anchor="middle"
          fill="white"
          font-size="10"
          font-weight="700"
          class="mm-node-text-d"
        >
          <tspan v-for="(line, li) in node.label.split(' ')" :key="li" :x="node.x" :dy="li === 0 ? 0 : 14">
            {{ line }}
          </tspan>
        </text>
      </g>
    </svg>

    <!-- Mobile SVG -->
    <svg
      ref="svgMobileRef"
      viewBox="0 0 300 720"
      class="w-full h-auto md:hidden"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="glow-m" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g v-for="(conn, i) in connections" :key="`m-line-${i}`">
        <line
          :x1="getNodePos(conn.from, true).x"
          :y1="getNodePos(conn.from, true).y"
          :x2="conn.to === 'center' ? getNodePos(-1, true).x : getNodePos(conn.to as number, true).x"
          :y2="conn.to === 'center' ? getNodePos(-1, true).y : getNodePos(conn.to as number, true).y"
          :stroke="conn.chain ? '#CBD5E0' : '#E2E8F0'"
          :stroke-width="conn.chain ? 3 : 2"
          :stroke-dasharray="conn.chain ? '8 6' : '300'"
          :class="['mm-line-m', conn.chain ? 'mm-chain' : '']"
          stroke-linecap="round"
          opacity="0.6"
        />
      </g>

      <circle
        :cx="getNodePos(-1, true).x"
        :cy="getNodePos(-1, true).y"
        r="50"
        :fill="centerNode.color"
        class="mm-center-circle-m"
        filter="url(#glow-m)"
      />
      <text
        :x="getNodePos(-1, true).x"
        :y="getNodePos(-1, true).y - 6"
        text-anchor="middle"
        fill="white"
        font-size="11"
        font-weight="700"
        class="mm-center-text-m"
      >
        <tspan>Habilidades</tspan>
        <tspan :x="getNodePos(-1, true).x" dy="16">Socioemocionales</tspan>
      </text>

      <g v-for="(node, i) in nodes" :key="`m-node-${node.id}`">
        <circle
          :cx="getNodePos(i, true).x"
          :cy="getNodePos(i, true).y"
          r="36"
          :fill="node.color"
          class="mm-node-circle-m"
          filter="url(#glow-m)"
        />
        <text
          :x="getNodePos(i, true).x"
          :y="getNodePos(i, true).y + 4"
          text-anchor="middle"
          fill="white"
          font-size="10"
          font-weight="700"
          class="mm-node-text-m"
        >
          <tspan v-for="(line, li) in node.label.split(' ')" :key="li" :x="getNodePos(i, true).x" :dy="li === 0 ? 0 : 14">
            {{ line }}
          </tspan>
        </text>
      </g>
    </svg>

    <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
      <div class="flex items-center gap-2 text-xs text-[#718096]">
        <span class="w-6 h-0.5 bg-[#E2E8F0] rounded-full"></span>
        <span>Conexión con el centro</span>
      </div>
      <div class="flex items-center gap-2 text-xs text-[#718096]">
        <span class="w-6 h-0.5 border-t-2 border-dashed border-[#CBD5E0] rounded-full"></span>
        <span>Cadena: una habilidad lleva a la siguiente</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mm-line-d,
.mm-line-m {
  stroke-dasharray: 300;
  stroke-dashoffset: 300;
}
.mm-chain {
  stroke-dasharray: 8 6 !important;
  stroke-dashoffset: 0 !important;
}
</style>
