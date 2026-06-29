<script setup>
import { defineProps } from "vue";

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: false,

    }
});
</script>
<template>
    <div class="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50/30 p-8">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h2 class="text-3xl font-extrabold text-gray-900 tracking-tight">
                    {{ title }}
                </h2>
                <p v-if="description" class="text-gray-600 mt-2 text-lg leading-relaxed">
                    <span v-html="description.replace(/\n/g, '<br>')"></span>
                </p>
            </div>
        </div>
    </div>
</template>
