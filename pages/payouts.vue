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

    <div class="relative max-w-7xl mx-auto pt-2 pb-10 md:py-8 md:px-4 flex flex-col gap-8">
      <!-- Header -->
      <div class="opacity-0 animate-delay-md flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div class="flex flex-col gap-3">
          <div class="flex items-center gap-2 sm:gap-3">
            <PayoutsHeaderIcon class="h-10 w-10" />
            <h1 class="text-3xl sm:text-4xl text-[#C9A24D] font-light">
              {{ t("payouts.title") }}
            </h1>
          </div>
          <p class="text-[16px] text-[#F4F2ED99]/60 sm:max-w-78.25 md:max-w-3xl">
            {{ t("payouts.subtitle") }}
          </p>
        </div>

        <button
          type="button"
          class="flex justify-center border border-[#C9A24D] font-medium text-[16px] rounded-xl items-center text-left text-[#C9A24D] gap-2 px-6 py-3 hover:bg-[rgba(201,162,77,0.08)] transition"
        >
          <PayoutsDownloadIcon class="h-4 w-4" />
          {{ t("payouts.downloadStatement") }}
        </button>
      </div>

      <!-- KPI cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div
          v-for="card in kpis"
          :key="card.id"
          class="relative overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(11,11,13,0.60)] backdrop-blur-md shadow-[0_0_45px_rgba(0,0,0,0.45)] px-5 py-4 md:px-6 md:py-5"
        >
          <div class="flex items-center justify-between gap-3 mb-3">
            <p class="relative z-1 truncate text-sm text-[#F4F2ED99]">
              {{ card.label }}
            </p>

            <component
              :is="card.iconComponent"
              class="h-5 w-5"
              aria-hidden="true"
            />
          </div>

          <p class="relative z-1 mb-1 text-3xl leading-[1.15] font-light text-[#F4F2ED]">
            {{ card.value }}
          </p>

          <div v-if="card.accent || card.sub" class="mt-2 flex items-center gap-2 text-sm">
            <span v-if="card.accent" class="inline-flex items-center gap-1" :class="card.accentClass">
              <span aria-hidden="true">↗</span>
              <span>{{ card.accent }}</span>
            </span>
            <span v-if="card.sub" class="text-[#F4F2ED99]">{{ card.sub }}</span>
          </div>
        </div>
      </div>

      <!-- Automatic payout settings -->
      <section
        class="rounded-xl border border-[rgba(201,162,77,0.12)] bg-[rgba(11,11,13,0.55)] backdrop-blur-md shadow-[0_0_50px_rgba(0,0,0,0.35)]"
      >
        <div class="p-6 flex flex-col gap-6">
          <div class="flex items-center justify-between gap-4">
            <div class="min-w-0 flex flex-col gap-2">
              <h2 class="text-lg font-light text-[#F4F2ED]">{{ t("payouts.automaticPayoutSettings.title") }}</h2>
              <p class="max-w-63.75 md:w-auto text-sm text-[#F4F2ED99]">
                {{ t("payouts.automaticPayoutSettings.description") }}
              </p>
            </div>
            <button
              type="button"
              class="rounded-lg w-4.5 h-2.5 text-xs bg-[#5B3FD633] border border-[#5B3FD6]"
            >
              {{ t("payouts.automaticPayoutSettings.viewHistory") }}
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="rounded-xl border border-[rgba(201,162,77,0.10)] bg-[rgba(6,6,8,0.35)] p-4 flex flex-col gap-3">
              <div class="flex gap-2">
                <PayoutsCalendarIcon class="h-10 w-10" />
                <div>
                  <p class="text-xs text-[#F4F2ED99]">{{ t("payouts.automaticPayoutSettings.nextPayoutDateTitle") }}</p>
                  <p class="text-[16px] font-light text-[#F4F2ED]">{{ payoutSettings.nextPayoutDate }}</p>
                </div>
              </div>
              <div class="text-[#C9A24D] text-[18px]">
                {{ payoutSettings.nextPayoutAmount }}
              </div>
            </div>
            <div class="rounded-xl border border-[rgba(201,162,77,0.10)] bg-[rgba(6,6,8,0.35)] p-4 flex flex-col gap-3">
              <div class="flex gap-2">
                <PayoutsCardIcon class="h-10 w-10" />
                <div>
                  <p class="text-xs text-[#F4F2ED99]">{{ t("payouts.automaticPayoutSettings.paymentMethodTitle") }}</p>
                  <p class="text-[16px] font-light text-[#F4F2ED]">{{ payoutSettings.methodTitle }}</p>
                  <p class="text-xs text-[#F4F2ED]/45 mt-0.5">{{ payoutSettings.methodSub }}</p>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  class="rounded-xl px-4 py-2 text-[16px] font-medium text-[#F4F2ED]"
                >
                  {{ t("payouts.automaticPayoutSettings.updateMethod") }}
                </button>
              </div>
            </div>

            <div class="rounded-xl border border-[rgba(201,162,77,0.10)] bg-[rgba(6,6,8,0.35)] p-4">
              <p class="text-xs text-[#F4F2ED99]">{{ t("payouts.automaticPayoutSettings.quickActionsTitle") }}</p>
              <div class="mt-3 flex flex-col gap-2">
                <button
                  type="button"
                  class="border border-[#C9A24D] font-medium text-[16px] rounded-xl inline-flex items-center text-left text-[#C9A24D] gap-2 px-6 py-3 hover:bg-[rgba(201,162,77,0.08)] transition"
                >
                  <PayoutsExternalLinkIcon class="h-4 w-4" />
                  {{ t("payouts.automaticPayoutSettings.stripeDashboard") }}
                </button>
                <button
                  type="button"
                  class="rounded-xl px-4 py-2 text-[16px] font-medium text-[#F4F2ED]"
                >
                  {{ t("payouts.automaticPayoutSettings.viewHistory") }}
              </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Referral activity -->
      <section
        class="rounded-2xl border border-[rgba(201,162,77,0.12)] bg-[rgba(11,11,13,0.55)] backdrop-blur-md shadow-[0_0_50px_rgba(0,0,0,0.35)]"
      >
        <div class="p-6 flex flex-col gap-4">
          <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h2 class="text-lg font-light text-[#F4F2ED]">{{ t("payouts.referralActivity.title") }}</h2>
            <div class="flex items-center gap-2">
              <div class="flex items-center gap-2 rounded-xl border border-[rgba(201,162,77,0.16)] bg-[rgba(6,6,8,0.55)] px-3 py-2">
                <PayoutsSearchIcon class="h-4 w-4 text-[#F4F2ED]/45" />
                <input
                  v-model="referralQuery"
                  class="w-56 max-w-full bg-transparent outline-none text-xs text-[#F4F2ED] placeholder:text-[#F4F2ED]/35"
                  :placeholder="t('payouts.referralActivity.searchPlaceholder')"
                  type="text"
                />
              </div>
              <button
                type="button"
                class="rounded-xl border border-[rgba(201,162,77,0.16)] bg-[rgba(6,6,8,0.55)] px-3 py-2 text-xs text-[#F4F2ED]/70 hover:text-[#F4F2ED] transition"
                :aria-label="t('payouts.referralActivity.filterAriaLabel')"
              >
                <PayoutsFilterIcon class="h-4 w-4" />
              </button>
            </div>
          </div>

          <div class="overflow-x-auto no-scrollbar">
            <UTable
              :columns="referralColumns"
              :data="filteredReferrals"
              class="ob-table min-w-205"
            >
              <template #name-cell="{ row }">
                <div class="min-w-0">
                  <p class="text-[16px] font-light text-[#F4F2ED]">{{ row.original.name }}</p>
                  <p class="text-xs text-[#F4F2ED66]">{{ row.original.code }}</p>
                </div>
              </template>
              <template #signupDate-cell="{ row }">
                <div class="min-w-0">
                  <p class="text-sm font-light text-[#F4F2EDCC]">{{ row.original.signupDate }}</p>
                </div>
              </template>

              <template #membership-cell="{ row }">
                <div class="max-w-full h-2.5 rounded-full border border-[#C9A24D4D] bg-[#C9A24D1A]"></div>
              </template>

              <template #spend-cell="{ row }">
                <div class="text-[16px] text-[#F4F2ED] text-right">{{ row.original.spend }}</div>
              </template>

              <template #commission-cell="{ row }">
                <div class="text-[16px] text-[#F4F2ED] text-right">{{ row.original.commission }}</div>
              </template>

              <template #status-cell="{ row }">
                <!-- <span class="inline-flex items-center gap-2 text-xs text-[#F4F2ED]/65">
                  <span class="w-2 h-2 rounded-full" :class="row.original.statusDotClass" />
                  {{ row.original.status }}
                </span> -->
                <div :class="row.original.statusDotClass" class="text-center max-w-full rounded-full border">
                  {{ statusLabel(row.original.status) }}
                </div>
              </template>
            </UTable>
          </div>
        </div>
      </section>

      <!-- Payout history -->
      <section
        class="rounded-2xl border border-[rgba(201,162,77,0.12)] bg-[rgba(11,11,13,0.55)] backdrop-blur-md shadow-[0_0_50px_rgba(0,0,0,0.35)]"
      >
        <div class="p-6">
          <div class="flex items-center justify-between">
            <h2 class="text-lg text-[#F4F2ED]">{{ t("payouts.payoutHistory.title") }}</h2>
            <button type="button" class="text-[16px] font-medium text-[#F4F2ED] hover:text-[#F4F2ED] transition">
              {{ t("payouts.payoutHistory.viewAll") }}
            </button>
          </div>

          <div class="mt-5 overflow-x-auto no-scrollbar">
            <UTable
              :columns="payoutColumns"
              :data="payoutHistory"
              class="ob-table min-w-180"
            >
              <template #payoutId-cell="{ row }">
                <div class="text-sm text-[#F4F2EDCC]">{{ row.original.payoutId }}</div>
              </template>
              <template #amount-cell="{ row }">
                <div class="text-lg text-[#C9A24D]/90 font-light text-right">{{ row.original.amount }}</div>
              </template>
              <template #date-cell="{ row }">
                <div class="text-sm text-[#F4F2EDCC]">{{ row.original.date }}</div>
              </template>
              <template #method-cell="{ row }">
                <div class="text-sm text-[#F4F2EDCC]">{{ row.original.method }}</div>
              </template>

              <template #status-cell="{ row }">
                <div class="max-w-full h-2.5 rounded-full border border-[#5B3FD6] bg-[#5B3FD633]"></div>
              </template>
            </UTable>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import type { Component } from "vue";
import { useI18n } from "#imports";
import type { ColumnDef } from "@tanstack/vue-table";
import PayoutsHeaderIcon from "~/components/icons/PayoutsHeaderIcon.vue";
import PayoutsDownloadIcon from "~/components/icons/PayoutsDownloadIcon.vue";
import PayoutsCalendarIcon from "~/components/icons/PayoutsCalendarIcon.vue";
import PayoutsCardIcon from "~/components/icons/PayoutsCardIcon.vue";
import PayoutsExternalLinkIcon from "~/components/icons/PayoutsExternalLinkIcon.vue";
import PayoutsSearchIcon from "~/components/icons/PayoutsSearchIcon.vue";
import PayoutsFilterIcon from "~/components/icons/PayoutsFilterIcon.vue";
import PayoutsKpiTrendIcon from "~/components/icons/PayoutsKpiTrendIcon.vue";
import PayoutsKpiDollarIcon from "~/components/icons/PayoutsKpiDollarIcon.vue";
import PayoutsKpiClockIcon from "~/components/icons/PayoutsKpiClockIcon.vue";
import PayoutsKpiCheckIcon from "~/components/icons/PayoutsKpiCheckIcon.vue";

type KpiCard = {
  id: string;
  label: string;
  value: string;
  sub?: string;
  accent?: string;
  accentClass?: string;
  dotClass: string;
  iconComponent: Component;
};

type ReferralRow = {
  id: string;
  name: string;
  code: string;
  signupDate: string;
  membershipPct: number;
  membershipBarClass: string;
  spend: string;
  commission: string;
  status: "Active" | "Pending" | "Inactive";
  statusDotClass: string;
};

type PayoutRow = {
  id: string;
  payoutId: string;
  amount: string;
  date: string;
  method: string;
  statusPct: number;
  statusBarClass: string;
};

type TableColumn<T> = ColumnDef<T, unknown>;

const { t } = useI18n();

const referralColumns = computed<TableColumn<ReferralRow>[]>(() => [
  { accessorKey: "name", header: t("payouts.tableHeaders.referrals.referredUser") },
  { accessorKey: "signupDate", header: t("payouts.tableHeaders.referrals.signupDate") },
  { id: "membership", header: t("payouts.tableHeaders.referrals.membership") },
  { accessorKey: "spend", header: t("payouts.tableHeaders.referrals.referralSpend"), meta: { class: { th: "text-right", td: "text-right" } } },
  {
    accessorKey: "commission",
    header: t("payouts.tableHeaders.referrals.commission30"),
    meta: { class: { th: "text-right", td: "text-right" } },
  },
  { accessorKey: "status", header: t("payouts.tableHeaders.referrals.status") },
]);

const payoutColumns = computed<TableColumn<PayoutRow>[]>(() => [
  { accessorKey: "payoutId", header: t("payouts.tableHeaders.payoutHistory.payoutId") },
  { accessorKey: "amount", header: t("payouts.tableHeaders.payoutHistory.amount"), meta: { class: { th: "text-right", td: "text-right" } } },
  { accessorKey: "date", header: t("payouts.tableHeaders.payoutHistory.date") },
  { accessorKey: "method", header: t("payouts.tableHeaders.payoutHistory.method") },
  { id: "status", header: t("payouts.tableHeaders.payoutHistory.status") },
]);

const pendingPayoutDateShort = "Mar 1, 2026";

const kpis = computed<KpiCard[]>(() => [
  {
    id: "total-revenue",
    label: t("payouts.kpis.totalReferralRevenue.label"),
    value: "$24,580.50",
    accent: "+12.5%",
    accentClass: "text-[#5B3FD6]",
    sub: t("payouts.kpis.totalReferralRevenue.sub"),
    dotClass: "bg-[#5B3FD6]",
    iconComponent: PayoutsKpiTrendIcon,
  },
  {
    id: "estimated-commission",
    label: t("payouts.kpis.estimatedCommission30.label"),
    value: "$7,374.15",
    sub: t("payouts.kpis.estimatedCommission30.sub"),
    dotClass: "bg-[#C9A24D]",
    iconComponent: PayoutsKpiDollarIcon,
  },
  {
    id: "pending-payout",
    label: t("payouts.kpis.pendingPayout.label"),
    value: "$2,450.00",
    sub: t("payouts.kpis.pendingPayout.sub", { date: pendingPayoutDateShort }),
    dotClass: "bg-[#C9A24D]",
    iconComponent: PayoutsKpiClockIcon,
  },
  {
    id: "total-paid",
    label: t("payouts.kpis.totalPaid.label"),
    value: "$4,924.15",
    sub: t("payouts.kpis.totalPaid.sub"),
    dotClass: "bg-[#5B3FD6]",
    iconComponent: PayoutsKpiCheckIcon,
  },
]);

const nextPayoutDateLong = "March 1, 2026";

const payoutSettings = computed(() => ({
  nextPayoutDate: t("payouts.automaticPayoutSettings.nextPayoutDateLine", { date: nextPayoutDateLong }),
  nextPayoutAmount: "$2,450.00",
  methodTitle: t("payouts.automaticPayoutSettings.primaryMethodTitle"),
  methodSub: t("payouts.automaticPayoutSettings.stripeConnectSubtitle"),
}));

const referralQuery = ref("");

const referrals = ref<ReferralRow[]>([
  {
    id: "r-001",
    name: "Sarah Mitchell",
    code: "R-001",
    signupDate: "Feb 1, 2026",
    membershipPct: 62,
    membershipBarClass: "bg-[rgba(201,162,77,0.55)]",
    spend: "$299.00",
    commission: "$89.70",
    status: "Active",
    statusDotClass: "border-[#5B3FD6] bg-[#5B3FD633]",
  },
  {
    id: "r-002",
    name: "Mike Rodriguez",
    code: "R-002",
    signupDate: "Feb 3, 2026",
    membershipPct: 48,
    membershipBarClass: "bg-[rgba(201,162,77,0.45)]",
    spend: "$149.00",
    commission: "$44.70",
    status: "Pending",
    statusDotClass: "border-[#C9A24D] bg-[#C9A24D33]",
  },
  {
    id: "r-003",
    name: "Emily Chen",
    code: "R-003",
    signupDate: "Feb 5, 2026",
    membershipPct: 80,
    membershipBarClass: "bg-[rgba(91,63,214,0.55)]",
    spend: "$499.00",
    commission: "$149.70",
    status: "Active",
    statusDotClass: "border-[#5B3FD6] bg-[#5B3FD633]",
  },
  {
    id: "r-004",
    name: "Alex Thompson",
    code: "R-004",
    signupDate: "Feb 7, 2026",
    membershipPct: 40,
    membershipBarClass: "bg-[rgba(201,162,77,0.35)]",
    spend: "$149.00",
    commission: "$44.70",
    status: "Inactive",
    statusDotClass: "border-[#808080] bg-[#8787874d]",
  },
  {
    id: "r-005",
    name: "Jordan Lee",
    code: "R-005",
    signupDate: "Feb 10, 2026",
    membershipPct: 55,
    membershipBarClass: "bg-[rgba(201,162,77,0.50)]",
    spend: "$299.00",
    commission: "$89.70",
    status: "Pending",
    statusDotClass: "border-[#C9A24D] bg-[#C9A24D33]",
  },
]);

const statusLabel = (status: ReferralRow["status"]) => {
  switch (status) {
    case "Active":
      return t("payouts.referralStatuses.active");
    case "Pending":
      return t("payouts.referralStatuses.pending");
    case "Inactive":
      return t("payouts.referralStatuses.inactive");
  }
};

const filteredReferrals = computed(() => {
  const q = referralQuery.value.trim().toLowerCase();
  if (!q) return referrals.value;
  return referrals.value.filter((r) => {
    return (
      r.name.toLowerCase().includes(q) ||
      r.code.toLowerCase().includes(q) ||
      statusLabel(r.status).toLowerCase().includes(q)
    );
  });
});

const payoutHistory: PayoutRow[] = [
  {
    id: "p-001",
    payoutId: "PO-2824-001",
    amount: "$2,450.00",
    date: "Jan 31, 2026",
    method: "Stripe",
    statusPct: 100,
    statusBarClass: "bg-[#5B3FD6]",
  },
  {
    id: "p-002",
    payoutId: "PO-2824-002",
    amount: "$1,874.15",
    date: "Dec 31, 2025",
    method: "Stripe",
    statusPct: 100,
    statusBarClass: "bg-[#5B3FD6]",
  },
  {
    id: "p-003",
    payoutId: "PO-2824-003",
    amount: "$600.00",
    date: "Nov 30, 2025",
    method: "Stripe",
    statusPct: 100,
    statusBarClass: "bg-[#5B3FD6]",
  },
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

/* Nuxt UI table theme shim to match your design */
:deep(.ob-table table) {
  width: 100%;
}

:deep(.ob-table thead tr) {
  color: rgba(244, 242, 237, 0.45);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-size: 11px;
}

:deep(.ob-table thead th) {
  padding: 12px 16px 12px 0;
  font-weight: 300;
  font-size:14px;
  text-transform:capitalize;
}

:deep(.ob-table tbody td) {
  padding: 16px 16px 16px 0;
  border-top: 1px solid rgba(201, 162, 77, 0.08);
  vertical-align: middle;
}

:deep(.ob-table tbody tr:hover) {
  background: rgba(244, 242, 237, 0.03);
}
</style>