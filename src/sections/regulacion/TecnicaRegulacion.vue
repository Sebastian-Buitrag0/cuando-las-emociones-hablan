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
    <!-- Header card -->
    <div
      class="rounded-3xl p-6 sm:p-7 border border-white/80"
      :style="{
        background: `linear-gradient(135deg, ${color}18 0%, #ffffff 70%)`,
      }"
    >
      <div class="flex items-start gap-4">
        <div
          class="flex h-14 w-14 items-center justify-center rounded-2xl text-3xl shadow-md flex-shrink-0"
          :style="{ backgroundColor: `${color}25` }"
        >
          <img
            :src="emojiImg"
            alt=""
            class="w-9 h-9 drop-shadow-sm"
          />
        </div>
        <div>
          <h3 class="text-xl sm:text-2xl font-bold text-[#2D3748]">
            {{ titulo }}
          </h3>
          <p class="mt-1 text-[#718096] leading-relaxed">{{ subtitulo }}</p>
        </div>
      </div>
    </div>

    <!-- Síntomas + Tipos -->
    <div class="rounded-2xl bg-white border border-gray-100 p-5 shadow-soft">
      <div class="flex items-center gap-2 mb-3">
        <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F6AD55]/15">
          <AlertCircle class="h-4 w-4 text-[#C05621]" />
        </div>
        <h4 class="font-bold text-[#2D3748]">¿Cómo reconocerla?</h4>
      </div>
      <p class="text-xs text-[#718096] mb-3">
        Algunas señales que pueden aparecer. Si identificas 3 o más durante más de 2 semanas, busca apoyo:
      </p>
      <ul class="space-y-2">
        <li
          v-for="(s, i) in sintomas"
          :key="i"
          class="flex items-start gap-2 text-sm text-[#4A5568]"
        >
          <span class="mt-0.5 flex-shrink-0 font-bold text-[#C05621]">›</span>
          <span>{{ s }}</span>
        </li>
      </ul>
      <div class="mt-4 pt-3 border-t border-gray-100">
        <p class="text-xs text-[#718096]">
          <span class="font-semibold text-[#2D3748]">Tipos: </span>{{ tipos }}
        </p>
      </div>
    </div>

    <!-- Two-column tips grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Prevención -->
      <div
        class="rounded-2xl bg-white border border-gray-100 p-5 shadow-soft"
      >
        <div class="flex items-center gap-2 mb-3">
          <div
            class="flex h-9 w-9 items-center justify-center rounded-xl bg-[#81E6D9]/20"
          >
            <Shield class="h-4 w-4 text-[#0D9488]" />
          </div>
          <h4 class="font-bold text-[#2D3748]">Prevención</h4>
        </div>
        <p class="text-xs text-[#718096] mb-3">
          Hábitos que te ayudan antes de que la emoción te desborde.
        </p>
        <ul class="space-y-2">
          <li
            v-for="(tip, i) in prevencion"
            :key="i"
            class="flex items-start gap-2 text-sm text-[#4A5568]"
          >
            <span class="mt-0.5 flex-shrink-0 font-bold text-[#0D9488]">›</span>
            <span>{{ tip }}</span>
          </li>
        </ul>
      </div>

      <!-- Respuesta inmediata -->
      <div
        class="rounded-2xl bg-white border border-gray-100 p-5 shadow-soft"
      >
        <div class="flex items-center gap-2 mb-3">
          <div
            class="flex h-9 w-9 items-center justify-center rounded-xl"
            :style="{ backgroundColor: `${color}22` }"
          >
            <Zap class="h-4 w-4" :style="{ color }" />
          </div>
          <h4 class="font-bold text-[#2D3748]">Respuesta inmediata</h4>
        </div>
        <p class="text-xs text-[#718096] mb-3">
          Qué hacer cuando la emoción está aquí y ahora.
        </p>
        <ul class="space-y-2">
          <li
            v-for="(tip, i) in inmediato"
            :key="i"
            class="flex items-start gap-2 text-sm text-[#4A5568]"
          >
            <span
              class="mt-0.5 flex-shrink-0 font-bold"
              :style="{ color }"
              >›</span
            >
            <span>{{ tip }}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Música -->
    <a
      :href="musica.url"
      target="_blank"
      rel="noopener noreferrer"
      class="group rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-[#fff8f3] p-5 hover:-translate-y-0.5 transition-all duration-300 hover:shadow-hover block"
    >
      <div class="flex items-center gap-2 mb-2">
        <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-[#BC6C8A]/15">
          <Music class="h-4 w-4 text-[#BC6C8A]" />
        </div>
        <h4 class="font-bold text-[#2D3748]">Música sugerida</h4>
      </div>
      <p class="text-sm font-semibold text-[#2D3748]">{{ musica.titulo }}</p>
      <p class="text-xs text-[#718096] mt-0.5">{{ musica.artista }}</p>
      <p class="text-xs text-[#BC6C8A] font-semibold mt-3 group-hover:translate-x-1 transition-transform">
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
        class="group rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-[#f6fffd] p-5 hover:-translate-y-0.5 transition-all duration-300 hover:shadow-hover"
      >
        <div class="flex items-center gap-2 mb-2">
          <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-[#5B8DEE]/15">
            <Youtube class="h-4 w-4 text-[#5B8DEE]" />
          </div>
          <h4 class="font-bold text-[#2D3748]">Video recomendado</h4>
        </div>
        <p class="text-sm font-semibold text-[#2D3748]">{{ vid.titulo }}</p>
        <p class="text-xs text-[#5B8DEE] font-semibold mt-3 group-hover:translate-x-1 transition-transform">
          Ver video →
        </p>
      </a>
    </div>

    <!-- Respiración como herramienta -->
    <div class="rounded-2xl border border-[#81E6D9]/40 bg-gradient-to-br from-[#81E6D9]/8 to-white p-5">
      <button
        class="w-full flex items-center justify-between gap-3 text-left"
        @click="mostrarRespiracion = !mostrarRespiracion"
      >
        <div class="flex items-center gap-3">
          <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-[#81E6D9]/25">
            <Wind class="h-4 w-4 text-[#0D9488]" />
          </div>
          <div>
            <p class="font-bold text-[#2D3748] text-sm">Respiración como herramienta de regulación</p>
            <p class="text-xs text-[#718096]">La respiración consciente baja el ritmo cardíaco en 60 s y calma el sistema nervioso.</p>
          </div>
        </div>
        <ChevronDown
          class="h-4 w-4 text-[#0D9488] flex-shrink-0 transition-transform duration-300"
          :class="mostrarRespiracion ? 'rotate-180' : ''"
        />
      </button>
      <Transition name="resp-slide">
        <div v-if="mostrarRespiracion" class="mt-5 pt-4 border-t border-[#81E6D9]/30">
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
      <div class="flex items-center gap-2 mb-2">
        <div
          class="flex h-9 w-9 items-center justify-center rounded-xl bg-white"
        >
          <Sparkles class="h-4 w-4" :style="{ color }" />
        </div>
        <h4 class="font-bold text-[#2D3748]">Reto · {{ reto.titulo }}</h4>
      </div>
      <p class="text-sm text-[#4A5568] mb-4">{{ reto.descripcion }}</p>
      <ul class="space-y-2">
        <li
          v-for="(paso, i) in reto.pasos"
          :key="i"
          class="flex items-start gap-3 rounded-xl bg-white/70 backdrop-blur-sm p-3 cursor-pointer hover:bg-white transition-colors"
          @click="toggleReto(i)"
        >
          <CheckCircle2
            v-if="retosCompletados.has(i)"
            class="h-5 w-5 mt-0.5 flex-shrink-0"
            :style="{ color }"
          />
          <Circle
            v-else
            class="h-5 w-5 mt-0.5 flex-shrink-0 text-gray-300"
          />
          <span
            class="text-sm leading-relaxed flex items-center gap-2"
            :class="
              retosCompletados.has(i)
                ? 'text-[#A0AEC0] line-through'
                : 'text-[#2D3748]'
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
    <div class="rounded-2xl border border-[#5B8DEE]/20 bg-gradient-to-br from-[#EBF4FF] to-white p-5">
      <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 text-xl shadow-sm select-none">
          🧠
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-bold text-[#2D3748]">¿Quieres orientación personalizada?</p>
          <p class="text-xs text-[#718096] mt-0.5">Emilio puede acompañarte con lo que sientes ahora mismo, a cualquier hora.</p>
        </div>
        <button
          @click="hablarConEmilio"
          class="flex-shrink-0 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
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
</style>
