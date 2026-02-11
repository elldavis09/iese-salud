<script setup>
import {ref} from "vue";
import AnalyticsView from "@/views/tutor/analytics/AnalyticsView.vue";
import GroupsView from "@/views/tutor/groups/GroupsView.vue";
import SideNav from "@/components/SideNav.vue";
import {useRouter} from "vue-router";


const router = useRouter();

const currentViewSelected = ref('dashboard');

const navigateTo = (newView) => {
  currentViewSelected.value = newView;
};

</script>

<template>
  <div class="flex h-screen overflow-hidden">
    <SideNav @navigateTo="navigateTo"/>
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