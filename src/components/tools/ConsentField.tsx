import Link from "next/link";

export function ConsentField({ id = "consent" }: { id?: string }) {
  return (
    <label htmlFor={id} className="flex items-start gap-2 text-xs text-steel-700">
      <input id={id} name="consent" type="checkbox" required className="mt-0.5" />
      <span>
        I agree that SPC may store my details to respond to this request, as described in the{" "}
        <Link href="/privacy" className="underline">privacy notice</Link>. You can ask us to delete them at any time.
      </span>
    </label>
  );
}

/** Hidden honeypot field for bots. */
export function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[9999px]">
      <label>
        Website <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}
