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
    <label class="relative cursor-pointer group">
        <input
            :name="name"
            type="radio"
            :value="opcion.id"
            :checked="selected === opcion.id"
            :required="required"
            class="peer sr-only"
            @change="$emit('select', opcion.id)"
        >

        <div class="w-full rounded-xl border-2 border-gray-200 bg-white p-4 shadow-sm transition-all
            flex items-center
            group-hover:border-blue-300 group-hover:bg-blue-50/50
            peer-checked:border-blue-600 peer-checked:bg-blue-50 peer-checked:shadow-md
            peer-focus:ring-4 peer-focus:ring-blue-100">

            <div class="mr-4 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300 transition-colors
                group-hover:border-blue-400
                peer-checked:border-blue-600 peer-checked:bg-blue-600">
                <div class="h-2.5 w-2.5 rounded-full bg-white opacity-0 transition-opacity peer-checked:opacity-100"></div>
            </div>

            <span class="select-none text-lg font-medium leading-snug text-gray-700 peer-checked:text-blue-900">
                {{ opcion.texto_opcion }}
            </span>
        </div>

        <div class="pointer-events-none absolute inset-0 rounded-xl border-2 border-transparent peer-checked:border-blue-600"></div>
    </label>
</template>