/**
 * Thin analytics wrapper. Events go to GA4 (gtag) and PostHog when those are
 * loaded and consent has been given; otherwise they are no-ops.
 */
type Props = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    posthog?: { capture: (event: string, props?: Props) => void };
    dataLayer?: unknown[];
  }
}

export function track(event: string, props: Props = {}) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", event, props);
  window.posthog?.capture(event, props);
  if (process.env.NODE_ENV === "development") console.debug("[track]", event, props);
}
