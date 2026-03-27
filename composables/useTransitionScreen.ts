import { useRouter, useState, nextTick } from "#imports";

export const useTransitionScreen = () => {
  const router = useRouter();

  // Shared state: default hidden; we show only during navigations we control
  const show = useState<boolean>("transition:show", () => false);
  const target = useState<string>("transition:target", () => "/");

  const startTransition = async (path: string) => {
    target.value = path;
    show.value = true;
    await nextTick();

    // We want two things:
    // - Avoid flashing the previous page (e.g. default page) after login
    // - Avoid flicker (minimum display time)
    //
    // So we enforce a small minimum display time to avoid flicker,
    // and we keep the overlay visible until navigation actually completes
    // (so the previous/default page never flashes).
    const startedAt = Date.now();
    // Keep it visible long enough to feel like a real transition
    // (but still never show the previous/default page after login).
    const minMs = 1700;

    let finished = false;
    let removeHook: (() => void) | undefined;

    const finish = () => {
      if (finished) return;
      finished = true;
      if (removeHook) removeHook();

      const elapsed = Date.now() - startedAt;
      const remainingMin = Math.max(0, minMs - elapsed);
      if (remainingMin > 0) {
        window.setTimeout(() => {
          show.value = false;
        }, remainingMin);
      } else {
        show.value = false;
      }  
      };

    // Hide as soon as navigation completes (respecting min time)
    removeHook = router.afterEach(() => {
      finish();  
    });

    // Trigger navigation and also allow callers to await it.
    try {
      await router.push(path);
    } catch (e) {
      // If navigation fails, remove overlay quickly
      finish();
      throw e;
    }
  };

  const completeTransition = () => {
    show.value = false;
  };

  return {
    show,
    target,
    startTransition,
    completeTransition,
  };
};
