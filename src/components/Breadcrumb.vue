<template>
  <nav class="flex items-center gap-2 text-sm text-[#617289] dark:text-gray-400" aria-label="Breadcrumb">
    <span
        v-for="(item, index) in items"
        :key="index"
        :class="item.active ? 'text-[#111418] dark:text-white font-medium' : 'hover:text-primary cursor-pointer'"
        @click="!item.active && item.click ? item.click() : null"
    >
      {{ item.label }}
      <span v-if="index < items.length - 1" class="material-symbols-outlined text-xs">chevron_right</span>
    </span>
  </nav>
</template>

<script setup>
defineProps({
  items: Array
});
</script>
