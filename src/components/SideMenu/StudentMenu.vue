<script setup>
const emit = defineEmits(['logout']);

const handleLogout = () => {
  emit('logout');
};
</script>

<template>
  <aside class="fixed left-0 top-0 h-full w-[var(--sidebar-width,16rem)] bg-[#064459] text-white hidden lg:flex flex-col z-50 shadow-xl">
    <div class="p-6 border-b border-white/10">
      <div class="flex items-center gap-3">
        <!-- Ícono con el color de acento rojo institucional -->
        <div class="bg-[#ac111f] p-2 rounded-lg shadow-md">
          <span class="material-symbols-outlined text-white">school</span>
        </div>
        <span class="font-bold text-xl tracking-tight">IESE</span>
      </div>
    </div>
    <nav class="flex-1 px-3 py-6 space-y-2">
      <!-- Ítem Activo con borde rojo -->
      <a class="flex items-center gap-3 px-4 py-3 rounded-r-md bg-white/10 border-l-4 border-[#ac111f] text-white transition-all" href="#">
        <span class="material-symbols-outlined">dashboard</span>
        <span class="font-medium">Dashboard</span>
      </a>
      <!-- Ítems inactivos -->
      <a class="flex items-center gap-3 px-4 py-3 rounded-md text-slate-300 hover:bg-white/10 hover:text-white transition-all" href="#">
        <span class="material-symbols-outlined">assignment</span>
        <span class="font-medium">Mis Formularios</span>
      </a>
      <a class="flex items-center gap-3 px-4 py-3 rounded-md text-slate-300 hover:bg-white/10 hover:text-white transition-all" href="#">
        <span class="material-symbols-outlined">analytics</span>
        <span class="font-medium">Calificaciones</span>
      </a>
      <a class="flex items-center gap-3 px-4 py-3 rounded-md text-slate-300 hover:bg-white/10 hover:text-white transition-all" href="#">
        <span class="material-symbols-outlined">calendar_today</span>
        <span class="font-medium">Horario</span>
      </a>

      <div class="pt-6 pb-2 px-4">
        <p class="text-[10px] font-bold text-slate-400/80 uppercase tracking-widest">Cuenta</p>
      </div>

      <a class="flex items-center gap-3 px-4 py-3 rounded-md text-slate-300 hover:bg-white/10 hover:text-white transition-all" href="#">
        <span class="material-symbols-outlined">person</span>
        <span class="font-medium">Mi Perfil</span>
      </a>
      <a class="flex items-center gap-3 px-4 py-3 rounded-md text-slate-300 hover:bg-white/10 hover:text-white transition-all" href="#">
        <span class="material-symbols-outlined">settings</span>
        <span class="font-medium">Configuración</span>
      </a>
    </nav>
    <div class="p-4 border-t border-white/10">
      <button
          @click="handleLogout"
          class="flex items-center gap-3 px-4 py-3 w-full text-slate-300 hover:text-white hover:bg-[#ac111f]/80 rounded-md transition-all">
        <span class="material-symbols-outlined">logout</span>
        <span class="font-medium">Cerrar Sesión</span>
      </button>
    </div>
  </aside>
</template>

<style scoped>
</style>