<!-- src/views/RegisterView.vue -->
<script setup>
import {reactive} from 'vue';
import {useRouter} from 'vue-router';
import {storeToRefs} from 'pinia';
import {useAuthStore} from '../../stores/auth.js';

const store = useAuthStore();
const router = useRouter();
const form = reactive({nombres: '', apellidos: '', email: '', password: '', password_confirmation: ''});
const {isLoading, error} = storeToRefs(store);

const handleRegister = async () => {
  if (form.password !== form.password_confirmation) {
    alert("Las contraseñas no coinciden");
    return;
  }
  const payload = {
    nombres: form.nombres,
    apellido: form.apellido,
    email: form.email,
    password: form.password,
    password_confirmation: form.password_confirmation,
  };

  const success = await store.registerAction(payload);

  if (success) router.push('/dashboard');
};
</script>

<template>
  <div class="min-h-[85vh] flex items-center justify-center px-4 bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-12">

    <div class="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-10 relative overflow-hidden">

      <!-- Decoración de fondo sutil -->
      <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-purple-500"></div>

      <!-- Encabezado -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center h-16 w-16 rounded-full bg-indigo-50 mb-4 text-indigo-600">
          <i class="ph ph-user-plus text-4xl"></i>
        </div>
        <h2 class="text-3xl font-extrabold text-gray-900 tracking-tight">Crear Cuenta</h2>
        <p class="text-gray-500 mt-2 text-lg">Únete a nosotros hoy</p>
      </div>

      <!-- Alerta de Error -->
      <transition
          enter-active-class="transition ease-out duration-300"
          enter-from-class="transform -translate-y-2 opacity-0"
          enter-to-class="transform translate-y-0 opacity-100"
      >
        <div v-if="error" class="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg text-sm flex items-start shadow-sm">
          <i class="ph ph-warning-circle text-xl mr-3 mt-0.5 flex-shrink-0"></i>
          <span>{{ error }}</span>
        </div>
      </transition>

      <!-- Formulario -->
      <form @submit.prevent="handleRegister" class="space-y-5">

        <!-- Nombres y Apellidos (Grid para ahorrar espacio vertical) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label for="nombres" class="block text-sm font-semibold text-gray-700 mb-2">Nombre(s)</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="ph ph-user text-gray-400 text-lg"></i>
              </div>
              <input
                  id="nombres"
                  v-model="form.nombres"
                  type="text"
                  required
                  class="block w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm shadow-sm"
                  placeholder="Juan"
              />
            </div>
          </div>
          <div>
            <label for="apellido" class="block text-sm font-semibold text-gray-700 mb-2">Apellido(s)</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="ph ph-identification-badge text-gray-400 text-lg"></i>
              </div>
              <input
                  id="apellido"
                  v-model="form.apellido"
                  type="text"
                  required
                  class="block w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm shadow-sm"
                  placeholder="Pérez"
              />
            </div>
          </div>
        </div>

        <!-- Input Email -->
        <div>
          <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">Correo Electrónico</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i class="ph ph-envelope-simple text-gray-400 text-xl"></i>
            </div>
            <input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm shadow-sm"
                placeholder="tucorreo@ejemplo.com"
            />
          </div>
        </div>

        <!-- Password -->
        <div>
          <label for="password" class="block text-sm font-semibold text-gray-700 mb-2">Contraseña</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i class="ph ph-lock-key text-gray-400 text-xl"></i>
            </div>
            <input
                id="password"
                v-model="form.password"
                type="password"
                required
                class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm shadow-sm"
                placeholder="••••••••"
            />
          </div>
        </div>

        <!-- Password Confirmation -->
        <div>
          <label for="password_confirmation" class="block text-sm font-semibold text-gray-700 mb-2">Confirmar Contraseña</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i class="ph ph-check-circle text-gray-400 text-xl"></i>
            </div>
            <input
                id="password_confirmation"
                v-model="form.password_confirmation"
                type="password"
                required
                class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm shadow-sm"
                placeholder="••••••••"
            />
          </div>
        </div>

        <!-- Botón Submit -->
        <button
            type="submit"
            :disabled="isLoading"
            class="w-full relative flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.98] mt-6"
        >
          <span v-if="isLoading" class="absolute left-4 flex items-center">
            <i class="ph ph-spinner animate-spin text-xl"></i>
          </span>
          {{ isLoading ? 'Procesando...' : 'Registrarse' }}
        </button>
      </form>

      <!-- Footer / Login -->
      <div class="mt-8 text-center">
        <p class="text-sm text-gray-600">
          ¿Ya tienes cuenta?
          <router-link to="/login" class="font-bold text-indigo-600 hover:text-indigo-800 transition-colors ml-1 hover:underline">
            Inicia Sesión
          </router-link>
        </p>
      </div>

    </div>
  </div>
</template>

<style scoped>
input {
  transition: border-color 0.2s, box-shadow 0.2s;
}
</style>