<script setup lang="ts">
import AppTabs from "@/components/ui/tabs.vue";
import AppTabsList from "@/components/ui/tabs-list.vue";
import AppTabsTrigger from "@/components/ui/tabs-trigger.vue";
import AppTabsContent from "@/components/ui/tabs-content.vue";
import TestEmociones from "./emociones/TestEmociones.vue";
import RuedaEmociones from "./emociones/RuedaEmociones.vue";
import EjercicioRespiracion from "./emociones/EjercicioRespiracion.vue";
</script>

<template>
  <section id="emociones" class="py-20 lg:py-32 bg-[#F5F0E8]">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800 } }"
        class="text-center mb-12"
      >
        <span
          class="inline-block px-4 py-2 rounded-full bg-[#BC6C8A]/10 text-[#BC6C8A] text-sm font-semibold mb-4"
        >
          Autoconocimiento
        </span>
        <h2
          class="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D3748] mb-6"
        >
          Reconoce tus&nbsp;
          <span
            class="bg-gradient-to-r from-[#BC6C8A] to-[#F4A259] bg-clip-text text-transparent"
          >
            Emociones
          </span>
        </h2>
        <p class="text-lg text-[#718096] max-w-2xl mx-auto">
          Explora herramientas interactivas para identificar y comprender mejor
          tus emociones.
        </p>
      </div>

      <!-- Tabs -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visibleOnce="{
          opacity: 1,
          y: 0,
          transition: { duration: 800, delay: 200 },
        }"
      >
        <AppTabs default-value="test" class="max-w-4xl mx-auto">
          <AppTabsList
            class="grid w-full grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-0 mb-8 bg-white/70 backdrop-blur-sm rounded-3xl sm:rounded-full p-2 sm:p-1 h-auto shadow-soft"
          >
            <AppTabsTrigger value="test" class="rounded-full py-3"
              >Test</AppTabsTrigger
            >
            <AppTabsTrigger value="rueda" class="rounded-full py-3"
              >Rueda de Emociones</AppTabsTrigger
            >
            <AppTabsTrigger value="respiracion" class="rounded-full py-3"
              >Respiración</AppTabsTrigger
            >
          </AppTabsList>

          <AppTabsContent value="test" class="mt-6">
            <TestEmociones />
          </AppTabsContent>

          <AppTabsContent value="rueda" class="mt-6">
            <div
              class="bg-gradient-to-br from-white to-[#fff8f3] rounded-3xl p-6 sm:p-8 shadow-soft border border-white/70"
            >
              <RuedaEmociones />
            </div>
          </AppTabsContent>

          <AppTabsContent value="respiracion" class="mt-6">
            <div
              class="bg-gradient-to-br from-white to-[#f6fffd] rounded-3xl p-6 sm:p-8 shadow-soft border border-white/70"
            >
              <EjercicioRespiracion />
            </div>
          </AppTabsContent>
        </AppTabs>
      </div>
    </div>
  </section>
</template>
