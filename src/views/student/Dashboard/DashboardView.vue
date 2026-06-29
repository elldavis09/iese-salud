<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { routes } from "@/router/routes.js";
import { useFormsStore } from "@/stores/student/forms.js";
import { useAuthStore } from "@/stores/authStore.js";
import ContentPage from "@/components/ContentPage.vue";
import PageContent from "@/components/PageContent.vue";
import Sidebar from '@/components/SideMenu/Sidebar.vue';

const authStore = useAuthStore();
const formsStore = useFormsStore();
const router = useRouter();

const { isLoading, error, message, forms } = storeToRefs(formsStore);

const getForms = async () => {
  await formsStore.getForms();
};

const logout = async () => {
  authStore.logout();
  await router.push(routes.login);
};

const isSidebarCollapsed = ref(false);

const handleSidebarToggle = (collapsed) => {
  isSidebarCollapsed.value = collapsed;
};

const handleFormClick = (formId) => {
  router.push(routes.studentForm(formId));
};

onMounted(() => {
  getForms()
});

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