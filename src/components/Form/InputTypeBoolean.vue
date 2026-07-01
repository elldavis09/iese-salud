<script setup>
import { computed } from 'vue';

const props = defineProps({
    pregunta: {
        type: Object,
        required: true
    },
    respuestas: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['update:respuestas']);

const respuesta = computed({
    get: () => props.respuestas[props.pregunta.id],
    set: (value) => {
        emit('update:respuestas', {
            ...props.respuestas,
            [props.pregunta.id]: value
        });
    }
});

const opciones = [
    { label: 'Sí', value: true },
    { label: 'No', value: false }
];
</script>

<template>
    <div class="flex flex-wrap gap-3">
        <label v-for="opcion in opciones" :key="opcion.label"
            class="relative min-w-[120px] max-w-[200px] flex-1 cursor-pointer group">
            <input v-model="respuesta" type="radio" :value="opcion.value"
                :required="pregunta.es_obligatoria && respuesta === undefined" class="peer sr-only">
            <div
                class="flex items-center justify-center rounded-2xl border border-gray-200 bg-[#fbfbfa] p-4 text-base font-medium text-gray-600 transition-all hover:border-[#064459]/20 hover:bg-[#064459]/5 peer-checked:border-[#064459] peer-checked:bg-[#064459]/5 peer-checked:text-[#064459]">
                {{ opcion.label }}
            </div>
        </label>
    </div>
</template>