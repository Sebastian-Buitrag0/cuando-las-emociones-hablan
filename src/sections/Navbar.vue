<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Menu, X } from "lucide-vue-next";
import AppButton from "@/components/ui/button.vue";
import logoPagina from "@/img/logo-pagina.png";

const router = useRouter();
const route = useRoute();

const navLinks = [
  { href: "#habilidades", label: "Habilidades", route: "/" },
  { href: "#emociones", label: "Reconocimiento", route: "/" },
  { href: "#regulacion", label: "Regulación", route: "/" },
  { href: "#apoyo", label: "Apoyo", route: "/" },
  { href: "#bullying", label: "Bullying", route: "/" },
  { href: "#convivencia", label: "Convivencia", route: "/" },
  { href: "/familias", label: "Familias", route: "/familias" },
  { href: "/docentes", label: "Docentes", route: "/docentes" },
];

const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

const isHome = () => route.name === "home";

function handleScroll() {
  isScrolled.value = window.scrollY > 24;
}

onMounted(() => window.addEventListener("scroll", handleScroll, { passive: true }));
onUnmounted(() => window.removeEventListener("scroll", handleScroll));

function handleNav(link: typeof navLinks[number]) {
  isMobileMenuOpen.value = false;

  const targetRoute = link.route;
  const currentRoute = isHome() ? "/" : `/${String(route.name)}`;

  if (targetRoute !== currentRoute) {
    router.push(targetRoute).then(() => {
      if (link.href.startsWith("#")) {
        setTimeout(() => {
          const el = document.querySelector(link.href);
          el?.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
    });
  } else if (link.href.startsWith("#")) {
    const el = document.querySelector(link.href);
    el?.scrollIntoView({ behavior: "smooth" });
  }
}

function scrollToTop() {
  if (!isHome()) {
    router.push("/");
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function empezarHandler() {
  isMobileMenuOpen.value = false;
  if (!isHome()) {
    router.push("/").then(() => {
      setTimeout(() => {
        document.querySelector("#emociones")?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    });
  } else {
    document.querySelector("#emociones")?.scrollIntoView({ behavior: "smooth" });
  }
}
</script>

<template>
  <nav
    v-motion
    :initial="{ y: -100 }"
    :enter="{ y: 0, transition: { duration: 600 } }"
    class="fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300"
    :class="
      isScrolled
        ? 'bg-background/85 backdrop-blur-md shadow-soft'
        : 'bg-background/60 backdrop-blur-sm'
    "
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div
        class="flex items-center justify-between transition-[height] duration-300"
        :class="isScrolled ? 'h-14 lg:h-16' : 'h-16 lg:h-20'"
      >
        <!-- Logo + wordmark -->
        <a
          href="#"
          class="flex items-center gap-3 group motion-safe:transition-transform motion-safe:hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:rounded-lg"
          @click.prevent="scrollToTop"
        >
          <div
            class="w-10 h-10 lg:w-11 lg:h-11 rounded-xl flex items-center justify-center flex-shrink-0 bg-background group-hover:shadow-soft transition-shadow overflow-hidden ring-1 ring-foreground/5"
          >
            <img
              :src="logoPagina"
              alt="Logo Gimnasio Pedagógico Thomas Paine"
              class="w-full h-full object-contain"
            />
          </div>
          <span
            class="font-semibold text-sm sm:text-base text-foreground leading-tight"
          >
            Cuando las emociones hablan
          </span>
        </a>

        <!-- Desktop Navigation -->
        <div class="hidden xl:flex items-center gap-0.5">
          <button
            v-for="link in navLinks"
            :key="link.href"
            class="px-3.5 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-foreground/[0.04] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            @click="handleNav(link)"
          >
            {{ link.label }}
          </button>
        </div>

        <!-- Desktop CTA -->
        <div class="hidden xl:block">
          <AppButton
            class="rounded-full px-6"
            @click="empezarHandler"
          >
            Empezar
          </AppButton>
        </div>

        <!-- Mobile menu button -->
        <button
          class="xl:hidden p-2 rounded-xl hover:bg-foreground/[0.05] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          :aria-label="isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'"
          :aria-expanded="isMobileMenuOpen"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <X v-if="isMobileMenuOpen" class="w-6 h-6 text-foreground" />
          <Menu v-else class="w-6 h-6 text-foreground" />
        </button>
      </div>
    </div>
  </nav>

  <!-- Mobile menu -->
  <Transition name="mobile-menu">
    <div v-if="isMobileMenuOpen" class="fixed inset-0 z-40 xl:hidden">
      <div
        class="absolute inset-0 bg-foreground/30 backdrop-blur-sm"
        @click="isMobileMenuOpen = false"
      />
      <div
        class="absolute top-20 left-4 right-4 bg-background rounded-2xl shadow-soft p-5"
      >
        <div class="flex flex-col gap-1">
          <button
            v-for="link in navLinks"
            :key="link.href"
            class="px-4 py-3 rounded-xl text-left text-foreground font-medium hover:bg-foreground/[0.04] hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            @click="handleNav(link)"
          >
            {{ link.label }}
          </button>
          <div class="pt-4 border-t border-border mt-2">
            <AppButton
              class="w-full rounded-full"
              @click="empezarHandler"
            >
              Empezar
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

@media (prefers-reduced-motion: reduce) {
  .mobile-menu-enter-active,
  .mobile-menu-leave-active {
    transition: none;
  }
}
</style>
