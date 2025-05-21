"use client";
import { BookCard } from "@/components/shared/BookCard";
import { Header } from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import type { Book } from "@/app/types";
import { useCartStore } from "../stores/cart";


export default function CartPage() {
  const cartBooks = useCartStore((s) => s.cart);
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const clearCart = useCartStore((s) => s.clearCart);

  return (
    <>
      <Header />

      <div className="container mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Корзина ({cartBooks.length})
        </h1>

        {cartBooks.length === 0 ? (
          <p className="text-center">Ваша корзина пуста.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {cartBooks.map((book: Book) => (
                <div key={book.id} className="relative">
                  <BookCard book={book} />
                  <button
                    onClick={() => removeFromCart(book.id)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  >
                    Удалить
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <Button
                onClick={() => clearCart()}
                className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
              >
                Очистить корзину
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg rounded-xl">
                Оформить заказ
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
