<script setup lang="ts">
import { Eye, Shield, Heart, Users, Star } from "lucide-vue-next";

const habilidades = [
  {
    icon: Eye,
    title: "Autoconciencia",
    description:
      "Reconocer y comprender nuestras propias emociones, fortalezas, limitaciones y cómo afectan nuestro comportamiento.",
    color: "#5B8DEE",
    bgColor: "bg-[#5B8DEE]/10",
  },
  {
    icon: Shield,
    title: "Autorregulación",
    description:
      "Gestionar las emociones de manera saludable, controlar impulsos y adaptarse a los cambios con flexibilidad.",
    color: "#81E6D9",
    bgColor: "bg-[#81E6D9]/20",
  },
  {
    icon: Heart,
    title: "Empatía",
    description:
      "Comprender los sentimientos de los demás, ponerse en su lugar y responder con compasión.",
    color: "#BC6C8A",
    bgColor: "bg-[#BC6C8A]/10",
  },
  {
    icon: Users,
    title: "Habilidades Sociales",
    description:
      "Establecer y mantener relaciones saludables, comunicarse asertivamente y trabajar en equipo.",
    color: "#F4A259",
    bgColor: "bg-[#F4A259]/10",
  },
  {
    icon: Star,
    title: "Motivación",
    description:
      "Orientar las emociones hacia objetivos personales, mantener la perseverancia y la actitud positiva.",
    color: "#F6E05E",
    bgColor: "bg-[#F6E05E]/20",
  },
];
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
              class="mt-6 h-1 rounded-full w-12 group-hover:w-full transition-all duration-500"
              :style="{ backgroundColor: habilidad.color }"
            />
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
    </div>
  </section>
</template>
