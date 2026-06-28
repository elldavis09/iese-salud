<script setup>
import {ref} from 'vue';
import {useAuthStore} from "@/stores/authStore.js";

const authStore = useAuthStore();
const user = ref(authStore?.user);
</script>

<template>
  <div>
    <h2>Profile</h2>
    <p><strong>Name:</strong> {{ user?.name }}</p>
    <p><strong>Email:</strong> {{ user?.email }}</p>
  </div>

</template>

<style scoped>

</style>