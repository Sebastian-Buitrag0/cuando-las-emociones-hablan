<script setup lang="ts">
import Navbar from "./sections/Navbar.vue";
import Footer from "./sections/Footer.vue";
import ChatBubble from "./components/ChatBubble.vue";
</script>

<template>
  <div class="min-h-screen bg-background">
    <Navbar />
    <router-view />
    <Footer />
    <ChatBubble />
  </div>
</template>
