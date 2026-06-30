import apiClient from "@/services/apiService.js";

export default {
    async getForms() {
        const response = await apiClient.get("student/forms");
        return response.data;
    },
    async getFormById(id) {
        const route = `student/forms/${id}`;
        const response = await apiClient.get(route);
        return response.data;
    },
    async submitFormResponses(formId, responses) {
        const url = `student/forms/${formId}/attempts`;
        const response = await apiClient.post(url, responses);
        return response.data;
    }
}
