import { defaultWhatsappNumber, site } from "./site";

/** Build a wa.me click-to-chat link with page-context prefilled text. */
export function buildWhatsappLink(context?: string, number = defaultWhatsappNumber()): string | null {
  if (!number) return null;
  const text = context
    ? `Hi SPC, I'm looking at ${context} and have a question about…`
    : "Hi SPC, I have a question about…";
  return `https://wa.me/${number.replace(/[^\d]/g, "")}?text=${encodeURIComponent(text)}`;
}

/** Whether SPC's team is inside business hours right now (Pacific time). */
export function isWithinBusinessHours(now = new Date()): boolean {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: site.hours.timezone,
    weekday: "short",
    hour: "numeric",
    hour12: false,
  }).formatToParts(now);
  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "";
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0) % 24;
  const dayIndex = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(weekday);
  return (site.hours.days as readonly number[]).includes(dayIndex) && hour >= site.hours.openHour && hour < site.hours.closeHour;
}
