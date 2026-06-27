import {defineStore} from 'pinia';
import {computed, ref} from 'vue';
import authService from '../services/authService.js';

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null);
    const token = ref(localStorage.getItem('auth_token') || null);
    const isLoading = ref(false);
    const error = ref(null);

    const isAuthenticated = computed(() => !!token.value);
    const getUserName = computed(() => user.value ? user.value.full_name : null);

    async function initializeAuth() {
        if (token.value && !user.value) {
            try {
                const response = await authService.getCurrentUser();
                console.log(response.data)
                user.value = response.data;
            } catch (err) {
                logout();
            }
        }
    }

    async function loginAction(credentials) {
        isLoading.value = true;
        error.value = null;
        try {
            // Llamar al servicio de autenticación para iniciar sesión
            const data = await authService.login(credentials);

            // Actualizamos el estado del store con la información del usuario y el token
            user.value = data.data.user;
            token.value = localStorage.getItem('token');

            return data;
        } catch (err) {
            error.value = err.response?.data?.message || 'Error al iniciar sesión';
            return err;
        } finally {
            isLoading.value = false;
        }
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

    async function getCurrentUser() {
        if (!token.value) {
            return null;
        }
        try {
            const response = await authService.getCurrentUser();
            user.value = response.data;
            return user.value;
        } catch (err) {
            console.error("Error fetching current user:", err);
            logout();
            return null;
        }
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
        registerStudent,
        registerTutor,
        logout
    };
});
