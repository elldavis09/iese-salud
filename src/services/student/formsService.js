import apiClient from "@/services/apiService.js";

export default {
    async getForms() {
        const response = await apiClient.get("student/formularios");
        return response.data;
    },
    async getFormById(id) {
        const route = `student/formularios/${id}`;
        const response = await apiClient.get(route);
        return response.data;
    },
    async submitFormResponses(formId, responses) {
        const url = `student/formularios/${formId}/intentos`;
        const response = await apiClient.post(url, responses);
        return response.data;
    }
}

/*
const formsService = {
    async getForms() {
        return new Promise((resolve, reject) => {
            const api = new ApiService();
            api.fetchData("student/formularios")
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
};

export default formsService;*/
