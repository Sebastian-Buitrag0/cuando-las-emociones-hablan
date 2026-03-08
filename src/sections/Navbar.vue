<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { Menu, X, Heart } from "lucide-vue-next";
import AppButton from "@/components/ui/button.vue";

const navLinks = [
  { href: "#habilidades", label: "Habilidades" },
  { href: "#emociones", label: "Emociones" },
  { href: "#convivencia", label: "Convivencia" },
  { href: "#familias", label: "Familias" },
  { href: "#docentes", label: "Docentes" },
];

const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

function handleScroll() {
  isScrolled.value = window.scrollY > 50;
}

onMounted(() => window.addEventListener("scroll", handleScroll));
onUnmounted(() => window.removeEventListener("scroll", handleScroll));

function scrollToSection(href: string) {
  const el = document.querySelector(href);
  el?.scrollIntoView({ behavior: "smooth" });
  isMobileMenuOpen.value = false;
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
</script>

<template>
  <!-- Navbar -->
  <nav
    v-motion
    :initial="{ y: -100 }"
    :enter="{ y: 0, transition: { duration: 600 } }"
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="
      isScrolled ? 'bg-white/90 backdrop-blur-md shadow-soft' : 'bg-transparent'
    "
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 lg:h-20">
        <!-- Logo -->
        <a
          href="#"
          class="flex items-center gap-2 group transition-transform hover:scale-[1.02]"
          @click.prevent="scrollToTop"
        >
          <div
            class="w-10 h-10 bg-gradient-to-br from-[#5B8DEE] to-[#BC6C8A] rounded-xl flex items-center justify-center group-hover:shadow-lg transition-shadow flex-shrink-0"
          >
            <Heart class="w-5 h-5 text-white" />
          </div>
          <div class="flex flex-col leading-tight">
            <span
              class="font-bold text-sm sm:text-base text-[#2D3748] transition-colors leading-snug"
              >Cuando las emociones hablan</span
            >
            <span class="text-xs text-[#718096] font-medium">GPTP</span>
          </div>
        </a>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center gap-1">
          <button
            v-for="link in navLinks"
            :key="link.href"
            class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 text-[#718096] hover:text-[#5B8DEE] hover:bg-[#5B8DEE]/10"
            @click="scrollToSection(link.href)"
          >
            {{ link.label }}
          </button>
        </div>

        <!-- CTA Button -->
        <div class="hidden lg:block">
          <AppButton
            class="bg-[#5B8DEE] hover:bg-[#4a7bd9] text-white rounded-full px-6"
            @click="scrollToSection('#emociones')"
          >
            Comenzar
          </AppButton>
        </div>

        <!-- Mobile Menu Button -->
        <button
          class="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <X v-if="isMobileMenuOpen" class="w-6 h-6 text-[#2D3748]" />
          <Menu v-else class="w-6 h-6 text-[#2D3748]" />
        </button>
      </div>
    </div>
  </nav>

  <!-- Mobile Menu -->
  <Transition name="mobile-menu">
    <div v-if="isMobileMenuOpen" class="fixed inset-0 z-40 lg:hidden">
      <div
        class="absolute inset-0 bg-black/20 backdrop-blur-sm"
        @click="isMobileMenuOpen = false"
      />
      <div
        class="absolute top-20 left-4 right-4 bg-white rounded-2xl shadow-xl p-6"
      >
        <div class="flex flex-col gap-2">
          <button
            v-for="link in navLinks"
            :key="link.href"
            class="px-4 py-3 rounded-xl text-left text-[#2D3748] font-medium hover:bg-[#5B8DEE]/10 hover:text-[#5B8DEE] transition-colors"
            @click="scrollToSection(link.href)"
          >
            {{ link.label }}
          </button>
          <div class="pt-4 border-t border-gray-100 mt-2">
            <AppButton
              class="w-full bg-[#5B8DEE] hover:bg-[#4a7bd9] text-white rounded-full"
              @click="scrollToSection('#emociones')"
            >
              Comenzar
            </AppButton>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.3s ease;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
}
</style>
