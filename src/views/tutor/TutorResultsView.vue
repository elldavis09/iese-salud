<script setup>
import {onMounted} from "vue";
import {useTutorGrupoHasStudentsStore} from "@/stores/tutor/TutorStore.js";

const tutorStore = useTutorGrupoHasStudentsStore();

const props = defineProps(
    {
      selectedStudent: Object,
      selectedTest: Object
    }
);

const selectedStudent = props.selectedStudent.id;
const selectedTest = props.selectedTest.id;

onMounted(() => {
  /* console.log("Fetching form results for student ID:", selectedStudent);
  console.log("Selected test ID:", selectedTest); */
  tutorStore.fetchFormResultsByStudentId(selectedStudent, selectedTest);

});

</script>

<template>
  <div class="bg-slate-50 p-6 md:p-8 rounded-3xl min-h-[400px]">
    
    <div class="mb-8">
      <h2 class="text-2xl font-extrabold text-gray-900 flex items-center gap-3">
        <span class="bg-indigo-100 text-indigo-600 p-2 rounded-xl">
          <i class="ph ph-chart-bar text-2xl"></i>
        </span>
        Resultados e Interpretaciones
      </h2>
      <p class="text-gray-500 mt-2">
        Análisis detallado basado en tus puntajes obtenidos.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      <div 
        v-for="inter in tutorStore.interpretaciones ?? []" 
        :key="inter.id"
        class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-indigo-200 transition-all duration-300 flex flex-col"
      >
        <div class="flex justify-between items-start mb-6 border-b border-gray-100 pb-4">
          <div class="flex items-center gap-3">
            <div class="bg-blue-50 text-blue-600 h-10 w-10 rounded-lg flex items-center justify-center font-bold">
              #{{ inter?.id }}
            </div>
            <span class="text-sm font-bold text-gray-500 uppercase tracking-wide">
              Interpretación
            </span>
          </div>
          
          <div class="flex flex-col items-end">
            <span class="text-xs text-gray-400 font-medium mb-1">Puntaje Obtenido</span>
            <div class="bg-indigo-600 text-white px-4 py-1.5 rounded-full font-bold shadow-sm shadow-indigo-200 flex items-center gap-2">
              <i class="ph ph-star-fill text-yellow-300"></i>
              {{ inter?.puntaje }} pts
            </div>
          </div>
        </div>

        <div class="flex-1 mb-6">
          <h3 class="text-gray-900 font-bold mb-2 flex items-center gap-2">
            <i class="ph ph-text-align-left text-indigo-500"></i>
             {{ inter?.seccion ?? "Análisis"}}
          </h3>
          <p class="text-gray-600 text-sm leading-relaxed bg-slate-50 p-4 rounded-xl border border-gray-100">
            {{ inter?.descripcion || "Sin descripción disponible." }}
          </p>
        </div>

        <div class="mt-auto">
          <div class="flex items-center justify-between text-xs font-semibold text-gray-400 mb-2">
            <span>Rango Mínimo</span>
            <span>Rango Máximo</span>
          </div>
          
          <div class="relative h-3 bg-gray-100 rounded-full overflow-hidden">
            <div class="absolute inset-0 bg-gray-200/50"></div>
            <div class="absolute left-0 top-0 bottom-0 bg-indigo-500 rounded-full w-full opacity-20"></div>
          </div>

          <div class="flex justify-between mt-2 font-mono text-sm">
            <div class="flex items-center gap-1 text-gray-600 bg-gray-50 px-2 py-1 rounded-md border border-gray-200">
              <i class="ph ph-arrow-down text-gray-400"></i>
              {{ inter?.min }}
            </div>
            <div class="flex items-center gap-1 text-gray-600 bg-gray-50 px-2 py-1 rounded-md border border-gray-200">
              {{ inter?.max }}
              <i class="ph ph-arrow-up text-gray-400"></i>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>

</style>