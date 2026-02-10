<script setup>

import {tutorFormStore} from "@/stores/tutor/TutorFormsStore.js";
import {onMounted} from "vue";
import {storeToRefs} from "pinia";

const emits = defineEmits(['formSelected']);
const formSelected = (form) => {
  emits('formSelected', form);
};

const tutorFormsStr = tutorFormStore();
const {forms, isLoading, error} = storeToRefs(tutorFormsStr);
const { fetchForms } = tutorFormsStr;

const getStyleStatus = (status) => {
  if (status === 0) {
    return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded text-xs font-bold';
  } else {
    return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded text-xs font-bold';
  }
};

const getStatusIntent = (intento) => {
  if (intento === 0) {
    return 'Inactivo';
  } else {
    return 'Activo';
  }
}

onMounted(() => {
  fetchForms(1);
});

</script>

<template>
  <div class="flex-1 px-4 lg:px-10 py-8 max-w-[1440px] mx-auto w-full">
    <div class="lg:col-span-8 flex flex-col gap-8">
      <!-- Bottom Section: Form History List -->
      <div
          class="bg-white dark:bg-[#1a242f] rounded-xl shadow-sm border border-[#e5e7eb] dark:border-[#2a333c] overflow-hidden">
        <!-- Table Header -->
        <div
            class="px-8 py-6 border-b border-[#f0f2f4] dark:border-[#2a333c] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 class="text-xl font-bold">Formularios</h3>
          <div class="flex gap-2">
            <select
                class="form-select bg-[#f0f2f4] dark:bg-[#2a333c] border-none rounded-lg text-sm px-4 focus:ring-primary h-9">
              <option>Todos los tests</option>
              <option>Evaluación Inicial</option>
              <option>Psicométrico</option>
            </select>
          </div>
        </div>
        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead class="bg-[#f9fafb] dark:bg-[#242d38] border-b border-[#f0f2f4] dark:border-[#2a333c]">
            <tr>
              <th class="px-8 py-4 text-xs font-bold uppercase tracking-wider text-[#617289]">
                Nombre del Formulario
              </th>

              <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#617289]">
                Estado
              </th>
              <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#617289] text-right">
                Acción
              </th>
            </tr>
            </thead>
            <tbody class="divide-y divide-[#f0f2f4] dark:divide-[#2a333c]">
            <!-- Elemento de formulario individual -->
            <tr
                v-for="test in forms?.data ?? []"
                :key="test.id"
                @click="formSelected(test)"
                class="hover:bg-gray-50 dark:hover:bg-[#242d38] transition-colors">
              <td class="px-8 py-4">
                <div class="flex items-center gap-3">
                  <span class="material-symbols-outlined text-primary">assignment</span>
                  <span class="font-medium">{{ test.nombre }}</span>
                </div>
              </td>
              <td class="px-6 py-4">
                  <span :class="['px-2 py-1', getStyleStatus(test.intentos_count)]">
                    {{ getStatusIntent(test.intentos_count) }}</span>
              </td>
              <td class="px-6 py-4 text-right">
                <button
                    class="text-primary font-bold text-sm hover:underline flex items-center gap-1 justify-end ml-auto">
                  Ver reporte <span
                    class="material-symbols-outlined text-sm">open_in_new</span>
                </button>
              </td>
            </tr>

            </tbody>
          </table>
        </div>
        <div
            class="px-8 py-4 bg-[#f9fafb] dark:bg-[#242d38] border-t border-[#f0f2f4] dark:border-[#2a333c] flex justify-center">
          <button class="text-sm font-bold text-[#617289] hover:text-primary transition-colors">Cargar
            más formularios
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>