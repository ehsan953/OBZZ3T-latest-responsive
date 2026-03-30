<template>
  <div
    class="font-['Segoe_UI',sans-serif] font-normal relative min-h-screen p-6 bg-[#0B0B0D]"
  >
    <LevelNavigation />
    <div class="relative max-w-7xl mx-auto pt-4">
      <!-- Header -->
      <div class="text-center mb-10">
        <h1 class="text-4xl font-normal text-[#C9A24D] mb-2">
          {{ t('ambassador.title') }}
        </h1>
        <p class="text-[#F4F2ED] text-base opacity-90 max-w-2xl mx-auto">
          {{ t('ambassador.subtitle') }}
        </p>
      </div>

      <!-- Statistics Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <OB33ZCard class="p-5">
          <div class="flex items-center gap-2 text-[#F4F2ED] mb-3">
            <svg
              class="w-5 h-5 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            <span class="text-sm">{{ t('ambassador.totalScans') }}</span>
          </div>
          <p class="text-2xl font-normal text-white">1,247</p>
          <div class="flex items-center gap-1.5 mt-1 text-[#5B3FD6] text-sm">
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
            <span>+12%</span>
          </div>
        </OB33ZCard>
        <OB33ZCard class="p-5">
          <div class="flex items-center gap-2 text-[#F4F2ED] mb-3">
            <svg
              class="w-5 h-5 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span class="text-sm">{{ t('ambassador.totalSignups') }}</span>
          </div>
          <p class="text-2xl font-normal text-white">342</p>
          <div class="flex items-center gap-1.5 mt-1 text-[#5B3FD6] text-sm">
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
            <span>+8%</span>
          </div>
        </OB33ZCard>
        <OB33ZCard class="p-5">
          <div class="flex items-center gap-2 text-[#F4F2ED] mb-3">
            <svg
              class="w-5 h-5 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span class="text-sm">{{ t('ambassador.activeReferrals') }}</span>
          </div>
          <p class="text-2xl font-normal text-white">298</p>
        </OB33ZCard>
        <OB33ZCard class="p-5">
          <div class="flex items-center gap-2 text-[#F4F2ED] mb-3">
            <svg
              class="w-5 h-5 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
            <span class="text-sm">{{ t('ambassador.conversionRate') }}</span>
          </div>
          <p class="text-2xl font-normal text-white">27.4%</p>
        </OB33ZCard>
      </div>

      <!-- Ambassador Wallet + QR Code row -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <!-- Ambassador Wallet -->
        <div class="lg:col-span-2">
          <OB33ZCard class="p-6">
            <div class="flex items-center gap-2 mb-6">
              <div
                class="w-8 h-8 rounded-lg bg-[#C9A24D]/20 flex items-center justify-center"
              >
                <svg
                  class="w-4 h-4 text-[#C9A24D]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <h2 class="text-lg font-normal text-white">{{ t('ambassador.ambassadorWallet') }}</h2>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div>
                <p class="text-xs text-[#F4F2ED]/60 mb-0.5">{{ t('ambassador.totalEarned') }}</p>
                <p class="text-lg font-normal text-[#C9A24D]">$4,235.50</p>
              </div>
              <div>
          <p class="text-xs text-[#F4F2ED]/60 mb-0.5">{{ t('ambassador.available') }}</p>
                <p class="text-lg font-normal text-[#5B3FD6]">$3,343.20</p>
              </div>
              <div>
                <p class="text-xs text-[#F4F2ED]/60 mb-0.5">{{ t('ambassador.pending') }}</p>
                <p class="text-lg font-normal text-white">$892.30</p>
              </div>
              <div>
                <p class="text-xs text-[#F4F2ED]/60 mb-0.5">{{ t('ambassador.thisMonth') }}</p>
                <p class="text-lg font-normal text-white">$1,205.75</p>
              </div>
            </div>
            <div class="flex flex-wrap gap-3">
              <button
                type="button"
                class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#C9A24D] text-[#0B0B0D] font-normal text-sm hover:bg-[#C9A24D]/90 transition"
              >
                <span
                  class=" flex items-center justify-center text-sm"
                  >$</span
                >
                {{ t('ambassador.requestPayout') }}
              </button>
              <button
                type="button"
                class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#C9A24D] bg-transparent text-white font-normal text-sm hover:bg-white/5 transition"
              >
                <svg
                  class="w-4 h-4 text-[#C9A24D]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                <span class="text-[#C9A24D]">
                    {{ t('ambassador.downloadReport') }}
                  </span>
              </button>
            </div>
          </OB33ZCard>
        </div>

        <!-- Your QR Code -->
        <div>
          <OB33ZCard class="p-6 flex flex-col items-center">
            <h2 class="text-lg font-normal text-white w-full text-left mb-4">
              {{ t('ambassador.yourQRCode') }}
            </h2>
            <!-- Golden QR on dark, inside square white border -->
            <div
              class="rounded-none border-[3px] border-white bg-[#0B0B0D] p-3 mb-4 inline-block"
              style="box-shadow: 0 0 0 1px rgba(255,255,255,0.1);"
            >
              <img
                :src="qrCodeUrl"
                alt="Referral QR Code"
                class="block w-50 h-50 object-contain"
                width="200"
                height="200"
              />
            </div>
            <p class="text-sm text-[#A0A0A0] mb-1">
              {{ t('ambassador.scanToJoin') }}
            </p>
            <p class="text-base font-normal text-[#C9A24D] mb-4">
              OB33Z-AMB-2024
            </p>
            <button
              type="button"
              class="inline-flex items-center gap-2 text-sm text-white hover:text-[#C9A24D] transition"
              @click="handleDownloadQR"
            >
              <svg
                class="w-4 h-4 text-[#C9A24D]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              {{ t('ambassador.downloadQR') }}
            </button>
          </OB33ZCard>
        </div>
      </div>

      <!-- Your Referral Link -->
      <OB33ZCard class="p-6 mb-8">
        <div class="flex items-center gap-2 mb-4">
          <svg
            class="w-5 h-5 text-[#C9A24D] shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
          <h2 class="text-lg font-normal text-white">{{ t('ambassador.yourReferralLink') }}</h2>
        </div>
        <div class="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            :value="referralLink"
            readonly
            class="flex-1 min-w-0 px-4 py-3 rounded-lg bg-[#1A1A1D] border border-[rgba(201,162,77,0.2)] text-white text-sm font-normal outline-none"
          />
          <div class="flex gap-2 shrink-0">
            <button
              type="button"
              class="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#C9A24D] bg-transparent text-[#C9A24D] font-normal text-sm hover:bg-[#C9A24D]/10 transition"
              @click="copyReferralLink"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              {{ t('ambassador.copy') }}
            </button>
            <button
              type="button"
              class="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#C9A24D] bg-transparent text-[#C9A24D] font-normal text-sm hover:bg-[#C9A24D]/10 transition"
              @click="shareReferralLink"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
              {{ t('ambassador.share') }}
            </button>
          </div>
        </div>
      </OB33ZCard>

      <!-- Recent Activity + Top Referrals -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <OB33ZCard class="p-6">
          <div class="flex items-center gap-2 mb-4">
            <svg
              class="w-5 h-5 text-[#C9A24D] shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <h2 class="text-lg font-normal text-white">{{ t('ambassador.recentActivity') }}</h2>
          </div>
          <ul class="space-y-4">
            <li
              v-for="(item, i) in recentActivity"
              :key="i"
              class="flex items-center justify-between gap-3 py-2 border-b border-[rgba(255,255,255,0.06)] last:border-0"
            >
              <div class="flex items-center gap-3 min-w-0">
                <span
                  class="w-2.5 h-2.5 rounded-full shrink-0"
                  :class="
                    item.dotColor === 'purple' ? 'bg-[#5B3FD6]' : 'bg-[#C9A24D]'
                  "
                />
                <div class="min-w-0">
                  <p class="text-sm font-normal text-white truncate">
                    {{ item.name }}
                  </p>
                  <p class="text-xs text-[#A0A0A0]">{{ item.time }}</p>
                </div>
              </div>
              <span class="text-sm font-normal text-[#C9A24D] shrink-0">{{
                item.amount
              }}</span>
            </li>
          </ul>
        </OB33ZCard>
        <OB33ZCard class="p-6">
          <div class="flex items-center gap-2 mb-4">
            <svg
              class="w-5 h-5 text-[#C9A24D] shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
            <h2 class="text-lg font-normal text-white">{{ t('ambassador.topReferrals') }}</h2>
          </div>
          <ul class="space-y-4">
            <li
              v-for="(item, i) in topReferrals"
              :key="i"
              class="flex items-center justify-between gap-3 py-2 border-b border-[rgba(255,255,255,0.06)] last:border-0"
            >
              <div class="flex items-center gap-3 min-w-0">

                <span
                  class="w-7 h-7 rounded-full bg-linear-to-br from-[#C9A24D] to-[#5B3FD6] flex items-center justify-center text-white text-xs font-normal shrink-0"
                >
                  {{ item.rank }}
                </span>
                <div class="min-w-0">
                  <p class="text-sm font-normal text-white truncate">
                    {{ item.name }}
                  </p>
                  <p class="text-xs text-[#A0A0A0]">{{ item.date }}</p>
                </div>
              </div>
              <span class="text-sm font-normal text-[#C9A24D] shrink-0">{{
                item.amount
              }}</span>
            </li>
          </ul>
        </OB33ZCard>
      </div>

      <!-- How It Works -->
      <OB33ZCard class="p-6">
        <h2 class="text-xl font-normal text-[#C9A24D] mb-6">{{ t('ambassador.howItWorks') }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center md:text-left">
            <div class="inline-flex items-center justify-center mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
              >
                <path
                  d="M0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24Z"
                  fill="#5B3FD6"
                  fill-opacity="0.2"
                />
                <path
                  d="M30 20C31.6569 20 33 18.6569 33 17C33 15.3431 31.6569 14 30 14C28.3431 14 27 15.3431 27 17C27 18.6569 28.3431 20 30 20Z"
                  stroke="#5B3FD6"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M18 27C19.6569 27 21 25.6569 21 24C21 22.3431 19.6569 21 18 21C16.3431 21 15 22.3431 15 24C15 25.6569 16.3431 27 18 27Z"
                  stroke="#5B3FD6"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M30 34C31.6569 34 33 32.6569 33 31C33 29.3431 31.6569 28 30 28C28.3431 28 27 29.3431 27 31C27 32.6569 28.3431 34 30 34Z"
                  stroke="#5B3FD6"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M20.59 25.51L27.42 29.49"
                  stroke="#5B3FD6"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M27.41 18.51L20.59 22.49"
                  stroke="#5B3FD6"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <h3 class="text-base font-normal text-white mb-1">
              {{ t('ambassador.shareYourLink') }}
            </h3>
            <p class="text-sm text-[#A0A0A0]">
              {{ t('ambassador.shareYourLinkDesc') }}
            </p>
          </div>
          <div class="text-center md:text-left">
            <div class="inline-flex items-center justify-center mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
              >
                <path
                  d="M0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24Z"
                  fill="#C9A24D"
                  fill-opacity="0.2"
                />
                <path
                  d="M28 33V31C28 29.9391 27.5786 28.9217 26.8284 28.1716C26.0783 27.4214 25.0609 27 24 27H18C16.9391 27 15.9217 27.4214 15.1716 28.1716C14.4214 28.9217 14 29.9391 14 31V33"
                  stroke="#C9A24D"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M28 15.1279C28.8578 15.3503 29.6174 15.8512 30.1597 16.552C30.702 17.2528 30.9962 18.1138 30.9962 18.9999C30.9962 19.886 30.702 20.7471 30.1597 21.4479C29.6174 22.1487 28.8578 22.6496 28 22.8719"
                  stroke="#C9A24D"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M34 32.9999V30.9999C33.9993 30.1136 33.7044 29.2527 33.1614 28.5522C32.6184 27.8517 31.8581 27.3515 31 27.1299"
                  stroke="#C9A24D"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M21 23C23.2091 23 25 21.2091 25 19C25 16.7909 23.2091 15 21 15C18.7909 15 17 16.7909 17 19C17 21.2091 18.7909 23 21 23Z"
                  stroke="#C9A24D"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <h3 class="text-base font-normal text-white mb-1">{{ t('ambassador.friendsJoin') }}</h3>
            <p class="text-sm text-[#A0A0A0]">
              {{ t('ambassador.friendsJoinDesc') }}
            </p>
          </div>
          <div class="text-center md:text-left">
            <div class="inline-flex items-center justify-center mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
              >
                <path
                  d="M0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24Z"
                  fill="#C9A24D"
                  fill-opacity="0.2"
                />
                <path
                  d="M24 14V34"
                  stroke="#C9A24D"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M29 17H21.5C20.5717 17 19.6815 17.3687 19.0251 18.0251C18.3687 18.6815 18 19.5717 18 20.5C18 21.4283 18.3687 22.3185 19.0251 22.9749C19.6815 23.6313 20.5717 24 21.5 24H26.5C27.4283 24 28.3185 24.3687 28.9749 25.0251C29.6313 25.6815 30 26.5717 30 27.5C30 28.4283 29.6313 29.3185 28.9749 29.9749C28.3185 30.6313 27.4283 31 26.5 31H18"
                  stroke="#C9A24D"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <h3 class="text-base font-normal text-white mb-1">
              {{ t('ambassador.earnCommission') }}
            </h3>
            <p class="text-sm text-[#A0A0A0]">
              {{ t('ambassador.earnCommissionDesc') }}
            </p>
          </div>
        </div>
      </OB33ZCard>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useLanguage();
const referralCode = "OB33Z-AMB-2024";
const referralLink = `https://ob33z.com/ref/${referralCode}`;
const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
  `https://ob33z.com/ref/${referralCode}`
)}&color=C9A24D&bgcolor=0B0B0D`;

const recentActivity = [
  {
    name: "Alex M.",
    time: "2 hours ago",
    amount: "+$12.50",
    dotColor: "purple" as const,
  },
  {
    name: "Sarah K.",
    time: "5 hours ago",
    amount: "+$45.00",
    dotColor: "gold" as const,
  },
  {
    name: "Mike D.",
    time: "1 day ago",
    amount: "+$28.00",
    dotColor: "purple" as const,
  },
  {
    name: "Jordan L.",
    time: "2 days ago",
    amount: "+$15.75",
    dotColor: "gold" as const,
  },
];

const topReferrals = [
  { rank: 1, name: "Sarah K.", date: "Jan 15, 2024", amount: "$450" },
  { rank: 2, name: "Mike D.", date: "Jan 20, 2024", amount: "$380" },
  { rank: 3, name: "Alex M.", date: "Jan 22, 2024", amount: "$295" },
];

function copyReferralLink() {
  navigator.clipboard?.writeText(referralLink).then(() => {
    // Could show a toast here
  });
}

function shareReferralLink() {
  if (navigator.share) {
    navigator
      .share({
        title: "Join OB33Z",
        text: "Join OB33Z with my referral link",
        url: referralLink,
      })
      .catch(() => {});
  } else {
    copyReferralLink();
  }
}

function handleDownloadQR() {
  const link = document.createElement("a");
  link.href = qrCodeUrl;
  link.download = `ob33z-referral-${referralCode}.png`;
  link.target = "_blank";
  link.click();
}
</script>
