"use client";

import { useCallback, useEffect, useState } from "react";

const KEY = "spc-doc-basket";
const EVENT = "spc-basket-change";

function read(): string[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]") as string[];
  } catch {
    return [];
  }
}

/** Document basket shared across pages (localStorage + same-tab event). */
export function useBasket() {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    const sync = () => setItems(read());
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const write = useCallback((next: string[]) => {
    localStorage.setItem(KEY, JSON.stringify(next));
    window.dispatchEvent(new Event(EVENT));
  }, []);

  return {
    items,
    has: (id: string) => items.includes(id),
    toggle: (id: string) => write(items.includes(id) ? items.filter((i) => i !== id) : [...items, id]),
    clear: () => write([]),
  };
}
