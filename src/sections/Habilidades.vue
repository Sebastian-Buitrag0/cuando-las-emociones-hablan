<script setup lang="ts">
import { ChevronDown } from "lucide-vue-next";
import { ref, onMounted } from "vue";
import gsap from "gsap";
import bgHabilidades from "@/img/trabajo_equipo_piso.jpeg";
import HabilidadesSociales from "./habilidades/HabilidadesSociales.vue";
import SimuladorConversacion from "./habilidades/SimuladorConversacion.vue";

const EMOJI_BASE =
  "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@latest/assets";

const habilidades = [
  {
    title: "Autoconciencia",
    description:
      "Reconocer y comprender nuestras propias emociones, fortalezas, limitaciones y cómo afectan nuestro comportamiento.",
    color: "#5B8DEE",
    bgColor: "bg-[#5B8DEE]/10",
    emojiImg: `${EMOJI_BASE}/Face%20in%20clouds/3D/face_in_clouds_3d.png`,
    tips: [
      "Pregúntate: ¿Qué estoy sintiendo en este momento?",
      "Identifica en qué parte del cuerpo sientes esa emoción.",
      "Escribe 3 pensamientos que acompañan esa emoción.",
    ],
    hasSubSkills: false,
  },
  {
    title: "Autorregulación",
    description:
      "Gestionar las emociones de manera saludable, controlar impulsos y adaptarse a los cambios con flexibilidad.",
    color: "#81E6D9",
    bgColor: "bg-[#81E6D9]/20",
    emojiImg: `${EMOJI_BASE}/Shield/3D/shield_3d.png`,
    tips: [
      "Respira profundo durante 4 segundos antes de reaccionar.",
      "Cuenta hasta 10 cuando sientas que pierdes el control.",
      "Cambia el pensamiento negativo por uno más realista.",
    ],
    hasSubSkills: false,
  },
  {
    title: "Empatía",
    description:
      "Comprender los sentimientos de los demás, ponerse en su lugar y responder con compasión.",
    color: "#BC6C8A",
    bgColor: "bg-[#BC6C8A]/10",
    emojiImg: `${EMOJI_BASE}/Smiling%20face%20with%20hearts/3D/smiling_face_with_hearts_3d.png`,
    tips: [
      "Ponte en el lugar del otro antes de juzgar.",
      "Pregunta: ¿Cómo te sientes? y escucha de verdad.",
      "Escucha sin interrumpir ni dar consejos inmediatos.",
    ],
    hasSubSkills: false,
  },
  {
    title: "Habilidades Sociales",
    description:
      "Competencias específicas para relacionarte con otros: comunicar, escuchar, cooperar y resolver desacuerdos.",
    color: "#F4A259",
    bgColor: "bg-[#F4A259]/10",
    emojiImg: `${EMOJI_BASE}/People%20hugging/3D/people_hugging_3d.png`,
    tips: [],
    hasSubSkills: true,
  },
  {
    title: "Motivación",
    description:
      "Orientar las emociones hacia objetivos personales, mantener la perseverancia y la actitud positiva.",
    color: "#F6E05E",
    bgColor: "bg-[#F6E05E]/20",
    emojiImg: `${EMOJI_BASE}/Star-struck/3D/star-struck_3d.png`,
    tips: [
      "Define una meta clara y divídela en pasos pequeños.",
      "Celebra tus logros, por pequeños que sean.",
      "Rodéate de personas que te inspiren y apoyen.",
    ],
    hasSubSkills: false,
  },
];

const expandido = ref<string | null>(null);

function toggle(title: string) {
  expandido.value = expandido.value === title ? null : title;
}

// GSAP stagger animation for cards
onMounted(() => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  const cards = document.querySelectorAll(".habilidad-card");
  if (cards.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.fromTo(
            cards,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              stagger: 0.1,
              ease: "power3.out",
            }
          );
          observer.disconnect();
        }
      });
    },
    { threshold: 0.15 }
  );

  const grid = document.querySelector(".habilidades-grid");
  if (grid) observer.observe(grid);
});
</script>

<template>
  <section id="habilidades" class="py-20 lg:py-32 relative bg-[#FEFBF7] scroll-mt-24">
    <div class="absolute inset-0 z-0 opacity-[0.03]">
      <img
        :src="bgHabilidades"
        alt="Trabajo en equipo en el piso"
        class="w-full h-full object-cover grayscale"
      />
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Header -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800 } }"
        class="text-center mb-16"
      >
        <span
          class="inline-block px-4 py-2 rounded-full bg-[#5B8DEE]/10 text-[#5B8DEE] text-sm font-semibold mb-4"
        >
          Basado en el modelo de Daniel Goleman
        </span>
        <h2
          class="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D3748] mb-6"
          style="text-wrap: balance"
        >
          ¿Qué son las&nbsp;
          <span
            class="bg-gradient-to-r from-[#5B8DEE] to-[#BC6C8A] bg-clip-text text-transparent"
          >
            Habilidades Socioemocionales?
          </span>
        </h2>
        <p class="text-lg text-[#718096] max-w-2xl mx-auto">
          Son competencias que nos permiten conocer y gestionar nuestras
          emociones, establecer relaciones positivas y tomar decisiones
          responsables.
        </p>
      </div>

      <!-- Cards Grid -->
      <div
        class="habilidades-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
      >
        <div
          v-for="(habilidad, index) in habilidades"
          :key="habilidad.title"
          class="group habilidad-card"
        >
          <div
            class="bg-white rounded-2xl p-7 shadow-soft hover:shadow-hover transition-[transform,box-shadow] duration-300 h-full border border-transparent hover:border-[#5B8DEE]/20 relative overflow-hidden"
            :class="{ 'motion-safe:hover:-translate-y-2': true }"
          >
            <!-- Number badge -->
            <span
              class="absolute top-4 right-4 text-3xl font-black text-[#2D3748]/[0.04] select-none leading-none"
              aria-hidden="true"
            >
              {{ String(index + 1).padStart(2, "0") }}
            </span>

            <!-- Emoji 3D -->
            <div
              :class="[
                'w-16 h-16 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300',
                habilidad.bgColor,
              ]"
            >
              <img
                :src="habilidad.emojiImg"
                :alt="habilidad.title"
                class="w-10 h-10 drop-shadow-sm"
              />
            </div>

            <!-- Content -->
            <h3
              class="text-lg font-bold text-[#2D3748] mb-2 group-hover:text-[#5B8DEE] transition-colors"
            >
              {{ habilidad.title }}
            </h3>
            <p class="text-[#718096] leading-relaxed text-sm">
              {{ habilidad.description }}
            </p>

            <!-- Visual indicator -->
            <div
              class="mt-4 h-1 rounded-full w-10 group-hover:w-full transition-[width] duration-500"
              :style="{ backgroundColor: habilidad.color }"
            />

            <!-- Tips toggle -->
            <button
              class="mt-4 flex items-center gap-1.5 text-sm font-semibold transition-colors rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#5B8DEE]/50"
              :style="{ color: habilidad.color }"
              @click.stop="toggle(habilidad.title)"
            >
              <span>{{
                expandido === habilidad.title
                  ? "Ocultar"
                  : habilidad.hasSubSkills
                    ? "Ver sub-habilidades"
                    : "Tips prácticos"
              }}</span>
              <ChevronDown
                class="w-4 h-4 transition-transform duration-300"
                :class="expandido === habilidad.title ? 'rotate-180' : ''"
              />
            </button>

            <Transition name="tip-slide">
              <div v-if="expandido === habilidad.title" class="mt-3">
                <HabilidadesSociales v-if="habilidad.hasSubSkills" />
                <ul v-else class="space-y-2">
                  <li
                    v-for="(tip, i) in habilidad.tips"
                    :key="i"
                    class="flex items-start gap-2 text-sm text-[#4A5568]"
                  >
                    <span
                      class="mt-0.5 flex-shrink-0 font-bold"
                      :style="{ color: habilidad.color }"
                      >›</span
                    >
                    {{ tip }}
                  </li>
                </ul>
              </div>
            </Transition>
          </div>
        </div>
      </div>

      <!-- Simulador destacado -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800, delay: 300 } }"
        class="mt-20 max-w-3xl mx-auto"
      >
        <div class="text-center mb-8">
          <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#5B8DEE]/10 text-[#5B8DEE] text-sm font-semibold mb-4">
            <img class="w-4 h-4 inline-block" src="https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@latest/assets/Performing%20arts/3D/performing_arts_3d.png" alt="Simulador" />
            Practica con el simulador
          </span>
          <h3 class="text-2xl sm:text-3xl font-bold text-[#2D3748] mb-3" style="text-wrap: balance">
            ¿Cómo responderías en estas situaciones?
          </h3>
          <p class="text-[#718096] max-w-lg mx-auto">
            Pon a prueba tu comunicación asertiva con escenarios reales. Elige la mejor opción y recibe retroalimentación instantánea.
          </p>
        </div>
        <SimuladorConversacion />
      </div>

      <!-- Quote -->
      <div
        v-motion
        :initial="{ opacity: 0 }"
        :visibleOnce="{
          opacity: 1,
          transition: { duration: 800, delay: 600 },
        }"
        class="mt-20 text-center max-w-3xl mx-auto relative"
      >
        <div class="bg-[#5B8DEE]/[0.04] rounded-3xl px-8 py-10 sm:px-12 sm:py-14 relative overflow-hidden">
          <span class="absolute top-2 left-4 text-8xl text-[#5B8DEE]/10 font-serif leading-none select-none" aria-hidden="true">"</span>
          <p class="text-xl sm:text-2xl text-[#2D3748] font-medium italic leading-relaxed relative z-10" style="text-wrap: balance">
            La inteligencia emocional no se opone a la inteligencia académica, sino que es un complemento necesario para el éxito en la vida.
          </p>
          <p class="mt-4 text-sm font-semibold text-[#5B8DEE] relative z-10">
            — Daniel Goleman
          </p>
        </div>
      </div>

      <!-- Marco de referencia eliminado -->
    </div>
  </section>
</template>

<style scoped>
.tip-slide-enter-active,
.tip-slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease, max-height 0.3s ease;
  overflow: hidden;
}
.tip-slide-enter-from,
.tip-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
  max-height: 0;
}
.tip-slide-enter-to,
.tip-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
  max-height: 1200px;
}

@media (prefers-reduced-motion: reduce) {
  .tip-slide-enter-active,
  .tip-slide-leave-active {
    transition: none;
  }
  .tip-slide-enter-from,
  .tip-slide-leave-to {
    opacity: 1;
    transform: none;
    max-height: none;
  }
}
</style>
