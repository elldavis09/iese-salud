<script setup>
const props = defineProps({
  student: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['viewDetails']);
const viewDetails = () => {
  emit('viewDetails', props.student);
};

const isActive = (activo) => {
  switch (activo) {
    case 1:
      return 'Activo';
    case 0:
      return 'Inactivo';
    default:
      return 'Desconocido';
  }
}

</script>

<template>
  <!-- Row 1 -->
  <tr
      @click="viewDetails"
      class="hover:bg-gray-50 dark:hover:bg-[#2d3a4b] transition-colors">
    <td class="px-6 py-4">
      <div class="flex items-center gap-3">
        <div
            class="size-8 rounded-full bg-blue-100 flex items-center justify-center text-primary font-bold text-xs overflow-hidden">
          <img class="w-full h-full object-cover" data-alt="Student profile avatar"
               src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0wdQKGlP52AlD9fAg-hIjAD1718XK6PfVVajDVvl6FJUCw-2C-8eA72of3zf7Uj-JfnKHujmQjy-cMHXdEgrlBNHwgXlEjhVlnayFCL1MeU4cSyOTgeu1B3IOEuBitPOX4vQr5LrL4KpAc_s_DTbW8MgRwQnwZlNXs4XofEMjCiujss7MEc40C4sFiFmMvTST7hNMrSqxjjgf4EJ0kTAw9HdtWLOoKDIEr9ObKO-ka3y7rbQ_uqhv36PCPBhJTD1zU7GIq0r-0bg"/>
        </div>
        <span class="text-sm font-medium">{{ student.full_name }}</span>
      </div>
    </td>
    <td class="px-6 py-4 text-sm text-[#617289] dark:text-gray-400">{{student.email}}</td>
    <td class="px-6 py-4">
      <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">{{isActive(student.activo)}}</span>
    </td>
    <td class="px-6 py-4">
      <button
          @click.stop = "viewDetails"
          class="text-primary hover:underline text-xs font-bold">Ver Detalles</button>
    </td>
  </tr>
</template>

<style scoped>

</style>