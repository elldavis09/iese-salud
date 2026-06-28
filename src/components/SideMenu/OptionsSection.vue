<script setup>
import { ref } from "vue";
import StudentScreens from "@/views/student/StudentScreens.js";

const props = defineProps({
  initialOption: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['optionSelected']);

const menuOptions = ref([
  {name: 'Dashboard', icon: 'dashboard', value: StudentScreens.DASHBOARD},
  {name: 'Mis Formularios', icon: 'assignment', value: StudentScreens.FORMS},
  {name: 'Mi Perfil', icon: 'person', value: StudentScreens.PROFILE},
  {name: 'Configuración', icon: 'settings', value: StudentScreens.SETTINGS},
]);

const activeOption = ref(props.initialOption || StudentScreens.DASHBOARD);

const handleMenuItemClick = (value) => {
  activeOption.value = value;
  emit('optionSelected', value);
};
</script>

<template>
  <nav class="flex-1 px-4 py-2 overflow-y-auto">
    <ul class="space-y-2">
      <li v-for="option in menuOptions" :key="option.name">
        <!-- Agregamos "group" y "hover:translate-x-1" para un sutil movimiento a la derecha -->
        <button
          @click="handleMenuItemClick(option.value)"
          class="group w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ease-out outline-none"
          :class="[
            activeOption === option.value
              ? 'bg-sidebar-hover text-sidebar-active shadow-sm'
              : 'text-sidebar-text hover:bg-sidebar-hover/60 hover:text-white hover:translate-x-1'
          ]"
        >
          <!-- El ícono crece un poco (scale-110) y toma un tono azul suave al hacer hover si no está activo -->
          <span 
            class="material-symbols-outlined text-[22px] transition-transform duration-300"
            :class="[
              activeOption === option.value ? 'text-pastel-blue' : 'group-hover:text-pastel-blue/80 group-hover:scale-110'
            ]"
          >
            {{ option.icon }}
          </span>
          
          <span 
            class="text-sm tracking-wide transition-colors"
            :class="activeOption === option.value ? 'font-bold' : 'font-medium group-hover:font-semibold'"
          >
            {{ option.name }}
          </span>
        </button>
      </li>
    </ul>
  </nav>
</template>