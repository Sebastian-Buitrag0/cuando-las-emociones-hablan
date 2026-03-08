<script setup lang="ts">
import { computed, ref, onUnmounted } from "vue";
import { Play, Pause, Wind, TimerReset } from "lucide-vue-next";
import AppButton from "@/components/ui/button.vue";

const activo = ref(false);
const fase = ref<"inhala" | "exhala">("inhala");
const segundosRestantes = ref(4);
const ciclosCompletados = ref(0);
let intervalId: ReturnType<typeof setInterval> | null = null;

const textoFase = computed(() => {
  if (!activo.value) return "Prepárate";
  return fase.value === "inhala" ? "Inhala" : "Exhala";
});

const instruccionFase = computed(() => {
  if (!activo.value) return "Presiona iniciar y sigue el ritmo visual";
  return fase.value === "inhala"
    ? "Llena tus pulmones lentamente durante 4 segundos"
    : "Suelta el aire con calma durante 4 segundos";
});

const colorFase = computed(() =>
  fase.value === "inhala" ? "#81E6D9" : "#5B8DEE",
);

function iniciarCiclo() {
  if (intervalId) clearInterval(intervalId);

  intervalId = setInterval(() => {
    if (segundosRestantes.value > 1) {
      segundosRestantes.value -= 1;
      return;
    }

    if (fase.value === "exhala") {
      ciclosCompletados.value += 1;
    }
    fase.value = fase.value === "inhala" ? "exhala" : "inhala";
    segundosRestantes.value = 4;
  }, 1000);
}

function toggle() {
  activo.value = !activo.value;
  if (activo.value) {
    iniciarCiclo();
  } else {
    if (intervalId) clearInterval(intervalId);
    intervalId = null;
  }
}

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});

function reiniciar() {
  activo.value = false;
  fase.value = "inhala";
  segundosRestantes.value = 4;
  ciclosCompletados.value = 0;
  if (intervalId) clearInterval(intervalId);
  intervalId = null;
}
</script>

<template>
  <div class="text-center max-w-3xl mx-auto">
    <div class="mb-6">
      <span
        class="inline-flex items-center gap-2 rounded-full bg-[#81E6D9]/15 px-4 py-2 text-sm font-semibold text-[#2D3748]"
      >
        <Wind class="h-4 w-4 text-[#5B8DEE]" />
        Pausa guiada de respiración
      </span>
      <h3 class="mt-4 text-2xl sm:text-3xl font-bold text-[#2D3748]">
        Regula tu respiración y baja el estrés
      </h3>
      <p class="mt-2 text-[#718096] max-w-xl mx-auto leading-relaxed">
        Sigue el pulso visual. Inhala cuando el círculo crece y exhala cuando
        vuelve a su tamaño inicial.
      </p>
    </div>

    <div
      class="relative rounded-3xl border border-white/80 bg-white/80 backdrop-blur-sm p-6 sm:p-8 shadow-soft overflow-hidden"
    >
      <!-- Floating decorative orbs (matching Hero style) -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          class="breath-float-1 absolute -top-8 -left-8 w-32 h-32 rounded-full bg-[#81E6D9]/8"
        />
        <div
          class="breath-float-2 absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-[#5B8DEE]/6"
        />
        <div
          class="breath-float-3 absolute top-1/3 right-4 w-16 h-16 rounded-full bg-[#BC6C8A]/8"
        />
      </div>

      <div class="relative z-10">
        <div class="relative w-64 h-64 sm:w-72 sm:h-72 mx-auto mb-8">
          <!-- Background glow that responds to breathing -->
          <div
            class="absolute inset-0 rounded-full transition-all ease-in-out blur-3xl"
            style="transition-duration: 4000ms"
            :style="{
              background: `radial-gradient(circle, ${colorFase}25 0%, transparent 70%)`,
              transform: activo
                ? fase === 'inhala'
                  ? 'scale(1.6)'
                  : 'scale(1)'
                : 'scale(1)',
              opacity: activo ? 0.8 : 0.3,
            }"
          />

          <!-- Spinning dashed orbit ring -->
          <div
            class="absolute inset-[6%] rounded-full border-2 border-dashed transition-colors duration-1000"
            :class="activo ? 'animate-spin-slow' : ''"
            :style="{
              borderColor: activo ? `${colorFase}30` : 'rgba(91,141,238,0.12)',
            }"
          />

          <!-- Breathing circles — using inline styles for custom scales -->
          <div
            class="absolute inset-0 rounded-full transition-all ease-in-out"
            style="transition-duration: 4000ms"
            :style="{
              background:
                'radial-gradient(circle, rgba(129,230,217,0.20) 0%, rgba(129,230,217,0.05) 65%, rgba(129,230,217,0) 100%)',
              transform: activo
                ? fase === 'inhala'
                  ? 'scale(1.5)'
                  : 'scale(1)'
                : 'scale(1)',
              opacity: activo ? (fase === 'inhala' ? 1 : 0.5) : 0.6,
            }"
          />
          <div
            class="absolute inset-4 rounded-full transition-all ease-in-out"
            style="transition-duration: 4000ms"
            :style="{
              background: `radial-gradient(circle, ${colorFase}30 0%, rgba(91,141,238,0.08) 100%)`,
              transform: activo
                ? fase === 'inhala'
                  ? 'scale(1.35)'
                  : 'scale(1)'
                : 'scale(1)',
            }"
          />
          <div
            class="absolute inset-8 rounded-full transition-all ease-in-out"
            style="transition-duration: 4000ms"
            :style="{
              background: `radial-gradient(circle, ${colorFase}40 0%, rgba(91,141,238,0.10) 100%)`,
              transform: activo
                ? fase === 'inhala'
                  ? 'scale(1.2)'
                  : 'scale(1)'
                : 'scale(1)',
            }"
          />

          <!-- Center label -->
          <div class="absolute inset-0 flex items-center justify-center">
            <div
              class="relative flex h-28 w-28 sm:h-32 sm:w-32 flex-col items-center justify-center rounded-full text-white font-semibold transition-all duration-700 ease-in-out"
              :style="{
                background: `linear-gradient(135deg, ${activo ? colorFase : '#81E6D9'} 0%, #5B8DEE 100%)`,
                boxShadow: `0 20px 50px ${activo ? colorFase : '#5B8DEE'}40`,
                transform: activo
                  ? fase === 'inhala'
                    ? 'scale(1.08)'
                    : 'scale(0.95)'
                  : 'scale(1)',
              }"
            >
              <span
                class="text-xs uppercase tracking-[0.2em] text-white/70 tabular-nums"
                >{{ activo ? `${segundosRestantes}s` : "4s" }}</span
              >
              <span class="mt-0.5 text-lg sm:text-xl font-bold">{{
                textoFase
              }}</span>
            </div>
          </div>
        </div>

        <!-- Phase info card -->
        <Transition name="fade-slide" mode="out-in">
          <div
            :key="fase"
            class="max-w-lg mx-auto mb-6 rounded-2xl p-4 text-center transition-colors duration-700"
            :style="{ backgroundColor: `${colorFase}12` }"
          >
            <p
              class="text-sm font-semibold transition-colors duration-700"
              :style="{ color: colorFase }"
            >
              {{ textoFase }}
            </p>
            <p class="mt-1 text-[#4A5568] leading-relaxed text-sm">
              {{ instruccionFase }}
            </p>
          </div>
        </Transition>

        <!-- Cycles counter -->
        <Transition name="fade">
          <p v-if="ciclosCompletados > 0" class="text-xs text-[#718096] mb-4">
            🔄 {{ ciclosCompletados }} ciclo{{
              ciclosCompletados > 1 ? "s" : ""
            }}
            completado{{ ciclosCompletados > 1 ? "s" : "" }}
          </p>
        </Transition>

        <div
          class="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <AppButton
            size="lg"
            class="rounded-full px-8 min-w-40 transition-all duration-300 hover:scale-105"
            @click="toggle"
          >
            <Pause v-if="activo" class="w-5 h-5 mr-2" />
            <Play v-else class="w-5 h-5 mr-2" />
            {{ activo ? "Pausar" : "Iniciar" }}
          </AppButton>

          <AppButton
            variant="outline"
            size="lg"
            class="rounded-full px-8 min-w-40 transition-all duration-300 hover:scale-105"
            @click="reiniciar"
          >
            <TimerReset class="w-5 h-5 mr-2" />
            Reiniciar
          </AppButton>
        </div>

        <div class="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
          <div
            class="rounded-2xl bg-[#FEFBF7] p-4 border border-gray-100 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm"
          >
            <p
              class="text-xs font-semibold text-[#5B8DEE] uppercase tracking-wide"
            >
              Paso 1
            </p>
            <p class="mt-1 text-sm text-[#4A5568]">
              Inhala por la nariz durante 4 segundos.
            </p>
          </div>
          <div
            class="rounded-2xl bg-[#FEFBF7] p-4 border border-gray-100 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm"
          >
            <p
              class="text-xs font-semibold text-[#BC6C8A] uppercase tracking-wide"
            >
              Paso 2
            </p>
            <p class="mt-1 text-sm text-[#4A5568]">
              Exhala lentamente durante 4 segundos.
            </p>
          </div>
          <div
            class="rounded-2xl bg-[#FEFBF7] p-4 border border-gray-100 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm"
          >
            <p
              class="text-xs font-semibold text-[#F4A259] uppercase tracking-wide"
            >
              Beneficio
            </p>
            <p class="mt-1 text-sm text-[#4A5568]">
              Ayuda a calmar el cuerpo y enfocar la mente.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.breath-float-1 {
  animation: breathFloat1 7s ease-in-out infinite;
}
.breath-float-2 {
  animation: breathFloat2 9s ease-in-out infinite 1.5s;
}
.breath-float-3 {
  animation: breathFloat3 5s ease-in-out infinite 0.7s;
}

@keyframes breathFloat1 {
  0%,
  100% {
    transform: translateY(0) translateX(0);
  }
  50% {
    transform: translateY(-18px) translateX(8px);
  }
}
@keyframes breathFloat2 {
  0%,
  100% {
    transform: translateY(0) translateX(0);
  }
  50% {
    transform: translateY(14px) translateX(-10px);
  }
}
@keyframes breathFloat3 {
  0%,
  100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-12px) scale(1.1);
  }
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.35s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
