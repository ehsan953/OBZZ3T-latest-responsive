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
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.3334 17.3335L28.2974 21.9762C28.3978 22.043 28.5144 22.0813 28.6349 22.0871C28.7553 22.0928 28.8751 22.0658 28.9814 22.0089C29.0877 21.952 29.1766 21.8673 29.2386 21.7639C29.3005 21.6604 29.3333 21.5421 29.3334 21.4215V10.4935C29.3334 10.3762 29.3025 10.261 29.2437 10.1595C29.185 10.0579 29.1005 9.97369 28.9988 9.91526C28.8971 9.85682 28.7817 9.82627 28.6644 9.82666C28.5471 9.82706 28.432 9.8584 28.3307 9.91752L21.3334 14.0002" stroke="#C9A24D" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M18.6666 8H5.33329C3.86053 8 2.66663 9.19391 2.66663 10.6667V21.3333C2.66663 22.8061 3.86053 24 5.33329 24H18.6666C20.1394 24 21.3333 22.8061 21.3333 21.3333V10.6667C21.3333 9.19391 20.1394 8 18.6666 8Z" stroke="#C9A24D" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <h1 class="text-4xl text-[#C9A24D] font-light">
            Watch Party
          </h1>
        </div>
        <p class="text-[16px] text-[#F4F2ED99]/60 max-w-78.25 md:max-w-3xl">
          Watch together, chat live, and share the experience
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
                <span>10:34</span>
                <div class="flex-1 h-1 rounded-full bg-[rgba(244,242,237,0.10)] overflow-hidden">
                  <div class="h-full w-[38%] bg-[rgba(201,162,77,0.55)]" />
                </div>
                <span>70%</span>
                <span class="text-[#F4F2ED]/45">12:34 / 36:00</span>
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
                  <h2 class="text-2xl font-light text-[#F4F2ED] tracking-wide">OB33Z Community Highlights</h2>
                  <p class="text-sm text-[#F4F2ED99]/60 mt-1 flex flex-col sm:flex-row sm:items-center gap-3">
                    <span>Hosted by Emma R.</span> <span class="flex items-center gap-3"><span class="w-1.5 h-1.5 bg-[#F4F2ED99]/60 rounded-full"></span> Started 12 minutes ago</span>
                  </p>
                </div>
              </div>

              <div class="flex flex-wrap items-center justify-between gap-3">
                <div class="flex flex-wrap items-center gap-3 mt-5">
                  <OB33ZButton variant="ghost" class="normal-case tracking-normal px-4 py-2">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M15 9.16683V5.00016C15 4.55814 14.8244 4.13421 14.5119 3.82165C14.1993 3.50909 13.7754 3.3335 13.3334 3.3335C12.8913 3.3335 12.4674 3.50909 12.1548 3.82165C11.8423 4.13421 11.6667 4.55814 11.6667 5.00016" stroke="#C9A24D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M11.6666 8.33317V3.33317C11.6666 2.89114 11.4911 2.46722 11.1785 2.15466C10.8659 1.8421 10.442 1.6665 9.99998 1.6665C9.55795 1.6665 9.13403 1.8421 8.82147 2.15466C8.50891 2.46722 8.33331 2.89114 8.33331 3.33317V4.99984" stroke="#C9A24D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M8.33333 8.75016V5.00016C8.33333 4.55814 8.15774 4.13421 7.84518 3.82165C7.53262 3.50909 7.10869 3.3335 6.66667 3.3335C6.22464 3.3335 5.80072 3.50909 5.48816 3.82165C5.17559 4.13421 5 4.55814 5 5.00016V11.6668" stroke="#C9A24D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M15 6.66667C15 6.22464 15.1756 5.80072 15.4881 5.48816C15.8007 5.17559 16.2246 5 16.6667 5C17.1087 5 17.5326 5.17559 17.8452 5.48816C18.1577 5.80072 18.3333 6.22464 18.3333 6.66667V11.6667C18.3333 13.4348 17.6309 15.1305 16.3807 16.3807C15.1305 17.631 13.4348 18.3333 11.6667 18.3333H9.99998C7.66665 18.3333 6.24998 17.6167 5.00832 16.3833L2.00832 13.3833C1.7216 13.0658 1.56797 12.6501 1.57925 12.2225C1.59054 11.7948 1.76586 11.3878 2.06892 11.0858C2.37198 10.7838 2.77957 10.6099 3.20729 10.6002C3.63502 10.5904 4.05012 10.7455 4.36665 11.0333L5.83332 12.5" stroke="#C9A24D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Raise Hand
                  </OB33ZButton>
                  
                  <OB33ZButton
                    variant="ghost" class="normal-case tracking-normal px-4 py-2"
                  >
                    <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21.3334 17.3335L28.2974 21.9762C28.3978 22.043 28.5144 22.0813 28.6349 22.0871C28.7553 22.0928 28.8751 22.0658 28.9814 22.0089C29.0877 21.952 29.1766 21.8673 29.2386 21.7639C29.3005 21.6604 29.3333 21.5421 29.3334 21.4215V10.4935C29.3334 10.3762 29.3025 10.261 29.2437 10.1595C29.185 10.0579 29.1005 9.97369 28.9988 9.91526C28.8971 9.85682 28.7817 9.82627 28.6644 9.82666C28.5471 9.82706 28.432 9.8584 28.3307 9.91752L21.3334 14.0002" stroke="#C9A24D" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M18.6666 8H5.33329C3.86053 8 2.66663 9.19391 2.66663 10.6667V21.3333C2.66663 22.8061 3.86053 24 5.33329 24H18.6666C20.1394 24 21.3333 22.8061 21.3333 21.3333V10.6667C21.3333 9.19391 20.1394 8 18.6666 8Z" stroke="#C9A24D" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Join Video
                  </OB33ZButton>
                </div>
                <button
                  type="button"
                  class="rounded-lg bg-transparent px-4 py-2 text-[16px] text-[#F4F2ED] font-medium tracking-widest transition hover:bg-[#C9A24D]/10"
                >
                  Leave Party
                </button>
              </div>

              <div class="pt-4 border-t border-[rgba(201,162,77,0.10)] flex flex-col md:flex-row md:items-center gap-4">
                <p class="text-sm uppercase tracking-[0.16em] text-[#F4F2ED]/45">Quick reactions</p>
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
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.5 10H2.50833" stroke="#C9A24D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M2.5 15H2.50833" stroke="#C9A24D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M2.5 5H2.50833" stroke="#C9A24D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M6.66663 10H17.5" stroke="#C9A24D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M6.66663 15H17.5" stroke="#C9A24D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M6.66663 5H17.5" stroke="#C9A24D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

                <h3 class="text-lg text-[#F4F2ED] font-light tracking-wide">Up Next</h3>
              </div>
              <div class="flex flex-col gap-3">
                <div class="flex items-center gap-4">
                  <div class="w-32 aspect-16/10 rounded-xl relative">
                    <img src="/images/up-next1.jpg" class="object-cover" alt="">
                    <span class="absolute bottom-2 right-2 text-sm text-[#F4F2ED] py-0.5 px-2 bg-[#0A0A0AE5]/90 rounded-lg">45 min</span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-[16px] text-[#F4F2ED] font-light truncate">Tech Talk: Future of AI</p>
                    <p class="text-sm text-[#F4F2ED99]/60 mt-0.5">by Emma R.</p>
                  </div>
                  
                </div>

                <div class="flex items-center gap-4">
                  <div class="w-32 aspect-16/10 rounded-xl relative">
                    <img src="/images/up-next2.jpg" class="object-cover" alt="">
                    <span class="absolute bottom-2 right-2 text-sm text-[#F4F2ED] py-0.5 px-2 bg-[#0A0A0AE5]/90 rounded-lg">30 min</span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-[16px] text-[#F4F2ED] font-light truncate">Creative Showcase</p>
                    <p class="text-sm text-[#F4F2ED99]/60 mt-0.5">by James L.</p>
                  </div>
                </div>

                <div class="flex items-center gap-4">
                  <div class="w-32 aspect-16/10 rounded-xl relative">
                    <img src="/images/up-next3.jpg" class="object-cover" alt="">
                    <span class="absolute bottom-2 right-2 text-sm text-[#F4F2ED] py-0.5 px-2 bg-[#0A0A0AE5]/90 rounded-lg">30 min</span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-[16px] text-[#F4F2ED] font-light truncate">Music Performance</p>
                    <p class="text-sm text-[#F4F2ED99]/60 mt-0.5">by Sofia M.</p>
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
                <h3 class="text-lg font-light tracking-wide text-[#F4F2ED]/85">Participants</h3>
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
                  
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.03101 6.17369C0.989338 6.06143 0.989338 5.93795 1.03101 5.82569C1.43686 4.84162 2.12577 4.00021 3.01039 3.40814C3.89502 2.81607 4.93553 2.5 6.00001 2.5C7.06449 2.5 8.105 2.81607 8.98962 3.40814C9.87425 4.00021 10.5632 4.84162 10.969 5.82569C11.0107 5.93795 11.0107 6.06143 10.969 6.17369C10.5632 7.15776 9.87425 7.99917 8.98962 8.59124C8.105 9.18331 7.06449 9.49938 6.00001 9.49938C4.93553 9.49938 3.89502 9.18331 3.01039 8.59124C2.12577 7.99917 1.43686 7.15776 1.03101 6.17369Z" stroke="#5B3FD6" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M6 7.5C6.82843 7.5 7.5 6.82843 7.5 6C7.5 5.17157 6.82843 4.5 6 4.5C5.17157 4.5 4.5 5.17157 4.5 6C4.5 6.82843 5.17157 7.5 6 7.5Z" stroke="#5B3FD6" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>

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
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M6.58335 16.6664C8.17384 17.4823 10.0034 17.7033 11.7424 17.2895C13.4814 16.8758 15.0155 15.8546 16.0681 14.4099C17.1208 12.9652 17.6229 11.192 17.4838 9.40985C17.3448 7.62772 16.5738 5.95385 15.3099 4.68987C14.0459 3.42589 12.372 2.65492 10.5899 2.51589C8.80776 2.37686 7.03458 2.87892 5.58987 3.93159C4.14516 4.98425 3.12393 6.51831 2.71021 8.25731C2.29648 9.99631 2.51747 11.8259 3.33335 13.4164L1.66669 18.333L6.58335 16.6664Z" stroke="#C9A24D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <h3 class="text-lg tracking-wide text-[#F4F2ED] font-light">Live Chat</h3>
              </div>
              
              <div class="flex flex-col gap-3 text-xs text-[#F4F2ED]/70 max-h-53 overflow-y-auto pr-2 no-scrollbar">
                <div class="flex flex-col gap-1">
                  <p class="text-[#C9A24D]/85 text-sm flex items-center gap-1">Emma R. <span class="text-[#F4F2ED]/40 text-xs">8:45 PM</span></p>
                  <p class="text-sm text-[#F4F2EDCC]/80">This is amazing!</p>
                </div>
                <div class="flex flex-col gap-1">
                  <p class="text-[#C9A24D]/85 text-sm flex items-center gap-1">James L. <span class="text-[#F4F2ED]/40 text-xs">8:46 PM</span></p>
                  <p class="text-sm text-[#F4F2EDCC]/80">Love this part!</p>
                </div>
                <div class="flex flex-col gap-1">
                  <p class="text-[#C9A24D]/85 text-sm flex items-center gap-1">Sofia M. <span class="text-[#F4F2ED]/40 text-xs">8:47 PM</span></p>
                  <p class="text-sm text-[#F4F2EDCC]/80">Can’t wait to see what happens next</p>
                </div>
                <div class="flex flex-col gap-1">
                  <p class="text-[#C9A24D]/85 text-sm flex items-center gap-1">Alex K. <span class="text-[#F4F2ED]/40 text-xs">8:48 PM</span></p>
                  <p class="text-sm text-[#F4F2EDCC]/80">Best watch party ever!</p>
                </div>
              </div>

              <div class="mt-4 pt-4 border-t border-[rgba(201,162,77,0.10)]">
                <div class="flex items-center gap-2 rounded-xl border border-[rgba(201,162,77,0.16)] bg-[rgba(6,6,8,0.55)] px-3 py-2">
                  <input
                    class="flex-1 bg-transparent outline-none text-xs text-[#F4F2ED] placeholder:text-[#F4F2ED]/35"
                    placeholder="Type a message..."
                    type="text"
                  />
                  <button type="button" class="text-xs text-[#C9A24D] hover:text-[#F4F2ED]">Send</button>
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
type Participant = {
  id: string;
  name: string;
  initials: string;
  isOnline: boolean;
};

const participants: Participant[] = [
  { id: "emma-r", name: "Emma R", initials: "ER", isOnline: true },
  { id: "james-l", name: "James L", initials: "JL", isOnline: true },
  { id: "sofia-m", name: "Sofia M", initials: "SM", isOnline: true },
  { id: "alex-k", name: "Alex K", initials: "AK", isOnline: false },
  { id: "mike-k", name: "Mike K", initials: "MK", isOnline: false },
  { id: "chris-d", name: "Chris D", initials: "CD", isOnline: false },
];
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