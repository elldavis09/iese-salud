<script setup>
import {ref} from "vue";
import StudentScreens from "@/views/student/StudentScreens.js";

const menuOptions = ref([
  {name: 'Dashboard', icon: 'dashboard', active: true, value: StudentScreens.DASHBOARD},
  {name: 'Mis Formularios', icon: 'assignment', active: false, value: StudentScreens.FORMS},
  {name: 'Mi Perfil', icon: 'person', active: false, value: StudentScreens.PROFILE},
  {name: 'Configuración', icon: 'settings', active: false, value: StudentScreens.SETTINGS},
]);

const getMenuItemClasses = (active) => {
  return active
      ? 'flex items-center gap-3 px-4 py-3 rounded-r-md bg-white/10 border-l-4 border-[#ac111f] text-white transition-all'
      : 'flex items-center gap-3 px-4 py-3 rounded-md text-slate-300 hover:bg-white/10 hover:text-white transition-all';
};

const emit = defineEmits(['optionSelected']);

const handleMenuItemClick = (option) => {
  menuOptions.value.forEach((opt) => {
    opt.active = false;
  });
  option.active = true;
  emit('optionSelected', option.value);
};

</script>

<template>
  <nav class="flex-1 px-3 py-6 space-y-2">
    <ul>
      <li v-for="option in menuOptions" :key="option.name">
        <a :class="getMenuItemClasses(option.active)"
           @click.prevent="handleMenuItemClick(option)">
          <span class="material-symbols-outlined">{{ option.icon }}</span>
          <span class="font-medium">{{ option.name }}</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>

</style>