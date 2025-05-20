"use client";
import { useEffect, useState } from "react";
import { BookCard } from "@/components/shared/BookCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { Book } from "@/app/types";
import { Button } from "@/components/ui/button";

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
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    async function fetchBooks() {
      setLoading(true);
      const res = await fetch(`https://openlibrary.org/search.json?subject=comics&page=${page}`);
      const data = await res.json();
      const mapped = data.docs.slice(0, pageSize).map(mapOpenLibraryBookToBook);
      setBooks(mapped);
      setLoading(false);
    }

    fetchBooks();
  }, [page]);

  return (
    <div className="container mx-auto p-6">
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-[750px] w-[425px] rounded-md" />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>

          <div className="flex justify-center mt-6 gap-4">
            <Button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
              Назад
            </Button>
            <span className="self-center">Страница {page}</span>
            <Button onClick={() => setPage((p) => p + 1)}>
              Вперёд
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
