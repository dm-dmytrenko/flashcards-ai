"use server"

import { db } from "@/lib/db";
import { hashPassword } from "@/lib/utils";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function getDecks() {
    return await db.deck.findMany({
        include: { cards: true },
        orderBy: { createdAt: "desc" }
    });
}

export async function getDeckById(id: string) {
    const deck = await db.deck.findUnique({
        where: {
            id: id
        },
        include: {
            cards: true,
        }
    })
    return deck;
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
    const prompt = formData.get("title") as string;
    if (!prompt) return;

    const complition = await groq.chat.completions.create({
        messages: [
            {
                role: "system",
                content: "You are an expert flashcard creator. Given a topic, generate a JSON object with a catchy deck 'title' and an array of 'cards' (each with 'front' and 'back' properties). Generate about 5-8 high-yield cards. Return ONLY valid JSON, with no extra text or markdown formatting blocks."
            },
            {
                role: "user",
                content: prompt
            }
        ],
        model: "openai/gpt-oss-20b",
        response_format: { type: "json_object" }
    })

    const responseContent = complition.choices[0]?.message?.content;
    if (!responseContent) return;

    const data = JSON.parse(responseContent);

    const deck = await db.deck.create({
        data: {
            title: data.title || prompt,
            cards: {
                create: data.cards.map((card: { front: string; back: string }) => ({
                    front: card.front,
                    back: card.back,
                }))
            }
        }
    })
    revalidatePath("/")
}

export async function updateCard(id: string, front: string, back: string) {
    try {
        await db.flashcard.update({
            where: { id: id },
            data: {
                front: front,
                back: back,
            }
        })
    } catch (err) {
        throw new Error("Failed to update the card")
    }
    revalidatePath("/");
}

export async function registerUser(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    console.log(email);
    console.log(password);

    if (!email || !password) {
        return { error: "Email and password are required." };
    }

    const existingUser = await db.user.findUnique({
        where: { email }
    })

    if (existingUser) {
        return { error: "An account with this email already exists." };
    }

    const hashedPassword = await hashPassword(password);

    await db.user.create({
        data: {
            email: email,
            password: hashedPassword
        }
    })

    //redirect("/login");
}