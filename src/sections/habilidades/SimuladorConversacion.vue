<script setup lang="ts">
import { ref, computed, watch, nextTick } from "vue";
import { RotateCcw, ChevronRight } from "lucide-vue-next";
import gsap from "gsap";

const EMOJI_BASE =
  "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@latest/assets";

type TipoRespuesta = "asertiva" | "pasiva" | "agresiva";

interface Opcion {
  texto: string;
  tipo: TipoRespuesta;
  feedback: string;
}

interface Situacion {
  situacion: string;
  opciones: Opcion[];
  aprendizaje: string;
}

const situaciones: Situacion[] = [
  {
    situacion: "Un compañero te interrumpe cuando estás hablando en clase.",
    opciones: [
      {
        texto: "Me quedo callado/a y dejo de hablar.",
        tipo: "pasiva",
        feedback:
          "La conducta pasiva no resuelve el problema. Puedes quedarte con la frustración de no haber expresado lo que pensabas.",
      },
      {
        texto: '"Espera, todavía no terminé. Me gustaría acabar mi idea."',
        tipo: "asertiva",
        feedback:
          "¡Perfecto! Comunicaste tu necesidad con claridad y respeto, sin atacar ni ceder.",
      },
      {
        texto: "¡Siempre me interrumpes! Eres un irrespetuoso.",
        tipo: "agresiva",
        feedback:
          "La reacción agresiva puede escalar el conflicto y dañar la relación. Atacar a la persona no soluciona nada.",
      },
    ],
    aprendizaje:
      'Expresar que necesitas terminar de hablar, de manera tranquila y directa, es comunicación asertiva. La fórmula "Yo necesito X" funciona muy bien.',
  },
  {
    situacion:
      "Un amigo te pide dinero prestado por tercera vez y aún te debe de las veces anteriores.",
    opciones: [
      {
        texto: "¡Eres un aprovechado! No te voy a dar nada.",
        tipo: "agresiva",
        feedback:
          "Puede que te sientas con razón, pero la agresión daña la amistad y no resuelve el tema del dinero.",
      },
      {
        texto:
          '"Me siento incómodo/a porque aún me debes lo anterior. Prefiero arreglarlo antes de prestarte más."',
        tipo: "asertiva",
        feedback:
          "¡Exacto! Nombraste tu emoción, explicaste el problema y propusiste una solución sin atacar.",
      },
      {
        texto: "Le presto para no quedar mal ni generar conflicto.",
        tipo: "pasiva",
        feedback:
          "Al evitar el conflicto no pones límites y la situación se repite. Tus necesidades también importan.",
      },
    ],
    aprendizaje:
      "Poner límites de forma asertiva protege tanto la relación como tu bienestar. Nombrar la emoción primero abre la conversación.",
  },
  {
    situacion:
      "Tus amigos quieren hacer algo que tú no quieres hacer, pero insisten.",
    opciones: [
      {
        texto:
          '"Entiendo que quieren hacerlo, pero yo prefiero no. ¿Podemos buscar otra opción?"',
        tipo: "asertiva",
        feedback:
          "¡Genial! Respetaste tu posición y al mismo tiempo abriste la posibilidad de encontrar un punto medio.",
      },
      {
        texto: "Hago lo que ellos quieren para no quedar por fuera del grupo.",
        tipo: "pasiva",
        feedback:
          "Ceder por presión social puede llevarte a situaciones que van contra tus valores o que te incomodan después.",
      },
      {
        texto: "Les digo que son unos manipuladores y me voy enojado/a.",
        tipo: "agresiva",
        feedback:
          "La situación puede molestarte, pero atacarlos cierra el diálogo y daña la relación sin resolver nada.",
      },
    ],
    aprendizaje:
      'Decir "no" con firmeza y sin hostilidad es una forma poderosa de comunicación asertiva. Proponer alternativas muestra respeto mutuo.',
  },
  {
    situacion:
      "Tu profesor te califica con una nota que crees es injusta y no la explica.",
    opciones: [
      {
        texto: "No digo nada y acepto la nota aunque no estoy de acuerdo.",
        tipo: "pasiva",
        feedback:
          "Guardar silencio puede acumular frustración. Expresarte con respeto es un derecho y una habilidad valiosa.",
      },
      {
        texto: "Le digo frente a toda la clase que la nota es injusta.",
        tipo: "agresiva",
        feedback:
          "Confrontar en público puede ponerlo a la defensiva y dificultar que te escuche. El momento y lugar importan.",
      },
      {
        texto:
          "Al terminar la clase, le pido un momento y le pregunto qué aspectos puedo mejorar.",
        tipo: "asertiva",
        feedback:
          "¡Muy bien! Buscas entender, abres el diálogo en privado y muestras disposición para crecer.",
      },
    ],
    aprendizaje:
      "Acercarte en privado y con disposición de escuchar es más efectivo que el silencio o la confrontación pública.",
  },
];

const currentIndex = ref(0);
const seleccion = ref<number | null>(null);
const asertivas = ref(0);
const terminado = ref(false);

const situacion = computed(() => situaciones[currentIndex.value]);
const opcionElegida = computed(() =>
  seleccion.value !== null ? situacion.value.opciones[seleccion.value] : null
);
const esUltima = computed(() => currentIndex.value === situaciones.length - 1);

const tipoStyle: Record<
  TipoRespuesta,
  { color: string; label: string; bgHex: string }
> = {
  asertiva: { color: "#5B8DEE", label: "Respuesta asertiva ✓", bgHex: "0D" },
  pasiva: { color: "#F4A259", label: "Respuesta pasiva", bgHex: "15" },
  agresiva: { color: "#E53E3E", label: "Respuesta agresiva", bgHex: "12" },
};

function elegir(i: number) {
  if (seleccion.value !== null) return;
  seleccion.value = i;
  if (situacion.value.opciones[i].tipo === "asertiva") asertivas.value++;

  // Animate feedback in
  nextTick(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const feedback = document.querySelector(".sim-feedback");
    if (feedback) {
      gsap.fromTo(feedback, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" });
    }
  });
}

function siguiente() {
  if (esUltima.value) {
    terminado.value = true;
    nextTick(() => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;
      const result = document.querySelector(".sim-resultado");
      if (result) {
        gsap.fromTo(result, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.4)" });
      }
    });
  } else {
    const oldIndex = currentIndex.value;
    currentIndex.value++;
    seleccion.value = null;
    nextTick(() => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;
      const opciones = document.querySelectorAll(".sim-opcion");
      if (opciones.length) {
        gsap.fromTo(opciones, { x: oldIndex < currentIndex.value ? 30 : -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, stagger: 0.06, ease: "power2.out" });
      }
    });
  }
}

function reiniciar() {
  currentIndex.value = 0;
  seleccion.value = null;
  asertivas.value = 0;
  terminado.value = false;
  nextTick(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const opciones = document.querySelectorAll(".sim-opcion");
    if (opciones.length) {
      gsap.fromTo(opciones, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, stagger: 0.06, ease: "power2.out" });
    }
  });
}
</script>

<template>
  <div class="mt-5 rounded-2xl border border-[#5B8DEE]/20 bg-white/70 p-5">
    <p class="text-xs font-semibold text-[#5B8DEE] uppercase tracking-wide mb-4">
      <img class="w-4 h-4 inline-block" :src="`${EMOJI_BASE}/Performing%20arts/3D/performing_arts_3d.png`" alt="Simulador" />
      Simulador · Comunicación asertiva
    </p>

    <!-- Pantalla final -->
    <div v-if="terminado" class="sim-resultado text-center py-4">
      <div class="text-5xl mb-4">
        <img
          v-if="asertivas === situaciones.length"
          class="w-12 h-12 inline-block mx-auto"
          :src="`${EMOJI_BASE}/Glowing%20star/3D/glowing_star_3d.png`"
          alt="Excelente"
        />
        <img
          v-else-if="asertivas >= 2"
          class="w-12 h-12 inline-block mx-auto"
          :src="`${EMOJI_BASE}/Flexed%20biceps/3D/flexed_biceps_3d.png`"
          alt="Buen avance"
        />
        <img
          v-else
          class="w-12 h-12 inline-block mx-auto"
          :src="`${EMOJI_BASE}/Books/3D/books_3d.png`"
          alt="Sigue practicando"
        />
      </div>
      <p class="text-xl font-bold text-[#2D3748] mb-2">
        {{ asertivas }}/{{ situaciones.length }} respuestas asertivas
      </p>
      <p class="text-sm text-[#718096] mb-5 max-w-xs mx-auto">
        {{
          asertivas === situaciones.length
            ? "¡Excelente dominio de la comunicación asertiva!"
            : asertivas >= 2
              ? "Buen avance — sigue practicando en el día a día."
              : "La asertividad se aprende con la práctica. ¡Intenta de nuevo!"
        }}
      </p>
      <button
        class="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#5B8DEE]"
        style="background-color: #5b8dee"
        @click="reiniciar"
      >
        <RotateCcw class="h-4 w-4" />
        Volver a intentar
      </button>
    </div>

    <!-- Simulador activo -->
    <template v-else>
      <!-- Barra de progreso -->
      <div class="flex items-center gap-1.5 mb-4">
        <div
          v-for="(_, i) in situaciones"
          :key="i"
          class="h-1.5 flex-1 rounded-full transition-[background-color] duration-300"
          :style="{
            backgroundColor:
              i < currentIndex
                ? '#5B8DEE'
                : i === currentIndex
                  ? '#5B8DEE80'
                  : '#E2E8F0',
          }"
        />
        <span class="ml-2 text-xs text-[#A0AEC0] font-medium tabular-nums">
          {{ currentIndex + 1 }}/{{ situaciones.length }}
        </span>
      </div>

      <!-- Situación -->
      <div class="rounded-xl bg-[#F5F0E8] p-4 mb-4">
        <p
          class="text-xs font-semibold text-[#718096] uppercase tracking-wide mb-1.5"
        >
          Situación
        </p>
        <p class="text-sm text-[#2D3748] font-medium leading-relaxed">
          {{ situacion.situacion }}
        </p>
      </div>

      <!-- Opciones -->
      <p class="text-xs text-[#718096] mb-2.5">¿Cómo respondes?</p>
      <div class="space-y-2">
        <button
          v-for="(opcion, i) in situacion.opciones"
          :key="i"
          class="sim-opcion w-full text-left rounded-xl border-2 p-3 text-sm transition-[border-color,background-color,color,opacity] duration-200 leading-snug focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-[#5B8DEE]/50"
          :style="
            seleccion === i
              ? {
                  borderColor: tipoStyle[opcion.tipo].color,
                  backgroundColor:
                    tipoStyle[opcion.tipo].color +
                    tipoStyle[opcion.tipo].bgHex,
                  color: '#2D3748',
                }
              : seleccion !== null
                ? { borderColor: '#F0F0F0', color: '#A0AEC0', opacity: '0.65' }
                : {}
          "
          :class="
            seleccion === null
              ? 'border-gray-200 hover:border-[#5B8DEE]/40 hover:bg-[#5B8DEE]/5 text-[#4A5568]'
              : ''
          "
          :disabled="seleccion !== null"
          @click="elegir(i)"
        >
          <span class="font-bold mr-1.5" style="color: #a0aec0">{{
            String.fromCharCode(65 + i) }}.
          </span>{{ opcion.texto }}
        </button>
      </div>

      <!-- Resultado -->
      <Transition name="sim-slide">
        <div v-if="opcionElegida" class="mt-4 space-y-3">
          <!-- Feedback -->
          <div
            class="sim-feedback rounded-xl border p-4"
            :style="{
              backgroundColor:
                tipoStyle[opcionElegida.tipo].color +
                tipoStyle[opcionElegida.tipo].bgHex,
              borderColor: tipoStyle[opcionElegida.tipo].color + '40',
            }"
          >
            <p
              class="text-xs font-bold mb-1"
              :style="{ color: tipoStyle[opcionElegida.tipo].color }"
            >
              {{ tipoStyle[opcionElegida.tipo].label }}
            </p>
            <p class="text-sm text-[#4A5568] leading-relaxed">
              {{ opcionElegida.feedback }}
            </p>
          </div>

          <!-- Aprendizaje -->
          <div
            class="rounded-xl p-3"
            style="background-color: #5b8dee10; border: 1px solid #5b8dee25"
          >
            <p class="text-xs font-semibold text-[#5B8DEE] mb-1">
              <img class="w-4 h-4 inline-block" :src="`${EMOJI_BASE}/Light%20bulb/3D/light_bulb_3d.png`" alt="Consejo" />
              Para recordar
            </p>
            <p class="text-xs text-[#4A5568] leading-relaxed">
              {{ situacion.aprendizaje }}
            </p>
          </div>

          <!-- Botón siguiente -->
          <div class="flex justify-end">
            <button
              class="inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:-translate-y-0.5 transition-[transform,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#5B8DEE]"
              style="background-color: #5b8dee"
              @click="siguiente"
            >
              {{ esUltima ? "Ver resultado" : "Siguiente situación" }}
              <ChevronRight class="h-4 w-4" />
            </button>
          </div>
        </div>
      </Transition>
    </template>
  </div>
</template>

<style scoped>
.sim-slide-enter-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.sim-slide-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}

@media (prefers-reduced-motion: reduce) {
  .sim-slide-enter-active {
    transition: none;
  }
  .sim-slide-enter-from {
    opacity: 1;
    transform: none;
  }
}
</style>
