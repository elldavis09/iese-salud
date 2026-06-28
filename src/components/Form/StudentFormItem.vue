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
    class="group flex flex-col h-full p-5 transition-all duration-300 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:border-slate-300 hover:-translate-y-1"
  >
    <!-- Encabezado: Icono y Estado -->
    <header class="flex items-start justify-between w-full gap-3 mb-4">
      <div class="flex items-center justify-center flex-shrink-0 w-12 h-12 transition-colors duration-300 rounded-xl bg-slate-100 group-hover:bg-[#064459]/10">
        <span class="transition-colors duration-300 material-symbols-outlined text-slate-600 group-hover:text-[#064459]">
          article
        </span>
      </div>

      <!-- Asegúrate de que tu método getColorBadge devuelva padding, text-size y bordes redondeados (ej. px-3 py-1 text-xs font-medium rounded-full) -->
      <span :class="getColorBadge(form.intentos_count)">
        {{ getStatusBadge(form.intentos_count) }}
      </span>
    </header>

    <!-- Contenido principal -->
    <div class="flex flex-col flex-1 min-w-0">
      <h3 class="text-base font-bold leading-tight text-slate-900 line-clamp-2">
        {{ form.nombre }}
      </h3>

      <p class="mt-2 text-sm text-slate-500 line-clamp-3">
        {{ form.descripcion }}
      </p>
    </div>

    <!-- Pie: Botones de acción -->
    <footer class="flex items-center mt-5">
      <button
        class="px-5 py-2 text-sm font-semibold text-white transition-colors duration-200 bg-[#064459] rounded-lg shadow-sm hover:bg-[#064459]/90 focus:outline-none focus:ring-2 focus:ring-[#064459] focus:ring-offset-2"
        @click="$emit('click')"
      >
        Ver Formulario
      </button>
    </footer>
  </article>
</template>

<style scoped></style>