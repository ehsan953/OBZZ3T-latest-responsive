<template>
  <Teleport to="body">
    <Transition name="modal-backdrop">
      <div
        v-if="isOpen"
        class="fixed inset-0 bg-[rgba(11,11,13,0.95)] backdrop-blur-sm z-50 flex items-center justify-center p-6"
        @click="$emit('close')"
      >
        <div
          class="relative w-full max-w-md"
          @click.stop
        >
          <!-- GLOWING GRADIENT BORDER -->
          <div
            class="pointer-events-none absolute -inset-0.5 rounded-2xl blur-xl opacity-70 transition duration-700"
            style="
              background: linear-gradient(
                90deg,
                rgba(91, 63, 214, 0.25),
                rgba(91, 63, 214, 0.08),
                rgba(91, 63, 214, 0.25)
              );
            "
          />

          <!-- MODAL BOX -->
          <div
            class="relative h-full max-h-[80vh] overflow-y-auto rounded-2xl bg-[#0B0B0D]/95 font-roboto backdrop-blur-sm border border-[rgba(201,162,77,0.15)] shadow-[#12101E]"
            @keydown="onKeydown"
            tabindex="0"
          >
            <!-- Header -->
            <div class="relative px-5 sm:px-6 pt-5 sm:pt-6">
              <div class="flex items-start justify-between gap-3">
                <div>
                  <h2 class="text-[24px] sm:text-[28px] leading-[30px] sm:leading-[32px] text-[#C9A24D] font-medium">
                    {{ currentStep === 1 ? 'Forgot Password' : currentStep === 2 ? 'Verify OTP' : 'Reset Password' }}
                  </h2>
                  <p class="mt-2 text-[14px] sm:text-sm text-white/55">
                    {{ currentStep === 1 ? 'Enter your email to receive a verification code' : currentStep === 2 ? 'Enter the code sent to your email' : 'Enter your new password' }}
                  </p>
                </div>

                <button
                  type="button"
                  class="rounded-md p-2 text-white/45 hover:text-white/80 transition"
                  aria-label="Close"
                  @click="$emit('close')"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M6 6l12 12M18 6L6 18"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Body -->
            <div class="relative px-5 sm:px-6 pt-5 sm:pt-6">
              <!-- Step 1: Email Input -->
              <div v-if="currentStep === 1" class="space-y-4 sm:space-y-5">
                <div>
                  <label class="block text-[14px] font-medium text-white/70 mb-2">
                    Email Address
                  </label>
                  <div class="relative">
                    <span class="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M4 6h16v12H4V6z"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M4 7l8 6 8-6"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                    <input
                      v-model="email"
                      type="email"
                      placeholder="Enter your email"
                      :class="['w-full rounded-xl border pl-11 pr-4 py-4 text-sm text-white/90 placeholder:text-white/25 outline-none focus:border-[#C9A24D]/50', fieldErrors.email ? 'border-red-500/60 bg-red-500/5' : 'border-[#C9A24D]/15 bg-white/[0.03] focus:bg-white/[0.04]']"
                      @input="fieldErrors.email = validateEmail(email)"
                    />
                  </div>
                  <p v-if="fieldErrors.email" class="mt-1.5 text-xs text-red-400">{{ fieldErrors.email }}</p>
                </div>

                <!-- Error Message -->
                <div
                  v-if="error"
                  class="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
                >
                  {{ error }}
                </div>

                <!-- Success Message -->
                <div
                  v-if="successMessage"
                  class="rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400"
                >
                  {{ successMessage }}
                </div>

                <button
                  type="button"
                  :disabled="authStore.isLoading"
                  class="w-full rounded-xl bg-[#C9A24D] py-3.5 sm:py-4 text-center font-bold tracking-widest text-black shadow-[0_18px_50px_rgba(0,0,0,0.60)] hover:brightness-110 active:scale-[0.99] transition disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                  @click="handleSendOTP"
                >
                  <div
                    v-if="authStore.isLoading"
                    class="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0"
                    role="status"
                    aria-label="Loading"
                  />
                  <span v-if="authStore.isLoading">Sending...</span>
                  <span v-else>Send Verification Code</span>
                </button>
              </div>

              <!-- Step 2: OTP Verification -->
              <div v-if="currentStep === 2" class="space-y-4 sm:space-y-5">
                <div>
                  <label class="block text-[14px] font-medium text-white/70 mb-2">
                    Verification Code
                  </label>
                  <div class="relative">
                    <span class="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M7 11V8a5 5 0 0110 0v3"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                        />
                        <path
                          d="M6 11h12v10H6V11z"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                    <input
                      v-model="otp"
                      type="text"
                      placeholder="Enter 6-digit code"
                      maxlength="6"
                      :class="['w-full rounded-xl border pl-11 pr-4 py-4 text-sm text-white/90 placeholder:text-white/25 outline-none focus:border-[#C9A24D]/50', fieldErrors.otp ? 'border-red-500/60 bg-red-500/5' : 'border-[#C9A24D]/15 bg-white/[0.03] focus:bg-white/[0.04]']"
                      @input="fieldErrors.otp = validateOTP(otp)"
                    />
                  </div>
                  <p v-if="fieldErrors.otp" class="mt-1.5 text-xs text-red-400">{{ fieldErrors.otp }}</p>
                </div>

                <!-- Error Message -->
                <div
                  v-if="error"
                  class="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
                >
                  {{ error }}
                </div>

                <div class="flex gap-3">
                  <button
                    type="button"
                    class="flex-1 rounded-xl border border-[#C9A24D]/30 bg-white/[0.03] py-3.5 sm:py-4 text-center font-medium text-white/70 hover:bg-white/[0.05] transition"
                    @click="currentStep = 1"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    :disabled="authStore.isLoading"
                    class="flex-1 rounded-xl bg-[#C9A24D] py-3.5 sm:py-4 text-center font-bold tracking-widest text-black shadow-[0_18px_50px_rgba(0,0,0,0.60)] hover:brightness-110 active:scale-[0.99] transition disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                    @click="handleVerifyOTP"
                  >
                    <div
                      v-if="authStore.isLoading"
                      class="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0"
                      role="status"
                      aria-label="Loading"
                    />
                    <span v-if="authStore.isLoading">Verifying...</span>
                    <span v-else>Verify</span>
                  </button>
                </div>
              </div>

              <!-- Step 3: Reset Password -->
              <div v-if="currentStep === 3" class="space-y-4 sm:space-y-5">
                <div>
                  <label class="block text-[14px] font-medium text-white/70 mb-2">
                    New Password
                  </label>
                  <div class="relative">
                    <span class="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M7 11V8a5 5 0 0110 0v3"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                        />
                        <path
                          d="M6 11h12v10H6V11z"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                    <input
                      v-model="newPassword"
                      :type="showNewPassword ? 'text' : 'password'"
                      placeholder="Enter new password"
                      :class="['w-full rounded-xl border pl-11 pr-10 py-4 text-sm text-white/90 placeholder:text-white/25 outline-none focus:border-[#C9A24D]/50', fieldErrors.newPassword ? 'border-red-500/60 bg-red-500/5' : 'border-[#C9A24D]/15 bg-white/[0.03] focus:bg-white/[0.04]']"
                      @input="fieldErrors.newPassword = validateNewPassword(newPassword); fieldErrors.confirmPassword = validateConfirmPassword(confirmPassword)"
                    />
                    <button
                      type="button"
                      class="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80"
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
                  <p v-if="fieldErrors.newPassword" class="mt-1.5 text-xs text-red-400">{{ fieldErrors.newPassword }}</p>
                </div>

                <div>
                  <label class="block text-[14px] font-medium text-white/70 mb-2">
                    Confirm New Password
                  </label>
                  <div class="relative">
                    <span class="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M7 11V8a5 5 0 0110 0v3"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                        />
                        <path
                          d="M6 11h12v10H6V11z"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                    <input
                      v-model="confirmPassword"
                      :type="showConfirmPassword ? 'text' : 'password'"
                      placeholder="Confirm new password"
                      :class="['w-full rounded-xl border pl-11 pr-10 py-4 text-sm text-white/90 placeholder:text-white/25 outline-none focus:border-[#C9A24D]/50', fieldErrors.confirmPassword ? 'border-red-500/60 bg-red-500/5' : 'border-[#C9A24D]/15 bg-white/[0.03] focus:bg-white/[0.04]']"
                      @input="fieldErrors.confirmPassword = validateConfirmPassword(confirmPassword)"
                    />
                    <button
                      type="button"
                      class="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80"
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
                  <p v-if="fieldErrors.confirmPassword" class="mt-1.5 text-xs text-red-400">{{ fieldErrors.confirmPassword }}</p>
                </div>

                <!-- Error Message -->
                <div
                  v-if="error"
                  class="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
                >
                  {{ error }}
                </div>

                <!-- Success Message -->
                <div
                  v-if="successMessage"
                  class="rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400"
                >
                  {{ successMessage }}
                </div>

                <div class="flex gap-3">
                  <button
                    type="button"
                    class="flex-1 rounded-xl border border-[#C9A24D]/30 bg-white/[0.03] py-3.5 sm:py-4 text-center font-medium text-white/70 hover:bg-white/[0.05] transition"
                    @click="currentStep = 2"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    :disabled="authStore.isLoading"
                    class="flex-1 rounded-xl bg-[#C9A24D] py-3.5 sm:py-4 text-center font-bold tracking-widest text-black shadow-[0_18px_50px_rgba(0,0,0,0.60)] hover:brightness-110 active:scale-[0.99] transition disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                    @click="handleResetPassword"
                  >
                    <div
                      v-if="authStore.isLoading"
                      class="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0"
                      role="status"
                      aria-label="Loading"
                    />
                    <span v-if="authStore.isLoading">Resetting...</span>
                    <span v-else>Reset Password</span>
                  </button>
                </div>
              </div>

              <!-- Footer -->
              <div
                class="my-6 sm:my-7 border-t border-white/10 pt-4 sm:pt-5 text-center text-[13px] sm:text-sm text-white/45"
              >
                Remember your password?
                <button
                  type="button"
                  class="ml-2 font-medium text-[#C9A24D] hover:opacity-90"
                  @click="$emit('close')"
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();

interface Props {
  isOpen: boolean;
}

const props = withDefaults(defineProps<Props>(), {});

const emit = defineEmits<{
  close: [];
  success: [];
}>();

const currentStep = ref(1);
const email = ref("");
const otp = ref("");
const newPassword = ref("");
const confirmPassword = ref("");
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);
const error = ref<string | null>(null);
const successMessage = ref<string | null>(null);

const fieldErrors = ref<{ email: string; otp: string; newPassword: string; confirmPassword: string }>({
  email: "",
  otp: "",
  newPassword: "",
  confirmPassword: "",
});

function validateEmail(v: string): string {
  const s = (v ?? "").trim();
  if (!s) return "Email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)) return "Please enter a valid email address";
  return "";
}
function validateOTP(v: string): string {
  const s = (v ?? "").trim();
  if (!s) return "Verification code is required";
  if (!/^\d{6}$/.test(s)) return "Please enter a valid 6-digit code";
  return "";
}
function validateNewPassword(v: string): string {
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
function validateConfirmPassword(v: string): string {
  if (!v) return "Please confirm your password";
  if (v !== newPassword.value) return "Passwords do not match";
  return "";
}

const isPasswordValid = computed(() => {
  return (
    newPassword.value.length >= 8 &&
    confirmPassword.value.length >= 8 &&
    newPassword.value === confirmPassword.value
  );
});

// Reset form when modal opens/closes
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    currentStep.value = 1;
    email.value = "";
    otp.value = "";
    newPassword.value = "";
    confirmPassword.value = "";
    error.value = null;
    successMessage.value = null;
    authStore.error = null;
    fieldErrors.value = { email: "", otp: "", newPassword: "", confirmPassword: "" };
  }
});

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === "Escape") emit("close");
};

const handleSendOTP = async () => {
  error.value = null;
  successMessage.value = null;
  authStore.error = null;
  const emailErr = validateEmail(email.value);
  fieldErrors.value = { ...fieldErrors.value, email: emailErr, otp: "", newPassword: "", confirmPassword: "" };
  if (emailErr) return;

  try {
    await authStore.forgotPassword(email.value.trim());
    successMessage.value = "Verification code sent to your email";
    setTimeout(() => {
      currentStep.value = 2;
      successMessage.value = null;
    }, 1500);
  } catch (err: any) {
    error.value = authStore.error || "Failed to send verification code";
  }
};

const handleVerifyOTP = async () => {
  error.value = null;
  authStore.error = null;
  const otpErr = validateOTP(otp.value);
  fieldErrors.value = { ...fieldErrors.value, otp: otpErr };
  if (otpErr) return;

  try {
    await authStore.verifyOTP(email.value.trim(), otp.value);
    currentStep.value = 3;
  } catch (err: any) {
    error.value = authStore.error || "Invalid verification code";
  }
};

const handleResetPassword = async () => {
  error.value = null;
  successMessage.value = null;
  authStore.error = null;
  const newErr = validateNewPassword(newPassword.value);
  const confirmErr = validateConfirmPassword(confirmPassword.value);
  fieldErrors.value = { ...fieldErrors.value, newPassword: newErr, confirmPassword: confirmErr };
  if (newErr || confirmErr) return;

  try {
    await authStore.resetPassword(
      email.value.trim(),
      otp.value,
      newPassword.value,
      confirmPassword.value
    );
    successMessage.value = "Password reset successfully!";
    setTimeout(() => {
      emit("success");
      emit("close");
    }, 1500);
  } catch (err: any) {
    error.value = authStore.error || "Failed to reset password";
  }
};
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

.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}
.overflow-y-auto::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}
.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(201, 162, 77, 0.3);
  border-radius: 10px;
}
.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(201, 162, 77, 0.5);
}
</style>
