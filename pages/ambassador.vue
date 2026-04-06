<template>
  <div class="relative min-h-screen md:pb-10 lg:pb-20">
    <LevelNavigation />

    <div class="relative max-w-7xl mx-auto py-8 px-4">
        <!-- Header -->
        <div class="text-center space-y-4 mb-8 opacity-0 -translate-y-4 animate-delay-sm">
            <div class="flex items-center justify-center gap-3">
                <h1 class="text-4xl font-light text-[#C9A24D]">{{ t('ambassador.title') }}</h1>
                <div class="px-2 py-1 rounded text-xs bg-[rgba(201,162,77,0.1)] text-[#C9A24D] border border-[rgba(201,162,77,0.3)]"></div>
            </div>
            <p class="text-[#F4F2ED]/60 max-w-2xl mx-auto">{{ t('ambassador.subtitle') }}</p>
        </div>

        <!-- Top stats -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 opacity-0 translate-y-4 animate-delay-md">
            <div class="bg-[rgba(11,11,13,0.6)] backdrop-blur-sm border border-[rgba(201,162,77,0.15)] rounded-lg p-6" style="opacity: 1; transform: none;">
                <div class="flex items-start justify-between">
                    <div class="space-y-2">
                        <div class="flex items-center gap-2 text-[#F4F2ED]/60 text-sm">
                            <AmbassadarScanEyeIcon class="lucide lucide-eye w-4 h-4"/>
                            <span>{{ t('ambassador.totalScans') }}</span>
                        </div>
                        <div class="text-3xl font-light text-[#F4F2ED]">1,247</div>
                        <div class="flex items-center gap-1 text-[#5B3FD6] text-sm">
                            <AmbassadarWaveArrowIcon class="lucide lucide-trending-up w-3 h-3" />
                            <span>+12%</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-[rgba(11,11,13,0.6)] backdrop-blur-sm border border-[rgba(201,162,77,0.15)] rounded-lg p-6" style="opacity: 1; transform: none;">
                <div class="flex items-start justify-between">
                    <div class="space-y-2">
                        <div class="flex items-center gap-2 text-[#F4F2ED]/60 text-sm">
                            <AmbassadarSignupsIcon class="lucide lucide-user-plus w-4 h-4" />
                            <span>{{ t('ambassador.totalSignups') }}</span>
                        </div>
                        <div class="text-3xl font-light text-[#F4F2ED]">342</div>
                        <div class="flex items-center gap-1 text-[#5B3FD6] text-sm">
                            <AmbassadarWaveArrowIcon class="lucide lucide-trending-up w-3 h-3" />
                            <span>+8%</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-[rgba(11,11,13,0.6)] backdrop-blur-sm border border-[rgba(201,162,77,0.15)] rounded-lg p-6" style="opacity: 1; transform: none;">
                <div class="flex items-start justify-between">
                    <div class="space-y-2">
                        <div class="flex items-center gap-2 text-[#F4F2ED]/60 text-sm">
                            <AmbassadarActiveReferralIcon class="lucide lucide-users w-4 h-4" />
                            <span>{{ t('ambassador.activeReferrals') }}</span>
                        </div>
                        <div class="text-3xl font-light text-[#F4F2ED]">298</div>
                    </div>
                </div>
            </div>
            <div class="bg-[rgba(11,11,13,0.6)] backdrop-blur-sm border border-[rgba(201,162,77,0.15)] rounded-lg p-6" style="opacity: 1; transform: none;">
                <div class="flex items-start justify-between">
                    <div class="space-y-2">
                        <div class="flex items-center gap-2 text-[#F4F2ED]/60 text-sm">
                            <AmbassadorConversionRateIcon class="lucide lucide-trending-up w-4 h-4" />
                            <span>{{ t('ambassador.conversionRate') }}</span>
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
                        <AmbassadorWalletIcon class="lucide lucide-wallet w-6 h-6 text-[#C9A24D]" />
                        <h2 class="text-2xl font-light text-[#F4F2ED]">{{ t('ambassador.ambassadorWallet') }}</h2>
                    </div>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div class="space-y-1">
                            <div class="text-[#F4F2ED]/60 text-sm">{{ t('ambassador.totalEarned') }}</div>
                            <div class="text-2xl font-light text-[#C9A24D]">$4,235.5</div>
                        </div>
                        <div class="space-y-1">
                            <div class="text-[#F4F2ED]/60 text-sm">{{ t('ambassador.available') }}</div>
                            <div class="text-2xl font-light text-[#5B3FD6]">$3,343.2</div>
                        </div>
                        <div class="space-y-1">
                            <div class="text-[#F4F2ED]/60 text-sm">{{ t('ambassador.pending') }}</div>
                            <div class="text-2xl font-light text-[#F4F2ED]">$892.3</div>
                        </div>
                        <div class="space-y-1">
                            <div class="text-[#F4F2ED]/60 text-sm">{{ t('ambassador.thisMonth') }}</div>
                            <div class="text-2xl font-light text-[#F4F2ED]">$1,205.75</div>
                        </div>
                    </div>
                    <div class="flex flex-wrap gap-3">
                        <button class="flex items-center gap-2 px-8 py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-[#C9A24D] text-[#0B0B0D] hover:bg-[#D4AD59] shadow-[0_0_20px_rgba(201,162,77,0.3)]" tabindex="0">
                            <AmbassadorRequestPayoutIcon class="lucide lucide-dollar-sign w-4 h-4"/>
                            {{ t('ambassador.requestPayout') }}
                        </button>
                        <button class="flex items-center gap-2 px-8 py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-transparent border border-[#C9A24D] text-[#C9A24D] hover:bg-[rgba(201,162,77,0.1)]" tabindex="0">
                            <AmbassadorDownloadReportIcon class="lucide lucide-download w-4 h-4"/>
                            {{ t('ambassador.downloadReport') }}
                        </button>
                    </div>
                </div>
            </div>
            <div class="mb-4 md:mb-8 opacity-0 translate-y-4 animate-fade-right">
                <div class="bg-[rgba(11,11,13,0.6)] backdrop-blur-sm border border-[rgba(201,162,77,0.15)] rounded-lg p-6" style="opacity: 1; transform: none;">
                    <h3 class="text-lg font-light text-[#F4F2ED] mb-4">{{ t('ambassador.yourQRCode') }}</h3>
                    <div class="bg-white p-4 rounded-lg mb-4">
                        <div class="aspect-square bg-linear-to-br from-[#0A0A0A] to-[#1A1A1A] rounded flex items-center justify-center">
                            <AmbassadorQRCodeIcon class="lucide lucide-qr-code w-32 h-32 text-[#C9A24D]" />
                        </div>
                    </div>
                    <div class="space-y-2 text-center text-sm">
                        <div class="text-[#F4F2ED]/60">{{ t('ambassador.scanToJoin') }}</div>
                        <div class="font-mono text-[#C9A24D]">OB33Z-AMB-2024</div>
                    </div>
                    <button class="px-8 py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-transparent text-[#F4F2ED] hover:bg-[rgba(244,242,237,0.1)] w-full mt-4" tabindex="0" style="transform: none;">
                        <AmbassadorDownloadQRCodeIcon class="lucide lucide-download w-4 h-4" />
                        {{ t('ambassador.downloadQR') }}
                    </button>
                </div>
            </div>
        </div>

        <!-- Referral Link -->
        <div class="md:mb-8 opacity-0 -translate-y-4 animate-delay-lg">
            <div class="bg-[rgba(11,11,13,0.6)] backdrop-blur-sm border border-[rgba(201,162,77,0.15)] rounded-lg p-6" style="opacity: 1; transform: none;">
                <div class="flex items-center gap-3 mb-4">
                    <AmbassadarReferralLinkIcon class="lucide lucide-link w-5 h-5 text-[#C9A24D]" />
                    <h3 class="text-lg font-light text-[#F4F2ED]">{{ t('ambassador.yourReferralLink') }}</h3>
                </div>
                <div class="flex flex-col sm:flex-row gap-3">
                    <div class="flex-1 bg-[#0A0A0A]/50 border border-[#C9A24D]/20 rounded-lg px-4 py-3 font-mono text-sm text-[#F4F2ED]/80">https://ob33z.com/ref/AMB2024</div>
                    <div class="flex gap-2">
                        <button class="px-8 py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-transparent border border-[#C9A24D] text-[#C9A24D] hover:bg-[rgba(201,162,77,0.1)]" tabindex="0">
                            <AmbassadorCopyLinkIcon class="lucide lucide-copy w-4 h-4" />
                            {{ t('ambassador.copy') }}
                        </button>
                        <button class="px-8 py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-transparent border border-[#C9A24D] text-[#C9A24D] hover:bg-[rgba(201,162,77,0.1)]" tabindex="0">
                            <AmbassadorShareLinkIcon class="lucide lucide-share2 lucide-share-2 w-4 h-4" />
                            {{ t('ambassador.share') }}
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-8">
            <div class="opacity-0 translate-y-4 animate-fade-left mb-4 md:mb-8">
                <div class="bg-[rgba(11,11,13,0.6)] backdrop-blur-sm border border-[rgba(201,162,77,0.15)] rounded-lg p-6" style="opacity: 1; transform: none;">
                    <div class="flex items-center gap-3 mb-6">
                        <AmbassadorActivityIcon class="lucide lucide-calendar w-5 h-5 text-[#C9A24D]" />
                        <h3 class="text-lg font-light text-[#F4F2ED]">{{ t('ambassador.recentActivity') }}</h3>
                    </div>
                    <div class="space-y-4">
                        <div class="flex items-center justify-between p-3 bg-[#0A0A0A]/30 rounded-lg">
                            <div class="flex items-center gap-3">
                                <div class="w-2 h-2 rounded-full bg-[#5B3FD6]"></div>
                                <div>
                                    <div class="text-[#F4F2ED] text-sm">Alex M.</div>
                                    <div class="text-[#F4F2ED]/60 text-xs">{{ t('ambassador.activity.a1Time') }}</div>
                                </div>
                            </div>
                            <div class="text-[#C9A24D] font-light">+$12.5</div>
                        </div>
                        <div class="flex items-center justify-between p-3 bg-[#0A0A0A]/30 rounded-lg">
                            <div class="flex items-center gap-3">
                                <div class="w-2 h-2 rounded-full bg-[#C9A24D]"></div>
                                <div>
                                    <div class="text-[#F4F2ED] text-sm">Sarah K.</div>
                                    <div class="text-[#F4F2ED]/60 text-xs">{{ t('ambassador.activity.a2Time') }}</div>
                                </div>
                            </div>
                            <div class="text-[#C9A24D] font-light">+$45</div>
                        </div>
                        <div class="flex items-center justify-between p-3 bg-[#0A0A0A]/30 rounded-lg">
                            <div class="flex items-center gap-3">
                                <div class="w-2 h-2 rounded-full bg-[#5B3FD6]"></div>
                                <div>
                                    <div class="text-[#F4F2ED] text-sm">Mike D.</div>
                                    <div class="text-[#F4F2ED]/60 text-xs">{{ t('ambassador.activity.a3Time') }}</div>
                                </div>
                            </div>
                            <div class="text-[#C9A24D] font-light">+$12.5</div>
                        </div>
                        <div class="flex items-center justify-between p-3 bg-[#0A0A0A]/30 rounded-lg">
                            <div class="flex items-center gap-3">
                                <div class="w-2 h-2 rounded-full bg-[#C9A24D]"></div>
                                <div>
                                    <div class="text-[#F4F2ED] text-sm">Emma R.</div>
                                    <div class="text-[#F4F2ED]/60 text-xs">{{ t('ambassador.activity.a4Time') }}</div>
                                </div>
                            </div>
                            <div class="text-[#C9A24D] font-light">+$30</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="opacity-0 translate-y-4 animate-fade-right mb-4 md:mb-8">
                <div class="bg-[rgba(11,11,13,0.6)] backdrop-blur-sm border border-[rgba(201,162,77,0.15)] rounded-lg p-6" style="opacity: 1; transform: none;">
                    <div class="flex items-center gap-3 mb-6">
                        <AmbassadarWaveArrowIcon class="lucide lucide-trending-up w-5 h-5 text-[#C9A24D]" />
                        <h3 class="text-lg font-light text-[#F4F2ED]">{{ t('ambassador.topReferrals') }}</h3>
                    </div>
                    <div class="space-y-4">
                        <div class="flex items-center justify-between p-3 bg-[#0A0A0A]/30 rounded-lg">
                            <div class="flex items-center gap-3">
                                <div class="w-8 h-8 rounded-full bg-linear-to-br from-[#C9A24D] to-[#5B3FD6] flex items-center justify-center text-[#F4F2ED] text-sm font-light">1</div>
                                <div>
                                    <div class="text-[#F4F2ED] text-sm">Sarah K.</div>
                                    <div class="text-[#F4F2ED]/60 text-xs">{{ t('ambassador.topReferralDates.d1') }}</div>
                                </div>
                            </div>
                            <div class="text-[#C9A24D] font-light">$450</div>
                        </div>
                        <div class="flex items-center justify-between p-3 bg-[#0A0A0A]/30 rounded-lg">
                            <div class="flex items-center gap-3">
                                <div class="w-8 h-8 rounded-full bg-linear-to-br from-[#C9A24D] to-[#5B3FD6] flex items-center justify-center text-[#F4F2ED] text-sm font-light">2</div>
                                <div>
                                    <div class="text-[#F4F2ED] text-sm">Mike D.</div>
                                    <div class="text-[#F4F2ED]/60 text-xs">{{ t('ambassador.topReferralDates.d2') }}</div>
                                </div>
                            </div>
                            <div class="text-[#C9A24D] font-light">$380</div>
                        </div>
                        <div class="flex items-center justify-between p-3 bg-[#0A0A0A]/30 rounded-lg">
                            <div class="flex items-center gap-3">
                                <div class="w-8 h-8 rounded-full bg-linear-to-br from-[#C9A24D] to-[#5B3FD6] flex items-center justify-center text-[#F4F2ED] text-sm font-light">3</div>
                                <div>
                                    <div class="text-[#F4F2ED] text-sm">Emma R.</div>
                                    <div class="text-[#F4F2ED]/60 text-xs">{{ t('ambassador.topReferralDates.d3') }}</div>
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
                <h3 class="text-xl font-light text-[#C9A24D] mb-6">{{ t('ambassador.howItWorks') }}</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="space-y-3">
                        <div class="w-12 h-12 rounded-full bg-[#5B3FD6]/20 flex items-center justify-center">
                            <AmbassadorShareLinkIcon class="lucide lucide-share2 lucide-share-2 w-6 h-6 text-[#5B3FD6]" />
                        </div>
                        <h4 class="text-lg text-[#F4F2ED]">{{ t('ambassador.shareYourLink') }}</h4>
                        <p class="text-[#F4F2ED]/60 text-sm">{{ t('ambassador.shareYourLinkDesc') }}</p>
                    </div>
                    <div class="space-y-3">
                        <div class="w-12 h-12 rounded-full bg-[#C9A24D]/20 flex items-center justify-center">
                            <AmbassadarActiveReferralIcon class="lucide lucide-users w-6 h-6 text-[#C9A24D]" />
                        </div>
                        <h4 class="text-lg text-[#F4F2ED]">{{ t('ambassador.friendsJoin') }}</h4>
                        <p class="text-[#F4F2ED]/60 text-sm">{{ t('ambassador.friendsJoinDesc') }}</p>
                    </div>
                    <div class="space-y-3">
                        <div class="w-12 h-12 rounded-full bg-[#C9A24D]/20 flex items-center justify-center">
                            <AmbassadorRequestPayoutIcon class="lucide lucide-dollar-sign w-6 h-6 text-[#C9A24D]" />
                        </div>
                        <h4 class="text-lg text-[#F4F2ED]">{{ t('ambassador.earnCommission') }}</h4>
                        <p class="text-[#F4F2ED]/60 text-sm">{{ t('ambassador.earnCommissionDesc') }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "#imports";
import AmbassadarScanEyeIcon from "~/components/icons/ambassador-page-icons/AmbassadarScanEyeIcon.vue";
import AmbassadarSignupsIcon from "~/components/icons/ambassador-page-icons/AmbassadarSignupsIcon.vue";
import AmbassadarWaveArrowIcon from "~/components/icons/ambassador-page-icons/AmbassadarWaveArrowIcon.vue";
import AmbassadarActiveReferralIcon from "~/components/icons/ambassador-page-icons/AmbassadarActiveReferralIcon.vue";
import AmbassadorConversionRateIcon from "~/components/icons/ambassador-page-icons/AmbassadorConversionRateIcon.vue";
import AmbassadorWalletIcon from "~/components/icons/ambassador-page-icons/AmbassadorWalletIcon.vue";
import AmbassadorRequestPayoutIcon from "~/components/icons/ambassador-page-icons/AmbassadorRequestPayoutIcon.vue";
import AmbassadorDownloadReportIcon from "~/components/icons/ambassador-page-icons/AmbassadorDownloadReportIcon.vue";
import AmbassadorQRCodeIcon from "~/components/icons/ambassador-page-icons/AmbassadorQRCodeIcon.vue";
import AmbassadorDownloadQRCodeIcon from "~/components/icons/ambassador-page-icons/AmbassadorDownloadQRCodeIcon.vue";
import AmbassadarReferralLinkIcon from "~/components/icons/ambassador-page-icons/AmbassadarReferralLinkIcon.vue";
import AmbassadorCopyLinkIcon from "~/components/icons/ambassador-page-icons/AmbassadorCopyLinkIcon.vue";
import AmbassadorShareLinkIcon from "~/components/icons/ambassador-page-icons/AmbassadorShareLinkIcon.vue";
import AmbassadorActivityIcon from "~/components/icons/ambassador-page-icons/AmbassadorActivityIcon.vue";

const { t } = useI18n();

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
    label: t("ambassador.totalScans"),
    value: "1,247",
    change: "+12%",
    
  },
  {
    label: t("ambassador.totalSignups"),
    value: "342",
    change: "+8%",
    
  },
  {
    label: t("ambassador.activeReferrals"),
    value: "298",
    change: "+4%",
    
  },
  {
    label: t("ambassador.conversionRate"),
    value: "27.4%",
    change: "+2%"
  },
];

const recentActivity = [
  {
    id: 1,
    name: "Alex M.",
    time: t("ambassador.activity.a1Time"),
    amount: "+$12.5",
    color: "bg-[#5B3FD6]",
  },
  {
    id: 2,
    name: "Sarah K.",
    time: t("ambassador.activity.a2Time"),
    amount: "+$45",
    color: "bg-[#C9A24D]",
  },
  {
    id: 3,
    name: "Mike D.",
    time: t("ambassador.activity.a3Time"),
    amount: "+$12.5",
    color: "bg-[#5B3FD6]",
  },
  {
    id: 4,
    name: "Emma R.",
    time: t("ambassador.activity.a4Time"),
    amount: "+$30",
    color: "bg-[#C9A24D]",
  },
];

const topReferrals = [
  {
    id: 1,
    rank: 1,
    name: "Sarah K.",
    date: t("ambassador.topReferralDates.d1"),
    amount: "$450",
  },
  {
    id: 2,
    rank: 2,
    name: "Mike D.",
    date: t("ambassador.topReferralDates.d2"),
    amount: "$380",
  },
  {
    id: 3,
    rank: 3,
    name: "Emma R.",
    date: t("ambassador.topReferralDates.d3"),
    amount: "$320",
  },
];

const howItWorks = [
  {
    title: t("ambassador.shareYourLink"),
    description: t("ambassador.shareYourLinkDesc"),
    bg: "bg-[#5B3FD6]/20",
    color: "text-[#5B3FD6]",
    
  },
  {
    title: t("ambassador.friendsJoin"),
    description: t("ambassador.friendsJoinDesc"),
    bg: "bg-[#C9A24D]/20",
    color: "text-[#C9A24D]",
    
  },
  {
    title: t("ambassador.earnCommission"),
    description: t("ambassador.earnCommissionDesc"),
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
        title: t("ambassador.shareSheetTitle"),
        text: t("ambassador.shareSheetText"),
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