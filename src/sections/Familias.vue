<script setup lang="ts">
import { ref, computed } from "vue";
import {
  Heart,
  BookOpen,
  AlertTriangle,
  Users,
  Lightbulb,
  MessageSquare,
  Shield,
  CheckCircle2,
  Circle,
  Sparkles,
} from "lucide-vue-next";
import AppButton from "@/components/ui/button.vue";
import bgFamilias from "@/img/votacion_personero.jpeg";

// --- MINI-QUIZ ---
const preguntasQuiz = [
  {
    texto: "¿Con qué frecuencia hablan sobre emociones en casa?",
    opciones: [
      { label: "Casi nunca lo hacemos", score: 0 },
      { label: "Algunas veces, cuando surge la oportunidad", score: 1 },
      { label: "Tenemos espacios regulares para eso", score: 2 },
    ],
  },
  {
    texto: "Cuando tu hijo/a está triste o enojado/a, ¿qué suele pasar?",
    opciones: [
      { label: "Prefiere no hablarlo y se encierra", score: 0 },
      { label: "A veces lo comparte, depende del momento", score: 1 },
      { label: "Sabe que puede acercarse sin ser juzgado/a", score: 2 },
    ],
  },
  {
    texto: "¿Cómo te sientes acompañando emocionalmente a tu hijo/a?",
    opciones: [
      { label: "Perdido/a, no sé bien por dónde empezar", score: 0 },
      { label: "Lo intento, aunque no siempre sé si lo hago bien", score: 1 },
      { label: "Me siento preparado/a y conectado/a con él/ella", score: 2 },
    ],
  },
];

const quizRespuestas = ref<number[]>([]);
const quizFinalizado = computed(() => quizRespuestas.value.length === preguntasQuiz.length);
const quizPuntaje = computed(() => quizRespuestas.value.reduce((a, b) => a + b, 0));
const quizResultado = computed(() => {
  const p = quizPuntaje.value;
  if (p <= 2)
    return {
      nivel: "Punto de partida",
      mensaje:
        "Hay mucho espacio para crecer juntos. Dar un primer paso, por pequeño que sea, transforma la relación. Emilio puede ayudarte a encontrar estrategias concretas para tu situación.",
      colorBg: "hsl(var(--accent) / 0.1)",
      colorText: "hsl(var(--accent))",
    };
  if (p <= 4)
    return {
      nivel: "En camino",
      mensaje:
        "Vas bien. Algunas acciones cotidianas pueden profundizar la conexión con tu hijo/a. Sigue explorando lo que funciona para tu familia y refuerza lo que ya tienes.",
      colorBg: "hsl(var(--calm) / 0.1)",
      colorText: "hsl(var(--calm))",
    };
  return {
    nivel: "Base sólida",
    mensaje:
      "Tu familia tiene una base emocional fuerte. Seguir nutriendo esos espacios y hábitos marca una diferencia duradera en el desarrollo de tu hijo/a.",
    colorBg: "hsl(var(--primary) / 0.1)",
    colorText: "hsl(var(--primary))",
  };
});

function responderQuiz(score: number) {
  if (quizRespuestas.value.length < preguntasQuiz.length) {
    quizRespuestas.value = [...quizRespuestas.value, score];
  }
}

function reiniciarQuiz() {
  quizRespuestas.value = [];
}

// --- CHECKLISTS ---
const recursos = [
  {
    icon: Heart,
    title: "¿Cómo acompaño emocionalmente a mi hijo/a?",
    descripcion: "Apoya el desarrollo emocional de tu hijo/a en cada momento del día.",
    color: "hsl(var(--accent))",
    puntos: [
      "Valido las emociones de mi hijo/a sin juzgarlas.",
      "Creo espacios para conversar sin distracciones de pantallas.",
      "Soy modelo de gestión emocional saludable.",
      "Mantenemos rutinas que generan seguridad y previsibilidad.",
    ],
  },
  {
    icon: BookOpen,
    title: "¿Qué es la crianza positiva y cómo la practico?",
    descripcion: "Estrategias basadas en el respeto mutuo y el fortalecimiento de vínculos.",
    color: "hsl(var(--primary))",
    puntos: [
      "Uso refuerzos positivos específicos y concretos.",
      "Establecemos límites claros explicando el por qué.",
      "Practico la conexión antes de la corrección.",
      "Fomento la autonomía gradual acorde a su edad.",
    ],
  },
  {
    icon: AlertTriangle,
    title: "¿Qué señales debo observar en mi hijo/a?",
    descripcion: "Identifico cuándo mi hijo/a puede necesitar apoyo profesional adicional.",
    color: "hsl(var(--secondary))",
    puntos: [
      "Estoy atento/a a cambios de comportamiento sin causa obvia.",
      "Noto si hay aislamiento social o pérdida de amistades.",
      "Observo cambios en sueño o alimentación por más de 2 semanas.",
      "Escucho señales verbales de tristeza o desesperanza.",
    ],
  },
];

const checks = ref(recursos.map((r) => r.puntos.map(() => false)));

function toggleCheck(ri: number, pi: number) {
  checks.value[ri][pi] = !checks.value[ri][pi];
}

// --- CONSEJOS CON PREGUNTAS REFLEXIVAS ---
const consejosRapidos = [
  {
    icon: MessageSquare,
    titulo: "Conversaciones Diarias",
    texto: "Dedica 10 minutos al día a conversar sin distracciones sobre el día de tu hijo/a.",
    pregunta: "¿Cuándo fue la última vez que tuvieron 10 minutos sin pantallas juntos?",
    color: "hsl(var(--secondary))",
  },
  {
    icon: Shield,
    titulo: "Espacio Seguro",
    texto: "Asegúrate de que tu hogar sea un lugar donde se puedan expresar emociones sin miedo al juicio.",
    pregunta: "¿Tu hijo/a siente que puede contarte cualquier cosa sin ser juzgado/a?",
    color: "hsl(var(--calm))",
  },
  {
    icon: Lightbulb,
    titulo: "Modelado Emocional",
    texto: "Los hijos aprenden más de lo que ven que de lo que escuchan.",
    pregunta: "¿Qué ven tus hijos cuando tú atraviesas una situación difícil?",
    color: "hsl(var(--accent))",
  },
];

function hablarConEmilio() {
  window.dispatchEvent(
    new CustomEvent("emilio:open", {
      detail: {
        context:
          "Soy padre/madre y quiero apoyo para acompañar emocionalmente a mi hijo/a.",
      },
    })
  );
}
</script>

<template>
  <section
    id="familias"
    class="py-20 lg:py-32 relative bg-surface-warm scroll-mt-24"
  >
    <div class="absolute inset-0 z-0 opacity-[0.04]" aria-hidden="true">
      <img
        :src="bgFamilias"
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
          Para padres y madres
        </span>
        <h2
          class="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-[1.1]"
          style="text-wrap: balance"
        >
          Apoyo para <span class="text-accent">familias</span>.
        </h2>
        <p
          class="text-lg text-muted-foreground max-w-prose-reading mx-auto leading-relaxed"
        >
          Recursos y guías para acompañar el desarrollo socioemocional de tus
          hijos desde el hogar.
        </p>
      </div>

      <!-- Mini-quiz -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 24 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 700 } }"
        class="mb-16"
      >
        <div
          class="max-w-2xl mx-auto bg-surface rounded-2xl shadow-soft border border-border/60 overflow-hidden"
        >
          <div class="bg-accent/[0.06] px-6 py-4 border-b border-border/40">
            <p class="text-xs font-semibold uppercase tracking-wider text-accent mb-0.5">
              Mini diagnóstico
            </p>
            <h3 class="text-lg font-bold text-foreground">
              ¿Cómo vas con el acompañamiento emocional?
            </h3>
          </div>

          <div class="p-6">
            <template v-if="!quizFinalizado">
              <Transition name="quiz-q" mode="out-in">
                <div :key="quizRespuestas.length">
                  <!-- Progress bar -->
                  <div class="flex gap-1.5 mb-5">
                    <div
                      v-for="(_, i) in preguntasQuiz"
                      :key="i"
                      class="h-1 flex-1 rounded-full transition-colors duration-300"
                      :class="
                        i < quizRespuestas.length
                          ? 'bg-primary'
                          : i === quizRespuestas.length
                          ? 'bg-primary/30'
                          : 'bg-border'
                      "
                    />
                  </div>
                  <p class="text-xs text-muted-foreground mb-2">
                    Pregunta {{ quizRespuestas.length + 1 }} de
                    {{ preguntasQuiz.length }}
                  </p>
                  <p class="text-base font-medium text-foreground mb-5 leading-relaxed">
                    {{ preguntasQuiz[quizRespuestas.length].texto }}
                  </p>
                  <div class="space-y-2.5">
                    <button
                      v-for="(op, oi) in preguntasQuiz[quizRespuestas.length].opciones"
                      :key="oi"
                      class="w-full text-left px-4 py-3 rounded-xl border border-border bg-surface hover:bg-primary/[0.04] hover:border-primary/40 transition-colors duration-200 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      @click="responderQuiz(op.score)"
                    >
                      {{ op.label }}
                    </button>
                  </div>
                </div>
              </Transition>
            </template>

            <template v-else>
              <Transition name="quiz-fade" appear>
                <div>
                  <div
                    class="flex items-start gap-4 p-4 rounded-xl mb-5"
                    :style="{ backgroundColor: quizResultado.colorBg }"
                  >
                    <div
                      class="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      :style="{ backgroundColor: quizResultado.colorBg }"
                    >
                      <Sparkles
                        class="w-5 h-5"
                        :style="{ color: quizResultado.colorText }"
                      />
                    </div>
                    <div>
                      <p
                        class="font-bold text-sm mb-1"
                        :style="{ color: quizResultado.colorText }"
                      >
                        {{ quizResultado.nivel }}
                      </p>
                      <p class="text-sm text-foreground/80 leading-relaxed">
                        {{ quizResultado.mensaje }}
                      </p>
                    </div>
                  </div>
                  <div class="flex flex-col sm:flex-row gap-3">
                    <AppButton class="rounded-full flex-1" @click="hablarConEmilio">
                      Hablar con Emilio
                    </AppButton>
                    <button
                      class="px-5 py-2 rounded-full text-sm text-muted-foreground hover:text-foreground border border-border hover:border-foreground/30 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      @click="reiniciarQuiz"
                    >
                      Volver a responder
                    </button>
                  </div>
                </div>
              </Transition>
            </template>
          </div>
        </div>
      </div>

      <!-- Checklist Cards -->
      <div class="mb-16">
        <div class="text-center mb-8">
          <h3 class="text-2xl font-bold text-foreground mb-2">
            ¿Qué ya practico?
          </h3>
          <p class="text-sm text-muted-foreground max-w-md mx-auto">
            Marca lo que ya haces. Lo que quede sin marcar es tu próxima
            oportunidad de crecimiento.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <div
            v-for="(recurso, ri) in recursos"
            :key="recurso.title"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visibleOnce="{
              opacity: 1,
              y: 0,
              transition: { duration: 600, delay: ri * 150 },
            }"
            class="bg-surface rounded-2xl shadow-soft border border-border/60 overflow-hidden flex flex-col"
          >
            <!-- Card header -->
            <div class="px-6 pt-6 pb-4">
              <div
                class="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                :style="{ backgroundColor: recurso.color + ' / 0.12' }"
              >
                <component
                  :is="recurso.icon"
                  class="w-6 h-6"
                  :style="{ color: recurso.color }"
                />
              </div>
              <h4 class="font-bold text-foreground mb-1">{{ recurso.title }}</h4>
              <p class="text-sm text-muted-foreground leading-relaxed">
                {{ recurso.descripcion }}
              </p>
            </div>

            <!-- Checklist items -->
            <div class="px-4 pb-3 space-y-1 flex-1">
              <button
                v-for="(punto, pi) in recurso.puntos"
                :key="pi"
                class="w-full flex items-start gap-3 px-3 py-2.5 rounded-xl transition-colors duration-200 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring group"
                :class="
                  checks[ri][pi]
                    ? 'bg-calm/10'
                    : checks[ri].some((c) => c)
                    ? 'bg-accent/[0.05] hover:bg-accent/10'
                    : 'hover:bg-foreground/[0.03]'
                "
                @click="toggleCheck(ri, pi)"
              >
                <component
                  :is="checks[ri][pi] ? CheckCircle2 : Circle"
                  class="w-4 h-4 flex-shrink-0 mt-0.5 transition-colors duration-200"
                  :style="{
                    color: checks[ri][pi]
                      ? 'hsl(var(--calm))'
                      : 'hsl(var(--muted-foreground))',
                  }"
                />
                <span
                  class="text-sm leading-relaxed transition-colors duration-200 flex-1"
                  :class="
                    checks[ri][pi]
                      ? 'text-foreground/50 line-through'
                      : 'text-foreground/80'
                  "
                >
                  {{ punto }}
                </span>
                <span
                  v-if="!checks[ri][pi] && checks[ri].some((c) => c)"
                  class="ml-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-full flex-shrink-0 mt-0.5"
                  :style="{
                    backgroundColor: recurso.color + ' / 0.12',
                    color: recurso.color,
                  }"
                >
                  oportunidad
                </span>
              </button>
            </div>

            <!-- Progress footer -->
            <div class="px-6 pb-5 pt-2">
              <div class="h-px bg-border/40 mb-3" />
              <div class="flex items-center justify-between">
                <div class="flex-1 mr-3">
                  <div class="h-1.5 rounded-full bg-border/40 overflow-hidden">
                    <div
                      class="h-full rounded-full transition-all duration-500"
                      :style="{
                        width: `${(checks[ri].filter((c) => c).length / recurso.puntos.length) * 100}%`,
                        backgroundColor: 'hsl(var(--calm))',
                      }"
                    />
                  </div>
                </div>
                <span class="text-xs text-muted-foreground whitespace-nowrap">
                  <template v-if="checks[ri].every((c) => c)">
                    <span class="font-semibold" style="color: hsl(var(--calm))">¡Todo activo!</span>
                  </template>
                  <template v-else>
                    {{ checks[ri].filter((c) => c).length }} /
                    {{ recurso.puntos.length }}
                  </template>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Tips with reflective questions -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 700, delay: 200 } }"
        class="mb-16"
      >
        <h3
          class="text-2xl font-bold text-foreground text-center mb-8"
          style="text-wrap: balance"
        >
          Pequeñas acciones, gran impacto
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="(consejo, ci) in consejosRapidos"
            :key="consejo.titulo"
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visibleOnce="{
              opacity: 1,
              y: 0,
              transition: { duration: 500, delay: 300 + ci * 100 },
            }"
            class="bg-surface rounded-2xl p-6 shadow-soft border border-border/50 flex flex-col"
          >
            <div
              class="w-10 h-10 rounded-xl flex items-center justify-center mb-4 flex-shrink-0"
              :style="{ backgroundColor: consejo.color + ' / 0.12' }"
            >
              <component
                :is="consejo.icon"
                class="w-5 h-5"
                :style="{ color: consejo.color }"
              />
            </div>
            <h4 class="font-semibold text-foreground mb-2">
              {{ consejo.titulo }}
            </h4>
            <p class="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
              {{ consejo.texto }}
            </p>
            <div
              class="rounded-xl p-4"
              :style="{ backgroundColor: consejo.color + ' / 0.08' }"
            >
              <p
                class="text-[10px] font-semibold uppercase tracking-wider mb-2"
                :style="{ color: consejo.color }"
              >
                Para reflexionar
              </p>
              <p class="text-sm text-foreground/80 leading-relaxed italic">
                {{ consejo.pregunta }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Banner -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visibleOnce="{
          opacity: 1,
          y: 0,
          transition: { duration: 800, delay: 600 },
        }"
        class="text-center"
      >
        <div class="bg-foreground rounded-3xl p-8 lg:p-12 text-background">
          <Users class="w-12 h-12 mx-auto mb-5 text-background/85" />
          <h3
            class="text-2xl lg:text-3xl font-bold mb-4"
            style="text-wrap: balance"
          >
            ¿Necesitas más apoyo?
          </h3>
          <p
            class="text-background/80 mb-8 max-w-prose-tight mx-auto leading-relaxed"
          >
            Pedir ayuda es un signo de fortaleza. El colegio cuenta con
            profesionales dispuestos a acompañarte en el proceso de crianza.
          </p>
          <AppButton
            size="lg"
            class="rounded-full px-8 bg-background text-foreground hover:bg-background/90"
          >
            <Heart class="w-5 h-5 mr-2" />
            Contactar al colegio
          </AppButton>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.quiz-q-enter-active,
.quiz-q-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.quiz-q-enter-from {
  opacity: 0;
  transform: translateX(12px);
}
.quiz-q-leave-to {
  opacity: 0;
  transform: translateX(-12px);
}

.quiz-fade-enter-active,
.quiz-fade-leave-active {
  transition: opacity 0.25s ease;
}
.quiz-fade-enter-from,
.quiz-fade-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .quiz-q-enter-active,
  .quiz-q-leave-active,
  .quiz-fade-enter-active,
  .quiz-fade-leave-active {
    transition: none;
  }
}
</style>
