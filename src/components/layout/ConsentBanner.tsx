"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { buttonClasses } from "@/components/ui/Button";

const KEY = "spc-consent-v1";
type Consent = { analytics: boolean; marketing: boolean };

/**
 * Minimal Consent Mode v2 banner. Defaults are "denied" (set in the root
 * layout); choices update gtag consent and are remembered in localStorage.
 * Swap for a full CMP if RPM mandates one.
 */
export function ConsentBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    if (saved) apply(JSON.parse(saved) as Consent);
    else setShow(true);
  }, []);

  function apply(c: Consent) {
    window.gtag?.("consent", "update", {
      analytics_storage: c.analytics ? "granted" : "denied",
      ad_storage: c.marketing ? "granted" : "denied",
      ad_user_data: c.marketing ? "granted" : "denied",
      ad_personalization: c.marketing ? "granted" : "denied",
    });
  }

  function choose(c: Consent) {
    localStorage.setItem(KEY, JSON.stringify(c));
    apply(c);
    setShow(false);
  }

  if (!show) return null;
  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-3 bottom-20 z-[55] rounded-xl border border-steel-200 bg-white p-4 text-sm text-steel-700 shadow-2xl sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-md"
    >
      <p>
        We use cookies to measure how the site is used and improve it. You can accept analytics, or keep only what&apos;s
        essential. See our{" "}
        <Link href="/privacy" className="underline">
          privacy notice
        </Link>
        .
      </p>
      <div className="mt-3 flex gap-2">
        <button className={buttonClasses("secondary", "sm")} onClick={() => choose({ analytics: true, marketing: false })}>
          Accept analytics
        </button>
        <button className={buttonClasses("ghost", "sm")} onClick={() => choose({ analytics: false, marketing: false })}>
          Essential only
        </button>
      </div>
    </div>
  );
}
