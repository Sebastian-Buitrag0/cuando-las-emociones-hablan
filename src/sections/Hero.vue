<script setup lang="ts">
import { Brain, ArrowDown, ChevronLeft, ChevronRight, Eye } from "lucide-vue-next";
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

const extendedImages = [images[images.length - 1], ...images, images[0]];
const visualIndex = ref(1);
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

const TRANSITION_MS = 500;
const NAV_THROTTLE_MS = TRANSITION_MS + 50;
let lastNavAt = 0;
function canNavigate() {
  const now = Date.now();
  if (now - lastNavAt < NAV_THROTTLE_MS) return false;
  lastNavAt = now;
  return true;
}

const next = () => { if (canNavigate()) visualIndex.value++; };
const prev = () => { if (canNavigate()) visualIndex.value--; };
const setSlide = (index: number) => {
  if (canNavigate()) visualIndex.value = index + 1;
};

function userNext() { next(); hideText(); }
function userPrev() { prev(); hideText(); }
function userSetSlide(index: number) { setSlide(index); hideText(); }

function onTransitionEnd(e: TransitionEvent) {
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
  pauseAutoPlay();
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
  }, 5000);
}

function showText() {
  isInteracting.value = false;
  startAutoPlay();
  if (resetTimeout) {
    clearTimeout(resetTimeout);
    resetTimeout = null;
  }
}

const touchStartX = ref(0);
const touchEndX = ref(0);

function handleTouchStart(e: TouchEvent) {
  touchStartX.value = e.changedTouches[0].screenX;
}

function handleTouchEnd(e: TouchEvent) {
  touchEndX.value = e.changedTouches[0].screenX;
  handleSwipe();
}

function handleSwipe() {
  const swipeDistance = touchEndX.value - touchStartX.value;
  const minSwipeDistance = 50;

  if (Math.abs(swipeDistance) > minSwipeDistance) {
    if (swipeDistance > 0) userPrev();
    else userNext();
  }
}

onMounted(() => {
  startAutoPlay();

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!prefersReduced) {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(".hero-logo", { scale: 0.6, opacity: 0, duration: 0.9 })
      .from(".hero-eyebrow", { y: 14, opacity: 0, duration: 0.5 }, "-=0.4")
      .from(".hero-title-word", { y: 40, opacity: 0, duration: 0.7, stagger: 0.08 }, "-=0.3")
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
    class="relative min-h-screen flex items-center justify-center overflow-hidden bg-foreground"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
  >
    <!-- Background carousel -->
    <div class="absolute inset-0 z-0">
      <div
        class="absolute inset-0 flex"
        :style="{
          transform: `translateX(-${visualIndex * 100}%)`,
          transition: isAnimating ? `transform ${TRANSITION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)` : 'none',
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
            :loading="index <= 1 ? 'eager' : 'lazy'"
            :fetchpriority="index === 1 ? 'high' : 'auto'"
          />
        </div>
      </div>
    </div>

    <!-- Cream-tinted overlay (dims when interacting or scrolling) -->
    <div
      class="absolute inset-0 transition-all duration-150 pointer-events-none z-0"
      :class="isInteracting ? '' : 'backdrop-blur-[2px]'"
      :style="{
        backgroundColor: isInteracting
          ? 'hsla(0,0%,0%,0)'
          : isMobile
            ? `hsla(36,40%,97%,${Math.max(0.78 - scrollProgress * 0.78, 0)})`
            : `hsla(36,40%,97%,${0.78 - scrollProgress * 0.73})`,
      }"
    ></div>

    <!-- Desktop navigation arrows -->
    <div
      class="hidden md:flex absolute left-0 top-0 bottom-0 w-24 md:w-32 z-20 cursor-pointer items-center justify-start pl-4"
      @click="userPrev"
    >
      <button
        class="w-12 h-12 flex items-center justify-center bg-background/70 hover:bg-background/95 backdrop-blur-sm text-foreground rounded-full shadow-soft transition-all motion-safe:hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
        class="w-12 h-12 flex items-center justify-center bg-background/70 hover:bg-background/95 backdrop-blur-sm text-foreground rounded-full shadow-soft transition-all motion-safe:hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        aria-label="Siguiente"
      >
        <ChevronRight class="w-6 h-6" />
      </button>
    </div>

    <!-- Indicators + mobile hint -->
    <div
      class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-30 w-full px-4"
    >
      <div
        class="md:hidden flex items-center gap-2 bg-foreground/60 text-background px-5 py-2.5 rounded-full text-sm backdrop-blur-md transition-opacity duration-500 shadow-soft mx-auto pointer-events-none"
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
          class="h-2.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2"
          :class="[
            currentIndex === index
              ? 'bg-background w-8'
              : 'bg-background/55 hover:bg-background/85 w-2.5'
          ]"
          :aria-label="`Ir a la imagen ${index + 1}`"
          :aria-current="currentIndex === index ? 'true' : undefined"
        />
      </div>
    </div>

    <!-- Floating decorative orbs (reduced-motion-aware via scoped style) -->
    <div
      class="absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-700"
      :class="isInteracting ? 'opacity-20' : 'opacity-100'"
      aria-hidden="true"
    >
      <div class="float-1 absolute top-20 left-10 w-20 h-20 rounded-full bg-primary/10" />
      <div class="float-2 absolute top-40 right-20 w-16 h-16 rounded-full bg-accent/10" />
      <div class="float-3 absolute bottom-40 left-1/4 w-24 h-24 rounded-full bg-secondary/10" />
      <div class="float-4 absolute bottom-20 right-1/3 w-12 h-12 rounded-full bg-calm/20" />
    </div>

    <!-- Main content -->
    <div
      class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-300"
      :style="{
        opacity: isInteracting ? 0 : 1 - scrollProgress * (isMobile ? 1 : 0.95),
        transform: isInteracting ? 'translateY(16px) scale(0.98)' : `translateY(${scrollProgress * -20}px) scale(${1 - scrollProgress * 0.02})`,
        pointerEvents: isInteracting ? 'none' : 'auto',
      }"
    >
      <div class="max-w-3xl mx-auto text-center pt-20 sm:pt-0">
        <!-- Logo -->
        <div class="mb-6 flex justify-center hero-logo">
          <div class="relative">
            <div class="hero-logo-ring absolute inset-0 bg-primary/15 rounded-full blur-2xl" />
            <div
              class="relative w-24 h-24 bg-background rounded-full flex items-center justify-center shadow-soft overflow-hidden ring-1 ring-foreground/5"
            >
              <img
                :src="logoPagina"
                alt="Logo Gimnasio Pedagógico Thomas Paine"
                class="w-[82%] h-[82%] object-contain"
                width="120"
                height="120"
              />
            </div>
          </div>
        </div>

        <!-- Eyebrow -->
        <p class="hero-eyebrow text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-5">
          Gimnasio Pedagógico Thomas Paine
        </p>

        <!-- Title -->
        <h1
          class="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-7 leading-[1.05] flex flex-wrap justify-center gap-x-3 gap-y-1"
          style="text-wrap: balance"
        >
          <span class="hero-title-word">Cuando</span>
          <span class="hero-title-word">las</span>
          <span class="hero-title-word text-accent">emociones</span>
          <span class="hero-title-word text-accent">hablan.</span>
        </h1>

        <!-- Description -->
        <p
          class="hero-desc text-lg sm:text-xl text-foreground/80 mb-10 max-w-xl mx-auto leading-relaxed hidden sm:block"
        >
          Reconoce lo que sientes. Aprende a regularlo.
          <span class="block text-foreground">Sabe a quién acudir cuando lo necesites.</span>
        </p>

        <!-- CTAs -->
        <div class="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <AppButton
            size="lg"
            class="hero-cta rounded-full px-8 py-6 text-base font-semibold shadow-soft motion-safe:hover:scale-[1.02] transition-transform"
            @click="scrollToSection('emociones')"
          >
            <Brain class="w-5 h-5 mr-1" />
            Empezar por lo que siento
          </AppButton>
          <AppButton
            size="lg"
            variant="ghost"
            class="hero-cta rounded-full px-8 py-6 text-base font-semibold text-foreground hover:bg-foreground/5"
            @click="scrollToSection('habilidades')"
          >
            ¿Qué son las habilidades socioemocionales?
          </AppButton>
        </div>

        <!-- Scroll cue -->
        <div class="mt-10 mb-4 hero-scroll">
          <button
            class="text-muted-foreground hover:text-primary transition-colors motion-safe:bounce-arrow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:rounded-full"
            @click="scrollToSection('habilidades')"
            aria-label="Bajar a la siguiente sección"
          >
            <ArrowDown class="w-7 h-7 mx-auto" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@media (prefers-reduced-motion: no-preference) {
  .float-1 { animation: float1 5s ease-in-out infinite; }
  .float-2 { animation: float2 4s ease-in-out infinite 1s; }
  .float-3 { animation: float3 6s ease-in-out infinite 0.5s; }
  .float-4 { animation: float4 3.5s ease-in-out infinite 2s; }
  .bounce-arrow { animation: bounce 1.8s ease-in-out infinite; }

  @keyframes float1 {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-30px) scale(1.1); }
  }
  @keyframes float2 {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(20px) scale(1.2); }
  }
  @keyframes float3 {
    0%, 100% { transform: translateY(0) translateX(0); }
    50% { transform: translateY(-20px) translateX(10px); }
  }
  @keyframes float4 {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(15px); }
  }
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(8px); }
  }
}
</style>
