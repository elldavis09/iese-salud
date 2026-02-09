<script setup>
import {onMounted} from "vue";
import {storeToRefs} from "pinia";
import {tutorDetailStudentStore} from "@/stores/tutor/TutorDetailStudentStore.js";


// Desestructuramos el store para obtener solo lo necesario
const tutorDetailStudentStr = tutorDetailStudentStore();
const {fetchDataStudentById} = tutorDetailStudentStr
const {userData, isLoading, error} = storeToRefs(tutorDetailStudentStr);
const {fetchFormsFromUser} = tutorDetailStudentStr;
const {forms, formsIsLoading, formsError} = storeToRefs(tutorDetailStudentStr);

const emit = defineEmits(['handledTestClick']);
const props = defineProps(
    {
      selectedGroupId: {
        type: Number,
        required: true
      },
      selectedStudentId: {
        type: Number,
        required: true
      }
    }
);

const getStatusLabel = (status) => {
  if (status === 0) {
    return 'pending';
  } else {
    return 'completed';
  }
};

const handleTestClick = (test) => {
  emit('handledTestClick', test);
};

const getRol = (rolId) => {
  switch (rolId) {
    case 1:
      return 'Administrador';
    case 2:
      return 'Tutor';
    case 3:
      return 'Estudiante';
    default:
      return 'Desconocido';
  }
};

onMounted(() => {
  fetchDataStudentById(props.selectedGroupId, props.selectedStudentId);
  fetchFormsFromUser(props.selectedStudentId)
});
</script>

<template>
  <div class="flex-1 px-4 lg:px-10 py-8 max-w-[1440px] mx-auto w-full">
    <!-- Profile Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <!-- Sidebar: Student Info -->
      <aside class="lg:col-span-4 flex flex-col gap-6">
        <div
            class="bg-white dark:bg-[#1a242f] p-8 rounded-xl shadow-sm border border-[#e5e7eb] dark:border-[#2a333c] flex flex-col items-center text-center">
          <div class="relative mb-6">
            <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-32 ring-4 ring-primary/10"
                 data-alt="Student profile photograph showing a young person"
                 style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuC4yO7luCUyk9Lwu9rvIvkDzGe7omuPqck2VfiMUqcrbphiFPAf7S2BI7JKrM9dqh1q0p1Rzz4vdRSbN8YqufRWtIZbzkS7fCZtg_87KVaOAhSQ6wqdKh0Cs-Bwp3rf0M2MabPA0MXqScl2IFiKDPGay1E5X9QMLczHyk1Gn1X4bZm-Pp5a9UIZeLhDTE6mbdyPPQjN_6k71OdRFeLooQBuzeYl5DVQID-Q3SlIQVK_RuC2PW-SL4xfqM7QRaG0P177W58dDNHfbyc");'></div>
            <span v-if="!userData?.activo"
                  class="absolute bottom-1 right-1 size-6 bg-red-500 border-2 border-white dark:border-[#1a242f] rounded-full"></span>
            <span v-else
                  class="absolute bottom-1 right-1 size-6 bg-green-500 border-2 border-white dark:border-[#1a242f] rounded-full"></span>
          </div>
          <h3 class="text-2xl font-bold mb-1">{{ userData?.full_name || 'Estudiante Desconocido' }}</h3>
          <p class="text-primary font-medium text-sm mb-6">ID: #{{ userData?.id }}</p>
          <div class="w-full space-y-4 pt-6 border-t border-[#f0f2f4] dark:border-[#2a333c]">
            <div class="flex items-center gap-3 text-left">
              <div class="p-2 bg-primary/10 rounded-lg text-primary">
                <span class="material-symbols-outlined">email</span>
              </div>
              <div>
                <p class="text-xs text-[#617289] dark:text-gray-400">Correo Electrónico</p>
                <p class="text-sm font-medium">{{ userData?.email || 'Sin correo registrado' }}</p>
              </div>
            </div>
            <div class="flex items-center gap-3 text-left">
              <div class="p-2 bg-primary/10 rounded-lg text-primary">
                <span class="material-symbols-outlined">group</span>
              </div>
              <div>
                <p class="text-xs text-[#617289] dark:text-gray-400">Rol</p>
                <p class="text-sm font-medium">{{ getRol(userData?.rol?.id) }}</p>
              </div>
            </div>
            <div class="flex items-center gap-3 text-left">
              <div class="p-2 bg-primary/10 rounded-lg text-primary">
                <span class="material-symbols-outlined">cake</span>
              </div>
              <div>
                <p class="text-xs text-[#617289] dark:text-gray-400">Edad</p>
                <p class="text-sm font-medium">{{ userData?.age ?? 'No disponible' }}</p>
              </div>
            </div>
            <div class="flex items-center gap-3 text-left">
              <div class="p-2 bg-primary/10 rounded-lg text-primary">
                <span class="material-symbols-outlined">calendar_today</span>
              </div>
              <div>
                <p class="text-xs text-[#617289] dark:text-gray-400">Fecha de Ingreso</p>
                <p class="text-sm font-medium">{{ userData?.birthdate ?? 'No disponible' }}</p>
              </div>
            </div>
          </div>
          <button
              class="mt-8 w-full py-2.5 px-4 rounded-lg bg-[#f0f2f4] dark:bg-[#2a333c] text-[#111418] dark:text-white text-sm font-bold hover:bg-gray-200 transition-colors">
            Editar Datos Personales
          </button>
        </div>
        <!-- Mini Stats Card -->
        <div class="bg-white dark:bg-[#1a242f] p-6 rounded-xl shadow-sm border border-[#e5e7eb] dark:border-[#2a333c]">
          <h4 class="font-bold mb-4">Resumen de Actividad</h4>
          <div class="grid grid-cols-2 gap-4">
            <div class="p-4 bg-background-light dark:bg-background-dark rounded-lg">
              <p class="text-2xl font-bold text-primary">12</p>
              <p class="text-[10px] uppercase font-bold text-[#617289]">Tests Realizados</p>
            </div>
            <div class="p-4 bg-background-light dark:bg-background-dark rounded-lg">
              <p class="text-2xl font-bold text-primary">8.5</p>
              <p class="text-[10px] uppercase font-bold text-[#617289]">Promedio General</p>
            </div>
          </div>
        </div>
      </aside>
      <!-- Main Content Area -->
      <div class="lg:col-span-8 flex flex-col gap-8">
        <!-- Top Section: Radar Chart & Metrics -->
        <div class="bg-white dark:bg-[#1a242f] p-8 rounded-xl shadow-sm border border-[#e5e7eb] dark:border-[#2a333c]">
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h3 class="text-xl font-bold">Habilidades y Competencias</h3>
              <p class="text-sm text-[#617289] dark:text-gray-400">Resultados del último test de
                evaluación diagnóstica</p>
            </div>
            <div
                class="flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-bold">
              <span class="material-symbols-outlined text-sm">trending_up</span>
              +5% vs mes anterior
            </div>
          </div>
          <div class="flex flex-col lg:flex-row items-center gap-12">
            <!-- Radar Chart Visualization -->
            <div class="relative w-full max-w-[340px] aspect-square flex items-center justify-center p-4">
              <svg class="w-full h-full transform -rotate-18" viewbox="0 0 200 200">
                <!-- Pentagon Grid -->
                <polygon fill="none" points="100,20 176,75 147,165 53,165 24,75" stroke="#e5e7eb"
                         stroke-width="1"></polygon>
                <polygon fill="none" points="100,40 157,81 135,148 65,148 43,81" stroke="#e5e7eb"
                         stroke-width="1"></polygon>
                <polygon fill="none" points="100,60 138,87 123,131 77,131 62,87" stroke="#e5e7eb"
                         stroke-width="1"></polygon>
                <polygon fill="none" points="100,80 119,94 111,114 89,114 81,94" stroke="#e5e7eb"
                         stroke-width="1"></polygon>
                <!-- Axes -->
                <line stroke="#e5e7eb" x1="100" x2="100" y1="20" y2="100"></line>
                <line stroke="#e5e7eb" x1="176" x2="100" y1="75" y2="100"></line>
                <line stroke="#e5e7eb" x1="147" x2="100" y1="165" y2="100"></line>
                <line stroke="#e5e7eb" x1="53" x2="100" y1="165" y2="100"></line>
                <line stroke="#e5e7eb" x1="24" x2="100" y1="75" y2="100"></line>
                <!-- The Data Shape (Radar) -->
                <!-- Points calculated based on mock scores (0-100) -->
                <polygon fill="rgba(19, 109, 236, 0.2)" points="100,35 160,80 130,150 70,160 40,90"
                         stroke="#136dec" stroke-width="2"></polygon>
                <!-- Vertices Points -->
                <circle cx="100" cy="35" fill="#136dec" r="3"></circle>
                <circle cx="160" cy="80" fill="#136dec" r="3"></circle>
                <circle cx="130" cy="150" fill="#136dec" r="3"></circle>
                <circle cx="70" cy="160" fill="#136dec" r="3"></circle>
                <circle cx="40" cy="90" fill="#136dec" r="3"></circle>
              </svg>
              <!-- Labels -->
              <div class="absolute top-0 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase text-[#617289]">
                Liderazgo
              </div>
              <div class="absolute top-1/3 -right-6 text-[10px] font-bold uppercase text-[#617289]">
                Análisis
              </div>
              <div class="absolute bottom-4 right-4 text-[10px] font-bold uppercase text-[#617289]">
                Empatía
              </div>
              <div class="absolute bottom-4 left-4 text-[10px] font-bold uppercase text-[#617289]">
                Esfuerzo
              </div>
              <div class="absolute top-1/3 -left-10 text-[10px] font-bold uppercase text-[#617289]">
                Creatividad
              </div>
            </div>
            <!-- Competency List -->
            <div class="flex-1 w-full space-y-5">
              <div class="space-y-2">
                <div class="flex justify-between text-sm">
                  <span class="font-medium">Liderazgo</span>
                  <span class="text-primary font-bold">8.2</span>
                </div>
                <div class="w-full bg-[#f0f2f4] dark:bg-[#2a333c] h-2 rounded-full overflow-hidden">
                  <div class="bg-primary h-full w-[82%]"></div>
                </div>
              </div>
              <div class="space-y-2">
                <div class="flex justify-between text-sm">
                  <span class="font-medium">Análisis Crítico</span>
                  <span class="text-primary font-bold">7.5</span>
                </div>
                <div class="w-full bg-[#f0f2f4] dark:bg-[#2a333c] h-2 rounded-full overflow-hidden">
                  <div class="bg-primary h-full w-[75%]"></div>
                </div>
              </div>
              <div class="space-y-2">
                <div class="flex justify-between text-sm">
                  <span class="font-medium">Empatía y Colaboración</span>
                  <span class="text-primary font-bold">9.0</span>
                </div>
                <div class="w-full bg-[#f0f2f4] dark:bg-[#2a333c] h-2 rounded-full overflow-hidden">
                  <div class="bg-primary h-full w-[90%]"></div>
                </div>
              </div>
              <div class="space-y-2">
                <div class="flex justify-between text-sm">
                  <span class="font-medium">Creatividad</span>
                  <span class="text-primary font-bold">6.8</span>
                </div>
                <div class="w-full bg-[#f0f2f4] dark:bg-[#2a333c] h-2 rounded-full overflow-hidden">
                  <div class="bg-primary h-full w-[68%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Bottom Section: Form History List -->
        <div
            class="bg-white dark:bg-[#1a242f] rounded-xl shadow-sm border border-[#e5e7eb] dark:border-[#2a333c] overflow-hidden">
          <!-- Table Header -->
          <div
              class="px-8 py-6 border-b border-[#f0f2f4] dark:border-[#2a333c] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 class="text-xl font-bold">Historial de Formularios</h3>
            <div class="flex gap-2">
              <select
                  class="form-select bg-[#f0f2f4] dark:bg-[#2a333c] border-none rounded-lg text-sm px-4 focus:ring-primary h-9">
                <option>Todos los tests</option>
                <option>Evaluación Inicial</option>
                <option>Psicométrico</option>
              </select>
            </div>
          </div>
          <!-- Table -->
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead class="bg-[#f9fafb] dark:bg-[#242d38] border-b border-[#f0f2f4] dark:border-[#2a333c]">
              <tr>
                <th class="px-8 py-4 text-xs font-bold uppercase tracking-wider text-[#617289]">
                  Nombre del Formulario
                </th>
                <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#617289]">
                  Fecha
                </th>
                <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#617289]">
                  Intentos
                </th>
                <th class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#617289] text-right">
                  Acción
                </th>
              </tr>
              </thead>
              <tbody class="divide-y divide-[#f0f2f4] dark:divide-[#2a333c]">
              <!-- Elemento de formulario individual -->
              <tr
                  v-for="test in forms"
                  :key="test.id"
                  @click="handleTestClick(test)"
                  class="hover:bg-gray-50 dark:hover:bg-[#242d38] transition-colors">
                <td class="px-8 py-4">
                  <div class="flex items-center gap-3">
                    <span class="material-symbols-outlined text-primary">assignment</span>
                    <span class="font-medium">{{ test.nombre }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 text-sm text-[#617289] dark:text-gray-400">12 Oct 2023</td>
                <td class="px-6 py-4">
                  <span
                      class="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded text-xs font-bold">{{ test.intentos_count }}</span>
                </td>
                <td class="px-6 py-4 text-right">
                  <button
                      class="text-primary font-bold text-sm hover:underline flex items-center gap-1 justify-end ml-auto">
                    Ver respuestas <span
                      class="material-symbols-outlined text-sm">open_in_new</span>
                  </button>
                </td>
              </tr>

              </tbody>
            </table>
          </div>
          <div
              class="px-8 py-4 bg-[#f9fafb] dark:bg-[#242d38] border-t border-[#f0f2f4] dark:border-[#2a333c] flex justify-center">
            <button class="text-sm font-bold text-[#617289] hover:text-primary transition-colors">Cargar
              más formularios
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>