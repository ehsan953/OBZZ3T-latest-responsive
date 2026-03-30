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
    </div>
</template>