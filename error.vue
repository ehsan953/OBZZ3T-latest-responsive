<template>
  <div class="relative min-h-screen overflow-hidden bg-[#0B0B0D] text-[#F4F2ED]">
    <div class="pointer-events-none absolute inset-0">
      <div class="absolute left-[-10%] top-[10%] h-80 w-80 rounded-full bg-[#5B3FD6]/20 blur-[120px]" />
      <div class="absolute bottom-[5%] right-[-10%] h-80 w-80 rounded-full bg-[#C9A24D]/20 blur-[120px]" />
    </div>

    <div class="relative mx-auto flex min-h-screen max-w-2xl items-center justify-center px-6">
      <OB33ZCard :glow="true" class="w-full text-center flex flex-col gap-4">
        <p class="text-lg tracking-[0.35em] text-[#C9A24D]/90">{{ statusCode }}</p>
        <h1 class="mt-3 text-3xl text-[#C9A24D] sm:text-4xl">
          {{ isNotFound ? "Page not found" : "Something went wrong" }}
        </h1>
        <p class="mx-auto mt-3 max-w-md text-sm text-[#F4F2ED]/75 sm:text-base">
          {{ friendlyMessage }}
        </p>

        <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          
          <OB33ZButton variant="secondary" @click="goBack" class="mx-auto">
            Go Back
          </OB33ZButton>
        </div>
      </OB33ZCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  error: {
    statusCode?: number;
    statusMessage?: string;
    message?: string;
  };
}>();

const statusCode = computed(() => props.error?.statusCode ?? 500);
const isNotFound = computed(() => statusCode.value === 404);

const friendlyMessage = computed(() => {
  if (isNotFound.value) {
    return "The page you are looking for does not exist or may have been moved.";
  }
  return props.error?.statusMessage || props.error?.message || "An unexpected error occurred.";
});

const goHome = () => clearError({ redirect: "/" });
const goBack = () => {
  if (import.meta.client && window.history.length > 1) {
    clearError();
    window.history.back();
    return;
  }
  clearError({ redirect: "/" });
};
</script>
