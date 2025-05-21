"use client";
import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { SearchBar } from "./SearchBar";
import Image from 'next/image'
import { useCartStore } from "@/app/stores/cart";


interface Props {
    className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
    const cartBooks = useCartStore((s) => s.cart);
    return (
        <div className={cn("bg-blue-400 p-2 text-zinc-300", className)}>
            <Container className="flex justify-center gap-4 flex-wrap">
                <div className="flex items-center gap-6">
                    <Link href="/" className="font-bold text-white">
                        <Image width={200} height={49} src="/logo.png" alt="logo" />
                    </Link>

                    <Link href="/catalog">Каталог</Link>
                    <Link href="/about">О нас</Link>
                    <Link href="/favorites">Избранное</Link>
                    <Link href="/cart"> Корзина ({cartBooks.length})</Link>
                </div>

                <SearchBar />
            </Container>
        </div>
    );
};
