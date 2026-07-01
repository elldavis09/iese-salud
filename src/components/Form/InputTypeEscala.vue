<script setup>
import { computed } from 'vue';
import InputTypeEscalaOption from './InputTypeEscalaOption.vue';

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

const opciones = computed(() => props.pregunta.escala?.opciones ?? []);

const respuesta = computed({
    get: () => props.respuestas[props.pregunta.id],
    set: (value) => {
        emit('update:respuestas', {
            ...props.respuestas,
            [props.pregunta.id]: value
        });
    }
});

const handleSelect = (value) => {
    respuesta.value = value;
};
</script>

<template>
    <div class="flex flex-col gap-3">
        <InputTypeEscalaOption
            v-for="opcion in opciones"
            :key="opcion.id"
            :opcion="opcion"
            :name="`escala-${props.pregunta.id}`"
            :selected="respuesta"
            :required="props.pregunta.es_obligatoria && respuesta === undefined"
            @select="handleSelect"
        />
    </div>
</template>