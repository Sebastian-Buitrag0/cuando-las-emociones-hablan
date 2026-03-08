<script setup lang="ts">
import { Eye, Shield, Heart, Users, Star, ChevronDown } from "lucide-vue-next";
import { ref } from "vue";

const habilidades = [
  {
    icon: Eye,
    title: "Autoconciencia",
    description:
      "Reconocer y comprender nuestras propias emociones, fortalezas, limitaciones y cómo afectan nuestro comportamiento.",
    color: "#5B8DEE",
    bgColor: "bg-[#5B8DEE]/10",
    emoji: "🔎",
    tips: [
      "Pregúntate: ¿Qué estoy sintiendo en este momento?",
      "Identifica en qué parte del cuerpo sientes esa emoción.",
      "Escribe 3 pensamientos que acompañan esa emoción.",
    ],
  },
  {
    icon: Shield,
    title: "Autorregulación",
    description:
      "Gestionar las emociones de manera saludable, controlar impulsos y adaptarse a los cambios con flexibilidad.",
    color: "#81E6D9",
    bgColor: "bg-[#81E6D9]/20",
    emoji: "🌊",
    tips: [
      "Respira profundo durante 4 segundos antes de reaccionar.",
      "Cuenta hasta 10 cuando sientas que pierdes el control.",
      "Cambia el pensamiento negativo por uno más realista.",
    ],
  },
  {
    icon: Heart,
    title: "Empatía",
    description:
      "Comprender los sentimientos de los demás, ponerse en su lugar y responder con compasión.",
    color: "#BC6C8A",
    bgColor: "bg-[#BC6C8A]/10",
    emoji: "❤️",
    tips: [
      "Ponte en el lugar del otro antes de juzgar.",
      "Pregunta: ¿Cómo te sientes? y escucha de verdad.",
      "Escucha sin interrumpir ni dar consejos inmediatos.",
    ],
  },
  {
    icon: Users,
    title: "Habilidades Sociales",
    description:
      "Establecer y mantener relaciones saludables, comunicarse asertivamente y trabajar en equipo.",
    color: "#F4A259",
    bgColor: "bg-[#F4A259]/10",
    emoji: "🗣",
    tips: [
      'Usa frases como: "Yo siento… cuando…" para expresarte.',
      "Mantén contacto visual durante las conversaciones.",
      "Practica el respeto incluso en los desacuerdos.",
    ],
  },
  {
    icon: Star,
    title: "Motivación",
    description:
      "Orientar las emociones hacia objetivos personales, mantener la perseverancia y la actitud positiva.",
    color: "#F6E05E",
    bgColor: "bg-[#F6E05E]/20",
    emoji: "💡",
    tips: [
      "Define una meta clara y divídela en pasos pequeños.",
      "Celebra tus logros, por pequeños que sean.",
      "Rodéate de personas que te inspiren y apoyen.",
    ],
  },
];

const expandido = ref<string | null>(null);

function toggle(title: string) {
  expandido.value = expandido.value === title ? null : title;
}
</script>

<template>
  <section id="habilidades" class="py-20 lg:py-32 bg-[#FEFBF7]">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
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
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
      >
        <div
          v-for="(habilidad, index) in habilidades"
          :key="habilidad.title"
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visibleOnce="{
            opacity: 1,
            y: 0,
            transition: { duration: 600, delay: index * 150 },
          }"
          class="group hover:-translate-y-2 transition-transform duration-300"
        >
          <div
            class="bg-white rounded-2xl p-8 shadow-soft hover:shadow-hover transition-all duration-300 h-full border border-transparent hover:border-[#5B8DEE]/20"
          >
            <!-- Icon -->
            <div
              :class="[
                'w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300',
                habilidad.bgColor,
              ]"
            >
              <component
                :is="habilidad.icon"
                class="w-8 h-8"
                :style="{ color: habilidad.color }"
              />
            </div>

            <!-- Content -->
            <h3
              class="text-xl font-bold text-[#2D3748] mb-3 group-hover:text-[#5B8DEE] transition-colors"
            >
              {{ habilidad.title }}
            </h3>
            <p class="text-[#718096] leading-relaxed">
              {{ habilidad.description }}
            </p>

            <!-- Visual indicator -->
            <div
              class="mt-4 h-1 rounded-full w-12 group-hover:w-full transition-all duration-500"
              :style="{ backgroundColor: habilidad.color }"
            />

            <!-- Tips toggle -->
            <button
              class="mt-4 flex items-center gap-1.5 text-sm font-semibold transition-colors"
              :style="{ color: habilidad.color }"
              @click.stop="toggle(habilidad.title)"
            >
              <span>{{ expandido === habilidad.title ? 'Ocultar tips' : `Tips prácticos ${habilidad.emoji}` }}</span>
              <ChevronDown
                class="w-4 h-4 transition-transform duration-300"
                :class="expandido === habilidad.title ? 'rotate-180' : ''"
              />
            </button>

            <Transition name="tip-slide">
              <ul
                v-if="expandido === habilidad.title"
                class="mt-3 space-y-2"
              >
                <li
                  v-for="(tip, i) in habilidad.tips"
                  :key="i"
                  class="flex items-start gap-2 text-sm text-[#4A5568]"
                >
                  <span class="mt-0.5 flex-shrink-0 font-bold" :style="{ color: habilidad.color }">›</span>
                  {{ tip }}
                </li>
              </ul>
            </Transition>
          </div>
        </div>
      </div>

      <!-- Quote -->
      <div
        v-motion
        :initial="{ opacity: 0 }"
        :visibleOnce="{
          opacity: 1,
          transition: { duration: 800, delay: 1000 },
        }"
        class="mt-16 text-center"
      >
        <p class="text-[#718096] italic">
          "La inteligencia emocional no se opone a la inteligencia académica,
          sino que es un complemento necesario para el éxito en la vida." —
          Daniel Goleman
        </p>
      </div>

      <!-- Marco teórico y legal -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800, delay: 1200 } }"
        class="mt-12 rounded-3xl bg-white border border-gray-100 shadow-soft p-6 sm:p-8 max-w-4xl mx-auto"
      >
        <h3 class="text-lg font-bold text-[#2D3748] mb-6 text-center">Marco de referencia</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p class="text-xs font-semibold text-[#5B8DEE] uppercase tracking-wide mb-3">Referentes teóricos</p>
            <ul class="space-y-2">
              <li class="flex items-start gap-2 text-sm text-[#718096]">
                <span class="text-[#5B8DEE] font-bold flex-shrink-0">›</span>
                <span><strong class="text-[#2D3748]">Daniel Goleman</strong> — Modelo de inteligencia emocional</span>
              </li>
              <li class="flex items-start gap-2 text-sm text-[#718096]">
                <span class="text-[#BC6C8A] font-bold flex-shrink-0">›</span>
                <span><strong class="text-[#2D3748]">Rafael Bisquerra</strong> — Educación emocional y competencias</span>
              </li>
              <li class="flex items-start gap-2 text-sm text-[#718096]">
                <span class="text-[#F4A259] font-bold flex-shrink-0">›</span>
                <span><strong class="text-[#2D3748]">Natalio Kisnerman</strong> — Método de grupo en trabajo social</span>
              </li>
              <li class="flex items-start gap-2 text-sm text-[#718096]">
                <span class="text-[#81E6D9] font-bold flex-shrink-0">›</span>
                <span><strong class="text-[#2D3748]">Carl Rogers</strong> — Enfoque humanista y autoconocimiento</span>
              </li>
              <li class="flex items-start gap-2 text-sm text-[#718096]">
                <span class="text-[#F6E05E] font-bold flex-shrink-0">›</span>
                <span><strong class="text-[#2D3748]">William J. Reid</strong> — Modelo centrado en la tarea</span>
              </li>
            </ul>
          </div>
          <div>
            <p class="text-xs font-semibold text-[#BC6C8A] uppercase tracking-wide mb-3">Marco legal colombiano</p>
            <ul class="space-y-2">
              <li class="flex items-start gap-2 text-sm text-[#718096]">
                <span class="text-[#BC6C8A] font-bold flex-shrink-0">›</span>
                <span><strong class="text-[#2D3748]">Ley 1620 de 2013</strong> — Sistema Nacional de Convivencia Escolar y formación para el ejercicio de los Derechos Humanos</span>
              </li>
              <li class="flex items-start gap-2 text-sm text-[#718096]">
                <span class="text-[#5B8DEE] font-bold flex-shrink-0">›</span>
                <span><strong class="text-[#2D3748]">Ley 2383 de 2024</strong> — Integración de la educación socioemocional en el sistema educativo colombiano</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tip-slide-enter-active,
.tip-slide-leave-active {
  transition: all 0.3s ease;
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
  max-height: 200px;
}
</style>
