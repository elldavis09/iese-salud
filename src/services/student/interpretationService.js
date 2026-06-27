import ApiService from "@/services/apiService.js";
import apiClient from "@/services/apiService.js";

export default {
    async getInterpretationById(intentId) {
        const response = await apiClient.get(`student/intentos/${intentId}/interpretaciones`);
        return response.data;
    }
}