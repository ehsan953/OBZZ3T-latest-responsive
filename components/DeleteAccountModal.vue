<template>
  <Teleport to="body">
    <Transition name="modal-backdrop">
      <div
        v-if="isOpen"
        class="fixed inset-0 bg-[rgba(11,11,13,0.95)] backdrop-blur-sm z-50 flex items-center justify-center p-6"
        @click="$emit('close')"
      >
        <div class="w-full max-w-md" @click.stop>
          <OB33ZCard :glow="true">
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-[#5B3FD6] flex items-center justify-center">
                  <svg class="w-5 h-5 text-[#0B0B0D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M5.07 19a10 10 0 1113.86 0A10 10 0 015.07 19z" />
                  </svg>
                </div>
                <div>
                  <h2 class="text-2xl text-red-400">{{ t('profile.deactivateAccount') }}</h2>
                  <p class="text-sm text-[#F4F2ED] opacity-60">{{ t('profile.deactivateAccountDesc') }}</p>
                </div>
              </div>
              <button
                type="button"
                @click="$emit('close')"
                class="text-[#F4F2ED] opacity-60 hover:opacity-100 transition-opacity"
                aria-label="Close"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div class="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {{ t('profile.deactivateAccountConfirm') }}
            </div>

            <div v-if="authStore.error" class="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {{ authStore.error }}
            </div>

            <div class="flex gap-3 pt-5">
              <OB33ZButton type="button" variant="ghost" class="flex-1" @click="$emit('close')" :disabled="authStore.isLoading">
                {{ t('profile.cancel') }}
              </OB33ZButton>
              <OB33ZButton
                type="button"
                variant="primary"
                class="flex-1 bg-red-500/20 border border-red-500/40 text-red-200 hover:bg-red-500/30"
                :disabled="authStore.isLoading"
                @click="handleDeactivate"
              >
                {{ authStore.isLoading ? t('profile.deactivating') : t('profile.deactivate') }}
              </OB33ZButton>
            </div>
          </OB33ZCard>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useI18n, navigateTo } from "#imports";
import { useAuthStore } from "~/stores/auth";

defineProps<{ isOpen: boolean }>();
defineEmits<{ (e: "close"): void }>();

const { t } = useI18n();
const authStore = useAuthStore();

const handleDeactivate = async () => {
  try {
    await authStore.deactivateAccount();
    await navigateTo("/");
  } catch {
    // error shown via authStore.error
  }
};
</script>
