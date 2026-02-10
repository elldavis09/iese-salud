<script setup>
import { ref } from "vue";

const emit = defineEmits(['navigateTo']);

const currentView = ref('dashboard');

const setItemStyle = (selectedView) => {
  return currentView.value === selectedView
      ? 'flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary transition-colors'
      : 'flex items-center gap-3 px-4 py-3 rounded-lg text-[#617289] dark:text-gray-400 hover:bg-[#f0f2f4] dark:hover:bg-[#2d3a4b] transition-colors';
};

const navigateTo = (view) => {
  currentView.value = view;
  emit('navigateTo', view);
};
</script>

<template>
  <aside
      class="w-64 bg-white dark:bg-[#1a2432] border-r border-[#f0f2f4] dark:border-[#2d3a4b] hidden lg:flex flex-col">
    <div class="p-6 flex items-center gap-3">
      <div class="bg-primary p-2 rounded-lg text-white">
        <span class="material-symbols-outlined">school</span>
      </div>
      <h2 class="text-xl font-bold tracking-tight">AdminTutor</h2>
    </div>
    <nav class="flex-1 px-4 space-y-2 mt-4">
      <a :class="setItemStyle('groups')" @click.stop="navigateTo('groups')">
        <span class="material-symbols-outlined">group</span>
        <span class="font-medium">Grupos</span>
      </a>
      <a :class="setItemStyle('reports')" @click.stop="navigateTo('reports')">
        <span class="material-symbols-outlined">assessment</span>
        <span class="font-medium">Reportes</span>
      </a>
      <a :class="setItemStyle('settings')" @click.stop="navigateTo('settings')">
        <span class="material-symbols-outlined">settings</span>
        <span class="font-medium">Ajustes</span>
      </a>
    </nav>
    <div class="p-4 border-t border-[#f0f2f4] dark:border-[#2d3a4b]">
      <div class="flex items-center gap-3 p-2">
        <div class="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">JD
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-semibold truncate">Juan Delgado</p>
          <p class="text-xs text-[#617289] dark:text-gray-400 truncate">Tutor Administrador</p>
        </div>
      </div>
    </div>
  </aside>
</template>
