// src/app/favorites/page.tsx
"use client";

import Favorites from "@/components/Favorites";
import { Header } from "@/components/shared/Header";


export default function FavoritesPage() {
  return (
    <>
    <Header/>
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Избранное</h1>
      <Favorites />
    </div>
    </>
  );
}
