<script setup>
import {onMounted} from "vue";
import {tutorGroupsStore} from "@/stores/tutor/TutorGroupsStore.js";
import {storeToRefs} from "pinia";
import GroupItem from "@/components/GroupItem.vue";
import Loading from "@/components/Loading.vue";

// --- STORES ---
const tutorGroupsStr = tutorGroupsStore();
const {fetchGroups: fetch} = tutorGroupsStr;
const {groups, isLoading: groupsLoading} = storeToRefs(tutorGroupsStr);

// --- EMITS ---
const emit = defineEmits(['groupSelected']);
const selectGroup = (group) => {
  emit('groupSelected', group);
};

// --- LIFECYCLE ---
onMounted(() => {
  fetch();
})

</script>

<template>
  <div class="p-8 space-y-6 max-w-7xl mx-auto w-full flex-1">
    <!-- Loading state -->
    <div v-if="groupsLoading" class="text-center py-4">
      <Loading />
    </div>
    <!-- Content -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <GroupItem
          v-for="group in groups"
          :key="group.id"
          :group="group"
          @select="selectGroup(group)"
      />
    </div>
  </div>
</template>

<style scoped>
</style>