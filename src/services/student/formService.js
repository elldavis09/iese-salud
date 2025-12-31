import ApiService from "@/services/apiService.js";

const formService = {
    async getFormById(id) {
        return new Promise((resolve, reject) => {
            const api = new ApiService();
            api.fetchData(`student/formularios/${id}`)
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    // Funcion para enviar las respuestas del formulario
    async submitFormResponses(formId, responses) {
        return new Promise((resolve, reject) => {
            const api = new ApiService();
            api.postData(`student/formularios/${formId}/intentos`, responses)
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    console.error("Error submitting form responses:", error, responses);
                    reject(error);
                });
        });
    }
}

export default formService;