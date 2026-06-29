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

const handleInput = (event) => {
    emit('update:respuestas', { ...props.respuestas, [props.pregunta.id]: event.target.value });
};
</script>

<template>
    <input :value="respuestas[pregunta.id] || ''" @input="handleInput" type="text" :required="pregunta.es_obligatoria"
        class="block w-full text-lg bg-gray-50 text-gray-900 rounded-xl border-gray-300 shadow-sm py-3 px-4 placeholder:text-gray-400 focus:bg-white focus:border-[#064459] focus:ring-4 focus:ring-[#064459]/20 transition-all duration-200 outline-none"
        placeholder="Escriba su respuesta aquí..." />
</template>