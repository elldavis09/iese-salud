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
})

const emit = defineEmits(['update:respuestas'])

const updateRespuestas = (value) => {
    emit('update:respuestas', value)
}
</script>

<template>
    <div class="flex flex-wrap gap-4">
        <label class="relative flex-1 min-w-[120px] max-w-[200px] cursor-pointer group">
            <input type="radio" @input="updateRespuestas(true)" :value="true"
                :required="pregunta.es_obligatoria && respuestas[pregunta.id] === undefined" class="peer sr-only">
            <div
                class="flex items-center justify-center p-4 rounded-xl border-2 border-gray-200 bg-gray-50 text-lg font-medium text-gray-600 hover:bg-gray-100 peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:text-green-700 transition-all">
                Sí
            </div>
        </label>

        <label class="relative flex-1 min-w-[120px] max-w-[200px] cursor-pointer group">
            <input type="radio" @input="updateRespuestas(false)" :value="false"
                :required="pregunta.es_obligatoria && respuestas[pregunta.id] === undefined" class="peer sr-only">
            <div
                class="flex items-center justify-center p-4 rounded-xl border-2 border-gray-200 bg-gray-50 text-lg font-medium text-gray-600 hover:bg-gray-100 peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:text-red-700 transition-all">
                No
            </div>
        </label>
    </div>
</template>