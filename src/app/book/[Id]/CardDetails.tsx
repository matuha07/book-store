"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function BookPage() {
  const params = useParams();
  const id = params.id;

  // TODO: по id сделать fetch для загрузки данных книги
  // Пока заглушка:
  const book = {
    title: "Название книги " + id,
    author: "Автор книги",
    genre: "Жанр книги",
    description: "Подробное описание книги с id: " + id,
    price: "$20",
    image: "/4fce97ca-193b-46f0-b98f-27856f56541f.png",
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row gap-10 items-start">
        <div className="w-full md:w-1/3">
          <div className="bg-gray-400 rounded-md aspect-[3/4] w-full overflow-hidden">
            <Image
              src={book.image}
              alt={book.title}
              width={400}
              height={600}
              className="object-cover w-full h-full"
            />
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
            <Button className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white">
               Добавить в корзину
            </Button>

            <Image
              src="/heart.png"
              alt="Избранное"
              width={28}
              height={28}
              className="cursor-pointer hover:scale-110 transition"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
