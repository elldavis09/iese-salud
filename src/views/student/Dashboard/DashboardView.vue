<script setup>
import {onMounted} from 'vue';
import {useRouter} from 'vue-router';
import {storeToRefs} from 'pinia';
import {useFormsStore} from "@/stores/student/forms.js";
import {routes} from "@/router/routes.js";
import {ref} from 'vue';
import StudentMenu from "@/components/SideMenu/StudentMenu.vue";
import ContentPage from "@/components/ContentPage.vue";
import PageContent from "@/components/PageContent.vue";
import {useAuthStore} from "@/stores/authStore.js";
import FormsContent from "@/views/student/FormsContent.vue";
import StudentScreens from "@/views/student/StudentScreens.js";
import ProfileContent from "@/views/student/ProfileContent.vue";

const authStore = useAuthStore();
const formsStore = useFormsStore();
const router = useRouter();

const {isLoading, error, message, forms} = storeToRefs(formsStore);
const itemSelected = ref(StudentMenu.DASHBOARD);

const getForms = async () => {
  await formsStore.getForms();
};

const logout = async () => {
  authStore.logout();
  await router.push(routes.login);
};

const handleFormClick = (formId) => {
  router.push(routes.studentForm(formId));
};

const handleItemSelected = (item) => {
  itemSelected.value = item;
};

onMounted(() => {
  getForms()
});

</script>

<template>
  <PageContent>
    <StudentMenu @logout="logout" @optionSelected="handleItemSelected"/>
    <ContentPage>
      <template v-if="itemSelected === StudentScreens.DASHBOARD">
        <p>Dashboard</p>
      </template>
      <template v-else-if="itemSelected === StudentScreens.FORMS">
        <FormsContent :forms="forms" @formClicked="handleFormClick"/>
      </template>
      <template v-else-if="itemSelected === StudentScreens.PROFILE">
        <ProfileContent/>
      </template>
      <template v-else-if="itemSelected === StudentScreens.SETTINGS">
      </template>
    </ContentPage>
  </PageContent>
</template>

<style scoped>
i {
  display: inline-block;
  vertical-align: middle;
}
</style>