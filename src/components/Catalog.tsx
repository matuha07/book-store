"use client";
import { useEffect, useState } from "react";
import { BookCard } from "@/components/shared/BookCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { Book } from "@/app/types";

interface OLBook {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  subject?: string[];
}


function mapOpenLibraryBookToBook(doc: OLBook): Book {
  return {
    id: doc.key.replace("/works/", ""),
    title: doc.title,
    author: doc.author_name ? doc.author_name.join(", ") : "Автор неизвестен",
    price: `$${Math.floor(Math.random() * 90) + 10}`,
    genre: doc.subject ? doc.subject[0] : undefined,
    image: doc.cover_i
      ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
      : undefined,
  };
}

export default function OpenLibraryCatalog() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      const res = await fetch("https://openlibrary.org/search.json?subject=comics");
      const data = await res.json();
      const mapped = data.docs.map(mapOpenLibraryBookToBook);
      setBooks(mapped);
      setLoading(false);
    }

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-[750px] w-[425px] rounded-md" />
        ))}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}
