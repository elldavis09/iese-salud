import ApiService from "@/services/apiService.js";

export default {
    async getFormAttempts(formId) {
        const response = await ApiService.get(`student/formularios/${formId}/intentos`);
        return response.data;
    },
    async getAttemptResponses(formId, attemptId) {
        const response = await ApiService.get(`student/formularios/${formId}/intentos/${attemptId}`);
        return response.data;
    },
    async deleteFormAttempt(formId, attemptId) {
        const response = await ApiService.delete(`student/formularios/${formId}/intentos/${attemptId}`);
        return response.data;
    }
}
/*
const attemptsService = {
    async getFormAttempts(formId) {
        return new Promise((resolve, reject) => {
            const api = new ApiService();
            api.fetchData(`student/formularios/${formId}/intentos`)
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    async getAttemptResponses(formId, attemptId) {
        return new Promise((resolve, reject) => {
            const api = new ApiService();
            api.fetchData(`student/formularios/${formId}/intentos/${attemptId}`)
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    async deleteFormAttempt(formId, attemptId) {
        return new Promise((resolve, reject) => {
            const api = new ApiService();
            api.deleteData(`student/formularios/${formId}/intentos/${attemptId}`)
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
};

export default attemptsService;*/
