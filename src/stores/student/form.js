import {defineStore} from "pinia";
import formsService from "@/services/student/formService.js";
import {ref} from "vue";

export const useFormStore
    = defineStore('form', () => {
    const formSelected = ref(null);
    const formSelectedMessage = ref(null);
    const formSelectedError = ref(null);
    const formSelectedIsLoading = ref(false);

    async function getFormById(id) {
        formSelectedIsLoading.value = true;
        formSelectedError.value = null;
        try {
            const data = await formsService.getFormById(id);
            formSelectedMessage.value = data.message;
            formSelected.value = data.data;
        } catch (err) {
            formSelectedError.value = err.message || 'Error al cargar el formulario.';
            throw err;
        } finally {
            formSelectedIsLoading.value = false;
        }
    }

    async function submitFormResponses(formId, responses) {
        // isLoading.value = true;
        // error.value = null;
        try {
            const data = await formsService.submitFormResponses(formId, responses);
            formSelectedMessage.value = data.message;
        } catch (err) {
            formSelectedMessage.value = err.message || 'Error al enviar el formulario.';
            throw err;
        } finally {
            // isLoading.value = false;
        }
    }

    return {
        formSelected,
        formSelectedMessage,
        formSelectedError,
        formSelectedIsLoading,
        getFormById,
        submitFormResponses
    };
});