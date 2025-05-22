"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookCard } from "@/components/shared/BookCard";
import { Header } from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogAction, AlertDialogTitle, AlertDialogDescription } from "@/components/ui/alert-dialog";
import type { Book } from "@/app/types";
import { useCartStore } from "../stores/cart";
import { Trash2 } from "lucide-react";
import CheckoutDialog from "@/components/shared/CheckoutDialog";


export default function CartPage() {
  const cartBooks = useCartStore((s) => s.cart);
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const clearCart = useCartStore((s) => s.clearCart);
  const [showDialog, setShowDialog] = useState(false);
  const router = useRouter();

  const handleCheckout = () => {
    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    const newOrder = {
      id: Date.now(),
      books: cartBooks,
      date: new Date().toISOString(),
    };
    const updatedOrders = [...existingOrders, newOrder];
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    clearCart();
    setShowDialog(true);
  };


  return (
    <>

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
                  <Button
                    onClick={() => removeFromCart(book.id)}
                    variant="destructive"
                    className="absolute top-2 right-2"
                  >
                    <Trash2 className="w-5 h-5 text-white hover:text-red-500 cursor-pointer" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <Button
                onClick={clearCart}
                className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2"
              >
                Очистить корзину
              </Button>
              <CheckoutDialog onConfirm={handleCheckout} />

            </div>
          </>
        )}
      </div>
    </>
  );
}
