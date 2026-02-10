<script setup>

import TutorGroupsView from "@/views/tutor/analytics/TutorGroupsView.vue";
import FormAnalyticsView from "@/views/tutor/analytics/FormAnalyticsView.vue";
import TutorFormsView from "@/views/tutor/analytics/TutorFormsView.vue";
import {ref} from "vue";

const view = ref('groups'); // groups | students | tests | result
const selectedGroup = ref(null);
const selectedStudent = ref(null);
const selectedTest = ref(null);

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

</script>

<template>
  <div>
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
    <h1>Reportes grupales</h1>
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
</template>

<style scoped>

</style>