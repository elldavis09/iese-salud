<script setup>
const emit = defineEmits(['logout']);

const handleLogout = () => {
  emit('logout');
};
</script>

<template>
  <div class="p-4 mb-4 mt-auto">
    <button
        @click="handleLogout"
        class="flex items-center gap-4 px-4 py-3 w-full text-sidebar-text hover:text-white hover:bg-sidebar-hover/50 rounded-xl transition-all duration-200 outline-none">
      <span class="material-symbols-outlined text-[22px]">logout</span>
      <span class="font-medium text-sm tracking-wide">Cerrar Sesión</span>
    </button>
  </div>
</template>