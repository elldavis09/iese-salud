<script setup>
const props = defineProps({
    seccion: {
        type: Object,
        required: true
    },
    index: {
        type: Number,
        required: true
    }
});
</script>
<template>
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
</template>