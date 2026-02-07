import {defineStore} from "pinia";
import tutorGroupHasStudentsService from "@/services/tutor/TutorGroupHasStudentsService.js";
import {ref} from "vue";

export const useGroupsStore
    = defineStore('tutor-groups', () => {
        const groups = ref(null);
        const isLoading = ref(false);
        const error = ref(null);

    const fetchGroups = async () => {
        isLoading.value = true;
        error.value = null;
        try {
            const data = await tutorGroupHasStudentsService.getAllGroups();
            console.log(data);
            groups.value = data.data;
            return true;
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