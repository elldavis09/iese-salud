<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from "@/stores/authStore.js";
import { routes } from "@/router/routes.js";
import ContentPage from "@/components/ContentPage.vue";
import PageContent from "@/components/PageContent.vue";
import Sidebar from '@/components/SideMenu/Sidebar.vue';

const authStore = useAuthStore();
const router = useRouter();

const logout = async () => {
  authStore.logout();
  await router.push(routes.login);
};

const isSidebarCollapsed = ref(false);

const handleSidebarToggle = (collapsed) => {
  isSidebarCollapsed.value = collapsed;
};

</script>

<template>
  <PageContent>
    <Sidebar @logout="logout" @toggle-collapse="handleSidebarToggle" />
    <ContentPage :style="{
      '--sidebar-width': isSidebarCollapsed ? '88px' : '280px'
    }">
      <router-view />
    </ContentPage>
  </PageContent>
</template>

<style scoped>
i {
  display: inline-block;
  vertical-align: middle;
}
</style>