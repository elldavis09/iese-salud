import {defineStore} from "pinia";
import {fetchGroups as fetchGroupsUseCase} from "@/usecases/tutor/fetchGroups.js";
import {ref} from "vue";

export const useFetchGroups
    = defineStore('tutor-groups', () => {
        const groups = ref(null);
        const isLoading = ref(false);
        const error = ref(null);

    const fetchGroups = async () => {
        isLoading.value = true;
        error.value = null;
        try {
            groups.value = await fetchGroupsUseCase();
        } catch (err) {
            error.value = 'Error: ' + err.message || 'Error fetching groups';
        } finally {
            isLoading.value = false;
        }
    }



    return {
        groups,
        isLoading,
        error,
        fetchGroups
    }
});