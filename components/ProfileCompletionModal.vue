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
          class="w-full max-w-lg max-h-[80vh] overflow-y-auto "
          @click.stop
        >
          <OB33ZCard :glow="true">
            <div class="flex items-center justify-between mb-6">
              <div>
                <h2 class="text-2xl text-[#C9A24D] mb-1">{{ t('completeProfile') }}</h2>
                <p class="text-sm text-[#F4F2ED] opacity-60">
                  {{ t('stepOf', { current: step, total: 2 }) }}
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

            <!-- Progress Bar -->
            <div class="mb-6">
              <div class="h-1 bg-[rgba(244,242,237,0.1)] rounded-full overflow-hidden">
                <div
                  v-motion="progressMotion"
                  class="h-full bg-gradient-to-r from-[#C9A24D] to-[#5B3FD6]"
                  :style="{ width: `${progress}%` }"
                />
              </div>
            </div>

            <form @submit.prevent="handleSubmit" class="space-y-4">
              <Transition name="step" mode="out-in">
                <!-- Step 1: Basic Info -->
                <div v-if="step === 1" key="step1" class="space-y-4">
                  <!-- Profile Images Upload -->
                  <div>
                    <label class="block text-sm text-[#F4F2ED] opacity-80 mb-2">
                      Profile Photos * <span class="text-xs opacity-60">(At least 1 required)</span>
                    </label>
                    
                    <!-- Image Preview Grid -->
                    <div class="grid grid-cols-4 gap-3 mb-3">
                      <div
                        v-for="(image, index) in profileImages"
                        :key="index"
                        class="relative aspect-square rounded-lg overflow-hidden group"
                      >
                        <img
                          :src="image.preview"
                          :alt="`Profile ${index + 1}`"
                          class="w-full h-full object-cover"
                        />
                        <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            type="button"
                            @click="removeImage(index)"
                            class="p-1 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                          >
                            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      
                      <!-- Upload Button -->
                      <label
                        v-if="profileImages.length < 1"
                        class="aspect-square rounded-lg border-2 border-dashed border-[rgba(201,162,77,0.3)] hover:border-[#C9A24D] transition-colors cursor-pointer flex flex-col items-center justify-center gap-1 bg-[rgba(244,242,237,0.02)] hover:bg-[rgba(244,242,237,0.05)] group"
                      >
                        <svg
                          class="w-6 h-6 text-[#F4F2ED] opacity-40 group-hover:opacity-60 transition-opacity"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                        </svg>
                        <span class="text-xs text-[#F4F2ED] opacity-40 group-hover:opacity-60">Add Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          class="hidden"
                          @change="handleImageUpload"
                        />
                      </label>
                    </div>
                    
                    <p class="text-xs text-[#F4F2ED] opacity-40 mt-1">
                      Upload 1 profile photo.
                    </p>
                    
                    <!-- Validation Error -->
                    <p v-if="imageError" class="text-xs text-red-400 mt-1 flex items-center gap-1">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {{ imageError }}
                    </p>
                  </div>

                  <!-- Display Name -->
                  <div>
                    <label class="block text-sm text-[#F4F2ED] opacity-80 mb-2">
                      {{ t('displayName') }} *
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
                        v-model="profileData.displayName"
                        type="text"
                        :placeholder="t('enterDisplayName')"
                        :class="['pl-10', fieldErrors.displayName ? 'border-red-500/60' : '']"
                      />
                    </div>
                    <p v-if="fieldErrors.displayName" class="text-xs text-red-400 mt-1 flex items-center gap-1">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {{ fieldErrors.displayName }}
                    </p>
                  </div>

                  <!-- Bio -->
                  <div>
                    <label class="block text-sm text-[#F4F2ED] opacity-80 mb-2">
                      {{ t('bio') }}
                    </label>
                    <textarea
                      v-model="profileData.bio"
                      :placeholder="t('tellUsAboutYourself')"
                      rows="3"
                      class="w-full px-4 py-3 bg-[rgba(244,242,237,0.03)] border border-[rgba(201,162,77,0.2)] rounded-lg text-[#F4F2ED] placeholder-[rgba(244,242,237,0.4)] focus:outline-none focus:border-[#C9A24D] focus:bg-[rgba(244,242,237,0.05)] transition-all"
                    />
                  </div>
                </div>

                <!-- Step 2: Location & Contact -->
                <div v-else key="step2" class="space-y-4">
                  <!-- City -->
                  <div>
                    <label class="block text-sm text-[#F4F2ED] opacity-80 mb-2">
                      City *
                    </label>
                    <div class="relative">
                      <svg
                        class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F4F2ED] opacity-40"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <OB33ZInput
                        v-model="profileData.city"
                        type="text"
                        placeholder="Enter your city"
                        :class="['pl-10', fieldErrors.city ? 'border-red-500/60' : '']"
                      />
                    </div>
                    <p v-if="fieldErrors.city" class="text-xs text-red-400 mt-1 flex items-center gap-1">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {{ fieldErrors.city }}
                    </p>
                  </div>

                  <!-- State -->
                  <div>
                    <label class="block text-sm text-[#F4F2ED] opacity-80 mb-2">
                      State *
                    </label>
                    <div class="relative">
                      <svg
                        class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F4F2ED] opacity-40"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <OB33ZInput
                        v-model="profileData.state"
                        type="text"
                        placeholder="Enter your state"
                        :class="['pl-10', fieldErrors.state ? 'border-red-500/60' : '']"
                      />
                    </div>
                    <p v-if="fieldErrors.state" class="text-xs text-red-400 mt-1 flex items-center gap-1">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {{ fieldErrors.state }}
                    </p>
                  </div>

                  <!-- Phone Number: country code + number (digits only) -->
                  <div>
                    <label class="block text-sm text-[#F4F2ED] opacity-80 mb-2">
                      Phone Number *
                    </label>
                    <div class="flex gap-2">
                      <select
                        v-model="phoneCountryCode"
                        class="profile-country-select w-[140px] shrink-0 px-3 py-3 rounded-lg bg-[rgba(244,242,237,0.05)] border border-[rgba(201,162,77,0.15)] text-[#F4F2ED] text-sm outline-none focus:border-[#C9A24D]/50 focus:bg-[rgba(244,242,237,0.08)] transition-colors"
                      >
                        <option
                          v-for="c in phoneCountries"
                          :key="c.code"
                          :value="c.code"
                        >
                          {{ c.dial }} {{ c.name }}
                        </option>
                      </select>
                      <div class="relative flex-1">
                        <OB33ZInput
                          :model-value="phoneNational"
                          type="tel"
                          placeholder="Number only (no letters)"
                          :class="['w-full', fieldErrors.phone_number ? 'border-red-500/60' : '']"
                          @update:model-value="onPhoneNationalInput"
                        />
                      </div>
                    </div>
                    <p v-if="fieldErrors.phone_number" class="text-xs text-red-400 mt-1 flex items-center gap-1">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {{ fieldErrors.phone_number }}
                    </p>
                  </div>

                  <!-- Birthday -->
                  <div>
                    <label class="block text-sm text-[#F4F2ED] opacity-80 mb-2">
                      {{ t('birthday') }} *
                    </label>
                    <div class="relative">
                      <svg
                        class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F4F2ED] opacity-40"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <OB33ZInput
                        v-model="profileData.birthday"
                        type="date"
                        :class="['pl-10', fieldErrors.birthday ? 'border-red-500/60' : '']"
                      />
                    </div>
                    <p v-if="fieldErrors.birthday" class="text-xs text-red-400 mt-1 flex items-center gap-1">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {{ fieldErrors.birthday }}
                    </p>
                  </div>

                  <!-- Interests -->
                  <div>
                    <label class="block text-sm text-[#F4F2ED] opacity-80 mb-2">
                      Interests * <span class="text-xs opacity-60">(At least 1 required)</span>
                    </label>
                    <div class="flex flex-wrap gap-2">
                      <button
                        v-for="interest in availableInterests"
                        :key="interest"
                        type="button"
                        @click="toggleInterest(interest)"
                        :class="[
                          'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                          selectedInterests.includes(interest)
                            ? 'bg-[#C9A24D] text-[#0B0B0D]'
                            : 'bg-[rgba(244,242,237,0.03)] text-[#F4F2ED] border border-[rgba(201,162,77,0.2)] hover:border-[#C9A24D] hover:bg-[rgba(244,242,237,0.05)]'
                        ]"
                      >
                        {{ interest }}
                      </button>
                    </div>
                    <!-- Validation Error -->
                    <p v-if="interestError" class="text-xs text-red-400 mt-2 flex items-center gap-1">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {{ interestError }}
                    </p>
                  </div>

                  <!-- Success Message Box -->
                  <div class="p-4 rounded-lg bg-[rgba(91,63,214,0.1)] border border-[rgba(91,63,214,0.2)]">
                    <div class="flex gap-3">
                      <svg
                        class="w-5 h-5 text-[#C9A24D] flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <h4 class="text-sm font-medium text-[#F4F2ED] mb-1">
                          {{ t('almostThere') }}
                        </h4>
                        <p class="text-xs text-[#F4F2ED] opacity-80">
                          {{ t('completeProfileBenefits') }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition>

              <!-- Navigation Buttons -->
              <div class="flex gap-3 pt-4">
                <OB33ZButton
                  v-if="step > 1"
                  type="button"
                  variant="ghost"
                  @click="step--"
                  class="flex-1"
                  :disabled="isSubmitting || authStore?.isLoading"
                >
                  {{ t('back') }}
                </OB33ZButton>
                <OB33ZButton
                  type="submit"
                  variant="primary"
                  :disabled="isSubmitting || authStore?.isLoading || (step === 1 && profileImages.length === 0) || (step === 2 && selectedInterests.length === 0)"
                  :loading="isSubmitting || authStore?.isLoading"
                  :class="step === 1 ? 'w-full' : 'flex-1'"
                >
                  {{ step === 2 ? t('complete') : t('continue') }}
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
import { ref, computed, watch, onUnmounted } from "vue";
import { useLanguage } from "#imports";
import { useAuthStore } from "~/stores/auth";
import { usePhoneCountries, buildE164, PHONE_COUNTRIES, type PhoneCountry } from "~/composables/usePhoneCountries";

const { t } = useLanguage();
const authStore = useAuthStore();
const { defaultCountry } = usePhoneCountries();

interface Props {
  isOpen: boolean;
}

interface ProfileImage {
  file: File;
  preview: string;
}

const emit = defineEmits<{
  close: [];
  complete: [profileData: {
    displayName: string;
    bio: string;
    city: string;
    state: string;
    phone_number: string;
    birthday: string;
    profileImages: File[];
    interests: string[];
  }];
}>();

const step = ref(1);
const profileImages = ref<ProfileImage[]>([]);
const imageError = ref<string>("");
const selectedInterests = ref<string[]>([]);
const interestError = ref<string>("");
const fieldErrors = ref<{
  displayName?: string;
  city?: string;
  state?: string;
  phone_number?: string;
  birthday?: string;
}>({});

// Available interests - can be customized or fetched from API
const availableInterests = ref([
  "Music",
  "Sports",
  "Travel",
  "Food",
  "Art",
  "Technology",
  "Fitness",
  "Reading",
  "Gaming",
  "Movies",
  "Photography",
  "Dancing",
  "Cooking",
  "Fashion",
  "Nature",
  "Business",
  "Education",
  "Entertainment",
  "Health"
]);

const profileData = ref({
  displayName: "",
  bio: "",
  city: "",
  state: "",
  phone_number: "",
  birthday: "",
});

const phoneCountryCode = ref(defaultCountry.code);
const phoneNational = ref("");

const phoneCountries = PHONE_COUNTRIES;

function onPhoneNationalInput(val: string) {
  phoneNational.value = (val || "").replace(/\D/g, "");
}

watch(phoneNational, (val) => {
  if (fieldErrors.value.phone_number && val.trim()) {
    fieldErrors.value = { ...fieldErrors.value, phone_number: "" };
  }
});

watch(
  () => profileData.value.displayName,
  (val) => {
    const s = (val ?? "").trim();
    if (fieldErrors.value.displayName && s && /^\p{L}/u.test(s)) {
      fieldErrors.value = { ...fieldErrors.value, displayName: "" };
    }
  }
);
watch(
  () => profileData.value.city,
  (val) => {
    const s = (val ?? "").trim();
    if (fieldErrors.value.city && s && !/\d/.test(s)) {
      fieldErrors.value = { ...fieldErrors.value, city: "" };
    }
  }
);
watch(
  () => profileData.value.state,
  (val) => {
    const s = (val ?? "").trim();
    if (fieldErrors.value.state && s && !/\d/.test(s)) {
      fieldErrors.value = { ...fieldErrors.value, state: "" };
    }
  }
);

// Local submitting flag so Continue/Complete buttons can show a loader
const isSubmitting = ref(false);

const props = defineProps<Props>();

const progress = computed(() => (step.value / 2) * 100);

const progressMotion = computed(() => ({
  initial: { width: 0 },
  enter: {
    width: `${progress.value}%`,
    transition: { duration: 0.3 },
  },
}));

// Reset form when modal closes
watch(() => props.isOpen, (newVal) => {
  if (!newVal) {
    step.value = 1;
    profileData.value = {
      displayName: "",
      bio: "",
      city: "",
      state: "",
      phone_number: "",
      birthday: "",
    };
    phoneCountryCode.value = defaultCountry.code;
    phoneNational.value = "";
    // Clean up image previews with safe check
    if (profileImages.value.length > 0) {
      profileImages.value.forEach(img => {
        if (img && img.preview) {
          URL.revokeObjectURL(img.preview);
        }
      });
    }
    profileImages.value = [];
    imageError.value = "";
    selectedInterests.value = [];
    interestError.value = "";
  }
});

// Handle image upload
const handleImageUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (!input.files?.length) return;

  imageError.value = "";
  
  const newImages: ProfileImage[] = [];
  const remainingSlots = 1 - profileImages.value.length;
  const filesToAdd = Array.from(input.files).slice(0, remainingSlots);

  for (const file of filesToAdd) {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      imageError.value = "Please upload only image files";
      continue;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      imageError.value = "Image size should be less than 5MB";
      continue;
    }

    // Create preview URL
    const preview = URL.createObjectURL(file);
    newImages.push({ file, preview });
  }

  profileImages.value = [...profileImages.value, ...newImages];
  
  // Reset input
  input.value = '';
};
const removeImage = (index: number) => {
  // Check if index is valid
  if (index >= 0 && index < profileImages.value.length) {
    const imageToRemove = profileImages.value[index];
    
    // Check if image exists before revoking
    if (imageToRemove && imageToRemove.preview) {
      // Revoke the object URL to avoid memory leaks
      URL.revokeObjectURL(imageToRemove.preview);
    }
    
    // Remove the image from the array
    profileImages.value.splice(index, 1);
  }
};

const toggleInterest = (interest: string) => {
  interestError.value = "";
  const index = selectedInterests.value.indexOf(interest);
  if (index > -1) {
    selectedInterests.value.splice(index, 1);
  } else {
    selectedInterests.value.push(interest);
  }
};

const handleSubmit = () => {
  if (isSubmitting.value) return;
  isSubmitting.value = true;

  // Clear previous errors
  fieldErrors.value = {};
  imageError.value = "";
  interestError.value = "";

  if (step.value === 1) {
    const errors: typeof fieldErrors.value = {};
    const displayName = profileData.value.displayName.trim();
    if (!displayName) {
      errors.displayName = "Display name is required";
    } else if (!/^\p{L}/u.test(displayName)) {
      errors.displayName = "Display name must start with a letter";
    }
    if (profileImages.value.length === 0) {
      imageError.value = "At least one profile photo is required";
    }
    fieldErrors.value = errors;
    if (errors.displayName || imageError.value) {
      isSubmitting.value = false;
      return;
    }
    step.value++;
    window.setTimeout(() => {
      isSubmitting.value = false;
    }, 300);
  } else {
    const errors: typeof fieldErrors.value = {};
    const city = profileData.value.city.trim();
    const state = profileData.value.state.trim();
    if (!city) errors.city = "City is required";
    else if (/\d/.test(city)) errors.city = "City cannot contain numbers";
    if (!state) errors.state = "State is required";
    else if (/\d/.test(state)) errors.state = "State cannot contain numbers";
    const digitsOnly = (phoneNational.value || "").replace(/\D/g, "");
    if (!digitsOnly.length) {
      errors.phone_number = "Phone number is required";
    } else if (digitsOnly.length < 6) {
      errors.phone_number = "Please enter a valid phone number (at least 6 digits)";
    }
    if (!profileData.value.birthday.trim()) {
      errors.birthday = "Birthday is required";
    } else {
      const birthDate = new Date(profileData.value.birthday);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) age--;
      if (age < 18) {
        errors.birthday = "You must be at least 18 years old";
      }
    }
    if (selectedInterests.value.length === 0) {
      interestError.value = "At least one interest is required";
    }
    fieldErrors.value = errors;
    if (Object.keys(errors).length > 0 || interestError.value) {
      isSubmitting.value = false;
      return;
    }
    const dial = (PHONE_COUNTRIES as PhoneCountry[]).find((c) => c.code === phoneCountryCode.value)?.dial ?? "+1";
    const fullPhone = buildE164(dial, phoneNational.value);

    emit("complete", {
      ...profileData.value,
      phone_number: fullPhone,
      profileImages: profileImages.value.map(img => img.file),
      interests: selectedInterests.value,
    });
    isSubmitting.value = false;
  }
};

// Animation motions
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

// Clean up previews on component unmount
onUnmounted(() => {
  if (profileImages.value.length > 0) {
    profileImages.value.forEach(img => {
      if (img && img.preview) {
        URL.revokeObjectURL(img.preview);
      }
    });
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

/* Country code dropdown: match site theme (dark bg, light text) */
.profile-country-select {
  color-scheme: dark;
}
.profile-country-select option {
  background: #0B0B0D;
  color: #F4F2ED;
}
</style>
