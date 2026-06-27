import {ref} from 'vue';
import {defineStore} from 'pinia';
import formsService from '@/services/student/formsService.js';

export const useFormsStore = defineStore('formularios', () => {
    const forms = ref([]);
    const formSelected = ref(null);
    const message = ref(null);
    const error = ref(null);
    const isLoading = ref(false);

    async function getForms() {
        isLoading.value = true;
        error.value = null;
        try {
            const data = await formsService.getForms();
            message.value = data.message;
            forms.value = data.data;
        } catch (err) {
            error.value = err.message || 'Error al cargar los formularios.';
        } finally {
            isLoading.value = false;
        }
    }

    async function getFormById(formId) {
        isLoading.value = true;
        error.value = null;
        try {
            const data = await formsService.getFormById(formId);
            message.value = data.message;
            formSelected.value = data.data;
        } catch (err) {
            error.value = err.message || 'Error al cargar el formulario.';
            throw err;
        } finally {
            isLoading.value = false;
        }
    }

    async function submitFormResponses(formId, responses) {
        isLoading.value = true;
        error.value = null;
        try {
            const data = await formsService.submitFormResponses(formId, responses);
            message.value = data.message;
        } catch (err) {
            message.value = err.message || 'Error al enviar el formulario.';
            throw err;
        } finally {
            isLoading.value = false;
        }
    }

    async function clearForms() {
        forms.value = [];
    }

    return {
        forms,
        formSelected,
        message,
        error,
        isLoading,
        getForms,
        getFormById,
        submitFormResponses,
        clearForms
    };
});

