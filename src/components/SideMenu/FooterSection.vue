<script setup>

const emit = defineEmits(['logout']);

const handleLogout = () => {
  emit('logout');
};
</script>

<template>
  <div class="p-4 border-t border-white/10">
    <button
        @click="handleLogout"
        class="flex items-center gap-3 px-4 py-3 w-full text-slate-300 hover:text-white hover:bg-[#ac111f]/80 rounded-md transition-all">
      <span class="material-symbols-outlined">logout</span>
      <span class="font-medium">Cerrar Sesión</span>
    </button>
  </div>
</template>

<style scoped>

</style>