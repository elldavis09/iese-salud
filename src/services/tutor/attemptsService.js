import ApiService from "@/services/apiService.js";

const attemptsService = {
    getAnswersByAttemptId: async (attemptId) => {
        return new Promise((resolve, reject) => {
            const api = new ApiService();
            api.fetchData(`tutor/attempts/${attemptId}/answers`)
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}

export default attemptsService;