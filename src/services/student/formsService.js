import ApiService from "@/services/apiService.js";

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

export default formsService;