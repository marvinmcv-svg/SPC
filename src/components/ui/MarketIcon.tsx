import { Factory, Droplets, Ship, Cylinder, Waypoints } from "lucide-react";
import type { Market } from "@/content/types";

const map = {
  pipeline: Waypoints,
  ship: Ship,
  tank: Cylinder,
  water: Droplets,
  factory: Factory,
} as const;

export function MarketIcon({ icon, className }: { icon: Market["icon"]; className?: string }) {
  const Icon = map[icon];
  return <Icon aria-hidden className={className} />;
}
