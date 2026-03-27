<template>
  <input
    :value="modelValue"
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled"
    :class="[
      'w-full px-4 py-3 rounded-lg bg-[rgba(244,242,237,0.05)] border border-[rgba(201,162,77,0.15)] text-[#F4F2ED] placeholder:text-[#F4F2ED]/40 outline-none focus:border-[#C9A24D]/50 focus:bg-[rgba(244,242,237,0.08)] transition-colors',
      disabled ? 'opacity-60 cursor-not-allowed' : '',
      $attrs.class
    ]"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    @keypress="$emit('keypress', $event)"
  />
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
}>();

defineEmits<{
  "update:modelValue": [value: string];
  keypress: [event: KeyboardEvent];
}>();
</script>
