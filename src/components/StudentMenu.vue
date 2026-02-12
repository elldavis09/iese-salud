<script setup>

</script>

<template>
  <aside class="fixed left-0 top-0 h-full w-[var(--sidebar-width)] bg-navy text-white hidden lg:flex flex-col z-50">
    <div class="p-6 border-b border-white/10">
      <div class="flex items-center gap-3">
        <div class="bg-primary-accent p-2 rounded-lg">
          <span class="material-symbols-outlined text-white">school</span>
        </div>
        <span class="font-bold text-xl tracking-tight">EduPortal</span>
      </div>
    </div>
    <nav class="flex-1 px-3 py-6 space-y-1">
      <a class="flex items-center gap-3 px-4 py-3 rounded-md sidebar-active transition-all" href="#">
        <span class="material-symbols-outlined">dashboard</span>
        <span class="font-medium">Dashboard</span>
      </a>
      <a class="flex items-center gap-3 px-4 py-3 rounded-md text-slate-400 hover:bg-white/5 hover:text-white transition-all" href="#">
        <span class="material-symbols-outlined">assignment</span>
        <span class="font-medium">Mis Formularios</span>
      </a>
      <a class="flex items-center gap-3 px-4 py-3 rounded-md text-slate-400 hover:bg-white/5 hover:text-white transition-all" href="#">
        <span class="material-symbols-outlined">analytics</span>
        <span class="font-medium">Calificaciones</span>
      </a>
      <a class="flex items-center gap-3 px-4 py-3 rounded-md text-slate-400 hover:bg-white/5 hover:text-white transition-all" href="#">
        <span class="material-symbols-outlined">calendar_today</span>
        <span class="font-medium">Horario</span>
      </a>
      <div class="pt-4 pb-2 px-4">
        <p class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Cuenta</p>
      </div>
      <a class="flex items-center gap-3 px-4 py-3 rounded-md text-slate-400 hover:bg-white/5 hover:text-white transition-all" href="#">
        <span class="material-symbols-outlined">person</span>
        <span class="font-medium">Mi Perfil</span>
      </a>
      <a class="flex items-center gap-3 px-4 py-3 rounded-md text-slate-400 hover:bg-white/5 hover:text-white transition-all" href="#">
        <span class="material-symbols-outlined">settings</span>
        <span class="font-medium">Configuración</span>
      </a>
    </nav>
    <div class="p-4 border-t border-white/10">
      <button class="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:text-white transition-all">
        <span class="material-symbols-outlined">logout</span>
        <span class="font-medium">Cerrar Sesión</span>
      </button>
    </div>
  </aside>
</template>

<style scoped>

</style>