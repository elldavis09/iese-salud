import ApiService from "@/services/apiService.js";

const formsService = {
    async getForm(formId) {
        return new Promise((resolve, reject) => {
            const api = new ApiService();
            api.fetchData(`tutor/forms/${formId}`)
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    async getFormsFromUser(userId) {
        return new Promise((resolve, reject) => {
            const api = new ApiService();
            api.fetchData(`tutor/students/${userId}/forms`)
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