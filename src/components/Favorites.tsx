"use client";
import { BookCard } from "@/components/shared/BookCard";

const favoriteBooks = [
  { id: "1", title: "Название", author: "Автор", price: "$20" },
  { id: "2", title: "Название", author: "Автор", price: "$20" },
  { id: "3", title: "Название", author: "Автор", price: "$20" },
  { id: "4", title: "Название", author: "Автор", price: "$20" },
];

export default function FavoritesPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
        {favoriteBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}
