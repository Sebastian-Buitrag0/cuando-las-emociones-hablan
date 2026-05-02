<script setup lang="ts">
import AppTabs from "@/components/ui/tabs.vue";
import AppTabsList from "@/components/ui/tabs-list.vue";
import AppTabsTrigger from "@/components/ui/tabs-trigger.vue";
import AppTabsContent from "@/components/ui/tabs-content.vue";
import TestEmociones from "./emociones/TestEmociones.vue";
import RuedaEmociones from "./emociones/RuedaEmociones.vue";
import { ArrowDown } from "lucide-vue-next";
import bgEmociones from "@/img/actividades_patio.jpeg";
import gsap from "gsap";
import { ref, watch, nextTick } from "vue";

const activeTab = ref("test");

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

watch(activeTab, () => {
  nextTick(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const content = document.querySelector(".emociones-tab-content");
    if (content) {
      gsap.fromTo(content, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" });
    }
  });
});
</script>

<template>
  <section id="emociones" class="py-20 lg:py-32 relative bg-[#F5F0E8] scroll-mt-24">
    <div class="absolute inset-0 z-0 opacity-[0.03]">
      <img
        :src="bgEmociones"
        alt="Actividades de patio"
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
          class="inline-block px-4 py-2 rounded-full bg-[#BC6C8A]/10 text-[#BC6C8A] text-sm font-semibold mb-4"
        >
          Paso 1 · Reconocimiento
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
          Antes de regular, necesitas identificar lo que sientes. Haz el test o
          explora la rueda de emociones para ponerle nombre a lo que te pasa
          hoy.
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
        <AppTabs v-model="activeTab" class="max-w-4xl mx-auto">
          <AppTabsList
            class="grid w-full grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-0 mb-8 bg-white/70 backdrop-blur-sm rounded-3xl sm:rounded-full p-2 sm:p-1 h-auto shadow-soft"
          >
            <AppTabsTrigger value="test" class="rounded-full py-3"
              >Test emocional</AppTabsTrigger
            >
            <AppTabsTrigger value="rueda" class="rounded-full py-3"
              >Rueda de emociones</AppTabsTrigger
            >
          </AppTabsList>

          <AppTabsContent value="test" class="mt-6 emociones-tab-content">
            <TestEmociones />
          </AppTabsContent>

          <AppTabsContent value="rueda" class="mt-6 emociones-tab-content">
            <div
              class="bg-gradient-to-br from-white to-[#fff8f3] rounded-3xl p-6 sm:p-8 shadow-soft border border-white/70"
            >
              <RuedaEmociones />
            </div>
          </AppTabsContent>
        </AppTabs>
      </div>

      <!-- CTA to next step -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visibleOnce="{
          opacity: 1,
          y: 0,
          transition: { duration: 700, delay: 400 },
        }"
        class="mt-12 max-w-2xl mx-auto"
      >
        <button
          class="w-full group flex flex-col sm:flex-row items-center justify-between gap-4 rounded-3xl border border-white/80 bg-white/80 backdrop-blur-sm p-5 sm:p-6 shadow-soft hover:shadow-hover hover:-translate-y-0.5 transition-all duration-300"
          @click="scrollTo('regulacion')"
        >
          <div class="text-left">
            <p class="text-xs font-semibold text-[#5B8DEE] uppercase tracking-wide mb-1">
              Siguiente paso
            </p>
            <p class="text-[#2D3748] font-semibold">
              Ya identificaste lo que sientes — ahora aprende a regularlo
            </p>
          </div>
          <div
            class="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#5B8DEE] to-[#BC6C8A] text-white shadow-md group-hover:scale-110 transition-transform"
          >
            <ArrowDown class="w-5 h-5" />
          </div>
        </button>
      </div>
    </div>
  </section>
</template>
