<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import FooterSection from "@/components/SideMenu/FooterSection.vue";

const router = useRouter();
const route = useRoute();

// Estado para colapsar/expandir el sidebar
const isCollapsed = ref(false);

// Estado para controlar qué submenús están abiertos
const expandedMenus = ref({});

// Opciones del menú adaptadas con ejemplos de badges y submenús para igualar el diseño
const menuOptions = ref([
  {
    name: 'Dashboard',
    icon: 'home',
    path: '/student/dashboard/home'
  },
  {
    name: 'Mis Formularios',
    icon: 'assignment',
    path: '/student/dashboard/forms',
    badges: [
      { text: '8', colorClass: 'bg-[#A3E6CD] text-[#1E3A2F]' }
    ]
  },
  {
    name: 'Mi Perfil',
    icon: 'person',
    // Usamos 'value' para identificar el menú al expandir
    value: 'profile',
    children: [
      { name: 'Datos Personales', path: '/student/dashboard/profile/data' },
      { name: 'Documentos', path: '/student/dashboard/profile/docs' }
    ]
  },
  {
    name: 'Configuración',
    icon: 'settings',
    path: '/student/dashboard/settings',
    badges: [
      { text: '+', colorClass: 'bg-[#2B2D31] text-gray-300' },
      { text: '3', colorClass: 'bg-[#FFCBB3] text-[#4A2B1D]' }
    ]
  },
]);

const emit = defineEmits(['logout', 'toggle-collapse']);

const handleToggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
  emit('toggle-collapse', isCollapsed.value);
};

const handleLogout = () => emit('logout');

// Verifica si la ruta actual coincide con la del item
const isActive = (path) => route.path === path;

const handleMenuItemClick = (option) => {
  if (option.children) {
    // Si tiene submenú, alterna su estado abierto/cerrado
    expandedMenus.value[option.value] = !expandedMenus.value[option.value];
    // Si se colapsó el sidebar, lo expandimos automáticamente al tocar un menú con hijos
    if (isCollapsed.value) isCollapsed.value = false;
  } else if (option.path) {
    // Si es un enlace normal, navega
    router.push(option.path);
  }
};
</script>

<template>
  <aside
    class="fixed left-0 top-0 h-full z-50 bg-[#1A1C1F] text-gray-300 transition-all duration-300 ease-in-out border-r border-[#2B2D31]"
    :class="isCollapsed ? 'w-[88px]' : 'w-[280px]'">
    <button @click="handleToggleCollapse"
      class="absolute -right-4 top-8 w-8 h-8 rounded-full bg-[#2B2D31] flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#3f4247] transition-colors shadow-lg z-50 outline-none">
      <span class="material-symbols-outlined text-[18px]">
        {{ isCollapsed ? 'chevron_right' : 'chevron_left' }}
      </span>
    </button>

    <div class="h-full flex flex-col relative overflow-hidden">
      <header class="px-6 pt-8 pb-6 flex items-center">
        <div
          class="w-12 h-12 rounded-[14px] bg-white flex items-center justify-center shadow-md mx-auto transition-all duration-300"
          :class="isCollapsed ? 'scale-90' : 'ml-0'">
          <div class="w-5 h-5 rounded-full border-[4px] border-[#1A1C1F] flex items-center justify-center">
            <div class="w-1.5 h-1.5 rounded-full bg-[#1A1C1F]"></div>
          </div>
        </div>
      </header>

      <nav class="flex-1 px-4 py-2 overflow-y-auto no-scrollbar">
        <ul class="space-y-1.5">
          <li v-for="option in menuOptions" :key="option.name" class="flex flex-col">

            <button @click="handleMenuItemClick(option)"
              class="w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all duration-200 outline-none group"
              :class="[
                (option.path && isActive(option.path)) || expandedMenus[option.value]
                  ? 'bg-[#2B2D31] text-white shadow-sm'
                  : 'text-gray-400 hover:bg-[#2B2D31]/50 hover:text-gray-100'
              ]">
              <div class="flex items-center gap-4">
                <span class="material-symbols-outlined text-[24px] transition-colors"
                  :class="(option.path && isActive(option.path)) || expandedMenus[option.value] ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'">
                  {{ option.icon }}
                </span>

                <span v-if="!isCollapsed" class="text-[15px] font-medium tracking-wide whitespace-nowrap">
                  {{ option.name }}
                </span>
              </div>

              <div v-if="!isCollapsed" class="flex items-center gap-2">
                <template v-if="option.badges">
                  <span v-for="(badge, idx) in option.badges" :key="idx"
                    class="px-2 py-0.5 rounded-md text-xs font-bold" :class="badge.colorClass">
                    {{ badge.text }}
                  </span>
                </template>

                <span v-if="option.children"
                  class="material-symbols-outlined text-[20px] transition-transform duration-200"
                  :class="expandedMenus[option.value] ? 'rotate-180' : ''">
                  expand_more
                </span>
              </div>
            </button>

            <div v-show="!isCollapsed && option.children && expandedMenus[option.value]"
              class="mt-1 mb-2 ml-7 pl-4 border-l-2 border-[#2B2D31]">
              <ul class="space-y-1">
                <li v-for="child in option.children" :key="child.name">
                  <button @click="router.push(child.path)"
                    class="w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors outline-none group"
                    :class="[
                      isActive(child.path)
                        ? 'bg-[#2B2D31] text-white'
                        : 'text-gray-400 hover:text-gray-200 hover:bg-[#2B2D31]/30'
                    ]">
                    <span class="text-[14px] font-medium">{{ child.name }}</span>

                    <span v-if="isActive(child.path)" class="material-symbols-outlined text-[18px] text-gray-300">
                      chevron_right
                    </span>
                  </button>
                </li>
              </ul>
            </div>

          </li>
        </ul>
      </nav>

      <div class="p-4" :class="isCollapsed ? 'opacity-0 pointer-events-none hidden' : 'opacity-100'">
        <div class="p-4 mb-4 mt-auto">
          <button @click="handleLogout"
            class="flex items-center gap-4 px-4 py-3 w-full text-sidebar-text hover:text-white hover:bg-sidebar-hover/50 rounded-xl transition-all duration-200 outline-none">
            <span class="material-symbols-outlined text-[22px]">logout</span>
            <span class="font-medium text-sm tracking-wide">Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
/* Utilidad para esconder el scrollbar pero mantener el scroll (opcional) */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>