import {defineStore} from "pinia";
import {fetchForms as fetchFormsUseCase} from "@/usecases/tutor/fetchForms.js";
import {ref} from "vue";
export const tutorFormStore
    = defineStore( 'tutorFormStore', () => {
        const forms = ref([]);
        const isLoading = ref(false);
        const error = ref(null);

        async function fetchForms(page) {
            isLoading.value = true;
            error.value = null;
            try {
                forms.value = await fetchFormsUseCase(page);
            } catch (err) {
                error.value = err.message || "Failed to fetch forms.";
            } finally {
                isLoading.value = false;
            }
        }

        return {
            forms,
            isLoading,
            error,
            fetchForms
        }
    }
);
