"use client";
import { Header } from "@/components/shared/Header";

export default function AboutPage() {
  return (
    <>
      <main className="pt-20"> 
        <div className="container mx-auto px-6 py-10">
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">О компании BookBridge</h1>

          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
            <strong>BookBridge</strong> — это онлайн-магазин книг и комиксов, созданный для тех, кто ценит
            хорошую литературу, визуальные истории и удобный цифровой опыт. Мы — мост между
            читателями и историями, которые вдохновляют, учат и развлекают.
          </p>

          <p className="mt-6 text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Наша платформа предлагает тщательно отобранные издания: от современных бестселлеров до редких
            комиксов, от классических романов до новых инди-авторов. Мы стремимся к тому, чтобы каждый
            посетитель находил что-то особенное.
          </p>

          <p className="mt-6 text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
            BookBridge был создан с заботой о пользователе — с простым интерфейсом
            и быстрой доставкой. Мы верим, что чтение должно быть доступным, красивым и захватывающим.
          </p>

          <h2 className="text-2xl font-semibold text-blue-600 mt-10 mb-4 text-center">Контакты</h2>
          <div className="text-center text-gray-700 text-lg">
            <p>📧 Email: support@bookbridge.store</p>
            <p>📍 Адрес: г. Астана, ул. Айтеке би, 10</p>
            <p>📱 Телефон: +7 (777) 123-45-67</p>
          </div>
        </div>
      </main>
    </>
  );
}
