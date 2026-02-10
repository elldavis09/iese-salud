<script setup>
import {computed, nextTick, onMounted, onUpdated, ref} from "vue";
import TutorGroupsView from "@/views/tutor/TutorGroupsView.vue";
import TutorStudentsView from "@/views/tutor/TutorStudentsView.vue";
import TutorDetailsStudent from "@/views/tutor/TutorDetailsStudent.vue";
import TutorResultsView from "@/views/tutor/TutorResultsView.vue";
import FormAnalyticsView from "@/views/tutor/FormAnalyticsView.vue";
import TutorFormsView from "@/views/tutor/TutorFormsView.vue";

// --- STATE & NAVIGATION ---
const view = ref('groups'); // groups | students | tests | result
const selectedGroup = ref(null);
const selectedStudent = ref(null);
const selectedTest = ref(null);
const isAsideCollapsed = ref(false);

const currentViewSelected = ref('dashboard'); // dashboard | groups | reports | settings

const navigateTo = (newView) => {
  currentViewSelected.value = newView;
  // Reset selections when navigating to a different main view
  if (newView !== 'groups') {
    view.value = 'groups';
    selectedGroup.value = null;
    selectedStudent.value = null;
    selectedTest.value = null;
  }
};

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

const handleGroupReportClick = (group) => {
  selectedGroup.value = group;
  view.value = 'tests';
};

const handleTestReportClick = (test) => {
  selectedTest.value = test;
  view.value = 'report';
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
  <div class="flex h-screen overflow-hidden">
    <aside
        class="w-64 bg-white dark:bg-[#1a2432] border-r border-[#f0f2f4] dark:border-[#2d3a4b] hidden lg:flex flex-col">
      <div class="p-6 flex items-center gap-3">
        <div class="bg-primary p-2 rounded-lg text-white">
          <span class="material-symbols-outlined">school</span>
        </div>
        <h2 class="text-xl font-bold tracking-tight">AdminTutor</h2>
      </div>
      <nav class="flex-1 px-4 space-y-2 mt-4">
        <a class="flex items-center gap-3 px-4 py-3 rounded-lg text-[#617289] dark:text-gray-400 hover:bg-[#f0f2f4] dark:hover:bg-[#2d3a4b] transition-colors"
           @click.stop="navigateTo('dashboard')">
          <span class="material-symbols-outlined">dashboard</span>
          <span class="font-medium">Dashboard</span>
        </a>
        <a class="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary transition-colors"
           @click.stop="navigateTo('groups')">
          <span class="material-symbols-outlined">group</span>
          <span class="font-medium">Grupos</span>
        </a>
        <a class="flex items-center gap-3 px-4 py-3 rounded-lg text-[#617289] dark:text-gray-400 hover:bg-[#f0f2f4] dark:hover:bg-[#2d3a4b] transition-colors"
           @click.stop="navigateTo('reports')">
          <span class="material-symbols-outlined">assessment</span>
          <span class="font-medium">Reportes</span>
        </a>
        <a class="flex items-center gap-3 px-4 py-3 rounded-lg text-[#617289] dark:text-gray-400 hover:bg-[#f0f2f4] dark:hover:bg-[#2d3a4b] transition-colors"
           href="#">
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
    <main class="flex-1 flex flex-col overflow-y-auto">
      <!-- header -->
      <header
          class="h-16 bg-white dark:bg-[#1a2432] border-b border-[#f0f2f4] dark:border-[#2d3a4b] flex items-center justify-between px-8 sticky top-0 z-10">
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
            <div
                class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-600 text-white shadow-sm shadow-indigo-200">
              <i class="ph ph-chart-pie-slice text-lg"></i>
              <span>Resultados</span>
            </div>
          </template>

          <template v-if="view === 'report'">
            <i class="ph ph-caret-right text-gray-300"></i>
            <div
                class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-600 text-white shadow-sm shadow-indigo-200">
              <i class="ph ph-chart-pie-slice text-lg"></i>
              <span>Reporte</span>
            </div>
          </template>
        </nav>

        <div class="flex items-center gap-4">
          <div class="relative hidden sm:block">
                        <span
                            class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">search</span>
            <input
                class="pl-10 pr-4 py-1.5 bg-[#f0f2f4] dark:bg-[#2d3a4b] border-none rounded-lg text-sm focus:ring-2 focus:ring-primary w-64"
                placeholder="Buscar alumno o grupo..." type="text"/>
          </div>
          <button class="p-2 text-gray-400 hover:text-primary transition-colors">
            <span class="material-symbols-outlined">notifications</span>
          </button>
          <button class="p-2 text-gray-400 hover:text-primary transition-colors lg:hidden">
            <span class="material-symbols-outlined">menu</span>
          </button>
        </div>
      </header>
      <!-- Contenido principal -->
      <!-- Dashboard -->
      <div v-if="currentViewSelected === 'dashboard'">
        <h1>Dasboard</h1>
      </div>
      <!-- groups -->
      <div v-if="currentViewSelected === 'groups'">
        <div>
          <transition name="fade-slide" mode="out-in">
            <!-- Grupos -->
            <div v-if="view === 'groups'" key="groups">
              <TutorGroupsView @groupSelected="handleGroupClick"/>
            </div>

            <!-- Estudiantes -->
            <div v-else-if="view === 'students'" key="students">
              <TutorStudentsView
                  :groupId="selectedGroup.id"
                  @handledStudentClick="handleStudentClick"
              />
            </div>

            <!-- Detalles del estudiante y tests -->
            <div v-else-if="view === 'tests'" key="tests">
              <TutorDetailsStudent
                  :selectedGroupId="selectedGroup.id"
                  :selectedStudentId="selectedStudent.id"
                  @handledTestClick="handleTestClick"
              />
            </div>

            <!-- Resultados del test -->
            <div v-else-if="view === 'result'" key="result">
              <TutorResultsView
                  :selectedStudent="selectedStudent"
                  :selectedTest="selectedTest"
                  :selectedGroup="selectedGroup"
              />
            </div>
          </transition>
        </div>
      </div>
      <div v-if="currentViewSelected === 'reports'">
        <!-- Seleccionar grupo -->
        <div>
          <transition name="fade-slide" mode="out-in">
            <!-- Grupos -->
            <div v-if="view === 'groups'" key="groups">
              <TutorGroupsView @groupSelected="handleGroupReportClick"/>
            </div>

            <div v-else-if="view === 'tests'">
              <TutorFormsView
                  @form-selected="args => handleTestReportClick(args)"
              />
            </div>
            <div v-else>
              <FormAnalyticsView
                  :form="selectedTest?.id"
                  :group="selectedGroup?.id"
              />
            </div>
          </transition>
        </div>
      </div>
      <!-- Footer -->
      <footer class="p-8 text-center text-sm text-[#617289] dark:text-gray-400">
        © 2026 IESE System. Todos los derechos reservados.
      </footer>
    </main>
  </div>
</template>

<style scoped>
</style>