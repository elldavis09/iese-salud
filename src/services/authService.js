// src/services/authService.js

import apiClient from "@/services/apiService.js";

export default {
    async login(credentials) {
        const response = await apiClient.post('student/login', credentials);
        // Guardar el token en el almacenamiento local si la respuesta es exitosa
        if (response.data && response.data.token) {
            localStorage.setItem('auth_token', response.data.token);
        }
        return response.data;
    },
    async registerStudent(userData) {
        const response = await apiClient.post('student/register', userData);
        return response.data;
    },
    async registerTutor(userData) {
        const response = await apiClient.post('tutor/register', userData);
        return response.data;
    },
    async getCurrentUser() {
        // Gracias al interceptor, no necesitamos enviar el token manualmente aquí
        const response = await apiClient.get('/user/profile');
        return response.data;
    },
    async logout() {
        // Le avisamos al backend que destruya la sesión
        await apiClient.post('/logout');
        // Limpiamos el rastro local
        localStorage.removeItem('token');
    }
};

/*
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
    async registerStudent(studentData) {
        return new Promise((resolve, reject) => {
            const api = new ApiService();
            api.postData("student/register", studentData)
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    async registerTutor(tutorData) {
        return new Promise((resolve, reject) => {
            const api = new ApiService();
            api.postData("tutor/register", tutorData)
                .then((data) => {
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

export default authService;*/
