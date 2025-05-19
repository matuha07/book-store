"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

interface Book {
  id: number;
  title: string;
  author: string;
  price: string;
  genre?: string;
  image?: string;
}

export const BookCard: React.FC<{ book: Book }> = ({ book }) => {
  return (
    <Card className="max-w-sm">
      <CardHeader>
        <div className="h-48 bg-gray-400 rounded-md"></div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <CardTitle>{book.title}</CardTitle>
          <p className="text-gray-900 font-semibold">{book.price}</p>
        </div>
        <CardDescription>{book.author}</CardDescription>
        <p className="text-sm text-gray-500">{book.genre || "Жанр"}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Link href={`/book/${book.id}`}>
          <Button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white">
            Подробнее
          </Button>
        </Link>
        <Link href="favorites">
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
