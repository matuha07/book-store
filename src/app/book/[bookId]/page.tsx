"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/shared/Header";
import { Skeleton } from "@/components/ui/skeleton";
import { Book } from "@/app/types";
import { useCartStore } from "@/app/stores/cart";
import { useFavoritesStore } from "@/app/stores/favorites";

interface OLBook {
  key: string;
  title: string;
  authors?: { author: { key: string } }[];
  covers?: number[];
  subject?: string[];
  description?: string | { value: string };
  first_sentence?: string | string[] | { value: string };
}

export default function BookPage() {
  const { bookId } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  const addToCart    = useCartStore((s) => s.addToCart);
  const cart         = useCartStore((s) => s.cart);
  const favorites    = useFavoritesStore((s) => s.favorites);
  const toggleFav    = useFavoritesStore((s) => s.toggleFavorite);

  const inCart = !!book && cart.some((b) => b.id === book.id);
  const isFav  = !!book && favorites.some((b) => b.id === book.id);

  useEffect(() => {
    async function fetchBook() {
      try {
        const res = await fetch(
          `https://openlibrary.org/works/${bookId}.json`,
          { cache: "force-cache" }
        );
        const data: OLBook = await res.json();

        let description = "Описание отсутствует";
        if (typeof data.description === "string") {
          description = data.description;
        } else if (data.description && "value" in data.description) {
          description = data.description.value;
        } else if (typeof data.first_sentence === "string") {
          description = data.first_sentence;
        } else if (
          Array.isArray(data.first_sentence) &&
          data.first_sentence.length > 0
        ) {
          description = data.first_sentence[0];
        } else if (data.first_sentence && "value" in data.first_sentence) {
          description = data.first_sentence.value;
        }

        let author = "Автор неизвестен";
        if (data.authors && data.authors.length > 0) {
          const authorKey = data.authors[0].author.key;
          const authorRes = await fetch(
            `https://openlibrary.org${authorKey}.json`,
            { cache: "force-cache" }
          );
          const authorData = await authorRes.json();
          if (authorData.name) {
            author = authorData.name;
          }
        }

        const mappedBook: Book = {
          id: data.key.replace("/works/", ""),
          title: data.title,
          author,
          price: `$${Math.floor(Math.random() * 90) + 10}`,
          genre: data.subject ? data.subject[0] : "Не указан",
          image:
            data.covers?.[0] && data.covers[0] > 0
              ? `https://covers.openlibrary.org/b/id/${data.covers[0]}-L.jpg`
              : "/placeholder.jpg",
          description,
        };

        setBook(mappedBook);
        console.log("Book Image URL:", mappedBook.image);
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setLoading(false);
      }
    }

    if (bookId) {
      fetchBook();
    }
  }, [bookId]);

  if (loading) {
    return (
      <>
        <div className="container mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row gap-10 items-start">
            <Skeleton className="w-full md:w-1/3 h-[400px] rounded-md" />
            <div className="w-full md:w-2/3 flex flex-col gap-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-10 w-40" />
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!book) {
    return (
      <>
        <div className="container mx-auto px-6 py-10">
          <p className="text-gray-600">Книга не найдена</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row gap-10 items-start">
          <div className="w-full md:w-1/3">
            <div className="bg-gray-400 rounded-md aspect-[3/4] w-full overflow-hidden">
              {book.image ? (
                <Image
                  src={book.image}
                  alt={book.title}
                  width={400}
                  height={600}
                  className="object-contain w-full h-full"
                />
              ) : (
                <div className="h-full bg-gray-400 flex items-center justify-center text-gray-600 rounded-md">
                  Нет обложки
                </div>
              )}
            </div>
          </div>

          <div className="w-full md:w-2/3 flex flex-col justify-between h-full">
            <div>
              <div className="flex justify-between items-start mb-2">
                <h1 className="text-2xl font-semibold">{book.title}</h1>
                <span className="text-xl font-medium">{book.price}</span>
              </div>
              <p className="text-gray-700">{book.author}</p>
              <p className="text-gray-600">{book.genre}</p>
              <p className="text-gray-800 mt-4 max-w-prose leading-relaxed">
                {book.description}
              </p>
            </div>

            <div className="mt-8 flex gap-4 items-center">
 <button
  onClick={() => addToCart(book!)}
  disabled={inCart}
  className={`
    mt-2 px-6 py-3 rounded-xl text-white font-medium shadow transition-colors duration-200 outline-none focus:ring-2 focus:ring-offset-2
    ${inCart
      ? "bg-green-500 hover:bg-green-600 focus:ring-green-500"
      : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
    }
  `}
>
  {inCart ? "В корзине" : "В корзину"}
</button>


      <Image
        src={isFav ? "/heart-filled.png" : "/heart.png"}
        alt="Избранное"
        width={24}
        height={24}
        onClick={() => toggleFav(book!)}
        className="cursor-pointer"
      />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
