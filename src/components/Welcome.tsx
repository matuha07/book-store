import { Button } from "@/components/ui/button";
import Link from "next/link";



export default function Welcome() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-blue-500">Добро пожаловать в BookBridge!</h1>
                <p className="mt-4 text-blue-400">Мост между историями и воображением</p>
                <Link href="catalog">
                <Button className="mt-6 bg-blue-600" variant="default">
                    Перейти в каталог
                </Button>
                </Link>
            </div>
        </div>
    );
}