<script setup>
import { computed } from "vue";

const props = defineProps({
  totalPages: { type: Number, required: true },
  currentPage: { type: Number, required: true },
  links: { type: Array, required: true }
});
const emit = defineEmits(["page-change"]);

const getPrevPage = computed(() => {
  return props.currentPage > 1 ? props.currentPage - 1 : null;
});
const getNextPage = computed(() => {
  return props.currentPage < props.totalPages ? props.currentPage + 1 : null;
});

const handlePageChange = (page) => {
  if (page && page !== props.currentPage && page >= 1 && page <= props.totalPages) {
    emit("page-change", page);
  }
};

const getPageButtonClass = (page) => {
  return page === props.currentPage
      ? "size-8 flex items-center justify-center text-sm font-bold bg-primary text-white rounded-lg"
      : "size-8 flex items-center justify-center text-sm font-bold hover:bg-white dark:hover:bg-[#2d3a4b] rounded-lg transition-colors";
};
</script>

<template>
  <div class="p-4 bg-gray-50 dark:bg-[#1a2432] border-t border-[#f0f2f4] dark:border-[#2d3a4b] flex items-center justify-between">
    <button
        :disabled="!getPrevPage"
        @click="handlePageChange(getPrevPage)"
        aria-label="Página anterior"
        class="px-4 py-2 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-[#2d3a4b] rounded-lg transition-colors border border-transparent hover:border-[#f0f2f4] dark:hover:border-[#2d3a4b]"
    >
      Anterior
    </button>
    <div class="flex gap-2">
      <button
          v-for="page in totalPages"
          :key="page"
          :class="getPageButtonClass(page)"
          :aria-current="page === currentPage ? 'page' : undefined"
          @click="handlePageChange(page)"
      >
        {{ page }}
      </button>
    </div>
    <button
        :disabled="!getNextPage"
        @click="handlePageChange(getNextPage)"
        aria-label="Página siguiente"
        class="px-4 py-2 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-[#2d3a4b] rounded-lg transition-colors border border-transparent hover:border-[#f0f2f4] dark:hover:border-[#2d3a4b]"
    >
      Siguiente
    </button>
  </div>
</template>
