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
    cuando: "Al inicio de cada sesión, especialmente después de recreos largos, exámenes o situaciones de conflicto reciente en el grupo.",
    pasos: [
      "Saludo personalizado a cada estudiante.",
      'Pregunta del día: "¿Cómo te sientes en una palabra?"',
      "Respiración grupal (3 respiraciones profundas).",
    ],
    color: "hsl(var(--primary))",
  },
  {
    icon: Target,
    title: "Pausas Activas",
    duracion: "3-5 minutos",
    descripcion:
      "Interrupciones programadas para regular la atención y energía.",
    cuando: "Cuando notes dispersión generalizada, después de 45+ minutos de trabajo sostenido, o cuando el grupo esté visiblemente agitado o ansioso.",
    pasos: [
      "Estiramientos suaves en el lugar.",
      "Ejercicios de respiración coordinada.",
      "Juegos rápidos de atención plena.",
    ],
    color: "hsl(var(--calm))",
  },
  {
    icon: HeartHandshake,
    title: "Círculo de Confianza",
    duracion: "10-15 minutos",
    descripcion: "Espacio seguro para que los estudiantes se expresen.",
    cuando: "Tras un conflicto entre pares, cuando notes aislamiento de algún estudiante, o como cierre de semana para procesar lo vivido en el grupo.",
    pasos: [
      "Sentarse en círculo a la altura de los ojos.",
      "Objeto que da la palabra (solo quien lo tiene habla).",
      "Tema abierto o pregunta guía.",
    ],
    color: "hsl(var(--accent))",
  },
  {
    icon: BrainCircuit,
    title: "Rincón de Calma",
    duracion: "Permanente",
    descripcion: "Espacio en el aula para autorregularse.",
    cuando: "Cuando un estudiante llega alterado, después de un conflicto puntual, o cuando alguien necesita procesar algo antes de reintegrarse a la clase.",
    pasos: [
      "Ubicación tranquila y visible.",
      "Materiales: cojines, libros, crayolas.",
      "Reglas claras de uso (tiempo, cantidad de personas).",
    ],
    color: "hsl(var(--secondary))",
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
  <section id="docentes" class="py-20 lg:py-32 relative bg-background scroll-mt-24">
    <div class="absolute inset-0 z-0 opacity-[0.03]" aria-hidden="true">
      <img
        :src="bgDocentes"
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
          Para educadores
        </span>
        <h2
          class="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-[1.1]"
          style="text-wrap: balance"
        >
          Estrategias para
          <span class="text-secondary">docentes</span>.
        </h2>
        <p class="text-lg text-muted-foreground max-w-prose-reading mx-auto leading-relaxed">
          Herramientas prácticas para integrar el desarrollo socioemocional en tu
          práctica diaria de aula.
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
          class="text-2xl font-bold text-foreground mb-8 flex items-center gap-3"
        >
          <GraduationCap class="w-7 h-7 text-primary" />
          Estrategias de aula
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
              class="h-full bg-surface rounded-2xl shadow-soft hover:shadow-lift motion-safe:hover:-translate-y-1 transition-[transform,box-shadow] duration-300 border border-border/60 overflow-hidden group"
            >
              <AppCardHeader class="pb-4">
                <div class="flex items-start justify-between">
                  <div
                    class="w-12 h-12 rounded-xl flex items-center justify-center motion-safe:group-hover:scale-105 transition-transform"
                    :style="{ backgroundColor: `color-mix(in srgb, ${estrategia.color} 9%, transparent)` }"
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
                      backgroundColor: `color-mix(in srgb, ${estrategia.color} 8%, transparent)`,
                      color: estrategia.color,
                    }"
                  >
                    {{ estrategia.duracion }}
                  </AppBadge>
                </div>
                <AppCardTitle class="text-lg font-bold text-foreground mt-4">{{
                  estrategia.title
                }}</AppCardTitle>
              </AppCardHeader>
              <AppCardContent>
                <p class="text-muted-foreground text-sm mb-3 leading-relaxed">
                  {{ estrategia.descripcion }}
                </p>
                <div class="rounded-xl p-3.5 mb-3" :style="{ backgroundColor: `color-mix(in srgb, ${estrategia.color} 6%, transparent)` }">
                  <p class="text-[10px] font-bold uppercase tracking-wider mb-1.5" :style="{ color: estrategia.color }">Úsala cuando…</p>
                  <p class="text-xs text-foreground/75 leading-relaxed">{{ estrategia.cuando }}</p>
                </div>
                <div class="space-y-2">
                  <p class="text-xs font-semibold text-foreground">Pasos</p>
                  <ol class="space-y-1.5">
                    <li
                      v-for="(paso, i) in estrategia.pasos"
                      :key="i"
                      class="text-sm text-muted-foreground flex items-start gap-2 leading-relaxed"
                    >
                      <span
                        class="font-semibold tabular-nums"
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
          class="text-2xl font-bold text-foreground mb-8 flex items-center gap-3"
        >
          <Users class="w-7 h-7 text-accent" />
          Actividades socioemocionales
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            v-for="(actividad, index) in actividades"
            :key="actividad.titulo"
            v-motion
            :initial="{ opacity: 0, scale: 0.95 }"
            :visibleOnce="{
              opacity: 1,
              scale: 1,
              transition: { duration: 500, delay: 500 + index * 100 },
            }"
          >
            <AppCard
              class="h-full bg-surface rounded-2xl shadow-soft hover:shadow-lift motion-safe:hover:-translate-y-0.5 transition-[transform,box-shadow] duration-300 border border-border/60"
            >
              <AppCardHeader class="pb-3">
                <AppCardTitle class="text-base font-bold text-foreground">{{
                  actividad.titulo
                }}</AppCardTitle>
              </AppCardHeader>
              <AppCardContent class="space-y-3">
                <p class="text-sm text-muted-foreground leading-relaxed">
                  {{ actividad.descripcion }}
                </p>
                <div class="pt-3 border-t border-border/60 space-y-1">
                  <p class="text-xs text-muted-foreground">
                    <strong class="text-foreground/75">Materiales:</strong> {{ actividad.materiales }}
                  </p>
                  <p class="text-xs text-muted-foreground">
                    <strong class="text-foreground/75">Tiempo:</strong> {{ actividad.tiempo }}
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
          class="bg-surface rounded-2xl p-6 shadow-soft border border-border/60"
        >
          <div class="flex items-center gap-3 mb-4">
            <div
              class="w-10 h-10 rounded-xl bg-secondary/15 flex items-center justify-center"
            >
              <component :is="recurso.icon" class="w-5 h-5 text-secondary" />
            </div>
            <h4 class="font-bold text-foreground">{{ recurso.titulo }}</h4>
          </div>
          <ul class="space-y-2">
            <li
              v-for="(item, i) in recurso.items"
              :key="i"
              class="text-sm text-muted-foreground flex items-center gap-2.5 leading-relaxed"
            >
              <div class="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
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
        class="mt-16 text-center max-w-3xl mx-auto"
      >
        <figure class="rounded-3xl p-8 sm:p-10 bg-primary/[0.05] border border-primary/15">
          <blockquote class="text-lg sm:text-xl text-foreground italic leading-relaxed" style="text-wrap: balance">
            El mejor regalo que puedes darle a tus estudiantes no es solo conocimiento;
            son también las herramientas para gestionar sus emociones y construir
            relaciones saludables.
          </blockquote>
        </figure>
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
        class="mt-12 rounded-3xl border border-border/60 bg-surface-warm/60 p-6 sm:p-8"
      >
        <p
          class="text-[10px] font-bold text-secondary uppercase tracking-wider mb-2 text-center"
        >
          Sobre este proyecto
        </p>
        <h3 class="text-xl font-bold text-foreground text-center mb-7" style="text-wrap: balance">
          Una herramienta con 4 funciones clave
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="rounded-2xl bg-surface p-5 shadow-soft border border-border/40 text-center">
            <div class="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <BookOpen class="w-6 h-6 text-primary" />
            </div>
            <p class="font-semibold text-foreground text-sm mb-1.5">Educativa</p>
            <p class="text-xs text-muted-foreground leading-relaxed">
              Refuerza los contenidos de los talleres sobre autoconciencia,
              autorregulación, empatía y habilidades sociales.
            </p>
          </div>
          <div class="rounded-2xl bg-surface p-5 shadow-soft border border-border/40 text-center">
            <div class="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-3">
              <Shield class="w-6 h-6 text-accent" />
            </div>
            <p class="font-semibold text-foreground text-sm mb-1.5">Preventiva</p>
            <p class="text-xs text-muted-foreground leading-relaxed">
              Previene conflictos, desmotivación y aislamiento. Alineada con la
              <strong class="text-foreground/85">Ley 1620 de 2013</strong> de convivencia escolar.
            </p>
          </div>
          <div class="rounded-2xl bg-surface p-5 shadow-soft border border-border/40 text-center">
            <div class="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-3">
              <HeartHandshake class="w-6 h-6 text-secondary" />
            </div>
            <p class="font-semibold text-foreground text-sm mb-1.5">Acompañamiento</p>
            <p class="text-xs text-muted-foreground leading-relaxed">
              Amplía el acompañamiento grupal con tests, guías y actividades de
              reflexión accesibles en todo momento.
            </p>
          </div>
          <div class="rounded-2xl bg-surface p-5 shadow-soft border border-border/40 text-center">
            <div class="w-12 h-12 rounded-2xl bg-calm/20 flex items-center justify-center mx-auto mb-3">
              <GraduationCap class="w-6 h-6 text-primary" />
            </div>
            <p class="font-semibold text-foreground text-sm mb-1.5">Institucional</p>
            <p class="text-xs text-muted-foreground leading-relaxed">
              Apoya el PEI y se articula con la misión del colegio y la
              <strong class="text-foreground/85">Ley 2383 de 2024</strong> de educación socioemocional.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
