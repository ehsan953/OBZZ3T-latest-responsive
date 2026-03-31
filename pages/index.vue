<template>
  <div class="relative min-h-screen overflow-hidden bg-[#050608]">
    <!-- Language selector only on the entry page -->
    <div class="fixed right-6 top-6 z-9999">
      <LanguageSelector />
    </div>
    <!-- Cursor-follow small radial glow -->
    <div
      ref="cursorGlow"
      class="pointer-events-none absolute inset-0 z-1"
      style="transition: background 40ms linear"
    />

    <!-- Dark overlay -->
    <div
      class="pointer-events-none absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-black/70 z-2"
    />

    <!-- Purple ambient glow -->
    <div class="pointer-events-none absolute inset-0 z-2">
      <div
        class="absolute left-1/2 top-1/3 h-130 w-130 -translate-x-1/2 rounded-full bg-[#5B3FD6]/10 blur-[140px]"
      />
    </div>

    <!-- Center content -->
    <div class="relative z-10 flex min-h-screen items-center justify-center px-6">
      <div class="w-full flex flex-col gap-8 md:gap-12 max-w-md text-center">
        <!-- Logo + underline (scale / fade like React EntryPage) -->
        <div class="space-y-4 logo-animate">
          <h1
            class="text-5xl md:text-7xl tracking-wider text-[#C9A24D] font-light"
            style="font-family: 'Tinos', serif"
          >
            OB33Z
          </h1>

          <div
            class="h-px w-32 mx-auto bg-linear-to-r from-transparent via-[#C9A24D] to-transparent"
          />
        </div>

        <!-- Buttons block (fade in after logo) -->
        <div class="flex flex-col items-center gap-4 buttons-animate">
          <!-- JOIN opens Join modal on the entry page -->
          <button
            type="button"
            class="w-65 rounded-lg bg-[#C9A24D] px-6 py-[13.5px] text-sm font-roboto font-medium tracking-widest text-black shadow-[0_0_0_1px_rgba(201,162,77,0.25),0_18px_40px_rgba(0,0,0,0.55)] transition hover:brightness-110 active:scale-[0.99]"
            @click="handleEnterObserver"
          >
            {{ t("nav.enter") }}
          </button>
          
          <button
            type="button"
            @click="isJoinOpen = true"
            class="w-65 border border-[#C9A24D] rounded-lg px-6 py-[13.5px] text-sm font-roboto font-medium tracking-widest text-[#C9A24D] shadow-[0_0_0_1px_rgba(201,162,77,0.10)] transition hover:bg-[#C9A24D]/10 active:scale-[0.99]"
          >
            {{ t("nav.join") }}
          </button>

          <button
            type="button"
            @click="isAuthModalOpen = true"
            class="w-65 rounded-lg bg-transparent px-6 py-[13.5px] text-sm font-roboto font-medium tracking-widest transition hover:bg-[#C9A24D]/10 active:scale-[0.99] mb-4 md:mb-12"
          >
            {{ t("nav.signIn") }}
          </button>
        </div>

        <!-- Subtitle (last, subtle fade-in) -->
        <div
          class="text-[12px] sm:text-sm text-[#d1d0cd] opacity-60 italic font-light font-roboto max-w-md mx-auto subtitle-animate"
        >
          {{ t("nav.freeAccess") }}
        </div>
      </div>
    </div>

    <!-- Bottom gold glow -->
    <div
      class="pointer-events-none absolute bottom-0 left-0 right-0 h-32 z-2 bottom-glow-animate"
    >
      <div
        class="absolute inset-0 bg-linear-to-t from-[#C9A24D]/35 via-[#C9A24D]/15 to-transparent blur-[2px] bottom-glow-gold"
      />
      <div class="absolute inset-0 bg-linear-to-t from-black/40 to-transparent bottom-glow-vignette" />
    </div>

    <Join v-model="isJoinOpen" />
    <AuthModal
      :isOpen="isAuthModalOpen"
      @close="isAuthModalOpen = false"
      @success="handleAuthSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useI18n } from "#imports";
import { useTransitionScreen } from "~/composables/useTransitionScreen";
import AuthModal from "~/components/AuthModal.vue";
import { useAuthStore } from "~/stores/auth";
import { useObserverStore } from "~/stores/observer";

const { t } = useI18n();
const { startTransition } = useTransitionScreen();
const authStore = useAuthStore();
const observerStore = useObserverStore();

const cursorGlow = ref<HTMLElement | null>(null);
const isJoinOpen = ref(false);
const isAuthModalOpen = ref(false);

let raf = 0;
let x = 0;
let y = 0;

const onMouseMove = (e: MouseEvent) => {
  x = e.clientX;
  y = e.clientY;

  if (raf) return;
  raf = requestAnimationFrame(() => {
    raf = 0;
    if (!cursorGlow.value) return;

    cursorGlow.value.style.background = `
      radial-gradient(
        180px at ${x}px ${y}px,
        rgba(201,162,77,0.18),
        transparent 70%
      )
    `;
  });
};

onMounted(() => {
  // If already authenticated in this browser, skip landing and go straight to vibe room.
  const initAndRedirect = async () => {
    if (!authStore.isInitialized) {
      await authStore.initAuth();
    }
    if (authStore.isAuthenticated) {
      await navigateTo("/vibe-room", { replace: true });
      return;
    }

    // If observer mode is already running, don't trap user on landing page.
    if (!observerStore.isInitialized) {
      observerStore.initFromStorage();
    }
    if (observerStore.isActive) {
      await navigateTo("/lounge", { replace: true });
      return;
    }
  };
  initAndRedirect().catch((error) => {
    console.error("Failed to initialize auth on entry page:", error);
  });

  if (window.matchMedia("(pointer: coarse)").matches) return;
  window.addEventListener("mousemove", onMouseMove, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener("mousemove", onMouseMove);
});

const handleEnter = (path: string) => {
  startTransition(path);
};

const handleEnterObserver = async () => {
  // If already logged in, keep current behavior.
  if (authStore.isAuthenticated) {
    startTransition("/vibe-room");
    return;
  }

  const result = await observerStore.startObserver();
  if (!result.ok) {
    // Observer mode not allowed (e.g. same IP already used) => require login
    isAuthModalOpen.value = true;
    return;
  }

  // Dramatic entry into view-only app experience
  startTransition("/lounge");
};

const handleAuthSuccess = () => {
  isAuthModalOpen.value = false;
};
</script>

<style scoped>
/* Common fade-up behavior */
.logo-animate,
.buttons-animate,
.subtitle-animate {
  opacity: 0;
  transform: translateY(30px);
}

/* 1️⃣ Logo first */
.logo-animate {
  animation: fadeUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s forwards;
}

/* 2️⃣ Buttons second */
.buttons-animate {
  animation: fadeUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.8s forwards;
}

/* 3️⃣ Subtitle last */
.subtitle-animate {
  animation: fadeUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 1.2s forwards;
}

@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Bottom gold glow pulsing like React motion opacity loop */
.bottom-glow-animate {
  animation: bottomGlowPulse 4s ease-in-out infinite;
}

@keyframes bottomGlowPulse {
  0% {
    opacity: 0;
  }
  20% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.5;
  }
  80%,
  100% {
    opacity: 0.3;
  }
}

.bottom-glow-animate {
  height: 150px;
  opacity: 0.85;
  animation: none;
}

.bottom-glow-gold {
  background: linear-gradient(
    to top,
    rgba(201, 162, 77, 0.52) 0%,
    rgba(201, 162, 77, 0.22) 38%,
    rgba(201, 162, 77, 0.08) 64%,
    transparent 100%
  );
  filter: blur(6px);
}

.bottom-glow-vignette {
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.2) 0%,
    rgba(0, 0, 0, 0.08) 36%,
    transparent 100%
  );
}
</style>
