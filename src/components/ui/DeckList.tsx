"use client";

import { useState } from "react";
import Link from "next/link";
import ModalDeck from "@/app/ModalDeck";
import SubModalCard from "@/app/SubModalCard";

interface Card {
    id: string;
    front: string;
    back: string;
}

interface Deck {
    id: string;
    title: string;
    createdAt: Date;
    cards: Card[];
}

export default function DeckList({ decks, deleteAction }: { decks: Deck[]; deleteAction: (formData: FormData) => void }) {
    const [activeModalDeck, setActiveModalDeck] = useState<Deck | null>(null);
    const [activeModalCard, setActiveModalCard] = useState<Deck | null>(null);

    return (
        <div className="space-y-3 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {decks.map((deck) => (
                <div
                    key={deck.id}
                    className="bg-white p-5 border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center justify-between relative group"
                >
                    <Link href={`/deck/${deck.id}`} className="space-y-1 block truncate pr-4">
                        <h3 className="font-semibold text-slate-900 hover:underline truncate">{deck.title}</h3>
                        <p className="text-xs text-slate-400">Created: {new Date(deck.createdAt).toLocaleDateString()}</p>
                    </Link>

                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            onClick={() => setActiveModalDeck(deck)}
                            className="text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                        >
                            Manage
                        </button>

                        <form action={deleteAction}>
                            <input type="hidden" name="id" value={deck.id} />
                            <button
                                type="submit"
                                className="text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                            >
                                Delete
                            </button>
                        </form>
                    </div>
                </div>
            ))}

            {activeModalDeck && (
                <ModalDeck
                    deckId={activeModalDeck.id}
                    deckTitle={activeModalDeck.title}
                    cards={activeModalDeck.cards}
                    isOpen={!!activeModalDeck}
                    onClose={() => setActiveModalDeck(null)}
                />
            )}
        </div>
    );
}