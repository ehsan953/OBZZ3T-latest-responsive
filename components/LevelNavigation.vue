<template>
  <div>
    <!-- Mobile: icon rail + tap-to-open drawer -->
    <div class="md:hidden">
      <div class="fixed top-0 left-0 right-0 z-50 bg-[rgba(11,11,13,0.95)] backdrop-blur-md border-b border-[rgba(201,162,77,0.12)]">
        <div class="h-14 px-4 flex items-center justify-between">
          <NuxtLink to="/lounge" class="text-sm font-medium tracking-widest text-[#C9A24D]">
            OB33Z
          </NuxtLink>
          <button
            type="button"
            class="p-2 rounded-md text-[#F4F2ED] hover:bg-[rgba(201,162,77,0.1)]"
            aria-label="Open menu"
            @click="isMobileNavOpen = true"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <div class="h-14" />

      <!-- Drawer -->
      <div v-if="isMobileNavOpen" class="fixed inset-0 z-70">
        <div class="absolute inset-0 bg-black/60" @click="isMobileNavOpen = false" />
        <div class="absolute top-0 right-0 h-full w-[86%] max-w-85 bg-[rgba(11,11,13,0.98)] backdrop-blur-md border-l border-[rgba(201,162,77,0.15)] p-4 overflow-y-auto">
        <div class="flex items-center justify-between mb-4">
          <div class="text-sm font-medium tracking-widest text-[#C9A24D]">OB33Z</div>
          <button
            type="button"
            class="p-2 rounded-md text-[#F4F2ED]/70 hover:text-[#F4F2ED]"
            aria-label="Close menu"
            @click="isMobileNavOpen = false"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="flex flex-col gap-1">
          <div class="text-xs font-medium text-[#F4F2ED66]/40 tracking-widest px-3 mb-1">ROOMS</div>
          <NuxtLink
            v-for="level in activeLevels"
            :key="level.path"
            :to="level.path"
            class="relative"
            @click="onMobileLevelClick($event, level.path)"
          >
            <div
              :class="[
                'px-4 py-3 rounded-lg transition-colors flex items-center gap-3',
                isActive(level.path)
                  ? 'bg-[#C9A24D] text-[#0B0B0D]'
                  : 'text-[#F4F2ED] hover:bg-[rgba(201,162,77,0.1)]'
              ]"
            >
              <div class="w-6 h-6 flex items-center justify-center">
                <svg v-if="level.path === '/lounge'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7.9 20A9 9 0 104 16.1L2 22z" />
                </svg>
                <svg v-else-if="level.path === '/vibe-room'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <svg v-else-if="level.path === '/sports-complex'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
                  <circle cx="12" cy="12" r="2" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
                </svg>
                <svg v-else-if="level.path === '/fireside'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z" />
                </svg>
              </div>
              <div class="flex flex-col">
                <span class="text-sm font-medium">{{ level.name }}</span>
                <span class="text-xs opacity-60">Level {{ level.level }}</span>
              </div>
            </div>
          </NuxtLink>

          <div v-if="authStore.isInitialized && authStore.isAuthenticated" class="border-t border-[rgba(201,162,77,0.15)] my-3" />
          <div v-if="authStore.isInitialized && authStore.isAuthenticated" class="text-xs font-medium text-[#F4F2ED66]/40 tracking-widest px-3 mb-1">ACCOUNT & MORE</div>

          <NuxtLink
            v-if="authStore.isInitialized && authStore.isAuthenticated"
            to="/profile"
            class="relative"
            @click.prevent="isMobileNavOpen = false; startTransition('/profile')"
          >
            <div
              :class="[
                'px-4 py-3 rounded-lg transition-colors flex items-center gap-3',
                isActive('/profile')
                  ? 'bg-[#5B3FD6] text-white'
                  : 'text-[#F4F2ED] hover:bg-[rgba(91,63,214,0.1)]'
              ]"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span class="text-sm font-medium">Profile</span>
            </div>
          </NuxtLink>

          <NuxtLink
            v-if="authStore.isInitialized && authStore.isAuthenticated"
            to="/membership"
            class="relative"
            @click.prevent="isMobileNavOpen = false; startTransition('/membership')"
          >
            <div
              :class="[
                'px-4 py-3 rounded-lg transition-colors flex items-center gap-3',
                isActive('/membership')
                  ? 'bg-[#5B3FD6] text-white'
                  : 'text-[#F4F2ED] hover:bg-[rgba(91,63,214,0.1)]'
              ]"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              <span class="text-sm font-medium">Membership</span>
            </div>
          </NuxtLink>

          <NuxtLink
            v-if="authStore.isInitialized && authStore.isAuthenticated"
            to="/ambassador"
            class="relative"
            @click.prevent="isMobileNavOpen = false; startTransition('/ambassador')"
          >
            <div
              :class="[
                'px-4 py-3 rounded-lg transition-colors flex items-center gap-3',
                isActive('/ambassador')
                  ? 'bg-[#5B3FD6] text-white'
                  : 'text-[#F4F2ED] hover:bg-[rgba(91,63,214,0.1)]'
              ]"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M5.697 6.237l2.14-.285m6.326 0l2.14.285M15.697 9.237l-1.14 1.855m-4.114 0L8.303 9.237m7.394 5.526l-1.14-1.855m-4.114 0L8.303 14.763M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-sm font-medium">Ambassador Program</span>
            </div>
          </NuxtLink>

          <NuxtLink
            v-if="authStore.isInitialized && authStore.isAuthenticated"
            to="/games"
            class="relative"
            @click.prevent="isMobileNavOpen = false; startTransition('/games')"
          >
            <div
              :class="[
                'px-4 py-3 rounded-lg transition-colors flex items-center gap-3',
                isActive('/games')
                  ? 'bg-[#5B3FD6] text-white'
                  : 'text-[#F4F2ED] hover:bg-[rgba(91,63,214,0.1)]'
              ]"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 7.3335H6.66667" stroke="#F4F2ED" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M5.33337 6V8.66667" stroke="#F4F2ED" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10 8H10.0067" stroke="#F4F2ED" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 6.6665H12.0067" stroke="#F4F2ED" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M11.5467 3.3335H4.45337C3.79356 3.33365 3.15723 3.57841 2.6674 4.02047C2.17756 4.46253 1.869 5.07049 1.80137 5.72683C1.79737 5.7615 1.79471 5.79416 1.79004 5.82816C1.73604 6.2775 1.33337 9.6375 1.33337 10.6668C1.33337 11.1973 1.54409 11.706 1.91916 12.081C2.29423 12.4561 2.80294 12.6668 3.33337 12.6668C4.00004 12.6668 4.33337 12.3335 4.66671 12.0002L5.60937 11.0575C5.85936 10.8074 6.19845 10.6669 6.55204 10.6668H9.44804C9.80163 10.6669 10.1407 10.8074 10.3907 11.0575L11.3334 12.0002C11.6667 12.3335 12 12.6668 12.6667 12.6668C13.1971 12.6668 13.7058 12.4561 14.0809 12.081C14.456 11.706 14.6667 11.1973 14.6667 10.6668C14.6667 9.63683 14.264 6.2775 14.21 5.82816C14.2054 5.79483 14.2027 5.7615 14.1987 5.7275C14.1312 5.07104 13.8227 4.46292 13.3329 4.02072C12.843 3.57852 12.2066 3.33367 11.5467 3.3335Z" stroke="#F4F2ED" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span class="text-sm font-medium">Games</span>
            </div>
          </NuxtLink>

          <NuxtLink
            v-if="authStore.isInitialized && authStore.isAuthenticated"
            to="/watch-parties"
            class="relative"
            @click.prevent="isMobileNavOpen = false; startTransition('/watch-parties')"
          >
            <div
              :class="[
                'px-4 py-3 rounded-lg transition-colors flex items-center gap-3',
                isActive('/watch-parties')
                  ? 'bg-[#5B3FD6] text-white'
                  : 'text-[#F4F2ED] hover:bg-[rgba(91,63,214,0.1)]'
              ]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10.6666 8.66652L14.1486 10.9879C14.1988 11.0213 14.2571 11.0404 14.3174 11.0433C14.3776 11.0462 14.4375 11.0327 14.4906 11.0042C14.5438 10.9758 14.5882 10.9334 14.6192 10.8817C14.6502 10.83 14.6666 10.7708 14.6666 10.7105V5.24652C14.6666 5.18787 14.6512 5.13025 14.6218 5.07948C14.5924 5.02872 14.5502 4.9866 14.4993 4.95738C14.4485 4.92817 14.3908 4.91289 14.3322 4.91309C14.2735 4.91329 14.2159 4.92896 14.1653 4.95852L10.6666 6.99985" stroke="#F4F2ED" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9.33337 4H2.66671C1.93033 4 1.33337 4.59695 1.33337 5.33333V10.6667C1.33337 11.403 1.93033 12 2.66671 12H9.33337C10.0698 12 10.6667 11.403 10.6667 10.6667V5.33333C10.6667 4.59695 10.0698 4 9.33337 4Z" stroke="#F4F2ED" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span class="text-sm font-medium">Watch Parties</span>
            </div>
          </NuxtLink>

          <NuxtLink
            v-if="authStore.isInitialized && authStore.isAuthenticated"
            to="/payouts"
            class="relative"
            @click.prevent="isMobileNavOpen = false; startTransition('/payouts')"
          >
            <div
              :class="[
                'px-4 py-3 rounded-lg transition-colors flex items-center gap-3',
                isActive('/payouts')
                  ? 'bg-[#5B3FD6] text-white'
                  : 'text-[#F4F2ED] hover:bg-[rgba(91,63,214,0.1)]'
              ]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1.3335V14.6668" stroke="#F4F2ED" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M11.3333 3.3335H6.33333C5.71449 3.3335 5.121 3.57933 4.68342 4.01691C4.24583 4.4545 4 5.04799 4 5.66683C4 6.28567 4.24583 6.87916 4.68342 7.31675C5.121 7.75433 5.71449 8.00016 6.33333 8.00016H9.66667C10.2855 8.00016 10.879 8.246 11.3166 8.68358C11.7542 9.12117 12 9.71466 12 10.3335C12 10.9523 11.7542 11.5458 11.3166 11.9834C10.879 12.421 10.2855 12.6668 9.66667 12.6668H4" stroke="#F4F2ED" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span class="text-sm font-medium">Payouts</span>
            </div>
          </NuxtLink>

          <button
            v-if="authStore.isInitialized && authStore.isAuthenticated"
            type="button"
            @click="isMobileNavOpen = false; handleLogout()"
            :disabled="authStore.isLoading"
            class="px-4 py-3 rounded-lg transition-colors text-[#F4F2ED] hover:bg-red-500/20 hover:text-red-400 border-t border-[rgba(201,162,77,0.15)] mt-2 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span class="text-sm font-medium">
              {{ authStore.isLoading ? 'Logging out...' : 'Logout' }}
            </span>
          </button>
        </div>
        </div>
      </div>
    </div>

    <!-- Desktop: collapsed icons, expands on hover -->
    <nav class="hidden md:block fixed top-6 left-6 z-50 group">
    <div
      v-motion="navMotion"
      class="bg-[rgba(11,11,13,0.8)] backdrop-blur-md border border-[rgba(201,162,77,0.15)] rounded-lg p-2 transition-all duration-200 w-16.25 group-hover:w-max group-hover:min-w-65"
    >
      <div class="flex flex-col gap-1">
        <NuxtLink
          v-for="level in activeLevels"
          :key="level.path"
          :to="level.path"
          class="relative"
          @click="onLevelClick($event, level.path)"
        >
          <div
            :class="[
              'px-3 py-2 rounded-md transition-colors flex items-center gap-3',
              isActive(level.path)
                ? 'bg-[#C9A24D] text-[#0B0B0D]'
                : 'text-[#F4F2ED] hover:bg-[rgba(201,162,77,0.1)]'
            ]"
          >
            <div class="w-5 h-5 flex items-center justify-center">
              <svg v-if="level.path === '/lounge'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7.9 20A9 9 0 104 16.1L2 22z" />
              </svg>
              <svg v-else-if="level.path === '/vibe-room'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <svg v-else-if="level.path === '/sports-complex'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
                <circle cx="12" cy="12" r="2" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
              </svg>
              <svg v-else-if="level.path === '/fireside'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z" />
              </svg>
            </div>
            <div class="hidden group-hover:flex items-center gap-2 whitespace-nowrap">
              <span class="text-xs opacity-60">Level {{ level.level }}</span>
              <span class="text-sm font-medium">{{ level.name }}</span>
            </div>
          </div>
        </NuxtLink>

        <div v-if="authStore.isInitialized && authStore.isAuthenticated" class="border-t border-[rgba(201,162,77,0.15)] mt-1"></div>

        <NuxtLink
          v-if="authStore.isInitialized && authStore.isAuthenticated"
          to="/profile"
          class="relative"
          @click.prevent="startTransition('/profile')"
        >
          <div
            :class="[
              'px-3 py-2 rounded-md transition-colors flex items-center gap-3',
              isActive('/profile')
                ? 'bg-[#5B3FD6] text-white'
                : 'text-[#F4F2ED] hover:bg-[rgba(91,63,214,0.1)]'
            ]"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span class="hidden group-hover:inline text-sm font-medium whitespace-nowrap">Profile</span>
          </div>
        </NuxtLink>

        <NuxtLink
          v-if="authStore.isInitialized && authStore.isAuthenticated"
          to="/membership"
          class="relative"
          @click.prevent="startTransition('/membership')"
        >
          <div
            :class="[
              'px-3 py-2 rounded-md transition-colors flex items-center gap-3',
              isActive('/membership')
                ? 'bg-[#5B3FD6] text-white'
                : 'text-[#F4F2ED] hover:bg-[rgba(91,63,214,0.1)]'
            ]"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <span class="hidden group-hover:inline text-sm font-medium whitespace-nowrap">Membership</span>
          </div>
        </NuxtLink>

        <NuxtLink
          v-if="authStore.isInitialized && authStore.isAuthenticated"
          to="/ambassador"
          class="relative"
          @click.prevent="startTransition('/ambassador')"
        >
          <div
            :class="[
              'px-3 py-2 rounded-md transition-colors flex items-center gap-3',
              isActive('/ambassador')
                ? 'bg-[#5B3FD6] text-white'
                : 'text-[#F4F2ED] hover:bg-[rgba(91,63,214,0.1)]'
            ]"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M5.697 6.237l2.14-.285m6.326 0l2.14.285M15.697 9.237l-1.14 1.855m-4.114 0L8.303 9.237m7.394 5.526l-1.14-1.855m-4.114 0L8.303 14.763M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="hidden group-hover:inline text-sm font-medium whitespace-nowrap">Ambassador Program</span>
          </div>
        </NuxtLink>

        <NuxtLink
          v-if="authStore.isInitialized && authStore.isAuthenticated"
          to="/games"
          class="relative"
          @click.prevent="startTransition('/games')"
        >
          <div
            :class="[
              'px-3 py-2 rounded-md transition-colors flex items-center gap-3',
              isActive('/games')
                ? 'bg-[#5B3FD6] text-white'
                : 'text-[#F4F2ED] hover:bg-[rgba(91,63,214,0.1)]'
            ]"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 7.3335H6.66667" stroke="#F4F2ED" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M5.33337 6V8.66667" stroke="#F4F2ED" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M10 8H10.0067" stroke="#F4F2ED" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 6.6665H12.0067" stroke="#F4F2ED" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M11.5467 3.3335H4.45337C3.79356 3.33365 3.15723 3.57841 2.6674 4.02047C2.17756 4.46253 1.869 5.07049 1.80137 5.72683C1.79737 5.7615 1.79471 5.79416 1.79004 5.82816C1.73604 6.2775 1.33337 9.6375 1.33337 10.6668C1.33337 11.1973 1.54409 11.706 1.91916 12.081C2.29423 12.4561 2.80294 12.6668 3.33337 12.6668C4.00004 12.6668 4.33337 12.3335 4.66671 12.0002L5.60937 11.0575C5.85936 10.8074 6.19845 10.6669 6.55204 10.6668H9.44804C9.80163 10.6669 10.1407 10.8074 10.3907 11.0575L11.3334 12.0002C11.6667 12.3335 12 12.6668 12.6667 12.6668C13.1971 12.6668 13.7058 12.4561 14.0809 12.081C14.456 11.706 14.6667 11.1973 14.6667 10.6668C14.6667 9.63683 14.264 6.2775 14.21 5.82816C14.2054 5.79483 14.2027 5.7615 14.1987 5.7275C14.1312 5.07104 13.8227 4.46292 13.3329 4.02072C12.843 3.57852 12.2066 3.33367 11.5467 3.3335Z" stroke="#F4F2ED" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="hidden group-hover:inline text-sm font-medium whitespace-nowrap">Games</span>
          </div>
        </NuxtLink>
        
        <NuxtLink
          v-if="authStore.isInitialized && authStore.isAuthenticated"
          to="/watch-parties"
          class="relative"
          @click.prevent="startTransition('/watch-parties')"
        >
          <div
            :class="[
              'px-3 py-2 rounded-md transition-colors flex items-center gap-3',
              isActive('/watch-parties')
                ? 'bg-[#5B3FD6] text-white'
                : 'text-[#F4F2ED] hover:bg-[rgba(91,63,214,0.1)]'
            ]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10.6666 8.66652L14.1486 10.9879C14.1988 11.0213 14.2571 11.0404 14.3174 11.0433C14.3776 11.0462 14.4375 11.0327 14.4906 11.0042C14.5438 10.9758 14.5882 10.9334 14.6192 10.8817C14.6502 10.83 14.6666 10.7708 14.6666 10.7105V5.24652C14.6666 5.18787 14.6512 5.13025 14.6218 5.07948C14.5924 5.02872 14.5502 4.9866 14.4993 4.95738C14.4485 4.92817 14.3908 4.91289 14.3322 4.91309C14.2735 4.91329 14.2159 4.92896 14.1653 4.95852L10.6666 6.99985" stroke="#F4F2ED" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M9.33337 4H2.66671C1.93033 4 1.33337 4.59695 1.33337 5.33333V10.6667C1.33337 11.403 1.93033 12 2.66671 12H9.33337C10.0698 12 10.6667 11.403 10.6667 10.6667V5.33333C10.6667 4.59695 10.0698 4 9.33337 4Z" stroke="#F4F2ED" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="hidden group-hover:inline text-sm font-medium whitespace-nowrap">Watch Parties</span>
          </div>
        </NuxtLink>

        <NuxtLink
          v-if="authStore.isInitialized && authStore.isAuthenticated"
          to="/payouts"
          class="relative"
          @click.prevent="startTransition('/payouts')"
        >
          <div
            :class="[
              'px-3 py-2 rounded-md transition-colors flex items-center gap-3',
              isActive('/payouts')
                ? 'bg-[#5B3FD6] text-white'
                : 'text-[#F4F2ED] hover:bg-[rgba(91,63,214,0.1)]'
            ]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1.3335V14.6668" stroke="#F4F2ED" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M11.3333 3.3335H6.33333C5.71449 3.3335 5.121 3.57933 4.68342 4.01691C4.24583 4.4545 4 5.04799 4 5.66683C4 6.28567 4.24583 6.87916 4.68342 7.31675C5.121 7.75433 5.71449 8.00016 6.33333 8.00016H9.66667C10.2855 8.00016 10.879 8.246 11.3166 8.68358C11.7542 9.12117 12 9.71466 12 10.3335C12 10.9523 11.7542 11.5458 11.3166 11.9834C10.879 12.421 10.2855 12.6668 9.66667 12.6668H4" stroke="#F4F2ED" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="hidden group-hover:inline text-sm font-medium whitespace-nowrap">Payouts</span>
          </div>
        </NuxtLink>

        <button
          v-if="authStore.isInitialized && authStore.isAuthenticated"
          @click="handleLogout"
          :disabled="authStore.isLoading"
          class="px-3 py-2 rounded-md transition-colors text-[#F4F2ED] hover:bg-red-500/20 hover:text-red-400 border-t border-[rgba(201,162,77,0.15)] mt-1 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a2 2 0 01-2-2V6a2 2 0 012-2h4a3 3 0 013 3v1" />
          </svg>
          <span class="hidden group-hover:inline text-sm font-medium whitespace-nowrap">
            {{ authStore.isLoading ? 'Logging out...' : 'Logout' }}
          </span>
        </button>
      </div>
    </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "#imports";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "~/stores/auth";
import { useTransitionScreen } from "~/composables/useTransitionScreen";

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const { startTransition } = useTransitionScreen();
const isMobileNavOpen = ref(false);

// All level pages that should use the transition screen
const TRANSITION_PATHS = ["/lounge", "/vibe-room", "/sports-complex", "/fireside"];

function onLevelClick(e: MouseEvent, path: string) {
  if (TRANSITION_PATHS.includes(path)) {
    e.preventDefault();
    startTransition(path);
  }
}

function onMobileLevelClick(e: MouseEvent, path: string) {
  isMobileNavOpen.value = false;
  onLevelClick(e, path);
}

const levels = [
  { path: "/lounge", name: t("theLounge"), level: 1, isLive: true },
  { path: "/vibe-room", name: t("theVibeRoom"), level: 2, isLive: true },
  { path: "/sports-complex", name: t("sportsComplex"), level: 3, isLive: true },
  { path: "/fireside", name: t("fireside"), level: 4, isLive: true },
];

const activeLevels = levels.filter((level) => level.isLive);

const isActive = (path: string) => route.path === path;

const handleLogout = async () => {
  try {
    await authStore.logout();
    // Redirect to home page after logout with transition screen
    startTransition('/');
  } catch (error) {
    // Error is already handled in authStore
    console.error('Logout failed:', error);
  }
};

const navMotion = {
  initial: { opacity: 0, x: -20 },
  enter: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      easing: "ease-out",
    },
  },
};
</script>
