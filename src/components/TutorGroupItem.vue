<script setup>
const props = defineProps({
  group: {
    type: Object,
    required: true
  }
});
const emit = defineEmits(['select']);
const handleClick = () => emit('select', props.group);

const typeGroup = (grupo) => {
  switch (grupo) {
    case 'A':
      return 'Escolarizado';
    case 'B':
      return 'No Escolarizado';
    default:
      return 'Desconocido';
  }
};
</script>

<template>
  <!-- Card 1 -->
  <div
      @click="handleClick"
      class="bg-white dark:bg-[#1a1f2b] rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
    <div class="p-5 flex-1">
      <div class="flex justify-between items-start mb-4">
        <span
            class="px-2 py-1 rounded bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest">{{ typeGroup(group.grupo) }}</span>
        <button class="text-gray-400 hover:text-gray-600">
          <span class="material-symbols-outlined">more_vert</span>
        </button>
      </div>
      <h3 class="text-lg font-bold text-[#111318] dark:text-white mb-1">{{ group.carrera.nombre }}</h3>
      <p class="text-sm text-[#636f88] mb-6 flex items-center gap-1">
        <span class="material-symbols-outlined text-sm">calendar_today</span>{{ group.ciclo }}
      </p>
      <div class="grid grid-cols-2 gap-4 mb-6">
        <div class="p-3 bg-background-light dark:bg-background-dark rounded-lg">
          <p class="text-[10px] text-[#636f88] uppercase font-bold tracking-wider mb-1">Alumnos</p>
          <p class="text-xl font-bold text-primary">{{ group.estudiantes_count }}</p>
        </div>
        <div class="p-3 bg-background-light dark:bg-background-dark rounded-lg">
          <p class="text-[10px] text-[#636f88] uppercase font-bold tracking-wider mb-1">Grupo</p>
          <p class="text-xl font-bold text-green-600">{{ group.grupo }}
<!--            <span class="text-xs text-gray-400">/10</span>-->
          </p>
        </div>
      </div>
      <!--      <div class="space-y-2">
              <div class="flex justify-between items-center text-sm">
                <span class="text-[#636f88] font-medium">Asistencia General</span>
                <span class="font-bold text-primary">92%</span>
              </div>
              <div class="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                <div class="bg-primary h-2 rounded-full" style="width: 92%"></div>
              </div>
            </div>-->
    </div>
    <div class="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
      <button
          @click.stop="handleClick"
          class="w-full flex items-center justify-center gap-2 py-2 text-primary font-bold text-sm hover:bg-primary hover:text-white rounded-lg transition-all">
        Ver Detalles
        <span class="material-symbols-outlined text-sm">arrow_forward</span>
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>