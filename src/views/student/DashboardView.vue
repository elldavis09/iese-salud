<script setup>
import {onMounted} from 'vue';
import {useRouter} from 'vue-router';
import {storeToRefs} from 'pinia';
import {useFormulariosStore} from "@/stores/student/forms.js";
import {routes} from "@/router/routes.js";
import {ref} from 'vue';
import {useNotificationStore} from "@/stores/notification.js";
import {NotificationTypes as notificationTypes} from "@/util/notificationTypes.js";

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
  <div class="min-h-[400px] bg-slate-50 p-6 md:p-8 rounded-3xl">
    <div class="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
          <span class="bg-indigo-100 text-indigo-600 p-2 rounded-lg">
            <i class="ph ph-files text-2xl"></i>
          </span>
          Mis Formularios
        </h1>
        <p class="text-gray-500 mt-2 text-lg">
          Selecciona un formulario pendiente para comenzar.
        </p>
      </div>

      <!-- View Mode Toggle & Forms Count -->
      <div class="flex items-center gap-3">
        <div class="flex bg-gray-200 p-1 rounded-lg">
          <button
              @click="viewMode = 'grid'"
              class="p-2 rounded-md transition-all duration-200 flex items-center justify-center"
              :class="viewMode === 'grid' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'"
              title="Vista Cuadrícula"
          >
            <i class="ph ph-squares-four text-xl"></i>
          </button>
          <button
              @click="viewMode = 'list'"
              class="p-2 rounded-md transition-all duration-200 flex items-center justify-center"
              :class="viewMode === 'list' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'"
              title="Vista Lista"
          >
            <i class="ph ph-list-dashes text-xl"></i>
          </button>
        </div>

        <div v-if="!formsIsLoading && forms.length > 0"
             class="text-sm font-medium text-gray-400 bg-white px-3 py-2 rounded-lg border border-gray-200 shadow-sm whitespace-nowrap">
          {{ forms.length }} Asignados
        </div>
      </div>
    </div>

    <div v-if="formsIsLoading"
         :class="viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'flex flex-col gap-4'">
      <div v-for="n in 3" :key="n" class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 animate-pulse flex"
           :class="viewMode === 'grid' ? 'flex-col h-48 justify-between' : 'flex-row items-center h-24 gap-4'">
        <div class="space-y-3 flex-1">
          <div class="h-6 bg-gray-200 rounded w-3/4"></div>
          <div class="h-4 bg-gray-100 rounded w-full"></div>
        </div>
        <div :class="viewMode === 'grid' ? 'w-full h-10 mt-4' : 'w-32 h-10'" class="bg-gray-100 rounded-lg"></div>
      </div>
    </div>

    <div v-else-if="forms.length === 0"
         class="flex flex-col justify-center items-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
      <div class="bg-indigo-50 p-6 rounded-full mb-4 ring-8 ring-indigo-50/50">
        <i class="ph ph-tray text-4xl text-indigo-400"></i>
      </div>
      <h3 class="text-xl font-bold text-gray-900">Todo está limpio por aquí</h3>
      <p class="text-gray-500 mt-2 max-w-sm text-center">
        No tienes formularios asignados en este momento. ¡Buen trabajo!
      </p>
    </div>

    <div v-else
         :class="viewMode === 'grid' 
           ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
           : 'flex flex-col gap-4'">
      <div
          v-for="formulario in forms"
          :key="formulario.id"
          class="group relative bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-indigo-200 transition-all duration-300 cursor-pointer p-6"
          :class="viewMode === 'grid'
          ? 'flex flex-col hover:-translate-y-1' 
          : 'flex flex-col md:flex-row md:items-center hover:-translate-x-1'"
          @click="router.push(routes.studentForm(formulario.id))"
      >
        <!-- Decorative Arrow for Grid View -->
        <div v-if="viewMode === 'grid'"
             class="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
          <i class="ph ph-arrow-right text-6xl text-indigo-600 -rotate-45 group-hover:rotate-0 transition-transform duration-500"></i>
        </div>
        <!-- Form Info -->
        <div class="relative z-10 flex-1" :class="viewMode === 'list' ? 'flex items-center gap-6' : 'mb-6'">

          <!-- Icon -->
          <div
              class="bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shrink-0"
              :class="viewMode === 'grid' ? 'w-12 h-12 mb-4' : 'w-14 h-14'">
            <i class="ph ph-clipboard-text text-2xl"></i>
          </div>

          <!-- Form Name and Description -->
          <div>
            <h2 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-700 transition-colors">
              {{ formulario.nombre }}
            </h2>
            <p class="text-gray-500 text-sm leading-relaxed"
               :class="viewMode === 'grid' ? 'line-clamp-3' : 'line-clamp-1 pr-4'">
              {{ formulario.descripcion || "Sin descripción disponible." }}
            </p>

            <!-- Attempts count -->
            <div v-if="formulario.intentos_count > 0" class="mt-2 text-sm text-gray-400">
              Has intentado completar este formulario {{ formulario.intentos_count }}
              {{ formulario.intentos_count === 1 ? 'vez' : 'veces' }}.
            </div>
          </div>
        </div>


        <!-- Action Button -->
        <div class="relative z-10" :class="viewMode === 'grid' ? 'mt-auto' : 'mt-4 md:mt-0 md:w-auto'">
          <button
              class="py-3 px-4 bg-gray-50 text-indigo-600 font-bold rounded-xl border border-gray-100 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-transparent transition-all duration-300 flex items-center justify-center gap-2"
              :class="viewMode === 'grid' ? 'w-full' : 'w-full md:w-auto whitespace-nowrap'"
          >
            <span v-if="viewMode === 'grid' ">Completar ahora</span>
            <span v-else>Completar</span>
            <i class="ph ph-caret-right text-lg"></i>
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
i {
  display: inline-block;
  vertical-align: middle;
}
</style>
