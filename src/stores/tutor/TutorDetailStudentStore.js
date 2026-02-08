import {defineStore} from "pinia";
import {ref} from "vue";
import {fetchDataStudentById as fetchDataStudentByIdUseCase} from "@/usecases/tutor/fetchDataStudentById.js";
import {fetchFormsFromUser as fetchFormFromUserUseCase} from "@/usecases/tutor/fetchFormsFromUser.js";

export const tutorDetailStudentStore
    = defineStore('tutorDetailStudentStore', () => {
        const userData = ref(null);
        const isLoading = ref(false);
        const error = ref(null);

        const forms = ref([]);
        const formsIsLoading = ref(false);
        const formsError = ref(null);

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

    async function fetchFormsFromUser(userId) {
        formsIsLoading.value = true;
        formsError.value = null;
        try {
            forms.value = await fetchFormFromUserUseCase(userId)
        } catch (err) {
            formsError.value = err.message || "Error al obtener los formularios.";
        } finally {
            formsIsLoading.value = false;
        }
    }

        return {
            userData,
            isLoading,
            error,
            fetchDataStudentById,
            forms,
            formsIsLoading,
            formsError,
            fetchFormsFromUser,
        }
    }
);