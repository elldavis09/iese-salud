import {defineStore} from 'pinia';
import {ref} from "vue";
import {fetchAnalyticsByForm as fetchAnalyticsByFormUseCase} from "@/usecases/tutor/fetchAnalyticsByForm.js";

export const tutorFormAnalyticStore
    = defineStore('tutorFormAnalyticStore', () => {
    const formAnalytics = ref(null);
    const isLoading = ref(false);
    const error = ref(null);

    async function fetchAnalyticsByForm(groupId, formId) {
        try {
            formAnalytics.value = await fetchAnalyticsByFormUseCase(groupId, formId);
        } catch (error) {
            console.error("Error setting form analytics:", error);
            throw error;
        }
    }

    return {
        formAnalytics,
        isLoading,
        error,
        fetchAnalyticsByForm
    };
});