import {defineStore} from "pinia";
import {ref} from "vue";
import {fetchFormResultsByStudentId as fetchFormResultByStudentIdUseCase} from "@/usecases/tutor/fetchFormResultsByStudentId.js";
import {fetchFormContent as fetchFormContentUseCase} from "@/usecases/tutor/fetchFormContent.js";

export const tutorResultsStore
    = defineStore(
    'fetchFormResultsByStudentId', () => {
        const interpretaciones = ref([]);
        const attemptId = ref(null);
        const isLoading = ref(false);
        const error = ref(null);

        const formContent = ref(null);
        const formContentIsLoading = ref(false);
        const formContentError = ref(null);

        const fetchFormResultsByStudentId = async (studentId, formId) => {
            isLoading.value = true;
            error.value = null;
            try {
                const data = await fetchFormResultByStudentIdUseCase(studentId, formId);
                interpretaciones.value = data.interpretaciones;
                attemptId.value = data.intento;
            } catch (err) {
                error.value = err.message || 'Error fetching form results';
                return null;
            } finally {
                isLoading.value = false;
            }
        }

        const fetchFormContent = async (formId) => {
            formContentIsLoading.value = true;
            formContentError.value = null;
            try {
                formContent.value = await fetchFormContentUseCase(formId);
            } catch (err) {
                formContentError.value = err.message || 'Error fetching form data';
            } finally {
                formContentIsLoading.value = false;
            }
        }

        return {
            interpretaciones,
            attemptId,
            isLoading,
            error,
            fetchFormResultsByStudentId,
            formContent,
            formContentIsLoading,
            formContentError,
            fetchFormContent
        };
    }
);