// src/store/favorites.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Book } from "@/app/types";

interface FavoritesStore {
  favorites: Book[];
  toggleFavorite: (book: Book) => void;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (book) => {
        const exists = get().favorites.some((b) => b.id === book.id);
        set({
          favorites: exists
            ? get().favorites.filter((b) => b.id !== book.id)
            : [...get().favorites, book],
        });
      },
    }),
    {
      name: "favorites-storage",             // ключ в localStorage
      getStorage: () => localStorage,       // можно опустить, localStorage по умолчанию
    }
  )
);
