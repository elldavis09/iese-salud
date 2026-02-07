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
    <h1>Lista de Alumnos</h1>
    <div v-for="student in tutorGrupoHasStudentsStore.students" :key="student.id" @click="handleStudentClick(student)"
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