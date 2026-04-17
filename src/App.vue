<script setup lang="ts">
import Navbar from "./sections/Navbar.vue";
import Hero from "./sections/Hero.vue";
import Habilidades from "./sections/Habilidades.vue";
import Emociones from "./sections/Emociones.vue";
import Regulacion from "./sections/Regulacion.vue";
import Apoyo from "./sections/Apoyo.vue";
import Convivencia from "./sections/Convivencia.vue";
import Familias from "./sections/Familias.vue";
import Docentes from "./sections/Docentes.vue";
import Footer from "./sections/Footer.vue";
</script>

<template>
  <div class="min-h-screen bg-[#FEFBF7]">
    <Navbar />
    <main>
      <Hero />
      <Habilidades />
      <Emociones />
      <Regulacion />
      <Apoyo />
      <Convivencia />
      <Familias />
      <Docentes />
    </main>
    <Footer />
  </div>
</template>
