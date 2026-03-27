<template>
  <div class="relative min-h-screen p-6">
    <LevelNavigation />
    <LiveCounter />
    <MusicToggle />

    <!-- Ambient background effects -->
    <div class="fixed inset-0 pointer-events-none">
      <div
        class="absolute top-1/4 left-1/3 w-96 h-96 bg-[#5B3FD6] opacity-8 blur-[120px] rounded-full"
      />
      <div
        class="absolute bottom-1/3 right-1/3 w-96 h-96 bg-[#5B3FD6] opacity-8 blur-[120px] rounded-full"
      />
    </div>

    <div class="relative max-w-7xl mx-auto pt-20">
      <!-- Header -->
      <div class="text-center mb-8 opacity-0 -translate-y-4 animate-delay-sm">
        <h1 class="text-4xl text-[#C9A24D] mb-2">{{ t("vibeRoomTitle") }}</h1>
        <div class="flex items-center justify-center gap-2 text-[#F4F2ED] opacity-70">
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
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <p>{{ t("verifiedOnly") }}</p>
        </div>
      </div>
      <!-- Flash success message (e.g., after login redirect) -->
      <SystemState
        v-if="flash.type.value === 'success' && flash.message.value"
        type="success"
        :message="flash.message.value"
      />

      <!-- Email Verification Banner -->
      <EmailVerificationBanner
        @completeProfile="handleCompleteProfileClick"
        @verifyEmail="showVerificationModal = true"
      />

      <!-- View-Only Warning (shown for guests, users without completed profile, or unverified users) -->
      <div class="mb-6 opacity-0 -translate-y-4 animate-delay-md">
        <OB33ZCard
          class="bg-[rgba(91,63,214,0.1)] border-[rgba(91,63,214,0.3)]"
        >
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-[#C9A24D] mb-1">{{ t("viewOnly") }}</h3>
              <p class="text-sm text-[#F4F2ED] opacity-80">
                {{ t("viewOnlyMessage") }}
              </p>
            </div>
            <OB33ZButton
              v-if="!isProfileCompleted"
              variant="secondary"
              class="whitespace-nowrap"
              @click="handleCompleteProfileClick"
            >
              {{ t("completeProfile") }}
            </OB33ZButton>
            <!-- For logged-in users with completed profile but not verified: show verify account button -->
            <OB33ZButton
              v-else-if="!isFullyVerified"
              variant="secondary"
              class="whitespace-nowrap"
              @click="showVerificationModal = true"
            >
              Verify Yourself
            </OB33ZButton>
          </div>
        </OB33ZCard>
      </div>

      <!-- Lane Selection -->
      <div class="mb-6 opacity-0 -translate-y-4 animate-delay-lg">
        <OB33ZCard>
          <h3 class="text-[#C9A24D] mb-4">{{ t("selectLane") }}</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              v-for="lane in lanes"
              :key="lane.id"
              @click="loadRoomForLane(lane.id)"
              :class="[
                'relative p-4 rounded-lg border transition-all',
                selectedLane === lane.id
                  ? 'bg-[rgba(201,162,77,0.1)] border-[#C9A24D] shadow-[0_0_20px_rgba(201,162,77,0.2)]'
                  : 'bg-[rgba(244,242,237,0.02)] border-[rgba(201,162,77,0.15)] hover:border-[rgba(201,162,77,0.3)]',
              ]"
            >
              <div class="relative z-10">
                <div class="flex items-center gap-2 mb-2">
                  <svg v-if="lane.id === 'deep'" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" 
                    :class="[
                      selectedLane === lane.id
                        ? 'text-[#C9A24D]'
                        : 'text-[#F4F2ED]',
                    ]"
                    stroke="currentColor"
                  >
                    <path d="M5.75016 15.0066C7.34064 15.8224 9.17023 16.0434 10.9092 15.6297C12.6482 15.216 14.1823 14.1948 15.235 12.75C16.2876 11.3053 16.7897 9.53215 16.6506 7.75003C16.5116 5.9679 15.7406 4.29403 14.4767 3.03005C13.2127 1.76607 11.5388 0.995103 9.7567 0.856073C7.97457 0.717044 6.20139 1.2191 4.75668 2.27176C3.31197 3.32443 2.29074 4.85848 1.87702 6.59749C1.46329 8.33649 1.68428 10.1661 2.50016 11.7566L0.833496 16.6732L5.75016 15.0066Z" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <svg
                    v-else-if="lane.id === 'light'"
                    :class="[
                      'w-5 h-5',
                      selectedLane === lane.id
                        ? 'text-[#C9A24D]'
                        : 'text-[#F4F2ED]',
                    ]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <svg
                    v-else
                    :class="[
                      'w-5 h-5',
                      selectedLane === lane.id
                        ? 'text-[#C9A24D]'
                        : 'text-[#F4F2ED]',
                    ]"
                    fill="none"
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
                  <span
                    :class="[
                      'font-medium',
                      selectedLane === lane.id
                        ? 'text-[#C9A24D]'
                        : 'text-[#F4F2ED]',
                    ]"
                  >
                    {{ lane.name }}
                  </span>
                </div>
                <p class="text-xs text-[#F4F2ED] opacity-60 text-left">
                  {{ lane.description }}
                </p>
              </div>
            </button>
          </div>
        </OB33ZCard>
      </div>

      <!-- Chat Area -->
      <div class="opacity-0 -translate-y-4 animate-delay-lg">
        <OB33ZCard>
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-[#C9A24D]">
              {{ lanes.find((l) => l.id === selectedLane)?.name }}
            </h3>
            <div class="flex items-center gap-2">
              <div class="w-2 h-2 bg-[#C9A24D] rounded-full animate-pulse" />
              <span class="text-sm text-[#F4F2ED] opacity-60">
                {{ activeUsersCount }} active
              </span>
            </div>
          </div>

          <!-- Messages -->
          <div class="space-y-4 mb-6 max-h-[400px] overflow-y-auto">
            <div
              v-for="msg in messages[selectedLane]"
              :key="msg.id"
              v-motion="{
                initial: { opacity: 0, x: -20 },
                enter: {
                  opacity: 1,
                  x: 0,
                  transition: { delay: 0.1 },
                },
              }"
              :class="['flex gap-3', !isVerified && 'opacity-50']"
            >
              <div
                class="w-10 h-10 rounded-full bg-gradient-to-br from-[#C9A24D] to-[#5B3FD6] flex items-center justify-center text-[#0B0B0D] font-medium flex-shrink-0"
              >
                {{ msg.user[0] }}
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-1">
                  <span class="text-sm font-medium text-[#F4F2ED]">{{
                    msg.user
                  }}</span>
                  <OB33ZBadge v-if="msg.verified" type="verified" />
                  <OB33ZBadge v-if="msg.vip" type="vip" />
                </div>
                <p class="text-sm text-[#F4F2ED] opacity-90">{{ msg.text }}</p>
                <div v-if="isVerified" class="flex items-center gap-3 mt-2">
                  <button
                    class="flex items-center gap-1 text-[#F4F2ED] opacity-50 hover:opacity-100 hover:text-[#C9A24D] transition-colors"
                    @click="handleSendGift(msg)"
                  >
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
                        d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                      />
                    </svg>
                    <span class="text-xs">{{ t("sendGift") }}</span>
                  </button>
                  <button
                    class="flex items-center gap-1 text-[#F4F2ED] opacity-50 hover:opacity-100 hover:text-[#C9A24D] transition-colors"
                    @click="handleSendBoost(msg)"
                    >
                    <!-- @click="handleSendReaction(msg)" -->
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
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    <span class="text-xs">{{ t("boost") }}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Message Input -->
          <div v-if="isVerified" class="flex gap-3">
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
          <div
            v-else
            class="bg-[rgba(244,242,237,0.05)] rounded-lg p-4 text-center"
          >
            <svg class="mx-auto mb-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.4">
              <path d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z" stroke="#F4F2ED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="#F4F2ED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
            </svg>
            <p class="text-sm text-[#F4F2ED] opacity-60">
              Verification required to participate
            </p>
          </div>
        </OB33ZCard>
      </div>

      <!-- Speed Round Promotion -->
      <div class="mt-6 opacity-0 -translate-y-4 animate-delay-xl shadow-[0_0_24px_rgba(91,63,214,0.2)]">
        <OB33ZCard
          :glow="true"
          class="bg-gradient-to-r from-[rgba(91,63,214,0.1)] to-[rgba(201,162,77,0.1)]"
        >
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-[#C9A24D] mb-1">Speed Round Starting Soon</h3>
              <p class="text-sm text-[#F4F2ED] opacity-80">
                Quick conversations, instant connections. Join in 15 minutes!
              </p>
            </div>
            <OB33ZButton variant="primary"> Set Reminder </OB33ZButton>
          </div>
        </OB33ZCard>
      </div>
    </div>

    <!-- Complete Profile modal -->
    <ProfileCompletionModal
      :isOpen="showProfileModal"
      @close="showProfileModal = false"
      @complete="handleProfileComplete"
    />

    <!-- Email Verification Modal -->
    <VerificationModal
      :isOpen="showVerificationModal"
      @close="showVerificationModal = false"
      @verify="handleVerificationSuccess"
    />

    <!-- Auth Required Modal -->
    <Teleport to="body">
      <Transition name="modal-backdrop">
        <div
          v-if="showAuthRequiredModal"
          class="fixed inset-0 bg-[rgba(11,11,13,0.95)] backdrop-blur-sm z-50 flex items-center justify-center p-6"
          @click="showAuthRequiredModal = false"
        >
          <div
            class="w-full max-w-md"
            @click.stop
          >
            <OB33ZCard :glow="true">
              <div class="flex items-center justify-between mb-6">
                <div>
                  <h2 class="text-2xl text-[#C9A24D] mb-1">
                    Sign In Required
                  </h2>
                  <p class="text-sm text-[#F4F2ED] opacity-60">
                    Please sign in to complete your profile
                  </p>
                </div>
                <button
                  @click="showAuthRequiredModal = false"
                  class="text-[#F4F2ED] opacity-60 hover:opacity-100 transition-opacity"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div class="mb-6">
                <p class="text-[#F4F2ED] opacity-80 mb-4">
                  You need to sign in first before you can complete your profile.
                </p>
              </div>

              
            </OB33ZCard>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useI18n } from "#imports";
import { useAuthStore } from "~/stores/auth";
import { useFlashMessage } from "~/composables/useFlashMessage";
import { useRoomStore } from "~/stores/room";

const { t } = useI18n();
const authStore = useAuthStore();
const roomStore = useRoomStore();
const flash = useFlashMessage();

let heartbeatInterval: number | null = null;
type Lane = "deep" | "light" | "social";

interface Message {
  id: string;
  user: string;
  text: string;
  verified: boolean;
  vip?: boolean;
}

const selectedLane = ref<Lane>("light");
const message = ref("");
const showProfileModal = ref(false);
const showVerificationModal = ref(false);
const showAuthRequiredModal = ref(false);

// Map lanes to backend room IDs (provided: 1=Deep, 2=Light, 3=Friendly Social)
const LANE_ROOM_MAP: Record<Lane, number> = {
  deep: 1,
  light: 2,
  social: 3,
};

const currentRoomId = ref<number | null>(null);

const activeUsersCount = computed(() => {
  const id = currentRoomId.value ?? LANE_ROOM_MAP[selectedLane.value];
  const users = roomStore.usersByRoom[id];
  return Array.isArray(users) ? users.length : 0;
});

// Check if user is fully verified (email, phone, AND document)
const isFullyVerified = computed(() => {
  if (!authStore.isAuthenticated || !authStore.user) {
    return false;
  }
  
  const user = authStore.user;
  
  // If backend provides a consolidated verified flag, trust it
  if (user.is_verified === true) {
    return true;
  }
  
  // Check email verification
  const emailVerified = user.is_verified === true || 
                       user.email_verified_at !== null ||
                       user.is_email_verified === true ||
                       user.email_verified === true;
  
  // Check phone verification
  const phoneVerified = user.phone_verified_at !== null ||
                       user.is_phone_verified === true ||
                       user.phone_verified === true;
  
  // Check document verification
  const documentVerified = user.document_verified_at !== null ||
                          user.is_document_verified === true ||
                          user.document_verified === true ||
                          user.id_verified === true;
  
  // Log for debugging
  if (process.client) {
    console.log('Verification status:', {
      emailVerified,
      phoneVerified,
      documentVerified,
      isFullyVerified: emailVerified || phoneVerified || documentVerified
    });
  }
  
  // Consider user verified if ANY verification method has succeeded
  return emailVerified || phoneVerified || documentVerified;
});
// Check if user is verified from auth store
const isVerified = computed(() => {
  if (!authStore.isAuthenticated || !authStore.user) {
    return false;
  }
  return authStore.user.is_verified === true || authStore.user.email_verified_at !== null;
});

// Check if profile is completed
const isProfileCompleted = computed(() => {
  if (!authStore.isAuthenticated || !authStore.user) {
    return false;
  }
  // Check multiple possible field names for profile completion
  const profileCompleted = authStore.user.profile_completed || 
                          authStore.user.profileCompleted || 
                          authStore.user.is_profile_completed;
  
  // Debug log to see what we're checking
  if (process.client && authStore.user) {
    console.log('Checking profile completion:', {
      profile_completed: authStore.user.profile_completed,
      profileCompleted: authStore.user.profileCompleted,
      is_profile_completed: authStore.user.is_profile_completed,
      result: profileCompleted === true || profileCompleted === 1
    });
  }
  
  return profileCompleted === true || profileCompleted === 1;
});

const messages = ref<Record<Lane, Message[]>>({
  deep: [],
  light: [],
  social: [],
});

const lanes = [
  {
    id: "deep" as Lane,
    name: t("deepChat"),
    description: "Meaningful conversations and deep connections",
  },
  {
    id: "light" as Lane,
    name: t("lightChat"),
    description: "Casual chat and everyday topics",
  },
  {
    id: "social" as Lane,
    name: t("friendlySocial"),
    description: "Social mingling and friendly banter",
  },
];

const handleSendMessage = async () => {
  if (!message.value.trim() || !isVerified.value) return;

  const text = message.value;

  // Optimistically update UI
  const newMessage: Message = {
    id: Date.now().toString(),
    user: "You",
    text,
    verified: true,
  };
  messages.value[selectedLane.value].push(newMessage);
  message.value = "";

  try {
    if (authStore.isAuthenticated && currentRoomId.value) {
      await roomStore.sendMessage(currentRoomId.value, text);
    }
  } catch (error) {
    console.error("Failed to send message to API:", error);
  }
};

const handleKeyPress = (e: KeyboardEvent) => {
  if (e.key === "Enter") handleSendMessage();
};

const handleSendReaction = async (msg: Message) => {
  if (!isVerified.value || !authStore.isAuthenticated) return;

  try {
    if (currentRoomId.value) {
      await roomStore.sendReaction(currentRoomId.value, msg.id, "fire");
    }
  } catch (error) {
    console.error("Failed to send reaction:", error);
  }
};
const handleSendBoost = async (msg: Message) => {
  if (!isVerified.value || !authStore.isAuthenticated) return;

  try {
    // Load boosts list if empty
    if (roomStore.boosts.length === 0) {
      await roomStore.fetchBoosts();  // GET /boosts
    }
    const defaultBoost = roomStore.boosts[0];
    if (!defaultBoost || !currentRoomId.value) return;

    const successUrl = `${window.location.origin}/vibe-room?boost_success=1`;
    const cancelUrl = `${window.location.origin}/vibe-room?boost_cancelled=1`;
    // Purchase and start boost
    const response = await roomStore.purchaseAndStartBoost(
      currentRoomId.value, 
      defaultBoost.id, 
      "pm_card_visa",
      successUrl,
      cancelUrl
    );  // POST /rooms/{roomId}/boosts
    // If response contains a checkout URL, redirect to it
        const checkoutUrl = response.url || response.checkout_url || response.data?.url || response.data?.checkout_url || response.data?.checkout?.checkout_url;
        if (checkoutUrl) {
          window.open(checkoutUrl, '_blank');
        } else {
          console.log("no checkout url")
        }

  } catch (error) {
    console.error("Failed to send boost:", error);
  }
};
const handleSendGift = async (msg: Message) => {
  if (!isVerified.value || !authStore.isAuthenticated) return;

  try {
    // Load gifts list once if empty, then use the first gift as default
    if (roomStore.gifts.length === 0) {
      await roomStore.fetchGifts();               // GET /gifts
    }
    const defaultGift = roomStore.gifts[0];
    if (!defaultGift || !currentRoomId.value) return;

    const successUrl = `${window.location.origin}/vibe-room?gift_success=1`;
    const cancelUrl = `${window.location.origin}/vibe-room?gift_cancelled=1`;
    // First purchase the gift (charges user) - POST /gifts/purchase
    const purchaseResponse = await roomStore.purchaseGift(
      defaultGift.id, 
      "pm_card_visa",
      successUrl,
      cancelUrl
    );
    const checkoutUrl = purchaseResponse?.data?.checkout?.checkout_url || 
                       purchaseResponse?.checkout_url || 
                       purchaseResponse?.url || 
                       purchaseResponse?.data?.url;

    if (checkoutUrl) {
      // Open Stripe checkout in new tab
      window.open(checkoutUrl, '_blank');
      
      // Note: The gift will be sent after successful payment
      // You might want to show a message that payment is processing
      console.log("Payment window opened for gift purchase");
    } else {
      // If no checkout URL (maybe direct purchase), then send the gift
      await roomStore.sendGiftToRoom(currentRoomId.value, defaultGift.id);
    }
  } catch (error) {
    console.error("Failed to send gift:", error);
  }
};

const handleVerificationSuccess = async () => {
  try {
    await authStore.getCurrentUser();
  } catch (e) {
    console.error("Failed to refresh user after verification:", e);
  } finally {
    showVerificationModal.value = false;
  }
};
const loadRoomForLane = async (lane: Lane) => {
  const roomId = LANE_ROOM_MAP[lane];

  selectedLane.value = lane;
  currentRoomId.value = roomId;

  // Guests: still fetch messages/users for view-only mode, but don't join room or update presence
  try {
    const apiMessages = await roomStore.fetchMessages(roomId);       // GET /rooms/{roomId}/messages
    await roomStore.fetchRoomUsers(roomId);                          // GET /rooms/{roomId}/users

    // Map API messages to UI Message type
    const laneMessages: Message[] = (apiMessages as any[]).map((m: any) => ({
      id: String(m.id ?? m.message_id ?? Math.random().toString(36).slice(2)),
      user:
        m.user?.display_name ||
        m.user?.name ||
        m.user_name ||
        m.username ||
        "User",
      text: m.message || m.text || "",
      verified:
        m.user?.is_verified === true ||
        m.user?.verified === true ||
        false,
      vip: false,
    }));

    messages.value[lane] = laneMessages;
  } catch (error) {
    console.error("Failed to load messages/users for lane:", error);
  }

  // Authenticated users additionally join the room (for presence/limits)
  if (authStore.isAuthenticated) {
    try {
      await roomStore.joinRoom(roomId);                              // POST /rooms/{roomId}/join
    } catch (e) {
      console.error("Failed to join room for lane:", e);
    }
  }
};

onMounted(async () => {
  if (flash.type.value === "success" && flash.message.value) {
    window.setTimeout(() => flash.clear(), 3000);
  }

  // Ensure levels are loaded (Get all levels API)
  try {
    await roomStore.fetchLevels();
  } catch (e) {
    console.error("Failed to load levels:", e);
  }

  // If user is authenticated, default to Light Chat room and update presence
  if (authStore.isAuthenticated) {
    try {
      await loadRoomForLane("light");
      await roomStore.updatePresence("in_room");

      // Start presence heartbeat every 30 seconds
      heartbeatInterval = window.setInterval(() => {
        roomStore.heartbeat().catch(() => {});
      }, 30000) as unknown as number;
    } catch (error) {
      console.error("Failed to initialize Vibe Room:", error);
    }
  }
  const urlParams = new URLSearchParams(window.location.search);
  const giftSuccess = urlParams.get('gift_success');
  const giftCancelled = urlParams.get('gift_cancelled');

  if (giftSuccess === '1') {
    
    // After successful payment, we need to send the gift to the room
    // You might need to get the gift ID from session or state
    if (currentRoomId.value && roomStore.gifts[0]) {
      try {
        await roomStore.sendGiftToRoom(currentRoomId.value, roomStore.gifts[0].id);
        console.log('Gift sent to room after successful payment');
        // Show success message to user
      } catch (error) {
        console.error('Failed to send gift after payment:', error);
      }
    }
    
    // Clean up URL params
    const newUrl = window.location.pathname;
    window.history.replaceState({}, document.title, newUrl);
  }

  if (giftCancelled === '1') {
    console.log('Gift purchase cancelled');
    // Show cancellation message
    
    // Clean up URL params
    const newUrl = window.location.pathname;
    window.history.replaceState({}, document.title, newUrl);
  }
});

onBeforeUnmount(async () => {
  if (heartbeatInterval !== null) {
    window.clearInterval(heartbeatInterval);
    heartbeatInterval = null;
  }

  if (authStore.isAuthenticated && currentRoomId.value) {
    try {
      await roomStore.leaveRoom(currentRoomId.value);
      await roomStore.updatePresence("online");
    } catch (error) {
      console.error("Failed to clean up Vibe Room:", error);
    }
  }
});

const handleCompleteProfileClick = () => {
  if (!authStore.isAuthenticated) {
    showAuthRequiredModal.value = true;
  } else {
    showProfileModal.value = true;
  }
};

const handleProfileComplete = async (profileData: {
  displayName: string;
  bio: string;
  city: string;
  state: string;
  birthday: string;
  phone_number: string;
  profileImages: File[];
  interests: string[];
}) => {
  try {
    // Birthday is required; validate user is 18+ based on date_of_birth
    const birthday = (profileData.birthday || "").trim();
    if (!birthday) {
      console.error("Birthday is required for profile completion");
      return;
    }
    const birthDate = new Date(birthday);
    const today = new Date();
    let ageYears = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) ageYears--;
    if (ageYears < 18) {
      console.error("You must be at least 18 years old");
      return;
    }

    // Complete profile: use POST
    const updateResponse = await authStore.updateProfile(
      {
        display_name: profileData.displayName,
        date_of_birth: birthday,
        city: profileData.city,
        state: profileData.state,
        bio: profileData.bio || undefined,
        phone_number: profileData.phone_number || undefined,
        interests: profileData.interests,
        profile_photo: profileData.profileImages?.[0],
      },
      'POST'
    );

    // Check if profile_completed is already in the response
    const responseUser = (updateResponse as any)?.data?.user || (updateResponse as any)?.user || (updateResponse as any)?.data;
    if (responseUser?.profile_completed !== undefined) {
      console.log('Profile completed status from update response:', responseUser.profile_completed);
    }

    // Small delay to allow backend to process profile completion
    await new Promise(resolve => setTimeout(resolve, 500));

    // Refresh user data to ensure profile_completed status is updated
    // This is important because the API might set profile_completed after the update
    try {
      const refreshedUser = await authStore.getCurrentUser();
      console.log('User data refreshed after profile completion:', refreshedUser);
      console.log('Profile completed status after refresh:', authStore.user?.profile_completed);
      console.log('Full user object:', authStore.user);
    } catch (error) {
      console.error('Failed to refresh user data:', error);
      // Even if refresh fails, continue - the updateProfile might have already updated the user
    }

    // Close profile modal
    showProfileModal.value = false;

    // Small delay to ensure reactivity updates before opening verification modal
    await new Promise(resolve => setTimeout(resolve, 100));

    // Open verification modal with 3 options after profile completion
    setTimeout(() => {
      showVerificationModal.value = true;
    }, 300);
  } catch (error: any) {
    // Error is already handled in authStore
    console.error('Profile update failed:', error);
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

const viewOnlyMotion = {
  initial: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, easing: "ease-out" },
  },
};

const laneSelectionMotion = {
  initial: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.1, duration: 0.5, easing: "ease-out" },
  },
};

const chatAreaMotion = {
  initial: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.2, duration: 0.5, easing: "ease-out" },
  },
};

const speedRoundMotion = {
  initial: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.3, duration: 0.5, easing: "ease-out" },
  },
};
</script>
