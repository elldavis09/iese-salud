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

// Controlamos el estado activo con una sola variable reactiva
const activeOption = ref(props.initialOption || StudentScreens.DASHBOARD);

const handleMenuItemClick = (value) => {
  activeOption.value = value;
  emit('optionSelected', value);
};
</script>

<template>
  <nav class="flex-1 px-4 py-6 overflow-y-auto">
    <ul class="space-y-1.5">
      <li v-for="option in menuOptions" :key="option.name">
        <button
          @click="handleMenuItemClick(option.value)"
          class="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group outline-none focus-visible:ring-2 focus-visible:ring-[#ac111f]"
          :class="[
            activeOption === option.value
              ? 'bg-gradient-to-r from-[#ac111f]/20 to-transparent text-white border-l-4 border-[#ac111f]'
              : 'text-slate-400 hover:bg-white/5 hover:text-slate-100 border-l-4 border-transparent'
          ]"
        >
          <span
            class="material-symbols-outlined transition-transform duration-300 group-hover:scale-110"
            :class="activeOption === option.value ? 'text-[#ac111f]' : 'text-slate-500 group-hover:text-slate-300'"
          >
            {{ option.icon }}
          </span>
          <span class="font-medium text-sm tracking-wide">{{ option.name }}</span>
        </button>
      </li>
    </ul>
  </nav>
</template>