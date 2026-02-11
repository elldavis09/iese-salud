<script setup>

import GroupsListGrid from "@/components/GroupsListGrid.vue";
import TutorStudentsView from "@/views/tutor/TutorStudentsView.vue";
import TutorDetailsStudent from "@/views/tutor/TutorDetailsStudent.vue";
import TutorResultsView from "@/views/tutor/TutorResultsView.vue";
import {ref} from "vue";
import Breadcrumb from "@/components/Breadcrumb.vue";

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

const itemsMenu = [
  {order: 1, label: 'Grupos', active: true, click: handleGroupClick},
  {order: 2, label: 'Students', active: false, click: handleStudentClick},
  {order: 3, label: 'Test', active: false, click: handleTestClick},
  {order: 4, label: 'Results', active: false, click: handleBack}
]

const handleBreadcrumbClick = (index) => {
  if (index === 0) {
    view.value = 'groups';
    selectedGroup.value = null;
    selectedStudent.value = null;
    selectedTest.value = null;
  } else if (index === 1) {
    view.value = 'students';
    selectedStudent.value = null;
    selectedTest.value = null;
  } else if (index === 2) {
    view.value = 'tests';
    selectedTest.value = null;
  } else if (index === 3) {
    view.value = 'result';
  }
};

const createItemsMenu = () => {
  const items = [];
  if (view.value === 'groups') {
    items.push({label: 'Grupos', active: true});
  } else if (view.value === 'students') {
    items.push({label: 'Grupos', active: false, click: () => handleBreadcrumbClick(0)});
    items.push({label: selectedGroup.value?.name || 'Estudiantes', active: true});
  } else if (view.value === 'tests') {
    items.push({label: 'Grupos', active: false, click: () => handleBreadcrumbClick(0)});
    items.push({label: selectedGroup.value?.name || 'Estudiantes', active: false, click: () => handleBreadcrumbClick(1)});
    items.push({label: selectedStudent.value?.fullName || 'Detalles', active: true});
  } else if (view.value === 'result') {
    items.push({label: 'Grupos', active: false, click: () => handleBreadcrumbClick(0)});
    items.push({label: selectedGroup.value?.name || 'Estudiantes', active: false, click: () => handleBreadcrumbClick(1)});
    items.push({label: selectedStudent.value?.fullName || 'Detalles', active: false, click: () => handleBreadcrumbClick(2)});
    items.push({label: selectedTest.value?.name || 'Resultados', active: true});
  }
  return items;
};
</script>

<template>
  <div>
    <header
        class="h-16 bg-white dark:bg-[#1a2432] border-b border-[#f0f2f4] dark:border-[#2d3a4b] flex items-center justify-between px-8 sticky top-0 z-10">
      <Breadcrumb :items="createItemsMenu()"/>
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
    <transition name="fade-slide" mode="out-in">
      <!-- Grupos -->
      <div v-if="view === 'groups'" key="groups">
        <GroupsListGrid @groupSelected="handleGroupClick"/>
      </div>

      <!-- Estudiantes -->
      <div v-else-if="view === 'students'" key="students">
        <TutorStudentsView
            :groupId="selectedGroup?.id"
            @handledStudentClick="handleStudentClick"
        />
      </div>

      <!-- Detalles del estudiante y tests -->
      <div v-else-if="view === 'tests'" key="tests">
        <TutorDetailsStudent
            :selectedGroupId="selectedGroup?.id"
            :selectedStudentId="selectedStudent?.id"
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
</template>

<style scoped>

</style>