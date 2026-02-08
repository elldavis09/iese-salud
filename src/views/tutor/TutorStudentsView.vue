<script setup>
import {computed, onMounted} from "vue";
import {tutorStudentsStore} from "@/stores/tutor/TutorStudentsStore.js";
import {storeToRefs} from "pinia";

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

onMounted(() => {
  fetch(selectedGroup.value.id);
});
</script>

<template>
  <div v-if="isLoading">
    <p>Cargando estudiantes...</p>
  </div>
  <div v-else-if="error">
    <p>Error al cargar estudiantes: {{ error }}</p>
  </div>
  <div v-else>
    <h1>Lista de Alumnos</h1>
    <div v-for="student in students" :key="student.id" @click="handleStudentClick(student)"
         class="p-4 mb-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
      <p>Estado activo: {{ student?.activo ?? 'Sin estado' }}</p>
      <p>Iniciales: {{ student?.initials ?? 'Sin iniciales' }}</p>
      <p>Nombre completo: {{ student?.full_name ?? 'Sin nombre' }}</p>
      <p> Correo: {{ student?.email ?? 'Sin email' }}</p>
      <p>Rol: {{ student?.rol?.nombre ?? 'Sin rol especificado' }}</p>
      <p>Estatus: {{ student.status }}</p>
    </div>
  </div>
</template>
<style scoped></style>