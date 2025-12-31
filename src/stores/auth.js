import {defineStore} from 'pinia';
import {computed, ref} from 'vue';
import authService from '../services/authService.js';

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null);
    const token = ref(localStorage.getItem('auth_token') || null);
    const isLoading = ref(false);
    const error = ref(null);

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

        // Realizar el registro utilizando el servicio
        return authService.register(payload)
            .then((response) => {
                user.value = response.user;
                token.value = response.token;

                localStorage.setItem('auth_token', response.token);
                localStorage.setItem('auth_user', JSON.stringify(response.user));
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
        isAuthenticated,
        initializeAuth,
        loginAction,
        registerAction,
        logout
    };
});
