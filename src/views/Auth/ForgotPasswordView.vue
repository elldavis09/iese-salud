<!-- src/views/ForgotPasswordView.vue -->
<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../../stores/auth.js';
import BaseInput from '../../components/BaseInput.vue';

const store = useAuthStore();
const email = ref('');
const successMsg = ref('');
const { isLoading } = storeToRefs(store);

const handleRecovery = async () => {
  successMsg.value = await store.recoverPasswordAction(email.value);
};
</script>

<template>
  <div class="min-h-[80vh] flex items-center justify-center px-4">
    <div class="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
      <div class="text-center mb-6">
        <div class="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-600">
          <i class="ph ph-lock-open text-3xl"></i>
        </div>
        <h2 class="text-2xl font-bold text-gray-900">Recuperar Acceso</h2>
        <p class="text-gray-500 mt-2 text-sm">Ingresa tu correo y te enviaremos instrucciones.</p>
      </div>

      <div v-if="successMsg" class="bg-green-100 text-green-700 p-4 rounded-lg text-center mb-6">
        <i class="ph ph-check-circle mr-1"></i> {{ successMsg }}
        <div class="mt-2">
          <router-link to="/login" class="text-sm font-bold underline">Volver al login</router-link>
        </div>
      </div>

      <form v-else @submit.prevent="handleRecovery">
        <BaseInput v-model="email" type="email" label="Correo Electrónico" placeholder="tucorreo@ejemplo.com" icon="ph ph-envelope-simple" />

        <button type="submit" :disabled="isLoading"
                class="w-full bg-gray-900 text-white py-2.5 rounded-lg font-semibold hover:bg-gray-800 transition-all disabled:opacity-50">
          {{ isLoading ? 'Enviando...' : 'Enviar Enlace' }}
        </button>

        <div class="mt-4 text-center">
          <router-link to="/login" class="text-sm text-gray-500 hover:text-gray-900">Cancelar y volver</router-link>
        </div>
      </form>
    </div>
  </div>
</template>
