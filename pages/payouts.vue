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

        <div class="relative max-w-7xl mx-auto pt-2 pb-4 md:py-8 md:px-4">
        <!-- Header -->
        <div
            class="opacity-0 translate-y-6 animate-delay-md mb-8 flex justify-between items-start"
        >
            <div class="flex flex-col gap-3">
                <div class="flex items-center gap-3">
                    
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <path d="M20 3.33301V36.6663" stroke="#C9A24D" stroke-width="3.33333" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M28.3333 8.33301H15.8333C14.2862 8.33301 12.8025 8.94759 11.7085 10.0416C10.6146 11.1355 10 12.6192 10 14.1663C10 15.7134 10.6146 17.1972 11.7085 18.2911C12.8025 19.3851 14.2862 19.9997 15.8333 19.9997H24.1667C25.7138 19.9997 27.1975 20.6143 28.2915 21.7082C29.3854 22.8022 30 24.2859 30 25.833C30 27.3801 29.3854 28.8638 28.2915 29.9578C27.1975 31.0518 25.7138 31.6663 24.1667 31.6663H10" stroke="#C9A24D" stroke-width="3.33333" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
    
                    <h1 class="text-4xl text-[#C9A24D] font-light">
                        Ambassador Earnings
                    </h1>
                </div>
                <p class="text-[16px] text-[#F4F2ED99]/60 max-w-78.25 md:max-w-3xl">
                    Track your referral commissions and manage automatic payouts
                </p>
            </div>
            <button
                class="border border-[#C9A24D] rounded-xl flex items-start md:items-center text-left text-[#C9A24D] gap-2 px-4 py-2 md:px-6 md:py-3"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10" stroke="#C9A24D" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M4.66669 6.66699L8.00002 10.0003L11.3334 6.66699" stroke="#C9A24D" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M8 10V2" stroke="#C9A24D" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Download Statement
            </button>
        </div>
      </div>
    </div>
</template>