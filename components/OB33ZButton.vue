<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="[
      'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold tracking-widest transition-all disabled:opacity-70 disabled:cursor-not-allowed',
      variant === 'primary'
        ? 'bg-[#C9A24D] text-[#0B0B0D] hover:brightness-110 active:scale-[0.99] shadow-[0_0_0_1px_rgba(201,162,77,0.25),0_18px_40px_rgba(0,0,0,0.55)]'
        : variant === 'secondary'
        ? 'border border-[#C9A24D]/80 bg-transparent text-[#C9A24D] hover:bg-[#C9A24D]/10 active:scale-[0.99] shadow-[0_0_0_1px_rgba(201,162,77,0.10)]'
        : variant === 'ghost' 
        ? 'border border-[#C9A24D] bg-[#C9A24D33]/60 text-[#C9A24D] hover:bg-[#C9A24D]/10 active:scale-[0.99] shadow-[0_0_0_1px_rgba(201,162,77,0.10)]' 
        : 'bg-transparent text-[#F4F2ED] hover:bg-[rgba(244,242,237,0.05)] active:scale-[0.99]',
      $attrs.class
    ]"
    @click="$emit('click')"
  >
    <div
      v-if="loading"
      class="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0"
      role="status"
      aria-label="Loading"
    />
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  variant?: "primary" | "secondary" | "ghost";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
}>();

defineEmits<{
  click: [];
}>();
</script>
