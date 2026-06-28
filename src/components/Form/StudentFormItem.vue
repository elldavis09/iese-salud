<script setup>
const props = defineProps({
  form: {
    type: Object,
    required: true
  }
});

const getStatusBadge = (status) => {
  switch (status) {
    case 0:
      return 'Pendiente';
    default:
      return 'Finalizado';
  }
}

const getColorBadge = (status) => {
  switch (status) {
    case 0:
      return "px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-bold rounded uppercase";
    default:
      return "px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded uppercase";
  }
}
</script>

<template>
  <div class="p-6 hover:bg-slate-50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
    <div class="flex gap-4">
      <!-- Icon -->
      <div class="w-12 h-12 bg-slate-100 rounded flex items-center justify-center flex-shrink-0">
        <span class="material-symbols-outlined text-slate-600">article</span>
      </div>
      <!-- Details -->
      <div>
        <h3 class="font-bold text-slate-900 line-clamp-1">{{form.nombre}}</h3>
        <p class="text-sm text-slate-500 line-clamp-2">{{form.descripcion}}</p>
        <div class="mt-2 flex items-center gap-2">
          <span :class=getColorBadge(form.intentos_count)>{{getStatusBadge(form.intentos_count)}}</span>
<!--          <span class="text-[10px] text-slate-400 font-medium uppercase">Límite: Mañana</span>-->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>