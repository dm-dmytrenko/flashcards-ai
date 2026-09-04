"use client";

import { useState } from "react";
import SubModalCard from "./SubModalCard";

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

export default function Modal({ deckId, deckTitle, cards = [], isOpen, onClose }: ModalProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);
    const [title, setTitle] = useState(deckTitle);

    if (!isOpen) return null;

    const filteredCards = cards.filter(
        (card) =>
            card.front.toLowerCase().includes(searchQuery.toLowerCase()) ||
            card.back.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-xl border border-slate-200 relative flex flex-col max-h-[85vh]">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors p-2 text-sm font-bold cursor-pointer"
                    title="Close modal"
                >
                    ✕
                </button>

                <h2 className="text-xl font-bold text-slate-900 mb-6">Manage Deck</h2>

                <div className="mb-4">
                    <label className="block mb-1.5 text-sm font-medium text-slate-700">Deck Name</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-xl focus:ring-slate-900 focus:border-slate-900 block w-full px-3.5 py-2.5 outline-none transition-all"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1.5 text-sm font-medium text-slate-700">Search Cards</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <svg className="w-4 h-4 text-slate-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input
                            type="search"
                            id="search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="block w-full p-3 ps-10 bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-xl focus:ring-slate-900 focus:border-slate-900 outline-none transition-all placeholder:text-slate-400"
                            placeholder="Search front or back..."
                        />
                    </div>
                </div>

                <div className="space-y-3 overflow-y-auto pr-1 flex-1 mt-2">
                    {filteredCards.length === 0 ? (
                        <p className="text-center text-slate-400 py-6 text-sm">No cards found.</p>
                    ) : (
                        filteredCards.map((card) => (
                            <div
                                key={card.id}
                                onClick={() => setSelectedCard(card)}
                                className="p-4 bg-slate-50 border border-slate-200 rounded-2xl hover:border-slate-300 hover:bg-slate-100/50 transition-all cursor-pointer flex flex-col gap-1"
                            >
                                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Front</div>
                                <div className="text-sm font-medium text-slate-900">{card.front}</div>
                                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-2">Back</div>
                                <div className="text-sm text-slate-600">{card.back}</div>
                            </div>
                        ))
                    )}
                </div>

                <div>
                    {selectedCard !== null ? (
                        <SubModalCard
                            cardId={selectedCard.id}
                            cardFront={selectedCard.front}
                            cardBack={selectedCard.back}
                            onClose={() => setSelectedCard(null)}
                        />
                    ) : null}
                </div>
            </div>
        </div>
    );
}