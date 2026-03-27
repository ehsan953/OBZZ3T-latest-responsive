<template>
  <Teleport to="body">
    <Transition name="modal-backdrop">
      <div
        v-if="isOpen"
        class="fixed inset-0 bg-[rgba(11,11,13,0.95)] backdrop-blur-sm z-50 flex items-center justify-center p-6"
        @click="$emit('close')"
      >
        <div
          class="w-full max-w-md"
          @click.stop
        >
          <OB33ZCard :glow="true">
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-[#C9A24D] to-[#5B3FD6] flex items-center justify-center">
                  <svg class="w-5 h-5 text-[#0B0B0D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h2 class="text-2xl text-[#C9A24D]">{{ t('profile.changePassword') }}</h2>
                  <p class="text-sm text-[#F4F2ED] opacity-60">{{ t('profile.changePasswordModalDesc') }}</p>
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

            <form @submit.prevent="handleSubmit" class="space-y-4">
              <div>
                <label class="block text-sm text-[#F4F2ED] opacity-80 mb-2">{{ t('profile.currentPassword') }}</label>
                <div class="relative">
                  <OB33ZInput
                    v-model="currentPassword"
                    :type="showCurrentPassword ? 'text' : 'password'"
                    :placeholder="t('profile.currentPasswordPlaceholder')"
                    :class="errors.currentPassword ? 'border-red-500/60' : ''"
                    class="w-full pr-10"
                    @input="updateErrorsOnInput"
                  />
                  <button
                    type="button"
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-[#F4F2ED] opacity-50 hover:opacity-90"
                    aria-label="Toggle current password visibility"
                    @click="showCurrentPassword = !showCurrentPassword"
                  >
                    <svg v-if="showCurrentPassword" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.223-3.592M6.18 6.18A9.953 9.953 0 0112 5c4.477 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411M15 12a3 3 0 00-3-3m0 0a3 3 0 013 3m-3-3L4 20" />
                    </svg>
                  </button>
                </div>
                <p v-if="errors.currentPassword" class="text-xs text-red-400 mt-1">{{ errors.currentPassword }}</p>
                <p v-if="error && !errors.currentPassword" class="text-xs text-red-400 mt-1">{{ error }}</p>
              </div>
              <div>
                <label class="block text-sm text-[#F4F2ED] opacity-80 mb-2">{{ t('profile.newPassword') }}</label>
                <div class="relative">
                  <OB33ZInput
                    v-model="newPassword"
                    :type="showNewPassword ? 'text' : 'password'"
                    :placeholder="t('profile.newPasswordPlaceholder')"
                    :class="errors.newPassword ? 'border-red-500/60' : ''"
                    class="w-full pr-10"
                    @input="updateErrorsOnInput"
                  />
                  <button
                    type="button"
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-[#F4F2ED] opacity-50 hover:opacity-90"
                    aria-label="Toggle new password visibility"
                    @click="showNewPassword = !showNewPassword"
                  >
                    <svg v-if="showNewPassword" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.223-3.592M6.18 6.18A9.953 9.953 0 0112 5c4.477 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411M15 12a3 3 0 00-3-3m0 0a3 3 0 013 3m-3-3L4 20" />
                    </svg>
                  </button>
                </div>
                <p v-if="errors.newPassword" class="text-xs text-red-400 mt-1">{{ errors.newPassword }}</p>
              </div>
              <div>
                <label class="block text-sm text-[#F4F2ED] opacity-80 mb-2">{{ t('profile.confirmPassword') }}</label>
                <div class="relative">
                  <OB33ZInput
                    v-model="confirmPassword"
                    :type="showConfirmPassword ? 'text' : 'password'"
                    :placeholder="t('profile.confirmPasswordPlaceholder')"
                    :class="errors.confirmPassword ? 'border-red-500/60' : ''"
                    class="w-full pr-10"
                    @input="updateErrorsOnInput"
                  />
                  <button
                    type="button"
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-[#F4F2ED] opacity-50 hover:opacity-90"
                    aria-label="Toggle confirm password visibility"
                    @click="showConfirmPassword = !showConfirmPassword"
                  >
                    <svg v-if="showConfirmPassword" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.223-3.592M6.18 6.18A9.953 9.953 0 0112 5c4.477 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411M15 12a3 3 0 00-3-3m0 0a3 3 0 013 3m-3-3L4 20" />
                    </svg>
                  </button>
                </div>
                <p v-if="errors.confirmPassword" class="text-xs text-red-400 mt-1">{{ errors.confirmPassword }}</p>
              </div>
              <div class="flex gap-3 pt-2">
                <OB33ZButton type="button" variant="ghost" class="flex-1" @click="$emit('close')">
                  {{ t('profile.cancel') }}
                </OB33ZButton>
                <OB33ZButton type="submit" variant="primary" class="flex-1" :loading="authStore.isLoading">
                  {{ authStore.isLoading ? t('profile.saving') : t('profile.updatePassword') }}
                </OB33ZButton>
              </div>
            </form>
          </OB33ZCard>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useI18n } from "#imports";
import { useAuthStore } from "~/stores/auth";
import OB33ZCard from "~/components/OB33ZCard.vue";
import OB33ZInput from "~/components/OB33ZInput.vue";
import OB33ZButton from "~/components/OB33ZButton.vue";

const { t } = useI18n();
const authStore = useAuthStore();

const props = defineProps<{ isOpen: boolean }>();
const emit = defineEmits<{ close: []; success: [] }>();

const currentPassword = ref("");
const newPassword = ref("");
const confirmPassword = ref("");
const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);
const error = ref("");
const errors = ref<{ currentPassword?: string; newPassword?: string; confirmPassword?: string }>({});

function validateStrongPassword(v: string): string {
  const s = (v ?? "").trim();
  if (!s) return "New password is required";
  if (s.length < 8) return "Password should be strong: at least 8 characters";

  const hasUpper = /[A-Z]/.test(s);
  const hasLower = /[a-z]/.test(s);
  const hasDigit = /[0-9]/.test(s);
  const hasSpecial = /[^A-Za-z0-9]/.test(s);

  if (!hasUpper) return "Password should be strong: add at least one uppercase letter";
  if (!hasLower) return "Password should be strong: add at least one lowercase letter";
  if (!hasDigit) return "Password should be strong: add at least one number";
  if (!hasSpecial) return "Password should be strong: add at least one special character";

  return "";
}

function validate(): boolean {
  error.value = "";
  const e: { currentPassword?: string; newPassword?: string; confirmPassword?: string } = {};
  if (!currentPassword.value.trim()) e.currentPassword = "Current password is required";
  const pwdErr = validateStrongPassword(newPassword.value);
  if (pwdErr) e.newPassword = pwdErr;
  if (!confirmPassword.value) e.confirmPassword = "Please confirm your password";
  else if (newPassword.value !== confirmPassword.value) e.confirmPassword = "Passwords do not match";
  errors.value = e;
  return !e.currentPassword && !e.newPassword && !e.confirmPassword;
}
function updateErrorsOnInput() {
  errors.value = {
    currentPassword: !currentPassword.value.trim() ? "Current password is required" : "",
    newPassword: !newPassword.value ? "" : validateStrongPassword(newPassword.value),
    confirmPassword: !confirmPassword.value ? "" : newPassword.value !== confirmPassword.value ? "Passwords do not match" : "",
  };
}

// Keep strong password and confirm-match errors in sync while user types or pastes
watch([newPassword, confirmPassword], () => {
  errors.value = {
    ...errors.value,
    newPassword: !newPassword.value ? "" : validateStrongPassword(newPassword.value),
    confirmPassword: !confirmPassword.value ? "" : newPassword.value !== confirmPassword.value ? "Passwords do not match" : "",
  };
});

async function handleSubmit() {
  if (!validate()) return;
  try {
    await authStore.changePassword(currentPassword.value, newPassword.value, confirmPassword.value);
    currentPassword.value = "";
    newPassword.value = "";
    confirmPassword.value = "";
    emit("success");
    emit("close");
  } catch {
    error.value = authStore.error || "Failed to change password";
  }
}

watch(() => props.isOpen, (open) => {
  if (!open) {
    currentPassword.value = "";
    newPassword.value = "";
    confirmPassword.value = "";
    error.value = "";
    errors.value = {};
  }
});
</script>

<style scoped>
.modal-backdrop-enter-active,
.modal-backdrop-leave-active {
  transition: opacity 0.2s;
}
.modal-backdrop-enter-from,
.modal-backdrop-leave-to {
  opacity: 0;
}
</style>
