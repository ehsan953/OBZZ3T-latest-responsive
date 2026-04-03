<template>
  <div class="relative min-h-screen p-4 md:p-6">
    <LevelNavigation />

    <!-- Ambient background glow -->
    <div class="fixed inset-0 pointer-events-none">
      <div
        class="absolute top-1/3 left-1/3 w-105 h-105 bg-[#5B3FD6] opacity-[0.08] blur-[140px] rounded-full"
      />
      <div
        class="absolute bottom-1/4 right-1/4 w-105 h-105 bg-[#C9A24D] opacity-[0.06] blur-[140px] rounded-full"
      />
    </div>

    <div class="relative max-w-7xl mx-auto pt-2 pb-8 md:px-4 flex flex-col gap-6">
      <!-- Header -->
      <div
        class="opacity-0 animate-delay-md text-center flex flex-col items-center gap-3"
      >
        <div class="flex items-center gap-3">
          <WatchVideoIcon class="h-8 w-8"/>
          <h1 class="text-4xl text-[#C9A24D] font-light">
            {{ t("watchParties.title") }}
          </h1>
        </div>
        <p class="text-[16px] text-[#F4F2ED99]/60 max-w-78.25 md:max-w-3xl">
          {{ t("watchParties.subtitle") }}
        </p>
      </div>

      <!-- Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 lg:gap-8">
        <!-- Left column -->
        <div class="space-y-6">
          <!-- Video card -->
          <section
            class="rounded-2xl border border-[rgba(201,162,77,0.12)] bg-[rgba(11,11,13,0.55)] backdrop-blur-md shadow-[0_0_50px_rgba(0,0,0,0.35)] overflow-hidden"
          >
            <div class="relative aspect-video">
              <div class="absolute inset-0 bg-linear-to-br from-[rgba(255,255,255,0.06)] via-transparent to-[rgba(91,63,214,0.08)]" />
              <div class="absolute top-4 left-4 flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-[#E04B4B]" />
                <span class="w-2.5 h-2.5 rounded-full bg-[#F0C35A]/80" />
                <span class="w-2.5 h-2.5 rounded-full bg-[#69D58A]/70" />
              </div>
            </div>

            <!-- Controls bar -->
            <div class="px-5 py-4 border-t border-[rgba(201,162,77,0.10)]">
              <div class="flex items-center gap-4 text-xs text-[#F4F2ED]/60">
                <button
                  class="w-9 h-9 rounded-full border border-[rgba(201,162,77,0.20)] bg-[rgba(201,162,77,0.10)] text-[#C9A24D] grid place-items-center"
                  type="button"
                >
                  ▶
                </button>
                <span>{{ t("watchParties.videoControls.currentTime") }}</span>
                <div class="flex-1 h-1 rounded-full bg-[rgba(244,242,237,0.10)] overflow-hidden">
                  <div class="h-full w-[38%] bg-[rgba(201,162,77,0.55)]" />
                </div>
                <span>{{ t("watchParties.videoControls.progressPercent") }}</span>
                <span class="text-[#F4F2ED]/45">{{ t("watchParties.videoControls.durationLine") }}</span>
                <div class="flex items-center gap-3 ml-auto text-[#F4F2ED]/50">
                  <span>⤢</span>
                  <span>⛶</span>
                </div>
              </div>
            </div>
          </section>

          <!-- Party details -->
          <section
            class="rounded-2xl border border-[rgba(201,162,77,0.12)] bg-[rgba(11,11,13,0.55)] backdrop-blur-md shadow-[0_0_50px_rgba(0,0,0,0.35)]"
          >
            <div class="p-6 flex flex-col gap-4">
              <div class="flex items-start justify-between gap-4">
                <div class="flex flex-col gap-2">
                  <h2 class="text-2xl font-light text-[#F4F2ED] tracking-wide">
                    {{ t("watchParties.partyHighlights.title") }}
                  </h2>
                  <p class="text-sm text-[#F4F2ED99]/60 mt-1 flex flex-col sm:flex-row sm:items-center gap-3">
                    <span>{{ t("watchParties.partyHighlights.hostedBy") }}</span>
                    <span class="flex items-center gap-3">
                      <span class="w-1.5 h-1.5 bg-[#F4F2ED99]/60 rounded-full"></span>
                      {{ t("watchParties.partyHighlights.startedAgo") }}
                    </span>
                  </p>
                </div>
              </div>

              <div class="flex flex-wrap items-center justify-between gap-3">
                <div class="flex flex-wrap items-center gap-3 mt-5">
                  <OB33ZButton variant="ghost" class="normal-case tracking-normal px-4 py-2">
                    <WatchRaiseHandIcon />
                    {{ t("watchParties.actions.raiseHand") }}
                  </OB33ZButton>
                  
                  <OB33ZButton
                    variant="ghost" class="normal-case tracking-normal px-4 py-2"
                  >
                    <WatchVideoIcon class="h-5 w-5"/>
                    {{ t("watchParties.actions.joinVideo") }}
                  </OB33ZButton>
                </div>
                <button
                  type="button"
                  class="rounded-lg bg-transparent px-4 py-2 text-[16px] text-[#F4F2ED] font-medium tracking-widest transition hover:bg-[#C9A24D]/10"
                >
                  {{ t("watchParties.actions.leaveParty") }}
                </button>
              </div>

              <div class="pt-4 border-t border-[rgba(201,162,77,0.10)] flex flex-col md:flex-row md:items-center gap-4">
                <p class="text-sm uppercase tracking-[0.16em] text-[#F4F2ED]/45">
                  {{ t("watchParties.reactions.label") }}
                </p>
                <div class="flex items-center gap-4 text-sm text-[#F4F2ED]/70">
                  <button type="button" class="hover:text-[#F4F2ED]">👍</button>
                  <button type="button" class="hover:text-[#F4F2ED]">❤️</button>
                  <button type="button" class="hover:text-[#F4F2ED]">😂</button>
                  <button type="button" class="hover:text-[#F4F2ED]">🔥</button>
                  <button type="button" class="hover:text-[#F4F2ED]">🎉</button>
                </div>
              </div>
            </div>
          </section>

          <!-- Up next -->
          <section
            class="rounded-2xl border border-[rgba(201,162,77,0.12)] bg-[rgba(11,11,13,0.55)] backdrop-blur-md shadow-[0_0_50px_rgba(0,0,0,0.35)]"
          >
            <div class="p-6 flex flex-col gap-4">
              <div class="flex items-center gap-2">
                <WatchUpNextIcon class="h-5 w-5"/>

                <h3 class="text-lg text-[#F4F2ED] font-light tracking-wide">
                  {{ t("watchParties.upNext.title") }}
                </h3>
              </div>
              <div class="flex flex-col gap-3">
                <div class="flex items-center gap-4">
                  <div class="w-32 aspect-16/10 rounded-xl relative">
                    <img src="/images/up-next1.jpg" class="object-cover" alt="">
                    <span class="absolute bottom-2 right-2 text-sm text-[#F4F2ED] py-0.5 px-2 bg-[#0A0A0AE5]/90 rounded-lg">
                      {{ t("watchParties.upNext.items.item1.duration") }}
                    </span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-[16px] text-[#F4F2ED] font-light truncate">
                      {{ t("watchParties.upNext.items.item1.title") }}
                    </p>
                    <p class="text-sm text-[#F4F2ED99]/60 mt-0.5">
                      {{ t("watchParties.upNext.items.item1.by") }}
                    </p>
                  </div>
                  
                </div>

                <div class="flex items-center gap-4">
                  <div class="w-32 aspect-16/10 rounded-xl relative">
                    <img src="/images/up-next2.jpg" class="object-cover" alt="">
                    <span class="absolute bottom-2 right-2 text-sm text-[#F4F2ED] py-0.5 px-2 bg-[#0A0A0AE5]/90 rounded-lg">
                      {{ t("watchParties.upNext.items.item2.duration") }}
                    </span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-[16px] text-[#F4F2ED] font-light truncate">
                      {{ t("watchParties.upNext.items.item2.title") }}
                    </p>
                    <p class="text-sm text-[#F4F2ED99]/60 mt-0.5">
                      {{ t("watchParties.upNext.items.item2.by") }}
                    </p>
                  </div>
                </div>

                <div class="flex items-center gap-4">
                  <div class="w-32 aspect-16/10 rounded-xl relative">
                    <img src="/images/up-next3.jpg" class="object-cover" alt="">
                    <span class="absolute bottom-2 right-2 text-sm text-[#F4F2ED] py-0.5 px-2 bg-[#0A0A0AE5]/90 rounded-lg">
                      {{ t("watchParties.upNext.items.item3.duration") }}
                    </span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-[16px] text-[#F4F2ED] font-light truncate">
                      {{ t("watchParties.upNext.items.item3.title") }}
                    </p>
                    <p class="text-sm text-[#F4F2ED99]/60 mt-0.5">
                      {{ t("watchParties.upNext.items.item3.by") }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <!-- Right column -->
        <aside class="space-y-6">
          <!-- Participants -->
          <section
            class="rounded-2xl border border-[rgba(201,162,77,0.12)] bg-[rgba(11,11,13,0.55)] backdrop-blur-md shadow-[0_0_50px_rgba(0,0,0,0.35)]"
          >
            <div class="p-6 flex flex-col gap-4">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-light tracking-wide text-[#F4F2ED]/85">
                  {{ t("watchParties.participants.title") }}
                </h3>
                <span class="text-xs text-[#F4F2ED]/45">{{ participants.length }}</span>
              </div>

              <div class="flex flex-col gap-2 pr-4 max-h-64 overflow-y-auto no-scrollbar">
                <div
                  v-for="p in participants"
                  :key="p.id"
                  class="flex items-center justify-between py-2"
                >
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full gradient-avatar grid place-items-center text-xs text-[#F4F2ED]/80">
                      {{ p.initials }}
                    </div>
                    <p class="text-sm text-[#F4F2ED]/85">{{ p.name }}</p>
                  </div>
                  <WatchEyeIcon />
                </div>
              </div>
            </div>
          </section>

          <!-- Live chat -->
          <section
            class="rounded-2xl border border-[rgba(201,162,77,0.12)] bg-[rgba(11,11,13,0.55)] backdrop-blur-md shadow-[0_0_50px_rgba(0,0,0,0.35)]"
          >
            <div class="p-6 flex flex-col gap-4">
              <div class="flex items-center gap-2">
                <WatchChatIcon />
                <h3 class="text-lg tracking-wide text-[#F4F2ED] font-light">
                  {{ t("watchParties.chat.title") }}
                </h3>
              </div>
              
              <div class="flex flex-col gap-3 text-xs text-[#F4F2ED]/70 max-h-53 overflow-y-auto pr-2 no-scrollbar">
                <div class="flex flex-col gap-1">
                  <p class="text-[#C9A24D]/85 text-sm flex items-center gap-1">
                    {{ t("watchParties.chat.messages.m1.author") }}
                    <span class="text-[#F4F2ED]/40 text-xs">{{ t("watchParties.chat.messages.m1.time") }}</span>
                  </p>
                  <p class="text-sm text-[#F4F2EDCC]/80">{{ t("watchParties.chat.messages.m1.text") }}</p>
                </div>
                <div class="flex flex-col gap-1">
                  <p class="text-[#C9A24D]/85 text-sm flex items-center gap-1">
                    {{ t("watchParties.chat.messages.m2.author") }}
                    <span class="text-[#F4F2ED]/40 text-xs">{{ t("watchParties.chat.messages.m2.time") }}</span>
                  </p>
                  <p class="text-sm text-[#F4F2EDCC]/80">{{ t("watchParties.chat.messages.m2.text") }}</p>
                </div>
                <div class="flex flex-col gap-1">
                  <p class="text-[#C9A24D]/85 text-sm flex items-center gap-1">
                    {{ t("watchParties.chat.messages.m3.author") }}
                    <span class="text-[#F4F2ED]/40 text-xs">{{ t("watchParties.chat.messages.m3.time") }}</span>
                  </p>
                  <p class="text-sm text-[#F4F2EDCC]/80">{{ t("watchParties.chat.messages.m3.text") }}</p>
                </div>
                <div class="flex flex-col gap-1">
                  <p class="text-[#C9A24D]/85 text-sm flex items-center gap-1">
                    {{ t("watchParties.chat.messages.m4.author") }}
                    <span class="text-[#F4F2ED]/40 text-xs">{{ t("watchParties.chat.messages.m4.time") }}</span>
                  </p>
                  <p class="text-sm text-[#F4F2EDCC]/80">{{ t("watchParties.chat.messages.m4.text") }}</p>
                </div>
              </div>

              <div class="mt-4 pt-4 border-t border-[rgba(201,162,77,0.10)]">
                <div class="flex items-center gap-2 rounded-xl border border-[rgba(201,162,77,0.16)] bg-[rgba(6,6,8,0.55)] px-3 py-2">
                  <input
                    class="flex-1 bg-transparent outline-none text-xs text-[#F4F2ED] placeholder:text-[#F4F2ED]/35"
                    :placeholder="t('watchParties.chat.inputPlaceholder')"
                    type="text"
                  />
                  <button type="button" class="text-xs text-[#C9A24D] hover:text-[#F4F2ED]">
                    {{ t("watchParties.chat.send") }}
                  </button>
                </div>
                <div class="flex items-center justify-center gap-6 mt-3 text-sm text-[#F4F2ED]/55">
                  <button type="button" class="hover:text-[#F4F2ED]">👍</button>
                  <button type="button" class="hover:text-[#F4F2ED]">❤️</button>
                  <button type="button" class="hover:text-[#F4F2ED]">🔥</button>
                </div>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "#imports";
import WatchChatIcon from "~/components/icons/watch-parties-page-icons/WatchChatIcon.vue";
import WatchVideoIcon from "~/components/icons/watch-parties-page-icons/WatchVideoIcon.vue";
import WatchEyeIcon from "~/components/icons/watch-parties-page-icons/WatchEyeIcon.vue";
import WatchRaiseHandIcon from "~/components/icons/watch-parties-page-icons/WatchRaiseHandIcon.vue";
import WatchUpNextIcon from "~/components/icons/watch-parties-page-icons/WatchUpNextIcon.vue";
const { t } = useI18n();

type Participant = {
  id: string;
  name: string;
  initials: string;
  isOnline: boolean;
};

const participants = computed<Participant[]>(() => [
  { id: "emma-r", name: t("watchParties.participants.emmaR.name"), initials: "ER", isOnline: true },
  { id: "james-l", name: t("watchParties.participants.jamesL.name"), initials: "JL", isOnline: true },
  { id: "sofia-m", name: t("watchParties.participants.sofiaM.name"), initials: "SM", isOnline: true },
  { id: "alex-k", name: t("watchParties.participants.alexK.name"), initials: "AK", isOnline: false },
  { id: "mike-k", name: t("watchParties.participants.mikeK.name"), initials: "MK", isOnline: false },
  { id: "chris-d", name: t("watchParties.participants.chrisD.name"), initials: "CD", isOnline: false },
]);
</script>

<style scoped>
.no-scrollbar {
  -ms-overflow-style: none; /* IE/Edge legacy */
  scrollbar-width: none; /* Firefox */
}

.no-scrollbar::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.gradient-avatar {
  background-image: linear-gradient(to bottom right, 
    #C9A24D, #BF9D60, #B59870, #AB927D, #A28C89, 
    #988693, #8F809D, #8679A7, #7E71AF, #766AB8, 
    #6E61C0, #6757C7, #614CCF, #5B3FD6
  );
}
</style>