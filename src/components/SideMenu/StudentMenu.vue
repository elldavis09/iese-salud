<script setup>
import FooterSection from "@/components/SideMenu/FooterSection.vue";
import OptionsSection from "@/components/SideMenu/OptionsSection.vue";
import HeaderSection from "@/components/SideMenu/HeaderSection.vue";

const props = defineProps({
  optionSelected: {
    type: String,
    required: false,
    default: ''
  }
});

const emit = defineEmits(['logout', 'optionSelected']);

const handleLogout = () => emit('logout');
const handleOptionSelected = (item) => emit('optionSelected', item);
</script>

<template>
  <aside
      class="fixed left-0 top-0 h-full w-[var(--sidebar-width,16rem)] bg-[#001E2B] text-white hidden lg:flex flex-col z-50 shadow-2xl transition-all duration-300">
    <HeaderSection />
    
    <OptionsSection 
      :initial-option="props.optionSelected" 
      @optionSelected="handleOptionSelected" 
    />
    
    <FooterSection @logout="handleLogout"/>
  </aside>
</template>