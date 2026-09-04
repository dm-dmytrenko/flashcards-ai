"use client"

import { useState } from "react";

interface FlashCard {
    id: string,
    front: string,
    back: string
}

interface StudyCardsProp {
    cards: FlashCard[]
}

export default function StudyCard({ cards }: StudyCardsProp) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    const cardsNumber = cards.length;

    const currentCard = cards[currentIndex];

    const handleNext = () => {
        setIsFlipped(false);
        if (currentIndex < cardsNumber - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        } else {
            setIsFinished(true);
        }
    };
    const handlePrev = () => {
        setIsFlipped(false);
        setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
    };

    if (cardsNumber === 0) {
        return (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-500">
                No flashcards found in this deck.
            </div>
        )
    }

    return (
        <div className="space-y-6 flex flex-col items-center">
            <p className="text-sm font-medium text-slate-500">
                Card {currentIndex + 1} of {cardsNumber}
            </p>

            <div
                className="w-full max-w-lg h-64 bg-white border border-slate-200 rounded-2xl shadow-sm p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-slate-300 transition-all select-none"
            >
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-4">
                    {isFlipped ? "Answer" : "Question"}
                </span>
                <p className="text-xl font-medium text-slate-900">
                    {isFlipped ? currentCard.back : currentCard.front}
                </p>
                <span
                    onClick={() => setIsFlipped(!isFlipped)}
                    className="text-xs text-slate-400 mt-6"
                >
                    Click to flip
                </span>
            </div>

            <div className="flex gap-4">
                <button
                    onClick={handlePrev}
                    className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors cursor-pointer"
                >
                    Previous
                </button>
                <button
                    onClick={handleNext}
                    className="px-4 py-2 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors cursor-pointer"
                >
                    Next
                </button>
            </div>
        </div>
    );
}   