<script setup lang="ts">
import { Brain, Sparkles, ArrowDown, ChevronLeft, ChevronRight, Eye } from "lucide-vue-next";
import AppButton from "@/components/ui/button.vue";
import { ref, onMounted, onUnmounted, computed, nextTick } from "vue";
import { useWindowScroll } from "@vueuse/core";
import gsap from "gsap";

import img1 from "@/img/actividades_patio.jpeg";
import img2 from "@/img/charla_ruta_convivencia.jpeg";
import img3 from "@/img/estudiantes_video_educativo.jpeg";
import img4 from "@/img/trabajo_equipo_piso.jpeg";
import img5 from "@/img/votacion_personero.jpeg";
import logoPagina from "@/img/logo-pagina.png";

const images = [
  { src: img1, alt: "Actividades en el patio", width: 1200, height: 800 },
  { src: img2, alt: "Charla ruta de convivencia", width: 1200, height: 800 },
  { src: img3, alt: "Estudiantes viendo video educativo", width: 1200, height: 800 },
  { src: img4, alt: "Trabajo en equipo en el piso", width: 1200, height: 800 },
  { src: img5, alt: "Votación personero", width: 1200, height: 800 },
];

// Infinite carousel: clone last image at start, first image at end
const extendedImages = [images[images.length - 1], ...images, images[0]];
const visualIndex = ref(1); // 0 = clone of last, 1..n = real, n+1 = clone of first
const isAnimating = ref(true);
const currentIndex = computed(() => (visualIndex.value - 1 + images.length) % images.length);

let autoPlayInterval: number | null = null;
const isInteracting = ref(false);

const { y: scrollY } = useWindowScroll();
const isMobile = computed(() => window.innerWidth < 768);
const scrollProgress = computed(() => {
  const heroHeight = window.innerHeight;
  const threshold = isMobile.value ? heroHeight * 0.2 : heroHeight * 0.5;
  return Math.min(scrollY.value / threshold, 1);
});

// Throttle navigation to prevent autoplay+click race conditions
const TRANSITION_MS = 500;
const NAV_THROTTLE_MS = TRANSITION_MS + 50;
let lastNavAt = 0;
function canNavigate() {
  const now = Date.now();
  if (now - lastNavAt < NAV_THROTTLE_MS) return false;
  lastNavAt = now;
  return true;
}

// Pure navigation — used by autoplay
const next = () => { if (canNavigate()) visualIndex.value++; };
const prev = () => { if (canNavigate()) visualIndex.value--; };
const setSlide = (index: number) => {
  if (canNavigate()) visualIndex.value = index + 1;
};

// User-initiated navigation — also triggers the transparent overlay
function userNext() { next(); hideText(); }
function userPrev() { prev(); hideText(); }
function userSetSlide(index: number) { setSlide(index); hideText(); }

function onTransitionEnd(e: TransitionEvent) {
  // ignore events from child elements or non-transform properties
  if (e.target !== e.currentTarget || e.propertyName !== 'transform') return;

  let target: number | null = null;
  if (visualIndex.value >= images.length + 1) target = 1;
  else if (visualIndex.value <= 0) target = images.length;

  if (target !== null) {
    isAnimating.value = false;
    visualIndex.value = target;
    nextTick(() => requestAnimationFrame(() => { isAnimating.value = true; }));
  }
}

const startAutoPlay = () => {
  pauseAutoPlay(); // prevent duplicate intervals
  autoPlayInterval = window.setInterval(next, 5000);
};

const pauseAutoPlay = () => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
    autoPlayInterval = null;
  }
};

let resetTimeout: number | null = null;

function hideText() {
  isInteracting.value = true;
  pauseAutoPlay();

  if (resetTimeout) clearTimeout(resetTimeout);
  resetTimeout = window.setTimeout(() => {
    showText();
  }, 5000); // Vuelve al estado normal después de 5s sin interacción
}

function showText() {
  isInteracting.value = false;
  startAutoPlay();
  if (resetTimeout) {
    clearTimeout(resetTimeout);
    resetTimeout = null;
  }
}

// Touch sliding logic
const touchStartX = ref(0);
const touchEndX = ref(0);

function handleTouchStart(e: TouchEvent) {
  touchStartX.value = e.changedTouches[0].screenX;
  // Almacenar el Y para chequear que no sea scroll
}

function handleTouchEnd(e: TouchEvent) {
  touchEndX.value = e.changedTouches[0].screenX;
  handleSwipe();
}

function handleSwipe() {
  const swipeDistance = touchEndX.value - touchStartX.value;
  const minSwipeDistance = 50;

  if (Math.abs(swipeDistance) > minSwipeDistance) {
    if (swipeDistance > 0) {
      userPrev();
    } else {
      userNext();
    }
  }
}

onMounted(() => {
  startAutoPlay();

  // GSAP entrance timeline
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!prefersReduced) {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(".hero-logo", { scale: 0.6, opacity: 0, duration: 0.9 })
      .from(".hero-logo-ring", { scale: 0, opacity: 0, duration: 0.6 }, "<0.2")
      .from(".hero-title-word", { y: 40, opacity: 0, duration: 0.7, stagger: 0.08 }, "-=0.4")
      .from(".hero-subtitle", { y: 20, opacity: 0, duration: 0.6 }, "-=0.3")
      .from(".hero-desc", { y: 20, opacity: 0, duration: 0.6 }, "-=0.35")
      .from(".hero-cta", { y: 20, opacity: 0, duration: 0.5, stagger: 0.1 }, "-=0.3")
      .from(".hero-scroll", { y: -10, opacity: 0, duration: 0.5 }, "-=0.2");
  }
});

onUnmounted(() => {
  pauseAutoPlay();
  if (resetTimeout) clearTimeout(resetTimeout);
});

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior: "smooth" });
}
</script>

<template>
  <section
    class="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
  >
    <!-- Background Carousel -->
    <div class="absolute inset-0 z-0">
      <div
        class="absolute inset-0 flex"
        :style="{
          transform: `translateX(-${visualIndex * 100}%)`,
          transition: isAnimating ? `transform ${TRANSITION_MS}ms ease-out` : 'none',
        }"
        @transitionend="onTransitionEnd"
      >
        <div
          v-for="(img, index) in extendedImages"
          :key="index"
          class="w-full h-full flex-shrink-0 relative"
        >
          <img
            :src="img.src"
            :alt="img.alt"
            :width="img.width"
            :height="img.height"
            class="w-full h-full object-cover opacity-90"
            style="object-position: center;"
            loading="eager"
          />
        </div>
      </div>
    </div>

    <!-- Overlay Layer (Dims when interacting or scrolling) -->
    <div
      class="absolute inset-0 transition-all duration-150 pointer-events-none z-0"
      :class="isInteracting ? '' : 'backdrop-blur-[2px]'"
      :style="{
        backgroundColor: isInteracting
          ? 'rgba(0,0,0,0)'
          : isMobile
            ? `rgba(255,255,255,${Math.max(0.75 - scrollProgress * 0.75, 0)})`
            : `rgba(255,255,255,${0.75 - scrollProgress * 0.7})`,
      }"
    ></div>

    <!-- Desktop navigation arrows (always visible) -->
    <div
      class="hidden md:flex absolute left-0 top-0 bottom-0 w-24 md:w-32 z-20 cursor-pointer items-center justify-start pl-4"
      @click="userPrev"
    >
      <button
        class="w-12 h-12 flex items-center justify-center bg-white/60 hover:bg-white/90 backdrop-blur-sm text-[#2D3748] rounded-full shadow-lg transition-all hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B8DEE] focus-visible:ring-offset-2"
        aria-label="Anterior"
      >
        <ChevronLeft class="w-6 h-6" />
      </button>
    </div>

    <div
      class="hidden md:flex absolute right-0 top-0 bottom-0 w-24 md:w-32 z-20 cursor-pointer items-center justify-end pr-4"
      @click="userNext"
    >
      <button
        class="w-12 h-12 flex items-center justify-center bg-white/60 hover:bg-white/90 backdrop-blur-sm text-[#2D3748] rounded-full shadow-lg transition-all hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B8DEE] focus-visible:ring-offset-2"
        aria-label="Siguiente"
      >
        <ChevronRight class="w-6 h-6" />
      </button>
    </div>

    <!-- Indicators & mobile hint -->
    <div
      class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-30 w-full px-4"
    >
      <!-- Mobile swipe hint -->
      <div
        class="md:hidden flex items-center gap-2 bg-black/60 text-white px-5 py-2.5 rounded-full text-sm backdrop-blur-md transition-opacity duration-500 shadow-lg mx-auto pointer-events-none"
        :class="isInteracting ? 'opacity-0' : 'opacity-100'"
      >
        <Eye class="w-4 h-4" />
        <span class="font-medium">Desliza para ver fotos</span>
      </div>

      <div class="flex space-x-3 mt-2 md:mt-0">
        <button
          v-for="(_, index) in images"
          :key="index"
          @click="userSetSlide(index)"
          class="w-3 h-3 rounded-full transition-all duration-300 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
          :class="[
            currentIndex === index
              ? 'bg-white scale-125'
              : 'bg-white/50 hover:bg-white/80'
          ]"
          :aria-label="`Ir a la imagen ${index + 1}`"
          :aria-current="currentIndex === index ? 'true' : undefined"
        />
      </div>
    </div>

    <!-- Floating decorative elements (dim when interacting) -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-700" :class="isInteracting ? 'opacity-20' : 'opacity-100'">
      <div
        class="float-1 absolute top-20 left-10 w-20 h-20 rounded-full bg-[#5B8DEE]/10"
      />
      <div
        class="float-2 absolute top-40 right-20 w-16 h-16 rounded-full bg-[#BC6C8A]/10"
      />
      <div
        class="float-3 absolute bottom-40 left-1/4 w-24 h-24 rounded-full bg-[#F4A259]/10"
      />
      <div
        class="float-4 absolute bottom-20 right-1/3 w-12 h-12 rounded-full bg-[#81E6D9]/20"
      />
    </div>

    <!-- Main Content Container (dims when interacting or scrolling) -->
    <div
      class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-300"
      :style="{
        opacity: isInteracting ? 0 : 1 - scrollProgress * (isMobile ? 1 : 0.95),
        transform: isInteracting ? 'translateY(16px) scale(0.98)' : `translateY(${scrollProgress * -20}px) scale(${1 - scrollProgress * 0.02})`,
        pointerEvents: isInteracting ? 'none' : 'auto',
      }"
    >
      <div class="max-w-4xl mx-auto text-center pt-20 sm:pt-0">
          <!-- Animated icon -->
          <div class="mb-8 flex justify-center hero-logo">
          <div class="relative">
            <div
              class="hero-logo-ring absolute inset-0 bg-[#5B8DEE]/20 rounded-full blur-xl"
            />
            <div
              class="relative w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-lg overflow-hidden border-4 border-white"
            >
              <img
                :src="logoPagina"
                alt="Logo Gimnasio Pedagógico Thomas Paine"
                class="w-[88%] h-[88%] object-contain"
                width="120"
                height="120"
              />
            </div>
            <div class="absolute -top-2 -right-2 sparkle-rotate">
              <Sparkles class="w-8 h-8 text-[#F4A259]" />
            </div>
          </div>
        </div>

        <!-- Title -->
        <h1
          class="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2D3748] mb-8 leading-tight flex flex-wrap justify-center gap-x-4 gap-y-1"
        >
          <span class="hero-title-word">Cuando</span>
          <span class="hero-title-word">las</span>
          <span
            class="hero-title-word bg-gradient-to-r from-[#BC6C8A] to-[#F4A259] bg-clip-text text-transparent"
          >emociones</span>
          <span class="hero-title-word bg-gradient-to-r from-[#BC6C8A] to-[#F4A259] bg-clip-text text-transparent">hablan</span>
        </h1>

        <!-- Subtitle -->
        <p
          class="hero-subtitle text-xl sm:text-2xl font-semibold text-[#2D3748] mb-6"
        >
          Gimnasio Pedagógico Thomas Paine
        </p>

        <p
          class="hero-desc text-lg text-[#4A5568] mb-12 max-w-2xl mx-auto hidden sm:block leading-relaxed"
        >
          Un espacio digital para escuchar, comprender y transformar las
          emociones en herramientas de crecimiento personal y convivencia
          escolar
        </p>

        <!-- CTA Buttons -->
        <div
          class="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <AppButton
            size="lg"
            class="hero-cta bg-[#5B8DEE] hover:bg-[#4a7bd9] text-white rounded-full px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B8DEE] focus-visible:ring-offset-2"
            @click="scrollToSection('emociones')"
          >
            <Brain class="w-5 h-5 mr-2" />
            Comenzar
          </AppButton>
          <AppButton
            size="lg"
            variant="outline"
            class="hero-cta border-2 border-[#BC6C8A] text-[#BC6C8A] hover:bg-[#BC6C8A] hover:text-white rounded-full px-8 py-6 text-lg font-semibold transition-all duration-300 hover:scale-105 bg-white/50 sm:bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BC6C8A] focus-visible:ring-offset-2"
            @click="scrollToSection('habilidades')"
          >
            Saber más
          </AppButton>
        </div>

        <!-- Scroll indicator -->
        <div class="mt-10 mb-4 hero-scroll">
          <button
            class="text-[#718096] hover:text-[#5B8DEE] transition-colors bounce-arrow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B8DEE] focus-visible:rounded-full"
            @click="scrollToSection('habilidades')"
          >
            <ArrowDown class="w-8 h-8 mx-auto" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.float-1 {
  animation: float1 5s ease-in-out infinite;
}
.float-2 {
  animation: float2 4s ease-in-out infinite 1s;
}
.float-3 {
  animation: float3 6s ease-in-out infinite 0.5s;
}
.float-4 {
  animation: float4 3.5s ease-in-out infinite 2s;
}
.pulse-ring {
  animation: pulse-ring 3s ease-in-out infinite;
}
.sparkle-rotate {
  animation: sparkle 2s ease-in-out infinite;
}
.bounce-arrow {
  animation: bounce 1.5s ease-in-out infinite;
}

@keyframes float1 {
  0%,
  100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-30px) scale(1.1);
  }
}
@keyframes float2 {
  0%,
  100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(20px) scale(1.2);
  }
}
@keyframes float3 {
  0%,
  100% {
    transform: translateY(0) translateX(0);
  }
  50% {
    transform: translateY(-20px) translateX(10px);
  }
}
@keyframes float4 {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(15px);
  }
}
@keyframes pulse-ring {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
}
@keyframes sparkle {
  0%,
  100% {
    transform: rotate(0deg);
  }
  33% {
    transform: rotate(15deg);
  }
  66% {
    transform: rotate(-15deg);
  }
}
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .float-1,
  .float-2,
  .float-3,
  .float-4,
  .pulse-ring,
  .sparkle-rotate,
  .bounce-arrow {
    animation: none;
  }
}
</style>
