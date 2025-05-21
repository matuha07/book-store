"use client";

import React from "react";
import { BookCard } from "@/components/shared/BookCard";
import { useFavoritesStore } from "@/app/stores/favorites";

export default function FavoritesPage() {
  const favorites = useFavoritesStore((state) => state.favorites);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Избранное</h1>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-600">В избранном пока нет книг.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {favorites.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
