<script setup lang="ts">
import { ref } from "vue";
import {
  GraduationCap,
  Clock,
  Users,
  BookOpen,
  Lightbulb,
  Target,
  HeartHandshake,
  BrainCircuit,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Shield,
} from "lucide-vue-next";
import bgDocentes from "@/img/estudiantes_video_educativo.jpeg";
import DiagramaDocente from "./docentes/DiagramaDocente.vue";

// ── Mini-quiz ──────────────────────────────────────────────────────────────
const quizRespuesta = ref<string | null>(null);
const quizOpciones = [
  {
    valor: "nada",
    label: "Nada todavía",
    mensaje: "Es normal. Integrar lo socioemocional parece un extra, pero las estrategias de esta sección duran 3-10 minutos y transforman el clima del aula. Empieza con la rutina de bienvenida mañana.",
    color: "hsl(var(--secondary))",
  },
  {
    valor: "algunos",
    label: "Algunos momentos",
    mensaje: "Estás en el camino. Los momentos que ya dedicas tienen impacto real aunque no los midas. Revisa las estrategias de Pausas Activas y Rincón de Calma para extender ese espacio.",
    color: "hsl(var(--primary))",
  },
  {
    valor: "siempre",
    label: "Todos los días",
    mensaje: "Eso hace la diferencia. Los grupos con rituales emocionales diarios muestran mejor clima y más atención. Las actividades y recursos de aquí pueden profundizar lo que ya haces.",
    color: "hsl(var(--calm))",
  },
];

// ── Stepper de estrategias ─────────────────────────────────────────────────
const estrategiaIdx = ref(0);
const estrategias = [
  {
    icon: Clock,
    title: "¿Cómo empezar la clase conectando emocionalmente?",
    duracion: "5 min",
    descripcion: "Inicia la clase con una actividad breve de conexión emocional.",
    cuando: "Al inicio de cada sesión, especialmente después de recreos largos, exámenes o situaciones de conflicto reciente en el grupo.",
    pasos: [
      "Saludo personalizado a cada estudiante al entrar.",
      'Pregunta del día: "¿Cómo te sientes en una palabra?"',
      "Respiración grupal (3 respiraciones profundas sincronizadas).",
    ],
    resultado: "Los estudiantes llegan al contenido más centrados. Reduces los primeros 10 minutos de dispersión.",
    color: "hsl(var(--primary))",
  },
  {
    icon: Target,
    title: "¿Cuándo y cómo hacer una pausa activa?",
    duracion: "3-5 min",
    descripcion: "Interrupciones programadas para regular la atención y energía.",
    cuando: "Cuando notes dispersión generalizada, después de 45+ minutos de trabajo sostenido, o cuando el grupo esté visiblemente agitado.",
    pasos: [
      "Estiramientos suaves en el lugar (cuello, hombros, manos).",
      "Ejercicios de respiración coordinada con el grupo.",
      "Juego rápido de atención: nombrar colores, seguir instrucciones simples.",
    ],
    resultado: "La atención se restablece. Los estudiantes regresan al trabajo con más energía y menos errores.",
    color: "hsl(var(--calm))",
  },
  {
    icon: HeartHandshake,
    title: "¿Cómo crear un círculo de confianza en el aula?",
    duracion: "10-15 min",
    descripcion: "Espacio seguro para que los estudiantes se expresen.",
    cuando: "Tras un conflicto entre pares, cuando notes aislamiento de algún estudiante, o como cierre de semana.",
    pasos: [
      "Sentarse en círculo a la misma altura (quitar jerarquía visual).",
      "Objeto que da la palabra: solo quien lo sostiene habla.",
      "Tema abierto o pregunta guía según el momento del grupo.",
    ],
    resultado: "Mejora el vínculo grupal. Los conflictos se procesan antes de escalar. Los estudiantes se sienten escuchados.",
    color: "hsl(var(--accent))",
  },
  {
    icon: BrainCircuit,
    title: "¿Cómo implementar un rincón de calma?",
    duracion: "Permanente",
    descripcion: "Espacio en el aula para que un estudiante se autorregule sin interrumpir la clase.",
    cuando: "Cuando un estudiante llega alterado, después de un conflicto puntual, o cuando alguien necesita un momento antes de reintegrarse.",
    pasos: [
      "Ubicación tranquila, visible pero sin protagonismo.",
      "Materiales: cojín, fichas de emociones, cuaderno, crayolas.",
      "Reglas claras y acordadas con el grupo: tiempo máximo, una persona a la vez.",
    ],
    resultado: "Los estudiantes aprenden a auto-regular antes de que el docente deba intervenir. Bajan los conflictos reactivos.",
    color: "hsl(var(--secondary))",
  },
];

const estrategiaActual = () => estrategias[estrategiaIdx.value];

// ── Accordion de actividades ───────────────────────────────────────────────
const actividadAbierta = ref<string | null>(null);
const actividades = [
  {
    titulo: "El Árbol de las Emociones",
    descripcion: "Los estudiantes dibujan un árbol donde cada rama representa una emoción vivida recientemente.",
    materiales: "Hojas grandes, colores, marcadores",
    tiempo: "20 minutos",
    resultado: "Los estudiantes identifican y nombran emociones con mayor precisión. Sirve de diagnóstico grupal para el docente.",
  },
  {
    titulo: "Mensajes Positivos",
    descripcion: "Los estudiantes escriben mensajes anónimos de aprecio a sus compañeros.",
    materiales: "Papeles de colores, caja decorada",
    tiempo: "15 minutos",
    resultado: "Mejora el clima grupal y la autoestima. Los estudiantes que reciben mensajes suelen abrirse más en clase.",
  },
  {
    titulo: "Role-playing de Conflictos",
    descripcion: "Escenificación de situaciones conflictivas con soluciones alternativas.",
    materiales: "Tarjetas con escenarios preparados",
    tiempo: "25 minutos",
    resultado: "Los estudiantes practican resolución sin estar bajo presión real. Desarrollan empatía al asumir roles distintos.",
  },
  {
    titulo: "Diario de Gratitud",
    descripcion: "Registro diario de 3 cosas por las que están agradecidos, con una frase corta de contexto.",
    materiales: "Cuadernos o hojas pequeñas",
    tiempo: "10 minutos diarios",
    resultado: "En 2 semanas mejora el estado de ánimo general. El grupo empieza a notar cosas positivas que antes ignoraba.",
  },
];

// ── Recursos ───────────────────────────────────────────────────────────────
const recursoAbierto = ref<string | null>(null);
const recursos = [
  {
    icon: BookOpen,
    titulo: "Lecturas",
    items: [
      { label: "Inteligencia Emocional", detalle: "Daniel Goleman — el texto fundacional del campo. Capítulo 1-3 para comenzar." },
      { label: "Educar las Emociones", detalle: "Amanda Céspedes — enfocado en niños y adolescentes en contexto latinoamericano." },
      { label: "La Mente de los Niños", detalle: "Daniel Siegel — neurociencia del desarrollo emocional. Muy práctico." },
    ],
  },
  {
    icon: Lightbulb,
    titulo: "Herramientas digitales",
    items: [
      { label: "Calm for Schools", detalle: "App de mindfulness con guías para docentes y estudiantes. Versión gratuita disponible." },
      { label: "ClassDojo", detalle: "Plataforma que incluye actividades de bienestar emocional para el aula." },
      { label: "Symbaloo SEL", detalle: "Colección de recursos digitales curados de aprendizaje socioemocional." },
    ],
  },
];
</script>

<template>
  <section id="docentes" class="py-20 lg:py-32 relative bg-background scroll-mt-24">
    <div class="absolute inset-0 z-0 opacity-[0.03]" aria-hidden="true">
      <img :src="bgDocentes" alt="" class="w-full h-full object-cover grayscale" />
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

      <!-- Header -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800 } }"
        class="text-center mb-12 max-w-3xl mx-auto"
      >
        <span class="inline-block px-3.5 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-semibold uppercase tracking-wider mb-5">
          Para educadores
        </span>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-[1.1]" style="text-wrap: balance">
          Estrategias para <span class="text-secondary">docentes</span>.
        </h2>
        <p class="text-lg text-muted-foreground max-w-prose-reading mx-auto leading-relaxed">
          Herramientas prácticas para integrar el desarrollo socioemocional en la práctica diaria de aula.
        </p>
      </div>

      <!-- Mini-quiz -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 700 } }"
        class="mb-20 max-w-2xl mx-auto"
      >
        <div class="rounded-3xl border border-border/60 bg-surface p-6 sm:p-7 shadow-soft">
          <p class="text-sm font-semibold text-foreground mb-1">Una pregunta rápida</p>
          <h3 class="text-lg font-bold text-foreground mb-5" style="text-wrap: balance">
            ¿Cuánto tiempo dedicas a las emociones en el aula esta semana?
          </h3>
          <div v-if="!quizRespuesta" class="flex flex-col sm:flex-row gap-3">
            <button
              v-for="op in quizOpciones"
              :key="op.valor"
              class="flex-1 rounded-2xl border-2 border-border/60 bg-background px-4 py-3 text-sm font-medium text-foreground hover:border-secondary hover:bg-secondary/5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              @click="quizRespuesta = op.valor"
            >
              {{ op.label }}
            </button>
          </div>
          <Transition name="quiz-fade">
            <div v-if="quizRespuesta" class="rounded-2xl p-4" :style="{ backgroundColor: quizOpciones.find(o => o.valor === quizRespuesta)?.color + '12' }">
              <p class="text-sm text-foreground/85 leading-relaxed mb-3">
                {{ quizOpciones.find(o => o.valor === quizRespuesta)?.mensaje }}
              </p>
              <button
                class="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
                @click="quizRespuesta = null"
              >
                Cambiar respuesta
              </button>
            </div>
          </Transition>
        </div>
      </div>

      <!-- Stepper de estrategias -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800, delay: 100 } }"
        class="mb-20"
      >
        <h3 class="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
          <GraduationCap class="w-7 h-7 text-primary" />
          Estrategias de aula
        </h3>

        <!-- Step indicators -->
        <div class="flex gap-2 mb-6">
          <button
            v-for="(e, i) in estrategias"
            :key="e.title"
            class="flex-1 h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            :class="i === estrategiaIdx ? 'bg-primary' : 'bg-border hover:bg-border/80'"
            :aria-label="`Ir a estrategia ${i + 1}: ${e.title}`"
            @click="estrategiaIdx = i"
          />
        </div>

        <div class="rounded-3xl border border-border/60 bg-surface shadow-soft overflow-hidden">
          <Transition name="strat-slide" mode="out-in">
            <div :key="estrategiaIdx" class="p-6 sm:p-8">
              <!-- Header -->
              <div class="flex items-start gap-4 mb-6">
                <div
                  class="flex h-14 w-14 items-center justify-center rounded-2xl flex-shrink-0"
                  :style="{ backgroundColor: estrategiaActual().color + '18' }"
                >
                  <component :is="estrategiaActual().icon" class="w-7 h-7" :style="{ color: estrategiaActual().color }" />
                </div>
                <div class="flex-1">
                  <div class="flex items-center gap-3 mb-1">
                    <span class="text-xs font-semibold text-muted-foreground">{{ estrategiaIdx + 1 }} / {{ estrategias.length }}</span>
                    <span
                      class="inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold"
                      :style="{ backgroundColor: estrategiaActual().color + '18', color: estrategiaActual().color }"
                    >{{ estrategiaActual().duracion }}</span>
                  </div>
                  <h4 class="text-xl font-bold text-foreground">{{ estrategiaActual().title }}</h4>
                  <p class="text-muted-foreground text-sm mt-1 leading-relaxed">{{ estrategiaActual().descripcion }}</p>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <!-- Cuándo -->
                <div class="rounded-2xl bg-background p-4 border border-border/60">
                  <p class="text-xs font-bold uppercase tracking-wider mb-2" :style="{ color: estrategiaActual().color }">Úsala cuando</p>
                  <p class="text-sm text-foreground/80 leading-relaxed">{{ estrategiaActual().cuando }}</p>
                </div>
                <!-- Pasos -->
                <div class="rounded-2xl bg-background p-4 border border-border/60">
                  <p class="text-xs font-bold uppercase tracking-wider mb-2" :style="{ color: estrategiaActual().color }">Pasos</p>
                  <ol class="space-y-1.5">
                    <li v-for="(paso, i) in estrategiaActual().pasos" :key="i" class="flex items-start gap-2 text-sm text-foreground/80">
                      <span class="font-bold flex-shrink-0 tabular-nums" :style="{ color: estrategiaActual().color }">{{ i + 1 }}.</span>
                      {{ paso }}
                    </li>
                  </ol>
                </div>
                <!-- Resultado -->
                <div class="rounded-2xl p-4" :style="{ backgroundColor: estrategiaActual().color + '10', borderColor: estrategiaActual().color + '25' }" style="border-width: 1px; border-style: solid;">
                  <p class="text-xs font-bold uppercase tracking-wider mb-2" :style="{ color: estrategiaActual().color }">Resultado esperado</p>
                  <p class="text-sm text-foreground/80 leading-relaxed">{{ estrategiaActual().resultado }}</p>
                </div>
              </div>

              <!-- Navigation -->
              <div class="flex items-center justify-between">
                <button
                  class="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  :disabled="estrategiaIdx === 0"
                  @click="estrategiaIdx--"
                >
                  <ChevronLeft class="w-4 h-4" /> Anterior
                </button>
                <span class="text-xs text-muted-foreground">{{ estrategiaActual().title }}</span>
                <button
                  class="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  :disabled="estrategiaIdx === estrategias.length - 1"
                  @click="estrategiaIdx++"
                >
                  Siguiente <ChevronRight class="w-4 h-4" />
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </div>

      <!-- 2-column: Actividades + Recursos -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800, delay: 200 } }"
        class="mb-20"
      >
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Actividades -->
          <div>
            <h3 class="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Users class="w-7 h-7 text-accent" />
              Actividades
            </h3>
            <div class="space-y-3">
              <div
                v-for="act in actividades"
                :key="act.titulo"
                class="rounded-2xl border border-border/60 bg-surface overflow-hidden"
              >
                <button
                  class="w-full flex items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-2xl"
                  :aria-expanded="actividadAbierta === act.titulo"
                  @click="actividadAbierta = actividadAbierta === act.titulo ? null : act.titulo"
                >
                  <div class="flex items-center gap-3">
                    <span class="font-semibold text-foreground">{{ act.titulo }}</span>
                    <span class="hidden sm:inline-block text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{{ act.tiempo }}</span>
                  </div>
                  <ChevronDown
                    class="w-4 h-4 text-muted-foreground flex-shrink-0 motion-safe:transition-transform duration-300"
                    :class="actividadAbierta === act.titulo ? 'rotate-180' : ''"
                  />
                </button>
                <Transition name="accord-slide">
                  <div v-if="actividadAbierta === act.titulo" class="px-5 pb-5">
                    <div class="pt-3 border-t border-border/60 space-y-3">
                      <p class="text-sm text-muted-foreground leading-relaxed">{{ act.descripcion }}</p>
                      <div class="flex flex-wrap gap-4 text-xs text-muted-foreground">
                        <span><strong class="text-foreground/75">Materiales:</strong> {{ act.materiales }}</span>
                        <span><strong class="text-foreground/75">Tiempo:</strong> {{ act.tiempo }}</span>
                      </div>
                      <div class="rounded-xl bg-primary/[0.06] border border-primary/15 px-4 py-3">
                        <p class="text-xs font-bold uppercase tracking-wider text-primary mb-1">Resultado esperado</p>
                        <p class="text-sm text-foreground/80 leading-relaxed">{{ act.resultado }}</p>
                      </div>
                    </div>
                  </div>
                </Transition>
              </div>
            </div>
          </div>

          <!-- Recursos -->
          <div>
            <h3 class="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <BookOpen class="w-7 h-7 text-secondary" />
              Recursos
            </h3>
            <div class="space-y-6">
              <div v-for="recurso in recursos" :key="recurso.titulo">
                <p class="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <component :is="recurso.icon" class="w-4 h-4 text-secondary" />
                  {{ recurso.titulo }}
                </p>
                <div class="flex flex-wrap gap-2">
                  <div
                    v-for="item in recurso.items"
                    :key="item.label"
                    class="group"
                  >
                    <button
                      class="rounded-full border border-border px-3 py-1.5 text-sm font-medium text-foreground/80 bg-surface hover:border-secondary hover:text-secondary transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      :class="recursoAbierto === item.label ? 'border-secondary text-secondary bg-secondary/5' : ''"
                      @click="recursoAbierto = recursoAbierto === item.label ? null : item.label"
                    >
                      {{ item.label }}
                    </button>
                    <Transition name="quiz-fade">
                      <div
                        v-if="recursoAbierto === item.label"
                        class="mt-2 rounded-xl border border-secondary/20 bg-secondary/[0.06] px-4 py-3 max-w-sm"
                      >
                        <p class="text-sm text-foreground/80 leading-relaxed">{{ item.detalle }}</p>
                      </div>
                    </Transition>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Diagrama interactivo -->
      <DiagramaDocente />

      <!-- Cita de cierre -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800, delay: 400 } }"
        class="mt-16 text-center max-w-3xl mx-auto"
      >
        <figure class="rounded-3xl px-8 py-10 sm:px-12 bg-primary/[0.05] border border-primary/15">
          <blockquote class="text-lg sm:text-xl text-foreground italic leading-relaxed" style="text-wrap: balance">
            El mejor regalo que se le puede dar a los estudiantes no es solo conocimiento;
            son también las herramientas para gestionar sus emociones y construir
            relaciones saludables.
          </blockquote>
        </figure>
      </div>

      <!-- Funciones del proyecto y marco legal -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800, delay: 500 } }"
        class="mt-12 rounded-3xl border border-border/60 bg-surface p-6 sm:p-8"
      >
        <p class="text-[10px] font-bold text-secondary uppercase tracking-wider mb-2 text-center">Sobre este proyecto</p>
        <h3 class="text-xl font-bold text-foreground text-center mb-7" style="text-wrap: balance">Una herramienta con 4 funciones clave</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="rounded-2xl bg-background p-5 shadow-soft border border-border/40 text-center">
            <div class="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <BookOpen class="w-6 h-6 text-primary" />
            </div>
            <p class="font-semibold text-foreground text-sm mb-1.5">Educativa</p>
            <p class="text-xs text-muted-foreground leading-relaxed">Refuerza los contenidos de los talleres sobre autoconciencia, autorregulación, empatía y habilidades sociales.</p>
          </div>
          <div class="rounded-2xl bg-background p-5 shadow-soft border border-border/40 text-center">
            <div class="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-3">
              <Shield class="w-6 h-6 text-accent" />
            </div>
            <p class="font-semibold text-foreground text-sm mb-1.5">Preventiva</p>
            <p class="text-xs text-muted-foreground leading-relaxed">Previene conflictos y aislamiento. Alineada con la <strong class="text-foreground/85">Ley 1620 de 2013</strong> de convivencia escolar.</p>
          </div>
          <div class="rounded-2xl bg-background p-5 shadow-soft border border-border/40 text-center">
            <div class="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-3">
              <HeartHandshake class="w-6 h-6 text-secondary" />
            </div>
            <p class="font-semibold text-foreground text-sm mb-1.5">Acompañamiento</p>
            <p class="text-xs text-muted-foreground leading-relaxed">Amplía el acompañamiento grupal con tests, guías y actividades de reflexión accesibles siempre.</p>
          </div>
          <div class="rounded-2xl bg-background p-5 shadow-soft border border-border/40 text-center">
            <div class="w-12 h-12 rounded-2xl bg-calm/20 flex items-center justify-center mx-auto mb-3">
              <GraduationCap class="w-6 h-6 text-primary" />
            </div>
            <p class="font-semibold text-foreground text-sm mb-1.5">Institucional</p>
            <p class="text-xs text-muted-foreground leading-relaxed">Apoya el PEI y se articula con la <strong class="text-foreground/85">Ley 2383 de 2024</strong> de educación socioemocional.</p>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.strat-slide-enter-active,
.strat-slide-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.strat-slide-enter-from { opacity: 0; transform: translateX(12px); }
.strat-slide-leave-to { opacity: 0; transform: translateX(-12px); }

.accord-slide-enter-active,
.accord-slide-leave-active { transition: opacity 0.25s ease, max-height 0.3s ease; overflow: hidden; max-height: 400px; }
.accord-slide-enter-from, .accord-slide-leave-to { opacity: 0; max-height: 0; }

.quiz-fade-enter-active, .quiz-fade-leave-active { transition: opacity 0.2s ease; }
.quiz-fade-enter-from, .quiz-fade-leave-to { opacity: 0; }

@media (prefers-reduced-motion: reduce) {
  .strat-slide-enter-active, .strat-slide-leave-active,
  .accord-slide-enter-active, .accord-slide-leave-active,
  .quiz-fade-enter-active, .quiz-fade-leave-active { transition: none; }
}
</style>
