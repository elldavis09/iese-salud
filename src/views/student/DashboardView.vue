<script setup>
import {onMounted} from 'vue';
import {useRouter} from 'vue-router';
import {storeToRefs} from 'pinia';
import {useFormulariosStore} from "@/stores/student/forms.js";
import {routes} from "@/router/routes.js";
import {ref} from 'vue';
import {useNotificationStore} from "@/stores/notification.js";
import StudentMenu from "@/components/StudentMenu.vue";
import ContentPage from "@/components/ContentPage.vue";
import PageContent from "@/components/PageContent.vue";
import Loading from "@/components/Loading.vue";
import StudentFormItem from "@/components/StudentFormItem.vue";

const formsStore = useFormulariosStore();
const notification = useNotificationStore();
const router = useRouter();

const {formsIsLoading, formsError, formsMessage, forms} = storeToRefs(formsStore);
const viewMode = ref('grid');

const getForms = async () => {
  await formsStore.getForms();
};

onMounted(() => {
  getForms()
});

</script>

<template>
  <PageContent>
    <StudentMenu />
    <ContentPage>
      <div class="p-8">
        <div class="grid grid-cols-1 xl:grid-cols-12 gap-6">
          <div class="xl:col-span-8 space-y-6">

            <section class="bg-white rounded-lg border border-[var(--border-color)] shadow-sm overflow-hidden">
              <div class="p-6 border-b border-[var(--border-color)] flex items-center justify-between">
                <h2 class="text-lg font-bold text-slate-900">Mis Formularios</h2>
                <div class="flex gap-2">
                  <button class="px-3 py-1.5 text-xs font-semibold bg-slate-100 text-slate-900 rounded border border-slate-200">Todos</button>
                  <button class="px-3 py-1.5 text-xs font-semibold text-slate-500 hover:bg-slate-50 rounded transition-all">Pendientes</button>
                </div>
              </div>
              <div class="divide-y divide-slate-100">
                <StudentFormItem
                    v-for="form in forms"
                    :key="form.id"
                    :form="form"
                    @click="router.push(routes.studentForm(form.id))"
                />
              </div>
            </section>
          </div>
          <div class="xl:col-span-4 space-y-6">
            <div class="bg-white rounded-lg border border-[var(--border-color)] shadow-sm">
              <div class="p-4 border-b border-[var(--border-color)]">
                <h2 class="font-bold text-slate-900 flex items-center gap-2">
                  <span class="material-symbols-outlined text-institutional text-xl">stars</span>
                  Logros Recientes
                </h2>
              </div>
              <div class="p-4 space-y-4">
                <div class="flex items-start gap-3">
                  <div class="mt-1 w-2 h-2 rounded-full bg-emerald-500"></div>
                  <div>
                    <p class="text-sm font-bold text-slate-900">Excelencia en Matemáticas</p>
                    <p class="text-xs text-slate-500">Calificación 10.0 en el último examen parcial.</p>
                    <p class="text-[10px] text-slate-400 mt-1 uppercase">Ayer</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <div class="mt-1 w-2 h-2 rounded-full bg-blue-500"></div>
                  <div>
                    <p class="text-sm font-bold text-slate-900">Colaborador Destacado</p>
                    <p class="text-xs text-slate-500">Participación activa en foros de Programación.</p>
                    <p class="text-[10px] text-slate-400 mt-1 uppercase">Hace 3 días</p>
                  </div>
                </div>
              </div>
              <div class="p-4 border-t border-[var(--border-color)]">
                <button class="w-full text-xs font-bold text-institutional hover:underline">VER TODO EL HISTORIAL</button>
              </div>
            </div>
            <div class="bg-institutional text-white p-6 rounded-lg shadow-md relative overflow-hidden">
              <div class="absolute -right-4 -bottom-4 opacity-10">
                <span class="material-symbols-outlined !text-8xl">lightbulb</span>
              </div>
              <h4 class="font-bold mb-2 flex items-center gap-2">
                <span class="material-symbols-outlined text-sm">info</span>
                Tip de Estudio
              </h4>
              <p class="text-sm text-slate-300 leading-relaxed italic">
                "Organiza tus sesiones de estudio con la técnica Pomodoro para mantener un rendimiento alto durante los exámenes parciales."
              </p>
            </div>
          </div>
        </div>
      </div>
    </ContentPage>
  </PageContent>
</template>

<style scoped>
i {
  display: inline-block;
  vertical-align: middle;
}
</style>
