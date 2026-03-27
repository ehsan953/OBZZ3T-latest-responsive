<template>
  <div class="min-h-screen bg-[#0B0B0D] flex items-center justify-center p-6">
    <div class="w-full max-w-md">
      <OB33ZCard :glow="true">
        <div class="text-center py-8 px-6">
          <div class="w-20 h-20 rounded-full bg-gradient-to-br from-[#C9A24D] to-[#5B3FD6] flex items-center justify-center mx-auto mb-4">
            <svg class="w-10 h-10 text-[#0B0B0D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 class="text-2xl text-[#C9A24D] mb-2">Email Verified</h2>
          <p class="text-sm text-[#F4F2ED] opacity-80 mb-6">
            Your email has been verified successfully. Now verify your document to unlock all features.
          </p>
          <div class="flex gap-3">
            <OB33ZButton variant="primary" class="flex-1" @click="continueToVibe">
              Continue
            </OB33ZButton>
            <OB33ZButton variant="secondary" class="flex-1" @click="openVerification">
              Verify Document
            </OB33ZButton>
          </div>
        </div>
      </OB33ZCard>
    </div>
    <VerificationModal :isOpen="isVerificationOpen" @close="isVerificationOpen = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAuthStore } from "~/stores/auth";
import VerificationModal from "~/components/VerificationModal.vue";
import { useTransitionScreen } from "~/composables/useTransitionScreen";
import { useFlashMessage } from "~/composables/useFlashMessage";

const isVerificationOpen = ref(false);
const authStore = useAuthStore();
const { startTransition } = useTransitionScreen();
const flash = useFlashMessage();

const openVerification = () => {
  isVerificationOpen.value = true;
};

const continueToVibe = async () => {
  flash.setSuccess("Your email has been verified successfully");
  await startTransition("/vibe-room");
};

onMounted(async () => {
  if (!authStore.isInitialized) {
    try {
      await authStore.initAuth();
    } catch {}
  }
  if (!authStore.isAuthenticated) {
    await navigateTo("/", { replace: true });
  }
});
</script>
