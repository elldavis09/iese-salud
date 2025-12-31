<script setup>
// 1. Definimos la prop 'modelValue' (estándar de Vue para v-model)
defineProps({
  modelValue: {
    type: String,
    required: true,
    default: 'student' // valor por defecto
  }
});

// 2. Definimos el emit estándar
const emit = defineEmits(['update:modelValue']);

// 3. Función que se ejecuta al hacer clic
const selectRole = (role) => {
  emit('update:modelValue', role); // Avisa al padre que el valor cambió
};
</script>

<template>
  <div class="w-full mb-6">
    <label class="block text-sm font-bold text-gray-700 mb-2 ml-1">
      ¿Cómo deseas registrarte?
    </label>

    <div class="relative bg-slate-100 p-1.5 rounded-xl flex items-center shadow-inner h-12">

      <div
          class="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white rounded-lg shadow-sm transition-all duration-300 ease-out z-0"
          :class="modelValue === 'student' ? 'left-1.5 translate-x-0' : 'left-1.5 translate-x-full'"
      ></div>

      <button
          type="button"
          @click="selectRole('student')"
          class="relative z-10 flex-1 flex items-center justify-center gap-2 h-full text-sm font-bold transition-colors duration-300 rounded-lg focus:outline-none"
          :class="modelValue === 'student' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-600'"
      >
        <i class="ph ph-student text-lg"></i>
        Estudiante
      </button>

      <button
          type="button"
          @click="selectRole('tutor')"
          class="relative z-10 flex-1 flex items-center justify-center gap-2 h-full text-sm font-bold transition-colors duration-300 rounded-lg focus:outline-none"
          :class="modelValue === 'tutor' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-600'"
      >
        <i class="ph ph-chalkboard-teacher text-lg"></i>
        Tutor
      </button>

    </div>
  </div>
</template>