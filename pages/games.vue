<template>
  <div class="relative min-h-screen p-4 md:p-6 lg:pb-20">
    <LevelNavigation />

    <div class="relative max-w-7xl mx-auto">
      <div v-if="!activeTable" class="flex flex-col gap-4">
        <div class="opacity-0 translate-y-6 animate-delay-md text-center mb-8 flex flex-col items-center gap-3">
          <div class="flex items-center gap-3">
            <GamesIcon />
            <h1 class="text-4xl text-[#C9A24D] font-light">
              {{ t("games.title") }}
            </h1>
          </div>
          <p class="text-[16px] text-[#F4F2ED99]/60 max-w-78.25 md:max-w-3xl">
            {{ t("games.subtitle") }}
          </p>
        </div>
    
        <div class="border border-[#C9A24D26] rounded-xl p-4 md:p-6 md:mb-6">
          <h2 class="text-[#F4F2ED] font-light text-lg mb-4">
            {{ t("games.chooseGame") }}
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div
              v-for="game in games"
              :key="game.name"
              class="rounded-lg border border-[rgba(201,162,77,0.12)] bg-[rgba(10,10,10,0.35)] p-4 md:p-6 flex flex-col"
            >
              <div class="flex flex-col gap-4">
                <GamesUNOIcon v-if="game.icon === 'uno'" />
                <GamesDominoesIcon v-else-if="game.icon === 'dominoes'" />
                <GamesTriviaIcon v-else-if="game.icon === 'trivia'" />
                <GamesPictionaryIcon v-else-if="game.icon === 'pictionary'" />
                <div>
                  <h3 class="text-[#F4F2ED] text-xl font-light mb-2">{{ game.name }}</h3>
                  <p class="text-sm text-[#F4F2ED99]/60">{{ game.description }}</p>
                </div>
                <div class="flex items-center justify-between text-[#F4F2ED99]/60 text-sm">
                    <div class="flex gap-2 items-center">
                      <GamesPlayersIcon />
                      <span>{{ game.players }}</span>
                    </div>
                    <div style="width:18px; height:10px; border-radius:4px" class="bg-[#C9A24D1A]/10 border border-[#C9A24D4D]/30"></div>
                </div>
                <OB33ZButton
                  variant="secondary"
                  class="w-full mt-auto py-2 text-[16px] font-medium normal-case tracking-normal"
                  @click="joinTable(game)"
                >
                  Join Table
                </OB33ZButton>
              </div>
            </div>
          </div>
        </div>

        <div class="border border-[rgba(201,162,77,0.2)] rounded-xl p-4 md:p-6 flex flex-col gap-4">
          <h2 class="text-[#C9A24D] font-light text-lg">
            {{ t("games.howToPlay.title") }}
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div v-for="step in steps" :key="step.title">
              <div class="w-10 h-10 rounded-full bg-[rgba(201,162,77,0.2)] text-[#C9A24D] flex items-center justify-center text-lg mb-2">
                {{ step.id }}
              </div>
              <h3 class="text-[#F4F2ED] font-light text-[16px] mb-1">{{ step.title }}</h3>
              <p class="text-sm text-[#F4F2ED99]/60">{{ step.text }}</p>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="flex flex-col gap-4 md:gap-6">
        <div class="flex items-center justify-between">
            <button
              type="button"
              class="text-[#C9A24D] text-lg hover:text-[#F4F2ED] transition-colors flex items-center gap-2"
              @click="leaveTable"
            >
                <GamesBackArrowIcon />
                <span>{{ t("games.activeTable.backToGames") }}</span>
            </button>
            <div style="width:18px; height:10px; border-radius:4px" class="bg-[#C9A24D1A]/10 border border-[#C9A24D4D]/30"></div>
        </div>

        <div class="text-center">
            <div class="flex gap-2 items-center justify-center">
              <GamesUNOTableIcon v-if="activeTable.icon === 'uno'"/>
              <GamesDominoesTableIcon v-else-if="activeTable.icon === 'dominoes'"/>
              <GamesTriviaTableIcon v-else-if="activeTable.icon === 'trivia'" />
              <GamesPictionaryTableIcon v-else-if="activeTable.icon === 'pictionary'" />
              <h2 class="text-[#F4F2ED] text-3xl font-light mb-1">{{ activeTable.name }}</h2>
            </div>
            <p class="text-[16px] text-[#F4F2ED99]/60">{{ activeTable.description }}</p>
        </div>

        <div class="game-table-layout grid grid-cols-1 gap-4 md:gap-6 md:min-w-0">
            <div>
                <div class="min-w-0 border border-[rgba(201,162,77,0.2)] rounded-xl p-4 md:p-6 flex flex-col gap-4">
                    <div class="flex justify-between items-center">
                        <h3 class="text-[#F4F2ED] mb-3 text-lg">
                          {{ t("games.activeTable.playersHeader") }}
                        </h3>
                        <div style="width:18px; height:10px; border-radius:4px" class="bg-[#C9A24D1A]/10 border border-[#C9A24D4D]/30"></div>
                    </div>
                    <div class="flex flex-col gap-3">
                        <div v-for="p in tablePlayers" :key="p.name" class="flex items-center gap-3 py-2 px-3">
                            <div class="w-10 h-10 bg-[#C9A24D1A]/10 border border-[#C9A24D4D]/30 rounded-full text-sm flex items-center justify-center text-[#F4F2ED99]/60">
                            {{ p.initials }}
                            </div>
                            <div>
                                <div class="flex items-center gap-2">
                                    <p class="text-sm text-[#F4F2ED]">{{ p.name }}</p>
                                    <GameOwnerIcon v-if="p.owner" />
                                </div>
                                <p class="text-xs text-[#5B3FD6]">{{ p.ready ? t("games.activeTable.playerReady") : "" }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="border-t border-[rgba(201,162,77,0.15)] pt-3">
                        <button class="w-full normal-case tracking-normal flex items-center gap-2 justify-center py-2">
                            <GamesInvitePlayerIcon />
                            Invite Players
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="border border-[rgba(201,162,77,0.2)] rounded-xl p-4 md:p-8">
                <div class="games-table-bg-glow flex items-center justify-center rounded-lg border border-[rgba(201,162,77,0.14)]" style="min-height:548px">
                    <div class="flex items-center justify-center flex-col">
                        <GamesWaitingForPlayersIcon />
                        <p class="text-[#F4F2ED99]/80 mb-2 text-[16px]">
                          {{ t("games.activeTable.waitingForReady") }}
                        </p>
                        <p class="text-[#F4F2ED] text-[16px]">
                          {{ t("games.activeTable.readyCount", { ready: 2, total: 4 }) }}
                        </p>
                    </div>
                </div>
                <div class="grid grid-cols-3 gap-2 mt-3">
                    <div class="text-center rounded-md p-2">
                        <p class="text-xs text-[#F4F2ED99]/60">{{ t("games.activeTable.round") }}</p>
                        <p class="text-[16px] text-[#C9A24D]">-</p>
                    </div>
                    <div class="text-center rounded-md p-2">
                        <p class="text-xs text-[#F4F2ED99]/60">{{ t("games.activeTable.turn") }}</p>
                        <p class="text-[16px] text-[#C9A24D]">{{ t("games.activeTable.turnWaiting") }}</p>
                    </div>
                    <div class="text-center rounded-md p-2">
                        <p class="text-xs text-[#F4F2ED99]/60">{{ t("games.activeTable.timer") }}</p>
                        <p class="text-[16px] text-[#C9A24D]">--:--</p>
                    </div>
                </div>
            </div>

            <div class="border border-[rgba(201,162,77,0.2)] rounded-xl p-4 md:p-6 flex flex-col gap-4">
                <h3 class="text-[#F4F2ED] text-lg flex items-center gap-2">
                    <GamesLiveChatIcon />
                    {{ t("games.tableChat.title") }}
                </h3>
                <div class="flex-1" style="min-height:244px">
                    <div class="text-xs text-[#F4F2EDCC]/0 flex flex-col gap-3">
                        <p class="flex flex-col gap-1 text-sm">
                            <span>
                                <span class="text-[#C9A24D]">{{ t("games.tableChat.messages.m1.author") }}</span><span class="text-xs text-[#F4F2ED66]/40 ml-1">{{ t("games.tableChat.messages.m1.time") }}</span>
                            </span>
                            <span class="text-[#F4F2EDCC]/80">{{ t("games.tableChat.messages.m1.text") }}</span>
                        </p>
                        <p class="flex flex-col gap-1 text-sm">
                            <span>
                                <span class="text-[#C9A24D]">{{ t("games.tableChat.messages.m2.author") }}</span><span class="text-xs text-[#F4F2ED66]/40 ml-1">{{ t("games.tableChat.messages.m2.time") }}</span>
                            </span>
                            <span class="text-[#F4F2EDCC]/80">{{ t("games.tableChat.messages.m2.text") }}</span>
                        </p>
                        <p class="flex flex-col gap-1 text-sm">
                            <span>
                                <span class="text-[#C9A24D]">{{ t("games.tableChat.messages.m3.author") }}</span><span class="text-xs text-[#F4F2ED66]/40 ml-1">{{ t("games.tableChat.messages.m3.time") }}</span>
                            </span>
                            <span class="text-[#F4F2EDCC]/80">{{ t("games.tableChat.messages.m3.text") }}</span>
                        </p>
                    </div>
                </div>
                <OB33ZInput v-model="chatMessage" :placeholder="t('games.tableChat.inputPlaceholder')" />
                <div class="flex gap-3 pt-4 text-[#C9A24D]">
                    <button type="button" class="hover:text-[#F4F2ED] transition-colors py-2 px-4">👍</button>
                    <button type="button" class="hover:text-[#F4F2ED] transition-colors py-2 px-4">⚡</button>
                    <button type="button" class="hover:text-[#F4F2ED] transition-colors py-2 px-4">🔥</button>
                </div>
            </div>
        </div>

        <div class="border border-[rgba(201,162,77,0.2)] rounded-xl p-4 md:p-6 flex items-center justify-between">
            <OB33ZButton variant="ghost" class="normal-case tracking-normal px-4 py-2">
                <WatchRaiseHandIcon />
                {{ t("games.activeTable.markReady") }}
            </OB33ZButton>
          <button type="button" class="text-[#F4F2ED] hover:text-red-400 text-[16px] transition-colors px-6 py-3" @click="leaveTable">
            {{ t("games.activeTable.leaveTable") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "#imports";
import GamesIcon from "~/components/icons/games-page-icons/GamesIcon.vue";
import GamesUNOIcon from "~/components/icons/games-page-icons/GamesUNOIcon.vue";
import GamesDominoesIcon from "~/components/icons/games-page-icons/GamesDominoesIcon.vue";
import GamesTriviaIcon from "~/components/icons/games-page-icons/GamesTriviaIcon.vue";
import GamesPictionaryIcon from "~/components/icons/games-page-icons/GamesPictionaryIcon.vue";
import GamesPlayersIcon from "~/components/icons/games-page-icons/GamesPlayersIcon.vue";
import GamesBackArrowIcon from "~/components/icons/games-page-icons/GamesBackArrowIcon.vue";
import GamesUNOTableIcon from "~/components/icons/games-page-icons/GamesUNOTableIcon.vue";
import GamesDominoesTableIcon from "~/components/icons/games-page-icons/GamesDominoesTableIcon.vue";
import GamesTriviaTableIcon from "~/components/icons/games-page-icons/GamesTriviaTableIcon.vue";
import GamesPictionaryTableIcon from "~/components/icons/games-page-icons/GamesPictionaryTableIcon.vue";
import GameOwnerIcon from "~/components/icons/games-page-icons/GameOwnerIcon.vue";
import GamesInvitePlayerIcon from "~/components/icons/games-page-icons/GamesInvitePlayerIcon.vue";
import GamesWaitingForPlayersIcon from "~/components/icons/games-page-icons/GamesWaitingForPlayersIcon.vue";
import GamesLiveChatIcon from "~/components/icons/games-page-icons/GamesLiveChatIcon.vue";
import WatchRaiseHandIcon from "~/components/icons/watch-parties-page-icons/WatchRaiseHandIcon.vue";


type Game = {
  name: string;
  description: string;
  players: string;
  icon: string;
};

const { t } = useI18n();

const games = computed<Game[]>(() => [
  {
    name: t("games.gameCards.uno.name"),
    description: t("games.gameCards.uno.description"),
    players: t("games.gameCards.uno.players"),
    icon: "uno",
  },
  {
    name: t("games.gameCards.dominoes.name"),
    description: t("games.gameCards.dominoes.description"),
    players: t("games.gameCards.dominoes.players"),
    icon: "dominoes",
  },
  {
    name: t("games.gameCards.trivia.name"),
    description: t("games.gameCards.trivia.description"),
    players: t("games.gameCards.trivia.players"),
    icon: "trivia",
  },
  {
    name: t("games.gameCards.pictionary.name"),
    description: t("games.gameCards.pictionary.description"),
    players: t("games.gameCards.pictionary.players"),
    icon: "pictionary",
  },
]);

const steps = computed(() => [
  { id: 1, title: t("games.howToPlay.steps.s1.title"), text: t("games.howToPlay.steps.s1.text") },
  { id: 2, title: t("games.howToPlay.steps.s2.title"), text: t("games.howToPlay.steps.s2.text") },
  { id: 3, title: t("games.howToPlay.steps.s3.title"), text: t("games.howToPlay.steps.s3.text") },
]);

const activeTable = ref<Game | null>(null);
const chatMessage = ref("");
const tablePlayers = computed(() => [
  { name: "Sarah M.", initials: "SM", ready: true, owner: true },
  { name: "Mike R.", initials: "MR", ready: true, owner: false },
  { name: "Alex K.", initials: "AK", ready: false, owner: false },
  { name: "You", initials: "YO", ready: false, owner: false },
]);

const joinTable = (game: Game) => {
  activeTable.value = game;
};

const leaveTable = () => {
  activeTable.value = null;
  chatMessage.value = "";
};
</script>

<style scoped>
.games-table-bg-glow {
  isolation: isolate;
  overflow: hidden;
  background-color: rgba(12, 11, 10, 0.92);
  background-image:
    
    radial-gradient(
      ellipse 92% 78% at 50% 48%,
      rgba(201, 162, 77, 0.045) 0%,
      transparent 55%
    ),
    radial-gradient(
      ellipse 110% 90% at 50% 115%,
      rgba(0, 0, 0, 0.22) 0%,
      transparent 55%
    );
}

@media (min-width: 768px) {
  .game-table-layout {
    grid-template-columns: 1fr 2fr 1fr;
  }
}
</style>