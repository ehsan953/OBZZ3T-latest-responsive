<template>
  <div class="relative min-h-screen md:pb-10 lg:pb-20">
    <LevelNavigation />

    <!-- Main Content -->
    <div class="relative max-w-7xl mx-auto py-8 px-4">
      <!-- Header -->
      <div class="mb-8 text-center opacity-0 -translate-y-4 animate-delay-sm flex flex-col items-center">
        <div class="text-4xl text-[#C9A24D] mb-4 font-light">{{ t('membership.title') }}</div>
        <p class="text-[#F4F2ED] opacity-60 max-w-76 md:w-auto text-[16px] font-regular text-center">
          {{ t('membership.subtitle') }}
        </p>
      </div>

      <!-- Loading State -->
      <!-- <div v-if="isLoading && !membershipStatus" class="mb-4 text-center py-4">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#C9A24D]"></div>
        <p class="mt-4 text-[#F4F2ED]/60">Loading membership information...</p>
      </div> -->


      <!-- Current Plan Section -->
      <div class="mb-6 opacity-0 -translate-y-4 animate-delay-md">
        <div class="bg-[rgba(11,11,13,0.6)] backdrop-blur-sm border border-[rgba(201,162,77,0.15)] rounded-lg p-6" style="opacity: 1; transform: none;">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div class="space-y-4">
              <div class="flex items-center gap-3">
                <h2 class="text-2xl font-light text-[#F4F2ED]">{{ t('membership.currentPlan') }}:</h2>
                <div class="px-3 py-1 rounded-full bg-[#C9A24D]/20 border border-[#C9A24D]/30 flex items-center gap-2">
                  <span class="text-sm text-[#C9A24D] font-medium">{{ currentPlan.toUpperCase() }}</span>
                </div>
              </div>
              <div class="flex flex-col md:flex-row flex-wrap gap-4 md:gap-6 text-sm">
                <div class="flex items-center gap-2 text-[#F4F2ED]/60" v-if="hasActiveSubscription">
                  <MembershipActiveRenewalIcon class="lucide lucide-calendar w-4 h-4"/>
                  <span>{{ t('membership.renewsOn', { date: renewalDate }) }}</span>
                </div>
                <div class="flex items-center gap-2 text-[#F4F2ED]/60">
                  <MembershipBillingIcon class="lucide lucide-credit-card w-4 h-4"/>
                  <span>{{ t('membership.billing') }}: {{ billingPeriod === 'monthly' ? t('membership.monthly') : t('membership.yearly') }}</span>
                </div>
              </div>
            </div>
            <div class="flex flex-col md:flex-row gap-3" v-if="hasActiveSubscription">
              <button class="rounded-lg px-4 py-3 flex items-center gap-2 text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-transparent border border-[#C9A24D] text-[#C9A24D] hover:bg-[rgba(201,162,77,0.1)]" tabindex="0" style="transform: none;">
                <MembershipBillingYellowIcon class="lucide lucide-credit-card w-4 h-4" />
                {{ t('membership.updatePayment') }}
              </button>
              <button 
                @click="handleCancelMembership"
                :disabled="isLoading"
                class="px-8 py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-transparent text-[#F4F2ED] hover:bg-[rgba(244,242,237,0.1)]" 
                tabindex="0" 
                style="transform: none;"
              >
                {{ t('membership.cancelMembership') }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Usage This Month -->
      <div class="opacity-0 -translate-y-4 animate-delay-md mb-8">
        <div class="bg-[rgba(11,11,13,0.6)] backdrop-blur-sm border border-[rgba(201,162,77,0.15)] rounded-lg p-6" style="opacity: 1; transform: none;">
          <h3 class="text-lg font-light text-[#F4F2ED] mb-4">{{ t('membership.usageThisMonth') }}</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-full bg-[#5B3FD6]/20 flex items-center justify-center">
                <MembershipRoomUsersIcon class="lucide lucide-users w-6 h-6 text-[#5B3FD6]"/>
              </div>
              <div>
                <div class="text-2xl font-light text-[#F4F2ED]">12</div>
                <div class="text-[#F4F2ED]/60 text-sm">{{ t('membership.roomsVisited') }}</div>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-full bg-[#C9A24D]/20 flex items-center justify-center">
                <MembershipChatIcon class="lucide lucide-message-circle w-6 h-6 text-[#C9A24D]"/>
              </div>
              <div>
                <div class="text-2xl font-light text-[#F4F2ED]">3,420</div>
                <div class="text-[#F4F2ED]/60 text-sm">{{ t('membership.messagesSent') }}</div>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-full bg-[#C9A24D]/20 flex items-center justify-center">
                <MembershipGiftIcon class="lucide lucide-gift w-6 h-6 text-[#C9A24D]" />
              </div>
              <div>
                <div class="text-2xl font-light text-[#F4F2ED]">45</div>
                <div class="text-[#F4F2ED]/60 text-sm">{{ t('membership.giftsSent') }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Billing Period Toggle -->
      <div class="mb-8 flex justify-center opacity-0 -translate-y-4 animate-delay-lg">
        <div class="inline-flex rounded-full bg-[rgba(11,11,13,0.8)] border border-[rgba(201,162,77,0.15)] p-1">
          <button
            data-observer-allow="true"
            @click="billingPeriod = 'monthly'"
            :class="[
              'px-6 py-2 rounded-full font-medium transition-all',
              billingPeriod === 'monthly'
                ? 'bg-[#C9A24D] text-[#0B0B0D]'
                : 'text-[#F4F2ED] opacity-60 hover:bg-[rgba(201,162,77,0.1)] hover:opacity-90'
            ]"
          >
            {{ t('membership.monthly') }}
          </button>
          <button
            data-observer-allow="true"
            @click="billingPeriod = 'yearly'"
            :class="[
              'px-6 py-2 rounded-full font-medium transition-all',
              billingPeriod === 'yearly'
                ? 'bg-[#C9A24D] text-[#0B0B0D]'
                : 'text-[#F4F2ED]/60 hover:text-[#F4F2ED] hover:bg-[rgba(201,162,77,0.1)]'
            ]"
          >
            {{ t('membership.yearly') }} <span class="ml-2 text-[#5B3FD6] text-xs">{{ t('membership.save', { percent: 20 }) }}</span>
          </button>
        </div>
      </div>

      <!-- Membership Plans -->
      <div class="mb-8 opacity-0 -translate-y-4 animate-delay-lg">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Free Plan -->
          <div :class="currentPlan === 'free' ? 'bg-[rgba(11,11,13,0.6)] backdrop-blur-sm border border-[rgba(201,162,77,0.15)] rounded-lg p-6 h-full flex flex-col ring-2 ring-[#C9A24D]' : 'bg-[rgba(11,11,13,0.6)] backdrop-blur-sm border border-[rgba(201,162,77,0.15)] rounded-lg p-6 h-full flex flex-col'">
            <div class="text-center mb-6">
              <div class="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style="background-color: rgba(244, 242, 237, 0.125);">
                <MembershipFreeStarIcon class="lucide lucide-star w-8 h-8" />
              </div>
              <h3 class="text-2xl font-light text-[#F4F2ED] mb-2">{{ t('membership.free') }}</h3>
              <div class="text-4xl font-light" style="color: rgb(244, 242, 237);">{{ t('membership.free') }}</div>
            </div>
            <div class="flex-1 space-y-3 mb-6">
              <div class="flex items-start gap-2">
                <MembershipCheckMarkIcon class="lucide lucide-check w-5 h-5 text-[#5B3FD6] shrink-0 mt-0.5" />
                <span class="text-[#F4F2ED]/80 text-sm">{{ t('membership.planFeatures.free.previewAccess') }}</span>
              </div>
              <div class="flex items-start gap-2">
                <MembershipCheckMarkIcon class="lucide lucide-check w-5 h-5 text-[#5B3FD6] shrink-0 mt-0.5" />
                <span class="text-[#F4F2ED]/80 text-sm">{{ t('membership.planFeatures.free.viewOnlyMode') }}</span>
              </div>
              <div class="flex items-start gap-2">
                <MembershipCheckMarkIcon class="lucide lucide-check w-5 h-5 text-[#5B3FD6] shrink-0 mt-0.5" />
                <span class="text-[#F4F2ED]/80 text-sm">{{ t('membership.planFeatures.free.basicProfile') }}</span>
              </div>
              <div class="flex items-start gap-2">
                <MembershipCheckMarkIcon class="lucide lucide-check w-5 h-5 text-[#5B3FD6] shrink-0 mt-0.5" />
                <span class="text-[#F4F2ED]/80 text-sm">{{ t('membership.planFeatures.free.oneRoom') }}</span>
              </div>
            </div>
            <button 
              @click="currentPlan === 'free' ? null : handleChangeTier('free')"
              :disabled="currentPlan === 'free' || isLoading"
              class="px-8 py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed  w-full" 
              :class="currentPlan === 'free' ? 'bg-transparent border border-[#C9A24D] text-[#C9A24D] hover:bg-[rgba(201,162,77,0.1)]' : 'bg-[#C9A24D] text-[#0B0B0D] hover:bg-[#D4AD59] shadow-[0_0_20px_0_rgba(201,162,77,0.3)]'"
              tabindex="0" 
              style="transform: none;"
            >
              {{ currentPlan === 'free' ? t('membership.currentPlanButton') : (hasActiveSubscription ? t('membership.downgrade') : t('membership.upgrade')) }}
            </button>
          </div>

          <!-- VIP Plan -->
          <div class="relative" style="opacity: 1; transform: none;">
            <div class="absolute -top-3 left-1/2 -translate-x-1/2 z-10"><div class="px-2 py-1 rounded text-xs bg-[rgba(201,162,77,0.1)] text-[#C9A24D] border border-[rgba(201,162,77,0.3)]"></div></div>
            <div :class="currentPlan === 'vip' ? 'bg-[rgba(11,11,13,0.6)] backdrop-blur-sm border border-[rgba(201,162,77,0.15)] rounded-lg p-6 h-full flex flex-col ring-2 ring-[#C9A24D]' : 'bg-[rgba(11,11,13,0.6)] backdrop-blur-sm border border-[rgba(201,162,77,0.15)] rounded-lg p-6 h-full flex flex-col'">
              <div class="text-center mb-6">
                <div class="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style="background-color: rgba(91, 63, 214, 0.125);">
                  <MembershipVIPIcon class="lucide lucide-sparkles w-8 h-8"/>
                </div>
                <h3 class="text-2xl font-light text-[#F4F2ED] mb-2">{{ t('membership.vip') }}</h3>
                <div>
                  <div class="space-y-1">
                    <div class="text-4xl font-light" style="color: rgb(91, 63, 214);">{{ billingPeriod === 'monthly' ? '$29.99' : '$299.99' }}</div>
                    <div class="text-[#F4F2ED]/60 text-sm">/{{ billingPeriod === 'monthly' ? 'month' : 'year' }}</div>
                  </div>
                  <p v-if="billingPeriod === 'yearly'" class="text-sm text-[#C9A24D]">{{ t('membership.save', { percent: 20 }) }}</p>
                </div>
              </div>
              <div class="flex-1 space-y-3 mb-6">
                <div class="flex items-start gap-2">
                  <MembershipCheckMarkIcon class="lucide lucide-check w-5 h-5 text-[#5B3FD6] shrink-0 mt-0.5" />
                  <span class="text-[#F4F2ED]/80 text-sm">{{ t('membership.planFeatures.vip.allRooms') }}</span>
                </div>
                <div class="flex items-start gap-2">
                  <MembershipCheckMarkIcon class="lucide lucide-check w-5 h-5 text-[#5B3FD6] shrink-0 mt-0.5" />
                  <span class="text-[#F4F2ED]/80 text-sm">{{ t('membership.planFeatures.vip.unlimitedMessaging') }}</span>
                </div>
                <div class="flex items-start gap-2">
                  <MembershipCheckMarkIcon class="lucide lucide-check w-5 h-5 text-[#5B3FD6] shrink-0 mt-0.5" />
                  <span class="text-[#F4F2ED]/80 text-sm">{{ t('membership.planFeatures.vip.digitalGifts') }}</span>
                </div>
                <div class="flex items-start gap-2">
                  <MembershipCheckMarkIcon class="lucide lucide-check w-5 h-5 text-[#5B3FD6] shrink-0 mt-0.5" />
                  <span class="text-[#F4F2ED]/80 text-sm">{{ t('membership.planFeatures.vip.boostMessages') }}</span>
                </div>
                <div class="flex items-start gap-2">
                  <MembershipCheckMarkIcon class="lucide lucide-check w-5 h-5 text-[#5B3FD6] shrink-0 mt-0.5" />
                  <span class="text-[#F4F2ED]/80 text-sm">{{ t('membership.planFeatures.vip.prioritySupport') }}</span>
                </div>
              </div>
              <button 
                @click="currentPlan === 'vip' ? null : (hasActiveSubscription ? handleChangeTier('vip') : handleSubscribe('vip'))"
                :disabled="currentPlan === 'vip' || isLoading"
                class="px-8 py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed  w-full" 
                :class="currentPlan === 'vip' ? 'bg-transparent border border-[#C9A24D] text-[#C9A24D] hover:bg-[rgba(201,162,77,0.1)]' : 'bg-[#C9A24D] text-[#0B0B0D] hover:bg-[#D4AD59] shadow-[0_0_20px_0_rgba(201,162,77,0.3)]'"
                tabindex="0" 
                style="transform: none;"
              >
                {{ currentPlan === 'vip' ? t('membership.currentPlanButton') : t('membership.upgrade') }}
              </button>
            </div>
          </div>

          <!-- Elite Plan -->
          <div :class="currentPlan === 'elite' ? 'bg-[rgba(11,11,13,0.6)] backdrop-blur-sm border border-[rgba(201,162,77,0.15)] rounded-lg p-6 h-full flex flex-col ring-2 ring-[#C9A24D]' : 'bg-[rgba(11,11,13,0.6)] backdrop-blur-sm border border-[rgba(201,162,77,0.15)] rounded-lg p-6 h-full flex flex-col'">
            <div class="text-center mb-6">
              <div class="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style="background-color: rgba(201, 162, 77, 0.125);">
                <MembershipEliteIcon class="lucide lucide-crown w-8 h-8"/>
              </div>
              <h3 class="text-2xl font-light text-[#F4F2ED] mb-2">{{ t('membership.elite') }}</h3>
              <div>
                <div class="space-y-1">
                  <div class="text-4xl font-light" style="color: rgb(201, 162, 77);">{{ billingPeriod === 'monthly' ? '$79.99' : '$799.99' }}</div>
                  <div class="text-[#F4F2ED]/60 text-sm">/{{ billingPeriod === 'monthly' ? 'month' : 'year' }}</div>
                </div>
                <p v-if="billingPeriod === 'yearly'" class="text-sm text-[#C9A24D]">Save $159.89</p>
              </div>
            </div>
            <div class="flex-1 space-y-3 mb-6">
              <div class="flex items-start gap-2">
                <MembershipCheckMarkIcon class="lucide lucide-check w-5 h-5 text-[#5B3FD6] shrink-0 mt-0.5" />
                <span class="text-[#F4F2ED]/80 text-sm">{{ t('membership.planFeatures.elite.everythingVip') }}</span>
              </div>
              <div class="flex items-start gap-2">
                <MembershipCheckMarkIcon class="lucide lucide-check w-5 h-5 text-[#5B3FD6] shrink-0 mt-0.5" />
                <span class="text-[#F4F2ED]/80 text-sm">{{ t('membership.planFeatures.elite.exclusiveRooms') }}</span>
              </div>
              <div class="flex items-start gap-2">
                <MembershipCheckMarkIcon class="lucide lucide-check w-5 h-5 text-[#5B3FD6] shrink-0 mt-0.5" />
                <span class="text-[#F4F2ED]/80 text-sm">{{ t('membership.planFeatures.elite.monthlyGiftPack') }}</span>
              </div>
              <div class="flex items-start gap-2">
                <MembershipCheckMarkIcon class="lucide lucide-check w-5 h-5 text-[#5B3FD6] shrink-0 mt-0.5" />
                <span class="text-[#F4F2ED]/80 text-sm">{{ t('membership.planFeatures.elite.customBadge') }}</span>
              </div>
              <div class="flex items-start gap-2">
                <MembershipCheckMarkIcon class="lucide lucide-check w-5 h-5 text-[#5B3FD6] shrink-0 mt-0.5" />
                <span class="text-[#F4F2ED]/80 text-sm">{{ t('membership.planFeatures.elite.priorityPlacement') }}</span>
              </div>
              <div class="flex items-start gap-2">
                <MembershipCheckMarkIcon class="lucide lucide-check w-5 h-5 text-[#5B3FD6] shrink-0 mt-0.5" />
                <span class="text-[#F4F2ED]/80 text-sm">{{ t('membership.planFeatures.elite.advancedAnalytics') }}</span>
              </div>
            </div>
            <button 
              @click="currentPlan === 'elite' ? null : (hasActiveSubscription ? handleChangeTier('elite') : handleSubscribe('elite'))"
              :disabled="currentPlan === 'elite' || isLoading"
              class="px-8 py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed  w-full" 
              :class="currentPlan === 'elite' ? 'bg-transparent border border-[#C9A24D] text-[#C9A24D] hover:bg-[rgba(201,162,77,0.1)]' : 'bg-[#C9A24D] text-[#0B0B0D] hover:bg-[#D4AD59] shadow-[0_0_20px_0_rgba(201,162,77,0.3)]'"
              tabindex="0" 
              style="transform: none;"
            >
              {{ currentPlan === 'elite' ? t('membership.currentPlanButton') : t('membership.upgrade') }}
            </button>
          </div>

          <!-- Obsidian Plan -->
          <div class="relative" style="opacity: 1; transform: none;">
            <div class="absolute -top-3 left-1/2 -translate-x-1/2 z-10"><div class="px-2 py-1 rounded text-xs bg-[rgba(201,162,77,0.1)] text-[#C9A24D] border border-[rgba(201,162,77,0.3)]"></div></div>
            <div :class="currentPlan === 'obsidian' ? 'bg-[rgba(11,11,13,0.6)] backdrop-blur-sm border border-[rgba(201,162,77,0.15)] rounded-lg p-6 h-full flex flex-col ring-2 ring-[#C9A24D]' : 'bg-[rgba(11,11,13,0.6)] backdrop-blur-sm border border-[rgba(201,162,77,0.15)] rounded-lg p-6 h-full flex flex-col'">
              <div class="text-center mb-6">
                <div class="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style="background-color: rgba(201, 162, 77, 0.125);">
                  <MembershipObsidianIcon class="lucide lucide-zap w-8 h-8" />
                </div>
                <h3 class="text-2xl font-light text-[#F4F2ED] mb-2">{{ t('membership.obsidian') }}</h3>
                <div>
                  <div class="space-y-1">
                    <div class="text-4xl font-light" style="color: rgb(201, 162, 77);">{{ billingPeriod === 'monthly' ? '$199.99' : '$1999.99' }}</div>
                    <div class="text-[#F4F2ED]/60 text-sm">/{{ billingPeriod === 'monthly' ? 'month' : 'year' }}</div>
                  </div>
                  <p v-if="billingPeriod === 'yearly'" class="text-sm text-[#C9A24D]">Save $399.89</p>
                </div>
              </div>
              <div class="flex-1 space-y-3 mb-6">
                <div class="flex items-start gap-2">
                  <MembershipCheckMarkIcon class="lucide lucide-check w-5 h-5 text-[#5B3FD6] shrink-0 mt-0.5" />
                  <span class="text-[#F4F2ED]/80 text-sm">{{ t('membership.planFeatures.obsidian.everythingElite') }}</span>
                </div>
                <div class="flex items-start gap-2">
                  <MembershipCheckMarkIcon class="lucide lucide-check w-5 h-5 text-[#5B3FD6] shrink-0 mt-0.5" />
                  <span class="text-[#F4F2ED]/80 text-sm">{{ t('membership.planFeatures.obsidian.personalConcierge') }}</span>
                </div>
                <div class="flex items-start gap-2">
                  <MembershipCheckMarkIcon class="lucide lucide-check w-5 h-5 text-[#5B3FD6] shrink-0 mt-0.5" />
                  <span class="text-[#F4F2ED]/80 text-sm">{{ t('membership.planFeatures.obsidian.unlimitedGifts') }}</span>
                </div>
                <div class="flex items-start gap-2">
                  <MembershipCheckMarkIcon class="lucide lucide-check w-5 h-5 text-[#5B3FD6] shrink-0 mt-0.5" />
                  <span class="text-[#F4F2ED]/80 text-sm">{{ t('membership.planFeatures.obsidian.vipEvents') }}</span>
                </div>
                <div class="flex items-start gap-2">
                  <MembershipCheckMarkIcon class="lucide lucide-check w-5 h-5 text-[#5B3FD6] shrink-0 mt-0.5" />
                  <span class="text-[#F4F2ED]/80 text-sm">{{ t('membership.planFeatures.obsidian.directLine') }}</span>
                </div>
                <div class="flex items-start gap-2">
                  <MembershipCheckMarkIcon class="lucide lucide-check w-5 h-5 text-[#5B3FD6] shrink-0 mt-0.5" />
                  <span class="text-[#F4F2ED]/80 text-sm">{{ t('membership.planFeatures.obsidian.customFeatures') }}</span>
                </div>
              </div>
              <button 
                @click="currentPlan === 'obsidian' ? null : (hasActiveSubscription ? handleChangeTier('obsidian') : handleSubscribe('obsidian'))"
                :disabled="currentPlan === 'obsidian' || isLoading"
                class="px-8 py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed  w-full" 
                :class="currentPlan === 'obsidian' ? 'bg-transparent border border-[#C9A24D] text-[#C9A24D] hover:bg-[rgba(201,162,77,0.1)]' : 'bg-[#C9A24D] text-[#0B0B0D] hover:bg-[#D4AD59] shadow-[0_0_20px_0_rgba(201,162,77,0.3)]'"
                tabindex="0" 
                style="transform: none;"
              >
                {{ currentPlan === 'obsidian' ? t('membership.currentPlanButton') : t('membership.upgrade') }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Error Message -->
      <div v-if="error" class="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400">
        {{ error }}
      </div>

      <!-- Why Upgrade Section -->
      <div class="opacity-0 -translate-y-4 animate-delay-xl">
        <div class="bg-[rgba(11,11,13,0.6)] backdrop-blur-sm border border-[rgba(201,162,77,0.15)] rounded-lg p-8" style="opacity: 1; transform: none;">
          <h3 class="text-2xl font-light text-[#C9A24D] mb-6 text-center">{{ t('membership.whyUpgrade') }}</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="flex flex-col items-center text-center space-y-3">
              <div class="w-16 h-16 rounded-full bg-[#5B3FD6]/20 flex items-center justify-center mx-auto">
                <MembershipExclusiveIcon class="lucide lucide-shield w-8 h-8 text-[#5B3FD6]" />
              </div>
              <h4 class="text-lg text-[#F4F2ED]">{{ t('membership.exclusiveAccess') }}</h4>
              <p class="text-[#F4F2ED]/60 text-sm max-w-58 md:w-auto">{{ t('membership.exclusiveAccessDesc') }}</p>
            </div>
            <div class="flex flex-col items-center text-center space-y-3">
              <div class="w-16 h-16 rounded-full bg-[#C9A24D]/20 flex items-center justify-center mx-auto">
                <MembershipPriorityStatusIcon class="lucide lucide-trending-up w-8 h-8 text-[#C9A24D]" />
              </div>
              <h4 class="text-lg text-[#F4F2ED]">{{ t('membership.priorityStatus') }}</h4>
              <p class="text-[#F4F2ED]/60 text-sm max-w-58 md:w-auto">{{ t('membership.priorityStatusDesc') }}</p>
            </div>
            <div class="flex flex-col items-center text-center space-y-3">
              <div class="w-16 h-16 rounded-full bg-[#C9A24D]/20 flex items-center justify-center mx-auto">
                <MembershipPremiumPerksIcon class="lucide lucide-sparkles w-8 h-8 text-[#C9A24D]" />
              </div>
              <h4 class="text-lg text-[#F4F2ED]">{{ t('membership.premiumPerks') }}</h4>
              <p class="text-[#F4F2ED]/60 text-sm max-w-58 md:w-auto">{{ t('membership.premiumPerksDesc') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useI18n } from "#imports";
import { useAuthStore } from "~/stores/auth";
import MembershipActiveRenewalIcon from "~/components/icons/membership-page-icons/MembershipActiveRenewalIcon.vue";
import MembershipBillingIcon from "~/components/icons/membership-page-icons/MembershipBillingIcon.vue";
import MembershipBillingYellowIcon from "~/components/icons/membership-page-icons/MembershipBillingYellowIcon.vue";
import MembershipRoomUsersIcon from "~/components/icons/membership-page-icons/MembershipRoomUsersIcon.vue";
import MembershipChatIcon from "~/components/icons/membership-page-icons/MembershipChatIcon.vue";
import MembershipGiftIcon from "~/components/icons/membership-page-icons/MembershipGiftIcon.vue";
import MembershipFreeStarIcon from "~/components/icons/membership-page-icons/MembershipFreeStarIcon.vue";
import MembershipCheckMarkIcon from "~/components/icons/membership-page-icons/MembershipCheckMarkIcon.vue";
import MembershipVIPIcon from "~/components/icons/membership-page-icons/MembershipVIPIcon.vue";
import MembershipEliteIcon from "~/components/icons/membership-page-icons/MembershipEliteIcon.vue";
import MembershipObsidianIcon from "~/components/icons/membership-page-icons/MembershipObsidianIcon.vue";
import MembershipExclusiveIcon from "~/components/icons/membership-page-icons/MembershipExclusiveIcon.vue";
import MembershipPriorityStatusIcon from "~/components/icons/membership-page-icons/MembershipPriorityStatusIcon.vue";
import MembershipPremiumPerksIcon from "~/components/icons/membership-page-icons/MembershipPremiumPerksIcon.vue";

const { t } = useI18n();
const authStore = useAuthStore();
const router = useRouter();

const billingPeriod = ref<'monthly' | 'yearly'>('monthly');
const currentPlan = ref<'free' | 'vip' | 'elite' | 'obsidian'>('free');
const membershipTiers = ref<any[]>([]);
const membershipStatus = ref<any>(null);
// This will hold the active tier_key (e.g. tier_29_99)
const currentTierKey = ref<string | null>(null);
const isLoading = ref(false);
const error = ref<string | null>(null);

// Map API tier keys to UI plan names
const tierKeyToPlanMap: Record<string, 'free' | 'vip' | 'elite' | 'obsidian'> = {
  'free_preview': 'free',
  'daily_access': 'free',
  'tier_14_99': 'vip',
  'tier_29_99': 'vip',
  'tier_40_99': 'elite',
  'vip_79_99': 'obsidian',
};

// Map UI plan names to API tier keys (for monthly/yearly)
const planToTierKeyMap: Record<string, { monthly: string; yearly: string }> = {
  'free': { monthly: 'free_preview', yearly: 'free_preview' },
  'vip': { monthly: 'tier_29_99', yearly: 'tier_29_99' },
  'elite': { monthly: 'tier_40_99', yearly: 'tier_40_99' },
  'obsidian': { monthly: 'vip_79_99', yearly: 'vip_79_99' },
};

type PlanName = 'free' | 'vip' | 'elite' | 'obsidian';

// Dynamic mapping built from /membership/tiers (fallbacks retained for safety)
const dynamicPlanToTierKeyMap = ref<Record<PlanName, { monthly?: string; yearly?: string }>>({
  free: {},
  vip: {},
  elite: {},
  obsidian: {},
});
const dynamicTierKeyToPlanMap = ref<Record<string, PlanName>>({});

const parseTierPrice = (tier: any): number => {
  const raw = tier?.monthly_price ?? tier?.price ?? tier?.amount ?? 0;
  const n = Number(raw);
  return Number.isFinite(n) ? n : 0;
};

const isFreeTier = (tier: any): boolean => {
  const key = String(tier?.tier_key || '').toLowerCase();
  const name = String(tier?.name || '').toLowerCase();
  return key.includes('free') || key.includes('daily') || name.includes('free') || name.includes('daily');
};

const buildDynamicTierMaps = (tiers: any[]) => {
  const nextPlanToTier: Record<PlanName, { monthly?: string; yearly?: string }> = {
    free: {},
    vip: {},
    elite: {},
    obsidian: {},
  };
  const nextTierToPlan: Record<string, PlanName> = {};

  const freeTier = tiers.find((t) => isFreeTier(t));
  if (freeTier?.tier_key) {
    nextPlanToTier.free.monthly = freeTier.tier_key;
    nextPlanToTier.free.yearly = freeTier.tier_key;
    nextTierToPlan[freeTier.tier_key] = 'free';
  }

  // Sort paid tiers by price and map first 3 to vip/elite/obsidian.
  const paidTiers = tiers
    .filter((t) => !isFreeTier(t) && t?.tier_key)
    .sort((a, b) => parseTierPrice(a) - parseTierPrice(b));

  const planOrder: PlanName[] = ['vip', 'elite', 'obsidian'];
  for (const [i, plan] of planOrder.entries()) {
    const tier = paidTiers[i];
    if (!tier?.tier_key) continue;
    nextPlanToTier[plan].monthly = tier.tier_key;
    nextPlanToTier[plan].yearly = tier.tier_key;
    nextTierToPlan[tier.tier_key] = plan;
  }

  dynamicPlanToTierKeyMap.value = nextPlanToTier;
  dynamicTierKeyToPlanMap.value = nextTierToPlan;
};

const resolveTierKeyForPlan = (plan: PlanName): string | undefined => {
  return (
    dynamicPlanToTierKeyMap.value[plan]?.[billingPeriod.value] ||
    dynamicPlanToTierKeyMap.value[plan]?.monthly ||
    planToTierKeyMap[plan]?.[billingPeriod.value] ||
    planToTierKeyMap[plan]?.monthly
  );
};

// Load membership data
const loadMembershipData = async () => {
  if (!authStore.isAuthenticated) {
    router.push('/login');
    return;
  }

  isLoading.value = true;
  error.value = null;

  try {
    // Load tiers and status in parallel
    const [tiersResponse, statusResponse] = await Promise.all([
      authStore.getMembershipTiers(),
      authStore.getMembershipStatus(),
    ]);

    // Handle tiers response - API shape: { data: { tiers: [...] } }
    const tiers = (tiersResponse as any).data?.tiers || (tiersResponse as any).tiers || (tiersResponse as any).data || tiersResponse;
    const tiersArray = Array.isArray(tiers) ? tiers : [];
    membershipTiers.value = tiersArray;
    buildDynamicTierMaps(tiersArray);

    // Handle status response - API shape: { data: { membership_tier: string, subscription: {...} } }
    const statusData = (statusResponse as any).data || (statusResponse as any).status || statusResponse;
    const subscription = statusData?.subscription || null;

    // Store subscription object for status / renewal date
    membershipStatus.value = subscription;

    // Determine the effective tier_key
    const userTierKey: string | undefined = statusData?.membership_tier;

    let subscriptionTierKey: string | undefined;
    if (subscription && tiersArray.length) {
      const matchedTier = tiersArray.find((t: any) => t.id === subscription.tier_id);
      subscriptionTierKey = matchedTier?.tier_key;
    }

    const tierKey = subscriptionTierKey || userTierKey || null;
    currentTierKey.value = tierKey;

    // Set current plan based on tierKey
    if (tierKey) {
      const plan = dynamicTierKeyToPlanMap.value[tierKey] || tierKeyToPlanMap[tierKey] || 'free';
      currentPlan.value = plan;
    }
  } catch (err: any) {
    error.value = authStore.error || 'Failed to load membership data';
    console.error('Error loading membership data:', err);
  } finally {
    isLoading.value = false;
  }
};

// Subscribe to a plan
const handleSubscribe = async (plan: 'free' | 'vip' | 'elite' | 'obsidian') => {
  if (!authStore.isAuthenticated) {
    router.push('/login');
    return;
  }

  isLoading.value = true;
  error.value = null;

  try {
    const tierKey = resolveTierKeyForPlan(plan);
    
    if (!tierKey) {
      throw new Error('Invalid plan selected');
    }

    // Get current URL for success/cancel redirects
    const baseUrl = window.location.origin;
    const successUrl = `${baseUrl}/membership?success=true`;
    const cancelUrl = `${baseUrl}/membership?canceled=true`;

    const response = await authStore.subscribeMembership(tierKey, successUrl, cancelUrl);
    
    // If response contains a checkout URL, redirect to it
    const checkoutUrl = response.url || response.checkout_url || response.data?.url || response.data?.checkout_url;
    if (checkoutUrl) {
      window.open(checkoutUrl, '_blank');
    } else {
      // If no redirect URL, reload membership data
      await loadMembershipData();
    }
  } catch (err: any) {
    error.value = authStore.error || 'Failed to subscribe';
    console.error('Error subscribing:', err);
  } finally {
    isLoading.value = false;
  }
};

// Change tier/plan
const handleChangeTier = async (plan: 'free' | 'vip' | 'elite' | 'obsidian') => {
  if (!authStore.isAuthenticated) {
    router.push('/login');
    return;
  }

  if (currentPlan.value === plan) {
    return; // Already on this plan
  }

  isLoading.value = true;
  error.value = null;

  try {
    const tierKey = resolveTierKeyForPlan(plan);
    
    if (!tierKey) {
      throw new Error('Invalid plan selected');
    }

    // Get current URL for success/cancel redirects
    const baseUrl = window.location.origin;
    const successUrl = `${baseUrl}/membership?success=true`;
    const cancelUrl = `${baseUrl}/membership?canceled=true`;

    const response = await authStore.changeMembershipTier(tierKey, successUrl, cancelUrl);
    
    // If response contains a checkout URL, redirect to it
    const checkoutUrl = response.url || response.checkout_url || response.data?.url || response.data?.checkout_url;
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    } else {
      // If no redirect URL, reload membership data
      await loadMembershipData();
    }
  } catch (err: any) {
    error.value = authStore.error || 'Failed to change tier';
    console.error('Error changing tier:', err);
  } finally {
    isLoading.value = false;
  }
};

// Cancel membership
const handleCancelMembership = async () => {
  if (!authStore.isAuthenticated) {
    return;
  }

  if (!confirm('Are you sure you want to cancel your membership? This action cannot be undone.')) {
    return;
  }

  isLoading.value = true;
  error.value = null;

  try {
    if (!currentTierKey.value) {
      throw new Error('No active subscription found');
    }

    // Get current URL for success/cancel redirects
    const baseUrl = window.location.origin;
    const successUrl = `${baseUrl}/membership?canceled=true`;
    const cancelUrl = `${baseUrl}/membership`;

    const response = await authStore.cancelMembership(currentTierKey.value, successUrl, cancelUrl);
    
    // Reload membership data after cancellation
    await loadMembershipData();
  } catch (err: any) {
    error.value = authStore.error || 'Failed to cancel membership';
    console.error('Error canceling membership:', err);
  } finally {
    isLoading.value = false;
  }
};

// Format renewal date
const renewalDate = computed(() => {
  const sub = membershipStatus.value;
  if (!sub) return 'N/A';

  // Backend status API exposes period dates on the subscription object
  const renewalRaw =
    sub.current_period_end ||
    sub.expires_at ||
    sub.cancel_at_period_end;

  if (!renewalRaw) return 'N/A';

  const date = new Date(renewalRaw);
  if (Number.isNaN(date.getTime())) return 'N/A';

  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
});

// Check if user has active subscription
const hasActiveSubscription = computed(() => {
  const sub = membershipStatus.value;
  if (!sub) return false;

  return sub.status === 'active' || sub.is_active === true;
});

// Load data on mount
onMounted(() => {
  if (authStore.isAuthenticated) {
    loadMembershipData();
  }
  
  // Check for success/cancel query params
  const route = useRoute();
  if (route.query.success === 'true') {
    // Show success message (you can add a toast notification here)
    console.log('Subscription successful!');
    if (authStore.isAuthenticated) {
      loadMembershipData();
    }
  }
  if (route.query.canceled === 'true') {
    // Show cancellation message
    console.log('Subscription canceled.');
    if (authStore.isAuthenticated) {
      loadMembershipData();
    }
  }
});

const headerMotion = {
  initial: { opacity: 0, y: -20 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, easing: "ease-out" },
  },
};

const currentPlanMotion = {
  initial: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.1, duration: 0.5, easing: "ease-out" },
  },
};

const usageMotion = {
  initial: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.2, duration: 0.5, easing: "ease-out" },
  },
};

const toggleMotion = {
  initial: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.3, duration: 0.5, easing: "ease-out" },
  },
};

const plansMotion = {
  initial: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.4, duration: 0.5, easing: "ease-out" },
  },
};

const whyUpgradeMotion = {
  initial: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.5, duration: 0.5, easing: "ease-out" },
  },
};
</script>
