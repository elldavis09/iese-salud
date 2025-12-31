<!-- src/App.vue -->
<script setup>
import NavBar from './components/NavBar.vue';
import ToastNotification from "@/components/ToastNotification.vue";
</script>

<template>
  <NavBar />
  <ToastNotification />

  <!-- Contenido Principal -->
  <main class="py-6 bg-gray-50 min-h-screen">
    <!-- Aquí es donde se muestran Login, Registro o Dashboard -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
