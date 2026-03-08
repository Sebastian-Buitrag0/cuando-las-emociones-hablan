<script setup lang="ts">
import {
  Heart,
  BookOpen,
  AlertTriangle,
  Users,
  Lightbulb,
  MessageSquare,
  Shield,
} from "lucide-vue-next";
import AppCard from "@/components/ui/card.vue";
import AppCardHeader from "@/components/ui/card-header.vue";
import AppCardTitle from "@/components/ui/card-title.vue";
import AppCardContent from "@/components/ui/card-content.vue";
import AppButton from "@/components/ui/button.vue";

const recursos = [
  {
    icon: Heart,
    title: "Acompañamiento Emocional",
    description:
      "Guía práctica para apoyar el desarrollo emocional de tu hijo/a en cada etapa.",
    color: "#BC6C8A",
    puntos: [
      "Valida las emociones de tu hijo/a sin juzgar.",
      "Crea espacios seguros para conversar.",
      "Modela la gestión emocional saludable.",
      "Establece rutinas que generen seguridad.",
    ],
  },
  {
    icon: BookOpen,
    title: "Crianza Positiva",
    description:
      "Estrategias basadas en el respeto mutuo y el fortalecimiento de vínculos.",
    color: "#5B8DEE",
    puntos: [
      "Usa refuerzos positivos específicos.",
      "Establece límites claros y consistentes.",
      "Practica la disciplina conectiva.",
      "Fomenta la autonomía gradual.",
    ],
  },
  {
    icon: AlertTriangle,
    title: "Señales de Alerta",
    description:
      "Identifica cuándo tu hijo/a puede necesitar apoyo profesional adicional.",
    color: "#F6AD55",
    puntos: [
      "Cambios significativos en el comportamiento.",
      "Aislamiento social persistente.",
      "Dificultades de sueño o alimentación.",
      "Expresiones de tristeza o ansiedad frecuentes.",
    ],
  },
];

const consejosRapidos = [
  {
    icon: MessageSquare,
    titulo: "Conversaciones Diarias",
    texto:
      "Dedica 10 minutos al día a conversar sin distracciones sobre el día de tu hijo/a.",
  },
  {
    icon: Shield,
    titulo: "Espacio Seguro",
    texto:
      "Asegúrate de que tu hogar sea un lugar donde se puedan expresar emociones sin miedo.",
  },
  {
    icon: Lightbulb,
    titulo: "Modelado",
    texto:
      "Recuerda que los hijos aprenden más de lo que ven que de lo que escuchan.",
  },
];
</script>

<template>
  <section id="familias" class="py-20 lg:py-32 bg-[#F5F0E8]">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800 } }"
        class="text-center mb-12"
      >
        <span
          class="inline-block px-4 py-2 rounded-full bg-[#5B8DEE]/10 text-[#5B8DEE] text-sm font-semibold mb-4"
        >
          Para Padres y Madres
        </span>
        <h2
          class="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D3748] mb-6"
        >
          Apoyo para&nbsp;
          <span
            class="bg-gradient-to-r from-[#5B8DEE] to-[#BC6C8A] bg-clip-text text-transparent"
          >
            Familias
          </span>
        </h2>
        <p class="text-lg text-[#718096] max-w-2xl mx-auto">
          Recursos y guías para acompañar el desarrollo socioemocional de tus
          hijos desde el hogar.
        </p>
      </div>

      <!-- Resource Cards -->
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16"
      >
        <div
          v-for="(recurso, index) in recursos"
          :key="recurso.title"
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visibleOnce="{
            opacity: 1,
            y: 0,
            transition: { duration: 600, delay: index * 150 },
          }"
        >
          <AppCard
            class="h-full bg-white rounded-2xl shadow-soft hover:shadow-hover transition-all duration-300 border-none overflow-hidden group"
          >
            <AppCardHeader class="pb-4">
              <div
                class="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                :style="{ backgroundColor: recurso.color + '15' }"
              >
                <component
                  :is="recurso.icon"
                  class="w-7 h-7"
                  :style="{ color: recurso.color }"
                />
              </div>
              <AppCardTitle class="text-xl font-bold text-[#2D3748]">{{
                recurso.title
              }}</AppCardTitle>
            </AppCardHeader>
            <AppCardContent>
              <p class="text-[#718096] mb-4">{{ recurso.description }}</p>
              <ul class="space-y-2">
                <li
                  v-for="(punto, i) in recurso.puntos"
                  :key="i"
                  class="flex items-start gap-2 text-sm text-[#718096]"
                >
                  <div
                    class="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                    :style="{ backgroundColor: recurso.color }"
                  />
                  {{ punto }}
                </li>
              </ul>
            </AppCardContent>
          </AppCard>
        </div>
      </div>

      <!-- Quick Tips -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visibleOnce="{
          opacity: 1,
          y: 0,
          transition: { duration: 800, delay: 400 },
        }"
        class="mb-16"
      >
        <h3 class="text-2xl font-bold text-[#2D3748] text-center mb-8">
          Consejos Rápidos
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="(consejo, index) in consejosRapidos"
            :key="consejo.titulo"
            v-motion
            :initial="{ opacity: 0, scale: 0.9 }"
            :visibleOnce="{
              opacity: 1,
              scale: 1,
              transition: { duration: 500, delay: 500 + index * 100 },
            }"
            class="bg-white rounded-2xl p-6 shadow-soft text-center"
          >
            <component
              :is="consejo.icon"
              class="w-10 h-10 mx-auto mb-4 text-[#F4A259]"
            />
            <h4 class="font-semibold text-[#2D3748] mb-2">
              {{ consejo.titulo }}
            </h4>
            <p class="text-sm text-[#718096]">{{ consejo.texto }}</p>
          </div>
        </div>
      </div>

      <!-- CTA Banner -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visibleOnce="{
          opacity: 1,
          y: 0,
          transition: { duration: 800, delay: 600 },
        }"
        class="text-center"
      >
        <div
          class="bg-gradient-to-r from-[#5B8DEE] to-[#BC6C8A] rounded-2xl p-8 lg:p-12 text-white"
        >
          <Users class="w-16 h-16 mx-auto mb-6" />
          <h3 class="text-2xl lg:text-3xl font-bold mb-4">
            ¿Necesitas más apoyo?
          </h3>
          <p class="text-white/90 mb-8 max-w-xl mx-auto">
            Recuerda que pedir ayuda es un signo de fortaleza. El colegio cuenta
            con profesionales dispuestos a apoyarte en el proceso de crianza.
          </p>
          <AppButton
            variant="secondary"
            size="lg"
            class="rounded-full px-8 bg-white text-[#5B8DEE] hover:bg-white/90"
          >
            <Heart class="w-5 h-5 mr-2" />
            Contactar al colegio
          </AppButton>
        </div>
      </div>
    </div>
  </section>
</template>
