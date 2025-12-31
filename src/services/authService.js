// src/services/authService.js

import ApiService from "@/services/apiService.js";

const authService = {
    async login(email, password) {
        return new Promise((resolve, reject) => {
            const api = new ApiService();
            api.postData("student/login", {email, password})
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    async register(userData) {
        return new Promise((resolve, reject) => {
            const api = new ApiService();
            api.postData("register", userData)
                .then((data) => {
                    console.log(data);
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    async logout() {
        return new Promise((resolve, reject) => {
            const api = new ApiService();
            api.postData("logout")
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    async getCurrentUser() {
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
};

export default authService;