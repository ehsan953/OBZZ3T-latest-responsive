<template>
  <div class="relative min-h-screen p-4 md:p-6">
    <!-- Global navigation / chrome -->
    <LevelNavigation />
    <LiveCounter />

    <!-- Ambient background effects -->
    <div class="fixed inset-0 pointer-events-none">
      <div
        class="absolute top-1/3 right-1/4 w-105 h-105 bg-[#5B3FD6] opacity-[0.08] blur-[140px] rounded-full"
      />
      <div
        class="absolute bottom-1/4 left-1/3 w-105 h-[105] bg-[#C9A24D] opacity-[0.06] blur-[140px] rounded-full"
      />
    </div>

    <div class="relative max-w-7xl mx-auto py-4 md:py-8 md:px-4">
      <!-- Page header -->
      <div class="text-center space-y-4 mb-8" style="opacity: 1; transform: none;">
        <div class="opacity-0 translate-y-4 animate-delay-md flex items-center justify-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trophy w-10 h-10 text-[#C9A24D]"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>
          <h1 class="text-4xl font-light text-[#C9A24D]">{{ t("sports.sportsComplex") }}</h1>
        </div>
        <p class="opacity-0 translate-y-4 animate-delay-lg text-[#F4F2ED]/60 max-w-2xl mx-auto">{{ t("sports.desc") }}</p>
      </div>

      <!-- Sport filter tabs -->
      <div
        class="opacity-0 translate-y-4 animate-delay-xl flex flex-wrap items-center justify-center gap-3 mb-8"
      >
        <button
          v-for="sport in sports"
          :key="sport.id"
          data-observer-allow="true"
          @click="selectedSport = sport.id"
          :class="[
            'flex items-center gap-2 px-4 py-2 rounded-full transition-all',
            selectedSport === sport.id
              ? 'bg-[#C9A24D] text-[#0A0A0A]'
              : 'bg-[#0A0A0A]/50 border border-[#C9A24D]/20 text-[#F4F2ED]/60 hover:text-[#F4F2ED] hover:border-[#C9A24D]/40',
          ]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-target w-4 h-4"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
          <span class="text-sm font-medium">{{ sport.label }}</span>
        </button>
      </div>

      <!-- Main layout -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <!-- Left: Live games + upcoming events -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Live now section -->
          <div class="opacity-0 translate-y-4 animate-fade-left-delay-md ">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-2xl font-light text-[#F4F2ED] flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-radio w-6 h-6 text-red-500 animate-pulse"><path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"></path><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"></path><circle cx="12" cy="12" r="2"></circle><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"></path><path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"></path></svg>
                {{ t("sports.OB33Z") }}
              </h2>
              <div class="px-2 py-1 rounded text-xs bg-[rgba(201,162,77,0.1)] text-[#C9A24D] border border-[rgba(201,162,77,0.3)]"></div>
            </div>

            <div style="opacity: 1; transform: none;">
              <div 
                v-for="game in filteredGames"
                :key="game.id" 
                class="mb-4 bg-[rgba(11,11,13,0.6)] backdrop-blur-sm border border-[rgba(201,162,77,0.15)] rounded-lg p-6 hover:border-[#C9A24D]/60 transition-all cursor-pointer group" 
                style="opacity: 1; transform: none;"
              >
                <div class="space-y-4">
                  <div class="flex items-start justify-between">
                    <div class="space-y-1">
                      <div class="flex items-center gap-2">
                        <div class="px-2 py-1 rounded text-xs bg-[rgba(201,162,77,0.1)] text-[#C9A24D] border border-[rgba(201,162,77,0.3)]"></div>
                        <div class="flex items-center gap-1 text-red-500 text-sm">
                          <div class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                          <span>{{ t("sports.live") }}</span>
                        </div>
                      </div>
                      <h3 class="text-xl font-regular text-[#F4F2ED]">{{ game.matchup }}</h3>
                    </div>
                    <button class="px-8 py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-transparent border border-[#C9A24D] text-[#C9A24D] hover:bg-[rgba(201,162,77,0.1)]" tabindex="0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-tv w-4 h-4"><rect width="20" height="15" x="2" y="7" rx="2" ry="2"></rect><polyline points="17 2 12 7 7 2"></polyline></svg>
                      {{ t("sports.watch") }}
                    </button>
                  </div>
                  <div class="flex items-center justify-between">
                    <div class="text-4xl font-light text-[#C9A24D]">{{ game.homeScore }} - {{ game.awayScore }}</div>
                    <div class="flex items-center gap-2 text-[#F4F2ED]/60">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-timer w-4 h-4"><line x1="10" x2="14" y1="2" y2="2"></line><line x1="12" x2="15" y1="14" y2="11"></line><circle cx="12" cy="14" r="8"></circle></svg>
                      <span>{{ game.clock }}</span>
                    </div>
                  </div>
                  <div class="flex items-center justify-between pt-4 border-t border-[#C9A24D]/10">
                    <div class="flex items-center gap-2 text-[#F4F2ED]/60 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users w-4 h-4"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                      <span>{{ game.viewers.toLocaleString() }} {{ t("sports.watching") }}</span>
                    </div>
                    <div class="flex items-center gap-4">
                      <button class="flex items-center gap-1 text-[#F4F2ED]/60 hover:text-[#C9A24D] transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-flame w-4 h-4"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>
                        <span class="text-sm">{{ game.boosts }}</span>
                      </button>
                      <button class="flex items-center gap-1 text-[#F4F2ED]/60 hover:text-[#C9A24D] transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trophy w-4 h-4"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>
                        <span class="text-sm">{{ game.favorites }}</span>
                      </button>
                      <button class="flex items-center gap-1 text-[#F4F2ED]/60 hover:text-[#C9A24D] transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-thumbs-up w-4 h-4"><path d="M7 10v12"></path><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"></path></svg>
                        <span class="text-sm">{{ game.likes }}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Upcoming events -->
          <div class="pt-6">
            <h3 class="text-xl font-light text-[#F4F2ED] mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar w-5 h-5 text-[#5B3FD6]"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>
              {{ t("sports.events") }}
            </h3>
            <div class="space-y-3">
              <div 
                v-for="event in upcomingEvents"
                :key="event.id" 
                class="opacity-0 translate-y-4 animate-fade-left-delay-md bg-[rgba(11,11,13,0.6)] backdrop-blur-sm border border-[rgba(201,162,77,0.15)] rounded-lg p-4" 
                style="opacity: 1; transform: none;"
              >
                <div class="flex items-center justify-between">
                  <div class="space-y-1">
                    <div class="text-sm text-[#F4F2ED]/60">{{ event.sport }}</div>
                    <div class="text-[#F4F2ED]">{{ event.matchup }}</div>
                  </div>
                  <div class="text-right space-y-1">
                    <div class="text-[#5B3FD6] text-sm">{{ event.timeLabel }}</div>
                    <button class="px-8 py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-transparent text-[#F4F2ED] text-[16px] hover:bg-[rgba(244,242,237,0.1)]" tabindex="0" style="transform: none;">{{ t("sports.reminder") }}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Live chat + top fans -->
        <div class="space-y-6">
          <!-- Live chat -->
          <div class="opacity-0 translate-y-4 animate-fade-right-delay-md bg-[rgba(11,11,13,0.6)] backdrop-blur-sm border border-[rgba(201,162,77,0.15)] rounded-lg p-6 h-200 flex flex-col" style="opacity: 1; transform: none;">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-light text-[#F4F2ED] flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle w-5 h-5 text-[#5B3FD6]"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg>
                {{ t("sports.chat") }}
              </h3>
              <div class="text-[#F4F2ED]/60 text-sm">{{ chatMessages.length }} {{ t("sports.message") }}</div>
            </div>
            <div class="flex-1 overflow-y-auto space-y-3 mb-4">
              <div 
                v-for="msg in chatMessages"
                :key="msg.id" 
                class="p-3 bg-[#0A0A0A]/30 rounded-lg" 
                style="opacity: 1; transform: none;"
              >
                <div class="flex items-center gap-2 mb-1">
                  <span class="text-[#C9A24D] text-sm font-light">{{ msg.user }}</span>
                  <span class="text-[#F4F2ED]/40 text-xs">{{ msg.timeAgo }}</span>
                </div>
                <p class="text-[#F4F2ED]/80 text-sm">{{ msg.text }}</p>
              </div>
            </div>
            <div class="flex gap-2">
              <input type="text" placeholder="Send a message..." class="flex-1 bg-[#0A0A0A]/50 border border-[#C9A24D]/20 rounded-lg px-4 py-2 text-[#F4F2ED] placeholder:text-[#F4F2ED]/40 focus:outline-none focus:border-[#C9A24D]/60" value="">
              <button class="px-5 md:px-8 py-2 md:py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-[#C9A24D] text-[#0B0B0D] hover:bg-[#D4AD59] shadow-[0_0_20px_rgba(201,162,77,0.3)]" tabindex="0" style="transform: none;">{{ t("sports.send") }}</button>
            </div>
          </div>

          <!-- Top fans -->
          <div class="opacity-0 translate-y-4 animate-fade-right-delay-md bg-[rgba(11,11,13,0.6)] backdrop-blur-sm border border-[rgba(201,162,77,0.15)] rounded-lg p-6 mt-4" style="opacity: 1; transform: none;">
            <h3 class="text-lg font-light text-[#F4F2ED] mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-award w-5 h-5 text-[#C9A24D]"><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path><circle cx="12" cy="8" r="6"></circle></svg>
              {{ t("sports.fans") }}
            </h3>
            <div class="space-y-3">
              <div 
                v-for="fan in topFans"
                :key="fan.rank" 
                class="flex items-center justify-between p-2 bg-[#0A0A0A]/30 rounded-lg"
              >
                <div class="flex items-center gap-3">
                  <div 
                    :class="[
                        'w-8 h-8 rounded-full flex items-center justify-center text-sm',
                        fan.rank === 1
                          ? 'bg-[#C9A24D] text-[#0B0B0D]'
                          : fan.rank === 2
                          ? 'bg-[rgba(201,162,77,0.65)] text-[#0B0B0D]'
                          : 'bg-[rgba(201,162,77,0.25)] text-[#F4F2ED]',
                      ]"
                  >{{ fan.rank }}</div>
                  <span class="text-[#F4F2ED]">{{ fan.name }}</span>
                </div>
                <div class="flex items-center gap-1 text-[#5B3FD6]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trending-up w-4 h-4"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
                  <span>{{ fan.points }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "#imports";

const { t } = useI18n();

type SportFilter =
  | "all"
  | "soccer"
  | "basketball"
  | "football"
  | "baseball"
  | "hockey"
  | "other";

interface SportTab {
  id: SportFilter;
  label: string;
  icon?: string;
}

interface LiveGame {
  id: string;
  sport: SportFilter;
  sportLabel: string;
  matchup: string;
  homeScore: number;
  awayScore: number;
  clock: string;
  viewers: number;
  boosts: number;
  favorites: number;
  likes: number;
}

interface UpcomingEvent {
  id: string;
  sport: string;
  matchup: string;
  timeLabel: string;
}

interface ChatMessage {
  id: string;
  user: string;
  userInitials: string;
  text: string;
  timeAgo: string;
  isTopFan?: boolean;
}

interface TopFan {
  rank: number;
  name: string;
  points: number;
  delta: number;
}

const sports: SportTab[] = [
  { id: "all", label: "All Sports", icon: "🏆" },
  { id: "soccer", label: "Soccer", icon: "⚽" },
  { id: "basketball", label: "Basketball", icon: "🏀" },
  { id: "football", label: "Football", icon: "🏈" },
  { id: "baseball", label: "Baseball", icon: "⚾" },
  { id: "hockey", label: "Hockey", icon: "🏒" },
  { id: "other", label: "Other Sports", icon: "🎯" },
];

const selectedSport = ref<SportFilter>("all");

const liveGames = ref<LiveGame[]>([
  {
    id: "arsenal-city",
    sport: "soccer",
    sportLabel: "Soccer",
    matchup: "Arsenal vs Manchester City",
    homeScore: 2,
    awayScore: 1,
    clock: "67:32",
    viewers: 1247,
    boosts: 342,
    favorites: 521,
    likes: 521,
  },
  {
    id: "lakers-warriors",
    sport: "basketball",
    sportLabel: "Basketball",
    matchup: "Lakers vs Warriors",
    homeScore: 98,
    awayScore: 95,
    clock: "Q4 3:45",
    viewers: 892,
    boosts: 234,
    favorites: 387,
    likes: 387,
  },
  {
    id: "chiefs-bills",
    sport: "football",
    sportLabel: "Football",
    matchup: "Chiefs vs Bills",
    homeScore: 21,
    awayScore: 17,
    clock: "Q3 8:12",
    viewers: 1543,
    boosts: 456,
    favorites: 678,
    likes: 678,
  },
]);

const upcomingEvents = ref<UpcomingEvent[]>([
  {
    id: "bruins-rangers",
    sport: "NHL",
    matchup: "Bruins vs Rangers",
    timeLabel: "Today, 7:00 PM",
  },
  {
    id: "yankees-redsox",
    sport: "MLB",
    matchup: "Yankees vs Red Sox",
    timeLabel: "Tomorrow, 1:00 PM",
  },
]);

const chatMessages = ref<ChatMessage[]>([
  {
    id: "1",
    user: "Alex M.",
    userInitials: "AM",
    text: "What a goal! 🔥",
    timeAgo: "2m ago",
    isTopFan: true,
  },
  {
    id: "2",
    user: "Sarah K.",
    userInitials: "SK",
    text: "This game is insane!",
    timeAgo: "3m ago",
    isTopFan: true,
  },
  {
    id: "3",
    user: "Mike D.",
    userInitials: "MD",
    text: "LFG!! 🏆",
    timeAgo: "5m ago",
  },
]);

const topFans = ref<TopFan[]>([
  {
    rank: 1,
    name: "Alex M.",
    points: 1247,
    delta: 1247,
  },
  {
    rank: 2,
    name: "Sarah K.",
    points: 892,
    delta: 892,
  },
  {
    rank: 3,
    name: "Mike D.",
    points: 654,
    delta: 654,
  },
]);

const chatInput = ref("");

const filteredGames = computed(() => {
  if (selectedSport.value === "all") {
    return liveGames.value;
  }
  return liveGames.value.filter((game) => game.sport === selectedSport.value);
});

const handleSendChat = () => {
  if (!chatInput.value.trim()) return;

  chatMessages.value.unshift({
    id: Date.now().toString(),
    user: "You",
    userInitials: "YO",
    text: chatInput.value.trim(),
    timeAgo: "Just now",
  });

  chatInput.value = "";
};

const handleChatKeypress = (e: KeyboardEvent) => {
  if (e.key === "Enter") {
    e.preventDefault();
    handleSendChat();
  }
};

const headerMotion = {
  initial: { opacity: 0, y: -20 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, easing: "ease-out" },
  },
};

const tabsMotion = {
  initial: { opacity: 0, y: 10 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.1, duration: 0.4, easing: "ease-out" },
  },
};

const liveNowMotion = {
  initial: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.15, duration: 0.5, easing: "ease-out" },
  },
};

const upcomingMotion = {
  initial: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.25, duration: 0.5, easing: "ease-out" },
  },
};

const chatMotion = {
  initial: { opacity: 0, x: 20 },
  enter: {
    opacity: 1,
    x: 0,
    transition: { delay: 0.2, duration: 0.5, easing: "ease-out" },
  },
};

const fansMotion = {
  initial: { opacity: 0, x: 20 },
  enter: {
    opacity: 1,
    x: 0,
    transition: { delay: 0.3, duration: 0.5, easing: "ease-out" },
  },
};
</script>