<script setup>
import {onMounted} from "vue";
import {useTutorGrupoHasStudentsStore} from "@/stores/tutor/TutorStore.js";
import {storeToRefs} from "pinia";
import {useFormsStore} from "@/stores/tutor/forms.js";

const tutorGrupoHasStudentsStore = useTutorGrupoHasStudentsStore();
const formsStore = useFormsStore();

const {forms} = storeToRefs(formsStore);

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
  switch (status) {
    case 1:
      return 'completed';
    case 2:
      return 'pending';
    default:
      return 'Desconocido';
  }
};

const handleTestClick = (test) => {
  emit('handledTestClick', test);
};

onMounted(() => {
  tutorGrupoHasStudentsStore.fetchDataStudentById(props.selectedGroupId, props.selectedStudentId);
  formsStore.getFormsFromUser(props.selectedStudentId);
});
</script>

<template>
  <div class="space-y-8 animate-fade-in-up">

    <div class="bg-white rounded-3xl p-6 md:p-8 border border-gray-200 shadow-sm relative overflow-hidden">
      <div
          class="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

      <div class="flex flex-col md:flex-row items-center md:items-start gap-6 relative z-10">

        <div class="relative">
          <div
              class="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-100 to-white border border-indigo-200 flex items-center justify-center shadow-inner">
            <span class="text-3xl font-bold text-indigo-700 tracking-widest">
              {{ tutorGrupoHasStudentsStore.student?.initials || 'ES' }}
            </span>
          </div>
          <div class="absolute -bottom-2 -right-2 bg-white p-1.5 rounded-full border border-gray-100 shadow-sm"
               :title="tutorGrupoHasStudentsStore.student?.activo ? 'Activo' : 'Inactivo'">
            <div class="w-4 h-4 rounded-full"
                 :class="tutorGrupoHasStudentsStore.student?.activo ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'"></div>
          </div>
        </div>

        <div class="flex-1 text-center md:text-left space-y-2">
          <div>
            <h2 class="text-2xl font-bold text-gray-900 leading-tight">
              {{ tutorGrupoHasStudentsStore.student?.full_name || 'Estudiante Desconocido' }}
            </h2>
            <div class="flex items-center justify-center md:justify-start gap-2 text-gray-500 font-medium mt-1">
              <i class="ph ph-envelope-simple text-indigo-400"></i>
              <span>{{ tutorGrupoHasStudentsStore.student?.email || 'Sin correo registrado' }}</span>
            </div>
          </div>

          <div class="flex flex-wrap justify-center md:justify-start gap-3 mt-3">
            <span
                class="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wide">
              <i class="ph ph-identification-badge text-lg"></i>
              {{ tutorGrupoHasStudentsStore.student?.rol?.nombre || 'Rol: Estudiante' }}
            </span>
            <span
                class="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wide"
                :class="tutorGrupoHasStudentsStore.student?.activo ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-700 border border-red-100'">
              {{ tutorGrupoHasStudentsStore.student?.activo ? 'Cuenta Activa' : 'Cuenta Inactiva' }}
            </span>
          </div>
        </div>

      </div>
    </div>

    <div>
      <div class="flex items-center justify-between mb-6 px-1">
        <h3 class="text-xl font-bold text-gray-900 flex items-center gap-2">
          <i class="ph ph-clipboard-text text-indigo-600"></i>
          Historial de Evaluaciones
        </h3>
        <span class="text-sm text-gray-400">
          {{ forms?.length ?? 0 }} Asignados
        </span>
      </div>

      <div class="grid gap-4">

        <!-- No Tests Assigned Message -->
        <div v-if="forms?.length === 0"
             class="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-gray-300">
          <p class="text-gray-500">No hay formularios asignados a este estudiante.</p>
        </div>

        <!-- Test Cards -->
        <div
            v-for="test in forms"
            :key="test.id"
            @click="handleTestClick(test)"
            class="relative group bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300"
            :class="[
            getStatusLabel(test.status) === 'completed'
              ? 'hover:shadow-md hover:border-indigo-300 cursor-pointer'
              : 'opacity-90 bg-slate-50 cursor-default'
          ]"
        >
          <div class="absolute left-0 top-0 bottom-0 w-1.5 transition-colors duration-300"
               :class="getStatusLabel(test.status) === 'completed' ? 'bg-emerald-500' : 'bg-amber-400'">
          </div>

          <div class="p-5 pl-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div class="flex items-start gap-4">
              <div class="mt-1 p-3 rounded-xl shrink-0 flex items-center justify-center transition-colors"
                   :class="getStatusLabel(test.status) === 'completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'">
                <i :class="getStatusLabel(test.status) === 'completed' ? 'ph ph-check-circle' : 'ph ph-clock'" class="text-2xl"></i>
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
                <template v-if="getStatusLabel(test.status) === 'completed'">
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
</template>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>