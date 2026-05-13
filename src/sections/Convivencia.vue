<script setup lang="ts">
import { ref } from "vue";
import {
  MessageCircle,
  Ear,
  Handshake,
  Flame,
} from "lucide-vue-next";
import bgImage from "@/img/charla_ruta_convivencia.jpeg";

const abierto = ref<string | null>(null);

const temas = [
  {
    id: "conflictos",
    icon: Handshake,
    title: "¿Cómo resolver un conflicto sin que nadie pierda?",
    color: "var(--primary)",
    tips: [
      "Identificar el problema de manera objetiva, sin culpas.",
      "Escuchar la perspectiva de la otra persona sin interrumpir.",
      "Buscar soluciones en las que ambas partes ganen.",
      "Mantener la calma y respirar antes de responder.",
      "Si es necesario, tomar un tiempo para reflexionar.",
    ],
    ejercicio:
      'Practicar la técnica "Yo": expresar los sentimientos usando "Yo siento... cuando... porque...".',
  },
  {
    id: "comunicacion",
    icon: MessageCircle,
    title: "¿Cómo decir lo que siento sin herir ni ceder?",
    color: "var(--accent)",
    tips: [
      "Usar frases en primera persona para expresar los sentimientos.",
      "Ser claro y directo sin ser agresivo.",
      "Mantener contacto visual apropiado.",
      "Respetar el turno de palabra.",
      'Evitar generalizaciones como "siempre" o "nunca".',
    ],
    ejercicio:
      "Reformular 3 frases agresivas que se usen frecuentemente en frases asertivas.",
  },
  {
    id: "escucha",
    icon: Ear,
    title: "¿Cómo escuchar de verdad a alguien?",
    color: "var(--secondary)",
    tips: [
      "Prestar atención completa a quien habla.",
      "No interrumpir ni anticipar lo que va a decir.",
      "Hacer preguntas para aclarar lo que no se entiende.",
      "Parafrasear para confirmar que se entendió.",
      "Mostrar interés genuino con el lenguaje corporal.",
    ],
    ejercicio:
      "En la próxima conversación, practicar escuchar sin pensar en la respuesta.",
  },
  {
    id: "ira",
    icon: Flame,
    title: "¿Cómo manejar la ira antes de que explote?",
    color: "var(--secondary)",
    tips: [
      "Reconocer cuándo se está empezando a enojar.",
      "Respirar profundamente antes de reaccionar.",
      "Contar hasta 10 (o 100 si es necesario).",
      "Identificar qué necesidad no está siendo satisfecha.",
      "Expresar el enojo de manera constructiva, no destructiva.",
    ],
    ejercicio:
      'Crear un "kit de calma": lista de 5 cosas que se pueden hacer cuando se siente ira.',
  },
];
</script>

<template>
  <section id="convivencia" class="py-20 lg:py-32 relative overflow-hidden bg-background scroll-mt-24">
    <div class="absolute inset-0 z-0 opacity-[0.03]" aria-hidden="true">
      <img
        :src="bgImage"
        alt=""
        class="w-full h-full object-cover grayscale"
      />
    </div>

      <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Header -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800 } }"
        class="text-center mb-12 max-w-3xl mx-auto"
      >
        <span
          class="inline-block px-3.5 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-semibold uppercase tracking-wider mb-5"
        >
          Relaciones saludables
        </span>
        <h2
          class="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-[1.1]"
          style="text-wrap: balance"
        >
          Mejora la <span class="text-secondary">convivencia</span>.
        </h2>
        <p class="text-lg text-muted-foreground max-w-prose-reading mx-auto leading-relaxed">
          Cuatro preguntas clave para construir relaciones más saludables.
          Toca cada una para descubrir herramientas prácticas.
        </p>
      </div>

      <!-- Interactive Question Cards -->
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
        <div class="space-y-4">
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
            class="rounded-2xl bg-surface border border-border/60 shadow-soft overflow-hidden transition-all duration-300 hover:shadow-lift"
          >
            <button
              class="w-full px-6 py-5 flex items-center gap-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              @click="abierto = abierto === tema.id ? null : tema.id"
            >
              <div
                class="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 motion-safe:transition-transform motion-safe:hover:scale-105 text-2xl"
                :style="{ backgroundColor: `hsl(${tema.color} / 0.13)` }"
              >
                <component
                  :is="tema.icon"
                  class="w-7 h-7"
                  :style="{ color: `hsl(${tema.color})` }"
                />
              </div>
              <div class="flex-1 min-w-0">
                <span class="text-[10px] font-bold uppercase tracking-wider" :style="{ color: `hsl(${tema.color})` }">
                  Pregunta {{ index + 1 }}
                </span>
                <p class="text-base font-semibold text-foreground mt-0.5">
                  {{ tema.title }}
                </p>
              </div>
              <div
                class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300"
                :class="abierto === tema.id ? 'rotate-180' : ''"
                :style="{ backgroundColor: `hsl(${tema.color} / 0.08)` }"
              >
                <svg class="w-4 h-4" :style="{ color: `hsl(${tema.color})` }" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            <Transition name="collapse">
              <div v-if="abierto === tema.id" class="px-6 pb-6">
                <div class="pl-[72px] pt-2">
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    <div
                      v-for="(tip, i) in tema.tips"
                      :key="i"
                      class="flex items-start gap-2.5 rounded-xl bg-surface/85 p-3 border border-border/40"
                    >
                      <span
                        class="flex h-6 w-6 items-center justify-center rounded-lg flex-shrink-0 text-xs font-bold"
                        :style="{ backgroundColor: `hsl(${tema.color} / 0.15)`, color: `hsl(${tema.color})` }"
                      >{{ i + 1 }}</span>
                      <span class="text-sm text-foreground/80">{{ tip }}</span>
                    </div>
                  </div>
                  <div
                    class="rounded-xl p-4"
                    :style="{ backgroundColor: `hsl(${tema.color} / 0.07)` }"
                  >
                    <p class="text-sm leading-relaxed">
                      <strong :style="{ color: `hsl(${tema.color})` }">Ejercicio:</strong>
                      <span class="text-foreground/80"> {{ tema.ejercicio }}</span>
                    </p>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
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
        <figure class="rounded-3xl p-8 sm:p-10 bg-secondary/[0.06] border border-secondary/15">
          <blockquote class="text-lg sm:text-xl text-foreground italic mb-4 leading-relaxed" style="text-wrap: balance">
            La calidad de nuestras relaciones determina la calidad de nuestras vidas.
            Invertir en habilidades sociales es invertir en nuestro bienestar.
          </blockquote>
          <figcaption class="text-sm text-muted-foreground">— Adaptado de Daniel Goleman</figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>

<style scoped>
.collapse-enter-active,
.collapse-leave-active {
  transition: opacity 0.3s ease, max-height 0.4s ease;
  overflow: hidden;
  max-height: 600px;
}
.collapse-enter-from,
.collapse-leave-to {
  opacity: 0;
  max-height: 0;
}

@media (prefers-reduced-motion: reduce) {
  .collapse-enter-active,
  .collapse-leave-active {
    transition: none;
  }
}
</style>
