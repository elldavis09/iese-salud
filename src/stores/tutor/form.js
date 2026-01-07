import {ref} from "vue";
import {defineStore} from "pinia";
import formsService from "@/services/tutor/formsService.js";

export const useFormStore = defineStore('tutor-form', () => {
    const formData = ref({});
    const isLoading = ref(false);
    const error = ref(null);

    const fetchFormData = async (formId) => {
        isLoading.value = true;
        error.value = null;
        try {
            const data = await formsService.getForm(formId);
            formData.value = data.data;
        } catch (err) {
            error.value = err.message || 'Error fetching form data';
        } finally {
            isLoading.value = false;
        }
    }

    const clearFormData = () => {
        formData.value = {};
        isLoading.value = false;
        error.value = null;
    }

    return {
        formData,
        isLoading,
        error,
        fetchFormData,
        clearFormData
    };
});