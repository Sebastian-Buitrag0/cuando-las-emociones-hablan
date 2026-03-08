<script setup lang="ts">
import { computed, ref } from "vue";
import { Heart, Sparkles, Lightbulb } from "lucide-vue-next";

const BASE = "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@latest/assets";

const emocionesRueda = [
  {
    nombre: "Alegría",
    img: `${BASE}/Smiling%20face%20with%20smiling%20eyes/3D/smiling_face_with_smiling_eyes_3d.png`,
    color: "#F6E05E",
    definicion: "Estado de bienestar y satisfacción.",
    tip: "Comparte tu alegría con otros.",
  },
  {
    nombre: "Tristeza",
    img: `${BASE}/Crying%20face/3D/crying_face_3d.png`,
    color: "#90CDF4",
    definicion: "Respuesta natural a una pérdida o decepción.",
    tip: "Permítete sentir y expresar tu tristeza.",
  },
  {
    nombre: "Ira",
    img: `${BASE}/Angry%20face/3D/angry_face_3d.png`,
    color: "#F6AD55",
    definicion: "Respuesta a una amenaza o injusticia.",
    tip: "Respira profundo antes de reaccionar.",
  },
  {
    nombre: "Miedo",
    img: `${BASE}/Fearful%20face/3D/fearful_face_3d.png`,
    color: "#B794F4",
    definicion: "Respuesta ante una amenaza percibida.",
    tip: "Identifica qué te asusta y busca apoyo.",
  },
  {
    nombre: "Sorpresa",
    img: `${BASE}/Face%20with%20open%20mouth/3D/face_with_open_mouth_3d.png`,
    color: "#81E6D9",
    definicion: "Reacción ante algo inesperado.",
    tip: "Aprovecha la novedad para aprender.",
  },
  {
    nombre: "Asco",
    img: `${BASE}/Nauseated%20face/3D/nauseated_face_3d.png`,
    color: "#9AE6B4",
    definicion: "Rechazo ante algo desagradable.",
    tip: "Respeta tus límites personales.",
  },
  {
    nombre: "Confianza",
    img: `${BASE}/Relieved%20face/3D/relieved_face_3d.png`,
    color: "#5B8DEE",
    definicion: "Seguridad en ti mismo o en otros.",
    tip: "Cultiva relaciones basadas en confianza.",
  },
  {
    nombre: "Anticipación",
    img: `${BASE}/Star-struck/3D/star-struck_3d.png`,
    color: "#F4A259",
    definicion: "Expectativa positiva hacia el futuro.",
    tip: "Usa la anticipación para motivarte.",
  },
];

const emotionCount = emocionesRueda.length;
const center = 200;
const radius = 145;

const emocionSeleccionada = ref(0);

const emocionActual = computed(() => emocionesRueda[emocionSeleccionada.value]);

function getCoords(index: number) {
  const angle = (index * 360) / emotionCount - 90;
  const x = center + Math.cos((angle * Math.PI) / 180) * radius;
  const y = center + Math.sin((angle * Math.PI) / 180) * radius;

  return {
    x,
    y,
  };
}

function getPosition(index: number) {
  const { x, y } = getCoords(index);
  return {
    left: `${(x / 400) * 100}%`,
    top: `${(y / 400) * 100}%`,
  };
}

function selectEmotion(index: number) {
  emocionSeleccionada.value = index;
}
</script>

<template>
  <div
    class="grid grid-cols-1 xl:grid-cols-[minmax(0,460px)_minmax(0,1fr)] items-center gap-8 lg:gap-10"
  >
    <!-- Wheel -->
    <div class="relative w-full max-w-[440px] aspect-square mx-auto">
      <div
        class="absolute inset-0 rounded-full bg-gradient-to-br from-[#5B8DEE]/10 via-white to-[#BC6C8A]/10 blur-2xl"
      />
      <div
        class="absolute inset-[10%] rounded-full border border-white/80 shadow-soft bg-white/70 backdrop-blur-sm"
      />
      <div
        class="absolute inset-[18%] rounded-full border-2 border-dashed border-gray-200/80 animate-spin-slow"
      />
      <div
        class="absolute inset-[31%] rounded-full border border-[#5B8DEE]/15"
      />

      <svg
        viewBox="0 0 400 400"
        class="absolute inset-0 w-full h-full pointer-events-none"
      >
        <defs>
          <radialGradient id="wheelGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95" />
            <stop offset="100%" stop-color="#f7f3ee" stop-opacity="0.6" />
          </radialGradient>
        </defs>
        <circle cx="200" cy="200" r="180" fill="url(#wheelGlow)" />
        <line
          v-for="(emocion, index) in emocionesRueda"
          :key="`line-${emocion.nombre}`"
          :x1="center"
          :y1="center"
          :x2="getCoords(index).x"
          :y2="getCoords(index).y"
          :stroke="emocion.color"
          :stroke-opacity="emocionSeleccionada === index ? 0.8 : 0.28"
          :stroke-width="emocionSeleccionada === index ? 3 : 2"
          class="svg-line-transition"
        />
      </svg>

      <!-- Emotion buttons -->
      <button
        v-for="(emocion, index) in emocionesRueda"
        :key="emocion.nombre"
        type="button"
        class="absolute z-10 flex h-14 w-14 sm:h-16 sm:w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white text-xl sm:text-2xl shadow-lg transition-all duration-300 hover:scale-[1.15] active:scale-95 hover:-translate-y-[calc(50%+4px)]"
        :class="emocionSeleccionada === index ? 'ring-4 ring-offset-2' : ''"
        :style="{
          backgroundColor: emocion.color,
          boxShadow:
            emocionSeleccionada === index
              ? `0 0 0 8px ${emocion.color}22, 0 18px 35px ${emocion.color}40`
              : `0 12px 24px ${emocion.color}33`,
          '--tw-ring-color': emocion.color + '40',
          ...getPosition(index),
        }"
        :aria-pressed="emocionSeleccionada === index"
        :aria-label="`Seleccionar ${emocion.nombre}`"
        @click="selectEmotion(index)"
      >
        <img :src="emocion.img" :alt="emocion.nombre" class="w-7 h-7 sm:w-8 sm:h-8 drop-shadow-sm" />
      </button>

      <!-- Center -->
      <div
        class="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div
          class="wheel-pulse relative flex h-28 w-28 sm:h-32 sm:w-32 items-center justify-center rounded-full bg-gradient-to-br from-[#5B8DEE] via-[#7d8ef0] to-[#BC6C8A] p-3 text-center text-white shadow-[0_20px_50px_rgba(91,141,238,0.30)]"
        >
          <div class="absolute inset-2 rounded-full border border-white/20" />
          <div class="relative">
            <Sparkles class="mx-auto mb-1 h-5 w-5 text-white/90" />
            <span class="text-xs sm:text-sm font-bold leading-tight"
              >Tu rueda<br />emocional</span
            >
          </div>
        </div>
      </div>
    </div>

    <!-- Info panel -->
    <div class="w-full max-w-xl mx-auto xl:mx-0">
      <div
        class="mb-4 rounded-2xl bg-white/70 backdrop-blur-sm border border-white/80 p-4 shadow-soft"
      >
        <p class="text-sm font-medium text-[#2D3748]">
          Selecciona una emoción para explorarla
        </p>
        <p class="text-sm text-[#718096] mt-1">
          La rueda te ayuda a ponerle nombre a lo que sientes y a identificar
          una acción útil.
        </p>
      </div>

      <Transition name="slide" mode="out-in">
        <div
          :key="emocionSeleccionada"
          class="overflow-hidden rounded-3xl border border-white/80 bg-white shadow-soft"
        >
          <div
            class="p-6 sm:p-7"
            :style="{
              background: `linear-gradient(135deg, ${emocionActual.color}18 0%, #ffffff 65%)`,
            }"
          >
            <div class="flex flex-col sm:flex-row sm:items-center gap-4 mb-5">
              <div
                class="flex h-20 w-20 items-center justify-center rounded-3xl border border-white/70 bg-white shadow-md"
                :style="{ boxShadow: `0 14px 28px ${emocionActual.color}30` }"
              >
                <img :src="emocionActual.img" :alt="emocionActual.nombre" class="w-12 h-12 drop-shadow-md" />
              </div>
              <div>
                <span
                  class="inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide"
                  :style="{
                    color: emocionActual.color,
                    backgroundColor: `${emocionActual.color}18`,
                  }"
                >
                  Emoción básica
                </span>
                <h3
                  class="mt-3 text-2xl sm:text-3xl font-bold"
                  :style="{ color: emocionActual.color }"
                >
                  {{ emocionActual.nombre }}
                </h3>
              </div>
            </div>

            <div class="grid gap-4">
              <div class="rounded-2xl bg-white/80 p-4 border border-gray-100">
                <p class="text-sm font-semibold text-[#2D3748] mb-1">
                  ¿Qué significa?
                </p>
                <p class="text-[#718096] leading-relaxed">
                  {{ emocionActual.definicion }}
                </p>
              </div>

              <div
                class="rounded-2xl p-4"
                :style="{ backgroundColor: `${emocionActual.color}14` }"
              >
                <p
                  class="text-sm font-semibold mb-2 flex items-center gap-1.5"
                  :style="{ color: emocionActual.color }"
                >
                  <Lightbulb class="w-4 h-4" /> Acción sugerida
                </p>
                <p class="text-[#2D3748] leading-relaxed">
                  {{ emocionActual.tip }}
                </p>
              </div>
            </div>
          </div>

          <div class="border-t border-gray-100 bg-[#fcfaf8] p-5">
            <p class="text-sm font-semibold text-[#2D3748] mb-3">
              Otras emociones que puedes explorar
            </p>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="(emocion, index) in emocionesRueda"
                :key="`chip-${emocion.nombre}`"
                type="button"
                class="rounded-full border px-3 py-2 text-sm font-medium transition-all"
                :class="
                  emocionSeleccionada === index
                    ? 'text-white border-transparent shadow-sm'
                    : 'bg-white text-[#4A5568] border-gray-200 hover:border-gray-300'
                "
                :style="
                  emocionSeleccionada === index
                    ? { backgroundColor: emocion.color }
                    : {}
                "
                @click="selectEmotion(index)"
              >
                <img :src="emocion.img" :alt="emocion.nombre" class="w-4 h-4 mr-1.5 inline-block" />{{ emocion.nombre }}
              </button>
            </div>
          </div>
        </div>
      </Transition>

      <div class="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div
          v-for="emocion in emocionesRueda.slice(0, 4)"
          :key="`legend-${emocion.nombre}`"
          class="rounded-2xl border border-white/80 bg-white/80 px-3 py-3 text-center shadow-sm"
        >
          <div
            class="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-2xl"
            :style="{ backgroundColor: `${emocion.color}20` }"
          >
            <img :src="emocion.img" :alt="emocion.nombre" class="w-7 h-7 drop-shadow-sm" />
          </div>
          <p class="text-xs font-semibold text-[#2D3748]">
            {{ emocion.nombre }}
          </p>
        </div>
      </div>

      <div
        class="mt-4 rounded-2xl bg-gradient-to-r from-[#5B8DEE]/8 to-[#BC6C8A]/8 p-4 border border-white/80"
      >
        <div class="flex items-start gap-3">
          <div
            class="heart-pulse mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-white shadow-sm"
          >
            <Heart class="h-5 w-5 text-[#BC6C8A]" />
          </div>
          <div>
            <p class="text-sm font-semibold text-[#2D3748]">
              Tip de autoconocimiento
            </p>
            <p class="text-sm text-[#718096] mt-1">
              No hay emociones “buenas” o “malas”. Todas dan información valiosa
              sobre lo que necesitas.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
.wheel-pulse {
  animation: pulse 3s ease-in-out infinite;
}
.heart-pulse {
  animation: pulse 2s ease-in-out infinite;
}
.svg-line-transition {
  transition:
    stroke-opacity 0.4s ease,
    stroke-width 0.4s ease;
}
@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}
</style>
