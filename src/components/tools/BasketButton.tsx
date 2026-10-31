"use client";

import { Check, Plus } from "lucide-react";
import { useBasket } from "@/lib/basket";
import { track } from "@/lib/analytics";
import { cn } from "@/components/ui/cn";

export function BasketButton({ id, className }: { id: string; className?: string }) {
  const basket = useBasket();
  const inBasket = basket.has(id);
  return (
    <button
      type="button"
      onClick={() => {
        basket.toggle(id);
        track(inBasket ? "basket_remove" : "basket_add", { doc: id });
      }}
      aria-pressed={inBasket}
      className={cn(
        "inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-xs font-medium",
        inBasket ? "border-spc-green-600 bg-spc-green-100 text-spc-green-700" : "border-steel-300 text-navy-900 hover:bg-steel-100",
        className,
      )}
    >
      {inBasket ? <Check className="h-3.5 w-3.5" aria-hidden /> : <Plus className="h-3.5 w-3.5" aria-hidden />}
      {inBasket ? "In basket" : "Add to basket"}
    </button>
  );
}
