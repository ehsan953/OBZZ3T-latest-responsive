<template>
  <div class="relative min-h-screen bg-[#050608] text-[#F4F2ED]">
    <!-- Global transition/loading screen overlay (no sidebar/live menu here or on default page) -->
    <TransitionScreen
      v-if="showTransition"
    />

    <slot />
  </div>
</template>

<script setup lang="ts">
import TransitionScreen from "~/components/TransitionScreen.vue";
import { useTransitionScreen } from "~/composables/useTransitionScreen";

const { show: showTransition } = useTransitionScreen();
</script>
