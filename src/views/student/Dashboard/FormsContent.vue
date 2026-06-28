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
    <section class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div class="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <h2 class="text-lg font-bold text-[#064459] flex items-center gap-2">
          <span class="material-symbols-outlined text-[#ac111f]">assignment</span>
          Mis Formularios
        </h2>

        <div class="flex gap-2">
          <button class="px-4 py-1.5 text-xs font-bold bg-[#064459] text-white rounded-md shadow-sm transition-colors">
            Todos
          </button>
          <button class="px-4 py-1.5 text-xs font-semibold text-slate-500 hover:text-[#064459] hover:bg-slate-100 rounded-md transition-colors">
            Pendientes
          </button>
        </div>
      </div>

      <div class="p-5">
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <StudentFormItem
            v-for="form in forms"
            :key="form.id"
            :form="form"
            class="cursor-pointer"
            @click="handleFormClick(form.id)"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>

</style>