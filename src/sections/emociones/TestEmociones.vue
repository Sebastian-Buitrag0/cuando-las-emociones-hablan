<script setup lang="ts">
import { computed, ref } from "vue";
import { Smile, RefreshCw, Sparkles, ChevronRight, ArrowRight, BotMessageSquare } from "lucide-vue-next";
import AppButton from "@/components/ui/button.vue";

const EMOJI_BASE =
  "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@latest/assets";

const preguntas = [
  {
    pregunta: "¿Cómo te sientes al despertar?",
    opciones: [
      { emojiImg: `${EMOJI_BASE}/Smiling%20face%20with%20smiling%20eyes/3D/smiling_face_with_smiling_eyes_3d.png`, texto: "Con energía y optimismo", valor: "alegria" },
      { emojiImg: `${EMOJI_BASE}/Sleeping%20face/3D/sleeping_face_3d.png`, texto: "Cansado/a pero tranquilo/a", valor: "calma" },
      { emojiImg: `${EMOJI_BASE}/Anxious%20face%20with%20sweat/3D/anxious_face_with_sweat_3d.png`, texto: "Ansioso/a o preocupado/a", valor: "ansiedad" },
      { emojiImg: `${EMOJI_BASE}/Face%20with%20steam%20from%20nose/3D/face_with_steam_from_nose_3d.png`, texto: "Irritable o molesto/a", valor: "ira" },
    ],
  },
  {
    pregunta: "Cuando enfrentas un problema, tú...",
    opciones: [
      { emojiImg: `${EMOJI_BASE}/Thinking%20face/3D/thinking_face_3d.png`, texto: "Busco soluciones calmadamente", valor: "calma" },
      { emojiImg: `${EMOJI_BASE}/Face%20with%20steam%20from%20nose/3D/face_with_steam_from_nose_3d.png`, texto: "Me frustro rápidamente", valor: "ira" },
      { emojiImg: `${EMOJI_BASE}/Handshake/3D/handshake_3d.png`, texto: "Pido ayuda a otros", valor: "conexion" },
      { emojiImg: `${EMOJI_BASE}/Pensive%20face/3D/pensive_face_3d.png`, texto: "Me siento abrumado/a", valor: "tristeza" },
    ],
  },
  {
    pregunta: "En una reunión social, tú...",
    opciones: [
      { emojiImg: `${EMOJI_BASE}/Party%20popper/3D/party_popper_3d.png`, texto: "Disfruto conociendo gente", valor: "alegria" },
      { emojiImg: `${EMOJI_BASE}/Ear/3D/ear_3d.png`, texto: "Prefiero escuchar y observar", valor: "calma" },
      { emojiImg: `${EMOJI_BASE}/Anxious%20face%20with%20sweat/3D/anxious_face_with_sweat_3d.png`, texto: "Me siento incómodo/a", valor: "ansiedad" },
      { emojiImg: `${EMOJI_BASE}/Heart%20with%20ribbon/3D/heart_with_ribbon_3d.png`, texto: "Me conecto profundamente", valor: "conexion" },
    ],
  },
  {
    pregunta: "¿Qué necesitas más en este momento?",
    opciones: [
      { emojiImg: `${EMOJI_BASE}/High%20voltage/3D/high_voltage_3d.png`, texto: "Energía y motivación", valor: "alegria" },
      { emojiImg: `${EMOJI_BASE}/Person%20in%20lotus%20position/3D/person_in_lotus_position_3d.png`, texto: "Paz y tranquilidad", valor: "calma" },
      { emojiImg: `${EMOJI_BASE}/Hugging%20face/3D/hugging_face_3d.png`, texto: "Apoyo y comprensión", valor: "conexion" },
      { emojiImg: `${EMOJI_BASE}/Flexed%20biceps/3D/flexed_biceps_3d.png`, texto: "Fuerza para seguir", valor: "ira" },
    ],
  },
];

const resultados: Record<
  string,
  {
    titulo: string;
    descripcion: string;
    consejo: string;
    color: string;
    regulacionTab: string;
  }
> = {
  alegria: {
    titulo: "Alegría",
    descripcion: "Estás en un estado positivo y energético.",
    consejo:
      "Aprovecha esta energía para compartirla con otros y trabajar en tus metas.",
    color: "#F6E05E",
    regulacionTab: "respiracion",
  },
  calma: {
    titulo: "Calma",
    descripcion: "Te encuentras en equilibrio y serenidad.",
    consejo: "Mantén esta paz interior practicando mindfulness o meditación.",
    color: "#81E6D9",
    regulacionTab: "respiracion",
  },
  ansiedad: {
    titulo: "Ansiedad",
    descripcion: "Sientes inquietud o preocupación.",
    consejo:
      "Practica respiración profunda y divide tus tareas en pasos pequeños.",
    color: "#B794F4",
    regulacionTab: "ansiedad",
  },
  ira: {
    titulo: "Ira o Frustración",
    descripcion: "Hay algo que te está afectando negativamente.",
    consejo:
      "Tómate un momento, respira y expresa tus sentimientos de manera asertiva.",
    color: "#F6AD55",
    regulacionTab: "ira",
  },
  tristeza: {
    titulo: "Tristeza",
    descripcion: "Te sientes decaído o apagado.",
    consejo:
      "Es válido sentir así. Habla con alguien de confianza sobre tus emociones.",
    color: "#90CDF4",
    regulacionTab: "tristeza",
  },
  conexion: {
    titulo: "Conexión",
    descripcion: "Buscas cercanía con los demás.",
    consejo: "Contacta a un amigo o familiar. Las relaciones nos fortalecen.",
    color: "#BC6C8A",
    regulacionTab: "respiracion",
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

function irARegulacion() {
  const tab = resultadoActual.value?.regulacionTab;
  if (tab) {
    window.dispatchEvent(
      new CustomEvent("preset-regulacion-tab", { detail: tab }),
    );
  }
  document.getElementById("regulacion")?.scrollIntoView({ behavior: "smooth" });
}

function hablarConEmilio() {
  const r = resultadoActual.value;
  if (!r) return;
  window.dispatchEvent(new CustomEvent("emilio:open", {
    detail: {
      contexto: `Acabo de hacer el test emocional y mi resultado fue: ${r.titulo}. ${r.descripcion} ${r.consejo} Me gustaría explorar esto contigo.`,
    },
  }));
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
    class="overflow-hidden rounded-3xl border border-border/60 bg-surface text-center shadow-soft"
  >
    <div
      class="px-6 py-8 sm:px-8"
      :style="{
        background: resultadoActual
          ? `linear-gradient(135deg, ${resultadoActual.color}18 0%, hsl(var(--surface)) 70%)`
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
        class="inline-flex items-center gap-2 rounded-full bg-surface/85 px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm"
      >
        <Sparkles class="h-4 w-4 text-secondary" />
        Resultado de tu test emocional
      </div>
      <h3 class="mt-5 text-2xl sm:text-3xl font-bold text-foreground mb-2">
        {{ resultadoActual?.titulo }}
      </h3>
      <p class="text-muted-foreground mb-6 max-w-lg mx-auto leading-relaxed">
        {{ resultadoActual?.descripcion }}
      </p>

      <div
        class="bg-surface/85 rounded-2xl p-5 mb-6 max-w-xl mx-auto border border-border/60 text-left"
      >
        <p class="text-sm font-semibold text-foreground mb-2">
          <img class="w-4 h-4 inline-block" :src="`${EMOJI_BASE}/Light%20bulb/3D/light_bulb_3d.png`" alt="Consejo" />
          Consejo para hoy
        </p>
        <p class="text-muted-foreground leading-relaxed">
          {{ resultadoActual?.consejo }}
        </p>
      </div>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
        <AppButton class="rounded-full px-6" @click="irARegulacion">
          Ver técnicas para esto
          <ArrowRight class="w-4 h-4 ml-1" />
        </AppButton>
        <AppButton variant="outline" class="rounded-full px-6 text-foreground border-border" @click="reiniciar">
          <RefreshCw class="w-4 h-4 mr-1" />
          Repetir test
        </AppButton>
        <button
          @click="hablarConEmilio"
          class="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold bg-foreground text-background shadow-soft motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 transition-[transform,box-shadow] duration-200 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <BotMessageSquare class="w-4 h-4" />
          Hablar con Emilio
        </button>
      </div>
    </div>

    <div class="border-t border-border/60 bg-background p-5 text-left">
      <p class="text-sm font-semibold text-foreground mb-3">Recuerda</p>
      <p class="text-sm text-muted-foreground leading-relaxed">
        Las emociones cambian durante el día. Puedes repetir el test cuando
        quieras para observar cómo te sientes en otro momento.
      </p>
    </div>
  </div>

  <!-- Preguntas -->
  <div v-else class="max-w-2xl mx-auto">
    <div
      class="mb-6 rounded-3xl border border-border/60 bg-surface/85 p-5 shadow-soft backdrop-blur-sm"
    >
      <div
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4"
      >
        <div>
          <p class="text-sm font-medium text-primary">
            Autochequeo emocional
          </p>
          <h3 class="text-lg font-semibold text-foreground">
            Pregunta {{ preguntaActual + 1 }} de {{ preguntas.length }}
          </h3>
        </div>
        <div class="flex gap-2">
          <div
            v-for="(_, i) in preguntas"
            :key="i"
            class="h-2.5 w-8 rounded-full transition-all duration-300"
            :class="i <= preguntaActual ? 'bg-primary' : 'bg-border'"
          />
        </div>
      </div>

      <div class="h-2 rounded-full bg-muted overflow-hidden">
        <div
          class="h-full rounded-full bg-primary transition-[width] duration-500 ease-out"
          :style="{ width: `${progreso}%` }"
        />
      </div>
    </div>

    <Transition name="slide" mode="out-in">
      <div
        :key="preguntaActual"
        class="rounded-3xl border border-border/60 bg-surface p-6 sm:p-8 shadow-soft"
      >
        <div class="mb-6">
          <span
            class="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-3"
          >
            Elige la opción que más se parece a ti
          </span>
          <h3
            class="text-xl sm:text-2xl font-semibold text-foreground leading-snug"
          >
            {{ preguntas[preguntaActual].pregunta }}
          </h3>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            v-for="(opcion, idx) in preguntas[preguntaActual].opciones"
            :key="opcion.valor"
            class="group rounded-2xl border-2 border-border/60 bg-surface p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary/5 hover:shadow-md active:scale-[0.98] option-stagger"
            :style="{ animationDelay: `${idx * 80}ms` }"
            @click="handleRespuesta(opcion.valor)"
          >
            <div class="flex items-start justify-between gap-3">
              <div class="flex items-start gap-3">
                <div
                  class="flex h-12 w-12 items-center justify-center rounded-2xl bg-background text-2xl shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                >
                  <img
                    :src="opcion.emojiImg"
                    alt=""
                    class="w-7 h-7 drop-shadow-sm"
                  />
                </div>
                <div>
                  <p class="text-foreground font-medium leading-relaxed">
                    {{ opcion.texto }}
                  </p>
                </div>
              </div>
              <ChevronRight
                class="h-5 w-5 text-muted-foreground/70 transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary"
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
.slide-leave-active { transition: opacity 0.25s ease, transform 0.25s ease; }
.slide-enter-from   { opacity: 0; transform: translateX(20px); }
.slide-leave-to     { opacity: 0; transform: translateX(-20px); }

@media (prefers-reduced-motion: no-preference) {
  .option-stagger {
    animation: optionFadeIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) both;
  }
  @keyframes optionFadeIn {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
}

@media (prefers-reduced-motion: reduce) {
  .slide-enter-active,
  .slide-leave-active { transition: none; }
  .slide-enter-from,
  .slide-leave-to { transform: none; }
}
</style>
