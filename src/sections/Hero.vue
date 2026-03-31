<script setup lang="ts">
import { Heart, Brain, Sparkles, ArrowDown, ChevronLeft, ChevronRight, Eye } from "lucide-vue-next";
import AppButton from "@/components/ui/button.vue";
import { ref, onMounted, onUnmounted } from "vue";

import img1 from "@/img/actividades_patio.jpeg";
import img2 from "@/img/charla_ruta_convivencia.jpeg";
import img3 from "@/img/estudiantes_video_educativo.jpeg";
import img4 from "@/img/trabajo_equipo_piso.jpeg";
import img5 from "@/img/votacion_personero.jpeg";

const images = [
  { src: img1, alt: "Actividades en el patio" },
  { src: img2, alt: "Charla ruta de convivencia" },
  { src: img3, alt: "Estudiantes viendo video educativo" },
  { src: img4, alt: "Trabajo en equipo en el piso" },
  { src: img5, alt: "Votación personero" },
];

const currentIndex = ref(0);
let autoPlayInterval: number | null = null;
const isInteracting = ref(false);

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % images.length;
};

const prev = () => {
  currentIndex.value =
    (currentIndex.value - 1 + images.length) % images.length;
};

const setSlide = (index: number) => {
  currentIndex.value = index;
};

const startAutoPlay = () => {
  autoPlayInterval = window.setInterval(next, 4000);
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
  }, 2500); // Vuelve al estado normal después de 2.5s
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
    hideText();
    if (swipeDistance > 0) {
      prev();
    } else {
      next();
    }
  }
}

onMounted(() => {
  startAutoPlay();
});

onUnmounted(() => {
  pauseAutoPlay();
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
        class="absolute inset-0 flex transition-transform duration-1000 ease-in-out"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <div
          v-for="(img, index) in images"
          :key="index"
          class="w-full h-full flex-shrink-0 relative"
        >
          <img
            :src="img.src"
            :alt="img.alt"
            class="w-full h-full object-cover opacity-90"
            style="object-position: center;"
          />
        </div>
      </div>
    </div>

    <!-- Overlay Layer (Fades out when interacting) -->
    <div 
      class="absolute inset-0 bg-white/75 backdrop-blur-[2px] transition-all duration-700 pointer-events-none z-0"
      :class="isInteracting ? 'opacity-0' : 'opacity-100'"
    ></div>

    <!-- Desktop Hover triggers on the sides -->
    <div 
      class="hidden md:flex absolute left-0 top-0 bottom-0 w-24 md:w-32 z-20 group cursor-pointer items-center justify-start pl-4"
      @mouseenter="hideText"
      @mouseleave="showText"
      @click="prev"
    >
      <button
        class="w-12 h-12 flex items-center justify-center bg-white/30 hover:bg-white/80 backdrop-blur-sm text-[#2D3748] rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
        aria-label="Anterior"
      >
        <ChevronLeft class="w-6 h-6" />
      </button>
    </div>

    <div 
      class="hidden md:flex absolute right-0 top-0 bottom-0 w-24 md:w-32 z-20 group cursor-pointer items-center justify-end pr-4"
      @mouseenter="hideText"
      @mouseleave="showText"
      @click="next"
    >
      <button
        class="w-12 h-12 flex items-center justify-center bg-white/30 hover:bg-white/80 backdrop-blur-sm text-[#2D3748] rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
        aria-label="Siguiente"
      >
        <ChevronRight class="w-6 h-6" />
      </button>
    </div>

    <!-- Indicators & manual hide button -->
    <div 
      class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-30 w-full px-4"
    >
      <!-- "View Gallery" mobile helper icon -->
      <div 
        class="md:hidden flex items-center gap-2 bg-black/60 text-white px-5 py-2.5 rounded-full text-sm backdrop-blur-md transition-all shadow-lg mx-auto pointer-events-none"
        :class="isInteracting ? 'opacity-0' : 'opacity-100'"
      >
        <Eye class="w-4 h-4" />
        <span class="font-medium">Desliza para ver fotos</span>
      </div>

      <div 
        class="flex space-x-3 mt-2 md:mt-0"
        @mouseenter="hideText"
        @mouseleave="showText"
      >
        <button
          v-for="(_, index) in images"
          :key="index"
          @click="setSlide(index)"
          class="w-3 h-3 rounded-full transition-all duration-300 shadow-sm"
          :class="[
            currentIndex === index
              ? 'bg-white scale-125'
              : 'bg-white/50 hover:bg-white/80'
          ]"
          :aria-label="`Ir a la imagen ${index + 1}`"
        />
      </div>
    </div>

    <!-- Floating decorative elements (fade out when interacting) -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-700" :class="isInteracting ? 'opacity-0' : 'opacity-100'">
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

    <!-- Main Content Container (Fades out and moves down when interacting) -->
    <div 
      class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-700 pointer-events-none"
      :class="isInteracting ? 'opacity-0 translate-y-12 scale-95' : 'opacity-100 translate-y-0 scale-100'"
    >
      <div class="max-w-4xl mx-auto text-center pt-20 sm:pt-0 pointer-events-auto">
          <!-- Animated icon -->
          <div
            v-motion
            :initial="{ opacity: 0, scale: 0.5 }"
            :enter="{ opacity: 1, scale: 1, transition: { duration: 800 } }"
            class="mb-8 flex justify-center"
          >
          <div class="relative">
            <div
              class="pulse-ring absolute inset-0 bg-[#5B8DEE]/20 rounded-full blur-xl"
            />
            <div
              class="relative w-24 h-24 bg-gradient-to-br from-[#5B8DEE] to-[#BC6C8A] rounded-full flex items-center justify-center shadow-lg"
            >
              <Heart class="w-12 h-12 text-white" />
            </div>
            <div class="absolute -top-2 -right-2 sparkle-rotate">
              <Sparkles class="w-8 h-8 text-[#F4A259]" />
            </div>
          </div>
        </div>

        <!-- Title -->
        <h1
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :enter="{
            opacity: 1,
            y: 0,
            transition: { duration: 800, delay: 200 },
          }"
          class="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2D3748] mb-6 leading-tight"
        >
          Cuando las&nbsp;
          <span
            class="bg-gradient-to-r from-[#BC6C8A] to-[#F4A259] bg-clip-text text-transparent"
          >
            emociones hablan
          </span>
        </h1>

        <!-- Subtitle -->
        <p
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{
            opacity: 1,
            y: 0,
            transition: { duration: 800, delay: 400 },
          }"
          class="text-xl sm:text-2xl text-[#718096] mb-4"
        >
          Gimnasio Pedagógico Thomas Paine
        </p>

        <p
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{
            opacity: 1,
            y: 0,
            transition: { duration: 800, delay: 500 },
          }"
          class="text-lg text-[#718096]/80 mb-10 max-w-2xl mx-auto hidden sm:block"
        >
          Un espacio digital para escuchar, comprender y transformar las
          emociones en herramientas de crecimiento personal y convivencia
          escolar
        </p>

        <!-- CTA Buttons -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{
            opacity: 1,
            y: 0,
            transition: { duration: 800, delay: 600 },
          }"
          class="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <AppButton
            size="lg"
            class="bg-[#5B8DEE] hover:bg-[#4a7bd9] text-white rounded-full px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            @click="scrollToSection('emociones')"
          >
            <Brain class="w-5 h-5 mr-2" />
            Comenzar
          </AppButton>
          <AppButton
            size="lg"
            variant="outline"
            class="border-2 border-[#BC6C8A] text-[#BC6C8A] hover:bg-[#BC6C8A] hover:text-white rounded-full px-8 py-6 text-lg font-semibold transition-all duration-300 hover:scale-105 bg-white/50 sm:bg-transparent"
            @click="scrollToSection('habilidades')"
          >
            Saber más
          </AppButton>
        </div>

        <!-- Scroll indicator -->
        <div
          v-motion
          :initial="{ opacity: 0 }"
          :enter="{ opacity: 1, transition: { duration: 800, delay: 1000 } }"
          class="mt-10 mb-4"
        >
          <button
            class="text-[#718096] hover:text-[#5B8DEE] transition-colors bounce-arrow"
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
</style>
