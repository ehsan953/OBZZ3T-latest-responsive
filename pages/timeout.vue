<template>
  <div class="relative min-h-screen bg-[#06070B] px-4 py-8 md:px-6 md:py-10">
    <!-- Ambient background -->
    <div class="pointer-events-none fixed inset-0">
      <div class="absolute left-1/2 top-6 h-64 w-64 -translate-x-1/2 rounded-full bg-[#5B3FD6]/10 blur-[120px]" />
      <div class="absolute bottom-10 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#C9A24D]/8 blur-[140px]" />
    </div>

    <div class="relative mx-auto flex w-full max-w-2xl flex-col gap-6">
      <header class="flex flex-col items-center gap-3 pt-1">
        <div
          class="grid h-11 w-11 place-items-center rounded-full border border-[#5B3FD6]/25 bg-[#5B3FD6]/10 text-[#5B3FD6]"
          aria-hidden="true"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
                <mask id="path-1-inside-1_280_6" fill="white">
                <path d="M0 32C0 14.3269 14.3269 0 32 0C49.6731 0 64 14.3269 64 32C64 49.6731 49.6731 64 32 64C14.3269 64 0 49.6731 0 32Z"/>
                </mask>
                <path d="M0 32C0 14.3269 14.3269 0 32 0C49.6731 0 64 14.3269 64 32C64 49.6731 49.6731 64 32 64C14.3269 64 0 49.6731 0 32Z" fill="#5B3FD6" fill-opacity="0.1"/>
                <path d="M0 32M64 32M64 32M0 32M32 0M64 32M32 64M0 32M32 64V63C14.8792 63 1 49.1208 1 32H0H-1C-1 50.2254 13.7746 65 32 65V64ZM64 32H63C63 49.1208 49.1208 63 32 63V64V65C50.2254 65 65 50.2254 65 32H64ZM32 0V1C49.1208 1 63 14.8792 63 32H64H65C65 13.7746 50.2254 -1 32 -1V0ZM32 0V-1C13.7746 -1 -1 13.7746 -1 32H0H1C1 14.8792 14.8792 1 32 1V0Z" fill="#5B3FD6" fill-opacity="0.2" mask="url(#path-1-inside-1_280_6)"/>
                <path d="M42.6666 33.3333C42.6666 39.9999 38 43.3333 32.4533 45.2666C32.1629 45.365 31.8474 45.3603 31.56 45.2533C26 43.3333 21.3333 39.9999 21.3333 33.3333V23.9999C21.3333 23.6463 21.4738 23.3072 21.7238 23.0571C21.9739 22.8071 22.313 22.6666 22.6666 22.6666C25.3333 22.6666 28.6666 21.0666 30.9866 19.0399C31.2691 18.7986 31.6285 18.666 32 18.666C32.3715 18.666 32.7308 18.7986 33.0133 19.0399C35.3466 21.0799 38.6666 22.6666 41.3333 22.6666C41.6869 22.6666 42.0261 22.8071 42.2761 23.0571C42.5262 23.3072 42.6666 23.6463 42.6666 23.9999V33.3333Z" stroke="#5B3FD6" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M32 26.667V32.0003" stroke="#5B3FD6" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M32 37.333H32.0133" stroke="#5B3FD6" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        <h1 class="text-center text-3xl font-light tracking-tight text-[#F4F2ED]">
          {{ t("timeout.title") }}
        </h1>
      </header>

      <section class="rounded-2xl border border-[rgba(201,162,77,0.14)] bg-[rgba(8,9,13,0.72)] p-5 shadow-[0_0_40px_rgba(0,0,0,0.45)] md:p-8">
        <div class="flex flex-col gap-8">
            <p class="text-center text-[16px] text-[#F4F2EDCC]">
              {{ t("timeout.description") }}
            </p>
    
            <div class="flex flex-col items-center gap-6">
                <div class="flex flex-col gap-2 items-center">
                    <span class="inline-flex items-center gap-1.5 text-sm text-[#F4F2ED99]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M7.99998 14.6663C11.6819 14.6663 14.6666 11.6816 14.6666 7.99967C14.6666 4.31778 11.6819 1.33301 7.99998 1.33301C4.31808 1.33301 1.33331 4.31778 1.33331 7.99967C1.33331 11.6816 4.31808 14.6663 7.99998 14.6663Z" stroke="#F4F2ED" stroke-opacity="0.6" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M8 4V8L10.6667 9.33333" stroke="#F4F2ED" stroke-opacity="0.6" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        {{ t("timeout.timeRemaining") }}
                    </span>
                    <p class="font-medium tracking-[2.4px] text-[#C9A24D] text-5xl md:text-8xl">
                      {{ formattedTime }}
                    </p>
                </div>
                <div class="gradient-avatar h-1 w-full overflow-hidden rounded-full bg-[rgba(244,242,237,0.10)]"></div>
            </div>
    
            <div class="flex items-start gap-2 rounded-xl border border-[#5B3FD633] bg-[#0A0A0A4D] p-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M18.1083 14.9999L11.4416 3.33319C11.2962 3.0767 11.0854 2.86335 10.8307 2.71492C10.576 2.56649 10.2864 2.48828 9.99161 2.48828C9.69678 2.48828 9.40724 2.56649 9.1525 2.71492C8.89777 2.86335 8.68697 3.0767 8.54161 3.33319L1.87494 14.9999C1.72801 15.2543 1.65096 15.5431 1.65162 15.837C1.65227 16.1308 1.73059 16.4192 1.87865 16.673C2.0267 16.9269 2.23923 17.137 2.49469 17.2822C2.75014 17.4274 3.03945 17.5025 3.33327 17.4999H16.6666C16.959 17.4996 17.2462 17.4223 17.4993 17.2759C17.7525 17.1295 17.9626 16.9191 18.1087 16.6658C18.2548 16.4125 18.3316 16.1252 18.3316 15.8328C18.3315 15.5404 18.2545 15.2531 18.1083 14.9999Z" stroke="#5B3FD6" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M10 7.5V10.8333" stroke="#5B3FD6" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M10 14.167H10.0083" stroke="#5B3FD6" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <div class="flex flex-col gap-1">
                    <p class="text-sm text-[#F4F2EDCC]">
                        {{ t("timeout.warning.line1") }}
                    </p>
                    <p class="text-sm text-[#F4F2ED99]">{{ t("timeout.warning.line2") }}</p>
                </div>
            </div>
        </div>
      </section>

      <section class="rounded-xl border border-[#C9A24D26] bg-[#0B0B0D99] shadow-[0_0_40px_rgba(0,0,0,0.45)] p-4 md:p-6">
        <div class="flex items-center justify-between border-b border-[rgba(201,162,77,0.10)] px-4 md:px-6 pb-4">
            <div class="inline-flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z" fill="#C9A24D" fill-opacity="0.1"/>
                    <path d="M26.6667 20.8331C26.6667 24.9997 23.75 27.0831 20.2834 28.2914C20.1018 28.3529 19.9047 28.35 19.725 28.2831C16.25 27.0831 13.3334 24.9997 13.3334 20.8331V14.9997C13.3334 14.7787 13.4212 14.5667 13.5775 14.4105C13.7337 14.2542 13.9457 14.1664 14.1667 14.1664C15.8334 14.1664 17.9167 13.1664 19.3667 11.8997C19.5433 11.7489 19.7678 11.666 20 11.666C20.2322 11.666 20.4568 11.7489 20.6334 11.8997C22.0917 13.1747 24.1667 14.1664 25.8334 14.1664C26.0544 14.1664 26.2663 14.2542 26.4226 14.4105C26.5789 14.5667 26.6667 14.7787 26.6667 14.9997V20.8331Z" stroke="#C9A24D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M20 16.667V20.0003" stroke="#C9A24D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M20 23.333H20.0083" stroke="#C9A24D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <h2 class="text-[16px] font-light text-[#F4F2ED]">{{ t("timeout.communityGuidelines.title") }}</h2>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M15 12.5L10 7.5L5 12.5" stroke="#F4F2ED" stroke-opacity="0.6" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>

        <ol class="space-y-3 px-4 py-4 md:px-5 md:py-5">
          <li v-for="rule in guidelines" :key="rule.title" class="text-[#F4F2ED]/78">
            <p class="text-sm font-light text-[#F4F2ED]">
              <span class="">{{ rule.id }}. {{ rule.title }}</span>
            </p>
            <p class="mt-1 text-sm text-[#F4F2ED99]">{{ rule.description }}</p>
          </li>
        </ol>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useI18n } from "#imports";

const initialSeconds = 15 * 60 + 20;
const remainingSeconds = ref(initialSeconds);
let timerId: ReturnType<typeof setInterval> | null = null;

const { t } = useI18n();

const guidelines = computed(() => [
  {
    id: 1,
    title: t("timeout.communityGuidelines.items.g1.title"),
    description: t("timeout.communityGuidelines.items.g1.description"),
  },
  {
    id: 2,
    title: t("timeout.communityGuidelines.items.g2.title"),
    description: t("timeout.communityGuidelines.items.g2.description"),
  },
  {
    id: 3,
    title: t("timeout.communityGuidelines.items.g3.title"),
    description: t("timeout.communityGuidelines.items.g3.description"),
  },
  {
    id: 4,
    title: t("timeout.communityGuidelines.items.g4.title"),
    description: t("timeout.communityGuidelines.items.g4.description"),
  },
  {
    id: 5,
    title: t("timeout.communityGuidelines.items.g5.title"),
    description: t("timeout.communityGuidelines.items.g5.description"),
  },
]);

const formattedTime = computed(() => {
  const mins = Math.floor(remainingSeconds.value / 60)
    .toString()
    .padStart(2, "0");
  const secs = (remainingSeconds.value % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
});

const progress = computed(() => {
  return (remainingSeconds.value / initialSeconds) * 100;
});

onMounted(() => {
  timerId = setInterval(() => {
    if (remainingSeconds.value > 0) {
      remainingSeconds.value -= 1;
      return;
    }
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  }, 1000);
});

onBeforeUnmount(() => {
  if (!timerId) return;
  clearInterval(timerId);
  timerId = null;
});
</script>
<style scoped>
.gradient-avatar {
  background-image: linear-gradient(to bottom right,
    #5B3FD6, #614CCF, #6757C7, #6E61C0, #766AB8,
    #7E71AF, #8679A7, #8F809D, #988693, #A28C89, #AB927D, #B59870, #BF9D60,
    #C9A24D
  );
}
</style>