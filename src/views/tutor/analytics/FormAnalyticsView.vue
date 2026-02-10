<script setup>
import {onMounted} from 'vue';
import {useRoute} from 'vue-router';
import {storeToRefs} from "pinia";
import {tutorFormAnalyticStore} from "@/stores/tutor/TutorFormAnalyticStore.js";
import GroupResultsUI from "@/components/GroupResultsUI.vue";

const route = useRoute();
// Es solo para obtener los parámetros de la ruta, pero no es necesario hacerlos reactivos si no se van a modificar
// const group = ref(route.params.group);
// const form = ref(route.params.form);

const props = defineProps({
  group: {
    type: Number,
    required: true
  },
  form: {
    type: Number,
    required: true
  }
});

// 1. Inicializar el Store correctamente (useAnalyticsStore es una función)
const tutorFormAnalyticStr = tutorFormAnalyticStore();

// 2. Extraer datos reactivos y acciones
const {formAnalytics, isLoading, error} = storeToRefs(tutorFormAnalyticStr);
const {fetchAnalyticsByForm} = tutorFormAnalyticStr;

onMounted(async () => {
  isLoading.value = true;
  try {
    await fetchAnalyticsByForm(props.group, props.form);

  } catch (err) {
    console.error("Error cargando analíticas:", err);
    error.value = "No se pudieron cargar los resultados. Intente nuevamente.";
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="min-h-screen bg-slate-50">

    <div v-if="isLoading" class="flex flex-col items-center justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
      <p class="text-indigo-600 font-medium animate-pulse">Analizando respuestas grupales...</p>
    </div>

    <div v-else-if="error" class="p-8 flex justify-center">
      <div class="bg-red-50 text-red-700 px-6 py-4 rounded-xl border border-red-200 flex items-center gap-3">
        <i class="ph ph-warning-circle text-xl"></i>
        {{ error }}
      </div>
    </div>

    <div v-else-if="!formAnalytics" class="p-10 flex flex-col items-center justify-center text-gray-400">
      <i class="ph ph-chart-pie-slice text-4xl mb-2 opacity-50"></i>
      <p>No hay datos disponibles para este formulario.</p>
    </div>

    <GroupResultsUI v-else :stats="formAnalytics"/>

  </div>
</template>