<template>
  <div class="min-h-screen bg-[#0B0B0D] flex items-center justify-center p-6">
    <!-- Loading -->
    <div v-if="status === 'loading'" class="text-center">
      <div class="w-12 h-12 border-2 border-[#C9A24D] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
      <p class="text-[#F4F2ED] opacity-80">Checking  verification status...</p>
    </div>

    <!-- Verified popup -->
    <div v-else-if="status === 'verified' && showVerifiedPopup" class="w-full max-w-md">
      <Transition name="popup">
        <OB33ZCard :glow="true">
          <div class="text-center py-6">
            <div
              class="w-20 h-20 rounded-full bg-gradient-to-br from-[#C9A24D] to-[#5B3FD6] flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-10 h-10 text-[#0B0B0D]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 class="text-xl text-[#C9A24D] mb-2">
              {{ t("verificationSuccess") }}
            </h2>
            <p class="text-sm text-[#F4F2ED] opacity-80 mb-6">
              {{ t("youAreNowVerified") }}
            </p>
            <OB33ZButton variant="primary" class="w-full" @click="goToVibeRoom">
              Continue to Vibe Room
            </OB33ZButton>
          </div>
        </OB33ZCard>
      </Transition>
    </div>
 
    <!-- Not verified / error: still redirect after short message -->
    <div v-else-if="status === 'done'" class="text-center">
      <p class="text-[#F4F2ED] opacity-80 mb-4">
        {{ statusMessage }}
      </p>
      <OB33ZButton variant="primary" @click="goToVibeRoom">
        Go to Vibe Room
      </OB33ZButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLanguage } from "#imports";
import { useAuthStore } from "~/stores/auth";

const { t } = useLanguage();
const authStore = useAuthStore();

const status = ref<"loading" | "verified" | "done">("loading");
const showVerifiedPopup = ref(false);
const statusMessage = ref("Taking you to the Vibe Room...");

onMounted(async () => {
  if (!authStore.isAuthenticated) {
    await navigateTo("/");
    return;
  }

  try {
    const res = await authStore.checkDocumentVerificationStatus() as any;
    if (res?.success === true && res?.data?.is_verified === true) {
      status.value = "verified";
      showVerifiedPopup.value = true;
    } else {
      status.value = "done";
      statusMessage.value = res?.message || "Verification check complete.";
    }
  } catch {
    status.value = "done";
    statusMessage.value = authStore.error || "Could not verify status. You can try again from the app.";
  }
});

const goToVibeRoom = () => {
  navigateTo("/vibe-room");
};
</script>

<style scoped>
.popup-enter-active,
.popup-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.popup-enter-from,
.popup-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
