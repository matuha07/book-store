// src/store/favorites.ts
import { create } from "zustand";
import type { Book } from "@/app/types";

interface FavoritesStore {
  favorites: Book[];
  toggleFavorite: (book: Book) => void;
}

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  favorites: [],
  toggleFavorite: (book) => {
    const exists = get().favorites.some((b) => b.id === book.id);
    set({
      favorites: exists
        ? get().favorites.filter((b) => b.id !== book.id)
        : [...get().favorites, book],
    });
  },
}));
