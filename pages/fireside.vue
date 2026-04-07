<template>
  <div class="relative min-h-screen p-4 md:p-6">
    <LevelNavigation />
    <LiveCounter />
    <!-- <MusicToggle /> -->

    <!-- Ambient background glow -->
    <div class="fixed inset-0 pointer-events-none">
      <div
        class="absolute top-1/3 left-1/3 w-105 h-105 bg-[#5B3FD6] opacity-[0.08] blur-[140px] rounded-full"
      />
      <div
        class="absolute bottom-1/4 right-1/4 w-105 h-105 bg-[#C9A24D] opacity-[0.06] blur-[140px] rounded-full"
      />
    </div>

    <div class="relative max-w-7xl mx-auto pt-2 pb-4 md:py-8 md:px-4">
      <!-- Header -->
      <div
        class="opacity-0 translate-y-6 animate-delay-md text-center mb-8 flex flex-col items-center gap-3"
      >
        <div class="flex items-center gap-3">
          <FiresideIcon class="lucide lucide-flame w-10 h-10 text-[#C9A24D]" />
          <h1 class="text-4xl text-[#C9A24D] font-light">
            {{ t("firesides.fireside") }}
          </h1>
        </div>
        <p class="text-[16px] text-[#F4F2ED99]/60 max-w-78.25 md:max-w-3xl">
          {{ t("firesides.desc") }}
        </p>
      </div>

      <!-- Topic tabs -->
      <div class="bg-[rgba(11,11,13,0.6)] backdrop-blur-sm border border-[rgba(201,162,77,0.15)] rounded-lg p-6 mb-8 opacity-0 translate-y-4 animate-delay-sm">
        <h3 class="text-lg font-light text-[#F4F2ED] mb-4">{{ t("firesides.topic") }}</h3>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <button 
            v-for="topic in topics"
            :key="topic.id"
            data-observer-allow="true"
            @click="selectedTopic = topic.id" 
            :class="[
              'flex-1 flex flex-col items-center justify-center p-4 rounded-lg border transition-all',
              selectedTopic === topic.id
                ? 'bg-[rgba(201,162,77,0.16)] border-[#C9A24D] shadow-[0_0_12px_rgba(201,162,77,0.35)]'
                : 'bg-[rgba(11,11,13,0.9)] border-[rgba(201,162,77,0.2)] hover:border-[rgba(201,162,77,0.35)]',
            ]"
          >
            <div class="mb-2">
              <FiresideSparkleIcon v-if="topic.id == 'open'" class="mx-auto" style="color: rgb(201, 162, 77);" />
              <FiresidePhilosophyIcon v-if="topic.id == 'philosophy'" class="mx-auto" style="color: rgb(91, 63, 214);" />
              <FiresideArtsIcon v-if="topic.id == 'arts'" class="mx-auto" style="color: rgb(201, 162, 77);" />
              <FiresideTechnologyIcon v-if="topic.id == 'technology'" class="mx-auto" style="color: rgb(91, 63, 214);" />
              <FiresideLifeStoriesIcon v-if="topic.id == 'lifeStories'" class="mx-auto" style="color: rgb(201, 162, 77);" />
              <FiresideWellnessIcon v-if="topic.id == 'wellness'" class="mx-auto" style="color: rgb(91, 63, 214);" />
            </div>
            <div class="text-[#F4F2ED] text-sm font-medium text-center">{{ topic.label }}</div>
          </button>
          
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="lg:col-span-2 space-y-6">
            <div>
              <div class="opacity-0 translate-y-4 animate-fade-left bg-[rgba(11,11,13,0.6)] backdrop-blur-sm border border-[rgba(201,162,77,0.15)] rounded-lg p-8">
                <div class="absolute inset-0 pointer-events-none">
                  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#C9A24D] opacity-5 blur-[100px] rounded-full" style="transform: scale(1.08113);"></div>
                </div>
                    <div class="relative space-y-6">
                  <div class="text-center space-y-3">
                    <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#C9A24D]/20 mb-2">
                      <FiresideSparkleIcon v-if="currentTopic.id == 'open'" class="mx-auto" style="color: rgb(201, 162, 77);" />
                      <FiresidePhilosophyIcon v-if="currentTopic.id == 'philosophy'" class="mx-auto" style="color: rgb(91, 63, 214);" />
                      <FiresideArtsIcon v-if="currentTopic.id == 'arts'" class="mx-auto" style="color: rgb(201, 162, 77);" />
                      <FiresideTechnologyIcon v-if="currentTopic.id == 'technology'" class="mx-auto" style="color: rgb(91, 63, 214);" />
                      <FiresideLifeStoriesIcon v-if="currentTopic.id == 'lifeStories'" class="mx-auto" style="color: rgb(201, 162, 77);" />
                      <FiresideWellnessIcon v-if="currentTopic.id == 'wellness'" class="mx-auto" style="color: rgb(91, 63, 214);" />
                    </div>
                    <h2 class="text-2xl font-light text-[#F4F2ED]">{{ currentTopic.label }}</h2>
                    <p class="text-[#F4F2ED]/60 text-sm">{{ currentTopic.description }}</p>
                  </div>
                  <div class="grid grid-cols-3 gap-4 py-8">
                    <div class="text-center opacity-0 translate-y-4 animate-delay-sm">
                      <div class="relative inline-block mb-2 ring-2 ring-[#C9A24D] ring-offset-2 ring-offset-[#0A0A0A] rounded-full">
                        <div class="w-16 h-16 rounded-full bg-linear-to-br flex items-center justify-center text-[#F4F2ED] from-[#C9A24D] to-[#5B3FD6]">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users w-6 h-6"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                        </div>
                        <div class="absolute -bottom-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center" style="transform: scale(1.01483);">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mic w-3 h-3 text-white"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" x2="12" y1="19" y2="22"></line></svg>
                        </div>
                      </div>
                      <div class="space-y-1">
                        <div class="text-[#F4F2ED] text-sm font-light">Emma R.</div>
                        <div class="flex items-center justify-center gap-1">
                          <div class="px-2 py-1 rounded bg-[rgba(201,162,77,0.1)] text-[#C9A24D] border border-[rgba(201,162,77,0.3)] text-xs"></div>
                        </div>
                      </div>
                    </div>
                    <div class="text-center opacity-0 translate-y-4 animate-delay-md">
                      <div class="relative inline-block mb-2 ">
                        <div class="w-16 h-16 rounded-full bg-linear-to-br flex items-center justify-center text-[#F4F2ED] from-[#5B3FD6] to-[#C9A24D]">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users w-6 h-6"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                        </div>
                      </div>
                      <div class="space-y-1">
                        <div class="text-[#F4F2ED] text-sm font-light">James L.</div>
                        <div class="flex items-center justify-center gap-1">
                          <div class="px-2 py-1 rounded bg-[rgba(201,162,77,0.1)] text-[#C9A24D] border border-[rgba(201,162,77,0.3)] text-xs"></div>
                        </div>
                      </div>
                    </div>
                    <div class="text-center opacity-0 translate-y-4 animate-delay-lg">
                      <div class="relative inline-block mb-2">
                        <div class="w-16 h-16 rounded-full bg-linear-to-br flex items-center justify-center text-[#F4F2ED] from-[#5B3FD6] to-[#C9A24D]">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users w-6 h-6"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                        </div>
                    </div>
                    <div class="space-y-1">
                      <div class="text-[#F4F2ED] text-sm font-light">Sofia M.</div>
                      <div class="flex items-center justify-center gap-1">
                        <div class="px-2 py-1 rounded bg-[rgba(201,162,77,0.1)] text-[#C9A24D] border border-[rgba(201,162,77,0.3)] text-xs"></div>
                      </div>
                    </div>
                  </div>
                  <div class="text-center opacity-0 translate-y-4 animate-delay-xl">
                    <div class="relative inline-block mb-2">
                      <div class="w-16 h-16 rounded-full bg-linear-to-br flex items-center justify-center text-[#F4F2ED] from-[#0A0A0A] to-[#1A1A1A] border border-[#C9A24D]/20">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users w-6 h-6"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                      </div>
                    </div>
                    <div class="space-y-1">
                      <div class="text-[#F4F2ED] text-sm font-light"  >Alex K.</div>
                      <div class="flex items-center justify-center gap-1">
                        <div class="px-2 py-1 rounded bg-[rgba(201,162,77,0.1)] text-[#C9A24D] border border-[rgba(201,162,77,0.3)] text-xs"></div>
                      </div>
                    </div>
                  </div>
                  <div class="text-center opacity-0 translate-y-4 animate-delay-2xl">
                    <div class="relative inline-block mb-2">
                      <div class="w-16 h-16 rounded-full bg-linear-to-br flex items-center justify-center text-[#F4F2ED] from-[#0A0A0A] to-[#1A1A1A] border border-[#C9A24D]/20">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users w-6 h-6"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                      </div>
                    </div>
                    <div class="space-y-1">
                      <div class="text-[#F4F2ED] text-sm font-light">Chris D.</div>
                      <div class="flex items-center justify-center gap-1">
                        <div class="px-2 py-1 rounded bg-[rgba(201,162,77,0.1)] text-[#C9A24D] border border-[rgba(201,162,77,0.3)] text-xs"></div>
                      </div>
                    </div>
                  </div>
                  <div class="text-center opacity-0 translate-y-4 animate-delay-3xl">
                    <div class="relative inline-block mb-2">
                      <div class="w-16 h-16 rounded-full bg-linear-to-br flex items-center justify-center text-[#F4F2ED] from-[#0A0A0A] to-[#1A1A1A] border border-[#C9A24D]/20">
                        <svg  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users w-6 h-6"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                      </div>
                    </div>
                    <div class="space-y-1">
                      <div class="text-[#F4F2ED] text-sm font-light">Taylor W.</div>
                      <div class="flex items-center justify-center gap-1">
                        <div class="px-2 py-1 rounded bg-[rgba(201,162,77,0.1)] text-[#C9A24D] border border-[rgba(201,162,77,0.3)] text-xs"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex items-center justify-center gap-2 md:gap-4 pt-6 border-t border-[#C9A24D]/10">
                  <button class="p-4 rounded-full transition-all bg-[#C9A24D]/20 text-[#C9A24D] hover:bg-[#C9A24D]/30" >
                    <svg  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mic w-5 h-5" ><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" x2="12" y1="19" y2="22"></line></svg>
                  </button>
                  <button class="p-4 rounded-full transition-all bg-red-500/20 text-red-500">
                    <svg  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-video-off w-5 h-5"><path d="M10.66 6H14a2 2 0 0 1 2 2v2.5l5.248-3.062A.5.5 0 0 1 22 7.87v8.196"></path><path d="M16 16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2"></path><path d="m2 2 20 20"></path></svg>
                  </button>
                  <button class="p-4 rounded-full transition-all bg-[#C9A24D]/20 text-[#C9A24D] hover:bg-[#C9A24D]/30">
                    <svg  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-hand w-5 h-5"><path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"></path><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"></path><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"></path><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"></path></svg>
                  </button>
                  <button class="px-5 md:px-8 py-2 md:py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-transparent border border-[#C9A24D] text-[#C9A24D] hover:bg-[rgba(201,162,77,0.1)]" tabindex="0">Leave Quietly</button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="opacity-0 translate-y-4 animate-delay-sm bg-[rgba(11,11,13,0.6)] backdrop-blur-sm border border-[rgba(201,162,77,0.15)] rounded-lg p-6">
              <h3 class="text-lg font-light text-[#C9A24D] mb-4">{{ t("firesides.Guidelines") }}</h3>
              <div class="space-y-3 text-sm text-[#F4F2ED]/80">
                <div class="flex items-start gap-3">
                  <div class="w-1.5 h-1.5 rounded-full bg-[#C9A24D] mt-1.5 shrink-0"></div>
                  <p>{{ t("firesides.guide1") }}</p>
                </div>
                <div class="flex items-start gap-3">
                  <div class="w-1.5 h-1.5 rounded-full bg-[#C9A24D] mt-1.5 shrink-0"></div>
                  <p>{{ t("firesides.guide2") }}</p>
                </div>
                <div class="flex items-start gap-3">
                  <div class="w-1.5 h-1.5 rounded-full bg-[#C9A24D] mt-1.5 shrink-0"></div>
                  <p>{{ t("firesides.guide3") }}</p>
                </div>
                <div class="flex items-start gap-3">
                  <div class="w-1.5 h-1.5 rounded-full bg-[#C9A24D] mt-1.5 shrink-0"></div>
                  <p>{{ t("firesides.guide4") }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="space-y-6">
          <!-- Listeners section - fade in from right -->
          <div>
            <div class="opacity-0 translate-y-4 animate-fade-right bg-[rgba(11,11,13,0.6)] backdrop-blur-sm border border-[rgba(201,162,77,0.15)] rounded-lg p-6">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-light text-[#F4F2ED]">{{ t("firesides.Listener") }}</h3>
                <div class="px-2 py-1 rounded text-xs bg-[rgba(201,162,77,0.1)] text-[#C9A24D] border border-[rgba(201,162,77,0.3)]"></div>
              </div>
              <div class="space-y-2">
                <div class="flex items-center gap-3 p-2 bg-[#0A0A0A]/30 rounded-lg">
                  <div class="w-8 h-8 rounded-full bg-linear-to-br from-[#0A0A0A] to-[#1A1A1A] border border-[#C9A24D]/20 flex items-center justify-center">
                    <svg  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users w-4 h-4 text-[#F4F2ED]"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></div><div class="flex-1"  >
                      <div class="text-[#F4F2ED] text-sm">Alex K.</div>
                    </div>
                  </div>
                  <div class="flex items-center gap-3 p-2 bg-[#0A0A0A]/30 rounded-lg">
                    <div class="w-8 h-8 rounded-full bg-linear-to-br from-[#0A0A0A] to-[#1A1A1A] border border-[#C9A24D]/20 flex items-center justify-center">
                      <svg  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users w-4 h-4 text-[#F4F2ED]"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    </div>
                    <div class="flex-1"  ><div class="text-[#F4F2ED] text-sm"  >Chris D.</div>
                  </div>
                  <div class="px-2 py-1 rounded bg-[rgba(201,162,77,0.1)] text-[#C9A24D] border border-[rgba(201,162,77,0.3)] text-xs"></div>
                </div>
                <div class="flex items-center gap-3 p-2 bg-[#0A0A0A]/30 rounded-lg" >
                  <div class="w-8 h-8 rounded-full bg-linear-to-br from-[#0A0A0A] to-[#1A1A1A] border border-[#C9A24D]/20 flex items-center justify-center">
                    <svg  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users w-4 h-4 text-[#F4F2ED]" ><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                  </div>
                  <div class="flex-1">
                    <div class="text-[#F4F2ED] text-sm">Taylor W.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="opacity-0 translate-y-4 animate-delay-lg">
            <div class="bg-[rgba(11,11,13,0.6)] backdrop-blur-sm border border-[rgba(201,162,77,0.15)] rounded-lg p-6">
              <h3 class="text-lg font-light text-[#F4F2ED] mb-4">{{ t("firesides.conversation") }}</h3>
              <div class="space-y-3">
                <div class="p-4 bg-[#0A0A0A]/30 rounded-lg space-y-2">
                  <h4 class="text-[#F4F2ED] font-light">{{ t("firesides.con1") }}</h4>
                  <div class="flex items-center gap-2 text-[#F4F2ED]/60 text-xs">
                    <svg  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users w-3 h-3"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    <span >Dr. Sarah Chen</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-[#5B3FD6] text-xs">Today, 8:00 PM</span>
                    <div class="px-2 py-1 rounded bg-[rgba(201,162,77,0.1)] text-[#C9A24D] border border-[rgba(201,162,77,0.3)] text-xs"></div>
                  </div>
                  <button class="text-[16px] font-medium px-8 py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-transparent text-[#F4F2ED] hover:bg-[rgba(244,242,237,0.1)] w-full" tabindex="0" style="transform: none;">{{ t("firesides.join") }}</button>
                </div>
                <div class="p-4 bg-[#0A0A0A]/30 rounded-lg space-y-2">
                  <h4 class="text-[#F4F2ED] font-light"  >{{ t("firesides.con2") }}</h4>
                  <div class="flex items-center gap-2 text-[#F4F2ED]/60 text-xs">
                    <svg  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users w-3 h-3"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    <span>Marcus V.</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-[#5B3FD6] text-xs">Tomorrow, 6:00 PM</span>
                    <div class="px-2 py-1 rounded bg-[rgba(201,162,77,0.1)] text-[#C9A24D] border border-[rgba(201,162,77,0.3)] text-xs"></div>
                  </div>
                  <button class="text-[16px] font-medium px-8 py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-transparent text-[#F4F2ED] hover:bg-[rgba(244,242,237,0.1)] w-full" tabindex="0" style="transform: none;">{{ t("firesides.join") }}</button>
                </div>
                <div class="p-4 bg-[#0A0A0A]/30 rounded-lg space-y-2">
                  <h4 class="text-[#F4F2ED] font-light">{{ t("firesides.con3") }}</h4>
                  <div class="flex items-center gap-2 text-[#F4F2ED]/60 text-xs">
                    <svg  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users w-3 h-3"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    <span>Alex T.</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-[#5B3FD6] text-xs">Feb 20, 7:00 PM</span>
                    <div class="px-2 py-1 rounded bg-[rgba(201,162,77,0.1)] text-[#C9A24D] border border-[rgba(201,162,77,0.3)] text-xs"></div>
                  </div>
                  <button class="text-[16px] font-medium px-8 py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-transparent text-[#F4F2ED] hover:bg-[rgba(244,242,237,0.1)] w-full" tabindex="0">{{ t("firesides.join") }}</button>
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
import FiresideIcon from "~/components/icons/fireside-page-icons/FiresideIcon.vue";
import FiresideSparkleIcon from "~/components/icons/fireside-page-icons/FiresideSparkleIcon.vue";
import FiresidePhilosophyIcon from "~/components/icons/fireside-page-icons/FiresidePhilosophyIcon.vue";
import FiresideArtsIcon from "~/components/icons/fireside-page-icons/FiresideArtsIcon.vue";
import FiresideTechnologyIcon from "~/components/icons/fireside-page-icons/FiresideTechnologyIcon.vue";
import FiresideLifeStoriesIcon from "~/components/icons/fireside-page-icons/FiresideLifeStoriesIcon.vue";
import FiresideWellnessIcon from "~/components/icons/fireside-page-icons/FiresideWellnessIcon.vue";

const { t } = useI18n();

type TopicId =
  | "open"
  | "philosophy"
  | "arts"
  | "technology"
  | "lifeStories"
  | "wellness";

interface Topic {
  id: TopicId;
  label: string;
  description: string;
  icon: any;
}

interface Speaker {
  id: string;
  name: string;
  isHost?: boolean;
  muted?: boolean;
}

interface Listener {
  id: string;
  name: string;
}

interface ScheduledConversation {
  id: string;
  title: string;
  host: string;
  timeLabel: string;
}

const IconSparkles = {
  name: "IconSparkles",
  
};

const IconBook = {
  name: "IconBook",
  
};

const IconHeart = {
  name: "IconHeart",
  
};

const IconTech = {
  name: "IconTech",
  
};

const IconMug = {
  name: "IconMug",
  
};

const IconMoon = {
  name: "IconMoon",
  
};

const topics: Topic[] = [
  {
    id: "open",
    label: "Open Discussion",
    description: "An intimate space for meaningful dialogue.",
    icon: IconSparkles,
  },
  {
    id: "philosophy",
    label: "Philosophy",
    description: "Deep dives into meaning, ethics, and existence.",
    icon: IconBook,
  },
  {
    id: "arts",
    label: "Arts & Creativity",
    description: "Share stories, inspiration, and creative journeys.",
    icon: IconHeart,
  },
  {
    id: "technology",
    label: "Technology",
    description: "Thoughtful conversations about innovation and impact.",
    icon: IconTech,
  },
  {
    id: "lifeStories",
    label: "Life Stories",
    description: "Space to share experiences and lessons learned.",
    icon: IconMug,
  },
  {
    id: "wellness",
    label: "Wellness & Mindfulness",
    description: "Grounding talks on wellbeing and inner balance.",
    icon: IconMoon,
  },
];

const selectedTopic = ref<TopicId>("open");

const currentTopic = computed(() => {
  const found = topics.find((t) => t.id === selectedTopic.value);
  // We know topics is a non-empty static array, so this assertion is safe
  return (found || topics[0]) as Topic;
});

const headerMotion = {
  initial: { opacity: 0, y: -20 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, easing: "ease-out" },
  },
};
</script>