<script setup lang="ts">
import { computed, ref } from "vue";
import { Smile, RefreshCw, Sparkles, ChevronRight } from "lucide-vue-next";
import AppButton from "@/components/ui/button.vue";

const preguntas = [
  {
    pregunta: "¿Cómo te sientes al despertar?",
    opciones: [
      { emoji: "😊", texto: "Con energía y optimismo", valor: "alegria" },
      { emoji: "😴", texto: "Cansado/a pero tranquilo/a", valor: "calma" },
      { emoji: "😰", texto: "Ansioso/a o preocupado/a", valor: "ansiedad" },
      { emoji: "😤", texto: "Irritable o molesto/a", valor: "ira" },
    ],
  },
  {
    pregunta: "Cuando enfrentas un problema, tú...",
    opciones: [
      { emoji: "🤔", texto: "Busco soluciones calmadamente", valor: "calma" },
      { emoji: "😤", texto: "Me frustro rápidamente", valor: "ira" },
      { emoji: "🤝", texto: "Pido ayuda a otros", valor: "conexion" },
      { emoji: "😔", texto: "Me siento abrumado/a", valor: "tristeza" },
    ],
  },
  {
    pregunta: "En una reunión social, tú...",
    opciones: [
      { emoji: "🎉", texto: "Disfruto conociendo gente", valor: "alegria" },
      { emoji: "👂", texto: "Prefiero escuchar y observar", valor: "calma" },
      { emoji: "😰", texto: "Me siento incómodo/a", valor: "ansiedad" },
      { emoji: "💝", texto: "Me conecto profundamente", valor: "conexion" },
    ],
  },
  {
    pregunta: "¿Qué necesitas más en este momento?",
    opciones: [
      { emoji: "⚡", texto: "Energía y motivación", valor: "alegria" },
      { emoji: "🧘", texto: "Paz y tranquilidad", valor: "calma" },
      { emoji: "🤗", texto: "Apoyo y comprensión", valor: "conexion" },
      { emoji: "💪", texto: "Fuerza para seguir", valor: "ira" },
    ],
  },
];

const resultados: Record<
  string,
  { titulo: string; descripcion: string; consejo: string; color: string }
> = {
  alegria: {
    titulo: "Alegría",
    descripcion: "Estás en un estado positivo y energético.",
    consejo:
      "Aprovecha esta energía para compartirla con otros y trabajar en tus metas.",
    color: "#F6E05E",
  },
  calma: {
    titulo: "Calma",
    descripcion: "Te encuentras en equilibrio y serenidad.",
    consejo: "Mantén esta paz interior practicando mindfulness o meditación.",
    color: "#81E6D9",
  },
  ansiedad: {
    titulo: "Ansiedad",
    descripcion: "Sientes inquietud o preocupación.",
    consejo:
      "Practica respiración profunda y divide tus tareas en pasos pequeños.",
    color: "#B794F4",
  },
  ira: {
    titulo: "Ira o Frustración",
    descripcion: "Hay algo que te está afectando negativamente.",
    consejo:
      "Tómate un momento, respira y expresa tus sentimientos de manera asertiva.",
    color: "#F6AD55",
  },
  tristeza: {
    titulo: "Tristeza",
    descripcion: "Te sientes decaído o apagado.",
    consejo:
      "Es válido sentir así. Habla con alguien de confianza sobre tus emociones.",
    color: "#90CDF4",
  },
  conexion: {
    titulo: "Conexión",
    descripcion: "Buscas cercanía con los demás.",
    consejo: "Contacta a un amigo o familiar. Las relaciones nos fortalecen.",
    color: "#BC6C8A",
  },
};

const preguntaActual = ref(0);
const respuestas = ref<string[]>([]);
const mostrarResultado = ref(false);

const progreso = computed(
  () => ((preguntaActual.value + 1) / preguntas.length) * 100,
);

const resultadoActual = computed(() => {
  if (!mostrarResultado.value || respuestas.value.length === 0) return null;

  const conteo: Record<string, number> = {};
  respuestas.value.forEach((r) => {
    conteo[r] = (conteo[r] || 0) + 1;
  });

  const clave = Object.entries(conteo).sort((a, b) => b[1] - a[1])[0][0];
  return resultados[clave];
});

function handleRespuesta(valor: string) {
  respuestas.value.push(valor);
  if (preguntaActual.value < preguntas.length - 1) {
    preguntaActual.value++;
  } else {
    mostrarResultado.value = true;
  }
}

function reiniciar() {
  preguntaActual.value = 0;
  respuestas.value = [];
  mostrarResultado.value = false;
}
</script>

<template>
  <!-- Resultado -->
  <div
    v-if="mostrarResultado"
    v-motion
    :initial="{ opacity: 0, scale: 0.9 }"
    :enter="{
      opacity: 1,
      scale: 1,
      transition: {
        duration: 500,
        type: 'spring',
        stiffness: 200,
        damping: 20,
      },
    }"
    class="overflow-hidden rounded-3xl border border-white/80 bg-white text-center shadow-soft"
  >
    <div
      class="px-6 py-8 sm:px-8"
      :style="{
        background: resultadoActual
          ? `linear-gradient(135deg, ${resultadoActual.color}18 0%, #ffffff 70%)`
          : undefined,
      }"
    >
      <div
        class="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg"
        :style="{
          backgroundColor: resultadoActual
            ? resultadoActual.color + '30'
            : undefined,
          boxShadow: resultadoActual
            ? `0 16px 30px ${resultadoActual.color}35`
            : undefined,
        }"
      >
        <Smile class="w-12 h-12" :style="{ color: resultadoActual?.color }" />
      </div>
      <div
        class="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-[#718096] shadow-sm"
      >
        <Sparkles class="h-4 w-4 text-[#F4A259]" />
        Resultado de tu test emocional
      </div>
      <h3 class="mt-5 text-2xl sm:text-3xl font-bold text-[#2D3748] mb-2">
        {{ resultadoActual?.titulo }}
      </h3>
      <p class="text-[#718096] mb-6 max-w-lg mx-auto leading-relaxed">
        {{ resultadoActual?.descripcion }}
      </p>

      <div
        class="bg-white/80 rounded-2xl p-5 mb-6 max-w-xl mx-auto border border-gray-100 text-left"
      >
        <p class="text-sm font-semibold text-[#2D3748] mb-2">
          💡 Consejo para hoy
        </p>
        <p class="text-[#718096] leading-relaxed">
          {{ resultadoActual?.consejo }}
        </p>
      </div>

      <AppButton variant="outline" class="rounded-full px-6" @click="reiniciar">
        <RefreshCw class="w-4 h-4 mr-2" />
        Volver a hacer el test
      </AppButton>
    </div>

    <div class="border-t border-gray-100 bg-[#fcfaf8] p-5 text-left">
      <p class="text-sm font-semibold text-[#2D3748] mb-3">Recuerda</p>
      <p class="text-sm text-[#718096] leading-relaxed">
        Las emociones cambian durante el día. Puedes repetir el test cuando
        quieras para observar cómo te sientes en otro momento.
      </p>
    </div>
  </div>

  <!-- Preguntas -->
  <div v-else class="max-w-2xl mx-auto">
    <div
      class="mb-6 rounded-3xl border border-white/80 bg-white/80 p-5 shadow-soft backdrop-blur-sm"
    >
      <div
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4"
      >
        <div>
          <p class="text-sm font-medium text-[#5B8DEE]">
            Autochequeo emocional
          </p>
          <h3 class="text-lg font-semibold text-[#2D3748]">
            Pregunta {{ preguntaActual + 1 }} de {{ preguntas.length }}
          </h3>
        </div>
        <div class="flex gap-2">
          <div
            v-for="(_, i) in preguntas"
            :key="i"
            class="h-2.5 w-8 rounded-full transition-all duration-300"
            :class="i <= preguntaActual ? 'bg-[#5B8DEE]' : 'bg-gray-200'"
          />
        </div>
      </div>

      <div class="h-2 rounded-full bg-gray-100 overflow-hidden">
        <div
          class="h-full rounded-full bg-gradient-to-r from-[#5B8DEE] to-[#BC6C8A] transition-all duration-500"
          :style="{ width: `${progreso}%` }"
        />
      </div>
    </div>

    <Transition name="slide" mode="out-in">
      <div
        :key="preguntaActual"
        class="rounded-3xl border border-white/80 bg-white p-6 sm:p-8 shadow-soft"
      >
        <div class="mb-6">
          <span
            class="inline-flex rounded-full bg-[#5B8DEE]/10 px-3 py-1 text-xs font-semibold text-[#5B8DEE] mb-3"
          >
            Elige la opción que más se parece a ti
          </span>
          <h3
            class="text-xl sm:text-2xl font-semibold text-[#2D3748] leading-snug"
          >
            {{ preguntas[preguntaActual].pregunta }}
          </h3>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            v-for="(opcion, idx) in preguntas[preguntaActual].opciones"
            :key="opcion.valor"
            class="group rounded-2xl border-2 border-gray-100 bg-white p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-[#5B8DEE] hover:bg-[#5B8DEE]/5 hover:shadow-md active:scale-[0.98] option-stagger"
            :style="{ animationDelay: `${idx * 80}ms` }"
            @click="handleRespuesta(opcion.valor)"
          >
            <div class="flex items-start justify-between gap-3">
              <div class="flex items-start gap-3">
                <div
                  class="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FEFBF7] text-2xl shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                >
                  {{ opcion.emoji }}
                </div>
                <div>
                  <p class="text-[#2D3748] font-medium leading-relaxed">
                    {{ opcion.texto }}
                  </p>
                </div>
              </div>
              <ChevronRight
                class="h-5 w-5 text-[#A0AEC0] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#5B8DEE]"
              />
            </div>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.25s ease;
}
.slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/* Staggered entrance for options */
.option-stagger {
  animation: optionFadeIn 0.4s ease both;
}
@keyframes optionFadeIn {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
