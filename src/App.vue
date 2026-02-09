<!-- src/App.vue -->
<script setup>
import ToastNotification from "@/components/ToastNotification.vue";
</script>

<template>
<!--  <NavBar />-->
  <ToastNotification />

  <!-- Contenido Principal -->
  <main>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<style>
</style>
