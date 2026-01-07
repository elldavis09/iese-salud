import {defineStore} from 'pinia';
import {computed, ref} from 'vue';
import authService from '../services/authService.js';

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null);
    const token = ref(null);//localStorage.getItem('auth_token') || null
    const isLoading = ref(false);
    const error = ref(null);
    const message = ref(null);

    const isAuthenticated = computed(() => !!token.value);

    async function initializeAuth() {
        if (token.value && !user.value) {
            try {
                const response = await authService.getCurrentUser();
                user.value = response.data;
            } catch (err) {
                logout();
            }
        }
    }

    async function loginAction(email, password) {
        isLoading.value = true;
        error.value = null;
        try {
            const response = await authService.login(email, password);
            user.value = response.data.user;
            token.value = response.data.token;

            localStorage.setItem('auth_token', token.value);
            return true;
        } catch (err) {
            error.value = err.message;
            return false;
        } finally {
            isLoading.value = false;
        }
    }

    async function registerAction(payload) {
        isLoading.value = true;
        error.value = null;
        return authService.register(payload)
            .then((response) => {
                token.value = response.token;
                localStorage.setItem('auth_token', response.token);
                return true;
            })
            .catch((err) => {
                error.value = err.response?.data?.message || err.message || "Error al registrar.";
                return false;
            })
            .finally(() => {
                isLoading.value = false;
            });
    }

    async function registerStudent(payload) {
        isLoading.value = true;
        error.value = null;

        return authService.registerStudent(payload)
            .then((response) => {
                message.value = response.message;
                token.value = response.token;
                localStorage.setItem('auth_token', response.token);
                return true;
            })
            .catch((err) => {
                error.value = err.data?.message || err.message || "Error al registrar estudiante.";
                // Si quiero acceder a los detalles del error entonces uso err.data
                // console.log(JSON.stringify(err.data.errors))
                return false;
            })
            .finally(() => {
                isLoading.value = false;
            });
    }

    async function registerTutor(payload) {
        isLoading.value = true;
        error.value = null;

        return authService.registerTutor(payload)
            .then((response) => {
                token.value = response.token;
                localStorage.setItem('auth_token', response.token);
                return true;
            })
            .catch((err) => {
                error.value = err.response?.data?.message || err.message || "Error al registrar tutor.";
                return false;
            })
            .finally(() => {
                isLoading.value = false;
            }
        );
    }

    function logout() {
        // Logout server-side
        try {
            const response = authService.logout();
            console.log("Logout response:", response);
        } catch (err) {
            console.error("Error during logout:", err);
        }
        // Clear client-side data
        user.value = null;
        token.value = null;
        localStorage.removeItem('auth_token');
    }

    return {
        user,
        token,
        isLoading,
        error,
        message,
        isAuthenticated,
        initializeAuth,
        loginAction,
        registerStudent,
        registerTutor,
        logout
    };
});
