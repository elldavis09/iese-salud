<script setup>
import {onMounted} from "vue";
import {useGroupsStore} from "@/stores/tutor/groups.js";
import {storeToRefs} from "pinia";

// --- STORES ---
const groupsStore = useGroupsStore()
const { groups, isLoading: groupsLoading} = storeToRefs(groupsStore);

// --- EMITS ---
const emit = defineEmits(['groupSelected']);
const selectGroup = (group) => {
  emit('groupSelected', group);
};

// --- LIFECYCLE ---
onMounted(() => {
  groupsStore.fetchGroups();
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