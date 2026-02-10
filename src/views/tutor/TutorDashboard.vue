<script setup>
import { nextTick, onMounted, onUpdated, ref} from "vue";
import AnalyticsView from "@/views/tutor/analytics/AnalyticsView.vue";
import GroupsView from "@/views/tutor/groups/GroupsView.vue";

const currentViewSelected = ref('dashboard'); // dashboard | groups | reports | settings

const navigateTo = (newView) => {
  currentViewSelected.value = newView;
};

</script>

<template>
  <div class="flex h-screen overflow-hidden">
    <aside
        class="w-64 bg-white dark:bg-[#1a2432] border-r border-[#f0f2f4] dark:border-[#2d3a4b] hidden lg:flex flex-col">
      <div class="p-6 flex items-center gap-3">
        <div class="bg-primary p-2 rounded-lg text-white">
          <span class="material-symbols-outlined">school</span>
        </div>
        <h2 class="text-xl font-bold tracking-tight">AdminTutor</h2>
      </div>
      <nav class="flex-1 px-4 space-y-2 mt-4">
        <a class="flex items-center gap-3 px-4 py-3 rounded-lg text-[#617289] dark:text-gray-400 hover:bg-[#f0f2f4] dark:hover:bg-[#2d3a4b] transition-colors"
           @click.stop="navigateTo('dashboard')">
          <span class="material-symbols-outlined">dashboard</span>
          <span class="font-medium">Dashboard</span>
        </a>
        <a class="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary transition-colors"
           @click.stop="navigateTo('groups')">
          <span class="material-symbols-outlined">group</span>
          <span class="font-medium">Grupos</span>
        </a>
        <a class="flex items-center gap-3 px-4 py-3 rounded-lg text-[#617289] dark:text-gray-400 hover:bg-[#f0f2f4] dark:hover:bg-[#2d3a4b] transition-colors"
           @click.stop="navigateTo('reports')">
          <span class="material-symbols-outlined">assessment</span>
          <span class="font-medium">Reportes</span>
        </a>
        <a class="flex items-center gap-3 px-4 py-3 rounded-lg text-[#617289] dark:text-gray-400 hover:bg-[#f0f2f4] dark:hover:bg-[#2d3a4b] transition-colors"
           href="#">
          <span class="material-symbols-outlined">settings</span>
          <span class="font-medium">Ajustes</span>
        </a>
      </nav>
      <div class="p-4 border-t border-[#f0f2f4] dark:border-[#2d3a4b]">
        <div class="flex items-center gap-3 p-2">
          <div class="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">JD
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-semibold truncate">Juan Delgado</p>
            <p class="text-xs text-[#617289] dark:text-gray-400 truncate">Tutor Administrador</p>
          </div>
        </div>
      </div>
    </aside>
    <main class="flex-1 flex flex-col overflow-y-auto">
      <!-- Dashboard -->
      <div v-if="currentViewSelected === 'dashboard'">
        <h1>Dasboard</h1>
      </div>
      <!-- groups -->
      <div v-if="currentViewSelected === 'groups'">
        <GroupsView />
      </div>
      <div v-if="currentViewSelected === 'reports'">
        <!-- Seleccionar grupo -->
        <AnalyticsView />
      </div>
      <!-- Footer -->
      <footer class="p-8 text-center text-sm text-[#617289] dark:text-gray-400">
        © 2026 IESE System. Todos los derechos reservados.
      </footer>
    </main>
  </div>
</template>

<style scoped>
</style>