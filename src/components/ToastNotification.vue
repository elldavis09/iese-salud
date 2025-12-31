<script setup>
import { useNotificationStore } from '@/stores/notification';
import { computed } from 'vue';
import {NotificationTypes as notificationTypes} from "@/util/notificationTypes.js";

const store = useNotificationStore();

const styles = computed(() => {
  switch (store.type) {
    case notificationTypes.success:
      return {
        icon: 'ph-check-circle',
        bgIcon: 'bg-emerald-100 text-emerald-600',
        border: 'border-l-4 border-emerald-500',
        titleColor: 'text-emerald-800'
      };
    case notificationTypes.error:
      return {
        icon: 'ph-warning-circle',
        bgIcon: 'bg-red-100 text-red-600',
        border: 'border-l-4 border-red-500',
        titleColor: 'text-red-800'
      };
    case notificationTypes.warning:
      return {
        icon: 'ph-warning',
        bgIcon: 'bg-amber-100 text-amber-600',
        border: 'border-l-4 border-amber-500',
        titleColor: 'text-amber-800'
      };
    default: // info
      return {
        icon: 'ph-info',
        bgIcon: 'bg-blue-100 text-blue-600',
        border: 'border-l-4 border-blue-500',
        titleColor: 'text-blue-800'
      };
  }
});
</script>

<template>
  <Teleport to="body">
    <Transition
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
    >
      <div
          v-if="store.show"
          class="fixed top-4 right-4 z-[9999] flex w-full max-w-sm overflow-hidden bg-white rounded-xl shadow-xl ring-1 ring-black ring-opacity-5"
          :class="styles.border"
      >
        <div class="p-4 flex items-start gap-4 w-full">

          <div class="flex-shrink-0">
            <div class="w-10 h-10 rounded-full flex items-center justify-center" :class="styles.bgIcon">
              <i :class="['ph text-xl', styles.icon]"></i>
            </div>
          </div>

          <div class="flex-1 pt-0.5 w-0">
            <p v-if="store.title" class="text-sm font-bold mb-0.5" :class="styles.titleColor">
              {{ store.title }}
            </p>
            <p class="text-sm font-medium text-gray-600 leading-tight">
              {{ store.message }}
            </p>
          </div>

          <div class="flex-shrink-0 flex pt-0.5 ml-4">
            <button
                @click="store.closeToast()"
                class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span class="sr-only">Cerrar</span>
              <i class="ph ph-x text-lg"></i>
            </button>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>