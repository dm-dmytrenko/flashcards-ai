"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getDecks() {
    return await db.deck.findMany({
        include: {
            _count: {
                select: { cards: true },
            },
        },
        orderBy: { createdAt: "desc" },
    });
}

export async function createDeck(formData: FormData) {
    const title = formData.get("title") as string;

    if (!title || title.trim() === "") return;

    await db.deck.create({
        data: { title: title.trim() },
    });

    revalidatePath("/");
}