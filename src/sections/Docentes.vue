<script setup lang="ts">
import {
  GraduationCap,
  Clock,
  Users,
  BookOpen,
  Lightbulb,
  Target,
  HeartHandshake,
  BrainCircuit,
  Shield,
} from "lucide-vue-next";
import AppCard from "@/components/ui/card.vue";
import AppCardHeader from "@/components/ui/card-header.vue";
import AppCardTitle from "@/components/ui/card-title.vue";
import AppCardContent from "@/components/ui/card-content.vue";
import AppBadge from "@/components/ui/badge.vue";
import bgDocentes from "@/img/estudiantes_video_educativo.jpeg";

const estrategias = [
  {
    icon: Clock,
    title: "Rutina de Bienvenida",
    duracion: "5 minutos",
    descripcion:
      "Inicia la clase con una actividad breve de conexión emocional.",
    pasos: [
      "Saludo personalizado a cada estudiante.",
      'Pregunta del día: "¿Cómo te sientes en una palabra?"',
      "Respiración grupal (3 respiraciones profundas).",
    ],
    color: "#5B8DEE",
  },
  {
    icon: Target,
    title: "Pausas Activas",
    duracion: "3-5 minutos",
    descripcion:
      "Interrupciones programadas para regular la atención y energía.",
    pasos: [
      "Estiramientos suaves en el lugar.",
      "Ejercicios de respiración coordinada.",
      "Juegos rápidos de atención plena.",
    ],
    color: "#81E6D9",
  },
  {
    icon: HeartHandshake,
    title: "Círculo de Confianza",
    duracion: "10-15 minutos",
    descripcion: "Espacio seguro para que los estudiantes se expresen.",
    pasos: [
      "Sentarse en círculo a la altura de los ojos.",
      "Objeto que da la palabra (solo quien lo tiene habla).",
      "Tema abierto o pregunta guía.",
    ],
    color: "#BC6C8A",
  },
  {
    icon: BrainCircuit,
    title: "Rincón de Calma",
    duracion: "Permanente",
    descripcion: "Espacio en el aula para autorregularse.",
    pasos: [
      "Ubicación tranquila y visible.",
      "Materiales: cojines, libros, crayolas.",
      "Reglas claras de uso (tiempo, cantidad de personas).",
    ],
    color: "#F4A259",
  },
];

const actividades = [
  {
    titulo: "El Árbol de las Emociones",
    descripcion:
      "Los estudiantes dibujan un árbol donde cada rama representa una emoción vivida recientemente.",
    materiales: "Hojas grandes, colores, marcadores",
    tiempo: "20 minutos",
  },
  {
    titulo: "Mensajes Positivos",
    descripcion:
      "Los estudiantes escriben mensajes anónimos de aprecio a sus compañeros.",
    materiales: "Papeles de colores, caja decorada",
    tiempo: "15 minutos",
  },
  {
    titulo: "Role-playing de Conflictos",
    descripcion:
      "Escenificación de situaciones conflictivas con soluciones alternativas.",
    materiales: "Tarjetas con escenarios",
    tiempo: "25 minutos",
  },
  {
    titulo: "Diario de Gratitud",
    descripcion: "Registro diario de 3 cosas por las que están agradecidos.",
    materiales: "Cuadernos o hojas",
    tiempo: "10 minutos diarios",
  },
];

const recursos = [
  {
    icon: BookOpen,
    titulo: "Lecturas Recomendadas",
    items: [
      "Inteligencia Emocional - Daniel Goleman",
      "Educar las Emociones - Amanda Céspedes",
      "La Mente de los Niños - Daniel Siegel",
    ],
  },
  {
    icon: Lightbulb,
    titulo: "Herramientas Digitales",
    items: [
      "Apps de mindfulness para niños",
      "Plataformas de educación emocional",
      "Videos educativos sobre emociones",
    ],
  },
];
</script>

<template>
  <section id="docentes" class="py-20 lg:py-32 relative bg-[#FEFBF7]">
    <div class="absolute inset-0 z-0 opacity-[0.03]">
      <img
        :src="bgDocentes"
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
          class="inline-block px-4 py-2 rounded-full bg-[#F4A259]/10 text-[#F4A259] text-sm font-semibold mb-4"
        >
          Para Educadores
        </span>
        <h2
          class="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D3748] mb-6"
        >
          Estrategias para&nbsp;
          <span
            class="bg-gradient-to-r from-[#F4A259] to-[#5B8DEE] bg-clip-text text-transparent"
          >
            Docentes
          </span>
        </h2>
        <p class="text-lg text-[#718096] max-w-2xl mx-auto">
          Herramientas prácticas para integrar el desarrollo socioemocional en
          tu práctica diaria de aula.
        </p>
      </div>

      <!-- Classroom Strategies -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visibleOnce="{
          opacity: 1,
          y: 0,
          transition: { duration: 800, delay: 200 },
        }"
        class="mb-16"
      >
        <h3
          class="text-2xl font-bold text-[#2D3748] mb-8 flex items-center gap-3"
        >
          <GraduationCap class="w-8 h-8 text-[#5B8DEE]" />
          Estrategias de Aula
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="(estrategia, index) in estrategias"
            :key="estrategia.title"
            v-motion
            :initial="{ opacity: 0, x: -20 }"
            :visibleOnce="{
              opacity: 1,
              x: 0,
              transition: { duration: 500, delay: 300 + index * 100 },
            }"
          >
            <AppCard
              class="h-full bg-white rounded-2xl shadow-soft hover:shadow-hover transition-all duration-300 border-none overflow-hidden group"
            >
              <AppCardHeader class="pb-4">
                <div class="flex items-start justify-between">
                  <div
                    class="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                    :style="{ backgroundColor: estrategia.color + '15' }"
                  >
                    <component
                      :is="estrategia.icon"
                      class="w-6 h-6"
                      :style="{ color: estrategia.color }"
                    />
                  </div>
                  <AppBadge
                    variant="secondary"
                    class="rounded-full"
                    :style="{
                      backgroundColor: estrategia.color + '15',
                      color: estrategia.color,
                    }"
                  >
                    {{ estrategia.duracion }}
                  </AppBadge>
                </div>
                <AppCardTitle class="text-lg font-bold text-[#2D3748] mt-4">{{
                  estrategia.title
                }}</AppCardTitle>
              </AppCardHeader>
              <AppCardContent>
                <p class="text-[#718096] text-sm mb-4">
                  {{ estrategia.descripcion }}
                </p>
                <div class="space-y-2">
                  <p class="text-xs font-semibold text-[#2D3748]">Pasos:</p>
                  <ol class="space-y-1">
                    <li
                      v-for="(paso, i) in estrategia.pasos"
                      :key="i"
                      class="text-sm text-[#718096] flex items-start gap-2"
                    >
                      <span
                        class="font-semibold"
                        :style="{ color: estrategia.color }"
                        >{{ i + 1 }}.</span
                      >
                      {{ paso }}
                    </li>
                  </ol>
                </div>
              </AppCardContent>
            </AppCard>
          </div>
        </div>
      </div>

      <!-- Activities -->
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
        <h3
          class="text-2xl font-bold text-[#2D3748] mb-8 flex items-center gap-3"
        >
          <Users class="w-8 h-8 text-[#BC6C8A]" />
          Actividades Socioemocionales
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            v-for="(actividad, index) in actividades"
            :key="actividad.titulo"
            v-motion
            :initial="{ opacity: 0, scale: 0.9 }"
            :visibleOnce="{
              opacity: 1,
              scale: 1,
              transition: { duration: 500, delay: 500 + index * 100 },
            }"
          >
            <AppCard
              class="h-full bg-white rounded-2xl shadow-soft hover:shadow-hover transition-all duration-300 border-none"
            >
              <AppCardHeader class="pb-3">
                <AppCardTitle class="text-base font-bold text-[#2D3748]">{{
                  actividad.titulo
                }}</AppCardTitle>
              </AppCardHeader>
              <AppCardContent class="space-y-3">
                <p class="text-sm text-[#718096]">
                  {{ actividad.descripcion }}
                </p>
                <div class="pt-3 border-t border-gray-100 space-y-1">
                  <p class="text-xs text-[#718096]">
                    <strong>Materiales:</strong> {{ actividad.materiales }}
                  </p>
                  <p class="text-xs text-[#718096]">
                    <strong>Tiempo:</strong> {{ actividad.tiempo }}
                  </p>
                </div>
              </AppCardContent>
            </AppCard>
          </div>
        </div>
      </div>

      <!-- Additional Resources -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visibleOnce="{
          opacity: 1,
          y: 0,
          transition: { duration: 800, delay: 600 },
        }"
        class="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div
          v-for="recurso in recursos"
          :key="recurso.titulo"
          class="bg-white rounded-2xl p-6 shadow-soft"
        >
          <div class="flex items-center gap-3 mb-4">
            <div
              class="w-10 h-10 rounded-xl bg-[#F4A259]/15 flex items-center justify-center"
            >
              <component :is="recurso.icon" class="w-5 h-5 text-[#F4A259]" />
            </div>
            <h4 class="font-bold text-[#2D3748]">{{ recurso.titulo }}</h4>
          </div>
          <ul class="space-y-2">
            <li
              v-for="(item, i) in recurso.items"
              :key="i"
              class="text-sm text-[#718096] flex items-center gap-2"
            >
              <div class="w-1.5 h-1.5 rounded-full bg-[#F4A259]" />
              {{ item }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Closing quote -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visibleOnce="{
          opacity: 1,
          y: 0,
          transition: { duration: 800, delay: 800 },
        }"
        class="mt-16 text-center"
      >
        <div class="bg-[#5B8DEE]/5 rounded-2xl p-8">
          <p class="text-lg text-[#2D3748] italic">
            "El mejor regalo que puedes dar a tus estudiantes no es solo
            conocimiento, sino también las herramientas para gestionar sus
            emociones y construir relaciones saludables."
          </p>
        </div>
      </div>

      <!-- Funciones del proyecto y marco legal -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visibleOnce="{
          opacity: 1,
          y: 0,
          transition: { duration: 800, delay: 900 },
        }"
        class="mt-12 rounded-3xl border border-[#F4A259]/20 bg-gradient-to-br from-[#FEFBF7] to-white p-6 sm:p-8"
      >
        <p
          class="text-xs font-semibold text-[#F4A259] uppercase tracking-wide mb-2 text-center"
        >
          Sobre este proyecto
        </p>
        <h3 class="text-xl font-bold text-[#2D3748] text-center mb-6">
          Una herramienta con 4 funciones clave
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="rounded-2xl bg-white p-5 shadow-soft text-center">
            <div
              class="w-12 h-12 rounded-2xl bg-[#5B8DEE]/10 flex items-center justify-center mx-auto mb-3"
            >
              <BookOpen class="w-6 h-6 text-[#5B8DEE]" />
            </div>
            <p class="font-semibold text-[#2D3748] text-sm mb-1">Educativa</p>
            <p class="text-xs text-[#718096] leading-relaxed">
              Refuerza los contenidos de los talleres sobre autoconciencia,
              autorregulación, empatía y habilidades sociales.
            </p>
          </div>
          <div class="rounded-2xl bg-white p-5 shadow-soft text-center">
            <div
              class="w-12 h-12 rounded-2xl bg-[#BC6C8A]/10 flex items-center justify-center mx-auto mb-3"
            >
              <Shield class="w-6 h-6 text-[#BC6C8A]" />
            </div>
            <p class="font-semibold text-[#2D3748] text-sm mb-1">Preventiva</p>
            <p class="text-xs text-[#718096] leading-relaxed">
              Previene conflictos, desmotivación y aislamiento. Alineada con la
              <strong>Ley 1620 de 2013</strong> de convivencia escolar.
            </p>
          </div>
          <div class="rounded-2xl bg-white p-5 shadow-soft text-center">
            <div
              class="w-12 h-12 rounded-2xl bg-[#F4A259]/10 flex items-center justify-center mx-auto mb-3"
            >
              <HeartHandshake class="w-6 h-6 text-[#F4A259]" />
            </div>
            <p class="font-semibold text-[#2D3748] text-sm mb-1">
              Acompañamiento
            </p>
            <p class="text-xs text-[#718096] leading-relaxed">
              Amplía el acompañamiento grupal con test, guías y actividades de
              reflexión accesibles en todo momento.
            </p>
          </div>
          <div class="rounded-2xl bg-white p-5 shadow-soft text-center">
            <div
              class="w-12 h-12 rounded-2xl bg-[#81E6D9]/20 flex items-center justify-center mx-auto mb-3"
            >
              <GraduationCap class="w-6 h-6 text-[#5B8DEE]" />
            </div>
            <p class="font-semibold text-[#2D3748] text-sm mb-1">
              Institucional
            </p>
            <p class="text-xs text-[#718096] leading-relaxed">
              Apoya el PEI y se articula con la misión del colegio y la
              <strong>Ley 2383 de 2024</strong> de educación socioemocional.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
