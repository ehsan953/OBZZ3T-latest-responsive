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

    <div class="relative max-w-7xl mx-auto pt-2 pb-10 md:py-8 md:px-4">
      <!-- Header -->
      <div class="opacity-0 animate-delay-md mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
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
          type="button"
          class="border border-[#C9A24D] rounded-xl inline-flex items-center text-left text-[#C9A24D] gap-2 px-4 py-2 md:px-6 md:py-3 hover:bg-[rgba(201,162,77,0.08)] transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10" stroke="#C9A24D" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M4.66669 6.66699L8.00002 10.0003L11.3334 6.66699" stroke="#C9A24D" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8 10V2" stroke="#C9A24D" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Download Statement
        </button>
      </div>

      <!-- KPI cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div
          v-for="card in kpis"
          :key="card.id"
          class="rounded-2xl border border-[rgba(201,162,77,0.12)] bg-[rgba(11,11,13,0.55)] backdrop-blur-md shadow-[0_0_40px_rgba(0,0,0,0.35)] p-5"
        >
          <div class="flex items-start justify-between gap-3">
            <div class="min-w-0">
              <div class="flex items-center gap-2 text-xs text-[#F4F2ED]/55">
                <span class="inline-block w-2 h-2 rounded-full" :class="card.dotClass" />
                <span class="truncate">{{ card.label }}</span>
              </div>
              <p class="text-2xl font-light text-[#F4F2ED] mt-2">{{ card.value }}</p>
              <p v-if="card.sub" class="text-[11px] text-[#F4F2ED]/45 mt-1">{{ card.sub }}</p>
            </div>
            <div v-if="card.accent" class="text-xs font-medium" :class="card.accentClass">
              {{ card.accent }}
            </div>
          </div>
        </div>
      </div>

      <!-- Automatic payout settings -->
      <section
        class="rounded-2xl border border-[rgba(201,162,77,0.12)] bg-[rgba(11,11,13,0.55)] backdrop-blur-md shadow-[0_0_50px_rgba(0,0,0,0.35)] mb-6"
      >
        <div class="p-6">
          <div class="flex items-start justify-between gap-4">
            <div class="min-w-0">
              <h2 class="text-sm tracking-wide text-[#F4F2ED]/85">Automatic Payout Settings</h2>
              <p class="text-xs text-[#F4F2ED]/50 mt-1">
                Your earnings are automatically transferred on the 1st of each month
              </p>
            </div>
            <button
              type="button"
              class="text-xs text-[#F4F2ED]/55 hover:text-[#F4F2ED] transition"
            >
              View History
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div class="rounded-xl border border-[rgba(201,162,77,0.10)] bg-[rgba(6,6,8,0.35)] p-4">
              <p class="text-[11px] uppercase tracking-[0.16em] text-[#F4F2ED]/45">Next Payout Date</p>
              <div class="mt-2 flex items-baseline justify-between gap-3">
                <p class="text-sm text-[#F4F2ED]/85">{{ payoutSettings.nextPayoutDate }}</p>
                <p class="text-sm font-light text-[#C9A24D]">{{ payoutSettings.nextPayoutAmount }}</p>
              </div>
            </div>

            <div class="rounded-xl border border-[rgba(201,162,77,0.10)] bg-[rgba(6,6,8,0.35)] p-4">
              <p class="text-[11px] uppercase tracking-[0.16em] text-[#F4F2ED]/45">Payment Method</p>
              <div class="mt-2 flex items-center justify-between gap-3">
                <div class="min-w-0">
                  <p class="text-sm text-[#F4F2ED]/85 truncate">{{ payoutSettings.methodTitle }}</p>
                  <p class="text-xs text-[#F4F2ED]/45 mt-0.5">{{ payoutSettings.methodSub }}</p>
                </div>
                <button
                  type="button"
                  class="text-xs text-[#C9A24D] hover:text-[#F4F2ED] transition"
                >
                  Update Method
                </button>
              </div>
            </div>

            <div class="rounded-xl border border-[rgba(201,162,77,0.10)] bg-[rgba(6,6,8,0.35)] p-4">
              <p class="text-[11px] uppercase tracking-[0.16em] text-[#F4F2ED]/45">Quick Actions</p>
              <div class="mt-3 flex flex-col gap-2">
                <button
                  type="button"
                  class="w-full rounded-xl border border-[rgba(201,162,77,0.22)] bg-[rgba(201,162,77,0.08)] px-4 py-2 text-xs text-[#C9A24D] hover:bg-[rgba(201,162,77,0.12)] transition text-left"
                >
                  Stripe Dashboard
                </button>
                <button
                  type="button"
                  class="w-full rounded-xl border border-[rgba(244,242,237,0.12)] bg-[rgba(244,242,237,0.04)] px-4 py-2 text-xs text-[#F4F2ED]/75 hover:bg-[rgba(244,242,237,0.06)] transition text-left"
                >
                  View History
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Referral activity -->
      <section
        class="rounded-2xl border border-[rgba(201,162,77,0.12)] bg-[rgba(11,11,13,0.55)] backdrop-blur-md shadow-[0_0_50px_rgba(0,0,0,0.35)] mb-6"
      >
        <div class="p-6">
          <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h2 class="text-sm tracking-wide text-[#F4F2ED]/85">Referral Activity</h2>
            <div class="flex items-center gap-2">
              <div class="flex items-center gap-2 rounded-xl border border-[rgba(201,162,77,0.16)] bg-[rgba(6,6,8,0.55)] px-3 py-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="text-[#F4F2ED]/45">
                  <path d="M21 21l-4.35-4.35" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/>
                </svg>
                <input
                  v-model="referralQuery"
                  class="w-56 max-w-full bg-transparent outline-none text-xs text-[#F4F2ED] placeholder:text-[#F4F2ED]/35"
                  placeholder="Search referrals..."
                  type="text"
                />
              </div>
              <button
                type="button"
                class="rounded-xl border border-[rgba(201,162,77,0.16)] bg-[rgba(6,6,8,0.55)] px-3 py-2 text-xs text-[#F4F2ED]/70 hover:text-[#F4F2ED] transition"
                aria-label="Filter"
              >
                ⏷
              </button>
            </div>
          </div>

          <div class="mt-5 overflow-x-auto no-scrollbar">
            <UTable
              :columns="referralColumns"
              :data="filteredReferrals"
              class="ob-table min-w-205"
            >
              <template #name-cell="{ row }">
                <div class="min-w-0">
                  <p class="text-sm text-[#F4F2ED]/85">{{ row.original.name }}</p>
                  <p class="text-xs text-[#F4F2ED]/45">{{ row.original.code }}</p>
                </div>
              </template>

              <template #membership-cell="{ row }">
                <div class="w-40 max-w-full h-1.5 rounded-full bg-[rgba(244,242,237,0.10)] overflow-hidden">
                  <div
                    class="h-full rounded-full"
                    :class="row.original.membershipBarClass"
                    :style="{ width: row.original.membershipPct + '%' }"
                  />
                </div>
              </template>

              <template #spend-cell="{ row }">
                <div class="text-sm text-[#F4F2ED]/70 text-right">{{ row.original.spend }}</div>
              </template>

              <template #commission-cell="{ row }">
                <div class="text-sm text-[#C9A24D]/90 text-right">{{ row.original.commission }}</div>
              </template>

              <template #status-cell="{ row }">
                <span class="inline-flex items-center gap-2 text-xs text-[#F4F2ED]/65">
                  <span class="w-2 h-2 rounded-full" :class="row.original.statusDotClass" />
                  {{ row.original.status }}
                </span>
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
            <h2 class="text-sm tracking-wide text-[#F4F2ED]/85">Payout History</h2>
            <button type="button" class="text-xs text-[#F4F2ED]/55 hover:text-[#F4F2ED] transition">
              View All
            </button>
          </div>

          <div class="mt-5 overflow-x-auto no-scrollbar">
            <UTable
              :columns="payoutColumns"
              :data="payoutHistory"
              class="ob-table min-w-180"
            >
              <template #amount-cell="{ row }">
                <div class="text-sm text-[#C9A24D]/90 text-right">{{ row.original.amount }}</div>
              </template>

              <template #status-cell="{ row }">
                <div class="w-28 h-1.5 rounded-full bg-[rgba(244,242,237,0.10)] overflow-hidden">
                  <div
                    class="h-full rounded-full"
                    :class="row.original.statusBarClass"
                    :style="{ width: row.original.statusPct + '%' }"
                  />
                </div>
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
import type { ColumnDef } from "@tanstack/vue-table";

type KpiCard = {
  id: string;
  label: string;
  value: string;
  sub?: string;
  accent?: string;
  accentClass?: string;
  dotClass: string;
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

const referralColumns: TableColumn<ReferralRow>[] = [
  { accessorKey: "name", header: "Referred User" },
  { accessorKey: "signupDate", header: "Signup Date" },
  { id: "membership", header: "Membership" },
  { accessorKey: "spend", header: "Referral Spend", meta: { class: { th: "text-right", td: "text-right" } } },
  { accessorKey: "commission", header: "Commission (30%)", meta: { class: { th: "text-right", td: "text-right" } } },
  { accessorKey: "status", header: "Status" },
];

const payoutColumns: TableColumn<PayoutRow>[] = [
  { accessorKey: "payoutId", header: "Payout ID" },
  { accessorKey: "amount", header: "Amount", meta: { class: { th: "text-right", td: "text-right" } } },
  { accessorKey: "date", header: "Date" },
  { accessorKey: "method", header: "Method" },
  { id: "status", header: "Status" },
];

const kpis: KpiCard[] = [
  {
    id: "total-revenue",
    label: "Total Referral Revenue",
    value: "$24,580.50",
    accent: "+12.5%",
    accentClass: "text-[#5B3FD6]",
    sub: "this month",
    dotClass: "bg-[#5B3FD6]",
  },
  {
    id: "estimated-commission",
    label: "Estimated Commission (30%)",
    value: "$7,374.15",
    sub: "lifetime earnings",
    dotClass: "bg-[#C9A24D]",
  },
  {
    id: "pending-payout",
    label: "Pending Payout",
    value: "$2,450.00",
    sub: "Next: Mar 1, 2026",
    dotClass: "bg-[#C9A24D]",
  },
  {
    id: "total-paid",
    label: "Total Paid",
    value: "$4,924.15",
    sub: "all-time payouts",
    dotClass: "bg-[#5B3FD6]",
  },
];

const payoutSettings = {
  nextPayoutDate: "Next payout date · March 1, 2026",
  nextPayoutAmount: "$2,450.00",
  methodTitle: "Primary Method",
  methodSub: "Stripe Connect",
};

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
    statusDotClass: "bg-[#5B3FD6]",
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
    statusDotClass: "bg-[#C9A24D]",
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
    statusDotClass: "bg-[#5B3FD6]",
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
    statusDotClass: "bg-[rgba(244,242,237,0.30)]",
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
    statusDotClass: "bg-[#C9A24D]",
  },
]);

const filteredReferrals = computed(() => {
  const q = referralQuery.value.trim().toLowerCase();
  if (!q) return referrals.value;
  return referrals.value.filter((r) => {
    return (
      r.name.toLowerCase().includes(q) ||
      r.code.toLowerCase().includes(q) ||
      r.status.toLowerCase().includes(q)
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
  font-weight: 500;
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