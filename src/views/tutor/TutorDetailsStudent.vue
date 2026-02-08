<script setup>
import {onMounted} from "vue";
import {storeToRefs} from "pinia";
import {tutorDetailStudentStore} from "@/stores/tutor/TutorDetailStudentStore.js";


// Desestructuramos el store para obtener solo lo necesario
const tutorDetailStudentStr = tutorDetailStudentStore();
const { fetchDataStudentById } = tutorDetailStudentStr
const { userData, isLoading, error} = storeToRefs(tutorDetailStudentStr);
const { fetchFormsFromUser } = tutorDetailStudentStr;
const { forms, formsIsLoading, formsError } = storeToRefs(tutorDetailStudentStr);

const emit = defineEmits(['handledTestClick']);
const props = defineProps(
    {
      selectedGroupId: {
        type: Number,
        required: true
      },
      selectedStudentId: {
        type: Number,
        required: true
      }
    }
);

const getStatusLabel = (status) => {
  if (status === 0) {
    return 'pending';
  } else {
    return 'completed';
  }
};

const handleTestClick = (test) => {
  emit('handledTestClick', test);
};

onMounted(() => {
  fetchDataStudentById(props.selectedGroupId, props.selectedStudentId);
  fetchFormsFromUser(props.selectedStudentId)
});
</script>

<template>
  <div>
    <!-- Student Info Header -->
    <div>
      <p> {{ userData?.initials || 'ES' }}</p>
      <p>{{  userData?.activo ? 'Activo' : 'Inactivo' }}</p>
      <p>{{  userData?.full_name || 'Estudiante Desconocido' }}</p>
      <p>{{  userData?.activo }}</p>
      <p>{{  userData?.email || 'Sin correo registrado' }}</p>
      <p>{{  userData?.rol?.nombre || 'Rol: Estudiante' }}</p>
      <p>{{  userData?.activo ? 'Cuenta Activa' : 'Cuenta Inactiva' }}</p>
    </div>

    <div>
      <h3 class="text-xl font-bold text-gray-900 flex items-center gap-2">
        <i class="ph ph-clipboard-text text-indigo-600"></i>
        Historial de Evaluaciones
      </h3>

      <div>
        <!-- Resumen de Tests -->
        <div class="flex items-center justify-between mb-6 px-1">
          <span class="text-sm text-gray-400">
          {{ forms?.length ?? 0 }} Asignados
          </span>
        </div>

        <!-- Lista de Tests -->
        <div class="grid gap-4">
          <div
              v-for="test in forms"
              :key="test.id"
              @click="handleTestClick(test)"
              class="relative group bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300"
              :class="[
            getStatusLabel(test.intentos_count) === 'completed'
              ? 'hover:shadow-md hover:border-indigo-300 cursor-pointer'
              : 'opacity-90 bg-slate-50 cursor-default'
          ]"
          >
            <div class="absolute left-0 top-0 bottom-0 w-1.5 transition-colors duration-300"
                 :class="getStatusLabel(test.intentos_count) === 'completed' ? 'bg-emerald-500' : 'bg-amber-400'">
            </div>

            <div class="p-5 pl-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div class="flex items-start gap-4">
                <div class="mt-1 p-3 rounded-xl shrink-0 flex items-center justify-center transition-colors"
                     :class="getStatusLabel(test.intentos_count) === 'completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'">
                  <i :class="getStatusLabel(test.intentos_count) === 'completed' ? 'ph ph-check-circle' : 'ph ph-clock'"
                     class="text-2xl"></i>
                </div>

                <div>
                  <h4 class="font-bold text-gray-900 text-lg group-hover:text-indigo-700 transition-colors">
                    {{ test.nombre }}
                  </h4>

                  <div class="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500">
                  <span class="flex items-center gap-1.5 bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100">
                    <i class="ph ph-calendar-blank text-gray-400"></i>
                    {{ test.date || 'Sin fecha' }}
                  </span>

                    <span v-if="test.type === 'complex'" class="flex items-center gap-1.5 text-indigo-600 font-medium">
                    <i class="ph ph-chart-pie-slice"></i>
                    Análisis Detallado
                  </span>
                  </div>
                </div>
              </div>

              <div
                  class="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6 sm:pl-0 pt-4 sm:pt-0 border-t sm:border-0 border-gray-100">

                <div class="text-right min-w-[100px]">
                  <template v-if="getStatusLabel(test.intentos_count) === 'completed'">
                  <span
                      class="block text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-0.5">Resultado</span>
                    <div class="flex items-baseline justify-end gap-1">
                      <span class="text-2xl font-extrabold text-gray-900">{{ test.score }}</span>
                      <span class="text-sm text-gray-400 font-medium">/ {{ test.maxScore }}</span>
                    </div>
                  </template>

                  <template v-else>
                  <span
                      class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-100">
                    Pendiente
                  </span>
                  </template>
                </div>

                <div v-if="getStatusLabel(test.intentos_count) === 'completed'"
                     class="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm">
                  <i class="ph ph-caret-right text-lg"></i>
                </div>
                <div v-else class="w-10 h-10"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<style scoped>
</style>