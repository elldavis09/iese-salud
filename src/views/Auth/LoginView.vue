<script setup>
import {onMounted, reactive} from 'vue';
import {useRouter} from 'vue-router';
import {storeToRefs} from 'pinia';
import {useAuthStore} from '@/stores/auth.js';
import {useUserStore} from "@/stores/user.js";
import {routes} from "@/router/routes.js";

const auth = useAuthStore();
const user = useUserStore();
const router = useRouter();

const form = reactive({email: '', password: ''});
const {isLoading, error} = storeToRefs(auth);
const showPassword = reactive(false);

const handleSubmit = async () => {
  const success = await auth.loginAction(form.email, form.password);
  if (success) {
    await user.fetchUserData();
    if (user.role === 'tutor') {
      router.push(routes.tutorDashboard);
    } else {
      router.push(routes.studentDashboard);
    }
  }
};

</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden px-4">
    
    <div class="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

    <div class="bg-white p-8 md:p-10 rounded-3xl shadow-xl w-full max-w-md relative z-10 border border-white/50 backdrop-blur-sm">
      
      <div class="text-center mb-8">
        <div class="flex justify-center mb-6">
           <img
              class="h-16 w-auto object-contain hover:scale-105 transition-transform duration-300"
              src="https://www.iese.edu.mx/wp-content/uploads/2024/02/logo.png"
              alt="Logo IESE"
          />
        </div>
        <h2 class="text-3xl font-extrabold text-slate-900 tracking-tight">Bienvenido de nuevo</h2>
        <p class="text-slate-500 mt-2 text-sm">
          Ingresa tus credenciales para acceder al portal.
        </p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        
        <div class="space-y-1.5">
          <label class="text-sm font-bold text-slate-700 ml-1">Correo Electrónico</label>
          <div class="relative group">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i class="ph ph-envelope-simple text-slate-400 text-xl group-focus-within:text-indigo-500 transition-colors"></i>
            </div>
            <input
              v-model="form.email"
              type="email"
              required
              class="block w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
              placeholder="nombre@ejemplo.com"
            />
          </div>
        </div>

        <div class="space-y-1.5">
          <div class="flex justify-between items-center ml-1">
            <label class="text-sm font-bold text-slate-700">Contraseña</label>
            <a href="#" class="text-xs font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <div class="relative group">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i class="ph ph-lock-key text-slate-400 text-xl group-focus-within:text-indigo-500 transition-colors"></i>
            </div>
            <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              required
              class="block w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
              placeholder="••••••••"
            />
            <button 
              type="button"
              @click="showPassword = !showPassword"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
            >
              <i :class="showPassword ? 'ph ph-eye-slash' : 'ph ph-eye'" class="text-xl"></i>
            </button>
          </div>
        </div>

        <div v-if="error" class="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm flex items-center gap-2 animate-shake">
          <i class="ph ph-warning-circle text-lg shrink-0"></i>
          <span>{{ error }}</span>
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-indigo-200 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 transform hover:-translate-y-0.5"
        >
          <span v-if="isLoading" class="flex items-center gap-2">
            <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Procesando...
          </span>
          <span v-else class="flex items-center gap-2">
            Iniciar Sesión
            <i class="ph ph-arrow-right font-bold"></i>
          </span>
        </button>
      </form>

      <div class="mt-8 text-center border-t border-slate-100 pt-6">
        <p class="text-sm text-slate-500">
          ¿No tienes una cuenta?
          <router-link to="/register" class="font-bold text-indigo-600 hover:text-indigo-500 transition-colors">
            Regístrate aquí
          </router-link>
        </p>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* Animación simple para el error */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}
.animate-shake {
  animation: shake 0.3s ease-in-out;
}

/* Animación opcional para el fondo (Blobs) */
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}
.animate-blob {
  animation: blob 7s infinite;
}
.animation-delay-2000 {
  animation-delay: 2s;
}
</style>

<style scoped>
input {
  transition: border-color 0.2s, box-shadow 0.2s;
}
</style>