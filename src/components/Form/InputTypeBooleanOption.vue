<script setup>
defineProps({
    label: {
        type: String,
        required: true
    },
    value: {
        type: Boolean,
        required: true
    },
    selected: {
        type: Boolean,
        default: undefined
    },
    name: {
        type: String,
        required: true
    },
    required: {
        type: Boolean,
        default: false
    }
});

defineEmits(['select']);
</script>

<template>
    <label class="relative min-w-[120px] max-w-[200px] flex-1 cursor-pointer group">
        <input :name="name" type="radio" :value="value" :checked="selected === value" :required="required"
            class="peer sr-only" @change="$emit('select', value)">

        <div class="flex items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-600 transition-colors duration-200 
             group-hover:border-gray-300 group-hover:bg-gray-50 
             peer-checked:border-gray-800 peer-checked:bg-gray-50/50 peer-checked:text-gray-900">
            {{ label }}
        </div>
    </label>
</template>