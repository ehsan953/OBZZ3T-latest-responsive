<template>
  <Teleport to="body">
    <Transition name="modal-backdrop">
      <div
        v-if="isOpen"
        v-motion="backdropMotion"
        class="fixed inset-0 bg-[rgba(11,11,13,0.95)] backdrop-blur-sm z-50 flex items-center justify-center p-6"
        @click="$emit('close')"
      >
        <div
          v-motion="modalMotion"
          class="w-full max-w-md"
          @click.stop
        >
          <OB33ZCard :glow="true">
            <div class="flex items-center justify-between mb-6">
              <div class="opacity-0 translate-y-4 animate-delay-sm">
                <h2 class="text-2xl text-[#C9A24D] mb-1">
                  {{ t('welcomeBack') }}
                </h2>
                <p class="text-sm text-[#F4F2ED] opacity-60">
                  {{ t('signInToContinue') }}
                </p>
              </div>
              <button
                @click="$emit('close')"
                class="text-[#F4F2ED] opacity-60 hover:opacity-100 transition-opacity"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Success Message -->
            <div
              v-if="loginSuccess"
              class="mb-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300"
            >
              {{ loginSuccess }}
            </div>

            <!-- Error Message -->
            <div
              v-if="loginError"
              class="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
            >
              {{ loginError }}
            </div>

            <form @submit.prevent="handleSubmit" class="space-y-4">
              <div class="opacity-0 translate-y-4 animate-delay-md">
                <label class="block text-sm text-[#F4F2ED] opacity-80 mb-2">
                  Email or username
                </label>
                <div class="relative">
                  <svg
                    class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F4F2ED] opacity-40"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <OB33ZInput
                    v-model="email"
                    v-bind="emailAttrs"
                    type="text"
                    placeholder="Enter email or username"
                    :class="['pl-10', errors.email ? 'border-red-500/60' : '']"
                  />
                </div>
                <p v-if="errors.email" class="text-xs text-red-400 mt-1">{{ errors.email }}</p>
              </div>

              <div class="opacity-0 translate-y-4 animate-delay-lg">
                <label class="block text-sm text-[#F4F2ED] opacity-80 mb-2">
                  {{ t('password') }}
                </label>
                <div class="relative">
                  <svg
                    class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F4F2ED] opacity-40"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <OB33ZInput
                    v-model="password"
                    v-bind="passwordAttrs"
                    :type="showPassword ? 'text' : 'password'"
                    :placeholder="t('enterPassword')"
                    :class="['pl-10 pr-10', errors.password ? 'border-red-500/60' : '']"
                  />
                  <button
                    type="button"
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-[#F4F2ED] opacity-50 hover:opacity-90"
                    aria-label="Toggle password visibility"
                    @click="showPassword = !showPassword"
                  >
                    <!-- Eye open -->
                    <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <!-- Eye off -->
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.223-3.592M6.18 6.18A9.953 9.953 0 0112 5c4.477 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411M15 12a3 3 0 00-3-3m0 0a3 3 0 013 3m-3-3L4 20" />
                    </svg>
                  </button>
                </div>
                <p v-if="errors.password" class="text-xs text-red-400 mt-1">{{ errors.password }}</p>
              </div>

              <OB33ZButton 
                type="submit" 
                variant="primary" 
                :disabled="isRedirecting"
                :loading="authStore.isLoading"
                class="w-full opacity-0 translate-y-4 animate-fade-left-delay-lg"
              >
                <span v-if="isRedirecting">Redirecting...</span>
                <span v-else-if="authStore.isLoading">Signing in...</span>
                <span v-else>{{ t('signIn') }}</span>
              </OB33ZButton>
            </form>

            <div class="mt-4 text-center opacity-0 translate-y-4 animate-delay-xl">
              <button
                type="button"
                @click="isForgotPasswordOpen = true"
                class="text-sm text-[#C9A24D] hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <div class="mt-6 pt-6 border-t border-[rgba(201,162,77,0.15)] text-center">
              <p class="text-sm text-[#F4F2ED] opacity-60">
                {{ t('dontHaveAccount') }}
                <button
                  type="button"
                  @click="isJoinOpen = true"
                  class="text-[#C9A24D] hover:underline ml-1"
                >
                  {{ t('join') }}
                </button>
              </p>
            </div>
          </OB33ZCard>
        </div>
        <Join v-model="isJoinOpen" />
        <ForgotPasswordModal 
          :isOpen="isForgotPasswordOpen" 
          @close="isForgotPasswordOpen = false"
          @success="handlePasswordResetSuccess"
        />
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useForm } from "vee-validate";
import { useLanguage } from "#imports";
import { useAuthStore } from "~/stores/auth";
import { useFlashMessage } from "~/composables/useFlashMessage";
import { useTransitionScreen } from "~/composables/useTransitionScreen";

const { t } = useLanguage();
const authStore = useAuthStore();
const flash = useFlashMessage();
const { startTransition } = useTransitionScreen();
const isJoinOpen = ref(false);
const isForgotPasswordOpen = ref(false);
const loginError = ref<string | null>(null);
const loginSuccess = ref<string | null>(null);
const isRedirecting = ref(false);

interface Props {
  isOpen: boolean;
}

const props = withDefaults(defineProps<Props>(), {});

const emit = defineEmits<{
  close: [];
  success: [userData: { name: string; email: string }];
}>();

const showPassword = ref(false);

// VeeValidate: validation only runs on submit, so errors show after user clicks Sign In
const loginSchema = {
  email(value: string) {
    const s = (value ?? "").trim();
    if (!s) return "Email or username is required";
    // If it looks like an email (contains @), validate as email
    if (s.includes("@")) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)) return "Please enter a valid email address";
      return true;
    }
    // Otherwise validate as username: min length, allowed chars
    if (s.length < 3) return "Username must be at least 3 characters";
    if (!/^[\p{L}\p{N}_.\-@]+$/u.test(s)) return "Username can only use letters, numbers, and _ . - @";
    return true;
  },
  password(value: string) {
    const s = (value ?? "").trim();
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
    return true;
  },
};

const { defineField, errors, handleSubmit: formHandleSubmit, resetForm } = useForm({
  validationSchema: loginSchema,
  initialValues: { email: "", password: "" },
});

const [email, emailAttrs] = defineField("email");
const [password, passwordAttrs] = defineField("password");

// Reset form when modal opens
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    loginError.value = null;
    loginSuccess.value = null;
    isRedirecting.value = false;
    authStore.error = null;
    resetForm();
  }
});

onMounted(() => {
  if (props.isOpen) {
    loginError.value = null;
    loginSuccess.value = null;
    authStore.error = null;
    resetForm();
  }
});

const handleSubmit = formHandleSubmit(async (values) => {
  loginError.value = null;
  loginSuccess.value = null;
  authStore.error = null;
  isRedirecting.value = false;

  try {
    await authStore.login({
      email: values.email,
      password: values.password,
    });

    isRedirecting.value = true;
    flash.setSuccess("Login successful. Welcome back!");

    emit("success", {
      name: authStore.user?.name || "Member",
      email: values.email,
    });

    await startTransition("/vibe-room");
    emit("close");
    resetForm();
  } catch (error: any) {
    loginError.value = authStore.error || "Login failed. Please check your credentials.";
  }
});

const handlePasswordResetSuccess = () => {
  // Close forgot password modal and show success message
  isForgotPasswordOpen.value = false;
  loginError.value = null;
  // Optionally show a success message or auto-fill email
};

const backdropMotion = {
  initial: { opacity: 0 },
  enter: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
  leave: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

const modalMotion = {
  initial: { scale: 0.9, opacity: 0, y: 20 },
  enter: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, easing: "ease-out" },
  },
  leave: {
    scale: 0.9,
    opacity: 0,
    y: 20,
    transition: { duration: 0.2 },
  },
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
</style>
