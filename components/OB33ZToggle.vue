<template>
  <button
    type="button"
    :class="[
      'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A24D] focus:ring-offset-2 focus:ring-offset-[#0B0B0D]',
      modelValue
        ? 'bg-[#5B3FD6]'
        : 'bg-[rgba(244,242,237,0.1)] border border-[rgba(201,162,77,0.3)]'
    ]"
    @click="$emit('update:modelValue', !modelValue)"
    :disabled="disabled"
  >
    <span
      :class="[
        'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
        modelValue ? 'translate-x-6' : 'translate-x-1'
      ]"
    />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean;
  disabled?: boolean;
}>();

defineEmits<{
  "update:modelValue": [value: boolean];
}>();
</script>
