"use client";
import { Header } from "@/components/shared/Header";
import { useEffect, useState } from "react";
import type { Book } from "@/app/types";

interface Order {
  id: number;
  books: Book[];
  date: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(stored);
  }, []);

  return (
    <>
      <Header />
      <div className="container mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">
          История заказов
        </h1>

        {orders.length === 0 ? (
          <p className="text-gray-600">Вы ещё не оформляли заказы.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="border-blue-500 border-2 border-solid bg-white rounded-lg p-4">
                <p className="text-gray-700 mb-2">
                  Заказ от {new Date(order.date).toLocaleString()}
                </p>
                <ul className="list-disc ml-6">
                  {order.books.map((book) => (
                    <li key={book.id}>{book.title}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
