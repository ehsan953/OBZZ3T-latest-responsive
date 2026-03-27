<template>
  <div>
    <!-- Mobile: icon rail + tap-to-open drawer -->
    <div class="md:hidden">
    <!-- Icon rail (always visible on mobile) -->
    <div class="fixed top-1/2 -translate-y-1/2 left-3 z-50 flex flex-col gap-2">
      <button
        type="button"
        class="w-[65px] h-[65px] rounded-lg bg-[rgba(11,11,13,0.8)] backdrop-blur-md border border-[rgba(201,162,77,0.15)] text-[#F4F2ED] flex items-center justify-center"
        aria-label="Open menu"
        @click="isMobileNavOpen = true"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <button
        v-for="level in activeLevels"
        :key="level.path"
        type="button"
        :class="[
          'w-[65px] h-[65px] rounded-lg backdrop-blur-md border flex items-center justify-center transition-colors',
          isActive(level.path)
            ? 'bg-[#C9A24D] text-[#0B0B0D] border-[#C9A24D]'
            : 'bg-[rgba(11,11,13,0.8)] text-[#F4F2ED] border-[rgba(201,162,77,0.15)] hover:bg-[rgba(201,162,77,0.1)]'
        ]"
        :aria-label="level.name"
        @click="isMobileNavOpen = true"
      >
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
      </button>
    </div>

    <!-- Drawer -->
    <div v-if="isMobileNavOpen" class="fixed inset-0 z-[70]">
      <div class="absolute inset-0 bg-black/60" @click="isMobileNavOpen = false" />
      <div class="absolute top-0 left-0 h-full w-[320px] bg-[rgba(11,11,13,0.95)] backdrop-blur-md border-r border-[rgba(201,162,77,0.15)] p-4">
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
          <div class="text-xs font-semibold text-[#F4F2ED]/60 tracking-widest px-3 mb-1">ROOMS</div>
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
              <div class="flex flex-col">
                <span class="text-sm font-medium">{{ level.name }}</span>
                <span class="text-[11px] opacity-60">Level {{ level.level }}</span>
              </div>
            </div>
          </NuxtLink>

          <div v-if="authStore.isInitialized && authStore.isAuthenticated" class="border-t border-[rgba(201,162,77,0.15)] my-3" />
          <div v-if="authStore.isInitialized && authStore.isAuthenticated" class="text-xs font-semibold text-[#F4F2ED]/60 tracking-widest px-3 mb-1">ACCOUNT & MORE</div>

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
            to="/ambassador-program"
            class="relative"
            @click.prevent="isMobileNavOpen = false; startTransition('/ambassador-program')"
          >
            <div
              :class="[
                'px-4 py-3 rounded-lg transition-colors flex items-center gap-3',
                isActive('/ambassador-program')
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
      class="bg-[rgba(11,11,13,0.8)] backdrop-blur-md border border-[rgba(201,162,77,0.15)] rounded-lg p-2 transition-all duration-200 w-[65px] group-hover:w-max group-hover:min-w-[260px]"
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
