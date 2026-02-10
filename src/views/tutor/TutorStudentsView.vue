<script setup>
import {computed, onMounted} from "vue";
import {tutorStudentsStore} from "@/stores/tutor/TutorStudentsStore.js";
import {storeToRefs} from "pinia";
import StudentItemList from "@/components/StudentItemList.vue";
import Pagination from "@/components/Pagination.vue";

// --- STORES ---
const tutorStudentsStr = tutorStudentsStore();
const {fetchStudentsByGroupId: fetch} = tutorStudentsStr;
const {students, isLoading, error} = storeToRefs(tutorStudentsStr);

// --- PROPS ---
const props = defineProps({
  groupId: {
    type: Number,
    required: true
  }
})

const selectedGroup = computed(() => {
  return {id: props.groupId};
});

// --- EMITS ---
const emit = defineEmits(['handleStudentClick']);
const handleStudentClick = (student) => {
  emit('handledStudentClick', student);
};

// Funcion para cargar los estudiantes mediante paginación
const fetchStudentsPerPage = (page) => {
  fetch(selectedGroup.value.id, page);
};

onMounted(() => {
  fetch(selectedGroup.value.id);
});
</script>

<template>
  <div class="p-8 space-y-6 max-w-7xl mx-auto w-full flex-1">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold text-[#111418] dark:text-white">Gestión de Alumnos:</h1>
        <p class="text-[#617289] dark:text-gray-400 mt-1">
          Control de asistencia, progreso y seguimiento individual de los estudiantes.
        </p>
      </div>
    </div>
    <!-- Table Section -->
    <div class="bg-white dark:bg-[#1a2432] rounded-xl border border-[#f0f2f4] dark:border-[#2d3a4b] shadow-sm overflow-hidden flex flex-col flex-1 min-h-[500px]">
      <!-- Encabezado de la tabla con leyendas de estado -->
      <div class="p-6 border-b border-[#f0f2f4] dark:border-[#2d3a4b] flex items-center justify-between">
        <h3 class="font-bold text-lg">Listado General de Estudiantes</h3>
      </div>
      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead
              class="bg-[#f8fafc] dark:bg-[#1a2432] text-[#617289] dark:text-gray-400 text-xs uppercase tracking-wider">
          <tr>
            <th class="px-6 py-4 font-semibold">Alumno</th>
            <th class="px-6 py-4 font-semibold">Correo</th>
            <th class="px-6 py-4 font-semibold">Estado</th>
            <th class="px-6 py-4 font-semibold">Acciones</th>
          </tr>
          </thead>
          <tbody class="divide-y divide-[#f0f2f4] dark:divide-[#2d3a4b]">
          <StudentItemList
              :student="student" v-for="student in students.data" :key="student.id"
              @viewDetails="handleStudentClick"/>
          </tbody>
        </table>
      </div>
      <!-- Pagination -->
      <pagination
          :total-pages="students.last_page"
          :current-page="students.current_page"
          :links="students.links"
          @page-change="fetchStudentsPerPage"/>
    </div>
  </div>
</template>

<style scoped></style>