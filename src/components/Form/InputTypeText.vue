<script setup>
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

const handleInputChange = (event) => {
    emit('update:respuestas', { ...props.respuestas, [props.pregunta.id]: event.target.value });
};
</script>

<template>
    <input :value="respuestas[pregunta.id] ?? ''" @input="handleInputChange" type="text" :required="pregunta.es_obligatoria"
        class="block w-full rounded-2xl border border-gray-200 bg-[#fbfbfa] px-4 py-3 text-base text-gray-900 shadow-sm outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-[#064459]/30 focus:bg-white focus:ring-4 focus:ring-[#064459]/10"
        placeholder="Escriba su respuesta aquí..." />
</template>