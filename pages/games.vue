<template>
  <div class="relative min-h-screen p-4 md:p-6">
    <LevelNavigation />

    <div class="relative max-w-7xl mx-auto">
      <div v-if="!activeTable" class="flex flex-col gap-4">
        <div class="opacity-0 translate-y-6 animate-delay-md text-center mb-8 flex flex-col items-center gap-3">
          <div class="flex items-center gap-3">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M10 18.3335H16.6667" stroke="#C9A24D" stroke-width="3.33333" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M13.3334 15V21.6667" stroke="#C9A24D" stroke-width="3.33333" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M25 20H25.0167" stroke="#C9A24D" stroke-width="3.33333" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M30 16.6665H30.0167" stroke="#C9A24D" stroke-width="3.33333" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M28.8667 8.3335H11.1334C9.48384 8.33388 7.89302 8.94579 6.66843 10.0509C5.44384 11.1561 4.67245 12.676 4.50337 14.3168C4.49337 14.4035 4.48671 14.4852 4.47504 14.5702C4.34004 15.6935 3.33337 24.0935 3.33337 26.6668C3.33337 27.9929 3.86016 29.2647 4.79784 30.2024C5.73552 31.14 7.00729 31.6668 8.33337 31.6668C10 31.6668 10.8334 30.8335 11.6667 30.0002L14.0234 27.6435C14.6483 27.0183 15.4961 26.667 16.38 26.6668H23.62C24.504 26.667 25.3517 27.0183 25.9767 27.6435L28.3334 30.0002C29.1667 30.8335 30 31.6668 31.6667 31.6668C32.9928 31.6668 34.2646 31.14 35.2022 30.2024C36.1399 29.2647 36.6667 27.9929 36.6667 26.6668C36.6667 24.0918 35.66 15.6935 35.525 14.5702C35.5134 14.4868 35.5067 14.4035 35.4967 14.3185C35.328 12.6773 34.5568 11.157 33.3322 10.0516C32.1075 8.94606 30.5165 8.33392 28.8667 8.3335Z" stroke="#C9A24D" stroke-width="3.33333" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <h1 class="text-4xl text-[#C9A24D] font-light">Game Lounge</h1>
          </div>
          <p class="text-[16px] text-[#F4F2ED99]/60 max-w-78.25 md:max-w-3xl">
            Join social games with friends and community members. Choose your game and start playing!
          </p>
        </div>
    
        <div class="border border-[#C9A24D26] rounded-xl p-4 md:p-6 md:mb-6">
          <h2 class="text-[#F4F2ED] font-light text-lg mb-4">Choose Your Game</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div
              v-for="game in games"
              :key="game.name"
              class="rounded-lg border border-[rgba(201,162,77,0.12)] bg-[rgba(10,10,10,0.35)] p-4 md:p-6 flex flex-col"
            >
              <div class="flex flex-col gap-4">
                <svg v-if="game.icon === 'uno'" width="64" height="64" viewBox="0 0 64 64" fill="none">
                    <path d="M0 32C0 14.3269 14.3269 0 32 0C49.6731 0 64 14.3269 64 32C64 49.6731 49.6731 64 32 64C14.3269 64 0 49.6731 0 32Z" fill="url(#paint0_linear_254_248)"/>
                    <path d="M29.2493 36.6668C29.1303 36.2054 28.8898 35.7843 28.5528 35.4473C28.2159 35.1104 27.7948 34.8699 27.3333 34.7508L19.1533 32.6415C19.0138 32.6019 18.8909 32.5178 18.8035 32.4021C18.716 32.2864 18.6687 32.1452 18.6687 32.0002C18.6687 31.8551 18.716 31.714 18.8035 31.5982C18.8909 31.4825 19.0138 31.3984 19.1533 31.3588L27.3333 29.2482C27.7946 29.1292 28.2156 28.8889 28.5525 28.5522C28.8895 28.2155 29.1301 27.7947 29.2493 27.3335L31.3587 19.1535C31.3979 19.0134 31.4818 18.89 31.5978 18.802C31.7137 18.7141 31.8552 18.6665 32.0007 18.6665C32.1462 18.6665 32.2877 18.7141 32.4036 18.802C32.5195 18.89 32.6035 19.0134 32.6427 19.1535L34.7507 27.3335C34.8697 27.7949 35.1102 28.216 35.4472 28.553C35.7841 28.89 36.2052 29.1305 36.6667 29.2495L44.8467 31.3575C44.9873 31.3963 45.1114 31.4802 45.1998 31.5963C45.2882 31.7124 45.3361 31.8543 45.3361 32.0002C45.3361 32.1461 45.2882 32.288 45.1998 32.4041C45.1114 32.5202 44.9873 32.604 44.8467 32.6428L36.6667 34.7508C36.2052 34.8699 35.7841 35.1104 35.4472 35.4473C35.1102 35.7843 34.8697 36.2054 34.7507 36.6668L32.6413 44.8468C32.6021 44.9869 32.5182 45.1104 32.4022 45.1983C32.2863 45.2862 32.1448 45.3338 31.9993 45.3338C31.8538 45.3338 31.7123 45.2862 31.5964 45.1983C31.4805 45.1104 31.3965 44.9869 31.3573 44.8468L29.2493 36.6668Z" stroke="#C9A24D" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M42.6666 20V25.3333" stroke="#C9A24D" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M45.3333 22.6665H40" stroke="#C9A24D" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M21.3334 38.6665V41.3332" stroke="#C9A24D" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M22.6667 40H20" stroke="#C9A24D" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
                    <defs>
                    <linearGradient id="paint0_linear_254_248" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#C9A24D" stop-opacity="0.2"/>
                    <stop offset="1" stop-color="#5B3FD6" stop-opacity="0.2"/>
                    </linearGradient>
                    </defs>
                </svg>
                <svg v-else-if="game.icon === 'dominoes'" width="64" height="64" viewBox="0 0 64 64" fill="none">
                    <path d="M0 32C0 14.3269 14.3269 0 32 0C49.6731 0 64 14.3269 64 32C64 49.6731 49.6731 64 32 64C14.3269 64 0 49.6731 0 32Z" fill="url(#paint0_linear_254_274)"/>
                    <path d="M24 28.0002H22C21.1159 28.0002 20.2681 27.649 19.6429 27.0239C19.0178 26.3987 18.6666 25.5509 18.6666 24.6668C18.6666 23.7828 19.0178 22.9349 19.6429 22.3098C20.2681 21.6847 21.1159 21.3335 22 21.3335H24" stroke="#5B3FD6" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M40 28.0002H42C42.8841 28.0002 43.7319 27.649 44.357 27.0239C44.9821 26.3987 45.3333 25.5509 45.3333 24.6668C45.3333 23.7828 44.9821 22.9349 44.357 22.3098C43.7319 21.6847 42.8841 21.3335 42 21.3335H40" stroke="#5B3FD6" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M21.3334 45.3335H42.6667" stroke="#5B3FD6" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M29.3334 35.5469V38.6669C29.3334 39.4002 28.7067 39.9735 28.04 40.2802C26.4667 41.0002 25.3334 42.9869 25.3334 45.3335" stroke="#5B3FD6" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M34.6666 35.5469V38.6669C34.6666 39.4002 35.2933 39.9735 35.96 40.2802C37.5333 41.0002 38.6666 42.9869 38.6666 45.3335" stroke="#5B3FD6" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M40 18.6665H24V27.9998C24 30.1216 24.8429 32.1564 26.3431 33.6567C27.8434 35.157 29.8783 35.9998 32 35.9998C34.1217 35.9998 36.1566 35.157 37.6569 33.6567C39.1571 32.1564 40 30.1216 40 27.9998V18.6665Z" stroke="#5B3FD6" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
                    <defs>
                    <linearGradient id="paint0_linear_254_274" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#C9A24D" stop-opacity="0.2"/>
                    <stop offset="1" stop-color="#5B3FD6" stop-opacity="0.2"/>
                    </linearGradient>
                    </defs>
                </svg>
                <svg v-else-if="game.icon === 'trivia'" width="64" height="64" viewBox="0 0 64 64" fill="none">
                    <path d="M0 32C0 14.3269 14.3269 0 32 0C49.6731 0 64 14.3269 64 32C64 49.6731 49.6731 64 32 64C14.3269 64 0 49.6731 0 32Z" fill="url(#paint0_linear_254_301)"/>
                    <path d="M31.3666 19.0602C31.4251 18.9421 31.5153 18.8428 31.6272 18.7733C31.7392 18.7038 31.8683 18.667 32 18.667C32.1317 18.667 32.2608 18.7038 32.3727 18.7733C32.4846 18.8428 32.5749 18.9421 32.6333 19.0602L35.7133 25.2989C35.9162 25.7095 36.2157 26.0647 36.5861 26.3341C36.9566 26.6035 37.3868 26.779 37.84 26.8455L44.728 27.8535C44.8585 27.8724 44.9811 27.9275 45.082 28.0124C45.1828 28.0974 45.2579 28.2089 45.2987 28.3343C45.3395 28.4597 45.3443 28.5941 45.3128 28.7221C45.2812 28.8501 45.2144 28.9668 45.12 29.0589L40.1386 33.9095C39.8101 34.2297 39.5643 34.6248 39.4224 35.061C39.2805 35.4972 39.2467 35.9614 39.324 36.4135L40.5 43.2669C40.523 43.3973 40.5089 43.5316 40.4593 43.6544C40.4097 43.7773 40.3266 43.8837 40.2194 43.9615C40.1122 44.0394 39.9853 44.0855 39.8531 44.0947C39.721 44.1039 39.5889 44.0758 39.472 44.0135L33.3146 40.7762C32.9089 40.5632 32.4576 40.4519 31.9993 40.4519C31.5411 40.4519 31.0897 40.5632 30.684 40.7762L24.528 44.0135C24.4111 44.0754 24.2792 44.1032 24.1472 44.0939C24.0153 44.0845 23.8887 44.0383 23.7817 43.9605C23.6747 43.8827 23.5918 43.7764 23.5422 43.6538C23.4926 43.5312 23.4785 43.3971 23.5013 43.2669L24.676 36.4149C24.7536 35.9625 24.72 35.498 24.578 35.0616C24.4361 34.6251 24.1901 34.2297 23.8613 33.9095L18.88 29.0602C18.7848 28.9682 18.7173 28.8514 18.6853 28.7229C18.6532 28.5945 18.6579 28.4597 18.6988 28.3338C18.7396 28.2079 18.815 28.096 18.9163 28.0108C19.0177 27.9257 19.1409 27.8707 19.272 27.8522L26.1586 26.8455C26.6123 26.7795 27.0432 26.6043 27.4141 26.3348C27.785 26.0654 28.0849 25.7099 28.288 25.2989L31.3666 19.0602Z" stroke="#C9A24D" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
                    <defs>
                    <linearGradient id="paint0_linear_254_301" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#C9A24D" stop-opacity="0.2"/>
                    <stop offset="1" stop-color="#5B3FD6" stop-opacity="0.2"/>
                    </linearGradient>
                    </defs>
                </svg>
                <svg v-else-if="game.icon === 'pictionary'" width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 32C0 14.3269 14.3269 0 32 0C49.6731 0 64 14.3269 64 32C64 49.6731 49.6731 64 32 64C14.3269 64 0 49.6731 0 32Z" fill="url(#paint0_linear_254_323)"/>
                    <path d="M29.2493 36.6668C29.1303 36.2054 28.8898 35.7843 28.5528 35.4473C28.2159 35.1104 27.7948 34.8699 27.3333 34.7508L19.1533 32.6415C19.0138 32.6019 18.8909 32.5178 18.8035 32.4021C18.716 32.2864 18.6687 32.1452 18.6687 32.0002C18.6687 31.8551 18.716 31.714 18.8035 31.5982C18.8909 31.4825 19.0138 31.3984 19.1533 31.3588L27.3333 29.2482C27.7946 29.1292 28.2156 28.8889 28.5525 28.5522C28.8895 28.2155 29.1301 27.7947 29.2493 27.3335L31.3587 19.1535C31.3979 19.0134 31.4818 18.89 31.5978 18.802C31.7137 18.7141 31.8552 18.6665 32.0007 18.6665C32.1462 18.6665 32.2877 18.7141 32.4036 18.802C32.5195 18.89 32.6035 19.0134 32.6427 19.1535L34.7507 27.3335C34.8697 27.7949 35.1102 28.216 35.4472 28.553C35.7841 28.89 36.2052 29.1305 36.6667 29.2495L44.8467 31.3575C44.9873 31.3963 45.1114 31.4802 45.1998 31.5963C45.2882 31.7124 45.3361 31.8543 45.3361 32.0002C45.3361 32.1461 45.2882 32.288 45.1998 32.4041C45.1114 32.5202 44.9873 32.604 44.8467 32.6428L36.6667 34.7508C36.2052 34.8699 35.7841 35.1104 35.4472 35.4473C35.1102 35.7843 34.8697 36.2054 34.7507 36.6668L32.6413 44.8468C32.6021 44.9869 32.5182 45.1104 32.4022 45.1983C32.2863 45.2862 32.1448 45.3338 31.9993 45.3338C31.8538 45.3338 31.7123 45.2862 31.5964 45.1983C31.4805 45.1104 31.3965 44.9869 31.3573 44.8468L29.2493 36.6668Z" stroke="#5B3FD6" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M42.6667 20V25.3333" stroke="#5B3FD6" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M45.3333 22.6665H40" stroke="#5B3FD6" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M21.3333 38.6665V41.3332" stroke="#5B3FD6" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M22.6667 40H20" stroke="#5B3FD6" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
                    <defs>
                    <linearGradient id="paint0_linear_254_323" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#C9A24D" stop-opacity="0.2"/>
                    <stop offset="1" stop-color="#5B3FD6" stop-opacity="0.2"/>
                    </linearGradient>
                    </defs>
                </svg>
                <div>
                  <h3 class="text-[#F4F2ED] text-xl font-light mb-2">{{ game.name }}</h3>
                  <p class="text-sm text-[#F4F2ED99]/60">{{ game.description }}</p>
                </div>
                <div class="flex items-center justify-between text-[#F4F2ED99]/60 text-sm">
                    <div class="flex gap-2 items-center">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M10.6667 14V12.6667C10.6667 11.9594 10.3858 11.2811 9.88566 10.781C9.38556 10.281 8.70728 10 8.00004 10H4.00004C3.2928 10 2.61452 10.281 2.11442 10.781C1.61433 11.2811 1.33337 11.9594 1.33337 12.6667V14" stroke="#F4F2ED" stroke-opacity="0.6" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M6.00004 7.33333C7.4728 7.33333 8.66671 6.13943 8.66671 4.66667C8.66671 3.19391 7.4728 2 6.00004 2C4.52728 2 3.33337 3.19391 3.33337 4.66667C3.33337 6.13943 4.52728 7.33333 6.00004 7.33333Z" stroke="#F4F2ED" stroke-opacity="0.6" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M14.6666 13.9998V12.6664C14.6662 12.0756 14.4695 11.5016 14.1075 11.0346C13.7455 10.5677 13.2387 10.2341 12.6666 10.0864" stroke="#F4F2ED" stroke-opacity="0.6" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M10.6666 2.08643C11.2402 2.23329 11.7487 2.56689 12.1117 3.03463C12.4748 3.50237 12.6719 4.07765 12.6719 4.66976C12.6719 5.26187 12.4748 5.83715 12.1117 6.30489C11.7487 6.77262 11.2402 7.10623 10.6666 7.25309" stroke="#F4F2ED" stroke-opacity="0.6" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
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
          <h2 class="text-[#C9A24D] font-light text-lg">How to Play</h2>
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
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M9.99999 15.8332L4.16666 9.99984L9.99999 4.1665" stroke="#C9A24D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M15.8333 10H4.16666" stroke="#C9A24D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>Back to Games</span>
            </button>
            <div style="width:18px; height:10px; border-radius:4px" class="bg-[#C9A24D1A]/10 border border-[#C9A24D4D]/30"></div>
        </div>

        <div class="text-center">
          <h2 class="text-[#F4F2ED] text-3xl font-light mb-1">{{ activeTable.name }}</h2>
          <p class="text-[16px] text-[#F4F2ED99]/60">{{ activeTable.description }}</p>
        </div>

        <div class="game-table-layout grid grid-cols-1 gap-4 md:gap-6 md:min-w-0">
            <div>
                <div class="min-w-0 border border-[rgba(201,162,77,0.2)] rounded-xl p-4 md:p-6 flex flex-col gap-4">
                    <div class="flex justify-between items-center">
                        <h3 class="text-[#F4F2ED] mb-3 text-lg">Players</h3>
                        <div style="width:18px; height:10px; border-radius:4px" class="bg-[#C9A24D1A]/10 border border-[#C9A24D4D]/30"></div>
                    </div>
                    <div class="flex flex-col gap-3">
                    <div v-for="p in tablePlayers" :key="p.name" class="flex items-center gap-3 px-3">
                        <div class="w-10 h-10 bg-[#C9A24D1A]/10 border border-[#C9A24D4D]/30 rounded-full text-sm flex items-center justify-center text-[#F4F2ED99]/60">
                        {{ p.initials }}
                        </div>
                        <div>
                            <div class="flex items-center gap-2">
                                <p class="text-sm text-[#F4F2ED]">{{ p.name }}</p>
                                <svg v-if="p.owner" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M7.70802 2.17745C7.73679 2.12518 7.77907 2.0816 7.83043 2.05125C7.88179 2.02089 7.94036 2.00488 8.00002 2.00488C8.05968 2.00488 8.11825 2.02089 8.16961 2.05125C8.22097 2.0816 8.26324 2.12518 8.29202 2.17745L10.26 5.91345C10.3069 5.99995 10.3725 6.075 10.4518 6.13319C10.5312 6.19138 10.6225 6.23128 10.7191 6.25002C10.8157 6.26876 10.9153 6.26587 11.0106 6.24156C11.106 6.21726 11.1948 6.17214 11.2707 6.10945L14.122 3.66678C14.1768 3.62226 14.2442 3.59626 14.3147 3.59251C14.3851 3.58877 14.4549 3.60748 14.5141 3.64594C14.5732 3.68441 14.6186 3.74065 14.6438 3.80657C14.6689 3.87249 14.6725 3.94469 14.654 4.01278L12.7647 10.8434C12.7261 10.9832 12.643 11.1066 12.528 11.1949C12.413 11.2832 12.2723 11.3316 12.1274 11.3328H3.87335C3.72824 11.3318 3.58742 11.2834 3.47228 11.1951C3.35713 11.1068 3.27395 10.9833 3.23535 10.8434L1.34668 4.01345C1.32819 3.94536 1.33177 3.87316 1.35691 3.80724C1.38206 3.74132 1.42747 3.68508 1.48662 3.64661C1.54576 3.60814 1.61559 3.58944 1.68604 3.59318C1.7565 3.59692 1.82395 3.62293 1.87868 3.66745L4.72935 6.11011C4.80522 6.17281 4.89402 6.21793 4.98939 6.24223C5.08476 6.26654 5.18433 6.26942 5.28095 6.25069C5.37757 6.23195 5.46884 6.19205 5.54821 6.13386C5.62758 6.07567 5.69309 6.00062 5.74002 5.91411L7.70802 2.17745Z" stroke="#C9A24D" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M3.33331 14H12.6666" stroke="#C9A24D" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                            <p class="text-xs text-[#5B3FD6]">{{ p.ready ? "Ready" : "" }}</p>
                        </div>
                    </div>
                    </div>
                    <div class="border-t border-[rgba(201,162,77,0.15)] pt-3">
                        <button class="w-full normal-case tracking-normal flex items-center gap-2 justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M10.6666 14V12.6667C10.6666 11.9594 10.3857 11.2811 9.8856 10.781C9.3855 10.281 8.70722 10 7.99998 10H3.99998C3.29274 10 2.61446 10.281 2.11436 10.781C1.61426 11.2811 1.33331 11.9594 1.33331 12.6667V14" stroke="#F4F2ED" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M5.99998 7.33333C7.47274 7.33333 8.66665 6.13943 8.66665 4.66667C8.66665 3.19391 7.47274 2 5.99998 2C4.52722 2 3.33331 3.19391 3.33331 4.66667C3.33331 6.13943 4.52722 7.33333 5.99998 7.33333Z" stroke="#F4F2ED" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M14.6667 13.9998V12.6664C14.6662 12.0756 14.4696 11.5016 14.1076 11.0346C13.7456 10.5677 13.2388 10.2341 12.6667 10.0864" stroke="#F4F2ED" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M10.6667 2.08643C11.2403 2.23329 11.7487 2.56689 12.1118 3.03463C12.4748 3.50237 12.6719 4.07765 12.6719 4.66976C12.6719 5.26187 12.4748 5.83715 12.1118 6.30489C11.7487 6.77262 11.2403 7.10623 10.6667 7.25309" stroke="#F4F2ED" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            Invite Players
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="border border-[rgba(201,162,77,0.2)] rounded-xl p-4 md:p-8">
                <div class="flex items-center justify-center rounded-lg border border-[rgba(201,162,77,0.14)] bg-[rgba(10,10,10,0.35)]" style="min-height:548px">
                    <div class="flex items-center justify-center flex-col">
                        <svg class="w-10 h-10 text-[#C9A24D] mb-3 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 12h.01M10 12h.01M14 12h.01M18 12h.01M7 16h10a2 2 0 002-2V8a2 2 0 00-2-2H7a2 2 0 00-2 2v6a2 2 0 002 2z" />
                        </svg>
                        <p class="text-[#F4F2ED]/60 mb-2">Waiting for all players to be ready...</p>
                        <p class="text-[#F4F2ED] text-lg">2 / 4 Ready</p>
                    </div>
                </div>
                <div class="grid grid-cols-3 gap-2 mt-3">
                    <div class="text-center rounded-md p-2">
                        <p class="text-xs text-[#F4F2ED99]/60">Round</p>
                        <p class="text-[16px] text-[#C9A24D]">-</p>
                    </div>
                    <div class="text-center rounded-md p-2">
                        <p class="text-xs text-[#F4F2ED99]/60">Turn</p>
                        <p class="text-[16px] text-[#C9A24D]">Waiting</p>
                    </div>
                    <div class="text-center rounded-md p-2">
                        <p class="text-xs text-[#F4F2ED99]/60">Timer</p>
                        <p class="text-[16px] text-[#C9A24D]">--:--</p>
                    </div>
                </div>
            </div>

            <div class="border border-[rgba(201,162,77,0.2)] rounded-xl p-4 md:p-6 flex flex-col gap-4">
                <h3 class="text-[#F4F2ED] text-lg flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M6.58329 16.6669C8.17377 17.4827 10.0034 17.7037 11.7424 17.29C13.4814 16.8763 15.0154 15.8551 16.0681 14.4104C17.1208 12.9656 17.6228 11.1925 17.4838 9.41034C17.3447 7.62821 16.5738 5.95434 15.3098 4.69036C14.0458 3.42638 12.3719 2.65541 10.5898 2.51638C8.8077 2.37735 7.03452 2.87941 5.58981 3.93207C4.1451 4.98474 3.12387 6.51879 2.71014 8.2578C2.29642 9.9968 2.51741 11.8264 3.33329 13.4169L1.66663 18.3335L6.58329 16.6669Z" stroke="#C9A24D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Live Chat
                </h3>
                <div class="flex-1" style="min-height:244px">
                    <div class="text-xs text-[#F4F2EDCC]/0 flex flex-col gap-3">
                        <p class="flex flex-col gap-1 text-sm">
                            <span>
                                <span class="text-[#C9A24D]">Sarah M:</span><span class="text-xs text-[#F4F2ED66]/40 ml-1">2:45 PM</span>
                            </span>
                            <span>Ready to play!</span>
                        </p>
                        <p class="flex flex-col gap-1 text-sm">
                            <span>
                                <span class="text-[#C9A24D]">Mike R:</span><span class="text-xs text-[#F4F2ED66]/40 ml-1">2:45 PM</span>
                            </span>
                            <span>Let's go!</span>
                        </p>
                        <p class="flex flex-col gap-1 text-sm">
                            <span>
                                <span class="text-[#C9A24D]">Alex K:</span><span class="text-xs text-[#F4F2ED66]/40 ml-1">2:45 PM</span>
                            </span>
                            <span>Give me a sec</span>
                        </p>
                    </div>
                </div>
                <OB33ZInput v-model="chatMessage" placeholder="Type a message..." />
                <div class="flex gap-3 pt-4 text-[#C9A24D]">
                    <button type="button" class="hover:text-[#F4F2ED] transition-colors py-2 px-4">👍</button>
                    <button type="button" class="hover:text-[#F4F2ED] transition-colors py-2 px-4">⚡</button>
                    <button type="button" class="hover:text-[#F4F2ED] transition-colors py-2 px-4">🔥</button>
                </div>
            </div>
        </div>

        <div class="border border-[rgba(201,162,77,0.2)] rounded-xl p-4 md:p-6 flex items-center justify-between">
            <OB33ZButton variant="ghost" class="normal-case tracking-normal px-4 py-2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M15 9.16683V5.00016C15 4.55814 14.8244 4.13421 14.5119 3.82165C14.1993 3.50909 13.7754 3.3335 13.3334 3.3335C12.8913 3.3335 12.4674 3.50909 12.1548 3.82165C11.8423 4.13421 11.6667 4.55814 11.6667 5.00016" stroke="#C9A24D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M11.6666 8.33317V3.33317C11.6666 2.89114 11.4911 2.46722 11.1785 2.15466C10.8659 1.8421 10.442 1.6665 9.99998 1.6665C9.55795 1.6665 9.13403 1.8421 8.82147 2.15466C8.50891 2.46722 8.33331 2.89114 8.33331 3.33317V4.99984" stroke="#C9A24D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M8.33333 8.75016V5.00016C8.33333 4.55814 8.15774 4.13421 7.84518 3.82165C7.53262 3.50909 7.10869 3.3335 6.66667 3.3335C6.22464 3.3335 5.80072 3.50909 5.48816 3.82165C5.17559 4.13421 5 4.55814 5 5.00016V11.6668" stroke="#C9A24D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M15 6.66667C15 6.22464 15.1756 5.80072 15.4881 5.48816C15.8007 5.17559 16.2246 5 16.6667 5C17.1087 5 17.5326 5.17559 17.8452 5.48816C18.1577 5.80072 18.3333 6.22464 18.3333 6.66667V11.6667C18.3333 13.4348 17.6309 15.1305 16.3807 16.3807C15.1305 17.631 13.4348 18.3333 11.6667 18.3333H9.99998C7.66665 18.3333 6.24998 17.6167 5.00832 16.3833L2.00832 13.3833C1.7216 13.0658 1.56797 12.6501 1.57925 12.2225C1.59054 11.7948 1.76586 11.3878 2.06892 11.0858C2.37198 10.7838 2.77957 10.6099 3.20729 10.6002C3.63502 10.5904 4.05012 10.7455 4.36665 11.0333L5.83332 12.5" stroke="#C9A24D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Mark Ready
            </OB33ZButton>
          <button type="button" class="text-[#F4F2ED] hover:text-red-400 text-[16px] transition-colors px-6 py-3" @click="leaveTable">
            Leave Table
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

type Game = {
  name: string;
  description: string;
  players: string;
  icon: string;
};

const games: Game[] = [
  { name: "UNO", description: "Classic card game of colors and numbers", players: "2-4 players", icon: "uno" },
  { name: "Dominoes", description: "Traditional tile-based strategy game", players: "2-4 players", icon: "dominoes" },
  { name: "Trivia", description: "Test your knowledge across various topics", players: "2-8 players", icon: "trivia" },
  { name: "Pictionary", description: "Draw and guess in this creative party game", players: "2-8 players", icon: "pictionary" },
];

const steps = [
  { id: 1, title: "Select a Game", text: "Choose from UNO, Dominoes, Trivia, or Pictionary." },
  { id: 2, title: "Join or Create Table", text: "Join an active table or start a new one." },
  { id: 3, title: "Play & Have Fun", text: "Chat with players and enjoy the game together." },
];

const activeTable = ref<Game | null>(null);
const chatMessage = ref("");
const tablePlayers = [
  { name: "Sarah M.", initials: "SM", ready: true, owner: true },
  { name: "Mike R.", initials: "MR", ready: true, owner: false },
  { name: "Alex K.", initials: "AK", ready: false, owner: false },
  { name: "You", initials: "YO", ready: false, owner: false },
];

const joinTable = (game: Game) => {
  activeTable.value = game;
};

const leaveTable = () => {
  activeTable.value = null;
  chatMessage.value = "";
};
</script>

<style scoped>
@media (min-width: 768px) {
  .game-table-layout {
    grid-template-columns: 1fr 2fr 1fr;
  }
}
</style>