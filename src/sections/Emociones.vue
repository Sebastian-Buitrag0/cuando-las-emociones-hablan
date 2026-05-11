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
  <section id="emociones" class="py-20 lg:py-32 relative bg-surface-warm scroll-mt-24">
    <div class="absolute inset-0 z-0 opacity-[0.03]" aria-hidden="true">
      <img
        :src="bgEmociones"
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
          class="inline-block px-3.5 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-semibold uppercase tracking-wider mb-5"
        >
          Paso 1 · Reconocimiento
        </span>
        <h2
          class="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-[1.1]"
          style="text-wrap: balance"
        >
          Reconoce <span class="text-accent">tus emociones</span>.
        </h2>
        <p class="text-lg text-muted-foreground max-w-prose-reading mx-auto leading-relaxed">
          Antes de regular, ponle nombre. Haz el test o explora la rueda para
          identificar lo que te pasa hoy.
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
            class="grid w-full grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-0 mb-8 bg-surface/70 backdrop-blur-sm rounded-3xl sm:rounded-full p-2 sm:p-1 h-auto shadow-soft"
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
            <div class="bg-surface rounded-3xl p-6 sm:p-8 shadow-soft border border-border/60">
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
          class="w-full group flex flex-col sm:flex-row items-center justify-between gap-4 rounded-3xl border border-border/60 bg-surface/85 backdrop-blur-sm p-5 sm:p-6 shadow-soft hover:shadow-lift motion-safe:hover:-translate-y-0.5 transition-[transform,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          @click="scrollTo('regulacion')"
        >
          <div class="text-left">
            <p class="text-[10px] font-bold text-primary uppercase tracking-wider mb-1.5">
              Siguiente paso
            </p>
            <p class="text-foreground font-semibold">
              Ya identificaste lo que sientes; ahora aprende a regularlo.
            </p>
          </div>
          <div
            class="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-soft motion-safe:group-hover:scale-105 transition-transform"
            aria-hidden="true"
          >
            <ArrowDown class="w-5 h-5" />
          </div>
        </button>
      </div>
    </div>
  </section>
</template>
