<script setup>
import { computed } from 'vue';

const props = defineProps({
  pregunta: { type: Object, required: true },
  respuesta: { required: true } // El valor guardado
});

// Helper para encontrar el texto de una opción seleccionada (Select o Radio)
const textoRespuesta = computed(() => {
  if (!props.respuesta) return 'Sin respuesta';

  if (props.pregunta.tipo_pregunta.descripcion === 'OPCIONES') {
    const opt = props.pregunta.opciones.find(o => o.id === props.respuesta);
    return opt ? opt.texto_opcion : 'Opción no encontrada';
  }
  return props.respuesta;
});
</script>

<template>
  <div class="py-2">
    <h4 class="text-base font-bold text-gray-800 mb-2">
      {{ pregunta.contenido }}
    </h4>

    <div v-if="pregunta.tipo_pregunta.descripcion === 'TEXTO_LIBRE'"
         class="bg-slate-50 p-3 rounded-lg border border-gray-200 text-gray-700 font-medium text-lg min-h-[50px]">
      {{ respuesta || 'El estudiante no respondió.' }}
    </div>

    <div v-else-if="pregunta.tipo_pregunta.descripcion === 'OPCIONES'"
         class="flex items-center gap-2">
      <span class="px-4 py-2 rounded-lg bg-indigo-50 text-indigo-700 font-bold border border-indigo-100 flex items-center gap-2">
        <i class="ph ph-check-circle-fill"></i>
        {{ textoRespuesta }}
      </span>
    </div>

    <div v-else-if="pregunta.tipo_pregunta.descripcion === 'SI_NO'" class="flex gap-4 opacity-100">
      <div class="flex-1 max-w-[150px] p-3 rounded-xl border flex items-center justify-center gap-2 font-bold transition-colors"
           :class="respuesta === true
             ? 'bg-blue-50 border-blue-500 text-blue-700'
             : 'bg-gray-50 border-gray-200 text-gray-400 opacity-50'">
        <i v-if="respuesta === true" class="ph ph-check-bold"></i>
        Sí
      </div>
      <div class="flex-1 max-w-[150px] p-3 rounded-xl border flex items-center justify-center gap-2 font-bold transition-colors"
           :class="respuesta === false
             ? 'bg-red-50 border-red-500 text-red-700'
             : 'bg-gray-50 border-gray-200 text-gray-400 opacity-50'">
        <i v-if="respuesta === false" class="ph ph-x-bold"></i>
        No
      </div>
    </div>

    <div v-else-if="pregunta.tipo_pregunta.descripcion === 'ESCALA'" class="space-y-2">
      <div v-for="opcion in pregunta.escala?.opciones || []" :key="opcion.id"
           class="flex items-center p-3 rounded-lg border transition-all"
           :class="respuesta === opcion.id
             ? 'bg-blue-50 border-blue-500 z-10 shadow-sm'
             : 'bg-white border-gray-100 opacity-60'">

        <div class="w-5 h-5 rounded-full border flex items-center justify-center mr-3"
             :class="respuesta === opcion.id ? 'border-blue-600 bg-blue-600' : 'border-gray-300'">
          <div v-if="respuesta === opcion.id" class="w-2 h-2 bg-white rounded-full"></div>
        </div>
        <span class="text-sm font-medium"
              :class="respuesta === opcion.id ? 'text-blue-900 font-bold' : 'text-gray-500'">
          {{ opcion.texto_opcion }}
        </span>
      </div>
    </div>

    <div v-else-if="pregunta.tipo_pregunta.descripcion === 'TABLA_DINAMICA'" class="overflow-hidden border border-gray-200 rounded-xl">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
        <tr>
          <th v-for="sub in pregunta.preguntas" :key="sub.id" class="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">
            {{ sub.contenido }}
          </th>
        </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-100">
        <tr v-if="!respuesta || respuesta.length === 0">
          <td :colspan="pregunta.preguntas.length" class="px-4 py-3 text-sm text-gray-400 italic text-center">
            Sin datos registrados
          </td>
        </tr>
        <tr v-else v-for="(fila, idx) in respuesta" :key="idx">
          <td v-for="sub in pregunta.preguntas" :key="sub.id" class="px-4 py-3 text-sm text-gray-700">
            {{ fila[sub.id] }}
          </td>
        </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>