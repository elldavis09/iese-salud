import {defineStore} from "pinia";
import {ref} from "vue";
import userService from "@/services/userService.js";

export const useUserStore = defineStore('user', () => {
    const user = ref(null);
    const role = ref('student');
    const isLoading = ref(false);
    const error = ref(null);
    const messages = ref(null);

    async function fetchUserData() {
        isLoading.value = true;
        error.value = null;
        messages.value = null;
        try {
            const data = await userService.getUser();
            messages.value = data.message;
            user.value = data.data;
            role.value = data.data?.rol?.nombre || 'student';
        } catch (err) {
            error.value = err.message || "Error al cargar los datos del usuario.";
        } finally {
            isLoading.value = false;
        }
    }

    return {
        user,
        role,
        isLoading,
        error,
        messages,
        fetchUserData
    };
});