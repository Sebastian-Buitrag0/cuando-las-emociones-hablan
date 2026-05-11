<script setup lang="ts">
import { computed, ref, onUnmounted, onMounted } from "vue";
import { Play, Pause, Wind, TimerReset } from "lucide-vue-next";
import AppButton from "@/components/ui/button.vue";

const EMOJI_BASE =
  "https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@latest/assets";

const activo = ref(false);
const fase = ref<"inhala" | "exhala">("inhala");
const segundosRestantes = ref(4);
const ciclosCompletados = ref(0);
let intervalId: ReturnType<typeof setInterval> | null = null;

// Reduced-motion gate — when on, the breathing visual stays static and we
// guide via copy + countdown instead of scaling rings.
const reduceMotion = ref(false);
let mql: MediaQueryList | null = null;
function syncMotion(e: MediaQueryListEvent | MediaQueryList) {
  reduceMotion.value = e.matches;
}

onMounted(() => {
  if (typeof window === "undefined") return;
  mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  syncMotion(mql);
  mql.addEventListener?.("change", syncMotion);
});

const textoFase = computed(() => {
  if (!activo.value) return "Prepárate";
  return fase.value === "inhala" ? "Inhala" : "Exhala";
});

const instruccionFase = computed(() => {
  if (!activo.value) return "Presiona iniciar y sigue el ritmo.";
  return fase.value === "inhala"
    ? "Llena tus pulmones lentamente durante 4 segundos."
    : "Suelta el aire con calma durante 4 segundos.";
});

// Tonal swap — inhale reads as 'calm', exhale as 'primary'
const colorFase = computed(() =>
  fase.value === "inhala" ? "hsl(170 50% 64%)" : "hsl(220 80% 64%)",
);

function escala(inhalaValue: number, exhalaValue: number = 1): number {
  if (reduceMotion.value) return 1;
  if (!activo.value) return 1;
  return fase.value === "inhala" ? inhalaValue : exhalaValue;
}

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
  mql?.removeEventListener?.("change", syncMotion);
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
        class="inline-flex items-center gap-2 rounded-full bg-calm/20 px-4 py-1.5 text-xs font-semibold text-foreground uppercase tracking-wider"
      >
        <Wind class="h-3.5 w-3.5 text-primary" />
        Pausa guiada de respiración
      </span>
      <h3 class="mt-5 text-2xl sm:text-3xl font-bold text-foreground" style="text-wrap: balance">
        Regula tu respiración y baja el estrés
      </h3>
      <p class="mt-2.5 text-muted-foreground max-w-prose-tight mx-auto leading-relaxed">
        Sigue el pulso visual. Inhala cuando el círculo crece y exhala cuando vuelve a su tamaño inicial.
      </p>
    </div>

    <div
      class="relative rounded-3xl border border-border/60 bg-surface/85 backdrop-blur-sm p-6 sm:p-8 shadow-soft overflow-hidden"
    >
      <!-- Decorative orbs (reduced-motion-gated via scoped style) -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div class="breath-float-1 absolute -top-8 -left-8 w-32 h-32 rounded-full bg-calm/10" />
        <div class="breath-float-2 absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-primary/[0.06]" />
        <div class="breath-float-3 absolute top-1/3 right-4 w-16 h-16 rounded-full bg-accent/10" />
      </div>

      <div class="relative z-10">
        <div class="relative w-64 h-64 sm:w-72 sm:h-72 mx-auto mb-8">
          <!-- Background glow that responds to breathing -->
          <div
            class="absolute inset-0 rounded-full transition-all ease-in-out blur-3xl"
            style="transition-duration: 4000ms"
            :style="{
              background: `radial-gradient(circle, ${colorFase}25 0%, transparent 70%)`,
              transform: `scale(${escala(1.6)})`,
              opacity: activo ? 0.8 : 0.3,
            }"
            aria-hidden="true"
          />

          <!-- Spinning orbit ring (already reduced-motion-gated globally) -->
          <div
            class="absolute inset-[6%] rounded-full border-2 border-dashed transition-colors duration-1000"
            :class="activo && !reduceMotion ? 'animate-spin-slow' : ''"
            :style="{
              borderColor: activo ? `${colorFase}30` : 'hsl(var(--primary) / 0.12)',
            }"
            aria-hidden="true"
          />

          <!-- Breathing rings — scale collapses to static when reduced-motion -->
          <div
            class="absolute inset-0 rounded-full transition-all ease-in-out"
            style="transition-duration: 4000ms"
            :style="{
              background:
                'radial-gradient(circle, hsl(170 50% 64% / 0.20) 0%, hsl(170 50% 64% / 0.05) 65%, transparent 100%)',
              transform: `scale(${escala(1.5)})`,
              opacity: activo ? (fase === 'inhala' ? 1 : 0.5) : 0.6,
            }"
            aria-hidden="true"
          />
          <div
            class="absolute inset-4 rounded-full transition-all ease-in-out"
            style="transition-duration: 4000ms"
            :style="{
              background: `radial-gradient(circle, ${colorFase}30 0%, hsl(var(--primary) / 0.08) 100%)`,
              transform: `scale(${escala(1.35)})`,
            }"
            aria-hidden="true"
          />
          <div
            class="absolute inset-8 rounded-full transition-all ease-in-out"
            style="transition-duration: 4000ms"
            :style="{
              background: `radial-gradient(circle, ${colorFase}40 0%, hsl(var(--primary) / 0.10) 100%)`,
              transform: `scale(${escala(1.2)})`,
            }"
            aria-hidden="true"
          />

          <!-- Center label -->
          <div class="absolute inset-0 flex items-center justify-center">
            <div
              class="relative flex h-28 w-28 sm:h-32 sm:w-32 flex-col items-center justify-center rounded-full text-primary-foreground font-semibold transition-all duration-700 ease-in-out"
              :style="{
                background: `linear-gradient(135deg, ${activo ? colorFase : 'hsl(170 50% 64%)'} 0%, hsl(220 80% 64%) 100%)`,
                boxShadow: `0 20px 50px ${activo ? colorFase : 'hsl(220 80% 64%)'}40`,
                transform: reduceMotion ? 'none' : (activo ? (fase === 'inhala' ? 'scale(1.08)' : 'scale(0.95)') : 'scale(1)'),
              }"
            >
              <span
                class="text-xs uppercase tracking-[0.2em] text-primary-foreground/75 tabular-nums"
                aria-live="polite"
              >{{ activo ? `${segundosRestantes}s` : "4s" }}</span>
              <span class="mt-0.5 text-lg sm:text-xl font-bold">{{ textoFase }}</span>
            </div>
          </div>
        </div>

        <!-- Phase info -->
        <Transition name="fade-slide" mode="out-in">
          <div
            :key="fase"
            class="max-w-md mx-auto mb-6 rounded-2xl p-4 text-center transition-colors duration-700"
            :style="{ backgroundColor: `${colorFase}14` }"
          >
            <p
              class="text-sm font-semibold transition-colors duration-700"
              :style="{ color: colorFase }"
            >
              {{ textoFase }}
            </p>
            <p class="mt-1 text-foreground/80 leading-relaxed text-sm">
              {{ instruccionFase }}
            </p>
          </div>
        </Transition>

        <!-- Cycles counter -->
        <Transition name="fade">
          <p v-if="ciclosCompletados > 0" class="text-xs text-muted-foreground mb-4 flex items-center justify-center gap-1.5">
            <img class="w-4 h-4" :src="`${EMOJI_BASE}/Counterclockwise%20arrows%20button/3D/counterclockwise_arrows_button_3d.png`" alt="" />
            {{ ciclosCompletados }} ciclo{{ ciclosCompletados > 1 ? "s" : "" }}
            completado{{ ciclosCompletados > 1 ? "s" : "" }}
          </p>
        </Transition>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
          <AppButton
            size="lg"
            class="rounded-full px-8 min-w-40 motion-safe:hover:scale-[1.02] transition-transform"
            @click="toggle"
          >
            <Pause v-if="activo" class="w-5 h-5 mr-1" />
            <Play v-else class="w-5 h-5 mr-1" />
            {{ activo ? "Pausar" : "Iniciar" }}
          </AppButton>

          <AppButton
            variant="ghost"
            size="lg"
            class="rounded-full px-8 min-w-40 motion-safe:hover:scale-[1.02] transition-transform"
            @click="reiniciar"
          >
            <TimerReset class="w-5 h-5 mr-1" />
            Reiniciar
          </AppButton>
        </div>

        <div class="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
          <div class="rounded-2xl bg-background p-4 border border-border/60 motion-safe:transition-transform motion-safe:hover:-translate-y-0.5">
            <p class="text-[10px] font-bold text-primary uppercase tracking-wider">Paso 1</p>
            <p class="mt-1.5 text-sm text-foreground/80 leading-relaxed">
              Inhala por la nariz durante 4 segundos.
            </p>
          </div>
          <div class="rounded-2xl bg-background p-4 border border-border/60 motion-safe:transition-transform motion-safe:hover:-translate-y-0.5">
            <p class="text-[10px] font-bold text-accent uppercase tracking-wider">Paso 2</p>
            <p class="mt-1.5 text-sm text-foreground/80 leading-relaxed">
              Exhala lentamente durante 4 segundos.
            </p>
          </div>
          <div class="rounded-2xl bg-background p-4 border border-border/60 motion-safe:transition-transform motion-safe:hover:-translate-y-0.5">
            <p class="text-[10px] font-bold text-secondary uppercase tracking-wider">Beneficio</p>
            <p class="mt-1.5 text-sm text-foreground/80 leading-relaxed">
              Calma el cuerpo y enfoca la mente.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (prefers-reduced-motion: no-preference) {
  .breath-float-1 { animation: breathFloat1 7s ease-in-out infinite; }
  .breath-float-2 { animation: breathFloat2 9s ease-in-out infinite 1.5s; }
  .breath-float-3 { animation: breathFloat3 5s ease-in-out infinite 0.7s; }

  @keyframes breathFloat1 {
    0%, 100% { transform: translateY(0) translateX(0); }
    50%      { transform: translateY(-18px) translateX(8px); }
  }
  @keyframes breathFloat2 {
    0%, 100% { transform: translateY(0) translateX(0); }
    50%      { transform: translateY(14px) translateX(-10px); }
  }
  @keyframes breathFloat3 {
    0%, 100% { transform: translateY(0) scale(1); }
    50%      { transform: translateY(-12px) scale(1.1); }
  }
}

.fade-slide-enter-active,
.fade-slide-leave-active { transition: opacity 0.35s ease, transform 0.35s ease; }
.fade-slide-enter-from   { opacity: 0; transform: translateY(6px); }
.fade-slide-leave-to     { opacity: 0; transform: translateY(-6px); }

.fade-enter-active,
.fade-leave-active { transition: opacity 0.4s ease; }
.fade-enter-from,
.fade-leave-to     { opacity: 0; }

@media (prefers-reduced-motion: reduce) {
  .fade-slide-enter-active,
  .fade-slide-leave-active,
  .fade-enter-active,
  .fade-leave-active {
    transition: none;
  }
  .fade-slide-enter-from,
  .fade-slide-leave-to {
    transform: none;
  }
}
</style>
