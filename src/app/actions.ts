"use server"

import { db } from "@/lib/db";
import { revalidatePath } from 'next/cache'

export async function getDecks() {
    const decks = await db.deck.findMany()
    return decks;
}

export async function deleteDeck(formData: FormData) {
    const id = formData.get("id") as string;
    await db.deck.delete({
        where: {
            id: id
        }
    })
    revalidatePath('/')
}

export async function generateDeckFromPrompt(formData: FormData) {
    const deck = await db.deck.create({
        data: {
            title: formData.get("title")
        }
    })
    revalidatePath("/")
}