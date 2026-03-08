<script setup lang="ts">
import { Heart, Brain, Sparkles, ArrowDown } from "lucide-vue-next";
import AppButton from "@/components/ui/button.vue";

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior: "smooth" });
}
</script>

<template>
  <section
    class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero"
  >
    <!-- Floating decorative elements (CSS infinite animations) -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="float-1 absolute top-20 left-10 w-20 h-20 rounded-full bg-[#5B8DEE]/10"
      />
      <div
        class="float-2 absolute top-40 right-20 w-16 h-16 rounded-full bg-[#BC6C8A]/10"
      />
      <div
        class="float-3 absolute bottom-40 left-1/4 w-24 h-24 rounded-full bg-[#F4A259]/10"
      />
      <div
        class="float-4 absolute bottom-20 right-1/3 w-12 h-12 rounded-full bg-[#81E6D9]/20"
      />
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="max-w-4xl mx-auto text-center">
        <!-- Animated icon -->
        <div
          v-motion
          :initial="{ opacity: 0, scale: 0.5 }"
          :enter="{ opacity: 1, scale: 1, transition: { duration: 800 } }"
          class="mb-8 flex justify-center"
        >
          <div class="relative">
            <div
              class="pulse-ring absolute inset-0 bg-[#5B8DEE]/20 rounded-full blur-xl"
            />
            <div
              class="relative w-24 h-24 bg-gradient-to-br from-[#5B8DEE] to-[#BC6C8A] rounded-full flex items-center justify-center shadow-lg"
            >
              <Heart class="w-12 h-12 text-white" />
            </div>
            <div class="absolute -top-2 -right-2 sparkle-rotate">
              <Sparkles class="w-8 h-8 text-[#F4A259]" />
            </div>
          </div>
        </div>

        <!-- Title -->
        <h1
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :enter="{
            opacity: 1,
            y: 0,
            transition: { duration: 800, delay: 200 },
          }"
          class="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2D3748] mb-6 leading-tight"
        >
          Cuando las&nbsp;
          <span
            class="bg-gradient-to-r from-[#BC6C8A] to-[#F4A259] bg-clip-text text-transparent"
          >
            emociones hablan
          </span>
        </h1>

        <!-- Subtitle -->
        <p
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{
            opacity: 1,
            y: 0,
            transition: { duration: 800, delay: 400 },
          }"
          class="text-xl sm:text-2xl text-[#718096] mb-4"
        >
          Gimnasio Pedagógico Thomas Paine
        </p>

        <p
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{
            opacity: 1,
            y: 0,
            transition: { duration: 800, delay: 500 },
          }"
          class="text-lg text-[#718096]/80 mb-10 max-w-2xl mx-auto"
        >
          Un espacio digital para escuchar, comprender y transformar las
          emociones en herramientas de crecimiento personal y convivencia
          escolar
        </p>

        <!-- CTA Buttons -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{
            opacity: 1,
            y: 0,
            transition: { duration: 800, delay: 600 },
          }"
          class="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <AppButton
            size="lg"
            class="bg-[#5B8DEE] hover:bg-[#4a7bd9] text-white rounded-full px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            @click="scrollToSection('emociones')"
          >
            <Brain class="w-5 h-5 mr-2" />
            Comenzar
          </AppButton>
          <AppButton
            size="lg"
            variant="outline"
            class="border-2 border-[#BC6C8A] text-[#BC6C8A] hover:bg-[#BC6C8A] hover:text-white rounded-full px-8 py-6 text-lg font-semibold transition-all duration-300 hover:scale-105"
            @click="scrollToSection('habilidades')"
          >
            Saber más
          </AppButton>
        </div>

        <!-- Scroll indicator -->
        <div
          v-motion
          :initial="{ opacity: 0 }"
          :enter="{ opacity: 1, transition: { duration: 800, delay: 1000 } }"
          class="mt-16"
        >
          <button
            class="text-[#718096] hover:text-[#5B8DEE] transition-colors bounce-arrow"
            @click="scrollToSection('habilidades')"
          >
            <ArrowDown class="w-8 h-8 mx-auto" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.float-1 {
  animation: float1 5s ease-in-out infinite;
}
.float-2 {
  animation: float2 4s ease-in-out infinite 1s;
}
.float-3 {
  animation: float3 6s ease-in-out infinite 0.5s;
}
.float-4 {
  animation: float4 3.5s ease-in-out infinite 2s;
}
.pulse-ring {
  animation: pulse-ring 3s ease-in-out infinite;
}
.sparkle-rotate {
  animation: sparkle 2s ease-in-out infinite;
}
.bounce-arrow {
  animation: bounce 1.5s ease-in-out infinite;
}

@keyframes float1 {
  0%,
  100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-30px) scale(1.1);
  }
}
@keyframes float2 {
  0%,
  100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(20px) scale(1.2);
  }
}
@keyframes float3 {
  0%,
  100% {
    transform: translateY(0) translateX(0);
  }
  50% {
    transform: translateY(-20px) translateX(10px);
  }
}
@keyframes float4 {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(15px);
  }
}
@keyframes pulse-ring {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
}
@keyframes sparkle {
  0%,
  100% {
    transform: rotate(0deg);
  }
  33% {
    transform: rotate(15deg);
  }
  66% {
    transform: rotate(-15deg);
  }
}
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10px);
  }
}
</style>
