import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Book } from "@/app/types";

interface CartStore {
  cart: Book[];
  addToCart: (book: Book) => void;
  removeFromCart: (bookId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (book) => {
        const exists = get().cart.some((b) => b.id === book.id);
        set({
          cart: exists ? get().cart : [...get().cart, book],
        });
      },
      removeFromCart: (bookId) => {
        set({ cart :get().cart.filter((b) => b.id !== bookId)}
    )},
      clearCart: () => set ({cart: []}),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
)