<script setup>
import { computed } from 'vue';

const props = defineProps({
  form: {
    type: Object,
    required: true
  }
});

// Extrae las primeras dos letras del nombre para el ícono de la tarjeta
const initials = computed(() => {
  const name = props.form?.nombre || 'Fx';
  return name.substring(0, 2).toUpperCase();
});

// Paleta de colores suaves (estilo pastel) basada en la imagen de referencia
const themes = [
  { bg: 'bg-[#F7F7FD]', iconBg: 'bg-[#DFDAFE]', iconText: 'text-[#4833B0]', border: 'border-[#EAE7F9]' }, // Morado
  { bg: 'bg-[#F2FCF7]', iconBg: 'bg-[#D2F6E3]', iconText: 'text-[#12663A]', border: 'border-[#E3F2E9]' }, // Verde
  { bg: 'bg-[#F2F7FD]', iconBg: 'bg-[#D6E6FB]', iconText: 'text-[#1A5499]', border: 'border-[#E4ECF6]' }, // Azul
  { bg: 'bg-[#FDF2F7]', iconBg: 'bg-[#FCE0ED]', iconText: 'text-[#9A1958]', border: 'border-[#F8E5EE]' }, // Rosa
  { bg: 'bg-[#FEF7F1]', iconBg: 'bg-[#FCE6D0]', iconText: 'text-[#954408]', border: 'border-[#F6ECE2]' }, // Naranja
];

// Asigna un color consistente basado en la longitud del nombre del formulario
const activeTheme = computed(() => {
  const index = (props.form?.nombre || '').length % themes.length;
  return themes[index];
});

// Texto del estado
const getStatusText = (status) => {
  return status === 0 ? 'Pendiente' : 'Finalizado';
}

// Estilos de la píldora inferior (Badge) adaptados a la estética limpia
const getBadgeStyle = (status) => {
  if (status === 0) {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }
  return "border-emerald-200 bg-emerald-50 text-emerald-700";
}
</script>

<template>
  <article
    class="flex flex-col h-full rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
  >
    <div 
      class="px-5 py-4 flex items-start gap-4 border-b" 
      :class="[activeTheme.bg, activeTheme.border]"
    >
      <div 
        class="w-[42px] h-[42px] rounded-xl flex items-center justify-center font-bold text-[14px] flex-shrink-0"
        :class="[activeTheme.iconBg, activeTheme.iconText]"
      >
        {{ initials }}
      </div>

      <div class="flex-1 min-w-0 flex flex-col justify-center pt-0.5">
        <h3 class="font-bold text-slate-800 text-[15px] leading-tight truncate">
          {{ form.nombre }}
        </h3>
        <p class="text-[12px] text-slate-500 mt-1 font-medium truncate" :class="activeTheme.iconText">
          Formularios • Área
        </p>
      </div>
    </div>

    <div class="flex flex-col flex-1 p-5 justify-between bg-white">
      <p class="text-[13px] leading-relaxed text-slate-500 line-clamp-3 mb-6">
        {{ form.descripcion }}
      </p>

      <div class="flex items-center justify-between mt-auto">
        
        <span 
          class="px-3 py-1 text-[11px] font-semibold rounded-full border"
          :class="getBadgeStyle(form.intentos_count)"
        >
          {{ getStatusText(form.intentos_count) }}
        </span>

        <button
          @click="$emit('click')"
          class="flex items-center gap-1.5 text-[13px] font-semibold text-[#30338F] hover:text-indigo-800 transition-colors"
        >
          Ver formulario <span class="text-[14px] font-normal leading-none">↗</span>
        </button>
        
      </div>
    </div>
  </article>
</template>