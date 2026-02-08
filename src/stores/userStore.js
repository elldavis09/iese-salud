import {defineStore} from "pinia";
import {ref} from "vue";
import {fetchUser as fetchUserUseCase} from "@/usecases/auth/fetchUser.js";

export const userStore = defineStore('userStore', () => {
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
            // const data = await userService.getUser();
            const data = await fetchUserUseCase();
            messages.value = data.message;
            user.value = data;
            role.value = data?.rol?.nombre || 'student';
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