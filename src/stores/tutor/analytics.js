import { defineStore } from 'pinia';
import {ref} from "vue";
import analyticsService from "@/services/tutor/analyticsService.js";

export const useAnalyticsStore = defineStore('analytics', () => {
    const formAnalytics = ref(null);

    async function fetchFormAnalytics(groupId, formId) {
        try {
            const data = await analyticsService.fetchFormAnalytics(groupId, formId);
            formAnalytics.value = data.data;
        } catch (error) {
            console.error("Error setting form analytics:", error);
            throw error;
        }
    }

    function clearFormAnalytics() {
        formAnalytics.value = null;
    }

    return {
        formAnalytics,
        fetchFormAnalytics,
        clearFormAnalytics,
    };
});