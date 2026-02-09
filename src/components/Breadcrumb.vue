<script setup>
defineProps({
  items: Array
});
defineEmits(['back']);
</script>

<template>
  <div class="flex items-center gap-2 text-sm text-[#617289] dark:text-gray-400">
    <span
        v-for="(item, index) in items"
        :key="index"
        :class="item.active ? 'text-[#111418] dark:text-white font-medium' : 'hover:text-primary cursor-pointer'"
        @click="item.active ? $emit('back') : null"
    >
      {{ item.label }}
      <span v-if="items.length > 1" class="material-symbols-outlined text-xs">chevron_right</span>
    </span>
  </div>
</template>

<style scoped>

</style>