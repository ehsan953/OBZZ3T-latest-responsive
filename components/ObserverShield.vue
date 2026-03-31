<template>
  <!-- Blocks interactions during observer mode while keeping nav clickable (nav is z-50) -->
  <Teleport to="body">
    <template v-if="isBlocking">
      <!-- Interaction blocker (below LevelNavigation z-50) -->
      <div class="fixed inset-0 z-40 pointer-events-none">
        <!-- subtle vignette / glow -->
        <div class="absolute inset-0 pointer-events-none observer-shield-bg" />

        <!-- force sign-in once expired/blocked -->
        <!-- <div class="pointer-events-auto"> -->
          <AuthModal
            :isOpen="showAuth"
            @close="handleAuthClose"
            @success="handleAuthSuccess"
          />
        <!-- </div> -->
      </div>

      <!-- Observer HUD (always above LanguageSelector / floating widgets) -->
      <div class="fixed bottom-5 right-5 z-[20002] pointer-events-none">
        <div class="rounded-xl border border-[rgba(201,162,77,0.18)] bg-[rgba(11,11,13,0.78)] backdrop-blur-md px-4 py-3 shadow-[0_0_30px_rgba(201,162,77,0.08)]">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-[#C9A24D] animate-pulse" />
            <p class="text-xs tracking-widest text-[#C9A24D] font-medium">OBSERVER MODE</p>
          </div>
          <p class="text-xs text-[#F4F2ED]/70 mt-1">
            View only. Interactions locked.
          </p>
          <p v-if="observer.isActive" class="text-sm text-[#F4F2ED] mt-2">
            {{ formattedRemaining }}
            <span class="text-xs text-[#F4F2ED]/55">remaining</span>
          </p>
          <p v-else class="text-sm text-[#F4F2ED] mt-2">
            Session ended
          </p>
        </div>
      </div>
    </template>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref, watch } from "vue";
import { useObserverStore } from "~/stores/observer";
import { useAuthStore } from "~/stores/auth";
import AuthModal from "~/components/AuthModal.vue";
import { useRoute, useRouter } from "vue-router";

const observer = useObserverStore();
const auth = useAuthStore();
const route = useRoute();
const router = useRouter();

const tick = ref(0);
let interval: number | null = null;
let listenersAttached = false;

const isBlocking = computed(() => {
  // Never block interactions on landing page.
  if (route.path === "/") return false;
  // Only block for guests. Auth users can always interact.
  if (auth.isAuthenticated) return false;
  // Active observer blocks interactions; expired/blocked also blocks (forces login).
  return observer.isActive || observer.isExpired || observer.isBlocked;
});

const showAuth = computed(() => {
  // On landing page, do not force-open the modal.
  if (route.path === "/") return false;
  if (auth.isAuthenticated) return false;
  return observer.isExpired || observer.isBlocked;
});

const formattedRemaining = computed(() => {
  // trigger recompute via tick
  tick.value;
  const ms = observer.remainingMs;
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const m = String(Math.floor(totalSec / 60)).padStart(2, "0");
  const s = String(totalSec % 60).padStart(2, "0");
  return `${m}:${s}`;
});

watch(
  () => observer.remainingMs,
  (ms) => {
    if (observer.isActive && ms <= 0) {
      observer.markExpired();
    }
  }
);

onMounted(async () => {
  if (!auth.isInitialized) {
    await auth.initAuth();
  }
  if (!observer.isInitialized) {
    observer.initFromStorage();
  }

  interval = window.setInterval(() => {
    tick.value++;
  }, 250);

  attachGuards();
});

onBeforeUnmount(() => {
  if (interval) window.clearInterval(interval);
  detachGuards();
});

const handleAuthSuccess = () => {
  // once logged in, unblock and clear observer flags
  observer.clear();
};

const handleAuthClose = async () => {
  // If observer time ended and user dismisses the forced modal,
  // move them back to landing page.
  if (observer.isExpired || observer.isBlocked) {
    await router.push("/");
  }
};

function isAllowedTarget(target: EventTarget | null): boolean {
  const el = target instanceof Element ? target : null;
  if (!el) return false;

  // Always allow navigation links (routing is part of "viewing the platform")
  if (el.closest("a[href]")) return true;

  // Allow tab switching & UI-only toggles
  if (el.closest('[role="tab"]')) return true;
  if (el.closest('[role="tablist"]')) return true;
  if (el.closest('[data-observer-allow="true"]')) return true;

  // Allow opening/closing the mobile drawer and sidebar nav (already above z-40, but keep safe)
  if (el.closest("nav")) return true;

  return false;
}

function shouldBlockEvent(e: Event): boolean {
  // Don't block on landing page
  if (route.path === "/") return false;
  // Auth users are never blocked
  if (auth.isAuthenticated) return false;
  // Only guard during observer active/expired/blocked
  if (!(observer.isActive || observer.isExpired || observer.isBlocked)) return false;

  return !isAllowedTarget(e.target);
}

function onClickCapture(e: MouseEvent) {
  if (!shouldBlockEvent(e)) return;
  e.preventDefault();
  e.stopPropagation();
}

function onSubmitCapture(e: Event) {
  // Always block form submits in observer mode
  if (route.path === "/" || auth.isAuthenticated) return;
  if (!(observer.isActive || observer.isExpired || observer.isBlocked)) return;
  e.preventDefault();
  e.stopPropagation();
}

function onKeydownCapture(e: KeyboardEvent) {
  // Prevent Enter key from triggering actions in forms/buttons while observing
  if (route.path === "/" || auth.isAuthenticated) return;
  if (!(observer.isActive || observer.isExpired || observer.isBlocked)) return;
  if (e.key !== "Enter") return;

  // Allow Enter if focused control is a tab
  const active = document.activeElement;
  if (active && isAllowedTarget(active)) return;

  e.preventDefault();
  e.stopPropagation();
}

function attachGuards() {
  if (!process.client || listenersAttached) return;
  window.addEventListener("click", onClickCapture, true);
  window.addEventListener("submit", onSubmitCapture, true);
  window.addEventListener("keydown", onKeydownCapture, true);
  listenersAttached = true;
}

function detachGuards() {
  if (!process.client || !listenersAttached) return;
  window.removeEventListener("click", onClickCapture, true);
  window.removeEventListener("submit", onSubmitCapture, true);
  window.removeEventListener("keydown", onKeydownCapture, true);
  listenersAttached = false;
}
</script>

<style scoped>
.observer-shield-bg {
  background-image:
    radial-gradient(ellipse 70% 55% at 50% 25%, rgba(201, 162, 77, 0.12) 0%, transparent 60%),
    radial-gradient(ellipse 85% 70% at 50% 85%, rgba(91, 63, 214, 0.08) 0%, transparent 55%),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.18));
}
</style>

