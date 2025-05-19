"use client";
import { BookCard } from "./shared/BookCard";

interface Book {
  id: number;
  title: string;
  author: string;
  price: string;
  genre?: string;
  image?: string;
}

export default function Catalog() {
  const books: Book[] = [
    { id: 1, title: "Название", author: "Автор", price: "$20" },
    { id: 2, title: "Название", author: "Автор", price: "$20" },
    { id: 3, title: "Название", author: "Автор", price: "$20" },
    { id: 4, title: "Название", author: "Автор", price: "$20" },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Каталог</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}
