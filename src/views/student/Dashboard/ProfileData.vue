<script setup>
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();
const user = authStore.user;

</script>

<template>
    <div>
        <div class="border-b border-gray-100 bg-white px-6 py-6 sm:px-8 sm:py-7">
            <div class="flex flex-col gap-3">
                <div>
                    <h2 class="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900">
                        Perfil de Usuario
                    </h2>
                </div>
            </div>
        </div>

        <div class="p-6 sm:p-8">
            <!-- Columna  -->
            <div class="flex flex-col gap-6 md:flex-row">
                <!-- Imagen de perfil / Placeholder -->
                <div class="flex  items-center gap-4">
                    <div class="h-24 w-24 rounded-full bg-gray-200"></div>
                </div>
            </div>
            <!-- Información del usuario -->
            <div class="flex flex-col gap-2">
                <h3 class="text-lg font-semibold text-gray-900">{{ user.full_name }}</h3>
                <p class="text-gray-600"><strong>Email:</strong> {{ user.email }}</p>
                <p class="text-gray-600"><strong>Rol:</strong> {{ user.rol.nombre }}</p>
            </div>
            <!-- Boton para modificar perfil -->
            <div class="flex items-center gap-4">
                <button
                    class="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Modificar Perfil
                </button>
            </div>
        </div>
    </div>

</template>