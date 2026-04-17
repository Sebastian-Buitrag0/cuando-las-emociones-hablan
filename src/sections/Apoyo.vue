<script setup lang="ts">
import { Phone, Mail, MessageCircle, AlertTriangle, Shield, Heart } from "lucide-vue-next";
import bgApoyo from "@/img/estudiantes_video_educativo.jpeg";

const emergencias = [
  {
    nombre: "Línea 106 — “El poder de ser escuchado”",
    descripcion:
      "Atención psicológica gratuita para niños, niñas y adolescentes en Bogotá. 24/7.",
    contacto: "106",
    tipo: "phone",
    color: "#BC6C8A",
    detalle: "Secretaría Distrital de Salud · Bogotá",
  },
  {
    nombre: "Línea 141 — ICBF",
    descripcion:
      "Protección infantil y adolescente. Maltrato, abuso, trabajo infantil, bullying.",
    contacto: "141",
    tipo: "phone",
    color: "#F4A259",
    detalle: "Instituto Colombiano de Bienestar Familiar · Nacional 24/7",
  },
  {
    nombre: "Línea 123",
    descripcion:
      "Emergencias en general: si tú o alguien cercano está en riesgo inmediato.",
    contacto: "123",
    tipo: "phone",
    color: "#E53E3E",
    detalle: "Nacional · 24/7",
  },
  {
    nombre: "Línea 192 opción 4 — Salud mental",
    descripcion:
      "Asesoría emocional y salud mental del Ministerio de Salud.",
    contacto: "192",
    tipo: "phone",
    color: "#5B8DEE",
    detalle: "MinSalud · opción 4",
  },
];

const institucional = [
  {
    nombre: "Coordinación de Convivencia GPTP",
    descripcion:
      "Si estás viviendo una situación de acoso, conflicto o necesitas orientación dentro del colegio.",
    contacto: "convivencia@gptp.edu.co",
    tipo: "email",
  },
  {
    nombre: "Orientación Escolar",
    descripcion:
      "Apoyo psicológico y emocional para estudiantes del Gimnasio Pedagógico Thomas Paine.",
    contacto: "orientacion@gptp.edu.co",
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
  <section id="apoyo" class="py-20 lg:py-32 relative bg-[#F5F0E8]">
    <div class="absolute inset-0 z-0 opacity-[0.03]">
      <img
        :src="bgApoyo"
        alt="Estudiantes viendo video educativo"
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
          class="inline-block px-4 py-2 rounded-full bg-[#E53E3E]/10 text-[#E53E3E] text-sm font-semibold mb-4"
        >
          Paso 3 · Red de Apoyo
        </span>
        <h2
          class="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D3748] mb-6"
        >
          Si lo que sientes&nbsp;
          <span
            class="bg-gradient-to-r from-[#BC6C8A] to-[#E53E3E] bg-clip-text text-transparent"
          >
            no se va
          </span>
        </h2>
        <p class="text-lg text-[#718096] max-w-2xl mx-auto">
          Pedir ayuda es un acto de fuerza. Si la ansiedad, el estrés, la
          tristeza o una situación de bullying persisten, acá tienes adultos
          preparados para escucharte y acompañarte.
        </p>
      </div>

      <!-- Crisis alert -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visibleOnce="{
          opacity: 1,
          y: 0,
          transition: { duration: 700, delay: 150 },
        }"
        class="mb-10 max-w-4xl mx-auto rounded-3xl border-2 border-[#E53E3E]/20 bg-gradient-to-br from-[#FFF5F5] to-white p-6 shadow-soft"
      >
        <div class="flex items-start gap-4">
          <div
            class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-[#E53E3E]/15"
          >
            <AlertTriangle class="h-6 w-6 text-[#E53E3E]" />
          </div>
          <div>
            <h3 class="font-bold text-[#2D3748] mb-1">
              Si estás en crisis o en peligro ahora mismo
            </h3>
            <p class="text-sm text-[#4A5568] leading-relaxed">
              Llama al
              <a
                href="tel:123"
                class="font-bold text-[#E53E3E] underline underline-offset-2"
                >123</a
              >
              (emergencias) o al
              <a
                href="tel:106"
                class="font-bold text-[#BC6C8A] underline underline-offset-2"
                >106</a
              >
              (línea de escucha para adolescentes, Bogotá). No estás solo/a.
            </p>
          </div>
        </div>
      </div>

      <!-- Líneas de emergencia -->
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
        <div class="flex items-center gap-2 mb-5">
          <Phone class="h-5 w-5 text-[#5B8DEE]" />
          <h3 class="text-xl font-bold text-[#2D3748]">
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
            class="group rounded-2xl bg-white border border-white/80 p-5 shadow-soft hover:shadow-hover hover:-translate-y-1 transition-all duration-300"
          >
            <div class="flex items-start gap-4">
              <div
                class="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl text-white font-bold text-lg shadow-md group-hover:scale-110 transition-transform"
                :style="{ backgroundColor: item.color }"
              >
                {{ item.contacto }}
              </div>
              <div class="min-w-0">
                <h4 class="font-bold text-[#2D3748] leading-tight">
                  {{ item.nombre }}
                </h4>
                <p class="mt-1 text-sm text-[#718096] leading-relaxed">
                  {{ item.descripcion }}
                </p>
                <p class="mt-2 text-xs font-semibold text-[#A0AEC0]">
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
        <div class="flex items-center gap-2 mb-5">
          <Shield class="h-5 w-5 text-[#BC6C8A]" />
          <h3 class="text-xl font-bold text-[#2D3748]">
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
            class="rounded-2xl bg-white border border-white/80 p-5 shadow-soft"
          >
            <div
              class="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#5B8DEE]/10"
            >
              <Mail v-if="item.tipo === 'email'" class="h-5 w-5 text-[#5B8DEE]" />
              <MessageCircle
                v-else
                class="h-5 w-5 text-[#5B8DEE]"
              />
            </div>
            <h4 class="font-bold text-[#2D3748]">{{ item.nombre }}</h4>
            <p class="mt-1 text-sm text-[#718096] leading-relaxed">
              {{ item.descripcion }}
            </p>
            <a
              v-if="item.tipo === 'email'"
              :href="`mailto:${item.contacto}`"
              class="mt-3 inline-block text-sm font-semibold text-[#5B8DEE] hover:underline"
              >{{ item.contacto }}</a
            >
            <p
              v-else
              class="mt-3 text-sm font-semibold text-[#5B8DEE]"
            >
              {{ item.contacto }}
            </p>
          </div>
        </div>
      </div>

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
          class="inline-flex items-center gap-2 rounded-full bg-white/80 px-5 py-3 shadow-soft border border-white/80"
        >
          <Heart class="h-4 w-4 text-[#BC6C8A]" />
          <span class="text-sm text-[#4A5568]">
            Lo que sientes importa. Hablar de esto no te hace débil — te hace
            valiente.
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
