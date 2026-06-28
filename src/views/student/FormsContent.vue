<script setup>


import StudentFormItem from "@/components/Form/StudentFormItem.vue";

const props = defineProps({
  forms: {
    type: Array,
    required: true
  }
});

const emits = defineEmits(['formClicked']);

const handleFormClick = (formId) => {
  emits('formClicked', formId);
};
</script>

<template>
  <div class="p-8 bg-slate-50 min-h-screen">
    <div class="grid grid-cols-1 xl:grid-cols-12 gap-6">

      <!-- SECCIÓN IZQUIERDA: Mis Formularios -->
      <div class="xl:col-span-8 space-y-6">
        <section class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div class="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h2 class="text-lg font-bold text-[#064459] flex items-center gap-2">
              <span class="material-symbols-outlined text-[#ac111f]">assignment</span>
              Mis Formularios
            </h2>
            <div class="flex gap-2">
              <!-- Botón Filtro Activo -->
              <button
                  class="px-4 py-1.5 text-xs font-bold bg-[#064459] text-white rounded-md shadow-sm transition-colors">
                Todos
              </button>
              <!-- Botón Filtro Inactivo -->
              <button
                  class="px-4 py-1.5 text-xs font-semibold text-slate-500 hover:text-[#064459] hover:bg-slate-100 rounded-md transition-colors">
                Pendientes
              </button>
            </div>
          </div>

          <!-- Lista de Formularios -->
          <div class="divide-y divide-slate-100">
            <StudentFormItem
                v-for="form in forms"
                :key="form.id"
                :form="form"
                @click="handleFormClick(form.id)"
                class="hover:bg-slate-50 transition-colors cursor-pointer"
            />
          </div>
        </section>
      </div>

      <!-- SECCIÓN DERECHA: Widgets -->
      <div class="xl:col-span-4 space-y-6">

        <!-- Tarjeta de Logros -->
        <div
            class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden transition-all hover:shadow-md">
          <div class="p-5 border-b border-slate-100 flex items-center justify-between">
            <h2 class="font-bold text-[#064459] flex items-center gap-2">
              <span class="material-symbols-outlined text-[#ac111f] text-2xl">stars</span>
              Logros Recientes
            </h2>
          </div>
          <div class="p-5 space-y-5">
            <div class="flex items-start gap-4">
              <div class="mt-1 w-2.5 h-2.5 rounded-full bg-[#064459] shadow-[0_0_8px_rgba(6,68,89,0.5)]"></div>
              <div>
                <p class="text-sm font-bold text-slate-800">Excelencia en Matemáticas</p>
                <p class="text-xs text-slate-500 mt-0.5">Calificación 10.0 en el último examen parcial.</p>
                <p class="text-[10px] font-semibold text-slate-400 mt-1.5 uppercase tracking-wide">Ayer</p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div class="mt-1 w-2.5 h-2.5 rounded-full bg-[#ac111f] shadow-[0_0_8px_rgba(172,17,31,0.5)]"></div>
              <div>
                <p class="text-sm font-bold text-slate-800">Colaborador Destacado</p>
                <p class="text-xs text-slate-500 mt-0.5">Participación activa en foros de Programación.</p>
                <p class="text-[10px] font-semibold text-slate-400 mt-1.5 uppercase tracking-wide">Hace 3 días</p>
              </div>
            </div>
          </div>
          <div class="p-4 bg-slate-50 border-t border-slate-100 text-center">
            <button
                class="text-xs font-bold text-[#064459] hover:text-[#ac111f] transition-colors uppercase tracking-wider">
              Ver todo el historial
            </button>
          </div>
        </div>

        <!-- Tarjeta de Tip de Estudio -->
        <div class="bg-[#064459] text-white p-7 rounded-xl shadow-lg relative overflow-hidden group">
          <!-- Elemento decorativo de fondo -->
          <div
              class="absolute -right-6 -bottom-6 opacity-10 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
            <span class="material-symbols-outlined !text-9xl">lightbulb</span>
          </div>

          <h4 class="font-bold mb-3 flex items-center gap-2 text-lg">
            <span class="material-symbols-outlined text-[#ac111f]">info</span>
            Tip de Estudio
          </h4>
          <p class="text-sm text-slate-200 leading-relaxed font-light relative z-10">
            <span class="text-[#ac111f] font-serif text-2xl leading-none mr-1">"</span>
            Organiza tus sesiones de estudio con la técnica Pomodoro para mantener un rendimiento alto durante los
            exámenes parciales.
            <span class="text-[#ac111f] font-serif text-2xl leading-none ml-1">"</span>
          </p>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>

</style>