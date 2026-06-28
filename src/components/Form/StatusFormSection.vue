<script setup>
const props = defineProps({
  status: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="flex-shrink-0">
    <span
        class="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm ring-1 ring-inset transition-all"
        :class="status? 'bg-teal-50 text-teal-700 ring-teal-600/20'
        : 'bg-rose-50 text-rose-700 ring-rose-600/20'">
      <span class="relative flex h-2.5 w-2.5 mr-2">
      <span class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
            :class="status ? 'bg-teal-400' : 'bg-rose-400'"></span>
      <span class="relative inline-flex rounded-full h-2.5 w-2.5"
            :class="status ? 'bg-teal-600' : 'bg-rose-500'"></span>
      </span>
      {{ status ? 'Activo' : 'Inactivo' }}
      </span>
  </div>
</template>

<style scoped>

</style>