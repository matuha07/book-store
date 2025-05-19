"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Book {
  id: number;
  title: string;
  author: string;
  price: string;
}

export default function Catalog() {
  const router = useRouter();

  const books: Book[] = [
    { id: 1, title: 'Название', author: 'Автор', price: '$20' },
    { id: 2, title: 'Название', author: 'Автор', price: '$20' },
    { id: 3, title: 'Название', author: 'Автор', price: '$20' },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {books.map((book: Book) => (
          <Card key={book.id} className="max-w-sm">
            <CardHeader>
              <div className="h-48 bg-gray-400"></div>
            </CardHeader>
            <CardContent>
              <CardTitle>{book.title}</CardTitle>
              <CardDescription>{book.author}</CardDescription>
              <p className="text-gray-900 mt-2">{book.price}</p>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => router.push(`/book/${book.id}`)}
                className="w-full"
                variant="default"
              >
                Подробнее <span className="ml-2"></span>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}