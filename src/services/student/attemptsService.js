import ApiService from "@/services/apiService.js";

export default {
    async getMyAttemptsByFormId(formId) {
        const response = await ApiService.get(`student/forms/${formId}/attempts`);
        return response.data;
    },
    async getMyAnswersByAttempt(attemptId) {
        const response = await ApiService.get(`student/attempts/${attemptId}`);
        return response.data;
    },
    async getMyLatestAttemptByFormId(formId) {
        const response = await ApiService.get(`student/forms/${formId}/attempts/latest`);
        return response.data;
    }
}