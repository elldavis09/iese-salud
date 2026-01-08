<script setup>
import { computed } from 'vue';

const props = defineProps({
  stats: {
    type: Object,
    required: true,
    default: () => ({})
  }
});

// 1. Extraer el porcentaje global (overall) de forma segura
const overallRate = computed(() => {
  return props.stats?.response_rates?.overall ?? 0;
});

// 2. Procesar las preguntas, filtrando la key 'overall'
const questions = computed(() => {
  const rates = props.stats?.response_rates || {};

  return Object.keys(rates)
      .filter(key => key !== 'overall')
      .map(key => ({
        id: key,
        ...rates[key]
      }));
});

// Función para colores de la barra
const getBarColor = (percent) => {
  if (percent >= 70) return 'bg-indigo-600';
  if (percent >= 40) return 'bg-indigo-400';
  if (percent > 0) return 'bg-indigo-200';
  return 'bg-slate-100';
};
</script>

<template>
  <div class="bg-slate-50 min-h-screen p-4 md:p-8 font-inter">

    <div class="max-w-6xl mx-auto mb-8">
      <div class="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div class="flex items-center gap-3 mb-2">
            <span class="bg-indigo-50 text-indigo-600 p-2 rounded-lg">
              <i class="ph ph-chart-bar text-2xl"></i>
            </span>
            <span class="text-xs md:text-sm font-bold text-indigo-600 tracking-wide uppercase">Reporte Estadístico</span>
          </div>
          <h1 class="text-2xl md:text-3xl font-extrabold text-gray-900">
            Resultados Grupales
          </h1>
          <p class="text-gray-500 mt-2 text-sm md:text-base">
            Análisis del Grupo #{{ stats.grupo_id }} • Formulario #{{ stats.formulario_id }}
          </p>
        </div>

        <div class="flex items-center gap-5 bg-slate-50 pl-6 pr-8 py-4 rounded-2xl border border-gray-200/60 w-full md:w-auto justify-center md:justify-start">
          <div class="relative w-16 h-16 flex items-center justify-center">
            <svg class="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path class="text-gray-200" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="3" />
              <path class="text-indigo-600 transition-all duration-1000 ease-out" :stroke-dasharray="`${overallRate}, 100`" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="3" />
            </svg>
            <span class="absolute text-sm font-bold text-gray-900">{{ overallRate }}%</span>
          </div>
          <div class="flex flex-col">
            <span class="text-2xl font-bold text-gray-900 leading-none">{{ overallRate }}%</span>
            <span class="text-xs font-bold text-gray-400 uppercase tracking-wide mt-1">Participación</span>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">

      <div v-for="question in questions" :key="question.id"
           class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 hover:shadow-md hover:border-indigo-200 transition-all duration-300">

        <div class="mb-6 pb-4 border-b border-gray-50">
          <h3 class="text-lg font-bold text-gray-800 leading-snug">
            {{ question.contenido }}
          </h3>
          <div class="mt-2 flex items-center gap-2">
            <span class="text-xs font-bold bg-green-50 text-green-700 px-2 py-0.5 rounded border border-green-100 flex items-center gap-1">
              <i class="ph ph-users-three"></i>
              {{ question.tasa_respuesta }}% Respondieron
            </span>
          </div>
        </div>

        <div class="space-y-5">
          <div v-for="(opcion, key) in question.opciones_escala" :key="key" class="group">

            <div class="flex justify-between items-end mb-1.5">
              <span class="text-sm font-medium text-gray-600 group-hover:text-indigo-700 transition-colors">
                {{ opcion.descripcion }}
              </span>
              <div class="flex items-baseline gap-1">
                <span class="text-sm font-extrabold text-gray-900">{{ opcion.porcentaje }}%</span>
                <span class="text-xs text-gray-400 font-medium">({{ opcion.count }})</span>
              </div>
            </div>

            <div class="relative w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                  class="h-full rounded-full transition-all duration-1000 ease-out"
                  :class="getBarColor(opcion.porcentaje)"
                  :style="{ width: `${opcion.porcentaje}%` }"
              ></div>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>