<!-- src/components/NavBar.vue -->
<script setup>
import {useRouter} from 'vue-router';
import {useAuthStore} from '../stores/auth.js';

const store = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  store.logout();
  router.push('/login');
};
</script>

<template>
  <nav class="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50 transition-all duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">

        <div class="flex-shrink-0 flex items-center cursor-pointer group" @click="router.push('/')">
          <img
              class="h-10 w-auto sm:h-12 transition-transform group-hover:scale-105 duration-300 object-contain"
              src="https://www.iese.edu.mx/wp-content/uploads/2024/02/logo.png"
              alt="Logo IESE"
          />
        </div>

        <div class="hidden md:flex items-center gap-4">

          <template v-if="!store.isAuthenticated">
            <router-link
              to="/login"
              class="text-gray-600 hover:text-indigo-600 font-bold px-5 py-2.5 rounded-xl hover:bg-indigo-50 transition-all duration-200"
            >
              Ingresar
            </router-link>
            <router-link
              to="/register"
              class="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-md shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
            >
              <span>Crear Cuenta</span>
              <i class="ph ph-arrow-right font-bold"></i>
            </router-link>
          </template>

          <template v-else>
            <div class="flex items-center gap-3 pl-2 pr-2 py-1.5 bg-slate-50 border border-gray-200 rounded-xl">
              
              <div class="h-9 w-9 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm border border-indigo-200/50">
                {{ store.user?.email?.charAt(0).toUpperCase() || 'U' }}
              </div>

              <div class="flex flex-col pr-2">
                <span class="text-sm font-bold text-gray-800 leading-none">
                  {{ store.user?.name || 'Usuario' }}
                </span>
                <span class="text-[11px] text-gray-500 font-medium leading-tight mt-0.5">
                  {{ store.user?.email }}
                </span>
              </div>

              <div class="h-6 w-px bg-gray-200 mx-1"></div>

              <button
                @click="handleLogout"
                class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 group"
                title="Cerrar Sesión"
              >
                <i class="ph ph-sign-out text-xl group-hover:scale-110 transition-transform"></i>
              </button>
            </div>
          </template>
        </div>

        <div class="flex items-center md:hidden">
          <button
              @click="isMobileMenuOpen = !isMobileMenuOpen"
              class="inline-flex items-center justify-center p-2.5 rounded-xl text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors border border-transparent hover:border-indigo-100"
          >
            <span class="sr-only">Abrir menú</span>
            <i :class="isMobileMenuOpen ? 'ph ph-x' : 'ph ph-list'" class="text-2xl"></i>
          </button>
        </div>
      </div>
    </div>

    <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="transform -translate-y-2 opacity-0"
        enter-to-class="transform translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="transform translate-y-0 opacity-100"
        leave-to-class="transform -translate-y-2 opacity-0"
    >
      <div v-show="isMobileMenuOpen" class="md:hidden bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-xl absolute w-full z-40">
        <div class="px-4 py-6 space-y-3">

          <template v-if="!store.isAuthenticated">
            <router-link
              to="/login"
              class="flex items-center justify-center w-full px-4 py-3 rounded-xl font-bold text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 border border-gray-200 transition-all"
              @click="isMobileMenuOpen = false"
            >
              Ingresar
            </router-link>
            <router-link
              to="/register"
              class="flex items-center justify-center w-full px-4 py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all"
              @click="isMobileMenuOpen = false"
            >
              Crear Cuenta Nueva
            </router-link>
          </template>

          <template v-else>
            <div class="bg-slate-50 rounded-2xl p-4 border border-gray-100 flex items-center gap-4 mb-4">
              <div class="h-12 w-12 rounded-xl bg-white border border-indigo-100 shadow-sm flex items-center justify-center text-indigo-600 text-lg font-bold">
                {{ store.user?.email?.charAt(0).toUpperCase() }}
              </div>
              <div class="overflow-hidden">
                <p class="text-base font-bold text-gray-900 truncate">{{ store.user?.name || 'Hola!' }}</p>
                <p class="text-sm text-gray-500 truncate">{{ store.user?.email }}</p>
              </div>
            </div>

            <button
              @click="handleLogout"
              class="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-bold text-red-600 bg-red-50 hover:bg-red-100 transition-colors border border-red-100"
            >
              <i class="ph ph-sign-out text-xl"></i>
              Cerrar Sesión
            </button>
          </template>

        </div>
      </div>
    </transition>
  </nav>
</template>