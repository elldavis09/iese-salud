import attemptsService from "@/services/student/attemptsService.js";
import {defineStore} from "pinia";
import {ref} from "vue";

export const useAttemptsStore
    = defineStore('attempts', () => {
    const attempts = ref([]);
    const attemptsMessage = ref(null);
    const attemptsError = ref(null);
    const attemptsIsLoading = ref(false);

    async function getFormsAttempts(formId) {
        attemptsIsLoading.value = true;
        attemptsError.value = null;
        try {
            const data = await attemptsService.getFormAttempts(formId);
            attemptsMessage.value = data.message;
            attempts.value = data.data;
        } catch (err) {
            attemptsError.value = err.message || 'Error al cargar los intentos del formulario.';
            throw err;
        } finally {
            attemptsIsLoading.value = false;
        }
    }

    async function getAttemptResponses(formId, attemptId) {
        attemptsIsLoading.value = true;
        attemptsError.value = null;
        try {
            const data = await attemptsService.getAttemptResponses(formId, attemptId);
            attemptsMessage.value = data.message;
            return data.data;
        } catch (err) {
            attemptsError.value = err.message || 'Error al cargar las respuestas del intento.';
            throw err;
        } finally {
            attemptsIsLoading.value = false;
        }
    }

    async function deleteFormAttempt(formId, attemptId) {
        attemptsIsLoading.value = true;
        attemptsError.value = null;
        try {
            const data = await attemptsService.deleteFormAttempt(formId, attemptId);
            attemptsMessage.value = data.message;
        } catch (err) {
            attemptsError.value = err.message || 'Error al eliminar el intento del formulario.';
            throw err;
        } finally {
            attemptsIsLoading.value = false;
        }
    }

    return {
        attempts,
        attemptsMessage,
        attemptsError,
        attemptsIsLoading,
        getFormsAttempts,
        getAttemptResponses,
        deleteFormAttempt
    };
});