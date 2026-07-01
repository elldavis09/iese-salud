<script setup>
defineProps({
    opcion: {
        type: Object,
        required: true
    },
    selected: {
        type: [Number, String],
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
    <label class="relative flex cursor-pointer group">
        <input :name="name" type="radio" :value="opcion.id" :checked="selected === opcion.id" :required="required"
            class="peer sr-only" @change="$emit('select', opcion.id)">

        <div class="flex w-full items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 transition-colors duration-200
                group-hover:bg-gray-50 
                peer-checked:border-gray-800 peer-checked:bg-gray-50/50">

            <span class="select-none text-sm font-medium text-gray-700 peer-checked:text-gray-900">
                {{ opcion.texto_opcion }}
            </span>
        </div>
    </label>
</template>