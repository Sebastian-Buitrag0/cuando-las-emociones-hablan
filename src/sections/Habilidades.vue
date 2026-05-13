<script setup lang="ts">
import bgHabilidades from "@/img/trabajo_equipo_piso.jpeg";
import SimuladorConversacion from "./habilidades/SimuladorConversacion.vue";
import MindMapHabilidades from "./habilidades/MindMapHabilidades.vue";
</script>

<template>
  <section id="habilidades" class="py-20 lg:py-32 relative bg-background scroll-mt-24">
    <div class="absolute inset-0 z-0 opacity-[0.03]" aria-hidden="true">
      <img
        :src="bgHabilidades"
        alt=""
        class="w-full h-full object-cover grayscale"
      />
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Header compacto -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800 } }"
        class="text-center mb-10 max-w-3xl mx-auto"
      >
        <span
          class="inline-block px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-5"
        >
          Modelo de Daniel Goleman
        </span>
        <h2
          class="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-[1.1]"
          style="text-wrap: balance"
        >
          ¿Qué son las
          <span class="text-primary">habilidades socioemocionales</span>?
        </h2>
      </div>

      <!-- Interactive flow diagram (explica + conecta) -->
      <MindMapHabilidades />

      <!-- Simulador destacado -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800, delay: 300 } }"
        class="mt-20 max-w-3xl mx-auto"
      >
        <div class="text-center mb-8">
          <span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
            <img class="w-5 h-5 shrink-0 object-contain inline-block drop-shadow-sm" src="https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@latest/assets/Performing%20arts/3D/performing_arts_3d.png" alt="" />
            Simulador
          </span>
          <h3 class="text-2xl sm:text-3xl font-bold text-foreground mb-3" style="text-wrap: balance">
            ¿Cómo responderías en estas situaciones?
          </h3>
          <p class="text-muted-foreground max-w-prose-tight mx-auto leading-relaxed">
            Pon a prueba tu comunicación asertiva con escenarios reales.
            Elige la mejor opción y recibe retroalimentación al instante.
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
        <figure class="relative rounded-3xl px-8 py-10 sm:px-12 sm:py-14 bg-primary/[0.04] overflow-hidden">
          <span
            class="absolute top-2 left-5 text-8xl text-primary/15 font-serif leading-none select-none"
            aria-hidden="true"
          >&ldquo;</span>
          <blockquote class="text-xl sm:text-2xl text-foreground font-medium italic leading-relaxed relative z-10" style="text-wrap: balance">
            La inteligencia emocional no se opone a la inteligencia académica:
            es un complemento necesario para vivir bien.
          </blockquote>
          <figcaption class="mt-5 text-sm font-semibold text-primary relative z-10">
            — Daniel Goleman
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>
