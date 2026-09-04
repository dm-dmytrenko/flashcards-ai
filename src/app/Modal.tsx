"use client";

import { useState } from "react";

interface Card {
    id: string;
    front: string;
    back: string;
}

interface ModalProps {
    deckId: string;
    deckTitle: string;
    cards: Card[];
    isOpen: boolean;
    onClose: () => void;
}

export default function Modal({ deckId, deckTitle, cards, isOpen, onClose }: ModalProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);
    const [title, setTitle] = useState(deckTitle);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-xl border border-slate-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors p-2 text-sm font-bold cursor-pointer"
                    title="Close modal"
                >
                    ✕
                </button>
            </div>
        </div>
    );
}