<script setup>
import {nextTick, onMounted, onUpdated, ref} from "vue";
import TutorGroupsView from "@/views/tutor/TutorGroupsView.vue";
import TutorStudentsView from "@/views/tutor/TutorStudentsView.vue";
import TutorDetailsStudent from "@/views/tutor/TutorDetailsStudent.vue";
import TutorResultsView from "@/views/tutor/TutorResultsView.vue";

// --- STATE & NAVIGATION ---
const view = ref('groups'); // groups | students | tests | result
const selectedGroup = ref(null);
const selectedStudent = ref(null);
const selectedTest = ref(null);

// --- METHODS ---
const handleGroupClick = (group) => {
  selectedGroup.value = group;
  view.value = 'students';
};

const handleStudentClick = (student) => {
  selectedStudent.value = student;
  view.value = 'tests';
};

const handleTestClick = (test) => {
  if (test.status === 'pending') return;
  selectedTest.value = test;
  view.value = 'result';
};

const handleBack = () => {
  if (view.value === 'result') view.value = 'tests';
  else if (view.value === 'tests') view.value = 'students';
  else if (view.value === 'students') view.value = 'groups';
};

// --- ICONS UPDATE LOGIC ---
// Lucide necesita volver a escanear el DOM cuando Vue actualiza la vista
const refreshIcons = () => {
  nextTick(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  });
};

onMounted(() => {
  refreshIcons

});
onUpdated(refreshIcons);

</script>

<template>
  <div class="min-h-screen bg-slate-50 pb-12">
    
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      <header class="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 mb-8 sticky top-24 z-30 transition-all duration-300">
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          
          <div class="flex items-center gap-3 flex-wrap">
            
            <button
              v-if="view !== 'groups'"
              @click="handleBack"
              class="h-10 w-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 border border-gray-200 hover:border-indigo-200 group"
              title="Volver"
            >
              <i class="ph ph-arrow-left text-xl group-hover:-translate-x-1 transition-transform"></i>
            </button>

            <nav class="flex items-center flex-wrap gap-2 text-sm font-medium">
              
              <div 
                class="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                :class="view === 'groups' ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'"
                @click="view = 'groups'; selectedGroup = null; selectedStudent = null; selectedTest = null;"
              >
                <i class="ph ph-users-three text-lg"></i>
                <span class="hidden sm:inline">Grupos</span>
              </div>

              <template v-if="selectedGroup">
                <i class="ph ph-caret-right text-gray-300"></i>
                <div 
                  class="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  :class="view === 'students' ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'"
                  @click="handleGroupClick(selectedGroup)"
                >
                  <span class="truncate max-w-[150px]">{{ selectedGroup.carrera.nombre }}</span>
                </div>
              </template>

              <template v-if="selectedStudent">
                <i class="ph ph-caret-right text-gray-300"></i>
                <div 
                  class="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  :class="view === 'tests' ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'"
                  @click="handleStudentClick(selectedStudent)"
                >
                  <i class="ph ph-student text-lg"></i>
                  <span class="truncate max-w-[150px] hidden sm:inline">{{ selectedStudent.full_name }}</span>
                </div>
              </template>

              <template v-if="view === 'result'">
                <i class="ph ph-caret-right text-gray-300"></i>
                <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-600 text-white shadow-sm shadow-indigo-200">
                  <i class="ph ph-chart-pie-slice text-lg"></i>
                  <span>Resultados</span>
                </div>
              </template>
            </nav>
          </div>

          <div class="hidden md:flex items-center gap-2 text-gray-400 text-sm font-medium border-l border-gray-200 pl-4">
            <span v-if="view === 'groups'">Vista General</span>
            <span v-else-if="view === 'students'">Listado de Alumnos</span>
            <span v-else-if="view === 'tests'">Historial de Tests</span>
            <span v-else-if="view === 'result'">Análisis Detallado</span>
            <i class="ph ph-info"></i>
          </div>

        </div>
      </header>

      <div class="relative min-h-[500px]">
        <transition 
          name="fade-slide" 
          mode="out-in"
        >
          <div v-if="view === 'groups'" key="groups">
            <TutorGroupsView @groupSelected="handleGroupClick"/>
          </div>

          <div v-else-if="view === 'students'" key="students">
            <TutorStudentsView 
              :groupId="selectedGroup.id" 
              @handledStudentClick="handleStudentClick"
            />
          </div>

          <div v-else-if="view === 'tests'" key="tests">
            <TutorDetailsStudent 
              :selectedGroupId="selectedGroup.id" 
              :selectedStudentId="selectedStudent.id" 
              @handledTestClick="handleTestClick"
            />
          </div>

          <div v-else-if="view === 'result'" key="result">
            <TutorResultsView 
              :selectedStudent="selectedStudent" 
              :selectedTest="selectedTest"
            />
          </div>

        </transition>
      </div>

    </main>
  </div>
</template>

<style scoped>
/* 3. Animación personalizada suave entre vistas */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
</style>