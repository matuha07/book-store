// src/app/favorites/page.tsx
"use client";
import { BookCard } from "@/components/shared/BookCard";
import { useFavoritesStore } from "../stores/favorites";
import { Header } from "@/components/shared/Header";

export default function FavoritesPage() {
  const favorites = useFavoritesStore((s) => s.favorites);

  return (
    <>
    <Header/>
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Избранное</h1>
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
    </>
  );
}
