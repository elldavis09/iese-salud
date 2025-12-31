<!-- src/components/BaseInput.vue -->
<script setup>
defineProps(['modelValue', 'type', 'placeholder', 'label', 'icon']);
defineEmits(['update:modelValue']);
</script>

<template>
  <div class="mb-4">
    <label class="block text-sm font-medium text-gray-700 mb-1">{{ label }}</label>
    <div class="relative">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
        <i :class="icon"></i>
      </div>
      <input
          :type="type"
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          :placeholder="placeholder"
          required
      >
    </div>
  </div>
</template>
