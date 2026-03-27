<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useI18n } from "#imports";
import { useAuthStore } from "~/stores/auth";
import { useTransitionScreen } from "~/composables/useTransitionScreen";

const { t } = useI18n();
const authStore = useAuthStore();
const { startTransition } = useTransitionScreen();

const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits<{ (e: "update:modelValue", v: boolean): void }>();

const close = () => emit("update:modelValue", false);

const fullName = ref("");
const userName = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const showJoinPassword = ref(false);
const showJoinConfirmPassword = ref(false);

const isAuthOpen = ref(false);
const signupError = ref<string | null>(null);
const signupSuccess = ref<string | null>(null);

// Per-field validation errors (shown under each input)
const fieldErrors = ref<Record<string, string>>({
  fullName: "",
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
});

// Validation rules
const validateFullName = (v: string): string => {
  const s = (v ?? "").trim();
  if (!s) return "Full name is required";
  if (s.length < 2) return "Full name must be at least 2 characters";
  if (!/^[\p{L}\s]+$/u.test(s)) return "Full name can only contain letters and spaces";
  return "";
};
const validateUserName = (v: string): string => {
  const s = (v ?? "").trim();
  if (!s) return "Username is required";
  if (s.length < 3) return "Username must be at least 3 characters";
  // Letters, numbers, and common special characters (_.-@)
  if (!/^[\p{L}\p{N}_.\-@]+$/u.test(s)) return "Username can only use letters, numbers, and _ . - @";
  return "";
};
const validateEmail = (v: string): string => {
  const s = (v ?? "").trim();
  if (!s) return "Email is required";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(s)) return "Please enter a valid email address";
  return "";
};
const validatePassword = (v: string): string => {
  const s = (v ?? "").trim();
  if (!s) return "Password is required";
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
};
const validateConfirmPassword = (v: string): string => {
  if (!v) return "Please confirm your password";
  if (v !== password.value) return "Passwords do not match";
  return "";
};

const runValidation = (): boolean => {
  const e: Record<string, string> = {
    fullName: validateFullName(fullName.value),
    userName: validateUserName(userName.value),
    email: validateEmail(email.value),
    password: validatePassword(password.value),
    confirmPassword: validateConfirmPassword(confirmPassword.value),
  };
  fieldErrors.value = e;
  return !Object.values(e).some((msg) => msg !== "");
};

// Clear all form fields
const clearForm = () => {
  fullName.value = "";
  userName.value = "";
  email.value = "";
  password.value = "";
  confirmPassword.value = "";
  signupError.value = null;
  signupSuccess.value = null;
  fieldErrors.value = { fullName: "", userName: "", email: "", password: "", confirmPassword: "" };
  submitAttempted.value = false;
};

// Watch for modal opening and clear form
watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    clearForm();
  }
});

const openSignIn = () => {
  close();
  isAuthOpen.value = true;
};

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === "Escape") close();
};

// Form valid when all field validations pass (no error messages)
const isFormValid = computed(() => {
  return (
    !validateFullName(fullName.value) &&
    !validateUserName(userName.value) &&
    !validateEmail(email.value) &&
    !validatePassword(password.value) &&
    !validateConfirmPassword(confirmPassword.value)
  );
});

// Show validation errors only after user clicks Join (not while typing)
const submitAttempted = ref(false);
const updateErrorsOnInput = () => {
  if (!submitAttempted.value) return;
  const e: Record<string, string> = {
    fullName: validateFullName(fullName.value),
    userName: validateUserName(userName.value),
    email: validateEmail(email.value),
    password: validatePassword(password.value),
    confirmPassword: validateConfirmPassword(confirmPassword.value),
  };
  fieldErrors.value = { ...fieldErrors.value, ...e };
};

const handleSignup = async () => {
  signupError.value = null;
  signupSuccess.value = null;
  submitAttempted.value = true;

  if (!runValidation()) return;

  try {
    await authStore.signup({
      name: fullName.value.trim(),
      username: userName.value.trim(),
      email: email.value.trim(),
      password: password.value,
      password_confirmation: confirmPassword.value,
    });

    // Clear all form fields (we're redirecting immediately)
    fullName.value = "";
    userName.value = "";
    email.value = "";
    password.value = "";
    confirmPassword.value = "";
    signupError.value = null;

    // Immediately close Join and navigate to the next page with transition
    close();
    await startTransition("/");
    
  } catch (error: any) {
    signupError.value = authStore.error || "Signup failed. Please try again.";
  }
};
</script>

<template>
  <div>
  <Teleport to="body">
    <Transition name="join-fade">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 backdrop-blur-md p-3 sm:p-6"
        @click="close"
      >
        <!-- WRAPPER (size/position + holds glow border) -->
        <div
          class="relative w-[calc(100vw-24px)] max-w-[500px] scale-[0.90] xs:scale-[0.95] sm:scale-100"
          @click.stop
        >
          <!-- GLOWING GRADIENT BORDER (yellowish) -->
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

          <!-- EXTRA OUTER SOFT GLOW (optional but makes it pop like your sample) -->
          <div
            class="pointer-events-none absolute -inset-3 rounded-[28px] blur-2xl opacity-35"
          />

          <!-- MODAL BOX (content stays same) -->
          <div
            class="relative h-full max-h-[80vh] overflow-y-auto rounded-2xl bg-[#0B0B0D]/95 font-roboto backdrop-blur-sm border border-[rgba(201,162,77,0.15)] shadow-[#12101E]"
            @keydown="onKeydown"
            tabindex="0"
          >
            <!-- Header -->
            <div class="relative px-5 sm:px-6 pt-5 sm:pt-6">
              <div class="flex items-start justify-between gap-3">
                <div class="opacity-0 translate-y-4 animate-delay-sm">
                  <h2
                    class="text-[24px] sm:text-[28px] leading-[30px] sm:leading-[32px] text-[#C9A24D] font-medium"
                  >
                    {{ t("joinModal.title") }}
                  </h2>
                  <p class="mt-2 text-[14px] sm:text-sm text-white/55">
                    {{ t("joinModal.subtitle") }}
                  </p>
                </div>

                <button
                  type="button"
                  class="rounded-md p-2 text-white/45 hover:text-white/80 transition"
                  aria-label="Close"
                  @click="close"
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
              <div class="space-y-4 sm:space-y-5">
                <!-- Full Name -->
                <div class="opacity-0 translate-y-4 animate-delay-sm">
                  <label
                    class="block text-[14px] font-medium text-white/70 mb-2"
                  >
                    {{ t("joinModal.fullName") }}
                  </label>

                  <div class="relative">
                    <span
                      class="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <g opacity="0.4">
                          <path
                            d="M12.6666 14V12.6667C12.6666 11.9594 12.3857 11.2811 11.8856 10.781C11.3855 10.281 10.7072 10 9.99998 10H5.99998C5.29274 10 4.61446 10.281 4.11436 10.781C3.61426 11.2811 3.33331 11.9594 3.33331 12.6667V14"
                            stroke="#F4F2ED"
                            stroke-width="1.33333"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M7.99998 7.33333C9.47274 7.33333 10.6666 6.13943 10.6666 4.66667C10.6666 3.19391 9.47274 2 7.99998 2C6.52722 2 5.33331 3.19391 5.33331 4.66667C5.33331 6.13943 6.52722 7.33333 7.99998 7.33333Z"
                            stroke="#F4F2ED"
                            stroke-width="1.33333"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </g>
                      </svg>
                    </span>

                    <input
                      v-model="fullName"
                      type="text"
                      :placeholder="t('joinModal.fullNamePlaceholder')"
                      :class="['w-full rounded-xl border pl-11 pr-4 py-4 text-sm text-white/90 placeholder:text-white/25 outline-none focus:border-[#C9A24D]/50', fieldErrors.fullName ? 'border-red-500/60 bg-red-500/5' : 'border-[#C9A24D]/15 bg-white/[0.03] focus:bg-white/[0.04]']"
                      @input="updateErrorsOnInput"
                    />
                  </div>
                  <p v-if="fieldErrors.fullName" class="mt-1.5 text-xs text-red-400">{{ fieldErrors.fullName }}</p>
                </div>
                <!-- Username -->
                <div class="opacity-0 translate-y-4 animate-delay-md">
                  <label
                    class="block text-[14px] font-medium text-white/70 mb-2"
                  >
                    {{ t("joinModal.userName") }}
                  </label>

                  <div class="relative">
                    <span
                      class="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <g opacity="0.4">
                          <path
                            d="M12.6666 14V12.6667C12.6666 11.9594 12.3857 11.2811 11.8856 10.781C11.3855 10.281 10.7072 10 9.99998 10H5.99998C5.29274 10 4.61446 10.281 4.11436 10.781C3.61426 11.2811 3.33331 11.9594 3.33331 12.6667V14"
                            stroke="#F4F2ED"
                            stroke-width="1.33333"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M7.99998 7.33333C9.47274 7.33333 10.6666 6.13943 10.6666 4.66667C10.6666 3.19391 9.47274 2 7.99998 2C6.52722 2 5.33331 3.19391 5.33331 4.66667C5.33331 6.13943 6.52722 7.33333 7.99998 7.33333Z"
                            stroke="#F4F2ED"
                            stroke-width="1.33333"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </g>
                      </svg>
                    </span>

                    <input
                      v-model="userName"
                      type="text"
                      :placeholder="t('joinModal.userNamePlaceholder')"
                      :class="['w-full rounded-xl border pl-11 pr-4 py-4 text-sm text-white/90 placeholder:text-white/25 outline-none focus:border-[#C9A24D]/50', fieldErrors.userName ? 'border-red-500/60 bg-red-500/5' : 'border-[#C9A24D]/15 bg-white/[0.03] focus:bg-white/[0.04]']"
                      @input="updateErrorsOnInput"
                    />
                  </div>
                  <p v-if="fieldErrors.userName" class="mt-1.5 text-xs text-red-400">{{ fieldErrors.userName }}</p>
                </div>

                <!-- Email -->
                <div class="opacity-0 translate-y-4 animate-delay-lg">
                  <label
                    class="block text-[14px] font-medium text-white/70 mb-2"
                  >
                    {{ t("joinModal.email") }}
                  </label>

                  <div class="relative">
                    <span
                      class="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                    >
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
                      :placeholder="t('joinModal.emailPlaceholder')"
                      :class="['w-full rounded-xl border pl-11 pr-4 py-4 text-sm text-white/90 placeholder:text-white/25 outline-none focus:border-[#C9A24D]/50', fieldErrors.email ? 'border-red-500/60 bg-red-500/5' : 'border-[#C9A24D]/15 bg-white/[0.03] focus:bg-white/[0.04]']"
                      @input="updateErrorsOnInput"
                    />
                  </div>
                  <p v-if="fieldErrors.email" class="mt-1.5 text-xs text-red-400">{{ fieldErrors.email }}</p>
                </div>

                <!-- Password -->
                <div class="opacity-0 translate-y-4 animate-delay-lg">
                  <label class="block text-sm font-medium text-white/70 mb-2">
                    {{ t("joinModal.password") }}
                  </label>

                  <div class="relative">
                    <span
                      class="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                    >
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
                      v-model="password"
                      :type="showJoinPassword ? 'text' : 'password'"
                      :placeholder="t('joinModal.passwordPlaceholder')"
                      :class="['w-full rounded-xl border pl-11 pr-10 py-4 text-sm text-white/90 placeholder:text-white/25 outline-none focus:border-[#C9A24D]/50', fieldErrors.password ? 'border-red-500/60 bg-red-500/5' : 'border-[#C9A24D]/15 bg-white/[0.03] focus:bg-white/[0.04]']"
                      @input="updateErrorsOnInput"
                    />
                    <button
                      type="button"
                      class="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80"
                      aria-label="Toggle password visibility"
                      @click="showJoinPassword = !showJoinPassword"
                    >
                      <svg v-if="showJoinPassword" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.223-3.592M6.18 6.18A9.953 9.953 0 0112 5c4.477 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411M15 12a3 3 0 00-3-3m0 0a3 3 0 013 3m-3-3L4 20" />
                      </svg>
                    </button>
                  </div>
                  <p v-if="fieldErrors.password" class="mt-1.5 text-xs text-red-400">{{ fieldErrors.password }}</p>
                </div>

                <!-- Confirm Password -->
                <div class="opacity-0 translate-y-4 animate-delay-xl">
                  <label class="block text-sm font-medium text-white/70 mb-2">
                    {{ t("joinModal.confirmpassword") }}
                  </label>

                  <div class="relative">
                    <span
                      class="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                    >
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
                      :type="showJoinConfirmPassword ? 'text' : 'password'"
                      :placeholder="t('joinModal.confirmPasswordPlaceholder')"
                      :class="['w-full rounded-xl border pl-11 pr-10 py-4 text-sm text-white/90 placeholder:text-white/25 outline-none focus:border-[#C9A24D]/50', fieldErrors.confirmPassword ? 'border-red-500/60 bg-red-500/5' : 'border-[#C9A24D]/15 bg-white/[0.03] focus:bg-white/[0.04]']"
                      @input="updateErrorsOnInput"
                    />
                    <button
                      type="button"
                      class="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80"
                      aria-label="Toggle confirm password visibility"
                      @click="showJoinConfirmPassword = !showJoinConfirmPassword"
                    >
                      <svg v-if="showJoinConfirmPassword" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
              </div>

              <!-- Success Message -->
              <!-- (Intentionally removed success banner; we redirect immediately after signup) -->

              <!-- Error Message -->
              <div
                v-if="signupError || authStore.error"
                class="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
              >
                {{ signupError || authStore.error }}
              </div>

              <!-- Purple info bar -->
              <div
                class="mt-5 sm:mt-6 font-regular rounded-xl border border-[#5B3FD6]/25 px-4 py-3 sm:py-4 text-[13px] sm:text-sm text-white/70 opacity-0 translate-y-4 animate-delay-xl"
                style="
                  background: linear-gradient(
                    90deg,
                    rgba(91, 63, 214, 0.18),
                    rgba(91, 63, 214, 0.08)
                  );
                "
              >
                {{ t("joinModal.info") }}
              </div>

              <!-- CTA -->
              <button
                type="button"
                :disabled="authStore.isLoading"
                class="mt-5 sm:mt-6 w-full rounded-xl bg-[#C9A24D] py-3.5 sm:py-4 text-center font-bold tracking-widest text-black shadow-[0_18px_50px_rgba(0,0,0,0.60)] hover:brightness-110 active:scale-[0.99] transition disabled:opacity-50 disabled:cursor-not-allowed opacity-0 translate-y-4 animate-fade-left-delay-xl inline-flex items-center justify-center gap-2"
                @click="handleSignup"
              >
                <div
                  v-if="authStore.isLoading"
                  class="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0"
                  role="status"
                  aria-label="Loading"
                />
                <span v-if="authStore.isLoading">Signing up...</span>
                <span v-else>{{ t("joinModal.joinCta") }}</span>
              </button>

              <!-- Footer -->
              <div
                class="my-6 sm:my-7 border-t border-white/10 pt-4 sm:pt-5 text-center text-[13px] sm:text-sm text-white/45"
              >
                {{ t("joinModal.haveAccount") }}
                <button
                  type="button"
                  class="ml-2 font-medium text-[#C9A24D] hover:opacity-90"
                  @click="openSignIn"
                >
                  {{ t("joinModal.signInLink") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>

  <AuthModal
    :isOpen="isAuthOpen"
    initialMode="signin"
    @close="isAuthOpen = false"
  />
  </div>
</template>

<style scoped>
/* If you don't have xs breakpoint, remove xs:scale-[0.95] above */
.join-fade-enter-active,
.join-fade-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}
.join-fade-enter-from,
.join-fade-leave-to {
  opacity: 0;
  transform: scale(0.97);
}
/* Custom scrollbar for the modal */
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
