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
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-[#C9A24D] to-[#5B3FD6] flex items-center justify-center">
                  <svg class="w-5 h-5 text-[#0B0B0D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h2 class="text-2xl text-[#C9A24D]">{{ t('verifyAccount') }}</h2>
                  <p class="text-sm text-[#F4F2ED] opacity-60">{{ t('unlockAllFeatures') }}</p>
                </div>
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

            <Transition name="step" mode="out-in">
              <!-- Method Selection -->
              <div v-if="step === 'method'" key="method" class="space-y-3">
                <p class="text-sm text-[#F4F2ED] opacity-80 mb-4">
                  {{ t('chooseVerificationMethod') }}
                </p>

                <button
                  v-motion="{ initial: { scale: 1 }, enter: { scale: 1 } }"
                  @click="step = 'email'"
                  class="w-full p-4 rounded-lg bg-[rgba(244,242,237,0.02)] border border-[rgba(201,162,77,0.15)] hover:border-[#C9A24D] hover:bg-[rgba(201,162,77,0.05)] transition-all text-left"
                >
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-[rgba(201,162,77,0.2)] flex items-center justify-center">
                      <svg class="w-5 h-5 text-[#C9A24D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <div class="text-[#F4F2ED] font-medium mb-1">{{ t('emailVerification') }}</div>
                      <div class="text-xs text-[#F4F2ED] opacity-60">{{ t('verifyViaEmail') }}</div>
                    </div>
                  </div>
                </button>

                <button
                  v-motion="{ initial: { scale: 1 }, enter: { scale: 1 } }"
                  @click="step = 'phone'"
                  class="w-full p-4 rounded-lg bg-[rgba(244,242,237,0.02)] border border-[rgba(201,162,77,0.15)] hover:border-[#C9A24D] hover:bg-[rgba(201,162,77,0.05)] transition-all text-left"
                >
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-[rgba(201,162,77,0.2)] flex items-center justify-center">
                      <svg class="w-5 h-5 text-[#C9A24D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <div class="text-[#F4F2ED] font-medium mb-1">{{ t('phoneVerification') }}</div>
                      <div class="text-xs text-[#F4F2ED] opacity-60">{{ t('verifyViaPhone') }}</div>
                    </div>
                  </div>
                </button>
              </div>

              <!-- Email Verification -->
              <div v-else-if="step === 'email'" key="email" class="space-y-4">
                <div>
                  <label class="block text-sm text-[#F4F2ED] opacity-80 mb-2">
                    {{ t('emailAddress') }}
                  </label>
                  <div class="relative">
                    <svg
                      class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F4F2ED] opacity-40"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <OB33ZInput
                      v-model="verificationData.email"
                      type="email"
                      :placeholder="t('enterEmail')"
                      class="pl-10"
                      :disabled="true"
                    />
                  </div>
                </div>

                <div v-if="emailError" class="p-3 rounded-lg border border-red-500/30 bg-red-500/10 text-sm text-red-400">
                  {{ emailError }}
                </div>

                <div class="flex gap-3 pt-2">
                  <OB33ZButton variant="ghost" @click="handleBackToMethod" class="flex-1">
                    {{ t('back') }}
                  </OB33ZButton>
                  <OB33ZButton
                    variant="primary"
                    class="flex-1"
                    :disabled="authStore.isLoading || !verificationData.email"
                    :loading="authStore.isLoading"
                    @click="handleSendEmailVerification"
                  >
                    {{ authStore.isLoading ? 'Sending...' : 'Send Email' }}
                  </OB33ZButton>
                </div>
              </div>

              <!-- Email Verification: Sent -->
              <div v-else-if="step === 'emailSent'" key="emailSent" class="space-y-4">
                <div class="p-4 rounded-lg border border-[rgba(201,162,77,0.2)] bg-[rgba(201,162,77,0.06)]">
                  <div class="text-[#F4F2ED] font-medium mb-1">Verification link sent</div>
                  <div class="text-sm text-[#F4F2ED]/70">
                    We sent a verification link to <strong class="text-[#C9A24D]">{{ verificationData.email }}</strong>.
                    Please verify your email to move further.
                  </div>
                </div>

                <div v-if="emailError" class="p-3 rounded-lg border border-red-500/30 bg-red-500/10 text-sm text-red-400">
                  {{ emailError }}
                </div>

                <div v-if="isEmailVerified" class="p-3 rounded-lg border border-green-500/30 bg-green-500/10 text-sm text-green-400">
                  Email verified successfully. You can continue to document verification.
                </div>
                <div v-else class="text-xs text-[#F4F2ED]/60">
                  After verifying, come back here — we’ll check your status automatically.
                </div>

                <div class="flex gap-3 pt-2">
                  <OB33ZButton variant="ghost" @click="handleBackToMethod" class="flex-1">
                    {{ t('back') }}
                  </OB33ZButton>
                  <OB33ZButton
                    variant="secondary"
                    class="flex-1"
                    :disabled="authStore.isLoading"
                    :loading="authStore.isLoading"
                    @click="handleRefreshAndMaybeContinue"
                  >
                    {{ authStore.isLoading ? 'Checking...' : (isEmailVerified ? 'Continue' : "I've verified") }}
                  </OB33ZButton>
                </div>
              </div>

              <!-- Phone Verification: Step 1 – Send OTP (number read-only, then Send OTP) -->
              <div v-else-if="step === 'phone' && phoneSubStep === 'send'" key="phone-send" class="space-y-4">
                <p class="text-sm text-[#F4F2ED] opacity-80 mb-2">
                  We'll send a verification code to this number. To change it, update your phone in Profile.
                </p>
                <div>
                  <label class="block text-sm text-[#F4F2ED] opacity-80 mb-2">
                    {{ t('phoneNumber') }}
                  </label>
                  <div class="relative">
                    <svg
                      class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F4F2ED] opacity-40"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <OB33ZInput
                      :model-value="displayPhoneNumber"
                      type="text"
                      class="pl-10 opacity-90"
                      disabled
                    />
                  </div>
                </div>

                <div v-if="phoneError" class="p-3 rounded-lg border border-red-500/30 bg-red-500/10 text-sm text-red-400">
                  {{ phoneError }}
                </div>

                <div class="flex gap-3 pt-2">
                  <OB33ZButton variant="ghost" @click="handleBackToMethod" class="flex-1">
                    {{ t('back') }}
                  </OB33ZButton>
                  <OB33ZButton
                    variant="primary"
                    class="flex-1"
                    :disabled="authStore.isLoading || !displayPhoneNumber"
                    :loading="authStore.isLoading"
                    @click="handleSendPhoneOtp"
                  >
                    {{ authStore.isLoading ? 'Sending...' : 'Send OTP' }}
                  </OB33ZButton>
                </div>
              </div>

              <!-- Phone Verification: Step 2 – Verify OTP -->
              <div v-else-if="step === 'phone' && phoneSubStep === 'verify'" key="phone-verify" class="space-y-4">
                <p class="text-sm text-[#F4F2ED] opacity-80 mb-2">
                  Enter the code sent to <strong class="text-[#C9A24D]">{{ displayPhoneNumber }}</strong>
                </p>
                <div>
                  <label class="block text-sm text-[#F4F2ED] opacity-80 mb-2">
                    {{ t('verificationCode') }}
                  </label>
                  <OB33ZInput
                    :model-value="verificationData.code"
                    type="tel"
                    inputmode="numeric"
                    :placeholder="t('enterCode')"
                    maxlength="6"
                    :class="['text-center tracking-[0.4em]', otpCodeError ? 'border-red-500/60' : '']"
                    @update:model-value="onOtpCodeInput"
                  />
                  <p v-if="otpCodeError" class="text-xs text-red-400 mt-1 flex items-center gap-1">
                    <svg class="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {{ otpCodeError }}
                  </p>
                  <p v-else class="text-xs text-[#F4F2ED] opacity-50 mt-1">Enter 6 digits only (numbers)</p>
                </div>

                <div v-if="phoneError" class="p-3 rounded-lg border border-red-500/30 bg-red-500/10 text-sm text-red-400">
                  {{ phoneError }}
                </div>

                <div class="flex gap-3 pt-2">
                  <OB33ZButton variant="ghost" @click="phoneSubStep = 'send'" class="flex-1">
                    {{ t('back') }}
                  </OB33ZButton>
                  <OB33ZButton
                    variant="primary"
                    class="flex-1"
                    :disabled="authStore.isLoading || !verificationData.code.trim()"
                    :loading="authStore.isLoading"
                    @click="handleSubmitCode"
                  >
                    <span v-if="authStore.isLoading">Verifying...</span>
                    <span v-else>{{ t('verify') }}</span>
                  </OB33ZButton>
                </div>
              </div>

              <!-- Document Verification Prompt -->
              <div v-else-if="step === 'docPrompt'" key="docPrompt" class="space-y-4">
                <div class="p-4 rounded-lg border border-[rgba(201,162,77,0.25)] bg-[rgba(201,162,77,0.08)]">
                  <h3 class="text-[#C9A24D] text-lg mb-2">Document verification required</h3>
                  <p class="text-sm text-[#F4F2ED] opacity-80">
                    You completed phone/email verification. Document verification is required to continue.
                    Do you want to continue now?
                  </p>
                </div>

                <div class="flex gap-3 pt-2">
                  <OB33ZButton variant="ghost" class="flex-1" @click="$emit('close')">
                    Not now
                  </OB33ZButton>
                  <OB33ZButton variant="primary" class="flex-1" @click="handleContinueToDocumentVerification">
                    Continue
                  </OB33ZButton>
                </div>
              </div>

              <!-- Document Verification -->
              <div v-else-if="step === 'photo'" key="photo" class="space-y-4">
                <div v-if="documentVerificationStatus === 'checking'" class="text-center py-8">
                  <div class="w-16 h-16 border-4 border-[#C9A24D] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p class="text-sm text-[#F4F2ED] opacity-80">Checking verification status...</p>
                </div>
                
                <div v-else-if="documentVerificationStatus === 'failed'" class="space-y-4">
                  <div class="p-4 rounded-lg border border-red-500/30 bg-red-500/10 text-center">
                    <svg class="w-12 h-12 text-red-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 class="text-lg text-red-400 mb-2">Verification Failed</h3>
                    <p class="text-sm text-[#F4F2ED] opacity-80 mb-4">
                      Your document verification was not successful. Please try again.
                    </p>
                    <OB33ZButton variant="primary" @click="handleStartDocumentVerification" :disabled="authStore.isLoading">
                      <span v-if="authStore.isLoading">Starting...</span>
                      <span v-else>Try Again</span>
                    </OB33ZButton>
                  </div>
                </div>

                <div v-else class="border-2 border-dashed border-[rgba(201,162,77,0.3)] rounded-lg p-8 text-center">
                  <svg
                    class="w-12 h-12 text-[#C9A24D] mx-auto mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p class="text-sm text-[#F4F2ED] mb-2">{{ t('documentVerification') }}</p>
                  <p class="text-xs text-[#F4F2ED] opacity-60 mb-4">
                    Click below to start document verification. You will be redirected to complete the process.
                  </p>
                  <OB33ZButton 
                    variant="secondary" 
                    @click="handleStartDocumentVerification"
                    :disabled="authStore.isLoading"
                  >
                    <span v-if="authStore.isLoading">Starting...</span>
                    <span v-else>Start Verification</span>
                  </OB33ZButton>
                </div>

                <div v-if="documentVerificationError" class="p-3 rounded-lg border border-red-500/30 bg-red-500/10 text-sm text-red-400">
                  {{ documentVerificationError }}
                </div>

                <div v-if="documentVerificationStatus !== 'checking' && documentVerificationStatus !== 'failed'" class="flex gap-3 pt-2">
                  <OB33ZButton variant="ghost" @click="handleBackToMethod" class="flex-1">
                    {{ t('back') }}
                  </OB33ZButton>
                </div>
              </div>

              <!-- Success -->
              <div v-else-if="step === 'success'" key="success" class="text-center py-8">
                <div
                  v-motion="successMotion"
                  class="w-20 h-20 rounded-full bg-gradient-to-br from-[#C9A24D] to-[#5B3FD6] flex items-center justify-center mx-auto mb-4"
                >
                  <svg class="w-10 h-10 text-[#0B0B0D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 class="text-xl text-[#C9A24D] mb-2">{{ t('verificationSuccess') }}</h3>
                <p class="text-sm text-[#F4F2ED] opacity-80 mb-4">{{ t('youAreNowVerified') }}</p>
                <p class="text-xs text-[#F4F2ED] opacity-60">Returning to verification options...</p>
              </div>
            </Transition>
          </OB33ZCard>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useLanguage } from "#imports";
import { useAuthStore } from "~/stores/auth";

const { t } = useLanguage();
const authStore = useAuthStore();

interface Props {
  isOpen: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  close: [];
  verify: [];
}>();

const step = ref<"method" | "email" | "emailSent" | "phone" | "docPrompt" | "photo" | "success">("method");
const phoneSubStep = ref<"send" | "verify">("send");
const lastVerifiedMethod = ref<"email" | "phone" | "photo" | null>(null);
const verificationData = ref({
  email: "",
  phone: "",
  code: "",
});
const emailError = ref<string | null>(null);
const isEmailVerified = computed(() => {
  const user = authStore.user;
  if (!user) return false;
  return user.email_verified_at !== null || user.is_email_verified === true || user.email_verified === true;
});

let emailVerificationPollTimer: number | null = null;

function stopEmailVerificationPolling() {
  if (emailVerificationPollTimer != null) {
    clearInterval(emailVerificationPollTimer);
    emailVerificationPollTimer = null;
  }
}

function startEmailVerificationPolling() {
  stopEmailVerificationPolling();
  // Poll /user for a short period while user verifies via email link
  emailVerificationPollTimer = window.setInterval(async () => {
    if (!props.isOpen) return;
    if (step.value !== "emailSent") return;
    if (!authStore.isAuthenticated) return;
    try {
      await authStore.getCurrentUser();
      if (isEmailVerified.value) {
        // Once verified, prompt user before document verification
        stopEmailVerificationPolling();
        step.value = "docPrompt";
      }
    } catch {
      // ignore polling errors
    }
  }, 3000);
}
const phoneError = ref<string | null>(null);
const otpCodeError = ref("");

const displayPhoneNumber = computed(() => authStore.user?.phone_number || verificationData.value.phone || "—");

function onOtpCodeInput(val: string) {
  const raw = val || "";
  const digits = raw.replace(/\D/g, "").slice(0, 6);
  verificationData.value.code = digits;
  if (raw.length > 0 && raw !== digits) {
    otpCodeError.value = "Please enter digits only (numbers)";
  } else {
    otpCodeError.value = "";
  }
}
const photoVerificationError = ref<string | null>(null);
const documentVerificationError = ref<string | null>(null);
const documentVerificationStatus = ref<'idle' | 'checking' | 'failed' | 'redirecting'>('idle');

// Check if user has email or phone verified
const hasEmailOrPhoneVerified = computed(() => {
  if (!authStore.user) return false;
  const user = authStore.user;
  // Check for email verification
  const emailVerified = user.email_verified_at !== null || 
                       user.is_email_verified === true ||
                       user.email_verified === true;
  // Check for phone verification
  const phoneVerified = user.phone_verified_at !== null ||
                       user.is_phone_verified === true ||
                       user.phone_verified === true;
  
  if (process.client) {
    console.log('Checking verification status:', {
      email_verified_at: user.email_verified_at,
      is_email_verified: user.is_email_verified,
      email_verified: user.email_verified,
      phone_verified_at: user.phone_verified_at,
      is_phone_verified: user.is_phone_verified,
      phone_verified: user.phone_verified,
      emailVerified,
      phoneVerified,
      result: emailVerified || phoneVerified
    });
  }
  
  return emailVerified || phoneVerified;
});

watch(() => props.isOpen, (open) => {
  if (open) {
    // If email/phone already verified, ask user before document verification
    step.value = hasEmailOrPhoneVerified.value ? "docPrompt" : "method";
    phoneSubStep.value = "send";
    lastVerifiedMethod.value = null;
    verificationData.value.email = authStore.user?.email || "";
    verificationData.value.phone = authStore.user?.phone_number || "";
    verificationData.value.code = "";
    otpCodeError.value = "";
    emailError.value = null;
    phoneError.value = null;
    photoVerificationError.value = null;
    documentVerificationError.value = null;
    documentVerificationStatus.value = 'idle';
    stopEmailVerificationPolling();
  } else {
    documentVerificationStatus.value = 'idle';
    stopEmailVerificationPolling();
  }
});

watch(step, async (newStep) => {
  if (!authStore.isAuthenticated) return;
  if (newStep === "phone") {
    phoneSubStep.value = "send";
    phoneError.value = null;
    verificationData.value.phone = authStore.user?.phone_number || "";
  } else if (newStep === "docPrompt") {
    stopEmailVerificationPolling();
    documentVerificationStatus.value = 'idle';
  } else if (newStep === "photo") {
    stopEmailVerificationPolling();
    checkDocumentVerificationStatus();
  } else if (newStep === "emailSent") {
    // Start polling to detect when user verifies the email
    if (typeof window !== "undefined") startEmailVerificationPolling();
  } else {
    stopEmailVerificationPolling();
  }
});

const handleSendEmailVerification = async () => {
  emailError.value = null;
  if (!authStore.isAuthenticated) return;
  try {
    await authStore.sendEmailVerification();
    step.value = "emailSent";
  } catch (e) {
    emailError.value = authStore.error || "Failed to send verification email";
  }
};

const handleRefreshAndMaybeContinue = async () => {
  emailError.value = null;
  if (!authStore.isAuthenticated) return;
  try {
    await authStore.getCurrentUser();
    if (isEmailVerified.value) {
      stopEmailVerificationPolling();
      step.value = "docPrompt";
    }
  } catch (e) {
    emailError.value = authStore.error || "Failed to refresh verification status";
  }
};

// Refresh user data after successful verification; then redirect to document verification if came from phone
watch(() => step.value === "success", async (isSuccess) => {
  if (isSuccess && authStore.isAuthenticated) {
    try {
      await authStore.getCurrentUser();
    } catch (error) {
      console.error('Failed to refresh user data after verification:', error);
    }
    setTimeout(() => {
      emailError.value = null;
      phoneError.value = null;
      photoVerificationError.value = null;
      verificationData.value.code = "";
      if (lastVerifiedMethod.value === "phone") {
        lastVerifiedMethod.value = null;
        step.value = "docPrompt";
      } else {
        step.value = "method";
      }
    }, 2500);
  }
});

const handleBackToMethod = async () => {
  photoVerificationError.value = null;
  phoneSubStep.value = "send";
  step.value = "method";
  if (authStore.isAuthenticated) {
    try {
      await authStore.getCurrentUser();
    } catch (error) {
      console.error('Failed to refresh user data:', error);
    }
  }
};

const handleSendPhoneOtp = async () => {
  phoneError.value = null;
  if (!authStore.user?.phone_number) {
    phoneError.value = "No phone number on your profile. Please update your profile first.";
    return;
  }
  try {
    await authStore.sendPhoneVerification();
    verificationData.value.phone = authStore.user.phone_number;
    phoneSubStep.value = "verify";
  } catch (e) {
    phoneError.value = authStore.error || "Failed to send OTP. Please try again.";
  }
};

const handlePhotoVerificationClick = () => {
  photoVerificationError.value = null;
  documentVerificationError.value = null;
  
  // if (!hasEmailOrPhoneVerified.value) {
  //   photoVerificationError.value = "Please complete email or phone verification first before document verification.";
  //   return;
  // }
  
  // If verified, proceed to document verification step
  step.value = "photo";
};

const handleContinueToDocumentVerification = () => {
  photoVerificationError.value = null;
  documentVerificationError.value = null;
  step.value = "photo";
};

const handleStartDocumentVerification = async () => {
  documentVerificationError.value = null;
  documentVerificationStatus.value = 'redirecting';
  
  try {
    const response = await authStore.startDocumentVerification();
    
    // Get the verification URL from response
    const verificationUrl = response.url || 
                           response.verification_url || 
                           (response.data && (response.data.url || response.data.verification_url));
    
    if (verificationUrl) {
      // Redirect to the verification URL
      if (typeof window !== 'undefined') {
        window.location.href = verificationUrl;
      }
    } else {
      throw new Error('No verification URL received from server');
    }
  } catch (error) {
    documentVerificationStatus.value = 'idle';
    documentVerificationError.value = authStore.error || "Failed to start document verification. Please try again.";
  }
};

// Check verification status when modal opens (in case user returned from verification)
const checkDocumentVerificationStatus = async () => {
  if (step.value === 'photo' && documentVerificationStatus.value !== 'checking') {
    documentVerificationStatus.value = 'checking';
    documentVerificationError.value = null;
    
    try {
      const response = await authStore.getDocumentVerificationStatus();
      const status = response.status || 
                    response.verification_status || 
                    (response.data && (response.data.status || response.data.verification_status));
      
      if (status === 'verified' || status === 'success' || status === 'approved') {
        // Verification successful - refresh user data
        try {
          await authStore.getCurrentUser();
        } catch (error) {
          console.error('Failed to refresh user data after document verification:', error);
        }
        step.value = 'success';
        emit('verify');
        // Will auto-return to method selection after 2.5 seconds
      } else if (status === 'failed' || status === 'rejected' || status === 'declined') {
        // Verification failed
        documentVerificationStatus.value = 'failed';
      } else if (status === 'pending' || status === 'processing' || status === 'in_progress') {
        // Still processing, check again after a delay
        documentVerificationStatus.value = 'idle';
        setTimeout(() => {
          if (step.value === 'photo') {
            checkDocumentVerificationStatus();
          }
        }, 3000);
      } else {
        // Unknown status or not started
        documentVerificationStatus.value = 'idle';
      }
    } catch (error) {
      documentVerificationStatus.value = 'idle';
      // Don't show error if status check fails - user might not have started verification yet
    }
  }
};

const handleSubmitCode = async () => {
  if (step.value === "phone" && phoneSubStep.value === "verify") {
    phoneError.value = null;
    otpCodeError.value = "";
    const code = verificationData.value.code.trim();
    const phone = authStore.user?.phone_number || verificationData.value.phone;
    if (!/^\d+$/.test(code)) {
      otpCodeError.value = "Please enter digits only (numbers)";
      return;
    }
    if (code.length !== 6) {
      otpCodeError.value = "Please enter all 6 digits";
      return;
    }
    if (!phone) {
      phoneError.value = "Phone number is missing. Please try again from the previous step.";
      return;
    }
    try {
      await authStore.verifyPhoneCode(phone, code);
      lastVerifiedMethod.value = "phone";
      step.value = "success";
      emit("verify");
    } catch (error) {
      phoneError.value = authStore.error || "Failed to verify. Please check your code and try again.";
    }
  } else {
    step.value = "success";
    emit("verify");
  }
};

const backdropMotion = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.2 } },
  leave: { opacity: 0, transition: { duration: 0.2 } },
};

const modalMotion = {
  initial: { scale: 0.9, opacity: 0, y: 20 },
  enter: { scale: 1, opacity: 1, y: 0, transition: { duration: 0.3 } },
  leave: { scale: 0.9, opacity: 0, y: 20, transition: { duration: 0.2 } },
};

const successMotion = {
  initial: { scale: 0 },
  enter: {
    scale: 1,
    transition: { delay: 0.2, type: "spring", stiffness: 200 },
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

.step-enter-active,
.step-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.step-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.step-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
