import {defineStore} from "pinia";
import {ref} from 'vue';
import attemptService from "@/services/tutor/attemptsService.js";


export const useAttemptsStore = defineStore('attempts', () => {
    const answers = ref([]);
    const isLoading = ref(false);
    const error = ref(null);

    const fetchAnswers = async (attemptId) => {
        isLoading.value = true;
        error.value = null;
        try {
            const response = await attemptService.getAnswersByAttemptId(attemptId);
            answers.value = response.data.respuestas;
        } catch (err) {
            error.value = err;
        } finally {
            isLoading.value = false;
        }
    }

    const clearAnswers = () => {
        answers.value = [];
        isLoading.value = false;
        error.value = null;
    }

    return {
        answers,
        isLoading,
        error,
        fetchAnswers,
        clearAnswers
    };
});