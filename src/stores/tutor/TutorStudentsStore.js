import {defineStore} from "pinia";
import {ref} from "vue";
import {fetchStudentsByGroupId as fetchStudentsUseCase} from "@/usecases/tutor/fetchStudentsByGroupId.js";

// import tutorGroupHasStudentsService from "@/services/tutor/TutorGroupHasStudentsService.js";

export const tutorStudentsStore
    = defineStore('tutorStudentsStore', () => {
    const students = ref([]);
    const isLoading = ref(false);
    const error = ref(null);

    // Fetch students by group ID
    const fetchStudentsByGroupId = async (groupId) => {
        isLoading.value = true;
        error.value = null;
        try {
            students.value = await fetchStudentsUseCase(groupId);
        } catch (err) {
            error.value = err.message || 'Error fetching students';
        } finally {
            isLoading.value = false;
        }
    }

    return {
        students,
        isLoading,
        error,
        fetchStudentsByGroupId
    }
});