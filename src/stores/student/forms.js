import {ref} from 'vue';
import {defineStore} from 'pinia';
import formsService from '@/services/student/formsService.js'; // Servicio para manejar formularios

export const useFormulariosStore = defineStore('formularios', () => {
    const forms = ref([]);
    const formsMessage = ref(null);
    const formsError = ref(null);
    const formsIsLoading = ref(false);

    async function getForms() {
        formsIsLoading.value = true;
        formsError.value = null;
        try {
            const data = await formsService.getForms();
            formsMessage.value = data.message;
            forms.value = data.data;
        } catch (err) {
            // error.value = err.message || 'Error al cargar los formularios.';
            formsError.value = err.message || 'Error al cargar los formularios.';
        } finally {
            formsIsLoading.value = false;
        }
    }

    async function clearForms() {
        forms.value = [];
    }

    return {
        forms,
        formsMessage,
        formsError,
        formsIsLoading,
        getForms
    };
});

