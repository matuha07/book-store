"use client";

import { useState } from "react";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CheckoutDialog({
    onConfirm,
    onCloseComplete = () => {},
}: {
    onConfirm: () => void;
    onCloseComplete: () => void;
}) {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");

    const handleConfirm = () => {
        console.log("Форма отправлена:", { name, address });
        onConfirm();
        setTimeout(() => {
            onCloseComplete();
        }, 100);
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg rounded-xl">
                    Оформить заказ
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="sm:max-w-[500px]">
                <AlertDialogHeader>
                    <AlertDialogTitle>Оформление заказа</AlertDialogTitle>
                    <AlertDialogDescription>
                        Введите ваши данные. Это просто заглушка, ничего никуда не уйдёт.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <div className="space-y-4 py-4">
                    <div className="space-y-1">
                        <Label htmlFor="name">Имя</Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Иван Иванов"
                        />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="address">Адрес доставки</Label>
                        <Input
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="г. Москва, ул. Пушкина, д. 1"
                        />
                    </div>
                </div>

                <AlertDialogFooter>
                    <AlertDialogCancel>Отмена</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirm}>
                        Подтвердить
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
