"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Book } from "@/app/types";

export const BookCard: React.FC<{ book: Book }> = ({ book }) => {
  const displayedAuthors = book.author
    ? book.author.split(", ").slice(0, 2).join(", ") + (book.author.split(", ").length > 2 ? ", ..." : "")
    : "Автор неизвестен";

  return (
    <Card className="max-w-sm flex flex-col h-full">
      <CardHeader>
        {book.image ? (
          <img
            src={book.image}
            alt={book.title}
            className="h-64 w-full object-contain rounded-md"
          />
        ) : (
          <div className="h-64 bg-gray-400 rounded-md flex items-center justify-center text-gray-600">
            Нет обложки
          </div>
        )}
      </CardHeader>

      <CardContent className="flex-1 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg truncate">{book.title}</CardTitle>
          <p className="text-gray-900 font-semibold">{book.price}</p>
        </div>
        <CardDescription className="flex-1">{displayedAuthors}</CardDescription>
        <p className="text-sm text-gray-500">{book.genre || "Жанр"}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Link href={`/book/${book.id}`}>
          <Button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white">
            Подробнее
          </Button>
        </Link>
        <Link href="/favorites">
          <Image
            src="/heart.png"
            alt="Избранное"
            width={24}
            height={24}
            className="cursor-pointer hover:scale-110 transition"
          />
        </Link>
      </CardFooter>
    </Card>
  );
};