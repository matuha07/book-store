"use client";
import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { SearchBar } from "./SearchBar";
import Image from "next/image";
import { useCartStore } from "@/app/stores/cart";

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  const cartBooks = useCartStore((s) => s.cart);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={cn(
        "bg-blue-400 p-2 text-zinc-300 h-[90px] flex items-center shadow-md",
        className
      )}
    >
      <Container className="flex justify-between items-center">
        {/* Логотип */}
        <Link href="/" className="font-bold text-white flex items-center gap-2">
          <Image width={150} height={35} src="/logo.png" alt="logo" />
        </Link>

        {/* Кнопка гамбургер */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {/* Простой svg гамбургер */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Навигация: скрыта на мобилке, видна на md+ */}
        <nav className="hidden md:flex gap-6 items-center text-white">
          <Link href="/catalog">Каталог</Link>
          <Link href="/about">О нас</Link>
          <Link href="/favorites">Избранное</Link>
          <Link href="/cart">Корзина ({cartBooks.length})</Link>
          <Link href="/orders">Заказы</Link>
          <SearchBar />
        </nav>
      </Container>

      {/* Мобильное меню */}
      {isOpen && (
        <div className="fixed top-[90px] left-0 right-0 bg-blue-400 text-white p-4 md:hidden shadow-lg z-50">
          <nav className="flex flex-col gap-4">
            <Link href="/catalog" onClick={() => setIsOpen(false)}>
              Каталог
            </Link>
            <Link href="/about" onClick={() => setIsOpen(false)}>
              О нас
            </Link>
            <Link href="/favorites" onClick={() => setIsOpen(false)}>
              Избранное
            </Link>
            <Link href="/cart" onClick={() => setIsOpen(false)}>
              Корзина ({cartBooks.length})
            </Link>
            <Link href="/orders" onClick={() => setIsOpen(false)}>
              Заказы
            </Link>
            <SearchBar />
          </nav>
        </div>
      )}
    </div>
  );
};
