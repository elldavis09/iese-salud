<script lang="js" setup>
import {onMounted, ref, watch} from 'vue';
import {useRoute} from 'vue-router';
import {storeToRefs} from "pinia";
import {useFormulariosStore} from '@/stores/student/forms.js';
import router from "@/router/index.js";
import {routes} from '@/router/routes';
import {useNotificationStore} from "@/stores/notification.js";
import {NotificationTypes as notificationType} from "@/util/notificationTypes.js";
import {useAttemptsStore} from "@/stores/student/attempts.js";
import {useFormStore} from "@/stores/student/form.js";

const route = useRoute();
const attemptsStore = useAttemptsStore();
const notification = useNotificationStore();
const formStore = useFormStore();

const respuestas = ref({});
const {
  attempts, attemptsMessage, attemptsError, attemptsIsLoading
} = storeToRefs(attemptsStore);

const {formSelected, formSelectedMessage, formSelectedError, formSelectedIsLoading,} = storeToRefs(formStore);

// Notificaciones de formulario
watch(formSelectedMessage, (nuevoValor) => {
  notification.triggerToast(nuevoValor, notificationType.info);
});

// Notificaciones de intentos
watch(attemptsMessage, (nuevoValor) => {
  notification.triggerToast(nuevoValor, notificationType.info);
});

watch (attemptsError, () => {
  if (attemptsError.value) {
    notification.triggerToast(attemptsError.value, notificationType.error);
  }
})

const getAttemptResponses = async (attemptId) => {
  try {
    const responses = await attemptsStore.getAttemptResponses(formSelected?.value.id, attemptId);

    // Mostramos las respuestas en el formulario
    respuestas.value = {}; // Reiniciar respuestas antes de llenarlas
    responses?.respuestas?.forEach(respuesta => {

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
  } catch (error) {
    console.error('Error al obtener las respuestas del intento:', error);
  }
};

const deleteFormAttempt = async (attemptId) => {
  await attemptsStore.deleteFormAttempt(formSelected?.value.id, attemptId);
  await attemptsStore.getFormsAttempts(formSelected?.value.id);
};

const getInterpretation = async (formId, attemptId) => {
  router.push(routes.studentFormResults(formId, attemptId));
};

const buildPayload = () => {
  const payload = [];
  formSelected?.value.secciones?.forEach(seccion => {
    seccion.preguntas?.forEach(pregunta => {
      const tipo = pregunta.tipo_pregunta?.descripcion;
      // Obtener la respuesta correspondiente
      const respuesta = respuestas.value[pregunta.id];

      // Solo agregar si la respuesta no es null, undefined o string vacío
      const isFilled = respuesta !== null && respuesta !== undefined && respuesta !== '';

      if (tipo === 'TEXTO_LIBRE' && isFilled) {
        payload.push({
          pregunta_id: pregunta.id,
          texto_respuesta: respuesta
        });
      } else if (tipo === 'OPCIONES' && isFilled) {
        payload.push({
          pregunta_id: pregunta.id,
          opcion_pregunta_id: respuesta
        });
      } else if (tipo === 'SI_NO' && isFilled) {
        payload.push({
          pregunta_id: pregunta.id,
          valor_booleano: respuesta
        });
      } else if (tipo === 'ESCALA' && isFilled) {
        payload.push({
          pregunta_id: pregunta.id,
          opciones_escala_id: respuesta
        });
      } else if (tipo === 'TABLA_DINAMICA') {
        pregunta.preguntas?.forEach(subPregunta => {
          const subRespuesta = respuestas.value[subPregunta.id];
          const isSubFilled = subRespuesta !== null && subRespuesta !== undefined && subRespuesta !== '';
          if (isSubFilled) {
            payload.push({
              pregunta_id: subPregunta.id,
              texto_respuesta: subRespuesta
            });
          }
        });
      }
    });
  });
  return payload;
};

const submitForm = async () => {
  const payload = buildPayload();
  await formStore.submitFormResponses(formSelected.value.id, {respuestas: payload});
  await attemptsStore.getFormsAttempts(formSelected.value.id)
};

onMounted(() => {
  formStore.getFormById(route.params.id);
  attemptsStore.getFormsAttempts(route.params.id);
});
</script>

<template>
  <div class="min-h-screen bg-slate-100 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

      <main class="lg:col-span-8">
        <form @submit.prevent="submitForm" id="main-form">
          <!-- container form -->
          <div class="bg-white rounded-2xl shadow-md border border-gray-200/60 overflow-hidden font-inter">

            <div class="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50/30 p-8">
              <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 class="text-3xl font-extrabold text-gray-900 tracking-tight">
                    {{ formSelected?.nombre ?? "Título del formulario" }}
                  </h2>
                  <p class="text-gray-600 mt-2 text-lg leading-relaxed">
                    <span
                        v-html="(formSelected?.descripcion ?? 'Por favor complete la siguiente información.').replace(/\n/g, '<br>')"></span>
                  </p>
                </div>
                <!-- Componente de estado -->
                <div class="flex-shrink-0">
                  <span
                      class="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm ring-1 ring-inset transition-all"
                      :class="formSelected?.activo
                      ? 'bg-teal-50 text-teal-700 ring-teal-600/20'
                      : 'bg-rose-50 text-rose-700 ring-rose-600/20'">
                    <span class="relative flex h-2.5 w-2.5 mr-2">
                      <span class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                            :class="formSelected?.activo ? 'bg-teal-400' : 'bg-rose-400'"></span>
                      <span class="relative inline-flex rounded-full h-2.5 w-2.5"
                            :class="formSelected?.activo ? 'bg-teal-600' : 'bg-rose-500'"></span>
                    </span>
                    {{ formSelected?.activo ? 'Activo' : 'Inactivo' }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Contenido del formulario -->
            <div class="divide-y divide-gray-100">
              <div v-for="(seccion, index) in formSelected?.secciones || []" :key="seccion.id"
                   class="p-8 md:p-10">

                <div class="mb-8 flex items-start gap-3">
                  <div
                      class="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 text-white text-sm font-bold shadow-sm mt-0.5">
                    {{ index + 1 }}
                  </div>
                  <div>
                    <h3 class="text-2xl font-bold text-gray-800">
                      {{ seccion.titulo }}
                    </h3>
                    <p v-if="seccion.descripcion" class="text-gray-500 text-base mt-2 leading-relaxed">
                      {{ seccion.descripcion }}
                    </p>
                  </div>
                </div>

                <div class="space-y-8 ml-0 md:ml-11">
                  <div v-for="pregunta in seccion.preguntas || []" :key="pregunta.id" class="relative">

                    <label class="block text-base font-semibold text-gray-800 mb-3 cursor-pointer">
                      {{ pregunta.contenido }}
                      <span v-if="pregunta.es_obligatoria" class="text-red-500 text-lg ml-1 align-middle"
                            title="Campo obligatorio">*</span>
                    </label>

                    <div v-if="pregunta.tipo_pregunta.descripcion === 'TEXTO_LIBRE'">
                      <input v-model="respuestas[pregunta.id]" type="text"
                             class="block w-full text-lg bg-gray-50 text-gray-900 rounded-xl border-gray-300 shadow-sm py-3 px-4 placeholder:text-gray-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 outline-none"
                             placeholder="Escriba su respuesta aquí..."/>
                    </div>

                    <div v-else-if="pregunta.tipo_pregunta.descripcion === 'OPCIONES'">
                      <select v-model.number="respuestas[pregunta.id]"
                              class="block w-full text-lg bg-gray-50 text-gray-900 rounded-xl border-gray-300 shadow-sm py-3 px-4 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 outline-none appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3E%3Cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3E%3C/svg%3E')] bg-[length:1.5rem_1.5rem] bg-no-repeat bg-[right_1rem_center] pr-10">
                        <option disabled value="">Seleccione una opción...</option>
                        <option v-for="opcion in pregunta.opciones || []" :key="opcion.id" :value="opcion.id"
                                class="py-2">
                          {{ opcion.texto_opcion }}
                        </option>
                      </select>
                    </div>

                    <div v-else-if="pregunta.tipo_pregunta.descripcion === 'SI_NO'">
                      <div class="flex flex-wrap gap-4">
                        <label class="relative flex-1 min-w-[120px] max-w-[200px] cursor-pointer group">
                          <input type="radio" v-model="respuestas[pregunta.id]" :value="true" class="peer sr-only">
                          <div
                              class="flex items-center justify-center p-4 rounded-xl border-2 border-gray-200 bg-gray-50 text-lg font-medium text-gray-600 hover:bg-gray-100 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 peer-focus:ring-4 peer-focus:ring-blue-100 transition-all">
                            <span class="flex items-center gap-2">
                              <svg class="w-5 h-5 opacity-50 peer-checked:opacity-100" fill="none" stroke="currentColor"
                                   viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M5 13l4 4L19 7"></path>
                              </svg>
                              Sí
                            </span>
                          </div>
                          <span
                              class="absolute inset-0 rounded-xl border-2 border-transparent peer-checked:border-blue-500 pointer-events-none"></span>
                        </label>

                        <label class="relative flex-1 min-w-[120px] max-w-[200px] cursor-pointer group">
                          <input type="radio" v-model="respuestas[pregunta.id]" :value="false" class="peer sr-only">
                          <div
                              class="flex items-center justify-center p-4 rounded-xl border-2 border-gray-200 bg-gray-50 text-lg font-medium text-gray-600 hover:bg-gray-100 peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:text-red-700 peer-focus:ring-4 peer-focus:ring-red-100 transition-all">
                            <span class="flex items-center gap-2">
                              <svg class="w-5 h-5 opacity-50 peer-checked:opacity-100" fill="none" stroke="currentColor"
                                   viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M6 18L18 6M6 6l12 12"></path>
                              </svg>
                              No
                            </span>
                          </div>
                          <span
                              class="absolute inset-0 rounded-xl border-2 border-transparent peer-checked:border-red-500 pointer-events-none"></span>
                        </label>
                      </div>
                    </div>

                    <div v-else-if="pregunta.tipo_pregunta.descripcion === 'ESCALA'">
                      <div class="flex flex-col gap-3">
                        <template v-for="opcion in pregunta.escala?.opciones || []" :key="opcion.id">

                          <label class="relative cursor-pointer group">
                            <input type="radio" v-model="respuestas[pregunta.id]" :value="opcion.id"
                                   class="peer sr-only">

                            <div class="w-full p-4 rounded-xl border-2 border-gray-200 bg-white flex items-center transition-all shadow-sm
                  group-hover:border-blue-300 group-hover:bg-blue-50/50
                  peer-checked:border-blue-600 peer-checked:bg-blue-50 peer-checked:shadow-md
                  peer-focus:ring-4 peer-focus:ring-blue-100">

                              <div class="flex-shrink-0 w-6 h-6 rounded-full border-2 border-gray-300 mr-4 flex items-center justify-center transition-colors
                    group-hover:border-blue-400
                    peer-checked:border-blue-600 peer-checked:bg-blue-600">
                                <div
                                    class="w-2.5 h-2.5 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity">
                                </div>
                              </div>

                              <span
                                  class="text-lg font-medium text-gray-700 peer-checked:text-blue-900 leading-snug select-none">
                                {{ opcion.texto_opcion }}
                              </span>
                            </div>

                            <div
                                class="absolute inset-0 rounded-xl border-2 border-transparent peer-checked:border-blue-600 pointer-events-none">
                            </div>
                          </label>

                        </template>
                      </div>
                    </div>

                    <div v-else-if="pregunta.tipo_pregunta.descripcion === 'ETIQUETA'">
                      <div
                          class="bg-indigo-50 text-indigo-800 p-4 rounded-xl text-base border border-indigo-100 flex items-start gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 flex-shrink-0 text-indigo-500"
                             fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        {{ pregunta.descripcion }}
                      </div>
                    </div>

                    <div v-else-if="pregunta.tipo_pregunta.descripcion === 'TABLA_DINAMICA'">
                      <div class="border-2 border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                        <div class="overflow-x-auto custom-scrollbar">
                          <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-100">
                            <tr>
                              <th v-for="subPregunta in pregunta.preguntas || []" :key="subPregunta.id"
                                  class="px-5 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                                {{ subPregunta.contenido }}
                              </th>
                              <th class="px-2 py-4 bg-gray-100"></th>
                            </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-100">
                            <tr>
                              <td v-for="subPregunta in pregunta.preguntas || []" :key="subPregunta.id"
                                  class="px-4 py-3 bg-white">
                                <input v-model="respuestas[subPregunta.id]" type="text"
                                       class="block w-full text-base bg-gray-50 text-gray-900 rounded-lg border-gray-200 shadow-sm py-2.5 px-3 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                                       placeholder="..."/>
                              </td>
                              <td class="px-2 py-3 text-center align-middle bg-white">
                                <button type="button"
                                        class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors">
                                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                       viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                  </svg>
                                </button>
                              </td>
                            </tr>
                            </tbody>
                          </table>
                        </div>
                        <div class="bg-gray-50 px-5 py-4 border-t border-gray-200/60">
                          <button type="button"
                                  class="inline-flex items-center px-4 py-2 border-2 border-blue-600 rounded-xl text-sm font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                            </svg>
                            Agregar fila
                          </button>
                        </div>
                      </div>
                    </div>

                    <div v-else class="text-sm text-red-600 bg-red-50 p-4 rounded-xl border border-red-100">
                      Tipo no soportado: <span class="font-mono">{{ pregunta.tipo_pregunta.descripcion }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Submit section -->
            <div class="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50/30 p-8">
              <h3 class="text-xl font-bold text-gray-900 mb-2">Finalizar</h3>
              <p class="text-gray-600 mb-6 leading-relaxed">¿Todo listo? Envía tus respuestas.</p>
              <button class="w-full flex justify-center items-center px-6 py-4 border border-transparent text-lg font-bold rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg transform transition-all active:scale-[0.98]">
                Enviar Formulario Ahora
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 12h16"/>
                </svg>
              </button>
            </div>
          </div>
        </form>
      </main>

      <!-- Lateral menu content -->
      <aside class="lg:col-span-4 lg:sticky lg:top-8 space-y-6 self-start font-inter">
        <div class="bg-white rounded-2xl shadow-md border border-gray-200/60 overflow-hidden">
          <!-- Is loading indicator -->
          <div v-if="attemptsIsLoading" class="p-6 flex justify-center items-center">
            <svg class="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
          </div>

          <!-- History submits header -->
          <div class="p-6 border-b border-gray-100 bg-gray-50">
            <h3 class="text-lg font-bold text-gray-900 flex items-center justify-between">
              Historial de envíos
              <span class="bg-blue-100 text-blue-700 py-1 px-3 rounded-full text-xs font-extrabold">
                {{ attempts?.length || 0 }}
              </span>
            </h3>
          </div>

          <!-- Submits history -->
          <ul class="p-4 space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar">
            <li v-for="intento in attempts" :key="intento.id"
                class="group p-4 rounded-xl border-2 border-gray-100 bg-white hover:border-blue-200 hover:shadow-sm transition-all">

              <div class="flex justify-between items-center mb-3">
                <span class="font-bold text-gray-700">Intento #{{ intento.id }}</span>
                <span class="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-md">{{
                    new
                    Date(intento.created_at).toLocaleDateString()
                  }}</span>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <button @click="getAttemptResponses(intento.id)"
                        class="flex items-center justify-center px-3 py-2.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-bold hover:bg-blue-100 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24"
                       stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 5 8.268 7.943 9.542 12-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                  Ver
                </button>
                <button @click="deleteFormAttempt(intento.id)"
                        class="flex items-center justify-center px-3 py-2.5 bg-red-50 text-red-700 rounded-lg text-sm font-bold hover:bg-red-100 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24"
                       stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                  Borrar
                </button>
                <!-- Boton para ver interpretacion -->
                <button @click="getInterpretation(formSelected.id, intento.id)"
                        class="flex items-center justify-center px-3 py-2.5 bg-green-50 text-green-700 rounded-lg text-sm font-bold hover:bg-green-100 transition-colors">
                  Interpretación
                </button>
              </div>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  </div>
</template>

<style scoped>
/* Estilos opcionales para una barra de desplazamiento más bonita en la tabla y el historial */
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Asegurar que la fuente se vea bien si tienes Inter cargada, si no, usará la del sistema */
.font-inter {
  font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
}
</style>
