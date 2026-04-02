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
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M20 3.33301V36.6663" stroke="#C9A24D" stroke-width="3.33333" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M28.3333 8.33301H15.8333C14.2862 8.33301 12.8025 8.94759 11.7085 10.0416C10.6146 11.1355 10 12.6192 10 14.1663C10 15.7134 10.6146 17.1972 11.7085 18.2911C12.8025 19.3851 14.2862 19.9997 15.8333 19.9997H24.1667C25.7138 19.9997 27.1975 20.6143 28.2915 21.7082C29.3854 22.8022 30 24.2859 30 25.833C30 27.3801 29.3854 28.8638 28.2915 29.9578C27.1975 31.0518 25.7138 31.6663 24.1667 31.6663H10" stroke="#C9A24D" stroke-width="3.33333" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <h1 class="text-3xl sm:text-4xl text-[#C9A24D] font-light">
              Ambassador Earnings
            </h1>
          </div>
          <p class="text-[16px] text-[#F4F2ED99]/60 sm:max-w-78.25 md:max-w-3xl">
            Track your referral commissions and manage automatic payouts
          </p>
        </div>

        <button
          type="button"
          class="flex justify-center border border-[#C9A24D] font-medium text-[16px] rounded-xl items-center text-left text-[#C9A24D] gap-2 px-6 py-3 hover:bg-[rgba(201,162,77,0.08)] transition"
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

            <div
              class=""
              v-html="card.icon || ''"
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
              <h2 class="text-lg font-light text-[#F4F2ED]">Automatic Payout Settings</h2>
              <p class="max-w-63.75 md:w-auto text-sm text-[#F4F2ED99]">
                Your earnings are automatically transferred on the 1st of each month
              </p>
            </div>
            <button
              type="button"
              class="rounded-lg w-4.5 h-2.5 text-xs bg-[#5B3FD633] border border-[#5B3FD6]"
            >
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="rounded-xl border border-[rgba(201,162,77,0.10)] bg-[rgba(6,6,8,0.35)] p-4 flex flex-col gap-3">
              <div class="flex gap-2">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z" fill="#C9A24D" fill-opacity="0.2"/>
                  <path d="M16.6666 11.667V15.0003" stroke="#C9A24D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M23.3334 11.667V15.0003" stroke="#C9A24D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M25.8333 13.333H14.1667C13.2462 13.333 12.5 14.0792 12.5 14.9997V26.6663C12.5 27.5868 13.2462 28.333 14.1667 28.333H25.8333C26.7538 28.333 27.5 27.5868 27.5 26.6663V14.9997C27.5 14.0792 26.7538 13.333 25.8333 13.333Z" stroke="#C9A24D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12.5 18.333H27.5" stroke="#C9A24D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <div>
                  <p class="text-xs text-[#F4F2ED99]">Next Payout Date</p>
                  <p class="text-[16px] font-light text-[#F4F2ED]">{{ payoutSettings.nextPayoutDate }}</p>
                </div>
              </div>
              <div class="text-[#C9A24D] text-[18px]">
                {{ payoutSettings.nextPayoutAmount }}
              </div>
            </div>
            <div class="rounded-xl border border-[rgba(201,162,77,0.10)] bg-[rgba(6,6,8,0.35)] p-4 flex flex-col gap-3">
              <div class="flex gap-2">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z" fill="#5B3FD6" fill-opacity="0.2"/>
                  <path d="M26.6666 14.167H13.3333C12.4128 14.167 11.6666 14.9132 11.6666 15.8337V24.167C11.6666 25.0875 12.4128 25.8337 13.3333 25.8337H26.6666C27.5871 25.8337 28.3333 25.0875 28.3333 24.167V15.8337C28.3333 14.9132 27.5871 14.167 26.6666 14.167Z" stroke="#5B3FD6" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M11.6666 18.333H28.3333" stroke="#5B3FD6" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <div>
                  <p class="text-xs text-[#F4F2ED99]">Payment Method</p>
                  <p class="text-[16px] font-light text-[#F4F2ED]">{{ payoutSettings.methodTitle }}</p>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  class="rounded-xl px-4 py-2 text-[16px] font-medium text-[#F4F2ED]"
                >
                  Update Method
                </button>
              </div>
            </div>

            <div class="rounded-xl border border-[rgba(201,162,77,0.10)] bg-[rgba(6,6,8,0.35)] p-4">
              <p class="text-xs text-[#F4F2ED99]">Quick Actions</p>
              <div class="mt-3 flex flex-col gap-2">
                <button
                  type="button"
                  class="border border-[#C9A24D] font-medium text-[16px] rounded-xl inline-flex items-center text-left text-[#C9A24D] gap-2 px-6 py-3 hover:bg-[rgba(201,162,77,0.08)] transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M10 2H14V6" stroke="#C9A24D" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M6.66669 9.33333L14 2" stroke="#C9A24D" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12 8.66667V12.6667C12 13.0203 11.8595 13.3594 11.6095 13.6095C11.3594 13.8595 11.0203 14 10.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V5.33333C2 4.97971 2.14048 4.64057 2.39052 4.39052C2.64057 4.14048 2.97971 4 3.33333 4H7.33333" stroke="#C9A24D" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  Stripe Dashboard
                </button>
                <button
                  type="button"
                  class="rounded-xl px-4 py-2 text-[16px] font-medium text-[#F4F2ED]"
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
        class="rounded-2xl border border-[rgba(201,162,77,0.12)] bg-[rgba(11,11,13,0.55)] backdrop-blur-md shadow-[0_0_50px_rgba(0,0,0,0.35)]"
      >
        <div class="p-6 flex flex-col gap-4">
          <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h2 class="text-lg font-light text-[#F4F2ED]">Referral Activity</h2>
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
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6.66668 13.3333C6.66662 13.4572 6.70109 13.5787 6.76621 13.6841C6.83133 13.7895 6.92453 13.8746 7.03535 13.93L8.36868 14.5967C8.47035 14.6475 8.58331 14.6714 8.69684 14.6663C8.81038 14.6612 8.92071 14.6271 9.01737 14.5673C9.11402 14.5075 9.19379 14.424 9.24909 14.3247C9.3044 14.2254 9.3334 14.1137 9.33335 14V9.33333C9.3335 9.00292 9.45632 8.68433 9.67801 8.43933L14.4933 3.11333C14.5797 3.01771 14.6364 2.89912 14.6567 2.77192C14.6771 2.64472 14.6601 2.51435 14.6079 2.39658C14.5558 2.27881 14.4706 2.17868 14.3627 2.1083C14.2548 2.03792 14.1288 2.0003 14 2H2.00001C1.87109 2.00005 1.74494 2.03748 1.63685 2.10776C1.52876 2.17804 1.44337 2.27815 1.39102 2.39598C1.33867 2.5138 1.3216 2.64427 1.3419 2.77159C1.36219 2.89892 1.41897 3.01762 1.50535 3.11333L6.32201 8.43933C6.5437 8.68433 6.66653 9.00292 6.66668 9.33333V13.3333Z" stroke="#F4F2ED" stroke-opacity="0.4" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
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
                  {{ row.original.status }}
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
            <h2 class="text-lg text-[#F4F2ED]">Payout History</h2>
            <button type="button" class="text-[16px] font-medium text-[#F4F2ED] hover:text-[#F4F2ED] transition">
              View All
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
import type { ColumnDef } from "@tanstack/vue-table";

type KpiCard = {
  id: string;
  label: string;
  value: string;
  sub?: string;
  accent?: string;
  accentClass?: string;
  dotClass: string;
  icon?: string;
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
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M18.3333 5.83301L11.25 12.9163L7.08329 8.74967L1.66663 14.1663" stroke="#C9A24D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M13.3334 5.83301H18.3334V10.833" stroke="#C9A24D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  },
  {
    id: "estimated-commission",
    label: "Estimated Commission (30%)",
    value: "$7,374.15",
    sub: "lifetime earnings",
    dotClass: "bg-[#C9A24D]",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 1.66699V18.3337" stroke="#C9A24D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M14.1667 4.16699H7.91667C7.14312 4.16699 6.40125 4.47428 5.85427 5.02126C5.30729 5.56825 5 6.31011 5 7.08366C5 7.85721 5.30729 8.59907 5.85427 9.14605C6.40125 9.69303 7.14312 10.0003 7.91667 10.0003H12.0833C12.8569 10.0003 13.5987 10.3076 14.1457 10.8546C14.6927 11.4016 15 12.1434 15 12.917C15 13.6905 14.6927 14.4324 14.1457 14.9794C13.5987 15.5264 12.8569 15.8337 12.0833 15.8337H5" stroke="#C9A24D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  },
  {
    id: "pending-payout",
    label: "Pending Payout",
    value: "$2,450.00",
    sub: "Next: Mar 1, 2026",
    dotClass: "bg-[#C9A24D]",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 18.3337C14.6024 18.3337 18.3334 14.6027 18.3334 10.0003C18.3334 5.39795 14.6024 1.66699 10 1.66699C5.39765 1.66699 1.66669 5.39795 1.66669 10.0003C1.66669 14.6027 5.39765 18.3337 10 18.3337Z" stroke="#C9A24D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M10 5V10L13.3333 11.6667" stroke="#C9A24D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  },
  {
    id: "total-paid",
    label: "Total Paid",
    value: "$4,924.15",
    sub: "all-time payouts",
    dotClass: "bg-[#5B3FD6]",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M18.1675 8.33357C18.5481 10.2013 18.2768 12.1431 17.399 13.8351C16.5212 15.527 15.0899 16.8669 13.3438 17.6313C11.5976 18.3957 9.64218 18.5384 7.80357 18.0355C5.96497 17.5327 4.35432 16.4147 3.24022 14.8681C2.12613 13.3214 1.57593 11.4396 1.68138 9.53639C1.78683 7.63318 2.54156 5.82364 3.8197 4.40954C5.09784 2.99545 6.82214 2.06226 8.70505 1.76561C10.5879 1.46897 12.5156 1.82679 14.1667 2.7794" stroke="#5B3FD6" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M7.5 9.16634L10 11.6663L18.3333 3.33301" stroke="#5B3FD6" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  },
];

const payoutSettings = {
  nextPayoutDate: "March 1, 2026",
  nextPayoutAmount: "$2,450.00",
  methodTitle: "Stripe Connect",
  methodSub: "Update Method",
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