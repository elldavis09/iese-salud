import {ref} from "vue";
import {defineStore} from "pinia";
import formsService from "@/services/tutor/formsService.js";

export const useFormsStore = defineStore('tutor-forms', () => {
    const forms = ref([]);
    const isLoading = ref(false);
    const error = ref(null);

    async function getFormsFromUser(userId) {
        isLoading.value = true;
        error.value = null;
        try {
            const response = await formsService.getFormsFromUser(userId);
            forms.value = response.data;
        } catch (err) {
            error.value = err.message || "Error al obtener los formularios.";
        } finally {
            isLoading.value = false;
        }
    }

    return {
        forms,
        isLoading,
        error,
        getFormsFromUser,
    };
});