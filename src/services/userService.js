import ApiService from "@/services/apiService.js";

const userService = {
    async getUser() {
        return new Promise((resolve, reject) => {
            const api = new ApiService();
            api.fetchData("user")
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}

export default userService;