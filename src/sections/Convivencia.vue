<script setup lang="ts">
import {
  MessageCircle,
  Ear,
  Handshake,
  Flame,
  CheckCircle,
} from "lucide-vue-next";
import AppAccordion from "@/components/ui/accordion.vue";
import AppAccordionItem from "@/components/ui/accordion-item.vue";
import AppAccordionTrigger from "@/components/ui/accordion-trigger.vue";
import AppAccordionContent from "@/components/ui/accordion-content.vue";
import bgImage from "@/img/charla_ruta_convivencia.jpeg";

const temas = [
  {
    id: "conflictos",
    icon: Handshake,
    title: "Resolver Conflictos",
    color: "#5B8DEE",
    tips: [
      "Identifica el problema de manera objetiva, sin culpas.",
      "Escucha la perspectiva de la otra persona sin interrumpir.",
      "Busca soluciones en las que ambas partes ganen.",
      "Mantén la calma y respira antes de responder.",
      "Si es necesario, toma un tiempo para reflexionar.",
    ],
    ejercicio:
      'Practica la técnica "Yo": Expresa tus sentimientos usando "Yo siento... cuando... porque...".',
  },
  {
    id: "comunicacion",
    icon: MessageCircle,
    title: "Comunicación Asertiva",
    color: "#BC6C8A",
    tips: [
      "Usa frases en primera persona para expresar tus sentimientos.",
      "Sé claro y directo sin ser agresivo.",
      "Mantén contacto visual apropiado.",
      "Respeta el turno de palabra.",
      'Evita generalizaciones como "siempre" o "nunca".',
    ],
    ejercicio:
      "Reformula 3 frases agresivas que uses frecuentemente en frases asertivas.",
  },
  {
    id: "escucha",
    icon: Ear,
    title: "Escucha Activa",
    color: "#F4A259",
    tips: [
      "Presta atención completa a quien habla.",
      "No interrumpas ni anticipes lo que va a decir.",
      "Haz preguntas para aclarar lo que no entiendes.",
      "Parafrasea para confirmar que entendiste.",
      "Muestra interés genuino con tu lenguaje corporal.",
    ],
    ejercicio:
      "En tu próxima conversación, practica escuchar sin pensar en tu respuesta.",
  },
  {
    id: "ira",
    icon: Flame,
    title: "Manejo de la Ira",
    color: "#F6AD55",
    tips: [
      "Reconoce cuándo estás empezando a enojarte.",
      "Respira profundamente antes de reaccionar.",
      "Cuenta hasta 10 (o 100 si es necesario).",
      "Identifica qué necesidad no está siendo satisfecha.",
      "Expresa tu enojo de manera constructiva, no destructiva.",
    ],
    ejercicio:
      'Crea un "kit de calma": lista de 5 cosas que puedes hacer cuando sientas ira.',
  },
];
</script>

<template>
  <section id="convivencia" class="py-20 lg:py-32 relative overflow-hidden bg-[#FEFBF7]">
    <!-- Background Image overlay -->
    <div class="absolute inset-0 z-0 opacity-[0.03]">
      <img
        :src="bgImage"
        alt="Estudiantes en convivencia"
        class="w-full h-full object-cover grayscale"
      />
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Header -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800 } }"
        class="text-center mb-12"
      >
        <span
          class="inline-block px-4 py-2 rounded-full bg-[#F4A259]/10 text-[#F4A259] text-sm font-semibold mb-4"
        >
          Relaciones Saludables
        </span>
        <h2
          class="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D3748] mb-6"
        >
          Mejora tu&nbsp;
          <span
            class="bg-gradient-to-r from-[#F4A259] to-[#5B8DEE] bg-clip-text text-transparent"
          >
            Convivencia
          </span>
        </h2>
        <p class="text-lg text-[#718096] max-w-2xl mx-auto">
          Aprende estrategias prácticas para construir relaciones más saludables
          y manejar los desafíos del día a día.
        </p>
      </div>

      <!-- Accordion -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visibleOnce="{
          opacity: 1,
          y: 0,
          transition: { duration: 800, delay: 200 },
        }"
        class="max-w-3xl mx-auto"
      >
        <AppAccordion type="single" collapsible class="space-y-4">
          <div
            v-for="(tema, index) in temas"
            :key="tema.id"
            v-motion
            :initial="{ opacity: 0, x: -20 }"
            :visibleOnce="{
              opacity: 1,
              x: 0,
              transition: { duration: 500, delay: index * 100 },
            }"
          >
            <AppAccordionItem
              :value="tema.id"
              class="bg-white rounded-2xl border-none shadow-soft overflow-hidden"
            >
              <AppAccordionTrigger class="px-6 py-5 hover:no-underline group">
                <div class="flex items-center gap-4 text-left">
                  <div
                    class="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                    :style="{ backgroundColor: tema.color + '20' }"
                  >
                    <component
                      :is="tema.icon"
                      class="w-6 h-6"
                      :style="{ color: tema.color }"
                    />
                  </div>
                  <span
                    class="text-lg font-semibold text-[#2D3748] group-hover:text-[#5B8DEE] transition-colors"
                  >
                    {{ tema.title }}
                  </span>
                </div>
              </AppAccordionTrigger>
              <AppAccordionContent class="px-6 pb-6">
                <div class="pl-16">
                  <h4 class="font-semibold text-[#2D3748] mb-3">
                    Tips prácticos:
                  </h4>
                  <ul class="space-y-2 mb-6">
                    <li
                      v-for="(tip, i) in tema.tips"
                      :key="i"
                      class="flex items-start gap-2 text-[#718096]"
                    >
                      <CheckCircle
                        class="w-5 h-5 mt-0.5 flex-shrink-0"
                        :style="{ color: tema.color }"
                      />
                      <span>{{ tip }}</span>
                    </li>
                  </ul>
                  <div
                    class="rounded-xl p-4"
                    :style="{ backgroundColor: tema.color + '10' }"
                  >
                    <p class="text-sm">
                      <strong :style="{ color: tema.color }">Ejercicio:</strong>
                      <span class="text-[#718096]"> {{ tema.ejercicio }}</span>
                    </p>
                  </div>
                </div>
              </AppAccordionContent>
            </AppAccordionItem>
          </div>
        </AppAccordion>
      </div>

      <!-- Quote -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visibleOnce="{
          opacity: 1,
          y: 0,
          transition: { duration: 800, delay: 600 },
        }"
        class="mt-16 text-center max-w-2xl mx-auto"
      >
        <div
          class="bg-gradient-to-r from-[#5B8DEE]/10 to-[#BC6C8A]/10 rounded-2xl p-8"
        >
          <p class="text-lg text-[#2D3748] italic mb-4">
            "La calidad de nuestras relaciones determina la calidad de nuestras
            vidas. Invertir en habilidades sociales es invertir en nuestro
            bienestar."
          </p>
          <p class="text-sm text-[#718096]">— Adaptado de Daniel Goleman</p>
        </div>
      </div>
    </div>
  </section>
</template>
