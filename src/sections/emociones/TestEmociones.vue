<script setup lang="ts">
import { computed, ref } from "vue";
import { Smile, RefreshCw, Sparkles, ChevronRight, ArrowRight, BotMessageSquare } from "lucide-vue-next";
import AppButton from "@/components/ui/button.vue";

const EMOJI_BASE = "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@latest/assets";

interface Opcion {
  emojiImg: string;
  texto: string;
  valor: string;
}

interface Pregunta {
  pregunta: string;
  opciones: Opcion[];
  ramas?: string[];
}

// Primeras 2 preguntas universales — determinan la rama
const preguntasUniversales: Pregunta[] = [
  {
    pregunta: "Daniela llega al colegio después de una noche sin dormir bien. ¿Qué le pasa más seguido a una persona en ese estado?",
    opciones: [
      { emojiImg: `${EMOJI_BASE}/Smiling%20face%20with%20smiling%20eyes/3D/smiling_face_with_smiling_eyes_3d.png`, texto: "Se siente con energía igual o renueva el ánimo en el camino", valor: "alegria" },
      { emojiImg: `${EMOJI_BASE}/Sleeping%20face/3D/sleeping_face_3d.png`, texto: "Está cansado/a pero consigue mantenerse tranquilo/a", valor: "calma" },
      { emojiImg: `${EMOJI_BASE}/Anxious%20face%20with%20sweat/3D/anxious_face_with_sweat_3d.png`, texto: "Siente que todo le genera más ansiedad de lo normal", valor: "ansiedad" },
      { emojiImg: `${EMOJI_BASE}/Face%20with%20steam%20from%20nose/3D/face_with_steam_from_nose_3d.png`, texto: "Le irrita casi cualquier cosa antes de que empiece el día", valor: "ira" },
    ],
  },
  {
    pregunta: "Camilo recibe una crítica frente a sus compañeros. ¿Cómo suele reaccionar una persona ante eso?",
    opciones: [
      { emojiImg: `${EMOJI_BASE}/Thinking%20face/3D/thinking_face_3d.png`, texto: "La escucha y decide si tiene razón sin perder la calma", valor: "calma" },
      { emojiImg: `${EMOJI_BASE}/Face%20with%20steam%20from%20nose/3D/face_with_steam_from_nose_3d.png`, texto: "Siente rabia y le cuesta no reaccionar en el momento", valor: "ira" },
      { emojiImg: `${EMOJI_BASE}/Pensive%20face/3D/pensive_face_3d.png`, texto: "Se siente muy herido/a y le queda dando vueltas todo el día", valor: "tristeza" },
      { emojiImg: `${EMOJI_BASE}/Anxious%20face%20with%20sweat/3D/anxious_face_with_sweat_3d.png`, texto: "Le genera mucha inseguridad y empieza a preocuparse por lo que piensan", valor: "ansiedad" },
    ],
  },
];

// Preguntas por rama (2 preguntas por rama)
const preguntasPorRama: Record<string, Pregunta[]> = {
  "alegria-calma": [
    {
      pregunta: "Cuando una persona tiene un buen momento, ¿qué suele hacer con esa energía positiva?",
      opciones: [
        { emojiImg: `${EMOJI_BASE}/Party%20popper/3D/party_popper_3d.png`, texto: "La comparte con otros y busca pasar tiempo con amigos", valor: "alegria" },
        { emojiImg: `${EMOJI_BASE}/Person%20in%20lotus%20position/3D/person_in_lotus_position_3d.png`, texto: "La aprovecha en silencio para recargar su energía interna", valor: "calma" },
        { emojiImg: `${EMOJI_BASE}/High%20voltage/3D/high_voltage_3d.png`, texto: "La canaliza en proyectos o metas que tiene pendientes", valor: "alegria" },
        { emojiImg: `${EMOJI_BASE}/Hugging%20face/3D/hugging_face_3d.png`, texto: "Busca conectar con alguien cercano de forma más profunda", valor: "conexion" },
      ],
    },
    {
      pregunta: "Sara acaba de lograr algo importante. ¿Qué necesita más en ese momento?",
      opciones: [
        { emojiImg: `${EMOJI_BASE}/Flexed%20biceps/3D/flexed_biceps_3d.png`, texto: "Que alguien reconozca su logro y lo celebre con ella", valor: "alegria" },
        { emojiImg: `${EMOJI_BASE}/Person%20in%20lotus%20position/3D/person_in_lotus_position_3d.png`, texto: "Un momento de calma para procesar lo que logró", valor: "calma" },
        { emojiImg: `${EMOJI_BASE}/Star-struck/3D/star-struck_3d.png`, texto: "Pensar en el próximo reto para no perder el impulso", valor: "alegria" },
        { emojiImg: `${EMOJI_BASE}/Heart%20with%20ribbon/3D/heart_with_ribbon_3d.png`, texto: "Compartirlo con las personas que más importan", valor: "conexion" },
      ],
    },
  ],
  "ansiedad": [
    {
      pregunta: "Cuando a una persona se le acumula la presión escolar, ¿qué le pasa en el cuerpo?",
      opciones: [
        { emojiImg: `${EMOJI_BASE}/Anxious%20face%20with%20sweat/3D/anxious_face_with_sweat_3d.png`, texto: "Siente el corazón acelerado o el estómago revuelto antes de los exámenes", valor: "ansiedad" },
        { emojiImg: `${EMOJI_BASE}/Sleeping%20face/3D/sleeping_face_3d.png`, texto: "Duerme mal, le cuesta apagar la mente de noche", valor: "ansiedad" },
        { emojiImg: `${EMOJI_BASE}/Thinking%20face/3D/thinking_face_3d.png`, texto: "Se siente bloqueado/a y no sabe por dónde empezar", valor: "ansiedad" },
        { emojiImg: `${EMOJI_BASE}/Person%20in%20lotus%20position/3D/person_in_lotus_position_3d.png`, texto: "Se mantiene tranquilo/a aunque hay mucho por hacer", valor: "calma" },
      ],
    },
    {
      pregunta: "Valentina evita ir a ciertos lugares del colegio porque le generan mucho malestar. ¿Qué crees que está pasando?",
      opciones: [
        { emojiImg: `${EMOJI_BASE}/Fearful%20face/3D/fearful_face_3d.png`, texto: "Tiene miedo de ser juzgada y prefiere no arriesgarse", valor: "ansiedad" },
        { emojiImg: `${EMOJI_BASE}/Pensive%20face/3D/pensive_face_3d.png`, texto: "Algo en ese lugar le recuerda una experiencia dolorosa", valor: "tristeza" },
        { emojiImg: `${EMOJI_BASE}/Anxious%20face%20with%20sweat/3D/anxious_face_with_sweat_3d.png`, texto: "Le genera ansiedad social y la anticipación la paraliza", valor: "ansiedad" },
        { emojiImg: `${EMOJI_BASE}/Relieved%20face/3D/relieved_face_3d.png`, texto: "Simplemente prefiere los espacios tranquilos y eso está bien", valor: "calma" },
      ],
    },
  ],
  "ira-tristeza": [
    {
      pregunta: "Andrés está pasando por una racha difícil y siente que todo sale mal. ¿Qué suele hacer alguien en esa situación?",
      opciones: [
        { emojiImg: `${EMOJI_BASE}/Face%20with%20steam%20from%20nose/3D/face_with_steam_from_nose_3d.png`, texto: "Se descarga con quienes tiene cerca aunque no sea su culpa", valor: "ira" },
        { emojiImg: `${EMOJI_BASE}/Pensive%20face/3D/pensive_face_3d.png`, texto: "Se cierra y prefiere estar solo/a sin hablar con nadie", valor: "tristeza" },
        { emojiImg: `${EMOJI_BASE}/Handshake/3D/handshake_3d.png`, texto: "Busca apoyo en alguien de confianza para no cargarlo solo/a", valor: "conexion" },
        { emojiImg: `${EMOJI_BASE}/Thinking%20face/3D/thinking_face_3d.png`, texto: "Analiza qué salió mal para no repetirlo y sigue adelante", valor: "calma" },
      ],
    },
    {
      pregunta: "Cuando una persona siente tristeza profunda, ¿qué le ayuda más a salir de ese estado?",
      opciones: [
        { emojiImg: `${EMOJI_BASE}/Hugging%20face/3D/hugging_face_3d.png`, texto: "Que alguien la escuche sin intentar 'solucionar' nada", valor: "conexion" },
        { emojiImg: `${EMOJI_BASE}/Person%20in%20lotus%20position/3D/person_in_lotus_position_3d.png`, texto: "Un poco de tiempo y espacio para procesar sola", valor: "calma" },
        { emojiImg: `${EMOJI_BASE}/High%20voltage/3D/high_voltage_3d.png`, texto: "Hacer algo activo que corte el ciclo de pensamientos negativos", valor: "alegria" },
        { emojiImg: `${EMOJI_BASE}/Flexed%20biceps/3D/flexed_biceps_3d.png`, texto: "Recordar una fortaleza propia para recuperar la confianza", valor: "alegria" },
      ],
    },
  ],
};

const resultados: Record<string, {
  titulo: string;
  descripcion: string;
  consejo: string;
  color: string;
  emocionRueda: string;
}> = {
  alegria: {
    titulo: "Alegría",
    descripcion: "El estado emocional predominante es positivo y energético.",
    consejo: "Aprovecha esta energía para compartirla con otros y avanzar en lo que te importa.",
    color: "#F6E05E",
    emocionRueda: "Alegría",
  },
  calma: {
    titulo: "Calma",
    descripcion: "Hay equilibrio y serenidad como tono emocional base.",
    consejo: "Mantén esta paz interior practicando momentos de desconexión y mindfulness.",
    color: "#81E6D9",
    emocionRueda: "Confianza",
  },
  ansiedad: {
    titulo: "Ansiedad",
    descripcion: "Hay inquietud, preocupación o tensión como fondo emocional.",
    consejo: "La respiración profunda y dividir las tareas en pasos pequeños ayudan mucho.",
    color: "#B794F4",
    emocionRueda: "Miedo",
  },
  ira: {
    titulo: "Ira o Frustración",
    descripcion: "Algo está generando tensión o frustración de fondo.",
    consejo: "Tómate un momento antes de reaccionar. Nombrar la emoción ya reduce su intensidad.",
    color: "#F6AD55",
    emocionRueda: "Ira",
  },
  tristeza: {
    titulo: "Tristeza",
    descripcion: "Hay un peso emocional o decaimiento como tono predominante.",
    consejo: "Es válido sentirse así. Conectar con alguien de confianza hace la diferencia.",
    color: "#90CDF4",
    emocionRueda: "Tristeza",
  },
  conexion: {
    titulo: "Conexión",
    descripcion: "Hay una búsqueda activa de cercanía y apoyo en otros.",
    consejo: "Esa necesidad de conexión es una fortaleza. Actúala: escribe un mensaje hoy.",
    color: "#BC6C8A",
    emocionRueda: "Alegría",
  },
};

const preguntaIdx = ref(0);
const respuestas = ref<string[]>([]);
const mostrarResultado = ref(false);
const ramaActual = ref<string | null>(null);

const preguntasActuales = computed<Pregunta[]>(() => {
  if (!ramaActual.value) return preguntasUniversales;
  return [...preguntasUniversales, ...preguntasPorRama[ramaActual.value]];
});

const totalPreguntas = computed(() => preguntasActuales.value.length);
const progreso = computed(() => ((preguntaIdx.value + 1) / totalPreguntas.value) * 100);

const resultadoActual = computed(() => {
  if (!mostrarResultado.value || respuestas.value.length === 0) return null;
  const conteo: Record<string, number> = {};
  respuestas.value.forEach(r => { conteo[r] = (conteo[r] || 0) + 1; });
  const clave = Object.entries(conteo).sort((a, b) => b[1] - a[1])[0][0];
  return resultados[clave] ?? resultados.calma;
});

function determinarRama(respuestasUniversales: string[]): string {
  const conteo: Record<string, number> = {};
  respuestasUniversales.forEach(r => { conteo[r] = (conteo[r] || 0) + 1; });
  const top = Object.entries(conteo).sort((a, b) => b[1] - a[1])[0][0];
  if (top === "alegria" || top === "calma" || top === "conexion") return "alegria-calma";
  if (top === "ansiedad") return "ansiedad";
  return "ira-tristeza";
}

function handleRespuesta(valor: string) {
  respuestas.value.push(valor);

  // Después de la 2ª pregunta universal, determinar rama
  if (preguntaIdx.value === 1 && !ramaActual.value) {
    ramaActual.value = determinarRama(respuestas.value);
  }

  if (preguntaIdx.value < totalPreguntas.value - 1) {
    preguntaIdx.value++;
  } else {
    mostrarResultado.value = true;
    // Notificar a la rueda de emociones
    const emocion = resultadoActual.value?.emocionRueda;
    if (emocion) {
      window.dispatchEvent(new CustomEvent("rueda:select", { detail: { emocion } }));
    }
  }
}

function reiniciar() {
  preguntaIdx.value = 0;
  respuestas.value = [];
  mostrarResultado.value = false;
  ramaActual.value = null;
}

function irARegulacion() {
  const mapa: Record<string, string> = { ansiedad: "ansiedad", ira: "ira", tristeza: "tristeza" };
  const r = resultadoActual.value;
  if (!r) return;
  const clave = Object.entries(resultados).find(([, v]) => v === r)?.[0];
  const tab = clave ? mapa[clave] : null;
  if (tab) window.dispatchEvent(new CustomEvent("preset-regulacion-tab", { detail: tab }));
  document.getElementById("regulacion")?.scrollIntoView({ behavior: "smooth" });
}

function hablarConEmilio() {
  const r = resultadoActual.value;
  if (!r) return;
  window.dispatchEvent(new CustomEvent("emilio:open", {
    detail: {
      contexto: `Hice el test emocional y mi resultado fue: ${r.titulo}. ${r.descripcion} ${r.consejo} Me gustaría explorar esto contigo.`,
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
    :enter="{ opacity: 1, scale: 1, transition: { duration: 500, type: 'spring', stiffness: 200, damping: 20 } }"
    class="overflow-hidden rounded-3xl border border-border/60 bg-surface text-center shadow-soft"
  >
    <div
      class="px-6 py-8 sm:px-8"
      :style="{ background: resultadoActual ? `linear-gradient(135deg, ${resultadoActual.color}18 0%, hsl(var(--surface)) 70%)` : undefined }"
    >
      <div
        class="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg"
        :style="{
          backgroundColor: resultadoActual ? resultadoActual.color + '30' : undefined,
          boxShadow: resultadoActual ? `0 16px 30px ${resultadoActual.color}35` : undefined,
        }"
      >
        <Smile class="w-12 h-12" :style="{ color: resultadoActual?.color }" />
      </div>
      <div class="inline-flex items-center gap-2 rounded-full bg-surface/85 px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm">
        <Sparkles class="h-4 w-4 text-secondary" />
        Resultado de tu test emocional
      </div>
      <h3 class="mt-5 text-2xl sm:text-3xl font-bold text-foreground mb-2">
        {{ resultadoActual?.titulo }}
      </h3>
      <p class="text-muted-foreground mb-6 max-w-lg mx-auto leading-relaxed">
        {{ resultadoActual?.descripcion }}
      </p>

      <div class="bg-surface/85 rounded-2xl p-5 mb-6 max-w-xl mx-auto border border-border/60 text-left">
        <p class="text-sm font-semibold text-foreground mb-2">
          <img class="w-4 h-4 inline-block" :src="`${EMOJI_BASE}/Light%20bulb/3D/light_bulb_3d.png`" alt="Consejo" />
          Consejo para hoy
        </p>
        <p class="text-muted-foreground leading-relaxed">
          {{ resultadoActual?.consejo }}
        </p>
      </div>

      <p class="text-xs text-muted-foreground mb-5">
        La rueda de emociones en la sección anterior ya refleja tu resultado.
      </p>

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
    <div class="mb-6 rounded-3xl border border-border/60 bg-surface/85 p-5 shadow-soft backdrop-blur-sm">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div>
          <p class="text-sm font-medium text-primary">Autochequeo emocional</p>
          <h3 class="text-lg font-semibold text-foreground">
            Pregunta {{ preguntaIdx + 1 }} de {{ totalPreguntas }}
          </h3>
        </div>
        <div class="flex gap-2">
          <div
            v-for="(_, i) in preguntasActuales"
            :key="i"
            class="h-2.5 w-8 rounded-full transition-all duration-300"
            :class="i <= preguntaIdx ? 'bg-primary' : 'bg-border'"
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
        :key="preguntaIdx"
        class="rounded-3xl border border-border/60 bg-surface p-6 sm:p-8 shadow-soft"
      >
        <div class="mb-6">
          <span class="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-3">
            Elige la opción que más se acerque
          </span>
          <h3 class="text-xl sm:text-2xl font-semibold text-foreground leading-snug">
            {{ preguntasActuales[preguntaIdx].pregunta }}
          </h3>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            v-for="(opcion, idx) in preguntasActuales[preguntaIdx].opciones"
            :key="opcion.valor + idx"
            class="group rounded-2xl border-2 border-border/60 bg-surface p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary/5 hover:shadow-md active:scale-[0.98] option-stagger"
            :style="{ animationDelay: `${idx * 80}ms` }"
            @click="handleRespuesta(opcion.valor)"
          >
            <div class="flex items-start justify-between gap-3">
              <div class="flex items-start gap-3">
                <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-background text-2xl shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <img :src="opcion.emojiImg" alt="" class="w-7 h-7 drop-shadow-sm" />
                </div>
                <p class="text-foreground font-medium leading-relaxed">{{ opcion.texto }}</p>
              </div>
              <ChevronRight class="h-5 w-5 text-muted-foreground/70 transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary flex-shrink-0" />
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
