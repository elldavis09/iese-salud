<script lang="js" setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from "pinia";
import { useNotificationStore } from "@/stores/notification.js";
import { NotificationTypes as notificationType } from "@/util/notificationTypes.js";
import { useAttemptsStore } from "@/stores/student/attempts.js";
import { useFormsStore } from "@/stores/student/forms.js";
import router from "@/router/index.js";
import { routes } from "@/router/routes.js";
import StatusFormSection from "@/components/Form/StatusFormSection.vue";

const route = useRoute();
const attemptsStore = useAttemptsStore();
const notification = useNotificationStore();
const formStore = useFormsStore();

// Usamos un ref para controlar el estado de envío localmente y evitar dobles clics
const isSubmitting = ref(false);
const respuestas = ref({});

const {
  attempts, attemptsMessage, attemptsError, attemptsIsLoading
} = storeToRefs(attemptsStore);

const { formSelected, message, error, isLoading } = storeToRefs(formStore);

// Notificaciones de formulario
watch(message, (nuevoValor) => {
  if (nuevoValor) notification.triggerToast(nuevoValor, notificationType.info);
});

// Notificaciones de intentos
watch(attemptsMessage, (nuevoValor) => {
  if (nuevoValor) notification.triggerToast(nuevoValor, notificationType.info);
});

watch(attemptsError, (nuevoValor) => {
  if (nuevoValor) {
    notification.triggerToast(nuevoValor, notificationType.error);
  }
});

const getAttemptResponses = async (attemptId) => {
  try {
    const responses = await attemptsStore.getAttemptResponses(formSelected?.value?.id, attemptId);

    // Reiniciar respuestas antes de llenarlas
    respuestas.value = {}; 
    
    responses?.respuestas?.forEach(respuesta => {
      const preguntaId = respuesta.pregunta_id;

      if (respuesta.texto_respuesta !== null && respuesta.texto_respuesta !== undefined) {
        respuestas.value[preguntaId] = respuesta.texto_respuesta;
      } else if (respuesta.opcion_pregunta_id !== null && respuesta.opcion_pregunta_id !== undefined) {
        respuestas.value[preguntaId] = respuesta.opcion_pregunta_id;
      } else if (respuesta.valor_booleano !== null && respuesta.valor_booleano !== undefined) {
        respuestas.value[preguntaId] = respuesta.valor_booleano;
      } else if (respuesta.opciones_escala_id !== null && respuesta.opciones_escala_id !== undefined) {
        respuestas.value[preguntaId] = respuesta.opciones_escala_id;
      }
    });
  } catch (err) {
    console.error('Error al obtener las respuestas del intento:', err);
    notification.triggerToast('Error al cargar las respuestas', notificationType.error);
  }
};

const deleteFormAttempt = async (attemptId) => {
  if (confirm('¿Estás seguro de que deseas eliminar este intento?')) {
    try {
      await attemptsStore.deleteFormAttempt(formSelected?.value?.id, attemptId);
      await attemptsStore.getFormsAttempts(formSelected?.value?.id);
    } catch (err) {
      console.error('Error al eliminar:', err);
    }
  }
};

const getInterpretation = (formId, attemptId) => {
  router.push(routes.studentFormResults(formId, attemptId));
};

const buildPayload = () => {
  const payload = [];
  formSelected?.value?.secciones?.forEach(seccion => {
    seccion.preguntas?.forEach(pregunta => {
      const tipo = pregunta.tipo_pregunta?.descripcion;
      const respuesta = respuestas.value[pregunta.id];

      // Verificación estricta: Evita falsos negativos con el booleano 'false' o el número '0'
      const isFilled = respuesta !== null && respuesta !== undefined && respuesta !== '';

      if (isFilled) {
        if (tipo === 'TEXTO_LIBRE') {
          payload.push({ pregunta_id: pregunta.id, texto_respuesta: respuesta });
        } else if (tipo === 'OPCIONES') {
          payload.push({ pregunta_id: pregunta.id, opcion_pregunta_id: respuesta });
        } else if (tipo === 'SI_NO') {
          payload.push({ pregunta_id: pregunta.id, valor_booleano: respuesta });
        } else if (tipo === 'ESCALA') {
          payload.push({ pregunta_id: pregunta.id, opciones_escala_id: respuesta });
        }
      }

      // Para tablas dinámicas, evaluamos las subpreguntas independientemente
      if (tipo === 'TABLA_DINAMICA') {
        pregunta.preguntas?.forEach(subPregunta => {
          const subRespuesta = respuestas.value[subPregunta.id];
          if (subRespuesta !== null && subRespuesta !== undefined && subRespuesta !== '') {
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
  if (isSubmitting.value) return;
  
  isSubmitting.value = true;
  try {
    const payload = buildPayload();
    
    if (payload.length === 0) {
      notification.triggerToast('Por favor, responde al menos una pregunta.', notificationType.warning);
      return;
    }

    await formStore.submitFormResponses(formSelected.value.id, { respuestas: payload });
    await attemptsStore.getFormsAttempts(formSelected.value.id);
    
    // Limpiar el formulario después de un envío exitoso
    respuestas.value = {};
    notification.triggerToast('Formulario enviado con éxito', notificationType.success);
    
  } catch (err) {
    console.error('Error al enviar el formulario:', err);
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(() => {
  const formId = route.params.id;
  if (formId) {
    formStore.getFormById(formId);
    attemptsStore.getFormsAttempts(formId);
  }
});
</script>

<template>
  <!-- Centrar el formulario -->
  <div class="min-h-screen bg-slate-100 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

      <main class="lg:col-span-8">
        <form @submit.prevent="submitForm" id="main-form">
          <div class="bg-white rounded-2xl shadow-md border border-gray-200/60 overflow-hidden font-inter">

            <div class="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50/30 p-8">
              <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 class="text-3xl font-extrabold text-gray-900 tracking-tight">
                    {{ formSelected?.nombre ?? "Cargando formulario..." }}
                  </h2>
                  <p v-if="formSelected?.descripcion" class="text-gray-600 mt-2 text-lg leading-relaxed">
                    <span v-html="formSelected.descripcion.replace(/\n/g, '<br>')"></span>
                  </p>
                </div>
                <StatusFormSection :status="formSelected?.activo"/>
              </div>
            </div>

            <div class="divide-y divide-gray-100">
              <div v-for="(seccion, index) in formSelected?.secciones || []" :key="seccion.id"
                   class="p-8 md:p-10">

                <div class="mb-8 flex items-start gap-3">
                  <div
                      class="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-[#064459] text-white text-sm font-bold shadow-sm mt-0.5">
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

                    <div v-if="pregunta.tipo_pregunta?.descripcion === 'TEXTO_LIBRE'">
                      <input v-model="respuestas[pregunta.id]" type="text"
                             :required="pregunta.es_obligatoria"
                             class="block w-full text-lg bg-gray-50 text-gray-900 rounded-xl border-gray-300 shadow-sm py-3 px-4 placeholder:text-gray-400 focus:bg-white focus:border-[#064459] focus:ring-4 focus:ring-[#064459]/20 transition-all duration-200 outline-none"
                             placeholder="Escriba su respuesta aquí..."/>
                    </div>

                    <div v-else-if="pregunta.tipo_pregunta?.descripcion === 'OPCIONES'">
                      <select v-model.number="respuestas[pregunta.id]"
                              :required="pregunta.es_obligatoria"
                              class="block w-full text-lg bg-gray-50 text-gray-900 rounded-xl border-gray-300 shadow-sm py-3 px-4 focus:bg-white focus:border-[#064459] focus:ring-4 focus:ring-[#064459]/20 transition-all duration-200 outline-none appearance-none">
                        <option disabled value="">Seleccione una opción...</option>
                        <option v-for="opcion in pregunta.opciones || []" :key="opcion.id" :value="opcion.id"
                                class="py-2">
                          {{ opcion.texto_opcion }}
                        </option>
                      </select>
                    </div>

                    <div v-else-if="pregunta.tipo_pregunta?.descripcion === 'SI_NO'">
                      <div class="flex flex-wrap gap-4">
                        <label class="relative flex-1 min-w-[120px] max-w-[200px] cursor-pointer group">
                          <input type="radio" v-model="respuestas[pregunta.id]" :value="true" :required="pregunta.es_obligatoria && respuestas[pregunta.id] === undefined" class="peer sr-only">
                          <div class="flex items-center justify-center p-4 rounded-xl border-2 border-gray-200 bg-gray-50 text-lg font-medium text-gray-600 hover:bg-gray-100 peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:text-green-700 transition-all">
                            Sí
                          </div>
                        </label>

                        <label class="relative flex-1 min-w-[120px] max-w-[200px] cursor-pointer group">
                          <input type="radio" v-model="respuestas[pregunta.id]" :value="false" :required="pregunta.es_obligatoria && respuestas[pregunta.id] === undefined" class="peer sr-only">
                          <div class="flex items-center justify-center p-4 rounded-xl border-2 border-gray-200 bg-gray-50 text-lg font-medium text-gray-600 hover:bg-gray-100 peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:text-red-700 transition-all">
                            No
                          </div>
                        </label>
                      </div>
                    </div>

                    <div v-else-if="pregunta.tipo_pregunta?.descripcion === 'ESCALA'">
                      <div class="flex flex-col gap-3">
                        <template v-for="opcion in pregunta.escala?.opciones || []" :key="opcion.id">
                          <label class="relative cursor-pointer group">
                            <input type="radio" v-model="respuestas[pregunta.id]" :value="opcion.id" :required="pregunta.es_obligatoria && !respuestas[pregunta.id]" class="peer sr-only">
                            <div class="w-full p-4 rounded-xl border-2 border-gray-200 bg-white flex items-center transition-all shadow-sm group-hover:border-[#064459]/50 peer-checked:border-[#064459] peer-checked:bg-[#064459]/5">
                              <div class="flex-shrink-0 w-6 h-6 rounded-full border-2 border-gray-300 mr-4 flex items-center justify-center transition-colors peer-checked:border-[#064459] peer-checked:bg-[#064459]">
                                <div class="w-2.5 h-2.5 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                              </div>
                              <span class="text-lg font-medium text-gray-700 peer-checked:text-[#064459]">{{ opcion.texto_opcion }}</span>
                            </div>
                          </label>
                        </template>
                      </div>
                    </div>

                    <div v-else-if="pregunta.tipo_pregunta?.descripcion === 'ETIQUETA'">
                      <div class="bg-indigo-50 text-indigo-800 p-4 rounded-xl text-base border border-indigo-100 flex items-start gap-3">
                        <span class="material-symbols-outlined flex-shrink-0 text-indigo-500">info</span>
                        {{ pregunta.descripcion }}
                      </div>
                    </div>

                    <div v-else-if="pregunta.tipo_pregunta?.descripcion === 'TABLA_DINAMICA'">
                      <div class="border-2 border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                        <div class="overflow-x-auto custom-scrollbar">
                          <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-100">
                            <tr>
                              <th v-for="subPregunta in pregunta.preguntas || []" :key="subPregunta.id" class="px-5 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                                {{ subPregunta.contenido }}
                              </th>
                            </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-100">
                            <tr>
                              <td v-for="subPregunta in pregunta.preguntas || []" :key="subPregunta.id" class="px-4 py-3 bg-white">
                                <input v-model="respuestas[subPregunta.id]" type="text"
                                       class="block w-full text-base bg-gray-50 text-gray-900 rounded-lg border-gray-200 shadow-sm py-2.5 px-3 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                                       placeholder="Respuesta..."/>
                              </td>
                            </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    <div v-else class="text-sm text-red-600 bg-red-50 p-4 rounded-xl border border-red-100">
                      Tipo no soportado: <span class="font-mono">{{ pregunta.tipo_pregunta?.descripcion }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50/30 p-8">
              <h3 class="text-xl font-bold text-gray-900 mb-2">Finalizar</h3>
              <p class="text-gray-600 mb-6 leading-relaxed">¿Todo listo? Envía tus respuestas.</p>
              <button
                  type="submit"
                  :disabled="isSubmitting || isLoading"
                  class="w-full flex justify-center items-center px-6 py-4 border border-transparent text-lg font-bold rounded-xl text-white bg-[#064459] hover:bg-[#064459]/90 focus:outline-none focus:ring-4 focus:ring-[#064459]/30 shadow-lg transform transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed">
                
                <span v-if="isSubmitting">Enviando...</span>
                <span v-else class="flex items-center">
                  Enviar Formulario Ahora
                  <span class="material-symbols-outlined ml-2">send</span>
                </span>
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 8px; height: 8px; }
.custom-scrollbar::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
.font-inter { font-family: 'Inter', system-ui, -apple-system, sans-serif; }
</style>