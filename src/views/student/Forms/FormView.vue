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
import HeaderForm from "@/components/Form/HeaderForm.vue";
import SingleChoice from "@/components/Form/SingleChoice.vue";

const route = useRoute();
const attemptsStore = useAttemptsStore();
const notification = useNotificationStore();
const formStore = useFormsStore();

// Usamos un ref para controlar el estado de envío localmente y evitar dobles clics
const isSubmitting = ref(false);
const respuestas = ref({
  // 1:"Hola"
});

const {
  attempts, attemptsMessage, attemptsError, attemptsIsLoading
} = storeToRefs(attemptsStore);

const {
  formSelected, message, error, isLoading
} = storeToRefs(formStore);

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
    const responses = await attemptsStore.getAttemptResponses(attemptId);

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

<!-- Mensaje para mi mismo, no se porque cuando tratas de centrarlo deja de funcionar jajaja -->
<!-- POSDATA: ASI DEJALO -->
<!-- UPDATE: Si pones algo antes del contenido, deja de funcionar, lol -->
<template>
  <div class="min-h-screen bg-[#f7f7f5] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
    <main class="mx-auto w-full max-w-4xl">
      <form @submit.prevent="submitForm" id="main-form">
        <div
          class="overflow-hidden rounded-[28px] border border-gray-200/70 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)]">

          <!-- Header del formulario -->
          <div class="border-b border-gray-100 bg-white px-6 py-6 sm:px-8 sm:py-7">
            <div class="flex flex-col gap-3">
              <div>
                <h2 class="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900">
                  {{ formSelected?.nombre }}
                </h2>
                <p v-if="formSelected?.descripcion"
                  class="mt-2 max-w-3xl text-base sm:text-lg leading-relaxed text-gray-600">
                  <span v-html="formSelected?.descripcion.replace(/\n/g, '<br>')"></span>
                </p>
              </div>
            </div>
          </div>

          <!-- Seccion para cargar respuestas previas -->
          <div  v-if="attempts.length > 0" class="border-b border-gray-100 bg-[#fbfbfa] px-6 py-6 sm:px-8">
            <div v-for="attempt in attempts" :key="attempt.id"
              class="mb-3 flex flex-wrap items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 last:mb-0">
              <span class="text-sm font-semibold text-gray-700">Intento ID: {{ attempt.id }}</span>
              <button @click="getAttemptResponses(attempt.id)"
                class="rounded-full border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:border-[#064459]/20 hover:bg-[#064459]/5 hover:text-[#064459]">
                Cargar Respuestas
              </button>
              <button @click="deleteFormAttempt(attempt.id)"
                class="rounded-full border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700">
                Eliminar Intento
              </button>
              <button @click="getInterpretation(formSelected?.id, attempt.id)"
                class="rounded-full border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700">
                Ver Interpretación
              </button>
            </div>
          </div>

          <div class="divide-y divide-gray-100">
            <div v-for="(seccion, index) in formSelected?.secciones || []" :key="seccion.id"
              class="px-6 py-8 sm:px-8 md:px-10 md:py-10">


              <div class="mb-8 flex items-start gap-4">
                <div
                  class="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#064459] text-sm font-semibold text-white shadow-sm mt-0.5">
                  {{ index + 1 }}
                </div>
                <div>
                  <h3 class="text-2xl font-semibold text-gray-900 tracking-tight">
                    {{ seccion.titulo }}
                  </h3>
                  <p v-if="seccion.descripcion" class="mt-2 text-base leading-relaxed text-gray-500">
                    {{ seccion.descripcion }}
                  </p>
                </div>
              </div>

              <div class="space-y-8 md:ml-12">
                <div v-for="pregunta in seccion.preguntas || []" :key="pregunta.id" class="relative">

                  <label class="mb-3 block cursor-pointer text-base font-semibold text-gray-800">
                    {{ pregunta.contenido }}
                    <span v-if="pregunta.es_obligatoria" class="text-red-500 text-lg ml-1 align-middle"
                      title="Campo obligatorio">*</span>
                  </label>

                  <!-- Tipo TEXTO_LIBRE -->
                  <div v-if="pregunta.tipo_pregunta?.descripcion === 'TEXTO_LIBRE'">
                    <input v-model="respuestas[pregunta.id]" type="text" :required="pregunta.es_obligatoria"
                      class="block w-full rounded-2xl border border-gray-200 bg-[#fbfbfa] px-4 py-3 text-base text-gray-900 shadow-sm outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-[#064459]/30 focus:bg-white focus:ring-4 focus:ring-[#064459]/10"
                      placeholder="Escriba su respuesta aquí..." />
                  </div>

                  <!-- Tipo OPCIONES -->
                  <div v-else-if="pregunta.tipo_pregunta?.descripcion === 'OPCIONES'">
                    <select v-model.number="respuestas[pregunta.id]" :required="pregunta.es_obligatoria"
                      class="block w-full appearance-none rounded-2xl border border-gray-200 bg-[#fbfbfa] px-4 py-3 text-base text-gray-900 shadow-sm outline-none transition-all duration-200 focus:border-[#064459]/30 focus:bg-white focus:ring-4 focus:ring-[#064459]/10">
                      <option disabled value="">Seleccione una opción...</option>
                      <option v-for="opcion in pregunta.opciones || []" :key="opcion.id" :value="opcion.id"
                        class="py-2">
                        {{ opcion.texto_opcion }}
                      </option>
                    </select>
                  </div>

                  <!-- Tipo SI_NO -->
                  <div v-else-if="pregunta.tipo_pregunta?.descripcion === 'SI_NO'">
                    <div class="flex flex-wrap gap-3">
                      <label class="relative min-w-[120px] max-w-[200px] flex-1 cursor-pointer group">
                        <input type="radio" v-model="respuestas[pregunta.id]" :value="true"
                          :required="pregunta.es_obligatoria && respuestas[pregunta.id] === undefined"
                          class="peer sr-only">
                        <div
                          class="flex items-center justify-center rounded-2xl border border-gray-200 bg-[#fbfbfa] p-4 text-base font-medium text-gray-600 transition-all hover:border-[#064459]/20 hover:bg-[#064459]/5 peer-checked:border-[#064459] peer-checked:bg-[#064459]/5 peer-checked:text-[#064459]">
                          Sí
                        </div>
                      </label>

                      <label class="relative min-w-[120px] max-w-[200px] flex-1 cursor-pointer group">
                        <input type="radio" v-model="respuestas[pregunta.id]" :value="false"
                          :required="pregunta.es_obligatoria && respuestas[pregunta.id] === undefined"
                          class="peer sr-only">
                        <div
                          class="flex items-center justify-center rounded-2xl border border-gray-200 bg-[#fbfbfa] p-4 text-base font-medium text-gray-600 transition-all hover:border-[#064459]/20 hover:bg-[#064459]/5 peer-checked:border-[#064459] peer-checked:bg-[#064459]/5 peer-checked:text-[#064459]">
                          No
                        </div>
                      </label>
                    </div>
                  </div>

                  <!-- Escala -->
                  <div v-else-if="pregunta.tipo_pregunta?.descripcion === 'ESCALA'">
                    <SingleChoice :pregunta="pregunta" :respuestas="respuestas"
                      @update:respuestas="respuestas = $event" />
                  </div>

                  <!-- Etiqueta -->
                  <div v-else-if="pregunta.tipo_pregunta?.descripcion === 'ETIQUETA'">
                    <div
                      class="flex items-start gap-3 rounded-2xl border border-[#064459]/10 bg-[#064459]/5 p-4 text-base text-gray-700">
                      <span class="material-symbols-outlined flex-shrink-0 text-indigo-500">info</span>
                      {{ pregunta.descripcion }}
                    </div>
                  </div>

                  <!-- Tabla Dinámica -->
                  <div v-else-if="pregunta.tipo_pregunta?.descripcion === 'TABLA_DINAMICA'">
                    <div class="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
                      <div class="overflow-x-auto custom-scrollbar">
                        <table class="min-w-full divide-y divide-gray-200">
                          <thead class="bg-[#fbfbfa]">
                            <tr>
                              <th v-for="subPregunta in pregunta.preguntas || []" :key="subPregunta.id"
                                class="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.12em] text-gray-500">
                                {{ subPregunta.contenido }}
                              </th>
                            </tr>
                          </thead>
                          <tbody class="bg-white divide-y divide-gray-100">
                            <tr>
                              <td v-for="subPregunta in pregunta.preguntas || []" :key="subPregunta.id"
                                class="px-4 py-3 bg-white">
                                <input v-model="respuestas[subPregunta.id]" type="text"
                                  class="block w-full rounded-xl border border-gray-200 bg-[#fbfbfa] px-3 py-2.5 text-base text-gray-900 shadow-sm outline-none transition-all focus:border-[#064459]/30 focus:bg-white focus:ring-4 focus:ring-[#064459]/10"
                                  placeholder="Respuesta..." />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <!-- Tipo no soportado -->
                  <div v-else class="text-sm text-red-600 bg-red-50 p-4 rounded-xl border border-red-100">
                    Tipo no soportado: <span class="font-mono">{{ pregunta.tipo_pregunta?.descripcion }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Finalizar -->
          <div class="border-t border-gray-100 bg-[#fbfbfa] p-8">
            <h3 class="mb-2 text-xl font-semibold text-gray-900">Finalizar</h3>
            <p class="mb-6 leading-relaxed text-gray-600">¿Todo listo? Envía tus respuestas.</p>
            <button type="submit" :disabled="isSubmitting || isLoading"
              class="flex w-full items-center justify-center rounded-2xl border border-transparent bg-[#064459] px-6 py-4 text-lg font-semibold text-white shadow-lg shadow-[#064459]/20 transition-all active:scale-[0.98] hover:bg-[#07384b] focus:outline-none focus:ring-4 focus:ring-[#064459]/20 disabled:cursor-not-allowed disabled:opacity-50">

              <span v-if="isSubmitting">Enviando...</span>
              <span v-else class="flex items-center">
                Enviar Respuestas
              </span>
            </button>
          </div>
        </div>
      </form>
    </main>
  </div>
</template>

<style scoped></style>