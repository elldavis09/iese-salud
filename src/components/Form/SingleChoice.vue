<script setup lang="js">
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

const handleChange = (value) => {
    emit('update:respuestas', {
        ...props.respuestas,
        [props.pregunta.id]: value
    });
};
</script>

<template>
    <div class="flex flex-col gap-3">
        <template v-for="opcion in pregunta.escala?.opciones || []" :key="opcion.id">
            <label class="relative cursor-pointer group">
                <input type="radio" :name="`pregunta-${pregunta.id}`" :checked="respuestas[pregunta.id] === opcion.id"
                    :required="pregunta.es_obligatoria && respuestas[pregunta.id] === undefined" class="peer sr-only"
                    @change="handleChange(opcion.id)">
                <div
                    class="w-full p-4 rounded-xl border-2 border-gray-200 bg-white flex items-center transition-all shadow-sm group-hover:border-[#064459]/50 peer-checked:border-[#064459] peer-checked:bg-[#064459]/5">
                    <div
                        class="flex-shrink-0 w-6 h-6 rounded-full border-2 border-gray-300 mr-4 flex items-center justify-center transition-colors peer-checked:border-[#064459] peer-checked:bg-[#064459]">
                        <div
                            class="w-2.5 h-2.5 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity">
                        </div>
                    </div>
                    <span class="text-lg font-medium text-gray-700 peer-checked:text-[#064459]">
                        {{ opcion.texto_opcion }}
                    </span>
                </div>
            </label>
        </template>
    </div>
</template>