<template>
  <div class="relative min-h-screen md:pb-10 lg:pb-20">
    <LevelNavigation />

    <div class="relative max-w-7xl mx-auto py-8 px-4">
      <OB33ZCard class="mb-8 opacity-0 -translate-y-4 animate-delay-sm">
        <div class="flex items-start justify-between gap-6">
          <div class="flex flex-col md:flex-row items-start gap-6 flex-1">
            <div class="relative">
              <label
                v-if="isEditMode"
                class="w-32 h-32 rounded-full bg-linear-to-br from-[#5B3FD6] to-[#C9A24D] flex items-center justify-center overflow-hidden cursor-pointer relative"
              >
                <svg v-if="!displayProfileImage" class="w-16 h-16 text-white opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <img v-else :src="displayProfileImage" alt="Profile" class="w-full h-full object-cover" />
                <span class="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity rounded-full text-xs text-white text-center px-2">
                  Change photo
                </span>
                <input type="file" accept="image/*" class="hidden" @change="onProfilePhotoChange" />
              </label>
              <!-- Camera badge on top of avatar circle (edit mode only) -->
              <span
                v-if="isEditMode"
                class="absolute bottom-0 right-0 w-9 h-9 rounded-full flex items-center justify-center shadow-md z-10 pointer-events-none"
                style="background-color: #927D4C;"
              >
                <svg class="w-5 h-5 text-[#0B0B0D]" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              </span>
              <div
                v-else
                class="w-32 h-32 rounded-full bg-linear-to-br from-[#5B3FD6] to-[#C9A24D] flex items-center justify-center overflow-hidden"
              >
                <svg v-if="!displayProfileImage" class="w-16 h-16 text-white opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <img v-else :src="displayProfileImage" alt="Profile" class="w-full h-full object-cover" />
              </div>
            </div>

            <!-- User Info -->
            <div class="flex-1">
                <div class="flex justify-between mb-4">
                    <div>
                        <div class="flex items-center gap-3 mb-2">
                          <h1 class="text-3xl font-light text-[#F4F2ED]">{{ displayName || 'User' }}</h1>
                          <!-- Status Icons -->
                          <div class="flex items-center gap-1">
                            <div class="w-2 h-2 rounded-full bg-green-500"></div>
                            <div class="w-2 h-2 rounded-full bg-blue-500"></div>
                          </div>
                        </div>
                        <p class="text-[#F4F2ED]/60 mb-2">
                          {{ bio || 'Music lover, tech enthusiast, and social butterfly. Here to vibe and connect!' }}
                        </p>
                        <!-- Location, Join Date, Website -->
                        <div class="flex flex-wrap gap-4 text-sm text-[#F4F2ED]/60">
                          <div class="flex items-center gap-2">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin w-4 h-4"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>
                              <span>{{ location || 'Los Angeles, CA' }}</span>
                          </div>
                          <div class="flex items-center gap-2" v-if="displayPhone">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone w-4 h-4"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3.1 3.18 2 2 0 0 1 5.11 1h3a2 2 0 0 1 2 1.72c.12.86.31 1.7.57 2.5a2 2 0 0 1-.45 2.11L9 8a16 16 0 0 0 7 7l.67-.23a2 2 0 0 1 2.11.45c.8.26 1.64.45 2.5.57A2 2 0 0 1 22 16.92z"></path></svg>
                              <span>{{ displayPhone }}</span>
                              <OB33ZButton v-if="!isEditMode" variant="ghost" class="px-2! py-1! text-xs" @click="isEditMode = true">Edit</OB33ZButton>
                          </div>
                          <div class="flex items-center gap-2">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar w-4 h-4"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>
                              <span>{{ t('profile.joined', { date: joinDate || 'January 2024' }) }}</span>
                          </div>
                          <div class="flex items-center gap-2">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-globe w-4 h-4"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
                              <a :href="website" class="text-[#5B3FD6] hover:underline">{{ website }}</a>
                          </div>
                        </div>
                    </div>
                    <div>
                        <button
                            v-if="!isEditMode"
                            @click="isEditMode = true"
                            class="border border-[#C9A24D] rounded-xl flex items-start md:items-center text-left text-[#C9A24D] gap-2 px-4 py-2 md:px-6 md:py-3"
                        >
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 20 20">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          {{ t('editProfile') }}
                        </button>
                    </div>
                </div>
              
              <!-- User Stats -->
               <div class="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-4 pt-4 border-t border-[#C9A24D]/10">
                <div class="text-center">
                    <div class="text-2xl font-light text-[#C9A24D]">{{ userStats.level }}</div>
                    <div class="text-[#F4F2ED]/60 text-xs">{{ t('level') }}</div>
                </div>
                <div class="text-center">
                    <div class="text-2xl font-light text-[#C9A24D]">{{ userStats.points.toLocaleString() }}</div>
                    <div class="text-[#F4F2ED]/60 text-xs">{{ t('profile.points') }}</div>
                </div>
                <div class="text-center">
                    <div class="text-2xl font-light text-[#F4F2ED]">{{ userStats.messages.toLocaleString() }}</div>
                    <div class="text-[#F4F2ED]/60 text-xs">{{ t('messages') }}</div>
                </div>
                <div class="text-center">
                    <div class="text-2xl font-light text-[#F4F2ED]">{{ userStats.gifts }}</div>
                    <div class="text-[#F4F2ED]/60 text-xs">{{ t('gifts') }}</div>
                </div>
                <div class="text-center">
                    <div class="text-2xl font-light text-[#F4F2ED]">{{ userStats.boosts }}</div>
                    <div class="text-[#F4F2ED]/60 text-xs">{{ t('boosts') }}</div>
                </div>
                <div class="text-center">
                    <div class="text-2xl font-light text-[#F4F2ED]">{{ userStats.rooms }}</div>
                    <div class="text-[#F4F2ED]/60 text-xs">{{ t('profile.rooms') }}</div>
                </div>
              </div>
            </div>
          </div>

          
        </div>
      </OB33ZCard>

      <!-- Photo Gallery Preview removed: backend now returns a single profile image -->

      <!-- Badges Section -->
      <OB33ZCard class="mb-8 opacity-0 -translate-y-4 animate-delay-md">
        <div class="flex items-center gap-2 mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-award w-5 h-5 text-[#C9A24D]"><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path><circle cx="12" cy="8" r="6"></circle></svg>
          <h3 class="text-lg font-light text-[#F4F2ED]">{{ t('profile.badges') }}</h3>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="p-4 bg-[#0A0A0A]/30 rounded-lg text-center space-y-2">
                <div class="inline-flex items-center justify-center w-12 h-12 rounded-full" style="background-color: rgba(201, 162, 77, 0.125);">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-6 h-6" style="color: rgb(201, 162, 77);"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg>
                </div>
                <div class="text-[#F4F2ED] text-sm">{{ t('profile.earlyAdopter') }}</div>
            </div>
            <div class="p-4 bg-[#0A0A0A]/30 rounded-lg text-center space-y-2">
                <div class="inline-flex items-center justify-center w-12 h-12 rounded-full" style="background-color: rgba(91, 63, 214, 0.125);">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle w-6 h-6" style="color: rgb(91, 63, 214);"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg>
                </div>
                <div class="text-[#F4F2ED] text-sm">{{ t('profile.socialButterfly') }}</div>
            </div>
            <div class="p-4 bg-[#0A0A0A]/30 rounded-lg text-center space-y-2">
                <div class="inline-flex items-center justify-center w-12 h-12 rounded-full" style="background-color: rgba(201, 162, 77, 0.125);">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-gift w-6 h-6" style="color: rgb(201, 162, 77);"><rect x="3" y="8" width="18" height="4" rx="1"></rect><path d="M12 8v13"></path><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"></path><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"></path></svg>
                </div>
                <div class="text-[#F4F2ED] text-sm">{{ t('profile.giftGiver') }}</div>
            </div>
            <div class="p-4 bg-[#0A0A0A]/30 rounded-lg text-center space-y-2">
                <div class="inline-flex items-center justify-center w-12 h-12 rounded-full" style="background-color: rgba(91, 63, 214, 0.125);">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trending-up w-6 h-6" style="color: rgb(91, 63, 214);"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
                </div>
                <div class="text-[#F4F2ED] text-sm">{{ t('profile.trendsetter') }}</div>
            </div>
        </div>
      </OB33ZCard>

      <!-- Navigation Tabs -->
      <div class="flex flex-wrap gap-4 mb-6 opacity-0 -translate-y-4 animate-delay-lg">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          data-observer-allow="true"
          @click="activeTab = tab.id"
          :class="[
              'px-4 py-2 rounded-lg font-medium transition-all border-b-2 flex items-center gap-2',
              activeTab === tab.id
              ? 'bg-[#C9A24D] text-[#0A0A0A]'
              : 'bg-[#0A0A0A]/50 border border-[#C9A24D]/20 text-[#F4F2ED]/60 hover:text-[#F4F2ED]'
          ]"
          >
          <svg v-if="tab.id == 'profile'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user w-4 h-4"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          <svg v-if="tab.id == 'account'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield w-4 h-4"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path></svg>
          <svg v-if="tab.id == 'privacy'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lock w-4 h-4"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          <svg v-if="tab.id == 'notifications'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bell w-4 h-4"><path d="M10.268 21a2 2 0 0 0 3.464 0"></path><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"></path></svg>
          <svg v-if="tab.id == 'billing'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-credit-card w-4 h-4"><rect width="20" height="14" x="2" y="5" rx="2"></rect><line x1="2" x2="22" y1="10" y2="10"></line></svg>
          {{ tab.name }}
        </button>
      </div>

      <!-- Tab Content -->
      <div class="opacity-0 -translate-y-4 animate-delay-lg">
        <div class="mb-8">
            <!-- Profile Settings Tab -->
            <OB33ZCard v-if="activeTab === 'profile'">
              <h3 class="text-xl font-light text-[#F4F2ED] mb-6">{{ t('profile.profileSettings') }}</h3>
              <form @submit.prevent="handleSaveProfile">
                <!-- Form Fields -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <!-- Display Name -->
                  <div class="flex flex-col gap-2">
                    <label class="text-sm text-[#F4F2ED] opacity-80">{{ t('displayName') }}</label>
                    <OB33ZInput
                      v-model="formDisplayName"
                      v-bind="formDisplayNameAttrs"
                      type="text"
                      placeholder="Display Name"
                      :disabled="!isEditMode"
                    />
                    <p v-if="errors.displayName" class="text-xs text-red-400 mt-1 flex items-center gap-1">
                      <svg class="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {{ errors.displayName }}
                    </p>
                  </div>
    
                  <!-- Username -->
                  <div class="flex flex-col gap-2">
                    <label class="text-sm text-[#F4F2ED] opacity-80">{{ t('joinModal.userName') }}</label>
                    <OB33ZInput
                      v-model="formUsername"
                      v-bind="formUsernameAttrs"
                      type="text"
                      :placeholder="t('joinModal.userNamePlaceholder')"
                      :disabled="!isEditMode"
                    />
                    <p v-if="errors.username" class="text-xs text-red-400 mt-1 flex items-center gap-1">
                      <svg class="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {{ errors.username }}
                    </p>
                  </div>

                  <!-- Email removed -->
    
                  <!-- Phone Number with inline edit -->
                  <div class="flex flex-col gap-2">
                      <label class="text-sm text-[#F4F2ED] opacity-80">{{ t('profile.phoneNumber') }}</label>
                    <div class="flex gap-2">
                      <select
                        v-model="phoneCountryCode"
                        :disabled="!isEditMode"
                        class="profile-country-select w-35 shrink-0 px-2 sm:px-3 py-3 rounded-lg bg-[rgba(244,242,237,0.05)] border border-[rgba(201,162,77,0.15)] text-[#F4F2ED] text-sm outline-none focus:border-[#C9A24D]/50 focus:bg-[rgba(244,242,237,0.08)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        <option
                          v-for="c in phoneCountries"
                          :key="c.code"
                          :value="c.code"
                        >
                          {{ c.dial }} {{ c.name }}
                        </option>
                      </select>
                      <OB33ZInput
                        v-model="formPhoneNational"
                        v-bind="formPhoneNationalAttrs"
                        type="tel"
                        placeholder="Phone number without country code"
                        :disabled="!isEditMode"
                        class="flex-1"
                      />
                    </div>
                    <p v-if="errors.phoneNational" class="text-xs text-red-400 mt-1 flex items-center gap-1">
                      <svg class="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {{ errors.phoneNational }}
                    </p>
                  </div>
    
                  <!-- City -->
                  <div class="flex flex-col gap-2">
                    <label class="text-sm text-[#F4F2ED] opacity-80">{{ t('city') }}</label>
                    <OB33ZInput
                      v-model="formCity"
                      v-bind="formCityAttrs"
                      type="text"
                      :placeholder="t('enterCity')"
                      :disabled="!isEditMode"
                    />
                    <p v-if="errors.city" class="text-xs text-red-400 mt-1 flex items-center gap-1">
                      <svg class="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {{ errors.city }}
                    </p>
                  </div>
                  <!-- State -->
                  <div class="flex flex-col gap-2">
                    <label class="text-sm text-[#F4F2ED] opacity-80">{{ t('state') }}</label>
                    <OB33ZInput
                      v-model="formState"
                      v-bind="formStateAttrs"
                      type="text"
                      :placeholder="t('enterState')"
                      :disabled="!isEditMode"
                    />
                    <p v-if="errors.state" class="text-xs text-red-400 mt-1 flex items-center gap-1">
                      <svg class="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {{ errors.state }}
                    </p>
                  </div>
    
                  <!-- Date of Birth: calendar in edit, date + age in readable form -->
                  <div class="flex flex-col gap-2">
                    <label class="text-sm text-[#F4F2ED] opacity-80">{{ t('birthday') }}</label>
                    <template v-if="isEditMode">
                      <OB33ZInput
                        v-model="formBirthday"
                        v-bind="formBirthdayAttrs"
                        type="date"
                      />
                      <div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#F4F2ED]/80">
                        <span v-if="formattedBirthday">Date: {{ formattedBirthday }}</span>
                      </div>
                    </template>
                    <template v-else>
                      <div
                        class="w-full px-4 py-3 rounded-lg bg-[rgba(244,242,237,0.05)] border border-[rgba(201,162,77,0.15)] text-[#F4F2ED] text-sm opacity-80"
                      >
                        <span v-if="formattedBirthday">{{ formattedBirthday }}</span>
                      </div>
                    </template>
                    <p v-if="errors.birthday" class="text-xs text-red-400 mt-1 flex items-center gap-1">
                      <svg class="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {{ errors.birthday }}
                    </p>
                  </div>
    
                  <!-- Website removed -->
                  <!-- Interests (same UI as complete profile) -->
                  <div class="flex flex-col gap-2 md:col-span-2">
                    <label class="text-sm text-[#F4F2ED] opacity-80">{{ t('Interests') }}</label>
                    <div class="flex flex-wrap gap-2">
                      <button
                        v-for="interest in availableInterests"
                        :key="interest"
                        type="button"
                        @click="isEditMode && toggleInterest(interest)"
                        :disabled="!isEditMode"
                        :class="[
                          'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                          userInterests.includes(interest)
                            ? 'bg-[#C9A24D] text-[#0B0B0D]'
                            : 'bg-[rgba(244,242,237,0.03)] text-[#F4F2ED] border border-[rgba(201,162,77,0.2)] hover:border-[#C9A24D] hover:bg-[rgba(244,242,237,0.05)]',
                          !isEditMode ? 'opacity-60 cursor-not-allowed' : ''
                        ]"
                      >
                        {{ interest }}
                      </button>
                    </div>
                  </div>
                </div>
    
                <!-- Bio (Full Width) -->
                <div class="mb-6 flex flex-col gap-2">
                  <label class="text-sm text-[#F4F2ED] opacity-80">{{ t('bio') }}</label>
                  <textarea
                    v-model="formBio"
                    v-bind="formBioAttrs"
                    rows="4"
                    :disabled="!isEditMode"
                    :class="[
                      'w-full px-4 py-3 rounded-lg bg-[rgba(244,242,237,0.05)] border border-[rgba(201,162,77,0.15)] text-[#F4F2ED] placeholder:text-[#F4F2ED]/40 outline-none focus:border-[#C9A24D]/50 focus:bg-[rgba(244,242,237,0.08)] transition-colors resize-none',
                      !isEditMode ? 'opacity-60 cursor-not-allowed' : ''
                    ]"
                    :placeholder="t('tellUsAboutYourself')"
                  ></textarea>
                  <p v-if="errors.bio" class="text-xs text-red-400 mt-1 flex items-center gap-1">
                    <svg class="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {{ errors.bio }}
                  </p>
                </div>
                <div v-if="isEditMode" class="flex gap-3 justify-end">
                    <OB33ZButton
                        type="button"
                        variant="ghost"
                        @click="handleCancelEdit"
                    >
                        {{ t('profile.cancel') }}
                    </OB33ZButton>
                    <OB33ZButton
                        type="submit"
                        variant="primary"
                        :loading="isSaving"
                    >
                        {{ isSaving ? t('profile.saving') : t('profile.saveChanges') }}
                    </OB33ZButton>
                </div>
                
              </form>
            </OB33ZCard>
    
            <!-- Account Settings Tab -->
            <OB33ZCard v-else-if="activeTab === 'account'">
              <h2 class="text-2xl font-light text-[#F4F2ED] mb-6">{{ t('profile.accountSettings') }}</h2>
              
              <!-- Change Password -->
              <div class="py-4 sm:p-4 bg-[#0A0A0A]/30 rounded-lg flex items-center justify-between">
                <div class="space-y-1">
                  <div class="text-[#F4F2ED]">{{ t('profile.changePassword') }}</div>
                  <div class="text-[#F4F2ED]/60 text-sm">{{ t('profile.changePasswordDesc') }}</div>
                </div>
                <button
                  type="button"
                  class="px-8 py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-transparent border border-[#C9A24D] text-[#C9A24D] hover:bg-[rgba(201,162,77,0.1)]"
                  @click="handleChangePassword"
                >
                  {{ t('profile.change') }}
                </button>
              </div>
    
              <!-- Two-Factor Authentication -->
              <div class="py-4 sm:p-4 bg-[#0A0A0A]/30 rounded-lg flex items-center justify-between">
                <div class="space-y-1">
                  <div class="text-[#F4F2ED]">{{ t('profile.twoFactorAuth') }}</div>
                  <div class="text-[#F4F2ED]/60 text-sm">{{ t('profile.twoFactorAuthDesc') }}</div>
                </div>
                <OB33ZToggle v-model="twoFactorEnabled" />
              </div>
    
              <!-- Linked Accounts -->
              <div class="py-4 sm:p-4 bg-[#0A0A0A]/30 rounded-lg flex items-center justify-between">
                <div class="space-y-1">
                  <div class="text-[#F4F2ED]">{{ t('profile.linkedAccounts') }}</div>
                  <div class="text-[#F4F2ED]/60 text-sm">{{ t('profile.linkedAccountsDesc') }}</div>
                </div>
                <OB33ZButton variant="primary" @click="handleManageLinkedAccounts">
                  {{ t('profile.manage') }}
                </OB33ZButton>
              </div>
    
              <!-- Delete Account -->
              <div class="p-4 flex flex-col md:flex-row gap-4 items-center justify-between bg-red-500/10 border border-red-500/30 rounded-lg mt-4">
                <div class="space-y-1">
                  <div class="text-red-400">{{ t('profile.deactivateAccount') }}</div>
                  <div class="text-[#F4F2ED]/60 text-sm">{{ t('profile.deactivateAccountDesc') }}</div>
                </div>
                <OB33ZButton
                  variant="ghost"
                  @click="handleDeleteAccount"
                  class="bg-red-500/20 border-red-500/50 text-red-400 hover:bg-red-500/30"
                >
                  {{ t('profile.deactivate') }}
                </OB33ZButton>
              </div>
            </OB33ZCard>
    
            <!-- Privacy Settings Tab -->
            <OB33ZCard v-else-if="activeTab === 'privacy'">
              <h2 class="text-2xl font-light text-[#F4F2ED] mb-6">{{ t('profile.privacySettings') }}</h2>
              
              <!-- Profile Visibility -->
              <div class="p-4 bg-[#0A0A0A]/30 rounded-lg flex items-center justify-between">
                <div class="space-y-1">
                  <div class="text-[#F4F2ED]">{{ t('profile.profileVisibility') }}</div>
                  <div class="text-[#F4F2ED]/60 text-sm">{{ t('profile.profileVisibilityDesc') }}</div>
                </div>
                <OB33ZToggle v-model="privacySettings.profileVisibility" />
              </div>
    
              <!-- Show Online Status -->
              <div class="p-4 bg-[#0A0A0A]/30 rounded-lg flex items-center justify-between">
                <div class="space-y-1">
                  <div class="text-[#F4F2ED]">{{ t('profile.showOnlineStatus') }}</div>
                  <div class="text-[#F4F2ED]/60 text-sm">{{ t('profile.showOnlineStatusDesc') }}</div>
                </div>
                <OB33ZToggle v-model="privacySettings.showOnlineStatus" />
              </div>
    
              <!-- Allow Direct Messages -->
              <div class="p-4 bg-[#0A0A0A]/30 rounded-lg flex items-center justify-between">
                <div class="space-y-1">
                  <div class="text-[#F4F2ED]">{{ t('profile.allowDirectMessages') }}</div>
                  <div class="text-[#F4F2ED]/60 text-sm">{{ t('profile.allowDirectMessagesDesc') }}</div>
                </div>
                <OB33ZToggle v-model="privacySettings.allowDirectMessages" />
              </div>
    
              <!-- Show Activity -->
              <div class="p-4 bg-[#0A0A0A]/30 rounded-lg flex items-center justify-between">
                <div class="space-y-1">
                  <div class="text-[#F4F2ED]">{{ t('profile.showActivity') }}</div>
                  <div class="text-[#F4F2ED]/60 text-sm">{{ t('profile.showActivityDesc') }}</div>
                </div>
                <OB33ZToggle v-model="privacySettings.showActivity" />
              </div>
            </OB33ZCard>
    
            <!-- Notification Settings Tab -->
            <OB33ZCard v-else-if="activeTab === 'notifications'">
              <h2 class="text-2xl font-light text-[#F4F2ED] mb-6">{{ t('profile.notificationSettings') }}</h2>
              
              <!-- Message Notifications -->
              <div class="p-4 bg-[#0A0A0A]/30 rounded-lg flex items-center justify-between">
                <div class="space-y-1">
                  <div class="text-[#F4F2ED]">{{ t('profile.messageNotifications') }}</div>
                </div>
                <OB33ZToggle v-model="notificationSettings.messageNotifications" />
              </div>
    
              <!-- Gift Notifications -->
              <div class="p-4 bg-[#0A0A0A]/30 rounded-lg flex items-center justify-between">
                <div class="space-y-1">
                  <div class="text-[#F4F2ED]">{{ t('profile.giftNotifications') }}</div>
                </div>
                <OB33ZToggle v-model="notificationSettings.giftNotifications" />
              </div>
    
              <!-- Boost Notifications -->
              <div class="p-4 bg-[#0A0A0A]/30 rounded-lg flex items-center justify-between">
                <div class="space-y-1">
                  <div class="text-[#F4F2ED]">{{ t('profile.boostNotifications') }}</div>
                </div>
                <OB33ZToggle v-model="notificationSettings.boostNotifications" />
              </div>
    
              <!-- Announcement Notifications -->
              <div class="p-4 bg-[#0A0A0A]/30 rounded-lg flex items-center justify-between">
                <div class="space-y-1">
                  <div class="text-[#F4F2ED]">{{ t('profile.announcementNotifications') }}</div>
                </div>
                <OB33ZToggle v-model="notificationSettings.announcementNotifications" />
              </div>
    
              <!-- Email Notifications -->
              <div class="p-4 bg-[#0A0A0A]/30 rounded-lg flex items-center justify-between">
                <div class="space-y-1">
                  <div class="text-[#F4F2ED]">{{ t('profile.emailNotifications') }}</div>
                </div>
                <OB33ZToggle v-model="notificationSettings.emailNotifications" />
              </div>
    
              <!-- Push Notifications -->
              <div class="p-4 bg-[#0A0A0A]/30 rounded-lg flex items-center justify-between">
                <div class="space-y-1">
                  <div class="text-[#F4F2ED]">{{ t('profile.pushNotifications') }}</div>
                </div>
                <OB33ZToggle v-model="notificationSettings.pushNotifications" />
              </div>
            </OB33ZCard>
    
            <!-- Billing Settings Tab -->
            <OB33ZCard v-else-if="activeTab === 'billing'">
              <h2 class="text-2xl font-light text-[#F4F2ED] mb-6">{{ t('profile.billingSettings') }}</h2>
              
              <!-- Current Plan -->
              <div class="py-4 sm:p-4 bg-[#0A0A0A]/30 rounded-lg flex items-center justify-between">
                <div class="space-y-1">
                  <div class="text-[#F4F2ED]">{{ t('profile.currentPlan') }}</div>
                  <div class="flex flex-col gap-2 mt-1">
                    <span class="text-[#C9A24D]">{{ t('vip') }}</span>
                    <span class="text-sm text-[#F4F2ED] opacity-60">{{ t('profile.nextBilling', { date: 'March 18, 2026' }) }}</span>
                  </div>
                </div>
                <button class="border border-[#C9A24D] rounded-lg text-[#C9A24D] px-3 py-2 md:px-6 md:py-3" @click="handleChangePlan">
                  {{ t('profile.changePlan') }}
                </button>
              </div>
    
              <!-- Payment Method -->
              <div class="py-4 sm:p-4 bg-[#0A0A0A]/30 rounded-lg flex items-center justify-between">
                <div class="space-y-1">
                  <div class="text-[#F4F2ED]">{{ t('profile.paymentMethod') }}</div>
                  <p class="text-sm text-[#F4F2ED] opacity-60">**** **** **** 4242</p>
                </div>
                <OB33ZButton variant="secondary" @click="handleUpdatePayment">
                  {{ t('profile.update') }}
                </OB33ZButton>
              </div>
    
              <!-- Billing History -->
              <div class="py-4 sm:p-4 bg-[#0A0A0A]/30 rounded-lg flex items-center justify-between">
                <div class="space-y-1">
                  <div class="text-[#F4F2ED]">{{ t('profile.billingHistory') }}</div>
                  <p class="text-sm text-[#F4F2ED] opacity-60">{{ t('profile.billingHistoryDesc') }}</p>
                </div>
                <OB33ZButton variant="secondary" @click="handleViewBillingHistory">
                  {{ t('profile.view') }}
                </OB33ZButton>
              </div>
            </OB33ZCard>
        </div>
        <!-- Action Buttons -->
         <div class="flex justify-center" style="opacity: 1;">
            <button class="px-8 py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-transparent hover:bg-[rgba(244,242,237,0.1)] text-red-500 hover:text-red-400" tabindex="0" style="transform: none;" @click="handleLogout">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-out w-4 h-4"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" x2="9" y1="12" y2="12"></line></svg>
                {{ t('profile.logOut') }}
            </button>
        </div>
      </div>
    </div>

    <!-- Change Password Modal -->
    <ChangePasswordModal
      :is-open="showChangePasswordModal"
      @close="showChangePasswordModal = false"
      @success="showChangePasswordModal = false"
    />

    <!-- Delete Account Modal -->
    <DeleteAccountModal
      :is-open="showDeleteAccountModal"
      @close="showDeleteAccountModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, onUnmounted } from "vue";
import { useAuthStore } from "~/stores/auth";
import { useRouter } from "vue-router";
import { useI18n } from "#imports";
import { useForm } from "vee-validate";
import { usePhoneCountries, buildE164, parsePhoneToCountryAndNational, PHONE_COUNTRIES, type PhoneCountry } from "~/composables/usePhoneCountries";
import ChangePasswordModal from "~/components/ChangePasswordModal.vue";
import DeleteAccountModal from "~/components/DeleteAccountModal.vue";

const { t } = useI18n();

const showChangePasswordModal = ref(false);
const showDeleteAccountModal = ref(false);
const isSaving = ref(false);

// VeeValidate: plain object schema (no Zod)
const profileEditSchema = {
  displayName(value: string) {
    const v = (value ?? "").trim();
    if (!v) return "Display name is required";
    if (v.length < 2) return "Display name must be at least 2 characters";
    if (v.length > 50) return "Display name must be at most 50 characters";
    return true;
  },
  username(value: string) {
    const v = (value ?? "").trim();
    if (!v) return "Username is required";
    if (v.length < 3) return "Username must be at least 3 characters";
    if (v.length > 30) return "Username must be at most 30 characters";
    if (!/^[a-zA-Z0-9_]+$/.test(v)) return "Username can contain letters, numbers, and underscores only";
    return true;
  },
  city(value: string) {
    const v = (value ?? "").trim();
    if (!v) return "City is required";
    if (v.length < 2) return "City must be at least 2 characters";
    if (v.length > 100) return "City must be at most 100 characters";
    if (!/^[\p{L}\p{M}\p{N}\s\-',.]+$/u.test(v)) return "City can only contain letters, numbers, spaces, commas, and hyphens";
    return true;
  },
  state(value: string) {
    const v = (value ?? "").trim();
    if (!v) return "State is required";
    if (v.length < 2) return "State must be at least 2 characters";
    if (v.length > 100) return "State must be at most 100 characters";
    if (!/^[\p{L}\p{M}\p{N}\s\-',.]+$/u.test(v)) return "State can only contain letters, numbers, spaces, commas, and hyphens";
    return true;
  },
  phoneNational(value: string) {
    const v = String(value ?? "").replace(/\s+/g, "");
    if (!v) return "Phone number is required";
    if (!/^\d{6,15}$/.test(v)) return "Enter a valid phone number";
    return true;
  },
  birthday(value: string) {
    const v = (value ?? "").trim();
    if (!v) return "Birthday is required";
    const d = new Date(v);
    if (Number.isNaN(d.getTime())) return "Please enter a valid birthday";
    const today = new Date();
    let ageYears = today.getFullYear() - d.getFullYear();
    const monthDiff = today.getMonth() - d.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < d.getDate())) ageYears--;
    if (ageYears < 18) return "You must be at least 18 years old";
    return true;
  },
  bio(value: string) {
    if (!value || !String(value).trim()) return true;
    if (String(value).length > 500) return "Bio must be at most 500 characters";
    return true;
  },
};

const { defineField, errors, handleSubmit: formHandleSubmit, setValues } = useForm({
  validationSchema: profileEditSchema,
  initialValues: {
    displayName: "",
    city: "",
    state: "",
    username: "",
    phoneNational: "",
    location: "",
    birthday: "",
    bio: "",
  },
});

const [formDisplayName, formDisplayNameAttrs] = defineField("displayName");
const [formUsername, formUsernameAttrs] = defineField("username");
const [formPhoneNational, formPhoneNationalAttrs] = defineField("phoneNational");
const [formCity, formCityAttrs] = defineField("city");
const [formState, formStateAttrs] = defineField("state");
const [formLocation, formLocationAttrs] = defineField("location");
const [formBirthday, formBirthdayAttrs] = defineField("birthday");
const [formBio, formBioAttrs] = defineField("bio");

const authStore = useAuthStore();
const router = useRouter();
const { countries: phoneCountries, defaultCountry } = usePhoneCountries();
const phoneCountryCode = ref(defaultCountry?.code ?? phoneCountries[0]?.code ?? "US");

// Profile data
const profilePicture = ref<string | null>(null);
const newProfilePhotoFile = ref<File | null>(null);
const newProfilePhotoPreview = ref<string | null>(null);
const displayName = ref("Alex Morgan");
const username = ref("");
const bio = ref("Music lover, tech enthusiast, and social butterfly. Here to vibe and connect!");
const location = ref("Los Angeles, CA");
const joinDate = ref("January 2024");
const website = ref("https://alexmorgan.com");
const userInterests = ref<string[]>([]);

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
  "Health",
]);

function toggleInterest(interest: string) {
  const idx = userInterests.value.indexOf(interest);
  if (idx >= 0) userInterests.value.splice(idx, 1);
  else userInterests.value.push(interest);
}

const displayProfileImage = computed(() => newProfilePhotoPreview.value || profilePicture.value);
const displayPhone = computed(() => {
  const user = authStore.user;
  const raw = String(user?.phone || user?.phone_number || "").trim();
  if (raw) return raw;
  const dialCode = PHONE_COUNTRIES.find((c: PhoneCountry) => c.code === phoneCountryCode.value)?.dial ?? "+1";
  const national = String(formPhoneNational.value || "").trim();
  if (!national) return "";
  return buildE164(dialCode, national);
});

const isPhoneEditing = ref(true);
const isSavingPhone = ref(false);
const phoneError = ref("");
let prevPhoneState: { code: string; national: string } = { code: "", national: "" };

function startEditPhone() {
  phoneError.value = "";
  prevPhoneState = { code: phoneCountryCode.value, national: String(formPhoneNational.value || "") };
  isPhoneEditing.value = true;
}

async function savePhone() {
  phoneError.value = "";
  const national = String(formPhoneNational.value || "").replace(/\s+/g, "");
  if (!national) {
    phoneError.value = "Phone number is required";
    return;
  }
  if (!/^\d{6,15}$/.test(national)) {
    phoneError.value = "Enter a valid phone number";
    return;
  }
  const dial = PHONE_COUNTRIES.find((c: PhoneCountry) => c.code === phoneCountryCode.value)?.dial ?? "+1";
  const e164 = buildE164(dial, national);
  if (!/^\+[1-9]\d{5,14}$/.test(e164)) {
    phoneError.value = "Enter a valid phone number";
    return;
  }
  isSavingPhone.value = true;
  try {
    await authStore.editProfile({ phone_number: e164 });
    await authStore.getCurrentUser();
    isPhoneEditing.value = false;
  } catch (e) {
    console.error("Failed to save phone number:", e);
    phoneError.value = "Failed to save phone number";
  } finally {
    isSavingPhone.value = false;
  }
}

function cancelEditPhone() {
  phoneCountryCode.value = prevPhoneState.code || phoneCountryCode.value;
  // @ts-ignore
  formPhoneNational.value = prevPhoneState.national || formPhoneNational.value;
  phoneError.value = "";
  isPhoneEditing.value = true;
}
function onProfilePhotoChange(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file || !file.type.startsWith("image/")) return;
  if (newProfilePhotoPreview.value) URL.revokeObjectURL(newProfilePhotoPreview.value);
  newProfilePhotoFile.value = file;
  newProfilePhotoPreview.value = URL.createObjectURL(file);
  input.value = "";
}

// User stats
const userStats = ref({
  level: 12,
  points: 8450,
  messages: 3420,
  gifts: 45,
  boosts: 23,
  rooms: 12,
});

// Edit mode
const isEditMode = ref(false);

// Account settings
const twoFactorEnabled = ref(false);

// Privacy settings
const privacySettings = ref({
  profileVisibility: true,
  showOnlineStatus: true,
  allowDirectMessages: false,
  showActivity: true,
});

// Notification settings
const notificationSettings = ref({
  messageNotifications: true,
  giftNotifications: true,
  boostNotifications: false,
  announcementNotifications: true,
  emailNotifications: true,
  pushNotifications: false,
});


// Navigation tabs
const activeTab = ref("profile");
const tabs = computed(() => [
  {
    id: "profile",
    name: "Profile",
  },
  {
    id: "account",
    name: t("profile.account"),
  },
  {
    id: "privacy",
    name: t("profile.privacy"),
  },
  {
    id: "notifications",
    name: t("profile.notifications"),
  },
  {
    id: "billing",
    name: t("profile.billing"),
  },
]);

const getFullImageUrl = (photoUrl: string): string => {
  if (!photoUrl) return '';
  // Check if it's already a full URL
  if (photoUrl.startsWith('http://') || photoUrl.startsWith('https://')) {
    return photoUrl;
  }
  const apiBaseUrl = import.meta.env.NUXT_PUBLIC_API_BASE_URL || 'https://staging-api.ob33z.com/api';
  const baseDomain = apiBaseUrl.replace(/\/api$/, '');
  
  // Make sure the path starts with a slash
  const path = photoUrl.startsWith('/') ? photoUrl : `/${photoUrl}`;
  
  return `${baseDomain}${path}`;
};

function normalizeDateForInput(value: unknown): string {
  const raw = String(value ?? "").trim();
  if (!raw) return "";
  // Accept ISO strings like 2026-03-16T... or 2026-03-16
  const m = raw.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m) return `${m[1]}-${m[2]}-${m[3]}`;
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return "";
  const yyyy = String(d.getFullYear());
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

const formattedBirthday = computed(() => {
  const v = normalizeDateForInput(formBirthday.value);
  if (!v) return "";
  const d = new Date(`${v}T00:00:00`);
  if (Number.isNaN(d.getTime())) return v;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
});


// Load user data from auth store (use safe defaults so "save without changes" passes validation)
const loadUserData = () => {
  if (authStore.isAuthenticated && authStore.user) {
    const user = authStore.user;
    // API returns display name in `user.profile.display_name`
    const display = user.profile?.display_name || user.display_name || user.name || user.username || "User";
    const uname = user.username || user.profile?.username || "";
    // Prefer city/state from nested profile, fall back to top-level fields
    const city = user.profile?.city || user.city;
    const state = user.profile?.state || user.state;
    const loc =
      user.location ||
      (city && state ? `${city}, ${state}` : city || state) ||
      location.value ||
      "N/A";
    const birthdayVal = normalizeDateForInput(
      user?.profile?.birthday ||
      (user as any)?.profile?.date_of_birth ||
      (user as any)?.profile?.dob ||
      (user as any)?.profile?.birth_date ||
      (user as any)?.birthday ||
      (user as any)?.date_of_birth ||
      (user as any)?.dob ||
      ""
    );
    displayName.value = display;
    username.value = uname;
    bio.value = user.profile?.bio ?? user.bio ?? bio.value;
    location.value = loc;
    // Some accounts may not have website in API response
    website.value = user.website || website.value;
    const { code, national } = parsePhoneToCountryAndNational(
      user.phone || user.phone_number || ""
    );
    phoneCountryCode.value = code;
    setValues({
      displayName: display,
      username: uname,
      phoneNational: national,
      city: city || "",
      state: state || "",
      birthday: birthdayVal,
      bio: user.profile?.bio ?? user.bio ?? bio.value ?? "",
    });
    userInterests.value = Array.isArray(user.interests) ? [...user.interests] : [];
    if (user.profile_photo && user.profile_photo.photo_url) {
      profilePicture.value = getFullImageUrl(user.profile_photo.photo_url);
    }
    if (user.created_at) {
      const date = new Date(user.created_at);
      joinDate.value = date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    }
  }
};

onMounted(async () => {
  // Ensure we have the freshest user data from /user endpoint
  if (authStore.isAuthenticated) {
    try {
      await authStore.getCurrentUser();
    } catch (e) {
      console.error("Failed to fetch current user for profile page", e);
    }
  }
  loadUserData();
});

// Watch for user data changes
watch(() => authStore.user, (newUser) => {
  if (newUser) {
    loadUserData();
  }
}, { deep: true });

const handleSaveProfile = formHandleSubmit(async (values) => {
  isSaving.value = true;
  try {
    const city = (values.city || "").trim();
    const state = (values.state || "").trim();
    const dialCode = PHONE_COUNTRIES.find((c: PhoneCountry) => c.code === phoneCountryCode.value)?.dial ?? "+1";
    const fullPhone = buildE164(dialCode, values.phoneNational);

    const birthday = (values.birthday || "").trim();

    await authStore.editProfile({
      display_name: values.displayName,
      username: values.username,
      bio: values.bio,
      city,
      state,
      date_of_birth: birthday || undefined,
      phone_number: fullPhone || undefined,
      profile_photo: newProfilePhotoFile.value ?? undefined,
      interests: userInterests.value,
    });

    if (newProfilePhotoPreview.value) URL.revokeObjectURL(newProfilePhotoPreview.value);
    newProfilePhotoFile.value = null;
    newProfilePhotoPreview.value = null;

    displayName.value = values.displayName;
    username.value = values.username;
    bio.value = values.bio;
    location.value = [city, state].filter(Boolean).join(", ");
    // website not editable in profile settings form anymore
    // userInterests already updated via toggles

    isEditMode.value = false;
    // Refresh user data in background so loader is already off
    authStore.getCurrentUser().catch((e) => console.error("Failed to refresh user:", e));
  } catch (error) {
    console.error("Failed to update profile:", error);
  } finally {
    isSaving.value = false;
  }
});

const handleCancelEdit = () => {
  if (newProfilePhotoPreview.value) URL.revokeObjectURL(newProfilePhotoPreview.value);
  newProfilePhotoFile.value = null;
  newProfilePhotoPreview.value = null;
  if (authStore.user) {
    const u = authStore.user;
    const { code, national } = parsePhoneToCountryAndNational(u.phone || u.phone_number || "");
    phoneCountryCode.value = code;
    setValues({
      displayName: u.display_name || u.name || u.username || "User",
      username: u.username || "",
      phoneNational: national,
      city: u.profile?.city || u.city || "",
      state: u.profile?.state || u.state || "",
      bio: u.profile?.bio ?? u.bio ?? "",
      birthday: normalizeDateForInput(
        u?.profile?.birthday ||
          (u as any)?.profile?.date_of_birth ||
          (u as any)?.profile?.dob ||
          (u as any)?.profile?.birth_date ||
          (u as any)?.birthday ||
          (u as any)?.date_of_birth ||
          (u as any)?.dob ||
          ""
      ),
    });
    userInterests.value = Array.isArray(u?.interests) ? [...u.interests] : [];
  }
  isEditMode.value = false;
};

const handleLogout = async () => {
  try {
    await authStore.logout();
    await router.push('/');
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

// Account settings handlers
const handleChangePassword = () => {
  showChangePasswordModal.value = true;
};

const handleManageLinkedAccounts = () => {
  // TODO: Implement linked accounts management
  console.log("Manage linked accounts clicked");
};

const handleDeleteAccount = () => {
  showDeleteAccountModal.value = true;
};

// Billing handlers
const handleChangePlan = () => {
  router.push('/membership');
};

const handleUpdatePayment = () => {
  // TODO: Implement payment method update
  console.log("Update payment clicked");
};

const handleViewBillingHistory = () => {
  // TODO: Implement billing history view
  console.log("View billing history clicked");
};

</script>

<style scoped>
.profile-country-select {
  color-scheme: dark;
}
.profile-country-select option {
  background: #0B0B0D;
  color: #F4F2ED;
}
</style>
