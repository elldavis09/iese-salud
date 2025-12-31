<script setup>
import { computed, onMounted } from "vue";
import { useTutorGrupoHasStudentsStore } from "@/stores/tutor/TutorStore.js";

// --- STORES ---
const tutorGrupoHasStudentsStore = useTutorGrupoHasStudentsStore();

// --- PROPS ---
const props = defineProps({
  groupId: {
    type: Number,
    required: true
  }
})

const selectedGroup = computed(() => {
  return { id: props.groupId };
});

// Helpers de estilo
const getStatusClass = (status) => {
  const map = {
    completed: "bg-green-100 text-green-700 border-green-200",
    active: "bg-emerald-100 text-emerald-700 border-emerald-200",
    warning: "bg-orange-100 text-orange-700 border-orange-200",
    danger: "bg-red-100 text-red-700 border-red-200"
  };
  return map[status] || "bg-gray-100 text-gray-600";
};

const getStatusLabel = (status) => {
  const map = { active: "Activo", warning: "Riesgo", danger: "Crítico", completed: "Completado" };
  return map[status] || status;
};

const emit = defineEmits(['handleStudentClick']);
const handleStudentClick = (student) => {
  emit('handledStudentClick', student);
};

onMounted(() => {
  tutorGrupoHasStudentsStore.fetchStudentsByGroupId(selectedGroup.value.id);
  console.log(tutorGrupoHasStudentsStore.students);
});
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Lista de Alumnos</h1>
        <p class="text-gray-500 text-sm mt-1">
          Gestiona el progreso individual de tus estudiantes.
        </p>
      </div>
      <div class="bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full font-bold text-sm border border-indigo-100 shadow-sm">
        {{ tutorGrupoHasStudentsStore.students.length }} Estudiantes
      </div>
    </div>

    <div v-if="tutorGrupoHasStudentsStore.students.length === 0" class="flex flex-col items-center justify-center py-16 bg-white rounded-3xl border border-dashed border-gray-300">
      <div class="bg-slate-50 p-4 rounded-full mb-3 ring-8 ring-slate-50/50">
        <i class="ph ph-users text-3xl text-slate-400"></i>
      </div>
      <p class="text-slate-500 font-medium">No hay alumnos en este grupo.</p>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      
      <div 
        v-for="student in tutorGrupoHasStudentsStore.students" 
        :key="student.id" 
        @click="handleStudentClick(student)"
        class="group relative bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg hover:border-indigo-200 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col items-center text-center"
      >
        
        <div class="absolute top-4 right-4" :title="student?.activo ? 'Usuario Activo' : 'Usuario Inactivo'">
          <span class="relative flex h-3 w-3">
            <span v-if="student?.activo" class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-3 w-3" 
                  :class="student?.activo ? 'bg-emerald-500' : 'bg-gray-300'"></span>
          </span>
        </div>

        <div class="mb-4 relative">
          <div class="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-50 to-white border-2 border-indigo-100 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300">
            <span class="text-2xl font-bold text-indigo-600 tracking-wider">
              {{ student?.initials || '??' }}
            </span>
          </div>
          <div class="absolute -bottom-1 -right-1 bg-white rounded-full p-1 border border-gray-100 shadow-sm">
            <i class="ph ph-student text-indigo-400"></i>
          </div>
        </div>

        <h3 class="text-gray-900 font-bold text-lg leading-tight mb-1 group-hover:text-indigo-700 transition-colors">
          {{ student?.full_name || 'Sin nombre' }}
        </h3>
        
        <div class="flex items-center gap-1.5 text-gray-500 text-sm mb-4 bg-gray-50 px-3 py-1 rounded-full max-w-full">
          <i class="ph ph-envelope-simple"></i>
          <span class="truncate">{{ student?.email || 'Sin email' }}</span>
        </div>

        <div class="w-full border-t border-gray-100 my-2"></div>

        <div class="w-full flex items-center justify-between mt-2">
          
          <div class="flex flex-col items-start">
            <span class="text-[10px] uppercase text-gray-400 font-bold tracking-wider">Rol</span>
            <span class="text-xs font-semibold text-gray-600">
              {{ student?.rol?.nombre || 'Estudiante' }}
            </span>
          </div>

          <div 
            class="px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors"
            :class="getStatusClass(student.status) /* Asumiendo que esto devuelve clases de color Tailwind */"
          >
            {{ getStatusLabel(student.status) }}
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<!-- <template>
  <div>
    <h1>Lista de Alumnos</h1>
    <div v-for="student in tutorGrupoHasStudentsStore.students" :key="student.id" @click="handleStudentClick(student)"
      class="p-4 mb-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
      <p>{{ student?.activo ?? 'Sin estado' }}</p>
      <p>{{ student?.initials ?? 'Sin iniciales' }}</p>
      <p>{{ student?.full_name ?? 'Sin nombre' }}</p>
      <p>{{ student?.email ?? 'Sin email' }}</p>
      <p>{{ student?.rol?.nombre ?? 'Sin rol especificado' }}</p>
      <p :class="getStatusClass(student.status)" class="inline-block px-2 py-1 text-xs font-semibold rounded border">
        {{ getStatusLabel(student.status) }}
      </p>
    </div>
  </div>
</template> -->
<style scoped></style>