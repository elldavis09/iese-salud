<script setup>
import {onMounted} from "vue";
import {tutorGroupsStore} from "@/stores/tutor/TutorGroupsStore.js";
import {storeToRefs} from "pinia";

// --- STORES ---
const tutorGroupsStr = tutorGroupsStore();
const {fetchGroups: fetch} = tutorGroupsStr;
const { groups, isLoading: groupsLoading} = storeToRefs(tutorGroupsStr);

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
  <div>
    <h1 class="text-2xl font-bold mb-4">Grupos</h1>
    <div v-if="groupsLoading" class="text-center py-4">
      <p>Cargando grupos...</p>
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="group in groups" :key="group.id" @click="selectGroup(group)"
           class="p-4 mb-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
        <p>{{ group?.grupo ?? 'Sin grupo' }}</p>
        <p>{{ group?.ciclo ?? 'Sin ciclo' }}</p>
        <p>{{ group?.carrera?.nombre ?? 'Sin carrera' }}</p>
        <p>{{ group?.estudiantes_count ?? 'Sin estudiantes' }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>