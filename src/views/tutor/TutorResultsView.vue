<script setup>
import {computed, onMounted, ref, watch} from "vue";
import {useTutorGrupoHasStudentsStore} from "@/stores/tutor/TutorStore.js";
import {storeToRefs} from "pinia";
import {useFormStore} from "@/stores/tutor/form.js";
import {useAttemptsStore} from "@/stores/tutor/attempts.js";
import ReadOnlyQuestion from "@/components/ReadOnlyQuestion.vue";
import {routes} from "@/router/routes.js";

const tutorStore = useTutorGrupoHasStudentsStore();
const formStore = useFormStore();
const attemptsStore = useAttemptsStore();

const {attemptId} = storeToRefs(tutorStore);
const {answers} = storeToRefs(attemptsStore);
const {formData} = storeToRefs(formStore);

// Estado para colapsar/expandir las respuestas
const showDetails = ref(false);
const respuestas = ref({});

const props = defineProps(
    {
      selectedStudent: Object,
      selectedTest: Object,
      selectedGroup: Object
    }
);
const selectedStudent = props.selectedStudent;
const formSelected = props.selectedTest;

watch(attemptId, (newAttemptId) => {
  console.log("New attempt ID:", newAttemptId);
  if (newAttemptId) {
    attemptsStore.fetchAnswers(newAttemptId);
  }
});

watch(answers, (responses) => {
      console.log("Fetched answers:", responses);
      if (responses) {
        // Mostramos las respuestas en el formulario
        respuestas.value = {}; // Reiniciar respuestas antes de llenarlas
        responses?.forEach(respuesta => {

          const preguntaId = respuesta.pregunta_id;

          // Asignar el valor correcto según el tipo de respuesta
          if (respuesta.texto_respuesta !== null) {
            respuestas.value[preguntaId] = respuesta.texto_respuesta;
          } else if (respuesta.opcion_pregunta_id !== null) {
            respuestas.value[preguntaId] = respuesta.opcion_pregunta_id;
          } else if (respuesta.valor_booleano !== null) {
            respuestas.value[preguntaId] = respuesta.valor_booleano;
          } else if (respuesta.opciones_escala_id !== null) {
            respuestas.value[preguntaId] = respuesta.opciones_escala_id;
          }

        });
      }
    }
);

onMounted(() => {
  attemptsStore.clearAnswers();
  formStore.clearFormData();
  tutorStore.fetchFormResultsByStudentId(selectedStudent?.id, formSelected?.id);
  formStore.fetchFormData(formSelected?.id);
});

</script>

<template>
  <div class="bg-slate-50 p-6 md:p-8 rounded-3xl min-h-[400px] space-y-10">

    <section>
      <div class="mb-6">
        <h2 class="text-2xl font-extrabold text-gray-900 flex items-center gap-3">
          <span class="bg-indigo-100 text-indigo-600 p-2 rounded-xl">
            <i class="ph ph-chart-bar text-2xl"></i>
          </span>
          Análisis de Resultados
        </h2>
        <p class="text-gray-500 mt-1 ml-1">
          Interpretación automática basada en el puntaje obtenido.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
            v-for="inter in tutorStore.interpretaciones ?? []"
            :key="inter.id"
            class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col hover:border-indigo-300 transition-colors"
        >
          <div class="flex justify-between items-start mb-6 pb-4 border-b border-gray-100">
            <div>
              <span class="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Sección</span>
              <h3 class="text-lg font-bold text-gray-800 flex items-center gap-2">
                {{ inter?.seccion ?? "General" }}
              </h3>
            </div>
            <div class="bg-indigo-600 text-white px-3 py-1 rounded-lg font-bold text-sm shadow-md shadow-indigo-200">
              {{ inter?.puntaje }} pts
            </div>
          </div>

          <div
              class="flex-1 bg-slate-50 p-4 rounded-xl border border-gray-100 text-sm text-gray-600 leading-relaxed mb-6">
            {{ inter?.descripcion || "Sin descripción disponible." }}
          </div>

          <div>
            <div class="flex justify-between text-xs font-semibold text-gray-400 mb-1">
              <span>Min: {{ inter?.min }}</span>
              <span>Max: {{ inter?.max }}</span>
            </div>
            <div class="relative h-2 bg-gray-100 rounded-full overflow-hidden">
              <div class="absolute inset-0 bg-gray-200"></div>
              <div class="absolute left-0 top-0 bottom-0 bg-indigo-500 w-1/2 rounded-full opacity-50"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Detalles de Respuestas -->
    <section class="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">

      <div
          @click="showDetails = !showDetails"
          class="p-6 md:p-8 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors select-none"
      >
        <div class="flex items-center gap-4">
          <div class="bg-blue-50 text-blue-600 p-3 rounded-xl">
            <i class="ph ph-list-checks text-2xl"></i>
          </div>
          <div>
            <h2 class="text-xl font-bold text-gray-900">Respuestas Detalladas</h2>
            <p class="text-gray-500 text-sm">
              Revisa las respuestas específicas ingresadas por el estudiante.
            </p>
          </div>
        </div>

        <button
            class="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 transition-transform duration-300"
            :class="showDetails ? 'rotate-180 bg-gray-100' : ''">
          <i class="ph ph-caret-down text-xl"></i>
        </button>
      </div>

      <div v-show="showDetails" class="border-t border-gray-100 bg-white">

        <div class="divide-y divide-gray-100">
          <div v-for="(seccion, index) in formData?.secciones || []" :key="seccion.id" class="p-6 md:p-8">

            <div class="flex items-center gap-3 mb-6">
              <span
                  class="flex-shrink-0 w-8 h-8 rounded-lg bg-gray-100 text-gray-600 text-sm font-bold flex items-center justify-center">
                {{ index + 1 }}
              </span>
              <h3 class="text-lg font-bold text-gray-800">{{ seccion.titulo }}</h3>
            </div>

            <div class="pl-0 md:pl-11 space-y-6">
              <div v-for="pregunta in seccion.preguntas || []" :key="pregunta.id"
                   class="relative pb-6 border-b border-gray-50 last:border-0 last:pb-0">

                <ReadOnlyQuestion
                    :pregunta="pregunta"
                    :respuesta="respuestas[pregunta.id]"
                />

              </div>
            </div>

          </div>
        </div>
      </div>

    </section>

    <!-- Boton para abrir una ruta -->
    <div class="flex justify-end">
      <button
          @click="$router.push(routes.tutorGroupFormAnalytics(selectedGroup.id, formSelected.id))"
          class="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold shadow-md shadow-indigo-200 hover:bg-indigo-700 transition-colors flex items-center gap-2"
      >
        Ver Análisis Grupal
      </button>
    </div>

  </div>
</template>

<style scoped>

</style>