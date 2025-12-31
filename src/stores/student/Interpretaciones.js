import {defineStore} from "pinia";
import {ref} from "vue";
import interpretationService from "@/services/student/interpretationService.js";

export const useInterpretacionesStore = defineStore('interpretaciones', () => {
    const interpretaciones = ref([]);
    const isLoading = ref(false);
    const error = ref(null);

    async function fetchFormWithAnswers(formId, intentoId) {
        isLoading.value = true;
        error.value = null;
        try {
            const response = await interpretationService.getInterpretationById(intentoId);
            console.log('Interpretaciones fetched:', response);
            interpretaciones.value = response.data.interpretaciones;

        } catch (err) {
            error.value = err.message || 'Error al cargar el formulario con respuestas.';
            throw err;
        } finally {
            isLoading.value = false;
        }
    }

    async function clearInterpretaciones() {
        interpretaciones.value = [];
    }
    
    return {
        interpretaciones,
        isLoading,
        error,
        fetchFormWithAnswers,
        clearInterpretaciones
    };
})

