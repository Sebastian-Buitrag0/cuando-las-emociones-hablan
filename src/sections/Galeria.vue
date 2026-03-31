<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import img1 from "@/img/actividades_patio.jpeg";
import img2 from "@/img/charla_ruta_convivencia.jpeg";
import img3 from "@/img/estudiantes_video_educativo.jpeg";
import img4 from "@/img/trabajo_equipo_piso.jpeg";
import img5 from "@/img/votacion_personero.jpeg";
import { ChevronLeft, ChevronRight } from "lucide-vue-next";

const images = [
  { src: img1, alt: "Actividades en el patio" },
  { src: img2, alt: "Charla ruta de convivencia" },
  { src: img3, alt: "Estudiantes viendo video educativo" },
  { src: img4, alt: "Trabajo en equipo en el piso" },
  { src: img5, alt: "Votación personero" },
];

const currentIndex = ref(0);
let autoPlayInterval: number | null = null;

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

onMounted(() => {
  startAutoPlay();
});

onUnmounted(() => {
  pauseAutoPlay();
});
</script>

<template>
  <section class="py-16 bg-[#FEFBF7] relative overflow-hidden" id="galeria">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="text-center mb-10">
        <h2
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }"
          class="text-3xl md:text-4xl font-bold text-[#2D3748] mb-4"
        >
          Nuestras <span class="text-[#5B8DEE]">Vivencias</span>
        </h2>
        <p
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 200 } }"
          class="text-lg text-[#718096] max-w-2xl mx-auto"
        >
          Un vistazo a las actividades que fortalecen nuestra convivencia y
          crecimiento.
        </p>
      </div>

      <div
        v-motion
        :initial="{ opacity: 0, scale: 0.95 }"
        :enter="{ opacity: 1, scale: 1, transition: { duration: 800, delay: 300 } }"
        class="max-w-5xl mx-auto relative rounded-3xl overflow-hidden shadow-2xl group"
        @mouseenter="pauseAutoPlay"
        @mouseleave="startAutoPlay"
      >
        <!-- Carousel Track -->
        <div
          class="flex transition-transform duration-700 ease-in-out"
          :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
        >
          <div
            v-for="(img, index) in images"
            :key="index"
            class="w-full flex-shrink-0 relative aspect-[16/9] md:aspect-[21/9] bg-[#E2E8F0]"
          >
            <img
              :src="img.src"
              :alt="img.alt"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
              <p class="text-white p-6 md:p-8 text-lg font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {{ img.alt }}
              </p>
            </div>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <button
          @click="prev"
          class="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/30 hover:bg-white/80 backdrop-blur-sm text-[#2D3748] rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 hover:scale-110"
          aria-label="Anterior"
        >
          <ChevronLeft class="w-6 h-6" />
        </button>
        <button
          @click="next"
          class="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/30 hover:bg-white/80 backdrop-blur-sm text-[#2D3748] rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 hover:scale-110"
          aria-label="Siguiente"
        >
          <ChevronRight class="w-6 h-6" />
        </button>

        <!-- Indicators -->
        <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
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
    </div>
  </section>
</template>