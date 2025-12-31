import { defineStore } from 'pinia';
import { ref } from 'vue';
import {NotificationTypes as notificationTypes} from "@/util/notificationTypes.js";

export const useNotificationStore = defineStore('notification', () => {
    const show = ref(false);
    const message = ref('');
    const type = ref(notificationTypes.success);
    const title = ref('');
    let timeout = null;

    const triggerToast = (msg, msgType = notificationTypes.success, msgTitle = '') => {
        // Si ya hay una, la limpiamos primero para reiniciar el timer
        if (timeout) clearTimeout(timeout);

        message.value = msg;
        type.value = msgType;
        title.value = msgTitle;
        show.value = true;

        // Auto-ocultar después de 4 segundos
        timeout = setTimeout(() => {
            show.value = false;
        }, 4000);
    };

    const closeToast = () => {
        show.value = false;
        if (timeout) clearTimeout(timeout);
    };

    return { show, message, type, title, triggerToast, closeToast };
});