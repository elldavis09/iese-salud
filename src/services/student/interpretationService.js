import ApiService from "@/services/apiService.js";

const interpretationService = {
    async getInterpretationById(intentId) {
        return new Promise((resolve, reject) => {
            const api = new ApiService();
            api.fetchData(`student/intentos/${intentId}/interpretaciones`)// student/formularios/2/intentos/48/interpretaciones
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
};

export default interpretationService;