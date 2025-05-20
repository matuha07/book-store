"use client";

import { useEffect, useState } from "react";
import { BookCard } from "@/components/shared/BookCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useStore } from "@/app/store"; 
import { Book } from "@/app/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface OLBook {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  subject?: string[];
  description?: string | { value: string };
  first_sentence?: string | string[] | { value: string };
}

function mapOpenLibraryBookToBook(doc: OLBook): Book {
  // Извлекаем описание из поля description или first_sentence
  let description = "Описание отсутствует";
  if (typeof doc.description === "string") {
    description = doc.description;
  } else if (doc.description && "value" in doc.description) {
    description = doc.description.value;
  } else if (typeof doc.first_sentence === "string") {
    description = doc.first_sentence;
  } else if (Array.isArray(doc.first_sentence) && doc.first_sentence.length > 0) {
    description = doc.first_sentence[0];
  } else if (doc.first_sentence && "value" in doc.first_sentence) {
    description = doc.first_sentence.value;
  }

  return {
    id: doc.key.replace("/works/", ""),
    title: doc.title,
    author: doc.author_name ? doc.author_name.join(", ") : "Автор неизвестен",
    price: `$${Math.floor(Math.random() * 90) + 10}`,
    genre: doc.subject ? doc.subject[0] : "Не указан",
    image: doc.cover_i
      ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`
      : undefined,
    description,
  };
}

export default function OpenLibraryCatalog() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [genreFilter, setGenreFilter] = useState<string>("");
  const [allGenres, setAllGenres] = useState<string[]>([]);
  const searchQuery = useStore((state) => state.searchQuery); // Получаем поисковый запрос из Zustand

  const pageSize = 10;

  useEffect(() => {
    async function fetchBooks() {
      setLoading(true);
      let url = `https://openlibrary.org/search.json?page=${page}&limit=${pageSize}`;
      
      // Если есть поисковый запрос, используем его, иначе фильтруем по жанру (comics)
      if (searchQuery) {
        url = `https://openlibrary.org/search.json?q=${encodeURIComponent(searchQuery)}&page=${page}&limit=${pageSize}`;
      } else {
        url = `https://openlibrary.org/search.json?subject=comics&page=${page}&limit=${pageSize}`;
      }

      try {
        const res = await fetch(url);
        const data = await res.json();

        const mapped: Book[] = data.docs.map(mapOpenLibraryBookToBook);

        const genres: string[] = Array.from(
          new Set(
            mapped
              .map((book) => book.genre)
              .filter((g): g is string => Boolean(g))
          )
        );

        setAllGenres(genres);

        const filtered = genreFilter
          ? mapped.filter((b) => b.genre === genreFilter)
          : mapped;

        setBooks(filtered.slice(0, pageSize));
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, [page, genreFilter, searchQuery]); // Добавляем searchQuery в зависимости

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-xs mb-6">
        <Select
          value={genreFilter}
          onValueChange={(value) =>
            setGenreFilter(value === "all" ? "" : value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Выберите жанр" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все жанры</SelectItem>
            {allGenres.map((genre) => (
              <SelectItem key={genre} value={genre}>
                {genre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

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
            <Button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
            >
              Назад
            </Button>
            <span className="self-center">Страница {page}</span>
            <Button onClick={() => setPage((p) => p + 1)}>Вперёд</Button>
          </div>
        </>
      )}
    </div>
  );
}