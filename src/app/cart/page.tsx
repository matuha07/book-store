"use client";
import { BookCard } from "@/components/shared/BookCard";
import { Header } from "@/components/shared/Header";
import { Button } from "@/components/ui/button";

const cartBooks = [
  { id: 1, title: "Название", author: "Автор", price: "$20" },
  { id: 2, title: "Название", author: "Автор", price: "$20" },
  { id: 3, title: "Название", author: "Автор", price: "$20" },
  { id: 4, title: "Название", author: "Автор", price: "$20" },
];

export default function CartPage() {
  return (
    <>
    <Header/>
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Корзина</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center mb-12">
        {cartBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      <div className="flex justify-end">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg rounded-xl">
          Оформить заказ
        </Button>
      </div>
    </div>
    </>
  );
}
