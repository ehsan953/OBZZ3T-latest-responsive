import { defineStore } from "pinia";

type ObserverStateStatus = "idle" | "active" | "expired" | "blocked";

type ObserverApiResult = {
  allowed?: boolean;
  expires_at?: string;
  remaining_seconds?: number;
  message?: string;
  [key: string]: any;
};

function getApiBaseUrl(): string {
  const config = useRuntimeConfig();
  return (
    config.public.apiBaseUrl ||
    process.env.NUXT_PUBLIC_API_BASE_URL ||
    "https://staging-api.ob33z.com/api" ||
    "http://localhost:8000/api"
  );
}

function readLs(key: string): string | null {
  if (!process.client) return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeLs(key: string, value: string) {
  if (!process.client) return;
  try {
    localStorage.setItem(key, value);
  } catch {
    // ignore
  }
}

function removeLs(key: string) {
  if (!process.client) return;
  try {
    localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

function parseDateMs(value: string | null): number | null {
  if (!value) return null;
  const ms = Date.parse(value);
  return Number.isFinite(ms) ? ms : null;
}

export const useObserverStore = defineStore("observer", {
  state: () => ({
    status: "idle" as ObserverStateStatus,
    startedAtMs: null as number | null,
    endsAtMs: null as number | null,
    lastServerMessage: null as string | null,
    isInitialized: false,
  }),

  getters: {
    isActive: (s) => s.status === "active",
    isExpired: (s) => s.status === "expired",
    isBlocked: (s) => s.status === "blocked",
    remainingMs: (s) => {
      if (s.status !== "active" || !s.endsAtMs) return 0;
      return Math.max(0, s.endsAtMs - Date.now());
    },
  },

  actions: {
    initFromStorage() {
      if (!process.client) return;
      const started = parseDateMs(readLs("observer_started_at"));
      const ends = parseDateMs(readLs("observer_ends_at"));

      this.startedAtMs = started;
      this.endsAtMs = ends;

      if (ends && Date.now() < ends) {
        this.status = "active";
      } else if (ends && Date.now() >= ends) {
        this.status = "expired";
      } else {
        this.status = "idle";
      }

      this.isInitialized = true;
    },

    clear() {
      this.status = "idle";
      this.startedAtMs = null;
      this.endsAtMs = null;
      this.lastServerMessage = null;
      removeLs("observer_started_at");
      removeLs("observer_ends_at");
    },

    markExpired() {
      this.status = "expired";
    },

    async startObserver(): Promise<{ ok: boolean; reason?: string }> {
      // If already active, do nothing.
      if (this.status === "active" && this.endsAtMs && Date.now() < this.endsAtMs) {
        return { ok: true };
      }

      this.lastServerMessage = null;

      try {
        const baseUrl = getApiBaseUrl();
        const url = `${baseUrl}/observer-mode`;

        const res = await $fetch<ObserverApiResult>(url, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        });

        const payload = (res as any)?.data ?? res;
        const message = payload?.message || (res as any)?.message;
        this.lastServerMessage = message ?? null;

        // If backend indicates failure, require login/join.
        // Common API shape in your collection: { success: false, message: "You must sign in..." }
        const successFlag = (payload as any)?.success;
        if (successFlag === false) {
          this.status = "blocked";
          return { ok: false, reason: message || "Please sign in or join to access the platform." };
        }

        // Some backends may not send `success`, but return a message indicating auth is required.
        const msg = String(message || "").toLowerCase();
        if (msg.includes("must sign in") || msg.includes("must login") || msg.includes("must log in") || msg.includes("must join")) {
          this.status = "blocked";
          return { ok: false, reason: message || "Please sign in or join to access the platform." };
        }

        const now = Date.now();
        let endsAt = now + 15 * 60 * 1000;

        if (typeof payload?.remaining_seconds === "number" && payload.remaining_seconds > 0) {
          endsAt = now + Math.floor(payload.remaining_seconds * 1000);
        } else if (payload?.expires_at) {
          const serverEnds = Date.parse(String(payload.expires_at));
          if (Number.isFinite(serverEnds)) endsAt = serverEnds;
        }

        // If server says observer already expired (or remaining is 0), do not restart it.
        if (endsAt <= now) {
          this.status = "blocked";
          return { ok: false, reason: message || "Observer mode ended. Please sign in." };
        }

        this.startedAtMs = now;
        this.endsAtMs = endsAt;
        this.status = "active";

        writeLs("observer_started_at", new Date(now).toISOString());
        writeLs("observer_ends_at", new Date(endsAt).toISOString());

        return { ok: true };
      } catch (e: any) {
        // If API is unreachable, do NOT start observer mode (fail closed),
        // because the backend may be enforcing the "same IP can't re-enter" rule.
        this.status = "blocked";
        return { ok: false, reason: "Unable to start observer mode. Please sign in." };
      }
    },
  },
});

