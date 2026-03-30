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
            class="opacity-0 translate-y-6 animate-delay-md text-center mb-8 flex flex-col items-center gap-3"
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
      </div>
    </div>
</template>