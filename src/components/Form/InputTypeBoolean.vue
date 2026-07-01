<script setup>
import { computed } from 'vue';
import InputTypeBooleanOption from './InputTypeBooleanOption.vue';

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

const handleSelect = (value) => {
    respuesta.value = value;
};
</script>

<template>
    <div class="flex flex-wrap gap-3">
        <InputTypeBooleanOption
            v-for="opcion in opciones"
            :key="opcion.label"
            :label="opcion.label"
            :value="opcion.value"
            :selected="respuesta"
            :name="`boolean-${props.pregunta.id}`"
            :required="props.pregunta.es_obligatoria && respuesta === undefined"
            @select="handleSelect"
        />
    </div>
</template>