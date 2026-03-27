<template>
  <div class="relative min-h-screen p-6">
    <LevelNavigation />
    <LiveCounter />
    <MusicToggle />

    <!-- Ambient background effects -->
    <div class="fixed inset-0 pointer-events-none">
      <div
        class="absolute top-1/3 right-1/4 w-96 h-96 bg-[#5B3FD6] opacity-5 blur-[120px] rounded-full"
      />
      <div
        class="absolute bottom-1/3 left-1/4 w-96 h-96 bg-[#5B3FD6] opacity-5 blur-[120px] rounded-full"
      />
    </div>

    <div class="relative max-w-7xl mx-auto pt-20">
      <!-- Header -->
      <div
        class="opacity-0 -translate-y-4 animate-delay-sm text-center mb-12"
      >
        <h1 class="text-4xl text-[#C9A24D] mb-2">{{ t("theLounge") }}</h1>
        <p class="text-[#F4F2ED] opacity-70">{{ t("loungeDescription") }}</p>
      </div>

      <!-- Announcement Banner -->
      <div class="mb-8 shadow-[0_0_24px_rgba(91,63,214,0.2)] opacity-0 -translate-y-4 animate-delay-md">
        <OB33ZCard :glow="true">
          <div class="flex items-center gap-3">
            <div class="w-2 h-2 bg-[#C9A24D] rounded-full animate-pulse" />
            <div>
              <h3 class="text-[#C9A24D] mb-1">{{ t("announcements") }}</h3>
              <p class="text-sm text-[#F4F2ED] opacity-80">
                New Speed Round starting in The Vibe Room at 9 PM EST. Grand
                prize: 1000 points!
              </p>
            </div>
          </div>
        </OB33ZCard>
      </div>

      <!-- Email Verification Banner (if logged in but not verified) -->
      <EmailVerificationBanner
        v-if="!isGuest"
        @completeProfile="() => {}"
        @verifyEmail="showEmailVerificationModal = true"
      />

      <!-- Guest/User Banner (always shown, content changes based on auth state) -->
      <div class="mb-8">
        <OB33ZCard
          class="opacity-0 -translate-y-4 animate-delay-lg bg-gradient-to-r from-[rgba(91,63,214,0.15)] to-[rgba(201,162,77,0.15)] border-[rgba(201,162,77,0.3)]"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-in w-6 h-6 text-[#C9A24D]"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" x2="3" y1="12" y2="12"></line></svg>
              <div>
                <h3 class="text-[#F4F2ED] font-medium mb-1">
                  <span v-if="!authStore.isAuthenticated">Join OB33Z to unlock full access</span>
                  <span v-else>Welcome back, {{ authStore.user?.name || authStore.user?.display_name || 'Member' }}!</span>
                </h3>
                <p class="text-sm text-[#F4F2ED] opacity-80">
                  <span v-if="!authStore.isAuthenticated">{{ t("nav.freeAccess") }}</span>
                  <span v-else>You're logged in and ready to connect</span>
                </p>
              </div>
            </div>
            <div class="flex gap-3">
              <OB33ZButton 
                v-if="!authStore.isAuthenticated"
                variant="ghost" 
                @click="openJoinModal"
              >
                {{ t("nav.signIn") }}
              </OB33ZButton>
              <OB33ZButton 
                v-if="!authStore.isAuthenticated"
                variant="primary" 
                @click="openJoinModal"
              >
                {{ t("nav.join") }}
              </OB33ZButton>
              <OB33ZButton 
                v-else
                variant="ghost" 
                @click="handleLogout"
                :disabled="authStore.isLoading"
                class="text-red-400 hover:text-red-300 hover:bg-red-500/20"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                {{ authStore.isLoading ? 'Logging out...' : 'Logout' }}
              </OB33ZButton>
            </div>
          </div>
        </OB33ZCard>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Main Chat Area -->
        <div class="lg:col-span-2">
          <OB33ZCard class="opacity-0 translate-y-4 animate-fade-left-delay-lg">
            <h3 class="text-[#C9A24D] mb-4">{{ t("activeNow") }}</h3>

            <!-- Messages -->
            <div class="space-y-4 mb-6 max-h-[400px] overflow-y-auto">
              <div
                v-for="msg in messages"
                :key="msg.id"
                v-motion="{
                  initial: { opacity: 0, x: -20 },
                  enter: {
                    opacity: 1,
                    x: 0,
                    transition: { delay: 0.1 },
                  },
                }"
                class="flex gap-3"
              >
                <div
                  class="w-10 h-10 rounded-full bg-gradient-to-br from-[#C9A24D] to-[#5B3FD6] flex items-center justify-center text-[#0B0B0D] font-medium"
                >
                  {{ msg.user[0] }}
                </div>
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-1">
                    <span class="text-sm font-medium text-[#F4F2ED]">{{
                      msg.user
                    }}</span>
                    <OB33ZBadge v-if="msg.verified" type="verified" />
                    <OB33ZBadge v-if="msg.vip" type="vip" />
                  </div>
                  <p class="text-sm text-[#F4F2ED] opacity-90">{{ msg.text }}</p>
                  <div class="flex items-center gap-3 mt-2">
                    <button
                      class="text-[#F4F2ED] opacity-50 hover:opacity-100 hover:text-[#C9A24D] transition-colors flex items-center"
                      :disabled="!authStore.isAuthenticated || isSendingReaction"
                    >
                      <svg
                        class="w-4 h-4"
                        :fill="hasUserReacted(msg, 'like') ? 'currentColor' : 'none'"
                        :class="{ 'text-[#C9A24D]': hasUserReacted(msg, 'like') || getReactionCountForMessage(msg, 'like') > 0 }"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      <span v-if="getReactionCountForMessage(msg, 'like') > 0" class="text-xs ml-1">
                        {{ getReactionCountForMessage(msg, 'like') }}
                      </span>
                    </button>
                    <button
                      class="text-[#F4F2ED] opacity-50 hover:opacity-100 hover:text-[#C9A24D] transition-colors flex items-center"
                      @click="handleReaction(msg.id, 'thumbs-up')"
                      :disabled="!authStore.isAuthenticated || isSendingReaction"
                    >
                      <svg
                        class="w-4 h-4"
                        :fill="hasUserReacted(msg, 'thumbs-up') ? 'currentColor' : 'none'"
                        :class="{ 'text-[#C9A24D]': hasUserReacted(msg, 'thumbs-up') || getReactionCountForMessage(msg, 'thumbs-up') > 0 }"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                        />
                      </svg>
                      <span v-if="getReactionCountForMessage(msg, 'thumbs-up') > 0" class="text-xs ml-1">
                        {{ getReactionCountForMessage(msg, 'thumbs-up') }}
                      </span>
                    </button>
                    <button
                      class="text-[#F4F2ED] opacity-50 hover:opacity-100 hover:text-[#C9A24D] transition-colors flex items-center"
                      @click="handleReaction(msg.id, 'fire')"
                      :disabled="!authStore.isAuthenticated || isSendingReaction"
                    >
                      <svg
                        class="w-4 h-4"
                        :fill="hasUserReacted(msg, 'fire') ? 'currentColor' : 'none'"
                        :class="{ 'text-[#C9A24D]': hasUserReacted(msg, 'fire') || getReactionCountForMessage(msg, 'fire') > 0 }"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                        />
                      </svg>
                      <span v-if="getReactionCountForMessage(msg, 'fire') > 0" class="text-xs ml-1">
                        {{ getReactionCountForMessage(msg, 'fire') }}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Message Input -->
            <div class="flex gap-3">
              <OB33ZInput
                v-model="message"
                :placeholder="t('sendMessage')"
                class="flex-1"
                @keypress="handleKeyPress"
              />
              <OB33ZButton @click="handleSendMessage" class="px-4">
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
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </OB33ZButton>
            </div>

            <!-- Actions Bar -->
            <div
              class="flex items-center gap-4 mt-4 pt-4 border-t border-[rgba(201,162,77,0.15)]"
            >
              <button
                class="flex items-center gap-2 text-[#F4F2ED] hover:text-[#C9A24D] transition-colors"
                @click="handleSendGift"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                  />
                </svg>
                <span class="text-sm">{{ t("sendGift") }}</span>
              </button>
              <button
                class="flex items-center gap-2 text-[#F4F2ED] hover:text-[#C9A24D] transition-colors"
                @click="handleStartBoost"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <span class="text-sm">{{ t("boost") }}</span>
              </button>
            </div>
          </OB33ZCard>
        </div>

        <!-- Leaderboard -->
        <div>
          <OB33ZCard class="opacity-0 translate-y-4 animate-fade-right-delay-lg">
            <h3 class="text-[#C9A24D] mb-4">{{ t("leaderboard") }}</h3>
            <p class="text-xs text-[#F4F2ED] opacity-60 mb-4">
              {{ t("topMembers") }}
            </p>

            <div class="space-y-3">
              <div
                v-for="entry in leaderboard"
                :key="entry.rank"
                v-motion="{
                  initial: { opacity: 0, x: 20 },
                  enter: {
                    opacity: 1,
                    x: 0,
                    transition: { delay: entry.rank * 0.1 },
                  },
                }"
                class="flex items-center gap-3 p-3 rounded-lg bg-[rgba(244,242,237,0.02)] hover:bg-[rgba(244,242,237,0.05)] transition-colors"
              >
                <div
                  :class="[
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
                    entry.rank === 1
                      ? 'bg-[#C9A24D] text-[#0B0B0D]'
                      : entry.rank === 2
                      ? 'bg-[rgba(201,162,77,0.6)] text-[#0B0B0D]'
                      : entry.rank === 3
                      ? 'bg-[rgba(201,162,77,0.3)] text-[#F4F2ED]'
                      : 'bg-[rgba(244,242,237,0.1)] text-[#F4F2ED]',
                  ]"
                >
                  {{ entry.rank }}
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2">
                    <span class="text-sm font-medium text-[#F4F2ED] truncate">{{
                      entry.user
                    }}</span>
                    <OB33ZBadge v-if="entry.verified" type="verified" />
                    <OB33ZBadge v-if="entry.vip" type="vip" />
                  </div>
                  <span class="text-xs text-[#F4F2ED] opacity-60">{{
                    entry.points.toLocaleString()
                  }}
                    pts</span>
                </div>
              </div>
            </div>
          </OB33ZCard>
        </div>
      </div>
    </div>

    <Join v-model="isJoinOpen" />

    <!-- Email Verification Modal -->
    <EmailVerificationModal
      :isOpen="showEmailVerificationModal"
      :userEmail="authStore.user?.email || ''"
      @close="showEmailVerificationModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useI18n } from "#imports";
import { useAuthStore } from "~/stores/auth";
import { useRoomStore } from "~/stores/room";

const { t } = useI18n();
const authStore = useAuthStore();
const roomStore = useRoomStore();
const router = useRouter();

// Determine guest status - wait for auth to initialize
const isGuest = computed(() => {
  // If auth hasn't initialized yet, assume guest (will update once initialized)
  if (!authStore.isInitialized) {
    return true;
  }
  return !authStore.isAuthenticated;
});
const isJoinOpen = ref(false);
const showEmailVerificationModal = ref(false);
const message = ref("");
const isSendingReaction = ref(false);

// Lounge is Level 1 – its room id is 1
const LOUNGE_ROOM_ID = 1;

interface Message {
  id: string;
  user: string;
  text: string;
  verified: boolean;
  vip?: boolean;
  reactions?: MessageReaction[];
}

interface MessageReaction {
  id: string;
  type: string;
  count: number;
  user_reacted?: boolean;
}

interface LeaderboardEntry {
  rank: number;
  user: string;
  points: number;
  verified: boolean;
  vip?: boolean;
}

const messages = ref<Message[]>([]);
const leaderboard = ref<LeaderboardEntry[]>([]);

// Get reaction count for a specific message and reaction type
const getReactionCountForMessage = (message: Message, reactionType: string): number => {
  if (!message.reactions) return 0;
  const reaction = message.reactions.find(r => r.type === reactionType);
  return reaction?.count || 0;
};
// Helper function to check if the current user has reacted with a specific type
const hasUserReacted = (message: Message, reactionType: string): boolean => {
  if (!message.reactions || !authStore.user?.id) return false;
  
  const reaction = message.reactions.find(r => r.type === reactionType);
  return reaction?.user_reacted === true;
};
// Update message reactions from API response
const updateMessageReactions = (messageId: string, reactionData: any) => {
  const message = messages.value.find(m => m.id === messageId);
  if (!message) return;

  if (!message.reactions) {
    message.reactions = [];
  }

  const existingReaction = message.reactions.find(r => r.type === reactionData.type);
  
  if (existingReaction) {
    // Toggle reaction - if user reacted, decrease count, otherwise increase
    if (reactionData.user_reacted) {
      existingReaction.count += 1;
    } else {
      existingReaction.count -= 1;
      if (existingReaction.count <= 0) {
        // Remove reaction if count becomes 0
        message.reactions = message.reactions.filter(r => r.type !== reactionData.type);
      }
    }
    existingReaction.user_reacted = reactionData.user_reacted;
  } else {
    // Add new reaction
    message.reactions.push({
      id: reactionData.id || Date.now().toString(),
      type: reactionData.type,
      count: 1,
      user_reacted: true,
    });
  }
};

onMounted(async () => {
  // Load lounge messages from API
  try {
    if (authStore.isAuthenticated) {
      const apiMessages = await roomStore.fetchMessages(LOUNGE_ROOM_ID); // GET /rooms/1/messages
      
      // Log the API response to debug
      console.log('API Messages Response:', apiMessages);
      
      messages.value = (apiMessages as any[]).map((m: any) => {
        // Handle both possible response structures
        const messageData = m.message || m;
        const userData = messageData.user || m.user || {};
        const reactions = messageData.reactions || m.reactions || [];
        
        return {
          id: String(m.id || Math.random().toString(36).slice(2)),
          user: m.user?.display_name || "User",
          text: m.message || "",
          verified: m.user?.is_verified === true || false,
          vip: m.user?.vip === true || false,
          reactions: (m.reactions || []).map((r: any) => ({
            id: r.id,
            type: r.reaction_type || 'thumbs-up',
            count: 1,
            user_reacted: r.user_id === authStore.user?.id || false,
          })),
        };
      });
    }
  } catch (error) {
    console.error("Failed to load lounge messages:", error);
  }

  // Load leaderboard via Leaderboard API: GET /rooms/1/leaderboards
  try {
    if (authStore.isAuthenticated) {
      const baseUrl = roomStore.getApiBaseUrl();
      const url = `${baseUrl}/rooms/${LOUNGE_ROOM_ID}/leaderboards`;
      const response = await $fetch<any>(url, {
        method: "GET",
        headers: roomStore.getAuthHeaders(),
      });
      const data = (response as any).data || response;
      const entries = data.leaderboards || data;
      leaderboard.value = Array.isArray(entries)
        ? entries.map((e: any, index: number) => ({
            rank: index + 1,
            user: e.user?.display_name || e.user?.name || e.username || "User",
            points: e.points ?? e.score ?? 0,
            verified: e.user?.is_verified === true || false,
            vip: e.user?.vip === true || false,
          }))
        : [];
    }
  } catch (error) {
    console.error("Failed to load leaderboard:", error);
  }
});

const handleSendMessage = async () => {
  if (!message.value.trim()) return;

  const text = message.value;

  const newMessage: Message = {
    id: Date.now().toString(),
    user: "You",
    text,
    verified: true,
    reactions: [],
  };

  messages.value.push(newMessage);
  message.value = "";

  try {
    if (authStore.isAuthenticated) {
      await roomStore.sendMessage(LOUNGE_ROOM_ID, text); // POST /rooms/1/chat
    }
  } catch (error) {
    console.error("Failed to send lounge message:", error);
  }
};

const handleKeyPress = (e: KeyboardEvent) => {
  if (e.key === "Enter") handleSendMessage();
};

const openJoinModal = () => {
  isJoinOpen.value = true;
};

// Handle reaction (supports like, thumbs-up, fire)
const handleReaction = async (messageId: string, reactionType: string) => {
  if (!authStore.isAuthenticated) {
    openJoinModal();
    return;
  }

  if (isSendingReaction.value) return;

  isSendingReaction.value = true;

  try {
    // Optimistic update
    const message = messages.value.find(m => m.id === messageId);
    if (message) {
      if (!message.reactions) message.reactions = [];
      
      const existingReaction = message.reactions.find(r => r.type === reactionType);
      
      if (existingReaction) {
        // Toggle off
        if (existingReaction.user_reacted) {
          existingReaction.count -= 1;
          existingReaction.user_reacted = false;
          if (existingReaction.count <= 0) {
            message.reactions = message.reactions.filter(r => r.type !== reactionType);
          }
        } else {
          // Toggle on
          existingReaction.count += 1;
          existingReaction.user_reacted = true;
        }
      } else {
        // Add new reaction
        message.reactions.push({
          id: Date.now().toString(),
          type: reactionType,
          count: 1,
          user_reacted: true,
        });
      }
    }

    // Send to API
    const response = await roomStore.sendReaction(LOUNGE_ROOM_ID, parseInt(messageId), reactionType);
    
    // Update with actual server response
    if (response && response.data) {
      updateMessageReactions(messageId, response.data);
    }
  } catch (error) {
    console.error("Failed to send reaction:", error);
    // Revert optimistic update on error
    await roomStore.fetchMessages(LOUNGE_ROOM_ID);
  } finally {
    isSendingReaction.value = false;
  }
};

const handleSendGift = async () => {
  if (!authStore.isAuthenticated) return;

  try {
    // Load gifts once and pick first as default
    if (roomStore.gifts.length === 0) {
      await roomStore.fetchGifts(); // GET /gifts
    }
    const defaultGift = roomStore.gifts[0];
    if (!defaultGift) return;

    // Purchase gift - POST /gifts/purchase
    await roomStore.purchaseGift(defaultGift.id, "pm_card_visa");

    // Send gift into lounge room - POST /rooms/1/gifts
    await roomStore.sendGiftToRoom(LOUNGE_ROOM_ID, defaultGift.id);
  } catch (error) {
    console.error("Failed to send lounge gift:", error);
  }
};

const handleStartBoost = async () => {
  if (!authStore.isAuthenticated) return;

  try {
    if (roomStore.boosts.length === 0) {
      await roomStore.fetchBoosts(); // GET /boosts
    }
    const defaultBoost = roomStore.boosts[0];
    if (!defaultBoost) return;

    // Purchase and start boost - POST /rooms/1/boosts
    await roomStore.purchaseAndStartBoost(
      LOUNGE_ROOM_ID,
      defaultBoost.id,
      "pm_visa_card"
    );
  } catch (error) {
    console.error("Failed to start lounge boost:", error);
  }
};

const handleLogout = async () => {
  try {
    await authStore.logout();
    // Redirect to home page after logout
    await router.push('/');
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
</script>