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
          <TimeoutRoomBadgeIcon class="h-10 w-10" />
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
                      <TimeoutClockIcon class="h-4 w-4" />
                        {{ t("timeout.timeRemaining") }}
                    </span>
                    <p class="font-medium tracking-[2.4px] text-[#C9A24D] text-5xl md:text-8xl">
                      {{ formattedTime }}
                    </p>
                </div>
                <div class="gradient-avatar h-1 w-full overflow-hidden rounded-full bg-[rgba(244,242,237,0.10)]"></div>
            </div>
    
            <div class="flex items-start gap-2 rounded-xl border border-[#5B3FD633] bg-[#0A0A0A4D] p-4">
              <TimeoutWarningIcon class="h-5 w-5 shrink-0" />
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
              <TimeoutGuidelinesIcon class="h-10 w-10" />
                <h2 class="text-[16px] font-light text-[#F4F2ED]">{{ t("timeout.communityGuidelines.title") }}</h2>
            </div>
          <TimeoutChevronUpIcon class="h-5 w-5" />
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
import TimeoutRoomBadgeIcon from "~/components/icons/timeout-page-icons/TimeoutRoomBadgeIcon.vue";
import TimeoutClockIcon from "~/components/icons/timeout-page-icons/TimeoutClockIcon.vue";
import TimeoutWarningIcon from "~/components/icons/timeout-page-icons/TimeoutWarningIcon.vue";
import TimeoutGuidelinesIcon from "~/components/icons/timeout-page-icons/TimeoutGuidelinesIcon.vue";
import TimeoutChevronUpIcon from "~/components/icons/timeout-page-icons/TimeoutChevronUpIcon.vue";

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