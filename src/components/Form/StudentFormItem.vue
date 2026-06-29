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
  <article
    class="h-full rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
    <div class="column items-start gap-4">
      <div class="flex items-center gap-3 w-full justify-between">
        <div class="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
          <span class="material-symbols-outlined text-slate-600">article</span>
        </div>

        <span :class="getColorBadge(form.intentos_count)">
          {{ getStatusBadge(form.intentos_count) }}
        </span>
      </div>
      <div class="min-w-0 flex-1">
        <div class="flex items-start justify-between gap-3">
          <h3 class="font-bold text-slate-900 line-clamp-2">
            {{ form.nombre }}
          </h3>
        </div>

        <p class="mt-2 text-sm text-slate-500 line-clamp-3">
          {{ form.descripcion }}
        </p>
      </div>
      <!-- Botones de acción -->
      <div class="flex items-center gap-2">
        <button
          class="px-4 py-1.5 text-xs font-bold bg-[#064459] text-white rounded-md shadow-sm transition-colors hover:bg-[#064459]/90"
          @click="$emit('click')">
          Ver Formulario
        </button>
      </div>
    </div>
  </article>
</template>

<style scoped></style>