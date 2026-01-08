import ApiService from "@/services/apiService.js";

const analyticsService = {
    fetchFormAnalytics: async (groupId, formId) => {
        return new Promise((resolve, reject) => {
            const api = new ApiService();
            api.fetchData(`tutor/groups/${groupId}/forms/${formId}/analytics`)
                .then((data) => {
                    console.log(data);
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}

export default analyticsService;