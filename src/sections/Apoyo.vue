<script setup lang="ts">
import { Phone, Mail, MessageCircle, LifeBuoy, Shield, Heart, BotMessageSquare } from "lucide-vue-next";

function abrirEmilio() {
  window.dispatchEvent(new CustomEvent('emilio:open'));
}
import bgApoyo from "@/img/estudiantes_video_educativo.jpeg";
import RedApoyoVirtual from "./apoyo/RedApoyoVirtual.vue";

// Crisis lines — each keeps a tonal distinction, but none read as "error/alarm".
// The crisis hue (warm coral) is the dominant identity; per-line accents
// stay within the warm/calm range, not red-alert.
const emergencias = [
  {
    nombre: "Línea 106 — “El poder de ser escuchado”",
    descripcion:
      "Atención psicológica gratuita para niños, niñas y adolescentes en Bogotá. 24/7.",
    contacto: "106",
    tipo: "phone",
    tone: "accent",       // dusty rose
    detalle: "Secretaría Distrital de Salud · Bogotá",
  },
  {
    nombre: "Línea 141 — ICBF",
    descripcion:
      "Protección infantil y adolescente. Maltrato, abuso, trabajo infantil, bullying.",
    contacto: "141",
    tipo: "phone",
    tone: "secondary",    // warm orange
    detalle: "Instituto Colombiano de Bienestar Familiar · Nacional 24/7",
  },
  {
    nombre: "Línea 123",
    descripcion:
      "Emergencias en general: si tú o alguien cercano está en riesgo inmediato.",
    contacto: "123",
    tipo: "phone",
    tone: "crisis",       // warm coral — primary crisis tone
    detalle: "Nacional · 24/7",
  },
  {
    nombre: "Línea 192 opción 4 — Salud mental",
    descripcion:
      "Asesoría emocional y salud mental del Ministerio de Salud.",
    contacto: "192",
    tipo: "phone",
    tone: "primary",      // blue
    detalle: "MinSalud · opción 4",
  },
];

const toneClasses = {
  primary:   { bg: "bg-primary",   ring: "ring-primary/20",   text: "text-primary",   tintBg: "bg-primary/10",   tintText: "text-primary"   },
  accent:    { bg: "bg-accent",    ring: "ring-accent/20",    text: "text-accent",    tintBg: "bg-accent/10",    tintText: "text-accent"    },
  secondary: { bg: "bg-secondary", ring: "ring-secondary/20", text: "text-secondary", tintBg: "bg-secondary/10", tintText: "text-secondary" },
  crisis:    { bg: "bg-crisis",    ring: "ring-crisis/25",    text: "text-crisis",    tintBg: "bg-crisis/10",    tintText: "text-crisis"    },
} as const;

const institucional = [
  {
    nombre: "Coordinación de Convivencia GPTP",
    descripcion:
      "Si estás viviendo una situación de acoso, conflicto o necesitas orientación dentro del colegio.",
    contacto: "g.p.thomaspaine@gmail.com",
    tipo: "email",
  },
  {
    nombre: "Orientación Escolar",
    descripcion:
      "Apoyo psicológico y emocional para estudiantes del Gimnasio Pedagógico Thomas Paine.",
    contacto: "g.p.thomaspaine@gmail.com",
    tipo: "email",
  },
  {
    nombre: "Dirección de grupo",
    descripcion:
      "Tu director/a de grupo es la primera puerta dentro del colegio. Acércate sin miedo.",
    contacto: "Acércate en tu jornada",
    tipo: "message",
  },
];
</script>

<template>
  <section id="apoyo" class="py-20 lg:py-32 relative bg-surface-warm scroll-mt-24">
    <div class="absolute inset-0 z-0 opacity-[0.03]" aria-hidden="true">
      <img
        :src="bgApoyo"
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
          class="inline-block px-3.5 py-1.5 rounded-full bg-crisis/10 text-crisis text-xs font-semibold uppercase tracking-wider mb-5"
        >
          Paso 3 · Red de Apoyo
        </span>
        <h2
          class="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-[1.1]"
          style="text-wrap: balance"
        >
          Si lo que sientes
          <span class="text-crisis">no se va</span>.
        </h2>
        <p class="text-lg text-muted-foreground max-w-prose-reading mx-auto leading-relaxed">
          Pedir ayuda es un acto de fuerza. Si la ansiedad, la tristeza, el estrés
          o una situación de bullying persisten, acá tienes adultos preparados para
          escucharte y acompañarte.
        </p>
      </div>

      <!-- Always-available help anchor -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visibleOnce="{
          opacity: 1,
          y: 0,
          transition: { duration: 700, delay: 150 },
        }"
        class="mb-10 max-w-4xl mx-auto rounded-3xl border border-crisis/25 bg-crisis-soft p-6 sm:p-7 shadow-soft"
      >
        <div class="flex items-start gap-4">
          <div
            class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-crisis/15 text-crisis"
          >
            <LifeBuoy class="h-6 w-6" />
          </div>
          <div>
            <h3 class="font-bold text-foreground mb-1.5 text-lg">
              Si necesitas ayuda ahora mismo
            </h3>
            <p class="text-sm text-foreground/75 leading-relaxed">
              Llama al
              <a
                href="tel:123"
                class="font-bold text-crisis underline underline-offset-4 decoration-2 decoration-crisis/40 hover:decoration-crisis transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crisis focus-visible:ring-offset-2 rounded"
                >123</a
              >
              (emergencias) o al
              <a
                href="tel:106"
                class="font-bold text-accent underline underline-offset-4 decoration-2 decoration-accent/40 hover:decoration-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded"
                >106</a
              >
              (línea de escucha para adolescentes, Bogotá). No estás solo/a.
            </p>
          </div>
        </div>
      </div>

      <!-- Líneas nacionales -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visibleOnce="{
          opacity: 1,
          y: 0,
          transition: { duration: 800, delay: 200 },
        }"
        class="max-w-5xl mx-auto mb-12"
      >
        <div class="flex items-center gap-2.5 mb-5">
          <Phone class="h-5 w-5 text-primary" />
          <h3 class="text-xl font-bold text-foreground">
            Líneas nacionales 24/7
          </h3>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            v-for="(item, index) in emergencias"
            :key="item.nombre"
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visibleOnce="{
              opacity: 1,
              y: 0,
              transition: { duration: 500, delay: 300 + index * 100 },
            }"
            :href="`tel:${item.contacto}`"
            :aria-label="`Llamar a ${item.nombre}`"
            class="group rounded-2xl bg-surface border border-border/60 p-5 shadow-soft hover:shadow-lift motion-safe:hover:-translate-y-1 transition-[transform,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <div class="flex items-start gap-4">
              <div
                class="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl text-primary-foreground font-bold text-lg shadow-soft motion-safe:group-hover:scale-105 transition-transform tabular-nums"
                :class="toneClasses[item.tone as keyof typeof toneClasses].bg"
              >
                {{ item.contacto }}
              </div>
              <div class="min-w-0">
                <h4 class="font-bold text-foreground leading-snug">
                  {{ item.nombre }}
                </h4>
                <p class="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                  {{ item.descripcion }}
                </p>
                <p class="mt-2 text-xs font-semibold text-muted-foreground/70">
                  {{ item.detalle }}
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>

      <!-- Contactos institucionales -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visibleOnce="{
          opacity: 1,
          y: 0,
          transition: { duration: 800, delay: 400 },
        }"
        class="max-w-5xl mx-auto"
      >
        <div class="flex items-center gap-2.5 mb-5">
          <Shield class="h-5 w-5 text-accent" />
          <h3 class="text-xl font-bold text-foreground">
            Dentro del colegio (GPTP)
          </h3>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            v-for="(item, index) in institucional"
            :key="item.nombre"
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visibleOnce="{
              opacity: 1,
              y: 0,
              transition: { duration: 500, delay: 500 + index * 100 },
            }"
            class="rounded-2xl bg-surface border border-border/60 p-5 shadow-soft"
          >
            <div
              class="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary"
            >
              <Mail v-if="item.tipo === 'email'" class="h-5 w-5" />
              <MessageCircle v-else class="h-5 w-5" />
            </div>
            <h4 class="font-bold text-foreground">{{ item.nombre }}</h4>
            <p class="mt-1.5 text-sm text-muted-foreground leading-relaxed">
              {{ item.descripcion }}
            </p>
            <a
              v-if="item.tipo === 'email'"
              :href="`mailto:${item.contacto}`"
              class="mt-3 inline-block text-sm font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
              >{{ item.contacto }}</a
            >
            <p
              v-else
              class="mt-3 text-sm font-semibold text-primary"
            >
              {{ item.contacto }}
            </p>
          </div>
        </div>
      </div>

      <!-- Emilio as additional voice -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 700, delay: 600 } }"
        class="mt-10 max-w-4xl mx-auto rounded-3xl border border-primary/20 bg-primary/[0.04] p-6 sm:p-8 shadow-soft"
      >
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div class="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground text-2xl shadow-soft select-none">
            🧠
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-[10px] font-bold text-primary uppercase tracking-wider mb-1.5">
              ¿Prefieres no hablar con nadie por ahora?
            </p>
            <h3 class="text-lg font-bold text-foreground mb-1.5">
              Emilio está disponible como voz adicional
            </h3>
            <p class="text-sm text-muted-foreground leading-relaxed">
              Si en este momento no quieres llamar, ir al colegio ni hablar con ninguna persona,
              es completamente válido. <span class="font-semibold text-foreground">Emilio</span>,
              nuestro asistente emocional, puede acompañarte de forma confidencial, a cualquier hora,
              sin juicios y sin que tengas que explicarte a nadie.
            </p>
            <p class="text-xs text-muted-foreground/80 mt-2.5">
              No reemplaza la ayuda profesional; es un primer paso cuando no estás listo/a para ningún otro.
            </p>
          </div>
          <button
            @click="abrirEmilio"
            class="flex-shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold shadow-soft hover:shadow-lift motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 transition-[transform,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <BotMessageSquare class="w-4 h-4" />
            Hablar con Emilio
          </button>
        </div>
      </div>

      <!-- Red de apoyo virtual -->
      <RedApoyoVirtual />

      <!-- Closing message -->
      <div
        v-motion
        :initial="{ opacity: 0 }"
        :visibleOnce="{
          opacity: 1,
          transition: { duration: 800, delay: 800 },
        }"
        class="mt-12 max-w-2xl mx-auto text-center"
      >
        <div
          class="inline-flex items-center gap-2.5 rounded-full bg-surface/85 px-5 py-3 shadow-soft border border-border/60"
        >
          <Heart class="h-4 w-4 text-accent" />
          <span class="text-sm text-foreground/80">
            Lo que sientes importa. Hablar de esto no te hace débil; te hace valiente.
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
