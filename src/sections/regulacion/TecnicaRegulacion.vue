<script setup lang="ts">
import { ref } from "vue";
import {
  Shield,
  Zap,
  Music,
  Youtube,
  Sparkles,
  CheckCircle2,
  Circle,
  AlertCircle,
  Wind,
  ChevronDown,
  BotMessageSquare,
} from "lucide-vue-next";
import EjercicioRespiracion from "@/sections/emociones/EjercicioRespiracion.vue";

type Paso = string | { texto: string; emojiImg?: string; emojiAlt?: string };

type Props = {
  titulo: string;
  subtitulo: string;
  color: string;
  emojiImg: string;
  sintomas: string[];
  tipos: string;
  prevencion: string[];
  inmediato: string[];
  musica: { titulo: string; artista: string; url: string };
  videos: { titulo: string; url: string }[];
  reto: { titulo: string; descripcion: string; pasos: Paso[] };
};

function getPasoTexto(paso: Paso): string {
  return typeof paso === "string" ? paso : paso.texto;
}

function getPasoEmoji(paso: Paso): { img?: string; alt?: string } {
  return typeof paso === "string" ? {} : { img: paso.emojiImg, alt: paso.emojiAlt };
}

const props = defineProps<Props>();

const retosCompletados   = ref<Set<number>>(new Set());
const mostrarRespiracion = ref(false);

function hablarConEmilio() {
  window.dispatchEvent(new CustomEvent("emilio:open", {
    detail: {
      contexto: `Estoy pasando por ${props.titulo}. ${props.subtitulo} Me gustaría hablar sobre esto y recibir orientación personalizada.`,
    },
  }));
}

function toggleReto(idx: number) {
  if (retosCompletados.value.has(idx)) {
    retosCompletados.value.delete(idx);
  } else {
    retosCompletados.value.add(idx);
  }
  retosCompletados.value = new Set(retosCompletados.value);
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header card — tinted with emotion's identity color -->
    <div
      class="rounded-3xl p-6 sm:p-7 border border-border/60"
      :style="{
        background: `linear-gradient(135deg, ${color}1A 0%, hsl(var(--surface)) 70%)`,
      }"
    >
      <div class="flex items-start gap-4">
        <div
          class="flex h-14 w-14 items-center justify-center rounded-2xl text-3xl shadow-soft flex-shrink-0"
          :style="{ backgroundColor: `${color}26` }"
        >
          <img
            :src="emojiImg"
            alt=""
            class="w-9 h-9 drop-shadow-sm"
          />
        </div>
        <div>
          <h3 class="text-xl sm:text-2xl font-bold text-foreground">
            {{ titulo }}
          </h3>
          <p class="mt-1.5 text-muted-foreground leading-relaxed">{{ subtitulo }}</p>
        </div>
      </div>
    </div>

    <!-- Síntomas + Tipos -->
    <div class="rounded-2xl bg-surface border border-border/60 p-5 shadow-soft">
      <div class="flex items-center gap-2.5 mb-3">
        <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/15">
          <AlertCircle class="h-4 w-4 text-secondary" />
        </div>
        <h4 class="font-bold text-foreground">¿Cómo reconocerla?</h4>
      </div>
      <p class="text-xs text-muted-foreground mb-3 leading-relaxed">
        Algunas señales que pueden aparecer. Si identificas 3 o más durante más de 2 semanas, busca apoyo.
      </p>
      <ul class="space-y-2">
        <li
          v-for="(s, i) in sintomas"
          :key="i"
          class="flex items-start gap-2.5 text-sm text-foreground/80"
        >
          <span class="mt-0.5 flex-shrink-0 font-bold text-secondary">›</span>
          <span class="leading-relaxed">{{ s }}</span>
        </li>
      </ul>
      <div class="mt-4 pt-3 border-t border-border/60">
        <p class="text-xs text-muted-foreground leading-relaxed">
          <span class="font-semibold text-foreground">Tipos: </span>{{ tipos }}
        </p>
      </div>
    </div>

    <!-- Two-column tips grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="rounded-2xl bg-surface border border-border/60 p-5 shadow-soft">
        <div class="flex items-center gap-2.5 mb-3">
          <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-calm/25">
            <Shield class="h-4 w-4 text-calm-foreground" />
          </div>
          <h4 class="font-bold text-foreground">Prevención</h4>
        </div>
        <p class="text-xs text-muted-foreground mb-3 leading-relaxed">
          Hábitos que te ayudan antes de que la emoción te desborde.
        </p>
        <ul class="space-y-2">
          <li
            v-for="(tip, i) in prevencion"
            :key="i"
            class="flex items-start gap-2.5 text-sm text-foreground/80"
          >
            <span class="mt-0.5 flex-shrink-0 font-bold text-calm-foreground">›</span>
            <span class="leading-relaxed">{{ tip }}</span>
          </li>
        </ul>
      </div>

      <div class="rounded-2xl bg-surface border border-border/60 p-5 shadow-soft">
        <div class="flex items-center gap-2.5 mb-3">
          <div
            class="flex h-9 w-9 items-center justify-center rounded-xl"
            :style="{ backgroundColor: `${color}26` }"
          >
            <Zap class="h-4 w-4" :style="{ color }" />
          </div>
          <h4 class="font-bold text-foreground">Respuesta inmediata</h4>
        </div>
        <p class="text-xs text-muted-foreground mb-3 leading-relaxed">
          Qué hacer cuando la emoción está aquí y ahora.
        </p>
        <ul class="space-y-2">
          <li
            v-for="(tip, i) in inmediato"
            :key="i"
            class="flex items-start gap-2.5 text-sm text-foreground/80"
          >
            <span
              class="mt-0.5 flex-shrink-0 font-bold"
              :style="{ color }"
              >›</span
            >
            <span class="leading-relaxed">{{ tip }}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Música -->
    <a
      :href="musica.url"
      target="_blank"
      rel="noopener noreferrer"
      class="group rounded-2xl border border-border/60 bg-surface p-5 motion-safe:hover:-translate-y-0.5 transition-[transform,box-shadow] duration-300 hover:shadow-lift block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <div class="flex items-center gap-2.5 mb-2">
        <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/15">
          <Music class="h-4 w-4 text-accent" />
        </div>
        <h4 class="font-bold text-foreground">Música sugerida</h4>
      </div>
      <p class="text-sm font-semibold text-foreground">{{ musica.titulo }}</p>
      <p class="text-xs text-muted-foreground mt-0.5">{{ musica.artista }}</p>
      <p class="text-xs text-accent font-semibold mt-3 motion-safe:group-hover:translate-x-1 transition-transform">
        Escuchar →
      </p>
    </a>

    <!-- Videos -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <a
        v-for="(vid, i) in videos"
        :key="i"
        :href="vid.url"
        target="_blank"
        rel="noopener noreferrer"
        class="group rounded-2xl border border-border/60 bg-surface p-5 motion-safe:hover:-translate-y-0.5 transition-[transform,box-shadow] duration-300 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <div class="flex items-center gap-2.5 mb-2">
          <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15">
            <Youtube class="h-4 w-4 text-primary" />
          </div>
          <h4 class="font-bold text-foreground">Video recomendado</h4>
        </div>
        <p class="text-sm font-semibold text-foreground leading-snug">{{ vid.titulo }}</p>
        <p class="text-xs text-primary font-semibold mt-3 motion-safe:group-hover:translate-x-1 transition-transform">
          Ver video →
        </p>
      </a>
    </div>

    <!-- Respiración -->
    <div class="rounded-2xl border border-calm/40 bg-calm/[0.08] p-5">
      <button
        class="w-full flex items-center justify-between gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl"
        :aria-expanded="mostrarRespiracion"
        @click="mostrarRespiracion = !mostrarRespiracion"
      >
        <div class="flex items-center gap-3">
          <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-calm/30">
            <Wind class="h-4 w-4 text-calm-foreground" />
          </div>
          <div>
            <p class="font-bold text-foreground text-sm">Respiración como herramienta de regulación</p>
            <p class="text-xs text-muted-foreground leading-relaxed">La respiración consciente baja el ritmo cardíaco en 60 s y calma el sistema nervioso.</p>
          </div>
        </div>
        <ChevronDown
          class="h-4 w-4 text-calm-foreground flex-shrink-0 motion-safe:transition-transform duration-300"
          :class="mostrarRespiracion ? 'rotate-180' : ''"
        />
      </button>
      <Transition name="resp-slide">
        <div v-if="mostrarRespiracion" class="mt-5 pt-4 border-t border-calm/30">
          <EjercicioRespiracion />
        </div>
      </Transition>
    </div>

    <!-- Reto -->
    <div
      class="rounded-2xl border p-5 sm:p-6"
      :style="{
        backgroundColor: `${color}10`,
        borderColor: `${color}30`,
      }"
    >
      <div class="flex items-center gap-2.5 mb-2">
        <div
          class="flex h-9 w-9 items-center justify-center rounded-xl bg-surface"
        >
          <Sparkles class="h-4 w-4" :style="{ color }" />
        </div>
        <h4 class="font-bold text-foreground">Reto · {{ reto.titulo }}</h4>
      </div>
      <p class="text-sm text-foreground/80 mb-4 leading-relaxed">{{ reto.descripcion }}</p>
      <ul class="space-y-2">
        <li
          v-for="(paso, i) in reto.pasos"
          :key="i"
          class="flex items-start gap-3 rounded-xl bg-surface/80 backdrop-blur-sm p-3 cursor-pointer hover:bg-surface transition-colors focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-1"
          @click="toggleReto(i)"
        >
          <CheckCircle2
            v-if="retosCompletados.has(i)"
            class="h-5 w-5 mt-0.5 flex-shrink-0"
            :style="{ color }"
          />
          <Circle
            v-else
            class="h-5 w-5 mt-0.5 flex-shrink-0 text-muted-foreground/40"
          />
          <span
            class="text-sm leading-relaxed flex items-center gap-2"
            :class="
              retosCompletados.has(i)
                ? 'text-muted-foreground/70 line-through'
                : 'text-foreground'
            "
          >
            <img
              v-if="getPasoEmoji(paso).img"
              :src="getPasoEmoji(paso).img"
              :alt="getPasoEmoji(paso).alt || ''"
              class="w-4 h-4 flex-shrink-0"
            />
            {{ getPasoTexto(paso) }}
          </span>
        </li>
      </ul>
    </div>

    <!-- Emilio CTA -->
    <div class="rounded-2xl border border-primary/20 bg-primary/[0.04] p-5">
      <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground text-xl shadow-soft select-none">
          🧠
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-bold text-foreground">¿Quieres orientación personalizada?</p>
          <p class="text-xs text-muted-foreground mt-0.5 leading-relaxed">Emilio puede acompañarte con lo que sientes ahora mismo, a cualquier hora.</p>
        </div>
        <button
          @click="hablarConEmilio"
          class="flex-shrink-0 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold bg-primary text-primary-foreground shadow-soft motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 transition-[transform,box-shadow] duration-200 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <BotMessageSquare class="w-4 h-4" />
          Hablar con Emilio
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.resp-slide-enter-active,
.resp-slide-leave-active {
  transition: opacity 0.3s ease, max-height 0.4s ease;
  overflow: hidden;
  max-height: 1200px;
}
.resp-slide-enter-from,
.resp-slide-leave-to {
  opacity: 0;
  max-height: 0;
}

@media (prefers-reduced-motion: reduce) {
  .resp-slide-enter-active,
  .resp-slide-leave-active {
    transition: none;
  }
}
</style>
