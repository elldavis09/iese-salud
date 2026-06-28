<script setup>
const emit = defineEmits(['logout']);

const handleLogout = () => {
  emit('logout');
};
</script>

<template>
  <div class="p-4 border-t border-white/5">
    <button
        @click="handleLogout"
        class="group flex items-center justify-center gap-3 px-4 py-3 w-full text-slate-400 hover:text-white hover:bg-red-500/10 hover:border-red-500/30 border border-transparent rounded-xl transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-red-500">
      <span class="material-symbols-outlined group-hover:text-red-400 transition-colors">logout</span>
      <span class="font-semibold text-sm tracking-wide">Cerrar Sesión</span>
    </button>
  </div>
</template>