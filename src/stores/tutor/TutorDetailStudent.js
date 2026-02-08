import {defineStore} from "pinia";
import {ref} from "vue";
import {fetchDataStudentById as fetchDataStudentByIdUseCase} from "@/usecases/tutor/fetchDataStudentById.js";

export const tutorDetailStudent
    = defineStore('tutorDetailStudent', () => {
        const userData = ref(null);
        const isLoading = ref(false);
        const error = ref(null);

        const fetchDataStudentById = async (groupId, studentId) => {
            isLoading.value = true;
            error.value = null;
            try {
                userData.value = await fetchDataStudentByIdUseCase(groupId, studentId);
                return true;
            } catch (err) {
                error.value = err.message || 'Error fetching student data';
                return null;
            } finally {
                isLoading.value = false;
            }
        }

        return {
            userData,
            isLoading,
            error,
            fetchDataStudentById
        }
    }
);