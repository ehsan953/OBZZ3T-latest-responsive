<template>
  <div class="relative min-h-screen pb-20">
    <LevelNavigation />

    <div class="relative max-w-7xl mx-auto py-8 px-4">
        <!-- Header -->
        <div class="text-center space-y-4 mb-8 opacity-0 -translate-y-4 animate-delay-sm">
            <div class="flex items-center justify-center gap-3">
                <h1 class="text-4xl font-light text-[#C9A24D]">Ambassador Program</h1>
                <div class="px-2 py-1 rounded text-xs bg-[rgba(201,162,77,0.1)] text-[#C9A24D] border border-[rgba(201,162,77,0.3)]"></div>
            </div>
            <p class="text-[#F4F2ED]/60 max-w-2xl mx-auto">Share OB33Z with your network and earn 30% commission on all referral spending.</p>
        </div>

        <!-- Top stats -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 opacity-0 translate-y-4 animate-delay-md">
            <div class="bg-[rgba(11,11,13,0.6)] backdrop-blur-sm border border-[rgba(201,162,77,0.15)] rounded-lg p-6" style="opacity: 1; transform: none;">
                <div class="flex items-start justify-between">
                    <div class="space-y-2">
                        <div class="flex items-center gap-2 text-[#F4F2ED]/60 text-sm">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye w-4 h-4"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path><circle cx="12" cy="12" r="3"></circle></svg>
                            <span>Total Scans</span>
                        </div>
                        <div class="text-3xl font-light text-[#F4F2ED]">1,247</div>
                        <div class="flex items-center gap-1 text-[#5B3FD6] text-sm">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trending-up w-3 h-3"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
                            <span>+12%</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-[rgba(11,11,13,0.6)] backdrop-blur-sm border border-[rgba(201,162,77,0.15)] rounded-lg p-6" style="opacity: 1; transform: none;">
                <div class="flex items-start justify-between">
                    <div class="space-y-2">
                        <div class="flex items-center gap-2 text-[#F4F2ED]/60 text-sm">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-plus w-4 h-4"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="19" x2="19" y1="8" y2="14"></line><line x1="22" x2="16" y1="11" y2="11"></line></svg>
                            <span>Total Signups</span>
                        </div>
                        <div class="text-3xl font-light text-[#F4F2ED]">342</div>
                        <div class="flex items-center gap-1 text-[#5B3FD6] text-sm">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trending-up w-3 h-3"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
                            <span>+8%</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-[rgba(11,11,13,0.6)] backdrop-blur-sm border border-[rgba(201,162,77,0.15)] rounded-lg p-6" style="opacity: 1; transform: none;">
                <div class="flex items-start justify-between">
                    <div class="space-y-2">
                        <div class="flex items-center gap-2 text-[#F4F2ED]/60 text-sm">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users w-4 h-4"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                            <span>Active Referrals</span>
                        </div>
                        <div class="text-3xl font-light text-[#F4F2ED]">298</div>
                    </div>
                </div>
            </div>
            <div class="bg-[rgba(11,11,13,0.6)] backdrop-blur-sm border border-[rgba(201,162,77,0.15)] rounded-lg p-6" style="opacity: 1; transform: none;">
                <div class="flex items-start justify-between">
                    <div class="space-y-2">
                        <div class="flex items-center gap-2 text-[#F4F2ED]/60 text-sm">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trending-up w-4 h-4"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
                            <span>Conversion Rate</span>
                        </div>
                        <div class="text-3xl font-light text-[#F4F2ED]">27.4%</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Wallet + QR -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div class="lg:col-span-2 opacity-0 translate-y-4 animate-fade-left">
                <div class="bg-[rgba(11,11,13,0.6)] backdrop-blur-sm border border-[rgba(201,162,77,0.15)] rounded-lg p-8" style="opacity: 1; transform: none;">
                    <div class="flex items-center gap-3 mb-6">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-wallet w-6 h-6 text-[#C9A24D]"><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"></path><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"></path></svg>
                        <h2 class="text-2xl font-light text-[#F4F2ED]">Ambassador Wallet</h2>
                    </div>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div class="space-y-1">
                            <div class="text-[#F4F2ED]/60 text-sm">Total Earned</div>
                            <div class="text-2xl font-light text-[#C9A24D]">$4,235.5</div>
                        </div>
                        <div class="space-y-1">
                            <div class="text-[#F4F2ED]/60 text-sm">Available</div>
                            <div class="text-2xl font-light text-[#5B3FD6]">$3,343.2</div>
                        </div>
                        <div class="space-y-1">
                            <div class="text-[#F4F2ED]/60 text-sm">Pending</div>
                            <div class="text-2xl font-light text-[#F4F2ED]">$892.3</div>
                        </div>
                        <div class="space-y-1">
                            <div class="text-[#F4F2ED]/60 text-sm">This Month</div>
                            <div class="text-2xl font-light text-[#F4F2ED]">$1,205.75</div>
                        </div>
                    </div>
                    <div class="flex flex-wrap gap-3">
                        <button class="px-8 py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-[#C9A24D] text-[#0B0B0D] hover:bg-[#D4AD59] shadow-[0_0_20px_rgba(201,162,77,0.3)]" tabindex="0">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-dollar-sign w-4 h-4"><line x1="12" x2="12" y1="2" y2="22"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                            Request Payout
                        </button>
                        <button class="px-8 py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-transparent border border-[#C9A24D] text-[#C9A24D] hover:bg-[rgba(201,162,77,0.1)]" tabindex="0">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-download w-4 h-4"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" x2="12" y1="15" y2="3"></line></svg>
                            Download Report
                        </button>
                    </div>
                </div>
            </div>
            <div class="mb-8 opacity-0 translate-y-4 animate-fade-right">
                <div class="bg-[rgba(11,11,13,0.6)] backdrop-blur-sm border border-[rgba(201,162,77,0.15)] rounded-lg p-6" style="opacity: 1; transform: none;">
                    <h3 class="text-lg font-light text-[#F4F2ED] mb-4">Your QR Code</h3>
                    <div class="bg-white p-4 rounded-lg mb-4">
                        <div class="aspect-square bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] rounded flex items-center justify-center">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-qr-code w-32 h-32 text-[#C9A24D]"><rect width="5" height="5" x="3" y="3" rx="1"></rect><rect width="5" height="5" x="16" y="3" rx="1"></rect><rect width="5" height="5" x="3" y="16" rx="1"></rect><path d="M21 16h-3a2 2 0 0 0-2 2v3"></path><path d="M21 21v.01"></path><path d="M12 7v3a2 2 0 0 1-2 2H7"></path><path d="M3 12h.01"></path><path d="M12 3h.01"></path><path d="M12 16v.01"></path><path d="M16 12h1"></path><path d="M21 12v.01"></path><path d="M12 21v-1"></path></svg>
                        </div>
                    </div>
                    <div class="space-y-2 text-center text-sm">
                        <div class="text-[#F4F2ED]/60">Scan to join with your referral</div>
                        <div class="font-mono text-[#C9A24D]">OB33Z-AMB-2024</div>
                    </div>
                    <button class="px-8 py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-transparent text-[#F4F2ED] hover:bg-[rgba(244,242,237,0.1)] w-full mt-4" tabindex="0" style="transform: none;">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-download w-4 h-4"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" x2="12" y1="15" y2="3"></line></svg>
                        Download QR
                    </button>
                </div>
            </div>
        </div>

        <!-- Referral Link -->
        <div class="mb-8 opacity-0 -translate-y-4 animate-delay-lg">
            <div class="bg-[rgba(11,11,13,0.6)] backdrop-blur-sm border border-[rgba(201,162,77,0.15)] rounded-lg p-6" style="opacity: 1; transform: none;">
                <div class="flex items-center gap-3 mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-link w-5 h-5 text-[#C9A24D]"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                    <h3 class="text-lg font-light text-[#F4F2ED]">Your Referral Link</h3>
                </div>
                <div class="flex flex-col sm:flex-row gap-3">
                    <div class="flex-1 bg-[#0A0A0A]/50 border border-[#C9A24D]/20 rounded-lg px-4 py-3 font-mono text-sm text-[#F4F2ED]/80">https://ob33z.com/ref/AMB2024</div>
                    <div class="flex gap-2">
                        <button class="px-8 py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-transparent border border-[#C9A24D] text-[#C9A24D] hover:bg-[rgba(201,162,77,0.1)]" tabindex="0">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy w-4 h-4"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>
                            Copy
                        </button>
                        <button class="px-8 py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-transparent border border-[#C9A24D] text-[#C9A24D] hover:bg-[rgba(201,162,77,0.1)]" tabindex="0">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-share2 lucide-share-2 w-4 h-4"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"></line><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"></line></svg>
                            Share
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div class="opacity-0 translate-y-4 animate-fade-left mb-8">
                <div class="bg-[rgba(11,11,13,0.6)] backdrop-blur-sm border border-[rgba(201,162,77,0.15)] rounded-lg p-6" style="opacity: 1; transform: none;">
                    <div class="flex items-center gap-3 mb-6">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar w-5 h-5 text-[#C9A24D]"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>
                        <h3 class="text-lg font-light text-[#F4F2ED]">Recent Activity</h3>
                    </div>
                    <div class="space-y-4">
                        <div class="flex items-center justify-between p-3 bg-[#0A0A0A]/30 rounded-lg">
                            <div class="flex items-center gap-3">
                                <div class="w-2 h-2 rounded-full bg-[#5B3FD6]"></div>
                                <div>
                                    <div class="text-[#F4F2ED] text-sm">Alex M.</div>
                                    <div class="text-[#F4F2ED]/60 text-xs">2 hours ago</div>
                                </div>
                            </div>
                            <div class="text-[#C9A24D] font-light">+$12.5</div>
                        </div>
                        <div class="flex items-center justify-between p-3 bg-[#0A0A0A]/30 rounded-lg">
                            <div class="flex items-center gap-3">
                                <div class="w-2 h-2 rounded-full bg-[#C9A24D]"></div>
                                <div>
                                    <div class="text-[#F4F2ED] text-sm">Sarah K.</div>
                                    <div class="text-[#F4F2ED]/60 text-xs">5 hours ago</div>
                                </div>
                            </div>
                            <div class="text-[#C9A24D] font-light">+$45</div>
                        </div>
                        <div class="flex items-center justify-between p-3 bg-[#0A0A0A]/30 rounded-lg">
                            <div class="flex items-center gap-3">
                                <div class="w-2 h-2 rounded-full bg-[#5B3FD6]"></div>
                                <div>
                                    <div class="text-[#F4F2ED] text-sm">Mike D.</div>
                                    <div class="text-[#F4F2ED]/60 text-xs">1 day ago</div>
                                </div>
                            </div>
                            <div class="text-[#C9A24D] font-light">+$12.5</div>
                        </div>
                        <div class="flex items-center justify-between p-3 bg-[#0A0A0A]/30 rounded-lg">
                            <div class="flex items-center gap-3">
                                <div class="w-2 h-2 rounded-full bg-[#C9A24D]"></div>
                                <div>
                                    <div class="text-[#F4F2ED] text-sm">Emma R.</div>
                                    <div class="text-[#F4F2ED]/60 text-xs">2 days ago</div>
                                </div>
                            </div>
                            <div class="text-[#C9A24D] font-light">+$30</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="opacity-0 translate-y-4 animate-fade-right">
                <div class="bg-[rgba(11,11,13,0.6)] backdrop-blur-sm border border-[rgba(201,162,77,0.15)] rounded-lg p-6" style="opacity: 1; transform: none;">
                    <div class="flex items-center gap-3 mb-6">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trending-up w-5 h-5 text-[#C9A24D]"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
                        <h3 class="text-lg font-light text-[#F4F2ED]">Top Referrals</h3>
                    </div>
                    <div class="space-y-4">
                        <div class="flex items-center justify-between p-3 bg-[#0A0A0A]/30 rounded-lg">
                            <div class="flex items-center gap-3">
                                <div class="w-8 h-8 rounded-full bg-gradient-to-br from-[#C9A24D] to-[#5B3FD6] flex items-center justify-center text-[#F4F2ED] text-sm font-light">1</div>
                                <div>
                                    <div class="text-[#F4F2ED] text-sm">Sarah K.</div>
                                    <div class="text-[#F4F2ED]/60 text-xs">Jan 15, 2024</div>
                                </div>
                            </div>
                            <div class="text-[#C9A24D] font-light">$450</div>
                        </div>
                        <div class="flex items-center justify-between p-3 bg-[#0A0A0A]/30 rounded-lg">
                            <div class="flex items-center gap-3">
                                <div class="w-8 h-8 rounded-full bg-gradient-to-br from-[#C9A24D] to-[#5B3FD6] flex items-center justify-center text-[#F4F2ED] text-sm font-light">2</div>
                                <div>
                                    <div class="text-[#F4F2ED] text-sm">Mike D.</div>
                                    <div class="text-[#F4F2ED]/60 text-xs">Jan 20, 2024</div>
                                </div>
                            </div>
                            <div class="text-[#C9A24D] font-light">$380</div>
                        </div>
                        <div class="flex items-center justify-between p-3 bg-[#0A0A0A]/30 rounded-lg">
                            <div class="flex items-center gap-3">
                                <div class="w-8 h-8 rounded-full bg-gradient-to-br from-[#C9A24D] to-[#5B3FD6] flex items-center justify-center text-[#F4F2ED] text-sm font-light">3</div>
                                <div>
                                    <div class="text-[#F4F2ED] text-sm">Emma R.</div>
                                    <div class="text-[#F4F2ED]/60 text-xs">Feb 1, 2024</div>
                                </div>
                            </div>
                            <div class="text-[#C9A24D] font-light">$320</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="opacity-0 -translate-y-4 animate-fade-right">
            <div class="bg-[rgba(11,11,13,0.6)] backdrop-blur-sm border border-[rgba(201,162,77,0.15)] rounded-lg p-8" style="opacity: 1; transform: none;">
                <h3 class="text-xl font-light text-[#C9A24D] mb-6">How It Works</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="space-y-3">
                        <div class="w-12 h-12 rounded-full bg-[#5B3FD6]/20 flex items-center justify-center">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-share2 lucide-share-2 w-6 h-6 text-[#5B3FD6]"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"></line><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"></line></svg>
                        </div>
                        <h4 class="text-lg text-[#F4F2ED]">Share Your Link</h4>
                        <p class="text-[#F4F2ED]/60 text-sm">Share your unique referral link or QR code with friends.</p>
                    </div>
                    <div class="space-y-3">
                        <div class="w-12 h-12 rounded-full bg-[#C9A24D]/20 flex items-center justify-center">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users w-6 h-6 text-[#C9A24D]"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                        </div>
                        <h4 class="text-lg text-[#F4F2ED]">Friends Join</h4>
                        <p class="text-[#F4F2ED]/60 text-sm">When they sign up and spend, you earn commission.</p>
                    </div>
                    <div class="space-y-3">
                        <div class="w-12 h-12 rounded-full bg-[#C9A24D]/20 flex items-center justify-center">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-dollar-sign w-6 h-6 text-[#C9A24D]"><line x1="12" x2="12" y1="2" y2="22"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                        </div>
                        <h4 class="text-lg text-[#F4F2ED]">Earn 30% Commission</h4>
                        <p class="text-[#F4F2ED]/60 text-sm">Get paid automatically for all referral spending.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const referralLink = ref("https://ob33z.com/ref/AMB2024");
const copied = ref(false);

const wallet = {
  totalEarned: "$4,235.5",
  available: "$3,343.2",
  pending: "$892.3",
  thisMonth: "$1,205.75",
};

const stats = [
  {
    label: "Total Scans",
    value: "1,247",
    change: "+12%",
    
  },
  {
    label: "Total Signups",
    value: "342",
    change: "+8%",
    
  },
  {
    label: "Active Referrals",
    value: "298",
    change: "+4%",
    
  },
  {
    label: "Conversion Rate",
    value: "27.4%",
    change: "+2%"
  },
];

const recentActivity = [
  {
    id: 1,
    name: "Alex M.",
    time: "2 hours ago",
    amount: "+$12.5",
    color: "bg-[#5B3FD6]",
  },
  {
    id: 2,
    name: "Sarah K.",
    time: "5 hours ago",
    amount: "+$45",
    color: "bg-[#C9A24D]",
  },
  {
    id: 3,
    name: "Mike D.",
    time: "1 day ago",
    amount: "+$12.5",
    color: "bg-[#5B3FD6]",
  },
  {
    id: 4,
    name: "Emma R.",
    time: "2 days ago",
    amount: "+$30",
    color: "bg-[#C9A24D]",
  },
];

const topReferrals = [
  {
    id: 1,
    rank: 1,
    name: "Sarah K.",
    date: "Jan 15, 2024",
    amount: "$450",
  },
  {
    id: 2,
    rank: 2,
    name: "Mike D.",
    date: "Jan 20, 2024",
    amount: "$380",
  },
  {
    id: 3,
    rank: 3,
    name: "Emma R.",
    date: "Feb 1, 2024",
    amount: "$320",
  },
];

const howItWorks = [
  {
    title: "Share Your Link",
    description: "Share your unique referral link or QR code with friends.",
    bg: "bg-[#5B3FD6]/20",
    color: "text-[#5B3FD6]",
    
  },
  {
    title: "Friends Join",
    description: "When they sign up and spend, you earn commission.",
    bg: "bg-[#C9A24D]/20",
    color: "text-[#C9A24D]",
    
  },
  {
    title: "Earn 30% Commission",
    description: "Get paid automatically for all referral spending.",
    bg: "bg-[#C9A24D]/20",
    color: "text-[#C9A24D]",
    
  },
];

const copyReferralLink = async () => {
  if (!process.client) return;
  try {
    await navigator.clipboard.writeText(referralLink.value);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 1800);
  } catch (error) {
    console.error("Failed to copy referral link", error);
  }
};

const shareReferralLink = async () => {
  if (!process.client) return;
  const nav: any = navigator;

  try {
    if (nav.share) {
      await nav.share({
        title: "Join OB33Z",
        text: "Join OB33Z with my ambassador link.",
        url: referralLink.value,
      });
    } else {
      await copyReferralLink();
    }
  } catch (error) {
    console.error("Share cancelled or failed", error);
  }
};
</script>