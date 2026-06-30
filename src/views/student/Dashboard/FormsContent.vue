<script setup>
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { routes } from "@/router/routes.js";
import { useRouter } from 'vue-router';
import { useFormsStore } from "@/stores/student/forms.js";
import StudentFormItem from "@/components/Form/StudentFormItem.vue";

const formsStore = useFormsStore();
const router = useRouter();
const { isLoading, error, message, forms } = storeToRefs(formsStore);

// Estado para los filtros (estilo imagen Eclixxo)
const activeFilter = ref('todos'); // 'todos', 'pendientes', 'finalizados'

const getForms = async () => {
  await formsStore.getForms();
};

const handleFormClick = (formId) => {
  router.push(routes.studentForm(formId));
};

onMounted(() => {
  getForms()
});
</script>

<template>
  <div class="p-6 md:p-8 bg-white min-h-screen">
    <div class="max-w-[1200px] mx-auto">
      
      <div class="mb-8 flex flex-col gap-6">
        
        <div class="flex items-center gap-3">
          <h1 class="text-[22px] font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <span class="material-symbols-outlined text-slate-400 text-[26px]">assignment</span>
            Mis Formularios
          </h1>
          <span class="text-slate-400 font-normal text-lg">· {{ forms.length }} en total</span>
        </div>

        <div class="flex flex-wrap items-center gap-2.5">
          <button
            @click="activeFilter = 'todos'"
            class="px-4 py-1.5 text-[13px] font-medium rounded-full transition-all"
            :class="activeFilter === 'todos'
              ? 'border border-[#4F7396] bg-[#EAF2F8] text-[#2C4A68]'
              : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-transparent'"
          >
            Todos
          </button>
          
          <button
            @click="activeFilter = 'pendientes'"
            class="px-4 py-1.5 text-[13px] font-medium rounded-full transition-all"
            :class="activeFilter === 'pendientes'
              ? 'border border-[#FCE6D0] bg-[#FEF7F1] text-[#954408]'
              : 'bg-[#FEF7F1]/50 text-[#954408]/70 hover:bg-[#FEF7F1] border border-transparent'"
          >
            Pendientes
          </button>

          <button
            @click="activeFilter = 'finalizados'"
            class="px-4 py-1.5 text-[13px] font-medium rounded-full transition-all"
            :class="activeFilter === 'finalizados'
              ? 'border border-[#D2F6E3] bg-[#F2FCF7] text-[#12663A]'
              : 'bg-[#F2FCF7]/50 text-[#12663A]/70 hover:bg-[#F2FCF7] border border-transparent'"
          >
            Finalizados
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <StudentFormItem
          v-for="form in forms"
          :key="form.id"
          :form="form"
          class="cursor-pointer"
          @click="handleFormClick(form.id)"
        />
      </div>
      
    </div>
  </div>
</template>

<style scoped>

</style>