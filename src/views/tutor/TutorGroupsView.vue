<script setup>
import { onMounted } from "vue";
import { useTutorGrupoHasStudentsStore } from "@/stores/tutor/TutorStore.js";

// --- STORES ---
const tutorStore = useTutorGrupoHasStudentsStore();

// --- EMITS ---
const emit = defineEmits(['groupSelected']);
const selectGroup = (group) => {
  emit('groupSelected', group);
};

const getGroupIcon = (id) => {
  if (id === 1) return 'bar-chart-2';
  if (id === 2) return 'book-open';
  return 'file-text';
};

// --- LIFECYCLE ---
onMounted(() => {
  tutorStore.fetchGroups()
})

</script>

<template>
  <div>
    <div v-if="tutorStore.groups.length === 0" class="flex flex-col items-center justify-center py-16 bg-white rounded-3xl border border-dashed border-gray-300">
      <div class="bg-slate-50 p-4 rounded-full mb-3">
        <i class="ph ph-chalkboard-teacher text-3xl text-slate-400"></i>
      </div>
      <p class="text-slate-500 font-medium">No tienes grupos asignados.</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
      <div 
        v-for="group in tutorStore.groups" 
        :key="group.id" 
        @click="selectGroup(group)" 
        class="group relative bg-white flex flex-col p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-indigo-200 hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full"
      >
        
        <div class="flex items-start gap-4 mb-6">
          <div class="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
            <i class="ph ph-graduation-cap text-2xl"></i>
          </div>
          <div>
            <h3 class="font-bold text-gray-900 text-lg leading-tight line-clamp-2 group-hover:text-indigo-700 transition-colors">
              {{ group?.carrera?.nombre || 'Sin carrera asignada' }}
            </h3>
            <span class="text-xs text-gray-400 font-medium mt-1 block">
              Programa Académico
            </span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3 mb-6">
          <div class="bg-slate-50 p-3 rounded-xl border border-gray-100 flex flex-col">
            <span class="text-[10px] uppercase text-gray-400 font-bold tracking-wider mb-1">Ciclo</span>
            <div class="flex items-center gap-2 text-gray-700 font-semibold text-sm">
              <i class="ph ph-calendar-blank text-indigo-400"></i>
              <span class="truncate">{{ group?.ciclo || 'N/A' }}</span>
            </div>
          </div>

          <div class="bg-slate-50 p-3 rounded-xl border border-gray-100 flex flex-col">
            <span class="text-[10px] uppercase text-gray-400 font-bold tracking-wider mb-1">Grupo</span>
            <div class="flex items-center gap-2 text-gray-700 font-semibold text-sm">
              <i class="ph ph-identification-badge text-indigo-400"></i>
              <span class="truncate">{{ group?.grupo || 'N/A' }}</span>
            </div>
          </div>
        </div>

        <div class="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <div class="flex items-center gap-2 text-gray-500 text-sm">
            <div class="flex -space-x-2">
              <div class="w-6 h-6 rounded-full bg-indigo-100 border-2 border-white"></div>
              <div class="w-6 h-6 rounded-full bg-blue-100 border-2 border-white"></div>
              <div class="w-6 h-6 rounded-full bg-emerald-100 border-2 border-white flex items-center justify-center text-[8px] text-emerald-700 font-bold">
                +
              </div>
            </div>
            <span class="font-medium ml-1">
              {{ group?.estudiantes_count || 0 }} Alumnos
            </span>
          </div>

          <button class="w-8 h-8 rounded-full bg-gray-50 text-gray-400 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
            <i class="ph ph-caret-right text-lg"></i>
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<!-- <template>
  <div>
    <div v-for="group in tutorStore.groups" :key="group.id" @click="selectGroup(group)" 
    class="p-4 mb-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
      <p>{{ group?.grupo ?? 'Sin grupo'}}</p>
      <p>{{ group?.ciclo ?? 'Sin ciclo' }}</p>
      <p>{{ group?.carrera?.nombre ?? 'Sin carrera' }}</p>
      <p>{{ group?.estudiantes_count ?? 'Sin estudiantes' }}</p>
    </div>
  </div>
</template> -->

<style scoped></style>